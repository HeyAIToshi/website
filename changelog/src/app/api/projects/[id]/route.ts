import { auth } from "@/server/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { eq, and } from "drizzle-orm";

import { db } from "@/server/db";
import { projects } from "@/server/db/schema";

const updateProjectSchema = z.object({
  settings: z.object({
    template: z.enum(["keep-a-changelog", "semantic", "custom"]),
    autoGenerate: z.boolean(),
    includeLinks: z.boolean(),
    groupByType: z.boolean(),
  }),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await db.query.projects.findFirst({
      where: and(
        eq(projects.id, params.id),
        eq(projects.createdById, session.user.id),
      ),
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const json = (await req.json()) as z.infer<typeof updateProjectSchema>;
    const body = updateProjectSchema.parse(json);

    const project = await db.query.projects.findFirst({
      where: and(
        eq(projects.id, params.id),
        eq(projects.createdById, session.user.id),
      ),
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    const updatedProject = await db
      .update(projects)
      .set({
        settings: JSON.stringify(body.settings),
      })
      .where(eq(projects.id, params.id))
      .returning();

    return NextResponse.json(updatedProject[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }

    console.error("Error updating project:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const project = await db.query.projects.findFirst({
      where: and(
        eq(projects.id, params.id),
        eq(projects.createdById, session.user.id),
      ),
    });

    if (!project) {
      return new NextResponse("Project not found", { status: 404 });
    }

    await db.delete(projects).where(eq(projects.id, params.id));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
