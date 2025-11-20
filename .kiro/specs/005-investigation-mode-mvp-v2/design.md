# 005 – Investigation Mode Overhaul – Design

## Overview

This document describes how to adapt the current implementation:

InvestigationScreen.tsx

InvestigationContext.tsx

useGhostBehavior.ts

SanityBar.tsx

DeductionButton.tsx, DeductionUI.tsx

into the new Field Scanner + Field Kit architecture.

1. Overall Architecture
Route

Keep: /investigate/:hotspotId.

Continue using hotspotId to:

Load hotspot metadata.

(Later) resolve ghost lat/lng.

Screen Component

InvestigationScreen.tsx becomes the container for:

FieldScanner (main radar view)

SanityBar

FieldKitDrawer

Result overlays

Context

InvestigationContext continues to store:

Active ghost data (type, state)

Anomalies / events log

Sanity

Active tool/module

Film & supplies for the run

Extend context to include:

type TraitState = "unknown" | "present" | "ruled_out";

type EvidenceState = {
  emf: TraitState;
  whispers: TraitState;
  cold: TraitState;
  static: TraitState;
  photos: TraitState;
  sanityBehavior: TraitState;
  movement: TraitState;
};

type SuppliesForRun = {
  film: number;
  boosts: number;
  charms: number;
};


Context should be initialized using:

Overworld supplies (from a global store or localStorage).

Active ghost type (random from Wraith/Shade/Poltergeist or from hotspot data).

2. Field Scanner View

Create a FieldScanner component that:

Renders:

Radar circle

Sweep animation

Ghost blip (positioned relative to ghost state from useGhostBehavior)

Noise/static overlay

Reacts to activeTool:

emf → stronger ring pulses / EMF bar UI.

thermal → blue-tinted gradient / cold-zone blobs.

audio → subtle waveform ring & subtitles overlay.

static → frequent glitch bursts overlay.

camera → shutter button appears; radar still visible.

The scanner never disappears; other UIs should be layered around it.


3. Field Kit Drawer

Create a FieldKitDrawer component that:

Slides up from the bottom of InvestigationScreen.

Has tabs:

ToolsTab

PhotosTab

EvidenceTab

CodexTab

ToolsTab

Shows list of tools:

- **Radar Device (Direction Finder)**
  - Purpose: Show the general direction of the ghost.
  - UI: Circular radar screen with sweeping line and a single blip.
  - Behavior:
    - Uses bearing (angle) between player and ghost.
    - Does NOT show precise distance.
    - Player reads: “The ghost is somewhere in that direction.”

- **EMF Meter (Hot/Cold Proximity)**
  - Purpose: Show how close the ghost is.
  - UI: Vertical bar or LED-style meter + beeps.
  - Behavior:
    - Uses distance between player and ghost.
    - Does NOT show direction.
    - Closer = higher bar, faster beeps.
    - This is the main “hot/cold” detector.

- **Thermal Scanner**
  - Purpose: Detect cold spots and environmental anomalies.
  - UI: Scanner overlay with cold “blobs” or pulses.
  - Behavior:
    - More intense cold readings when close to ghost.
    - Helps confirm ghost type (e.g., Shade-like entity).

- **Audio / EVP Device**
  - Purpose: Capture whispers and voices.
  - UI: Waveform ring + subtitles for whispers.
  - Behavior:
    - Whispers become more frequent/clear when close.
    - Some ghosts rely more on audio evidence.

- **Camera**
  - Purpose: Capture visual manifestations.
  - UI: Shutter button + film count.
  - Behavior:
    - Consumes film from overworld supplies.
    - Chance to capture faint/strong silhouettes based on proximity & ghost type.

### Tools Tab (Device Switching)

The Tools tab represents the player physically switching devices in their hands.

- Only one device can be active at a time.
- When the player selects a tool:
  - The active on-screen UI changes to that device (Radar, EMF Meter, Thermal, Audio, Camera).
  - The previous device is “put away.”
- Skill expression:
  - Players who quickly switch between Radar (direction) and EMF (distance) will locate the ghost more efficiently.
  - Advanced players weave in Thermal/Audio to confirm ghost behavior before committing to a guess.


PhotosTab

Reads from photos array in context:

type PhotoResult = {
  id: string;
  status: "developing" | "ready";
  quality: "none" | "faint" | "strong";
  createdAt: number;
};


Camera module:

On shutter:

If film > 0:

Decrements film.

Adds a new photo with status: "developing".

After a timeout (e.g., 5–10 seconds), transitions it to ready and assigns quality based on ghost proximity/behavior.

If film === 0:

Does not add photo.

Triggers a toast: “No film left – collect more supplies.”

PhotosTab lists ready photos with text representation:

“No manifestation”

“Faint silhouette”

“Strong manifestation”

EvidenceTab

Renders a list of **6 traits** with tri-state toggles (Movement Pattern is stub-only):

1. EMF Reactivity
2. Whispers (Audio)
3. Cold Spots (Thermal)
4. Static Disturbance (Anomaly)
5. Photo Manifestation
6. Sanity Behavior

**Note:** Movement Pattern is a stub for 005 since ghost is static. Include it in UI but mark as "Not applicable" or disabled.

Each row:

Label

Cycle button:

Unknown → Present → Ruled out → Unknown

Stores the state in EvidenceState in context.

CodexTab

Shows a card for each ghost type (uses existing ghost types):

type GhostType = "wraith" | "shade" | "poltergeist";

type GhostDefinition = {
  id: GhostType;
  name: string;
  description: string;
  keyTraits: {
    emf: TraitState;
    whispers: TraitState;
    cold: TraitState;
    static: TraitState;
    photos: TraitState;
    sanityBehavior: TraitState;
    movement: TraitState;
  };
};


Codex logic:

Compare EvidenceState to each GhostDefinition.keyTraits.

Ghosts that conflict with confirmed “Present” traits are deprioritized (e.g., dimmed).

Ghost card includes:

“View Details” (optional)

“Confirm Identity” button

On confirm:

Call completeInvestigation(selectedGhostId).

Evaluation is done by comparing with activeGhost.type.

4. Deduction & Result Flow

Remove:

DeductionButton that appears after 5 events.

“0/5 clues” gating.

Replace with:

Deduction is triggered only via CodexTab → Confirm Identity.

Result Screen

Consolidate existing result logic into a InvestigationResultOverlay:

Shows:

“You were correct / incorrect.”

Actual ghost type.

A short summary (can be based on GhostDefinition).

Shows Clippy text:

Correct: “Clippy banished the [GhostName] successfully.”

Incorrect: “Clippy reports the entity escaped.”

After 3 seconds:

Calls navigation back to map.

Resets investigation state.

5. Sanity System Redesign

Replace per-second drain with event-based sanity impact:

Sanity State

Keep:

sanity: number; // 0–100

Sanity Events

useGhostBehavior (or related logic) should call:

applySanityImpact({
  type: "whisper" | "static" | "close_pass" | "photo_strong" | "time_tick",
  magnitude?: number,
});


Basic default impacts:

Whisper anomaly: −2

Cold/static anomaly spike: −3

Ghost close pass (< X proximity): −5

Strong manifestation/photo: −10

Small ambient drift over time (optional): −0.5 every N seconds, scaled by ghost type.

Charms:

For a certain number of events, reduce impact by a % (e.g., 50%).

SanityBar:

Displays color based on value:

≥ 60 → Green

30–59 → Yellow

< 30 → Red

At 0 Sanity

MVP behavior:

Mark investigation as failed.

Show result:

“You lost your nerve and left the site. The ghost remains unidentified.”

Return to map after delay.

6. Integration with Supplies (Film Only for 005)

On entering Investigation:

Read supplies from global/localStorage.

Initialize SuppliesForRun in InvestigationContext.

Decrement from persisted supplies as they are used.

**Film:**

Used by Camera module.

Consumed when taking photos.

Persisted to localStorage after each use.

**Boosts & Charms:**

NOT implemented in 005.

Add TODO comments for Spec 006+.

Context should still have fields for them (set to 0 or unused).

---


## 🧭 Radar Architecture for Future Compass Support

### Current 005 Implementation
The Radar Device in 005 uses a **simplified bearing calculation**:

```typescript
// Current approach (005)
const ghostBearing = calculateBearing(playerPos, ghostPos); // 0-360°
const ghostDistance = calculateDistance(playerPos, ghostPos); // meters

// Display on radar
const radarAngle = ghostBearing; // Direct mapping
const radarRadius = normalizeDistance(ghostDistance); // 0-1
```

### Future Compass Integration (Spec 006+)

When adding compass support, the calculation will change to:

```typescript
// Future approach (006+)
const ghostBearing = calculateBearing(playerPos, ghostPos); // 0-360° (absolute)
const playerHeading = getCompassHeading(); // 0-360° (where player faces)

// Relative bearing (ghost direction relative to where player is facing)
const relativeBearing = (ghostBearing - playerHeading + 360) % 360;

// Display on radar
const radarAngle = relativeBearing; // Relative to player's facing direction
const radarRadius = normalizeDistance(ghostDistance); // 0-1
```

### Architecture Recommendations for 005

To prepare for future compass integration:

1. **Separate Concerns**:
   - Keep bearing calculation logic separate from rendering
   - Use a `getRadarAngle()` function that can be swapped later
   - Store both absolute bearing and relative bearing in state

2. **Component Structure**:
   ```typescript
   // Radar component should accept:
   interface RadarProps {
     ghostBearing: number;      // Absolute bearing (0-360°)
     ghostDistance: number;     // Distance in meters
     playerHeading?: number;    // Optional: for future compass
     useCompass?: boolean;      // Feature flag for future
   }
   ```

3. **Rendering**:
   - Current: Render ghost at `ghostBearing` directly
   - Future: Render ghost at `(ghostBearing - playerHeading)`
   - Keep rendering logic flexible to accept either

4. **State Management**:
   ```typescript
   // InvestigationContext should store:
   {
     ghostPosition: { lat, lng },
     playerPosition: { lat, lng },
     playerHeading: number | null, // null for 005, compass value for 006+
   }
   ```

### TODO Comments for 005

Add these TODO comments in the code:

```typescript
// TODO (Spec 006+): Replace with compass-based relative bearing
// TODO (Spec 006+): Add Device Orientation API integration
// TODO (Spec 006+): Add compass calibration flow
// TODO (Spec 006+): Handle compass permission requests
```

This ensures the radar can be upgraded to compass-based orientation without major refactoring.
