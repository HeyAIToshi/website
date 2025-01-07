"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Github, GitBranch, Palette, Code } from "lucide-react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <main className="flex min-h-screen flex-col bg-background">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center space-y-8 px-4 text-center">
        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Beautiful Changelogs,{" "}
            <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Automatically
            </span>
          </h1>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
            Generate and maintain beautiful changelogs for your projects.
            Connect your GitHub repository and let us handle the rest.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          {session?.user ? (
            <Link
              href="/dashboard"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Go to Dashboard
            </Link>
          ) : (
            <button
              onClick={() => signIn("github")}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Github className="h-4 w-4" />
              Sign in with GitHub
            </button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto grid gap-8 py-20 md:grid-cols-3">
        <div className="space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <GitBranch className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Git Integration</h3>
          <p className="text-muted-foreground">
            Connect your GitHub repository and automatically generate changelogs
            from your commits.
          </p>
        </div>
        <div className="space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Palette className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Beautiful Templates</h3>
          <p className="text-muted-foreground">
            Choose from a variety of beautiful templates or create your own
            custom design.
          </p>
        </div>
        <div className="space-y-2">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Code className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-xl font-semibold">Easy Integration</h3>
          <p className="text-muted-foreground">
            Embed your changelog anywhere with our API or use our React
            component.
          </p>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="border-t bg-muted/50">
        <div className="container mx-auto py-20">
          <h2 className="mb-12 text-center text-3xl font-bold">How it Works</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="relative space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                1
              </div>
              <h3 className="font-semibold">Sign In</h3>
              <p className="text-sm text-muted-foreground">
                Connect with your GitHub account to get started.
              </p>
            </div>
            <div className="relative space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                2
              </div>
              <h3 className="font-semibold">Connect Repository</h3>
              <p className="text-sm text-muted-foreground">
                Select the repository you want to generate changelogs for.
              </p>
            </div>
            <div className="relative space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                3
              </div>
              <h3 className="font-semibold">Configure</h3>
              <p className="text-sm text-muted-foreground">
                Choose your template and customize your changelog settings.
              </p>
            </div>
            <div className="relative space-y-2">
              <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                4
              </div>
              <h3 className="font-semibold">Generate</h3>
              <p className="text-sm text-muted-foreground">
                Generate and embed your changelog anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
