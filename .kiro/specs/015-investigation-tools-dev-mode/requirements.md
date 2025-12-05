# Requirements Document

## Introduction

This spec implements the **Investigation Tools & Ghost Interaction System** - the core gameplay mechanics that allow players to detect, track, and gather evidence about ghosts. This is **Phase 2** of the Investigation Mode implementation and builds directly on Spec 014's ghost data foundation.

**⚠️ CRITICAL: NO NEW UI COMPONENTS**

All investigation tool UI already exists and has been beautifully styled with analog horror aesthetics (Specs 009, 012, 013):
- ✅ `RadarTool.tsx` - Circular CRT radar (complete)
- ✅ `EMFTool.tsx` - LED bar graph meter (complete)
- ✅ `CameraTool.tsx` - Polaroid camera viewfinder (complete)
- ✅ `SpiritBoxTool.tsx` - Oscilloscope scanner (complete)
- ✅ `ThermalTool.tsx` - FLIR thermal imager (complete)
- ✅ `FieldKitDrawer.tsx` - Tool drawer with tabs (complete)
- ✅ `ToolsTab.tsx`, `PhotosTab.tsx`, `EvidenceTab.tsx`, `CodexTab.tsx` - All drawer tabs (complete)
- ✅ `DevModeControls.tsx` - Dev mode UI (complete)

**This spec focuses on connecting existing UI to ghost data and making it functional:**
- Connect tools to Ghost Data Store (Spec 014)
- Implement tool behavior logic (EMF personalities, Spirit Box tuning, Camera manifestations)
- Wire up Dev Mode controls to simulate ghost positions
- Implement evidence logging and photo capture
- Enable camera cooldown and tool switching mechanics

All tools will be tested in **Dev Mode** (simulated ghost position, no GPS required) to ensure mechanics work correctly before GPS integration in Spec 016.

This spec focuses on the **camera-first gameplay loop** defined in steering file 014-ghost-tool-mechanics.md:
1. Radar → Find direction
2. EMF → Confirm distance
3. Camera → Take photo (7s cooldown)
4. During cooldown → Rapidly switch between Spirit Box, Thermal, EMF, Radar
5. Review evidence → Make deduction

## Glossary

- **Investigation Mode**: Full-screen tool interface where players actively hunt ghosts
- **Dev Mode**: Testing environment with simulated ghost position (no GPS required)
- **Tool Drawer**: Slide-up panel containing tool selection, photos, evidence, and codex tabs
- **Evidence Tab**: Log of all collected evidence (photos, EMF readings, Spirit Box words, thermal data)
- **Camera Cooldown**: 7-second lockout after taking a photo while film develops
- **Tool Juggling**: Rapidly switching between tools during camera cooldown to maximize evidence gathering
- **Ghost Bearing**: Direction to ghost in degrees (0-360°)
- **Ghost Distance**: Distance from player to ghost in meters
- **Forward Cone**: ±45° detection arc in front of player for Radar blip visibility

---

## Architecture: Centralized Ghost Relationship System

**Key Design Decision**: All tools use a centralized `useGhostRelationship()` hook instead of calculating distance/bearing independently.

**Hook Location**: `src/hooks/useGhostRelationship.ts`

**What it provides**:
- `distance`: Distance to ghost in meters (Haversine formula)
- `bearing`: Absolute bearing to ghost (0-360°, where 0° = North)
- `relativeBearing`: Relative to player heading (0-360°, where 0° = straight ahead)
- `isInForwardCone`: Whether ghost is within ±45° forward detection arc
- `ghostBehavior`: Complete ghost behavior profile (EMF personality, thermal reading, camera manifestations, etc.)
- `ghostType`: Active ghost type (for reference)
- `isValid`: Whether positions are available

**Benefits**:
- Single source of truth for all position calculations
- Consistent data across all tools
- Automatic updates when positions change
- Better performance (calculations happen once)
- Easier maintenance (fix bugs in one place)

**Status**:
- ✅ RadarTool: Uses centralized hook
- ✅ EMFTool: Uses centralized hook
- ✅ DebugOverlay: Uses centralized hook
- 🔄 CameraTool: Should use centralized hook
- 🔄 ThermalTool: Should use centralized hook

---

## Requirements

### Requirement 1: Dev Mode Ghost Simulation

**User Story:** As a developer, I want to test investigation tools without GPS, so that I can validate mechanics before real-world integration.

#### Acceptance Criteria

1. WHEN Dev Mode is enabled THEN the system SHALL provide controls to set simulated ghost position (latitude, longitude)
2. WHEN Dev Mode is enabled THEN the system SHALL provide controls to set simulated player position (latitude, longitude)
3. WHEN Dev Mode is enabled THEN the system SHALL provide controls to set simulated player heading (0-360°)
4. WHEN Dev Mode is enabled THEN the system SHALL calculate ghost bearing and distance from simulated positions
5. WHEN Dev Mode ghost position changes THEN all tools SHALL update immediately to reflect new bearing and distance
6. WHEN Dev Mode is enabled THEN the system SHALL provide a dropdown to select active ghost type (all 7 types)
7. WHEN Dev Mode ghost type changes THEN all tools SHALL use the new ghost's behavioral profile from the Ghost Data Store

---

### Requirement 2: Radar Tool (Direction Only)

**User Story:** As a player, I want to use the Radar to find which direction the ghost is, so that I know which way to walk.

#### Acceptance Criteria

1. WHEN using Radar THEN the system SHALL display a circular CRT screen with green phosphor glow, scanlines, and range rings (visual reference only, no distance labels)
2. WHEN using Radar THEN the system SHALL display player heading (HDG: XXX°) at the top of the screen
3. WHEN using Radar THEN the system SHALL display a north indicator (N) that rotates opposite to player heading
4. WHEN the ghost is within ±45° of player heading THEN the Radar SHALL display a red pulsing blip with ±5° wobble
5. WHEN the ghost is within ±45° of player heading THEN the Radar SHALL display ghost bearing (TARGET: XXX°)
6. WHEN the ghost is outside ±45° of player heading THEN the Radar SHALL NOT display any blip or bearing
7. WHEN using Radar THEN the system SHALL NOT display distance to ghost (Radar shows direction only, not distance)

---

### Requirement 3: EMF Meter (Distance + Personality Noise)

**User Story:** As a player, I want to use the EMF Meter to confirm how close I am to the ghost, so that I know when to take a photo.

#### Acceptance Criteria

1. WHEN using EMF Meter THEN the system SHALL display a 5-column LED bar graph with 8 segments per column
2. WHEN calculating EMF level THEN the system SHALL use base level from true distance: >40m=0, 20-40m=1, 10-20m=2, 6-10m=3, 3-6m=4, <3m=5
3. WHEN calculating EMF level THEN the system SHALL add personality noise based on active ghost's EMF personality (Calm, Unstable, Shy, Aggressive, Mischievous)
4. WHEN EMF personality is Calm THEN the system SHALL display consistent, smooth readings with minimal variation
5. WHEN EMF personality is Unstable THEN the system SHALL add chaotic ±1 jitter to base level
6. WHEN EMF personality is Shy THEN the system SHALL read lower than base level until very close (<5m)
7. WHEN EMF personality is Aggressive THEN the system SHALL spike early, showing higher readings even at distance
8. WHEN EMF personality is Mischievous THEN the system SHALL oscillate in a sin-wave pattern around base level
9. WHEN EMF level is displayed THEN the system SHALL clamp final value to 0-5 range
10. WHEN EMF reaches level 4 or 5 THEN the system SHALL provide visual feedback (screen shake, red glow) indicating optimal photo distance

---

### Requirement 4: Camera Tool (Primary Evidence)

**User Story:** As a player, I want to take photos of the ghost, so that I can capture visual evidence of its manifestation.

#### Acceptance Criteria

1. WHEN using Camera THEN the system SHALL display a 4:3 viewfinder with REC indicator, timestamp, battery indicator, and crosshairs
2. WHEN the shutter button is pressed THEN the system SHALL capture a photo immediately with screen flash effect
3. WHEN a photo is captured THEN the system SHALL lock the Camera for 7 seconds while the film develops
4. WHEN Camera is locked THEN the shutter button SHALL be disabled and display "DEVELOPING..." text
5. WHEN film is developing THEN the player SHALL be able to switch to other tools (EMF, Spirit Box, Thermal, Radar)
6. WHEN 7 seconds elapse THEN the Camera SHALL unlock and allow another photo
7. WHEN a photo is captured THEN the system SHALL determine manifestation type based on active ghost's camera profile and distance
8. WHEN distance is <5m THEN manifestation probability SHALL be highest (80-95% chance of visible manifestation)
9. WHEN distance is 5-10m THEN manifestation probability SHALL be medium (50-70% chance)
10. WHEN distance is >10m THEN manifestation probability SHALL be low (10-30% chance)
11. WHEN a photo is captured THEN the system SHALL save it to the Photos tab with timestamp and manifestation result
12. WHEN viewing Photos tab THEN the system SHALL display all captured photos in Polaroid-style frames with tape

---

### Requirement 5: Spirit Box Tool (Dual-Knob Tuning)

**User Story:** As a player, I want to tune the Spirit Box to hear ghost words, so that I can gather audio evidence.

#### Acceptance Criteria

1. WHEN using Spirit Box THEN the system SHALL display an oscilloscope waveform with static noise
2. WHEN using Spirit Box THEN the system SHALL provide two tuning knobs: Knob A (Carrier Frequency) and Knob B (Modulation Frequency), both 0.0-1.0
3. WHEN both knobs are within tolerance (~0.06) of the active ghost's target frequencies THEN the system SHALL clear static and display "SIGNAL LOCKED"
4. WHEN signal is locked THEN the system SHALL output one random word from the active ghost's word families (emotion + theme)
5. WHEN signal is locked THEN the system SHALL display the word as text overlay on the oscilloscope
6. WHEN signal is not locked THEN the system SHALL display static waveform and no words
7. WHEN a word is output THEN the system SHALL log it to the Evidence Tab with timestamp
8. WHEN tuning knobs THEN the system SHALL provide smooth, continuous adjustment (not discrete steps)

---

### Requirement 6: Thermal Scanner Tool (Temperature Detection)

**User Story:** As a player, I want to use the Thermal Scanner to detect cold spots, so that I can gather environmental evidence.

#### Acceptance Criteria

1. WHEN using Thermal Scanner THEN the system SHALL display a thermal gradient viewfinder with purple/blue → yellow → orange → white color scale
2. WHEN calculating thermal reading THEN the system SHALL use the active ghost's thermal category (Normal, Cold Spot, Deep Cold)
3. WHEN thermal category is Normal THEN the system SHALL display ambient temperature (15-20°C) with green/yellow gradient
4. WHEN thermal category is Cold Spot THEN the system SHALL display cold zone (8-12°C) with blue gradient when distance <10m
5. WHEN thermal category is Deep Cold THEN the system SHALL display extreme cold (<8°C) with purple/blue gradient when distance <10m
6. WHEN distance is >10m THEN the system SHALL display Normal temperature regardless of ghost's thermal category
7. WHEN a cold reading is detected THEN the system SHALL log it to the Evidence Tab with timestamp and temperature value

---

### Requirement 7: Tool Drawer System

**User Story:** As a player, I want to access all tools and evidence from a single drawer, so that I can quickly switch between tools and review collected evidence.

#### Acceptance Criteria

1. WHEN investigation mode is active THEN the system SHALL display a drawer button at the bottom-center of the screen
2. WHEN the drawer button is tapped THEN the system SHALL slide up a drawer panel covering 50-60% of the screen
3. WHEN the drawer is open THEN the system SHALL display four tabs: Tools, Photos, Evidence, Codex
4. WHEN the Tools tab is active THEN the system SHALL display all 5 tool icons (Radar, EMF, Camera, Spirit Box, Thermal) with tap-to-select
5. WHEN a tool is selected THEN the system SHALL close the drawer and display the selected tool full-screen
6. WHEN the Photos tab is active THEN the system SHALL display all captured photos in a scrollable grid with Polaroid-style frames
7. WHEN the Evidence tab is active THEN the system SHALL display all logged evidence (EMF readings, Spirit Box words, thermal data, photos) in chronological order
8. WHEN the Codex tab is active THEN the system SHALL display the ghost encyclopedia (read-only reference during investigation)

---

### Requirement 8: Evidence Logging System

**User Story:** As a player, I want to review all evidence I've collected, so that I can make an informed deduction about the ghost type.

#### Acceptance Criteria

1. WHEN a photo is captured THEN the system SHALL log it to Evidence Tab with timestamp, distance, and manifestation result
2. WHEN EMF reaches level 4 or 5 THEN the system SHALL log it to Evidence Tab with timestamp, level, and personality pattern
3. WHEN Spirit Box outputs a word THEN the system SHALL log it to Evidence Tab with timestamp and word text
4. WHEN Thermal detects cold THEN the system SHALL log it to Evidence Tab with timestamp and temperature value
5. WHEN viewing Evidence Tab THEN the system SHALL display all evidence in chronological order with clear visual separation
6. WHEN viewing Evidence Tab THEN the system SHALL use analog horror styling (typewritten text, handwritten notes, paper texture)
7. WHEN evidence is logged THEN the system SHALL persist it for the duration of the investigation (cleared when investigation ends)

---

### Requirement 9: Tool Switching During Camera Cooldown

**User Story:** As a player, I want to use other tools while my camera film is developing, so that I can maximize evidence gathering during the 7-second cooldown.

#### Acceptance Criteria

1. WHEN Camera is locked (developing) THEN the player SHALL be able to open the tool drawer
2. WHEN Camera is locked THEN the player SHALL be able to select and use EMF, Spirit Box, Thermal, or Radar
3. WHEN Camera is locked THEN the player SHALL be able to switch between non-Camera tools freely
4. WHEN Camera is locked THEN the Camera icon in the tool drawer SHALL display "DEVELOPING..." status
5. WHEN Camera unlocks (7s elapsed) THEN the Camera icon SHALL return to normal state and be selectable again
6. WHEN switching tools THEN the transition SHALL be smooth with no lag or visual glitches

---

### Requirement 10: Investigation Entry and Exit

**User Story:** As a player, I want to enter and exit investigation mode, so that I can start and end ghost hunts.

#### Acceptance Criteria

1. WHEN entering investigation mode THEN the system SHALL transition from map view to full-screen investigation view
2. WHEN entering investigation mode THEN the system SHALL initialize Dev Mode controls (if enabled)
3. WHEN entering investigation mode THEN the system SHALL select a random ghost type from the Ghost Data Store (or use Dev Mode override)
4. WHEN entering investigation mode THEN the system SHALL set initial ghost position (simulated in Dev Mode)
5. WHEN entering investigation mode THEN the system SHALL default to Radar tool
6. WHEN exiting investigation mode THEN the system SHALL save all collected evidence
7. WHEN exiting investigation mode THEN the system SHALL return to map view
8. WHEN exiting investigation mode THEN the system SHALL clear investigation state (evidence, photos, tool selections)

---

### Requirement 11: Dev Mode Controls UI

**User Story:** As a developer, I want intuitive controls to test investigation mechanics, so that I can validate tool behavior without GPS.

#### Acceptance Criteria

1. WHEN Dev Mode is enabled THEN the system SHALL display a floating control panel with minimize/expand button
2. WHEN Dev Mode controls are expanded THEN the system SHALL display sliders for: Ghost Distance (0-50m), Player Heading (0-360°), Ghost Bearing (0-360°)
3. WHEN Dev Mode controls are expanded THEN the system SHALL display a dropdown to select active ghost type (all 7 types)
4. WHEN Dev Mode controls are expanded THEN the system SHALL display a "Randomize Position" button to set random ghost bearing and distance
5. WHEN Dev Mode controls are expanded THEN the system SHALL display current values for all parameters (distance, bearing, heading, ghost type)
6. WHEN Dev Mode controls are minimized THEN the system SHALL show only a small floating button to re-expand
7. WHEN Dev Mode is disabled THEN the system SHALL hide all Dev Mode controls

---

### Requirement 12: Tool Visual Consistency (Already Complete)

**User Story:** As a player, I want all tools to have consistent analog horror styling, so that the investigation feels cohesive and immersive.

**⚠️ NOTE: All tool UI is already complete (Specs 009, 012, 013). This requirement validates existing styling, not new work.**

#### Acceptance Criteria

1. WHEN any tool is displayed THEN the system SHALL use the existing full-screen layout (100% viewport) ✅ Already implemented
2. WHEN any tool is displayed THEN the system SHALL use the existing heavy texture layering (metal/plastic texture, rust, dust, scratches) ✅ Already implemented
3. WHEN any tool is displayed THEN the system SHALL use the existing 10-15+ damage elements (scratches, rust spots, tape patches, fingerprints, etc.) ✅ Already implemented
4. WHEN any tool is displayed THEN the system SHALL use the existing etched-style labels (handwritten Caveat font, typewritten Courier font, 40-50% opacity) ✅ Already implemented
5. WHEN any tool is displayed THEN the system SHALL use the existing physical hardware (screws, vent grilles, weld seams, serial numbers) ✅ Already implemented
6. WHEN any tool is displayed THEN the system SHALL use the existing material-specific styling (heavy steel for Radar/EMF/Spirit Box, rubberized plastic for Camera/Thermal) ✅ Already implemented
7. WHEN validating tools THEN the system SHALL confirm they match the reference mock files (RadarToolMock.tsx, EMFMeterMock.tsx, ThermalScannerMock.tsx, CameraViewfinderMock.tsx, SpiritBoxMock.tsx) ✅ Already validated in Spec 013

---

### Requirement 13: Camera-First Gameplay Loop

**User Story:** As a player, I want the investigation to flow naturally from direction → distance → photo → tool juggling, so that I experience the intended gameplay rhythm.

#### Acceptance Criteria

1. WHEN investigation starts THEN the system SHALL default to Radar tool (step 1: find direction)
2. WHEN ghost blip appears on Radar THEN the system SHALL encourage switching to EMF (step 2: confirm distance)
3. WHEN EMF reaches level 4-5 THEN the system SHALL provide visual feedback encouraging photo (step 3: take photo)
4. WHEN photo is taken THEN the system SHALL lock Camera for 7 seconds (step 4: tool juggling window)
5. WHEN Camera is locked THEN the system SHALL allow rapid switching between EMF, Spirit Box, Thermal, Radar (step 5: gather additional evidence)
6. WHEN Camera unlocks THEN the system SHALL allow another photo if needed
7. WHEN sufficient evidence is collected THEN the system SHALL enable "Identify Ghost" button in Evidence Tab (step 6: make deduction)

---

## Success Criteria

**Functional (New Work):**
- All 5 investigation tools are connected to Ghost Data Store and display live ghost behavior
- Dev Mode controls allow testing without GPS (simulated positions, ghost types)
- Camera cooldown creates 7-second tool-juggling window
- Evidence Tab logs all collected evidence with timestamps
- Tool drawer provides quick access to tools, photos, evidence, and codex
- Camera-first gameplay loop flows naturally (Radar → EMF → Camera → Tool Juggling)
- All tools query active ghost's behavioral profile from Ghost Data Store (Spec 014)

**Visual (Already Complete - No New Work):**
- ✅ All tools use existing analog horror styling (textures, damage, labels) - Specs 009, 012, 013
- ✅ All tools match reference mock designs - Validated in Spec 013
- ✅ Tool drawer and tabs use existing analog horror styling - Spec 012
- ✅ Dev Mode controls use existing UI - Already implemented

---

**Status**: Ready for Design Phase
**Priority**: CRITICAL - Core gameplay mechanics
**Dependencies**: Spec 014 (Ghost Data & Codex System)
**Next Spec**: 016 - GPS-Based Ghost Positioning & Radar Navigation
