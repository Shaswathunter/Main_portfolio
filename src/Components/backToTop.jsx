import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById("scroll-container") || window;

    const handleScroll = () => {
      const scrollTop =
        container === window ? window.scrollY : container.scrollTop;

      setVisible(scrollTop > (document.body.scrollHeight * 1));
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => { 
    const el = document.getElementById("scroll-container");
    if (el) {
      el.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-6 right-6 z-[99999] p-4 rounded-full
                     bg-black/80 backdrop-blur-md
                     border border-cyan-400
                     shadow-[0_0_15px_rgba(34,211,238,0.8),0_0_30px_rgba(34,211,238,0.6)]
                     text-cyan-400 hover:text-white
                     hover:bg-gradient-to-r hover:from-cyan-400 hover:to-purple-500
                     hover:shadow-[0_0_20px_rgba(236,72,153,0.9),0_0_40px_rgba(34,211,238,0.8)]
                     transition-all duration-300 ease-out"
        >
          <FaArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default BackToTop;
