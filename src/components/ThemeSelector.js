import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeSelector = () => {
  const { currentTheme, theme, themes, switchTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleThemeChange = (themeName) => {
    switchTheme(themeName);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${theme.colors.secondary} ${theme.colors.textPrimary} ${theme.colors.hover} border ${theme.colors.brandBorder} hover:shadow-lg`}
        title="Change Theme"
      >
        <i className={`${themes[currentTheme].icon} text-sm`}></i>
        <span className="hidden sm:inline text-sm font-medium">
          {themes[currentTheme].name}
        </span>
        <i className={`fas fa-chevron-down text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}></i>
      </button>

      {isOpen && (
        <div className={`absolute top-full right-0 mt-2 w-48 ${theme.colors.secondary} rounded-lg shadow-xl border ${theme.colors.brandBorder} z-50 overflow-hidden`}>
          <div className={`px-3 py-2 text-xs font-semibold ${theme.colors.textMuted} border-b ${theme.colors.brandBorder}`}>
            Choose Theme
          </div>
          {Object.entries(themes).map(([key, themeOption]) => (
            <button
              key={key}
              onClick={() => handleThemeChange(key)}
              className={`w-full flex items-center gap-3 px-3 py-3 text-left transition-all duration-200 ${
                currentTheme === key 
                  ? `${theme.colors.brandBg} ${theme.colors.textInverse}` 
                  : `${theme.colors.textPrimary} hover:${theme.colors.skillHover}`
              }`}
            >
              <i className={`${themeOption.icon} text-sm w-4`}></i>
              <div className="flex-1">
                <div className="text-sm font-medium">{themeOption.name}</div>
                <div className={`text-xs ${currentTheme === key ? 'text-orange-100' : theme.colors.textMuted}`}>
                  {key === 'light' && 'Clean and bright'}
                  {key === 'dark' && 'Easy on the eyes'}
                  {key === 'ferrari' && 'Racing inspired'}
                  {key === 'retro8bit' && 'Retro gaming vibes'}
                </div>
              </div>
              {currentTheme === key && (
                <i className="fas fa-check text-sm"></i>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeSelector;
