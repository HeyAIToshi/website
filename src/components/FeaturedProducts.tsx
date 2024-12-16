import { motion } from "framer-motion";

const products = [
  {
    id: 1,
    name: "Paw-fect Croissant",
    description: "Buttery, flaky, and shaped like a cat's paw",
    price: "$4.50",
    image: "/croissant.jpg"
  },
  {
    id: 2,
    name: "Whisker Macarons",
    description: "Delicate almond cookies with various fillings",
    price: "$3.00",
    image: "/macaron.jpg"
  },
  {
    id: 3,
    name: "Kitty Cupcakes",
    description: "Decorated with adorable cat faces",
    price: "$5.00",
    image: "/cupcake.jpg"
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Our Purr-emium Treats
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-muted-foreground mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium">{product.price}</span>
                  <button className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm hover:opacity-90 transition-opacity">
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};