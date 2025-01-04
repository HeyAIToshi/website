"use client";
import { motion } from "framer-motion";
import { HiArrowRight } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";

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

export default function LeapflowLanding() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-neutral-950 transition-colors duration-300">
      <main className="flex-1 flex flex-col items-center justify-center p-1 relative overflow-hidden">
        {/* Navbar */}
        <nav className="flex items-center justify-between p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-white dark:to-neutral-300" />
            <span className="font-semibold text-lg md:text-xl text-neutral-900 dark:text-white">
              leapflow
            </span>
          </motion.div>
          <div className="hidden md:flex items-center gap-4 lg:gap-8 text-sm text-neutral-600 dark:text-neutral-400">
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Documentation
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Examples
            </a>
            <a
              href="#"
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors"
            >
              Get Started
            </motion.button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] dark:bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent dark:via-neutral-950" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 text-center max-w-4xl mx-auto space-y-8"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Build web apps with just <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 dark:from-white dark:via-neutral-200 dark:to-white text-transparent bg-clip-text">
              {" "}
              backend code
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto px-4">
            Leapflow turns your Node.js into a full app, no frontend needed.
            Write your Node.js logic and let Leapflow handle the app for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-medium hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Get Started
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 rounded-lg border border-neutral-200 dark:border-neutral-800 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors w-full sm:w-auto text-neutral-900 dark:text-white"
            >
              View Documentation
            </motion.button>
          </div>
        </motion.div>

        {/* Code Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 mt-10 w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-2xl bg-neutral-100/50 dark:bg-neutral-900/50 backdrop-blur-sm"
        >
          <div className="bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-white px-4 py-3 text-sm flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800">
            <span className="font-medium">app.js</span>
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/90" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/90" />
              <div className="h-3 w-3 rounded-full bg-green-500/90" />
            </div>
          </div>
          <div className="text-sm font-mono overflow-x-auto">
            <Highlight
              theme={theme === "dark" ? themes.dracula : themes.github}
              code={`const { createApp } = require('leapflow');

const app = createApp();

app.get('/users', async (req, res) => {
  const users = await db.users.findAll();
  return users; // Leapflow automatically creates UI
});

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body);
  return user;
});

app.start(3000);`}
              language="javascript"
            >
              {({ className, style, tokens, getLineProps, getTokenProps }) => (
                <pre
                  className={cn(
                    className,
                    "p-4 sm:p-6 scrollbar-thin scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700 scrollbar-track-transparent"
                  )}
                  style={{
                    ...style,
                    background: "transparent",
                  }}
                >
                  {tokens.map((line, i) => (
                    <div
                      key={i}
                      {...getLineProps({ line })}
                      style={{
                        ...getLineProps({ line }).style,
                        lineHeight: "1.75",
                      }}
                    >
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
        </motion.div>

        {/* Features Grid */}
        <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto z-10 w-full">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                variants={item}
                className={cn(
                  "p-6 rounded-xl",
                  "bg-neutral-50 dark:bg-neutral-900",
                  "border border-neutral-200 dark:border-neutral-800",
                  "transition-colors duration-300"
                )}
              >
                <feature.icon className="h-8 w-8 mb-4 text-neutral-900 dark:text-white" />
                <h3 className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold mb-4 text-neutral-900 dark:text-white">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Templates
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-neutral-900 dark:text-white">
                Resources
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Guides
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Examples
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-neutral-900 dark:text-white">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-neutral-900 dark:text-white">
                Legal
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2">
              <div className="h-6 w-6 md:h-8 md:w-8 rounded-lg bg-neutral-900 dark:bg-white" />
              <span className="font-semibold text-sm md:text-base text-neutral-900 dark:text-white">
                leapflow
              </span>
            </div>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400 text-center md:text-left">
              © 2024 Leapflow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: "Zero Frontend Code",
    description:
      "Focus on your backend logic. Leapflow automatically generates a beautiful UI based on your API endpoints.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
        />
      </svg>
    ),
  },
  {
    title: "Instant Deployment",
    description:
      "Deploy your app with a single command. Leapflow handles hosting, scaling, and infrastructure management.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
        />
      </svg>
    ),
  },
  {
    title: "Developer Experience",
    description:
      "Built for developers, by developers. Enjoy a seamless development experience with hot reloading and debugging tools.",
    icon: ({ className }: { className?: string }) => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z"
        />
      </svg>
    ),
  },
];
