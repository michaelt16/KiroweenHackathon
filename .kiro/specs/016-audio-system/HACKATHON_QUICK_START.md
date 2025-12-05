# Audio System - Hackathon Quick Start Guide

## What You Need (Minimal)

### Music Tracks (2-3 files)
1. **Map Exploration** - Calm, mysterious ambient (2-3 min loop)
2. **Investigation** - Tense, suspenseful (2-3 min loop)
3. **Codex** (optional) - Quiet, contemplative (2-3 min loop)

### Sound Effects (5-8 files)
1. **Camera Shutter** - 0.1s click
2. **EMF Beep** - 0.2s beep
3. **Button Click** - 0.1s tap
4. **Success Chime** - 0.5s positive sound
5. **Ghost Whisper** (optional) - 1-2s eerie whisper

## Where to Get Audio (Free)

### Quick Music Sources
**Incompetech.com** (Kevin MacLeod - Free with credit)
- Search: "Dark Ambient", "Suspense", "Horror"
- Download MP3, use as-is
- Add credit: "Music by Kevin MacLeod (incompetech.com)"

**Recommended tracks:**
- "Crypto" - Good for map
- "Tense" - Good for investigation
- "Ossuary 1" - Good for codex

### Quick Sound Effects
**Freesound.org** (Free, CC0 or CC-BY)
- Search: "camera shutter", "beep", "click", "success", "whisper"
- Filter by: CC0 (no attribution needed)
- Download WAV or MP3

**Zapsplat.com** (Free with attribution)
- Categories: UI, Horror, Sci-Fi
- Download MP3
- Add credit in game

## File Setup

```
/public/audio/
├── music/
│   ├── map_exploration.mp3
│   ├── investigation.mp3
│   └── codex.mp3 (optional)
└── sfx/
    ├── camera_shutter.mp3
    ├── emf_beep.mp3
    ├── button_click.mp3
    ├── success.mp3
    └── ghost_whisper.mp3 (optional)
```

## Simple Implementation

### 1. Create AudioManager (src/utils/audioManager.ts)

```typescript
class AudioManager {
  private static instance: AudioManager;
  private music: HTMLAudioElement | null = null;
  private isMuted: boolean = false;

  static getInstance(): AudioManager {
    if (!AudioManager.instance) {
      AudioManager.instance = new AudioManager();
    }
    return AudioManager.instance;
  }

  playMusic(track: string) {
    if (this.music) {
      this.music.pause();
    }
    this.music = new Audio(`/audio/music/${track}.mp3`);
    this.music.loop = true;
    this.music.volume = this.isMuted ? 0 : 0.3;
    this.music.play().catch(e => console.log('Audio play failed:', e));
  }

  playSound(sound: string) {
    if (this.isMuted) return;
    const audio = new Audio(`/audio/sfx/${sound}.mp3`);
    audio.volume = 0.5;
    audio.play().catch(e => console.log('Sound play failed:', e));
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.music) {
      this.music.volume = this.isMuted ? 0 : 0.3;
    }
    localStorage.setItem('audioMuted', String(this.isMuted));
    return this.isMuted;
  }

  pause() {
    if (this.music) this.music.pause();
  }

  resume() {
    if (this.music) this.music.play();
  }
}

export default AudioManager;
```

### 2. Add Mute Button Component

```typescript
// src/components/HUD/MuteButton.tsx
import React, { useState } from 'react';
import AudioManager from '../../utils/audioManager';

export const MuteButton: React.FC = () => {
  const [isMuted, setIsMuted] = useState(
    localStorage.getItem('audioMuted') === 'true'
  );

  const handleToggle = () => {
    const newMuted = AudioManager.getInstance().toggleMute();
    setIsMuted(newMuted);
  };

  return (
    <button
      onClick={handleToggle}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.7)',
        border: '2px solid #fff',
        color: '#fff',
        fontSize: '24px',
        cursor: 'pointer',
        zIndex: 1000,
      }}
    >
      {isMuted ? '🔇' : '🔊'}
    </button>
  );
};
```

### 3. Use in Screens

```typescript
// In MapRootScreen.tsx
useEffect(() => {
  AudioManager.getInstance().playMusic('map_exploration');
}, []);

// In InvestigationScreen.tsx
useEffect(() => {
  AudioManager.getInstance().playMusic('investigation');
}, []);

// In Camera tool
const takePhoto = () => {
  AudioManager.getInstance().playSound('camera_shutter');
  // ... rest of photo logic
};
```

### 4. Add to App.tsx

```typescript
// Handle app lifecycle
useEffect(() => {
  const handleVisibilityChange = () => {
    if (document.hidden) {
      AudioManager.getInstance().pause();
    } else {
      AudioManager.getInstance().resume();
    }
  };

  document.addEventListener('visibilitychange', handleVisibilityChange);
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
}, []);
```

## That's It!

This gives you:
- ✅ Background music per mode
- ✅ Basic sound effects
- ✅ Mute button
- ✅ Pause on background
- ✅ Saved preferences

**Total time: 1-2 hours** (including finding audio)

## Credits to Add

In your game credits or README:
```
Music by Kevin MacLeod (incompetech.com)
Licensed under Creative Commons: By Attribution 4.0 License
http://creativecommons.org/licenses/by/4.0/

Sound effects from Freesound.org and Zapsplat.com
```

## Future Enhancements (Post-Hackathon)

When you have more time, refer back to the full design.md for:
- Dynamic music intensity
- Tool-specific sounds
- Ghost audio cues
- Volume sliders
- Advanced audio processing
