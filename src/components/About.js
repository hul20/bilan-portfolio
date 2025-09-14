import React, { useEffect, useRef } from 'react';

const About = () => {
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
    <section ref={sectionRef} id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg p-8 h-80 flex items-center justify-center">
              <i className="fas fa-user-graduate text-8xl text-blue-600"></i>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Hello! I'm Jullian</h3>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              A Computer Science student at West Visayas State University with a deep passion for creation, 
              whether in software, hardware, robotics, or building websites. My curiosity fuels this drive 
              to explore, build, and innovate.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              I'm especially fascinated by machine learning and how it can shape the future of technology. 
              Beyond academics, I love immersing myself in the outdoors, expressing creativity through art, 
              enjoying gaming and music, and following the thrill of motorsports.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              These interests keep me inspired, balanced, and constantly motivated to turn ideas into reality.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
