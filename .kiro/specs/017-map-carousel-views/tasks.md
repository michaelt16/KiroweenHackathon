# Implementation Plan

## Overview

This implementation plan focuses on creating visually impressive carousel views with minimal complexity. All views use static mock data and existing analog horror components to maximize impact while minimizing development time.

---

## Tasks

- [x] 1. Set up carousel infrastructure and navigation




  - Create carousel wrapper component with swipe detection
  - Implement CSS transform-based horizontal navigation
  - Add navigation arrow buttons with conditional visibility
  - Wire up state management for current view index
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 1.1 Create CarouselWrapper component


  - Implement horizontal flex container (300vw width)
  - Add CSS transform for smooth transitions (300ms)
  - Set up touch event handlers for swipe detection
  - Add state for currentIndex and isAnimating
  - _Requirements: 3.1, 3.5, 6.1, 6.2_

- [x] 1.2 Implement swipe gesture detection


  - Track touchStart, touchMove, touchEnd events
  - Calculate horizontal delta (minimum 50px to trigger)
  - Prevent vertical scroll conflicts (deltaX > deltaY * 2)
  - Snap to nearest view on release
  - Disable inputs during animation
  - _Requirements: 3.5, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 1.3 Create NavigationArrows component


  - Add left arrow button (hidden when currentIndex === 0)
  - Add right arrow button (hidden when currentIndex === 2)
  - Style as circular buttons with 50px diameter
  - Position fixed at left/right edges, vertically centered
  - Add disabled state during animation
  - _Requirements: 3.2, 3.3, 3.4, 6.4_

- [x] 1.4 Integrate carousel into MapRootScreen


  - Wrap existing map view in carousel container
  - Set initial index to 1 (map view center)
  - Add conditional rendering for each view
  - Test navigation between views
  - _Requirements: 3.1, 7.2_

---

- [x] 2. Create Cork Board view with mock investigation history





  - Build cork texture background with damage elements
  - Create mock data for Polaroids, strings, notes, and cards
  - Implement scattered Polaroid layout with rotations
  - Add red string SVG connections between photos
  - Add decorative elements (sticky notes, index cards, pins)
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3_

- [x] 2.1 Create mock data file for cork board


  - Define MOCK_POLAROIDS array (5-8 items with positions, rotations, images, captions)
  - Define MOCK_STRINGS array (4-6 connections between Polaroids)
  - Define MOCK_STICKY_NOTES array (3-5 notes with text and positions)
  - Define MOCK_INDEX_CARDS array (2-3 cards with case details)
  - Define MOCK_PIN_HOLES and MOCK_TAPE_MARKS for background details
  - _Requirements: 1.5, 4.1, 4.4, 7.3_

- [x] 2.2 Create CorkBoardView component


  - Set up full-screen container (100vw x 100vh)
  - Apply cork texture background image
  - Add coffee stain overlays (2-3 stains at random positions)
  - Add scattered pin holes (10-15 small circles)
  - Add tape residue marks (5-8 faded rectangles)
  - _Requirements: 1.2, 4.5, 5.1, 5.3_

- [x] 2.3 Render mock Polaroids on cork board


  - Map through MOCK_POLAROIDS array
  - Use existing PolaroidPhoto component for each item
  - Apply absolute positioning with x/y percentages
  - Apply rotation transforms (-12deg to 12deg)
  - Add PushPin component at top of each Polaroid
  - _Requirements: 1.2, 4.1, 4.2, 5.1, 5.3_

- [x] 2.4 Create RedStringConnection component


  - Build SVG container (absolute positioned, full screen)
  - Map through MOCK_STRINGS array
  - Calculate line positions from Polaroid centers
  - Render SVG lines with red color (#dc2626)
  - Apply 2-3px stroke width and 0.8 opacity
  - _Requirements: 1.3, 4.3, 5.3_

- [x] 2.5 Add sticky notes and index cards


  - Map through MOCK_STICKY_NOTES array
  - Use existing StickyNote component with positions and rotations
  - Create IndexCard component for case details
  - Apply typewriter font (Courier New) for index cards
  - Add handwritten font (Caveat) for sticky notes
  - _Requirements: 1.4, 4.4, 5.1, 5.3_

- [x] 2.6 Add decorative elements


  - Scatter paper clips (3-5 small SVG clips)
  - Add case number labels with handwritten font
  - Add "INVESTIGATION BOARD" title at top
  - Apply slight rotations to all text elements
  - _Requirements: 4.4, 5.1, 5.3_

---

- [ ] 3. Create Shop view with vintage storefront
  - Build aged paper/wood background
  - Create storefront sign component
  - Implement wooden shelf displays
  - Add mock items with price tags
  - Add "CLOSED" stamp overlay
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.1, 5.2, 5.4_

- [ ] 3.1 Create mock data file for shop
  - Define MOCK_SHOP_ITEMS array (4-6 items with names, icons, prices, shelf positions)
  - Define SHOP_CONFIG object (store name, established date, status)
  - Include item descriptions for future use
  - _Requirements: 2.5, 7.4_

- [ ] 3.2 Create ShopView component
  - Set up full-screen container (100vw x 100vh)
  - Apply aged paper background with wood texture blend
  - Add subtle damage overlays (coffee stains, wear marks)
  - _Requirements: 2.2, 5.1, 5.4_

- [ ] 3.3 Create StorefrontSign component
  - Build black sign with cork/brass border
  - Add "PARANORMAL SUPPLY CO." text (Courier New, 24px)
  - Add "EST. 1985" subtitle (Courier New, 14px)
  - Apply slight rotation (-1deg)
  - Add drop shadow for depth
  - _Requirements: 2.2, 5.1, 5.4_

- [ ] 3.4 Create WoodenShelf component
  - Build shelf container with wood gradient background
  - Apply wood grain texture overlay
  - Add inset shadows for depth
  - Add dark border for definition
  - Position at 30% and 55% from top (two shelves)
  - _Requirements: 2.3, 5.4_

- [ ] 3.5 Create ShopItemCard component
  - Display item icon/emoji (48px size)
  - Add item name below icon (Caveat font, 16px)
  - Create handwritten price tag (cream background, rotated -3deg)
  - Add drop shadow to price tag
  - Center items on shelf with space-around
  - _Requirements: 2.3, 5.1, 5.4_

- [ ] 3.6 Render mock items on shelves
  - Map through MOCK_SHOP_ITEMS filtered by shelf number
  - Render ShopItemCard for each item
  - Position items evenly across shelf width
  - _Requirements: 2.3, 7.4_

- [ ] 3.7 Create ClosedStamp overlay
  - Build semi-transparent white background
  - Add thick red border (6px solid #8b0000)
  - Add "CLOSED" text (Impact font, 48px, red)
  - Add "Coming Soon" subtitle (Caveat font, 24px)
  - Apply rotation (12deg)
  - Center on screen with drop shadow
  - _Requirements: 2.4, 5.1, 5.4_

---

- [ ] 4. Polish and optimize carousel system
  - Add transition effects between views
  - Optimize rendering performance
  - Test on mobile devices
  - Fine-tune swipe sensitivity
  - Add visual feedback during transitions
  - _Requirements: 5.2, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.5_

- [ ] 4.1 Add transition effects
  - Implement subtle static burst effect on view change (optional)
  - Add fade-in animation for newly visible view
  - Ensure 300ms transition timing
  - _Requirements: 5.2, 7.1_

- [ ] 4.2 Optimize rendering performance
  - Implement conditional rendering (only render active view)
  - Memoize CorkBoardView and ShopView components
  - Compress mock Polaroid images to < 50KB each
  - Use WebP format for images if possible
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

- [ ] 4.3 Test and refine swipe gestures
  - Test on iOS and Android devices
  - Adjust swipe threshold if needed (currently 50px)
  - Ensure vertical scrolling doesn't trigger horizontal swipe
  - Test rapid swipe scenarios
  - Verify snap-to-view behavior
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 4.4 Add visual polish
  - Ensure navigation arrows have proper z-index (1000)
  - Add hover states to arrows (desktop)
  - Add active/pressed states to arrows (mobile)
  - Verify all text is readable on backgrounds
  - Check that all rotations look natural
  - _Requirements: 5.1, 5.3, 5.4, 6.4_

- [ ] 4.5 Final testing and bug fixes
  - Test all three views render correctly
  - Verify navigation works in both directions
  - Check that arrows hide at edges
  - Test on different screen sizes (phone, tablet)
  - Verify no layout issues or overflow
  - Ensure smooth performance (60fps)
  - _Requirements: All requirements_

---

## Implementation Notes

### Quick Wins for Hackathon

**Cork Board**:
- Use placeholder images for Polaroids (can be simple ghost silhouettes or static noise)
- Hardcode all positions and rotations (no dynamic layout needed)
- Red strings can be simple straight lines (no complex curves)
- Reuse existing PolaroidPhoto and StickyNote components

**Shop**:
- Use emoji for item icons (🎞️ ⚡ 🔮 📷 🌡️ 📻)
- Simple wooden shelf rectangles (no complex 3D)
- Closed stamp is just text with border
- No purchase logic needed

**Navigation**:
- CSS transforms are performant and simple
- Swipe detection is ~50 lines of code
- Arrow buttons are basic styled divs

### Component Reuse

From existing analog horror system:
- `<PolaroidPhoto>` - Cork board photos
- `<StickyNote>` - Cork board notes
- `<PushPin>` - Pinning Polaroids
- `<Tape>` - Tape residue marks
- `<DamageOverlay>` - Coffee stains

New components needed:
- `<RedStringConnection>` - Simple SVG lines
- `<IndexCard>` - Styled div with text
- `<ShopItemCard>` - Icon + name + price
- `<StorefrontSign>` - Styled header
- `<WoodenShelf>` - Styled container

### File Structure

```
/src/components/MapCarousel/
  index.tsx                    # Main export
  CarouselWrapper.tsx          # Swipe logic
  NavigationArrows.tsx         # Arrow buttons
  
  /CorkBoard/
    index.tsx                  # Cork board view
    RedStringConnection.tsx    # SVG lines
    IndexCard.tsx              # Case cards
    mockData.ts                # Static data
  
  /Shop/
    index.tsx                  # Shop view
    ShopItemCard.tsx           # Item display
    StorefrontSign.tsx         # Shop sign
    WoodenShelf.tsx            # Shelf container
    mockData.ts                # Static data
```

### Mock Data Examples

**Cork Board Polaroid**:
```typescript
{
  id: 'case-001',
  position: { x: '12%', y: '15%' },
  rotation: -8,
  imageUrl: '/assets/mock/ghost-silhouette-1.png',
  caption: 'Wraith - Whitmore St.',
  pinColor: 'red',
}
```

**Shop Item**:
```typescript
{
  id: 'film-roll',
  name: 'Film Roll',
  icon: '🎞️',
  price: 5,
  shelf: 1,
  position: 0,
  description: 'Standard 35mm film\n+3 camera shots',
}
```

### Performance Tips

1. Only render active view (conditional rendering)
2. Use CSS transforms (GPU accelerated)
3. Memoize static components
4. Compress images
5. Limit SVG complexity (max 6 string connections)

### Testing Checklist

- [ ] Swipe left from map shows cork board
- [ ] Swipe right from map shows shop
- [ ] Arrow buttons work correctly
- [ ] Arrows hide at edges
- [ ] Transitions are smooth (300ms)
- [ ] All Polaroids render with correct positions
- [ ] Red strings connect correct photos
- [ ] Shop items display on shelves
- [ ] Closed stamp overlays correctly
- [ ] No performance issues on mobile

---

## Success Criteria

**Visual Impact**:
- Cork board looks like a real detective investigation board
- Red strings create compelling web pattern
- Shop looks like a vintage paranormal supply store
- All elements use analog horror aesthetic consistently

**Technical Quality**:
- Smooth 300ms transitions
- No jank or stuttering
- Works on mobile devices
- Minimal performance impact

**Judge Reaction**:
- "Wow" moment when swiping to cork board
- Demonstrates polish and attention to detail
- Shows depth beyond core gameplay
- Memorable visual presentation
