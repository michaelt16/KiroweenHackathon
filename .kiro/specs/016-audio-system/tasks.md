# Implementation Plan - Audio & Music System (MVP - Hackathon Version)

## Simplified Scope
This is a minimal viable audio system for hackathon presentation. Focus on background music and basic sound effects with simple mute control.

- [ ] 1. Set up basic audio system
  - Create simple AudioManager class
  - Use HTML5 Audio API (simpler than Web Audio API)
  - Add mute/unmute state management
  - Implement pause on app background
  - _Requirements: 1.1, 7.1, 7.2_

- [ ] 2. Add background music
  - Find/download 2-3 royalty-free music tracks (Map, Investigation, Codex)
  - Add music files to /public/audio/music/
  - Implement music playback with looping
  - Add simple crossfade between tracks (optional)
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 3. Add basic sound effects
  - Find/download 5-8 essential sounds:
    - Button click
    - Camera shutter
    - EMF beep
    - Success chime
    - Ghost whisper (optional)
  - Add sound files to /public/audio/sfx/
  - Implement simple sound playback
  - _Requirements: 3.3, 5.1, 5.5_

- [ ] 4. Create mute button UI
  - Add mute/unmute button to HUD (speaker icon)
  - Toggle mute state on click
  - Save mute preference to localStorage
  - Show visual feedback (muted icon vs unmuted icon)
  - _Requirements: 6.2, 6.3, 6.4_

- [ ] 5. Integrate music with game modes
  - Play map music on MapRootScreen
  - Play investigation music on InvestigationScreen
  - Play codex music on CodexScreen (optional)
  - Stop music on app close/background
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 6. Integrate basic sound effects
  - Add camera shutter sound to Camera tool
  - Add button click to UI buttons (optional)
  - Add success sound to correct ghost identification
  - _Requirements: 3.3, 5.5_

- [ ] 7. Test and polish
  - Test music loops seamlessly
  - Test mute button works
  - Test audio pauses on background
  - Adjust volumes to comfortable levels
  - _Requirements: 7.1, 7.2, 7.3_
