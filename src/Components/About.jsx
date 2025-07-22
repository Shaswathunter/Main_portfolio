import React from "react";
import { motion } from "framer-motion";

const About = () => {
    return (
        <div className="w-full min-h-screen  text-gray-100 py-20">
            <div className="max-w-screen-lg mx-auto p-4">
                {/* Animated Heading */}
                <motion.h2
                    className="text-5xl font-extrabold text-center text-yellow-400"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}


                >
                    About Me
                </motion.h2>

                {/* Animated Paragraph */}
                <motion.p
                    className="py-6 text-gray-300 lg:text-center lg:text-2xl md:text-xl leading-relaxed tracking-wide text-justif"
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut", delay: 0.2 }}
                >
                    Hi! I'm a passionate Full Stack Web Developer specializing in the MERN
                    Stack (MongoDB, Express.js, React.js, Node.js). I build scalable,
                    responsive, and high-performance web applications — from clean, modern
                    frontends to robust backend APIs. Whether you're a startup needing an
                    MVP or an established brand looking to upgrade your platform, I can
                    bring your ideas to life with efficient and maintainable code. 🛠️ Tech
                    Stack: Frontend: React.js, HTML5, CSS3, JavaScript (ES6+), Bootstrap,
                    Tailwind CSS Backend: Node.js, Express.js, REST APIs Database:
                    MongoDB, Mongoose Other Tools: Git, GitHub, Postman, Vercel, Render,
                    Firebase 🚀 I'm always focused on writing clean, reusable code and
                    following best practices. I enjoy solving real-world problems and
                    turning business needs into functional web solutions. ✅ Why work with
                    me? 100% commitment to deadlines Clear communication Attention to
                    detail Eagerness to learn and improve Let’s work together to build
                    something amazing. I’m currently open for freelance and remote
                    opportunities!
                </motion.p>

                {/* Magic Text Animation */}
                <motion.div
                    className="text-center mt-10 text-2xl font-semibold text-yellow-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        repeatType: "reverse",
                    }}
                >
                    Let's create something magical together! ✨
                </motion.div>
            </div>
        </div>
    );
};

export default About;
