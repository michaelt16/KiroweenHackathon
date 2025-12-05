# Requirements Document

## Introduction

This spec establishes the **Ghost Data & Codex System** - the foundation for all 7 ghost types in Ghost Hunt. Each ghost has unique behavioral patterns, tool interactions, and narrative elements that players must learn to identify. The Codex serves as both an encyclopedia and a hint system, with journal entries that subtly guide players toward correct deductions.

This is **Phase 1** of the Investigation Mode implementation and must be completed before tool integration (Spec 015).

## Glossary

- **Ghost Type**: One of 7 distinct paranormal entities (Wraith, Shade, Poltergeist, Banshee, Phantom, Onyx, Trickster)
- **Codex**: The in-game encyclopedia displaying ghost information, unlocked through successful investigations
- **Behavioral Pattern**: How a ghost interacts with investigation tools (EMF personality, Spirit Box signature, Camera manifestation, Thermal reading)
- **Field Journal**: Horror story from a previous agent's investigation that provides atmospheric hints about ghost behavior through their experience
- **Evidence Profile**: The complete set of tool reactions that define a ghost's identity
- **Deduction Overlap**: The intentional ambiguity where multiple ghosts share similar evidence traits

---

## Requirements

### Requirement 1: Ghost Data Structure

**User Story:** As a developer, I want a centralized ghost data structure, so that all ghost properties are consistent and maintainable across the application.

#### Acceptance Criteria

1. WHEN the system initializes THEN the Ghost Data Store SHALL load all 7 ghost type definitions with complete behavioral profiles
2. WHEN a ghost type is queried THEN the system SHALL return EMF personality, Spirit Box signature, word families, camera manifestation, thermal category, and difficulty rating
3. WHEN ghost data is accessed THEN the system SHALL provide type-safe interfaces preventing invalid ghost configurations
4. WHEN multiple components request ghost data THEN the system SHALL serve from a single source of truth without duplication
5. WHEN ghost properties are updated THEN the system SHALL validate that deduction overlap rules are maintained (no ghost is uniquely identifiable by a single trait)

---

### Requirement 2: Spirit Box Tuning Mechanic (Universal)

**User Story:** As a player, I want to tune the Spirit Box to hear ghost words, so that I can gather evidence through audio communication.

#### Acceptance Criteria

1. WHEN using Spirit Box THEN the system SHALL provide two tuning knobs: Knob A (Carrier Frequency) and Knob B (Modulation Frequency), both ranging 0.0-1.0
2. WHEN a ghost is present THEN the system SHALL have a hidden target frequency pair (e.g., Onyx → 0.25, 0.82)
3. WHEN both knobs align within tolerance (~0.06) THEN the system SHALL clear static, display "SIGNAL LOCKED" UI, and output one random word from the ghost's word families
4. WHEN tuning difficulty is evaluated THEN the system SHALL use the same tolerance (~0.06) for ALL ghosts (tuning skill cannot identify ghost type)
5. WHEN Spirit Box locks on THEN the word spoken SHALL be the actual evidence, not the lock behavior itself (Spirit Box is a medium-strength clue, never a guaranteed solve)

---

### Requirement 3: Ghost Word System (Balanced Overlap)

**User Story:** As a player, I want ghost words to provide hints without giving away the answer, so that deduction remains challenging and requires combining multiple evidence types.

#### Acceptance Criteria

1. WHEN a ghost's word families are defined THEN the system SHALL assign two families: Emotion family (describes mood) and Theme family (describes identity/behavior)
2. WHEN Spirit Box outputs a word THEN the system SHALL randomly select from the ghost's combined word pool (both families)
3. WHEN words are designed THEN the system SHALL ensure intentional overlap between ghosts (e.g., "behind" → Trickster OR Banshee, "cold" → Wraith OR Phantom, "mine" → Trickster OR Poltergeist)
4. WHEN a single word is heard THEN the system SHALL ensure it never removes more than 2-3 possible ghosts from consideration
5. WHEN multiple Spirit Box readings are taken THEN the system SHALL provide a pattern of words that narrows possibilities without guaranteeing an answer
6. WHEN words are displayed THEN the system SHALL keep them short, creepy, and memorable (e.g., "soft", "deep", "behind", "mine")

---

### Requirement 4: Wraith Ghost Profile

**User Story:** As a player, I want to encounter the Wraith ghost type, so that I can learn the basic investigation mechanics with a beginner-friendly ghost.

#### Acceptance Criteria

1. WHEN investigating a Wraith THEN the EMF Meter SHALL display Calm personality (consistent, smooth readings)
2. WHEN using Spirit Box on a Wraith THEN the system SHALL output words from families: Emotion ["soft", "lost", "cold"], Theme ["drift", "fade", "whisper"]
3. WHEN photographing a Wraith THEN the Camera SHALL capture Faint Silhouette manifestation
4. WHEN using Thermal Scanner on a Wraith THEN the system SHALL show Normal temperature readings (ambient)
5. WHEN viewing Wraith in Codex THEN the field journal SHALL be a previous agent's story hinting at calm EMF behavior and faint visual presence without explicitly stating evidence types

---

### Requirement 5: Shade Ghost Profile

**User Story:** As a player, I want to encounter the Shade ghost type, so that I can experience a deceptively quiet ghost that requires careful observation.

#### Acceptance Criteria

1. WHEN investigating a Shade THEN the EMF Meter SHALL display Shy personality (reads lower until close proximity)
2. WHEN using Spirit Box on a Shade THEN the system SHALL output words from families: Emotion ["silent", "unknown", "stay"], Theme ["hide", "shadow", "watch"]
3. WHEN photographing a Shade THEN the Camera SHALL capture Half-Formed Body manifestation
4. WHEN using Thermal Scanner on a Shade THEN the system SHALL show Normal temperature readings
5. WHEN viewing Shade in Codex THEN the field journal SHALL be a previous agent's story hinting at its elusive nature and difficulty detecting at distance

---

### Requirement 6: Poltergeist Ghost Profile

**User Story:** As a player, I want to encounter the Poltergeist ghost type, so that I can experience a chaotic, mid-difficulty ghost with unstable readings.

#### Acceptance Criteria

1. WHEN investigating a Poltergeist THEN the EMF Meter SHALL display Unstable personality (chaotic ±1 jitter)
2. WHEN using Spirit Box on a Poltergeist THEN the system SHALL output words from families: Emotion ["noisy", "chaotic", "mine"], Theme ["break", "throw", "chaos"]
3. WHEN photographing a Poltergeist THEN the Camera SHALL capture Distorted Motion Blur manifestation
4. WHEN using Thermal Scanner on a Poltergeist THEN the system SHALL show Cold Spot readings
5. WHEN viewing Poltergeist in Codex THEN the field journal SHALL be a previous agent's story hinting at its erratic behavior and chaotic presence

---

### Requirement 7: Banshee Ghost Profile

**User Story:** As a player, I want to encounter the Banshee ghost type, so that I can experience a high-tension ghost with aggressive behavior patterns.

#### Acceptance Criteria

1. WHEN investigating a Banshee THEN the EMF Meter SHALL display Aggressive personality (spikes early, even at distance)
2. WHEN using Spirit Box on a Banshee THEN the system SHALL output words from families: Emotion ["anger", "sorrow", "leave"], Theme ["scream", "wail", "death"]
3. WHEN photographing a Banshee THEN the Camera SHALL capture Screaming Face manifestation
4. WHEN using Thermal Scanner on a Banshee THEN the system SHALL show Cold Spot readings
5. WHEN viewing Banshee in Codex THEN the field journal SHALL be a previous agent's story hinting at its aggressive nature and overwhelming emotional presence

---

### Requirement 8: Phantom Ghost Profile

**User Story:** As a player, I want to encounter the Phantom ghost type, so that I can experience an uncanny ghost that is difficult to photograph.

#### Acceptance Criteria

1. WHEN investigating a Phantom THEN the EMF Meter SHALL display Calm personality (consistent readings)
2. WHEN using Spirit Box on a Phantom THEN the system SHALL output words from families: Emotion ["hollow", "gone", "cold"], Theme ["void", "empty", "nothing"]
3. WHEN photographing a Phantom THEN the Camera SHALL capture Invisible result (guaranteed) or Faint Glitch (rare)
4. WHEN using Thermal Scanner on a Phantom THEN the system SHALL show Deep Cold readings (<8°C)
5. WHEN viewing Phantom in Codex THEN the field journal SHALL be a previous agent's story hinting at its invisibility and bone-chilling cold

---

### Requirement 9: Onyx Ghost Profile

**User Story:** As a player, I want to encounter the Onyx ghost type, so that I can experience a psychology-heavy ghost with deep, below-ground associations.

#### Acceptance Criteria

1. WHEN investigating an Onyx THEN the EMF Meter SHALL display Shy personality (reads lower until very close)
2. WHEN using Spirit Box on an Onyx THEN the system SHALL output words from families: Emotion ["deep", "below", "hungry"], Theme ["dark", "consume", "abyss"]
3. WHEN photographing an Onyx THEN the Camera SHALL capture Shadow Silhouette manifestation
4. WHEN using Thermal Scanner on an Onyx THEN the system SHALL show Deep Cold or Cold Spot readings
5. WHEN viewing Onyx in Codex THEN the field journal SHALL be a previous agent's story hinting at its deep, below-ground presence and shadow manifestation

---

### Requirement 10: Trickster Ghost Profile

**User Story:** As a player, I want to encounter the Trickster ghost type, so that I can experience the hardest ghost with deceptive behavior.

#### Acceptance Criteria

1. WHEN investigating a Trickster THEN the EMF Meter SHALL display Mischievous personality (oscillating sin-wave pattern)
2. WHEN using Spirit Box on a Trickster THEN the system SHALL output words from families: Emotion ["playful", "teasing", "behind"], Theme ["trick", "game", "mine", "fun"]
3. WHEN photographing a Trickster THEN the Camera SHALL capture Glitch Streaks manifestation
4. WHEN using Thermal Scanner on a Trickster THEN the system SHALL show Cold Spot readings
5. WHEN viewing Trickster in Codex THEN the field journal SHALL be a previous agent's story hinting at its deceptive, playful nature and maddening behavior

---

### Requirement 11: Codex Display System

**User Story:** As a player, I want to view ghost information in the Codex, so that I can learn about ghosts I've encountered and use hints for future investigations.

#### Acceptance Criteria

1. WHEN opening the Codex THEN the system SHALL display all 7 ghost types in a scrollable list with analog horror styling
2. WHEN a ghost has not been encountered THEN the Codex SHALL show a silhouette placeholder with "???" for the name
3. WHEN a ghost has been successfully identified THEN the Codex SHALL unlock full details including name, threat level, characteristics, and tool reactions
4. WHEN viewing a ghost entry THEN the system SHALL display a Polaroid-style photo (if unlocked), typewritten stats (EMF, Camera, Thermal), description, and characteristics
5. WHEN viewing the Codex THEN field journal stories SHALL NOT be displayed (field journals are separate entries accessible via the Field Journals screen)

---

### Requirement 12: Field Journal Hint System

**User Story:** As a player, I want to read field journals from previous agents, so that I can learn from their terrifying experiences and gain hints about ghost behavior.

**Note**: Field journals are displayed in the Field Journals screen (/field-journals), NOT in the Codex. The Codex is an encyclopedia of ghost types, while Field Journals are narrative entries from previous investigations.

#### Acceptance Criteria

1. WHEN a field journal describes an encounter THEN the text SHALL be written from a previous agent's first-person perspective as a horror story
2. WHEN a field journal mentions tool readings THEN the text SHALL reference them indirectly through the agent's experience (e.g., "my EMF meter went haywire" instead of "EMF Level 5")
3. WHEN a field journal describes the ghost THEN the text SHALL use atmospheric, fearful language matching the ghost's behavior (e.g., "it kept toying with me, the readings jumping around" for Mischievous personality)
4. WHEN a field journal mentions what the agent saw THEN the text SHALL align with camera manifestation types (e.g., "I could barely make out a shape in the photo" for Faint Silhouette)
5. WHEN a field journal describes the environment THEN the text SHALL hint at thermal readings through sensory details (e.g., "my breath turned to fog, the cold was unnatural" for Deep Cold)
6. WHEN multiple ghosts share similar traits THEN field journals SHALL maintain ambiguity to preserve deduction challenge
7. WHEN a field journal ends THEN the text SHALL imply the agent's fate (escaped, traumatized, or worse) to enhance horror atmosphere
8. WHEN viewing field journals THEN they SHALL be accessible via the Field Journals screen, separate from the Codex display

---

### Requirement 13: Deduction Overlap Validation

**User Story:** As a game designer, I want to ensure no ghost is uniquely identifiable by a single trait, so that players must combine multiple evidence types for correct deduction.

#### Acceptance Criteria

1. WHEN analyzing EMF personalities THEN the system SHALL ensure at least 2 ghosts share each personality type
2. WHEN analyzing Camera manifestations THEN the system SHALL ensure at least 2 ghosts share each manifestation type (except Phantom's guaranteed Invisible)
3. WHEN analyzing Thermal readings THEN the system SHALL ensure at least 2 ghosts share each thermal category
4. WHEN analyzing Spirit Box words THEN the system SHALL ensure each word appears in at least 2 ghost word families
5. WHEN validating ghost profiles THEN the system SHALL confirm that correct identification requires combining 3+ evidence types

---

### Requirement 14: Ghost Data Export for Tools

**User Story:** As a developer, I want ghost data to be easily consumable by investigation tools, so that Radar, EMF, Camera, Spirit Box, and Thermal can query ghost behavior.

#### Acceptance Criteria

1. WHEN investigation tools initialize THEN the system SHALL provide a Ghost Behavior API for querying active ghost properties
2. WHEN EMF Meter requests personality THEN the system SHALL return the current ghost's EMF pattern with noise parameters
3. WHEN Spirit Box requests signature THEN the system SHALL return knob frequencies and word family for the current ghost
4. WHEN Camera requests manifestation THEN the system SHALL return the manifestation type with probability weights
5. WHEN Thermal Scanner requests reading THEN the system SHALL return the temperature category for the current ghost

---

## Success Criteria

- All 7 ghost types have complete, validated data profiles
- Codex displays all ghosts with proper locked/unlocked states
- Journal entries provide atmospheric hints without spoiling deduction
- No ghost can be uniquely identified by a single evidence type
- Ghost data is accessible via type-safe API for investigation tools
- Analog horror styling is applied to all Codex UI elements

---

**Status**: Ready for Design Phase
**Priority**: CRITICAL - Foundation for Specs 015, 016, 017
**Dependencies**: None (can start immediately)
