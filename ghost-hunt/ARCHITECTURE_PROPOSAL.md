# Architecture Proposal: Centralized Ghost Relationship System

## Current Problems

1. **Scattered Calculations**: Each tool independently calculates distance/bearing
   - RadarTool: calculates in `useMemo` (lines 57-88)
   - EMFTool: calculates in `useEffect` with intervals (lines 88-185)
   - DebugOverlay: calculates in `useMemo` (lines 41-59)
   - Each tool has its own calculation logic

2. **Duplication**: Same calculations repeated across components
   - `calculateDistance()` called multiple times
   - `calculateBearing()` called multiple times
   - Relative bearing calculated differently in each place

3. **Inconsistency Risk**: 
   - Different components might use different data sources
   - Dev mode vs real mode might have inconsistencies
   - No single source of truth for "ghost relationship"

4. **Performance**: 
   - Multiple calculations for the same data
   - No caching of expensive calculations

## Proposed Solution: Centralized Ghost Relationship Hook

### Core Principle
**"Ghost position is the single source of truth. Everything is relative to that position."**

### Architecture

```
┌─────────────────────────────────────┐
│   Investigation Store                │
│   - ghostPosition (lat/lng)          │
│   - playerPosition (lat/lng)         │
│   - playerHeading (0-360°)          │
│   - activeGhostType (GhostType)      │
└──────────────┬──────────────────────┘
               │
       ┌───────┼───────┐
       │       │       │
       ▼       ▼       ▼
┌──────────┐  │  ┌──────────────────┐
│ Ghost    │  │  │ useGhostRelationship│
│ Store    │  │  │ Hook              │
│          │  │  │                   │
│ - Wraith │  │  │ - distance        │
│ - Shade  │  │  │ - bearing         │
│ - etc.   │  │  │ - relativeBearing │
│          │  │  │ - isInForwardCone  │
│ Behavior │  │  │ - ghostBehavior   │
│ Profiles │  │  │ - Updates auto    │
└────┬─────┘  │  └─────────┬────────┘
     │        │            │
     └────────┴────────────┘
              │
       ┌──────┼───────┐
       ▼       ▼       ▼
   RadarTool  EMF  Camera  Thermal
   
   Each tool uses:
   - Position data (distance, bearing)
   - Ghost behavior (personality, thermal, etc.)
```

### Implementation

#### 1. Create Centralized Hook

```typescript
// src/hooks/useGhostRelationship.ts

import { useMemo } from 'react';
import { useInvestigationStore } from '../stores/investigationStore';
import { calculateDistance, calculateBearing, isGhostInForwardCone } from '../utils/toolBehaviors';

export interface GhostRelationship {
  distance: number;              // Distance in meters
  bearing: number;                // Absolute bearing (0-360°)
  relativeBearing: number;        // Relative to player heading (0-360°)
  isInForwardCone: boolean;       // Within ±45° forward cone
  ghostBehavior: GhostBehavior | null;  // Ghost's behavior profile
  ghostType: string | null;      // Active ghost type (for reference)
  isValid: boolean;               // Are positions available?
}

/**
 * Centralized hook for ghost relationship calculations
 * Single source of truth for all position-based calculations
 * 
 * Usage:
 *   const relationship = useGhostRelationship();
 *   if (relationship.isValid) {
 *     console.log(`Ghost is ${relationship.distance}m away at ${relationship.bearing}°`);
 *   }
 */
export function useGhostRelationship(): GhostRelationship {
  const ghostPosition = useInvestigationStore((state) => state.ghostPosition);
  const playerPosition = useInvestigationStore((state) => state.playerPosition);
  const playerHeading = useInvestigationStore((state) => state.playerHeading);

  return useMemo(() => {
    // If positions not available, return invalid state
    if (!ghostPosition || !playerPosition) {
      return {
        distance: 0,
        bearing: 0,
        relativeBearing: 0,
        isInForwardCone: false,
        isValid: false,
      };
    }

    // Calculate distance (Haversine formula)
    const distance = calculateDistance(playerPosition, ghostPosition);
    
    // Calculate absolute bearing (0-360°, where 0° = North)
    const bearing = calculateBearing(playerPosition, ghostPosition);
    
    // Calculate relative bearing (where player is facing = 0°)
    const relativeBearing = (bearing - playerHeading + 360) % 360;
    
    // Check if ghost is in forward detection cone (±45°)
    const isInForwardCone = isGhostInForwardCone(bearing, playerHeading, 45);

    return {
      distance,
      bearing,
      relativeBearing,
      isInForwardCone,
      isValid: true,
    };
  }, [ghostPosition, playerPosition, playerHeading]);
}
```

#### 2. Update Tools to Use Centralized Hook

**RadarTool.tsx:**
```typescript
// Before: Scattered calculations
const calculatedGhostData = useMemo(() => {
  const bearing = calculateBearing(playerPosition, ghostPosition);
  const distance = calculateDistance(playerPosition, ghostPosition);
  // ... more calculations
}, [ghostPosition, playerPosition, playerHeading]);

// After: Use centralized hook
const relationship = useGhostRelationship();
const ghostBearing = relationship.isValid 
  ? addRadarWobble(relationship.bearing)  // Apply wobble only
  : 0;
```

**EMFTool.tsx:**
```typescript
// Before: Interval-based calculations + separate ghost behavior lookup
useEffect(() => {
  const interval = setInterval(() => {
    const distance = calculateDistance(currentPlayerPos, currentGhostPos);
    const ghostBehavior = getActiveGhostBehavior(activeGhostType);
    const level = calculateEMFLevel(distance, ghostBehavior?.emfPersonality);
    // ...
  }, 1000);
}, [/* many dependencies */]);

// After: Use centralized hook (includes both position AND behavior)
const relationship = useGhostRelationship();
const emfLevel = relationship.isValid && relationship.ghostBehavior
  ? calculateEMFLevel(relationship.distance, relationship.ghostBehavior.emfPersonality)
  : 0;
```

#### 3. Optional: Store-Level Caching (Advanced)

If calculations become expensive, we can cache at the store level:

```typescript
// investigationStore.ts
interface InvestigationStore {
  // ... existing fields
  
  // Cached calculations (computed from positions)
  ghostRelationship: GhostRelationship | null;
  
  // Computed getter
  getGhostRelationship: () => GhostRelationship;
}

// In store implementation
getGhostRelationship: () => {
  const state = get();
  if (!state.ghostPosition || !state.playerPosition) {
    return { /* invalid state */ };
  }
  
  // Recalculate if positions changed
  return {
    distance: calculateDistance(state.playerPosition, state.ghostPosition),
    bearing: calculateBearing(state.playerPosition, state.ghostPosition),
    // ...
  };
}
```

### Benefits

1. **Single Source of Truth**: All tools use the same calculation
2. **Consistency**: No risk of different tools showing different values
3. **Maintainability**: Fix bugs in one place, not multiple
4. **Performance**: Calculations happen once, shared across components
5. **Testability**: Easy to test the hook in isolation
6. **Real GPS Ready**: When real GPS is added, just update the hook
7. **Ghost Behavior Integration**: Position + behavior in one place
8. **Type Safety**: Ghost types and behaviors are properly typed

### Migration Plan

1. ✅ Create `useGhostRelationship()` hook
2. ✅ Update RadarTool to use hook
3. ✅ Update EMFTool to use hook
4. ✅ Update DebugOverlay to use hook
5. ✅ Update CameraTool (if it uses distance)
6. ✅ Update ThermalTool (if it uses distance)
7. ✅ Remove duplicate calculations
8. ✅ Add tests for the hook

### Example: Real GPS Integration

When real GPS is added, the hook automatically works:

```typescript
// Real GPS updates player position
navigator.geolocation.watchPosition((position) => {
  investigationStore.updatePlayerPosition({
    lat: position.coords.latitude,
    lng: position.coords.longitude,
  });
});

// All tools automatically update because hook recalculates
// Radar dot moves, EMF level changes, etc.
```

### Questions to Consider

1. **Should we cache at store level?** 
   - Pro: Even better performance
   - Con: More complexity, need to invalidate cache

2. **Should we add computed selectors?**
   - Zustand supports computed selectors
   - Could be cleaner than hook

3. **Dev Mode Integration?**
   - Dev mode already sets positions in store
   - Hook will automatically use dev mode positions
   - No special handling needed!

## Ghost Behavior Integration

### How Different Ghost Types Affect Tools

Each ghost type has unique behavioral properties stored in `ghostStore`:

- **EMF Personality**: Affects EMF meter readings
  - `CALM`: Consistent readings
  - `UNSTABLE`: Chaotic ±1 jitter
  - `SHY`: Reads lower until very close
  - `AGGRESSIVE`: Spikes early at distance
  - `MISCHIEVOUS`: Oscillating sin-wave pattern

- **Thermal Reading**: Affects thermal scanner
  - `NORMAL`: Ambient temperature
  - `COLD_SPOT`: Chill zone appears
  - `DEEP_COLD`: <8°C readings

- **Camera Manifestations**: Affects camera capture probability
  - Different ghosts have different manifestation types
  - Probability varies by ghost type

- **Spirit Box Signature**: Affects spirit box tuning
  - Each ghost has unique target frequencies (knobA, knobB)
  - Word families differ by ghost type

### Example: How Tools Use Ghost Behavior

```typescript
// EMF Tool
const relationship = useGhostRelationship();
if (relationship.isValid && relationship.ghostBehavior) {
  // Distance affects base level, personality affects noise
  const emfLevel = calculateEMFLevel(
    relationship.distance,
    relationship.ghostBehavior.emfPersonality
  );
}

// Thermal Tool
if (relationship.isValid && relationship.ghostBehavior) {
  // Distance + ghost's thermal category
  const thermal = calculateThermalReading(
    relationship.distance,
    relationship.ghostBehavior.thermalReading
  );
}

// Camera Tool
if (relationship.isValid && relationship.ghostBehavior) {
  // Distance + ghost's manifestation profile
  const manifestation = determineCameraManifestation(
    relationship.distance,
    relationship.ghostBehavior.cameraManifestations
  );
}
```

### Ghost Types Available

- **Wraith**: Calm EMF, fast movement
- **Shade**: Shy EMF, prefers darkness
- **Poltergeist**: Unstable EMF, chaotic behavior
- **Banshee**: Aggressive EMF, extreme threat
- **Phantom**: Calm EMF, invisible to camera
- **Onyx**: Shy EMF, shadow manifestations
- **Trickster**: Mischievous EMF, most challenging

All ghost data is stored in `ghostStore` and accessed via `getActiveGhostBehavior()`.

## Recommendation

**Start with the hook approach** - it's simple, works immediately, and can be enhanced later if needed.

The hook now includes:
- ✅ Position calculations (distance, bearing)
- ✅ Ghost behavior (personality, thermal, etc.)
- ✅ Automatic updates when anything changes
- ✅ Type-safe access to all ghost properties

