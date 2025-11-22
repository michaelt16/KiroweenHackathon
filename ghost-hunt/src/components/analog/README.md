# 📦 Analog Horror Component System

## Philosophy

**Build with LEGO pieces, not monolithic templates.**

This component library creates Ghost Hunt's analog horror aesthetic through reusable, composable pieces. Each component follows universal rules but can be combined into distinct document types.

## Component Hierarchy

### Level 1: Base Materials (Atoms)
- `<PaperBase>` - Foundation with aged paper variants
- `<DamageOverlay>` - Coffee, burns, blood, fingerprints
- `<Tape>` - Scotch tape for attaching elements
- `<PushPin>` - Push pins for cork boards

### Level 2: Document Elements (Molecules)
- `<PolaroidPhoto>` - Instant camera photos with damage
- `<StickyNote>` - Post-it style notes
- `<HandwrittenText>` - Personal notes with urgency levels
- `<TypewrittenText>` - Official typed information
- `<OfficialStamp>` - URGENT, CLASSIFIED stamps

### Level 3: Document Templates (Organisms)
- `<CodexPage>` - Light damage, organized (player's guide)
- `<EvidencePage>` - Heavy damage, chaotic (field notes)
- `<FieldReport>` - Medium damage, structured (official reports)

## Usage Examples

### Example 1: Codex Entry
```tsx
import { CodexPage } from '@/components/analog';

<CodexPage ghostId="shade-001">
  <CodexPage.Title fontSize="24px" fontWeight="bold">
    ENTITY: THE SHADE
  </CodexPage.Title>
  
  <CodexPage.Photo 
    src={ghostImage}
    caption="confirmed sighting"
    damage="light"
  />
  
  <CodexPage.Note urgency="calm">
    Shy entity. Avoids groups.
  </CodexPage.Note>
  
  <CodexPage.StickyNote color="yellow" size="small">
    Do not investigate alone!
  </CodexPage.StickyNote>
</CodexPage>
```

### Example 2: Evidence Log
```tsx
import { EvidencePage } from '@/components/analog';

<EvidencePage investigationId="whitmore-001">
  <EvidencePage.Note urgency="frantic">
    EMF spiked to 5.0!
    IT KNOWS I'M HERE
  </EvidencePage.Note>
  
  <EvidencePage.Photo 
    src={evidencePhoto}
    rotation={-12}
    damage="heavy"
  />
</EvidencePage>
```

### Example 3: Field Report
```tsx
import { FieldReport } from '@/components/analog';

<FieldReport reportId="report-2847">
  <FieldReport.Stamp text="CLOSED" color="red" />
  
  <FieldReport.Header fontSize="18px" fontWeight="bold">
    INVESTIGATION REPORT
  </FieldReport.Header>
  
  <FieldReport.Note urgency="urgent">
    Entity confirmed as WRAITH.
  </FieldReport.Note>
</FieldReport>
```

## Randomization System

All damage and rotation is **deterministic** based on seed:

```tsx
// Same seed = same damage placement
<DamageOverlay type="coffee" seed="ghost-001" />
<DamageOverlay type="coffee" seed="ghost-001" /> // Identical

// Different seed = different placement
<DamageOverlay type="coffee" seed="ghost-002" /> // Different position
```

## Damage Levels

### Light (Codex, Books)
- 1-2 damage overlays
- Opacity: 0.2-0.3
- Organized layout
- Mostly typed text

### Medium (Reports, Logs)
- 2-3 damage overlays
- Opacity: 0.3-0.5
- Mixed layout
- Mixed text styles

### Heavy (Evidence, Panic Notes)
- 3-5 damage overlays
- Opacity: 0.5-0.8
- Chaotic layout
- Mostly handwritten

## Universal Rules

### ❌ NEVER Use:
- Pure white paper (`#fff`)
- Bright, saturated colors
- Perfectly straight elements
- Flat design without texture
- Modern flat icons

### ✅ ALWAYS Use:
- Aged paper colors (`#c4b49a`, `#d8d4c8`, `#f4f0e6`)
- Organic rotation (0.3deg - 2deg)
- Multiple texture layers
- Ink bleed on urgent text
- Deep shadows for depth
- Chaotic, asymmetrical layouts

## Color Palette

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

## File Structure

```
/components/analog/
  /base/
    PaperBase.tsx
    DamageOverlay.tsx
    Tape.tsx
    PushPin.tsx
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
  /utils/
    randomization.ts
    damageVariants.ts
  index.ts
  README.md
```

## Testing

View all components in action:
- Navigate to `/ui-playground`
- Click **🧩 Component System** button
- See all three document types with the same components

## Benefits

✅ **Reusable** - Same components across all document types
✅ **Consistent** - Universal rules ensure cohesive aesthetic
✅ **Flexible** - Easy to compose new document types
✅ **Maintainable** - Change once, update everywhere
✅ **Randomized** - Deterministic variation prevents repetition

---

**Status**: ✅ COMPONENT SYSTEM COMPLETE
**Authority**: MAXIMUM - This is the way forward
