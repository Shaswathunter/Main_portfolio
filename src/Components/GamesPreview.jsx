import React from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import PortfolioGamesComponent from "./Games";

const GamesPreview = ({ onClose }) => {
  return (
    <section
      className="
        relative
        flex
        min-h-screen
        w-full
        items-start
        justify-center
        overflow-hidden
        px-3
        py-4
        sm:px-4
      "
    >

      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.08),transparent_60%)]" />

      {/* Main Container */}
      <div className="w-full max-w-7xl">

        {/* Top Bar */}
        <div className="mb-4 flex items-center justify-between">

          {/* Left */}
          <div>

            <div
              className="
                mb-2
                inline-flex
                rounded-full
                border
                border-purple-400/20
                bg-purple-500/10
                px-3
                py-1
                text-[10px]
                font-medium
                tracking-wide
                text-purple-300
                sm:text-xs
              "
            >
              Interactive Experience
            </div>

            <h2
              className="
                text-xl
                font-black
                tracking-tight
                text-white
                sm:text-3xl
                md:text-4xl
              "
            >
              Play More
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Games 🎮
              </span>
            </h2>

          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              border
              border-white/10
              bg-white/5
              text-white
              backdrop-blur-md
              transition-all
              duration-300
              hover:bg-white/10
            "
          >
            <FaTimes />
          </motion.button>

        </div>

        {/* Subtitle */}
        <p
          className="
            mb-5
            max-w-lg
            text-[11px]
            leading-relaxed
            text-zinc-500
            sm:text-sm
          "
        >
          Interactive mini-games built with React, Canvas,
          and modern frontend interactions.
        </p>

        {/* Games */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full"
        >
          <PortfolioGamesComponent />
        </motion.div>

      </div>
    </section>
  );
};

export default GamesPreview;