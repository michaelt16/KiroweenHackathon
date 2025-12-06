# Tool Juggling Redesign
## Making the 7-Second Window Work Without Breaking Immersion

---

## 🎯 The Core Tension

**The Problem:**
- **7-second window** is intentional pacing (forces tool switching)
- But **7 seconds feels rushed** for meaningful tool interaction
- Players might feel **panicked**, not **immersed**
- Tools need to be **quick to read** but **not feel shallow**

**The Goal:**
- Maintain **rapid tool rotation** (skill expression)
- But also maintain **immersion** (feels like real investigation)
- Tools should feel **meaningful**, not **rushed**

---

## ⏱️ Is 7 Seconds Too Fast?

### **Current Reality Check:**

**What can you do in 7 seconds?**
- ✅ Check EMF level (1-2s) - **WORKS**
- ✅ Check Thermal reading (1-2s) - **WORKS**
- ✅ Check Radar direction (1-2s) - **WORKS**
- ❌ Tune Spirit Box (10-30s) - **DOESN'T WORK**
- ⚠️ Take meaningful photo (instant, but 7s cooldown) - **WORKS**

**Analysis:**
- **3 out of 5 tools** work in 7 seconds
- **1 tool** (Spirit Box) is too slow
- **1 tool** (Camera) creates the window itself

**Verdict:** 7 seconds is **fine for most tools**, but **Spirit Box needs redesign**.

---

## 💡 Solution: Two-Tier Tool System

### **Concept: Quick Check vs Deep Investigation**

Each tool has **two modes**:
1. **Quick Check** (1-2 seconds) - For 7-second window
2. **Deep Investigation** (10-30 seconds) - For when camera isn't locked

**This maintains immersion** while fitting the juggling window.

---

## 🔧 Tool Redesigns Based on 014 Steering

### **1. EMF Tool** (Already Works Well)

**Current State:**
- Shows level 0-5 instantly
- Updates every 800ms
- Personality noise visible over time

**Quick Check Mode** (1-2s):
- ✅ Already works - just glance at level
- Shows current level + personality pattern
- **Action**: Look at meter → Note level → Switch tool

**Deep Investigation Mode** (10-30s):
- Watch pattern over time
- Identify personality (calm, unstable, shy, etc.)
- Log to evidence when pattern is clear

**Recommendation:** ✅ **No changes needed** - Already perfect for juggling

---

### **2. Thermal Tool** (Already Works Well)

**Current State:**
- Shows temperature reading
- Shows cold spots on screen
- Updates in real-time

**Quick Check Mode** (1-2s):
- ✅ Already works - just glance at reading
- See temperature + cold spot locations
- **Action**: Look at display → Note reading → Switch tool

**Deep Investigation Mode** (10-30s):
- Watch for temperature patterns
- Track cold spot movement
- Identify thermal category (Normal, Cold Spot, Deep Cold)

**Recommendation:** ✅ **No changes needed** - Already perfect for juggling

---

### **3. Radar Tool** (Already Works Well)

**Current State:**
- Shows ghost blip direction
- Updates in real-time
- ±5° wobble for realism

**Quick Check Mode** (1-2s):
- ✅ Already works - just check blip position
- See direction to ghost
- **Action**: Look at radar → Note direction → Switch tool

**Deep Investigation Mode** (10-30s):
- Track direction changes
- Verify ghost isn't moving
- Note wobble pattern

**Recommendation:** ✅ **No changes needed** - Already perfect for juggling

---

### **4. Spirit Box Tool** (NEEDS REDESIGN)

**Current State:**
- Takes 10-30 seconds to tune
- Doesn't fit 7-second window
- Breaks juggling flow

**Problem:** Too slow for quick check, but tuning is the core mechanic

**Solution: Two-Mode System**

#### **Quick Check Mode** (3-5 seconds):
- **"Auto-Tune" Button**: Automatically tunes to ghost's frequency
- **Cooldown**: 10-15 seconds between auto-tunes (prevents spam)
- **Question System**: Once tuned (auto or manual), ask quick question
- **Response**: Ghost says one word
- **Use Case**: During 7-second window

**Flow:**
1. Switch to Spirit Box (1s)
2. Click "Auto-Tune" (1s) → Automatically finds frequency
3. Ask question (1s)
4. Get word (1-2s)
5. Switch to next tool (1s)
**Total: 5-6 seconds** ✅

#### **Deep Investigation Mode** (10-30 seconds):
- **Manual Tuning**: Player tunes knobs themselves
- **No cooldown**: Can tune as long as needed
- **Multiple Questions**: Ask several questions
- **Better Responses**: Perfect tuning = clearer words, rare words
- **Use Case**: When camera isn't locked, have time to investigate

**Flow:**
1. Switch to Spirit Box
2. Manually tune knobs (10-20s)
3. Ask multiple questions (5-10s)
4. Get multiple words
5. Build conversation with ghost

**Recommendation:** ✅ **Implement two-mode system**

---

### **5. Camera Tool** (Creates the Window)

**Current State:**
- Takes photo → 7-second cooldown
- Creates the juggling window
- Works perfectly

**Recommendation:** ✅ **No changes needed**

---

## 🎮 Revised Player Loop (With Two-Mode System)

### **During Camera Cooldown (7s Window):**

1. **Take Photo** → Camera locks for 7 seconds
2. **Switch to EMF** (1s) → Quick check level → **Note: "Level 4, Unstable pattern"**
3. **Switch to Spirit Box** (1s) → Click "Auto-Tune" (1s) → Ask "How do you feel?" (1s) → Get word "chaotic" (1s)
4. **Switch to Thermal** (1s) → Quick check → **Note: "Cold Spot at center"**
5. **Switch to Radar** (1s) → Quick check → **Note: "Ghost at 45°"**
6. **Camera Unlocks** → Check photo → Take another if needed

**Total: ~7 seconds** ✅ **Perfect fit!**

### **Between Photos (Deep Investigation):**

1. **Camera unlocked** → No rush
2. **Switch to Spirit Box** → Manually tune (10-20s)
3. **Ask multiple questions** → Build conversation
4. **Get multiple words** → Better evidence
5. **Switch to EMF** → Watch pattern over time (10s)
6. **Identify personality** → Log to evidence
7. **Switch to Thermal** → Track cold spot movement (10s)
8. **Identify pattern** → Log to evidence
9. **Take photo** → Back to juggling window

**This creates rhythm:**
- **Fast phase** (7s): Rapid tool checks during cooldown
- **Slow phase** (30-60s): Deep investigation between photos

---

## 🎨 UI Design: Two-Mode Spirit Box

### **Quick Check Mode UI:**

```
┌─────────────────────────────────┐
│     OSCILLOSCOPE DISPLAY        │
│  [Waveform visualization]        │
│                                  │
│  SIGNAL: [AUTO-TUNING...]        │
│  or                              │
│  SIGNAL: [LOCKED ✓]              │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  [AUTO-TUNE] (10s cooldown)     │
│                                  │
│  [Ask Question ▼]                │
│  ┌───────────────────────────┐  │
│  │ How do you feel?          │  │
│  │ Where are you?            │  │
│  │ Are you friendly?         │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  RESPONSE: "...chaotic..."       │
└─────────────────────────────────┘
```

### **Deep Investigation Mode UI:**

```
┌─────────────────────────────────┐
│     OSCILLOSCOPE DISPLAY        │
│  [Waveform visualization]        │
│                                  │
│  SIGNAL: [WEAK] [STRONG] [LOCKED]│
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  KNOB A: [━━━━━━━━━━━━━━━━] 0.35│
│  KNOB B: [━━━━━━━━━━━━━━━━] 0.72│
│                                  │
│  [Manual Tune Mode]             │
│                                  │
│  [Ask Question ▼]                │
│  ┌───────────────────────────┐  │
│  │ How do you feel?          │  │
│  │ Where are you?            │  │
│  │ Are you friendly?         │  │
│  │ Who are you?             │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  RESPONSE: "...chaotic..."       │
│  "...mine..."                    │
│  "...noisy..."                   │
└─────────────────────────────────┘
```

**Mode Toggle:**
- Button: "Quick Mode" / "Deep Mode"
- Or automatically: Quick mode during camera cooldown, Deep mode otherwise

---

## ⏱️ Alternative: Extend the Window?

### **Option A: Keep 7 Seconds** (Current)
- **Pros**: Fast-paced, skill expression
- **Cons**: Might feel rushed
- **Tools**: Need quick-check modes

### **Option B: Extend to 10 Seconds**
- **Pros**: More time for meaningful interaction
- **Cons**: Less pressure, might be too easy
- **Tools**: Can do deeper checks

### **Option C: Variable Cooldown** (Based on Film Quality)
- **Pros**: Adds variety, rewards good photos
- **Cons**: More complex
- **Mechanic**: 
  - Perfect photo (ghost in frame, EMF 4-5) → 5s cooldown
  - Good photo (ghost in frame, EMF 3) → 7s cooldown
  - Poor photo (ghost not in frame) → 10s cooldown

**Recommendation:** Start with **7 seconds + two-mode system**, test, then adjust if needed.

---

## 🎯 Revised Tool Behaviors (Based on 014)

### **EMF Tool** - No Changes Needed
- ✅ Already works in 7-second window
- ✅ Shows level + personality instantly
- ✅ Can watch pattern over time for deep investigation

### **Thermal Tool** - No Changes Needed
- ✅ Already works in 7-second window
- ✅ Shows reading + cold spots instantly
- ✅ Can track patterns over time for deep investigation

### **Radar Tool** - No Changes Needed
- ✅ Already works in 7-second window
- ✅ Shows direction instantly
- ✅ Can track movement over time for deep investigation

### **Spirit Box Tool** - Two-Mode System
- ✅ **Quick Mode**: Auto-tune + question (3-5s)
- ✅ **Deep Mode**: Manual tune + multiple questions (10-30s)
- ✅ Fits both juggling window and deep investigation

### **Camera Tool** - No Changes Needed
- ✅ Creates the 7-second window
- ✅ Works perfectly as pacing mechanic

---

## 🎮 Enhanced Juggling Flow

### **Phase 1: Initial Investigation** (No Camera Cooldown)
- **Radar** → Find direction (10-20s)
- **EMF** → Walk toward ghost, watch pattern (30-60s)
- **Thermal** → Check for cold spots (10-20s)
- **Spirit Box (Deep Mode)** → Manual tune, ask questions (20-30s)
- **Camera** → Take photo when EMF peaks

### **Phase 2: Photo Cooldown** (7s Window)
- **EMF (Quick)** → Check level (1-2s)
- **Spirit Box (Quick)** → Auto-tune + question (3-5s)
- **Thermal (Quick)** → Check reading (1-2s)
- **Radar (Quick)** → Verify direction (1-2s)

### **Phase 3: Photo Review** (5-10s)
- Check photo manifestation
- Review evidence collected
- Decide if need another photo

### **Phase 4: Deep Investigation** (If Needed)
- **Spirit Box (Deep)** → Manual tune, multiple questions (20-30s)
- **EMF (Deep)** → Watch pattern, identify personality (10-20s)
- **Thermal (Deep)** → Track cold spot movement (10-20s)

**This creates natural rhythm:**
- **Fast juggling** during cooldown (skill expression)
- **Deep investigation** between photos (immersion)

---

## 💡 Additional Improvements

### **1. Evidence Confidence System**

**Quick Check Evidence:**
- Lower confidence (might be wrong)
- Marked as "Quick Check" in evidence log
- Still useful, but less reliable

**Deep Investigation Evidence:**
- Higher confidence (more reliable)
- Marked as "Confirmed" in evidence log
- Better for deduction

**Example:**
- Quick Check: "EMF Level 4 (Quick)" → Lower confidence
- Deep Check: "EMF Level 4, Unstable Pattern (Confirmed)" → Higher confidence

### **2. Tool Memory System**

**Remember Last Settings:**
- Spirit Box: Remember last frequency (helps with deep mode)
- EMF: Remember last level (helps track changes)
- Thermal: Remember last reading (helps track patterns)

**This rewards players who pay attention.**

### **3. Tool Synergy Indicators**

**Show Tool Connections:**
- "EMF Level 4 + Thermal Cold Spot → Possible Poltergeist"
- "Spirit Box 'chaotic' + EMF Unstable → Possible Poltergeist"
- Doesn't solve the case, just shows connections

**This helps players understand tool relationships.**

---

## 🎯 Implementation Priority

### **Phase 1: Spirit Box Two-Mode System** (HIGH PRIORITY)
1. Add "Auto-Tune" button (finds frequency automatically)
2. Add cooldown to auto-tune (10-15s)
3. Add question system (4-6 questions)
4. Add mode toggle (Quick/Deep)
5. Test in 7-second window

### **Phase 2: Enhanced Tool Feedback** (MEDIUM PRIORITY)
1. Add evidence confidence system
2. Add tool memory system
3. Add tool synergy indicators

### **Phase 3: Optional Window Adjustment** (LOW PRIORITY)
1. Test 7-second window with players
2. Consider extending to 10 seconds if too rushed
3. Consider variable cooldown based on photo quality

---

## ✅ Summary

**Is 7 seconds too fast?**
- **For most tools**: No, it's perfect
- **For Spirit Box**: Yes, but fixable with two-mode system

**Solution:**
- **Quick Check Mode** (3-5s) for juggling window
- **Deep Investigation Mode** (10-30s) for between photos
- Maintains immersion while fitting the window

**Result:**
- Fast-paced juggling during cooldown (skill expression)
- Deep investigation between photos (immersion)
- Best of both worlds!

