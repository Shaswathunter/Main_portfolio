import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll"; // ✅ Import

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const links = [
    { id: 1, link: "home" },
    { id: 2, link: "about" },
    { id: 3, link: "skills" },
    { id: 4, link: "projects" },
    { id: 5, link: "experience" },
    { id: 6, link: "contact" },
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
            <Link to={link} smooth={true} offset={-70} duration={500}>
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
      {nav && (
        <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-primary">
  {links.map(({ id, link }) => (
    <li key={id} className="px-4 py-6 text-4xl text-textSecondary hover:text-secondary duration-200">
      <Link to={link} smooth={true} offset={-70} duration={500} onClick={() => setNav(false)}>
        {link}
      </Link>
    </li>
  ))}
</ul>

      )}
    </motion.nav>
  );
};

export default Navbar;
