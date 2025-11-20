# 006 – The Hunt: Compass & GPS Integration – Requirements

## Goal

Transform investigations from "looking at a screen" into "hunting a ghost in real space" by implementing:
1. **Compass-based Radar** - Direction-only detection (spin to find)
2. **EMF Beeping System** - Distance-only detection (walk to close in)
3. **GPS-based Ghost Positioning** - Ghost exists in real physical space

This creates the skill-based gameplay loop: **Spin → Walk → Juggle Tools → Deduce**

---

## Current State (005)

### What Works
- ✅ Field Scanner + Field Kit UI
- ✅ Tool switching system
- ✅ Evidence tracking and deduction
- ✅ Ghost type reactions in tools
- ✅ Photo development with 7s lock

### What's Missing
- ❌ Radar shows both direction AND distance (too much info)
- ❌ EMF shows level but no audio feedback
- ❌ Ghost is static at fixed polar coordinates
- ❌ No physical rotation needed (no compass)
- ❌ Walking IRL doesn't change anything

---

## High-Level Requirements

### 1. Compass-Based Radar

**User Story**: As a player, I want to physically rotate my body to scan for the ghost, so that I feel like I'm actually hunting.

#### Acceptance Criteria

1.1. WHEN I open the Radar tool THEN the system SHALL request device orientation permission

1.2. WHEN permission is granted THEN the Radar SHALL rotate based on my phone's compass heading

1.3. WHEN I rotate my body in real life THEN the Radar display SHALL rotate to match my facing direction

1.4. WHEN the ghost is in my facing direction (±45° cone) THEN the ghost blip SHALL appear on the Radar

1.5. WHEN the ghost is behind me or to the side THEN the ghost blip SHALL NOT be visible on the Radar

1.6. WHEN compass accuracy is low THEN the system SHALL display a calibration prompt

1.7. WHEN I complete the calibration flow THEN the compass accuracy SHALL improve

1.8. WHEN device orientation is unavailable THEN the system SHALL fall back to manual rotation controls

1.9. THE Radar SHALL display bearing in degrees (0-360°) but NOT display distance

1.10. THE Radar SHALL show a north indicator that rotates with the compass

---

### 2. EMF Distance Detection

**User Story**: As a player, I want to walk toward the ghost and hear beeps get faster, so that I know I'm getting closer.

#### Acceptance Criteria

2.1. WHEN I switch to EMF tool THEN the system SHALL calculate distance from my GPS position to ghost GPS position

2.2. WHEN I am far from the ghost (>30m) THEN EMF SHALL beep slowly (every 2 seconds)

2.3. WHEN I am medium distance from ghost (10-30m) THEN EMF SHALL beep moderately (every 1 second)

2.4. WHEN I am close to the ghost (<10m) THEN EMF SHALL beep rapidly (every 0.3 seconds)

2.5. WHEN I am very close to the ghost (<5m) THEN EMF SHALL beep continuously with visual alert

2.6. WHEN I walk away from the ghost THEN the beep frequency SHALL decrease

2.7. WHEN I walk toward the ghost THEN the beep frequency SHALL increase

2.8. THE EMF tool SHALL display proximity level (Far/Medium/Close/Very Close) but NOT display direction

2.9. THE EMF tool SHALL play audio beep sounds synchronized with visual pulses

2.10. THE EMF tool SHALL show a simple proximity bar (5 levels) based on distance

---

### 3. GPS-Based Ghost Positioning

**User Story**: As a player, I want the ghost to exist at a real location in physical space, so that walking IRL affects my investigation.

#### Acceptance Criteria

3.1. WHEN an investigation starts THEN the system SHALL spawn the ghost at a random lat/lng within 50 meters of the hotspot

3.2. WHEN the ghost spawns THEN the system SHALL store its position as GPS coordinates (lat, lng)

3.3. WHEN my GPS position updates THEN the system SHALL recalculate distance from player to ghost

3.4. WHEN my GPS position updates THEN the system SHALL recalculate bearing from player to ghost

3.5. WHEN I walk 5 meters closer to the ghost THEN the distance SHALL decrease by approximately 5 meters

3.6. WHEN I walk in a circle around the ghost THEN the bearing SHALL change but distance SHALL remain constant

3.7. THE system SHALL use Haversine formula for accurate distance calculation

3.8. THE system SHALL handle GPS drift gracefully (smooth updates, not jittery)

3.9. THE system SHALL work indoors with last-known GPS position

3.10. THE ghost SHALL remain at its spawned position (static for 006 MVP)

---

### 4. Tool Information Separation

**User Story**: As a player, I want each tool to give me different information, so that I must switch between them strategically.

#### Acceptance Criteria

4.1. THE Radar tool SHALL show direction (bearing) ONLY, not distance

4.2. THE EMF tool SHALL show distance (proximity) ONLY, not direction

4.3. THE Thermal tool SHALL show temperature and cold spots, not position

4.4. THE Audio tool SHALL show whispers and audio level, not position

4.5. THE Camera tool SHALL capture photos, not provide position data

4.6. WHEN I want to find the ghost THEN I SHALL need to use both Radar (direction) and EMF (distance)

4.7. WHEN I want evidence THEN I SHALL need to use Thermal, Audio, or Camera after locating with Radar/EMF

---

### 5. Compass Calibration Flow

**User Story**: As a player, I want to calibrate my compass when accuracy is low, so that the Radar works correctly.

#### Acceptance Criteria

5.1. WHEN compass accuracy is below 20 degrees THEN the system SHALL show a calibration prompt

5.2. WHEN I tap "Calibrate" THEN the system SHALL show instructions: "Move your phone in a figure-8 pattern"

5.3. WHEN I perform the figure-8 motion THEN the system SHALL monitor compass accuracy improvement

5.4. WHEN accuracy improves above 15 degrees THEN the system SHALL dismiss the calibration prompt

5.5. WHEN I dismiss the calibration prompt THEN the system SHALL continue with current accuracy

5.6. THE calibration prompt SHALL be non-blocking (can be dismissed)

5.7. THE calibration prompt SHALL reappear if accuracy degrades again

---

### 6. GPS Position Updates

**User Story**: As a player, I want my position to update as I walk, so that the investigation responds to my real-world movement.

#### Acceptance Criteria

6.1. WHEN the investigation starts THEN the system SHALL request location permission

6.2. WHEN permission is granted THEN the system SHALL start watching GPS position

6.3. WHEN my GPS position changes THEN the system SHALL update player position every 1 second

6.4. WHEN GPS accuracy is low (<20m) THEN the system SHALL display an accuracy warning

6.5. WHEN GPS is unavailable THEN the system SHALL use last-known position

6.6. WHEN I move 1 meter in real life THEN the system SHALL detect the movement within 2 seconds

6.7. THE system SHALL smooth GPS updates to prevent jitter (moving average of last 3 positions)

6.8. THE system SHALL work on both iOS and Android

6.9. THE system SHALL handle GPS drift gracefully (no sudden jumps)

6.10. THE system SHALL continue working if GPS signal is temporarily lost

---

### 7. Radar Visual Design

**User Story**: As a player, I want the Radar to feel like a real compass-based detector, so that it's intuitive to use.

#### Acceptance Criteria

7.1. THE Radar SHALL display a circular sweep that rotates with my heading

7.2. THE Radar SHALL show a north indicator (N) that always points to true north

7.3. THE Radar SHALL show my current heading in degrees (e.g., "Facing: 045°")

7.4. THE Radar SHALL show the ghost bearing in degrees when visible (e.g., "Target: 120°")

7.5. THE Radar SHALL display a forward-facing cone (±45°) to show detection range

7.6. THE Radar SHALL show the ghost blip ONLY when within the forward cone

7.7. THE Radar SHALL pulse or glow when the ghost is directly ahead (±5°)

7.8. THE Radar SHALL NOT show any distance indicators or rings

7.9. THE Radar SHALL include a compass rose for orientation

7.10. THE Radar SHALL feel responsive (updates at 30fps minimum)

---

### 8. EMF Audio & Visual Design

**User Story**: As a player, I want the EMF to beep and show proximity clearly, so that I can navigate toward the ghost.

#### Acceptance Criteria

8.1. THE EMF SHALL play a distinct beep sound (short, electronic tone)

8.2. THE EMF SHALL synchronize visual pulse with audio beep

8.3. THE EMF SHALL display proximity level as text (Far/Medium/Close/Very Close)

8.4. THE EMF SHALL show a 5-bar proximity indicator

8.5. THE EMF SHALL change color based on proximity (green → yellow → orange → red)

8.6. THE EMF SHALL show beep frequency as BPM (beats per minute)

8.7. THE EMF SHALL vibrate phone on each beep (optional, can be toggled)

8.8. THE EMF SHALL NOT show any directional arrows or indicators

8.9. THE EMF SHALL NOT show distance in meters (only relative proximity)

8.10. THE EMF SHALL feel responsive (beep timing accurate to ±50ms)

---

### 9. Performance & Battery

**User Story**: As a player, I want the investigation to run smoothly without draining my battery, so that I can hunt for extended periods.

#### Acceptance Criteria

9.1. THE system SHALL maintain 30fps minimum during investigations

9.2. THE system SHALL update GPS position at 1Hz (once per second)

9.3. THE system SHALL update compass heading at 10Hz (10 times per second)

9.4. THE system SHALL throttle updates when app is backgrounded

9.5. THE system SHALL stop GPS/compass when investigation ends

9.6. THE system SHALL use low-power location mode when available

9.7. THE system SHALL not cause excessive battery drain (< 10% per 30min investigation)

9.8. THE system SHALL handle device sleep/wake gracefully

9.9. THE system SHALL resume GPS/compass after interruptions (calls, notifications)

9.10. THE system SHALL work on devices with limited GPS accuracy

---

### 10. Fallback & Error Handling

**User Story**: As a player, I want the game to work even when sensors are unavailable, so that I can still investigate.

#### Acceptance Criteria

10.1. WHEN compass is unavailable THEN the Radar SHALL provide manual rotation controls

10.2. WHEN GPS is unavailable THEN the system SHALL use relative positioning from hotspot

10.3. WHEN permissions are denied THEN the system SHALL explain why they're needed

10.4. WHEN sensor accuracy is poor THEN the system SHALL display helpful tips

10.5. WHEN indoors with no GPS THEN the system SHALL use last-known position

10.6. WHEN compass calibration fails THEN the system SHALL allow manual heading input

10.7. THE system SHALL never crash due to missing sensors

10.8. THE system SHALL provide clear error messages for sensor issues

10.9. THE system SHALL allow investigations to complete even with degraded sensors

10.10. THE system SHALL log sensor issues for debugging

---

## Glossary

- **Bearing**: The compass direction from player to ghost (0-360°, where 0° is north)
- **Heading**: The compass direction the player is facing (0-360°)
- **Haversine Formula**: Mathematical formula for calculating distance between two GPS coordinates
- **Compass Calibration**: Process of improving compass accuracy by moving device in figure-8 pattern
- **GPS Drift**: Small random variations in GPS position even when stationary
- **Forward Cone**: The ±45° arc in front of the player where the Radar can detect the ghost
- **Proximity**: Relative distance to ghost (Far/Medium/Close/Very Close) without exact meters
- **Beep Frequency**: How often the EMF beeps, inversely proportional to distance

---

## Out of Scope for 006

The following features are intentionally excluded from this spec:

- ❌ Ghost movement (ghost is static at spawn position)
- ❌ Scanner boosts implementation
- ❌ Charm effects implementation
- ❌ Advanced ghost AI (hunting, fleeing, etc.)
- ❌ Multiplayer investigations
- ❌ Indoor positioning systems
- ❌ Augmented reality overlays
- ❌ 3D spatial audio
- ❌ Difficulty modes

These will be addressed in future specs (007+).

---

## Success Criteria

006 is successful when:

1. ✅ Players physically rotate their body to find ghost direction
2. ✅ Players walk in real life to close distance to ghost
3. ✅ Radar shows direction only, EMF shows distance only
4. ✅ Compass and GPS work reliably on iOS and Android
5. ✅ The investigation feels like "hunting in real space"
6. ✅ Tool juggling creates skill expression and tension
7. ✅ Performance is smooth (30fps+) with acceptable battery usage
8. ✅ Fallbacks work when sensors are unavailable

---

## Technical Constraints

- Must work on iOS 13+ and Android 8+
- Must use Device Orientation API for compass
- Must use Geolocation API for GPS
- Must handle HTTPS requirement for sensor access
- Must request permissions appropriately
- Must work in both portrait and landscape
- Must handle sensor interruptions gracefully
- Must smooth GPS/compass data to prevent jitter

---

## Dependencies

- 005 Investigation Mode V2 (complete)
- Device with compass sensor
- Device with GPS sensor
- HTTPS deployment (for sensor access)
- Location permissions granted
- Motion/orientation permissions granted

---

**Next Steps**: Design document will detail the technical implementation of compass integration, GPS positioning, and the Radar/EMF separation.
