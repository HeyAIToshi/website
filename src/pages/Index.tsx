import { Hero } from "@/components/Hero";
import { FeaturedProducts } from "@/components/FeaturedProducts";
import { CatOfMonth } from "@/components/CatOfMonth";
import { About } from "@/components/About";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <FeaturedProducts />
      <CatOfMonth />
      <About />
    </motion.div>
  );
};

export default Index;