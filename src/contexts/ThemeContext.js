import React, { createContext, useContext, useState, useEffect } from 'react';

// Theme configurations
const themes = {
  light: {
    name: 'Light Mode',
    icon: 'fas fa-sun',
    colors: {
      // Background colors
      primary: 'bg-gray-50',
      secondary: 'bg-white',
      tertiary: 'bg-gray-900',
      
      // Text colors
      textPrimary: 'text-gray-800',
      textSecondary: 'text-gray-600',
      textInverse: 'text-white',
      textMuted: 'text-gray-400',
      
      // Brand colors
      brand: 'text-orange-600',
      brandBg: 'bg-orange-600',
      brandHover: 'hover:bg-orange-700',
      brandBorder: 'border-orange-600',
      
      // Accent colors
      accent: 'text-blue-600',
      accentBg: 'bg-blue-600',
      accentHover: 'hover:bg-blue-700',
      accentBorder: 'border-blue-400',
      
      // Interactive elements
      hover: 'hover:text-orange-600',
      focus: 'focus:ring-orange-500',
      
      // Gradients
      gradientFrom: 'from-orange-100',
      gradientTo: 'to-red-100',
      gradientSecondary: 'from-blue-50 to-purple-50',
      
      // Skill items
      skillBg: 'bg-gray-50',
      skillHover: 'hover:bg-orange-50',
      skillBorder: 'hover:border-orange-500',
      
      // Canvas colors (for animated dots)
      canvasDots: 'rgba(234, 88, 12, 0.6)',
      canvasLines: 'rgba(234, 88, 12, 0.3)'
    }
  },
  
  dark: {
    name: 'Dark Mode',
    icon: 'fas fa-moon',
    colors: {
      // Background colors
      primary: 'bg-gray-900',
      secondary: 'bg-gray-800',
      tertiary: 'bg-gray-900',
      
      // Text colors
      textPrimary: 'text-gray-100',
      textSecondary: 'text-gray-300',
      textInverse: 'text-white',
      textMuted: 'text-gray-500',
      
      // Brand colors
      brand: 'text-orange-400',
      brandBg: 'bg-orange-600',
      brandHover: 'hover:bg-orange-700',
      brandBorder: 'border-orange-500',
      
      // Accent colors
      accent: 'text-blue-400',
      accentBg: 'bg-blue-600',
      accentHover: 'hover:bg-blue-700',
      accentBorder: 'border-blue-400',
      
      // Interactive elements
      hover: 'hover:text-orange-400',
      focus: 'focus:ring-orange-500',
      
      // Gradients
      gradientFrom: 'from-gray-800',
      gradientTo: 'to-gray-700',
      gradientSecondary: 'from-gray-800 to-gray-700',
      
      // Skill items
      skillBg: 'bg-gray-700',
      skillHover: 'hover:bg-orange-900',
      skillBorder: 'hover:border-orange-500',
      
      // Canvas colors
      canvasDots: 'rgba(251, 146, 60, 0.6)',
      canvasLines: 'rgba(251, 146, 60, 0.3)'
    }
  },
  
  ferrari: {
    name: 'Ferrari Theme',
    icon: 'fas fa-car',
    colors: {
      // Background colors
      primary: 'bg-black',
      secondary: 'bg-red-900',
      tertiary: 'bg-black',
      
      // Text colors
      textPrimary: 'text-white',
      textSecondary: 'text-red-100',
      textInverse: 'text-white',
      textMuted: 'text-red-300',
      
      // Brand colors (Ferrari Red)
      brand: 'text-red-600',
      brandBg: 'bg-red-600',
      brandHover: 'hover:bg-red-700',
      brandBorder: 'border-red-600',
      
      // Accent colors (Gold/Yellow)
      accent: 'text-yellow-400',
      accentBg: 'bg-yellow-500',
      accentHover: 'hover:bg-yellow-600',
      accentBorder: 'border-yellow-400',
      
      // Interactive elements
      hover: 'hover:text-red-400',
      focus: 'focus:ring-red-500',
      
      // Gradients
      gradientFrom: 'from-red-900',
      gradientTo: 'to-black',
      gradientSecondary: 'from-yellow-600 to-red-600',
      
      // Skill items
      skillBg: 'bg-red-950',
      skillHover: 'hover:bg-red-800',
      skillBorder: 'hover:border-red-500',
      
      // Canvas colors
      canvasDots: 'rgba(220, 38, 38, 0.8)',
      canvasLines: 'rgba(220, 38, 38, 0.4)'
    }
  },
  
  retro8bit: {
    name: '8-Bit Retro',
    icon: 'fas fa-gamepad',
    colors: {
      // Background colors
      primary: 'bg-gray-900',
      secondary: 'bg-green-900',
      tertiary: 'bg-black',
      
      // Text colors
      textPrimary: 'text-green-400',
      textSecondary: 'text-green-300',
      textInverse: 'text-black',
      textMuted: 'text-green-600',
      
      // Brand colors (Retro Green)
      brand: 'text-green-400',
      brandBg: 'bg-green-500',
      brandHover: 'hover:bg-green-600',
      brandBorder: 'border-green-400',
      
      // Accent colors (Retro Yellow)
      accent: 'text-yellow-400',
      accentBg: 'bg-yellow-500',
      accentHover: 'hover:bg-yellow-600',
      accentBorder: 'border-yellow-400',
      
      // Interactive elements
      hover: 'hover:text-green-300',
      focus: 'focus:ring-green-500',
      
      // Gradients
      gradientFrom: 'from-green-900',
      gradientTo: 'to-black',
      gradientSecondary: 'from-yellow-900 to-green-900',
      
      // Skill items
      skillBg: 'bg-gray-800',
      skillHover: 'hover:bg-green-800',
      skillBorder: 'hover:border-green-500',
      
      // Canvas colors
      canvasDots: 'rgba(34, 197, 94, 0.8)',
      canvasLines: 'rgba(34, 197, 94, 0.4)'
    }
  }
};

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light');

  // Load theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage when changed
  useEffect(() => {
    localStorage.setItem('portfolio-theme', currentTheme);
  }, [currentTheme]);

  const switchTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName);
    }
  };

  const theme = themes[currentTheme];

  const value = {
    currentTheme,
    theme,
    themes,
    switchTheme
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
