import React, { useState, useEffect, useRef } from "react";
import { responses } from "./ChatBotResponses";
import { MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreet, setShowGreet] = useState(true);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [greetIndex, setGreetIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  const greetings = [
    "👋 Hey there! I’m Arya, Shaswat’s AI Assistant.",
    "💼 Want to explore Shaswat’s projects or resume?",
    "💡 Ask me anything about Shaswat’s skills or contact info!"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showGreet) interval = setTimeout(() => setShowGreet(false), 5000);
    else
      interval = setTimeout(() => {
        setGreetIndex((p) => (p + 1) % greetings.length);
        setShowGreet(true);
      }, 2000);
    return () => clearTimeout(interval);
  }, [showGreet]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getBestReply = (message: string): string => {
    const lowerMsg = message.toLowerCase();
    const matchedReplies: string[] = [];

    for (const res of responses) {
      if (res.keywords.some((k) => lowerMsg.includes(k))) {
        matchedReplies.push(res.reply);
      }
    }

    if (!matchedReplies.length)
      return "🤔 I’m not entirely sure, but Shaswat would love to explain that in detail!";

    return matchedReplies.join("<br/><br/>✨<br/><br/>");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    // 🕹️ Easter Egg Trigger (Hidden Runner Game)
if (input.toLowerCase().includes("play") || input.toLowerCase().includes("run") || input.toLowerCase().includes("game")) {
  const botMsg = { sender: "bot", text: "🎮 Opening the hidden runner game... Enjoy!" };
  setMessages((prev) => [...prev, botMsg]);
  setTimeout(() => {
    window.open("/hidden-runner", "_blank");
  }, 1000);
  setIsTyping(false);
  return;
}


    setTimeout(() => {
      const botMsg = { sender: "bot", text: getBestReply(userMsg.text) };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Chat Button + Greeting */}
      <div className="fixed bottom-6 right-6 flex flex-col items-end space-y-3 z-[100000]">
        {/* Greeting Tooltip */}
{/* Greeting Tooltip (Smooth Synchronized Bounce) */}
<motion.div
  key={greetIndex}
  animate={{
    y: [0, -15, 0],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="relative bg-white/10 dark:bg-gray-900/30 backdrop-blur-md text-gray-100 text-sm px-4 py-2 rounded-2xl shadow-lg overflow-hidden"
>
  <span className="relative z-10">{greetings[greetIndex]}</span>

  {/* Glowing Border */}
  <div className="absolute inset-0 rounded-2xl pointer-events-none glow-border"></div>
</motion.div>








        {/* Chat Toggle Button (Rabbit Jump Style) */}
       <motion.button
  onClick={() => setIsOpen(!isOpen)}
  animate={{
    y: [0, -15, 0],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  whileHover={{ scale: 1.1 }}
  className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 rounded-full text-white shadow-2xl border border-white/20"
>
  {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
  <motion.span
    className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-40 blur-lg"
    animate={{ scale: [1, 1.3, 1] }}
    transition={{ duration: 2, repeat: Infinity }}
  />
</motion.button>

      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 70 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 70 }}
            transition={{ duration: 0.4 }}
            className="fixed bottom-24 right-5 w-[90%] max-w-sm sm:right-8 sm:w-96 
              rounded-[28px] border border-white/20 backdrop-blur-2xl 
              bg-gradient-to-br from-gray-900/80 to-gray-800/70 text-gray-100 shadow-2xl overflow-hidden z-[100000]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex justify-between items-center text-white font-semibold rounded-t-[28px]">
              <span className="truncate text-sm sm:text-base">🤖 Arya — Shaswat's AI</span>
              <button onClick={() => setIsOpen(false)} className="hover:text-gray-300">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 sm:h-80 overflow-y-auto p-3 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3, type: "spring" }}
                  className={`relative max-w-[85%] px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-md border ${
                    msg.sender === "user"
                      ? "self-end ml-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-400/50"
                      : "bg-white/10 backdrop-blur-md border border-white/10 text-gray-200"
                  }`}
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex space-x-1 text-gray-400 pl-2"
                >
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-200">●</span>
                  <span className="animate-bounce delay-400">●</span>
                </motion.div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input */}
            <div className="flex items-center p-3 border-t border-white/10 bg-gray-800/60 rounded-b-[28px]">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ask Arya about Shaswat..."
                className="flex-1 bg-transparent text-sm text-gray-200 placeholder-gray-400 focus:outline-none"
              />
              <button
                onClick={handleSend}
                className="ml-3 px-4 py-1.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-white text-sm font-medium hover:opacity-90 transition"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom CSS Animations */}
      <style >{`
      @keyframes glowPulse {
  0% {
    box-shadow: 0 0 8px rgba(99, 102, 241, 0.6),
                0 0 12px rgba(168, 85, 247, 0.5),
                0 0 16px rgba(236, 72, 153, 0.4);
  }
  50% {
    box-shadow: 0 0 18px rgba(99, 102, 241, 0.9),
                0 0 28px rgba(168, 85, 247, 0.8),
                0 0 36px rgba(236, 72, 153, 0.7);
  }
  100% {
    box-shadow: 0 0 8px rgba(99, 102, 241, 0.6),
                0 0 12px rgba(168, 85, 247, 0.5),
                0 0 16px rgba(236, 72, 153, 0.4);
  }
}

.glow-border {
  border-radius: 1rem;
  border: 1px solid transparent;
  background: linear-gradient(135deg, rgba(99,102,241,0.4), rgba(168,85,247,0.4), rgba(236,72,153,0.4)) border-box;
  mask-composite: exclude;
  animation: glowPulse 2s infinite ease-in-out;
  box-shadow: 0 0 12px rgba(168, 85, 247, 0.6);
}

      `}</style>
    </>
  );
};

export default Chatbot;
