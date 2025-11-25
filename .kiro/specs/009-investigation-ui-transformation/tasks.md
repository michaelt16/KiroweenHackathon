# Implementation Plan

## Overview

This implementation plan transforms the Investigation Mode UI to use 007-standard tool designs. The approach focuses on extracting visual components from playground mocks and integrating them with existing investigation functionality.

**Strategy:** Build incrementally, starting with base components, then individual tools, then integration.

---

## Current State (Updated)

### ✅ Completed by Cursor
- **Tasks 1.1-1.3:** Base structure, TypeScript interfaces, ToolContainer component
- **Tasks 2.1-2.4:** All reusable visual components (ToolCasing, TextureLayer, DamageLayer, labels)
- **Inventory Integration:** Tool viewer modal in InventoryScreen.tsx (not in original spec, but working)
  - Clicking tool icons opens full-screen modal with tool in `mode: 'view'`
  - Current wrappers at `src/components/Tools/` just render mocks directly

### 🔄 In Progress
- **Task 3:** Building production RadarTool component
  - Will support both `mode: 'view'` (inventory) and `mode: 'investigation'` (active)
  - Will replace mock wrapper with production component

### 📝 Notes
- Old tool wrappers exist at `src/components/Tools/` (will be updated to use new components)
- Playground mocks at `src/ui-playground/tools/` remain as visual reference
- New production components go in `src/components/Investigation/Tools/`

---

## Tasks

- [x] 1. Set up base tool component structure








  - Create directory structure for new tool components
  - Set up TypeScript interfaces for tool props
  - Create base ToolContainer component
  - _Requirements: All (foundation)_

- [x] 1.1 Create tool components directory




  - Create `src/components/Investigation/Tools/` directory
  - Create `src/components/Investigation/Tools/Base/` for shared components
  - Create `src/components/Investigation/Tools/Effects/` for visual effects
  - _Requirements: 9.1, 9.2_

- [x] 1.2 Define TypeScript interfaces


  - Create `src/components/Investigation/Tools/types.ts`
  - Define props interfaces for all 5 tools
  - Define damage configuration interfaces
  - Define texture layer interfaces
  - _Requirements: All_

- [x] 1.3 Create ToolContainer base component


  - Implement full-screen layout wrapper
  - Add z-index management
  - Add background color handling
  - _Requirements: 9.2_

---

- [x] 2. Build reusable visual components




  - Extract common visual elements from mocks
  - Create texture layer components
  - Create damage element components
  - Create label components
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 2.1 Create ToolCasing component


  - Implement material-specific gradients (metal, plastic-light, plastic-dark)
  - Add beveled edge effects
  - Add inset shadows for depth
  - Support proper z-index layering
  - _Requirements: 9.1, 9.2_

- [x] 2.2 Create TextureLayer component


  - Support multiple texture types (base, dust, wrinkled, rust)
  - Implement blend mode support (multiply, overlay, screen)
  - Add opacity control
  - Preload texture images
  - _Requirements: 9.1_

- [x] 2.3 Create DamageLayer component


  - Implement Scratches sub-component
  - Implement RustSpots sub-component
  - Implement TapePatches sub-component
  - Implement ChippedCorners sub-component
  - Support deterministic positioning based on tool ID
  - _Requirements: 9.4_

- [x] 2.4 Create label components


  - Create HandwrittenLabel component (Caveat font)
  - Create SerialNumber component (Courier New font)
  - Add text shadow effects for ink bleed
  - Support rotation and positioning
  - _Requirements: 9.3_

---

- [-] 3. Build RadarTool component


  - Extract visual structure from RadarToolMock
  - Support both `mode: 'view'` (inventory) and `mode: 'investigation'` (active)
  - Add props for ghost bearing and distance (investigation mode)
  - Integrate with investigation context (investigation mode)
  - Test with real GPS data
  - Update wrapper at `src/components/Tools/RadarTool.tsx` to use new component
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_
  - **Note:** Inventory screen already has viewer modal that calls tool with `mode: 'view'`

- [x] 3.1 Create RadarTool component structure



  - Set up component file `src/components/Investigation/Tools/RadarTool.tsx`
  - Extract complete casing structure from RadarToolMock
  - Implement full-screen layout (100vw × 100vh)
  - Add heavy steel casing with beveled edges
  - Add texture layers (metal 0.6, rust 0.4, dust 0.3 opacity)
  - Add weld lines, seams, and panel dividers
  - Add corner reinforcement plates with screws
  - Add vent grilles on sides (15 slits each)
  - Add extensive damage (scratches, rust spots, chips, tape)
  - Add etched labels (PWR, GAIN, RANGE, TILT, serial number)
  - Support `mode` prop to switch between view/investigation behavior
  - _Requirements: 1.1, 1.4_

- [x] 3.2 Implement radar display




  - Create circular CRT screen container (positioned at top 15%)
  - Add THICK metallic bezel ring (35px offset, raised above screen)
  - Implement bezel with metal texture, rust, dust, scratches, tape
  - Add 4 screws at cardinal points on bezel
  - Add DEEP screen inset (12% inset from bezel, 30-70px shadow depth)
  - Implement range rings (3 circles: 50px, 100px, 150px radius) - NO distance labels, visual reference only
  - Add crosshair lines (vertical and horizontal)
  - Add compass heading indicator (top of screen, CRT-style text: "HDG: XXX°")
  - Add target bearing indicator (bottom-center, shows "TARGET: XXX°" ONLY when ghost is in forward cone)
  - Add north indicator (rotates to always point north)
  - Add CRT effects (scanlines, glow, texture, glass curvature)
  - Add screen damage (tape patches, scratches, screws on corners)
  - _Requirements: 1.1_

- [x] 3.3 Add radar sweep animation




  - Implement rotating sweep line (2 degrees per frame)
  - Add sweep fade trail (30-degree arc with gradient)
  - Add CRT glow effect (radial gradient with blur)
  - Add scanline overlay (repeating linear gradient)
  - Add static noise animation
  - Add bloom effect on bright areas
  - Optimize for 60fps performance
  - In `mode: 'view'`, use internal animation state
  - In `mode: 'investigation'`, sync with player heading
  - _Requirements: 1.5_

- [x] 3.4 Integrate ghost blip display

  - Calculate blip position from ghost bearing and distance
  - Render ghost blip as pulsing red circle with glow
  - Update blip position when player rotates (investigation mode)
  - Add blip animation (size and opacity pulse)
  - Handle ghost movement animation
  - In `mode: 'view'`, use mock ghost data with random movement
  - In `mode: 'investigation'`, use real ghost data from context
  - _Requirements: 1.2, 1.3_

- [x] 3.5 Update RadarTool wrapper

  - Update `src/components/Tools/RadarTool.tsx` to import new component
  - Pass `mode` prop from wrapper to production component
  - In `mode: 'investigation'`, get data from InvestigationContext
  - In `mode: 'view'`, component uses internal mock state
  - Remove direct import of RadarToolMock
  - Ensure inventory viewer continues to work
  - _Requirements: 1.1, 1.4_

---

- [x] 4. Build EMFTool component

  - Extract visual structure from EMFMeterMock
  - Add props for EMF level
  - Integrate with ghost behavior engine
  - Test with EMF events
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 4.1 Create EMFTool component structure


  - Set up component file `src/components/Investigation/Tools/EMFTool.tsx`
  - Extract casing structure from EMFMeterMock
  - Apply ToolCasing with plastic-light material
  - Add texture layers (plastic, dust, wrinkled)
  - _Requirements: 2.1, 2.4_

- [x] 4.2 Implement LED bar graph display


  - Create 5 LED columns × 5 segments each
  - Implement color progression (green → yellow → orange → red)
  - Add glow effects for active LEDs
  - Add level labels (1-5)
  - _Requirements: 2.1, 2.2_

- [x] 4.3 Add EMF level integration

  - Connect to ghost behavior EMF events
  - Update LED display based on EMF level
  - Implement smooth LED transitions
  - _Requirements: 2.2, 2.5_

- [x] 4.4 Add flickering animation


  - Implement flickering effect for level 5
  - Add red LED glow on spikes
  - Optimize animation performance
  - _Requirements: 2.3_

- [x] 4.5 Add damage elements to EMF meter




  - Add recessed display with screws
  - Add tape on battery cover
  - Add calibration note (handwritten)
  - Add scratches and wear
  - _Requirements: 2.4_

---

- [x] 5. Build ThermalTool component


  - Extract visual structure from ThermalScannerMock
  - Add props for cold spots
  - Integrate with ghost behavior
  - Test with temperature events
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [x] 5.1 Create ThermalTool component structure


  - Set up component file `src/components/Investigation/Tools/ThermalTool.tsx`
  - Extract casing structure from ThermalScannerMock
  - Apply ToolCasing with plastic-light material (yellowed)
  - Add texture layers (plastic, dust, wrinkled)
  - _Requirements: 3.1, 3.4_

- [x] 5.2 Implement thermal display

  - Create thermal gradient background
  - Add crosshair overlay
  - Add temperature readout
  - Add status indicators
  - _Requirements: 3.1_

- [x] 5.3 Add scan line animation

  - Implement moving scan line
  - Add scan line glow effect
  - Optimize animation performance
  - _Requirements: 3.3_

- [x] 5.4 Integrate cold spot visualization

  - Calculate cold spot positions from ghost data
  - Render blue thermal anomalies
  - Add blur and glow effects
  - Display anomaly warning when detected
  - _Requirements: 3.2, 3.5_

- [x] 5.5 Add damage elements to thermal scanner


  - Add dirty glass overlay
  - Add film grain effect
  - Add yellowing effect on plastic
  - Add scratches and wear
  - _Requirements: 3.4_

---

- [x] 6. Build CameraTool component


  - Extract visual structure from CameraViewfinderMock
  - Add props for film count and battery
  - Integrate with photo capture system
  - Test photo taking functionality
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 6.1 Create CameraTool component structure


  - Set up component file `src/components/Investigation/Tools/CameraTool.tsx`
  - Extract viewfinder frame from CameraViewfinderMock
  - Create 4:3 aspect ratio frame
  - Add texture layers (film grain, dust, wrinkled)
  - _Requirements: 4.1, 4.4_

- [x] 6.2 Implement viewfinder display

  - Add REC indicator with blink animation
  - Add live timestamp display
  - Add battery indicator
  - Add crosshairs and focus brackets
  - _Requirements: 4.2, 4.3_

- [x] 6.3 Add film grain and VHS effects

  - Implement film grain animation
  - Add VHS tracking lines
  - Add vignette effect
  - Add hair on lens effects
  - _Requirements: 4.4_

- [x] 6.4 Integrate photo capture

  - Connect to investigation supplies (film count)
  - Implement flash effect on capture
  - Decrement film count on capture
  - Handle zero film state
  - _Requirements: 4.3, 4.5_

- [x] 6.5 Add damage elements to camera


  - Add rust on frame corners
  - Add heavy vignetting
  - Add chromatic aberration
  - Add frame burn effects
  - _Requirements: 4.4_

---

- [x] 7. Build SpiritBoxTool component


  - Extract visual structure from SpiritBoxMock
  - Add props for waveform and EVP
  - Integrate with ghost behavior audio events
  - Test EVP response display
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 7.1 Create SpiritBoxTool component structure


  - Set up component file `src/components/Investigation/Tools/SpiritBoxTool.tsx`
  - Extract casing structure from SpiritBoxMock
  - Apply ToolCasing with plastic-dark material
  - Add texture layers (plastic, dust, wrinkled)
  - _Requirements: 5.1, 5.4_

- [x] 7.2 Implement oscilloscope display

  - Create oscilloscope screen with grid lines
  - Add frequency readout
  - Add static level indicator
  - Add physical knobs (visual only)
  - _Requirements: 5.1_

- [x] 7.3 Add waveform animation

  - Implement animated waveform display
  - Connect to audio activity data
  - Add waveform glow effect
  - Optimize animation performance
  - _Requirements: 5.2_

- [x] 7.4 Integrate EVP response display

  - Display EVP text overlay on waveform
  - Implement fade in/out animation
  - Connect to ghost behavior EVP events
  - _Requirements: 5.3_

- [x] 7.5 Add damage elements to spirit box


  - Add bent antenna
  - Add heavy dust and grime
  - Add tape patches
  - Add scratches and wear
  - _Requirements: 5.4_

---

- [ ] 8. Integrate tools with investigation system





  - Update InvestigationScreen to use new tool components
  - Connect tools to investigation context
  - Implement tool switching logic
  - Add transition effects
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 8.1 Update InvestigationScreen component




  - Import new tool components
  - Replace FieldScanner with conditional tool rendering
  - Connect tools to investigation context data
  - Maintain existing GPS/compass integration
  - _Requirements: 7.1, 7.2, 7.3, 10.1, 10.2_


- [x] 8.2 Implement tool switching logic



  - Update FieldKitDrawer to trigger tool changes
  - Add tool state management in investigation context
  - Preserve investigation state across tool switches
  - _Requirements: 6.2, 6.3_

- [x] 8.3 Add tool transition effects


  - Implement static burst transition effect
  - Add fade transition between tools
  - Ensure transitions complete in < 500ms
  - _Requirements: 6.2, 8.3_

- [x] 8.4 Update FieldKitDrawer UI


  - Add 007-style visual treatment to tool icons
  - Display active tool icon in drawer button
  - Add tool preview thumbnails (optional)
  - _Requirements: 6.1, 6.4_

- [x] 8.5 Connect tools to ghost behavior engine


  - Connect RadarTool to ghost position updates
  - Connect EMFTool to EMF event stream
  - Connect ThermalTool to temperature events
  - Connect CameraTool to photo capture system
  - Connect SpiritBoxTool to audio/EVP events
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 10.3_

---

- [ ] 9. Performance optimization





  - Profile tool rendering performance
  - Optimize texture loading
  - Optimize animations
  - Test on target mobile devices
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 9.1 Implement texture preloading


  - Preload all textures on investigation start
  - Show loading progress
  - Cache loaded textures in memory
  - _Requirements: 8.4_

- [x] 9.2 Optimize component rendering


  - Memoize tool components with React.memo
  - Use useMemo for expensive calculations
  - Avoid unnecessary re-renders
  - _Requirements: 8.1, 8.2_

- [x] 9.3 Optimize animations


  - Use CSS animations for simple effects
  - Use requestAnimationFrame for complex animations
  - Throttle updates to 60fps max
  - _Requirements: 8.1, 8.5_

- [x] 9.4 Profile and test performance


  - Measure frame rates during tool animations
  - Measure tool switching latency
  - Test on iPhone 12 and Pixel 5
  - Identify and fix performance bottlenecks
  - _Requirements: 8.1, 8.2, 8.3_

---

- [ ] 10. Testing and quality assurance
  - Write unit tests for tool components
  - Write integration tests for tool switching
  - Perform visual regression testing
  - Test backward compatibility
  - _Requirements: All_

- [ ]* 10.1 Write unit tests for base components
  - Test ToolContainer rendering
  - Test ToolCasing material variants
  - Test TextureLayer application
  - Test DamageLayer element positioning
  - Test label components
  - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ]* 10.2 Write unit tests for tool components
  - Test RadarTool with various ghost positions
  - Test EMFTool with different EMF levels
  - Test ThermalTool with cold spot data
  - Test CameraTool with film count changes
  - Test SpiritBoxTool with waveform data
  - _Requirements: 1.1-1.5, 2.1-2.5, 3.1-3.5, 4.1-4.5, 5.1-5.5_

- [ ]* 10.3 Write integration tests
  - Test tool switching preserves investigation state
  - Test GPS data flows to RadarTool correctly
  - Test ghost behavior events trigger tool updates
  - Test photo capture updates film count
  - Test EVP events display in SpiritBoxTool
  - _Requirements: 6.3, 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 10.4 Perform visual regression testing
  - Compare tool screenshots with playground mocks
  - Verify texture application accuracy
  - Verify damage element positioning
  - Verify color accuracy
  - _Requirements: 9.1, 9.4_

- [ ]* 10.5 Test backward compatibility
  - Verify GPS tracking still works
  - Verify compass integration still works
  - Verify ghost behavior engine still works
  - Verify investigation results still work
  - Verify dev mode controls still work
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

---

- [ ] 11. Final polish and documentation
  - Add code comments and documentation
  - Update README with new tool system
  - Create developer guide for adding new tools
  - Perform final QA pass
  - _Requirements: All_

- [ ] 11.1 Add code documentation
  - Document all tool component props
  - Document base component usage
  - Add JSDoc comments to public APIs
  - Document damage configuration format
  - _Requirements: All_

- [ ] 11.2 Update project documentation
  - Update README with tool system overview
  - Document tool switching mechanism
  - Document performance considerations
  - Add troubleshooting guide
  - _Requirements: All_

- [ ] 11.3 Create developer guide
  - Write guide for adding new tools
  - Document visual standards from 007 spec
  - Provide tool component template
  - Include best practices
  - _Requirements: All_

- [ ] 11.4 Final QA and cleanup
  - Remove unused code from old tool system
  - Clean up console logs
  - Verify all features work end-to-end
  - Test on multiple devices
  - _Requirements: All_

---

## Notes

- **Start with RadarTool:** It's the most complex and will establish patterns for other tools
- **Reuse mock code:** Copy visual structure directly from playground mocks, then add props
- **Test incrementally:** Test each tool in isolation before integration
- **Performance first:** Profile early and often, especially on mobile devices
- **Visual accuracy:** Use screenshot comparison to ensure 007 standard compliance
- **Backward compatibility:** Run full regression tests after each major change

## Estimated Effort

- Base components: 2-3 days
- RadarTool: 2-3 days
- EMFTool: 1-2 days
- ThermalTool: 1-2 days
- CameraTool: 1-2 days
- SpiritBoxTool: 1-2 days
- Integration: 2-3 days
- Performance optimization: 1-2 days
- Testing: 2-3 days
- Documentation: 1 day

**Total: 14-22 days**
