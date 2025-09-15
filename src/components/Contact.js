import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ContactButton = ({ href, icon, text, bgColor, hoverColor, target }) => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseEnter = () => {
      button.style.transform = 'translateY(-3px) scale(1.05)';
      button.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
    };
    
    const handleMouseLeave = () => {
      button.style.transform = 'translateY(0) scale(1)';
      button.style.boxShadow = 'none';
    };

    button.addEventListener('mouseenter', handleMouseEnter);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <a 
      ref={buttonRef}
      href={href} 
      target={target}
      className={`flex items-center justify-center gap-3 sm:gap-4 glass-button px-4 sm:px-6 md:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 w-full sm:w-auto text-white hover:scale-105`}
    >
      <i className={`${icon} text-lg sm:text-xl`}></i>
      <span className="text-sm sm:text-base md:text-lg font-medium truncate">{text}</span>
    </a>
  );
};

const Contact = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    const section = sectionRef.current;
    if (section) {
      const animatedElements = section.querySelectorAll('section > div');
      animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
    }

    return () => {
      if (section) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className={`py-20 ${theme.colors.tertiary} ${theme.colors.textInverse}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className={`w-20 h-1 ${theme.colors.brandBg} mx-auto mb-6 sm:mb-8`}></div>
          <p className={`text-lg sm:text-xl ${theme.colors.textMuted} max-w-2xl mx-auto px-4`}>
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
          </p>
        </div>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8">
          <ContactButton
            href="mailto:jullianbilan20@gmail.com"
            icon="fas fa-envelope"
            text="jullianbilan20@gmail.com"
            bgColor={theme.colors.brandBg}
            hoverColor={theme.colors.brandHover}
          />
          <ContactButton
            href="https://github.com/hul20"
            icon="fab fa-github"
            text="GitHub Profile"
            bgColor={theme.colors.accentBg}
            hoverColor={theme.colors.accentHover}
            target="_blank"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
