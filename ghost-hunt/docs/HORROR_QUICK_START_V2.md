# Horror Theme - Quick Start Guide 🔥

## ✅ What's Been Built

### 1. Reusable Horror Components
**Location**: `src/components/horror/`

- `<PaperCard>` - Aged paper with damage
- `<PolaroidPhoto>` - Photo frames with tape
- `<HandwrittenText>` - Jittery handwriting
- `<StampMark>` - Classified stamps

### 2. Horror Profile Screen
**Location**: `src/screens/ProfilePanelHorror.tsx`

Mobile ID badge aesthetic based on your inspiration image!

---

## 🚀 How to View

### Option 1: Add to Playground Router
```tsx
// In src/ui-playground/PlaygroundRouter.tsx
import { ProfilePanelHorror } from '../screens/ProfilePanelHorror';

// Add button:
<button onClick={() => setActiveScreen('horror-profile')}>
  👤 Horror: Profile
</button>

// Add render:
{activeScreen === 'horror-profile' && <ProfilePanelHorror />}
```

### Option 2: Replace Current Profile
```tsx
// In your main App.tsx or router
import { ProfilePanelHorror } from './screens/ProfilePanelHorror';

// Use instead of ProfilePanel
<ProfilePanelHorror />
```

---

## 🎨 Using Horror Components

### Basic Example
```tsx
import { PaperCard, PolaroidPhoto, HandwrittenText, StampMark } from './components/horror';

function MyScreen() {
  return (
    <div style={{ background: '#0d0a08', padding: '20px' }}>
      <PaperCard damage="heavy" rotation={-1} stains burns>
        <StampMark text="URGENT" color="red" rotation={15} />
        
        <PolaroidPhoto
          src="/path/to/image.jpg"
          caption="Evidence photo"
          rotation={-3}
        />
        
        <HandwrittenText size="large" color="red" inkBleed bold>
          Important Note
        </HandwrittenText>
      </PaperCard>
    </div>
  );
}
```

---

## 📋 Component API

### `<PaperCard>`
```tsx
<PaperCard
  damage="light" | "medium" | "heavy"  // Texture intensity
  rotation={-2}                         // Rotation in degrees
  stains={true}                         // Add coffee stains
  burns={true}                          // Add burn holes
  foldCrease={true}                     // Center fold line
  style={{}}                            // Additional CSS
>
  Content
</PaperCard>
```

### `<PolaroidPhoto>`
```tsx
<PolaroidPhoto
  src="/image.jpg"                      // Image URL
  alt="Description"                     // Alt text
  caption="Handwritten caption"         // Optional caption
  rotation={-3}                         // Rotation in degrees
  tapePosition="top" | "corner" | "both" // Tape placement
  style={{}}                            // Additional CSS
/>
```

### `<HandwrittenText>`
```tsx
<HandwrittenText
  size="small" | "medium" | "large"    // Text size
  color="black" | "red" | "dark"       // Ink color
  jitter={true}                         // Random rotation/translation
  inkBleed={true}                       // Text shadow effect
  bold={true}                           // Bold weight
  style={{}}                            // Additional CSS
>
  Text content
</HandwrittenText>
```

### `<StampMark>`
```tsx
<StampMark
  text="CLASSIFIED"                     // Stamp text
  color="red" | "black"                 // Stamp color
  rotation={15}                         // Rotation in degrees
  style={{}}                            // Additional CSS
/>
```

---

## 🎯 Next Screens to Build

### 1. Map Screen
Transform `MapRootScreen.tsx` into aged paper map

### 2. Codex Screen
Transform `CodexScreen.tsx` into field journal

### 3. Inventory Screen
Transform `InventoryScreen.tsx` into equipment locker

### 4. Investigation Screen
Add analog overlays to `InvestigationScreen.tsx`

---

## 💡 Design Principles

### 1. Authentic Chaos
- Nothing perfectly aligned
- Random rotations
- Varied damage

### 2. Layered Depth
- Multiple textures
- Dual shadows
- Overlapping elements

### 3. Functional First
- Horror never blocks usability
- Text stays readable
- Touch targets clear

### 4. Mobile Optimized
- Large touch areas (44px+)
- Readable text (18px+)
- Fast loading

---

## 🎨 Color Palette

```tsx
// Use these colors for consistency
const colors = {
  paperAged: '#c4b49a',
  paperLight: '#e8e4d8',
  paperCream: '#f5f1e8',
  paperYellow: '#fbbf24',
  
  inkDark: '#1a0f0a',
  inkRed: '#8b0000',
  inkBlood: '#dc2626',
  
  corkBase: '#8b7355',
  bgDark: '#0d0a08',
  
  accentTeal: '#2dd4bf',
};
```

---

## 🔥 Your Vision

The 3 horror guide pages (Ghost Entry, Player Notes, Evidence Board) are now:
- ✅ Componentized into reusable pieces
- ✅ Applied to Profile screen
- 🔄 Ready to apply to all other screens

**Every screen will have that same AAA horror quality!** 🎯👻

---

**Status**: Foundation complete, Profile done!
**Next**: Transform Map, Codex, Inventory, Investigation!
**Goal**: Your horror vision across the entire app! 🔥
