---
inclusion: always
---

# 📦 Analog Horror Component System

## 🎯 Philosophy

**Build with LEGO pieces, not monolithic templates.**

This document defines the **component library** for Ghost Hunt's analog horror aesthetic. Each component is a reusable piece that follows universal rules but can be composed into distinct document types.

**End Goal**: Papers like investigation reports, evidence logs, and field notes should look gritty, damaged, and authentic - but each document type should feel unique through different combinations of the same base components.

---

## 🌍 SECTION A — BASE RULES (Universal Truth Layer)

**These rules apply to ALL paper UI elements, no exceptions.**

### ❌ NEVER Use:
- Cartoon-y elements or emoji as primary visuals
- Clean, pristine white paper (`#fff`)
- Bright, saturated, happy colors
- Perfectly straight elements (no rotation)
- Flat design without texture or depth
- Modern flat icons or vector graphics
- Symmetrical, perfect layouts
- Comic Sans or playful fonts

### ✅ ALWAYS Use:
- Aged, darker paper colors (`#c4b49a`, `#d8d4c8`, `#f4f0e6`)
- Organic rotation on ALL elements (0.3deg - 2deg)
- Multiple texture layers (wrinkles, dust, damage)
- Ink bleed on handwritten text (textShadow)
- Realistic, deep shadows for physical depth
- Analog-only aesthetic (typewriter, handwriting)
- Chaotic, asymmetrical layouts
- Rough, imperfect edges

### 🎨 Core Color Palette:
```typescript
// Paper (NEVER pure white)
'#c4b49a'  // Darkest aged
'#d8d4c8'  // Medium aged
'#f4f0e6'  // Lightest acceptable

// Ink
'#1a0f0a'  // Dark brown/black
'#4a0000'  // Dark red (urgent)
'#8b0000'  // Blood red (warnings)

// Damage
'rgba(139, 69, 19, 0.3)'   // Coffee
'rgba(0, 0, 0, 0.4)'       // Water
'rgba(139, 0, 0, 0.2)'     // Blood
'rgba(40, 20, 0, 0.6)'     // Burn
```

### 📐 Universal Spacing:
```typescript
lineHeight: '1.8-2'        // Generous for handwriting
letterSpacing: '0.5px-2px' // Varies by urgency
marginBottom: '20px-25px'  // Between sections
```

---

## 🧩 SECTION B — COMPONENT LIBRARY RULES

**The LEGO pieces. Each component has specific rules and behaviors.**

---

### 📄 LEVEL 1: BASE MATERIALS (Atoms)

#### `<PaperBase>`
**Purpose**: The foundation - aged paper with texture

**Variants**:
- `aged` - Standard aged paper (#d8d4c8)
- `clean` - Lighter, less damaged (#f4f0e6)
- `damaged` - Darker, heavily aged (#c4b49a)

**Required Layers** (in order):
1. Base color
2. Wrinkled texture (multiply, 0.4-0.8 opacity)
3. Dust overlay (overlay, 0.2-0.5 opacity)
4. Edge darkening (radial gradient)

**Rules**:
- ALWAYS rotate container (0.3deg - 2deg)
- ALWAYS include fold crease (vertical center line)
- Padding: `40px-50px`
- Border radius: `4px`

**Randomization**:
- Rotation angle (6 variants)
- Texture opacity (slight variation)

---

#### `<DamageOverlay>`
**Purpose**: Coffee stains, burns, blood, water damage

**Types**:
- `coffee` - Coffee ring stains
- `burn` - Burn marks (corners)
- `blood` - Blood smears
- `water` - Water damage
- `rip` - Torn edges
- `fingerprint` - Smudge marks

**Rules**:
- ALWAYS use texture images OR CSS gradients
- ALWAYS use `mixBlendMode: 'multiply'` or `'overlay'`
- ALWAYS randomize position (4-5 variants per type)
- Opacity varies by damage level:
  - Light: 0.2-0.3
  - Medium: 0.4-0.5
  - Heavy: 0.6-0.8

**Randomization** (CRITICAL):
```typescript
// Each damage type needs 4-5 position variants
const coffeeVariants = [
  { top: '100px', right: '80px', size: '180px', rotation: 45 },
  { bottom: '80px', right: '60px', size: '200px', rotation: -30 },
  { top: '120px', left: '70px', size: '190px', rotation: 25 },
  { bottom: '100px', left: '80px', size: '170px', rotation: -35 },
];

// Pick based on seed/ID (deterministic)
const variant = variants[seed % variants.length];
```

**NO TWO PAPERS SHOULD HAVE DAMAGE IN EXACT SAME SPOTS**

---

#### `<Tape>`
**Purpose**: Scotch tape for attaching elements

**Rules**:
- Width: `50px-100px`, Height: `20px-30px`
- ALWAYS rotate (-15deg to 15deg)
- Semi-transparent: `rgba(255, 255, 255, 0.6-0.9)`
- Grid pattern background OR texture image
- Shadow: `0 2px 4px rgba(0,0,0,0.2)`
- Position: `absolute`, typically `top: -10px`

**Variants**:
- Small (50px)
- Medium (70px)
- Large (100px)

---

#### `<PushPin>`
**Purpose**: Push pins for cork boards and pinned elements

**Rules**:
- Size: `10px-14px`
- Shape: `borderRadius: '50% 50% 50% 0'`
- ALWAYS rotate 45deg
- Colors: `#dc2626` (red), `#666` (silver)
- Shadow: `0 2px 4px rgba(0,0,0,0.3)`
- Position: `absolute`, typically `top: -8px`

---

### 📸 LEVEL 2: DOCUMENT ELEMENTS (Molecules)

#### `<PolaroidPhoto>`
**Purpose**: Instant camera photos with authentic feel

**Structure**:
```typescript
<Container rotation={-5 to 5}>
  <Tape position="top" />
  <Frame background="#e8e4dc" padding="12px 12px 40px">
    <Image />
    <StaticOverlay opacity={0.5-0.7} />
  </Frame>
  <Caption handwritten />
</Container>
```

**Rules**:
- Frame color: `#e8e4dc`
- Padding: `12px` sides/top, `40px` bottom
- ALWAYS has tape at top
- ALWAYS has static/grain overlay on image
- ALWAYS rotated (-8deg to 8deg)
- Shadow: `0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)` (lifting)
- Caption: Caveat font, 14-17px, centered

**Damage Levels**:
- Light: subtle static only
- Medium: static + corner damage
- Heavy: static + scratches + heavy grain

**Randomization**:
- Rotation angle
- Tape rotation
- Caption rotation

---

#### `<StickyNote>`
**Purpose**: Post-it style notes

**Rules**:
- Colors: `#ffeb3b` (yellow), `#ffc0cb` (pink), `#add8e6` (blue)
- Size: `100px-150px` square
- ALWAYS rotate heavily (-20deg to 20deg)
- ALWAYS has push pin at top
- Shadow: `0 4px 12px rgba(0,0,0,0.4)` (lifting)
- Font: Caveat, 14-18px
- Can use texture image OR solid color

**Randomization**:
- Rotation angle (wide range)
- Pin position (slight offset)
- Size variation

---

#### `<HandwrittenText>`
**Purpose**: Personal notes, urgent scrawls

**Rules**:
- Font: `"Caveat", cursive`
- Size: `18px-26px` (larger than you think)
- Line height: `1.8-2`
- Color: `#1a0f0a` (normal), `#4a0000` (urgent)
- EVERY line has micro-jitter:
  ```typescript
  transform: 'rotate(-0.5deg) translateX(-0.6px)'
  transform: 'rotate(0.6deg) translateX(0.7px)'
  ```

**Urgency Levels**:
- `calm`: subtle jitter, normal weight
- `urgent`: more jitter, bold, larger
- `frantic`: heavy jitter, bold, red ink, ink bleed

**Ink Bleed** (for urgent text):
```typescript
textShadow: '2px 2px 4px rgba(139,0,0,0.5)'  // Medium
textShadow: '2.5px 2.5px 5px rgba(139,0,0,0.6)'  // Heavy
```

---

#### `<TypewrittenText>`
**Purpose**: Official, typed information

**Rules**:
- Font: `"Courier New", monospace`
- Size: `12px-16px`
- Color: `#1a0f0a`
- Line height: `1.5-1.7`
- Letter spacing: `0.5px`
- NO jitter (it's typed)
- Optional: slight fade for aged typewriter

**Variants**:
- `standard` - Clean typed
- `faded` - Aged, slightly lighter
- `carbon` - Darker, heavier ink

---

#### `<OfficialStamp>`
**Purpose**: URGENT, CLASSIFIED, CLOSED stamps

**Rules**:
- Border: `3px-4px solid`
- Padding: `6px-16px`
- Font: `Impact, sans-serif`
- Size: `18px-24px`
- ALWAYS rotate (10deg - 20deg)
- Opacity: `0.6-0.8` (faded)
- Letter spacing: `2px-3px`
- Colors:
  - Red: `#8b0000`, `#dc2626`
  - Black: `#1a0f0a`

**Common Stamps**:
- URGENT
- CLASSIFIED  
- CLOSED
- CONFIDENTIAL
- APPROVED
- DENIED

---

### 📋 LEVEL 3: DOCUMENT TEMPLATES (Organisms)

#### `<CodexPage>`
**Purpose**: Player's personal ghost guide - organized, readable

**Composition**:
```typescript
<PaperBase variant="clean">
  <DamageOverlay type="coffee" opacity={0.2-0.3} />
  <Fold direction="vertical" />
  <TypewrittenText>Official info</TypewrittenText>
  <PolaroidPhoto damage="light" />
  <StickyNote size="small">Personal note</StickyNote>
</PaperBase>
```

**Damage Level**: Light (0.2-0.3 opacity)
**Layout**: Organized, structured
**Typography**: Mostly typewritten, some handwritten notes
**Feel**: Well-maintained field guide

---

#### `<EvidencePage>`
**Purpose**: Active investigation notes - chaotic, urgent

**Composition**:
```typescript
<PaperBase variant="damaged">
  <DamageOverlay type="coffee" opacity={0.5} />
  <DamageOverlay type="blood" opacity={0.3} />
  <DamageOverlay type="burn" opacity={0.7} />
  <HandwrittenText urgency="frantic" />
  <PolaroidPhoto rotation={-12} damage="heavy" />
  <Tape torn />
</PaperBase>
```

**Damage Level**: Heavy (0.5-0.8 opacity)
**Layout**: Chaotic, overlapping
**Typography**: Mostly handwritten, frantic
**Feel**: Panic-scrawled field notes

---

#### `<FieldReport>`
**Purpose**: Official investigation report - structured but used

**Composition**:
```typescript
<PaperBase variant="aged">
  <DamageOverlay type="coffee" opacity={0.4} />
  <DamageOverlay type="water" opacity={0.3} />
  <TypewrittenText>Report header</TypewrittenText>
  <HandwrittenText urgency="calm">Notes</HandwrittenText>
  <OfficialStamp text="CLOSED" />
  <PolaroidPhoto damage="medium" />
</PaperBase>
```

**Damage Level**: Medium (0.3-0.5 opacity)
**Layout**: Structured with handwritten additions
**Typography**: Mixed typewritten + handwritten
**Feel**: Official but field-worn

---

#### `<CorkBoard>`
**Purpose**: Evidence board with pinned elements

**Composition**:
```typescript
<CorkTexture>
  <PolaroidPhoto position="random" withPin />
  <StickyNote position="random" withPin />
  <EvidenceCard position="random" withPin />
  <DamageOverlay type="coffee" opacity={0.3} />
  <StringConnections between={elements} />
</CorkTexture>
```

**Background**: Cork texture (`#8b7355`)
**Layout**: Scattered, pinned elements
**Feel**: Detective investigation board

---

#### `<BookPage>`
**Purpose**: Bound journal page with spine

**Composition**:
```typescript
<BookCover>
  <SpineShadow side="left" />
  <PaperBase variant="clean">
    <DamageOverlay type="coffee" opacity={0.2} />
    <Fold direction="vertical" />
    {content}
  </PaperBase>
</BookCover>
```

**Special Features**:
- Spine shadow (left side)
- Gutter margin
- Vertical crease
- Lighter damage

---

## 🎲 RANDOMIZATION SYSTEM

**CRITICAL**: No two instances should look identical.

### Deterministic Randomization:
```typescript
// Use ID/seed for consistent randomization
const getDamageVariant = (seed: string | number) => {
  const variants = [...]; // 4-5 variants
  const index = typeof seed === 'number' 
    ? seed % variants.length 
    : hashString(seed) % variants.length;
  return variants[index];
};
```

### What to Randomize:
- Damage overlay positions
- Rotation angles
- Tape positions
- Pin positions
- Ink smudge locations
- Fingerprint placements

### What NOT to Randomize:
- Base colors
- Font families
- Shadow depths
- Component structure

---

## 📦 Component File Structure

```
/components/analog/
  /base/
    PaperBase.tsx
    DamageOverlay.tsx
    Tape.tsx
    PushPin.tsx
    Fold.tsx
  /elements/
    PolaroidPhoto.tsx
    StickyNote.tsx
    HandwrittenText.tsx
    TypewrittenText.tsx
    OfficialStamp.tsx
  /templates/
    CodexPage.tsx
    EvidencePage.tsx
    FieldReport.tsx
    CorkBoard.tsx
    BookPage.tsx
  /utils/
    randomization.ts
    damageVariants.ts
```

---

## 🎯 Usage Examples

### Example 1: Codex Entry
```typescript
<CodexPage ghostId="wraith">
  <TypewrittenText>
    Name: WRAITH
    Threat: HIGH
  </TypewrittenText>
  
  <PolaroidPhoto 
    src={ghostImage}
    caption="confirmed sighting"
    damage="light"
  />
  
  <HandwrittenText urgency="calm">
    Very fast - difficult to track
  </HandwrittenText>
  
  <StickyNote color="yellow" size="small">
    Do not investigate alone!
  </StickyNote>
</CodexPage>
```

### Example 2: Evidence Log
```typescript
<EvidencePage investigationId="whitmore-001">
  <HandwrittenText urgency="frantic">
    EMF spiked to 5.0!
    Temperature: -2°C
    IT KNOWS I'M HERE
  </HandwrittenText>
  
  <PolaroidPhoto 
    src={evidencePhoto}
    rotation={-12}
    damage="heavy"
  />
  
  <DamageOverlay type="blood" seed="whitmore-001" />
  <OfficialStamp text="URGENT" color="red" />
</EvidencePage>
```

### Example 3: Case File
```typescript
<CorkBoard caseId="case-2847">
  <PolaroidPhoto position="top-left" withPin />
  <PolaroidPhoto position="top-right" withPin />
  
  <StickyNote position="center" color="yellow">
    CONCLUSION: WRAITH
  </StickyNote>
  
  <EvidenceCard position="bottom-left" withPin>
    EMF: Level 5 ✓
    Freezing: -2°C ✓
    Spirit Box: 3 responses ✓
  </EvidenceCard>
</CorkBoard>
```

---

## ✅ Implementation Checklist

When creating ANY paper/document UI:

- [ ] Uses `<PaperBase>` with appropriate variant
- [ ] Has multiple `<DamageOverlay>` layers
- [ ] All elements have rotation (no perfect alignment)
- [ ] Damage is randomized (not same position every time)
- [ ] Uses appropriate text components (handwritten vs typed)
- [ ] Has realistic shadows (deep, layered)
- [ ] No cartoon elements or bright colors
- [ ] Follows damage level for document type
- [ ] Components are composed, not monolithic
- [ ] Can be reused across different screens

---

## 🎨 Visual Hierarchy

**Light Damage** (Codex, Books):
- 1-2 damage overlays
- Opacity: 0.2-0.3
- Organized layout
- Mostly typed text

**Medium Damage** (Reports, Logs):
- 2-3 damage overlays
- Opacity: 0.3-0.5
- Mixed layout
- Mixed text styles

**Heavy Damage** (Evidence, Panic Notes):
- 3-5 damage overlays
- Opacity: 0.5-0.8
- Chaotic layout
- Mostly handwritten

---

## 🎯 Final Rule

**When in doubt, look at the reference pages:**
- `JournalHorrorEnhanced` - Ghost Entry
- `JournalHorrorEnhanced` - Player Notes
- `JournalHorrorEnhanced` - Evidence Page

**These are the gold standard for the END RESULT.**

**But now you build them with COMPONENTS, not monolithic templates.**

---

**Status**: ✅ COMPONENT SYSTEM - Build with LEGO pieces
**Last Updated**: 2024
**Authority**: MAXIMUM - This is the new way forward
