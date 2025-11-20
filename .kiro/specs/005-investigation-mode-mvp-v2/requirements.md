# 005 – Investigation Mode Overhaul – Requirements

## Goal

Transform Investigation Mode from a timer/clue-gated minigame into an immersive Field Scanner + Field Kit experience inspired by Demonologist:

Scanner is the main view, always visible.

Tools are modules/modes, not floating buttons with overlays.

Evidence is logged manually by the player in a notebook-style UI.

Deduction happens inside the Codex, at any time (no “0/5 clues” gate).

Sanity no longer drains “per second” — it reacts to ghost behavior, proximity, and events.

Overworld supplies (film, boosts, charms) power the investigation.

This spec assumes current functionality exists:

Route: /investigate/:hotspotId

InvestigationScreen, InvestigationContext, useGhostBehavior

Existing ghosts: Wraith, Shade, Poltergeist

Existing radar UI, sanity bar, tool toggles, deduction button, result screen

We are refining and restructuring, not deleting everything.

Current Pain Points to Fix

Tools are always visible as a row of buttons, feel like a debug panel.

Tool usage pops overlays over the radar → breaks immersion.

Deduction is gated by events.length >= 5 and a “Identify” button.

Sanity drains linearly per second, feels arbitrary and game-y rather than reactive.

Overworld “tool pickup” fantasy has been updated to Supplies, but Investigation doesn’t yet reflect that.

High-Level UX Requirements
1. Field Scanner Root View

As a player, when I enter Investigation Mode, I see:

Full-screen Field Scanner (radar) as the main view.

Sanity bar at the top.

A small indication of my currently equipped module 

Map is hidden; scanner becomes the “device view”.

Scanner continues to show:

radar sweep

ghost blip(s)

anomaly pulses (noise, static, etc.)

### Ghost Position (Temporary Behavior)

- For MVP v2, the ghost uses a **fixed, hard-coded lat/lng** relative to the hotspot.
- No real world GPS-based ghost pathing yet.
- This allows Radar (bearing) and EMF (distance) to work consistently for UI testing.
- A full dynamic ghost system (random spawn inside building radius, wandering behavior, and real lat/lng physics) will be implemented in a later milestone.

## Ghost Position System (Temporary)

For MVP v2, ghost positioning will be simplified:

- The ghost spawns at a **static, hard-coded lat/lng** when the investigation begins.
- The ghost does NOT move or wander.
- This is intentional to:
  - Stabilize UI development for Radar and EMF.
  - Ensure predictable behaviors for debugging.
  - Let us test all tools without real-world movement.

Later Phase (Post-MVP):
- Replace static ghost with dynamic lat/lng tracking.
- Implement wandering, hunting behavior, and proximity-based events.
- Allow ghost to move through real IRL space (GPS-based movement detection).

2. Field Kit Drawer

As a player, I can swipe up or tap a handle at the bottom to open my Field Kit.

Field Kit appears as a “tablet-like” UI with tabs:

Tools

Photos

Evidence

Codex (ghost list)

Field Kit should not permanently cover the scanner; it should feel like I pulled up a device over it.

Closing the Field Kit returns me to full scanner view.

3. Single Active Tool Module

As a player, I want only one tool active at a time.

Tools are no longer always-visible buttons on the main screen.

In Tools tab:

I see EMF / Thermal / Audio / Static / Camera as modules.

Tapping one sets it as active module and closes the Field Kit.

Active module changes how the scanner behaves visually and how events present.

4. Camera & Film Integration

As a player, I start an investigation with a certain number of Film shots, coming from overworld supplies (e.g., film: 3).

In Camera mode:

I see a shutter button.

Tapping it:

If film > 0:

Plays flash animation.

Consumes 1 film.

Queues a “photo” for delayed development.

If film === 0:

Shutter is disabled or shows a “No film” message/toast.

Camera mode still exists, but cannot capture.

In Photos tab:

I can see a list of developed photos and their result (for MVP: text-based such as “No manifestation”, “Faint silhouette”, “Strong manifestation”).

5. Evidence & Codex (Deduction Flow)

Remove “5+ events → show Deduction button”.

New behavior:

As a player, I can attempt to identify the ghost at any time through the Codex.

Evidence tab:

Shows a list of traits (EMF, whispers, cold, static, photos, sanity behavior, etc.).

Each trait can be toggled between:

Unknown

Present

Ruled out

Codex tab:

Shows ghost cards for existing ghosts (Wraith, Shade, Poltergeist).

Each ghost card includes:

Name

Brief description

Key trait summary

Ghost list should respond to evidence:

Ghosts that contradict current evidence are visually de-emphasized (dimmed / pushed down).

From a ghost card, I can press “Confirm Identity”.

Deduction result screen:

Shows correct/incorrect.

Text: Clippy is handling the banishment ritual.

Returns to map after a small delay.

6. Sanity System (Event-Based, Not Linear Per Second)

Remove raw “X per second” draining sanity.

Sanity should be affected by:

Ghost type (baseline stress)

Proximity (closer = more pressure)

Events (anomalies, whispers, static bursts, strong manifestations)

Use of certain consumables:

Charms reduce sanity impact for a short period.

Cursed film or artifacts may increase sanity impact.

As a player:

I want sanity to make sense: big scary events hit sanity more than just standing there.

I want sanity bar to change color based on thresholds:

Green: safe

Yellow: uneasy

Red: dangerous

Sanity reaching 0 in MVP:

Either ends the investigation early (“You lost your nerve, had to abandon the case”), or:

Soft-fails with heavier visual distortion and recommended exit.

(You can pick ONE simple behavior for 005.)

Integration with Overworld Supplies

As a player, I collect Supplies on the overworld map:

Film

Scanner Boosts

Charms

When I start an investigation:

My starting Film = value from supplies.

Scanner Boosts:

Might increase anomaly clarity or signal quality for the run (e.g., less noise).

Charms:

Might reduce sanity damage for X events or Y seconds.

Supplies should persist via localStorage; investigations consume them.

For this spec, we only need:

Film hooked into Camera module.

Optionally 1 boost & 1 charm effect for a demoable slice.

### Tool Differentiation Requirement

- Radar and EMF must be implemented as **separate devices**, not just different overlays on the same UI.
- Radar answers: “Which direction is the ghost?” using bearing only.
- EMF answers: “How close is the ghost?” using distance only.
- Players are expected to swap between tools via the Tools tab:
  - Radar to find direction.
  - EMF to home in on distance.
  - Other tools (Thermal, Audio, Camera) to gather behavioral evidence.
- This is intentional to showcase player skill in:
  - Choosing the right tool at the right time.
  - Efficiently rotating between devices during a hunt.


---

## 📋 Clarifications for 005

### Static is NOT a Tool
- **Static** is an anomaly/visual effect, NOT a player-equipped tool.
- Static distortion events are caused by ghost interference.
- Static belongs to evidence/anomalies, not equipment.
- Do NOT include "Static" in the Tools tab.

### Supplies for 005: Film Only
- For this spec, implement **Film only**.
- Film is consumed by the Camera tool.
- Boosts and Charms are TODOs for Spec 006+.
- Film persists via localStorage and is consumed during investigations.

### Sanity at 0: Hard Fail
- When sanity reaches 0, the investigation **ends immediately**.
- Show result: "You lost your nerve. Clippy pulled you out."
- Return to map after player dismisses result screen.
- No soft-fail or visual distortion mechanics needed.

### Photo Development: Fixed Time
- Photos always take **7 seconds** to develop.
- Simple, predictable, matches analog film vibe.

### Field Kit Interaction: Tap Only
- Field Kit opens/closes via **tap on handle** only.
- No swipe gestures needed for MVP.
- Swipe = future enhancement.

### Active Tool Indicator: In Handle
- Display the icon of the currently equipped tool **inside the Field Kit handle**.
- Clean, diegetic, minimal screen clutter.
- Matches handheld tablet style.

### Result Screen: Manual Dismiss
- Result screen does NOT auto-close.
- Player must tap "Return to Map" button.
- Gives time to read, better for demos.

### Codex Filtering: Dim Conflicting Ghosts
- Ghosts that conflict with confirmed "Present" evidence are **dimmed** (reduced opacity).
- Keep all ghosts visible, just visually de-emphasize conflicts.
- Matches Demonologist "cross out" UX.


---

## 🧭 Future Enhancement: Compass-Based Radar (NOT for 005)

### Vision for Later Specs
The Radar Device will eventually use the **phone's compass/orientation** to create an AR-style directional experience:

- **Compass Integration**: Radar rotates based on where the player is physically facing
- **North Lock**: North always points to the top of the radar when facing north
- **Physical Turning**: Player physically turns their body to scan different directions
- **Directional Hunting**: Ghost blip appears based on actual bearing relative to player's facing direction

### Current 005 Behavior (Temporary)
For 005, the Radar uses a **simplified top-down view**:
- Player always at center
- Ghost blip shows relative position (angle + distance)
- No compass/orientation tracking
- Static view (doesn't rotate with phone)

### Implementation Notes for Future
When implementing compass-based radar (Spec 006+):
- Use Device Orientation API for compass heading
- Require HTTPS and user permission
- Add calibration flow ("Wave phone in figure-8")
- Fallback to manual rotation if compass unavailable
- Consider showing only forward-facing arc (60-90°) vs full 360°
- Add edge indicators for ghosts behind player

**Action for 005**: Build current radar in a way that can be extended with compass data later. Keep bearing calculations separate from rendering.
