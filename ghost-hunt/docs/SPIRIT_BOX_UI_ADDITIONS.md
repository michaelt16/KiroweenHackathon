# Spirit Box UI Additions
## Working With Existing Design - Minimal Changes

---

## 📐 Current UI Layout

### **Existing Elements:**
1. **Oscilloscope Display**: Top 20%, centered, 85vw/750px wide, 35vh/280px tall
2. **Knob Controls**: Top 68%, centered, Knob A and Knob B side-by-side
3. **Labels**: Around edges (SPIRIT BOX, EVP, FREQ, STATIC, etc.)
4. **SIGNAL LOCKED**: Already shows on oscilloscope when locked
5. **EVP Response**: Already shows word on oscilloscope

---

## ➕ Proposed Additions (Minimal Changes)

### **1. Light Indicators** (Add to Oscilloscope Display)

**Location**: Top-left or top-right corner of oscilloscope screen

**Design**: Small LED-style lights (like Phasmophobia)

```
┌─────────────────────────────────┐
│  [●] SIGNAL    [○] RESPONSE      │  ← Add here (top of oscilloscope)
│     ACTIVE        RECEIVED       │
│                                  │
│     [Oscilloscope Display]      │
│                                  │
└─────────────────────────────────┘
```

**Implementation**: Add to `SpiritBoxDisplay.tsx` component
- Position: `top: '2%', left: '3%'` (or `right: '3%'`)
- Small circular lights with labels
- Green for SIGNAL ACTIVE, Red for RESPONSE RECEIVED

---

### **2. Question Button** (Add Below Knobs)

**Location**: Below knob controls, around `top: '78%'`

**Design**: Small button that opens dropdown

```
┌─────────────────────────────────┐
│  KNOB A: [━━━━━━━━━━━━━━━━]     │
│  KNOB B: [━━━━━━━━━━━━━━━━]     │
│                                  │
│  [Ask Question ▼]                │  ← Add here (below knobs)
│                                  │
└─────────────────────────────────┘
```

**Implementation**: Add to `index.tsx` after knob controls
- Position: `top: '78%', left: '50%', transform: 'translateX(-50%)'`
- Small button matching existing style
- Dropdown appears on click

---

### **3. Signal Strength Indicator** (Enhance Existing)

**Current**: Shows "SIGNAL LOCKED" on oscilloscope

**Enhancement**: Also show "SIGNAL STRONG" or "SIGNAL WEAK"

**Location**: Same place as "SIGNAL LOCKED" (top 20% of oscilloscope)

**Implementation**: Update existing "SIGNAL LOCKED" logic to show all states

---

## 🎨 Visual Design: Minimal Additions

### **Light Indicators** (Phasmophobia-Style)

**SIGNAL ACTIVE Light:**
```tsx
<div style={{
  position: 'absolute',
  top: '2%',
  left: '3%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  zIndex: 16,
}}>
  <div style={{
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: signalStrength >= 'strong' ? '#00ff00' : '#333',
    boxShadow: signalStrength >= 'strong' ? '0 0 8px #00ff00' : 'none',
    transition: 'all 0.3s',
  }} />
  <span style={{
    fontFamily: '"Courier New", monospace',
    fontSize: '9px',
    color: '#86efac',
    textShadow: '0 0 4px #86efac',
  }}>
    SIGNAL ACTIVE
  </span>
</div>
```

**RESPONSE RECEIVED Light:**
```tsx
<div style={{
  position: 'absolute',
  top: '2%',
  right: '3%',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  zIndex: 16,
}}>
  <div style={{
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    background: hasResponse ? '#ff0000' : '#333',
    boxShadow: hasResponse ? '0 0 8px #ff0000' : 'none',
    animation: hasResponse ? 'blink 0.5s' : 'none',
    transition: 'all 0.3s',
  }} />
  <span style={{
    fontFamily: '"Courier New", monospace',
    fontSize: '9px',
    color: '#86efac',
    textShadow: '0 0 4px #86efac',
  }}>
    RESPONSE
  </span>
</div>
```

---

### **Question Button** (Below Knobs)

**Location**: `top: '78%'` (10% below knobs at 68%)

**Design**: Small button matching existing style

```tsx
{mode === 'investigation' && (
  <div style={{
    position: 'absolute',
    top: '78%',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 20,
  }}>
    <button
      onClick={() => setShowQuestionDropdown(!showQuestionDropdown)}
      disabled={signalStrength < 'strong'}
      style={{
        fontFamily: '"Courier New", monospace',
        fontSize: '10px',
        color: signalStrength >= 'strong' ? '#86efac' : '#666',
        background: 'transparent',
        border: '1px solid #86efac',
        padding: '6px 12px',
        borderRadius: '4px',
        cursor: signalStrength >= 'strong' ? 'pointer' : 'not-allowed',
        textShadow: '0 0 4px #86efac',
        opacity: signalStrength >= 'strong' ? 1 : 0.5,
      }}
    >
      ASK QUESTION ▼
    </button>
    
    {showQuestionDropdown && signalStrength >= 'strong' && (
      <div style={{
        position: 'absolute',
        top: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        marginTop: '8px',
        background: '#1a1a1a',
        border: '1px solid #86efac',
        borderRadius: '4px',
        padding: '4px',
        minWidth: '200px',
        zIndex: 21,
      }}>
        {QUESTIONS.map((q) => (
          <button
            key={q.id}
            onClick={() => handleAskQuestion(q)}
            style={{
              width: '100%',
              padding: '8px',
              background: 'transparent',
              border: 'none',
              color: '#86efac',
              fontFamily: '"Courier New", monospace',
              fontSize: '9px',
              textAlign: 'left',
              cursor: 'pointer',
              ':hover': { background: '#2a2a2a' },
            }}
          >
            {q.text}
          </button>
        ))}
      </div>
    )}
  </div>
)}
```

---

## 📋 Question List (8-10 Questions)

```typescript
const QUESTIONS = [
  { id: 'feel', text: 'How do you feel?', category: 'emotion' },
  { id: 'where', text: 'Where are you?', category: 'location' },
  { id: 'friendly', text: 'Are you friendly?', category: 'friendliness' },
  { id: 'old', text: 'Are you old?', category: 'age' },
  { id: 'young', text: 'Are you young?', category: 'age' },
  { id: 'want', text: 'What do you want?', category: 'activity' },
  { id: 'why', text: 'Why are you here?', category: 'activity' },
  { id: 'who', text: 'Who are you?', category: 'identity' },
];
```

---

## 🔧 Implementation Plan

### **Step 1: Add Light Indicators to SpiritBoxDisplay**

**File**: `SpiritBoxDisplay.tsx`

**Add props:**
- `signalStrength: 'weak' | 'strong' | 'locked'`
- `hasResponse: boolean`

**Add lights** to top corners of oscilloscope screen

### **Step 2: Add Question Button to Main Component**

**File**: `index.tsx`

**Add state:**
- `showQuestionDropdown: boolean`
- `selectedQuestion: Question | null`

**Add button** below knobs (top: 78%)

**Add dropdown** with question list

### **Step 3: Update Signal Strength Logic**

**File**: `index.tsx`

**Enhance `knobProximity` calculation:**
- Return overall signal strength (weak/strong/locked)
- Pass to `SpiritBoxDisplay` component

### **Step 4: Add Question Response Logic**

**File**: `index.tsx`

**Add `handleAskQuestion` function:**
- Check signal strength
- Select word based on question category
- Show response on oscilloscope
- Flash RESPONSE light
- Log to evidence

---

## 🎯 Final Layout (With Additions)

```
┌─────────────────────────────────┐
│  [●] SIGNAL    [○] RESPONSE      │  ← NEW: Light indicators
│     ACTIVE        RECEIVED       │
│                                  │
│     [Oscilloscope Display]      │
│     SIGNAL: [WEAK/STRONG/LOCKED] │  ← ENHANCE: Signal strength
│     "...word..."                 │
│                                  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  KNOB A: [━━━━━━━━━━━━━━━━]     │
│  KNOB B: [━━━━━━━━━━━━━━━━]     │
│                                  │
│  [ASK QUESTION ▼]               │  ← NEW: Question button
│  ┌───────────────────────────┐  │
│  │ How do you feel?          │  │  ← NEW: Dropdown
│  │ Where are you?            │  │
│  │ Are you friendly?         │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘
```

**All additions fit within existing layout - no major redesign needed!**

---

## ✅ Summary

**What We're Adding:**
1. ✅ **Light indicators** (top of oscilloscope) - Phasmophobia-style
2. ✅ **Question button** (below knobs) - Opens dropdown
3. ✅ **Question dropdown** (appears on click) - List of questions
4. ✅ **Enhanced signal strength** (on oscilloscope) - Shows WEAK/STRONG/LOCKED

**What We're Keeping:**
- ✅ All existing UI elements
- ✅ Oscilloscope display
- ✅ Knob controls
- ✅ Labels
- ✅ Existing styling

**Total Changes:**
- Add ~50 lines to `SpiritBoxDisplay.tsx` (light indicators)
- Add ~100 lines to `index.tsx` (question button + logic)
- No major layout changes
- Everything fits naturally in existing design

