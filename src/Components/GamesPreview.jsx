import React from "react";
import { motion } from "framer-motion";
import PortfolioGamesComponent from "./Games";

const GamesPreview = () => {
  return (
  <section
  id="games"
  className="relative w-full min-h-screen pt-24 sm:pt-28 md:pt-32 text-white flex flex-col items-center"
>
  <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]"></div>

  <motion.h2
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-8 sm:mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
  >
    Play More Games 🎮
  </motion.h2>

  <motion.div
    initial={{ opacity: 0, y: 60 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="w-full max-w-full sm:max-w-4xl px-4 sm:px-6"
  >
    <PortfolioGamesComponent />
  </motion.div>
</section>

  );
};

export default GamesPreview;
