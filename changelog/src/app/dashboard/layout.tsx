import { Suspense } from "react";
import { type Metadata } from "next";
import { auth } from "@/server/auth";
import Link from "next/link";
import { UserButton } from "@/components/auth/user-button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard | Changelog",
  description: "Manage your changelogs and projects",
};

// Navigation items for the sidebar
const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: "🏠" },
  { name: "Settings", href: "/dashboard/settings", icon: "⚙️" },
];

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    return null; // Handle auth redirect in middleware
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out lg:block">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-center border-b">
            <Link
              href="/"
              className="text-xl font-bold text-gray-900 hover:text-gray-700"
            >
              Changelog
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                )}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User profile */}
          <div className="border-t p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <UserButton />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">
                    {session.user?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="sticky top-0 z-40 lg:hidden">
        <div className="flex h-16 items-center justify-between bg-white px-4 shadow-sm">
          <Link href="/dashboard" className="text-xl font-bold">
            Changelog
          </Link>
          <UserButton />
        </div>
      </div>

      {/* Main content */}
      <main className="lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Suspense
            fallback={
              <div className="flex h-32 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </main>
    </div>
  );
}
