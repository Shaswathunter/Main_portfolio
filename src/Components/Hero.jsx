import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaDownload } from "react-icons/fa";

import profile from "../assets/im2.png";
import Resume from "../assets/Resume.pdf";

const Hero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      tl.from(".hero-badge", {
        opacity: 0,
        y: 20,
        duration: 0.6,
      })
        .from(
          ".hero-heading",
          {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".hero-text",
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        )
        .from(
          ".hero-buttons",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
          },
          "-=0.4"
        )
        .from(
          ".hero-image",
          {
            opacity: 0,
            scale: 0.92,
            duration: 1,
            ease: "power3.out",
          },
          "-=1"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden px-5 pt-32 pb-20 sm:px-8 lg:px-12"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(6,182,212,0.12),transparent_45%)]" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-24">

        {/* LEFT CONTENT */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">

          {/* Badge */}
          <div className="hero-badge mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-300 backdrop-blur-sm">
            Full Stack Developer • MERN Stack
          </div>

          {/* Heading */}
          <h1 className="hero-heading text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Building Fast,
            <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Scalable Digital
            </span>
            Experiences.
          </h1>

          {/* Description */}
          <p className="hero-text mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg">
            I'm Shaswat Gautam — a Full Stack Developer focused on building
            premium web applications with modern frontend engineering,
            scalable backend systems, and smooth user experiences.
          </p>

          {/* Buttons */}
          <div className="hero-buttons mt-10 flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:flex-wrap">

            {/* Projects Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="rounded-xl bg-cyan-500 px-7 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.35)]"
            >
              View Projects
            </motion.button>

            {/* Resume Button */}
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              href={Resume}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-cyan-400/20"
            >
              Resume
              <FaDownload />
            </motion.a>
          </div>

          {/* Social Icons */}
          <div className="mt-10 flex items-center gap-5 text-2xl text-zinc-500">

            <motion.a
              whileHover={{ y: -3 }}
              href="https://github.com/Shaswathunter"
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-300 hover:text-white"
            >
              <FaGithub />
            </motion.a>

            <motion.a
              whileHover={{ y: -3 }}
              href="https://linkedin.com/in/codershaswat"
              target="_blank"
              rel="noreferrer"
              className="transition-all duration-300 hover:text-white"
            >
              <FaLinkedin />
            </motion.a>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div
          className="
            hero-image 
            relative 
            mx-auto 
            mt-12 
            flex 
            items-center 
            justify-center
            w-[220px] h-[220px]
            sm:w-[280px] sm:h-[280px]
            md:w-[380px] md:h-[380px]
            lg:mt-0
            lg:w-[480px] lg:h-[480px]
          "
        >

          {/* Glow */}
          <div className="absolute inset-0 rounded-full bg-cyan-500/10 " />

          {/* Image */}
         <motion.img
  drag
  dragConstraints={{
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }}
  dragElastic={0.18}
  dragTransition={{
    bounceStiffness: 800,
    bounceDamping: 8,
  }}
  whileDrag={{
    scale: 1.04,
    cursor: "grabbing",
  }}
  whileHover={{
    scale: 1.10,
  }}
  src={profile}
  alt="Shaswat Gautam"
  loading="eager"
  className="relative z-10 h-full w-full rounded-full border border-white/10 object-cover shadow-2xl cursor-grab active:cursor-grabbing"
/>
        </div>
      </div>
    </section>
  );
};

export default Hero;