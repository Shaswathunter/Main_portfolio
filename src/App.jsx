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

function App() {
  return (
    <NeonGlowBackground>
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />

      {/* Each section wrapped in <Element name="..."> */}
      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="skills">
        <Skills />
      </div>

      <div id="projects">
        <Projects />
      </div>

      {/* <Element name="experience">
        <Experience />
      </Element> */}

      <div id="contact">
        <ContactForm />
      </div>
    </NeonGlowBackground>
  );
}

export default App;
