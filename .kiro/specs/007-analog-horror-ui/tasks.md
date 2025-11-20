# 007 – Analog Horror UI – Tasks

## Phase 1: Core Effects System

- [ ] 1.1 Create color palette and CSS variables
  - Define monochrome green color scheme
  - Create CSS custom properties for all colors
  - Add glow effect utilities
  - Set up typography variables
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [ ] 1.2 Create CRT overlay component
  - Implement scanline effect (CSS repeating-linear-gradient)
  - Generate noise texture with Canvas (256x256, cached)
  - Add subtle flicker animation
  - Apply chromatic aberration (RGB split)
  - Make overlay non-interactive (pointer-events: none)
  - _Requirements: 1.1, 1.2, 1.3, 1.4_

- [ ] 1.3 Create VHS effect component
  - Implement vertical tracking lines
  - Add horizontal distortion bars
  - Create color bleeding effect
  - Make effect triggerable for transitions
  - _Requirements: 1.5_

- [ ] 1.4 Create glitch transition system
  - Implement static burst effect
  - Add RGB split transition
  - Create screen shake effect
  - Build VHS tracking transition
  - Add transition orchestration logic
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

---

## Phase 2: Enhanced Radar Display

- [ ] 2.1 Create radar display component structure
  - Set up radar container with retro bezel
  - Add corner brackets (SVG)
  - Create dark background with noise texture
  - Apply CRT glow effects
  - _Requirements: 3.6, 3.7_

- [ ] 2.2 Implement radar range rings
  - Draw concentric circles with SVG
  - Apply green stroke with low opacity
  - Add subtle glow effect
  - Make rings responsive to container size
  - _Requirements: 3.1_

- [ ] 2.3 Create radar sweep animation
  - Implement rotating sweep line
  - Add trailing glow effect
  - Use CSS transform for smooth rotation
  - Set 4-second rotation period
  - _Requirements: 3.2_

- [ ] 2.4 Implement ghost blip visualization
  - Create pulsing dot with expanding rings
  - Add glow effect
  - Show only when ghost in forward cone
  - Position based on relative angle
  - _Requirements: 3.3_

- [ ] 2.5 Add radar grid overlay
  - Create subtle grid pattern
  - Apply low opacity (5%)
  - Use SVG or CSS background
  - _Requirements: 3.4_

- [ ] 2.6 Add cardinal direction labels
  - Display N/S/E/W in corners
  - Apply glow effect
  - Rotate labels opposite to radar rotation
  - _Requirements: 3.5_

---

## Phase 3: Retro Tech Tool Frames

- [ ] 3.1 Create ToolFrame wrapper component
  - Build reusable frame component
  - Add corner brackets (SVG or CSS)
  - Implement header with tool name
  - Add status indicator
  - Apply retro tech styling
  - _Requirements: 4.1, 4.6_

- [ ] 3.2 Enhance EMF meter UI
  - Create oscilloscope-style waveform
  - Use Canvas for waveform rendering
  - Add frequency indicators
  - Apply green monochrome styling
  - _Requirements: 4.2_

- [ ] 3.3 Enhance camera UI
  - Create viewfinder frame
  - Add corner brackets and crosshairs
  - Display film counter
  - Add "RECORDING" indicator
  - _Requirements: 4.3_

- [ ] 3.4 Enhance thermal scanner UI
  - Create heat signature overlay
  - Add grid lines
  - Display temperature readout
  - Apply green heat map gradient
  - _Requirements: 4.4_

- [ ] 3.5 Enhance audio receiver UI
  - Create waveform bar visualization
  - Add frequency spectrum display
  - Display signal strength
  - Apply oscilloscope styling
  - _Requirements: 4.5_

- [ ] 3.6 Add tool status displays
  - Create digital-style readouts
  - Add signal strength bars
  - Display tool-specific metrics
  - Apply stencil-style text
  - _Requirements: 4.7_

---

## Phase 4: Ghost Codex Interface

- [ ] 4.1 Create GhostCodex component structure
  - Build codex container with case file styling
  - Add "PARANORMAL DATABASE - CLASSIFIED" header
  - Create navigation system
  - Apply paper texture overlay
  - _Requirements: 5.1, 5.7_

- [ ] 4.2 Create GhostCard component
  - Build card layout with centered ghost image
  - Add entity name, threat level, encounter count
  - Display characteristics list
  - Apply retro tech styling
  - _Requirements: 5.2, 5.3, 5.4_

- [ ] 4.3 Implement ghost image animations
  - Add floating animation (3s ease-in-out)
  - Apply glow/shadow effects
  - Create breathing effect (subtle scale)
  - _Requirements: 5.2_

- [ ] 4.4 Add locked ghost placeholders
  - Create silhouette placeholder
  - Add "UNKNOWN ENTITY" label
  - Apply reduced opacity and blur
  - _Requirements: 5.5_

- [ ] 4.5 Implement codex transitions
  - Add static burst between ghost entries
  - Create page flip effect
  - Apply glitch transition
  - _Requirements: 5.6_

- [ ] 4.6 Source placeholder ghost images
  - Find 3 scary ghost images (Unsplash/Pexels)
  - Optimize for web (compress, resize)
  - Add to public/assets folder
  - Update GhostCard to use placeholders
  - _Requirements: 12.1_

---

## Phase 5: Profile Badge

- [ ] 5.1 Create ProfileBadge component
  - Build badge container with security styling
  - Add "INVESTIGATOR ID" header
  - Create corner brackets
  - Apply retro tech bezel
  - _Requirements: 6.1, 6.6_

- [ ] 5.2 Add user information display
  - Display agent name (username)
  - Show rank (e.g., "ROOKIE", "VETERAN")
  - Display clearance level
  - Apply stencil-style text
  - _Requirements: 6.2_

- [ ] 5.3 Implement XP progress bar
  - Create progress bar with percentage
  - Add glitch effect on level up
  - Display current level
  - Apply green glow to filled portion
  - _Requirements: 6.3_

- [ ] 5.4 Add stats display
  - Show investigations completed
  - Display ghosts caught
  - Show success rate percentage
  - Apply digital readout styling
  - _Requirements: 6.4_

- [ ] 5.5 Add avatar placeholder
  - Create silhouette placeholder
  - Apply static overlay effect
  - Add border with glow
  - _Requirements: 6.5_

---

## Phase 6: Bottom HUD with Field Kit Drawer

- [ ] 6.1 Create BottomHUD component
  - Display active tool name with icon
  - Show sanity bar
  - Add Field Kit button
  - Display film counter
  - Apply retro tech styling
  - _Requirements: 9.1, 9.7_

- [ ] 6.2 Create FieldKitDrawer component
  - Build slide-up drawer container
  - Add "FIELD KIT - SELECT TOOL" header
  - Create tool button grid (5 tools)
  - Apply retro tech bezel and corner brackets
  - _Requirements: 9.2_

- [ ] 6.3 Implement drawer slide animation
  - Create smooth slide-up/down transition
  - Add static effect during animation
  - Apply easing for natural feel
  - _Requirements: 9.6_

- [ ] 6.4 Create ToolButton component
  - Build button with icon and label
  - Add border and glow effects
  - Implement hover state
  - Create active state with pulse
  - _Requirements: 9.4_

- [ ] 6.5 Wire up Field Kit interactions
  - Tap Field Kit button → open drawer
  - Tap tool → switch and close drawer
  - Tap outside drawer → close drawer
  - Update active tool display
  - _Requirements: 9.2, 9.3_

- [ ] 6.6 Enhance sanity display
  - Create bar with segments
  - Add glitch effect when below 30%
  - Apply red tint at critical levels
  - Add pulsing animation
  - _Requirements: 9.5_

- [ ] 6.7 Add film counter display
  - Create digital counter style
  - Add film icon
  - Display remaining count
  - Apply glow effect
  - _Requirements: 9.1_

- [ ] 6.8 Create placeholder tool icons
  - Design simple geometric SVG icons
  - Radar: circle with sweep line
  - EMF: waveform
  - Thermal: thermometer
  - Audio: sound waves
  - Camera: camera outline
  - _Requirements: 12.2_

---

## Phase 7: Investigation Atmosphere

- [ ] 7.1 Create AtmosphereLayer component
  - Implement dark vignette effect
  - Add noise texture overlay
  - Create particle system (dust, static)
  - Make intensity configurable
  - _Requirements: 10.1, 10.3, 10.5_

- [ ] 7.2 Add sanity-based atmosphere changes
  - Increase vignette when sanity < 30%
  - Add red tint to edges at low sanity
  - Increase particle density
  - Add screen shake at critical sanity
  - _Requirements: 10.2_

- [ ] 7.3 Implement depth with glow effects
  - Add layered glow to UI elements
  - Create depth hierarchy (foreground > background)
  - Apply stronger glow to interactive elements
  - _Requirements: 10.4_

---

## Phase 8: Text and Typography

- [ ] 8.1 Set up typography system
  - Import monospace font (Courier New fallback)
  - Create text component variants
  - Set up letter-spacing utilities
  - Define text size scale
  - _Requirements: 8.1_

- [ ] 8.2 Implement text effects
  - Add glow effect to headers
  - Create flicker animation for labels
  - Implement glitch distortion for errors
  - Add emphasis styling (brighter green)
  - _Requirements: 8.2, 8.3, 8.4, 8.5_

- [ ] 8.3 Apply uppercase styling
  - Convert headers to uppercase
  - Add letter-spacing
  - Apply stencil-style rendering
  - _Requirements: 8.2_

---

## Phase 9: Integration and Polish

- [ ] 9.1 Integrate CRT overlay into InvestigationScreen
  - Add CRTOverlay as top-level component
  - Configure intensity settings
  - Test with all tools
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 9.2 Apply retro styling to all investigation tools
  - Wrap each tool in ToolFrame
  - Update tool-specific UIs
  - Add status indicators
  - Test tool switching
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 9.3 Replace current HUD with new BottomHUD + FieldKitDrawer
  - Remove old HUD components
  - Integrate BottomHUD component
  - Integrate FieldKitDrawer component
  - Wire up Field Kit button and tool selection
  - Test drawer open/close and tool switching
  - _Requirements: 9.1, 9.2, 9.3_

- [ ] 9.4 Add glitch transitions to screen changes
  - Investigation start: static burst
  - Tool switch: RGB split
  - Investigation end: VHS tracking
  - _Requirements: 7.1, 7.2, 7.4_

- [ ] 9.5 Integrate AtmosphereLayer
  - Add to InvestigationScreen
  - Connect to sanity state
  - Test vignette intensity changes
  - _Requirements: 10.1, 10.2_

---

## Phase 10: Performance Optimization

- [ ] 10.1 Optimize Canvas rendering
  - Cache noise texture (don't regenerate per frame)
  - Use requestAnimationFrame for animations
  - Minimize Canvas operations
  - _Requirements: 11.2, 11.3, 11.4_

- [ ] 10.2 Optimize CSS animations
  - Use transform instead of position
  - Enable GPU acceleration (will-change)
  - Reduce animation complexity if needed
  - _Requirements: 11.2_

- [ ] 10.3 Add performance monitoring
  - Track FPS in debug mode
  - Log performance warnings
  - Add "Reduce Effects" toggle
  - _Requirements: 11.1, 11.5_

- [ ] 10.4 Test on low-end devices
  - Test on iPhone SE
  - Test on budget Android
  - Verify 30fps minimum
  - Adjust effects if needed
  - _Requirements: 11.1_

---

## Phase 11: Codex and Profile Implementation

- [ ] 11.1 Create codex navigation system
  - Build ghost list view
  - Add ghost selection
  - Implement transitions between entries
  - _Requirements: 5.6_

- [ ] 11.2 Integrate GhostCodex into app
  - Add codex route/screen
  - Connect to ghost data
  - Add navigation from main menu
  - Test unlock system
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 11.3 Create profile screen
  - Add profile route
  - Integrate ProfileBadge component
  - Connect to user data
  - Add navigation from main menu
  - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5_

- [ ] 11.4 Implement XP and leveling system
  - Create XP calculation logic
  - Add level-up detection
  - Trigger glitch effect on level up
  - Update profile display
  - _Requirements: 6.3_

---

## Phase 12: Final Polish

- [ ] 12.1 Add loading states with effects
  - Create loading screen with static
  - Add "INITIALIZING..." text with flicker
  - Apply VHS tracking effect
  - _Requirements: 1.5, 8.3_

- [ ] 12.2 Enhance error states
  - Add glitch effect to error messages
  - Create screen shake on errors
  - Apply red tint to error text
  - _Requirements: 7.3, 8.5_

- [ ] 12.3 Add success/failure animations
  - Create dramatic reveal for ghost identification
  - Add glitch effect on success
  - Create failure animation with static
  - _Requirements: 7.5_

- [ ] 12.4 Polish all transitions
  - Smooth tool switching
  - Clean screen transitions
  - Consistent timing across app
  - _Requirements: 7.1, 7.2, 7.4_

- [ ] 12.5 Final visual pass
  - Verify color consistency
  - Check glow effects
  - Test all animations
  - Ensure scanlines visible everywhere
  - _Requirements: 1.1, 1.2, 2.1, 2.2, 2.3_

---

## 🎯 Success Criteria

All tasks complete when:

1. ✅ CRT overlay with scanlines + static visible on all screens
2. ✅ All UI uses monochrome green color scheme
3. ✅ Radar has oscilloscope style with sweep and glow
4. ✅ All tools have retro tech frames with corner brackets
5. ✅ Ghost codex displays case files with placeholder images
6. ✅ Profile shows security badge with stats
7. ✅ Bottom HUD looks like control panel
8. ✅ Glitch transitions work between screens
9. ✅ Text has retro styling with glow
10. ✅ Performance is 30fps+ on target devices
11. ✅ Atmosphere is dark and immersive
12. ✅ All effects are code-based (no external libraries)

---

## 📝 Notes

- Sound effects will be added in Spec 008
- Final ghost animations will replace placeholders later
- Custom tool icons will replace geometric placeholders later
- Focus on creating the visual framework first
- All effects should be toggleable for accessibility
- Test frequently on real devices for performance

---

**Estimated Effort**: 2-3 weeks for full implementation
**Priority**: High - Core visual identity of the game
**Risk**: Low - All code-based, no external dependencies
