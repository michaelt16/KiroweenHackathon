# Task 3: RadarTool Component Update - Implementation Summary

## Overview
Updated the RadarTool component to connect to the Investigation Store and use tool behavior utilities for real-time ghost detection based on GPS positioning and player heading.

## Changes Made

### 1. Added Investigation Store Integration
**File**: `ghost-hunt/src/components/Investigation/Tools/RadarTool.tsx`

**Imports Added**:
```typescript
import { useInvestigationStore } from '../../../stores/investigationStore';
import { 
  calculateBearing, 
  calculateDistance, 
  isGhostInForwardCone, 
  addRadarWobble 
} from '../../../utils/toolBehaviors';
```

### 2. Real-Time Ghost Data Calculation
The component now calculates ghost data in real-time from the investigation store:

```typescript
const calculatedGhostData = useMemo(() => {
  if (mode === 'view') return null;

  const { ghostPosition, playerPosition, playerHeading: storePlayerHeading } = investigationStore;

  if (!ghostPosition || !playerPosition) return null;

  // Calculate bearing to ghost
  const bearing = calculateBearing(playerPosition, ghostPosition);
  
  // Calculate distance (for debugging, not displayed)
  const distance = calculateDistance(playerPosition, ghostPosition);
  
  // Check if ghost is in forward cone (±45°)
  const inCone = isGhostInForwardCone(bearing, storePlayerHeading, 45);
  
  // Apply wobble to bearing for realism
  const wobbledBearing = addRadarWobble(bearing);

  return {
    bearing: wobbledBearing,
    trueBearing: bearing,
    distance,
    inCone,
    playerHeading: storePlayerHeading,
  };
}, [mode, investigationStore.ghostPosition, investigationStore.playerPosition, investigationStore.playerHeading]);
```

### 3. Mode-Aware Value Selection
The component now intelligently selects values based on mode:

- **View Mode**: Uses internal mock state for demonstration
- **Investigation Mode**: Uses real data from investigation store or props

```typescript
const ghostBearing = mode === 'investigation' 
  ? (propGhostBearing ?? calculatedGhostData?.bearing ?? 0)
  : mockGhostBlip.angle;
  
const playerHeading = mode === 'investigation'
  ? (propPlayerHeading ?? calculatedGhostData?.playerHeading ?? 0)
  : sweepAngle;
  
const isGhostInCone = mode === 'investigation'
  ? (propIsGhostInCone ?? calculatedGhostData?.inCone ?? false)
  : mockGhostBlip.visible;
```

## Features Implemented

### ✅ Direction-Only Display
- Radar shows **bearing to ghost** (0-360°), NOT distance
- Displays player heading (HDG: XXX°) at top
- Displays ghost bearing (TARGET: XXX°) when visible
- **No distance information displayed** (per Spec 006 requirements)

### ✅ Forward Cone Detection
- Ghost blip only appears when within ±45° of player heading
- Uses `isGhostInForwardCone()` utility for accurate detection
- Handles angle wraparound correctly (e.g., 350° vs 10°)

### ✅ Radar Wobble
- Applies ±5° wobble to ghost blip for realism
- Uses `addRadarWobble()` utility
- Makes radar feel more authentic and less "perfect"

### ✅ North Indicator
- North indicator rotates opposite to player heading
- Helps with orientation and navigation

### ✅ Real-Time Updates
- Automatically updates when player position changes
- Automatically updates when player heading changes
- Automatically updates when ghost position changes (Dev Mode)

## Tool Behavior Utilities Used

### `calculateBearing(pos1, pos2)`
- Calculates direction from player to ghost
- Returns bearing in degrees (0-360°)
- Uses proper geographic calculations

### `calculateDistance(pos1, pos2)`
- Calculates distance between positions using Haversine formula
- Returns distance in meters
- Used for debugging, NOT displayed on radar

### `isGhostInForwardCone(ghostBearing, playerHeading, coneAngle)`
- Checks if ghost is within forward detection cone
- Default cone angle: ±45°
- Handles angle wraparound correctly

### `addRadarWobble(bearing)`
- Adds ±5° random wobble to bearing
- Makes radar feel more realistic
- Normalizes result to 0-360°

## Testing

### Test File Created
**File**: `ghost-hunt/src/components/Investigation/Tools/RadarTool.test.tsx`

**Test Coverage**:
- ✅ Ghost bearing calculation
- ✅ Bearing normalization (0-360°)
- ✅ Forward cone detection (aligned, within cone, outside cone)
- ✅ Angle wraparound handling
- ✅ Radar wobble (±5° range)
- ✅ Investigation store integration
- ✅ Player heading updates
- ✅ Distance calculation
- ✅ Direction-only display constraint

### TypeScript Compilation
✅ All TypeScript checks pass (`npx tsc --noEmit`)

## Requirements Validated

### Requirement 2.1 ✅
**WHEN using Radar THEN the system SHALL display a circular CRT screen**
- Implemented: Full-screen circular CRT display with green phosphor glow

### Requirement 2.2 ✅
**WHEN using Radar THEN the system SHALL display player heading (HDG: XXX°)**
- Implemented: Heading displayed at top of screen in CRT-style text

### Requirement 2.3 ✅
**WHEN using Radar THEN the system SHALL display a north indicator**
- Implemented: North indicator rotates opposite to player heading

### Requirement 2.4 ✅
**WHEN the ghost is within ±45° of player heading THEN the Radar SHALL display a red pulsing blip with ±5° wobble**
- Implemented: Red blip with wobble, only visible in forward cone

### Requirement 2.5 ✅
**WHEN the ghost is within ±45° of player heading THEN the Radar SHALL display ghost bearing (TARGET: XXX°)**
- Implemented: Target bearing displayed at bottom when ghost visible

### Requirement 2.6 ✅
**WHEN the ghost is outside ±45° of player heading THEN the Radar SHALL NOT display any blip or bearing**
- Implemented: Blip and bearing only shown when `isGhostInCone` is true

### Requirement 2.7 ✅
**WHEN using Radar THEN the system SHALL NOT display distance to ghost**
- Implemented: Distance calculated but NOT displayed (direction only)

## Integration Points

### Investigation Store
- Reads `ghostPosition` for bearing calculation
- Reads `playerPosition` for bearing calculation
- Reads `playerHeading` for cone detection
- Automatically updates when store values change

### Tool Behavior Utilities
- Uses `calculateBearing()` for direction
- Uses `calculateDistance()` for debugging
- Uses `isGhostInForwardCone()` for visibility
- Uses `addRadarWobble()` for realism

### Investigation Screen
- Already integrated in `InvestigationScreen.tsx`
- Supports both view and investigation modes
- Works with Dev Mode controls

## Design Compliance

### Visual Design ✅
- Matches RadarToolMock.tsx reference design
- Heavy industrial steel casing
- Deep CRT screen inset with thick bezel
- Extensive damage elements (scratches, rust, tape)
- Etched-style labels
- Full-screen immersive layout

### Analog Horror Aesthetic ✅
- CRT glow effects
- Scanlines and grain
- Phosphor persistence
- Worn equipment feel
- No modern UI elements

## Next Steps

This task is complete. The RadarTool component is now fully integrated with the Investigation Store and ready for use in investigation mode.

**Next Task**: Task 4 - Update EMFTool Component

## Notes

- The component maintains backward compatibility with view mode
- Props can override store values for testing
- All calculations are memoized for performance
- TypeScript types are properly defined
- No breaking changes to existing code
