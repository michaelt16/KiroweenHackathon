# Ghost Hunt - Routes Guide 🗺️

## 🚀 How to View Your Horror Screens

### Main App Routes

```bash
# Start the dev server
cd ghost-hunt
npm run dev
```

Then visit these URLs:

---

## 📍 Available Routes

### 1. Main Map (Root)
```
http://localhost:5173/
```
- Main game map
- Player position
- Hotspots and supplies
- Bottom HUD with navigation

---

### 2. Profile (Original)
```
http://localhost:5173/profile
```
- Original digital profile
- Clean UI
- Stats and badges

---

### 3. 👻 Profile (HORROR VERSION) ✨ NEW!
```
http://localhost:5173/profile-horror
```
**THIS IS THE NEW ONE!**
- ID badge aesthetic
- Aged paper with damage
- Polaroid photo with tape
- Handwritten agent name
- Classified stamp
- Typewriter stats
- Fingerprint smudge
- Coffee stains & burns
- Based on your inspiration image!

---

### 4. Inventory
```
http://localhost:5173/inventory
```
- Equipment and supplies
- Current: Digital UI
- Future: Horror equipment locker

---

### 5. Codex
```
http://localhost:5173/codex
```
- Ghost encyclopedia
- Current: Digital list
- Future: Horror field journal

---

### 6. Investigation
```
http://localhost:5173/investigate/[hotspotId]
```
- Active investigation mode
- Radar and tools
- Current: Digital radar
- Future: Analog overlays

---

### 7. UI Playground
```
http://localhost:5173/playground
```
- Visual style exploration
- 7 styles × 4 screens
- Horror guide pages (Ghost, Notes, Evidence)

---

### 8. Analog Horror Playground
```
http://localhost:5173/analog-horror
```
- Additional horror experiments

---

## 🎯 To See Your New Horror Profile

### Quick Access:

1. **Start server**: `npm run dev`
2. **Visit**: `http://localhost:5173/profile-horror`
3. **See**: Your AAA horror ID badge! 🔥

### Or Navigate From Map:

1. Go to: `http://localhost:5173/`
2. Click the profile button (bottom left)
3. This goes to `/profile` (original)
4. Manually change URL to `/profile-horror` to see horror version

---

## 🔄 Switching Between Versions

### Original Profile
```
/profile
```
- Digital UI
- Clean aesthetic
- Current production version

### Horror Profile
```
/profile-horror
```
- Analog horror aesthetic
- ID badge design
- New AAA quality version

---

## 📋 Route Summary

| Route | Screen | Status | Horror Version |
|-------|--------|--------|----------------|
| `/` | Map | ✅ Live | 🔄 Coming |
| `/profile` | Profile (Original) | ✅ Live | - |
| `/profile-horror` | Profile (Horror) | ✅ NEW! | ✅ Done |
| `/inventory` | Inventory | ✅ Live | 🔄 Coming |
| `/codex` | Codex | ✅ Live | 🔄 Coming |
| `/investigate/:id` | Investigation | ✅ Live | 🔄 Coming |
| `/playground` | UI Playground | ✅ Live | ✅ Has horror |
| `/analog-horror` | Horror Playground | ✅ Live | ✅ Horror |

---

## 🎨 Horror Components Available

All screens can now use:
- `<PaperCard>` - Aged paper containers
- `<PolaroidPhoto>` - Photo frames
- `<HandwrittenText>` - Jittery handwriting
- `<StampMark>` - Stamps

Import from:
```tsx
import { PaperCard, PolaroidPhoto, HandwrittenText, StampMark } from './components/horror';
```

---

## 🔥 Next Steps

1. **View the horror profile**: `/profile-horror`
2. **Give feedback**: What to adjust?
3. **Transform next screen**: Map? Codex? Inventory?
4. **Apply horror everywhere**: Your vision across the app!

---

**Ready to view!** 🎯👻

Visit: `http://localhost:5173/profile-horror`
