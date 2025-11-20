# 005 – Investigation Mode Overhaul – Tasks

## Phase 1 – Refactor Screen Shell

Field Scanner as Root

 Extract current radar UI into FieldScanner component.

 Ensure InvestigationScreen renders:

SanityBar

FieldScanner

FieldKitDrawer (initially placeholder)

 Remove or hide old inline tool bar from InvestigationScreen.

Field Kit Handle

 Add a bottom “handle” or button to open/close FieldKitDrawer.

 Implement basic slide-up/slide-down animation.

Phase 2 – Field Kit Drawer & Tabs

Drawer Structure

 Implement FieldKitDrawer with internal tab state.

 Add tab headers: Tools | Photos | Evidence | Codex.

ToolsTab

 Create ToolsTab component with **5 tools** (Static is NOT a tool):

Radar, EMF, Thermal, Audio, Camera.

 Wire each to setActiveTool(toolId) in InvestigationContext.

 Close drawer after selecting a tool.

 Display currently active tool icon in Field Kit handle.

Phase 3 – Single Active Tool Modes

Context Changes

 Add activeTool: "radar" | "emf" | "thermal" | "audio" | "camera" to context.

 Initialize default to radar.

 Comment out existing ghost movement code with TODO for future implementation.

 Set ghost to static lat/lng position relative to hotspot.

FieldScanner Integration

 Update FieldScanner to read activeTool and:

 Change visuals per tool (basic changes are enough for MVP).

 Show Camera shutter button only when activeTool === "camera".

Remove Old Tool Logic

 Remove per-tool toggles from previous UI.

 Ensure only one tool is active at any time.

Phase 4 – Camera & Photos (Film Integration)

SuppliesForRun

 Add suppliesForRun: SuppliesForRun to context:

{
  film: number;
  boosts: number;
  charms: number;
}


 Initialize from overworld supplies/localStorage when entering Investigation.

Camera Behavior

 In Camera mode, show a shutter button with film count.

 On click:

 If film > 0:

 Decrement film.

 Add new photo to photos array with status: "developing".

 If film === 0:

 Do not add photo.

 Show toast / inline text: “No film left – collect more supplies.”

Photo Development

 Add photos array to context.

 On new photo creation, start a timeout of **exactly 7 seconds**:

 After 7 seconds, mark status: "ready".

 Assign quality: "none" | "faint" | "strong" based on ghost proximity (MVP can use distance-based weighting).

PhotosTab

 Implement PhotosTab to list ready photos.

 Show simple text result for now.

Phase 5 – Evidence & Codex

EvidenceState

 Add evidence: EvidenceState to context with tri-state trait flags.

 Define helper setter: setEvidenceTrait(traitId, nextState).

EvidenceTab

 Implement EvidenceTab listing **6 traits**:

1. EMF Reactivity
2. Whispers (Audio)
3. Cold Spots (Thermal)
4. Static Disturbance
5. Photo Manifestation
6. Sanity Behavior

 Movement Pattern is stub-only (disabled or marked "N/A" since ghost is static).

 Each row cycles Unknown → Present → Ruled out.

Ghost Definitions

 Create a ghosts.ts or similar with GhostDefinition for each ghost (Wraith, Shade, Poltergeist).

 Define key traits per ghost.

CodexTab

 Implement CodexTab that:

 Lists ghost cards using GhostDefinition.

 Visually deprioritizes ghosts that conflict with Evidence.

 Includes a “Confirm Identity” button on each card.

Deduction Flow

 Remove old DeductionButton and clue count gate.

 On Confirm Identity:

 Evaluate vs activeGhost.type.

 Trigger InvestigationResultOverlay.

Phase 6 – Sanity System Update

Context & API

 Replace per-second sanity drain logic in useGhostBehavior with an event-based system:

 Implement applySanityImpact({ type, magnitude? }).

Event Hooks

 Call applySanityImpact when:

 Whisper anomaly occurs.

 Static/visual anomaly occurs.

 Ghost gets very close (if supported).

 Strong manifestation / “scary” event triggers.

 (Optional) Add small low-frequency ambient drain if you want constant tension, but not linear “per second”.

SanityBar

 Update SanityBar to colorize based on thresholds (green/yellow/red).

 Ensure 0 sanity triggers **hard fail**:

 Show result overlay: "You lost your nerve. Clippy pulled you out."

 Display "Return to Map" button (manual dismiss).

 No auto-close or visual distortion needed.

Phase 7 – Integration & QA

Supplies Integration

 Ensure Film is actually consumed from global/localStorage.

 Boosts and Charms are **NOT implemented** in 005 (add TODO comments for Spec 006+).

Regression Checks

 Verify /investigate/:hotspotId route still works from map.

 Check that existing ghost movement & anomaly patterns still feed:

FieldScanner visuals

Events log

Sanity impacts

UX Polish

 Ensure the scanner is always visible and never fully obscured.

 Tap targets are usable on mobile.

 No leftover references to “5 clues” or old deduction UI.

 Result screen clearly explains correct/incorrect outcome.


---

## 🧭 Future-Proofing for Compass Integration (NOT Implemented in 005)

### Architecture Preparation

When building the Radar Device component:

 **Separate bearing calculation from rendering**
   - Create `calculateGhostBearing(playerPos, ghostPos)` utility
   - Create `getRadarAngle(ghostBearing, playerHeading?)` utility
   - Keep rendering logic flexible

 **Add TODO comments for compass integration**
   - Mark where Device Orientation API will be added
   - Mark where compass calibration will go
   - Mark where permission requests will be handled

 **Structure component to accept optional compass data**
   ```typescript
   interface RadarProps {
     ghostBearing: number;
     ghostDistance: number;
     playerHeading?: number; // For future compass
     useCompass?: boolean;   // Feature flag
   }
   ```

 **Store playerHeading in context (set to null for 005)**
   - Add `playerHeading: number | null` to InvestigationContext
   - Initialize to `null` for 005
   - Will be populated with compass data in Spec 006+

### Notes

- **Do NOT implement compass** in 005
- **Do NOT add Device Orientation API** in 005
- **Do NOT add calibration flow** in 005
- Just structure the code so it can be added later without major refactoring

The goal is to make the radar "compass-ready" without actually implementing compass features yet.
