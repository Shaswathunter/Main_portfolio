import React from "react";
import { motion } from "framer-motion";
import certificate1 from "../assets/Designer.pdf";
import certificate2 from "../assets/Digitalmarketing.pdf";

const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React.JS", "TypeScript", "TailwindCSS", "jQuery", "JavaScript", "GSAP"],
    },
    {
      category: "Backend & Databases",
      items: ["Node.js", "Express.js", "MongoDB"],
    },
    {
      category: "Tools",
      items: ["Git & GitHub", "Postman", "Render", "Vercel"],
    },
    { category: "Design", items: ["Figma", "Adobe XD", "Canva"] },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const hoverEffect = {
    scale: 1.1,
    rotate: 5,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transition: { duration: 0.3 },
  };

  return (
    <div name="skills" className="relative text-white py-16">
      {/* Neon background effects */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 animate-pulse"
        style={{ filter: "blur(100px)", opacity: 0.5 }}
      ></div>
      <div
        className="absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600"
        style={{
          filter: "blur(150px)",
          opacity: 0.3,
          animation: "neon-blink 3s infinite",
        }}
      ></div>
      <style>
        {`
          @keyframes neon-blink {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.6; }
          }
        `}
      </style>

      <div className="max-w-screen-lg mx-auto p-4 relative z-10">
        {/* Skills Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="pb-8 text-center"
        >
          <h2 className="text-5xl font-extrabold inline border-b-4 border-green-400">
            Skills
          </h2>
          <p className="py-6 text-lg text-gray-300">
            Here are the technologies and tools I've mastered to build modern
            web experiences.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
        >
          {skills.map((skillGroup, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="shadow-lg shadow-gray-800 rounded-xl p-6 hover:shadow-xl hover:shadow-green-400"
            >
              <h3 className="text-3xl font-bold text-green-400 mb-4">
                {skillGroup.category}
              </h3>
              <ul className="space-y-2">
                {skillGroup.items.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    whileHover={hoverEffect}
                    className="cursor-pointer text-lg font-medium text-gray-300 hover:text-white"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mt-20"
        >
          <h2 className="text-5xl font-extrabold inline border-b-4 border-green-400">
            Certification
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10"
        >
          {/* Certificate 1 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="shadow-lg shadow-gray-800 rounded-xl p-6 backdrop-blur-md border border-green-400/20 hover:border-green-400 transition"
          >
            <div className="flex items-center text-white mb-4">
              <span className="text-2xl mr-2">🧠</span>
              <h2 className="text-xl font-semibold">
                Digital Marketing — MSME Certified Programme
              </h2>
            </div>
            <p className="text-white mb-2">
              Successfully completed the Entrepreneurship-cum-Skill Development
              Programme (E-SDP) on Digital Marketing, organized by the{" "}
              <span className="font-medium text-red-500">
                Ministry of Micro, Small & Medium Enterprises (MSME)
              </span>{" "}
              at <span className="font-medium text-red-500">CFTI Agra</span>.
            </p>
            <ul className="list-disc list-inside text-white mb-3 text-left">
              <li>SEO</li>
              <li>Social Media Marketing</li>
              <li>Campaign Management</li>
              <li>Digital Strategy</li>
            </ul>
            <p className="mb-2 text-gray-300">
              Focused on building expertise in brand growth and digital strategy.
            </p>
            <a
              href={certificate2}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-5 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              🔗 View Certificate
            </a>
          </motion.div>

          {/* Certificate 2 */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className="shadow-lg shadow-gray-800 rounded-xl p-6 backdrop-blur-md border border-green-400/20 hover:border-green-400 transition"
          >
            <div className="flex items-center text-white mb-4">
              <span className="text-2xl mr-2">💻</span>
              <h2 className="text-xl font-semibold">Junior Web Developer</h2>
            </div>
            <p className="text-white mb-2">
              Worked on building and deploying responsive, dynamic web
              applications using the{" "}
              <span className="font-medium text-green-400">
                MERN stack (MongoDB, Express.js, React.js, Node.js)
              </span>
              .
            </p>
            <ul className="list-disc list-inside text-white mb-3 text-left">
              <li>Frontend design</li>
              <li>Backend API integration</li>
              <li>Full-stack project development</li>
              <li>Clean code & seamless UI/UX</li>
            </ul>
            <a
              href='https://github.com/Shaswathunter/Portfolio-1/tree/main/All%20project'
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 px-5 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
            >
              🔗 View Project
            </a>
                <a
              href={certificate1}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 ml-3 px-5 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition"
            >
              🔗 View Certificate
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
