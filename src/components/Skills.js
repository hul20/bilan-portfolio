import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

const SkillItem = ({ skill, theme }) => {
  const itemRef = useRef(null);

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

    return () => {
      item.removeEventListener('mouseenter', handleMouseEnter);
      item.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={itemRef} 
      className={`skill-item ${theme.colors.skillBg} ${theme.colors.skillHover} ${theme.colors.skillBorder}`}
    >
      <span className={theme.colors.textSecondary}>{skill}</span>
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
      skills: ["JavaScript", "Python", "C++", "PHP", "HTML", "CSS"]
    },
    {
      title: "Frontend Technologies",
      icon: "fas fa-laptop-code",
      iconColor: "text-blue-600",
      skills: ["React", "Vite", "Tailwind CSS", "Sass", "jQuery"]
    },
    {
      title: "Backend & Databases",
      icon: "fas fa-server",
      iconColor: "text-blue-600",
      skills: ["Laravel", "MySQL", "Supabase", "WebSockets"]
    },
    {
      title: "AI & Machine Learning",
      icon: "fas fa-brain",
      iconColor: "text-blue-600",
      skills: ["Google Gemini", "Langchain", "NumPy", "Pandas", "Scikit-Learn"]
    },
    {
      title: "Hardware & IoT",
      icon: "fas fa-microchip",
      iconColor: "text-blue-600",
      skills: ["Arduino", "ESP32", "Sensors", "GPS", "GSM"]
    },
    {
      title: "Creative & Development Tools",
      icon: "fas fa-palette",
      iconColor: "text-blue-600",
      skills: ["Figma", "Canva", "Git", "GitHub", "Vercel"]
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className={`py-20 ${theme.colors.primary}`}>
      <div className="max-w-6xl mx-auto px-4">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-4`}>Skills & Technologies</h2>
          <div className={`w-20 h-1 ${theme.colors.brandBg} mx-auto`}></div>
        </div>
        <div ref={gridRef} className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className={`${theme.colors.secondary} rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300`}>
              <div className="text-center mb-6">
                <i className={`${category.icon} text-4xl ${category.iconColor} mb-4`}></i>
                <h3 className={`text-xl font-semibold ${theme.colors.textPrimary}`}>{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} skill={skill} theme={theme} />
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
