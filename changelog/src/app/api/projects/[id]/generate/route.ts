import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { db } from "@/server/db";
import { projects, changelogs, accounts } from "@/server/db/schema";
import { z } from "zod";

const GITHUB_API_URL = "https://api.github.com";

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

async function getLatestCommits(accessToken: string, repositoryUrl: string) {
  // Extract owner and repo from the repository URL
  const [owner, repo] = repositoryUrl
    .replace("https://github.com/", "")
    .split("/");

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

  return response.json() as Promise<Commit[]>;
}

function parseCommitMessage(message: string) {
  // Parse conventional commit format: <type>(<scope>): <description>
  const regex = /^(\w+)(?:\(([^)]+)\))?: (.+)/;
  const result = regex.exec(message);
  if (result) {
    const [, type, scope, description] = result;
    return { type, scope, description };
  }
  return { type: "other", scope: null, description: message };
}

function generateChangelogContent(
  commits: Commit[],
  settings: ChangelogSettings,
) {
  const version = new Date().toISOString().split("T")[0]; // Use date as version
  let content = "";

  if (settings.template === "keep-a-changelog") {
    content += `# Changelog\n\n`;
    content += `## [${version}]\n\n`;

    if (settings.groupByType) {
      const groupedCommits: Record<string, Commit[]> = {};
      commits.forEach((commit) => {
        const { type } = parseCommitMessage(commit.commit.message);
        const commitType = type || "other";
        if (!groupedCommits[commitType]) {
          groupedCommits[commitType] = [];
        }
        groupedCommits[commitType].push(commit);
      });

      Object.entries(groupedCommits).forEach(([type, typeCommits]) => {
        content += `### ${type.charAt(0).toUpperCase() + type.slice(1)}\n\n`;
        typeCommits.forEach((commit) => {
          const { description } = parseCommitMessage(commit.commit.message);
          if (settings.includeLinks) {
            content += `- ${description} ([${commit.sha.slice(0, 7)}](${
              commit.html_url
            }))\n`;
          } else {
            content += `- ${description}\n`;
          }
        });
        content += "\n";
      });
    } else {
      commits.forEach((commit) => {
        const { description } = parseCommitMessage(commit.commit.message);
        if (settings.includeLinks) {
          content += `- ${description} ([${commit.sha.slice(0, 7)}](${
            commit.html_url
          }))\n`;
        } else {
          content += `- ${description}\n`;
        }
      });
    }
  } else if (settings.template === "semantic") {
    content += `# ${version}\n\n`;

    const types: Record<string, string> = {
      feat: "Features",
      fix: "Bug Fixes",
      docs: "Documentation",
      style: "Styles",
      refactor: "Code Refactoring",
      perf: "Performance Improvements",
      test: "Tests",
      build: "Builds",
      ci: "Continuous Integration",
      chore: "Chores",
      revert: "Reverts",
    };

    if (settings.groupByType) {
      const groupedCommits: Record<string, Commit[]> = {};
      commits.forEach((commit) => {
        const { type } = parseCommitMessage(commit.commit.message);
        const commitType = type || "other";
        if (!groupedCommits[commitType]) {
          groupedCommits[commitType] = [];
        }
        groupedCommits[commitType].push(commit);
      });

      Object.entries(groupedCommits).forEach(([type, typeCommits]) => {
        const title =
          types[type] || type.charAt(0).toUpperCase() + type.slice(1);
        content += `## ${title}\n\n`;
        typeCommits.forEach((commit) => {
          const { scope, description } = parseCommitMessage(
            commit.commit.message,
          );
          const scopeText = scope ? `**${scope}:** ` : "";
          if (settings.includeLinks) {
            content += `* ${scopeText}${description} ([${commit.sha.slice(0, 7)}](${
              commit.html_url
            }))\n`;
          } else {
            content += `* ${scopeText}${description}\n`;
          }
        });
        content += "\n";
      });
    } else {
      commits.forEach((commit) => {
        const { type, scope, description } = parseCommitMessage(
          commit.commit.message,
        );
        const scopeText = scope ? `**${scope}:** ` : "";
        if (settings.includeLinks) {
          content += `* **${type}:** ${scopeText}${description} ([${commit.sha.slice(
            0,
            7,
          )}](${commit.html_url}))\n`;
        } else {
          content += `* **${type}:** ${scopeText}${description}\n`;
        }
      });
    }
  }

  return { version, content };
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Get project and verify ownership
    const project = await db.query.projects.findFirst({
      where: and(
        eq(projects.id, params.id),
        eq(projects.createdById, session.user.id),
      ),
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    // Get GitHub access token
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, session.user.id),
    });

    if (!account?.access_token) {
      return new NextResponse("GitHub account not connected", { status: 400 });
    }

    // Fetch commits from GitHub
    const commits = await getLatestCommits(
      account.access_token,
      project.repositoryUrl,
    );

    // Parse and validate settings
    let settings: ChangelogSettings;
    try {
      settings = JSON.parse(project.settings) as ChangelogSettings;
    } catch (error) {
      return new NextResponse("Invalid project settings", { status: 400 });
    }

    // Generate changelog content
    const { version, content } = generateChangelogContent(commits, settings);

    // Save changelog to database
    const [changelog] = await db
      .insert(changelogs)
      .values({
        projectId: project.id,
        version,
        content,
      })
      .returning();

    return NextResponse.json(changelog);
  } catch (error) {
    console.error("Error generating changelog:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
