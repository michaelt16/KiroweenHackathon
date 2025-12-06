# 🕵️ Investigation Mode - Current Implementation Status

## Overview

Investigation Mode is a **radar-based paranormal investigation interface** where players observe ghost behavior, use tools to enhance detection, and deduce the ghost type based on behavioral patterns.

---

## ✅ What's Been Implemented

### Phase 1: Navigation + State ✅

**Route:**
- `/investigate/:hotspotId` - Investigation screen route
- Accessed by clicking hotspots on the map
- Returns to map with Exit button

**State Management:**
- `InvestigationContext` with full state:
  - `ghostType`: 'Wraith' | 'Shade' | 'Poltergeist'
  - `ghostPosition`: { angle, distance } in polar coordinates
  - `sanity`: 0-100 number
  - `events`: Array of anomalies (last 20 kept)
  - `toolsEnabled`: Object tracking which tools are active
  - `mode`: 'investigating' | 'deducing' | 'complete'

### Phase 2: Radar UI ✅

**Components:**
- `RadarCanvas` - Full-screen circular radar with:
  - Sweeping rings animation (2s cycle)
  - Concentric circles (4 rings)
  - Crosshairs
  - Player marker at center
  - Dark neon aesthetic (#2dd4bf teal)
  
- `GhostBlip` - Pulsing red dot showing ghost position:
  - Converts polar → cartesian coordinates
  - Fades out over time
  - Re-appears when radar sweep detects it
  - Smooth position transitions

- `NoiseOverlay` - CSS grain/noise effect for atmosphere

### Phase 3: Tool System ✅

**Tool Bar:**
- 5 tools at bottom: EMF (📡), Thermal (🌡️), Audio (📻), Camera (📷), Static (📺)
- Toggle on/off by tapping
- Active tools highlighted

**Tool Components:**
- `EMFMeter` - Shows EMF bar when active
- `ThermalScanner` - Shows cold spot pulses when active
- `AudioReceiver` - Shows whisper subtitles when active
- `Camera` - Flash effect + silhouette detection (NEW in 004)
- Static detector (visual distortion)

### Phase 4: Ghost Behavior Engine ✅

**Ghost Movement (Task 8):**
- Random walk algorithm
- Updates every 2 seconds
- Speed varies by ghost type:
  - Wraith: 0.8 (fast)
  - Shade: 0.3 (slow)
  - Poltergeist: 0.5 (medium)

**Anomaly Generation (Task 9):**
- Generates anomalies every 1.5 seconds
- Weighted by ghost type:
  - **Wraith**: High EMF (0.4), motion (0.2)
  - **Shade**: High whispers (0.4), cold (0.3)
  - **Poltergeist**: High motion (0.3), static (0.3)

**Sanity System (Task 10):**
- Drains every second
- Rate varies by ghost:
  - Wraith: 0.5/s (fast)
  - Shade: 0.2/s (slow)
  - Poltergeist: 0.35/s (medium)
- Visual bar at top-center
- Color changes: Green → Yellow → Red

### Phase 5: Deduction & Result ✅

**Deduction Button (Task 11):**
- Appears during investigation
- Requires 5+ events to enable
- Shows progress: "X/5 clues"
- Switches to deduction mode

**Deduction UI (Task 12):**
- Full-screen overlay
- Shows 3 ghost options
- Each displays:
  - Ghost silhouette (👻)
  - Name
  - 3 behavioral traits
- Player selects one and confirms

**Result Screen (Task 13):**
- Shows ✅ or ❌ based on correctness
- Reveals actual ghost type
- If correct: "Clippy is performing the banishment ritual..."
- Auto-returns to map after 3 seconds
- Mode switches to 'complete'

---

## ❌ What's NOT Implemented

### Phase 5: Ritual (Tasks 13-14) ❌
- **No interactive ritual** - Currently Clippy does it "off-screen"
- **No hold-to-banish mechanic**
- **No tap sequence**
- **No XP/rewards system**
- **No Codex integration** (ghost not added to Codex)
- **No investigation result logging**
- **No toast on map return**

### Phase 6: Tool Enhancements (Task 7) ⚠️ PARTIAL
- Tools toggle on/off ✅
- Basic visual effects ✅
- **Missing**: Tools don't actually enhance detection
  - EMF tool doesn't make EMF spikes more visible
  - Thermal doesn't highlight cold spots better
  - Audio doesn't make whispers clearer
  - Camera works (NEW in 004) ✅
  - Static doesn't distort radar

### Phase 7: Dev Mode (Tasks 15-20) ❌
- **No ghost type override**
- **No manual anomaly triggers**
- **No ghost position freeze**
- **No auto-complete deduction**
- **No auto-complete ritual**
- Dev Mode badge exists on map ✅ (but not in investigation)

### Phase 8: QA (Tasks 21-24) ❌
- **No mobile testing**
- **No performance testing**
- **No tuning of sanity/behavior rates**

---

## 🎮 Current User Flow

### 1. Entering Investigation
```
Map Screen → Click Hotspot → /investigate/:hotspotId
```

### 2. Investigation Phase
- Radar displays with ghost blip
- Ghost moves randomly every 2s
- Anomalies generate every 1.5s
- Sanity drains continuously
- Player can toggle tools
- Events accumulate in log

### 3. Deduction Phase
- After 5+ events, "Identify Ghost" button enables
- Click button → Full-screen deduction UI
- Select one of 3 ghosts
- Confirm selection

### 4. Result Phase
- Shows correct/incorrect
- Reveals actual ghost
- Auto-exits after 3s

### 5. Exit
- Click Exit button (top-right) anytime
- Returns to map at hotspot location

---

## 📊 Ghost Behavior Profiles

### Wraith (Fast & Aggressive)
- Movement: 0.8 (fastest)
- Sanity Drain: 0.5/s (fastest)
- Anomalies:
  - EMF: 40% (dominant)
  - Motion: 20%
  - Cold: 10%
  - Whisper: 10%
  - Static: 10%
  - Silhouette: 10%

### Shade (Slow & Passive)
- Movement: 0.3 (slowest)
- Sanity Drain: 0.2/s (slowest)
- Anomalies:
  - Whisper: 40% (dominant)
  - Cold: 30%
  - EMF: 10%
  - Motion: 10%
  - Static: 5%
  - Silhouette: 5%

### Poltergeist (Chaotic)
- Movement: 0.5 (medium)
- Sanity Drain: 0.35/s (medium)
- Anomalies:
  - Motion: 30% (dominant)
  - Static: 30% (dominant)
  - EMF: 15%
  - Whisper: 10%
  - Silhouette: 10%
  - Cold: 5%

---

## 🔧 Technical Details

### Key Files
- `ghost-hunt/src/screens/InvestigationScreen.tsx` - Main screen
- `ghost-hunt/src/context/InvestigationContext.tsx` - State management
- `ghost-hunt/src/hooks/useGhostBehavior.ts` - Ghost AI engine
- `ghost-hunt/src/components/Radar/RadarCanvas.tsx` - Radar rendering
- `ghost-hunt/src/components/Radar/GhostBlip.tsx` - Ghost position
- `ghost-hunt/src/components/Investigation/DeductionButton.tsx` - Deduction trigger
- `ghost-hunt/src/components/Investigation/DeductionUI.tsx` - Ghost selection
- `ghost-hunt/src/components/Investigation/SanityBar.tsx` - Sanity display
- `ghost-hunt/src/components/Tools/ToolBar.tsx` - Tool buttons
- `ghost-hunt/src/components/Tools/EMFMeter.tsx` - EMF display
- `ghost-hunt/src/components/Tools/ThermalScanner.tsx` - Cold spots
- `ghost-hunt/src/components/Tools/AudioReceiver.tsx` - Whispers
- `ghost-hunt/src/components/Tools/Camera.tsx` - Camera (NEW in 004)

### State Structure
```typescript
{
  ghostType: 'Wraith' | 'Shade' | 'Poltergeist',
  ghostPosition: { angle: number, distance: number },
  sanity: number, // 0-100
  events: Anomaly[], // Last 20 events
  toolsEnabled: {
    emf: boolean,
    thermal: boolean,
    audio: boolean,
    camera: boolean,
    static: boolean
  },
  mode: 'investigating' | 'deducing' | 'complete'
}
```

### Anomaly Types
```typescript
type AnomalyType = 
  | 'emf'       // Electromagnetic field spike
  | 'cold'      // Cold spot/temperature drop
  | 'whisper'   // Audio whisper/EVP
  | 'motion'    // Motion sensor spike
  | 'static'    // Static/interference
  | 'silhouette' // Camera manifestation
```

---

## 🎯 What Needs Work for 005

### High Priority
1. **Interactive Ritual System**
   - Hold-to-banish mechanic
   - OR tap sequence
   - Progress feedback
   - Success/failure states

2. **Tool Enhancement Effects**
   - Make tools actually enhance detection
   - EMF tool → brighter EMF spikes
   - Thermal → highlighted cold spots
   - Audio → clearer whispers
   - Static → visible radar distortion

3. **Rewards & Progression**
   - XP system
   - Codex integration
   - Ghost discovery tracking
   - Investigation result logging

4. **Dev Mode for Investigation**
   - Ghost type override
   - Manual anomaly triggers
   - Position freeze
   - Auto-complete options

### Medium Priority
5. **Better Feedback**
   - Toast notifications
   - Event log panel
   - Better visual effects
   - Sound effects

6. **Mobile Optimization**
   - Touch target sizes
   - Performance testing
   - Gesture support

### Low Priority
7. **Tuning & Balance**
   - Sanity drain rates
   - Anomaly frequencies
   - Movement speeds
   - Deduction difficulty

---

## 🐛 Known Issues

1. **No persistence** - Investigation state resets on page reload
2. **No hotspot state** - Hotspots don't track completion
3. **Ghost type is fixed** - Always starts as Wraith (not randomized)
4. **No failure state** - Can't lose investigation (sanity = 0 does nothing)
5. **Tools are cosmetic** - Don't actually enhance detection
6. **No rewards** - No XP, no Codex entry, no progression
7. **Abrupt exit** - Result screen auto-closes after 3s

---

## 💡 Suggested Improvements for 005

### Core Gameplay
- Add interactive ritual (hold-to-banish or tap sequence)
- Make tools actually enhance detection
- Add failure state when sanity reaches 0
- Randomize ghost type on investigation start
- Add XP/rewards system
- Integrate with Codex

### Polish
- Add sound effects (radar ping, whispers, static)
- Add toast notifications
- Add event log panel
- Improve visual effects
- Add loading/transition animations

### Dev Tools
- Add investigation dev mode panel
- Ghost type selector
- Manual anomaly triggers
- Position controls
- Auto-complete buttons

### Mobile
- Test on mobile devices
- Optimize touch targets
- Add haptic feedback
- Test performance
