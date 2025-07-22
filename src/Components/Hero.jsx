import React from "react";
import { motion } from "framer-motion";
import pic from "../assets/im2.png";
import Resume from "../assets/Resume.pdf";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Typical from "react-typical";
import video from "../assets/video.mp4";

const Hero = () => {
  const icons = [
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/yourprofile" },
    { icon: <FaGithub />, href: "https://github.com/Shaswathunter" },
    { icon: <FaTwitter />, href: "https://x.com/CoderShaswat" },
    { icon: <MdMessage />, href: "mailto:Shaswat2016@gmail.com" },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden text-white">
      {/* 🔥 Thunderstorm Video in Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
      className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* ⚡ Optional Lightning Flash Overlay (can adjust frequency & color) */}
      <div className="absolute z-20 pointer-events-none animate-lightningFlash" />

      {/* 🔮 Main Hero Content */}
      <div className="relative z-30 max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full px-6 md:flex-row">
        {/* 💬 Left Side Text */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center h-full text-center md:text-left"
        >
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_cyan]">
            WELCOME TO
          </h2>
          <h1 className="text-3xl sm:text-5xl font-bold text-cyan-400 py-4 drop-shadow-[0_0_25px_cyan]">
            <Typical steps={["Shaswat's World", 5000]} loop={Infinity} wrapper="b" />
          </h1>
          <p className="text-gray-300 py-4 max-w-lg text-lg drop-shadow-[0_0_15px_cyan]">
            <Typical
              steps={[
                "I'm a Full Stack Developer (MERN Stack), building modern web applications.",
                7000,
              ]}
              loop={Infinity}
              wrapper="b"
            />
          </p>

          {/* 🚀 Buttons */}
          <div className="flex flex-col md:flex-row gap-2 mt-6 items-center md:items-start">
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-3 rounded-md text-white shadow-md"
            >
              Explore Projects
            </motion.button>
            <motion.button
              onClick={() => window.open(Resume, "_blank")}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-3 rounded-md text-white shadow-md"
            >
              View Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-gray-700 to-gray-500 px-6 py-3 rounded-md text-white shadow-md"
            >
              Contact Me
            </motion.button>
          </div>

          {/* 🌐 Social Icons */}
          <motion.div
            className="flex justify-center gap-6 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {icons.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                className="text-3xl text-gray-300 hover:text-cyan-400 transition"
              >
                {item.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* 🧍‍♂️ Profile Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
          className="w-full md:w-2/3 flex justify-center mt-10 md:mt-0"
        >
          <img
            src={pic}
            alt="profile"
            className="rounded-full w-2/3 md:w-full hover:scale-105 transition duration-300 "
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
