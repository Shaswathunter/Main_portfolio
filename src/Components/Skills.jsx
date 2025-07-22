import React from "react";
import { motion } from "framer-motion";
const Skills = () => {
  const skills = [
    {
      category: "Frontend",
      items: ["React.JS", "TailwindCSS", "jQuery", "JavaScript"],
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
      transition: {
        staggerChildren: 0.3,
      },
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
      {/* Neon light effect */}
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
              className="shadow-lg shadow-gray-800 rounded-xl p-6  hover:shadow-xl hover:shadow-green-400"
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
      </div>
    </div>
  );
};

export default Skills;
