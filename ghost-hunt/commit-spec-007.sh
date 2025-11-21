#!/bin/bash
# Commit script for Spec 007: Analog Horror UI

git add -A

git commit -m "feat(ui): Spec 007 - Analog Horror UI complete

Complete visual transformation to monochrome green CRT/VHS aesthetic.

Core Components:
- CRT overlay with scanlines, static, flicker, chromatic aberration
- Monochrome green color palette (#00ff41) with CSS variables
- Enhanced radar with oscilloscope styling and retro bezel
- ToolFrame wrapper for consistent retro tech styling
- Field Kit drawer system for tool selection
- Bottom HUD with sanity bar and film counter
- Ghost Codex with case file layout
- Profile Badge with security badge styling

Visual Changes:
- All UI now uses monochrome green
- Persistent CRT effects across entire app
- Glow effects on all interactive elements
- Retro tech bezels with corner brackets
- Animated scan lines and pulses
- Floating ghost images with animations

Technical:
- Pure CSS/Canvas/SVG (no external libraries)
- Performance optimized (cached textures, GPU acceleration)
- Build successful: 480.93 kB (146.11 kB gzipped)
- All TypeScript compilation clean

Known Issue:
- UI feels flat, lacks physical depth
- Recommendation: Spec 008 for 3D materials and device context

Integration Status:
- CRT overlay integrated
- Other components created but not yet integrated
- Ready for Phase 9 integration pass"

echo "Spec 007 committed successfully!"
