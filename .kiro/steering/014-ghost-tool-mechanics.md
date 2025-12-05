# 014 - Ghost Tool Mechanics & Investigation Mode

## 🎯 Purpose

This document defines the **final, locked mechanics** for Investigation Mode, including the core player loop, tool behaviors, ghost roster, and deduction system. This is the definitive guide for how ghost hunting works in Ghost Hunt.

---

## 📋 Overview – What This Mode Is

Investigation Mode transforms a player's real-world location into a haunted zone.

Players use **five physical-feeling analog tools**:

| Tool | Purpose |
|------|---------|
| **Radar** | Direction only |
| **EMF** | Distance + Personality Noise |
| **Camera** | Primary evidence, 7s film development |
| **Spirit Box** | Dual-knob tuning + word messages |
| **Thermal** | Soft environmental clue (bonus) |

**Ghosts are static in MVP** — but behave uniquely through signals, noises, personality patterns, and photo manifestations.

**The player solves the identity by combining overlapping hints, never through one perfect clue.**

---

## 🔄 Core Player Loop (Camera-First Loop – LOCKED)

This is the intended **REAL** flow of gameplay:

### 1. Enter the Hotspot
- Sanity begins ticking down slowly

### 2. Radar First → Find the Direction
- Radar blip wiggles ±5° so the player must rotate their phone IRL
- **Radar gives zero deduction, just direction**

### 3. EMF Second → Confirm Distance
- EMF = true distance → 0–5 **PLUS** personality noise (but NEVER lies about closeness)
- Player walks physically toward the ghost

### 4. When EMF Peaks (4/5) → Take a Photo
- Camera locks for **7 seconds** (film developing)
- This is the **intentional pacing mechanic**

### 5. While Camera is in Cooldown (7s Window)
Player rapidly rotates through tools:
- **EMF** → double-check personality
- **Spirit Box** → tune knobs, try to lock a voice, listen → ghost might whisper a word
- **Thermal** → check temperature pattern
- **Radar** → verify direction drift

**This 7-second tool-rotation window is the real skill expression.**

### 6. After Film Develops
Player checks the photo:
- Silhouette?
- Blur?
- Invisible?
- Eyes?
- Distorted shape?

If still unsure → take another photo.

### 7. Gather Enough Combined Hints
Open the **Evidence Tab**:
- Camera logs
- EMF personality log
- Spirit Box words
- Thermal notes
- Radar direction history
- Sanity timeline

### 8. Player Selects a Ghost
Clippy delivers the cinematic finale:
- Confirm
- Explain
- Or roast the player

---

## 🔧 Tools (Final Locked Behavior)

### 2.1 Radar (Direction Only)

**Behavior**:
- Shows one blip
- Blip has ±5° wobble
- Works at any distance
- **No ghost identity hints**

**Player Action**: Rotate IRL until aligned

---

### 2.2 EMF – Distance + Personality Noise (LOCKED MVP MECHANIC)

**EMF Formula**:
```
baseLevel = TRUE distance
displayLevel = baseLevel + personalityNoise
clamped 0–5
BUT NEVER deceiving (base 1 never becomes 5)
```

#### Base Levels

| Distance | Base Level |
|----------|------------|
| >40m | 0 |
| 20–40m | 1 |
| 10–20m | 2 |
| 6–10m | 3 |
| 3–6m | 4 |
| <3m | 5 |

#### Personality Noise Types (Fully Locked)

| Personality | Behavior |
|-------------|----------|
| **Calm** | Consistent, smooth |
| **Unstable** | Chaotic ±1 jitter |
| **Shy** | Reads lower until close |
| **Aggressive** | Spikes early |
| **Mischievous** | Oscillating sin-wave |

#### What EMF Contributes to Deduction
**Soft hint**: Narrows down to 2–3 ghosts, never 1.

---

### 2.3 Spirit Box – Dual Knob System + Ghost Words (LOCKED)

#### Knobs
- **Knob A**: Carrier Frequency
- **Knob B**: Modulation Frequency

Each ghost has a hidden pair:
- Example: Onyx → (0.25, 0.82)
- Example: Trickster → (0.48, 0.60)

**When both knobs align within tolerance**:
- Signal Locked → ghost whispers a word

#### Word System (Locked)
Each ghost belongs to **two word families**:
- Emotion family
- Theme family

**Each word overlaps with multiple ghosts** (no single solve).

**Example overlaps**:
- "behind" → Trickster or Banshee
- "cold" → Wraith or Phantom
- "mine" → Trickster or Poltergeist

#### Spirit Box vs Camera Priority
- Spirit Box is a **medium hint**
- Camera is the **primary confirmation**

---

### 2.4 Camera – Core Information Tool

**Behavior**:
- Immediate shot → **7s developing**
- Forces tool-switching
- Creates gameplay tension

#### Types of Manifestation

| Manifestation | Matches |
|---------------|---------|
| Faint silhouette | 2 ghosts |
| Motion blur | 2 ghosts |
| Screaming face | 2 ghosts |
| Deep shadow | 2 ghosts |
| Invisible | Phantom guaranteed, others low chance |

**Photos are stored in the Evidence Tab.**

This is the **single strongest diagnostic tool**.
Still **NOT** a 1-to-1 solve.

---

### 2.5 Thermal – Soft Clue Only

#### Three States

| Reading | Meaning | Matches |
|---------|---------|---------|
| **Normal** | Ambient temp | Wraith, Shade, Phantom |
| **Cold Spot** | Chill zone | Poltergeist, Banshee, Onyx |
| **Deep Cold** | <8°C | Phantom, Onyx |

**No single thermal reading solves anything.**
Useful only combined with EMF and Spirit Box.

---

## 👻 Ghost Roster (Final 7 Ghosts LOCKED)

Each ghost has:
- EMF Personality
- Spirit Box Signature
- Word Families
- Camera Pattern
- Thermal Category
- Difficulty flavor

### 3.1 Final Deduction Matrix

➡️ **This prevents a single hint from eliminating half the roster.**

---

#### Ghost 1 – Wraith

| Property | Value |
|----------|-------|
| **EMF** | Calm |
| **Spirit Box** | Weak Whisper |
| **Words** | soft, lost, cold |
| **Camera** | Faint silhouette |
| **Thermal** | Normal |
| **Difficulty** | Easiest, beginner-friendly |

---

#### Ghost 2 – Shade

| Property | Value |
|----------|-------|
| **EMF** | Shy |
| **Spirit Box** | Hidden Modulation (Knob B only) |
| **Words** | silent, unknown, stay |
| **Camera** | Half-formed body |
| **Thermal** | Normal |
| **Difficulty** | Deceptively quiet |

---

#### Ghost 3 – Poltergeist

| Property | Value |
|----------|-------|
| **EMF** | Unstable |
| **Spirit Box** | Static Peaks |
| **Words** | noisy, chaotic, mine |
| **Camera** | Distorted motion blur |
| **Thermal** | Cold Spot |
| **Difficulty** | Mid |

---

#### Ghost 4 – Banshee

| Property | Value |
|----------|-------|
| **EMF** | Aggressive |
| **Spirit Box** | Dual Precision |
| **Words** | anger, sorrow, leave |
| **Camera** | Screaming face |
| **Thermal** | Cold Spot |
| **Difficulty** | High tension |

---

#### Ghost 5 – Phantom

| Property | Value |
|----------|-------|
| **EMF** | Calm |
| **Spirit Box** | Reverse Speech |
| **Words** | hollow, gone, cold |
| **Camera** | Invisible (guaranteed) or faint glitch |
| **Thermal** | Deep Cold |
| **Difficulty** | Uncanny |

---

#### Ghost 6 – Onyx

| Property | Value |
|----------|-------|
| **EMF** | Shy |
| **Spirit Box** | Low Frequency Hum |
| **Words** | deep, below, hungry |
| **Camera** | Shadow silhouette |
| **Thermal** | Deep Cold / Cold Spot |
| **Difficulty** | Psychology-heavy |

---

#### Ghost 7 – Trickster

| Property | Value |
|----------|-------|
| **EMF** | Mischievous |
| **Spirit Box** | Chaotic Modulation (lock drifts) |
| **Words** | playful, teasing, behind, mine |
| **Camera** | Glitch streaks |
| **Thermal** | Cold Spot |
| **Difficulty** | Hardest to tune |

---

## 🧩 How Deduction Works (The Secret Sauce)

**No hint ever removes more than 2–3 ghosts.**

Players must combine:
1. **Camera** (strongest hint)
2. **Spirit Box Words** (medium)
3. **EMF Personality** (soft)
4. **Thermal** (soft)
5. **Radar** (no deduction)

This creates a **Phasmophobia-style overlapping deduction pattern**.

---

## 📝 Two Full Example Use Cases

### 📌 Case A – Onyx

| Evidence | Narrows To |
|----------|------------|
| Camera = shadow silhouette | Shade, Onyx |
| EMF = Shy | Shade, Onyx |
| Thermal = Deep Cold | Phantom, Onyx |
| Spirit Box Word = "deep" | Phantom, Onyx |

**Final overlap = Onyx.**

---

### 📌 Case B – Poltergeist

| Evidence | Narrows To |
|----------|------------|
| EMF = Unstable | Poltergeist, Trickster |
| Spirit Box = Static Peaks | Poltergeist only (but Trickster still possible if player mis-tunes) |
| Word = "mine" | Trickster, Poltergeist |
| Camera = motion blur | Poltergeist, Trickster |

**Player must combine them → Poltergeist.**

---

## 🚀 Scalability

This design lets you add:
- New ghosts
- New words
- New personalities
- New spirit-box profiles
- Moving ghosts
- Provocation items
- Sanity variants
- Boss ghosts
- Outdoors vs indoors mechanics

**…without ever breaking deduction.**

---

**Status**: ✅ LOCKED - Final Investigation Mode Mechanics
**Last Updated**: 2024
**Authority**: MAXIMUM - This is the definitive investigation system
