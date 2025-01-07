"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { ArrowLeft, Trash2, Save } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  description: string | null;
  repositoryUrl: string;
  settings: string;
}

interface ProjectSettings {
  template: "keep-a-changelog" | "semantic" | "custom";
  autoGenerate: boolean;
  includeLinks: boolean;
  groupByType: boolean;
}

export default function ProjectSettingsPage() {
  const params = useParams();
  const projectId = params?.id as string;
  const router = useRouter();
  const { data: session } = useSession();
  const [project, setProject] = useState<Project | null>(null);
  const [settings, setSettings] = useState<ProjectSettings>({
    template: "keep-a-changelog",
    autoGenerate: true,
    includeLinks: true,
    groupByType: true,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (projectId) {
      void fetchProjectData();
    }
  }, [projectId]);

  async function fetchProjectData() {
    try {
      setLoading(true);
      const response = await fetch(`/api/projects/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
        setSettings(JSON.parse(data.settings));
      }
    } catch (error) {
      console.error("Error fetching project:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleSaveSettings() {
    try {
      setSaving(true);
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ settings }),
      });

      if (response.ok) {
        await fetchProjectData();
      }
    } catch (error) {
      console.error("Error saving settings:", error);
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteProject() {
    if (!window.confirm("Are you sure you want to delete this project?")) {
      return;
    }

    try {
      setDeleting(true);
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    } finally {
      setDeleting(false);
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
          href={`/dashboard/projects/${projectId}`}
          className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Project
        </Link>
        <h1 className="text-3xl font-bold">Project Settings</h1>
        <p className="text-muted-foreground">
          Configure how changelogs are generated for {project.name}
        </p>
      </div>

      {/* Settings Form */}
      <div className="space-y-6">
        {/* Template Selection */}
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <div>
            <h2 className="text-xl font-semibold">Changelog Template</h2>
            <p className="text-sm text-muted-foreground">
              Choose how your changelog should be formatted
            </p>
          </div>
          <select
            value={settings.template}
            onChange={(e) =>
              setSettings({
                ...settings,
                template: e.target.value as ProjectSettings["template"],
              })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <option value="keep-a-changelog">Keep a Changelog</option>
            <option value="semantic">Semantic Versioning</option>
            <option value="custom">Custom Template</option>
          </select>
        </div>

        {/* Generation Settings */}
        <div className="space-y-4 rounded-lg border bg-card p-6">
          <div>
            <h2 className="text-xl font-semibold">Generation Settings</h2>
            <p className="text-sm text-muted-foreground">
              Configure how changelogs are generated
            </p>
          </div>
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
              <span className="text-sm">Auto-generate on new commits</span>
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
              <span className="text-sm">Include commit links in changelog</span>
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
              <span className="text-sm">Group by semantic commit types</span>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => void handleDeleteProject()}
            disabled={deleting}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-destructive bg-destructive/10 px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete Project
          </button>
          <button
            onClick={() => void handleSaveSettings()}
            disabled={saving}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            {saving ? (
              <>
                <Save className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
