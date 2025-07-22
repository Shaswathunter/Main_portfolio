import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const NeonBackground = ({ children }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = wrapperRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <div
      ref={wrapperRef}
      onMouseMove={handleMouseMove}
      className="relative w-full bg-black min-h-screen overflow-visible"
    >
      {/* Neon Glow */}
      <motion.div
        className="pointer-events-none absolute w-[500px] h-[500px] rounded-full z-20"
        style={{
          top: smoothY,
          left: smoothX,
          translateX: "-50%",
          translateY: "-50%",
          background: "radial-gradient(circle, rgba(0,255,255,0.8), transparent 80%)",
          filter: "blur(50px)",
        }}
      />

      {/* Actual Page Content */}
      <div className="relative z-50">{children}</div>
    </div>
  );
};

export default NeonBackground;
