import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-cream to-background">
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
            Where Every Treat is
            <span className="text-primary block">Purr-fectly</span>
            Baked
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Handcrafted pastries with a sprinkle of feline charm
          </p>
          <button className="bg-secondary text-secondary-foreground px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
            Order Meow
          </button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 relative"
        >
          <img
            src="/cat-baker.svg"
            alt="Cat Baker"
            className="w-full max-w-[500px] mx-auto animate-float"
          />
        </motion.div>
      </div>
    </section>
  );
};