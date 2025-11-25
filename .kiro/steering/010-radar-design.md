# 010 - Radar Tool Design & Functionality

## Purpose

This document defines the **correct design and functionality** of the Radar tool based on Spec 006 (The Hunt: Compass & GPS). This ensures all implementations follow the intended gameplay mechanics.

---

## Core Principle: Direction-Only Detection

**The Radar shows DIRECTION only, NOT distance.**

This is fundamental to the gameplay loop:
- **Radar** = Direction (compass-based, spin to find)
- **EMF** = Distance (GPS-based, walk to close in)
- **Together** = Complete positioning

---

## Radar Functionality (From Spec 006)

### What the Radar DOES Show

1. **Ghost Bearing** - Direction to ghost in degrees (0-360°)
2. **Player Heading** - Direction player is facing (0-360°)
3. **North Indicator** - Always points to true north
4. **Forward Cone** - ±45° detection arc in front of player
5. **Ghost Blip** - ONLY when ghost is within forward cone (±45°)
6. **Compass Rose** - For orientation reference

### What the Radar DOES NOT Show

1. ❌ **Distance to ghost** - No meters, no range rings with distance labels
2. ❌ **Distance indicators** - No "120m" or proximity info
3. ❌ **Range circles with measurements** - Circles are for visual reference only, not distance
4. ❌ **Exact position** - Just direction, not location

---

## Visual Design Requirements

### Screen Layout

```
┌─────────────────────────────────┐
│  HDG: 045°          [N]         │  ← Heading & North indicator
│                                 │
│         ╱─────────╲            │
│        │  ○ ○ ○   │            │  ← Range rings (visual only)
│        │   ○ ○    │            │
│        │    ●     │            │  ← Center (player)
│        │   ○ ○    │            │
│        │  ○ ○ ○   │            │
│         ╲─────────╱            │
│                                 │
│  TARGET: 120° (when visible)    │  ← Ghost bearing (when in cone)
└─────────────────────────────────┘
```

### Key Visual Elements

1. **Circular CRT Screen**
   - Green phosphor glow (#00ff00)
   - Scanlines for CRT effect
   - Dark background (#0a1a0a)

2. **Sweep Line**
   - Rotates based on player heading
   - Shows current facing direction
   - 30-degree fade trail behind it

3. **Range Rings**
   - 3 concentric circles (50px, 100px, 150px radius)
   - **NO distance labels** (e.g., "50m", "100m", "150m")
   - Visual reference only, not measurements
   - Subtle green lines

4. **Ghost Blip**
   - Red pulsing dot
   - ONLY appears when ghost is within ±45° of player heading
   - Shows bearing angle (e.g., "TARGET: 120°")
   - Does NOT show distance

5. **Compass Heading**
   - Top of screen: "HDG: 045°"
   - Updates as player rotates
   - CRT-style text with glow

6. **North Indicator**
   - "N" marker that always points north
   - Rotates opposite to player heading
   - Helps with orientation

---

## Gameplay Mechanics

### How Players Use the Radar

1. **Spin to Scan**
   - Player physically rotates their body
   - Radar sweep rotates with them
   - Ghost blip appears when facing the right direction

2. **Find Direction**
   - Ghost blip shows bearing (e.g., "120°")
   - Player knows which way to walk
   - But NOT how far to walk

3. **Switch to EMF**
   - EMF shows distance (beep frequency)
   - Player walks toward ghost
   - Beeps get faster as they get closer

4. **Tool Juggling**
   - Radar: "Which way?"
   - EMF: "How far?"
   - Together: "Where is it?"

---

## What Makes This Design Work

### Information Separation

Each tool provides **different, incomplete information**:

| Tool | Shows | Doesn't Show |
|------|-------|--------------|
| Radar | Direction (bearing) | Distance |
| EMF | Distance (proximity) | Direction |
| Thermal | Cold spots | Position |
| Audio | Whispers | Position |
| Camera | Photos | Position |

This forces **strategic tool switching** and creates **skill expression**.

### Physical Gameplay

- **Radar requires rotation** - Spin your body to scan
- **EMF requires walking** - Move in real space to close distance
- **Together** - Hunt the ghost like a real investigator

---

## Common Mistakes to Avoid

### ❌ WRONG: Showing Distance on Radar

```typescript
// DON'T DO THIS
<div>Distance: {ghostDistance}m</div>
<circle r="50" label="50m" />
<circle r="100" label="100m" />
```

This defeats the purpose. Players would never need EMF.

### ✅ CORRECT: Direction Only

```typescript
// DO THIS
<div>HDG: {playerHeading}°</div>
{ghostInCone && <div>TARGET: {ghostBearing}°</div>}
<circle r="50" /> {/* No label */}
<circle r="100" /> {/* No label */}
```

Range rings are visual reference, not measurements.

---

## Implementation Notes

### Props Interface

```typescript
interface RadarToolProps {
  mode: 'view' | 'investigation';
  
  // Investigation mode props
  ghostBearing?: number;        // 0-360 degrees (direction to ghost)
  playerHeading?: number;       // 0-360 degrees (player facing)
  isGhostInCone?: boolean;      // Is ghost within ±45° cone?
  
  // NOT NEEDED:
  // ghostDistance?: number;     // ❌ Radar doesn't show distance
}
```

### Display Logic

```typescript
// Show ghost blip ONLY when in forward cone
const showGhostBlip = isGhostInCone && ghostBearing !== undefined;

// Calculate blip position based on bearing (NOT distance)
const blipAngle = ghostBearing;
const blipRadius = 120; // Fixed radius for visual placement

// Display bearing when visible
{showGhostBlip && (
  <div>TARGET: {Math.floor(ghostBearing)}°</div>
)}
```

### Sweep Behavior

- **View Mode**: Sweep rotates automatically (demo)
- **Investigation Mode**: Sweep syncs with player heading (real compass)

---

## Visual Reference

### Original RadarToolMock

The original `RadarToolMock.tsx` has the **correct design**:
- ✅ Shows sweep line and ghost blip
- ✅ Shows heading in degrees
- ✅ Range rings are visual only (no labels)
- ✅ Ghost blip position based on angle, not distance
- ✅ No distance indicators anywhere

### What Was Wrong in Task 3.3

The enhanced version I created was **visually correct** but needs to ensure:
- Range rings have NO distance labels
- No "Distance: 120m" text anywhere
- Ghost blip shows bearing angle only
- Focus on direction, not distance

---

## Testing Checklist

When implementing or reviewing the Radar:

- [ ] Shows player heading (HDG: XXX°)
- [ ] Shows north indicator (N)
- [ ] Shows ghost bearing when visible (TARGET: XXX°)
- [ ] Ghost blip only appears in ±45° cone
- [ ] Range rings have NO distance labels
- [ ] NO distance text anywhere (no "120m", "50m", etc.)
- [ ] Sweep rotates with player heading (investigation mode)
- [ ] CRT effects (glow, scanlines, bloom)
- [ ] Feels like a compass-based detector

---

## Summary

**The Radar is a compass, not a GPS.**

It tells you **which way to turn**, not **how far to walk**.

This creates the core gameplay loop:
1. Spin with Radar → Find direction
2. Walk with EMF → Close distance
3. Use other tools → Gather evidence
4. Deduce → Identify ghost

Keep this principle in mind for all Radar implementations.

---

**Status**: Active Design Document
**Authority**: Based on Spec 006 Requirements
**Last Updated**: 2024

