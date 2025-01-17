"use client";
import { motion } from "framer-motion";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
import { Tweet } from "react-tweet";

export default function AIToshiLanding() {
  return (
    <div className="flex flex-col min-h-screen bg-[#030712] dark:bg-[#000000] dark transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Enhanced Background gradients with more vibrant colors */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#0f172a] dark:from-black dark:via-[#030712] dark:to-[#0a0f1a]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.15),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(2,132,199,0.2),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_0%,rgba(255,255,255,0.8)_100%)] dark:bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.8)_100%)]" />
          {/* Enhanced animated gradient orbs */}
          <motion.div
            className="absolute top-1/4 -left-48 w-96 h-96 bg-gradient-to-r from-sky-400/30 to-indigo-400/30 dark:from-sky-500/20 dark:to-indigo-500/20 rounded-full blur-3xl"
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
            className="absolute bottom-1/4 -right-48 w-96 h-96 bg-gradient-to-r from-emerald-400/30 to-teal-400/30 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-full blur-3xl"
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

        {/* Enhanced Navbar with glassmorphism */}
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 p-2 sm:p-3 lg:p-4 max-w-7xl mx-auto w-full backdrop-blur-xl bg-white/[0.15] dark:bg-black-900/[0.85] rounded-2xl sm:rounded-3xl my-4 sm:my-6 border border-white/[0.2] dark:border-black-500/[0.2] ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 w-[120px]"
          >
            <span className="font-bold text-xl md:text-2xl bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 text-transparent bg-clip-text">
              AIToshi
            </span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:flex items-center gap-12 text-sm text-gray-400 dark:text-sky-100/60"
          >
            <motion.a
              href="#ecosystem"
              className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Ecosystem</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 transition-all group-hover:w-full" />
            </motion.a>
            <motion.a
              href="#research"
              className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Research</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 transition-all group-hover:w-full" />
            </motion.a>
            <motion.a
              href="#tools"
              className="hover:text-sky-400 dark:hover:text-sky-300 transition-colors relative group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Tools</span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 transition-all group-hover:w-full" />
            </motion.a>
          </motion.div>
          <div className="flex items-center gap-4 w-[120px] justify-end">
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="whitespace-nowrap px-4 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-500 dark:to-indigo-500 text-white font-medium hover:from-sky-500 hover:to-indigo-500 dark:hover:from-sky-400 dark:hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-sky-400/25 dark:shadow-sky-500/25"
            >
              Connect Wallet
            </motion.a>
          </div>
          <motion.button
            className="flex md:hidden items-center p-2 text-gray-400 dark:text-sky-100/60 hover:text-sky-400 dark:hover:text-sky-300"
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

        {/* Enhanced Hero Section with better typography and gradients */}
        <div className="relative z-10 text-center max-w-6xl mx-auto space-y-8 sm:space-y-12 pt-32 sm:pt-40 pb-8 sm:pb-12 px-4">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="flex items-center justify-center gap-2 text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="px-6 py-2 rounded-full bg-gradient-to-r from-sky-400/10 to-indigo-400/10 dark:from-sky-500/10 dark:to-indigo-500/10 text-sky-400 dark:text-sky-300 font-medium border border-sky-400/20 dark:border-sky-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="countdown font-mono">
                  Visit in next 24 Hours
                </span>
              </motion.span>
            </motion.div>
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="relative">
                <span className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-sky-400/20 to-indigo-400/20 dark:from-sky-500/20 dark:to-indigo-500/20 blur-xl" />
                <span className="relative bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 text-transparent bg-clip-text">
                  AIToshi
                </span>
              </span>
              <br />
              <span className="bg-gradient-to-r from-gray-200 to-gray-100 dark:from-gray-100 dark:to-gray-200 text-transparent bg-clip-text">
                Everything Solana DeFAI
              </span>
            </motion.h1>
            <motion.p
              className="text-xl sm:text-2xl text-gray-400 dark:text-sky-100/60 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Stay ahead of DeFAI trend on Solana with AIToshi, your ultimate
              Solana DeFAI Buddy.
            </motion.p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.a
              href="#explore"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-500 dark:to-indigo-500 text-white text-lg font-medium transition-all duration-300 flex items-center gap-2 shadow-[0_8px_32px_0_rgba(56,189,248,0.3)] dark:shadow-[0_8px_32px_0_rgba(2,132,199,0.3)] hover:shadow-[0_12px_40px_0_rgba(56,189,248,0.4)] dark:hover:shadow-[0_12px_40px_0_rgba(2,132,199,0.4)] overflow-hidden"
            >
              <span className="relative z-10">Explore</span>
              <HiArrowRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400 group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.3),transparent_70%)] group-hover:opacity-70 transition-opacity duration-300" />
            </motion.a>
          </motion.div>
        </div>

        {/* DeFAI Ecosystem Section with improved glassmorphism */}
        <section className="py-24 sm:py-32 w-full relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#030712] via-[#0a0f1a] to-[#0f172a] opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.2),transparent_50%)]" />

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              className="text-center space-y-8 mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Solana DeFAI Ecosystem is{" "}
                <span className="bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 text-transparent bg-clip-text">
                  Growing
                </span>
              </motion.h2>
              <motion.p
                className="text-xl text-gray-400 dark:text-sky-100/60 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Check out the top projects shaping the future of decentralized
                AI
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 mb-16">
              {/* Project cards with enhanced glassmorphism */}
              {[
                {
                  name: "GRIFFAIN",
                  url: "https://griffain.com/",
                },
                {
                  name: "GRIFT",
                  url: "https://www.orbitcryptoai.com/",
                },
                {
                  name: "BUZZ",
                  url: "https://www.askthehive.ai/",
                },
                {
                  name: "SNAI",
                  url: "https://swarmnode.ai/",
                },
                {
                  name: "NEUR",
                  url: "https://neur.sh/",
                },
                {
                  name: "QUAIN",
                  url: "https://quaindot.com/",
                },
                {
                  name: "AIPUMP",
                  url: "https://www.aipump.ai/",
                },
                {
                  name: "ALPHA",
                  url: "https://www.alphaarc.xyz/",
                },
                {
                  name: "HTERM",
                  url: "https://hiero.ai/",
                },
                {
                  name: "KWANT",
                  url: "https://www.projectplutus.ai/",
                },
                {
                  name: "PPCOIN",
                  url: "https://www.zods.pro/",
                },
                {
                  name: "ZODS",
                  url: "https://swap.assetdash.com/",
                },
                {
                  name: "MOBY",
                  url: "https://app.boltrade.ai/",
                },
                {
                  name: "CATG",
                  url: "https://v1.site/",
                },
                {
                  name: "V1",
                  url: "https://v1.site/",
                },
                {
                  name: "SVMAI",
                  url: "https://www.alris.live/",
                },
                {
                  name: "listen",
                  url: "https://lexicon.chat/",
                },
                {
                  name: "LEXICON",
                  url: "https://solaai.xyz/",
                },
                {
                  name: "SOLA",
                  url: "https://www.swquery.xyz/",
                },
                {
                  name: "ALR",
                  url: "https://www.asym.info/",
                },
                {
                  name: "SWQUERY",
                  url: "https://blormmy.com/",
                },
                {
                  name: "ASYM",
                  url: "https://heyanon.ai/",
                },
                {
                  name: "blormmy",
                  url: "https://www.xcombinator.ai/",
                },
                {
                  name: "ANON",
                  url: "https://ocada.ai/",
                },
                {
                  name: "X",
                  url: "https://choizzy.io/lenda",
                },
                {
                  name: "OCADA",
                  url: "https://kira.trading/",
                },
                {
                  name: "LENDA",
                  url: "https://www.trustinweb3.xyz/",
                },
                {
                  name: "KRA",
                  url: "https://gaisha.app/",
                },
                {
                  name: "T3AI",
                  url: "https://www.jennamagent.com/",
                },
                {
                  name: "GAISHA",
                  url: "https://gaisha.app/",
                },
                {
                  name: "JENNA",
                  url: "https://www.jennamagent.com/",
                },
              ].map((project, index) => (
                <motion.a
                  key={index}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center p-4 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-400/20 to-indigo-400/20 p-2 mb-2">
                    <img
                      src={`https://www.google.com/s2/favicons?domain=${project.url}&sz=128`}
                      alt={`${project.name} logo`}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-300 group-hover:text-sky-400 transition-colors">
                    {project.name}
                  </span>
                </motion.a>
              ))}
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              <motion.div
                className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <HiCheck className="text-2xl text-sky-400 dark:text-sky-300 flex-shrink-0" />
                <span className="text-gray-300 dark:text-sky-100/70">
                  Stay informed about the DeFAI ecosystem to capitalize on
                  emerging opportunities.
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <HiCheck className="text-2xl text-sky-400 dark:text-sky-300 flex-shrink-0" />
                <span className="text-gray-300 dark:text-sky-100/70">
                  Leverage AIToshi's 24/7 dashboard to explore and track Solana
                  DeFAI projects.
                </span>
              </motion.div>
              <motion.div
                className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <HiCheck className="text-2xl text-sky-400 dark:text-sky-300 flex-shrink-0" />
                <span className="text-gray-300 dark:text-sky-100/70">
                  Access insights from top crypto experts and analytical tools
                  to evaluate new projects.
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* DeFAI Research Section */}
        <section className="py-16 sm:py-32 w-full backdrop-blur-sm bg-[#030712]/50 dark:bg-black/50 relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.12),transparent_50%)] dark:bg-[radial-gradient(circle_at_center,rgba(2,132,199,0.15),transparent_50%)]" />
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center space-y-6 mb-16"
            >
              <motion.span
                className="text-sm font-medium text-gray-400 dark:text-sky-100/60 bg-white/[0.02] dark:bg-sky-500/[0.02] px-6 py-2 rounded-full inline-block border border-white/[0.05] dark:border-sky-500/[0.05]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Research Tools
              </motion.span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white">
                New to{" "}
                <span className="relative">
                  <span className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-sky-400/20 to-indigo-400/20 dark:from-sky-500/20 dark:to-indigo-500/20 blur-xl" />
                  <span className="relative bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 text-transparent bg-clip-text">
                    DeFAI
                  </span>
                </span>
                ?
              </h2>
              <p className="text-xl text-gray-400 dark:text-sky-100/60 max-w-2xl mx-auto">
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
                className="group p-8 rounded-2xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-sky-400/20 to-indigo-400/20 dark:from-sky-500/20 dark:to-indigo-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-sky-400 dark:text-sky-300"
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
                <h3 className="text-xl font-bold text-white mb-2">
                  FlipsideCrypto
                </h3>
                <p className="text-gray-400 dark:text-sky-100/60">
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
                className="group p-8 rounded-2xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 dark:from-emerald-500/20 dark:to-teal-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-emerald-400 dark:text-emerald-300"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 12H15M9 16H12M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21ZM15 7H9C8.44772 7 8 7.44772 8 8V12C8 12.5523 8.44772 13 9 13H15C15.5523 13 16 12.5523 16 12V8C16 7.44772 15.5523 7 15 7Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Dropstab</h3>
                <p className="text-gray-400 dark:text-sky-100/60">
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
                className="group p-8 rounded-2xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-amber-400/20 to-orange-400/20 dark:from-amber-500/20 dark:to-orange-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-amber-400 dark:text-amber-300"
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
                <h3 className="text-xl font-bold text-white mb-2">CoinGecko</h3>
                <p className="text-gray-400 dark:text-sky-100/60">
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
                className="group p-8 rounded-2xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-rose-400/20 to-pink-400/20 dark:from-rose-500/20 dark:to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg
                    className="w-8 h-8 text-rose-400 dark:text-rose-300"
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
                <h3 className="text-xl font-bold text-white mb-2">
                  CoinMarketCap
                </h3>
                <p className="text-gray-400 dark:text-sky-100/60">
                  DeFAI Market Insights
                </p>
              </motion.a>
            </div>

            <div className="mt-16 max-w-3xl mx-auto space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300"
              >
                <HiCheck className="text-2xl text-sky-400 dark:text-sky-300 flex-shrink-0" />
                <span className="text-gray-300 dark:text-sky-100/70">
                  Streamline your research on the DeFAI market and plan your
                  strategy effectively. Discover new projects through the
                  mentioned platforms.
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300"
              >
                <HiCheck className="text-2xl text-sky-400 dark:text-sky-300 flex-shrink-0" />
                <span className="text-gray-300 dark:text-sky-100/70">
                  Monitor all leading dashboards in one place, capitalize on
                  emerging narratives, and stay ahead of the crowd.
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 p-6 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300"
              >
                <HiCheck className="text-2xl text-sky-400 dark:text-sky-300 flex-shrink-0" />
                <span className="text-gray-300 dark:text-sky-100/70">
                  In crypto, staying ahead of the curve is key—these platforms
                  will keep you informed and help you stay ahead.
                </span>
              </motion.div>
            </div>
          </div>
        </section>

        {/* why defai section with enhanced glassmorphism */}
        <motion.div
          className="mt-24 p-12 sm:p-16 rounded-3xl bg-gradient-to-br from-white/[0.02] to-transparent dark:from-sky-500/[0.02] dark:to-indigo-500/[0.01] border border-white/[0.05] dark:border-sky-500/[0.05] backdrop-blur-xl relative overflow-hidden group"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* Background Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-400/10 to-indigo-400/10 dark:from-sky-500/5 dark:to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(2,132,199,0.2),transparent_50%)]" />

          <div className="relative z-10 space-y-12">
            <div className="text-center space-y-4">
              <motion.span
                className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-sky-400/10 to-indigo-400/10 dark:from-sky-500/10 dark:to-indigo-500/10 text-sm font-medium text-sky-400 dark:text-sky-300 border border-sky-400/20 dark:border-sky-500/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Industry Leaders on DeFAI
              </motion.span>
              <motion.h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Why DeFAI is the Future of Finance
              </motion.h2>
              <motion.p
                className="text-xl text-gray-400 dark:text-sky-100/60 max-w-2xl mx-auto"
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
                <div className="p-8 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300">
                  <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-sky-400/20 to-indigo-400/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-sky-400 dark:text-sky-300"
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
                  <h3 className="text-xl font-bold text-white mb-3">
                    Abstraction Layers
                  </h3>
                  <p className="text-gray-400 dark:text-sky-100/60">
                    Natural language interfaces and AI-driven UX making DeFi
                    accessible to everyone, regardless of technical expertise
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300">
                  <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-indigo-400/20 to-violet-400/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-indigo-400 dark:text-indigo-300"
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
                  <h3 className="text-xl font-bold text-white mb-3">
                    Intelligent Automation
                  </h3>
                  <p className="text-gray-400 dark:text-sky-100/60">
                    Advanced AI agents that adapt to market conditions and
                    execute sophisticated trading strategies autonomously
                  </p>
                </div>

                <div className="p-8 rounded-xl bg-white/[0.02] dark:bg-sky-500/[0.02] backdrop-blur-xl border border-white/[0.05] dark:border-sky-500/[0.05] hover:border-sky-400/50 dark:hover:border-sky-500/50 transition-all duration-300">
                  <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-emerald-400/20 to-teal-400/20 flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-emerald-400 dark:text-emerald-300"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3H6C4.89543 3 3 4.89543 3 7V19C3 20.1046 3.89543 21 6 21ZM15 7H9C8.44772 7 8 7.44772 8 8V12C8 12.5523 8.44772 13 9 13H15C15.5523 13 16 12.5523 16 12V8C16 7.44772 15.5523 7 15 7Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    Risk Management
                  </h3>
                  <p className="text-gray-400 dark:text-sky-100/60">
                    AI-powered systems that monitor positions, predict market
                    movements, and protect against potential risks
                  </p>
                </div>
              </motion.div>

              {/* Embedded Tweets with enhanced styling */}
              <motion.div
                className="col-span-1 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Tweet id="1875512495856619548" />
                <Tweet id="1875881226151841925" />
                <Tweet id="1859611790662832291" />
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
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-500 dark:to-indigo-500 text-white font-medium hover:from-sky-500 hover:to-indigo-500 dark:hover:from-sky-400 dark:hover:to-indigo-400 transition-all duration-300 shadow-lg shadow-sky-400/25 dark:shadow-sky-500/25"
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

      <footer className="border-t border-white/[0.05] dark:border-sky-500/[0.05] transition-colors duration-300 bg-[#030712]/50 dark:bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-12">
            <motion.div
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="font-bold text-2xl bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 text-transparent bg-clip-text">
                Everything Solana
              </span>
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-12 text-sm text-gray-400 dark:text-sky-100/60"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="#"
                className="font-medium text-sky-400 dark:text-sky-300 hover:text-sky-300 dark:hover:text-sky-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                sol/acc
              </motion.a>
              <motion.a
                href="#"
                className="font-medium text-sky-400 dark:text-sky-300 hover:text-sky-300 dark:hover:text-sky-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Learn More
              </motion.a>
            </motion.div>
          </div>
          <motion.div
            className="mt-12 text-center text-sm text-gray-400 dark:text-sky-100/60"
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
