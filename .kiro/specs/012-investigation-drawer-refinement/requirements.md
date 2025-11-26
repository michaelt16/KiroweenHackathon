# Requirements Document - Spec 012: Investigation Drawer Refinement

## Introduction

Refine the investigation mode backpack drawer to create more authentic, field-appropriate UI for Photos, Evidence, Field Journals, and Codex tabs. This spec addresses visual consistency issues where some tabs feel too formal/document-like when they should feel like active field investigation materials.

**Core Philosophy:** Each tab should feel appropriate to its context - fresh Polaroids for Photos, field notepad for Evidence, worn journals for Field Journals, and organized manila folders for Codex.

## Glossary

- **Investigation Drawer**: Bottom drawer that slides up during investigation mode, contains tabs for Tools, Photos, Evidence, Field Journal, and Codex
- **Fresh Polaroids**: Recently taken photos with light damage, not aged documents
- **Field Notepad**: Clipboard-style checklist with handwritten notes, not formal document
- **Collapsible Selector**: Dropdown-style journal selector that expands/collapses to save space
- **Manila Folder**: Brown folder aesthetic for Codex with tabs and aged paper content

---

## Requirements

### Requirement 1: Photos Tab - Fresh Polaroid Display

**User Story:** As a player, I want the Photos tab to show freshly taken Polaroids on a dark surface, so that it feels like I just captured evidence in the field.

#### Acceptance Criteria

1. WHEN the Photos tab is opened THEN the system SHALL display a dark surface background (#1a1612) without paper wrapper
2. WHEN photos are displayed THEN the system SHALL show Polaroid frames with light damage (not heavy aged damage)
3. WHEN photos are displayed THEN the system SHALL scatter them naturally with slight rotations (-3deg to 3deg)
4. WHEN photos are displayed THEN the system SHALL show handwritten labels on tape strips for titles
5. WHEN photos are displayed THEN the system SHALL show photo count on a tape strip at the bottom
6. WHEN no photos exist THEN the system SHALL show an empty state message on tape
7. WHEN photos are displayed THEN the system SHALL NOT use PaperBase or formal document styling

---

### Requirement 2: Evidence Tab - Field Notepad/Clipboard

**User Story:** As a player, I want the Evidence tab to look like a field notepad with handwritten checklist, so that it feels like my active investigation notes.

#### Acceptance Criteria

1. WHEN the Evidence tab is opened THEN the system SHALL display a clipboard with metal clip at the top
2. WHEN the Evidence tab is opened THEN the system SHALL use notepad paper (#f4f0e6) with slight rotation
3. WHEN evidence is displayed THEN the system SHALL use handwritten font (Caveat) for all text
4. WHEN evidence is displayed THEN the system SHALL show checkmarks (✓) for found evidence and circles (○) for not found
5. WHEN evidence is displayed THEN the system SHALL use larger, readable handwritten font sizes (18-24px)
6. WHEN suspects are displayed THEN the system SHALL show them in a highlighted box (yellow marker effect)
7. WHEN suspects are displayed THEN the system SHALL use red circles (⭕) for high confidence suspects
8. WHEN the identify button is shown THEN the system SHALL use handwritten font style
9. WHEN the Evidence tab is opened THEN the system SHALL NOT use PaperBase or formal document styling

---

### Requirement 3: Field Journals Tab - Collapsible Selector

**User Story:** As a player, I want a collapsible journal selector at the top, so that I can see journal content without scrolling through a long list.

#### Acceptance Criteria

1. WHEN the Field Journals tab is opened THEN the system SHALL show a collapsed selector displaying the current journal
2. WHEN the collapsed selector is displayed THEN the system SHALL show date, location, agent name, status, and threat level
3. WHEN the collapsed selector is displayed THEN the system SHALL show a dropdown arrow (▼) indicator
4. WHEN the selector is tapped THEN the system SHALL expand to show all collected journals
5. WHEN the selector is expanded THEN the system SHALL show a scrollable list (max 400px height)
6. WHEN the selector is expanded THEN the system SHALL show an up arrow (▲) indicator
7. WHEN a journal is selected from the list THEN the system SHALL collapse the selector automatically
8. WHEN a journal is selected THEN the system SHALL display that journal's content below
9. WHEN the journal content is displayed THEN the system SHALL allow clicking the paper to advance pages
10. WHEN the last page is reached THEN the system SHALL NOT advance further on click

---

### Requirement 4: Codex Tab - Manila Folder Content

**User Story:** As a player, I want the Codex tab to show just the manila folder content without the wood table, so that it fits naturally in the drawer.

#### Acceptance Criteria

1. WHEN the Codex tab is opened THEN the system SHALL display GhostCodexContent component
2. WHEN the Codex tab is opened THEN the system SHALL NOT display the wood table background
3. WHEN the Codex tab is opened THEN the system SHALL show manila folder tabs at the top
4. WHEN the Codex tab is opened THEN the system SHALL show folder frame with brown background (#c4b49a)
5. WHEN the Codex tab is opened THEN the system SHALL use reduced padding (12px mobile, 20px desktop)
6. WHEN ghost entries are displayed THEN the system SHALL maintain all existing visual styling
7. WHEN the Codex tab is opened THEN the system SHALL be identical to /codex route minus wood table wrapper

---

### Requirement 5: Drawer Container Optimization

**User Story:** As a player, I want the drawer to use space efficiently, so that I can see more content without excessive scrolling.

#### Acceptance Criteria

1. WHEN the drawer is opened THEN the system SHALL use a lighter backdrop (rgba(0,0,0,0.2) instead of 0.5)
2. WHEN content is displayed THEN the system SHALL use minimal padding to maximize content space
3. WHEN tabs are switched THEN the system SHALL maintain scroll position appropriately
4. WHEN the drawer is opened THEN the system SHALL be 60vh height with 600px max height
5. WHEN content overflows THEN the system SHALL allow vertical scrolling within the drawer

---

### Requirement 6: Visual Consistency

**User Story:** As a player, I want all drawer tabs to feel cohesive while maintaining their unique aesthetics, so that the experience feels polished.

#### Acceptance Criteria

1. WHEN any tab is opened THEN the system SHALL use appropriate background for that tab type
2. WHEN any tab is opened THEN the system SHALL use consistent handwritten font (Caveat) for informal text
3. WHEN any tab is opened THEN the system SHALL use consistent typewriter font (Courier New) for formal text
4. WHEN any tab is opened THEN the system SHALL maintain analog horror aesthetic
5. WHEN any tab is opened THEN the system SHALL use appropriate damage elements for context
6. WHEN tabs are switched THEN the system SHALL maintain smooth transitions

---

## Non-Functional Requirements

### NFR-1: Performance
- Tab switching MUST be instant (< 100ms)
- Drawer open/close animation MUST be smooth (300ms)
- Content rendering MUST not block UI thread

### NFR-2: Mobile Responsiveness
- All tabs MUST be fully functional on mobile devices
- Touch targets MUST be at least 44x44px
- Text MUST remain legible on small screens
- Collapsible elements MUST work with touch gestures

### NFR-3: Maintainability
- GhostCodexContent MUST be reusable in both /codex route and drawer
- Components MUST follow established analog horror patterns
- Styling MUST be consistent with steering documents 006, 007, 011

### NFR-4: Accessibility
- Text contrast MUST meet WCAG AA standards
- Interactive elements MUST have clear visual feedback
- Handwritten text MUST remain readable despite stylization

---

## Out of Scope

- Adding new tabs to the drawer
- Changing drawer animation or slide-up behavior
- Modifying tool selection functionality
- Adding new evidence types or ghost identification logic
- Changing core game mechanics

---

## Success Criteria

1. ✅ Photos tab shows fresh Polaroids on dark surface without paper wrapper
2. ✅ Evidence tab looks like field notepad with handwritten checklist
3. ✅ Field Journals tab has collapsible selector to save space
4. ✅ Codex tab shows manila folder content without wood table
5. ✅ All tabs use appropriate aesthetics for their context
6. ✅ Drawer uses space efficiently with minimal padding
7. ✅ All functionality remains intact
8. ✅ Mobile experience is smooth and responsive
9. ✅ Visual consistency maintained across all tabs
10. ✅ Performance remains acceptable on target devices
