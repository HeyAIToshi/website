"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  Trash2,
  Save,
  Settings2,
  GitBranch,
} from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

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
      <div className="container mx-auto space-y-6 py-10">
        <div className="space-y-4">
          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
          <div className="h-8 w-96 animate-pulse rounded bg-muted" />
          <div className="h-4 w-72 animate-pulse rounded bg-muted" />
        </div>
        <div className="grid gap-6">
          {[1, 2].map((i) => (
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
          href={`/dashboard/projects/${projectId}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Project
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">
            Project Settings
          </h1>
          <p className="text-lg text-muted-foreground">
            Configure how changelogs are generated for {project.name}
          </p>
        </div>
      </div>

      {/* Settings Form */}
      <div className="grid gap-6">
        {/* Template Selection */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Settings2 className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Changelog Template</CardTitle>
            </div>
            <CardDescription>
              Choose how your changelog should be formatted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={settings.template}
              onValueChange={(value) =>
                setSettings({
                  ...settings,
                  template: value as ProjectSettings["template"],
                })
              }
              className="grid gap-4"
            >
              <div className="flex items-center space-x-4 rounded-md border p-4 transition-colors hover:bg-muted/50">
                <RadioGroupItem
                  value="keep-a-changelog"
                  id="keep-a-changelog"
                />
                <Label
                  htmlFor="keep-a-changelog"
                  className="flex cursor-pointer flex-col gap-1"
                >
                  <span className="font-semibold">Keep a Changelog</span>
                  <span className="text-sm text-muted-foreground">
                    Follow the Keep a Changelog format with clear sections for
                    changes
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4 transition-colors hover:bg-muted/50">
                <RadioGroupItem value="semantic" id="semantic" />
                <Label
                  htmlFor="semantic"
                  className="flex cursor-pointer flex-col gap-1"
                >
                  <span className="font-semibold">Semantic Versioning</span>
                  <span className="text-sm text-muted-foreground">
                    Organize changes based on semantic version increments
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-4 rounded-md border p-4 transition-colors hover:bg-muted/50">
                <RadioGroupItem value="custom" id="custom" />
                <Label
                  htmlFor="custom"
                  className="flex cursor-pointer flex-col gap-1"
                >
                  <span className="font-semibold">Custom Template</span>
                  <span className="text-sm text-muted-foreground">
                    Use your own custom changelog format
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Generation Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-muted-foreground" />
              <CardTitle>Generation Settings</CardTitle>
            </div>
            <CardDescription>
              Configure how changelogs are generated
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Auto-generate on new commits</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically generate changelogs when new commits are pushed
                </p>
              </div>
              <Switch
                checked={settings.autoGenerate}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    autoGenerate: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Include commit links</Label>
                <p className="text-sm text-muted-foreground">
                  Add links to commits in the changelog entries
                </p>
              </div>
              <Switch
                checked={settings.includeLinks}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    includeLinks: checked,
                  })
                }
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between space-x-4">
              <div className="flex-1 space-y-1">
                <Label>Group by semantic type</Label>
                <p className="text-sm text-muted-foreground">
                  Group changes by their semantic commit types
                </p>
              </div>
              <Switch
                checked={settings.groupByType}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    groupByType: checked,
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button
                disabled={deleting}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-md border border-destructive bg-destructive/10 px-4 text-sm font-medium text-destructive ring-offset-background transition-colors hover:bg-destructive hover:text-destructive-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <Trash2 className="h-4 w-4" />
                Delete Project
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  project and all its changelogs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => void handleDeleteProject()}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Delete Project
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

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
