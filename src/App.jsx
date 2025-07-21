import './App.css'
import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
// import Experience from './Components/Experience'
import About from './Components/About'
import NeonGlowBackground from './Components/NeonBackground'
import ContactForm from './Components/ContactForm.jsx'

function App() {
  return (
    <NeonGlowBackground>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      {/* <Experience /> */}
      <ContactForm />
    </NeonGlowBackground>
  )
}

export default App
