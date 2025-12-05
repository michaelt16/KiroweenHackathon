/**
 * Background Music Manager
 * 
 * Manages background music playback with mute/unmute functionality.
 * Music persists across route changes and respects user preferences.
 */

class MusicManager {
  private static instance: MusicManager;
  private music: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private currentTrack: string | null = null;
  private volume: number = 0.15; // Default volume (15% - very low for background)

  private constructor() {
    // Load mute state from localStorage
    if (typeof window !== 'undefined') {
      this.isMuted = localStorage.getItem('backgroundMusicMuted') === 'true';
      const savedVolume = localStorage.getItem('backgroundMusicVolume');
      if (savedVolume) {
        this.volume = parseFloat(savedVolume);
      }
    }
  }

  static getInstance(): MusicManager {
    if (!MusicManager.instance) {
      MusicManager.instance = new MusicManager();
    }
    return MusicManager.instance;
  }

  /**
   * Play background music track
   */
  playMusic(trackPath: string, loop: boolean = true): void {
    // Stop current music if playing
    this.stopMusic();

    try {
      this.music = new Audio(trackPath);
      this.music.loop = loop;
      this.music.volume = this.isMuted ? 0 : this.volume;
      
      // Only play if not muted
      if (!this.isMuted) {
        // Handle autoplay policy - music will play on user interaction
        const playPromise = this.music.play();
        
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log('✅ Background music started');
              this.currentTrack = trackPath;
            })
            .catch((error) => {
              // Autoplay was prevented - user interaction required
              console.log('⏸️ Music autoplay prevented, will play on user interaction:', error);
              // Music will start when user interacts with the page
            });
        }
      } else {
        // If muted, don't play but still set up the track
        this.currentTrack = trackPath;
        console.log('🔇 Music loaded but muted');
      }

      // Handle music end (if not looping)
      this.music.addEventListener('ended', () => {
        if (loop && this.music && !this.isMuted) {
          this.music.currentTime = 0;
          this.music.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      });

      // Handle errors
      this.music.addEventListener('error', (e) => {
        console.error('❌ Music playback error:', e);
      });
    } catch (error) {
      console.error('❌ Failed to create music audio:', error);
    }
  }

  /**
   * Stop current music
   */
  stopMusic(): void {
    if (this.music) {
      this.music.pause();
      this.music.currentTime = 0;
      this.music = null;
      this.currentTrack = null;
    }
  }

  /**
   * Pause music (can be resumed)
   */
  pauseMusic(): void {
    if (this.music && !this.music.paused) {
      this.music.pause();
    }
  }

  /**
   * Resume music
   */
  resumeMusic(): void {
    if (this.music && this.music.paused && !this.isMuted) {
      this.music.play().catch((error) => {
        console.log('⏸️ Music resume prevented:', error);
      });
    }
  }

  /**
   * Toggle mute state
   */
  toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    
    if (this.music) {
      if (this.isMuted) {
        // Mute: pause the music
        this.music.pause();
        this.music.volume = 0;
      } else {
        // Unmute: set volume and play
        this.music.volume = this.volume;
        this.music.play().catch((error) => {
          console.log('⏸️ Music play prevented on unmute:', error);
        });
      }
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('backgroundMusicMuted', String(this.isMuted));
    }
    
    return this.isMuted;
  }

  /**
   * Get mute state
   */
  getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Set mute state
   */
  setMuted(muted: boolean): void {
    this.isMuted = muted;
    
    if (this.music) {
      if (this.isMuted) {
        // Mute: pause the music
        this.music.pause();
        this.music.volume = 0;
      } else {
        // Unmute: set volume and play
        this.music.volume = this.volume;
        this.music.play().catch((error) => {
          console.log('⏸️ Music play prevented on unmute:', error);
        });
      }
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('backgroundMusicMuted', String(this.isMuted));
    }
  }

  /**
   * Set volume (0.0 to 1.0)
   */
  setVolume(volume: number): void {
    this.volume = Math.max(0, Math.min(1, volume));
    
    if (this.music && !this.isMuted) {
      this.music.volume = this.volume;
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('backgroundMusicVolume', String(this.volume));
    }
  }

  /**
   * Get current volume
   */
  getVolume(): number {
    return this.volume;
  }

  /**
   * Get current track path
   */
  getCurrentTrack(): string | null {
    return this.currentTrack;
  }

  /**
   * Check if music is playing
   */
  isPlaying(): boolean {
    return this.music !== null && !this.music.paused && !this.isMuted;
  }
}

// Export singleton instance getter
export const musicManager = MusicManager.getInstance();

// Export convenience functions
export const playBackgroundMusic = (trackPath: string, loop?: boolean) => {
  musicManager.playMusic(trackPath, loop);
};

export const stopBackgroundMusic = () => {
  musicManager.stopMusic();
};

export const pauseBackgroundMusic = () => {
  musicManager.pauseMusic();
};

export const resumeBackgroundMusic = () => {
  musicManager.resumeMusic();
};

export const toggleMusicMute = () => {
  return musicManager.toggleMute();
};

export const getMusicMuted = () => {
  return musicManager.getMuted();
};

export const setMusicMuted = (muted: boolean) => {
  musicManager.setMuted(muted);
};

export const setMusicVolume = (volume: number) => {
  musicManager.setVolume(volume);
};

export const getMusicVolume = () => {
  return musicManager.getVolume();
};

export default MusicManager;

