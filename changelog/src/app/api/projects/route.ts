import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

import { db } from "@/server/db";
import { projects } from "@/server/db/schema";

const createProjectSchema = z.object({
  name: z.string().min(1),
  description: z.string().nullable(),
  repositoryUrl: z.string().url(),
  settings: z.object({
    template: z.enum(["keep-a-changelog", "semantic", "custom"]),
    autoGenerate: z.boolean(),
    includeLinks: z.boolean(),
    groupByType: z.boolean(),
  }),
});

export async function POST(req: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const json = (await req.json()) as unknown;
    const body = createProjectSchema.parse(json);

    const project = await db
      .insert(projects)
      .values({
        name: body.name,
        description: body.description,
        repositoryUrl: body.repositoryUrl,
        createdById: session.user.id,
        settings: JSON.stringify(body.settings),
      })
      .returning();

    return NextResponse.json(project[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Validation error", errors: error.errors },
        { status: 400 },
      );
    }

    console.error("Error creating project:", error);
    return NextResponse.json(
      { message: "Failed to create project" },
      { status: 500 },
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userProjects = await db.query.projects.findMany({
      where: (projects, { eq }) => eq(projects.createdById, session.user.id),
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });

    return NextResponse.json(userProjects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { message: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}
