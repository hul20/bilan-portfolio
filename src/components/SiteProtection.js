import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const SiteProtection = () => {
  const { theme } = useTheme();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const showNotification = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 2500);
  };

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e) => {
      e.preventDefault();
      showNotification('Right-click is disabled on this website');
      return false;
    };

    // Disable common developer tools shortcuts
    const handleKeyDown = (e) => {
      // Disable F12 (Developer Tools)
      if (e.key === 'F12') {
        e.preventDefault();
        showNotification('Developer tools are disabled');
        return false;
      }

      // Disable Ctrl+Shift+I (Inspector)
      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        showNotification('Inspector is disabled');
        return false;
      }

      // Disable Ctrl+Shift+C (Element selector)
      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        showNotification('Element selector is disabled');
        return false;
      }

      // Disable Ctrl+Shift+J (Console)
      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        showNotification('Console is disabled');
        return false;
      }

      // Disable Ctrl+U (View source)
      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showNotification('View source is disabled');
        return false;
      }

      // Disable Ctrl+S (Save page)
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        showNotification('Saving page is disabled');
        return false;
      }

      // Disable Ctrl+A (Select all) - optional
      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        showNotification('Select all is disabled');
        return false;
      }

      // Disable Ctrl+P (Print) - optional
      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        showNotification('Printing is disabled');
        return false;
      }
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable drag and drop
    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    // Disable developer tools detection (basic)
    let devtools = { open: false };
    const threshold = 160;

    setInterval(() => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
          devtools.open = true;
          showNotification('Developer tools detected - Please close them');
        }
      } else {
        devtools.open = false;
      }
    }, 500);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <>
      {/* Popup Notification */}
      {showPopup && (
        <div className="fixed top-4 right-4 z-[10000] animate-slide-in">
          <div className={`glass-card rounded-lg p-4 max-w-sm shadow-2xl border-l-4 border-red-500`}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <i className="fas fa-shield-alt text-red-500 text-lg"></i>
              </div>
              <div>
                <h4 className={`font-semibold ${theme.colors.textPrimary} text-sm`}>
                  Access Restricted
                </h4>
                <p className={`${theme.colors.textSecondary} text-xs mt-1`}>
                  {popupMessage}
                </p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className={`ml-auto ${theme.colors.textSecondary} hover:${theme.colors.textPrimary} transition-colors`}
              >
                <i className="fas fa-times text-sm"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Additional CSS to prevent text selection */}
      <style jsx>{`
        * {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          -webkit-touch-callout: none;
          -webkit-tap-highlight-color: transparent;
        }
        
        input, textarea {
          -webkit-user-select: text;
          -moz-user-select: text;
          -ms-user-select: text;
          user-select: text;
        }
        
        /* Disable image dragging */
        img {
          -webkit-user-drag: none;
          -khtml-user-drag: none;
          -moz-user-drag: none;
          -o-user-drag: none;
          user-drag: none;
          pointer-events: none;
        }
        
        /* Re-enable pointer events for interactive elements */
        a, button, input, textarea, select {
          pointer-events: auto;
        }
      `}</style>
    </>
  );
};

export default SiteProtection;
