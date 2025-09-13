// JavaScript for Portfolio Website

// Animated Dots Canvas
class AnimatedDots {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.dots = [];
        this.maxDots = 80;
        this.maxDistance = 120;
        
        this.resize();
        this.createDots();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createDots() {
        this.dots = [];
        for (let i = 0; i < this.maxDots; i++) {
            this.dots.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update dots
        this.dots.forEach(dot => {
            dot.x += dot.vx;
            dot.y += dot.vy;
            
            // Bounce off edges
            if (dot.x <= 0 || dot.x >= this.canvas.width) dot.vx *= -1;
            if (dot.y <= 0 || dot.y >= this.canvas.height) dot.vy *= -1;
            
            // Keep within bounds
            dot.x = Math.max(0, Math.min(this.canvas.width, dot.x));
            dot.y = Math.max(0, Math.min(this.canvas.height, dot.y));
        });
        
        // Draw connections
        for (let i = 0; i < this.dots.length; i++) {
            for (let j = i + 1; j < this.dots.length; j++) {
                const dx = this.dots[i].x - this.dots[j].x;
                const dy = this.dots[i].y - this.dots[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.maxDistance) {
                    const opacity = (this.maxDistance - distance) / this.maxDistance * 0.3;
                    this.ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.dots[i].x, this.dots[i].y);
                    this.ctx.lineTo(this.dots[j].x, this.dots[j].y);
                    this.ctx.stroke();
                }
            }
        }
        
        // Draw dots
        this.dots.forEach(dot => {
            this.ctx.fillStyle = 'rgba(59, 130, 246, 0.6)';
            this.ctx.beginPath();
            this.ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animated dots
    const canvas = document.getElementById('dotsCanvas');
    if (canvas) {
        new AnimatedDots(canvas);
    }
    
    // Animate hero name from bottom
    const heroName = document.getElementById('hero-name');
    if (heroName) {
        setTimeout(() => {
            heroName.style.transition = 'all 1s ease-out';
            heroName.style.opacity = '1';
            heroName.style.transform = 'translateY(0)';
        }, 500);
    }
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });

    // Active navigation highlighting
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNav() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Scroll event listener for active navigation
    window.addEventListener('scroll', highlightActiveNav);

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe sections for animations
    const animatedElements = document.querySelectorAll('section > div');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Skill items animation on hover
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('nav');
    function updateNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.classList.remove('shadow-lg');
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
            navbar.style.backdropFilter = 'none';
        }
    }

    window.addEventListener('scroll', updateNavbarBackground);


    // Contact buttons hover effects
    const contactButtons = document.querySelectorAll('#contact a');
    contactButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = 'none';
        });
    });


    // Initialize navbar background
    updateNavbarBackground();
    
    // Initialize active navigation
    highlightActiveNav();
});

// Utility function for smooth reveal animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

// Add reveal class to elements that should animate
document.addEventListener('DOMContentLoaded', function() {
    const elementsToReveal = document.querySelectorAll('.bg-white, .skill-item');
    elementsToReveal.forEach(el => {
        el.classList.add('reveal');
    });
});

window.addEventListener('scroll', revealOnScroll);
