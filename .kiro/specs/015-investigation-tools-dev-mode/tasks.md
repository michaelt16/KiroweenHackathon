# Implementation Plan

## Overview

This spec connects existing investigation tool UI to the Ghost Data Store (Spec 014) and implements the behavior logic that makes tools functional. All UI components already exist - this is about wiring and logic.

---

## Tasks

- [x] 1. Create Investigation Store (Core State Management)





  - Create `src/stores/investigationStore.ts` using Zustand pattern
  - Implement state interface with ghost position, player position, active tool, evidence arrays
  - Implement Dev Mode state (simulated positions, ghost type override)
  - Implement actions: startInvestigation, endInvestigation, updatePlayerPosition, setActiveTool
  - Implement evidence logging actions: logEvidence, capturePhoto
  - Implement camera cooldown state: cameraLocked, cameraUnlockTime
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 2. Create Tool Behavior Utilities





  - Create `src/utils/toolBehaviors.ts` for all tool calculation logic
  - Implement `calculateEMFLevel(distance, personality)` with all 5 personality types
  - Implement `checkSpiritBoxLock(knobA, knobB, targetA, targetB, tolerance)`
  - Implement `getRandomWord(wordFamilies)` for Spirit Box output
  - Implement `determineCameraManifest ation(distance, manifestations)` with probability multipliers
  - Implement `calculateThermalReading(distance, thermalCategory)`
  - Implement `isGhostInForwardCone(ghostBearing, playerHeading, coneAngle)`
  - Implement `addRadarWobble(bearing)` for ±5° blip wobble
  - Implement `calculateDistance(pos1, pos2)` using haversine formula
  - Implement `calculateBearing(pos1, pos2)` for ghost direction
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [x] 2.5. Create Centralized Ghost Relationship Hook

  - Create `src/hooks/useGhostRelationship.ts` using React hook pattern
  - Implement `useGhostRelationship()` hook with `useMemo` for performance
  - Calculate distance using Haversine formula from `toolBehaviors.ts`
  - Calculate absolute bearing (0-360°, where 0° = North)
  - Calculate relative bearing (where player is facing = 0°)
  - Check if ghost is in forward detection cone (±45°)
  - Fetch active ghost's behavior profile from Ghost Store
  - Return `GhostRelationship` interface with all calculated values
  - Ensure hook recalculates when positions/heading/ghost type change
  - _Architecture: Centralized calculation system_

- [x] 3. Update RadarTool Component ✅ COMPLETED





  - ✅ Import `useGhostRelationship()` hook
  - ✅ In investigation mode, use `relationship.bearing`, `relationship.relativeBearing`, `relationship.isInForwardCone`
  - ✅ Apply ±5° wobble to blip position using `addRadarWobble()`
  - ✅ Display ghost blip only when in forward cone (±45°)
  - ✅ Display player heading (HDG: XXX°) at top
  - ✅ Display north indicator that rotates opposite to heading
  - ✅ Display ghost bearing (TARGET: XXX°) when blip visible
  - ✅ Ensure NO distance information is displayed (direction only)
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [x] 4. Update EMFTool Component ✅ COMPLETED




  - ✅ Import `useGhostRelationship()` hook
  - ✅ In investigation mode, use `relationship.distance` and `relationship.ghostBehavior.emfPersonality`
  - ✅ Calculate EMF level using `calculateEMFLevel()` utility
  - ✅ React to relationship changes (removed setInterval, now uses useEffect with relationship dependencies)
  - ✅ Display EMF level on LED bar graph (5 columns × 8 segments)
  - ✅ When EMF reaches level 4-5, add visual feedback (screen shake, red glow)
  - ✅ When EMF reaches level 4-5, log to evidence store
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10_

- [x] 5. Update CameraTool Component ✅ COMPLETED
  - ✅ Import `useGhostRelationship()` hook
  - ✅ Add shutter button click handler
  - ✅ Check if camera is locked (cooldown active) before capture
  - ✅ If locked, display "DEVELOPING..." and disable shutter button
  - ✅ If not locked, use `relationship.distance` and `relationship.ghostBehavior.cameraManifestations`
  - ✅ Call `determineCameraManifest ation()` to get manifestation result
  - ✅ Create photo entry with timestamp, distance, manifestation
  - ✅ Store photo in investigation store
  - ✅ Lock camera for 7 seconds using store's `lockCamera()` action
  - ✅ Decrement film count (handled by `capturePhoto()` action)
  - ✅ Display screen flash effect on capture
  - ✅ Show film counter in investigation mode
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 4.10, 4.11, 4.12_

- [ ] 6. Update SpiritBoxTool Component
  - Import `useInvestigationStore()`, `useGhostStore()`, and tool behavior utilities
  - Add two knob controls (range sliders for Knob A and Knob B, 0.0-1.0)
  - Style knobs to match analog horror aesthetic (circular dials with etched labels)
  - Get active ghost's Spirit Box signature from Ghost Data Store
  - Check if knobs are locked using `checkSpiritBoxLock()` utility
  - If locked, display "SIGNAL LOCKED" on oscilloscope
  - If locked, call `getRandomWord()` to output random word from ghost's word families
  - Display word as text overlay on oscilloscope (fade in/out over 3s)
  - Log word to evidence store with timestamp and frequency values
  - Display static waveform when not locked
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7, 5.8_

- [ ] 7. Update ThermalTool Component
  - Import `useGhostRelationship()` hook
  - In investigation mode, use `relationship.distance` and `relationship.ghostBehavior.thermalReading`
  - Calculate thermal reading using `calculateThermalReading()` utility
  - Display temperature value and thermal gradient based on reading
  - When distance >10m, always display Normal temperature
  - When distance <10m, display cold readings based on ghost's thermal category
  - Log cold readings (Cold Spot, Deep Cold) to evidence store
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

- [x] 7.5. Update DebugOverlay Component ✅ COMPLETED
  - ✅ Import `useGhostRelationship()` hook
  - ✅ Use `relationship.distance`, `relationship.bearing`, `relationship.relativeBearing`
  - ✅ Use `relationship.ghostBehavior.emfPersonality` for EMF calculations
  - ✅ Display ghost type from `relationship.ghostType`
  - ✅ Remove duplicate distance/bearing calculations
  - _Architecture: Centralized calculation system_

- [ ] 8. Update EvidenceTab Component
  - Import `useInvestigationStore()`
  - Read evidence array from investigation store
  - Group evidence by type (EMF, Spirit Box, Thermal, Photos)
  - Sort evidence chronologically within each group
  - Display EMF readings with level, personality, distance, timestamp
  - Display Spirit Box words with word text, frequency, timestamp
  - Display Thermal readings with temperature, category, timestamp
  - Display Photos with manifestation result, distance, timestamp
  - Use analog horror styling (typewritten text for data, handwritten for notes)
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [ ] 9. Update PhotosTab Component
  - Import `useInvestigationStore()`
  - Read photos array from investigation store
  - Display photos in scrollable grid
  - Render each photo in Polaroid-style frame with tape
  - Display timestamp below photo
  - Display manifestation result (or "Nothing captured")
  - Display distance from ghost
  - Apply slight rotation to each photo for authenticity
  - _Requirements: 4.12_

- [ ] 10. Update DevModeControls Component
  - Import `useInvestigationStore()` and `useGhostStore()`
  - Add ghost type selector dropdown (all 7 ghost types)
  - Add distance slider (0-50m) to set simulated ghost distance
  - Add bearing slider (0-360°) to set simulated ghost direction
  - Add player heading slider (0-360°) to set simulated player facing direction
  - Add "Randomize Position" button to set random distance and bearing
  - Display current values: ghost type, distance, bearing, player heading
  - When ghost type changes, update investigation store
  - When distance/bearing changes, calculate ghost position from player position
  - When player heading changes, update investigation store
  - Ensure all tools update automatically when Dev Mode values change
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 11.1, 11.2, 11.3, 11.4, 11.5, 11.6, 11.7_

- [ ] 11. Implement Camera Cooldown System
  - Create `src/utils/cameraCooldown.ts` utility
  - Implement `lockCamera()` function to set 7-second cooldown
  - Implement `isCameraLocked()` function to check cooldown status
  - Implement `getRemainingCooldown()` function to get time remaining
  - Use setTimeout to unlock camera after 7 seconds
  - Clear timeout when investigation ends
  - Update CameraTool to use cooldown utilities
  - _Requirements: 4.3, 4.4, 4.5, 4.6, 9.1, 9.2, 9.3, 9.4, 9.5, 9.6_

- [ ] 12. Implement Evidence Logging System
  - Create `src/utils/evidenceLogger.ts` utility
  - Define EvidenceEntry interface with id, timestamp, type, data
  - Implement `logEvidence()` function to create and store evidence entries
  - Generate unique IDs using timestamp + random
  - Add timestamp to all evidence entries
  - Store evidence in investigation store
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

- [ ] 13. Update FieldKitDrawer Component
  - Import `useInvestigationStore()`
  - Ensure drawer opens/closes smoothly
  - Ensure all 4 tabs are accessible (Tools, Photos, Evidence, Codex)
  - When Tools tab active, display all 5 tool icons with tap-to-select
  - When tool selected, close drawer and display tool full-screen
  - When Photos tab active, render PhotosTab component
  - When Evidence tab active, render EvidenceTab component
  - When Codex tab active, render CodexTab component (read-only reference)
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7, 7.8_

- [ ] 14. Implement Investigation Entry/Exit Flow
  - Update InvestigationScreen to initialize investigation store on mount
  - When entering investigation, call `startInvestigation()` with ghost type and position
  - When entering investigation, select random ghost type from Ghost Data Store (or use Dev Mode override)
  - When entering investigation, set initial ghost position (simulated in Dev Mode)
  - When entering investigation, default to Radar tool
  - When exiting investigation, call `endInvestigation()` to clear state
  - When exiting investigation, clear evidence and photos arrays
  - When exiting investigation, reset camera cooldown
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7, 10.8_

- [ ] 15. Implement Camera-First Gameplay Loop
  - Ensure investigation starts with Radar tool (step 1: find direction)
  - When ghost blip appears on Radar, add UI hint to switch to EMF
  - When EMF reaches level 4-5, add UI hint to take photo
  - When photo is taken, camera locks for 7 seconds (step 4: tool juggling window)
  - During camera cooldown, allow rapid switching between EMF, Spirit Box, Thermal, Radar
  - When camera unlocks, allow another photo
  - When sufficient evidence collected, enable "Identify Ghost" button in Evidence Tab
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5, 13.6, 13.7_

- [ ] 16. Checkpoint - Test All Tools in Dev Mode
  - Enable Dev Mode and set simulated ghost position
  - Test Radar: Verify blip appears only in forward cone, wobbles ±5°
  - Test EMF: Verify levels change with distance, personality affects readings
  - Test Camera: Verify photos capture manifestations, 7s cooldown works
  - Test Spirit Box: Verify knob tuning locks signal, outputs ghost words
  - Test Thermal: Verify cold readings appear when close, Normal when far
  - Test Evidence Tab: Verify all evidence is logged with timestamps
  - Test Photos Tab: Verify photos display in Polaroid frames
  - Test tool switching during camera cooldown
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 17. Final Polish and Validation
  - Verify all tools use existing analog horror styling (no UI changes)
  - Verify tool drawer and tabs use existing styling
  - Verify Dev Mode controls are intuitive and functional
  - Verify evidence logging is accurate and complete
  - Verify camera cooldown prevents rapid-fire photos
  - Verify tool switching is smooth with no lag
  - Verify all tools respond to ghost data changes
  - Run full investigation flow from entry to exit
  - Ensure all tests pass, ask the user if questions arise.

