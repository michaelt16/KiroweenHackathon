# Requirements Document - Spec 008: Full UI Transformation

## Introduction

Transform Ghost Hunt's entire user interface to match the established analog horror aesthetic. This spec builds upon Spec 007 (Analog Horror UI) and Spec 006 (Analog Horror Component System) to create a cohesive, immersive experience where every screen feels like authentic paranormal investigation equipment and documentation.

**Core Philosophy:** The entire game should feel like you're using real 1980s-90s ghost-hunting equipment and reviewing physical case files, not interacting with a modern mobile app.

## Glossary

- **Corkboard Map**: Physical map pinned to a detective's corkboard with push pins, red thread, and sticky notes
- **Paper UI**: Aged paper textures for all document screens (Codex, Profile, Inventory)
- **Physical Devices**: Full-screen investigation tools that feel like real equipment (Radar, EMF, Thermal, Camera, Spirit Box)
- **Analog Horror**: Aesthetic inspired by found footage, VHS tapes, and retro tech
- **Texture Layering**: Multiple texture overlays (paper, dust, wrinkles) for realistic depth
- **Damage Elements**: Scratches, tape, stains, burns, and wear patterns on all surfaces
- **Handwritten Typography**: Caveat font for all handwritten text elements
- **Typewriter Typography**: Courier New for all system/machine text

---

## Requirements

### Requirement 1: Map Screen Transformation

**User Story:** As a player, I want the map screen to look like a detective's corkboard with a pinned paper map, so that it feels like I'm planning investigations in a real investigation room.

#### Acceptance Criteria

1. WHEN the map screen loads THEN the system SHALL display a full-screen corkboard background with authentic cork texture
2. WHEN the map is displayed THEN the system SHALL render a paper map pinned to the corkboard with 4 corner push pins
3. WHEN the map is displayed THEN the system SHALL apply a slight rotation (1-2 degrees) to the paper map for natural placement
4. WHEN locations are marked THEN the system SHALL display red push pins with paper tag labels (not digital speech bubbles)
5. WHEN a location is selected THEN the system SHALL draw hand-drawn red circles around it with "HIGH ACTIVITY" labels
6. WHEN a location is selected THEN the system SHALL display a Polaroid photo near the map edge connected by red thread
7. WHEN the map is displayed THEN the system SHALL show 1-2 sticky notes overlapping the map edges with handwritten warnings
8. WHEN the map is displayed THEN the system SHALL desaturate and darken the Leaflet map tiles to look like a printed photocopy
9. WHEN the map is displayed THEN the system SHALL apply paper texture overlay (wrinkled paper, dust) to the map area
10. WHEN the map is displayed THEN the system SHALL hide or minimize Leaflet UI controls (zoom, attribution)

---

### Requirement 2: Codex Screen Transformation

**User Story:** As a player, I want the Codex to look like a physical journal or case file book, so that it feels like I'm reviewing real investigation documentation.

#### Acceptance Criteria

1. WHEN the Codex screen loads THEN the system SHALL display aged paper background with wrinkled texture
2. WHEN ghost entries are displayed THEN the system SHALL use handwritten typography (Caveat) for titles and notes
3. WHEN ghost entries are displayed THEN the system SHALL use typewriter typography (Courier New) for technical data
4. WHEN ghost entries are displayed THEN the system SHALL include damage elements (coffee stains, tape, scratches)
5. WHEN ghost entries are displayed THEN the system SHALL apply texture overlays (dust, wrinkles, paper grain)
6. WHEN ghost entries are displayed THEN the system SHALL use aged paper colors (never pure white)
7. WHEN entries are updated THEN the system SHALL apply subtle static burst or glitch transitions
8. WHEN Polaroid photos are shown THEN the system SHALL display them with tape and slight rotation

---

### Requirement 3: Profile Screen Transformation

**User Story:** As a player, I want the Profile screen to look like a physical ID badge or case file, so that it feels like authentic investigation documentation.

#### Acceptance Criteria

1. WHEN the Profile screen loads THEN the system SHALL display aged paper or card stock background
2. WHEN player stats are displayed THEN the system SHALL use typewriter typography for data
3. WHEN player stats are displayed THEN the system SHALL use handwritten typography for notes
4. WHEN the profile is displayed THEN the system SHALL include damage elements (fingerprints, stains, wear)
5. WHEN the profile is displayed THEN the system SHALL apply texture overlays for depth
6. WHEN the profile is displayed THEN the system SHALL use aged paper colors
7. WHEN achievements are shown THEN the system SHALL display them as stamps or badges with tape

---

### Requirement 4: Inventory Screen Transformation

**User Story:** As a player, I want the Inventory screen to look like a physical equipment log or supply checklist, so that it feels like real field documentation.

#### Acceptance Criteria

1. WHEN the Inventory screen loads THEN the system SHALL display aged paper background
2. WHEN items are listed THEN the system SHALL use typewriter typography for item names
3. WHEN items are listed THEN the system SHALL use handwritten typography for notes
4. WHEN items are displayed THEN the system SHALL include damage elements (checkmarks, scribbles, stains)
5. WHEN items are displayed THEN the system SHALL apply texture overlays
6. WHEN items are displayed THEN the system SHALL use aged paper colors
7. WHEN items are collected THEN the system SHALL apply subtle visual feedback (static burst, glitch)

---

### Requirement 5: Investigation Tools Consistency

**User Story:** As a player, I want all investigation tools to feel like real physical devices, so that the experience is immersive and consistent.

#### Acceptance Criteria

1. WHEN any investigation tool is opened THEN the system SHALL display it full-screen (100% viewport)
2. WHEN any investigation tool is displayed THEN the system SHALL use appropriate material textures (steel for Radar/EMF, plastic for Thermal/Camera)
3. WHEN any investigation tool is displayed THEN the system SHALL include extensive wear and damage elements
4. WHEN any investigation tool is displayed THEN the system SHALL use deep screen insets with thick bezels
5. WHEN any investigation tool is displayed THEN the system SHALL apply appropriate display effects (CRT glow, scanlines, thermal gradient)
6. WHEN any investigation tool is displayed THEN the system SHALL use etched-style labels with proper opacity
7. WHEN any investigation tool is displayed THEN the system SHALL include physical controls (buttons, knobs, switches)

---

### Requirement 6: Navigation and Transitions

**User Story:** As a player, I want screen transitions to feel like analog equipment switching or page turning, so that the experience feels cohesive.

#### Acceptance Criteria

1. WHEN transitioning between screens THEN the system SHALL apply subtle static burst or glitch effects
2. WHEN transitioning to investigation tools THEN the system SHALL apply VHS tracking line effects
3. WHEN transitioning between document screens THEN the system SHALL apply page turn or fade effects
4. WHEN navigating THEN the system SHALL maintain consistent analog horror aesthetic throughout
5. WHEN navigating THEN the system SHALL preserve all game functionality (no breaking changes)

---

### Requirement 7: Mobile Responsiveness

**User Story:** As a player on mobile, I want the analog horror UI to remain readable and functional, so that I can play the game effectively.

#### Acceptance Criteria

1. WHEN the UI is displayed on mobile THEN the system SHALL maintain all visual effects at appropriate scales
2. WHEN the UI is displayed on mobile THEN the system SHALL ensure text remains legible
3. WHEN the UI is displayed on mobile THEN the system SHALL maintain touch targets at appropriate sizes
4. WHEN the UI is displayed on mobile THEN the system SHALL hide or minimize decorative elements that obscure content
5. WHEN the UI is displayed on mobile THEN the system SHALL preserve all interactive functionality

---

### Requirement 8: Performance and Optimization

**User Story:** As a player, I want the analog horror UI to perform smoothly, so that the game remains playable.

#### Acceptance Criteria

1. WHEN textures are loaded THEN the system SHALL cache and reuse texture images
2. WHEN effects are applied THEN the system SHALL use CSS transforms and filters (GPU-accelerated)
3. WHEN animations are running THEN the system SHALL maintain 60fps on target devices
4. WHEN screens are displayed THEN the system SHALL lazy-load non-critical textures
5. WHEN screens are displayed THEN the system SHALL optimize texture sizes for web delivery

---

## Non-Functional Requirements

### NFR-1: Consistency
- All screens MUST follow the same analog horror aesthetic rules
- All paper UI elements MUST use the same texture library
- All investigation tools MUST follow the same design system (Spec 007)

### NFR-2: Accessibility
- Text MUST remain readable despite texture overlays
- Interactive elements MUST have sufficient contrast
- Touch targets MUST meet minimum size requirements (44x44px)

### NFR-3: Maintainability
- All texture assets MUST be organized in `/assets/texture/`
- All component styles MUST follow the established patterns
- All typography MUST use the defined font families

### NFR-4: Backward Compatibility
- All existing game functionality MUST be preserved
- All existing data structures MUST remain unchanged
- All existing API calls MUST continue to work

---

## Out of Scope

- Creating new game mechanics or features
- Changing data models or API structures
- Adding new investigation tools (use existing 5 tools)
- Creating new texture assets (use existing texture library)
- Modifying core game logic or state management

---

## Success Criteria

1. ✅ Map screen looks like a detective's corkboard with pinned paper map
2. ✅ Codex screen looks like a physical journal or case file book
3. ✅ Profile screen looks like a physical ID badge or case file
4. ✅ Inventory screen looks like a physical equipment log
5. ✅ All investigation tools maintain consistent full-screen device aesthetic
6. ✅ All screens use aged paper textures and damage elements
7. ✅ All screens use appropriate typography (Caveat for handwritten, Courier New for typewriter)
8. ✅ All transitions feel analog and cohesive
9. ✅ All functionality remains intact
10. ✅ Performance remains acceptable on target devices




