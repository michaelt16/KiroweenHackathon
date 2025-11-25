# Requirements Document

## Introduction

This document defines the requirements for transforming the Investigation Mode UI to use the finalized 007-standard tool designs from the playground mocks. The transformation will replace basic tool displays with immersive, full-screen, realistic ghost-hunting equipment interfaces while preserving all existing investigation functionality.

## Glossary

- **Investigation Mode**: The active ghost-hunting phase where players use tools to gather evidence
- **Field Scanner**: The radar tool used to detect ghost direction and distance
- **Field Kit**: The collection of investigation tools (Radar, EMF, Thermal, Camera, Spirit Box)
- **007 Standard**: The visual design system defined in Spec 007 for investigation tools
- **Playground Mocks**: The finalized tool UI implementations in `src/ui-playground/tools/`
- **Ghost Behavior Engine**: The system that controls ghost movement and evidence generation
- **Tool Component**: A React component that renders a specific investigation tool UI
- **Investigation Context**: The React context managing investigation state and data

---

## Requirements

### Requirement 1: Radar Tool Transformation

**User Story:** As a player, I want the radar tool to look like authentic 1980s ghost-hunting equipment, so that I feel immersed in a real paranormal investigation.

#### Acceptance Criteria

1. WHEN the radar tool is active THEN the system SHALL display a full-screen circular CRT radar interface matching the RadarToolMock visual design
2. WHEN the ghost is detected THEN the system SHALL display a blip on the radar at the correct bearing relative to player heading
3. WHEN the player rotates THEN the system SHALL update the radar sweep and ghost blip position in real-time
4. WHEN the radar is displayed THEN the system SHALL include all 007-standard visual elements (metal bezel, CRT glow, scanlines, damage, textures)
5. WHEN the radar sweep animates THEN the system SHALL maintain smooth 60fps animation performance

---

### Requirement 2: EMF Meter Tool Transformation

**User Story:** As a player, I want the EMF meter to display electromagnetic readings like a real K-II meter, so that I can detect ghost activity through authentic equipment.

#### Acceptance Criteria

1. WHEN the EMF tool is active THEN the system SHALL display a full-screen LED bar graph interface matching the EMFMeterMock visual design
2. WHEN ghost EMF activity occurs THEN the system SHALL light up the appropriate LED columns (1-5) based on EMF level from ghost behavior
3. WHEN EMF level is 5 THEN the system SHALL display flickering red LEDs with glow effects
4. WHEN the EMF meter is displayed THEN the system SHALL include all 007-standard visual elements (plastic casing, scratches, tape, rust, screws)
5. WHEN EMF readings change THEN the system SHALL animate LED transitions smoothly

---

### Requirement 3: Thermal Scanner Tool Transformation

**User Story:** As a player, I want the thermal scanner to show temperature anomalies like a real FLIR camera, so that I can detect cold spots and ghost presence.

#### Acceptance Criteria

1. WHEN the thermal tool is active THEN the system SHALL display a full-screen thermal imaging interface matching the ThermalScannerMock visual design
2. WHEN a cold spot is detected THEN the system SHALL display a blue thermal anomaly at the ghost location
3. WHEN the thermal scanner is active THEN the system SHALL display scan lines moving across the screen
4. WHEN the thermal scanner is displayed THEN the system SHALL include all 007-standard visual elements (yellowed plastic, dirty glass, dust, scratches)
5. WHEN temperature drops below freezing THEN the system SHALL display an "ANOMALY" warning indicator

---

### Requirement 4: Camera Tool Transformation

**User Story:** As a player, I want the camera to look like a 1980s Polaroid viewfinder, so that I can capture ghost photos with authentic equipment.

#### Acceptance Criteria

1. WHEN the camera tool is active THEN the system SHALL display a full-screen viewfinder interface matching the CameraViewfinderMock visual design
2. WHEN the camera is active THEN the system SHALL display a blinking REC indicator and live timestamp
3. WHEN the player has film remaining THEN the system SHALL display the film count in the battery indicator area
4. WHEN the camera is displayed THEN the system SHALL include all 007-standard visual elements (film grain, VHS effects, hair on lens, rust, vignette)
5. WHEN a photo is taken THEN the system SHALL display a flash effect and decrement film count

---

### Requirement 5: Spirit Box Tool Transformation

**User Story:** As a player, I want the spirit box to display audio waveforms like a real EVP recorder, so that I can detect ghost communications.

#### Acceptance Criteria

1. WHEN the spirit box tool is active THEN the system SHALL display a full-screen oscilloscope interface matching the SpiritBoxMock visual design
2. WHEN audio activity is detected THEN the system SHALL display an animated waveform on the oscilloscope
3. WHEN an EVP response occurs THEN the system SHALL display the response text overlaid on the waveform
4. WHEN the spirit box is displayed THEN the system SHALL include all 007-standard visual elements (dark plastic, bent antenna, knobs, dust, tape)
5. WHEN static level changes THEN the system SHALL update the static percentage indicator

---

### Requirement 6: Tool Switching Integration

**User Story:** As a player, I want to switch between tools seamlessly, so that I can use different equipment during my investigation.

#### Acceptance Criteria

1. WHEN the Field Kit drawer is opened THEN the system SHALL display tool icons with 007-style visual treatment
2. WHEN a tool is selected THEN the system SHALL transition to the new tool with a static burst effect
3. WHEN switching tools THEN the system SHALL preserve investigation state (ghost position, sanity, evidence)
4. WHEN a tool is active THEN the system SHALL display the tool icon in the Field Kit drawer button
5. WHEN the drawer is closed THEN the system SHALL return focus to the active tool display

---

### Requirement 7: Data Integration

**User Story:** As a developer, I want tool UIs to display real investigation data, so that the visual transformation doesn't break existing functionality.

#### Acceptance Criteria

1. WHEN the radar is active THEN the system SHALL calculate and display ghost bearing from GPS coordinates
2. WHEN the EMF meter is active THEN the system SHALL read EMF level from the ghost behavior engine
3. WHEN the thermal scanner is active THEN the system SHALL detect cold spots from ghost behavior data
4. WHEN the camera is active THEN the system SHALL track film count from investigation supplies
5. WHEN the spirit box is active THEN the system SHALL display EVP responses from ghost behavior events

---

### Requirement 8: Performance Optimization

**User Story:** As a player, I want the investigation tools to run smoothly on my mobile device, so that I can investigate without lag or stuttering.

#### Acceptance Criteria

1. WHEN any tool is active THEN the system SHALL maintain 60fps frame rate on target mobile devices
2. WHEN tool animations are running THEN the system SHALL not block GPS or compass updates
3. WHEN switching tools THEN the system SHALL complete the transition in under 500ms
4. WHEN textures are loaded THEN the system SHALL cache them to prevent re-loading
5. WHEN multiple effects are active THEN the system SHALL prioritize critical animations over decorative effects

---

### Requirement 9: Visual Consistency

**User Story:** As a player, I want all investigation tools to have a consistent visual style, so that the experience feels cohesive and professional.

#### Acceptance Criteria

1. WHEN any tool is displayed THEN the system SHALL use textures and damage elements from the 007 standard
2. WHEN tools are shown THEN the system SHALL apply consistent z-index layering (background, casing, textures, damage, display, effects, UI)
3. WHEN labels are displayed THEN the system SHALL use Caveat font for handwritten text and Courier New for technical text
4. WHEN damage elements are shown THEN the system SHALL include scratches, rust, tape, and wear appropriate to each tool's material
5. WHEN tools are rendered THEN the system SHALL maintain the exact visual aesthetic from playground mocks

---

### Requirement 10: Backward Compatibility

**User Story:** As a developer, I want the UI transformation to preserve existing investigation features, so that no functionality is lost during the visual upgrade.

#### Acceptance Criteria

1. WHEN the investigation starts THEN the system SHALL initialize GPS tracking as before
2. WHEN the compass updates THEN the system SHALL update player heading in all tools
3. WHEN the ghost behavior engine generates events THEN the system SHALL reflect them in tool displays
4. WHEN the investigation ends THEN the system SHALL show results using the existing overlay
5. WHEN dev mode is enabled THEN the system SHALL continue to support manual controls and debugging

---

## Non-Functional Requirements

### Performance
- Tool rendering must not exceed 16ms per frame (60fps)
- Texture loading must complete within 2 seconds on 4G connection
- Tool switching must feel instant (< 300ms perceived delay)

### Compatibility
- Must work on iOS Safari 14+
- Must work on Android Chrome 90+
- Must support devices with 2GB+ RAM
- Must handle GPS accuracy variations gracefully

### Maintainability
- Tool components must be modular and reusable
- Visual elements must be separated from logic
- Props interface must be well-documented
- Code must follow existing project patterns

### Accessibility
- Tool UIs must maintain sufficient contrast for readability
- Interactive elements must have 44px minimum touch targets
- Text must be readable at default mobile font sizes
- Critical information must not rely solely on color

---

## Acceptance Criteria Testing Prework

This section will be completed during the design phase to determine which criteria are testable as properties, examples, or edge cases.
