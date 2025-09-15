import React, { useState, useEffect } from 'react';
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
import LoadingScreen from './components/LoadingScreen';
import SiteProtection from './components/SiteProtection';

const AppContent = () => {
  const { currentTheme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time - you can adjust this or tie it to actual loading events
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };
  
  return (
    <div className={`App theme-transition ${currentTheme === 'retro8bit' ? 'retro8bit-theme' : ''}`}>
      <SiteProtection />
      <LoadingScreen isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      
      {!isLoading && (
        <>
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
        </>
      )}
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
