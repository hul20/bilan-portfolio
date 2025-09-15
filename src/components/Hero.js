import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import CustomCursor from './CustomCursor';

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
      
      // Get mouse position from canvas properties
      const mouseX = canvas.mouseX || 0;
      const mouseY = canvas.mouseY || 0;
      
      // Update triangles
      triangles.forEach(triangle => {
        // Mouse attraction effect
        if (mouseX !== 0 || mouseY !== 0) {
          const mouseCanvasX = (mouseX + 1) * canvas.width / 2;
          const mouseCanvasY = (mouseY + 1) * canvas.height / 2;
          
          const dx = mouseCanvasX - triangle.x;
          const dy = mouseCanvasY - triangle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply subtle attraction to mouse
          if (distance < 200) {
            const force = (200 - distance) / 200 * 0.3;
            triangle.x += (dx / distance) * force;
            triangle.y += (dy / distance) * force;
          }
        }
        
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
      
      // Draw connections with mouse-reactive intensity
      for (let i = 0; i < triangles.length; i++) {
        for (let j = i + 1; j < triangles.length; j++) {
          const dx = triangles[i].x - triangles[j].x;
          const dy = triangles[i].y - triangles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            let opacity = (maxDistance - distance) / maxDistance * 0.2;
            
            // Increase opacity near mouse
            if (mouseX !== 0 || mouseY !== 0) {
              const mouseCanvasX = (mouseX + 1) * canvas.width / 2;
              const mouseCanvasY = (mouseY + 1) * canvas.height / 2;
              
              const midX = (triangles[i].x + triangles[j].x) / 2;
              const midY = (triangles[i].y + triangles[j].y) / 2;
              
              const mouseDist = Math.sqrt((mouseCanvasX - midX) ** 2 + (mouseCanvasY - midY) ** 2);
              if (mouseDist < 150) {
                const mouseEffect = (150 - mouseDist) / 150;
                opacity += mouseEffect * 0.3;
              }
            }
            
            ctx.strokeStyle = theme.colors.canvasLines.replace('0.3', Math.min(opacity, 0.8).toString());
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(triangles[i].x, triangles[i].y);
            ctx.lineTo(triangles[j].x, triangles[j].y);
            ctx.stroke();
          }
        }
      }
      
      // Draw triangles with mouse-reactive effects
      triangles.forEach(triangle => {
        ctx.save();
        ctx.translate(triangle.x, triangle.y);
        ctx.rotate((triangle.rotation * Math.PI) / 180);
        
        let triangleOpacity = 0.6;
        let triangleSize = triangle.size;
        
        // Make triangles brighter and larger near mouse
        if (mouseX !== 0 || mouseY !== 0) {
          const mouseCanvasX = (mouseX + 1) * canvas.width / 2;
          const mouseCanvasY = (mouseY + 1) * canvas.height / 2;
          
          const mouseDist = Math.sqrt((mouseCanvasX - triangle.x) ** 2 + (mouseCanvasY - triangle.y) ** 2);
          if (mouseDist < 120) {
            const mouseEffect = (120 - mouseDist) / 120;
            triangleOpacity += mouseEffect * 0.4;
            triangleSize += mouseEffect * 4;
          }
        }
        
        const color = theme.colors.canvasDots.replace('0.6', Math.min(triangleOpacity, 1).toString());
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(0, -triangleSize / 2);
        ctx.lineTo(-triangleSize / 2, triangleSize / 2);
        ctx.lineTo(triangleSize / 2, triangleSize / 2);
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
  const heroSectionRef = useRef(null);
  const profilePhotoRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

    // Mouse movement tracking for interactive effects
    const handleMouseMove = (e) => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        setMousePosition({ x, y });

        // Profile photo tilt effect
        if (profilePhotoRef.current) {
          const tiltX = y * 10;
          const tiltY = x * -10;
          profilePhotoRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        }

        // Parallax effect for floating elements
        const floatingElements = heroSectionRef.current.querySelectorAll('.glass-float-interactive');
        floatingElements.forEach((element, index) => {
          const speed = (index + 1) * 0.5;
          const moveX = x * speed * 10;
          const moveY = y * speed * 10;
          element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });

        // Make triangles react to mouse movement
        const canvas = canvasRef.current;
        if (canvas) {
          // Pass mouse position to triangle animation
          canvas.mouseX = x;
          canvas.mouseY = y;
        }
      }
    };

    const heroSection = heroSectionRef.current;
    if (heroSection) {
      heroSection.addEventListener('mousemove', handleMouseMove);
      heroSection.addEventListener('mouseleave', () => {
        // Reset transforms when mouse leaves
        if (profilePhotoRef.current) {
          profilePhotoRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        }
        
        const floatingElements = heroSection.querySelectorAll('.glass-float-interactive');
        floatingElements.forEach((element) => {
          element.style.transform = 'translate(0px, 0px)';
        });

        // Reset triangle mouse interaction
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.mouseX = 0;
          canvas.mouseY = 0;
        }
      });
    }

    return () => {
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handleMouseMove);
      }
    };
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
    <section 
      ref={heroSectionRef}
      id="home" 
      className={`hero-interactive ${theme.colors.tertiary} ${theme.colors.textInverse} min-h-screen flex items-center pt-20 relative overflow-hidden`}
    >
      <CustomCursor />
      {/* Animated Triangles Background */}
      <div className="canvas-container absolute inset-0 w-full h-full">
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
        <AnimatedTriangles canvasRef={canvasRef} theme={theme} />
      </div>
      
      {/* Additional floating glass elements - now interactive */}
      <div className="glass-float-interactive w-20 h-20 top-20 left-10 opacity-30" style={{animationDelay: '1s'}}></div>
      <div className="glass-float-interactive w-16 h-16 top-1/3 right-20 opacity-40" style={{animationDelay: '3s'}}></div>
      <div className="glass-float-interactive w-10 h-10 bottom-32 left-1/4 opacity-50" style={{animationDelay: '5s'}}></div>
      <div className="glass-float-interactive w-12 h-12 top-2/3 right-1/3 opacity-35" style={{animationDelay: '2s'}}></div>
      <div className="glass-float-interactive w-8 h-8 bottom-20 left-20 opacity-45" style={{animationDelay: '4s'}}></div>
      
      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Text content */}
          <div className="hero-content text-left">
            <h1 
              ref={heroNameRef}
              id="hero-name" 
              className="text-glow text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 opacity-0 transform translate-y-20"
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
                className={`glass-button px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold ${theme.colors.textPrimary} transition-all duration-300 text-center text-sm sm:text-base hover:scale-105`}
                onClick={(e) => handleNavClick(e, 'projects')}
              >
                View Projects
              </a>
              <a
                href="/cv/Jullian_Bilan_CV.pdf"
                download="Jullian_Bilan_CV.pdf"
                className={`flex items-center justify-center gap-2 glass-card px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold ${theme.colors.textPrimary} transition-all duration-300 text-sm sm:text-base hover:scale-105`}
              >
                <i className="fas fa-download text-sm"></i>
                <span className="hidden sm:inline">Download CV</span>
                <span className="sm:hidden">CV</span>
              </a>
              <a 
                href="#contact" 
                className={`glass-card px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold ${theme.colors.textPrimary} transition-all duration-300 text-center text-sm sm:text-base hover:scale-105`}
                onClick={(e) => handleNavClick(e, 'contact')}
              >
                <span className="hidden sm:inline">Get In Touch</span>
                <span className="sm:hidden">Contact</span>
              </a>
            </div>
          </div>

          {/* Right side - Profile image */}
          <div className="flex justify-center md:justify-end">
            <div className="profile-photo-container">
              <div 
                ref={profilePhotoRef}
                className={`profile-photo-tilt w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-2xl border-4 ${theme.colors.brandBorder}`}
              >
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
              
              {/* Decorative glass elements - now interactive */}
              <div className="glass-float-interactive w-12 h-12 -top-6 -right-6"></div>
              <div className="glass-float-interactive w-8 h-8 -bottom-4 -left-4" style={{animationDelay: '2s'}}></div>
              <div className="glass-float-interactive w-6 h-6 top-1/4 -left-8" style={{animationDelay: '4s'}}></div>
              <div className="glass-float-interactive w-4 h-4 top-1/2 -right-12" style={{animationDelay: '6s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
