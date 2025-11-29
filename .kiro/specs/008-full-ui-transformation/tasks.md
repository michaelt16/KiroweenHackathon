# 008 – Full UI Transformation – Tasks

## Phase 1: Foundation and Audit

- [ ] 1.1 Audit existing components and assets
  - Review Spec 006 (Analog Horror Component System)
  - Review Spec 007 (Investigation Tools Design System)
  - List all available texture assets
  - Document current screen implementations
  - Identify gaps and missing components
  - _Requirements: All_

- [ ] 1.2 Set up global analog horror styles
  - Create `analog-horror.css` with color variables
  - Define typography classes (handwritten, typewriter)
  - Set up texture utility functions
  - Create damage element mixins
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 1.3 Create base paper components (if missing)
  - Ensure `PaperBase` component exists
  - Ensure `StickyNote` component exists
  - Ensure `PolaroidPhoto` component exists
  - Ensure `Tape` component exists
  - Ensure `PushPin` component exists
  - _Requirements: 2.1, 3.1, 4.1_

---

## Phase 2: Map Screen (Already Complete)

- [x] 2.1 Map screen transformation
  - ✅ Full-screen corkboard background
  - ✅ Paper map pinned with push pins
  - ✅ Desaturated, photocopy-style map
  - ✅ Red push pins with paper tags
  - ✅ Hand-drawn red circles
  - ✅ Polaroid photos with red thread
  - ✅ Sticky notes overlapping edges
  - ✅ Masking tape strips
  - _Requirements: 1.1-1.10_

---

## Phase 3: Codex Screen Transformation

- [ ] 3.1 Transform Codex container
  - Replace modern card layout with aged paper background
  - Apply `PaperBase` component
  - Add texture overlays (wrinkled paper, dust)
  - Add damage elements (coffee stains, tape, scratches)
  - Apply aged paper colors
  - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6_

- [ ] 3.2 Transform ghost entry cards
  - Replace modern cards with journal page style
  - Use handwritten typography (Caveat) for titles
  - Use typewriter typography (Courier New) for data
  - Add damage elements per entry
  - Apply texture overlays
  - _Requirements: 2.2, 2.3, 2.4, 2.5, 2.6_

- [ ] 3.3 Add Polaroid photos
  - Replace modern image displays with `PolaroidPhoto` component
  - Add tape to photos
  - Apply slight rotation
  - Add film grain overlay
  - _Requirements: 2.8_

- [ ] 3.4 Implement transitions
  - Add static burst between entries
  - Add glitch effect on updates
  - Add fade transitions
  - _Requirements: 2.7, 6.1_

- [ ] 3.5 Mobile optimization
  - Ensure text remains legible
  - Adjust texture opacity if needed
  - Maintain touch targets
  - _Requirements: 7.1, 7.2, 7.3_

---

## Phase 4: Profile Screen Transformation

- [ ] 4.1 Transform Profile container
  - Replace modern card layout with ID badge/case file style
  - Apply `PaperBase` component (card stock variant)
  - Add texture overlays
  - Add damage elements (fingerprints, stains, wear)
  - Apply aged paper colors
  - _Requirements: 3.1, 3.4, 3.5, 3.6_

- [ ] 4.2 Transform player stats display
  - Use typewriter typography (Courier New) for data
  - Use handwritten typography (Caveat) for notes
  - Add damage elements (scribbles, stains)
  - Apply texture overlays
  - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [ ] 4.3 Add achievement stamps
  - Create stamp component with tape
  - Apply slight rotation
  - Add damage elements
  - _Requirements: 3.7_

- [ ] 4.4 Mobile optimization
  - Ensure text remains legible
  - Adjust texture opacity if needed
  - Maintain touch targets
  - _Requirements: 7.1, 7.2, 7.3_

---

## Phase 5: Inventory Screen Transformation

- [ ] 5.1 Transform Inventory container
  - Replace modern list layout with equipment log style
  - Apply `PaperBase` component
  - Add texture overlays
  - Add damage elements (checkmarks, scribbles, stains)
  - Apply aged paper colors
  - _Requirements: 4.1, 4.4, 4.5, 4.6_

- [ ] 5.2 Transform item list
  - Use typewriter typography (Courier New) for item names
  - Use handwritten typography (Caveat) for notes
  - Add checkmarks and scribbles
  - Apply damage elements
  - _Requirements: 4.2, 4.3, 4.4_

- [ ] 5.3 Add collection feedback
  - Implement static burst on item collection
  - Add glitch effect
  - Add subtle screen shake
  - _Requirements: 4.7_

- [ ] 5.4 Mobile optimization
  - Ensure text remains legible
  - Adjust texture opacity if needed
  - Maintain touch targets
  - _Requirements: 7.1, 7.2, 7.3_

---

## Phase 6: Navigation and Transitions

- [ ] 6.1 Implement screen transitions
  - Add static burst between document screens
  - Add VHS tracking lines to investigation tools
  - Add page turn effects
  - Add glitch transitions
  - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 6.2 Ensure consistency
  - Review all screens for consistent aesthetic
  - Verify texture usage is consistent
  - Verify typography usage is consistent
  - Verify damage element distribution
  - _Requirements: 6.4, NFR-1_

---

## Phase 7: Performance and Optimization

- [ ] 7.1 Optimize texture loading
  - Cache texture images
  - Lazy-load non-critical textures
  - Optimize texture sizes for web
  - _Requirements: 8.1, 8.4, 8.5_

- [ ] 7.2 Optimize effects
  - Use CSS transforms (GPU-accelerated)
  - Use CSS filters (GPU-accelerated)
  - Limit animation complexity
  - _Requirements: 8.2_

- [ ] 7.3 Performance testing
  - Test on target devices
  - Maintain 60fps on animations
  - Optimize as needed
  - _Requirements: 8.3_

---

## Phase 8: Testing and Polish

- [ ] 8.1 Functional testing
  - Verify all game functionality works
  - Verify all navigation works
  - Verify all interactions work
  - _Requirements: NFR-4_

- [ ] 8.2 Visual consistency testing
  - Review all screens side-by-side
  - Verify consistent aesthetic
  - Verify texture usage
  - Verify typography usage
  - _Requirements: NFR-1_

- [ ] 8.3 Accessibility testing
  - Verify text readability
  - Verify contrast ratios
  - Verify touch target sizes
  - _Requirements: NFR-2_

- [ ] 8.4 Mobile testing
  - Test on various mobile devices
  - Verify responsive behavior
  - Verify performance
  - _Requirements: 7.1-7.5_

- [ ] 8.5 Final polish
  - Adjust texture opacities
  - Fine-tune damage element placement
  - Optimize transitions
  - Final visual review
  - _Requirements: All_

---

## Dependencies

- Spec 006: Analog Horror Component System (base components)
- Spec 007: Investigation Tools Design System (tool designs)
- Texture assets in `/assets/texture/`
- Existing game functionality (preserve all)

---

## Notes

- Map screen is already complete and serves as reference
- Investigation tools are already complete (Spec 007)
- Focus on Codex, Profile, and Inventory screens
- Maintain all existing functionality
- Use existing texture assets
- Follow established design patterns



