import { motion } from "framer-motion";

export const CatOfMonth = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl overflow-hidden shadow-lg"
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901"
                alt="Cat of the Month"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Meet Our Cat of the Month
              </h2>
              <h3 className="text-xl text-primary font-medium mb-4">
                Whiskers McFluff
              </h3>
              <p className="text-muted-foreground mb-6">
                This adorable 3-year-old tabby loves watching our bakers work their magic.
                You might catch him supervising the morning croissant preparation!
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-accent px-4 py-2 rounded-full text-sm">
                  Friendly
                </span>
                <span className="bg-accent px-4 py-2 rounded-full text-sm">
                  Food Critic
                </span>
                <span className="bg-accent px-4 py-2 rounded-full text-sm">
                  Professional Napper
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};