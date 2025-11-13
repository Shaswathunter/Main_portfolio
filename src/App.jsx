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
  {/* ✅ Stickman Background Always Visible */}
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

  {/* ✅ Overlay Animation */}
  <AnimatePresence>
    {showGames && (
      <motion.div
        key="games-overlay"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center overflow-y-auto"
      >
        <div className="relative w-full max-w-7xl mx-auto p-6">
          <GamesPreview />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCloseGames}
            className="absolute top-5 right-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/40 transition-all"
          >
            ✖ Close
          </motion.button>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
</NeonGlowBackground>

  );
}

export default App;
