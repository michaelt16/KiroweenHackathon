# Implementation Plan

- [ ] 1. Set up texture assets and base styling system
  - Verify all required texture assets exist in `/assets/texture/`
  - Create shared constants for colors, materials, and dimensions
  - Set up texture preloading utility
  - _Requirements: 1.3, 4.1, 4.2, 4.3_

- [ ] 2. Transform CaseHandle component
- [ ] 2.1 Implement physical latch styling
  - Replace digital gradient with heavy steel gradient
  - Add corner screws (4 screws, 8px diameter)
  - Add etched "FIELD KIT" label (Courier New, etched style)
  - Apply metal texture overlay (0.6 opacity)
  - Add rust and dust layers
  - _Requirements: 8.1, 8.2_

- [ ] 2.2 Implement handle state styling
  - Add deep inset shadows for closed state
  - Add lifted shadows and teal glow for open state
  - Implement smooth transition between states
  - Add beveled edges (8px depth)
  - _Requirements: 8.3, 8.4, 8.5_

- [ ]* 2.3 Write property test for handle state reflection
  - **Property 8: Handle reflects case state**
  - **Validates: Requirements 8.1, 8.3, 8.4, 8.5**

- [ ] 3. Transform CaseInterior component
- [ ] 3.1 Implement dark plastic case interior
  - Replace flat background with dark plastic gradient
  - Add smooth plastic texture (multiply, 0.5 opacity)
  - Add scratched plastic overlay (overlay, 0.15 opacity)
  - Add dust layer (screen, 0.08 opacity)
  - Add vignette for depth (multiply, 0.3 opacity)
  - _Requirements: 1.1, 1.2, 1.5_

- [ ] 3.2 Add physical case details
  - Add 4 large corner screws (14px diameter)
  - Add reinforcement plates around screws
  - Add 4px border with top highlight
  - Add multiple inset shadows for cavity effect
  - Add weld seams (2-3 horizontal lines)
  - _Requirements: 1.3, 4.2_

- [ ]* 3.3 Write property test for case interior materials
  - **Property 1: Case interior always displays physical materials**
  - **Validates: Requirements 1.1, 1.2, 1.3**

- [ ] 4. Create InnerLidArea component
- [ ] 4.1 Implement inner lid section
  - Create 60px height section at top
  - Add slightly lighter plastic background (#2a2a2a)
  - Add horizontal seam line at bottom (weld effect)
  - Position above tab dividers
  - _Requirements: 1.4_

- [ ] 4.2 Add taped notes and labels
  - Add 2-3 masking tape strips (crooked, -8deg to 8deg rotation)
  - Add handwritten note: "FIELD INVESTIGATION KIT" (Caveat, 16px)
  - Add serial number: "FK-1985-A7" (Courier, 8px, etched style)
  - Add optional small Polaroid photo (40px × 40px)
  - _Requirements: 1.4, 2.3_

- [ ] 5. Transform TabDividers component
- [ ] 5.1 Implement physical folder tab styling
  - Replace digital tabs with dark plastic gradient
  - Add beveled edges for active tabs (raised 2px)
  - Add recessed appearance for inactive tabs
  - Use Courier New font (11px, uppercase, 1px letter-spacing)
  - Add teal bottom border (3px) for active tab
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 5.2 Implement tab interaction states
  - Add hover state with subtle teal border and background
  - Add active state with raised appearance and glow
  - Add inactive state with darker, recessed appearance
  - Implement smooth transitions (0.2s ease)
  - _Requirements: 7.4, 7.5_

- [ ]* 5.3 Write property test for tab depth consistency
  - **Property 7: Tab system maintains physical depth**
  - **Validates: Requirements 7.1, 7.2, 7.4**

- [ ] 6. Create FoamCutoutGrid component
- [ ] 6.1 Implement EVA foam grid layout
  - Create CSS Grid with 2 columns
  - Add 16px gap between cutouts
  - Add 20px padding around grid
  - Add EVA foam background (#2a2a2a)
  - Add subtle foam texture overlay
  - _Requirements: 1.2, 2.1_

- [ ] 6.2 Create foam cutout slots
  - Create 140px × 140px cutout per tool
  - Add rounded rectangle shape
  - Add deep inset shadow (0 4px 12px rgba(0,0,0,0.9))
  - Add 2px darker foam edge border
  - Add 8px padding inside cutout
  - _Requirements: 2.1, 2.2_

- [ ] 7. Transform PhysicalToolDevice component
- [ ] 7.1 Implement physical device styling
  - Create 120px × 120px device container
  - Apply tool-specific material (metal gradient or black plastic)
  - Add corner screws (4 screws, 6px diameter)
  - Add drop shadow for lifting from foam (0 6px 16px rgba(0,0,0,0.8))
  - Apply appropriate texture overlays based on material
  - _Requirements: 2.1, 2.2, 2.5_

- [ ] 7.2 Add LED indicator
  - Create 8px circle in top-right corner
  - Implement green (ready), yellow (low battery), off states
  - Add pulsing animation for active tool
  - Add glow effect for lit LEDs
  - _Requirements: 2.4_

- [ ] 7.3 Add tape label
  - Create 60px × 18px tape strip
  - Add random rotation (-8deg to 8deg)
  - Add tape texture background
  - Add tool name in Caveat font (11px, handwritten)
  - Add shadow (0 2px 4px rgba(0,0,0,0.5))
  - Position at bottom or angled on side
  - _Requirements: 2.3_

- [ ] 7.4 Implement active tool state
  - Add teal glow (0 0 16px rgba(45, 212, 191, 0.6))
  - Increase drop shadow (0 8px 20px rgba(0,0,0,0.9))
  - Add subtle scale (1.02)
  - Make LED pulse with green glow
  - _Requirements: 2.4, 5.2_

- [ ]* 7.5 Write property test for tool device analog aesthetic
  - **Property 2: Tool devices maintain analog aesthetic**
  - **Validates: Requirements 2.1, 2.2, 2.5**

- [ ] 8. Create SuppliesClipboard component
- [ ] 8.1 Implement clipboard base
  - Create full-width, 180px height container
  - Add aged paper background (#d8d4c8)
  - Add wrinkled paper texture overlay (multiply, 0.4 opacity)
  - Add dust overlay (overlay, 0.2 opacity)
  - Add coffee stain in bottom-right corner
  - Add slight rotation (-1deg)
  - _Requirements: 3.3, 3.4_

- [ ] 8.2 Add clipboard header
  - Add metal clip at top (40px wide)
  - Add "FIELD SUPPLIES" text (Courier New, 14px, uppercase, stamped effect)
  - Add hand-drawn red underline
  - Center header at top
  - _Requirements: 3.3_

- [ ] 9. Create MechanicalCounter component (Film)
- [ ] 9.1 Implement mechanical counter styling
  - Create 100px × 60px container
  - Add dark metal gradient background
  - Add corner screws (4 screws, 6px diameter)
  - Add scratches and wear on metal surface
  - Add "FILM ROLLS" label (Courier, 9px, etched below)
  - _Requirements: 3.1_

- [ ] 9.2 Implement odometer display
  - Create 60px × 40px inset display window
  - Add black LCD-style background (#0a0a0a)
  - Display number in Courier New (24px, bold, white)
  - Add multiple text shadows for 3D effect
  - Add 2px inset shadow border
  - Add 8px padding
  - _Requirements: 3.1, 3.5_

- [ ] 10. Create LEDGauge component (Boosts)
- [ ] 10.1 Implement LED gauge housing
  - Create 100px × 60px container
  - Add dark plastic housing background
  - Add "SCANNER BOOSTS" label (Courier, 9px, etched)
  - _Requirements: 3.2_

- [ ] 10.2 Implement LED bar segments
  - Create 5 horizontal segments (12px × 30px each)
  - Add 4px gap between segments
  - Implement active state (teal #2dd4bf with glow)
  - Implement inactive state (dark gray #1a1a1a with outline)
  - Add bloom effect for active LEDs
  - Add 0.2s transition for value changes
  - _Requirements: 3.2, 3.5_

- [ ] 11. Create AnalogIndicator component (Charms)
- [ ] 11.1 Implement analog indicator
  - Create 100px × 60px container
  - Add aged paper card background
  - Display large number (Courier, 32px, bold)
  - Add hand-drawn tally marks below number
  - Add "CHARMS" label (Caveat, 12px, handwritten)
  - Add rough torn edges
  - Add single tape strip at top
  - _Requirements: 3.2_

- [ ]* 11.2 Write property test for supplies physical representation
  - **Property 3: Supplies counters use physical representations**
  - **Validates: Requirements 3.1, 3.2, 3.4**

- [ ] 12. Integrate all components into FieldKitDrawer
- [ ] 12.1 Update FieldKitDrawer structure
  - Replace existing container with CaseInterior
  - Add InnerLidArea at top
  - Update TabDividers with new styling
  - Replace tool buttons with FoamCutoutGrid + PhysicalToolDevice
  - Add SuppliesClipboard to Tools tab
  - _Requirements: 5.1, 5.3_

- [ ] 12.2 Wire up component interactions
  - Connect tool selection to PhysicalToolDevice onClick
  - Update handle icon when tool changes
  - Connect supplies data to counter components
  - Maintain existing state management
  - Preserve all existing callbacks
  - _Requirements: 5.2, 5.4, 5.5_

- [ ]* 12.3 Write property test for interaction behavior preservation
  - **Property 5: Interactions preserve existing behavior**
  - **Validates: Requirements 5.1, 5.2, 5.3, 5.4, 5.5**

- [ ] 13. Apply global texture overlays
- [ ] 13.1 Add texture overlay system
  - Create TextureOverlays component
  - Add dust layer (screen, 0.08 opacity, z-index: 100)
  - Add scratch layer (overlay, 0.15 opacity, z-index: 101)
  - Add vignette layer (multiply, 0.3 opacity, z-index: 102)
  - Add depth shadows (z-index: 103)
  - _Requirements: 4.1, 4.2, 4.3, 4.5_

- [ ] 13.2 Add fingerprint smudges
  - Add 3-5 fingerprint smudges on tool surfaces
  - Use radial gradient (rgba(0,0,0,0.3) to transparent)
  - Add blur filter (3px)
  - Randomize positions
  - _Requirements: 4.4_

- [ ]* 13.3 Write property test for texture layer consistency
  - **Property 4: Texture layers are consistently applied**
  - **Validates: Requirements 4.1, 4.2, 4.3, 4.4, 4.5**

- [ ] 14. Ensure visual consistency with investigation tools
- [ ] 14.1 Verify material consistency
  - Compare metal gradients with Radar/EMF tools
  - Compare plastic textures with Camera/Thermal tools
  - Verify texture opacity values match Spec 007
  - Ensure corner screws match tool designs
  - _Requirements: 6.1, 6.4, 6.5_

- [ ] 14.2 Verify shadow and depth consistency
  - Compare inset shadows with investigation tools
  - Verify beveled edge depths match (8-12px)
  - Ensure drop shadows match tool lifting effects
  - Verify z-index layering matches Spec 007
  - _Requirements: 6.2, 6.3_

- [ ]* 14.3 Write property test for visual consistency
  - **Property 6: Visual consistency with investigation tools**
  - **Validates: Requirements 6.1, 6.2, 6.3, 6.4, 6.5**

- [ ] 15. Checkpoint - Ensure all tests pass, ask the user if questions arise

- [ ] 16. Optimize performance
- [ ] 16.1 Implement texture preloading
  - Preload all textures on app initialization
  - Cache textures in memory
  - Add loading indicators if needed
  - Implement retry logic for failed loads
  - _Requirements: All (performance)_

- [ ] 16.2 Optimize animations
  - Use transform and opacity only for animations
  - Avoid animating height, width, top, left
  - Debounce rapid interactions (300ms)
  - Reduce texture layers on low-end devices
  - _Requirements: 5.3 (smooth transitions)_

- [ ] 16.3 Implement responsive optimizations
  - Reduce texture complexity on mobile
  - Simplify shadows for performance
  - Ensure minimum 44px tap targets
  - Test on various screen sizes
  - _Requirements: All (mobile support)_

- [ ] 17. Add accessibility features
- [ ] 17.1 Implement screen reader support
  - Add ARIA labels for all interactive elements
  - Announce tool selection changes
  - Describe supply counts
  - Indicate case open/closed state
  - _Requirements: 5.1, 5.2 (accessibility)_

- [ ] 17.2 Implement keyboard navigation
  - Tab through tools
  - Arrow keys for tab switching
  - Enter/Space to select
  - Escape to close case
  - _Requirements: 5.1, 5.2 (accessibility)_

- [ ] 18. Final polish and testing
- [ ] 18.1 Visual regression testing
  - Capture screenshots of all states
  - Compare with design specifications
  - Verify texture loading
  - Check z-index stacking
  - Test hover states
  - _Requirements: All_

- [ ] 18.2 Cross-browser testing
  - Test on Chrome 90+
  - Test on Firefox 88+
  - Test on Safari 14+
  - Test on Edge 90+
  - Verify fallbacks work
  - _Requirements: All_

- [ ] 18.3 Integration testing
  - Test full Field Kit flow (open → select tool → close)
  - Test tab switching
  - Test supply counter updates
  - Test tool selection updates handle icon
  - Verify state persistence
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 19. Final Checkpoint - Ensure all tests pass, ask the user if questions arise
