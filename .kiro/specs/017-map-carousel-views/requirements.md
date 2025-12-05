# Requirements Document

## Introduction

This feature adds horizontal navigation to the map screen, creating a carousel of three views: Cork Board (left), Map (center), and Shop (right). Players can swipe or use arrow buttons to navigate between views, adding visual depth and showcasing investigation history in an immersive detective-style cork board.

**MVP Focus**: This is a visual showcase feature designed to impress judges. Both cork board and shop will use mock/static data with stunning visuals rather than deep functionality. The goal is maximum "wow factor" with minimal implementation complexity.

## Glossary

- **Map Carousel**: Horizontal navigation system with three distinct views
- **Cork Board**: Left view showing investigation history as a detective's evidence board
- **Map View**: Center view (existing map screen)
- **Shop View**: Right view showing items/supplies (visual-first implementation)
- **Swipe Navigation**: Touch gesture to move between carousel views
- **Arrow Navigation**: Button-based navigation between views
- **Investigation History**: Completed investigations with photos, notes, and connections
- **Red String Connections**: Visual lines connecting related evidence on cork board

## Requirements

### Requirement 1

**User Story:** As a player, I want to swipe left from the map to see my investigation history on a cork board, so that I can review my past cases in an immersive detective-style interface.

#### Acceptance Criteria

1. WHEN a player swipes left OR taps the left arrow on the map view THEN the system SHALL transition to the cork board view with a smooth slide animation
2. WHEN the cork board view is displayed THEN the system SHALL show 5-8 mock investigation Polaroids pinned to a cork texture background with scattered, organic placement
3. WHEN the cork board view is displayed THEN the system SHALL show red string connections (SVG lines) between 3-4 related Polaroids creating a detective web pattern
4. WHEN the cork board view is displayed THEN the system SHALL show handwritten sticky notes, case numbers, and scribbled annotations scattered around photos
5. WHEN the cork board view is displayed THEN the system SHALL use static mock data (no real investigation history required for MVP)

### Requirement 2

**User Story:** As a player, I want to swipe right from the map to see the shop, so that I can browse available items and supplies in a visually appealing storefront.

#### Acceptance Criteria

1. WHEN a player swipes right OR taps the right arrow on the map view THEN the system SHALL transition to the shop view with a smooth slide animation
2. WHEN the shop view is displayed THEN the system SHALL show a vintage storefront interface with aged paper shelves and wooden counter aesthetic
3. WHEN the shop view is displayed THEN the system SHALL show 4-6 mock items (film rolls, scanner boosts, charms) displayed as physical objects on shelves with handwritten price tags
4. WHEN the shop view is displayed THEN the system SHALL show a "CLOSED" or "COMING SOON" stamp overlay indicating non-functional state for MVP
5. WHEN the shop view is displayed THEN the system SHALL use static mock data (no purchase functionality required for MVP)

### Requirement 3

**User Story:** As a player, I want smooth navigation between the three views, so that the carousel feels natural and responsive.

#### Acceptance Criteria

1. WHEN a player is on any carousel view THEN the system SHALL display navigation arrows (left/right) indicating available directions
2. WHEN a player is on the cork board (leftmost view) THEN the system SHALL hide the left arrow and show only the right arrow
3. WHEN a player is on the shop (rightmost view) THEN the system SHALL hide the right arrow and show only the left arrow
4. WHEN a player is on the map (center view) THEN the system SHALL show both left and right arrows
5. WHEN a player swipes horizontally THEN the system SHALL transition to the adjacent view with a 300ms slide animation
6. WHEN a player swipes vertically THEN the system SHALL NOT trigger carousel navigation (preserve map pan/zoom)

### Requirement 4

**User Story:** As a player, I want the cork board to show my investigation history in a detective-style layout, so that I feel like a real paranormal investigator reviewing cases.

#### Acceptance Criteria

1. WHEN the cork board is displayed THEN the system SHALL arrange 5-8 mock Polaroid photos in a scattered, organic layout with rotations between -12deg and 12deg
2. WHEN the cork board is displayed THEN the system SHALL attach each Polaroid with a visible red push pin at the top
3. WHEN the cork board is displayed THEN the system SHALL draw 4-6 red string connections (SVG paths) between Polaroids creating a detective investigation web
4. WHEN the cork board is displayed THEN the system SHALL show 3-5 yellow sticky notes with handwritten case notes, 2-3 index cards with typewritten details, and scattered paper clips
5. WHEN the cork board is displayed THEN the system SHALL apply cork texture background with coffee stains, pin holes, and tape residue for authentic detective board feel

### Requirement 5

**User Story:** As a player, I want the carousel views to maintain the analog horror aesthetic, so that the visual experience is consistent across all screens.

#### Acceptance Criteria

1. WHEN any carousel view is displayed THEN the system SHALL use aged paper textures, handwritten fonts, and damage overlays consistent with the analog horror component system
2. WHEN transitioning between views THEN the system SHALL use subtle static burst or page turn effects
3. WHEN the cork board is displayed THEN the system SHALL use cork texture, push pins, tape, and red string elements
4. WHEN the shop is displayed THEN the system SHALL use paper card backgrounds, typewriter fonts, and official stamps
5. WHEN navigation arrows are displayed THEN the system SHALL style them as hand-drawn arrows or aged metal buttons

### Requirement 6

**User Story:** As a player, I want the carousel to work smoothly on mobile devices, so that I can navigate with one hand while walking.

#### Acceptance Criteria

1. WHEN a player swipes on a mobile device THEN the system SHALL detect swipe gestures with a minimum 50px horizontal movement
2. WHEN a player swipes quickly THEN the system SHALL complete the transition even if the swipe distance is short
3. WHEN a player swipes slowly THEN the system SHALL follow the finger and snap to the nearest view on release
4. WHEN navigation arrows are displayed THEN the system SHALL size them at minimum 44px for comfortable thumb tapping
5. WHEN the carousel is animating THEN the system SHALL disable further swipe inputs until the animation completes

### Requirement 7

**User Story:** As a developer, I want the carousel system to be performant and simple to implement, so that transitions are smooth and the feature can be completed quickly for the hackathon.

#### Acceptance Criteria

1. WHEN the carousel transitions between views THEN the system SHALL complete the animation within 300ms using CSS transforms
2. WHEN the map view is active THEN the system SHALL NOT render the cork board or shop views (conditional rendering)
3. WHEN the cork board view is active THEN the system SHALL render static mock Polaroids (5-8 hardcoded positions and rotations)
4. WHEN the shop view is active THEN the system SHALL render static mock items (4-6 hardcoded shelf positions)
5. WHEN implementing the carousel THEN the system SHALL use existing analog horror components (PolaroidPhoto, StickyNote, Tape, PushPin) to minimize new code
