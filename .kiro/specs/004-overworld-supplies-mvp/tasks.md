# 📦 Overworld Supplies MVP — Tasks

## Phase 1: Core Supply System

### 1. Create Supplies Context
- [ ] Create `SuppliesContext.tsx` with state management
- [ ] Implement `Supplies` type and `STARTER_KIT` constant
- [ ] Add `addFilm`, `addBoost`, `addCharm` functions
- [ ] Add `consumeFilm`, `consumeBoost`, `consumeCharm` functions
- [ ] Add `resetSupplies` and `maxSupplies` (dev mode)
- [ ] Wrap app with `SuppliesProvider`
- _Requirements: 1.5, 8.1, 8.2, 8.3_

### 2. LocalStorage Integration
- [ ] Implement `saveSupplies` with 300ms debounce
- [ ] Implement `loadSupplies` on app mount
- [ ] Handle localStorage errors gracefully
- [ ] Initialize with starter kit if no saved data
- [ ] Test persistence across page reloads
- _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5_

---

## Phase 2: Map System Updates

### 3. Supply Node Types
- [ ] Create `SupplyNode` type definition
- [ ] Define `SUPPLY_AMOUNTS` constants
- [ ] Update mock data to generate supply nodes instead of tool nodes
- [ ] Implement spawn distribution (60% film, 20% boost, 20% charm)
- [ ] Remove old tool node generation
- _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

### 4. Supply Marker Component
- [ ] Rename/repurpose `ToolMarker` as `SupplyMarker`
- [ ] Add supply-specific icons (🎞️, ⚡, 🔮)
- [ ] Implement glow effects with CSS animations
- [ ] Add rarity-based styling (common/uncommon)
- [ ] Update marker positioning and clustering
- _Requirements: 2.1, 2.2, 2.3_

### 5. Supply Collection UI
- [ ] Create `SupplyCard` modal component
- [ ] Display supply icon, name, and amount
- [ ] Add "Collect" button (enabled when in range)
- [ ] Implement collection logic (add to supplies, remove node)
- [ ] Show toast notification on collection
- [ ] Add swipe-to-dismiss for mobile
- _Requirements: 1.1, 1.2, 1.3, 1.4_

---

## Phase 3: Inventory Updates

### 6. Field Kit UI
- [ ] Update `InventoryScreen` to show "Field Kit" instead of tool list
- [ ] Display film count with 🎞️ icon
- [ ] Display boost count with ⚡ icon
- [ ] Display charm count with 🔮 icon
- [ ] Add dimmed styling for zero counts
- [ ] Add pulse animation on count changes
- _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

---

## Phase 4: Investigation Integration

### 7. Field Kit Sync
- [ ] Implement `syncFieldKit` function in investigation entry
- [ ] Calculate clarity bonus from boosts
- [ ] Calculate sanity protection from charms
- [ ] Set available film count
- [ ] Display "Field Kit Synced" toast with summary
- [ ] Pass synced values to investigation context
- _Requirements: 4.1, 4.2, 4.3, 4.4_

### 8. Boost Effects
- [ ] Modify EMF spike intensity calculation
- [ ] Modify cold spot visibility calculation
- [ ] Reduce audio noise floor based on boost
- [ ] Improve whisper transcription clarity
- [ ] Consume boost on investigation start
- [ ] Persist updated boost count
- _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

### 9. Charm Effects
- [ ] Modify sanity drain rate calculation
- [ ] Implement charm stacking (multiple charms)
- [ ] Cap maximum reduction at 50%
- [ ] Display modified drain rate in debug info
- [ ] Consume charms on investigation end
- [ ] Persist updated charm count
- _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

---

## Phase 5: Camera Film System

### 10. Film Counter UI
- [ ] Add film counter to camera tool UI
- [ ] Display 🎞️ icon with count
- [ ] Update counter in real-time as film is consumed
- [ ] Position counter prominently on camera interface
- _Requirements: 5.4_

### 11. Film Consumption Logic
- [ ] Check film count before allowing shutter
- [ ] Decrement film on successful photo
- [ ] Disable shutter button when film === 0
- [ ] Show "No film left" toast when depleted
- [ ] Add greyed-out styling for disabled state
- [ ] Persist updated film count
- _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

---

## Phase 6: Dev Mode Features

### 12. Dev Supply Controls
- [ ] Add "Supplies (Dev)" section to debug panel
- [ ] Display current film, boost, charm counts
- [ ] Add "Reset to Starter Kit" button
- [ ] Add "Max All (99)" button
- [ ] Update UI immediately on dev actions
- [ ] Persist dev changes to localStorage
- _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

---

## Phase 7: Polish & Testing

### 13. Animations & Feedback
- [ ] Add scale-up + fade-out animation on collection
- [ ] Add pulse effect on Field Kit count changes
- [ ] Add shake animation on camera when no film
- [ ] Smooth toast notifications (slide in from top)
- [ ] Add loading states for localStorage operations

### 14. Mobile Optimization
- [ ] Test supply collection on mobile devices
- [ ] Verify touch targets are large enough (44x44px minimum)
- [ ] Test swipe gestures on supply cards
- [ ] Verify Field Kit is readable on small screens
- [ ] Test film counter visibility during investigation

### 15. Error Handling
- [ ] Handle localStorage quota exceeded
- [ ] Handle localStorage disabled/blocked
- [ ] Fallback to in-memory storage if needed
- [ ] Show user-friendly error messages
- [ ] Log errors for debugging

### 16. Testing & QA
- [ ] Test collection flow for all supply types
- [ ] Test investigation with various supply combinations
- [ ] Test film depletion during investigation
- [ ] Test persistence across page reloads
- [ ] Test Dev Mode reset and max functions
- [ ] Test with localStorage disabled
- [ ] Test on mobile Safari and Chrome
- [ ] Verify no console errors

---

## Phase 8: Cleanup

### 17. Remove Old Tool System
- [ ] Remove `collectedTools` from GameStateContext
- [ ] Remove old tool collection logic
- [ ] Update any remaining tool references
- [ ] Clean up unused tool-related components
- [ ] Update comments and documentation

### 18. Final Polish
- [ ] Review all UI text for clarity
- [ ] Ensure consistent styling across components
- [ ] Verify accessibility (labels, contrast, keyboard nav)
- [ ] Test complete gameplay loop (collect → investigate → consume)
- [ ] Prepare demo script for hackathon judges

---

## Notes

- **Priority**: Focus on Phases 1-5 for core functionality
- **Testing**: Test each phase before moving to the next
- **Mobile-First**: Always test on mobile viewport
- **Performance**: Monitor localStorage operations and animation performance
- **Demo-Ready**: Ensure Dev Mode allows quick testing for judges
