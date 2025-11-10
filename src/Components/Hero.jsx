import React from "react";
import { motion } from "framer-motion";
import pic from "../assets/im2.png";
import Resume from "../assets/Resume.pdf";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Typical from "react-typical";

const Hero = () => {
  const icons = [
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/codershaswat" },
    { icon: <FaGithub />, href: "https://github.com/Shaswathunter" },
    { icon: <FaTwitter />, href: "https://x.com/CoderShaswat" },
    { icon: <MdMessage />, href: "mailto:Shaswat2016@gmail.com" }, 
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      {/* 🌟 Hero Content */}
      <div className="relative z-20 max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full px-6 md:flex-row">
        
        {/* 💬 Left Side Text */}
        <motion.div
          initial={{ x: -120, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col justify-center h-full text-center md:text-left"
        >
          <motion.h2
            initial={{ y: -80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_cyan]"
          >
            WELCOME TO
          </motion.h2>

          <motion.h1
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-3xl sm:text-5xl font-bold text-cyan-400 py-4 drop-shadow-[0_0_25px_cyan]"
          >
            <Typical steps={["Shaswat's World", 5000]} loop={Infinity} wrapper="b" />
          </motion.h1>

          <motion.p
            initial={{ x: -100, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-gray-300 py-4 max-w-lg text-lg drop-shadow-[0_0_15px_cyan]"
          >
            <Typical
              steps={[
                "I'm a Full Stack Developer (MERN Stack), building modern web applications.",
                7000,
              ]}
              loop={Infinity}
              wrapper="b"
            />
          </motion.p>

          {/* 🚀 Buttons */}
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row gap-2 mt-6 items-center md:items-start"
          >
            <motion.button
              onClick={() => {
                const section = document.getElementById("projects");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-3 rounded-md text-white shadow-md"
            >
              Explore Projects
            </motion.button>
            <motion.button
              onClick={() => window.open(Resume, "_blank")}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-3 rounded-md text-white shadow-md"
            >
              View Resume
            </motion.button>
            <motion.button
              onClick={() => {
                const section = document.getElementById("contact");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-3 rounded-md text-white shadow-md"
            >
              Contact Me
            </motion.button>
          </motion.div>

          {/* 🌐 Social Icons */}
          <motion.div
            className="flex justify-center gap-6 mt-8"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {icons.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2 }}
                className="text-3xl text-gray-300 hover:text-cyan-400 transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* 🧍‍♂️ Profile Image */}
        <motion.div
  initial={{ x: 120, opacity: 0, scale: 0.8, y: 30 }} // 👈 Added y: 30
  whileInView={{ x: 0, opacity: 1, scale: 1, y: -140 }} // 👈 Moves upward
  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
  className="hidden sm:flex w-full md:w-2/3 justify-center mt-10"
>
  <img
    src={pic}
    alt="profile"
    className="rounded-full w-2/3 md:w-full hover:scale-105 transition duration-300"
  />
</motion.div>

      </div>
    </div>
  );
};

export default Hero;
