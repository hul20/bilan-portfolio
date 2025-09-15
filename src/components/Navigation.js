import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useSound } from '../utils/sounds';
import ThemeSelector from './ThemeSelector';

const Navigation = () => {
  const { theme, currentTheme } = useTheme();
  const { playSound } = useSound(currentTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    playSound('nav');
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    closeMobileMenu();
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const highlightActiveNav = () => {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
          current = section.getAttribute('id');
        }
      });

      setActiveSection(current);
    };

    const updateNavbarBackground = () => {
      const navbar = document.querySelector('nav');
      if (window.scrollY > 50) {
        navbar.classList.add('shadow-lg');
        navbar.style.backdropFilter = 'blur(10px)';
      } else {
        navbar.classList.remove('shadow-lg');
        navbar.style.backdropFilter = 'none';
      }
    };

    const handleScroll = () => {
      highlightActiveNav();
      updateNavbarBackground();
    };

    window.addEventListener('scroll', handleScroll);
    
    // Initialize
    highlightActiveNav();
    updateNavbarBackground();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#education', label: 'Education' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <nav className={`glass-nav fixed w-full top-0 z-50 transition-all duration-300`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-3 sm:py-4">
          <div className="flex items-center space-x-4">
            <h1 className={`text-xl sm:text-2xl font-bold ${theme.colors.brand}`}>hulyan</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`${theme.colors.textPrimary} ${theme.colors.hover} transition duration-300 ${
                  activeSection === item.href.substring(1) ? 'active' : ''
                }`}
                onClick={(e) => handleNavClick(e, item.href.substring(1))}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/cv/Jullian_Bilan_CV.pdf"
              download="Jullian_Bilan_CV.pdf"
              className={`flex items-center gap-2 px-4 py-2 glass-button rounded-lg font-semibold ${theme.colors.textPrimary} transition-all duration-300 hover:scale-105`}
              onClick={() => playSound('success')}
            >
              <i className="fas fa-download text-sm"></i>
              CV
            </a>
            <ThemeSelector />
          </div>
          <div className="md:hidden flex items-center space-x-3">
            <ThemeSelector />
            <button 
              onClick={toggleMobileMenu}
              className={`p-2 rounded-md ${theme.colors.textPrimary} ${theme.colors.hover} transition-colors duration-200`}
              aria-label="Toggle mobile menu"
            >
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden pb-4 ${isMobileMenuOpen ? 'block animate-fade-in' : 'hidden'}`}>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`block py-3 px-2 ${theme.colors.textPrimary} ${theme.colors.hover} transition duration-300 rounded-md ${
                  activeSection === item.href.substring(1) ? `${theme.colors.brandBg} ${theme.colors.textInverse}` : ''
                }`}
                onClick={(e) => handleNavClick(e, item.href.substring(1))}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/cv/Jullian_Bilan_CV.pdf"
              download="Jullian_Bilan_CV.pdf"
              className={`flex items-center gap-2 py-3 px-2 mt-2 glass-button rounded-md font-semibold ${theme.colors.textPrimary} transition duration-300`}
              onClick={() => playSound('success')}
            >
              <i className="fas fa-download text-sm"></i>
              Download CV
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
