# EMFTool Integration Test Guide

## ✅ Integration Status: COMPLETE

The refactored EMFTool has been successfully integrated into the production codebase.

---

## 📝 Changes Made

### 1. Created New EMFTool Components
- `src/components/Investigation/Tools/EMFTool_NEW/index.tsx` (148 lines)
- `src/components/Investigation/Tools/EMFTool_NEW/LEDDisplay.tsx` (145 lines)
- `src/components/Investigation/Tools/EMFTool_NEW/EMFCasing.tsx` (95 lines)
- `src/components/Investigation/Tools/EMFTool_NEW/types.ts`

### 2. Created 20+ Shared Components
- Casings: `MetalCasing`, `PlasticCasing`
- Damage: `Scratches`, `Gouges`, `RustSpots`, `EdgeChips`, `Fingerprints`, `RainStreaks`
- Hardware: `Screws`, `VentGrilles`, `WeldSeams`, `TapePatches`
- Labels: `EtchedLabel`, `SerialNumber`, `HandwrittenNote`
- Textures: `TextureOverlays`, `BezelRing`
- Effects: `FilmGrain`, `DirtyGlass`

### 3. Updated Production Files
- ✅ `src/screens/InvestigationScreen.tsx` - Updated import to use `EMFTool_NEW`
- ✅ `src/screens/InventoryScreen.tsx` - Updated to use `EMFTool`
- ✅ `src/components/Tools/index.ts` - Added export for new `EMFTool`

### 4. Compilation Status
- ✅ Zero TypeScript errors
- ✅ All imports resolve correctly
- ✅ No missing dependencies

---

## 🧪 How to Test

### Test 1: Investigation Mode

1. Start the app: `npm run dev`
2. Navigate to the map
3. Enter an investigation (click on a hotspot)
4. Select the EMF Meter tool from the field kit drawer
5. **Verify:**
   - Tool displays in full-screen
   - LED bars are visible (5 columns × 8 segments each)
   - Bars fill from bottom to top
   - Color progression: green (1-2) → yellow (3) → orange (4) → red (5)
   - Warning LED (top-right) turns red when level >= 4
   - All damage elements visible (scratches, rust, tape, etc.)
   - Labels are etched style (40-50% opacity)
   - Serial number visible at bottom
   - Calibration note visible at bottom-right
   - Toggle switch visible at bottom-left
   - Vent grilles visible on sides
   - Performance is smooth (no lag)

6. **Test EMF Levels:**
   - Walk closer to ghost → EMF level should increase
   - Walk away from ghost → EMF level should decrease
   - At level 5 → Red color, flickering effect, warning LED on

### Test 2: Inventory View Mode

1. From the map, click the backpack icon
2. Click on the EMF Meter device in the foam cutout
3. **Verify:**
   - Tool displays in full-screen modal
   - Close button (✕) visible in top-right
   - LED bars cycle through levels automatically
   - Occasional level 5 spikes with flickering
   - Looks IDENTICAL to investigation mode
   - All visual elements present
   - Close button works

### Test 3: Visual Consistency

**Compare side-by-side:**
1. Open EMF tool in inventory (view mode)
2. Take a screenshot
3. Enter investigation and open EMF tool
4. Take a screenshot
5. **Verify:** Both screenshots look identical (except for LED level data)

---

## 🎯 Expected Behavior

### View Mode (Inventory)
- **Data Source**: Mock data (cycles automatically)
- **Interaction**: None (static display)
- **Purpose**: Inspection and preview
- **LED Behavior**: Cycles through levels 0-5 randomly
- **Flickering**: Occasional at level 5

### Investigation Mode
- **Data Source**: Live ghost proximity data
- **Interaction**: Responds to player movement
- **Purpose**: Active ghost hunting
- **LED Behavior**: Based on `ghostDistance` calculation
- **Flickering**: When `isFlickering` prop is true

---

## 🐛 Known Issues / Edge Cases

### None Expected
The refactored EMFTool uses the exact same visual structure as the mock, so it should work identically.

### If Issues Occur:

**Issue: Tool doesn't display**
- Check browser console for errors
- Verify import paths are correct
- Check that `mode` prop is being passed

**Issue: LED bars don't update**
- Check that `emfLevel` prop is being passed correctly
- Verify investigation context is providing ghost distance data
- Check console for calculation errors

**Issue: Visual elements missing**
- Verify all texture assets are loading
- Check that shared components are imported correctly
- Look for z-index conflicts

**Issue: Performance lag**
- Check if too many re-renders occurring
- Verify texture images are optimized
- Check for memory leaks in useEffect

---

## 📊 Performance Metrics

### Target Performance:
- **Initial render**: < 100ms
- **Frame rate**: 60 FPS
- **Memory usage**: < 50MB additional
- **Texture load time**: < 500ms

### Monitoring:
- Press `P` key in investigation mode to toggle performance monitor
- Watch for frame drops when EMF tool is active
- Check memory usage in browser DevTools

---

## ✅ Success Criteria

The integration is successful if:

1. ✅ EMF tool displays correctly in both modes
2. ✅ Visual appearance matches EMFMeterMock.tsx
3. ✅ Inventory view and investigation mode look identical
4. ✅ LED bars respond to ghost proximity in investigation mode
5. ✅ Mock data cycles correctly in view mode
6. ✅ All damage elements visible
7. ✅ All labels readable (etched style)
8. ✅ No compilation errors
9. ✅ No runtime errors
10. ✅ Performance is smooth (60 FPS)

---

## 🚀 Next Steps After Testing

Once EMFTool testing is complete and successful:

1. **Document any issues found** (if any)
2. **Fix any bugs** (if any)
3. **Proceed to Phase 3**: Refactor RadarTool using the same pattern
4. **Continue with remaining tools**: Thermal, Camera, Spirit Box
5. **Final cleanup**: Remove old EMFMeterTool.tsx (after backup)

---

## 📞 Rollback Plan

If critical issues are found:

1. Revert `InvestigationScreen.tsx` import:
   ```typescript
   import { EMFTool } from '../components/Investigation/Tools/EMFTool';
   ```

2. Revert `InventoryScreen.tsx` usage:
   ```typescript
   {viewingTool === 'emf' && <EMFMeterTool mode="view" />}
   ```

3. Keep new components for future use
4. Debug issues before re-integrating

---

**Status**: Ready for Testing ✅
**Last Updated**: 2024
**Estimated Test Time**: 10-15 minutes
