import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { eq, and, desc, type InferSelectModel } from "drizzle-orm";
import { DrizzleError } from "drizzle-orm";

import { db } from "@/server/db";
import { projects, changelogs } from "@/server/db/schema";

type Project = InferSelectModel<typeof projects>;
type Changelog = InferSelectModel<typeof changelogs>;
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify project ownership
    const project = await db
      .select()
      .from(projects)
      .where(
        and(eq(projects.id, id), eq(projects.createdById, session.user.id)),
      )
      .limit(1)
      .then((res) => res[0] as Project | undefined);

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    // Fetch changelogs
    const projectChangelogs = await db
      .select()
      .from(changelogs)
      .where(eq(changelogs.projectId, id))
      .orderBy(desc(changelogs.createdAt))
      .then((res) => res as Changelog[]);

    return NextResponse.json(projectChangelogs);
  } catch (error) {
    if (error instanceof DrizzleError) {
      console.error("Database error:", error);
      return new NextResponse("Database Error", { status: 500 });
    }
    console.error("Error fetching changelogs:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
