/**
 * Simple Sound Effects Utility
 * 
 * Plays sound effects for button clicks and UI interactions.
 * Falls back to programmatic sound generation if sound files don't exist.
 */

class SoundEffects {
  private static instance: SoundEffects;
  private isMuted: boolean = false;
  private audioContext: AudioContext | null = null;

  private constructor() {
    // Initialize audio context lazily (required for browser autoplay policies)
    if (typeof window !== 'undefined') {
      this.isMuted = localStorage.getItem('soundEffectsMuted') === 'true';
    }
  }

  static getInstance(): SoundEffects {
    if (!SoundEffects.instance) {
      SoundEffects.instance = new SoundEffects();
    }
    return SoundEffects.instance;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    
    if (!this.audioContext) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    }
    return this.audioContext;
  }

  /**
   * Play a sound file from /public/audio/sfx/
   */
  playSoundFile(filename: string, volume: number = 0.5, fallbackToPaper: boolean = false): void {
    if (this.isMuted) return;

    try {
      const audio = new Audio(`/audio/sfx/${filename}`);
      audio.volume = volume;
      audio.play().catch((e) => {
        // If file doesn't exist, fall back to programmatic sound
        console.log(`Sound file not found: ${filename}, using programmatic sound`);
        if (fallbackToPaper) {
          this.playPaperSound();
        } else {
          this.playClickSound();
        }
      });
    } catch (error) {
      console.log('Error playing sound file, using programmatic sound:', error);
      if (fallbackToPaper) {
        this.playPaperSound();
      } else {
        this.playClickSound();
      }
    }
  }

  /**
   * Generate a realistic button click sound programmatically
   * Creates a more natural click sound with multiple frequencies
   */
  playClickSound(volume: number = 0.2): void {
    if (this.isMuted) return;

    let ctx = this.getAudioContext();
    if (!ctx) {
      // If audio context isn't available, try to create and resume it (browser autoplay policy)
      if (typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
          ctx = this.audioContext;
          // Resume in case it's suspended (required for user interaction)
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {
              // If resume fails, audio will work on next user interaction
            });
          }
        }
      }
      if (!ctx) return;
    }

    try {
      const now = ctx.currentTime;

      // Create a more realistic click sound with two frequencies
      // Low frequency for the "thud" and high frequency for the "click"
      
      // Low frequency component (thud)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.frequency.value = 150; // Low thud
      osc1.type = 'sine';
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(volume * 0.4, now + 0.001);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.015);
      
      osc1.start(now);
      osc1.stop(now + 0.015);

      // High frequency component (click)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc2.frequency.value = 1000; // High click
      osc2.type = 'sine';
      
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(volume * 0.5, now + 0.0005);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.01);
      
      osc2.start(now);
      osc2.stop(now + 0.01);
    } catch (error) {
      // Silently fail if audio isn't available
    }
  }

  /**
   * Play button click sound (tries file first, falls back to programmatic)
   */
  playButtonClick(): void {
    // Try to play sound file, falls back to programmatic if file doesn't exist
    this.playSoundFile('button_click.mp3', 0.4);
  }

  /**
   * Play paper rustle/crumple sound for polaroid interactions
   * Uses filtered white noise and multiple oscillators to create realistic paper texture
   */
  playPaperSound(volume: number = 0.35): void {
    if (this.isMuted) return;

    let ctx = this.getAudioContext();
    if (!ctx) {
      if (typeof window !== 'undefined') {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.audioContext = new AudioContextClass();
          ctx = this.audioContext;
          if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
          }
        }
      }
      if (!ctx) return;
    }

    try {
      const now = ctx.currentTime;
      const duration = 0.15; // Longer duration for more realistic paper sound

      // Create white noise for paper texture (most realistic approach)
      const bufferSize = ctx.sampleRate * duration;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      
      // Fill with white noise
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1; // White noise
      }
      
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      
      // Filter the noise to sound like paper rustling
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 200; // Center frequency for paper rustle
      filter.Q.value = 1.5; // Moderate Q for natural sound
      
      const gain = ctx.createGain();
      
      noiseSource.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      // Envelope: quick attack, gradual decay
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(volume * 0.6, now + 0.005);
      gain.gain.exponentialRampToValueAtTime(volume * 0.3, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);
      
      noiseSource.start(now);
      noiseSource.stop(now + duration);

      // Add subtle low-frequency thump (paper being picked up)
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const filter1 = ctx.createBiquadFilter();
      filter1.type = 'lowpass';
      filter1.frequency.value = 150;
      
      osc1.type = 'sine';
      osc1.frequency.value = 80; // Low thump
      
      osc1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(ctx.destination);
      
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(volume * 0.2, now + 0.002);
      gain1.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      
      osc1.start(now);
      osc1.stop(now + 0.06);

      // Add subtle high-frequency crackle (paper texture)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      const filter2 = ctx.createBiquadFilter();
      filter2.type = 'highpass';
      filter2.frequency.value = 600;
      
      osc2.type = 'triangle'; // Softer texture
      osc2.frequency.value = 400;
      
      osc2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(ctx.destination);
      
      gain2.gain.setValueAtTime(0, now);
      gain2.gain.linearRampToValueAtTime(volume * 0.15, now + 0.001);
      gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.04);
      
      osc2.start(now);
      osc2.stop(now + 0.04);
    } catch (error) {
      // Silently fail if audio isn't available
    }
  }

  /**
   * Play paper sound (tries file first, falls back to programmatic)
   */
  playPaperClick(): void {
    // Disabled - no paper sound on click
    return;
  }

  /**
   * Toggle mute state
   */
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEffectsMuted', String(this.isMuted));
    }
    return this.isMuted;
  }

  /**
   * Check if muted
   */
  getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Set mute state
   */
  setMuted(muted: boolean): void {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEffectsMuted', String(this.isMuted));
    }
  }
}

// Export singleton instance getter
export const playButtonClick = () => {
  SoundEffects.getInstance().playButtonClick();
};

export const playClickSound = () => {
  SoundEffects.getInstance().playClickSound();
};

export const playSoundFile = (filename: string, volume?: number) => {
  SoundEffects.getInstance().playSoundFile(filename, volume);
};

export const toggleSoundMute = () => {
  return SoundEffects.getInstance().toggleMute();
};

export const getSoundMuted = () => {
  return SoundEffects.getInstance().getMuted();
};

export const playPaperClick = () => {
  SoundEffects.getInstance().playPaperClick();
};

export const playPaperSound = () => {
  SoundEffects.getInstance().playPaperSound();
};

export default SoundEffects;


