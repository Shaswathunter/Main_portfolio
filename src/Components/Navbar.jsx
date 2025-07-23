import React, { useState } from "react";
import { motion , AnimatePresence} from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll"; // ✅ Import

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: "home", link: "home" },
    { id: "about", link: "about" },
    { id: "skills", link: "skills" },
    { id: "projects", link: "projects" },
    { id: "contact", link: "contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center w-full h-20 px-4 text-textPrimary"
    >
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
            <Link
              onClick={() => {
    const section = document.getElementById(link);
    section?.scrollIntoView({ behavior: "smooth" })
    ;
  }}
              smooth={true}
              offset={-70}
              duration={500}
              spy={true} // 🟢 enables scroll tracking
              activeClass="text-secondary font-bold" // 🟢 applies this class when section is active
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>

      {/* Hamburger Icon */}
      <div
        onClick={() => setNav(!nav)}
        className="cursor-pointer pr-4 z-10 text-textSecondary md:hidden"
      >
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
          <AnimatePresence>
        {nav && (
          <motion.ul
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full h-screen bg-primary flex flex-col justify-center items-center space-y-8 text-2xl text-textSecondary font-semibold z-40 md:hidden"
          >
            {links.map(({ id, link }) => (
              <li key={id}>
                <Link
                  onClick={() => {
    const section = document.getElementById(link);
    section?.scrollIntoView({ behavior: "smooth" })
    setNav(false);
  }}
                  smooth={true}
                  offset={-70}
                  duration={500}
                 
                  className="hover:text-secondary transition-all duration-200"
                >
                  {link}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
