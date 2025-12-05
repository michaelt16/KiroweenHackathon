# Design Document - Audio & Music System

## Overview

The Audio & Music System provides atmospheric immersion and gameplay feedback through a layered audio architecture. The system manages background music, sound effects, ghost audio cues, and UI feedback across all game modes while maintaining performance on mobile devices.

**Core Design Principles:**
- **Layered Audio**: Separate channels for Music, SFX, Voice, and Ambient
- **Dynamic Intensity**: Music and sounds respond to game state
- **Analog Horror Aesthetic**: Lo-fi, distorted, vintage audio processing
- **Performance First**: Efficient loading, pooling, and memory management
- **Easy Extensibility**: Simple to add new sounds and music

## Architecture

### Audio System Components

```
AudioManager (Singleton)
├── MusicController
│   ├── BackgroundMusicPlayer
│   ├── DynamicMusicMixer
│   └── CrossfadeController
├── SFXController
│   ├── SoundPool
│   ├── SpatialAudioEngine (future)
│   └── EffectsProcessor
├── VoiceController
│   ├── GhostVoicePlayer
│   ├── EVPProcessor
│   └── WhisperEngine
├── AmbientController
│   ├── EnvironmentalSounds
│   └── AtmosphereLayer
└── VolumeController
    ├── MasterVolume
    ├── MusicVolume
    ├── SFXVolume
    └── VoiceVolume
```

### Audio Layers

| Layer | Purpose | Examples | Priority |
|-------|---------|----------|----------|
| Music | Background atmosphere | Map BGM, Investigation BGM | Low |
| SFX | Gameplay feedback | Tool sounds, UI clicks | High |
| Voice | Ghost communication | Whispers, EVP words | Medium |
| Ambient | Environmental atmosphere | Wind, static, footsteps | Low |


## Components and Interfaces

### AudioManager

**Singleton class managing all audio subsystems**

```typescript
class AudioManager {
  private static instance: AudioManager;
  private audioContext: AudioContext;
  private musicController: MusicController;
  private sfxController: SFXController;
  private voiceController: VoiceController;
  private ambientController: AmbientController;
  private volumeController: VolumeController;
  
  // Initialize audio system
  async initialize(): Promise<void>;
  
  // Lifecycle management
  pause(): void;
  resume(): void;
  cleanup(): void;
  
  // Global controls
  setMasterVolume(volume: number): void;
  muteAll(): void;
  unmuteAll(): void;
}
```

### MusicController

**Manages background music with crossfading and dynamic intensity**

```typescript
class MusicController {
  private currentTrack: AudioBuffer | null;
  private nextTrack: AudioBuffer | null;
  private gainNode: GainNode;
  private crossfadeDuration: number = 2000; // ms
  
  // Play background music
  playMusic(trackId: MusicTrack, loop: boolean = true): void;
  
  // Crossfade to new track
  transitionTo(trackId: MusicTrack, duration?: number): void;
  
  // Dynamic intensity (0.0 - 1.0)
  setIntensity(intensity: number): void;
  
  // Stop music
  stop(fadeOut?: boolean): void;
}

enum MusicTrack {
  MAP_EXPLORATION = 'map_exploration',
  INVESTIGATION_LOW = 'investigation_low',
  INVESTIGATION_MED = 'investigation_med',
  INVESTIGATION_HIGH = 'investigation_high',
  CODEX_READING = 'codex_reading',
  RESULTS_SUCCESS = 'results_success',
  RESULTS_FAILURE = 'results_failure',
}
```


### SFXController

**Manages sound effects with pooling and priority**

```typescript
class SFXController {
  private soundPool: Map<SoundEffect, AudioBuffer[]>;
  private activeSounds: Set<AudioBufferSourceNode>;
  private maxConcurrentSounds: number = 12;
  
  // Play sound effect
  playSound(soundId: SoundEffect, options?: SoundOptions): void;
  
  // Play with variations (pitch, volume)
  playSoundVaried(soundId: SoundEffect, variation: number): void;
  
  // Stop specific sound
  stopSound(soundId: SoundEffect): void;
  
  // Stop all sounds
  stopAll(): void;
}

interface SoundOptions {
  volume?: number;      // 0.0 - 1.0
  pitch?: number;       // 0.5 - 2.0
  loop?: boolean;
  fadeIn?: number;      // ms
  fadeOut?: number;     // ms
}

enum SoundEffect {
  // UI Sounds
  UI_BUTTON_CLICK = 'ui_button_click',
  UI_DRAWER_OPEN = 'ui_drawer_open',
  UI_DRAWER_CLOSE = 'ui_drawer_close',
  UI_COLLECT_ITEM = 'ui_collect_item',
  UI_SUCCESS = 'ui_success',
  UI_ERROR = 'ui_error',
  
  // Tool Sounds
  EMF_BEEP_LOW = 'emf_beep_low',
  EMF_BEEP_MED = 'emf_beep_med',
  EMF_BEEP_HIGH = 'emf_beep_high',
  RADAR_PING = 'radar_ping',
  RADAR_SWEEP = 'radar_sweep',
  CAMERA_SHUTTER = 'camera_shutter',
  CAMERA_POLAROID_EJECT = 'camera_polaroid_eject',
  THERMAL_HUM = 'thermal_hum',
  THERMAL_SCAN_BEEP = 'thermal_scan_beep',
  SPIRIT_BOX_STATIC = 'spirit_box_static',
  SPIRIT_BOX_TUNE = 'spirit_box_tune',
  
  // Ghost Activity
  GHOST_EMF_SPIKE = 'ghost_emf_spike',
  GHOST_FOOTSTEP = 'ghost_footstep',
  GHOST_BREATH = 'ghost_breath',
  GHOST_DOOR_CREAK = 'ghost_door_creak',
  GHOST_STATIC_BURST = 'ghost_static_burst',
}
```


### VoiceController

**Manages ghost voices, whispers, and EVP**

```typescript
class VoiceController {
  private evpProcessor: EVPProcessor;
  private whisperEngine: WhisperEngine;
  
  // Play ghost whisper
  playWhisper(intensity: number): void;
  
  // Play EVP word (Spirit Box)
  playEVP(word: string, clarity: number): void;
  
  // Play ghost voice line
  playGhostVoice(ghostType: GhostType, phrase: string): void;
}

class EVPProcessor {
  // Apply EVP effects to audio
  processEVP(audioBuffer: AudioBuffer, clarity: number): AudioBuffer;
  
  // Effects: distortion, reverb, pitch shift, radio static
}

class WhisperEngine {
  private whisperSounds: AudioBuffer[];
  
  // Play random whisper with distance-based volume
  playRandomWhisper(distance: number): void;
}
```

### VolumeController

**Manages volume levels and muting**

```typescript
class VolumeController {
  private masterGain: GainNode;
  private musicGain: GainNode;
  private sfxGain: GainNode;
  private voiceGain: GainNode;
  
  // Set volume (0.0 - 1.0)
  setMasterVolume(volume: number): void;
  setMusicVolume(volume: number): void;
  setSFXVolume(volume: number): void;
  setVoiceVolume(volume: number): void;
  
  // Mute/unmute
  muteMaster(): void;
  muteMusic(): void;
  muteSFX(): void;
  muteVoice(): void;
  
  // Save/load preferences
  savePreferences(): void;
  loadPreferences(): void;
}
```


## Data Models

### Audio Asset Manifest

```typescript
interface AudioManifest {
  music: MusicAsset[];
  sfx: SFXAsset[];
  voice: VoiceAsset[];
  ambient: AmbientAsset[];
}

interface MusicAsset {
  id: MusicTrack;
  file: string;
  duration: number;
  loopStart?: number;  // Loop point in seconds
  loopEnd?: number;
  layers?: string[];   // For dynamic music
}

interface SFXAsset {
  id: SoundEffect;
  file: string;
  duration: number;
  variations?: string[];  // Alternative versions
  category: 'ui' | 'tool' | 'ghost' | 'ambient';
}

interface VoiceAsset {
  id: string;
  file: string;
  ghostType?: GhostType;
  word?: string;
  category: 'whisper' | 'evp' | 'voice';
}

interface AmbientAsset {
  id: string;
  file: string;
  loop: boolean;
  fadeIn?: number;
  fadeOut?: number;
}
```

### Audio Preferences

```typescript
interface AudioPreferences {
  masterVolume: number;    // 0.0 - 1.0
  musicVolume: number;
  sfxVolume: number;
  voiceVolume: number;
  masterMuted: boolean;
  musicMuted: boolean;
  sfxMuted: boolean;
  voiceMuted: boolean;
}
```


## Audio Asset Specifications

### File Formats

**Primary Format**: **OGG Vorbis** (best compression, wide browser support)
**Fallback Format**: **MP3** (universal compatibility)
**Sample Rate**: **44.1 kHz** (CD quality)
**Bit Rate**: 
- Music: 128-192 kbps
- SFX: 96-128 kbps
- Voice: 64-96 kbps

### Music Tracks Needed

| Track ID | Description | Duration | Loop | Mood |
|----------|-------------|----------|------|------|
| `map_exploration` | Calm ambient exploration | 2-3 min | Yes | Mysterious, calm |
| `investigation_low` | Low tension investigation | 2-3 min | Yes | Subtle unease |
| `investigation_med` | Medium tension | 2-3 min | Yes | Growing tension |
| `investigation_high` | High tension | 2-3 min | Yes | Intense, urgent |
| `codex_reading` | Quiet contemplative | 2-3 min | Yes | Thoughtful, eerie |
| `results_success` | Victory fanfare | 10-15 sec | No | Triumphant |
| `results_failure` | Failure sting | 10-15 sec | No | Ominous, defeated |

**Music Style**: 
- Vintage synthesizers (Moog, ARP)
- Analog warmth with tape saturation
- Subtle vinyl crackle
- Minimal percussion (investigation modes)
- Dissonant strings and pads
- References: Stranger Things, Silent Hill, Phasmophobia


### Sound Effects Needed

#### UI Sounds (8 sounds)

| Sound ID | Description | Duration | Style |
|----------|-------------|----------|-------|
| `ui_button_click` | Button tap | 0.1s | Soft click |
| `ui_drawer_open` | Backpack opens | 0.3s | Sliding, paper rustle |
| `ui_drawer_close` | Backpack closes | 0.3s | Sliding, paper rustle |
| `ui_collect_item` | Supply pickup | 0.5s | Chime, positive |
| `ui_success` | Correct deduction | 1.0s | Success fanfare |
| `ui_error` | Wrong deduction | 0.5s | Negative buzz |
| `ui_page_turn` | Codex page flip | 0.4s | Paper rustle |
| `ui_stamp` | Evidence stamp | 0.3s | Rubber stamp thud |

#### Tool Sounds (15 sounds)

| Sound ID | Description | Duration | Style |
|----------|-------------|----------|-------|
| `emf_beep_low` | EMF Level 1-2 | 0.2s | Low beep |
| `emf_beep_med` | EMF Level 3 | 0.2s | Medium beep |
| `emf_beep_high` | EMF Level 4-5 | 0.2s | High urgent beep |
| `emf_spike` | EMF spike event | 0.5s | Electrical crackle |
| `radar_ping` | Radar sweep ping | 0.3s | Sonar ping |
| `radar_sweep` | Radar sweep loop | 2.0s | Continuous sweep |
| `radar_blip` | Ghost detected | 0.2s | Alert blip |
| `camera_shutter` | Camera flash | 0.1s | Mechanical shutter |
| `camera_polaroid_eject` | Photo ejects | 1.0s | Mechanical whir |
| `camera_develop` | Photo developing | 3.0s | Chemical processing |
| `thermal_hum` | Thermal scanner on | Loop | Low electronic hum |
| `thermal_scan_beep` | Thermal scan pulse | 0.3s | Scanning beep |
| `spirit_box_static` | Radio static | Loop | White noise, radio |
| `spirit_box_tune` | Tuning knob | 0.2s | Frequency sweep |
| `spirit_box_lock` | Frequency locked | 0.5s | Lock-in tone |


#### Ghost Activity Sounds (20+ sounds)

| Sound ID | Description | Duration | Style |
|----------|-------------|----------|-------|
| `ghost_whisper_1` | Faint whisper | 1-2s | Unintelligible, eerie |
| `ghost_whisper_2` | Whisper variation | 1-2s | Different pitch |
| `ghost_whisper_3` | Whisper variation | 1-2s | Different tone |
| `ghost_breath` | Heavy breathing | 2-3s | Raspy, close |
| `ghost_footstep` | Footstep | 0.3s | Creaky floor |
| `ghost_door_creak` | Door opening | 1.5s | Slow creak |
| `ghost_static_burst` | Static interference | 0.5s | Radio static burst |
| `ghost_emf_spike` | EMF interference | 0.8s | Electrical crackle |
| `ghost_knock` | Knocking sound | 0.4s | Three knocks |
| `ghost_growl` | Low growl | 1.5s | Threatening |
| `ghost_scream` | Distant scream | 2.0s | Faint, chilling |
| `ghost_laugh` | Eerie laugh | 1.5s | Distorted |
| `ghost_child_voice` | Child voice | 1-2s | Innocent, creepy |
| `ghost_evp_yes` | EVP "yes" | 0.5s | Distorted voice |
| `ghost_evp_no` | EVP "no" | 0.5s | Distorted voice |
| `ghost_evp_here` | EVP "here" | 0.5s | Distorted voice |
| `ghost_evp_leave` | EVP "leave" | 0.5s | Distorted voice |
| `ghost_evp_behind` | EVP "behind" | 0.5s | Distorted voice |
| `ghost_evp_cold` | EVP "cold" | 0.5s | Distorted voice |
| `ghost_evp_mine` | EVP "mine" | 0.5s | Distorted voice |

**EVP Processing**: All EVP words should be heavily processed with:
- Pitch shifting (-3 to -8 semitones)
- Heavy reverb (cathedral preset)
- Radio static overlay
- Distortion/bit crushing
- Band-pass filter (300Hz - 3kHz)


#### Ambient Sounds (10 sounds)

| Sound ID | Description | Duration | Loop |
|----------|-------------|----------|------|
| `ambient_wind` | Wind howling | 10s | Yes |
| `ambient_rain` | Rain on window | 10s | Yes |
| `ambient_crickets` | Night crickets | 10s | Yes |
| `ambient_static` | Low static hum | 10s | Yes |
| `ambient_heartbeat` | Heartbeat (low sanity) | 5s | Yes |
| `ambient_breathing` | Heavy breathing | 5s | Yes |
| `ambient_clock_tick` | Clock ticking | 5s | Yes |
| `ambient_distant_thunder` | Thunder rumble | 3s | No |
| `ambient_floor_creak` | Floor creaking | 2s | No |
| `ambient_pipe_groan` | Pipe groaning | 3s | No |


## Audio Sourcing Guide

### Free Resources

**Freesound.org** (CC licenses - check attribution requirements)
- Search terms: "EMF beep", "radio static", "whisper", "footstep", "door creak"
- Filter by: CC0 (public domain) or CC-BY (attribution required)
- Download in highest quality available

**Zapsplat.com** (Free with attribution)
- Categories: Horror, Sci-Fi, UI, Ambience
- High-quality professional sounds
- Requires attribution in credits

**Incompetech.com** (Royalty-free music by Kevin MacLeod)
- Search: "Dark", "Ambient", "Suspense", "Horror"
- CC-BY license (credit required)
- Perfect for background music

**OpenGameArt.org**
- Game-ready audio assets
- Various licenses (check each)
- Community-created content

### Paid Resources (Higher Quality)

**Epidemic Sound** ($15-30/month)
- Unlimited downloads
- Commercial license included
- High-quality music and SFX
- Great for background music

**AudioJungle** (Individual purchase $1-50 per track)
- Professional quality
- One-time purchase
- Commercial license
- Good for unique sounds

**Artlist** ($16-25/month)
- Music + SFX subscription
- Commercial license
- High-quality cinematic audio
- Great for investigation music


### DIY Audio Creation

**For EVP voices:**
1. Record normal speech
2. Apply effects in Audacity (free):
   - Pitch shift down (-5 semitones)
   - Add reverb (cathedral preset)
   - Apply distortion
   - Add radio static overlay
   - Band-pass filter (300Hz - 3kHz)

**For tool sounds:**
- Use online tone generators for beeps
- Record household items for mechanical sounds
- Layer white noise for static

**Recommended Tools:**
- **Audacity** (free) - Audio editing
- **LMMS** (free) - Music creation
- **Vital** (free) - Synthesizer VST
- **Freeverb** (free) - Reverb plugin


## Dynamic Music System

### Investigation Music Intensity

Music intensity changes based on ghost proximity and activity:

```typescript
function calculateMusicIntensity(
  ghostDistance: number,
  emfLevel: number,
  sanity: number
): number {
  let intensity = 0.0;
  
  // Distance factor (0.0 - 0.4)
  if (ghostDistance < 5) intensity += 0.4;
  else if (ghostDistance < 10) intensity += 0.3;
  else if (ghostDistance < 20) intensity += 0.2;
  else intensity += 0.1;
  
  // EMF factor (0.0 - 0.3)
  intensity += (emfLevel / 5) * 0.3;
  
  // Sanity factor (0.0 - 0.3)
  if (sanity < 30) intensity += 0.3;
  else if (sanity < 50) intensity += 0.2;
  else if (sanity < 70) intensity += 0.1;
  
  return Math.min(intensity, 1.0);
}
```

### Music Track Selection

```typescript
function selectInvestigationTrack(intensity: number): MusicTrack {
  if (intensity < 0.33) return MusicTrack.INVESTIGATION_LOW;
  if (intensity < 0.66) return MusicTrack.INVESTIGATION_MED;
  return MusicTrack.INVESTIGATION_HIGH;
}
```

### Crossfade Logic

```typescript
function updateInvestigationMusic(
  currentIntensity: number,
  newIntensity: number
): void {
  const currentTrack = selectInvestigationTrack(currentIntensity);
  const newTrack = selectInvestigationTrack(newIntensity);
  
  if (currentTrack !== newTrack) {
    AudioManager.getInstance()
      .getMusicController()
      .transitionTo(newTrack, 2000); // 2 second crossfade
  }
}
```


## Error Handling

### Audio Loading Errors

```typescript
async function loadAudioAsset(url: string): Promise<AudioBuffer> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load audio: ${url}`);
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const audioContext = AudioManager.getInstance().getAudioContext();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    return audioBuffer;
  } catch (error) {
    console.error(`Audio loading error: ${url}`, error);
    // Return silent buffer as fallback
    return createSilentBuffer(audioContext, 1.0);
  }
}
```

### Playback Errors

```typescript
function playSound(soundId: SoundEffect): void {
  try {
    const buffer = soundPool.get(soundId);
    if (!buffer) {
      console.warn(`Sound not loaded: ${soundId}`);
      return;
    }
    
    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(sfxGain);
    source.start();
    
    activeSounds.add(source);
    source.onended = () => activeSounds.delete(source);
    
  } catch (error) {
    console.error(`Playback error: ${soundId}`, error);
  }
}
```

### Browser Compatibility

```typescript
function initializeAudioContext(): AudioContext {
  // Handle browser prefixes
  const AudioContextClass = 
    window.AudioContext || 
    (window as any).webkitAudioContext;
  
  if (!AudioContextClass) {
    console.error('Web Audio API not supported');
    return null;
  }
  
  return new AudioContextClass();
}
```


## Testing Strategy

### Unit Tests

**AudioManager Tests:**
- Singleton instance creation
- Initialization and cleanup
- Volume control
- Mute/unmute functionality

**MusicController Tests:**
- Track loading and playback
- Crossfade transitions
- Loop functionality
- Intensity changes

**SFXController Tests:**
- Sound pooling
- Concurrent sound limits
- Priority system
- Variations

**VoiceController Tests:**
- EVP processing
- Whisper randomization
- Distance-based volume

### Integration Tests

**Mode Transitions:**
- Map → Investigation music transition
- Investigation → Results music transition
- Codex music playback

**Tool Audio:**
- EMF beep frequency matches level
- Camera shutter + eject sequence
- Spirit Box static + EVP playback

**Ghost Activity:**
- Whispers play at correct distance
- EMF spikes trigger audio
- Sanity affects ambient sounds

### Manual Testing Checklist

- [ ] All music tracks loop seamlessly
- [ ] Crossfades are smooth (no pops/clicks)
- [ ] Volume controls work independently
- [ ] Audio pauses when app backgrounds
- [ ] Audio resumes when app foregrounds
- [ ] No audio stuttering with multiple sounds
- [ ] EVP voices are intelligible but distorted
- [ ] Tool sounds match visual feedback
- [ ] Ghost proximity affects music intensity
- [ ] Low sanity increases ambient sounds


## Performance Optimization

### Asset Loading Strategy

**Phase 1: Initial Load (Critical)**
- UI sounds (buttons, drawer)
- Map exploration music
- Essential SFX (< 500KB total)

**Phase 2: Investigation Prep (Lazy Load)**
- Investigation music tracks
- Tool sounds
- Ghost activity sounds

**Phase 3: On-Demand (As Needed)**
- Specific ghost EVP words
- Ambient sounds
- Results music

### Memory Management

```typescript
class AudioAssetManager {
  private loadedAssets: Map<string, AudioBuffer>;
  private maxCacheSize: number = 10 * 1024 * 1024; // 10MB
  private currentCacheSize: number = 0;
  
  async loadAsset(url: string): Promise<AudioBuffer> {
    // Check cache first
    if (this.loadedAssets.has(url)) {
      return this.loadedAssets.get(url);
    }
    
    // Load new asset
    const buffer = await loadAudioAsset(url);
    const bufferSize = buffer.length * buffer.numberOfChannels * 4; // bytes
    
    // Evict old assets if needed
    while (this.currentCacheSize + bufferSize > this.maxCacheSize) {
      this.evictOldestAsset();
    }
    
    this.loadedAssets.set(url, buffer);
    this.currentCacheSize += bufferSize;
    
    return buffer;
  }
  
  unloadAsset(url: string): void {
    const buffer = this.loadedAssets.get(url);
    if (buffer) {
      const bufferSize = buffer.length * buffer.numberOfChannels * 4;
      this.currentCacheSize -= bufferSize;
      this.loadedAssets.delete(url);
    }
  }
}
```

### Sound Pooling

```typescript
class SoundPool {
  private pools: Map<SoundEffect, AudioBufferSourceNode[]>;
  private poolSize: number = 3; // Max instances per sound
  
  getSound(soundId: SoundEffect): AudioBufferSourceNode | null {
    const pool = this.pools.get(soundId) || [];
    
    // Find inactive source
    const inactive = pool.find(source => !source.context);
    if (inactive) return inactive;
    
    // Create new if under limit
    if (pool.length < this.poolSize) {
      const newSource = this.createSource(soundId);
      pool.push(newSource);
      this.pools.set(soundId, pool);
      return newSource;
    }
    
    // Pool exhausted
    return null;
  }
}
```


## File Structure

```
/public/audio/
├── music/
│   ├── map_exploration.ogg
│   ├── investigation_low.ogg
│   ├── investigation_med.ogg
│   ├── investigation_high.ogg
│   ├── codex_reading.ogg
│   ├── results_success.ogg
│   └── results_failure.ogg
├── sfx/
│   ├── ui/
│   │   ├── button_click.ogg
│   │   ├── drawer_open.ogg
│   │   ├── drawer_close.ogg
│   │   ├── collect_item.ogg
│   │   ├── success.ogg
│   │   ├── error.ogg
│   │   ├── page_turn.ogg
│   │   └── stamp.ogg
│   ├── tools/
│   │   ├── emf_beep_low.ogg
│   │   ├── emf_beep_med.ogg
│   │   ├── emf_beep_high.ogg
│   │   ├── emf_spike.ogg
│   │   ├── radar_ping.ogg
│   │   ├── radar_sweep.ogg
│   │   ├── radar_blip.ogg
│   │   ├── camera_shutter.ogg
│   │   ├── camera_polaroid_eject.ogg
│   │   ├── camera_develop.ogg
│   │   ├── thermal_hum.ogg
│   │   ├── thermal_scan_beep.ogg
│   │   ├── spirit_box_static.ogg
│   │   ├── spirit_box_tune.ogg
│   │   └── spirit_box_lock.ogg
│   └── ghost/
│       ├── whisper_1.ogg
│       ├── whisper_2.ogg
│       ├── whisper_3.ogg
│       ├── breath.ogg
│       ├── footstep.ogg
│       ├── door_creak.ogg
│       ├── static_burst.ogg
│       ├── emf_spike.ogg
│       ├── knock.ogg
│       ├── growl.ogg
│       ├── scream.ogg
│       ├── laugh.ogg
│       ├── child_voice.ogg
│       └── evp/
│           ├── yes.ogg
│           ├── no.ogg
│           ├── here.ogg
│           ├── leave.ogg
│           ├── behind.ogg
│           ├── cold.ogg
│           └── mine.ogg
├── ambient/
│   ├── wind.ogg
│   ├── rain.ogg
│   ├── crickets.ogg
│   ├── static.ogg
│   ├── heartbeat.ogg
│   ├── breathing.ogg
│   ├── clock_tick.ogg
│   ├── distant_thunder.ogg
│   ├── floor_creak.ogg
│   └── pipe_groan.ogg
└── manifest.json
```

### Audio Manifest

```json
{
  "music": [
    {
      "id": "map_exploration",
      "file": "/audio/music/map_exploration.ogg",
      "duration": 180,
      "loopStart": 0,
      "loopEnd": 180
    }
  ],
  "sfx": [
    {
      "id": "ui_button_click",
      "file": "/audio/sfx/ui/button_click.ogg",
      "duration": 0.1,
      "category": "ui"
    }
  ],
  "voice": [
    {
      "id": "ghost_evp_yes",
      "file": "/audio/sfx/ghost/evp/yes.ogg",
      "duration": 0.5,
      "category": "evp",
      "word": "yes"
    }
  ]
}
```

