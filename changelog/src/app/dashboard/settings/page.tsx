"use client";

import { useSession } from "next-auth/react";
import {
  ArrowLeft,
  User,
  Github,
  Key,
  Loader2,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SettingsPage() {
  const { data: session } = useSession();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isGeneratingKey, setIsGeneratingKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const dummyApiKey = "sk-changelog-xxxxxxxxxxxx";

  const handleSync = async () => {
    setIsSyncing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("Repositories synced successfully!");
    setIsSyncing(false);
  };

  const handleGenerateKey = async () => {
    setIsGeneratingKey(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success("New API key generated!");
    setIsGeneratingKey(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(dummyApiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("API key copied to clipboard!");
  };

  return (
    <div className="container mx-auto max-w-4xl py-10">
      {/* Header */}
      <div className="mb-8 space-y-4">
        <Link
          href="/dashboard"
          className="group mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Dashboard
        </Link>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-lg text-muted-foreground">
            Manage your account, integrations, and API access
          </p>
        </div>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* Profile Section */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <User className="h-5 w-5" />
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your personal information</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              {session?.user?.image && (
                <div className="group relative">
                  <img
                    src={session.user.image}
                    alt={session.user.name ?? "Profile"}
                    className="h-16 w-16 rounded-full ring-2 ring-primary/20 ring-offset-2 ring-offset-background transition-all group-hover:ring-primary/40"
                  />
                  <div className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <p className="text-xs">Change</p>
                  </div>
                </div>
              )}
              <div className="space-y-1">
                <div className="text-lg font-medium">{session?.user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {session?.user?.email}
                </div>
                <Badge variant="secondary" className="mt-2">
                  Free Plan
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* GitHub Integration */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <Github className="h-5 w-5" />
            <div>
              <CardTitle>GitHub Integration</CardTitle>
              <CardDescription>Manage your GitHub connection</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Connected Account</div>
                  <div className="text-sm text-muted-foreground">
                    Your GitHub account is connected and syncing repositories
                  </div>
                </div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleSync}
                        disabled={isSyncing}
                      >
                        {isSyncing ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Syncing...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Sync Now
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Sync your GitHub repositories</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card className="transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center gap-2">
            <Key className="h-5 w-5" />
            <div>
              <CardTitle>API Keys</CardTitle>
              <CardDescription>Manage your API access</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
                <div className="flex items-center justify-between">
                  <div className="font-medium">Production API Key</div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowKey(!showKey)}
                  >
                    {showKey ? "Hide" : "Show"}
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded-md bg-background px-3 py-2 font-mono text-sm">
                    {showKey ? dummyApiKey : "•".repeat(24)}
                  </code>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={copyToClipboard}
                        >
                          {copied ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy API key</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Last generated 7 days ago
                </div>
                <Button
                  variant="default"
                  onClick={handleGenerateKey}
                  disabled={isGeneratingKey}
                >
                  {isGeneratingKey ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate New Key"
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
