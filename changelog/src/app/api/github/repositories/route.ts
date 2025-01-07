import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/server/db";
import { accounts } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const GITHUB_API_URL = "https://api.github.com";

// GitHub API response schema
const githubRepoSchema = z.object({
  id: z.number(),
  full_name: z.string(),
  description: z.string().nullable(),
  html_url: z.string(),
  updated_at: z.string(),
  private: z.boolean(),
});

interface TransformedRepo {
  id: number;
  name: string;
  description: string | null;
  url: string;
  updatedAt: string;
  private: boolean;
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Get GitHub access token from the database
    const account = await db.query.accounts.findFirst({
      where: eq(accounts.userId, session.user.id),
    });

    if (!account?.access_token) {
      return NextResponse.json(
        { message: "GitHub account not connected" },
        { status: 400 },
      );
    }

    // Fetch repositories from GitHub API
    const response = await fetch(
      `${GITHUB_API_URL}/user/repos`,
      {
        headers: {
          Authorization: `Bearer ${account.access_token}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("GitHub API error:", error);
      return NextResponse.json(
        { message: "Failed to fetch repositories", error },
        { status: response.status },
      );
    }

    const repositories = (await response.json()) as unknown[];

    // Validate and transform repository data
    const transformedRepos = repositories
      .map((repo) => {
        const result = githubRepoSchema.safeParse(repo);
        if (!result.success) {
          console.error("Invalid repository data:", result.error);
          return null;
        }
        const validRepo = result.data;
        return {
          id: validRepo.id,
          name: validRepo.full_name,
          description: validRepo.description,
          url: validRepo.html_url,
          updatedAt: validRepo.updated_at,
          private: validRepo.private,
        } satisfies TransformedRepo;
      })
      .filter((repo): repo is TransformedRepo => repo !== null);

    return NextResponse.json(transformedRepos);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
