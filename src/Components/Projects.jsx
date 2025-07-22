import React from "react";
import { motion } from "framer-motion";
import blog from "../assets/blog-app.mp4";
const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "Full-Stack Blog Platform",
      description:
        "Personalize your blogging experience with insights and recommendations tailored to your interests.",
      video: `${blog}`,
      demoLink: "https://blog-app-eylr.vercel.app/",
      codeLink: "https://github.com/Shaswathunter/Blog_app",
    },
    {
      id: 2,
      title: "AI Assistant Platform",
      description:
        "Advanced AI platform for automated customer service and support.",
      video: "/ai-assistant.mp4",
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 3,
      title: "Fraud Detection System",
      description:
        "Real-time fraud detection system using machine learning algorithms.",
      video: "/fraud-detection.mp4",
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 4,
      title: "E-Commerce Recommendation Engine",
      description:
        "AI-driven recommendation engine for personalized shopping experiences.",
      video: "/ecommerce.mp4",
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 5,
      title: "Weather Forecasting App",
      description:
        "Accurate weather predictions using advanced meteorological data analysis.",
      video: "/weather.mp4",
      demoLink: "#",
      codeLink: "#",
    },
    {
      id: 6,
      title: "Blockchain Voting System",
      description:
        "Secure and transparent voting system powered by blockchain technology.",
      video: "./assets/blog-app.mp4",
      demoLink: "#",
      codeLink: "#",
    },
  ];

  return (
    <div
      name="projects"
      className="w-full min-h-screen  text-gray-100 py-20 relative overflow-hidden"
    >
      {/* Enhanced Neon background animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          rotate: [0, 360, 0],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      ></motion.div>

      <div className="max-w-screen-lg p-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="pb-8 text-center"
        >
          <h2 className="text-5xl font-extrabold inline border-b-4 border-blue-500">
            Featured Projects
          </h2>
          <p className="py-6 text-lg text-gray-400">
            Explore some of my recent work and innovations
          </p>
        </motion.div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
          {projects.map(
            ({ id, title, description, demoLink, codeLink, video }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <video
                  src={video}
                  className="w-full h-56 object-cover transition-transform duration-300 hover:scale-105 hover:brightness-105"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
                <div className="p-5 text-center">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                    {title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-5">{description}</p>
                  <div className="flex justify-center gap-4">
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={demoLink}
                      className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition-all"
                    >
                      Demo
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={codeLink}
                      className="px-5 py-2 border-2 border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-all"
                    >
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Projects;
