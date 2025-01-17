import { motion } from "framer-motion";

export const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Our Pawsome Story
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Founded in 2020, Whiskers & Whisks began as a dream to combine our two greatest
            passions: baking delicious treats and loving cats. What started as a small
            home bakery has grown into a beloved local institution where every pastry
            is made with love and a sprinkle of cat-inspired magic.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity">
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
};