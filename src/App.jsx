import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Skills from "./Components/Skills";
import Projects from "./Components/Projects";
import About from "./Components/About";
import NeonGlowBackground from "./Components/NeonBackground";
import ContactForm from "./Components/ContactForm.jsx";
import { Toaster } from "react-hot-toast";
import BackToTop from "./Components/backToTop.jsx";
import ChatBot from "./Components/ChatBot.jsx";
import HiddenRunner from "./Components/HiddenRunner.jsx";

function App() {
   return (
    <NeonGlowBackground>
      <HiddenRunner /> {/* Background Game */}
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      <div id="home"><Hero /></div>
      <div id="about"><About /></div>
      <div id="skills"><Skills /></div>
      <div id="projects"><Projects /></div>
      <div id="contact"><ContactForm /></div>
      <BackToTop />
      <ChatBot />
    </NeonGlowBackground>
  );
}

export default App;
