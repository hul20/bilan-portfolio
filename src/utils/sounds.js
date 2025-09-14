// Simple 8-bit sound effects using Web Audio API
class SoundEffects {
  constructor() {
    this.audioContext = null;
    this.initAudio();
  }

  initAudio() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    } catch (e) {
      console.log('Web Audio API not supported');
    }
  }

  // Simple beep sound for button clicks
  playBeep(frequency = 440, duration = 100, volume = 0.1) {
    if (!this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = 'square'; // 8-bit style square wave

    gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
  }

  // Button click sound
  playClick() {
    this.playBeep(800, 80, 0.05);
  }

  // Navigation sound
  playNav() {
    this.playBeep(600, 120, 0.08);
  }

  // Success sound (two tones)
  playSuccess() {
    this.playBeep(523, 150, 0.06); // C note
    setTimeout(() => this.playBeep(659, 150, 0.06), 100); // E note
  }
}

export const soundEffects = new SoundEffects();

// Hook for playing sounds based on current theme
export const useSound = (currentTheme) => {
  const playSound = (soundType) => {
    if (currentTheme !== 'retro8bit') return;
    
    switch (soundType) {
      case 'click':
        soundEffects.playClick();
        break;
      case 'nav':
        soundEffects.playNav();
        break;
      case 'success':
        soundEffects.playSuccess();
        break;
      default:
        soundEffects.playClick();
    }
  };

  return { playSound };
};
