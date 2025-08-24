import React, { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const NeonBackground = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });
  const wrapperRef = useRef(null);

  const colors = [
    "rgba(0,255,255,0.8)",
    "rgba(255,0,255,0.7)",
    "rgba(0,255,100,0.7)",
    "rgba(255,255,0,0.7)",
    "rgba(255,0,100,0.7)",
  ];
  const [colorIndex, setColorIndex] = useState(0);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  useEffect(() => {
    const rect = wrapperRef.current.getBoundingClientRect();
    mouseX.set(rect.width / 2);
    mouseY.set(rect.height / 2);
  }, []);

  return (
    <div
      id="scroll-container"
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      onClick={() => setColorIndex((p) => (p + 1) % colors.length)}
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden bg-black cursor-pointer"
    >
      {/* Neon Glow (always behind) */}
      <motion.div
  className="pointer-events-none fixed w-[500px] h-[500px] rounded-full mix-blend-screen"
  style={{
    top: smoothY,
    left: smoothX,
    translateX: "-50%",
    translateY: "-50%",
    background: `radial-gradient(circle, ${colors[colorIndex]}, transparent 80%)`,
    filter: "blur(50px)",
    zIndex: 0,
  }}
/>

      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default NeonBackground;
