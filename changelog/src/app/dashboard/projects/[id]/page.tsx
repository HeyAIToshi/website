"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Settings,
  RefreshCw,
  Download,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  settings: string;
}

interface Changelog {
  id: string;
  version: string;
  content: string;
  publishedAt: string | null;
  createdAt: string;
}

export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const { data: session } = useSession();
  const [project, setProject] = useState<Project | null>(null);
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (projectId) {
      void fetchProjectData();
    }
  }, [projectId]);

  async function fetchProjectData() {
    try {
      setLoading(true);
      const [projectRes, changelogsRes] = await Promise.all([
        fetch(`/api/projects/${projectId}`),
        fetch(`/api/projects/${projectId}/changelogs`),
      ]);

      if (projectRes.ok && changelogsRes.ok) {
        const [projectData, changelogsData] = await Promise.all([
          projectRes.json() as Promise<Project>,
          changelogsRes.json() as Promise<Changelog[]>,
        ]);
        setProject(projectData);
        setChangelogs(changelogsData);
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleGenerateChangelog() {
    try {
      setGenerating(true);
      const response = await fetch(`/api/projects/${projectId}/generate`, {
        method: "POST",
      });

      if (response.ok) {
        await fetchProjectData();
      }
    } catch (error) {
      console.error("Error generating changelog:", error);
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopyChangelog(content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <div className="space-y-4">
          <div className="h-8 w-48 animate-pulse rounded bg-muted" />
          <div className="h-12 w-96 animate-pulse rounded bg-muted" />
          <div className="h-6 w-72 animate-pulse rounded bg-muted" />
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Project not found</h1>
          <p className="text-muted-foreground">
            The project you&apos;re looking for doesn&apos;t exist or you
            don&apos;t have access to it.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard"
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold">{project.name}</h1>
            {project.description && (
              <p className="mt-1 text-muted-foreground">
                {project.description}
              </p>
            )}
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              View Repository
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="flex gap-4">
            <Link
              href={`/dashboard/projects/${projectId}/settings`}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <button
              onClick={() => void handleGenerateChangelog()}
              disabled={generating}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Generate Changelog
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Changelogs */}
      <div className="space-y-6">
        {changelogs.length > 0 ? (
          changelogs.map((changelog) => (
            <div key={changelog.id} className="rounded-lg border bg-card p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">
                    Version {changelog.version}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Generated on{" "}
                    {new Date(changelog.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => void handleCopyChangelog(changelog.content)}
                    className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy
                      </>
                    )}
                  </button>
                  <button className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <Download className="h-4 w-4" />
                    Download
                  </button>
                </div>
              </div>
              <pre className="max-h-96 overflow-auto rounded-lg bg-muted p-4 text-sm">
                {changelog.content}
              </pre>
            </div>
          ))
        ) : (
          <div className="rounded-lg border bg-card p-8 text-center">
            <h3 className="mb-2 text-lg font-semibold">No Changelogs Yet</h3>
            <p className="mb-4 text-muted-foreground">
              Generate your first changelog to get started
            </p>
            <button
              onClick={() => void handleGenerateChangelog()}
              disabled={generating}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Generate Changelog
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
