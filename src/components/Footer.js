import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className={`bg-black ${theme.colors.textInverse} py-8`}>
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className={theme.colors.textMuted}>
          © 2025 Jullian Bilan. This project is open source and available under the MIT License.
        </p>
        <p className={`${theme.colors.textMuted} text-sm mt-2 opacity-75`}>
          Last updated: September 13, 2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
