"use client";
import { motion } from "framer-motion";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
import { FaGithub, FaDiscord, FaTwitter } from "react-icons/fa";
import { Tweet } from "react-tweet";
import { cn } from "@/lib/utils";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";
import { PlayIcon, LoaderCircle } from "lucide-react";
import { HoverVideoPlayer } from "@/components/ui/video-card";
import { useState } from "react";

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
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

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
    <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center justify-center p-1 sm:p-4 relative overflow-hidden">
        {/* Enhanced Background gradients */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-white dark:from-black dark:via-[#0a0a0a] dark:to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(1,65,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(1,65,255,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.6)_100%)]" />
          {/* Add animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-r from-green-400/30 to-emerald-400/30 dark:from-green-500/20 dark:to-emerald-500/20 rounded-full blur-3xl"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* Enhanced Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-2 sm:px-4 md:px-6 p-1 sm:p-2 md:p-3 max-w-6xl mx-auto w-full backdrop-blur-lg bg-white/50 dark:bg-black/50 rounded-xl sm:rounded-2xl my-2 sm:my-4 border border-gray-200/70 dark:border-blue-500/20 shadow-lg shadow-black/[0.08] dark:shadow-blue-500/[0.08]">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 w-[120px]"
          >
            <span className="font-semibold text-lg md:text-xl text-black dark:text-white">
              AIToshi
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-12 text-sm text-gray-600 dark:text-blue-100/70"
          >
            <motion.a
              href="https://rovers-organization.gitbook.io/aitoshi"
              target="_blank"
              className="hover:text-black dark:hover:text-white transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>GitBook</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-blue-400 transition-all group-hover:w-full" />
            </motion.a>
            <motion.a
              href="https://medium.com/@aitoshixbt"
              target="_blank"
              className="hover:text-black dark:hover:text-white transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Blogs</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-blue-400 transition-all group-hover:w-full" />
            </motion.a>
            <motion.a
              href="https://x.com/solana"
              target="_blank"
              className="hover:text-black dark:hover:text-white transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>$AITOSHI</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black dark:bg-blue-400 transition-all group-hover:w-full" />
            </motion.a>
          </motion.div>
          <div className="flex items-center gap-4 w-[280px] justify-end">
            <ThemeToggle />
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-black/5 dark:bg-blue-500/20 text-black dark:text-blue-100 text-sm font-medium hover:bg-black/10 dark:hover:bg-blue-500/30 transition-colors border border-black/10 dark:border-blue-500/30"
            >
              Connect Wallet
            </motion.a>
          </div>
          <motion.button
            className="flex md:hidden items-center p-2 text-gray-600 dark:text-blue-100/70 hover:text-black dark:hover:text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
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
          </motion.button>
        </nav>

        {/* Enhanced Hero Section */}
        <div className="pb-30 relative z-10 text-center max-w-5xl mx-auto space-y-6 sm:space-y-8 pt-24 sm:pt-32 pb-4 sm:pb-8 px-4">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* <motion.div
              className="flex items-center justify-center gap-2 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="px-3 py-1 rounded-full bg-black/5 dark:bg-blue-500/20 text-black dark:text-blue-100 font-medium border border-black/10 dark:border-blue-500/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {" "}
              </motion.span>
              <motion.span
                className="text-gray-600 dark:text-blue-100/70 flex items-center gap-1"
                whileHover={{ x: 5 }}
              >
                {" "}
                <HiArrowRight className="inline-block" />
              </motion.span>
            </motion.div> */}
            <motion.h1
              className="text-4xl pt-20 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-black dark:text-white leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              AIToshi:{" "}
              <span className="relative">
                <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 blur" />
                <span className="relative bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-500 text-transparent bg-clip-text">
                  Everything Solana DeFAI
                </span>
              </span>
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-gray-600 dark:text-blue-100/70 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Stay ahead of DeFAI trend on Solana with AIToshi, your ultimate
              Solana DeFAI Buddy.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="https://x.com/solana"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-xl bg-black dark:bg-blue-600 text-white text-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-[0_0_30px_rgba(0,0,0,0.2)] dark:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:shadow-[0_0_50px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_0_50px_rgba(59,130,246,0.7)] overflow-hidden"
            >
              <span className="relative z-10">Explore</span>
              <HiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-800 dark:from-blue-600 dark:to-blue-500 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.3),transparent_70%)] group-hover:opacity-70 transition-opacity duration-300" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 rounded-xl text-black dark:text-white text-lg font-medium transition-all duration-300 flex items-center gap-2 border-2 border-black/10 dark:border-blue-500/30 hover:border-black/30 dark:hover:border-blue-500/50 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm"
            >
              <PlayIcon className="w-5 h-5" />
              Watch Demo
            </motion.a>
          </motion.div>

          {/* <motion.div
            className="pt-12 flex flex-col items-center gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600 dark:text-blue-100/70">
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <HiCheck className="text-black dark:text-blue-400" />
                <span>100% Free for Open Source</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <HiCheck className="text-black dark:text-blue-400" />
                <span>No Credit Card Required</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <HiCheck className="text-black dark:text-blue-400" />
                <span>Works Offline</span>
              </motion.div>
            </div>
            <motion.div
              className="flex items-center gap-4 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex -space-x-3">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-blue-400 dark:to-blue-600 border-2 border-white dark:border-[#020817] flex items-center justify-center text-white dark:text-blue-100 font-medium text-xs"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1 }}
                  >
                    {String.fromCharCode(65 + i)}
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-600 dark:text-blue-100/70 bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-200/50 dark:border-[#1a2b4b]/50">
                Trusted by 10,000+ developers
              </p>
            </motion.div>
          </motion.div> */}
        </div>

        {/* Twt Section */}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-16 pb-8 sm:pb-16 sm:pt-24 space-y-24 sm:space-y-32">
          <div className="max-w-6xl mx-auto mb-56 sm:mb-24 lg:mb-40 pt-16 lg:pt-20">
            <div className="mt-16 text-center mx-auto rounded-2xl p-8 ">
              <h2 className="font-2 text-4xl lg:text-6xl lg:leading-tight text-black dark:text-white font-semibold mb-6">
                Solana DeFAI agent will fulfill Missing Bitcoin Mission
              </h2>
              <a
                href="https://x.com/aeyakovenko/status/1835111527000817849"
                target="_blank"
                className="overflow-hidden w-full flex justify-center m-6 rounded-xl bg-white p-4"
              >
                <img
                  src="/L2 tweet.webp"
                  alt="Task demonstration"
                  className=" w-full h-full object-cover object-center transform group-hover:scale-[1.02] transition-transform duration-300"
                />
              </a>
            </div>
          </div>
        </div>
        {/* Ecosystem Sections */}
       

        {/* Statistics Section */}
        <section className="py-16 sm:py-24 w-full backdrop-blur-sm bg-white/50 dark:bg-black/50 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white/50 dark:from-black dark:via-[#0a0a0a] dark:to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(1,65,255,0.1),transparent_50%)]" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <motion.div className="p-8 rounded-2xl bg-white/50 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-blue-500/20 hover:border-black/50 dark:hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    10k+
                  </div>
                  <div className="text-gray-600 dark:text-blue-100/70">
                    Active Users
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-blue-500/20 hover:border-black/50 dark:hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 dark:from-green-500/10 dark:to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    1M+
                  </div>
                  <div className="text-gray-600 dark:text-blue-100/70">
                    Lines Enhanced
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-blue-500/20 hover:border-black/50 dark:hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 dark:from-yellow-500/10 dark:to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    50+
                  </div>
                  <div className="text-gray-600 dark:text-blue-100/70">
                    Languages
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -5 }}
                className="p-8 rounded-2xl bg-white/50 dark:bg-black/80 backdrop-blur-sm border border-gray-200/50 dark:border-blue-500/20 hover:border-black/50 dark:hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 dark:from-red-500/10 dark:to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <motion.div
                  className="relative z-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text mb-2 group-hover:scale-110 transition-transform duration-300">
                    100%
                  </div>
                  <div className="text-gray-600 dark:text-blue-100/70">
                    Satisfaction
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* DeFAI Research Section */}
        <section className="py-16 sm:py-32 w-full backdrop-blur-sm bg-white/50 dark:bg-black/50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(1,65,255,0.15),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6 mb-16"
            >
              <motion.span
                className="text-sm font-medium text-gray-600 dark:text-blue-100/70 bg-black/5 dark:bg-blue-500/20 px-4 py-2 rounded-full inline-block"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Research Tools
              </motion.span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-black dark:text-white">
                New to{" "}
                <span className="relative">
                  <span className="absolute -inset-1 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 blur" />
                  <span className="relative bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-500 text-transparent bg-clip-text">
                    DeFAI
                  </span>
                </span>
                ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-blue-100/70 max-w-2xl mx-auto">
                Everything you need to check to stay ahead in the DeFAI market
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* FlipsideCrypto Button */}
              <motion.a
                href="https://flipsidecrypto.xyz/tkvresearch/defai-watchtlist-7kafLw"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/30 dark:to-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-blue-600 dark:text-blue-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  FlipsideCrypto
                </h3>
                <p className="text-gray-600 dark:text-blue-100/70">
                  DeFAI Watchlist Dashboard
                </p>
              </motion.a>

              {/* Dropstab Button */}
              <motion.a
                href="https://dropstab.com/tab/defai"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 dark:from-green-500/30 dark:to-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-green-600 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12H15M9 16H12M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  Dropstab
                </h3>
                <p className="text-gray-600 dark:text-blue-100/70">
                  DeFAI Market Analysis
                </p>
              </motion.a>

              {/* CoinGecko Button */}
              <motion.a
                href="https://www.coingecko.com/en/categories/defai"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 dark:from-yellow-500/30 dark:to-orange-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  CoinGecko
                </h3>
                <p className="text-gray-600 dark:text-blue-100/70">
                  DeFAI Category Overview
                </p>
              </motion.a>

              {/* CoinMarketCap Button */}
              <motion.a
                href="https://coinmarketcap.com/view/defai/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group p-8 rounded-2xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-red-500/20 to-pink-500/20 dark:from-red-500/30 dark:to-pink-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-red-600 dark:text-red-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M13 7H7V13M17 17H11V11"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-black dark:text-white mb-2">
                  CoinMarketCap
                </h3>
                <p className="text-gray-600 dark:text-blue-100/70">
                  DeFAI Market Insights
                </p>
              </motion.a>
            </div>

            <div className="mt-16 max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <HiCheck className="text-2xl text-black dark:text-blue-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-blue-100/70">
                  Streamline your research on the DeFAI market and plan your
                  strategy effectively. Discover new projects through the
                  mentioned platforms.
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <HiCheck className="text-2xl text-black dark:text-blue-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-blue-100/70">
                  Monitor all leading dashboards in one place, capitalize on
                  emerging narratives, and stay ahead of the crowd.
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-black/50 dark:hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300"
              >
                <HiCheck className="text-2xl text-black dark:text-blue-400 flex-shrink-0" />
                <span className="text-gray-600 dark:text-blue-100/70">
                  In crypto, staying ahead of the curve is key—these platforms
                  will keep you informed and help you stay ahead.
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* why defai */}
        <motion.div
          className="mt-24 p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-black/5 to-black/0 dark:from-blue-500/10 dark:to-purple-500/5 border border-gray-200/50 dark:border-[#1a2b4b]/50 backdrop-blur-sm relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(59,130,246,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(1,65,255,0.2),transparent_50%)]" />

          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <motion.span
                className="inline-block px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 text-sm font-medium text-blue-800 dark:text-blue-200 border border-blue-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Industry Leaders on DeFAI
              </motion.span>
              <motion.h2
                className="text-3xl sm:text-4xl font-bold text-black dark:text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Why DeFAI is the Future of Finance
              </motion.h2>
              <motion.p
                className="text-lg text-gray-600 dark:text-blue-100/70 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Leading voices in crypto discuss how AI is revolutionizing DeFi
                through improved UX, intelligent automation, and enhanced
                accessibility
              </motion.p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Key Benefits Cards */}
              <motion.div
                className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="p-6 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-blue-500/50 transition-colors duration-300">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-blue-600 dark:text-blue-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M13 7H7V13M17 17H11V11"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                    Abstraction Layers
                  </h3>
                  <p className="text-gray-600 dark:text-blue-100/70">
                    Natural language interfaces and AI-driven UX making DeFi
                    accessible to everyone, regardless of technical expertise
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-blue-500/50 transition-colors duration-300">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-purple-600 dark:text-purple-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M9 19V13M9 13V5M9 13H15M15 19V13M15 13V5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                    Intelligent Automation
                  </h3>
                  <p className="text-gray-600 dark:text-blue-100/70">
                    Advanced AI agents that adapt to market conditions and
                    execute sophisticated trading strategies autonomously
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 hover:border-blue-500/50 transition-colors duration-300">
                  <div className="w-12 h-12 mb-4 rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600 dark:text-green-400"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21ZM15 7H9C8.44772 7 8 7.44772 8 8V12C8 12.5523 8.44772 13 9 13H15C15.5523 13 16 12.5523 16 12V8C16 7.44772 15.5523 7 15 7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-black dark:text-white mb-3">
                    Risk Management
                  </h3>
                  <p className="text-gray-600 dark:text-blue-100/70">
                    AI-powered systems that monitor positions, predict market
                    movements, and protect against potential risks
                  </p>
                </div>
              </motion.div>

              {/* Embedded Tweets */}
              <motion.div
                className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 overflow-hidden hover:border-blue-500/50 transition-colors duration-300">
                  <Tweet id="1875512495856619548" />
                </div>
                <div className="rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 overflow-hidden hover:border-blue-500/50 transition-colors duration-300">
                  <Tweet id="1875881226151841925" />
                </div>
                <div className="rounded-xl bg-white/50 dark:bg-[#0c1b3b]/30 backdrop-blur-sm border border-gray-200/50 dark:border-[#1a2b4b]/50 overflow-hidden hover:border-blue-500/50 transition-colors duration-300">
                  <Tweet id="1859611790662832291" />
                </div>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="col-span-1 lg:col-span-3 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="#"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Learn More About DeFAI</span>
                  <HiArrowRight className="w-5 h-5" />
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </main>

      <footer className="border-t border-gray-200/50 dark:border-blue-500/20 transition-colors duration-300 bg-white/50 dark:bg-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-semibold text-xl text-black dark:text-white bg-gradient-to-r from-black to-gray-800 dark:from-blue-400 dark:to-blue-600 text-transparent bg-clip-text">
                Everything Solana
              </span>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm text-gray-600 dark:text-blue-100/70"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                sol/acc
              </motion.a>
              <motion.a
                href="#"
                className="font-medium text-black dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 text-center text-sm text-gray-600 dark:text-blue-100/70"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            © 2025 Everything Solana.
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
