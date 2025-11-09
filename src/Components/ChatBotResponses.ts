export interface ChatResponse {
  keywords: string[];
  reply: string;
}

export const responses: ChatResponse[] = [
  // Basic identity
  {
    keywords: ["name", "who are you"],
    reply: "I'm Arya — your AI assistant representing Shaswat DR Gautam, a passionate Full Stack Developer 👨‍💻",
  },
  {
    keywords: ["who created you", "made you", "developer", "creator"],
    reply: "I was created by Shaswat DR Gautam, built using React.js and smart logic to make your portfolio interactive 🤖",
  },

  // Normal conversation
  {
    keywords: ["how are you", "how you doing", "how’s it going"],
    reply: "I'm feeling great! 😄 How about you?",
  },
  {
    keywords: ["what are you doing", "doing now", "busy"],
    reply: "Just chatting with you 💬 and helping people learn more about Shaswat!",
  },
  {
    keywords: ["where are you from", "your location", "you live"],
    reply: "I live right inside Shaswat’s portfolio website 🌐",
  },
  {
    keywords: ["are you real", "you human", "you alive"],
    reply: "Not exactly human 😅 — but I try my best to sound friendly and helpful like one!",
  },
  {
    keywords: ["good morning", "good evening", "good night"],
    reply: "Sending you positive vibes 🌞💫 Hope you’re having a great day!",
  },

  // Professional Info
  {
    keywords: ["about", "yourself", "intro", "introduction"],
    reply:
      "Shaswat Gautam is a creative and detail-oriented Full Stack Developer who loves transforming ideas into interactive web experiences 🌐",
  },
  {
    keywords: ["objective", "goal", "aim"],
    reply:
      "Shaswat’s goal is to build impactful web applications and contribute to innovative tech solutions that make a real-world difference 🚀",
  },
  {
    keywords: ["education", "study", "college", "course"],
    reply:
      "Shaswat completed a MERN Stack Development Course, mastering React.js, Node.js, Express.js, and MongoDB. He's always learning new tech and AI integrations 🎓",
  },
  {
    keywords: ["skill", "tech", "stack", "language", "technology"],
    reply:
      "His tech stack includes React.js, JavaScript, TypeScript, jQuery, HTML, CSS, Bootstrap, TailwindCSS, Node.js, Express.js, and MongoDB ⚙️",
  },
  {
    keywords: ["frontend", "backend"],
    reply:
      "Frontend: React.js, TypeScript, JavaScript, TailwindCSS | Backend: Node.js, Express.js | Database: MongoDB 🧠",
  },

  // Projects
  {
    keywords: ["project", "work", "portfolio", "projects"],
    reply:
      "Shaswat has built several amazing projects including his Main Portfolio, a Fullstack Blog Application, and an AI Code Reviewer — all using the MERN stack 💻",
  },
  {
    keywords: ["portfolio", "main portfolio"],
    reply:
      "The Main Portfolio is a stunning React.js + TailwindCSS site with Framer Motion animations, showcasing Shaswat’s journey and skills ✨",
  },
  {
    keywords: ["blog", "fullstack blog", "application"],
    reply:
      "His Fullstack Blog App allows users to register, log in, and manage blogs with authentication, role-based access, and Cloudinary image upload 📘",
  },
  {
    keywords: ["ai", "code reviewer", "gemini", "ai project"],
    reply:
      "He created an AI Code Reviewer using Google Gemini 2.5 and React to analyze and improve JavaScript code intelligently 🤖",
  },

  // Certifications
  {
    keywords: ["certificate", "certification", "digital marketing", "course"],
    reply:
      "Shaswat holds certifications in Digital Marketing (MSME Certified), Web Development, and MERN Stack Development 🧾",
  },

  // Soft skills & personal
  {
    keywords: ["soft skill", "communication", "teamwork", "problem solving"],
    reply:
      "Shaswat’s soft skills include problem-solving, communication, teamwork, adaptability, and time management 💪",
  },
  {
    keywords: ["age", "old"],
    reply: "Shaswat is 23 years old 🎂  12th Feb  2002",
  },
  {
    keywords: ["hobby", "interest", "fun"],
    reply:
      "He enjoys **playing Minecraft 🎮, learning about AI 🤖, and designing beautiful web interfaces 💡**",
  },
  {
    keywords: ["learning", "currently", "studying"],
    reply:
      "Shaswat is currently learning Next.js, TypeScript, and AI Integration to grow as a full stack developer 📘",
  },

  // Contact
  {
    keywords: ["contact", "email", "reach"],
    reply:
      "You can reach Shaswat at 📧 Shaswat2016@gmail.com or use the contact form on this portfolio 💬",
  },
{
  keywords: ["social", "linkedin", "github", "x", "twitter"],
  reply:
    'Connect with Shaswat on <a href="https://www.linkedin.com/in/codershaswat" target="_blank" class="text-blue-500 underline">LinkedIn</a>, <a href="https://github.com/Shaswathunter" target="_blank" class="text-blue-500 underline">GitHub</a>, and <a href="https://x.com/CoderShaswat" target="_blank" class="text-blue-500 underline">X (Twitter)</a> — links are also available at the top of this portfolio 🔗',
}
,

  // Small talk
  {
    keywords: ["hello", "hi", "hey"],
    reply:
      "Hey there! 👋 I'm Arya — Shaswat’s AI assistant. How’s your day going?",
  },
  {
    keywords: ["thank", "thanks", "thank you"],
    reply: "You're welcome! 😊 Always happy to help.",
  },
  {
    keywords: ["inspire", "motivate", "quote"],
    reply:
      "“Great developers aren’t born — they’re built line by line.” Keep learning and building 🚀",
  },
  {
    keywords: ["bye", "goodbye", "see you"],
    reply: "See you soon 👋 It was great chatting with you!",
  },
  {
  keywords: ["resume", "cv", "show resume", "view resume", "open resume"],
  reply:
    "Sure! Here’s Shaswat DR Gautam’s resume 📄 — <a href='https://shaswat-portfolio-mu.vercel.app/assets/Resume-Dokb2gpZ.pdf' target='_blank' class='text-blue-400 underline'>Click to Open Resume</a>",
},

];
