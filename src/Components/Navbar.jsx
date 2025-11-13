import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState, useEffect } from "react";

const Navbar = ({ onGamesClick }) => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: "home", link: "home" },
    { id: "games", link: "games" },
    { id: "about", link: "about" },
    { id: "skills", link: "skills" },
    { id: "projects", link: "projects" },
    { id: "contact", link: "contact" },
  ];

  const handleClick = (link) => {
    // Close mobile menu first
    setNav(false);

    if (link === "games") {
      onGamesClick?.();
      return;
    }

    // Wait for menu exit animation (if mobile) then scroll
    setTimeout(() => {
      const section = document.getElementById(link);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 300); // match mobile menu exit duration
  };

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = nav ? "hidden" : "auto";
  }, [nav]);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex justify-between items-center w-full h-20 px-4 text-textPrimary bg-transparent fixed top-0 left-0 z-50"
    >
      {/* Logo */}
      <div>
        <h1 className="text-5xl font-signature ml-2 text-secondary">SG.</h1>
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex">
        {links.map(({ id, link }) => (
          <li
            key={id}
            className="px-4 cursor-pointer capitalize font-medium text-textSecondary hover:text-secondary duration-200"
          >
            <button onClick={() => handleClick(link)}>
              {link === "games" ? "Play More Games" : link.charAt(0).toUpperCase() + link.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* Hamburger Icon */}
      {!nav && (
        <div
          onClick={() => setNav(true)}
          className="cursor-pointer pr-4 text-textSecondary md:hidden z-50"
        >
          <FaBars size={30} />
        </div>
      )}

      {/* Mobile Menu */}
      <AnimatePresence>
        {nav && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full h-full bg-primary flex flex-col items-center z-50 pt-10"
          >
            {/* Close Button */}
            <div
              onClick={() => setNav(false)}
              className="absolute top-6 right-6 cursor-pointer text-textSecondary z-50"
            >
              <FaTimes size={30} />
            </div>

            {/* Mobile links */}
            <ul className="flex flex-col justify-center items-center space-y-8 w-full mt-20">
              {links.map(({ id, link }) => (
                <li key={id} className="list-none">
                  <button
                    onClick={() => handleClick(link)}
                    className="hover:text-secondary transition-all duration-200 cursor-pointer px-4 py-2 text-center"
                  >
                    {link === "games" ? "Play More Games" : link.charAt(0).toUpperCase() + link.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
