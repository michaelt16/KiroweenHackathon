# Requirements Document - Spec 007: Analog Horror UI

## Introduction

Transform Ghost Hunt's visual aesthetic from cartoony to atmospheric analog horror, inspired by Demonologist and FNAF. Create a "found footage" paranormal investigation experience using CRT/VHS effects, monochrome green displays, and retro tech UI elements. All effects will be code-based (CSS/Canvas/SVG) with placeholder images for ghost visuals.

## Glossary

- **CRT**: Cathode Ray Tube - Old monitor technology with characteristic scanlines and glow
- **VHS**: Video Home System - Analog video format with tracking lines and static
- **Scanlines**: Horizontal lines visible on CRT displays
- **Chromatic Aberration**: RGB color split effect from analog video
- **Oscilloscope**: Electronic test instrument with characteristic waveform display
- **Glitch Effect**: Digital/analog artifact distortion
- **Monochrome Green**: Single-color green display (#00ff41) typical of early computer terminals
- **Static Overlay**: Visual noise/grain effect
- **Bezel**: Frame or border around a display

---

## Requirements

### Requirement 1: CRT/VHS Visual Effects System

**User Story:** As a player, I want the investigation screen to feel like I'm viewing through old paranormal investigation equipment, so that the experience feels authentic and atmospheric.

#### Acceptance Criteria

1. WHEN the investigation screen loads THEN the system SHALL apply a persistent static overlay at 5-10% opacity across the entire screen
2. WHEN any screen is displayed THEN the system SHALL render horizontal scanlines at 2-4px intervals with 20% opacity
3. WHEN the investigation is active THEN the system SHALL apply subtle chromatic aberration (RGB split) of 1-2px to all UI elements
4. WHEN the screen updates THEN the system SHALL apply a subtle flicker effect at random intervals (every 3-8 seconds)
5. WHEN transitioning between screens THEN the system SHALL display a VHS tracking line effect for 0.3-0.5 seconds

---

### Requirement 2: Monochrome Green Color Scheme

**User Story:** As a player, I want the UI to use classic CRT green monochrome colors, so that it feels like authentic paranormal investigation equipment.

#### Acceptance Criteria

1. WHEN any UI element is rendered THEN the system SHALL use monochrome green (#00ff41) as the primary color
2. WHEN text is displayed THEN the system SHALL use green with appropriate brightness variations for hierarchy
3. WHEN interactive elements are highlighted THEN the system SHALL use brighter green (#00ff88) with glow effect
4. WHEN backgrounds are rendered THEN the system SHALL use deep black (#0a0e0f) as the base color
5. WHEN depth is needed THEN the system SHALL use darker green shades (#003311, #005522) for layering

---

### Requirement 3: Enhanced Radar Display

**User Story:** As a player, I want the radar to look like a real oscilloscope/sonar display, so that it feels like professional ghost hunting equipment.

#### Acceptance Criteria

1. WHEN the radar is displayed THEN the system SHALL render concentric range rings with 10% opacity green lines
2. WHEN the radar sweeps THEN the system SHALL display a rotating sweep line with trailing glow effect
3. WHEN the ghost blip appears THEN the system SHALL render it as a pulsing dot with expanding ring animation
4. WHEN the radar is active THEN the system SHALL display a grid overlay with 5% opacity
5. WHEN the compass heading updates THEN the system SHALL display cardinal directions (N/S/E/W) in corners with glow
6. WHEN the radar frame is rendered THEN the system SHALL include retro tech bezel with corner brackets
7. WHEN the radar is idle THEN the system SHALL display subtle noise/grain texture on the display area

---

### Requirement 4: Retro Tech Tool UI Frames

**User Story:** As a player, I want each tool to have a distinct retro tech interface, so that switching tools feels like using different pieces of equipment.

#### Acceptance Criteria

1. WHEN any tool is activated THEN the system SHALL display a retro tech bezel frame around the tool display
2. WHEN the EMF meter is active THEN the system SHALL display oscilloscope-style waveform visualization
3. WHEN the camera is active THEN the system SHALL display a viewfinder frame with corner brackets and crosshairs
4. WHEN the thermal scanner is active THEN the system SHALL display a heat signature overlay with grid lines
5. WHEN the audio receiver is active THEN the system SHALL display waveform bars with frequency indicators
6. WHEN tool labels are shown THEN the system SHALL use stencil-style uppercase text with slight glow
7. WHEN tool status is displayed THEN the system SHALL show digital-style readouts (e.g., "SIGNAL: 78%")

---

### Requirement 5: Ghost Codex - Case Files Interface

**User Story:** As a player, I want the ghost codex to look like classified paranormal case files, so that discovering ghosts feels like uncovering secrets.

#### Acceptance Criteria

1. WHEN the codex is opened THEN the system SHALL display a case file layout with header "PARANORMAL DATABASE - CLASSIFIED"
2. WHEN a ghost entry is displayed THEN the system SHALL show a centered ghost image with subtle floating animation
3. WHEN ghost information is shown THEN the system SHALL display entity name, threat level, and encounter count
4. WHEN characteristics are listed THEN the system SHALL use bullet points with glitch effect on hover
5. WHEN locked ghosts are shown THEN the system SHALL display silhouette placeholder with "UNKNOWN ENTITY" label
6. WHEN navigating entries THEN the system SHALL use static burst transition effect between ghosts
7. WHEN the codex background is rendered THEN the system SHALL apply paper texture overlay with scanlines

---

### Requirement 6: Profile Card - Security Badge Style

**User Story:** As a player, I want my profile to look like a paranormal investigator security badge, so that I feel like part of an organization.

#### Acceptance Criteria

1. WHEN the profile is displayed THEN the system SHALL show a badge-style card with "INVESTIGATOR ID" header
2. WHEN user information is shown THEN the system SHALL display agent name, rank, and clearance level
3. WHEN level progress is displayed THEN the system SHALL show XP bar with percentage and glitch effect when leveling up
4. WHEN stats are shown THEN the system SHALL display investigations completed, ghosts caught, and success rate
5. WHEN the avatar is displayed THEN the system SHALL show placeholder silhouette with static overlay
6. WHEN the badge is rendered THEN the system SHALL include corner brackets and border with glow effect

---

### Requirement 7: Glitch Transition Effects

**User Story:** As a player, I want screen transitions to feel like analog video glitches, so that the experience feels cohesive and atmospheric.

#### Acceptance Criteria

1. WHEN transitioning between screens THEN the system SHALL display a static burst effect for 0.2-0.3 seconds
2. WHEN a tool is activated THEN the system SHALL apply a brief RGB split effect (0.1 seconds)
3. WHEN an error occurs THEN the system SHALL display a screen shake with static overlay
4. WHEN loading content THEN the system SHALL show VHS tracking lines moving vertically
5. WHEN a ghost is identified THEN the system SHALL apply dramatic glitch reveal animation

---

### Requirement 8: Text and Typography Effects

**User Story:** As a player, I want text to have retro tech styling with occasional glitches, so that it matches the analog horror aesthetic.

#### Acceptance Criteria

1. WHEN any text is rendered THEN the system SHALL use monospace font with slight letter-spacing
2. WHEN headers are displayed THEN the system SHALL use uppercase text with glow effect
3. WHEN important labels are shown THEN the system SHALL apply subtle flicker animation at random intervals
4. WHEN text is emphasized THEN the system SHALL use brighter green with stronger glow
5. WHEN errors or warnings are shown THEN the system SHALL apply glitch distortion effect to text

---

### Requirement 9: Bottom HUD with Field Kit Drawer

**User Story:** As a player, I want to access my tools through a Field Kit drawer, so that tool switching requires intentional action and creates skill expression.

#### Acceptance Criteria

1. WHEN the HUD is displayed THEN the system SHALL show active tool name, sanity bar, Field Kit button, and film counter
2. WHEN the Field Kit button is tapped THEN the system SHALL slide up a drawer showing all 5 tools
3. WHEN a tool is selected from the drawer THEN the system SHALL switch to that tool and close the drawer
4. WHEN the drawer is open THEN the system SHALL highlight the active tool with bright green glow
5. WHEN sanity is displayed THEN the system SHALL show a bar with glitch effect when below 30%
6. WHEN the drawer slides THEN the system SHALL apply smooth animation with static effect
7. WHEN the Field Kit button is shown THEN the system SHALL use retro tech styling with corner brackets

---

### Requirement 10: Investigation Screen Atmosphere

**User Story:** As a player, I want the investigation screen to feel dark and ominous, so that I'm immersed in the horror atmosphere.

#### Acceptance Criteria

1. WHEN the investigation starts THEN the system SHALL apply a dark vignette effect around screen edges
2. WHEN sanity is low (<30%) THEN the system SHALL increase vignette intensity and add red tint to edges
3. WHEN the background is rendered THEN the system SHALL use deep black with subtle noise texture
4. WHEN UI elements are displayed THEN the system SHALL apply glow effects to create depth
5. WHEN the screen is idle THEN the system SHALL display subtle ambient particle effects (dust, static)

---

### Requirement 11: Performance and Optimization

**User Story:** As a developer, I want visual effects to be performant, so that the game runs smoothly on all devices.

#### Acceptance Criteria

1. WHEN effects are applied THEN the system SHALL maintain 30fps minimum on target devices
2. WHEN multiple effects are active THEN the system SHALL use CSS transforms and GPU acceleration where possible
3. WHEN static/noise is rendered THEN the system SHALL use cached textures rather than generating per-frame
4. WHEN animations run THEN the system SHALL use requestAnimationFrame for smooth performance
5. WHEN effects impact performance THEN the system SHALL provide option to reduce effect intensity

---

### Requirement 12: Placeholder Assets

**User Story:** As a developer, I want to use placeholder images for ghosts, so that the UI can be built before final assets are ready.

#### Acceptance Criteria

1. WHEN ghost images are needed THEN the system SHALL use free scary images from Unsplash/Pexels as placeholders
2. WHEN tool icons are needed THEN the system SHALL use simple geometric SVG shapes as placeholders
3. WHEN textures are needed THEN the system SHALL generate them with CSS/Canvas
4. WHEN placeholders are used THEN the system SHALL structure code to easily swap in final assets later
5. WHEN assets are missing THEN the system SHALL display fallback silhouettes with "PLACEHOLDER" label

---

## Success Criteria

The Analog Horror UI is complete when:

1. ✅ Investigation screen has persistent CRT/VHS effects (scanlines, static, glow)
2. ✅ All UI uses monochrome green color scheme with appropriate contrast
3. ✅ Radar looks like oscilloscope with sweep, rings, and retro bezel
4. ✅ Each tool has distinct retro tech interface with appropriate effects
5. ✅ Ghost codex displays case file layout with placeholder ghost images
6. ✅ Profile card looks like security badge with stats and progress
7. ✅ Screen transitions use glitch/static effects
8. ✅ Text has retro styling with occasional flicker/glitch
9. ✅ Bottom HUD looks like control panel with tool buttons
10. ✅ Overall atmosphere is dark, ominous, and immersive
11. ✅ Performance is smooth (30fps+) on target devices
12. ✅ All effects are code-based (CSS/Canvas/SVG)

---

## Notes

- Sound effects will be added in a future spec
- Final ghost animations will replace placeholders later
- Custom tool icons will replace geometric placeholders later
- Focus is on creating the visual framework and atmosphere
- All effects should be toggleable for accessibility/performance
