import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import pic from "../assets/1.png";



const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div className="w-full min-h-screen relative py-20 text-gray-100">
      {/* ✅ Background Image Layer with Scroll Animation */}
      <motion.div
        className="absolute inset-0 bg-center bg-no-repeat bg-contain opacity-25 pointer-events-none sm:bg-contain md:mr-[1200px]"
        style={{ backgroundImage: `url(${pic})` }}
        initial={{ x: -150, opacity: 0 }}
        whileInView={{ x: 0, opacity: 0.25 }}
        transition={{ duration: 1, ease: "easeOut" }}
      ></motion.div>

      {/* ✅ Foreground Content */}
      <div className="relative max-w-screen-lg mx-auto p-4 z-10">
        {/* Animated Heading */}
        <motion.h2
          className="text-5xl font-extrabold text-center text-yellow-400"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          About Me
        </motion.h2>

        {/* Animated Paragraph on Scroll (Right → Left) */}
        <motion.p
          ref={ref}
          className="py-6 text-gray-300 lg:text-center lg:text-2xl md:text-xl leading-relaxed tracking-wide text-justify"
          initial={{ x: 150, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
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
          whileInView={{ opacity: 1 }}
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
