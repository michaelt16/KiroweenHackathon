# Spirit Box: Phasmophobia-Style Analysis
## How Phasmophobia Works vs Your Current System

---

## 🎮 How Phasmophobia's Spirit Box Works

### **Core Mechanics:**

1. **Microphone Detection:**
   - Player speaks into microphone (or clicks questions)
   - **Light 1**: Shows mic is picking up voice (green indicator)
   - Must be in dark room (or use candle for some ghosts)

2. **Ghost Response:**
   - **Light 2**: Shows if ghost responded (different indicator)
   - Ghost responds with:
     - **Yes/No** (for yes/no questions)
     - **Words** (for open questions)
     - **Nothing** (ghost didn't respond)

3. **Question System:**
   - Predefined questions player can ask
   - Categories:
     - **Age**: "Are you old?", "Are you young?"
     - **Friendliness**: "Are you friendly?", "Are you bad?"
     - **Location**: "Where are you?", "Are you here?"
     - **Activity**: "What do you want?", "Why are you here?"
   - Player clicks question or speaks it

4. **Tier System:**
   - **Tier 1**: Low response range, lower odds of response
   - **Tier 2**: Medium response range, medium odds
   - **Tier 3**: High response range, higher odds
   - Higher tiers = easier to get responses

5. **Response Range:**
   - Ghost must be within certain distance to respond
   - Different tiers have different ranges
   - Some ghosts respond more easily than others

---

## 🔍 Comparison: Phasmophobia vs Your Current System

### **Phasmophobia Approach:**

| Aspect | How It Works |
|--------|--------------|
| **Interaction** | Speak into mic OR click questions |
| **Time** | 2-4 seconds per question |
| **Feedback** | Light indicators (mic active, ghost responded) |
| **Response** | Yes/No or words |
| **Skill** | Low (just ask questions) |
| **Immersion** | High (actual voice interaction) |
| **Fits 7s Window?** | ✅ YES (2-4s per question) |
| **Analog Feel** | ⭐⭐ (digital UI, no physical tuning) |

### **Your Current System:**

| Aspect | How It Works |
|--------|--------------|
| **Interaction** | Tune two knobs (0.0-1.0) |
| **Time** | 10-30 seconds to tune |
| **Feedback** | Proximity indicators (FAR/CLOSE/LOCKED) |
| **Response** | Words only (when locked) |
| **Skill** | High (precise tuning) |
| **Immersion** | High (analog tool feel) |
| **Fits 7s Window?** | ❌ NO (too slow) |
| **Analog Feel** | ⭐⭐⭐⭐⭐ (physical knobs, tuning) |

---

## 💡 Hybrid Approach: Phasmophobia-Style + Analog Feel

### **Best of Both Worlds:**

**Keep the analog tool aesthetic, but use question system for speed.**

### **How It Would Work:**

1. **Quick Tune (1-2 seconds):**
   - Player adjusts knobs to get "close" to frequency
   - Wider tolerance for "close enough" (not perfect lock)
   - Visual feedback: "SIGNAL WEAK" → "SIGNAL STRONG" → "SIGNAL LOCKED"
   - Once "SIGNAL STRONG" or better, enable questions

2. **Question System (2-3 seconds):**
   - Player asks question from predefined list
   - Ghost responds with word (from word families)
   - Response quality depends on signal strength:
     - **WEAK**: Distorted word, might be wrong
     - **STRONG**: Clear word
     - **LOCKED**: Perfect word, might get rare word

3. **Light Indicators (Phasmophobia-style):**
   - **Light 1**: "SIGNAL ACTIVE" (green when signal is strong/locked)
   - **Light 2**: "RESPONSE RECEIVED" (flashes when ghost responds)
   - Adds visual feedback like Phasmophobia

**Total Time: 3-5 seconds** ✅ Fits 7-second window!

---

## 🎯 Proposed Design: Phasmophobia-Inspired Spirit Box

### **UI Layout:**

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
│  [●] SIGNAL ACTIVE (green light) │
│  [○] RESPONSE RECEIVED (flashes) │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  [Ask Question ▼]                │
│  ┌───────────────────────────┐  │
│  │ How do you feel?           │  │
│  │ Where are you?             │  │
│  │ Are you friendly?         │  │
│  │ Are you old?              │  │
│  │ Are you young?            │  │
│  │ What do you want?        │  │
│  │ Why are you here?        │  │
│  └───────────────────────────┘  │
└─────────────────────────────────┘

┌─────────────────────────────────┐
│  RESPONSE: "...soft..."          │
│  [Light flashes when response]   │
└─────────────────────────────────┘
```

### **Interaction Flow:**

1. **Player adjusts knobs** (1-2s) → Signal strength updates
2. **Signal reaches "STRONG"** → "SIGNAL ACTIVE" light turns green
3. **Player clicks "Ask Question"** → Dropdown appears
4. **Player selects question** (1s) → Question is "asked"
5. **Ghost responds** (1-2s) → Word appears, "RESPONSE RECEIVED" light flashes
6. **Word logged to evidence** → Switch to next tool

**Total: 3-5 seconds** ✅ Perfect for 7-second window!

---

## 🎮 Question Categories (With Overlap)

### **Age Questions:**
- "Are you old?"
- "Are you young?"
- **Response**: Words from emotion/theme families (doesn't directly answer, but gives words)

### **Friendliness Questions:**
- "Are you friendly?"
- "Are you bad?"
- **Response**: Words that hint at personality (e.g., "soft" = friendly, "anger" = not friendly)

### **Location Questions:**
- "Where are you?"
- "Are you here?"
- **Response**: Theme words (e.g., "behind", "here", "close")

### **Activity Questions:**
- "What do you want?"
- "Why are you here?"
- **Response**: Mix of emotion and theme words

### **Identity Questions:**
- "Who are you?"
- "What happened to you?"
- **Response**: Rare words (harder to get, but still overlap)

**Key Point:** Questions don't give direct answers - they just trigger word responses from the ghost's word families. Words still overlap, maintaining deduction system.

---

## 🔧 Implementation: Phasmophobia-Style System

### **Signal Strength System:**

```typescript
enum SignalStrength {
  WEAK = 'weak',      // 30-70% proximity
  STRONG = 'strong',  // 70-90% proximity
  LOCKED = 'locked',  // 90-100% proximity
}

function getSignalStrength(proximity: number): SignalStrength {
  if (proximity < 0.3) return SignalStrength.WEAK;
  if (proximity < 0.7) return SignalStrength.STRONG;
  return SignalStrength.LOCKED;
}
```

### **Question System:**

```typescript
interface Question {
  id: string;
  text: string;
  category: 'age' | 'friendliness' | 'location' | 'activity' | 'identity';
  wordFamilyBias?: 'emotion' | 'theme' | 'both';
}

const QUESTIONS: Question[] = [
  { id: 'age-old', text: 'Are you old?', category: 'age', wordFamilyBias: 'emotion' },
  { id: 'age-young', text: 'Are you young?', category: 'age', wordFamilyBias: 'emotion' },
  { id: 'friendly', text: 'Are you friendly?', category: 'friendliness', wordFamilyBias: 'emotion' },
  { id: 'bad', text: 'Are you bad?', category: 'friendliness', wordFamilyBias: 'emotion' },
  { id: 'where', text: 'Where are you?', category: 'location', wordFamilyBias: 'theme' },
  { id: 'here', text: 'Are you here?', category: 'location', wordFamilyBias: 'theme' },
  { id: 'want', text: 'What do you want?', category: 'activity', wordFamilyBias: 'both' },
  { id: 'why', text: 'Why are you here?', category: 'activity', wordFamilyBias: 'both' },
  { id: 'who', text: 'Who are you?', category: 'identity', wordFamilyBias: 'both' },
];
```

### **Response Logic:**

```typescript
function getResponse(
  question: Question,
  wordFamilies: WordFamily,
  signalStrength: SignalStrength
): string {
  // Select word based on question category
  let wordPool: string[];
  if (question.wordFamilyBias === 'emotion') {
    wordPool = wordFamilies.emotion;
  } else if (question.wordFamilyBias === 'theme') {
    wordPool = wordFamilies.theme;
  } else {
    wordPool = [...wordFamilies.emotion, ...wordFamilies.theme];
  }
  
  // Signal strength affects word quality
  if (signalStrength === SignalStrength.WEAK) {
    // Might get wrong word (from other ghosts' families)
    if (Math.random() < 0.3) {
      wordPool = getAllGhostWords(); // Wrong word
    }
  } else if (signalStrength === SignalStrength.LOCKED) {
    // Might get rare word
    if (Math.random() < 0.2) {
      wordPool = getRareWords(wordFamilies);
    }
  }
  
  return wordPool[Math.floor(Math.random() * wordPool.length)];
}
```

---

## 🎯 Advantages of Phasmophobia-Style

### **1. Fits 7-Second Window:**
- ✅ Quick tune (1-2s) + Question (1s) + Response (1-2s) = 3-5s total
- ✅ Players can use it during camera cooldown
- ✅ Doesn't break rapid tool rotation

### **2. Maintains Analog Feel:**
- ✅ Still uses knobs (physical-feeling)
- ✅ Still requires tuning (skill expression)
- ✅ Still feels like a radio/spirit box
- ✅ Adds light indicators (like Phasmophobia)

### **3. Adds Player Agency:**
- ✅ Players choose which questions to ask
- ✅ Different questions might get different words
- ✅ More engaging than random words

### **4. Works with Overlapping Evidence:**
- ✅ Words still overlap (no single solve)
- ✅ Questions don't give away ghost type
- ✅ Signal quality affects word clarity (adds depth)

### **5. Familiar to Players:**
- ✅ Similar to Phasmophobia (proven mechanic)
- ✅ But unique (still has tuning aspect)
- ✅ Best of both worlds

---

## 🎨 Visual Design: Phasmophobia-Inspired

### **Light Indicators:**

**SIGNAL ACTIVE Light:**
- **Off**: Signal too weak
- **Green (dim)**: Signal WEAK (30-70%)
- **Green (bright)**: Signal STRONG (70-90%)
- **Green (pulsing)**: Signal LOCKED (90-100%)

**RESPONSE RECEIVED Light:**
- **Off**: No response
- **Red (flash)**: Ghost responded with word
- **Red (steady)**: Ghost is actively responding

### **Oscilloscope Display:**
- Shows waveform based on signal strength
- **WEAK**: Chaotic, noisy waveform
- **STRONG**: Clearer waveform, less noise
- **LOCKED**: Perfect waveform, no noise

### **Word Display:**
- Appears on oscilloscope screen
- Fades in/out (3 seconds)
- Color based on signal strength:
  - **WEAK**: Red/orange (distorted)
  - **STRONG**: Yellow (clear)
  - **LOCKED**: Green (perfect)

---

## 🔄 Response Behavior (Ghost Personality)

### **How Ghosts Respond to Questions:**

**Wraith (Gentle):**
- Responds quickly to friendly questions
- Words: "soft", "lost", "cold"
- Signal is stable, easy to maintain

**Shade (Reluctant):**
- Slow to respond (3-5 second delay)
- Might not respond to some questions
- Words: "silent", "unknown", "stay"
- Requires perfect signal (LOCKED) to respond

**Poltergeist (Chaotic):**
- Responds quickly but signal drifts
- Multiple words at once
- Words: "noisy", "chaotic", "mine"
- Signal is unstable, must chase it

**Banshee (Aggressive):**
- Responds immediately, aggressively
- Words appear in ALL CAPS with red glow
- Words: "anger", "sorrow", "leave"
- Signal is strong but requires precise tuning

**Phantom (Distorted):**
- Responses are delayed and distorted
- Words might appear backwards
- Words: "hollow", "gone", "cold"
- Signal flickers, hard to maintain

**Onyx (Deliberate):**
- Slow, deliberate responses
- Long pauses between words
- Words: "deep", "below", "hungry"
- Signal is stable but slow to respond

**Trickster (Playful):**
- Unpredictable responses
- Might give wrong words (from other ghosts)
- Words: "playful", "teasing", "behind"
- Signal drifts constantly

**All behaviors overlap** - can't identify ghost from response style alone.

---

## 🎮 Two-Mode System (Quick + Deep)

### **Quick Mode** (3-5 seconds) - For 7-Second Window:

1. **Auto-Tune Button** (optional):
   - Automatically tunes to ghost's frequency
   - Cooldown: 10-15 seconds (prevents spam)
   - Gets you to "STRONG" signal quickly

2. **Manual Tune** (if no auto-tune):
   - Adjust knobs to get "STRONG" signal (wider tolerance)
   - Takes 1-2 seconds with wider tolerance

3. **Ask Question**:
   - Click question from list
   - Ghost responds with word
   - Total: 3-5 seconds

### **Deep Mode** (10-30 seconds) - For Investigation:

1. **Manual Tune**:
   - Precise tuning to "LOCKED" signal
   - Takes 10-20 seconds
   - Rewards skill

2. **Multiple Questions**:
   - Ask several questions
   - Build conversation
   - Get multiple words

3. **Better Responses**:
   - Perfect tuning = clearer words
   - Might get rare words
   - Higher confidence evidence

---

## 📊 Question Response Mapping (With Overlap)

### **How Questions Map to Word Families:**

**Age Questions:**
- "Are you old?" → Higher chance of emotion words (e.g., "lost", "cold")
- "Are you young?" → Higher chance of theme words (e.g., "playful", "teasing")
- **Overlap**: Both questions can give words from multiple ghosts

**Friendliness Questions:**
- "Are you friendly?" → Higher chance of positive emotion words (e.g., "soft", "gentle")
- "Are you bad?" → Higher chance of negative emotion words (e.g., "anger", "chaos")
- **Overlap**: Words still overlap (e.g., "cold" could be Wraith or Phantom)

**Location Questions:**
- "Where are you?" → Higher chance of theme words (e.g., "behind", "here", "close")
- "Are you here?" → Higher chance of theme words (e.g., "here", "present")
- **Overlap**: Theme words overlap (e.g., "behind" = Trickster or Banshee)

**Activity Questions:**
- "What do you want?" → Mix of emotion and theme words
- "Why are you here?" → Mix of emotion and theme words
- **Overlap**: Mix creates more overlap, not less

**Identity Questions:**
- "Who are you?" → Rare words (harder to get)
- "What happened to you?" → Rare words
- **Overlap**: Rare words still overlap, just less common

**Key Point:** Questions bias word selection but don't eliminate overlap. Still need other tools to confirm.

---

## 🎯 Implementation Priority

### **Phase 1: Core Question System** (MVP+)
1. Add question list (8-10 questions)
2. Add question selection UI (dropdown)
3. Add response logic (word selection based on question)
4. Add light indicators (SIGNAL ACTIVE, RESPONSE RECEIVED)
5. Test in 7-second window

### **Phase 2: Signal Strength System** (MVP+)
1. Implement wider tolerance for "STRONG" signal
2. Add signal strength visual feedback
3. Add response quality based on signal strength
4. Add auto-tune button (optional, for quick mode)

### **Phase 3: Ghost Personality Responses** (Post-MVP)
1. Add response delays based on ghost type
2. Add response style (aggressive, gentle, etc.)
3. Add signal drift for chaotic ghosts
4. Add wrong word chance for Trickster

---

## ✅ Summary

**Phasmophobia-Style Spirit Box:**
- ✅ **Fast** (3-5 seconds) - Fits 7-second window
- ✅ **Familiar** (proven mechanic)
- ✅ **Maintains analog feel** (still uses knobs)
- ✅ **Adds player agency** (choose questions)
- ✅ **Works with overlap** (words still overlap)
- ✅ **Maintains immersion** (light indicators, waveform)

**Best Approach:**
- **Quick tune** (1-2s) to get "STRONG" signal
- **Ask question** (1s) from predefined list
- **Get response** (1-2s) - word appears
- **Light indicators** show signal and response status
- **Total: 3-5 seconds** ✅ Perfect for juggling!

**This combines:**
- Phasmophobia's question system (fast, familiar)
- Your analog tool aesthetic (knobs, tuning)
- Your overlap system (words still overlap)
- Your 7-second window (fits perfectly)
