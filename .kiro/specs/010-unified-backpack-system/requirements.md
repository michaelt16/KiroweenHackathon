# Requirements Document - Unified Backpack System

## Introduction

This document defines the requirements for implementing a unified backpack system that serves as the primary inventory and navigation interface across both Overworld (map) and Investigation modes. The backpack provides context-aware content while maintaining consistent interaction patterns and analog horror aesthetics throughout the game.

## Glossary

- **Backpack**: The unified bottom drawer UI component that provides access to inventory, tools, and information across all game modes
- **Context-Aware Tabs**: Tab content that changes based on the current game mode (Overworld vs Investigation)
- **Overworld Mode**: The map exploration phase where players walk around, collect supplies, and select investigation locations
- **Investigation Mode**: The active ghost-hunting phase where players use tools to gather evidence and identify ghosts
- **Analog Horror Aesthetic**: Visual style featuring aged paper, vintage equipment, worn textures, and 1980s-90s design elements
- **Tool**: Ghost-hunting equipment (Radar, EMF, Thermal, Spirit Box, Camera)
- **Evidence**: Paranormal phenomena detected during investigation (EMF readings, cold spots, etc.)
- **Deduction Interface**: UI that helps players narrow down ghost types based on collected evidence
- **Codex**: Encyclopedia of ghost types and their characteristics
- **Field Journal**: Quick reference notes and tips for investigations
- **Supplies**: Consumable items collected in Overworld (film, boosts, charms)

---

## Requirements

### Requirement 1: Unified Backpack Component

**User Story:** As a player, I want a consistent backpack interface across all game modes, so that I always know where to find my inventory and tools.

#### Acceptance Criteria

1. WHEN the backpack button is tapped THEN the system SHALL slide up a drawer from the bottom of the screen
2. WHEN the backpack is opened THEN the system SHALL display tabs appropriate to the current game mode
3. WHEN the backpack is closed THEN the system SHALL slide down smoothly and return focus to the main view
4. WHEN the backpack is displayed THEN the system SHALL use analog horror aesthetic (aged paper, worn textures, vintage styling)
5. WHEN switching between modes THEN the system SHALL maintain the same backpack button position and interaction pattern

---

### Requirement 2: Overworld Mode Tabs

**User Story:** As a player exploring the map, I want to access my inventory and reference materials, so that I can prepare for investigations.

#### Acceptance Criteria

1. WHEN in Overworld mode THEN the backpack SHALL display four tabs: Inventory, Codex, Profile, and Settings
2. WHEN the Inventory tab is active THEN the system SHALL display collected supplies (film count, boost count, charm count)
3. WHEN the Codex tab is active THEN the system SHALL display the full ghost encyclopedia with all discovered entries
4. WHEN the Profile tab is active THEN the system SHALL display player stats, level, XP, and achievements
5. WHEN the Settings tab is active THEN the system SHALL display game settings and preferences

---

### Requirement 3: Investigation Mode Tabs

**User Story:** As a player during an investigation, I want quick access to my tools and evidence, so that I can efficiently hunt ghosts.

#### Acceptance Criteria

1. WHEN in Investigation mode THEN the backpack SHALL display five tabs: Tools, Photos, Evidence & Deduction, Field Journal, and Codex
2. WHEN the Tools tab is active THEN the system SHALL display all five investigation tools with selection interface
3. WHEN the Photos tab is active THEN the system SHALL display all photos captured during the current investigation
4. WHEN the Evidence & Deduction tab is active THEN the system SHALL display evidence checklist and ghost type narrowing interface
5. WHEN the Field Journal tab is active THEN the system SHALL display quick reference notes and investigation tips

---

### Requirement 4: Tools Tab (Investigation Mode)

**User Story:** As a player, I want to select investigation tools from my backpack, so that I can switch equipment during the hunt.

#### Acceptance Criteria

1. WHEN the Tools tab is opened THEN the system SHALL display all five tools (Radar, EMF, Thermal, Spirit Box, Camera) with proper icons
2. WHEN a tool is tapped THEN the system SHALL close the backpack and activate the selected tool
3. WHEN a tool is active THEN the system SHALL highlight it in the Tools tab
4. WHEN tools are displayed THEN the system SHALL show tool names and brief descriptions
5. WHEN the Tools tab is rendered THEN the system SHALL use analog horror styling (aged cards, worn textures)

---

### Requirement 5: Photos Tab (Investigation Mode)

**User Story:** As a player, I want to review photos I've taken during the investigation, so that I can analyze captured evidence.

#### Acceptance Criteria

1. WHEN the Photos tab is opened THEN the system SHALL display all photos captured during the current investigation
2. WHEN no photos exist THEN the system SHALL display a message indicating no photos have been taken
3. WHEN a photo is tapped THEN the system SHALL display it in full-screen view with zoom capability
4. WHEN photos are displayed THEN the system SHALL render them as Polaroid-style images with timestamps
5. WHEN photos are shown THEN the system SHALL use analog horror styling (aged Polaroid frames, tape, rotation)

---

### Requirement 6: Evidence & Deduction Tab (Investigation Mode)

**User Story:** As a player, I want to track collected evidence and narrow down ghost types, so that I can identify the ghost efficiently.

#### Acceptance Criteria

1. WHEN the Evidence & Deduction tab is opened THEN the system SHALL display an evidence checklist with all possible evidence types
2. WHEN evidence is collected THEN the system SHALL automatically check off the corresponding evidence type
3. WHEN evidence is checked THEN the system SHALL filter and display possible ghost types in real-time
4. WHEN multiple evidence types are confirmed THEN the system SHALL narrow down to 1-3 possible ghost types
5. WHEN the deduction interface is displayed THEN the system SHALL use analog horror styling (case file aesthetic, handwritten notes, red circles)

---

### Requirement 7: Field Journal Tab (Investigation Mode)

**User Story:** As a player, I want quick access to investigation tips and ghost behavior notes, so that I can make informed decisions during the hunt.

#### Acceptance Criteria

1. WHEN the Field Journal tab is opened THEN the system SHALL display quick reference notes about ghost behaviors
2. WHEN journal entries are shown THEN the system SHALL organize them by category (tool usage, ghost signs, safety tips)
3. WHEN the journal is displayed THEN the system SHALL use handwritten font (Caveat) for notes
4. WHEN journal pages are rendered THEN the system SHALL use analog horror styling (aged paper, coffee stains, scribbles)
5. WHEN the journal is scrolled THEN the system SHALL maintain smooth performance

---

### Requirement 8: Codex Tab (Both Modes)

**User Story:** As a player, I want to reference the ghost encyclopedia from anywhere, so that I can learn about ghost types and their characteristics.

#### Acceptance Criteria

1. WHEN the Codex tab is opened THEN the system SHALL display the full ghost encyclopedia
2. WHEN in Overworld mode THEN the Codex SHALL show all discovered ghosts with full details
3. WHEN in Investigation mode THEN the Codex SHALL show all ghosts but function as read-only reference
4. WHEN a ghost entry is tapped THEN the system SHALL display detailed information (characteristics, evidence, behaviors)
5. WHEN the Codex is displayed THEN the system SHALL use analog horror styling (journal pages, Polaroid photos, typewritten text)

---

### Requirement 9: Backpack Button Visual Design

**User Story:** As a player, I want the backpack button to look like authentic vintage equipment, so that it matches the game's aesthetic.

#### Acceptance Criteria

1. WHEN the backpack button is displayed THEN the system SHALL render it with analog horror styling (aged leather/canvas texture)
2. WHEN the backpack is closed THEN the button SHALL show a backpack icon with subtle glow
3. WHEN the backpack is open THEN the button SHALL change appearance to indicate active state
4. WHEN the button is tapped THEN the system SHALL provide haptic feedback (if supported)
5. WHEN the button is rendered THEN the system SHALL position it at bottom-center of the screen

---

### Requirement 10: Tab Navigation and Transitions

**User Story:** As a player, I want smooth transitions between tabs, so that the backpack feels responsive and polished.

#### Acceptance Criteria

1. WHEN switching tabs THEN the system SHALL animate the transition with a subtle fade or slide effect
2. WHEN a tab is selected THEN the system SHALL highlight it with analog horror styling (aged paper highlight, worn tab appearance)
3. WHEN tabs are displayed THEN the system SHALL use vintage folder tab or notebook divider aesthetics
4. WHEN tab content loads THEN the system SHALL complete the transition in under 300ms
5. WHEN multiple rapid tab switches occur THEN the system SHALL debounce and prevent animation stacking

---

### Requirement 11: Context Switching

**User Story:** As a developer, I want the backpack to automatically adapt to the current game mode, so that players see relevant content without manual configuration.

#### Acceptance Criteria

1. WHEN entering Investigation mode THEN the system SHALL automatically switch to Investigation tabs
2. WHEN exiting Investigation mode THEN the system SHALL automatically switch to Overworld tabs
3. WHEN the mode changes THEN the system SHALL preserve the last active tab within that mode
4. WHEN switching modes THEN the system SHALL maintain backpack open/closed state
5. WHEN context changes THEN the system SHALL update tab content without requiring a full re-render

---

### Requirement 12: Evidence & Deduction Logic

**User Story:** As a player, I want the deduction interface to intelligently narrow down ghost types, so that I can identify the ghost based on collected evidence.

#### Acceptance Criteria

1. WHEN no evidence is collected THEN the system SHALL display all possible ghost types
2. WHEN one evidence type is confirmed THEN the system SHALL filter to ghosts that can produce that evidence
3. WHEN multiple evidence types are confirmed THEN the system SHALL show only ghosts matching ALL confirmed evidence
4. WHEN evidence is contradictory THEN the system SHALL display a warning or show no matches
5. WHEN the final ghost type is narrowed down THEN the system SHALL highlight it and enable the "Identify Ghost" action

---

### Requirement 13: Performance and Optimization

**User Story:** As a player, I want the backpack to open and close instantly, so that it doesn't interrupt my gameplay flow.

#### Acceptance Criteria

1. WHEN the backpack is opened THEN the system SHALL complete the animation in under 300ms
2. WHEN tabs are switched THEN the system SHALL render new content in under 200ms
3. WHEN the backpack is displayed THEN the system SHALL not block GPS, compass, or ghost behavior updates
4. WHEN textures are loaded THEN the system SHALL cache them to prevent re-loading
5. WHEN the backpack is closed THEN the system SHALL free up memory for non-visible tab content

---

### Requirement 14: Visual Consistency Across Modes

**User Story:** As a player, I want the backpack to look consistent across all game modes, so that the experience feels cohesive.

#### Acceptance Criteria

1. WHEN the backpack is displayed THEN the system SHALL use the same base styling (aged paper, worn textures) in both modes
2. WHEN tabs are shown THEN the system SHALL use consistent typography (Caveat for handwritten, Courier New for technical)
3. WHEN damage elements are rendered THEN the system SHALL include coffee stains, tape, scratches, and wear
4. WHEN the backpack is opened THEN the system SHALL maintain the same slide-up animation in both modes
5. WHEN visual elements are displayed THEN the system SHALL follow the 006 Analog Horror Component System guidelines

---

### Requirement 15: Inventory Display (Overworld Mode)

**User Story:** As a player, I want to see my collected supplies clearly, so that I know what resources I have for investigations.

#### Acceptance Criteria

1. WHEN the Inventory tab is opened THEN the system SHALL display film count with a film roll icon
2. WHEN supplies are shown THEN the system SHALL display boost count with a lightning bolt icon
3. WHEN the inventory is displayed THEN the system SHALL show charm count with a talisman icon
4. WHEN supply counts are rendered THEN the system SHALL use typewriter font (Courier New) for numbers
5. WHEN the inventory is shown THEN the system SHALL use analog horror styling (equipment log aesthetic, checkmarks, scribbles)

---

## Non-Functional Requirements

### Performance
- Backpack open/close animation must complete in under 300ms
- Tab switching must feel instant (< 200ms perceived delay)
- Texture loading must not block UI interactions
- Evidence filtering must update in real-time (< 100ms)

### Compatibility
- Must work on iOS Safari 14+
- Must work on Android Chrome 90+
- Must support devices with 2GB+ RAM
- Must handle touch gestures smoothly

### Maintainability
- Backpack component must be modular and reusable
- Tab content must be separated into individual components
- Context-aware logic must be centralized
- Code must follow existing project patterns

### Accessibility
- Tab labels must be readable at default mobile font sizes
- Interactive elements must have 44px minimum touch targets
- Evidence checklist must be keyboard navigable (future web support)
- Critical information must not rely solely on color

---

## Acceptance Criteria Testing Prework

This section will be completed during the design phase to determine which criteria are testable as properties, examples, or edge cases.
