import React, { useEffect, useRef } from 'react';

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
      className={`flex items-center gap-4 ${bgColor} ${hoverColor} px-8 py-4 rounded-lg transition duration-300`}
    >
      <i className={`${icon} text-xl`}></i>
      <span className="text-lg font-medium">{text}</span>
    </a>
  );
};

const Contact = () => {
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
    <section ref={sectionRef} id="contact" className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, collaborations, or just having a chat about technology!
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <ContactButton
            href="mailto:jullianbilan20@gmail.com"
            icon="fas fa-envelope"
            text="jullianbilan20@gmail.com"
            bgColor="bg-blue-600"
            hoverColor="hover:bg-blue-700"
          />
          <ContactButton
            href="https://github.com/hul20"
            icon="fab fa-github"
            text="GitHub Profile"
            bgColor="bg-gray-800"
            hoverColor="hover:bg-gray-700"
            target="_blank"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
