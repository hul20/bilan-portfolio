import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeWelcomeModal = () => {
  const { theme, themes, switchTheme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome modal before
    const hasSeenWelcome = localStorage.getItem('portfolio-theme-welcome-seen');
    
    if (!hasSeenWelcome) {
      // Show modal after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleThemeSelect = (themeName) => {
    switchTheme(themeName);
    closeModal();
  };

  const closeModal = () => {
    setIsVisible(false);
    localStorage.setItem('portfolio-theme-welcome-seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`${theme.colors.secondary} rounded-xl shadow-2xl max-w-lg w-full p-8 relative animate-bounce-in`}>
        {/* Close button */}
        <button
          onClick={closeModal}
          className={`absolute top-4 right-4 ${theme.colors.textMuted} hover:${theme.colors.textPrimary} transition-colors duration-200`}
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 ${theme.colors.brandBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
            <i className="fas fa-palette text-white text-2xl"></i>
          </div>
          <h3 className={`text-2xl font-bold ${theme.colors.textPrimary} mb-2`}>
            Welcome to My Portfolio! 🎨
          </h3>
          <p className={`${theme.colors.textSecondary} text-base leading-relaxed`}>
            I've created multiple themes for you to explore. Try switching between them for different experiences!
          </p>
        </div>

        {/* Theme Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {Object.entries(themes).map(([key, themeOption]) => (
            <button
              key={key}
              onClick={() => handleThemeSelect(key)}
              className={`p-4 rounded-lg border-2 transition-all duration-300 hover:scale-105 ${theme.colors.primary} ${theme.colors.brandBorder} hover:${theme.colors.brandBg} group`}
            >
              <div className="text-center">
                <i className={`${themeOption.icon} text-2xl ${theme.colors.brand} mb-2 group-hover:text-white transition-colors duration-300`}></i>
                <div className={`text-sm font-semibold ${theme.colors.textPrimary} group-hover:text-white transition-colors duration-300`}>
                  {themeOption.name}
                </div>
                <div className={`text-xs ${theme.colors.textMuted} group-hover:text-white transition-colors duration-300 mt-1`}>
                  {key === 'light' && 'Clean & bright'}
                  {key === 'dark' && 'Easy on eyes'}
                  {key === 'ferrari' && 'Racing vibes'}
                  {key === 'retro8bit' && 'Retro gaming'}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className={`text-sm ${theme.colors.textMuted} mb-4`}>
            You can always change themes using the selector in the navigation bar.
          </p>
          <button
            onClick={closeModal}
            className={`px-6 py-3 ${theme.colors.brandBg} ${theme.colors.textInverse} rounded-lg font-semibold ${theme.colors.brandHover} transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg`}
          >
            Continue with Current Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeWelcomeModal;
