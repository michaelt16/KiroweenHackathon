# Spec 013: Tool Component Refactoring - Tasks

## Phase 1: Create Shared Components Foundation

### Task 1.1: Setup Folder Structure
- [ ] Create `src/components/Investigation/Tools/shared/casings/`
- [ ] Create `src/components/Investigation/Tools/shared/damage/`
- [ ] Create `src/components/Investigation/Tools/shared/hardware/`
- [ ] Create `src/components/Investigation/Tools/shared/labels/`
- [ ] Create `src/components/Investigation/Tools/shared/textures/`
- [ ] Create `src/components/Investigation/Tools/shared/effects/`

### Task 1.2: Implement Casing Components
- [ ] Create `MetalCasing.tsx` with heavy steel gradient + bevels
- [ ] Create `PlasticCasing.tsx` with rubberized plastic texture
- [ ] Create `casings/index.ts` for exports
- [ ] Test casings render correctly

### Task 1.3: Implement Damage Components
- [ ] Create `Scratches.tsx` (light + dark variants)
- [ ] Create `Gouges.tsx` (deep damage)
- [ ] Create `RustSpots.tsx` (scattered rust)
- [ ] Create `EdgeChips.tsx` (corner chipping)
- [ ] Create `Fingerprints.tsx` (smudges)
- [ ] Create `RainStreaks.tsx` (vertical weathering)
- [ ] Create `damage/index.ts` for exports
- [ ] Test damage elements render with seed-based randomization

### Task 1.4: Implement Hardware Components
- [ ] Create `Screws.tsx` (corner, bezel, calibration)
- [ ] Create `VentGrilles.tsx` (industrial vents)
- [ ] Create `WeldSeams.tsx` (metal seams)
- [ ] Create `TapePatches.tsx` (tape with overhang)
- [ ] Create `hardware/index.ts` for exports
- [ ] Test hardware elements render correctly

### Task 1.5: Implement Label Components
- [ ] Create `EtchedLabel.tsx` (etched text with shadow)
- [ ] Create `SerialNumber.tsx` (specialized serial label)
- [ ] Create `HandwrittenNote.tsx` (Caveat font notes)
- [ ] Create `labels/index.ts` for exports
- [ ] Test labels render with correct styling

### Task 1.6: Implement Texture Components
- [ ] Create `TextureOverlays.tsx` (metal/plastic texture layers)
- [ ] Create `BezelRing.tsx` (thick metallic bezel for displays)
- [ ] Create `textures/index.ts` for exports
- [ ] Test textures apply correctly

### Task 1.7: Implement Effect Components
- [ ] Create `FilmGrain.tsx` (grain animation)
- [ ] Create `DirtyGlass.tsx` (glass overlay with scratches)
- [ ] Create `effects/index.ts` for exports
- [ ] Test effects render and animate

### Task 1.8: Create Master Export
- [ ] Create `shared/index.ts` that exports all shared components
- [ ] Verify all imports work correctly

---

## Phase 2: Refactor EMFTool (Proof of Concept)

### Task 2.1: Create EMFTool Folder Structure
- [x] Create `src/components/Investigation/Tools/EMFTool/`



- [x] Create `EMFTool/types.ts` for interfaces

- [x] Create `EMFTool/index.tsx` (main component)

- [x] Create `EMFTool/LEDDisplay.tsx`

- [x] Create `EMFTool/EMFCasing.tsx`



### Task 2.2: Implement LEDDisplay Component
- [x] Extract LED matrix logic from mock

- [x] Implement 5 columns × 8 segments grid

- [x] Implement color progression (green → yellow → orange → red)

- [x] Implement flickering logic for Level 5

- [x] Add BezelRing wrapper

- [x] Add DirtyGlass and FilmGrain effects

- [ ] Test LED display renders correctly



###-Task 2.3: Implement EMFCasing Component

- [x] Extract EMF-specific casing details from mock



- [x] Implement warning LED (red when level >= 4)

- [x] Implement toggle switch

- [x] Implement calibration screw

- [x] Implement micro-indentations

- [x] Test casing details render correctly



### Task 2.4: Implement Main EMFTool Component
- [x] Set up props interface (mode, emfLevel, isFlickering)




- [x] Implement view mode mock state




-

- [x] Implement investigation mode real state




- [x] Compose all shared components

- [x] Add MetalCasing wrapper

- [x] Add TextureOverlays

- [x] Add all damage elements (Scratches, Gouges, RustSpots, etc.)

- [x] Add all hardware elements (Screws, VentGrilles, WeldSeams, TapePatches)

- [x] Add all labels (EtchedLabel for various text)

- [x] Add EMFCasing component

- [x] Add LEDDisplay component

- [ ] Test main component renders correctly



### Task 2.5: Verify EMFTool Matches Mock
- [x] Compare side-by-side with EMFMeterMock.tsx



- [x] Verify all damage elements present

- [x] Verify all labels present and styled correctly

- [x] Verify LED display matches exactly

- [x] Verify textures match

- [x] Verify hardware elements match

- [x] Take screenshots for comparison


### Task 2.6: Test EMFTool in Both Modes
- [ ] Test in view mode (inventory/backpack)
- [ ] Test in investigation mode (active hunt)
- [ ] Test EMF level changes
- [ ] Test flickering effect
- [ ] Test performance (no lag)
- [ ] Test on mobile viewport

### Task 2.7: Update EMFTool Import in InvestigationScreen
- [x] Update import path from `./Tools/EMFTool` to `./Tools/EMFTool/index`


- [ ] Verify investigation screen still works
- [ ] Test tool switching

---

## Phase 3: Refactor RadarTool

### Task 3.1: Create RadarTool Folder Structure
- [ ] Create `src/components/Investigation/Tools/RadarTool/`
- [ ] Create `RadarTool/types.ts`
- [ ] Create `RadarTool/index.tsx`
- [ ] Create `RadarTool/RadarDisplay.tsx`
- [ ] Create `RadarTool/RadarCasing.tsx`

### Task 3.2: Implement RadarDisplay Component
- [ ] Extract CRT screen logic from mock
- [ ] Implement circular radar display
- [ ] Implement sweep animation
- [ ] Implement ghost blip
- [ ] Implement compass rose
- [ ] Implement scanlines
- [ ] Add BezelRing wrapper
- [ ] Test radar display renders correctly

### Task 3.3: Implement RadarCasing Component
- [ ] Extract Radar-specific casing details
- [ ] Implement corner reinforcement plates
- [ ] Implement additional hardware
- [ ] Test casing details render correctly

### Task 3.4: Implement Main RadarTool Component
- [ ] Set up props interface
- [ ] Implement view mode mock state
- [ ] Implement investigation mode real state
- [ ] Compose all shared components
- [ ] Test main component renders correctly

### Task 3.5: Verify and Test RadarTool
- [ ] Compare with RadarToolMock.tsx
- [ ] Test in both modes
- [ ] Update import in InvestigationScreen
- [ ] Verify no regressions

---

## Phase 4: Refactor ThermalTool

### Task 4.1: Create ThermalTool Folder Structure
- [ ] Create `src/components/Investigation/Tools/ThermalTool/`
- [ ] Create `ThermalTool/types.ts`
- [ ] Create `ThermalTool/index.tsx`
- [ ] Create `ThermalTool/ThermalDisplay.tsx`
- [ ] Create `ThermalTool/ThermalCasing.tsx`

### Task 4.2: Implement ThermalDisplay Component
- [ ] Extract thermal viewfinder logic from mock
- [ ] Implement thermal gradient display
- [ ] Implement cold spot detection
- [ ] Implement crosshair
- [ ] Implement temperature readout
- [ ] Test thermal display renders correctly

### Task 4.3: Implement ThermalCasing Component
- [ ] Extract Thermal-specific casing details
- [ ] Implement FLIR E5-style body shape
- [ ] Implement side grips
- [ ] Test casing details render correctly

### Task 4.4: Implement Main ThermalTool Component
- [ ] Set up props interface
- [ ] Compose all components
- [ ] Test and verify

### Task 4.5: Verify and Test ThermalTool
- [ ] Compare with ThermalScannerMock.tsx
- [ ] Test in both modes
- [ ] Update import in InvestigationScreen

---

## Phase 5: Refactor CameraTool

### Task 5.1: Create CameraTool Folder Structure
- [ ] Create `src/components/Investigation/Tools/CameraTool/`
- [ ] Create `CameraTool/types.ts`
- [ ] Create `CameraTool/index.tsx`
- [ ] Create `CameraTool/CameraViewfinder.tsx`
- [ ] Create `CameraTool/CameraCasing.tsx`

### Task 5.2: Implement CameraViewfinder Component
- [ ] Extract viewfinder logic from mock
- [ ] Implement 4:3 aspect ratio viewfinder
- [ ] Implement REC indicator
- [ ] Implement timestamp
- [ ] Implement crosshairs
- [ ] Implement film grain
- [ ] Test viewfinder renders correctly

### Task 5.3: Implement CameraCasing Component
- [ ] Extract Camera-specific casing details
- [ ] Implement Polaroid-style body
- [ ] Implement film ejection slot
- [ ] Implement shutter button
- [ ] Test casing details render correctly

### Task 5.4: Implement Main CameraTool Component
- [ ] Set up props interface
- [ ] Compose all components
- [ ] Test and verify

### Task 5.5: Verify and Test CameraTool
- [ ] Compare with CameraViewfinderMock.tsx
- [ ] Test in both modes
- [ ] Update import in InvestigationScreen

---

## Phase 6: Refactor SpiritBoxTool

### Task 6.1: Create SpiritBoxTool Folder Structure
- [ ] Create `src/components/Investigation/Tools/SpiritBoxTool/`
- [ ] Create `SpiritBoxTool/types.ts`
- [ ] Create `SpiritBoxTool/index.tsx`
- [ ] Create `SpiritBoxTool/SpiritBoxDisplay.tsx`
- [ ] Create `SpiritBoxTool/SpiritBoxCasing.tsx`

### Task 6.2: Implement SpiritBoxDisplay Component
- [ ] Extract oscilloscope logic from mock
- [ ] Implement waveform visualization
- [ ] Implement frequency readout
- [ ] Implement EVP text overlays
- [ ] Implement grid lines
- [ ] Test display renders correctly

### Task 6.3: Implement SpiritBoxCasing Component
- [ ] Extract SpiritBox-specific casing details
- [ ] Implement radio-style body
- [ ] Implement bent antenna
- [ ] Implement physical knobs
- [ ] Test casing details render correctly

### Task 6.4: Implement Main SpiritBoxTool Component
- [ ] Set up props interface
- [ ] Compose all components
- [ ] Test and verify

### Task 6.5: Verify and Test SpiritBoxTool
- [ ] Compare with SpiritBoxMock.tsx
- [ ] Test in both modes
- [ ] Update import in InvestigationScreen

---

## Phase 7: Cleanup and Documentation

### Task 7.1: Code Cleanup
- [ ] Remove old monolithic tool files (backup first)
- [ ] Update all imports in InvestigationScreen
- [ ] Remove unused mock files (or move to archive)
- [ ] Run linter and fix any issues
- [ ] Run type checker and fix any issues

### Task 7.2: Documentation
- [ ] Update README with new architecture
- [ ] Document shared component APIs
- [ ] Add usage examples for each shared component
- [ ] Document tool-specific components
- [ ] Add migration guide for future tools

### Task 7.3: Testing
- [ ] Run full test suite
- [ ] Test all tools in investigation mode
- [ ] Test all tools in view mode
- [ ] Test tool switching
- [ ] Test on different screen sizes
- [ ] Test performance (no regressions)

### Task 7.4: Final Verification
- [ ] All tool files under 300 lines ✅
- [ ] All tools match mocks exactly ✅
- [ ] No functionality regressions ✅
- [ ] Code review approval ✅
- [ ] User testing shows no visual differences ✅

---

## Success Criteria

- ✅ All 5 tools refactored
- ✅ All tool files under 300 lines
- ✅ Shared components reused across tools
- ✅ Production tools match mocks pixel-perfect
- ✅ No functionality regressions
- ✅ Performance maintained or improved
- ✅ Code is maintainable and extensible
- ✅ Documentation is complete

---

## Estimated Timeline

- **Phase 1** (Shared Components): 2-3 days
- **Phase 2** (EMFTool): 1 day
- **Phase 3** (RadarTool): 1 day
- **Phase 4** (ThermalTool): 1 day
- **Phase 5** (CameraTool): 1 day
- **Phase 6** (SpiritBoxTool): 1 day
- **Phase 7** (Cleanup): 1 day

**Total**: 8-10 days

---

## Priority

**HIGH** - This refactoring is critical for:
- Maintainability
- Adding new features
- Matching mock quality
- Code quality

