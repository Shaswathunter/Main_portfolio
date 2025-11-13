import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import PortfolioGamesComponent from "./Games";
import Games from "../Components/Games";

const GamesPreview = () => {
  return (
    <section
      id="games"
      className="relative min-h-screen  from-[#0b0b0b] via-[#111] to-[#0b0b0b] text-white py-20 flex flex-col items-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 opacity-40 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15),transparent_60%)]"></div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-5xl sm:text-6xl font-extrabold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500"
      >
        Play More Games 🎮
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl w-full px-6"
      >
        <PortfolioGamesComponent />
      </motion.div>
    </section>
  );
};

export default GamesPreview;
