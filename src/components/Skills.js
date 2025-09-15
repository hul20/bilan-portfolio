import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

const SkillItem = ({ skill, theme, index }) => {
  const itemRef = useRef(null);
  const progressRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const item = itemRef.current;
    if (!item) return;

    const handleMouseEnter = () => {
      item.style.transform = 'translateX(5px) scale(1.02)';
    };
    
    const handleMouseLeave = () => {
      item.style.transform = 'translateX(0) scale(1)';
    };

    item.addEventListener('mouseenter', handleMouseEnter);
    item.addEventListener('mouseleave', handleMouseLeave);

    // Intersection Observer for progress bar animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            // Animate progress bar after a delay
            setTimeout(() => {
              if (progressRef.current) {
                progressRef.current.style.width = `${skill.level}%`;
              }
            }, index * 100); // Stagger animations
          }
        });
      },
      { threshold: 0.3 }
    );

    if (item) observer.observe(item);

    return () => {
      item.removeEventListener('mouseenter', handleMouseEnter);
      item.removeEventListener('mouseleave', handleMouseLeave);
      if (item) observer.unobserve(item);
    };
  }, [skill.level, index, isVisible]);

  const getProgressColor = (level) => {
    if (level >= 90) return 'bg-green-500';
    if (level >= 80) return 'bg-blue-500';
    if (level >= 70) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getProgressGlow = (level) => {
    if (level >= 90) return 'shadow-green-500/50';
    if (level >= 80) return 'shadow-blue-500/50';
    if (level >= 70) return 'shadow-yellow-500/50';
    return 'shadow-orange-500/50';
  };

  return (
    <div 
      ref={itemRef} 
      className={`skill-item-with-bar ${theme.colors.skillBg} ${theme.colors.skillHover} ${theme.colors.skillBorder} text-sm sm:text-base p-4 rounded-lg transition-all duration-300`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className={`${theme.colors.textSecondary} font-medium`}>{skill.name}</span>
        <span className={`${theme.colors.textPrimary} text-xs font-bold`}>{skill.level}%</span>
      </div>
      
      {/* Progress Bar Container */}
      <div className={`w-full h-2 ${theme.colors.skillBg} rounded-full overflow-hidden relative`}>
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-20"></div>
        
        {/* Progress Bar */}
        <div
          ref={progressRef}
          className={`h-full ${getProgressColor(skill.level)} ${getProgressGlow(skill.level)} rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden`}
          style={{ width: '0%' }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

const Skills = () => {
  const { theme } = useTheme();
  const sectionRef = useRef(null);
  
  // Scroll animations
  const headerRef = useScrollAnimation('fade-in-up');
  const gridRef = useStaggeredScrollAnimation('fade-in-scale', 200);

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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "fas fa-code",
      iconColor: "text-orange-600",
      skills: [
        { name: "JavaScript", level: 70 },
        { name: "Python", level: 85 },
        { name: "C/C++", level: 85 },
        { name: "PHP", level: 80 },
      ]
    },
    {
      title: "Frontend Technologies",
      icon: "fas fa-laptop-code",
      iconColor: "text-blue-600",
      skills: [
        { name: "HTML", level: 95 },
        { name: "CSS", level: 90 },
        { name: "React", level: 88 },
        { name: "Vite", level: 82 },
        { name: "Tailwind CSS", level: 92 },
      ]
    },
    {
      title: "Backend & Databases",
      icon: "fas fa-server",
      iconColor: "text-green-600",
      skills: [
        { name: "Laravel", level: 83 },
        { name: "MySQL", level: 80 },
        { name: "Supabase", level: 75 },
        { name: "WebSockets", level: 70 }
      ]
    },
    {
      title: "AI & Machine Learning",
      icon: "fas fa-brain",
      iconColor: "text-purple-600",
      skills: [
        { name: "Pytorch", level: 80 },
        { name: "Langchain", level: 80 },
        { name: "Ollama", level: 78 },
        { name: "NumPy", level: 78 },
        { name: "Pandas", level: 75 },
        { name: "Scikit-Learn", level: 72 }
      ]
    },
    {
      title: "Hardware & IoT",
      icon: "fas fa-microchip",
      iconColor: "text-red-600",
      skills: [
        { name: "Arduino", level: 88 },
        { name: "ESP32", level: 85 },
        { name: "Sensors", level: 82 }
      ]
    },
    {
      title: "Creative & Development Tools",
      icon: "fas fa-palette",
      iconColor: "text-pink-600",
      skills: [
        { name: "Figma", level: 85 },
        { name: "Canva", level: 90 },
        { name: "Git", level: 88 },
        { name: "GitHub", level: 90 },
        { name: "Vercel", level: 82 },
        { name: "Photoshop", level: 60 }
      ]
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className={`py-20 ${theme.colors.primary}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-4`}>Skills & Technologies</h2>
          <div className={`w-20 h-1 ${theme.colors.brandBg} mx-auto`}></div>
        </div>
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className={`glass-card rounded-lg p-4 sm:p-6 lg:p-8 transition duration-300`}>
              <div className="text-center mb-4 sm:mb-6">
                <i className={`${category.icon} text-3xl sm:text-4xl ${category.iconColor} mb-3 sm:mb-4`}></i>
                <h3 className={`text-lg sm:text-xl font-semibold ${theme.colors.textPrimary}`}>{category.title}</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} skill={skill} theme={theme} index={skillIndex} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
