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
  Calendar,
  Tag,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
      <div className="container mx-auto space-y-6 py-10">
        <div className="space-y-4">
          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
          <div className="h-8 w-96 animate-pulse rounded bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="space-y-4">
                <div className="h-6 w-32 rounded bg-muted" />
                <div className="h-24 w-full rounded bg-muted" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto py-10">
        <Card className="p-6">
          <div className="space-y-4 text-center">
            <h1 className="text-2xl font-bold text-foreground">
              Project not found
            </h1>
            <p className="text-muted-foreground">
              The project you&apos;re looking for doesn&apos;t exist or you
              don&apos;t have access to it.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 py-10">
      {/* Header */}
      <div className="space-y-6">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">
              {project.name}
            </h1>
            {project.description && (
              <p className="text-lg text-muted-foreground">
                {project.description}
              </p>
            )}
            <div className="flex items-center gap-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={project.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Repository
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>Open repository in a new tab</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex gap-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href={`/dashboard/projects/${projectId}/settings`}
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Configure project settings</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
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
                </TooltipTrigger>
                <TooltipContent>Generate a new changelog entry</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      {/* Changelogs */}
      <div className="space-y-6">
        {changelogs.length > 0 ? (
          changelogs.map((changelog) => (
            <Card
              key={changelog.id}
              className="group transition-all hover:shadow-md"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle>Version {changelog.version}</CardTitle>
                      <Badge variant="secondary" className="text-xs">
                        {changelog.publishedAt ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Generated on{" "}
                      {new Date(changelog.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() =>
                              void handleCopyChangelog(changelog.content)
                            }
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
                        </TooltipTrigger>
                        <TooltipContent>
                          Copy changelog to clipboard
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                            <Download className="h-4 w-4" />
                            Download
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          Download changelog as file
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
                <pre
                  className={cn(
                    "max-h-96 overflow-auto rounded-lg bg-muted p-4 text-sm",
                    "scrollbar-thin scrollbar-thumb-border scrollbar-track-muted",
                  )}
                >
                  {changelog.content}
                </pre>
              </CardHeader>
            </Card>
          ))
        ) : (
          <Card className="p-8">
            <div className="space-y-4 text-center">
              <Tag className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="text-lg font-semibold">No Changelogs Yet</h3>
              <p className="mx-auto max-w-sm text-muted-foreground">
                Generate your first changelog to keep track of your
                project&apos;s updates and changes.
              </p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
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
                  </TooltipTrigger>
                  <TooltipContent>Generate your first changelog</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
