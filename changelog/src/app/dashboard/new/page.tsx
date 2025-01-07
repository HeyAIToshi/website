"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Github, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";

interface Repository {
  id: number;
  name: string;
  description: string | null;
  url: string;
  updatedAt: string;
}

interface ApiError {
  message: string;
  errors?: Array<{
    code: string;
    message: string;
    path: string[];
  }>;
}

interface ProjectResponse {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  settings: string;
}

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [settings, setSettings] = useState({
    template: "keep-a-changelog" as const,
    autoGenerate: true,
    includeLinks: true,
    groupByType: true,
  });

  useEffect(() => {
    void fetchRepositories();
  }, []);

  async function fetchRepositories() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/github/repositories");
      if (!response.ok) {
        const error = (await response.json()) as ApiError;
        setError(error.message || "Failed to fetch repositories");
        return;
      }
      const repositories = (await response.json()) as Repository[];
      setRepositories(repositories);
    } catch (error) {
      setError("Failed to fetch repositories");
      console.error("Error fetching repositories:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateProject() {
    if (!selectedRepo) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: selectedRepo.name,
          description: selectedRepo.description,
          repositoryUrl: selectedRepo.url,
          settings,
        }),
      });

      const data = (await response.json()) as ProjectResponse | ApiError;

      if (!response.ok) {
        if ("errors" in data && data.errors) {
          // Format validation errors
          const errorMessages = data.errors.map((err) => {
            const field = err.path.join(".");
            return `${field}: ${err.message}`;
          });
          setError(errorMessages.join("\n"));
        } else if ("message" in data) {
          setError(data.message);
        } else {
          setError("Failed to create project");
        }
        return;
      }

      router.push(`/dashboard/projects/${(data as ProjectResponse).id}`);
    } catch (error) {
      setError("Failed to create project");
      console.error("Error creating project:", error);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold">Add New Project</h1>
        <p className="text-muted-foreground">
          Connect a GitHub repository to start generating changelogs
        </p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 whitespace-pre-line rounded-md bg-destructive/15 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Repository Selection */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Select Repository</h2>
          <button
            onClick={() => void fetchRepositories()}
            className="inline-flex h-8 items-center justify-center gap-2 rounded-md border border-input bg-background px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        {/* Repository List */}
        <div className="rounded-lg border bg-card">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex animate-pulse items-center gap-3 border-b p-4 last:border-0"
              >
                <div className="h-5 w-5 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-48 rounded bg-muted" />
                  <div className="h-3 w-32 rounded bg-muted" />
                </div>
              </div>
            ))
          ) : repositories.length > 0 ? (
            repositories.map((repo) => (
              <button
                key={repo.id}
                onClick={() => setSelectedRepo(repo)}
                className={`flex w-full items-center gap-3 border-b p-4 text-left transition-colors last:border-0 hover:bg-accent ${
                  selectedRepo?.id === repo.id ? "bg-accent" : ""
                }`}
              >
                <Github className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{repo.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Last updated{" "}
                    {new Date(repo.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No repositories found
            </div>
          )}
        </div>
      </div>

      {/* Configuration */}
      {selectedRepo && (
        <div className="space-y-6">
          <div>
            <h2 className="mb-4 text-xl font-semibold">Configure Changelog</h2>
            <div className="space-y-4 rounded-lg border bg-card p-6">
              {/* Template Selection */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Changelog Template
                </label>
                <select
                  value={settings.template}
                  onChange={(e) =>
                    setSettings({ ...settings, template: e.target.value })
                  }
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="keep-a-changelog">Keep a Changelog</option>
                  <option value="semantic">Semantic Versioning</option>
                  <option value="custom">Custom Template</option>
                </select>
              </div>

              {/* Generation Settings */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Generation Settings
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.autoGenerate}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          autoGenerate: e.target.checked,
                        })
                      }
                      className="rounded border-input"
                    />
                    <span className="text-sm">
                      Auto-generate on new commits
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.includeLinks}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          includeLinks: e.target.checked,
                        })
                      }
                      className="rounded border-input"
                    />
                    <span className="text-sm">
                      Include commit links in changelog
                    </span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={settings.groupByType}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          groupByType: e.target.checked,
                        })
                      }
                      className="rounded border-input"
                    />
                    <span className="text-sm">
                      Group by semantic commit types
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Create Button */}
          <div className="flex justify-end">
            <button
              onClick={() => void handleCreateProject()}
              disabled={loading}
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Project"
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
