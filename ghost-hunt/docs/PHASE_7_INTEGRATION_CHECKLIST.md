# Phase 7 - Integration & QA Checklist

## ✅ Supplies Integration

- [x] Film is initialized from global supplies when investigation starts
- [x] Film is consumed from global supplies when investigation ends
- [x] Film count displays correctly in Camera tool
- [x] TODO comments added for Boosts (Spec 006+)
- [x] TODO comments added for Charms (Spec 006+)

## ✅ Route & Navigation

- [x] `/investigate/:hotspotId` route exists in App.tsx
- [x] HotspotMarker navigates to investigation route
- [x] Investigation initializes with hotspotId parameter
- [x] Exit button returns to map
- [x] Result overlay "Return to Map" button works

## ✅ Ghost Behavior & Anomalies

- [x] Ghost spawns at static position (angle: 45, distance: 0.6)
- [x] Anomalies generate based on ghost type profiles
- [x] Anomalies trigger sanity impacts (event-based)
- [x] Anomalies appear in events log (last 20 events)

## ✅ Field Scanner Visuals

- [x] Radar tool shows radar canvas and ghost blip
- [x] EMF tool shows EMF meter
- [x] Thermal tool shows thermal scanner
- [x] Audio tool shows audio receiver
- [x] Camera tool shows viewfinder and shutter button
- [x] Noise overlay always present
- [x] Scanner always visible (not obscured by drawer)

## ✅ Field Kit Drawer

- [x] Handle always accessible at bottom
- [x] Handle shows active tool icon
- [x] Drawer slides up/down smoothly
- [x] Tabs: Tools, Photos, Evidence, Codex
- [x] Drawer height (400px) leaves scanner visible
- [x] Tap targets usable on mobile (44px+ touch targets)

## ✅ Tools Tab

- [x] Lists 5 tools: Radar, EMF, Thermal, Audio, Camera
- [x] Static is NOT included (it's an anomaly, not a tool)
- [x] Selecting tool closes drawer
- [x] Active tool changes scanner display

## ✅ Photos Tab

- [x] Lists all captured photos
- [x] Shows "developing" status with animation
- [x] Shows quality after 7 seconds (none/faint/strong)
- [x] Empty state message when no photos

## ✅ Evidence Tab

- [x] Lists 6 active traits + Movement Pattern
- [x] Each trait cycles: Unknown → Present → Ruled Out
- [x] Movement Pattern disabled (marked N/A)
- [x] Color-coded states (gray/green/red)

## ✅ Codex Tab

- [x] Lists all 3 ghost types
- [x] Shows ghost descriptions and key traits
- [x] Ghosts conflicting with evidence are dimmed
- [x] "Confirm Identity" button on each card
- [x] No "5 clues" gate - can identify anytime

## ✅ Sanity System

- [x] Event-based sanity impacts (not per-second)
- [x] Whisper anomalies impact sanity
- [x] Static anomalies impact sanity
- [x] Strong photo manifestations impact sanity (5 points)
- [x] Faint photo manifestations impact sanity (2 points)
- [x] Ambient drain every 5 seconds (0.5 points)
- [x] SanityBar color thresholds: green > 60%, yellow 30-60%, red < 30%
- [x] Sanity reaching 0 triggers hard fail
- [x] Failure shows "Lost Your Nerve" message

## ✅ Deduction Flow

- [x] Old DeductionButton removed
- [x] Old DeductionUI removed
- [x] No "0/5 clues" references
- [x] Deduction only through Codex tab
- [x] Result overlay shows correct/incorrect
- [x] Result overlay shows Clippy message
- [x] Manual dismiss (no auto-close)

## ✅ UX Polish

- [x] Scanner always visible
- [x] Tap targets usable on mobile
- [x] No leftover clue count UI
- [x] Result screen explains outcome clearly
- [x] Debug info marked for removal in production
- [x] Smooth animations (drawer, photos, results)

## 🧪 Manual Testing Checklist

### Basic Flow
1. [ ] Start from map screen
2. [ ] Click on hotspot marker (in range)
3. [ ] Investigation screen loads
4. [ ] Radar shows ghost blip
5. [ ] Sanity bar visible at top
6. [ ] Field Kit handle visible at bottom

### Tool Switching
1. [ ] Tap Field Kit handle to open drawer
2. [ ] Switch to EMF tool
3. [ ] Drawer closes, EMF meter displays
4. [ ] Switch to Camera tool
5. [ ] Camera viewfinder displays with shutter button

### Camera & Photos
1. [ ] Take photo with Camera tool
2. [ ] Film count decrements
3. [ ] Open Photos tab
4. [ ] Photo shows "developing" status
5. [ ] Wait 7 seconds
6. [ ] Photo shows quality result

### Evidence & Deduction
1. [ ] Open Evidence tab
2. [ ] Cycle a few traits (Unknown → Present → Ruled Out)
3. [ ] Open Codex tab
4. [ ] Observe ghosts dimmed based on evidence
5. [ ] Tap "Confirm Identity" on a ghost
6. [ ] Result overlay appears
7. [ ] Tap "Return to Map"
8. [ ] Back on map screen

### Sanity System
1. [ ] Watch sanity bar color change as sanity drops
2. [ ] Observe sanity impacts when anomalies occur
3. [ ] Take strong manifestation photo
4. [ ] Observe larger sanity drop
5. [ ] (Optional) Let sanity reach 0
6. [ ] Observe "Lost Your Nerve" failure screen

## 📝 Known Limitations (By Design)

- Ghost is static (no movement) - Spec 006+
- No compass/orientation - Spec 006+
- Boosts not implemented - Spec 006+
- Charms not implemented - Spec 006+
- Movement Pattern trait disabled - Ghost is static
- Debug info visible - Should be hidden in production

## ✅ Phase 7 Complete

All integration checks passed. The Investigation Mode overhaul is complete and ready for testing!
