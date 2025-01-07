import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import { db } from "@/server/db";
import { projects, changelogs, accounts } from "@/server/db/schema";
import OpenAI from "openai";
import { env } from "@/env";

const GITHUB_API_URL = "https://api.github.com";
const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
}

interface ChangelogSettings {
  template: string;
  includeLinks: boolean;
  groupByType: boolean;
}

async function getLatestCommits(
  accessToken: string,
  repositoryUrl: string,
): Promise<Commit[]> {
  const [owner, repo] = repositoryUrl
    .replace("https://github.com/", "")
    .split("/");

  if (!owner || !repo) {
    throw new Error("Invalid repository URL format");
  }

  const response = await fetch(
    `${GITHUB_API_URL}/repos/${owner}/${repo}/commits`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch commits");
  }

  return response.json();
}

function parseCommitMessage(message: string) {
  const regex = /^(\w+)(?:\(([^)]+)\))?: (.+)/;
  const result = regex.exec(message);
  if (result) {
    const [, type = "other", scope, description = message] = result;
    return { type, scope, description };
  }
  return { type: "other", scope: null, description: message };
}

async function getLatestVersion(projectId: string): Promise<string> {
  const latestChangelog = await db
    .select({ version: changelogs.version })
    .from(changelogs)
    .where(eq(changelogs.projectId, projectId))
    .orderBy(desc(changelogs.createdAt))
    .limit(1)
    .then((res) => res[0]);

  if (!latestChangelog?.version) {
    return "1.0.0";
  }

  const versionParts = latestChangelog.version.split(".").map(Number);
  const major = versionParts[0] ?? 1;
  const minor = versionParts[1] ?? 0;
  const patch = versionParts[2] ?? 0;
  return `${major}.${minor}.${patch + 1}`;
}

async function generateChangelogWithAI(
  commits: Commit[],
  settings: ChangelogSettings,
): Promise<ReadableStream> {
  try {
    const commitsByType = new Map<string, Commit[]>();

    commits.forEach((commit) => {
      const { type } = parseCommitMessage(commit.commit.message);
      if (!commitsByType.has(type)) {
        commitsByType.set(type, []);
      }
      commitsByType.get(type)?.push(commit);
    });

    const commitData = Array.from(commitsByType.entries()).map(
      ([type, commits]) => ({
        type,
        commits: commits.map((c) => ({
          message: c.commit.message,
          url: settings.includeLinks ? c.html_url : null,
          author: c.commit.author.name,
          date: c.commit.author.date,
        })),
      }),
    );

    const prompt = `Generate a clear and professional changelog based on the following commits. 
The changelog should be well-organized and easy to read.
${settings.groupByType ? "Group changes by type (e.g., Features, Bug Fixes, etc.)." : ""}
${settings.includeLinks ? "Include links to the commits." : ""}

Commit data:
${JSON.stringify(commitData, null, 2)}

Please format the changelog in markdown.`;

    const stream = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content:
            "You are a professional changelog generator. Your task is to create clear, concise, and well-organized changelogs from git commits.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1500,
      stream: true,
    });

    const textEncoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(textEncoder.encode(content));
            }
          }
          controller.close();
        } catch (error) {
          controller.error(error);
        }
      },
    });

    return readable;
  } catch (error) {
    console.error("Error generating changelog with AI:", error);
    throw new Error("Failed to generate changelog with AI");
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const [project, account] = await Promise.all([
      db.query.projects.findFirst({
        where: and(
          eq(projects.id, id),
          eq(projects.createdById, session.user.id),
        ),
      }),
      db.query.accounts.findFirst({
        where: eq(accounts.userId, session.user.id),
      }),
    ]);

    if (!project) {
      return NextResponse.json(
        { message: "Project not found" },
        { status: 404 },
      );
    }

    if (!account?.access_token) {
      return NextResponse.json(
        { message: "GitHub account not connected" },
        { status: 400 },
      );
    }

    const commits = await getLatestCommits(
      account.access_token,
      project.repositoryUrl,
    );
    const settings = JSON.parse(project.settings) as ChangelogSettings;
    const version = await getLatestVersion(project.id);
    const stream = await generateChangelogWithAI(commits, settings);

    // Create a new changelog entry with empty content initially
    const newChangelog = await db
      .insert(changelogs)
      .values({
        projectId: project.id,
        version,
        content: "", // Content will be updated as it streams
      })
      .returning();

    // Create a transform stream to accumulate the content
    let accumulatedContent = "";
    const transform = new TransformStream({
      transform(chunk: Uint8Array, controller) {
        const text = new TextDecoder().decode(chunk);
        accumulatedContent += text;
        controller.enqueue(chunk);
      },
      async flush() {
        if (newChangelog[0]?.id) {
          await db
            .update(changelogs)
            .set({ content: accumulatedContent })
            .where(eq(changelogs.id, newChangelog[0].id));
        }
      },
    });

    return new NextResponse(stream.pipeThrough(transform), {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error generating changelog:", error);
    return NextResponse.json(
      { message: "Failed to generate changelog" },
      { status: 500 },
    );
  }
}
