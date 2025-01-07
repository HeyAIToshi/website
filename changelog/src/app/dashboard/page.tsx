"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, Settings, Github, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Project {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  createdAt: string;
  settings: string;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");
        if (response.ok) {
          const data = (await response.json()) as Project[];
          setProjects(data);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    }

    if (session?.user) {
      void fetchProjects();
    }
  }, [session]);

  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Your Projects</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Manage changelogs for your repositories
          </p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/dashboard/settings"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input bg-background px-6 text-sm font-medium ring-offset-background transition-all hover:scale-105 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <Link
            href="/dashboard/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg ring-offset-background transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Plus className="h-4 w-4" />
            New Project
          </Link>
        </div>
      </motion.div>

      {/* Project Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[220px] rounded-xl border bg-muted/30">
              <div className="relative h-full w-full overflow-hidden">
                <div className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.length === 0 ? (
            <motion.div
              variants={item}
              className="col-span-full flex flex-col items-center justify-center py-16 text-center"
            >
              <div className="mb-6 rounded-full bg-primary/10 p-6">
                <Github className="h-12 w-12 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">No projects yet</h3>
              <p className="mb-6 max-w-sm text-muted-foreground">
                Get started by connecting your first GitHub repository to create
                beautiful changelogs.
              </p>
              <Link
                href="/dashboard/new"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-primary/20"
              >
                <Plus className="h-4 w-4" />
                Add Your First Project
              </Link>
            </motion.div>
          ) : (
            <>
              {projects.map((project) => (
                <motion.div key={project.id} variants={item}>
                  <Link
                    href={`/dashboard/projects/${project.id}`}
                    className="group relative flex h-[220px] flex-col rounded-xl border bg-card p-6 transition-all hover:scale-[1.02] hover:bg-accent/40 hover:shadow-lg"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
                        <Github className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-semibold tracking-tight">
                        {project.name}
                      </h3>
                    </div>
                    {project.description ? (
                      <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
                        {project.description}
                      </p>
                    ) : (
                      <p className="mb-4 text-sm italic text-muted-foreground">
                        No description provided
                      </p>
                    )}
                    <div className="mt-auto flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        Created{" "}
                        {new Date(project.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </span>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 h-[6px] rounded-b-xl bg-gradient-to-r from-primary/40 to-primary opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={item}>
                <Link
                  href="/dashboard/new"
                  className="flex h-[220px] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-muted-foreground/25 bg-muted/30 p-8 text-center transition-all hover:scale-[1.02] hover:border-primary hover:bg-primary/5"
                >
                  <div className="rounded-full bg-primary/10 p-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Add New Project</h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Connect another GitHub repository
                    </p>
                  </div>
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
}
