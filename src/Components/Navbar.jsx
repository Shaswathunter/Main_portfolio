import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ onGamesClick }) => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  // Navigation Links
  const links = [
    "home",
    "about",
    "skills",
    "projects",
    "contact",
  ];

  // Smooth Scroll
  const handleScrollTo = (id) => {
    setOpen(false);

    setTimeout(() => {
      const section = document.getElementById(id);

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 150);
  };

  return (
    <>
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "border-b border-white/10 bg-black/50 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* Logo */}
          <motion.h1
            whileHover={{ scale: 1.04 }}
            className="cursor-pointer text-2xl font-black tracking-tight text-white"
          >
            SG.
          </motion.h1>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-8 md:flex">

            {links.map((link) => (
              <button
                key={link}
                onClick={() => handleScrollTo(link)}
                className="
                  text-sm
                  font-medium
                  capitalize
                  text-zinc-400
                  transition-all
                  duration-300
                  hover:text-white
                "
              >
                {link}
              </button>
            ))}

            {/* Games Button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onGamesClick}
              className="
                rounded-full
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-5
                py-2
                text-sm
                font-medium
                text-cyan-300
                transition-all
                duration-300
                hover:bg-cyan-400/20
              "
            >
              🎮 Games
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="text-white md:hidden"
          >
            <FaBars size={22} />
          </motion.button>
        </div>
      </motion.header>

      {/* MOBILE MENU */}
      <AnimatePresence>

        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
            className="
              fixed
              inset-0
              z-[100]
              bg-[#050816]
              px-6
              py-8
              md:hidden
            "
          >

            {/* Top */}
            <div className="flex items-center justify-between">

              <h2 className="text-xl font-bold text-white">
                Menu
              </h2>

              <button onClick={() => setOpen(false)}>
                <FaTimes
                  size={24}
                  className="text-white"
                />
              </button>
            </div>

            {/* Mobile Links */}
            <div className="mt-16 flex flex-col gap-7">

              {links.map((link) => (
                <button
                  key={link}
                  onClick={() => handleScrollTo(link)}
                  className="
                    border-b
                    border-white/10
                    pb-3
                    text-left
                    text-3xl
                    font-bold
                    capitalize
                    text-white
                  "
                >
                  {link}
                </button>
              ))}

              {/* Games Button */}
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setOpen(false);

                  setTimeout(() => {
                    onGamesClick?.();
                  }, 150);
                }}
                className="
                  mt-2
                  rounded-2xl
                  bg-gradient-to-r
                  from-purple-500
                  to-cyan-500
                  px-6
                  py-4
                  text-left
                  text-xl
                  font-bold
                  text-white
                  shadow-lg
                "
              >
                🎮 Open Games
              </motion.button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;