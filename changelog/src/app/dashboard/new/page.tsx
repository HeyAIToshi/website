"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Github,
  ArrowLeft,
  RefreshCw,
  Settings2,
  Check,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

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

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
  }),
};

type Step = "repository" | "configure";

export default function NewProjectPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("repository");
  const [direction, setDirection] = useState(0);
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

  const handleNext = () => {
    if (currentStep === "repository" && selectedRepo) {
      setDirection(1);
      setCurrentStep("configure");
    }
  };

  const handleBack = () => {
    if (currentStep === "configure") {
      setDirection(-1);
      setCurrentStep("repository");
    }
  };

  const progressPercentage = currentStep === "repository" ? 50 : 100;

  return (
    <div className="relative min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto max-w-4xl py-10"
      >
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/dashboard"
            className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold tracking-tight"
          >
            Add New Project
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-muted-foreground"
          >
            Connect a GitHub repository to start generating changelogs
          </motion.p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <Progress value={progressPercentage} className="h-2" />
          <div className="mt-2 flex justify-between text-sm text-muted-foreground">
            <span
              className={
                currentStep === "repository" ? "font-medium text-primary" : ""
              }
            >
              1. Select Repository
            </span>
            <span
              className={
                currentStep === "configure" ? "font-medium text-primary" : ""
              }
            >
              2. Configure Settings
            </span>
          </div>
        </div>

        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <Alert variant="destructive">
                <AlertDescription className="whitespace-pre-line">
                  {error}
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          {currentStep === "repository" ? (
            <motion.div
              key="repository"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.2 },
              }}
            >
              {/* Repository Selection */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Github className="h-5 w-5 text-muted-foreground" />
                      <CardTitle>Select Repository</CardTitle>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => void fetchRepositories()}
                      disabled={loading}
                    >
                      <RefreshCw
                        className={`h-4 w-4 ${loading ? "animate-spin" : ""}`}
                      />
                      <span className="ml-2">Refresh</span>
                    </Button>
                  </div>
                  <CardDescription>
                    Choose a GitHub repository to generate changelogs for
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <motion.div
                    variants={container}
                    initial="hidden"
                    animate="show"
                    className="scrollbar-thin grid max-h-[60vh] gap-3 overflow-y-auto pr-2"
                  >
                    {loading ? (
                      // Loading skeletons
                      Array.from({ length: 3 }).map((_, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 rounded-lg border p-4"
                        >
                          <Skeleton className="h-5 w-5 rounded-full" />
                          <div className="flex-1 space-y-2">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-3 w-[160px]" />
                          </div>
                        </div>
                      ))
                    ) : repositories.length > 0 ? (
                      repositories.map((repo) => (
                        <motion.button
                          key={repo.id}
                          variants={item}
                          onClick={() => setSelectedRepo(repo)}
                          className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-all hover:bg-accent hover:shadow-sm ${
                            selectedRepo?.id === repo.id
                              ? "border-primary bg-accent shadow-sm"
                              : ""
                          }`}
                        >
                          <Github className="mt-1 h-5 w-5 text-muted-foreground" />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate font-medium">
                                {repo.name}
                              </span>
                              {selectedRepo?.id === repo.id && (
                                <Check className="h-4 w-4 shrink-0 text-primary" />
                              )}
                            </div>
                            {repo.description && (
                              <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                                {repo.description}
                              </p>
                            )}
                            <div className="mt-2 flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs">
                                Updated{" "}
                                {new Date(repo.updatedAt).toLocaleDateString()}
                              </Badge>
                            </div>
                          </div>
                        </motion.button>
                      ))
                    ) : (
                      <div className="p-8 text-center text-muted-foreground">
                        <Github className="mx-auto mb-3 h-8 w-8 opacity-50" />
                        <p>No repositories found</p>
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="configure"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 100, damping: 20 },
                opacity: { duration: 0.2 },
              }}
            >
              {/* Configuration */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Settings2 className="h-5 w-5 text-muted-foreground" />
                    <CardTitle>Configure Changelog</CardTitle>
                  </div>
                  <CardDescription>
                    Customize how your changelog will be generated
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Selected Repository Preview */}
                  {selectedRepo && (
                    <div className="rounded-lg border bg-muted/50 p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Github className="h-4 w-4" />
                        <span className="font-medium text-foreground">
                          {selectedRepo.name}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Template Selection */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Changelog Template</h3>
                    <RadioGroup
                      value={settings.template}
                      onValueChange={(value) =>
                        setSettings({
                          ...settings,
                          template: value as typeof settings.template,
                        })
                      }
                      className="grid gap-2"
                    >
                      <Label
                        htmlFor="keep-a-changelog"
                        className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                      >
                        <RadioGroupItem
                          value="keep-a-changelog"
                          id="keep-a-changelog"
                        />
                        <div className="flex-1">
                          <p className="font-medium">Keep a Changelog</p>
                          <p className="text-sm text-muted-foreground">
                            Follow the Keep a Changelog format with clear
                            sections for changes
                          </p>
                        </div>
                      </Label>
                      <Label
                        htmlFor="semantic"
                        className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                      >
                        <RadioGroupItem value="semantic" id="semantic" />
                        <div className="flex-1">
                          <p className="font-medium">Semantic Versioning</p>
                          <p className="text-sm text-muted-foreground">
                            Organize changes based on semantic version
                            increments
                          </p>
                        </div>
                      </Label>
                      <Label
                        htmlFor="custom"
                        className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent"
                      >
                        <RadioGroupItem value="custom" id="custom" />
                        <div className="flex-1">
                          <p className="font-medium">Custom Template</p>
                          <p className="text-sm text-muted-foreground">
                            Use your own custom changelog format
                          </p>
                        </div>
                      </Label>
                    </RadioGroup>
                  </div>

                  {/* Generation Settings */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Generation Settings</h3>
                    <div className="grid gap-3">
                      <Label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent">
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
                        <div className="flex-1">
                          <p className="font-medium">
                            Auto-generate on new commits
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Automatically update changelog when new commits are
                            pushed
                          </p>
                        </div>
                      </Label>
                      <Label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent">
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
                        <div className="flex-1">
                          <p className="font-medium">Include commit links</p>
                          <p className="text-sm text-muted-foreground">
                            Add links to commits in the changelog entries
                          </p>
                        </div>
                      </Label>
                      <Label className="flex cursor-pointer items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-accent">
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
                        <div className="flex-1">
                          <p className="font-medium">Group by commit type</p>
                          <p className="text-sm text-muted-foreground">
                            Organize changes by semantic commit types
                          </p>
                        </div>
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex gap-2">
        {currentStep === "configure" && (
          <Button
            variant="outline"
            onClick={handleBack}
            size="lg"
            className="shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        {currentStep === "repository" ? (
          <Button
            onClick={handleNext}
            disabled={!selectedRepo}
            size="lg"
            className="shadow-lg"
          >
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={() => void handleCreateProject()}
            disabled={loading}
            size="lg"
            className="shadow-lg"
          >
            {loading ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              "Create Project"
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
