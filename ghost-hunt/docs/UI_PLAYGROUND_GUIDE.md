# 🎨 UI Playground Guide

## Overview

The UI Playground is a visual exploration tool for testing different aesthetic styles for Ghost Hunt. It's accessible at `/playground` in the app.

## How to Access

1. Start the dev server: `npm run dev`
2. Navigate to: `http://localhost:5173/playground`

## Features

### Screen Selection
Switch between 4 main screens:
- **Profile** - Agent ID card and stats
- **Codex** - Ghost encyclopedia
- **Investigation** - Active hunt interface with radar
- **Map** - Overworld exploration view

### Style Selection
7 different visual styles to explore:

#### Style A - Digital
Clean, modern tech interface with:
- Teal/cyan accent colors (#2dd4bf)
- Dark navy backgrounds
- Glowing effects
- Sans-serif typography
- Classified OS aesthetic

#### Style B - Analog
Full paper/journal aesthetic with:
- Cork board backgrounds
- ID cards and Polaroids
- Sticky notes
- Handwritten fonts (Courier New)
- Physical textures

#### Style C - Hybrid
Best of both worlds:
- Digital frames with paper inserts
- Tech borders around analog elements
- Mixed typography
- Balanced modern + vintage

#### Style D - Paranormal Detective Bureau
Professional investigation aesthetic:
- Clean ID cards
- "CLASSIFIED" stamps
- Bureau/agency feel
- Typewriter fonts
- Desk/office setting

#### Style E - Explorer's Field Diary
Adventure journal style:
- Aged paper textures
- Taped Polaroids
- Field notes
- Warm brown tones
- Explorer/archaeologist vibe

#### Style F - Modern Agent with Analog Notes
Contemporary with analog accents:
- Sleek digital panels
- Sticky note overlays
- Polaroid decorations
- Clean + playful

#### Style G - Premium Horror Notebook
Minimalist horror aesthetic:
- Clean white/cream backgrounds
- Simple line work
- Elegant typography
- Subtle shadows
- Premium feel

## Purpose

This playground allows you to:
1. **Compare styles side-by-side** - Quickly switch between aesthetics
2. **Test visual consistency** - See how each style works across all screens
3. **Make design decisions** - Choose which direction to pursue
4. **Show stakeholders** - Easy way to present options

## Implementation Notes

- All mocks are **pure visual** - no functionality
- Uses inline styles for easy experimentation
- No dependencies on game state or context
- Fast to iterate and modify

## Next Steps

Once you've chosen a style direction:
1. Document the chosen aesthetic in the Visual Bible
2. Create reusable component library
3. Apply the style to real screens
4. Build out the design system

## File Structure

```
src/ui-playground/
├── PlaygroundRouter.tsx    # Main router with controls
├── ProfileMock.tsx         # 7 profile styles
├── CodexMock.tsx          # 3 codex styles (A, B, C)
├── InvestigationMock.tsx  # 3 investigation styles (A, B, C)
└── MapMock.tsx            # 3 map styles (A, B, C)
```

## Tips

- **Start with Profile** - It's the most detailed and shows the full range
- **Compare Investigation modes** - This is where the core gameplay happens
- **Consider mobile** - All styles should work on phone screens
- **Think about consistency** - Can you maintain the aesthetic across all screens?

## Current Status

✅ Playground fully functional
✅ ALL 7 styles implemented for ALL screens
✅ Profile: Styles A-G complete
✅ Codex: Styles A-G complete
✅ Investigation: Styles A-G complete
✅ Map: Styles A-G complete
⏳ Visual Bible needs to be filled in with chosen direction

---

**Ready to explore!** Fire up the dev server and visit `/playground` to start comparing styles.
