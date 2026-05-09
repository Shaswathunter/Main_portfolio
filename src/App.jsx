
import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import BackToTop from "./Components/backToTop";
import { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";

const About = lazy(() => import("./Components/About"));
const Skills = lazy(() => import("./Components/Skills"));
const Projects = lazy(() => import("./Components/Projects"));
const ContactForm = lazy(() => import("./Components/ContactForm"));
const ChatBot = lazy(() => import("./Components/ChatBot"));
const GamesPreview = lazy(() => import("./Components/GamesPreview"));

function App() {
  const [showGames, setShowGames] = useState(false);

  useEffect(() => {
    gsap.config({
      nullTargetWarn: false,
    });
  }, []);

  useEffect(() => {
if (showGames) {
  document.body.classList.add("overflow-hidden");
} else {
  document.body.classList.remove("overflow-hidden");
}
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showGames]);

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-hidden">
      {!showGames && (
  <Navbar onGamesClick={() => setShowGames(true)} />
)}

      <main>
        <section id="home">
          <Hero />
        </section>

        <Suspense
          fallback={
            <div className="flex justify-center py-20 text-zinc-400">
              Loading...
            </div>
          }
        >
          <section id="about">
            <About />
          </section>

          <section id="skills">
            <Skills />
          </section>

          <section id="projects">
            <Projects />
          </section>

          <section id="contact">
            <ContactForm />
          </section>

          <ChatBot />
        </Suspense>
      </main>

      <BackToTop />
      <Toaster position="top-right" />

     <AnimatePresence>
  {showGames && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] bg-[#050816]/95 backdrop-blur-xl"
    >

      {/* Main Wrapper */}
      <div className="relative flex h-screen flex-col overflow-hidden">

   
          

        {/* Scroll Area */}
<div
className="
  custom-scroll
  h-full
  overflow-y-auto
  overflow-x-hidden
  pb-6
  touch-pan-y
"
>          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center text-zinc-400">
                Loading Games...
              </div>
            }
          >
            <GamesPreview onClose={() => setShowGames(false)} />
          </Suspense>

        </div>
      </div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
}

export default App;