import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const LoadingScreen = ({ isLoading, onLoadingComplete }) => {
  const { theme } = useTheme();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    if (!isLoading) return;

    const loadingSteps = [
      { progress: 20, text: 'Loading components...' },
      { progress: 40, text: 'Setting up themes...' },
      { progress: 60, text: 'Preparing animations...' },
      { progress: 80, text: 'Finalizing setup...' },
      { progress: 100, text: 'Ready!' }
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setProgress(loadingSteps[currentStep].progress);
        setLoadingText(loadingSteps[currentStep].text);
        currentStep++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${theme.colors.primary}`}>
      {/* Background with glass overlay */}
      <div className="absolute inset-0 glass-overlay"></div>
      
      {/* Floating glass elements */}
      <div className="glass-float w-20 h-20 top-20 left-20 opacity-30" style={{animationDelay: '0s'}}></div>
      <div className="glass-float w-16 h-16 top-1/4 right-20 opacity-40" style={{animationDelay: '1s'}}></div>
      <div className="glass-float w-12 h-12 bottom-32 left-1/4 opacity-50" style={{animationDelay: '2s'}}></div>
      <div className="glass-float w-8 h-8 bottom-20 right-1/3 opacity-35" style={{animationDelay: '3s'}}></div>

      {/* Main loading content */}
      <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-md w-full mx-4 text-center relative z-10">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold ${theme.colors.brand} mb-2`}>
            hulyan
          </h1>
          <p className={`${theme.colors.textSecondary} text-sm`}>
            Portfolio & Projects
          </p>
        </div>

        {/* Loading spinner */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-16 h-16">
            {/* Outer ring */}
            <div className={`absolute inset-0 rounded-full border-4 border-transparent border-t-current ${theme.colors.brand} animate-spin`}></div>
            {/* Inner ring */}
            <div className={`absolute inset-2 rounded-full border-2 border-transparent border-t-current ${theme.colors.accent} animate-spin`} style={{animationDirection: 'reverse', animationDuration: '1s'}}></div>
            {/* Center dot */}
            <div className={`absolute inset-6 rounded-full ${theme.colors.brandBg} animate-pulse`}></div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className={`w-full h-2 ${theme.colors.skillBg} rounded-full overflow-hidden`}>
            <div 
              className={`h-full ${theme.colors.brandBg} rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={`text-right text-xs ${theme.colors.textSecondary} mt-1`}>
            {progress}%
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className={`${theme.colors.textPrimary} font-medium animate-pulse`}>
            {loadingText}
          </p>
          <div className="flex justify-center space-x-1">
            <div className={`w-2 h-2 ${theme.colors.brandBg} rounded-full animate-bounce`} style={{animationDelay: '0ms'}}></div>
            <div className={`w-2 h-2 ${theme.colors.brandBg} rounded-full animate-bounce`} style={{animationDelay: '150ms'}}></div>
            <div className={`w-2 h-2 ${theme.colors.brandBg} rounded-full animate-bounce`} style={{animationDelay: '300ms'}}></div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-2 -right-2 w-4 h-4 glass-badge rounded-full opacity-60"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 glass-badge rounded-full opacity-40"></div>
      </div>

      {/* Additional floating elements */}
      <div className="glass-float w-6 h-6 top-3/4 left-10 opacity-25" style={{animationDelay: '4s'}}></div>
      <div className="glass-float w-10 h-10 top-1/2 right-10 opacity-45" style={{animationDelay: '5s'}}></div>
    </div>
  );
};

export default LoadingScreen;
