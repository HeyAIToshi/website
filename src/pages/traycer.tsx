"use client";
import React from "react";
import { motion } from "framer-motion";
import { HiArrowRight, HiCommandLine } from "react-icons/hi2";
import { IconBrain, IconCode, IconRobot } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

export default function TraycerLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 dark:bg-neutral-950">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur-md z-50 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between p-4 md:p-6 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <IconRobot className="h-8 w-8 text-neutral-900 dark:text-white" />
            <span className="font-semibold text-xl">Traycer AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-neutral-600 dark:text-neutral-400">
            <a href="#features" className="hover:text-neutral-900 dark:hover:text-white transition">Features</a>
            <a href="#pricing" className="hover:text-neutral-900 dark:hover:text-white transition">Pricing</a>
            <a href="#docs" className="hover:text-neutral-900 dark:hover:text-white transition">Docs</a>
          </div>
          <button className="px-4 py-2 rounded-lg bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition dark:bg-white dark:text-black dark:hover:bg-neutral-200">
            Install Extension
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 pt-24 mt-24 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto space-y-8"
        >
          <div className="flex items-center justify-center gap-2 text-sm bg-neutral-900 text-white dark:bg-white dark:text-black w-fit mx-auto px-4 py-2 rounded-full">
            <HiCommandLine className="h-4 w-4" />
            <span>Your AI pair programmer is here</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Write better code with
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text"> AI assistance</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Traycer assists in planning, implementing, and reviewing code changes directly within Visual Studio Code. Focus on writing better code while Traycer handles the rest.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-black font-medium hover:bg-neutral-800 dark:hover:bg-neutral-200 transition flex items-center gap-2 group w-full sm:w-auto justify-center">
              Install for VSCode
              <HiArrowRight className="group-hover:translate-x-1 transition" />
            </button>
            <button className="px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-900 transition w-full sm:w-auto">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Code Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative mt-20 w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl"
        >
          <div className="bg-[#1E1E1E] text-white p-4 text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <div className="h-3 w-3 rounded-full bg-yellow-500" />
                <div className="h-3 w-3 rounded-full bg-green-500" />
              </div>
              <span className="ml-2 text-neutral-400">index.tsx</span>
            </div>
            <div className="flex items-center gap-2 text-xs bg-neutral-800 px-2 py-1 rounded">
              <IconRobot className="h-4 w-4" />
              <span>Traycer Active</span>
            </div>
          </div>
          <div className="bg-[#1E1E1E] p-6 text-sm font-mono text-neutral-200 overflow-x-auto">
            <pre className="language-typescript">
              {`// 🤖 Traycer: I suggest optimizing this function for better performance
function processData(items: DataItem[]): Result[] {
  // Using map instead of forEach for immutability
  return items.map(item => ({
    id: item.id,
    value: calculateValue(item),
    timestamp: Date.now()
  }));
}

// 🤖 Traycer: Consider adding error handling here
function calculateValue(item: DataItem): number {
  if (!item.raw) {
    throw new Error('Raw value is required');
  }
  return item.raw * 1.5;
}`}
            </pre>
          </div>
        </motion.div>
      </main>

      {/* Features Grid */}
      <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto w-full" id="features">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "p-6 rounded-xl",
                "bg-white dark:bg-neutral-900",
                "border border-neutral-200 dark:border-neutral-800"
              )}
            >
              <feature.icon className="h-8 w-8 mb-4 text-purple-600" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-neutral-600 dark:text-neutral-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "AI-Powered Suggestions",
    description: "Get real-time code suggestions and improvements as you type, powered by advanced AI models.",
    icon: IconBrain
  },
  {
    title: "Code Reviews",
    description: "Automated code reviews that catch bugs, suggest optimizations, and ensure best practices.",
    icon: IconCode
  },
  {
    title: "Smart Refactoring",
    description: "Intelligent refactoring suggestions to improve code quality and maintainability.",
    icon: IconRobot
  }
];