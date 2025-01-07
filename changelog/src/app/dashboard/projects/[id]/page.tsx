"use client";

import { useState, useEffect, Suspense } from "react";
import { useParams } from "next/navigation";
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
  Loader2,
} from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

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

// Separate component for changelog content
function ChangelogEntry({
  changelog,
  onCopy,
  onDownload,
  copied,
}: {
  changelog: {
    id: string;
    version: string;
    content: string;
    publishedAt: string | null;
    createdAt: string;
  };
  onCopy: (id: string, content: string) => void;
  onDownload: (version: string, content: string) => void;
  copied: string | null;
}) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "group rounded-lg border border-border bg-card p-6 transition-all hover:shadow-md",
        changelog.id === "temp" && "animate-pulse",
      )}
    >
      <div className="mb-6 flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-semibold">
              Version {changelog.version}
            </h3>
            <Badge
              variant={changelog.publishedAt ? "default" : "secondary"}
              className="text-xs"
            >
              {changelog.publishedAt ? "Published" : "Draft"}
            </Badge>
          </div>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            Generated on{" "}
            {new Date(changelog.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => onCopy(changelog.id, changelog.content)}
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  {copied === changelog.id ? (
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
              <TooltipContent>Copy changelog to clipboard</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() =>
                    onDownload(changelog.version, changelog.content)
                  }
                  className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </TooltipTrigger>
              <TooltipContent>Download changelog as file</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <div className="prose prose-sm dark:prose-invert max-w-none rounded-lg bg-muted/50 p-6 [&>h1]:mb-6 [&>h2]:mb-4 [&>h2]:mt-8 [&>h2]:border-b [&>h2]:pb-2 [&>p]:mb-4 [&>p]:leading-7 [&>ul>li]:mb-2 [&>ul]:mb-6 [&>ul]:mt-4">
        <Suspense fallback={<div className="animate-pulse">Loading...</div>}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => (
                <h1 className="text-2xl font-bold">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-xl font-semibold">{children}</h2>
              ),
              p: ({ children }) => (
                <p className="whitespace-pre-wrap">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-6 [&>li>p]:my-0">{children}</ul>
              ),
              li: ({ children }) => <li className="text-base">{children}</li>,
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {children}
                </a>
              ),
              code: ({ className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className ?? "");
                const content = String(children ?? "").replace(/\n$/, "");

                if (!match || !content) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }

                const language = match[1]?.toLowerCase() ?? "text";
                const style = theme === "dark" ? vscDarkPlus : undefined;

                return (
                  <SyntaxHighlighter
                    language={language}
                    style={style ?? {}}
                    PreTag="div"
                    customStyle={{ margin: 0 }}
                  >
                    {content}
                  </SyntaxHighlighter>
                );
              },
            }}
          >
            {changelog.content}
          </ReactMarkdown>
        </Suspense>
      </div>
    </div>
  );
}

export default function ProjectPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const [project, setProject] = useState<Project | null>(null);
  const [changelogs, setChangelogs] = useState<Changelog[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

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
      // Create a temporary changelog entry first
      const tempChangelog: Changelog = {
        id: "temp",
        version: "New",
        content: "",
        createdAt: new Date().toISOString(),
        publishedAt: null,
      };
      setChangelogs((prev) => [tempChangelog, ...prev]);

      const response = await fetch(`/api/projects/${projectId}/generate`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to generate changelog");
      }

      const reader = response.body?.getReader();
      if (!reader) return;

      const decoder = new TextDecoder();
      let content = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        content += decoder.decode(value, { stream: true });
        // Update the temporary changelog with new content
        setChangelogs((prev) => {
          const [first, ...rest] = prev;
          if (!first) return prev;
          return [{ ...first, content } as Changelog, ...rest];
        });
      }

      await fetchProjectData(); // Fetch final data
    } catch (error) {
      console.error("Error generating changelog:", error);
      // Remove the temporary changelog on error
      setChangelogs((prev) => prev.filter((c) => c.id !== "temp"));
    } finally {
      setGenerating(false);
    }
  }

  async function handleCopyChangelog(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Error copying to clipboard:", error);
    }
  }

  async function handleDownloadChangelog(version: string, content: string) {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `changelog-v${version}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            <div
              key={i}
              className="animate-pulse rounded-lg border border-border p-6"
            >
              <div className="space-y-4">
                <div className="h-6 w-32 rounded bg-muted" />
                <div className="h-24 w-full rounded bg-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  

  if (!project) {
    return (
      <div className="container mx-auto py-10">
        <div className="rounded-lg border border-border p-6">
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
        </div>
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
                        <Loader2 className="h-4 w-4 animate-spin" />
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
            <ChangelogEntry
              key={changelog.id}
              changelog={changelog}
              onCopy={handleCopyChangelog}
              onDownload={handleDownloadChangelog}
              copied={copied}
            />
          ))
        ) : (
          <div className="rounded-lg border border-border bg-card p-8">
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
                          <Loader2 className="h-4 w-4 animate-spin" />
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
          </div>
        )}
      </div>
    </div>
  );
}
