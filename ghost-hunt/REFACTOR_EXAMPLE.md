# Refactor Example: Using useGhostRelationship Hook

## ✅ ACTUAL IMPLEMENTATION (RadarTool.tsx)

### Before (Scattered Calculations)

```typescript
// RadarTool.tsx - Lines 56-88 (OLD)
import { 
  calculateBearing, 
  calculateDistance, 
  isGhostInForwardCone, 
  addRadarWobble 
} from '../../../utils/toolBehaviors';

const calculatedGhostData = useMemo(() => {
  if (mode === 'view') {
    return null;
  }

  const { ghostPosition, playerPosition, playerHeading: storePlayerHeading } = investigationStore;

  if (!ghostPosition || !playerPosition) {
    return null;
  }

  // ❌ Duplicate calculation - also done in EMFTool, DebugOverlay, etc.
  const bearing = calculateBearing(playerPosition, ghostPosition);
  const distance = calculateDistance(playerPosition, ghostPosition);
  const inCone = isGhostInForwardCone(bearing, storePlayerHeading, 45);
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

### After (Centralized - ✅ IMPLEMENTED)

```typescript
// RadarTool.tsx - Lines 1-88 (NEW)
import { useGhostRelationship } from '../../../hooks/useGhostRelationship';
import { addRadarWobble } from '../../../utils/toolBehaviors';

// Inside component:
// ✅ Use centralized ghost relationship hook (single source of truth)
const relationship = useGhostRelationship();

// Calculate radar-specific data from centralized relationship
const calculatedGhostData = useMemo(() => {
  if (mode === 'view') {
    return null;
  }

  // ✅ Use centralized relationship data
  if (!relationship.isValid) {
    return null;
  }

  // Only apply radar-specific wobble to bearing for realism
  const wobbledBearing = addRadarWobble(relationship.bearing);

  return {
    bearing: wobbledBearing,
    trueBearing: relationship.bearing,
    distance: relationship.distance,
    inCone: relationship.isInForwardCone,
    playerHeading: investigationStore.playerHeading,
  };
}, [mode, relationship, investigationStore.playerHeading]);
```

### Additional Improvements

**Ghost Blip Calculation:**
```typescript
// Before: Manual relative bearing calculation
const relativeBearing = (ghostBearing - playerHeading + 360) % 360;

// After: Use relationship hook's pre-calculated relative bearing
const relativeBearing = relationship.isValid 
  ? relationship.relativeBearing 
  : (ghostBearing - playerHeading + 360) % 360;
```

**Debug Logging:**
```typescript
// Before: Only logged calculated values
console.log('🎯 Radar Blip Calc:', {
  ghostBearing: ghostBearing.toFixed(1) + '°',
  // ...
});

// After: Logs relationship data (includes distance, ghost type, etc.)
console.log('🎯 Radar Blip Calc (using useGhostRelationship):', {
  ghostBearing: relationship.isValid ? relationship.bearing.toFixed(1) + '°' : 'N/A',
  distance: relationship.isValid ? relationship.distance.toFixed(1) + 'm' : 'N/A',
  // ...
});
```

## Benefits Achieved

1. ✅ **Less Code**: Removed duplicate `calculateDistance()` and `calculateBearing()` calls
2. ✅ **Consistency**: RadarTool now uses same calculation as other tools will
3. ✅ **Automatic Updates**: When player moves, relationship hook recalculates automatically
4. ✅ **Easier Testing**: Can test hook in isolation
5. ✅ **Real GPS Ready**: Hook works with real GPS automatically
6. ✅ **Ghost Behavior**: Hook includes ghost behavior data (for future use)

## Code Reduction

- **Before**: ~30 lines of calculation logic
- **After**: ~15 lines (50% reduction)
- **Removed**: Direct calls to `calculateBearing`, `calculateDistance`, `isGhostInForwardCone`
- **Added**: Single hook call `useGhostRelationship()`

## ✅ EMFTool Refactoring

### Before (Interval-Based Calculations)

```typescript
// EMFTool/index.tsx - Lines 88-206 (OLD)
const playerPosition = useInvestigationStore((state) => state.playerPosition);
const ghostPosition = useInvestigationStore((state) => state.ghostPosition);
const activeGhostType = useInvestigationStore((state) => state.activeGhostType);
const { getActiveGhostBehavior } = useGhostStore();

useEffect(() => {
  if (mode === 'investigation' && playerPosition && ghostPosition && activeGhostType) {
    const ghostBehavior = getActiveGhostBehavior(activeGhostType);
    const emfPersonality = ghostBehavior.emfPersonality;
    
    // ❌ setInterval with duplicate calculations
    const interval = setInterval(() => {
      const currentState = useInvestigationStore.getState();
      const currentPlayerPos = currentState.playerPosition;
      const currentGhostPos = currentState.ghostPosition;
      
      // ❌ Duplicate distance calculation
      const distance = calculateDistance(currentPlayerPos, currentGhostPos);
      const level = calculateEMFLevel(distance, emfPersonality);
      
      setCalculatedEmfLevel(level);
    }, 800);
    
    return () => clearInterval(interval);
  }
}, [mode, playerPosition?.lat, playerPosition?.lng, ghostPosition?.lat, ghostPosition?.lng, activeGhostType]);
```

### After (Centralized - ✅ IMPLEMENTED)

```typescript
// EMFTool/index.tsx - Lines 45-95 (NEW)
// ✅ Use centralized ghost relationship hook
const relationship = useGhostRelationship();

useEffect(() => {
  if (mode === 'investigation' && relationship.isValid && relationship.ghostBehavior) {
    // ✅ Use centralized relationship data
    const distance = relationship.distance;
    const emfPersonality = relationship.ghostBehavior.emfPersonality;
    
    // Calculate EMF level (no interval needed - reacts to relationship changes)
    const level = calculateEMFLevel(distance, emfPersonality);
    
    setCalculatedEmfLevel(level);
    // ... visual feedback and evidence logging
  }
}, [
  mode,
  relationship.isValid,
  relationship.distance,
  relationship.ghostBehavior?.emfPersonality,
  lastLoggedLevel,
]);
```

### EMFTool Benefits

- ✅ **Removed setInterval** - No more polling, reacts to position changes
- ✅ **Removed duplicate calculations** - No more `calculateDistance()` calls
- ✅ **Simpler dependencies** - Just relationship object, not individual positions
- ✅ **Automatic updates** - When player moves, EMF updates immediately
- ✅ **Less code** - ~120 lines → ~50 lines (58% reduction)

## ✅ DebugOverlay Refactoring

### Before (Duplicate Calculations)

```typescript
// DebugOverlay.tsx - Lines 34-59 (OLD)
const investigationPlayerPos = useInvestigationStore((state) => state.playerPosition);
const investigationGhostPos = useInvestigationStore((state) => state.ghostPosition);
const activeGhostType = useInvestigationStore((state) => state.activeGhostType);
const { getActiveGhostBehavior } = useGhostStore();

const emfData = useMemo(() => {
  if (!investigationPlayerPos || !investigationGhostPos || !activeGhostType) {
    return null;
  }
  
  const ghostBehavior = getActiveGhostBehavior(activeGhostType);
  if (!ghostBehavior) return null;
  
  // ❌ Duplicate distance calculation
  const distance = calculateDistance(investigationPlayerPos, investigationGhostPos);
  const emfLevel = calculateEMFLevel(distance, personalityString);
  
  return { level: emfLevel, personality: personalityString, distance };
}, [investigationPlayerPos, investigationGhostPos, activeGhostType, getActiveGhostBehavior]);
```

### After (Centralized - ✅ IMPLEMENTED)

```typescript
// DebugOverlay.tsx - Lines 34-50 (NEW)
// ✅ Use centralized ghost relationship hook
const relationship = useGhostRelationship();

const emfData = useMemo(() => {
  if (!relationship.isValid || !relationship.ghostBehavior) {
    return null;
  }
  
  // ✅ Use centralized relationship data
  const distance = relationship.distance;
  const personalityString = String(relationship.ghostBehavior.emfPersonality);
  const emfLevel = calculateEMFLevel(distance, personalityString as any);
  
  return { level: emfLevel, personality: personalityString, distance };
}, [relationship.isValid, relationship.distance, relationship.ghostBehavior]);
```

### DebugOverlay Benefits

- ✅ **Removed duplicate calculations** - No more `calculateDistance()` calls
- ✅ **Uses relationship data** - Distance, bearing, relative bearing all from hook
- ✅ **Shows ghost type** - Now displays ghost type from relationship
- ✅ **Consistent data** - Same source as RadarTool and EMFTool
- ✅ **Less code** - Simpler dependencies and logic

## Migration Checklist

- [x] Create `useGhostRelationship` hook ✅
- [x] Update RadarTool to use hook ✅
- [x] Update EMFTool to use hook ✅
- [x] Update DebugOverlay to use hook ✅
- [ ] Update CameraTool (if uses distance)
- [ ] Update ThermalTool (if uses distance)
- [ ] Remove duplicate calculations from other tools
- [ ] Test all tools still work
- [ ] Test dev mode still works
- [ ] Test with real GPS (when available)

## Next Steps

1. **Test RadarTool** - Verify it works correctly with the refactored hook
2. **Refactor EMFTool** - Apply same pattern to EMF tool
3. **Refactor DebugOverlay** - Update debug display to use hook
4. **Remove Old Code** - Clean up duplicate calculation functions

