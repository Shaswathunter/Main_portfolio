import "./App.css";
import React, { useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import About from "./Components/About";
import NeonGlowBackground from "./Components/NeonBackground";
import ContactForm from "./Components/ContactForm.jsx";
import { Toaster } from "react-hot-toast";
import BackToTop from "./Components/backToTop.jsx";
import ChatBot from "./Components/ChatBot.jsx";
import GamesPreview from "./Components/GamesPreview.jsx";
import { AnimatePresence, motion } from "framer-motion";
import HiddenRunner from "./Components/HiddenRunner";

function App() {
  const [showGames, setShowGames] = useState(false);

  const handleGamesClick = () => {
    setShowGames(true);
  };

  const handleCloseGames = () => {
    setShowGames(false);
  };

  return (
    <NeonGlowBackground>
      {/* Stickman Background Always Visible */}
      <HiddenRunner />

      <Navbar onGamesClick={handleGamesClick} />

      {/* Normal sections */}
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><ContactForm /></div>

      <ChatBot />
      <BackToTop />
      <Toaster position="top-center" />

      {/* Overlay Animation for GamesPreview */}
      <AnimatePresence>
        {showGames && (
          <motion.div
            key="games-overlay"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-start sm:items-center justify-center overflow-y-auto py-10 px-4 sm:px-6"
          >
            <div className="relative w-full max-w-7xl mx-auto">
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCloseGames}
                className="fixed top-4 right-4 sm:absolute sm:top-5 sm:right-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/40 transition-all z-50"
              >
                ✖ Close
              </motion.button>

              {/* Games Preview Component */}
              <GamesPreview />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NeonGlowBackground>
  );
}

export default App;
