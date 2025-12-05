# 018 - Spirit Box Redesign: Interactive Question System & Word Vocabulary

## 🎯 Purpose

This document defines the **Spirit Box Interactive Question System** - a redesign that makes Spirit Box more engaging and personality-driven through conversational interactions. Players tune the frequency, then ask questions to the ghost, receiving personality-based responses.

**Status**: 📋 DESIGN PHASE
**Last Updated**: 2024
**Authority**: Design Specification

---

## 🔄 Core Flow

### 1. Tune Frequency (Existing)
- Player adjusts **Knob A** (Carrier Frequency) and **Knob B** (Modulation Frequency)
- When both knobs align within tolerance → **Signal Locked**
- Visual/audio feedback indicates connection

### 2. Ask Questions (New Interactive Layer)
- After signal lock, **3 question buttons appear**:
  - "Are you friendly?"
  - "Are you here?"
  - "Why are you here?"
- Player selects a question
- Ghost responds based on personality and response frequency

### 3. Response Behavior
- **Response Frequency** varies by ghost personality:
  - **Shy ghosts** (Shade, Banshee): Answer 30-40% of the time
  - **Aggressive ghosts** (Wraith, Phantom, Onyx): Answer 70-80% of the time
  - **Chaotic ghosts** (Poltergeist, Trickster): Answer randomly 50-60%
  


- **Response Content** matches personality:
  - Aggressive → Threatening words ("Run", "Die", "Leave")
  - Shy → Quiet words ("Hide", "Quiet", "Stay")
  - Chaotic → Unpredictable words ("Break", "Mine", "Chaos")

### 4. No Response Handling
- If ghost doesn't respond (based on frequency):
  - Show static/noise
  - Display: "No response..."
  - Player can ask another question (if still locked)

---

## 📝 Word Vocabulary System

### Common Words (All Ghosts Can Say)
**Purpose**: Add noise and ambiguity - these words don't help identify ghosts.

**Word Pool**:
- "Here"
- "You"
- "Me"
- "Now"
- "Wait"
- "Stay"
- "Go"
- "Look"
- "See"
- "Come"
- "Help"

**Usage**:
- All ghosts have 30-40% chance to respond with common words
- These words appear in responses but don't narrow down identification
- Player thinks: "They said 'here' but that doesn't help, need other hints"

---

### Personality-Based Word Categories

#### Aggressive Words
**Ghosts**: Banshee, Wraith (when aggressive)

**Word Pool**:
- "Run"
- "Die"
- "Leave"
- "Hate"
- "Kill"
- "Anger"
- "Away"
- "Stop"

**Response Examples**:
- Question: "Are you friendly?" → "Run" or "Die"
- Question: "Are you here?" → "Leave" or "Away"
- Question: "Why are you here?" → "Hate" or "Anger"

---

#### Soft/Lost Words
**Ghosts**: Wraith (when lost), Phantom

**Word Pool**:
- "Cold"
- "Alone"
- "Lost"
- "Help"
- "Stay"
- "Here"
- "Gone"
- "Empty"
- "Void"

**Response Examples**:
- Question: "Are you friendly?" → "Alone" or "Cold"
- Question: "Are you here?" → "Here" or "Lost"
- Question: "Why are you here?" → "Gone" or "Empty"

---

#### Chaotic Words
**Ghosts**: Poltergeist, Trickster

**Word Pool**:
- "Break"
- "Mine"
- "Chaos"
- "Behind"
- "Play"
- "Tease"
- "Noise"
- "Shatter"

**Response Examples**:
- Question: "Are you friendly?" → "Play" or "Tease"
- Question: "Are you here?" → "Behind" or "Mine"
- Question: "Why are you here?" → "Chaos" or "Break"

---

#### Shy/Hidden Words
**Ghosts**: Shade, Onyx

**Word Pool**:
- "Hide"
- "Quiet"
- "Below"
- "Deep"
- "Hungry"
- "Wait"
- "Silent"
- "Dark"
- "Shadow"

**Response Examples**:
- Question: "Are you friendly?" → "Quiet" or "Hide"
- Question: "Are you here?" → "Below" or "Deep"
- Question: "Why are you here?" → "Hungry" or "Dark"

---

#### Unique Words (Still Overlap, But Narrower)

**Banshee-Specific** (Aggressive + Emotional):
- "Sorrow"
- "Rage"
- "Pain"
- "Cry"

**Phantom-Specific** (Lost + Void):
- "Hollow"
- "Void"
- "Nothing"
- "Fade"

**Onyx-Specific** (Shy + Dark):
- "Deep"
- "Below"
- "Hungry"
- "Consume"

**Trickster-Specific** (Mischievous):
- "Behind"
- "Tease"
- "Fool"
- "Laugh"

---

## 👻 Ghost-Specific Word Pools

### Wraith
**Personality**: Aggressive + Lost (dual nature)

**Word Pool**:
- Common: 30% chance
- Aggressive: "Run", "Die", "Leave", "Hate" (40% chance)
- Lost: "Cold", "Alone", "Lost" (30% chance)

**Response Frequency**: 70-80% (aggressive nature makes it more responsive)

**Example Responses**:
- "Are you friendly?" → "Run" (aggressive) or "Cold" (lost)
- "Are you here?" → "Leave" (aggressive) or "Here" (lost)
- "Why are you here?" → "Hate" (aggressive) or "Alone" (lost)

---

### Banshee
**Personality**: Pure Aggressive

**Word Pool**:
- Common: 20% chance
- Aggressive: "Die", "Leave", "Hate", "Kill", "Anger" (60% chance)
- Unique: "Sorrow", "Rage", "Pain", "Cry" (20% chance)

**Response Frequency**: 80% (very responsive, aggressive)

**Example Responses**:
- "Are you friendly?" → "Die" or "Hate"
- "Are you here?" → "Leave" or "Away"
- "Why are you here?" → "Anger" or "Rage"

---

### Shade
**Personality**: Shy + Hidden

**Word Pool**:
- Common: 30% chance
- Shy: "Hide", "Quiet", "Stay", "Silent" (50% chance)
- Lost: "Alone", "Cold" (20% chance - shares with Wraith/Phantom)

**Response Frequency**: 30-40% (very shy, rarely responds)

**Example Responses**:
- "Are you friendly?" → "Quiet" or "Hide" (if responds)
- "Are you here?" → "Below" or "Silent" (if responds)
- "Why are you here?" → "Alone" or "Stay" (if responds)

---

### Poltergeist
**Personality**: Chaotic + Unstable

**Word Pool**:
- Common: 25% chance
- Chaotic: "Break", "Mine", "Chaos", "Noise", "Shatter" (50% chance)
- Aggressive: "Run", "Leave" (25% chance - shares with aggressive ghosts)

**Response Frequency**: 50-60% (unpredictable)

**Example Responses**:
- "Are you friendly?" → "Break" or "Chaos"
- "Are you here?" → "Mine" or "Behind"
- "Why are you here?" → "Noise" or "Shatter"

---

### Phantom
**Personality**: Lost + Void

**Word Pool**:
- Common: 30% chance
- Lost: "Cold", "Alone", "Gone", "Empty" (50% chance)
- Unique: "Hollow", "Void", "Nothing", "Fade" (20% chance)

**Response Frequency**: 60-70% (responds but with sad words)

**Example Responses**:
- "Are you friendly?" → "Alone" or "Cold"
- "Are you here?" → "Gone" or "Void"
- "Why are you here?" → "Empty" or "Nothing"

---

### Onyx
**Personality**: Shy + Dark/Deep

**Word Pool**:
- Common: 25% chance
- Shy: "Hide", "Quiet", "Below", "Deep" (50% chance)
- Unique: "Hungry", "Consume", "Dark", "Shadow" (25% chance)

**Response Frequency**: 30-40% (shy, rarely responds)

**Example Responses**:
- "Are you friendly?" → "Quiet" or "Hide" (if responds)
- "Are you here?" → "Below" or "Deep" (if responds)
- "Why are you here?" → "Hungry" or "Dark" (if responds)

---

### Trickster
**Personality**: Contradictory + Mischievous

**Word Pool**:
- Common: 40% chance (uses more common words to be less helpful)
- **Random mix from ALL categories** (contradictory):
  - Aggressive: "Run", "Die" (15% chance)
  - Lost: "Cold", "Alone" (15% chance)
  - Chaotic: "Break", "Chaos" (15% chance)
  - Shy: "Hide", "Quiet" (15% chance)
- Unique: "Behind", "Tease", "Fool", "Laugh" (20% chance)

**Response Frequency**: 50-60% (unpredictable, sometimes doesn't respond to confuse)

**Example Responses** (Contradictory):
- "Are you friendly?" → "Run" (aggressive) OR "Alone" (lost) OR "Tease" (mischievous)
- "Are you here?" → "Behind" (mischievous) OR "Cold" (lost) OR "Hide" (shy)
- "Why are you here?" → Random mix that doesn't match other evidence

**Special Behavior**:
- Trickster's words contradict its other traits
- If EMF is calm, might say aggressive words
- If Thermal is normal, might say "Cold" (lost words)
- Creates confusion and requires recognizing contradiction

---

## 🎮 Question System

### Available Questions

**Question 1: "Are you friendly?"**
- Purpose: Reveals ghost's nature (aggressive vs shy vs lost)
- Aggressive ghosts: Threatening responses
- Shy ghosts: Rarely responds or says "Hide"/"Quiet"
- Lost ghosts: Melancholic responses

**Question 2: "Are you here?"**
- Purpose: Confirms presence and location
- Most ghosts respond to this (higher response rate)
- Reveals location words ("Here", "Behind", "Below")

**Question 3: "Why are you here?"**
- Purpose: Reveals motivation/personality
- Aggressive: "Hate", "Anger"
- Lost: "Alone", "Gone", "Empty"
- Chaotic: "Chaos", "Break"
- Shy: "Hungry", "Dark" (if responds)

### Question Selection UI

**In Dev Mode (PC)**:
- 3 clickable buttons appear after signal lock
- Each button shows the question text
- Clicking a question triggers response (or no response)

**Future Mobile Implementation**:
- Voice input for questions
- Or same button system for consistency

### Response Display

**When Ghost Responds**:
- Word appears on screen (typed out effect)
- Audio: Whispered/spooky voice
- Visual: Text appears in Spirit Box display area

**When No Response**:
- Static/noise effect
- Text: "No response..."
- Player can try another question (if still locked)

---

## 🧩 Deduction Integration

### How Words Help Identify

**Word Categories as Evidence**:
- Instead of "EMF Personality", use "Spirit Box Personality"
- Categories: Aggressive, Lost, Chaotic, Shy, Contradictory

**Overlap Strategy**:
- "Run" → Could be Wraith (aggressive) or Banshee (aggressive)
- "Cold" → Could be Wraith (lost) or Phantom (lost)
- "Behind" → Could be Trickster (mischievous) or Poltergeist (chaotic)
- "Hide" → Could be Shade (shy) or Onyx (shy)

**Requires Multiple Tools**:
- Spirit Box words alone don't solve
- Need Camera + Thermal + Spirit Box to narrow down
- Common words add noise (don't help)

### Evidence Tab Integration

**Remove**: EMF Personality selection
**Add**: Spirit Box Personality selection
- Options: Aggressive, Lost, Chaotic, Shy, Contradictory, Unknown

**How to Determine**:
- Player hears words from questions
- If hears "Run", "Die", "Leave" → Select "Aggressive"
- If hears "Cold", "Alone", "Gone" → Select "Lost"
- If hears "Break", "Chaos", "Mine" → Select "Chaotic"
- If hears "Hide", "Quiet", "Below" → Select "Shy"
- If words contradict other evidence → Select "Contradictory" (Trickster)

---

## 🎯 Design Goals

1. **More Engaging**: Interactive questions vs passive word reception
2. **Personality-Driven**: Response frequency and content reveal personality
3. **Still Requires Multiple Tools**: Words alone don't solve
4. **Adds Noise**: Common words create ambiguity
5. **Trickster Confusion**: Contradictory words make Trickster harder

---

## 📊 Response Frequency Matrix

| Ghost | Response Rate | Personality |
|-------|--------------|-------------|
| **Wraith** | 70-80% | Aggressive + Lost |
| **Banshee** | 80% | Pure Aggressive |
| **Shade** | 30-40% | Shy + Hidden |
| **Poltergeist** | 50-60% | Chaotic + Unstable |
| **Phantom** | 60-70% | Lost + Void |
| **Onyx** | 30-40% | Shy + Dark |
| **Trickster** | 50-60% | Contradictory + Mischievous |

---

## 🔧 Implementation Notes

### Technical Requirements

1. **Question UI Component**
   - 3 buttons appear after signal lock
   - Disabled when not locked
   - Visual feedback on click

2. **Response Logic**
   - Check response frequency (RNG based on ghost type)
   - If responds: Select word from appropriate pool
   - If no response: Show static/no response message

3. **Word Selection Algorithm**
   - Weighted random selection from word pools
   - Common words: 20-40% chance (varies by ghost)
   - Personality words: 50-60% chance
   - Unique words: 10-20% chance

4. **Evidence Integration**
   - Track words heard during investigation
   - Allow player to select personality category in Evidence Tab
   - Remove EMF personality from evidence system

### UI/UX Considerations

- **Question Buttons**: Clear, readable, fits analog horror aesthetic
- **Response Display**: Typed-out effect, spooky font
- **No Response**: Clear indication (static, "No response...")
- **Cooldown**: Maybe 2-3 second cooldown between questions (prevents spam)

---

## 🎮 Example Gameplay Flow

### Scenario: Identifying Wraith

1. **Player tunes Spirit Box** → Signal locks
2. **Player asks**: "Are you friendly?"
3. **Wraith responds** (70% chance): "Run" (aggressive word)
4. **Player thinks**: "Aggressive response... could be Banshee or Wraith"
5. **Player asks**: "Why are you here?"
6. **Wraith responds**: "Alone" (lost word)
7. **Player thinks**: "Aggressive + Lost words... that's Wraith's dual nature!"
8. **Player checks other evidence**:
   - Camera: Faint Silhouette → Wraith or Shade
   - Thermal: Normal → Wraith or Shade
   - Spirit Box: Aggressive + Lost → Wraith
9. **Player identifies**: Wraith

### Scenario: Identifying Trickster

1. **Player tunes Spirit Box** → Signal locks
2. **Player asks**: "Are you friendly?"
3. **Trickster responds** (50% chance): "Alone" (lost word)
4. **Player checks EMF**: Aggressive pattern
5. **Player thinks**: "Wait... Aggressive EMF but lost words? That's contradictory!"
6. **Player asks**: "Are you here?"
7. **Trickster responds**: "Behind" (mischievous word)
8. **Player checks other evidence**:
   - EMF: Aggressive
   - Thermal: Deep Cold
   - Camera: Screaming Face
   - Spirit Box: Lost words (but EMF is aggressive - contradiction!)
9. **Player realizes**: "This doesn't match any ghost... it's Trickster!"

---

## 📝 Word Pool Summary

### Common Words (All Ghosts)
"Here", "You", "Me", "Now", "Wait", "Stay", "Go", "Look", "See", "Come", "Help"

### Aggressive Words
"Run", "Die", "Leave", "Hate", "Kill", "Anger", "Away", "Stop"

### Lost Words
"Cold", "Alone", "Lost", "Help", "Stay", "Here", "Gone", "Empty", "Void"

### Chaotic Words
"Break", "Mine", "Chaos", "Behind", "Play", "Tease", "Noise", "Shatter"

### Shy Words
"Hide", "Quiet", "Below", "Deep", "Hungry", "Wait", "Silent", "Dark", "Shadow"

### Unique Words
- **Banshee**: "Sorrow", "Rage", "Pain", "Cry"
- **Phantom**: "Hollow", "Void", "Nothing", "Fade"
- **Onyx**: "Deep", "Below", "Hungry", "Consume"
- **Trickster**: "Behind", "Tease", "Fool", "Laugh"

---

**Status**: 📋 DESIGN PHASE - Ready for Implementation
**Next Steps**: 
1. Implement question UI in SpiritBoxTool component
2. Create word pool data structure
3. Implement response logic
4. Update Evidence Tab to use Spirit Box personality instead of EMF personality
5. Test response frequencies and word selection




