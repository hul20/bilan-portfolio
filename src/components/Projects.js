import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollAnimation, useStaggeredScrollAnimation } from '../hooks/useScrollAnimation';

const ProjectCard = ({ project, theme }) => {
  return (
    <div className={`glass-card rounded-lg overflow-hidden transform hover:scale-105 hover:-translate-y-2 group`}>
      {/* Project Image - 2/3 height */}
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
        {project.image ? (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${theme.colors.gradientFrom} ${theme.colors.gradientTo} flex items-center justify-center transition-all duration-500 group-hover:scale-105`}>
            <div className="text-center">
              <i className={`${project.icon || 'fas fa-code'} text-5xl ${theme.colors.brand} mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12`}></i>
              <p className={`text-base ${theme.colors.textSecondary} opacity-75 font-medium`}>Project Preview</p>
            </div>
          </div>
        )}
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-lg">
              <i className={`fas fa-eye ${theme.colors.brand} text-xl`}></i>
            </div>
          </div>
        </div>
        
        {/* Project Type Badge */}
        <div className={`absolute top-3 right-3 px-2 py-1 text-xs rounded glass-badge text-black font-medium ${
          project.category === 'software' 
            ? 'border-blue-400/30' 
            : 'border-green-400/30'
        }`}>
          {project.category === 'software' ? 'Software' : 'Hardware'}
        </div>
      </div>

      {/* Project Content */}
      <div className="p-4 sm:p-6 flex flex-col">
        <h3 className={`text-lg sm:text-xl font-bold ${theme.colors.textPrimary} mb-2 sm:mb-3 group-hover:${theme.colors.brand} transition-colors duration-300`}>
          {project.title}
        </h3>
        <p className={`${theme.colors.textSecondary} text-sm leading-relaxed mb-3 sm:mb-4`}>
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-3 sm:mb-4">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {project.technologies?.slice(0, 4).map((tech, index) => (
              <span 
                key={index}
                className={`px-2 sm:px-3 py-1 text-xs rounded-full ${theme.colors.skillBg} ${theme.colors.textSecondary} border ${theme.colors.brandBorder} hover:${theme.colors.brandBg} hover:${theme.colors.textInverse} transition-all duration-300 font-medium`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Project Links */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg ${theme.colors.brandBg} ${theme.colors.textInverse} ${theme.colors.brandHover} transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105`}
            >
              <i className="fab fa-github text-base"></i>
              Code
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 rounded-lg border-2 ${theme.colors.accentBorder} ${theme.colors.accent} ${theme.colors.accentHover} hover:text-white transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg hover:scale-105`}
            >
              <i className="fas fa-external-link-alt text-base"></i>
              Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Scroll animations
  const headerRef = useScrollAnimation('fade-in-up');
  const filtersRef = useScrollAnimation('fade-in-scale');
  const gridRef = useStaggeredScrollAnimation('fade-in-up', 150);

  // Your actual projects
  const projects = [
    // Software Projects
    {
      id: 1,
      title: "GabayAni",
      description: "AI-powered agricultural assistant accesible via Facebook Messenger & SMS for Filipino rice farmers with real-time guidance.",
      category: "software",
      technologies: ["AI/ML", "Google Gemini", "Langchain", "Facebook API"],
      icon: "fas fa-seedling",
      image: "/images/projects/gabayani.png",
      githubUrl: "https://github.com/hul20/gabayani"
    },
    {
      id: 2,
      title: "WEVO",
      description: "Smart campus venue scheduling system for West Visayas State University.",
      category: "software",
      technologies: ["React", "Tailwind CSS", "Laravel", "MySQL"],
      icon: "fas fa-calendar-alt",
      image: "/images/projects/wevo.png",
      githubUrl: "https://github.com/hul20/wevo"
    },
    {
      id: 3,
      title: "Route-Route-anay",
      description: "A Algorithm-Based Map Navigation System that uses the A* algorithm to optimize commute routes via local jeepney paths, factoring in both jeepney travel and walking distances to and from public utility vehicle routes.",
      category: "software",
      technologies: ["A* Algorithm", "Python", "OpenStreetMap", "Route Optimization"],
      icon: "fas fa-route",
      image: "/images/projects/route.jpg",
      githubUrl: "https://github.com/hul20/route-route-anay"
    },
    {
      id: 4,
      title: "Taklad-Sais",
      description: "A hiking platform for users to share experiences and discover new trails in Region 6.",
      category: "software",
      technologies: ["React", "Vite", "Tailwind CSS", "Supabase"],
      icon: "fas fa-mountain",
      image: "/images/projects/taklad.png",
      githubUrl: "https://github.com/hul20/taklad-sais",
      liveUrl: "https://bilan-finalproject.netlify.app/"
    },
    {
      id: 5,
      title: "ClackyBara",
      description: "An e-commerce mechanical keyboard store for enthusiasts and hobbyists.",
      category: "software",
      technologies: ["HTML", "CSS", "Sass", "JavaScript"],
      icon: "fas fa-keyboard",
      image: "/images/projects/clacky.png",
      githubUrl: "https://github.com/hul20/clackybara",
      liveUrl: "https://bilan-final-website.vercel.app/"
    },
    
    // Hardware Projects
    {
      id: 6,
      title: "JAPJAP Drone Services",
      description: "ESP32-based air quality monitoring drone with temperature, humidity, and gas sensors.",
      category: "hardware",
      technologies: ["ESP32", "WebSockets", "Sensors", "IoT"],
      icon: "fas fa-helicopter",
      image: "/images/projects/jas.png",
      githubUrl: "https://github.com/hul20/japjap-drone"
    },
    {
      id: 7,
      title: "FairFare",
      description: "Arduino-based tricycle fare meter for Roxas City with GPS and GSM communication.",
      category: "hardware",
      technologies: ["Arduino", "GPS", "GSM", "Hall Effect Sensor"],
      icon: "fas fa-taxi",
      image: "images/projects/fairfare.jpg",
      githubUrl: "https://github.com/hul20/fairfare"
    },
  ];

  const filteredProjects = projects.filter(project => 
    activeFilter === 'all' || project.category === activeFilter
  );

  return (
    <section id="projects" className={`py-20 ${theme.colors.primary}`}>
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 className={`text-4xl font-bold ${theme.colors.textPrimary} mb-4`}>
            Featured Projects
          </h2>
          <div className={`w-20 h-1 ${theme.colors.brandBg} mx-auto mb-6`}></div>
          <p className={`text-lg ${theme.colors.textSecondary} max-w-2xl mx-auto`}>
            Here are some projects I've worked on recently.
          </p>
        </div>

        {/* Filter Buttons */}
        <div ref={filtersRef} className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveFilter('all')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
              activeFilter === 'all'
                ? `glass-button ${theme.colors.textInverse}`
                : `glass-card ${theme.colors.textPrimary} hover:${theme.colors.textInverse}`
            }`}
          >
            <i className="fas fa-th text-sm"></i>
            <span className="hidden sm:inline">All Projects</span>
            <span className="sm:hidden">All</span>
          </button>
          <button
            onClick={() => setActiveFilter('software')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
              activeFilter === 'software'
                ? `glass-button ${theme.colors.textInverse}`
                : `glass-card ${theme.colors.textPrimary} hover:${theme.colors.textInverse}`
            }`}
          >
            <i className="fas fa-code text-sm"></i>
            Software
          </button>
          <button
            onClick={() => setActiveFilter('hardware')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg font-medium transition-all duration-300 text-sm sm:text-base ${
              activeFilter === 'hardware'
                ? `glass-button ${theme.colors.textInverse}`
                : `glass-card ${theme.colors.textPrimary} hover:${theme.colors.textInverse}`
            }`}
          >
            <i className="fas fa-microchip text-sm"></i>
            Hardware
          </button>
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
