import React from "react";
import { motion } from "framer-motion";
import pic from "../assets/im2.png";
import Projects from "./Projects.jsx";
import Resume from "../assets/Resume.pdf";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import Typical from "react-typical";

const Hero = () => {
  const icons = [
    { icon: <FaLinkedin />, href: "https://linkedin.com/in/yourprofile" },
    { icon: <FaGithub />, href: "https://github.com/Shaswathunter" },
    { icon: <FaTwitter />, href: "https://x.com/CoderShaswat" },
    { icon: <MdMessage />, href: "mailto:Shaswat2016@gmail.com" },
  ];
  return (
    <div className="h-screen w-full relative overflow-hidden">
      {/* Hero Section */}
      <div className="absolute inset-0  opacity-20 blur-3xl"></div>
      <div
        id="home"
        className="max-w-screen-xl mx-auto flex flex-col items-center justify-center h-full px-6 md:flex-row relative z-10"
      >
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col justify-center h-full text-center md:text-left"
        >
          <h2 className="text-5xl sm:text-7xl font-extrabold text-white drop-shadow-lg">
            WELCOME TO {""}
          </h2>
          <h1 className="text-4xl sm:text-6xl font-bold  text-cyan-400 py-4 drop-shadow-lg">
            <Typical
              steps={[
                "Shaswat's World ",
                5000,
                
               
              ]}
              loop={Infinity}
              wrapper="b"
            />
            
          </h1>
          <p className="text-gray-300 py-4 max-w-lg drop-shadow-md">
              <Typical
              steps={[
                "I'm a Full Stack Web Developer specialized in the MERN Stack I build responsive, clean, and modern web applications. Passionate about learning and solving real-world problems. ",
                7000,

                
              ]}
              loop={Infinity}
              wrapper="b"
            />
     .
          </p>
        <div className="flex flex-col md:flex-row gap-4 mt-6 lg:justify-start items-center">
            <div>
            <motion.button
              to={Projects}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9, rotate: -10 }}
              className="group text-white w-fit px-4 py-3 my-2 flex items-center rounded-lg bg-gradient-to-r from-gray-600 to-gray-500 shadow-lg hover:shadow-xl transition-transform "
            >
              Explore Projects
            </motion.button>
          </div>
          <div>
            <motion.button
              onClick={() => window.open(Resume, "_blank")}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9, rotate: -10 }}
              className="group text-white w-fit px-8 py-3 my-2 flex items-center rounded-lg bg-gradient-to-r from-gray-600 to-gray-500 shadow-lg hover:shadow-xl transition-transform"
            >
              View Resume
            </motion.button>
          </div>
          <div>
            <motion.button
              to={Projects}
              whileHover={{ scale: 1.2, rotate: 10 }}
              whileTap={{ scale: 0.9, rotate: -10 }}
              className="group text-white w-fit px-8 py-3 my-2 flex items-center rounded-lg bg-gradient-to-r from-gray-600 to-gray-500 shadow-lg hover:shadow-xl transition-transform md:items-center md:justify-center"
            >
              Contact Me
            </motion.button>
          </div>
                  </div>

          <div>
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
                  whileHover={{
                    scale: 1.2,
                    rotate: 10,
                    color: "#64FFDA",
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="text-3xl text-gray-300 hover:text-red-700 transition duration-100"
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="w-full md:w-2/3 flex justify-center items-center -mt-80  "
        >
          <img
            src={pic}
            alt="profile"
            className="rounded-full mx-auto w-2/3 md:w-full mt-20  hover:scale-105 transition-transform  duration-300 "
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
