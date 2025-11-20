# 006 – The Hunt: Compass & GPS Integration – Tasks

## Phase 1: GPS System Foundation

- [ ] 1.1 Create GPS utilities module
  - Implement Haversine distance calculation
  - Implement bearing calculation
  - Implement distance normalization
  - Add unit tests for calculations
  - _Requirements: 3.7_

- [ ] 1.2 Create GPS smoother class
  - Implement weighted moving average
  - Handle position history (last 3 positions)
  - Add jitter prevention logic
  - _Requirements: 3.8_

- [ ] 1.3 Create ghost spawning system
  - Implement random spawn within radius
  - Convert meters to lat/lng offsets
  - Add spawn configuration options
  - _Requirements: 3.1, 3.2_

- [ ] 1.4 Add GPS state to InvestigationContext
  - Add playerPosition state
  - Add ghostPosition state
  - Add gpsAccuracy state
  - Add updatePlayerPosition method
  - _Requirements: 3.3, 3.4_

- [ ] 1.5 Create useGPS hook
  - Request geolocation permission
  - Start watchPosition with high accuracy
  - Integrate GPS smoother
  - Handle errors gracefully
  - Stop watching on unmount
  - _Requirements: 6.1, 6.2, 6.3_

---

## Phase 2: Compass System Foundation

- [ ] 2.1 Create compass utilities module
  - Implement angle normalization (0-360°)
  - Implement circular mean for smoothing
  - Add relative angle calculation
  - Add unit tests
  - _Requirements: 1.9_

- [ ] 2.2 Create compass smoother class
  - Implement circular moving average
  - Handle heading history (last 5 readings)
  - Prevent angle wrap-around issues
  - _Requirements: Design smoothing_

- [ ] 2.3 Add compass state to InvestigationContext
  - Add playerHeading state
  - Add compassAccuracy state
  - Add hasOrientationPermission state
  - Add updatePlayerHeading method
  - _Requirements: 1.2, 1.3_

- [ ] 2.4 Create useCompass hook
  - Request orientation permission (iOS)
  - Listen to deviceorientationabsolute events
  - Integrate compass smoother
  - Handle permission denied
  - Stop listening on unmount
  - _Requirements: 1.1, 1.6_

- [ ] 2.5 Create compass calibration component
  - Show calibration prompt when accuracy < 20°
  - Display figure-8 instructions
  - Show accuracy meter
  - Allow dismissal
  - _Requirements: 5.1, 5.2, 5.3, 5.4_

---

## Phase 3: Radar Component Redesign

- [ ] 3.1 Update Radar component props
  - Remove distance prop
  - Add ghostBearing prop
  - Add playerHeading prop
  - Add compassAccuracy prop
  - _Requirements: 4.1, 7.1_

- [ ] 3.2 Implement forward cone detection
  - Calculate relative angle (bearing - heading)
  - Check if ghost in ±45° cone
  - Only show blip when in cone
  - _Requirements: 1.4, 1.5, 7.5_

- [ ] 3.3 Add compass-based rotation
  - Rotate radar sweep with playerHeading
  - Rotate north indicator opposite to heading
  - Update at 30fps minimum
  - _Requirements: 1.2, 1.3, 7.1, 7.10_

- [ ] 3.4 Add heading displays
  - Show current heading in degrees
  - Show target bearing when visible
  - Add north indicator (N)
  - Add compass rose
  - _Requirements: 7.2, 7.3, 7.4, 7.9_

- [ ] 3.5 Add visual feedback
  - Pulse blip when ghost directly ahead (±5°)
  - Show forward cone visualization
  - Remove all distance indicators
  - _Requirements: 1.6, 7.6, 7.7, 7.8_

- [ ] 3.6 Add calibration warning
  - Show warning when accuracy > 20°
  - Link to calibration flow
  - _Requirements: 1.6, 5.1_

---

## Phase 4: EMF Component Redesign

- [ ] 4.1 Update EMF component props
  - Remove bearing/direction props
  - Keep ghostDistance prop (meters)
  - Keep ghostType prop for multiplier
  - _Requirements: 4.2_

- [ ] 4.2 Implement beeping system
  - Calculate beep interval from distance
  - Create beep loop with setInterval
  - Apply ghost type multiplier
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6, 2.7_

- [ ] 4.3 Create audio beep function
  - Use Web Audio API
  - Generate 800Hz sine wave
  - 100ms duration
  - Adjustable volume
  - _Requirements: 2.9_

- [ ] 4.4 Add proximity visualization
  - Calculate proximity level (Far/Medium/Close/Very Close)
  - Show 5-bar proximity indicator
  - Color code by proximity (green → red)
  - _Requirements: 2.8, 2.10, 8.3, 8.4, 8.5_

- [ ] 4.5 Add beep frequency display
  - Calculate BPM from interval
  - Show visual pulse on each beep
  - Sync visual with audio
  - _Requirements: 8.2, 8.6_

- [ ] 4.6 Remove directional indicators
  - Remove all arrows/compass elements
  - Remove distance in meters
  - Only show relative proximity
  - _Requirements: 4.2, 8.8, 8.9_

- [ ] 4.7 Add optional vibration
  - Vibrate on each beep (50ms)
  - Make toggleable in settings
  - _Requirements: 8.7_

---

## Phase 5: Investigation Integration

- [ ] 5.1 Update investigation initialization
  - Request GPS and compass permissions
  - Spawn ghost at random GPS position
  - Initialize player position from GPS
  - Initialize player heading from compass
  - _Requirements: 3.1, 3.2, 6.1, 6.2_

- [ ] 5.2 Create sensor update loop
  - Start GPS watching (1Hz)
  - Start compass listening (10Hz)
  - Calculate distance and bearing (5Hz)
  - Update context state
  - _Requirements: 6.3, 9.2, 9.3_

- [ ] 5.3 Update Radar tool integration
  - Pass ghostBearing and playerHeading
  - Remove distance passing
  - Handle null heading (no compass)
  - _Requirements: 4.1_

- [ ] 5.4 Update EMF tool integration
  - Pass ghostDistance in meters
  - Remove bearing passing
  - Handle null position (no GPS)
  - _Requirements: 4.2_

- [ ] 5.5 Add sensor cleanup
  - Stop GPS watching on investigation end
  - Stop compass listening on investigation end
  - Clear intervals and timeouts
  - _Requirements: 9.5_

---

## Phase 6: Fallback Systems

- [ ] 6.1 Create manual rotation controls
  - Add left/right rotation buttons
  - Update heading by ±15° per tap
  - Show when compass unavailable
  - _Requirements: 1.8, 10.1_

- [ ] 6.2 Create relative positioning fallback
  - Use device motion as backup
  - Integrate acceleration data
  - Rough position estimation
  - _Requirements: 10.2, 10.5_

- [ ] 6.3 Add permission prompts
  - Create location permission UI
  - Create orientation permission UI
  - Explain why permissions needed
  - _Requirements: 10.3, 10.4_

- [ ] 6.4 Add accuracy warnings
  - Show GPS accuracy warning (>20m)
  - Show compass accuracy warning (>20°)
  - Provide helpful tips
  - _Requirements: 6.4, 10.4_

- [ ] 6.5 Add error handling
  - Handle GPS errors gracefully
  - Handle compass errors gracefully
  - Never crash from sensor issues
  - Log errors for debugging
  - _Requirements: 10.7, 10.8, 10.10_

---

## Phase 7: Performance & Polish

- [ ] 7.1 Optimize update frequencies
  - Throttle GPS updates to 1Hz
  - Throttle compass updates to 10Hz
  - Throttle calculations to 5Hz
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 7.2 Add battery optimizations
  - Stop sensors when app backgrounded
  - Resume sensors when app foregrounded
  - Use low-power location mode
  - _Requirements: 9.4, 9.5, 9.6, 9.7_

- [ ] 7.3 Handle interruptions
  - Pause sensors on phone calls
  - Resume after interruptions
  - Handle sleep/wake gracefully
  - _Requirements: 9.8, 9.9_

- [ ] 7.4 Add loading states
  - Show "Acquiring GPS..." while waiting
  - Show "Calibrating compass..." on start
  - Show "Spawning ghost..." during setup
  - _Requirements: UX polish_

- [ ] 7.5 Add debug overlay (dev mode)
  - Show raw GPS coordinates
  - Show raw compass heading
  - Show calculated distance/bearing
  - Show accuracy values
  - Toggle on/off
  - _Requirements: Testing_

---

## Phase 8: Testing & Validation

- [ ] 8.1 Test GPS calculations
  - Verify Haversine distance accuracy
  - Verify bearing calculation accuracy
  - Test with known coordinates
  - _Requirements: 3.7_

- [ ] 8.2 Test compass smoothing
  - Verify jitter reduction
  - Test circular mean algorithm
  - Test with rapid rotation
  - _Requirements: Design smoothing_

- [ ] 8.3 Test sensor integration
  - Walk in straight line → distance decreases
  - Walk in circle → bearing changes
  - Rotate body → radar updates
  - Stand still → stable readings
  - _Requirements: 3.5, 3.6_

- [ ] 8.4 Test fallback systems
  - Test with GPS disabled
  - Test with compass disabled
  - Test with both disabled
  - Verify manual controls work
  - _Requirements: 10.1, 10.2_

- [ ] 8.5 Test performance
  - Measure frame rate (target: 30fps+)
  - Measure battery drain (target: <10%/30min)
  - Test on low-end devices
  - Test with poor GPS signal
  - _Requirements: 9.1, 9.7_

- [ ] 8.6 Test cross-platform
  - Test on iOS 13+
  - Test on Android 8+
  - Test permission flows on both
  - Test sensor APIs on both
  - _Requirements: 9.8_

---

## Phase 9: Documentation & Cleanup

- [ ] 9.1 Document GPS utilities
  - Add JSDoc comments
  - Document Haversine formula
  - Document bearing calculation
  - Add usage examples
  - _Requirements: Maintainability_

- [ ] 9.2 Document compass utilities
  - Add JSDoc comments
  - Document smoothing algorithm
  - Document calibration process
  - Add usage examples
  - _Requirements: Maintainability_

- [ ] 9.3 Update investigation guide
  - Explain new Radar behavior
  - Explain new EMF behavior
  - Add tips for using both together
  - Add troubleshooting section
  - _Requirements: User education_

- [ ] 9.4 Create sensor troubleshooting guide
  - GPS accuracy issues
  - Compass calibration
  - Permission problems
  - Indoor usage tips
  - _Requirements: 10.4, 10.8_

---

## 🎯 Success Criteria

All tasks complete when:

1. ✅ Players physically rotate to find ghost direction
2. ✅ Players walk in real life to close distance
3. ✅ Radar shows direction only (no distance)
4. ✅ EMF shows distance only (no direction)
5. ✅ Compass and GPS work on iOS and Android
6. ✅ Fallbacks work when sensors unavailable
7. ✅ Performance is smooth (30fps+)
8. ✅ Battery usage is acceptable (<10%/30min)

---

## 📝 Notes

- Ghost remains static (doesn't move) in 006
- Boosts and charms not implemented in 006
- Focus on core sensor integration first
- Polish and optimize after core works
- Test frequently on real devices (not just simulator)

---

**Estimated Effort**: 2-3 weeks for full implementation and testing
