"use client";

import { useSession } from "next-auth/react";
import { ArrowLeft, User, Github, Key } from "lucide-react";
import Link from "next/link";

export default function SettingsPage() {
  const { data: session } = useSession();

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
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account and preferences
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="flex items-center gap-4">
              {session?.user?.image && (
                <img
                  src={session.user.image}
                  alt={session.user.name || "Profile"}
                  className="h-16 w-16 rounded-full"
                />
              )}
              <div>
                <div className="font-medium">{session?.user?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {session?.user?.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Integration */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h2 className="text-xl font-semibold">GitHub Integration</h2>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
              <div className="font-medium">Connected Account</div>
              <div className="text-sm text-muted-foreground">
                Your GitHub account is connected and syncing repositories
              </div>
            </div>
            <button className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              Sync Repositories
            </button>
          </div>
        </div>

        {/* API Keys */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            <h2 className="text-xl font-semibold">API Keys</h2>
          </div>
          <div className="rounded-lg border bg-card p-6">
            <div className="mb-4">
              <div className="font-medium">Your API Keys</div>
              <div className="text-sm text-muted-foreground">
                Use these keys to access the Changelog API
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-md border bg-muted p-4">
                <div className="mb-2 text-sm font-medium">Production Key</div>
                <div className="font-mono text-sm text-muted-foreground">
                  ••••••••••••••••
                </div>
              </div>
              <button className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                Generate New Key
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
