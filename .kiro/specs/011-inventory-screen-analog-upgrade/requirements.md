# Requirements Document

## Introduction

This specification defines the analog-horror upgrade for the Inventory Screen (Field Investigation Kit). The current implementation already has a good physical equipment case foundation with a metal suitcase exterior, foam cutouts, and LED counters. This upgrade will transform it into a fully immersive 1980s paranormal investigator's toolkit by replacing digital-looking elements with realistic physical components, adding extensive wear and damage, and making every element feel tactile and authentic.

## Glossary

- **Inventory Screen**: The screen showing the player's equipment case with tools and supplies
- **Equipment Case**: The metal suitcase container holding investigation tools
- **Foam Cutout**: EVA foam slot where each tool sits in the case
- **Tool Icon**: Current emoji/icon representation of investigation devices
- **Physical Device**: Realistic miniature render of actual investigation equipment
- **Supply Counter**: Display showing resource counts (Film, Boosts, Charms)
- **Mechanical Counter**: Physical rotary tally counter or odometer-style display
- **LED Gauge**: Physical LED bar graph display
- **Analog Indicator**: Physical analog gauge or meter
- **System**: The InventoryScreen component and its sub-components

## Requirements

### Requirement 1

**User Story:** As a player, I want each tool in the foam cutout to look like a real miniature physical device, so that I feel like I'm looking at actual equipment in a case.

#### Acceptance Criteria

1. WHEN a tool is displayed in a foam cutout THEN the System SHALL render it as a miniature physical device with authentic materials (metal for Radar/EMF/Audio, plastic for Thermal/Camera)
2. WHEN viewing a tool device THEN the System SHALL show realistic details including corner screws, texture overlays, and wear patterns
3. WHEN a tool is in its foam slot THEN the System SHALL display masking tape labels with handwritten Caveat font text
4. WHEN viewing tools THEN the System SHALL show LED status indicators (green = ready, yellow = low battery, red = error)
5. WHEN a tool device is rendered THEN the System SHALL include drop shadows to show depth within the foam cutout

### Requirement 2

**User Story:** As a player, I want the film counter to look like a mechanical rotary counter, so that resource tracking feels physical and authentic.

#### Acceptance Criteria

1. WHEN the film count is displayed THEN the System SHALL render it as a mechanical tally counter or odometer with physical appearance
2. WHEN the counter shows a number THEN the System SHALL use mechanical digit styling with slight 3D effect
3. WHEN the film counter is rendered THEN the System SHALL include metal housing with corner screws and wear
4. WHEN the counter background is shown THEN the System SHALL use black LCD-style background with white glowing digits
5. WHEN the counter is displayed THEN the System SHALL include etched label text "FILM ROLLS" below the display

### Requirement 3

**User Story:** As a player, I want the boosts counter to look like a physical LED bar gauge, so that it feels like real equipment.

#### Acceptance Criteria

1. WHEN the boosts count is displayed THEN the System SHALL render it as a horizontal LED bar gauge with individual segments
2. WHEN LED segments are active THEN the System SHALL show them glowing teal with bloom effect
3. WHEN LED segments are inactive THEN the System SHALL show them as dark gray with subtle outline
4. WHEN the gauge is rendered THEN the System SHALL include dark plastic housing with realistic depth
5. WHEN the gauge is displayed THEN the System SHALL include etched label text "SCANNER BOOSTS"

### Requirement 4

**User Story:** As a player, I want the charms counter to look like a simple analog indicator, so that it maintains the physical aesthetic.

#### Acceptance Criteria

1. WHEN the charms count is displayed THEN the System SHALL render it as a large number on an aged paper card
2. WHEN the number is shown THEN the System SHALL include hand-drawn tally marks below the number
3. WHEN the indicator is rendered THEN the System SHALL use handwritten Caveat font for the label "CHARMS"
4. WHEN the card is displayed THEN the System SHALL show rough torn edges and paper texture
5. WHEN the indicator is visible THEN the System SHALL include a single tape strip at the top holding it in place

### Requirement 5

**User Story:** As a player, I want the equipment case to show extensive realistic wear and damage, so that it feels like well-used field equipment.

#### Acceptance Criteria

1. WHEN the case exterior is displayed THEN the System SHALL show deep scratches (6-8 light scratches, 3-5 dark gouges)
2. WHEN viewing the case THEN the System SHALL include rust spots (5-7 scattered across surfaces)
3. WHEN the case is rendered THEN the System SHALL show chipped paint areas at corners and edges (4-6 chips)
4. WHEN viewing the interior THEN the System SHALL display fingerprint smudges on tool surfaces (3-5 per visible area)
5. WHEN the case is shown THEN the System SHALL include tape patches with handwritten notes (3-5 pieces, crooked placement)

### Requirement 6

**User Story:** As a player, I want the foam cutouts to look more realistic with proper depth and texture, so that tools appear to sit inside physical slots.

#### Acceptance Criteria

1. WHEN a foam cutout is displayed THEN the System SHALL show deep inset shadows (0 6px 16px rgba(0,0,0,0.95))
2. WHEN viewing foam THEN the System SHALL apply EVA foam texture with subtle grain pattern
3. WHEN a cutout is rendered THEN the System SHALL show darker foam edges to create depth
4. WHEN tools sit in foam THEN the System SHALL display proper spacing (8-12px padding) between tool and foam edge
5. WHEN foam is visible THEN the System SHALL use charcoal gray color (#2a2a2a to #1a1a1a) for realistic EVA foam appearance

### Requirement 7

**User Story:** As a player, I want the case label and hardware to look more authentic, so that every detail reinforces the physical aesthetic.

#### Acceptance Criteria

1. WHEN the case label is displayed THEN the System SHALL use etched metal style with light top highlight and dark bottom shadow
2. WHEN corner screws are shown THEN the System SHALL render them with radial gradients and screw slot details
3. WHEN latches are displayed THEN the System SHALL show realistic metal gradients with inset shadows
4. WHEN the handle is rendered THEN the System SHALL include proper beveling and depth shadows
5. WHEN rivets are shown THEN the System SHALL display them with 3D appearance and proper shadows

### Requirement 8

**User Story:** As a player, I want additional physical details like serial numbers and calibration notes, so that the case feels like real equipment with history.

#### Acceptance Criteria

1. WHEN the case is displayed THEN the System SHALL show a serial number (e.g., "FK-1985-A7") in etched Courier font
2. WHEN viewing the interior THEN the System SHALL include handwritten calibration notes (e.g., "cal. 03/19") in Caveat font
3. WHEN the case is rendered THEN the System SHALL show warning labels on tape (e.g., "HANDLE WITH CARE")
4. WHEN viewing details THEN the System SHALL include manufacturing stamps or inspection marks
5. WHEN the case is visible THEN the System SHALL display weld lines or seams (3-5 horizontal/vertical lines)

### Requirement 9

**User Story:** As a player, I want the tool viewing modal to maintain the analog aesthetic, so that the experience is consistent when examining tools.

#### Acceptance Criteria

1. WHEN a tool is clicked for viewing THEN the System SHALL maintain the full-screen tool display functionality
2. WHEN the tool viewer opens THEN the System SHALL preserve the analog-horror aesthetic of the tool components
3. WHEN the close button is displayed THEN the System SHALL style it to match the physical equipment aesthetic
4. WHEN viewing a tool THEN the System SHALL maintain all existing tool functionality and interactions
5. WHEN the modal is shown THEN the System SHALL ensure smooth transitions that feel physical (not digital)

### Requirement 10

**User Story:** As a player, I want all existing functionality preserved, so that the visual upgrade doesn't break any game mechanics.

#### Acceptance Criteria

1. WHEN tools are clicked THEN the System SHALL maintain the existing tool viewing behavior
2. WHEN supplies are displayed THEN the System SHALL show accurate counts from the SuppliesContext
3. WHEN the back button is clicked THEN the System SHALL navigate back to the map as before
4. WHEN the screen is rendered THEN the System SHALL maintain responsive layout for mobile and desktop
5. WHEN any interaction occurs THEN the System SHALL preserve all existing game logic and state management
