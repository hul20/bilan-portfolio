import React, { useEffect, useRef } from 'react';

// Animated Dots Canvas Component
const AnimatedDots = ({ canvasRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dots = [];
    const maxDots = 80;
    const maxDistance = 120;
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createDots = () => {
      dots.length = 0;
      for (let i = 0; i < maxDots; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update dots
      dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;
        
        // Bounce off edges
        if (dot.x <= 0 || dot.x >= canvas.width) dot.vx *= -1;
        if (dot.y <= 0 || dot.y >= canvas.height) dot.vy *= -1;
        
        // Keep within bounds
        dot.x = Math.max(0, Math.min(canvas.width, dot.x));
        dot.y = Math.max(0, Math.min(canvas.height, dot.y));
      });
      
      // Draw connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (maxDistance - distance) / maxDistance * 0.3;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw dots
      dots.forEach(dot => {
        ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createDots();
    animate();

    const handleResize = () => {
      resize();
      createDots();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [canvasRef]);

  return null;
};

const Hero = () => {
  const canvasRef = useRef(null);
  const heroNameRef = useRef(null);

  useEffect(() => {
    // Animate hero name from bottom
    const heroName = heroNameRef.current;
    if (heroName) {
      setTimeout(() => {
        heroName.style.transition = 'all 1s ease-out';
        heroName.style.opacity = '1';
        heroName.style.transform = 'translateY(0)';
      }, 500);
    }
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="bg-gray-900 text-white min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated Dots Background */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
      <AnimatedDots canvasRef={canvasRef} />
      
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="hero-content">
          <h1 
            ref={heroNameRef}
            id="hero-name" 
            className="text-5xl md:text-7xl font-bold mb-6 opacity-0 transform translate-y-20"
          >
            Hi, I'm <span className="text-blue-400">Jullian</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Computer Science Student & Passionate Creator
          </p>
          <p className="text-lg mb-12 max-w-4xl mx-auto opacity-90">
            I have a deep passion for creation, whether in software, hardware, robotics, or building websites. 
            My curiosity fuels my drive to explore, build, and innovate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#about" 
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300"
              onClick={(e) => handleNavClick(e, 'about')}
            >
              Learn More About Me
            </a>
            <a 
              href="#contact" 
              className="border-2 border-blue-400 text-blue-400 px-8 py-3 rounded-full font-semibold hover:bg-blue-400 hover:text-white transition duration-300"
              onClick={(e) => handleNavClick(e, 'contact')}
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
