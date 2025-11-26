# 012 – Investigation Drawer Refinement – Tasks

## Phase 1: Component Extraction and Preparation ✅ COMPLETE

- [x] 1.1 Verify GhostCodexContent component
  - ✅ Confirmed GhostCodexContent.tsx exists and works standalone
  - ✅ Verified it renders correctly without wood table wrapper
  - ✅ Tested in both /codex route and drawer context
  - _Requirements: 4.1, 4.2, 4.7_

- [x] 1.2 Update BackpackDrawer backdrop
  - ✅ Changed backdrop opacity from 0.5 to 0.2
  - ✅ Tested visual appearance
  - _Requirements: 5.1_

- [x] 1.3 Reduce GhostCodexContent padding
  - ✅ Changed padding from 20px/40px to 12px/20px
  - ✅ Tested on mobile and desktop
  - _Requirements: 4.5_

---

## Phase 2: Photos Tab Transformation ✅ COMPLETE

- [x] 2.1 Create TapeLabel component
  - ✅ Created inline tape label styling
  - ✅ Supports text, rotation, and styling
  - ✅ Uses handwritten font (Caveat)
  - ✅ Applied tape texture and shadow
  - _Requirements: 1.4, 1.5_

- [x] 2.2 Transform Photos tab layout
  - ✅ Removed PaperBase wrapper
  - ✅ Added dark surface background (#1a1612)
  - ✅ Created flex container for Polaroid grid
  - ✅ Added padding and overflow handling
  - _Requirements: 1.1, 1.7_

- [x] 2.3 Update Polaroid display
  - ✅ Changed damage prop to "light"
  - ✅ Applied natural rotations (-3deg to 3deg)
  - ✅ Used timestamp for captions
  - ✅ Adjusted spacing and gap (32px)
  - _Requirements: 1.2, 1.3_

- [x] 2.4 Add Photos tab labels
  - ✅ Added title tape label at top
  - ✅ Added count tape label at bottom
  - ✅ Ready for empty state with tape label
  - _Requirements: 1.4, 1.5, 1.6_

- [x] 2.5 Test Photos tab
  - ✅ Tested in playground with 3 photos
  - ✅ Verified visual appearance
  - ✅ Checked rotation variety
  - _Requirements: 1.1-1.7_

---

## Phase 3: Evidence Tab Transformation ✅ COMPLETE

- [x] 3.1 Create ClipboardClip component
  - ✅ Created metal clip visual element
  - ✅ Positioned at top center
  - ✅ Applied metallic gradient and shadow
  - _Requirements: 2.1_

- [x] 3.2 Create EvidenceChecklist component
  - ✅ Displays evidence items with checkmarks/circles
  - ✅ Uses handwritten font (Caveat, 18px)
  - ✅ Applied appropriate colors (found vs not found)
  - _Requirements: 2.4, 2.5_

- [x] 3.3 Create SuspectsBox component
  - ✅ Created highlighted box with yellow background
  - ✅ Displays suspects with confidence levels
  - ✅ Uses red circles for high confidence
  - ✅ Uses handwritten font (Caveat, 20px)
  - _Requirements: 2.6, 2.7_

- [x] 3.4 Create IdentifyButton component
  - ✅ Styled as handwritten button
  - ✅ Uses Caveat font (22px)
  - ✅ Applied red background and shadow
  - _Requirements: 2.8_

- [x] 3.5 Transform Evidence tab layout
  - ✅ Removed PaperBase wrapper
  - ✅ Added dark background (#1a1612)
  - ✅ Created clipboard container with notepad paper
  - ✅ Applied slight rotation (-0.5deg)
  - _Requirements: 2.1, 2.2, 2.9_

- [x] 3.6 Assemble Evidence tab
  - ✅ Integrated all sub-components
  - ✅ Added clipboard clip at top
  - ✅ Added title, checklist, suspects, button
  - ✅ Tested layout and spacing
  - _Requirements: 2.1-2.9_

- [x] 3.7 Test Evidence tab
  - ✅ Tested in playground with sample evidence
  - ✅ Verified visual appearance
  - ✅ Checked handwritten text readability
  - _Requirements: 2.1-2.9_

---

## Phase 4: Field Journals Tab Enhancement ✅ COMPLETE

- [x] 4.1 Create CollapsibleJournalSelector component
  - ✅ Created collapsed state button
  - ✅ Shows current journal info (date, location, agent, status, threat)
  - ✅ Added dropdown arrow indicator (▼/▲)
  - _Requirements: 3.1, 3.2, 3.3_

- [x] 4.2 Implement selector expansion
  - ✅ Added isExpanded state
  - ✅ Created expanded list container
  - ✅ Applied max height (400px) and scrolling
  - ✅ Styled journal list items
  - _Requirements: 3.4, 3.5_

- [x] 4.3 Implement selector collapse
  - ✅ Auto-collapse on journal selection
  - ✅ Updated arrow indicator
  - ✅ Resets to first page on selection
  - _Requirements: 3.6, 3.7_

- [x] 4.4 Add click-to-advance functionality
  - ✅ Added onClick handler to journal page container
  - ✅ Increments currentPage if not at end
  - ✅ Updated cursor style (pointer when clickable)
  - _Requirements: 3.9, 3.10_

- [x] 4.5 Update FieldJournalsScreen
  - ✅ Replaced journal list with CollapsibleJournalSelector
  - ✅ Added page click handler
  - ✅ Maintained existing pagination buttons
  - ✅ Tested page navigation
  - _Requirements: 3.1-3.10_

- [x] 4.6 Test Field Journals tab
  - ✅ Tested in production with real journals
  - ✅ Tested selector expand/collapse
  - ✅ Tested page click advancement
  - ✅ Verified pagination buttons work
  - _Requirements: 3.1-3.10_

---

## Phase 5: Codex Tab Integration ✅ COMPLETE

- [x] 5.1 Update Codex tab in InvestigationDrawerMock
  - ✅ Replaced implementation with GhostCodexContent
  - ✅ Removed wood table wrapper
  - ✅ Added simple container with overflow
  - _Requirements: 4.1, 4.2_

- [x] 5.2 Verify Codex tab styling
  - ✅ Confirmed manila folder tabs display correctly
  - ✅ Verified brown folder frame (#c4b49a)
  - ✅ Checked aged paper content
  - ✅ Tested ghost entry display
  - _Requirements: 4.3, 4.4, 4.6_

- [x] 5.3 Test Codex tab
  - ✅ Compared with /codex route visually
  - ✅ Verified all ghost entries work
  - ✅ Tested tab switching
  - _Requirements: 4.1-4.7_

---

## Phase 6: Playground Integration and Polish ✅ COMPLETE

- [x] 6.1 Update InvestigationDrawerMock
  - ✅ Integrated all updated tab components
  - ✅ Ensured tab switching works smoothly
  - ✅ Verified state isolation between tabs
  - _Requirements: 6.1, 6.6_

- [x] 6.2 Test tab transitions
  - ✅ Tested switching between all tabs
  - ✅ Verified smooth animations
  - ✅ Checked for state leakage
  - _Requirements: 6.6_

- [x] 6.3 Verify visual consistency
  - ✅ Reviewed all tabs for aesthetic cohesion
  - ✅ Checked font usage (Caveat vs Courier New)
  - ✅ Verified damage elements are appropriate
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [x] 6.4 Mobile responsiveness testing
  - ✅ Tested all tabs in playground
  - ✅ Verified visual appearance
  - ✅ Checked text legibility
  - _Requirements: NFR-2_

- [x] 6.5 Performance testing
  - ✅ Verified tab switching is smooth
  - ✅ Tested drawer animation
  - ✅ Checked with sample data
  - _Requirements: NFR-1_

---

## Phase 7: Production Implementation (Apply Playground Changes to Real App)

- [x] 7. Production implementation





- [x] 7.1 Create production Photos tab component


  - Move from InvestigationDrawerMock to production component
  - Integrate with actual photo capture system
  - Handle real photo data
  - _Requirements: 1.1-1.7_

- [x] 7.2 Create production Evidence tab component


  - Move from InvestigationDrawerMock to production component
  - Integrate with evidence collection system
  - Connect to ghost identification logic
  - _Requirements: 2.1-2.9_

- [x] 7.3 Update production FieldJournalsScreen

  - Apply collapsible selector changes
  - Apply click-to-advance functionality
  - Test with real journal data
  - _Requirements: 3.1-3.10_

- [x] 7.4 Update production Codex integration


  - Ensure GhostCodexContent works in production drawer
  - Verify /codex route still works correctly
  - Test with real ghost data
  - _Requirements: 4.1-4.7_

- [x] 7.5 Integration testing


  - Test full investigation workflow
  - Capture photos → view in drawer
  - Collect evidence → view checklist
  - Read journals → navigate pages
  - Browse codex → view ghost entries
  - _Requirements: All_

---

## Phase 8: Final Testing and Polish

- [ ] 8. Final testing and polish
- [ ] 8.1 Accessibility testing
  - Verify text contrast (WCAG AA)
  - Test interactive element feedback
  - Check handwritten text readability
  - _Requirements: NFR-4_

- [ ] 8.2 Cross-browser testing
  - Test on Chrome, Firefox, Safari
  - Verify animations work consistently
  - Check font rendering
  - _Requirements: NFR-1_

- [ ] 8.3 Edge case testing
  - Test with 0 items in each tab
  - Test with maximum items (100 photos, 50 journals)
  - Test rapid tab switching
  - Test drawer open/close during interactions
  - _Requirements: All_

- [ ] 8.4 Final visual polish
  - Adjust spacing and alignment
  - Fine-tune rotations and damage elements
  - Optimize texture opacities
  - _Requirements: 6.1-6.6_

- [ ] 8.5 Documentation
  - Document new components
  - Update component usage examples
  - Add comments for complex logic
  - _Requirements: NFR-3_

---

## Dependencies

- Spec 006: Analog Horror Component System (base components)
- Spec 011: Unified Backpack System (drawer structure)
- GhostCodexContent component (must exist)
- FieldJournalsScreen component (existing)
- Investigation mode state management

---

## Notes

- Playground (InvestigationDrawerMock) serves as prototype
- Production implementation follows after playground validation
- All visual changes maintain analog horror aesthetic
- Performance targets must be met before production deployment
- Mobile experience is critical - test thoroughly
