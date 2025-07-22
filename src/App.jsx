import './App.css';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Skills from './Components/Skills';
import Projects from './Components/Projects';
// import Experience from './Components/Experience'
import About from './Components/About';
import NeonGlowBackground from './Components/NeonBackground';
import ContactForm from './Components/ContactForm.jsx';
import { Toaster } from 'react-hot-toast';
import  {Element}  from 'react-scroll'; // ✅ Add this

function App() {
  return (
    <NeonGlowBackground>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      {/* Each section wrapped in <Element name="..."> */}
      <Element name="home">
        <Hero />
      </Element>

      <Element name="about">
        <About />
      </Element>

      <Element name="skills">
        <Skills />
      </Element>

      <Element name="projects">
        <Projects />
      </Element>

      {/* <Element name="experience">
        <Experience />
      </Element> */}

      <Element name="contact">
        <ContactForm />
      </Element>
    </NeonGlowBackground>
  );
}

export default App;
