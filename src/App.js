import React from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackgroundMusic from './components/BackgroundMusic';
import ThemeWelcomeModal from './components/ThemeWelcomeModal';

const AppContent = () => {
  const { currentTheme } = useTheme();
  
  return (
    <div className={`App theme-transition ${currentTheme === 'retro8bit' ? 'retro8bit-theme' : ''}`}>
      <Navigation />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Education />
      <Contact />
      <Footer />
      <BackgroundMusic />
      <ThemeWelcomeModal />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
