import React, { useState, useEffect } from "react";
import { responses } from "./ChatBotResponses";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreet, setShowGreet] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  // 🕒 Auto hide greeting after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowGreet(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const getBestReply = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    for (const res of responses) {
      if (res.keywords.some((k) => lowerMsg.includes(k))) return res.reply;
    }
    return "I'm not sure about that 🤔, but Shaswat would love to explain more!";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    const botMsg = { sender: "bot", text: getBestReply(input) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  // Add this below your state definitions
// 🕒 Show greeting popup every 2 seconds (toggle on/off)
useEffect(() => {
  const interval = setInterval(() => {
    setShowGreet((prev) => !prev);
  }, 3000); // every 3 seconds toggle

  return () => clearInterval(interval);
}, []);

  return (
    <>
 {/* 🐇 Rabbit Jump Floating Icon + Greeting Bubble */}
<div className="fixed bottom-6 right-6 flex flex-col items-end space-y-2">
  {/* 👋 Greeting Popup */}
  <AnimatePresence>
    {showGreet && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 text-sm px-3 py-2 rounded-lg shadow-lg mb-2 border border-gray-300 dark:border-gray-700"
      >
        👋 Hi, I'm Shaswat's Arya! How can I help you?
      </motion.div>
    )}
  </AnimatePresence>

  {/* 🐇 Jumping Chat Button */}
  <motion.button
    onClick={() => setIsOpen(!isOpen)}
    animate={{
      y: [10, -45, 0],
      rotate: [0, -8, 0],
      boxShadow: [
        "0px 0px 10px rgba(99,102,241,0.5)",
        "0px 0px 20px rgba(147,51,234,0.6)",
        "0px 0px 10px rgba(99,102,241,0.5)",
      ],
    }}
    transition={{
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 1.8,
      ease: "easeInOut",
    }}
    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-lg border border-white/20 hover:scale-110 transition-transform"
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </motion.div>
  </motion.button>
</div>




      {/* 🪄 Floating Bouncy Chat Icon */}
      

      {/* 💬 Chat Window */}
    {/* 💬 Chat Window */}
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-20 right-4 w-[90%] max-w-sm sm:right-6 sm:w-96 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[9999]"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold p-3 flex justify-between items-center">
        <span className="text-sm sm:text-base truncate">Arya — Shaswat's AI Assistant</span>
        <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
          <X size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="h-72 sm:h-80 overflow-y-auto p-3 space-y-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-lg max-w-[85%] text-sm sm:text-base ${
              msg.sender === "user"
                ? "ml-auto bg-blue-100 dark:bg-blue-800 text-gray-900 dark:text-white"
                : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            }`}
          >
            {msg.sender === "bot" ? (
              <p
                className="leading-snug"
                dangerouslySetInnerHTML={{ __html: msg.text }}
              ></p>
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="flex items-center p-2 sm:p-3 border-t dark:border-gray-700">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 border dark:border-gray-600 rounded-lg px-2 py-1 text-xs sm:text-sm focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          placeholder="Ask about Shaswat..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-2 sm:px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm"
        >
          Send
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};

export default Chatbot;
