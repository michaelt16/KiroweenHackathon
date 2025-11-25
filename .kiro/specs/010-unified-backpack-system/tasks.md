# Implementation Plan - Unified Backpack System

## Overview

This implementation plan breaks down the unified backpack system into discrete, manageable tasks. Each task builds incrementally on previous work, ensuring the backpack component is functional, performant, and visually consistent with the analog horror aesthetic.

---

## Task List

- [x] 1. Set up backpack component structure and state management


  - Create base UnifiedBackpack component with mode prop
  - Implement backpack state management (isOpen, mode, activeTab)
  - Set up context switching logic
  - Add state persistence for last active tabs
  - _Requirements: 1.1, 1.2, 11.1, 11.2, 11.3_

- [x] 2. Implement BackpackButton component


  - Create bottom-center button with positioning
  - Add aged leather/canvas texture styling
  - Implement backpack icon with glow effect
  - Add active/inactive state styling
  - Implement tap animation and haptic feedback
  - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

- [x] 3. Implement BackpackDrawer component


  - Create slide-up drawer container
  - Add aged paper background with textures
  - Implement open/close animation (300ms)
  - Add worn edges and tape strip borders
  - Set drawer height to 50-60% of screen
  - _Requirements: 1.1, 1.3, 1.4, 14.1, 14.4_

- [x] 4. Implement TabBar component


  - Create tab bar with vintage folder tab aesthetic
  - Implement active/inactive tab styling
  - Add tab switching animation (fade, 200ms)
  - Apply typewriter font (Courier New)
  - Add debouncing for rapid tab switches
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 5. Implement context-aware tab rendering


  - Create tab configuration for Overworld mode (4 tabs)
  - Create tab configuration for Investigation mode (5 tabs)
  - Implement dynamic tab rendering based on mode
  - Add lazy loading for tab content
  - Implement tab content preloading
  - _Requirements: 2.1, 3.1, 11.4, 11.5_

- [x] 6. Implement ToolsTab component (Investigation Mode)


  - Create tool grid layout
  - Integrate ToolIcon components
  - Add tool names and descriptions
  - Implement active tool highlighting
  - Add aged card styling with textures
  - Implement tool selection and backpack close
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [x] 7. Implement PhotosTab component (Investigation Mode)


  - Create photo grid layout
  - Implement Polaroid-style photo frames
  - Add timestamps below photos
  - Add tape strips and rotation
  - Implement full-screen photo view on tap
  - Add empty state message
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [x] 8. Implement EvidenceDeductionTab component (Investigation Mode)


  - Create evidence checklist UI
  - Implement auto-checking when evidence is collected
  - Add ghost type filtering logic
  - Display possible ghosts with confidence indicators
  - Add case file aesthetic (red circles, handwritten notes)
  - Implement "Identify Ghost" button
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 12.1, 12.2, 12.3, 12.4, 12.5_

- [x] 9. Implement FieldJournalTab component (Investigation Mode)


  - Create journal entry layout
  - Organize entries by category (tool usage, ghost signs, safety)
  - Apply handwritten font (Caveat)
  - Add aged paper styling with coffee stains
  - Implement scrollable content
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [x] 10. Implement CodexTab component (Both Modes)


  - Create ghost list layout
  - Add Polaroid ghost photos
  - Display typewritten stats
  - Add handwritten notes
  - Implement mode-specific behavior (full access vs read-only)
  - Add scrollable ghost list
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

- [x] 11. Implement InventoryTab component (Overworld Mode)


  - Create supply list layout
  - Display film count with icon
  - Display boost count with icon
  - Display charm count with icon
  - Apply typewriter font for counts
  - Add equipment log aesthetic
  - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5_

- [x] 12. Implement ProfileTab component (Overworld Mode)


  - Create profile layout
  - Display player stats (level, XP, achievements)
  - Add ID card aesthetic
  - Apply analog horror styling
  - _Requirements: 2.4_

- [x] 13. Implement SettingsTab component (Overworld Mode)


  - Create settings layout
  - Add game settings options
  - Add preferences controls
  - Apply analog horror styling
  - _Requirements: 2.5_

- [x] 14. Apply analog horror styling across all tabs


  - Add wrinkled paper texture overlays (multiply, 0.3-0.4 opacity)
  - Add dust overlays (overlay, 0.15-0.2 opacity)
  - Add coffee stains (2-3 per tab, random positions)
  - Add tape strips (1-2 per tab, crooked)
  - Add scratches and wear elements
  - _Requirements: 14.1, 14.2, 14.3, 14.5_

- [x] 15. Implement performance optimizations

  - Add texture caching on first load
  - Implement lazy loading for inactive tabs
  - Add tab content unloading after 5 seconds
  - Optimize animations (use transform and opacity)
  - Add debouncing for rapid interactions
  - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

- [x] 16. Integrate backpack with Overworld screen


  - Replace existing inventory button with BackpackButton
  - Connect backpack to Overworld state
  - Test tab switching in Overworld mode
  - Verify analog horror styling consistency
  - _Requirements: 1.5, 2.1_

- [x] 17. Integrate backpack with Investigation screen

  - Replace existing FieldKitDrawer with UnifiedBackpack
  - Connect backpack to Investigation state
  - Test tool selection from ToolsTab
  - Test evidence tracking in EvidenceDeductionTab
  - Verify analog horror styling consistency
  - _Requirements: 1.5, 3.1_

- [x] 18. Implement context switching between modes

  - Add mode change detection
  - Implement automatic tab configuration switching
  - Test tab state preservation
  - Verify smooth transitions
  - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5_

- [x] 19. Test and polish

  - Test backpack on iOS Safari 14+
  - Test backpack on Android Chrome 90+
  - Verify 60fps animations
  - Test touch gestures and interactions
  - Fix any visual inconsistencies
  - _Requirements: 13.1, 13.2_

- [ ] 20. Final checkpoint - Ensure all tests pass


  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Each task should be completed in order
- Test each component individually before integration
- Follow the 006 Analog Horror Component System for styling
- Reference the 011 Unified Backpack System steering file for visual guidelines
- Maintain performance targets (300ms animations, 200ms tab switching)

---

**Status**: Ready for Implementation
**Last Updated**: 2024
