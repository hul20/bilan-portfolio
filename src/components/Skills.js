import React, { useEffect, useRef } from 'react';

const SkillItem = ({ skill }) => {
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
    <div ref={itemRef} className="skill-item">
      <span className="text-gray-700">{skill}</span>
    </div>
  );
};

const Skills = () => {
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

  const skillCategories = [
    {
      title: "Programming Languages",
      icon: "fas fa-code",
      iconColor: "text-blue-600",
      skills: ["Python", "C++", "Java", "JavaScript", "HTML", "CSS"]
    },
    {
      title: "Frameworks & Technologies",
      icon: "fas fa-cogs",
      iconColor: "text-purple-600",
      skills: ["React", "Tailwind CSS", "Bootstrap", "Sass"]
    },
    {
      title: "Tools & Platforms",
      icon: "fas fa-tools",
      iconColor: "text-green-600",
      skills: ["Git", "GitHub"]
    }
  ];

  return (
    <section ref={sectionRef} id="skills" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition duration-300">
              <div className="text-center mb-6">
                <i className={`${category.icon} text-4xl ${category.iconColor} mb-4`}></i>
                <h3 className="text-xl font-semibold text-gray-800">{category.title}</h3>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <SkillItem key={skillIndex} skill={skill} />
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
