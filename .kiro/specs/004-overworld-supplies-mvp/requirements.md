# 📦 Overworld Supplies MVP — Requirements

## Goal

Transform the overworld collection mechanic from "picking up tools" to "stocking up on supplies" that fuel the Field Scanner during investigations. Players always have their scanner with all modules, but supplies determine effectiveness and usage limits.

**Core Fantasy**: You're a professional ghost hunter preparing for a case, not scavenging for equipment.

---

## Glossary

- **Field Scanner**: The player's always-available paranormal investigation device with built-in modules (EMF, Thermal, Audio, Camera, Static)
- **Supplies**: Consumable resources collected on the overworld map (Film, Boosts, Charms)
- **Supply Node**: A collectible point on the map that grants supplies when collected
- **Field Kit**: The player's inventory of supplies, displayed in the Backpack menu
- **Starter Kit**: Initial supplies given to new players (Film: 3, Boosts: 1, Charms: 0)

---

## Requirements

### Requirement 1: Supply Collection System

**User Story**: As a player, I want to collect supplies from the overworld map, so that I can prepare for investigations.

#### Acceptance Criteria

1. WHEN a player approaches a supply node within collection radius, THEN the system SHALL highlight the node and enable collection
2. WHEN a player taps a supply node, THEN the system SHALL display a supply card showing the supply type and amount
3. WHEN a player taps "Collect" on a supply card, THEN the system SHALL add the supplies to the player's Field Kit and remove the node from the map
4. WHEN supplies are collected, THEN the system SHALL persist the updated Field Kit to localStorage
5. WHEN a player opens the app for the first time, THEN the system SHALL initialize their Field Kit with the starter kit (Film: 3, Boosts: 1, Charms: 0)

---

### Requirement 2: Supply Types and Spawning

**User Story**: As a player, I want to encounter different types of supplies on the map, so that I can strategically prepare for different investigation scenarios.

#### Acceptance Criteria

1. WHEN supply nodes spawn on the map, THEN the system SHALL display Film Rolls (🎞️) as common spawns with small circular glow
2. WHEN supply nodes spawn on the map, THEN the system SHALL display Scanner Boosts (⚡) as uncommon spawns with medium glow
3. WHEN supply nodes spawn on the map, THEN the system SHALL display Charms (🔮) as uncommon spawns with soft purple glow
4. WHEN a Film Roll is collected, THEN the system SHALL add 3-5 film to the player's Field Kit
5. WHEN a Scanner Boost is collected, THEN the system SHALL add 1 boost to the player's Field Kit
6. WHEN a Charm is collected, THEN the system SHALL add 1 charm to the player's Field Kit

---

### Requirement 3: Field Kit Inventory

**User Story**: As a player, I want to view my collected supplies in my inventory, so that I know what resources I have available.

#### Acceptance Criteria

1. WHEN a player opens the Backpack menu, THEN the system SHALL display a "Field Kit" section showing supply counts
2. WHEN the Field Kit is displayed, THEN the system SHALL show Film count with 🎞️ icon
3. WHEN the Field Kit is displayed, THEN the system SHALL show Boost count with ⚡ icon
4. WHEN the Field Kit is displayed, THEN the system SHALL show Charm count with 🔮 icon
5. WHEN supply counts are zero, THEN the system SHALL display "0" with dimmed styling to indicate depletion

---

### Requirement 4: Investigation Preparation

**User Story**: As a player, I want my supplies to be applied when I enter an investigation, so that I can use them during ghost hunting.

#### Acceptance Criteria

1. WHEN a player enters an investigation, THEN the system SHALL apply available boosts to increase event clarity
2. WHEN a player enters an investigation, THEN the system SHALL apply available charms to reduce sanity drain rate
3. WHEN a player enters an investigation, THEN the system SHALL display a "Field Kit Synced" toast notification
4. WHEN Field Kit is synced, THEN the system SHALL show a summary (Film: X, Boost: +Y% clarity, Charm: +Z)
5. WHEN an investigation ends, THEN the system SHALL persist the updated supply counts to localStorage

---

### Requirement 5: Film-Based Camera Usage

**User Story**: As a player, I want the camera to consume film when taking photos, so that I must manage my resources strategically.

#### Acceptance Criteria

1. WHEN a player has film > 0 and uses the camera flash, THEN the system SHALL decrement film count by 1
2. WHEN a player has film === 0 and taps the camera shutter, THEN the system SHALL display the message "No film left – collect more from supplies on the map"
3. WHEN a player has film === 0, THEN the system SHALL disable the camera shutter button with greyed-out styling
4. WHEN a player has film === 0, THEN the system SHALL display a film icon with "0" on the camera UI
5. WHEN film count changes during investigation, THEN the system SHALL update the camera UI in real-time

---

### Requirement 6: Boost Effects

**User Story**: As a player, I want scanner boosts to improve evidence clarity, so that I can more easily identify ghost types.

#### Acceptance Criteria

1. WHEN a boost is active during investigation, THEN the system SHALL increase EMF spike visibility by 10%
2. WHEN a boost is active during investigation, THEN the system SHALL increase cold spot intensity by 10%
3. WHEN a boost is active during investigation, THEN the system SHALL reduce static noise in audio by 10%
4. WHEN a boost is active during investigation, THEN the system SHALL improve whisper transcription clarity
5. WHEN a boost is consumed, THEN the system SHALL decrement boost count by 1 and persist to localStorage

---

### Requirement 7: Charm Effects

**User Story**: As a player, I want charms to protect my sanity, so that I can investigate longer without being overwhelmed.

#### Acceptance Criteria

1. WHEN a charm is active during investigation, THEN the system SHALL reduce sanity drain rate by 10%
2. WHEN a charm is consumed, THEN the system SHALL decrement charm count by 1 and persist to localStorage
3. WHEN multiple charms are active, THEN the system SHALL stack their effects (2 charms = 20% reduction)
4. WHEN sanity drain is reduced by charms, THEN the system SHALL display the modified drain rate in the debug info
5. WHEN an investigation ends, THEN the system SHALL consume all active charms

---

### Requirement 8: Supply Persistence

**User Story**: As a player, I want my supplies to persist between sessions, so that I don't lose my collected resources.

#### Acceptance Criteria

1. WHEN supplies are collected or consumed, THEN the system SHALL save the Field Kit to localStorage under key "ghost-hunt-supplies"
2. WHEN the app loads, THEN the system SHALL read the Field Kit from localStorage
3. WHEN no saved Field Kit exists, THEN the system SHALL initialize with the starter kit
4. WHEN localStorage is cleared, THEN the system SHALL reinitialize with the starter kit on next load
5. WHEN supplies are updated, THEN the system SHALL debounce localStorage writes to avoid excessive I/O

---

### Requirement 9: Dev Mode Supply Management

**User Story**: As a developer, I want to reset and manipulate supplies for testing, so that I can verify all supply-related features.

#### Acceptance Criteria

1. WHEN Dev Mode is active, THEN the system SHALL display a "Reset Supplies" button in the debug panel
2. WHEN "Reset Supplies" is clicked, THEN the system SHALL clear localStorage and reinitialize with starter kit
3. WHEN Dev Mode is active, THEN the system SHALL display a "Max Supplies" button to set all supplies to 99
4. WHEN Dev Mode is active, THEN the system SHALL display current supply counts in the debug overlay
5. WHEN Dev Mode supply changes occur, THEN the system SHALL immediately update the UI and persist changes

---

## Out of Scope (Future Enhancements)

- Rare Artifacts with special effects
- Random supply spawns around player
- Supply trading or crafting
- Supply rarity tiers beyond common/uncommon
- Supply expiration or degradation
- Multiplayer supply sharing
