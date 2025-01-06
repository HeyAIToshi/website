"use client";
import { motion } from "framer-motion";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { PlayIcon, LoaderCircle } from "lucide-react";
import { HoverVideoPlayer } from "@/components/ui/video-card";

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

export default function TraycerLanding() {
  const { theme } = useTheme();

  const features = [
    {
      title: "AI-Powered Code Changes",
      description:
        "Transform your codebase with AI that plans, implements, and reviews complex changes in minutes, not hours.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-blue-600 dark:text-blue-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3M12 21V17M12 3V7M21 12H17M7 12H3M18.3639 18.364L15.5355 15.5355M15.5355 8.46447L18.3639 5.63604M5.63604 18.364L8.46447 15.5355M8.46447 8.46447L5.63604 5.63604"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Instant Code Reviews",
      description:
        "Get real-time, context-aware feedback that catches issues before they reach production, like having a senior engineer by your side.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-600 dark:text-green-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 9H15M9 12H15M9 15H12M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Simple Natural Language Commands",
      description:
        "Just describe what you want to change in plain English - Traycer handles the rest with precision and care.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 dark:from-yellow-500/30 dark:to-orange-500/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-yellow-600 dark:text-yellow-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 9H16M8 13H14M8 17H11M7.2 4H16.8C17.9201 4 18.4802 4 18.908 4.21799C19.2843 4.40973 19.5903 4.71569 19.782 5.09202C20 5.51984 20 6.07989 20 7.2V16.8C20 17.9201 20 18.4802 19.782 18.908C19.5903 19.2843 19.2843 19.5903 18.908 19.782C18.4802 20 17.9201 20 16.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V7.2C4 6.0799 4 5.51984 4.21799 5.09202C4.40973 4.71569 4.71569 4.40973 5.09202 4.21799C5.51984 4 6.0799 4 7.2 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Works With Your Stack",
      description:
        "Seamlessly supports all major languages and frameworks, adapting to your codebase's patterns and conventions.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 dark:from-red-500/30 dark:to-pink-500/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-red-600 dark:text-red-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 7L7 17M7 7L17 17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Privacy-First Design",
      description:
        "Your code never leaves your machine. All operations run locally with optional privacy mode for sensitive projects.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 dark:from-indigo-500/30 dark:to-violet-500/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-indigo-600 dark:text-indigo-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 14.5V16.5M7 10.0288C7.47142 10.0288 7.91906 9.827 8.23357 9.47276L12 5.5L15.7664 9.47276C16.0809 9.827 16.5286 10.0288 17 10.0288C18.1046 10.0288 19 9.13338 19 8.02881V7.5L15.2336 3.52724C14.9191 3.173 14.4714 2.97119 14 2.97119H10C9.52858 2.97119 9.08094 3.173 8.76643 3.52724L5 7.5V8.02881C5 9.13338 5.89543 10.0288 7 10.0288ZM12 16.5C5.5 16.5 5.5 21 5.5 21H18.5C18.5 21 18.5 16.5 12 16.5Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Native VS Code Integration",
      description:
        "Powerful AI assistance right in your editor, with native commands and keyboard shortcuts you already know.",
      icon: (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/20 dark:from-cyan-500/30 dark:to-teal-500/30 flex items-center justify-center">
          <svg
            className="w-6 h-6 text-cyan-600 dark:text-cyan-400"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 12V18.967C3 19.907 3.93967 20.5439 4.8 20.1L11.4 17.1M3 12V5.033C3 4.093 3.93967 3.45612 4.8 3.9L11.4 6.9M3 12L11.4 15M11.4 15L21 19.5M11.4 15L21 10.5M21 19.5V4.5L11.4 9M21 19.5L11.4 6.9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      ),
    },
  ];

  const testimonials = [
    {
      quote:
        "Traycer is like having a 10x engineer on your team. What used to take days of refactoring now takes minutes.",
      author: "Sarah Chen",
      role: "Engineering Lead at TechCorp",
    },
    {
      quote:
        "The real-time code reviews have caught countless issues before they hit production. It's transformed how our team writes code.",
      author: "Michael Rodriguez",
      role: "Senior Developer at StartupX",
    },
    {
      quote:
        "Being able to describe changes in plain English and have them automatically implemented has doubled our team's productivity.",
      author: "Emily Johnson",
      role: "CTO at DevTools Inc",
    },
  ];

  const faqs = [
    {
      question: "How does Traycer work?",
      answer:
        "Traycer uses advanced AI to understand your codebase and implement changes. Simply describe what you want to change in natural language, and Traycer handles the rest - from planning to implementation to review.",
    },
    {
      question: "Is my code secure?",
      answer:
        "Absolutely! Traycer runs 100% locally on your machine and never sends your code to external servers. For sensitive projects, you can enable privacy mode which ensures complete isolation.",
    },
    {
      question: "What languages and frameworks are supported?",
      answer:
        "Traycer works with all major programming languages and frameworks including JavaScript/TypeScript, Python, Java, Go, Ruby, and more. It automatically adapts to your codebase's specific patterns.",
    },
    {
      question: "Can I try it for free?",
      answer:
        "Yes! Start with our free tier which includes unlimited usage for open-source projects. No credit card required. For commercial use, we offer a 14-day free trial of our Pro features.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#020817] transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center justify-center p-1 sm:p-4 relative overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white dark:from-[#0c1b3b] dark:via-[#0a1429] dark:to-[#020817]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(1,65,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.05),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(1,65,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.4)_100%)]" />
        </div>

        {/* Navbar */}
        <nav className="flex items-center justify-between p-1 sm:p-2 md:p-3 max-w-7xl mx-auto w-full z-10 backdrop-blur-sm bg-white/50 dark:bg-[#0c1b3b]/10 rounded-xl sm:rounded-2xl my-2 sm:my-4 border border-gray-200/70 dark:border-[#1a2b4b]/70 shadow-lg shadow-black/[0.08] dark:shadow-blue-500/[0.08]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 w-[120px]"
          >
            <span className="font-semibold text-lg md:text-xl text-black dark:text-white">
              traycer
            </span>
          </motion.div>
          <div className="hidden md:flex items-center gap-12 text-sm text-gray-600 dark:text-blue-100/70">
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white transition-colors"
            >
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-4 w-[120px] justify-end">
            <ThemeToggle />
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-black/5 dark:bg-blue-500/20 text-black dark:text-blue-100 text-sm font-medium hover:bg-black/10 dark:hover:bg-blue-500/30 transition-colors border border-black/10 dark:border-blue-500/30"
            >
              Login
            </motion.a>
          </div>
          <div className="flex md:hidden items-center">
            <button className="p-2 text-gray-600 dark:text-blue-100/70 hover:text-black dark:hover:text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 text-center max-w-5xl mx-auto space-y-6 sm:space-y-8 pt-6 pb-4 sm:pb-8 sm:pt-10 px-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-blue-500/20 text-black dark:text-blue-100 font-medium border border-black/10 dark:border-blue-500/30">
                New Release
              </span>
              <span className="text-gray-600 dark:text-blue-100/70">
                Introducing AI-powered code reviews →
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-black dark:text-white">
              Transform Your Code <br />
              <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                With AI Magic
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-blue-100/70 max-w-3xl mx-auto">
              Experience the future of coding with Traycer. Write better code
              faster, catch bugs earlier, and let AI handle the heavy lifting.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="vscode:extension/cursor.cursor"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-black dark:bg-blue-500 text-white text-base sm:text-lg font-medium transition-all duration-300 flex items-center gap-2 w-full sm:w-auto justify-center shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] overflow-hidden"
            >
              <span className="relative z-10">Install Now - It's Free</span>
              <HiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-blue-600 dark:to-blue-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)] group-hover:opacity-70 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-xl text-black dark:text-white text-lg font-medium transition-all duration-300 flex items-center gap-2 border-2 border-black/10 dark:border-blue-500/30 hover:border-black/30 dark:hover:border-blue-500/50"
            >
              <PlayIcon className="w-5 h-5" />
              Watch Demo
            </motion.a>
          </motion.div>

          <motion.div
            className="pt-8 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-blue-100/70">
              <div className="flex items-center gap-2">
                <HiCheck className="text-black dark:text-blue-400" />
                <span>100% Free for Open Source</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="text-black dark:text-blue-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <HiCheck className="text-black dark:text-blue-400" />
                <span>Works Offline</span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-blue-100/70">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-blue-400 dark:to-blue-600 border-2 border-white dark:border-[#020817]"
                  />
                ))}
              </div>
              <p>Trusted by 10,000+ developers</p>
            </div>
          </motion.div>
        </div>

        {/* Video Sections */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-16 pb-8 sm:pb-16 sm:pt-24 space-y-24 sm:space-y-32">
          {/* Tasks Video Section */}
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12">
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white leading-tight">
                Transform Your Codebase <br />
                <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                  with AI
                </span>
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-blue-100/70">
                Just describe what you want to change in plain English. Traycer
                handles complex refactoring, migrations, and codebase-wide
                changes with confidence.
              </p>
            </motion.div>
            <motion.div
              className="flex-1 rounded-2xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-blue-500/10 border border-gray-200/50 dark:border-[#1a2b4b]/50 relative group hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-blue-500/20 transition-all duration-300"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent dark:from-blue-500/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/task.gif"
                  alt="Task demonstration"
                  className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-300"
                  style={{
                    aspectRatio: "16/9",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>
          </div>

          {/* Review Video Section */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
            <motion.div
              className="flex-1 space-y-8"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-bold text-black dark:text-white leading-tight">
                Real-Time <br />
                <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                  Code Reviews
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-blue-100/70">
                Get instant, context-aware feedback as you code. It's like
                having a senior engineer always watching over your shoulder.
              </p>
            </motion.div>
            <motion.div
              className="flex-1 rounded-2xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-blue-500/10 border border-gray-200/50 dark:border-[#1a2b4b]/50 relative group hover:shadow-2xl hover:shadow-black/10 dark:hover:shadow-blue-500/20 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent dark:from-blue-500/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <motion.div
                initial={{ maxWidth: "54rem" }}
                whileHover={{ maxWidth: "74rem" }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                className="group relative flex flex-col overflow-hidden rounded-lg w-full h-full"
              >
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src="/review.gif"
                    alt="Review demonstration"
                    className="w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-300"
                    style={{
                      aspectRatio: "16/9",
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Statistics Section */}
        <section className="py-4 sm:py-8 w-full bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-[#0c1b3b]/50 dark:to-[#020817]/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2">
                  10k+
                </div>
                <div className="text-gray-600 dark:text-blue-100/70">
                  Active Users
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2">
                  1M+
                </div>
                <div className="text-gray-600 dark:text-blue-100/70">
                  Lines Enhanced
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2">
                  50+
                </div>
                <div className="text-gray-600 dark:text-blue-100/70">
                  Languages
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <div className="text-4xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2">
                  100%
                </div>
                <div className="text-gray-600 dark:text-blue-100/70">
                  Satisfaction
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-4 sm:py-8 w-full max-w-7xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-24"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white">
              Everything You Need to <br />
              <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                Code Faster
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-blue-100/70">
              Powerful features designed to transform your development workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl border border-gray-200/50 dark:border-[#1a2b4b]/50 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <div className="flex flex-col gap-6">
                  <div className="transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-black dark:text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-blue-100/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Integration Showcase */}
      <section className="py-4 sm:py-8 w-full max-w-7xl mx-auto px-4">
        <motion.div

          className="text-center space-y-8 mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white">
            Seamless{" "}
            <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
              Integrations
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-blue-100/70">
            Works with your favorite tools and frameworks
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: "VS Code", icon: "vscode.svg" },
            { name: "GitHub", icon: "github.svg" },
            { name: "GitLab", icon: "gitlab.svg" },
            { name: "Bitbucket", icon: "bitbucket.svg" },
            { name: "React", icon: "react.svg" },
            { name: "Vue", icon: "vue.svg" },
            { name: "Angular", icon: "angular.svg" },
            { name: "Node.js", icon: "nodejs.svg" },
          ].map((tool, index) => (
            <motion.div
              key={tool.name}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group"
            >
              <div className="aspect-square rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-[#1a2b4b] dark:to-[#0c1b3b] p-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <div className="w-12 h-12 text-gray-600 dark:text-blue-100/70" />
              </div>
              <div className="mt-4 text-center font-medium text-gray-900 dark:text-white">
                {tool.name}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-8 sm:py-16 w-full bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-[#0c1b3b]/50 dark:to-[#020817]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6 mb-24"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white">
              Loved by{" "}
              <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                Developers
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-blue-100/70">
              See what others are saying about Traycer
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm shadow-xl shadow-black/5 dark:shadow-blue-500/5 border border-gray-200/50 dark:border-[#1a2b4b]/50 space-y-6 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 group"
              >
                <p className="text-lg text-gray-600 dark:text-blue-100/70 italic leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-black to-gray-800 dark:from-blue-500 dark:to-blue-600 shadow-lg shadow-black/20 dark:shadow-blue-500/20" />
                  <div>
                    <p className="font-semibold text-lg text-black dark:text-white">
                      {testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-blue-100/70">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* VS Code Integration Section */}
      <section className="py-16 sm:py-32 w-full bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-[#0c1b3b]/50 dark:to-[#020817]/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white">
              Get Started in{" "}
              <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                Seconds
              </span>
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <p className="text-lg sm:text-xl text-gray-600 dark:text-blue-100/70">
                Install Traycer directly in VS Code and transform how you write
                code. No complex setup, no configuration needed.
              </p>
              <motion.div
                className="space-y-6 text-lg text-gray-600 dark:text-blue-100/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                  <HiCheck className="text-2xl text-black dark:text-blue-400" />
                  <span>One-click installation in VS Code</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                  <HiCheck className="text-2xl text-black dark:text-blue-400" />
                  <span>Instant AI assistance with familiar commands</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                  <HiCheck className="text-2xl text-black dark:text-blue-400" />
                  <span>Works with your existing shortcuts and workflow</span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
                  <HiCheck className="text-2xl text-black dark:text-blue-400" />
                  <span>Free to get started - no credit card required</span>
                </div>
              </motion.div>
            </div>
            <motion.a
              href="vscode:extension/cursor.cursor"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-black dark:bg-blue-500 text-white text-lg font-medium transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] overflow-hidden"
            >
              <span className="relative z-10">Install Free Extension</span>
              <HiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-blue-600 dark:to-blue-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)] group-hover:opacity-70 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-32 w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white">
            Simple,{" "}
            <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
              Transparent
            </span>{" "}
            Pricing
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-blue-100/70">
            Get started free today - no credit card required
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
            {/* Free Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-2xl border border-gray-200/50 dark:border-[#1a2b4b]/50 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm space-y-6 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Free
              </h3>
              <div className="text-4xl font-bold text-black dark:text-white">
                $0
              </div>
              <p className="text-gray-600 dark:text-blue-100/70">
                Perfect for open-source development
              </p>
              <ul className="space-y-4 text-gray-600 dark:text-blue-100/70">
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Unlimited open-source usage</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>AI-powered code changes</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Real-time code reviews</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>5,000 lines/hour limit</span>
                </li>
              </ul>
              <motion.a
                href="vscode:extension/cursor.cursor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full px-4 py-3 rounded-xl bg-black dark:bg-blue-500 text-white text-lg font-medium transition-all duration-300 inline-block text-center shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] overflow-hidden"
              >
                <span className="relative z-10">Install Now</span>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-blue-600 dark:to-blue-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)] group-hover:opacity-70 transition-opacity duration-300" />
              </motion.a>
            </motion.div>

            {/* Pro Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-2xl border-2 border-black dark:border-blue-500 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm space-y-6 relative scale-105 shadow-[0_0_50px_rgba(0,0,0,0.2)] dark:shadow-[0_0_50px_rgba(59,130,246,0.3)]"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-black to-gray-800 dark:from-blue-500 dark:to-blue-600 text-white text-sm font-medium px-4 py-1 rounded-full shadow-lg shadow-black/20 dark:shadow-blue-500/20">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Pro
              </h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                $8
              </div>
              <p className="text-gray-600 dark:text-blue-100/70">
                /month (billed annually)
              </p>
              <ul className="space-y-4 text-gray-600 dark:text-blue-100/70">
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Everything in Free</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Unlimited private repos</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>12,500 lines/hour limit</span>
                </li>
              </ul>
              <motion.a
                href="vscode:extension/cursor.cursor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full px-4 py-3 rounded-xl bg-black dark:bg-blue-500 text-white text-lg font-medium transition-all duration-300 inline-block text-center shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] overflow-hidden"
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-blue-600 dark:to-blue-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)] group-hover:opacity-70 transition-opacity duration-300" />
              </motion.a>
            </motion.div>

            {/* Business Tier */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-8 rounded-2xl border border-gray-200/50 dark:border-[#1a2b4b]/50 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm space-y-6 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-black dark:text-white">
                Business
              </h3>
              <div className="text-4xl font-bold text-black dark:text-white">
                $16
              </div>
              <p className="text-gray-600 dark:text-blue-100/70">
                /user/month (billed annually)
              </p>
              <ul className="space-y-4 text-gray-600 dark:text-blue-100/70">
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Everything in Pro</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Team management</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>Enhanced privacy mode</span>
                </li>
                <li className="flex items-center gap-3">
                  <HiCheck className="text-black dark:text-blue-400 text-xl" />
                  <span>25,000 lines/hour/user</span>
                </li>
              </ul>
              <motion.a
                href="vscode:extension/cursor.cursor"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-full px-4 py-3 rounded-xl bg-black dark:bg-blue-500 text-white text-lg font-medium transition-all duration-300 inline-block text-center shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] overflow-hidden"
              >
                <span className="relative z-10">Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-blue-600 dark:to-blue-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)] group-hover:opacity-70 transition-opacity duration-300" />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-32 w-full max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-6 mb-24"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-black dark:text-white">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-blue-100/70">
            Everything you need to know about Traycer
          </p>
        </motion.div>

        <div className="grid gap-8 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-2xl border border-gray-200/50 dark:border-[#1a2b4b]/50 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm space-y-4 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              <h3 className="text-2xl font-bold text-black dark:text-white">
                {faq.question}
              </h3>
              <p className="text-lg text-gray-600 dark:text-blue-100/70 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
      <footer className="border-t border-gray-200/50 dark:border-[#1a2b4b]/50 transition-colors duration-300 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-semibold text-xl text-black dark:text-white bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                Traycer
              </span>
            </motion.div>
            <motion.div
              className="flex items-center gap-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="https://discord.gg/traycer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black dark:text-blue-100/70 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaDiscord className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://twitter.com/traycerAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black dark:text-blue-100/70 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a
                href="https://github.com/traycer"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black dark:text-blue-100/70 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaGithub className="w-6 h-6" />
              </motion.a>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-blue-100/70"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="hover:text-black dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Terms
              </motion.a>
              <motion.a
                href="#"
                className="hover:text-black dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Privacy
              </motion.a>
              <motion.a
                href="vscode:extension/cursor.cursor"
                className="font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Install Extension
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 text-center text-sm text-gray-600 dark:text-blue-100/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            © 2024 Traycer. Transform your coding experience today.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
