# Requirements Document - Audio & Music System

## Introduction

The Audio & Music System adds atmospheric depth and gameplay feedback to Ghost Hunt through continuous background music, event-driven sound effects, and dynamic audio responses to ghost activity. The system enhances immersion during exploration, investigation, and deduction phases while providing critical audio cues for ghost behavior and tool interactions.

## Glossary

- **Audio System**: The complete sound management system including music, SFX, and spatial audio
- **Background Music (BGM)**: Continuous looping music tracks that set the mood for each game mode
- **Sound Effect (SFX)**: Short audio clips triggered by events (tool usage, UI interactions, ghost activity)
- **Audio Cue**: A sound that provides gameplay information (EMF beep, whisper, static)
- **Dynamic Audio**: Music or sound that changes based on game state (ghost proximity, sanity level)
- **Audio Layer**: A separate audio channel that can be mixed independently (music, ambient, SFX, voice)
- **Spatial Audio**: 3D positioned sound that appears to come from a direction (future feature)
- **Audio Context**: The Web Audio API context used for advanced audio processing
- **Audio Sprite**: A single audio file containing multiple sounds with timing metadata

## Requirements

### Requirement 1

**User Story:** As a player, I want atmospheric background music that changes based on game mode, so that each phase of gameplay feels distinct and immersive.

#### Acceptance Criteria

1. WHEN a player is on the Map Screen THEN the system SHALL play calm exploration music with subtle paranormal undertones
2. WHEN a player enters Investigation Mode THEN the system SHALL transition to tense investigation music with dynamic intensity
3. WHEN a player opens the Codex THEN the system SHALL play quiet, contemplative music suitable for reading
4. WHEN a player completes an investigation THEN the system SHALL play a results music track appropriate to success or failure
5. WHEN transitioning between modes THEN the system SHALL crossfade music smoothly over 1-2 seconds to avoid jarring cuts

### Requirement 2

**User Story:** As a player, I want investigation music to intensify based on ghost proximity and activity, so that audio reinforces the tension of the hunt.

#### Acceptance Criteria

1. WHEN the ghost is far from the player THEN the system SHALL play low-intensity investigation music with minimal percussion
2. WHEN the ghost is within medium range THEN the system SHALL increase music intensity by adding percussion and bass layers
3. WHEN the ghost is very close (EMF 4-5) THEN the system SHALL play high-intensity music with full instrumentation and faster tempo
4. WHEN the ghost triggers a major event THEN the system SHALL play a musical sting or crescendo
5. WHEN sanity drops below 30% THEN the system SHALL add distortion or dissonant elements to the music

### Requirement 3

**User Story:** As a player, I want each investigation tool to have distinct audio feedback, so that I can identify tool activity by sound alone.

#### Acceptance Criteria

1. WHEN the EMF Meter detects activity THEN the system SHALL play beeping sounds that increase in frequency with EMF level
2. WHEN the Radar sweeps THEN the system SHALL play a subtle sonar ping sound synchronized with the visual sweep
3. WHEN the Camera takes a photo THEN the system SHALL play a camera shutter sound followed by a Polaroid ejection sound
4. WHEN the Thermal Scanner is active THEN the system SHALL play a low electronic hum with occasional scanning beeps
5. WHEN the Spirit Box is tuned THEN the system SHALL play radio static that changes pitch and clarity based on tuning accuracy

### Requirement 4

**User Story:** As a player, I want to hear ghost presence through audio cues like whispers, static, and environmental sounds, so that audio enhances the paranormal atmosphere.

#### Acceptance Criteria

1. WHEN a ghost is nearby THEN the system SHALL randomly play whisper sounds with varying intensity based on distance
2. WHEN a ghost triggers an EMF spike THEN the system SHALL play an electrical interference sound
3. WHEN a ghost appears in a photo THEN the system SHALL play a distorted audio glitch during the flash
4. WHEN the Spirit Box locks onto a frequency THEN the system SHALL play a ghost voice saying a word from the ghost's word family
5. WHEN sanity is low THEN the system SHALL increase the frequency of ambient paranormal sounds (footsteps, breathing, distant voices)

### Requirement 5

**User Story:** As a player, I want UI interactions to have satisfying audio feedback, so that the interface feels responsive and polished.

#### Acceptance Criteria

1. WHEN a player taps a button THEN the system SHALL play a subtle click or tap sound
2. WHEN a player opens the backpack drawer THEN the system SHALL play a sliding/opening sound
3. WHEN a player collects a supply on the map THEN the system SHALL play a collection chime or pickup sound
4. WHEN a player completes evidence deduction THEN the system SHALL play a confirmation sound
5. WHEN a player identifies the correct ghost THEN the system SHALL play a success fanfare or revelation sound

### Requirement 6

**User Story:** As a player, I want to control audio volume levels independently, so that I can balance music, effects, and voice to my preference.

#### Acceptance Criteria

1. WHEN a player opens audio settings THEN the system SHALL display separate volume sliders for Master, Music, SFX, and Voice
2. WHEN a player adjusts a volume slider THEN the system SHALL immediately apply the change to the corresponding audio layer
3. WHEN a player mutes a channel THEN the system SHALL stop playing audio on that channel until unmuted
4. WHEN a player closes the app THEN the system SHALL save volume preferences to local storage
5. WHEN a player reopens the app THEN the system SHALL restore previously saved volume preferences

### Requirement 7

**User Story:** As a player, I want audio to pause when I leave the app, so that it doesn't drain battery or play unexpectedly in the background.

#### Acceptance Criteria

1. WHEN the app loses focus (user switches apps) THEN the system SHALL pause all audio playback
2. WHEN the app regains focus THEN the system SHALL resume audio playback from where it paused
3. WHEN the device screen locks THEN the system SHALL pause all audio playback
4. WHEN the device receives a phone call THEN the system SHALL pause audio and resume after the call ends
5. WHEN the user explicitly pauses investigation THEN the system SHALL pause audio until the user resumes

### Requirement 8

**User Story:** As a developer, I want an audio system that efficiently manages resources, so that the game performs well on mobile devices.

#### Acceptance Criteria

1. WHEN the audio system initializes THEN the system SHALL preload only essential sounds (UI, common SFX) to minimize initial load time
2. WHEN entering Investigation Mode THEN the system SHALL load investigation-specific sounds asynchronously
3. WHEN exiting Investigation Mode THEN the system SHALL unload investigation sounds to free memory
4. WHEN multiple sounds play simultaneously THEN the system SHALL limit concurrent sounds to 8-12 channels to prevent audio overload
5. WHEN the same sound triggers rapidly THEN the system SHALL debounce or pool sound instances to prevent audio stuttering

### Requirement 9

**User Story:** As a developer, I want a flexible audio system architecture, so that adding new sounds and music is straightforward.

#### Acceptance Criteria

1. WHEN adding a new sound effect THEN the system SHALL require only adding the audio file and a single configuration entry
2. WHEN adding new background music THEN the system SHALL support seamless looping without audible gaps
3. WHEN defining audio cues THEN the system SHALL support volume, pitch, and playback rate adjustments per sound
4. WHEN implementing dynamic music THEN the system SHALL support layered music tracks that can be mixed in real-time
5. WHEN debugging audio THEN the system SHALL provide logging for audio events (play, stop, error) in development mode

### Requirement 10

**User Story:** As a player, I want audio to enhance the analog horror aesthetic, so that sound design matches the visual style.

#### Acceptance Criteria

1. WHEN investigation tools play sounds THEN the system SHALL use lo-fi, analog-style audio with tape hiss or radio static
2. WHEN ghost voices play THEN the system SHALL apply distortion, reverb, and pitch shifting for an otherworldly effect
3. WHEN the Spirit Box plays audio THEN the system SHALL use heavily processed radio static and EVP-style voices
4. WHEN background music plays THEN the system SHALL use vintage synthesizers, analog warmth, and subtle vinyl crackle
5. WHEN the Camera develops a photo THEN the system SHALL play mechanical Polaroid sounds with authentic timing
