# Investigation Mode MVP — Tasks

## Phase 1 – Navigation + State

### 1. Investigation Route
- [ ] Add `/investigate/:hotspotId` route
- [ ] Add transition from map → investigate view

### 2. Investigation State Provider
- [ ] Create context or Zustand store:
  - [ ] `ghostType`
  - [ ] `sanity` timer
  - [ ] `events` list
  - [ ] `ghost position`
  - [ ] `investigation mode`

---

## Phase 2 – Radar UI

### 3. Create Radar Canvas
- [ ] Full-screen circle
- [ ] Center = player
- [ ] Sweeping rings animation
- [ ] Dark neon aesthetic

### 4. Ghost Blip
- [ ] Render ghost as pulsing dot
- [ ] Position = angle + distance
- [ ] Animate movement

### 5. Visual Noise Layer
- [ ] CSS grain overlay
- [ ] Low-opacity vignette

---

## Phase 3 – Tool System

### 6. Tool Buttons
- [ ] Display tools at bottom
- [ ] On press:
  - [ ] **EMF**: open EMF meter
  - [ ] **Audio**: show subtitles
  - [ ] **Thermal**: show cold pulses
  - [ ] **Static**: distort radar briefly
  - [ ] **Camera**: flash

### 7. Tool Enhancements
- [ ] If EMF active → more visible EMF blips
- [ ] If Thermal active → cold spots highlighted
- [ ] If Camera flash → silhouette check

---

## Phase 4 – Ghost Behavior Engine

### 8. Ghost Movement Loop
- [x] Random-walk algorithm
- [x] Weighted by ghost type

### 9. Behavior Loop
- [x] Every 1–2 seconds:
  - [x] roll anomaly
  - [x] push to event log
  - [x] affect UI

### 10. Sanity System
- [x] `sanity -= drainRate`
- [x] Display sanity bar
- [x] Low sanity → color shift


---
## Phase 5 – Deduction & Result

### 11. Deduction Trigger
- [ ] Add a "Deduce" button that becomes available when:
  - [ ] `events.length > X` **OR**
  - [ ] The player manually decides they have enough information (e.g., always visible but with a warning if `events.length` is low).
- [ ] Ensure the button is clearly labeled (e.g., "Identify the Ghost") and positioned above the tool HUD.

### 12. Deduction UI
- [ ] Present 3 ghost candidates pulled from the current hotspot’s configuration.
- [ ] For each candidate, show:
  - [ ] Name
  - [ ] Silhouette or icon
  - [ ] 2–3 short behavioral traits (e.g., "Loves cold spots," "Rarely shows on camera").
- [ ] Allow the player to select exactly one candidate and confirm their choice.
- [ ] On confirmation, evaluate the guess against the actual `ghostType`.

### 13. Result Screen (Clippy Handles the Ritual)
- [ ] If the player is correct:
  - [ ] Show a success screen where Clippy performs the banish/bind "off-screen" (non-interactive animation/text).
  - [ ] Display a short summary of key behaviors that matched this ghost.
  - [ ] Grant XP/rewards and mark the ghost as discovered in the Codex (if first time).
- [ ] If the player is wrong:
  - [ ] Show a failure screen where Clippy reports the ghost escaped or the call was incorrect.
  - [ ] Optionally highlight what behaviors pointed to the correct ghost (for learning).
- [ ] In both cases, log the investigation result to an internal session/event log (for future analytics/expansion).

### 14. Return to Map
- [ ] Reset investigation state (ghost position, events, sanity, active tools).
- [ ] Navigate back to Map Mode at the hotspot location.
- [ ] Optionally show a brief toast on the map (e.g., "Case closed: Wraith identified." or "Case failed: Ghost escaped.").


---

## Phase 7 – Dev Mode Support

- [ ] 15. Override Ghost Type
- [ ] 16. Trigger anomalies manually
- [ ] 17. Freeze ghost position
- [ ] 18. Auto-complete deduction
- [ ] 19. Auto-complete ritual
- [ ] 20. Dev Mode badge

---

## Phase 8 – QA

- [ ] 21. Mobile Safari / Android Chrome test
- [ ] 22. Lag test (radar animation)
- [ ] 23. Sanity meter tuning
- [ ] 24. Behavior frequency tuning
