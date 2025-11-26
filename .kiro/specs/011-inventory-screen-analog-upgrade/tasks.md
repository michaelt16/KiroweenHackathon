# Implementation Plan

- [x] 1. Create PhysicalToolDevice component





  - Create new component file `PhysicalToolDevice.tsx`
  - Implement material-based rendering (metal vs plastic)
  - Add corner screws (4 per device, 4px diameter)
  - Add device icon rendering (32-40px centered)
  - Add LED status indicator (6px circle, top-right)
  - Add tape label with handwritten text (Caveat font)
  - Add drop shadow for depth (0 4px 12px rgba(0,0,0,0.85))
  - Apply texture layers (base material, scratches, dust, fingerprints)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

- [ ]* 1.1 Write property test for PhysicalToolDevice material consistency
  - **Property 1: Tool devices render with authentic materials**
  - **Validates: Requirements 1.1, 1.2**

- [ ]* 1.2 Write property test for PhysicalToolDevice required elements
  - **Property 2: All tool devices include required physical elements**
  - **Validates: Requirements 1.3, 1.4, 1.5**

- [x] 2. Create MechanicalFilmCounter component





  - Create new component file `MechanicalFilmCounter.tsx`
  - Implement metal housing with corner screws
  - Create deeply inset display window (80px × 45px)
  - Add black LCD background (#0a0a0a)
  - Implement white glowing digits with 3D effect (multiple text shadows)
  - Add etched label "FILM ROLLS" below display
  - Apply metal texture overlays
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ]* 2.1 Write property test for MechanicalFilmCounter appearance
  - **Property 3: Film counter displays as mechanical device**
  - **Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5**

- [x] 3. Create LEDBoostGauge component







  - Create new component file `LEDBoostGauge.tsx`
  - Implement dark plastic housing with inset shadows
  - Create horizontal LED bar with 5 segments
  - Style active segments (teal glow with bloom effect)
  - Style inactive segments (dark gray with outline)
  - Add segment spacing (5px gaps)
  - Add etched label "SCANNER BOOSTS"
  - Add housing corner screws
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

- [ ]* 3.1 Write property test for LEDBoostGauge segments
  - **Property 4: Boost gauge displays as LED bar**
  - **Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5**
-

- [x] 4. Create AnalogCharmsIndicator component



  - Create new component file `AnalogCharmsIndicator.tsx`
  - Implement aged paper card background (#d8d4c8)
  - Add large number display (Courier New, 36px, bold)
  - Generate hand-drawn tally marks below number
  - Add handwritten label "CHARMS" (Caveat, 14px)
  - Create rough torn edges with clipPath
  - Add tape strip at top (50px × 15px, -5deg rotation)
  - Apply paper texture overlay (wrinkled, 0.3 opacity)
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ]* 4.1 Write property test for AnalogCharmsIndicator
  - **Property 5: Charms indicator displays as analog card**
  - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

- [ ] 5. Integrate new components into InventoryScreen






  - Replace tool emoji icons with PhysicalToolDevice components
  - Replace film LED counter with MechanicalFilmCounter
  - Replace boosts LED counter with LEDBoostGauge
  - Replace charms LED counter with AnalogCharmsIndicator
  - Update grid layouts for new component sizes
  - Ensure responsive behavior on mobile/desktop
  - Test tool clicking functionality
  - _Requirements: 1.1, 2.1, 3.1, 4.1, 10.1, 10.2, 10.4_

- [x] 6. Enhance foam cutout styling





  - Update foam cutout shadows to multi-layer deep inset
  - Add EVA foam texture with grain pattern
  - Create darker foam edges (2px border, #1a1a1a)
  - Adjust tool spacing to 10px padding
  - Update foam color gradient
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ]* 6.1 Write property test for foam cutout depth
  - **Property 7: Foam cutouts maintain realistic depth**
  - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**
- [x] 7. Add damage elements system






- [ ] 7. Add damage elements system

  - Create damage element generation utility
  - Add rust spots (5-7, using brownrust.png texture)
  - Add paint chips at corners (4-6, with clipPath)
  - Add fingerprint smudges (3-5 per visible area)
  - Add tape patches with handwritten notes (3-5, crooked)
  - Position damage elements across case exterior and interior
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ]* 7.1 Write property test for damage element quantities
  - **Property 6: Case displays extensive damage elements**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

- [x] 8. Add physical details system


  - Add serial number (e.g., "FK-1985-A7") with etched styling
  - Add calibration notes (e.g., "cal. 03/19") with handwritten font
  - Add warning labels on tape patches
  - Add manufacturing stamps (e.g., "INSPECTED", "QC PASS")
  - Add weld lines/seams (3-5 horizontal/vertical)
  - Position details appropriately across case
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [ ]* 8.1 Write property test for physical details presence
  - **Property 9: Physical details are present**
  - **Validates: Requirements 8.1, 8.2, 8.3, 8.4, 8.5**

- [x] 9. Upgrade hardware elements


  - Enhance label plate with etched metal styling
  - Upgrade corner screws with radial gradients and screw slots
  - Improve latch appearance with realistic metal gradients
  - Enhance handle with proper beveling and depth shadows
  - Upgrade rivets with 3D appearance
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ]* 9.1 Write property test for hardware authentic styling
  - **Property 8: Hardware elements use authentic styling**
  - **Validates: Requirements 7.1, 7.2, 7.3, 7.4, 7.5**

- [ ] 10. Enhance tool viewer modal styling



  - Update close button styling to match physical aesthetic
  - Ensure modal maintains analog-horror styling
  - Verify smooth transitions feel physical
  - Test tool viewer for all 5 tools
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [ ]* 10.1 Write property test for tool viewer analog aesthetic
  - **Property 10: Tool viewer maintains analog aesthetic**
  - **Validates: Requirements 9.1, 9.2, 9.3, 9.4, 9.5**

- [ ] 11. Checkpoint - Ensure all tests pass, ask the user if questions arise

- [ ]* 12. Write property test for functionality preservation
  - **Property 11: Existing functionality is preserved**
  - **Validates: Requirements 10.1, 10.2, 10.3, 10.4, 10.5**

- [ ]* 13. Write integration tests
  - Test full inventory flow (navigate, view tools, check supplies, back)
  - Test cross-component interactions
  - Test responsive behavior on mobile/desktop
  - Test supply counter updates when context changes

- [ ]* 14. Perform visual regression testing
  - Capture screenshots of case exterior with damage
  - Capture screenshots of case interior with tool devices
  - Capture screenshots of each supply counter type
  - Capture screenshots of tool viewer for each tool
  - Compare mobile vs desktop layouts
  - Verify texture loading and layering

- [ ] 15. Optimize performance
  - Preload all texture assets on screen mount
  - Reduce damage element count on low-end devices
  - Simplify shadows for mobile
  - Test performance on target devices
  - Implement lazy loading for non-critical elements
  - _Requirements: 10.4_

- [ ] 16. Final polish and accessibility
  - Add proper ARIA labels for all interactive elements
  - Implement keyboard navigation
  - Test screen reader compatibility
  - Add high contrast mode support
  - Test color-blind friendly LED colors
  - Verify minimum tap target sizes (44px)
  - Final visual polish and adjustments
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ] 17. Final Checkpoint - Ensure all tests pass, ask the user if questions arise
