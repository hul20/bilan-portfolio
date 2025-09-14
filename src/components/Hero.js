import React, { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Animated Triangles Canvas Component
const AnimatedTriangles = ({ canvasRef, theme }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const triangles = [];
    const maxTriangles = 60;
    const maxDistance = 150;
    let animationId;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const createTriangles = () => {
      triangles.length = 0;
      for (let i = 0; i < maxTriangles; i++) {
        triangles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 8 + 4,
          rotation: Math.random() * 360,
          rotationSpeed: (Math.random() - 0.5) * 2
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update triangles
      triangles.forEach(triangle => {
        triangle.x += triangle.vx;
        triangle.y += triangle.vy;
        triangle.rotation += triangle.rotationSpeed;
        
        // Bounce off edges
        if (triangle.x <= 0 || triangle.x >= canvas.width) triangle.vx *= -1;
        if (triangle.y <= 0 || triangle.y >= canvas.height) triangle.vy *= -1;
        
        // Keep within bounds
        triangle.x = Math.max(0, Math.min(canvas.width, triangle.x));
        triangle.y = Math.max(0, Math.min(canvas.height, triangle.y));
      });
      
      // Draw connections
      for (let i = 0; i < triangles.length; i++) {
        for (let j = i + 1; j < triangles.length; j++) {
          const dx = triangles[i].x - triangles[j].x;
          const dy = triangles[i].y - triangles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = (maxDistance - distance) / maxDistance * 0.2;
            ctx.strokeStyle = theme.colors.canvasLines.replace('0.3', opacity.toString());
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(triangles[i].x, triangles[i].y);
            ctx.lineTo(triangles[j].x, triangles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw triangles
      triangles.forEach(triangle => {
        ctx.save();
        ctx.translate(triangle.x, triangle.y);
        ctx.rotate((triangle.rotation * Math.PI) / 180);
        
        ctx.fillStyle = theme.colors.canvasDots;
        ctx.beginPath();
        ctx.moveTo(0, -triangle.size / 2);
        ctx.lineTo(-triangle.size / 2, triangle.size / 2);
        ctx.lineTo(triangle.size / 2, triangle.size / 2);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
      });
      
      animationId = requestAnimationFrame(animate);
    };

    resize();
    createTriangles();
    animate();

    const handleResize = () => {
      resize();
      createTriangles();
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
  const { theme } = useTheme();
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
    <section id="home" className={`${theme.colors.tertiary} ${theme.colors.textInverse} min-h-screen flex items-center pt-20 relative overflow-hidden`}>
      {/* Animated Triangles Background */}
      <div className="canvas-container absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
        <AnimatedTriangles canvasRef={canvasRef} theme={theme} />
      </div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Text content */}
          <div className="hero-content text-left">
            <h1 
              ref={heroNameRef}
              id="hero-name" 
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 opacity-0 transform translate-y-20"
            >
              Hi, I'm <span className={theme.colors.brand}>Jullian</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-4 md:mb-6">
              Computer Science Student & Passionate Creator
            </p>
            <p className="text-base md:text-lg mb-6 md:mb-8 opacity-90 leading-relaxed">
              I have a deep passion for creation, whether in software, hardware, robotics, or building websites. 
              My curiosity fuels my drive to explore, build, and innovate.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start">
              <a 
                href="#projects" 
                className={`${theme.colors.brandBg} ${theme.colors.textInverse} px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold ${theme.colors.brandHover} transition duration-300 text-center text-sm sm:text-base`}
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                View Projects
              </a>
              <a
                href="/cv/Jullian_Bilan_CV.pdf"
                download="Jullian_Bilan_CV.pdf"
                className={`flex items-center justify-center gap-2 border-2 ${theme.colors.accentBorder} ${theme.colors.accent} px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold ${theme.colors.accentHover} hover:text-white transition duration-300 text-sm sm:text-base`}
              >
                <i className="fas fa-download text-sm"></i>
                <span className="hidden sm:inline">Download CV</span>
                <span className="sm:hidden">CV</span>
              </a>
              <a 
                href="#contact" 
                className={`border-2 ${theme.colors.accentBorder} ${theme.colors.accent} px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold ${theme.colors.accentHover} hover:text-white transition duration-300 text-center text-sm sm:text-base`}
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                <span className="hidden sm:inline">Get In Touch</span>
                <span className="sm:hidden">Contact</span>
              </a>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className={`w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 ${theme.colors.brandBorder}`}>
                <img 
                  src="/images/profile-photo.jpg" 
                  alt="Jullian Bilan"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback placeholder */}
                <div className={`w-full h-full bg-gradient-to-br ${theme.colors.gradientFrom} ${theme.colors.gradientTo} flex items-center justify-center`} style={{display: 'none'}}>
                  <div className="text-center">
                    <i className={`fas fa-user text-6xl ${theme.colors.brand} mb-4`}></i>
                    <p className={`text-sm ${theme.colors.textSecondary}`}>Add your photo to</p>
                    <p className={`text-sm ${theme.colors.textSecondary}`}>public/images/profile-photo.jpg</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className={`absolute -top-4 -right-4 w-8 h-8 ${theme.colors.brandBg} rounded-full opacity-80`}></div>
              <div className={`absolute -bottom-4 -left-4 w-6 h-6 ${theme.colors.accentBg} rounded-full opacity-60`}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
