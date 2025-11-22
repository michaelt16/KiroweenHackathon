# 🎨 Analog Horror UI Mocks - COMPLETE

## ✅ All Mocks Created

I've created 5 new mock collections based on Style B (Analog Journal) pushed into darker, more atmospheric analog horror territory:

---

## 1. Journal Horror Mock (`JournalHorrorMock.tsx`)

**3 Pages:**
- Ghost Entry Page - Disturbing entity documentation
- Player Notes Page - Chaotic investigation notes  
- Evidence Page - Collected proof

**Visual Features:**
- Aged, yellowed paper with water damage and stains
- Shaky, uneven handwriting (Courier New)
- Disturbing doodles and scratched-out words
- Taped Polaroids with worn masking tape
- Red pen warnings ("DON'T LOOK", "RUN")
- Frantic margin scribbles
- Coffee stains, smudges, fingerprints
- Chaotic but readable layout

---

## 2. Evidence Board Mock (`EvidenceBoardMock.tsx`)

**Full-Screen Detective Board:**
- Corkboard texture background
- Pinned photos, notes, maps, documents
- Red string connecting clues
- Sticky notes with investigator scribbles
- "ACTIVE CASE" center card
- Evidence tags (EMF, Temperature, Audio, Visual)
- Shadows from pins and paper for depth
- Torn edges, dog-eared corners
- Desaturated, gritty look

---

## 3. Corrupted Database Mock (`CorruptedDatabaseMock.tsx`)

**3 Screens:**
- Entity List - Glitched terminal listing
- Entity Entry - Individual ghost file
- Redacted Error Page - Access denied

**Visual Features:**
- Black background with green phosphor glow
- Glitch lines and jittery text
- Missing pixels and corrupted data
- Partially redacted entries
- Distorted static in photos
- Warning banners ("UNAUTHORIZED ACCESS")
- Red string overlays (faint)
- Handwritten annotations ON TOP of digital UI
- SCP database meets analog horror

---

## 4. Sketchbook Series (`/sketchbook/`)

**3 Screens:**
- `SketchbookProfile.tsx` - Personal profile page
- `SketchbookFieldNotes.tsx` - Investigation observations
- `SketchbookEvidence.tsx` - Collected proof sketches

**Visual Features:**
- Rough pencil drawings and diagrams
- Coffee stains and fingerprints
- Torn notebook lines with perforated edges
- Margin sketches: circles, arrows, shaky writing
- Taped Polaroids with handwritten captions
- Hand-drawn EMF meters, radar circles, ghost stick figures
- More "human" and messy than official journal
- Notebook paper texture with ruled lines

---

## 5. Analog Horror Hybrid Mock (`AnalogHorrorHybridMock.tsx`)

**4 Screens:**
- HybridProfile - Agent ID with mixed elements
- HybridCodex - Ghost database
- HybridMap - Overworld exploration
- HybridInvestigation - Active hunt interface

**Visual Features:**
- Very dark UI (#0a0a0a background)
- Subtle teal (#2dd4bf) accents with glow
- Physical artifacts overlaid: paper notes, string, tape, Polaroids
- Digital radar and tools with analog surroundings
- VHS static noise and scanlines
- Chromatic aberration effects
- Ghost markers flicker and distort
- Faint corkboard/desk background
- Perfect blend: investigator realism + analog horror

---

## 🎯 How to View These Mocks

These are standalone visual mockups. To view them, you'll need to:

### Option 1: Add to Playground Router

Update `PlaygroundRouter.tsx` to include these new mocks as additional screens or styles.

### Option 2: Create Dedicated Routes

Add routes in `App.tsx`:
```tsx
<Route path="/journal-horror" element={<JournalHorrorMock page="ghost-entry" />} />
<Route path="/evidence-board" element={<EvidenceBoardMock />} />
<Route path="/corrupted-db" element={<CorruptedDatabaseMock screen="entity-list" />} />
<Route path="/sketchbook" element={<SketchbookProfile />} />
<Route path="/hybrid" element={<AnalogHorrorHybridMock screen="profile" />} />
```

### Option 3: Create a New Playground Page

Create a separate "Analog Horror Playground" page that showcases all these darker mocks.

---

## 📁 File Locations

```
ghost-hunt/src/ui-playground/
├── JournalHorrorMock.tsx
├── EvidenceBoardMock.tsx
├── CorruptedDatabaseMock.tsx
├── AnalogHorrorHybridMock.tsx
└── sketchbook/
    ├── SketchbookProfile.tsx
    ├── SketchbookFieldNotes.tsx
    └── SketchbookEvidence.tsx
```

---

## 🎨 Visual Direction Summary

All these mocks push Style B (Analog Journal) into darker territory:

**From Style B:**
- Paper textures and physical artifacts
- Handwritten fonts (Courier New)
- Taped Polaroids
- Sticky notes
- Cork board aesthetics

**Added Analog Horror Elements:**
- Darker, more ominous color palettes
- Distressed and damaged paper
- Frantic, panicked handwriting
- Red pen warnings and circles
- VHS/glitch effects
- Corrupted digital elements
- Unsettling atmosphere
- Evidence of investigator stress

**Inspiration:**
- Analog horror (VHS tapes, found footage)
- SCP Foundation documentation
- Detective investigation boards
- Field journals under stress
- Paranormal investigation shows
- Government classified documents

---

## 💡 Next Steps

1. **Choose Your Direction:**
   - Pure Analog Horror (Journal Horror + Evidence Board)
   - Digital Corruption (Corrupted Database)
   - Personal Touch (Sketchbook Series)
   - Best of Both (Analog Horror Hybrid) ⭐ **RECOMMENDED**

2. **Integrate into Playground:**
   - Add these as new style options
   - Or create a separate "Dark Mode" toggle
   - Or make them Style H, I, J, K, L

3. **Apply to Real Screens:**
   - Start with one screen (Investigation recommended)
   - Build reusable components
   - Test on mobile
   - Iterate based on feel

4. **Enhance with:**
   - Actual VHS shader effects
   - Animated glitches
   - Sound effects (static, paper rustle)
   - Subtle animations (flickering, distortion)

---

## 🌟 Recommended Direction

**Analog Horror Hybrid** is the sweet spot:
- Maintains usability with digital elements
- Adds atmosphere with analog artifacts
- Unique aesthetic that stands out
- Flexible enough for all screens
- Can be dialed up or down in intensity

This gives you the best of both worlds: functional modern UI with immersive analog horror vibes.

---

**Status:** ✅ ALL MOCKS COMPLETE
**Total Screens Created:** 15 unique mockup screens
**Ready for:** Integration and testing
