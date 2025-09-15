import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Education = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  
  // Scroll animations
  const headerRef = useScrollAnimation('fade-in-up');
  const degreeRef = useScrollAnimation('fade-in-left');
  const scholarshipRef = useScrollAnimation('fade-in-right');

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
    <section ref={sectionRef} id="education" className={`py-20 ${theme.colors.secondary}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-4`}>Education</h2>
          <div className={`w-20 h-1 ${theme.colors.brandBg} mx-auto`}></div>
        </div>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Current Degree Information */}
          <div ref={degreeRef} className={`glass-card rounded-lg p-4 sm:p-6 md:p-8`}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${theme.colors.brandBg} rounded-full flex items-center justify-center`}>
                  <i className="fas fa-graduation-cap text-white text-xl sm:text-2xl"></i>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold ${theme.colors.textPrimary} mb-2`}>Bachelor of Science in Computer Science</h3>
                <p className={`text-base sm:text-lg ${theme.colors.accent} font-medium mb-2`}>Major in Artificial Intelligence</p>
                <p className={`text-lg sm:text-xl ${theme.colors.brand} font-medium mb-2`}>West Visayas State University</p>
                <p className={`${theme.colors.textSecondary} text-base sm:text-lg`}>Expected Graduation: 2027</p>
              </div>
            </div>
          </div>

          {/* Education Timeline */}
          <div className={`glass-card rounded-lg p-4 sm:p-6 md:p-8`}>
            <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold ${theme.colors.textPrimary} mb-6 text-center`}>Education Journey</h3>
            <p className={`${theme.colors.textSecondary} text-center mb-8 text-sm sm:text-base`}>My academic progression leading to my current studies at WVSU</p>
            
            {/* Timeline */}
            <div className="relative">
              {/* Timeline Line */}
              <div className={`absolute left-8 top-0 bottom-0 w-0.5 ${theme.colors.brandBg}`}></div>
              
              {/* Capiz State University - First */}
              <div className="relative flex items-start mb-8">
                <div className={`w-16 h-16 ${theme.colors.accentBg} rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
                  <i className="fas fa-school text-white text-xl"></i>
                </div>
                <div className="ml-6">
                  <h4 className={`text-base sm:text-lg md:text-xl font-semibold ${theme.colors.textPrimary} mb-1`}>Capiz State University</h4>
                  <p className={`${theme.colors.accent} font-medium text-sm sm:text-base mb-1`}>Junior High School (Grades 7-10)</p>
                  <p className={`${theme.colors.textSecondary} text-sm sm:text-base mb-2`}>2017 - 2021</p>
                  <p className={`${theme.colors.textSecondary} text-xs sm:text-sm leading-relaxed`}>
                    Built strong foundation in mathematics, science, and technology that sparked my interest in computer science.
                  </p>
                </div>
              </div>
              
              {/* College of St. John Roxas - Second */}
              <div className="relative flex items-start mb-8">
                <div className={`w-16 h-16 ${theme.colors.brandBg} rounded-full flex items-center justify-center flex-shrink-0 z-10`}>
                  <i className="fas fa-graduation-cap text-white text-xl"></i>
                </div>
                <div className="ml-6">
                  <h4 className={`text-base sm:text-lg md:text-xl font-semibold ${theme.colors.textPrimary} mb-1`}>College of St. John Roxas</h4>
                  <p className={`${theme.colors.accent} font-medium text-sm sm:text-base mb-1`}>Senior High School (Grades 11-12)</p>
                  <p className={`${theme.colors.textSecondary} text-sm sm:text-base mb-2`}>2021 - 2023</p>
                  <p className={`${theme.colors.textSecondary} text-xs sm:text-sm leading-relaxed`}>
                    Specialized in STEM track, preparing for university-level computer science studies and developing programming fundamentals.
                  </p>
                </div>
              </div>
              
              {/* Transition Arrow */}
              <div className="relative flex items-center justify-center mb-8">
                <div className={`w-12 h-12 ${theme.colors.brandBg} rounded-full flex items-center justify-center z-10`}>
                  <i className="fas fa-arrow-down text-white text-lg"></i>
                </div>
              </div>
              
              {/* Current University Connection */}
              <div className="relative">
                <div className={`w-16 h-16 ${theme.colors.brandBg} rounded-full flex items-center justify-center flex-shrink-0 z-10 ring-4 ring-orange-200`}>
                  <i className="fas fa-university text-white text-xl"></i>
                </div>
                <div className="ml-6">
                  <h4 className={`text-base sm:text-lg md:text-xl font-semibold ${theme.colors.textPrimary} mb-1`}>Continuing at West Visayas State University</h4>
                  <p className={`${theme.colors.brand} font-medium text-sm sm:text-base mb-1`}>Bachelor of Science in Computer Science</p>
                  <p className={`${theme.colors.textSecondary} text-sm sm:text-base mb-2`}>2023 - Present (Expected 2027)</p>
                  <p className={`${theme.colors.textSecondary} text-xs sm:text-sm leading-relaxed`}>
                    Now pursuing my passion for AI and machine learning, building on the solid foundation from my previous education.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DOST Scholarship */}
          <div ref={scholarshipRef} className={`glass-card rounded-lg p-4 sm:p-6 md:p-8`}>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 ${theme.colors.accentBg} rounded-full flex items-center justify-center`}>
                  <i className="fas fa-award text-white text-xl sm:text-2xl"></i>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className={`text-lg sm:text-xl md:text-2xl font-semibold ${theme.colors.textPrimary} mb-2`}>DOST Undergraduate Scholar</h3>
                <p className={`text-lg sm:text-xl ${theme.colors.accent} font-medium mb-2`}>Department of Science and Technology</p>
                <p className={`${theme.colors.textSecondary} text-base sm:text-lg mb-2`}>Batch 2023 • RA 7687</p>
                <p className={`${theme.colors.textSecondary} text-sm sm:text-base leading-relaxed`}>
                  Merit-based scholarship program supporting students in Science, Technology, Engineering, and Mathematics (STEM) fields to develop the country's scientific and technological capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
