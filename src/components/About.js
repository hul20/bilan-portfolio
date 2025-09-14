import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

const About = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  
  // Scroll animations
  const headerRef = useScrollAnimation('fade-in-up');
  const imageRef = useScrollAnimation('fade-in-left');
  const textRef = useScrollAnimation('fade-in-right');
  const interestsRef = useStaggeredScrollAnimation('fade-in-scale', 100);

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
    <section ref={sectionRef} id="about" className={`py-20 ${theme.colors.secondary}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-4`}>About Me</h2>
          <div className={`w-20 h-1 ${theme.colors.brandBg} mx-auto`}></div>
        </div>
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
          <div ref={imageRef}>
            <div className={`bg-gradient-to-br ${theme.colors.gradientFrom} ${theme.colors.gradientTo} rounded-lg overflow-hidden h-64 sm:h-72 md:h-80 flex items-center justify-center`}>
              <img 
                src="/images/hgda.jpg" 
                alt="Jullian Bilan"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback icon */}
              <div className="w-full h-full flex items-center justify-center" style={{display: 'none'}}>
                <i className={`fas fa-user-graduate text-8xl ${theme.colors.brand}`}></i>
              </div>
            </div>
          </div>
          <div ref={textRef}>
            <h3 className={`text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 ${theme.colors.textPrimary}`}>Hello! I'm Jullian</h3>
            <p className={`${theme.colors.textSecondary} text-base sm:text-lg leading-relaxed mb-4 sm:mb-6`}>
              A Computer Science student at West Visayas State University with a deep passion for creation, 
              whether in software, hardware, robotics, or building websites. My curiosity fuels this drive 
              to explore, build, and innovate.
            </p>
            <p className={`${theme.colors.textSecondary} text-base sm:text-lg leading-relaxed mb-4 sm:mb-6`}>
              I'm especially fascinated by machine learning and how it can shape the future of technology. 
              Beyond academics, I love immersing myself in the outdoors, expressing creativity through art, 
              enjoying gaming and music, and following the thrill of motorsports.
            </p>
            <p className={`${theme.colors.textSecondary} text-base sm:text-lg leading-relaxed`}>
              These interests keep me inspired, balanced, and constantly motivated to turn ideas into reality.
            </p>
          </div>
        </div>

        {/* Interests Badges */}
        <div className="w-full mt-8 sm:mt-12">
          <h4 className={`text-xl sm:text-2xl font-bold ${theme.colors.textPrimary} mb-6 sm:mb-8 text-center`}>
            My Interests & Hobbies
          </h4>
          <div ref={interestsRef} className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center">
            <span className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-4 ${theme.colors.brandBg} ${theme.colors.textInverse} rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
              <i className="fas fa-running text-base sm:text-xl"></i>
              Running
            </span>
            <span className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-4 ${theme.colors.brandBg} ${theme.colors.textInverse} rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
              <i className="fas fa-mountain text-base sm:text-xl"></i>
              Hiking
            </span>
            <span className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-4 ${theme.colors.brandBg} ${theme.colors.textInverse} rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
              <i className="fas fa-biking text-base sm:text-xl"></i>
              MTB
            </span>
            <span className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-4 ${theme.colors.brandBg} ${theme.colors.textInverse} rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
              <i className="fas fa-palette text-base sm:text-xl"></i>
              Watercolor
            </span>
            <span className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-4 ${theme.colors.brandBg} ${theme.colors.textInverse} rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
              <i className="fas fa-futbol text-base sm:text-xl"></i>
              Football
            </span>
            <span className={`inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-4 ${theme.colors.brandBg} ${theme.colors.textInverse} rounded-full text-sm sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}>
              <i className="fas fa-flag-checkered text-base sm:text-xl"></i>
              Motorsports
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
