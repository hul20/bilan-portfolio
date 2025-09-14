import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const BackgroundMusic = () => {
  const { currentTheme } = useTheme();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = volume;
      audio.loop = true;
    }
  }, [volume]);

  // Auto-play when 8-bit theme is activated
  useEffect(() => {
    const audio = audioRef.current;
    if (currentTheme === 'retro8bit' && audio) {
      // Small delay to ensure audio element is ready
      const timer = setTimeout(() => {
        audio.play().then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.log('Autoplay prevented by browser:', error);
          // Browsers often block autoplay, but user can still manually play
        });
      }, 500);

      return () => clearTimeout(timer);
    } else if (currentTheme !== 'retro8bit' && audio && isPlaying) {
      // Stop music when switching away from 8-bit theme
      audio.pause();
      setIsPlaying(false);
    }
  }, [currentTheme]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        // Use a simple 8-bit style beep pattern as placeholder
        // In a real implementation, you'd use an actual 8-bit music file
        audio.play().catch(e => console.log('Audio play failed:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Only show music controls for 8-bit theme
  if (currentTheme !== 'retro8bit') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Audio element for 8-bit music */}
      <audio
        ref={audioRef}
        loop
        preload="none"
      >
        {/* Your 8-bit music file */}
        <source src="/music/arcade-beat-323176.mp3" type="audio/mpeg" />
        {/* Fallback for browsers that don't support any of the above */}
        Your browser does not support the audio element.
      </audio>

      {/* Music Control Panel */}
      <div className="bg-green-900 border-2 border-green-400 p-3 rounded-none shadow-lg" style={{
        fontFamily: 'Press Start 2P, cursive',
        fontSize: '8px',
        boxShadow: '4px 4px 0px rgba(34, 197, 94, 0.3)'
      }}>
        <div className="flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={toggleMusic}
            className="bg-green-500 hover:bg-green-600 text-black px-3 py-2 border-none transition-colors"
            style={{
              borderRadius: 0,
              boxShadow: '2px 2px 0px rgba(0, 0, 0, 0.3)'
            }}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2">
            <span className="text-green-400 text-xs">🔊</span>
            <input
              type="range"
              min="0"
              max="100"
              value={volume * 100}
              onChange={handleVolumeChange}
              className="w-16 h-2 bg-gray-800 appearance-none"
              style={{
                background: `linear-gradient(to right, #22c55e 0%, #22c55e ${volume * 100}%, #374151 ${volume * 100}%, #374151 100%)`
              }}
            />
          </div>

          {/* 8-bit Music Label */}
          <span className="text-green-400 text-xs whitespace-nowrap">
            8-BIT
          </span>
        </div>

        {/* Now Playing Indicator */}
        {isPlaying && (
          <div className="mt-2 text-green-300 text-xs animate-pulse">
            ♪ RETRO BEATS ♪
          </div>
        )}
      </div>
    </div>
  );
};

export default BackgroundMusic;
