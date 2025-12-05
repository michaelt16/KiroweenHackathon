# Evidence Balance Design - Skill-Based Problem Solving

## Problem Statement
With only 7 ghosts, we need to avoid single-trait identification. Players should need **2-3 pieces of evidence minimum** to narrow down, requiring skill and careful observation.

## Current Issues
- **UNSTABLE EMF** = Poltergeist (UNIQUE - too easy)
- **AGGRESSIVE EMF** = Banshee (UNIQUE - too easy)
- **MISCHIEVOUS EMF** = Trickster (UNIQUE - too easy)
- **SCREAMING_FACE camera** = Banshee (UNIQUE - too easy)
- **INVISIBLE camera** = Phantom (UNIQUE - too easy)
- **SHADOW_SILHOUETTE camera** = Onyx (UNIQUE - too easy)

**Result**: Players can identify ghosts with just 1-2 traits. No skill required.

---

## Balanced Overlap Matrix

### EMF Personality Distribution (5 types, 7 ghosts)
- **CALM**: Wraith, Phantom (2 ghosts) ✅
- **UNSTABLE**: Poltergeist, Trickster (2 ghosts) ✅
- **SHY**: Shade, Onyx (2 ghosts) ✅
- **AGGRESSIVE**: Banshee only (1 ghost) ❌ **NEEDS OVERLAP**
- **MISCHIEVOUS**: Trickster only (1 ghost) ❌ **NEEDS OVERLAP**

**Solution**: 
- Make **AGGRESSIVE** overlap: Banshee + Poltergeist (both aggressive, but different patterns)
- Make **MISCHIEVOUS** overlap: Trickster + Poltergeist (both chaotic, but Trickster is more playful)

**Revised EMF Distribution**:
- **CALM**: Wraith, Phantom
- **UNSTABLE**: Poltergeist, Trickster
- **SHY**: Shade, Onyx
- **AGGRESSIVE**: Banshee, Poltergeist (both aggressive, but Banshee spikes early, Poltergeist is chaotic)
- **MISCHIEVOUS**: Trickster, Poltergeist (both chaotic, but Trickster oscillates, Poltergeist jitters)

Wait, that creates overlap issues. Let me rethink...

**Better Solution - Redistribute**:
- **CALM**: Wraith, Phantom
- **UNSTABLE**: Poltergeist, Trickster
- **SHY**: Shade, Onyx
- **AGGRESSIVE**: Banshee, Wraith (Wraith is fast/aggressive in behavior, but calm EMF - change to aggressive EMF)
- **MISCHIEVOUS**: Trickster, Poltergeist (both chaotic)

Actually, let's keep it simpler and more balanced:

**Final EMF Distribution**:
- **CALM**: Wraith, Phantom (2)
- **UNSTABLE**: Poltergeist, Trickster (2)
- **SHY**: Shade, Onyx (2)
- **AGGRESSIVE**: Banshee, Wraith (2) - Wraith's fast movement = aggressive EMF spikes
- **MISCHIEVOUS**: Trickster, Poltergeist (2) - Both chaotic, Trickster oscillates, Poltergeist jitters

Hmm, that makes Trickster and Poltergeist both UNSTABLE and MISCHIEVOUS. That's confusing.

**Best Solution - Use 4 EMF Types Only**:
- **CALM**: Wraith, Phantom (2)
- **UNSTABLE**: Poltergeist, Trickster (2)
- **SHY**: Shade, Onyx (2)
- **AGGRESSIVE**: Banshee, Wraith (2) - Wraith's speed causes aggressive spikes

This gives us 4 types, each with 2 ghosts. Perfect overlap!

---

### Thermal Reading Distribution (3 types, 7 ghosts)
- **NORMAL**: Wraith, Shade (2 ghosts) ✅
- **COLD_SPOT**: Poltergeist, Banshee, Trickster (3 ghosts) ✅
- **DEEP_COLD**: Phantom, Onyx (2 ghosts) ✅

**This is already balanced!** Each thermal reading overlaps with 2-3 ghosts.

---

### Camera Manifestation Distribution (9 types, 7 ghosts)
Current issues:
- **SCREAMING_FACE** = Banshee only ❌
- **INVISIBLE** = Phantom only ❌
- **SHADOW_SILHOUETTE** = Onyx only ❌

**Solution - Redistribute to create overlaps**:

**Revised Camera Distribution**:
- **FAINT_SILHOUETTE**: Wraith, Shade (2 ghosts)
- **MOTION_BLUR**: Poltergeist, Trickster (2 ghosts)
- **SCREAMING_FACE**: Banshee, Poltergeist (2 ghosts) - Poltergeist can also show screaming face when chaotic
- **DEEP_SHADOW**: Banshee, Onyx (2 ghosts) - Both dark entities
- **INVISIBLE**: Phantom, Shade (2 ghosts) - Both hard to photograph
- **FAINT_GLITCH**: Phantom, Trickster (2 ghosts) - Both glitchy
- **SHADOW_SILHOUETTE**: Onyx, Shade (2 ghosts) - Both shadowy
- **GLITCH_STREAKS**: Trickster, Poltergeist (2 ghosts) - Both chaotic
- **HALF_FORMED_BODY**: Shade, Onyx (2 ghosts) - Both partially visible

This creates good overlap! Each manifestation type appears in 2 ghosts.

---

### Whispers (Spirit Box) Distribution
- **PRESENT**: Shade, Banshee, Phantom, Onyx, Trickster (5 ghosts)
- **RULED_OUT**: Wraith, Poltergeist (2 ghosts)

**This is fine** - it's a binary trait that helps narrow down but doesn't solve alone.

---

## Final Balanced Matrix

| Ghost | EMF | Whispers | Thermal | Camera |
|-------|-----|----------|---------|--------|
| **Wraith** | AGGRESSIVE | RULED_OUT | NORMAL | FAINT_SILHOUETTE |
| **Shade** | SHY | PRESENT | NORMAL | HALF_FORMED_BODY / INVISIBLE |
| **Poltergeist** | UNSTABLE | RULED_OUT | COLD_SPOT | MOTION_BLUR / SCREAMING_FACE |
| **Banshee** | AGGRESSIVE | PRESENT | COLD_SPOT | SCREAMING_FACE / DEEP_SHADOW |
| **Phantom** | CALM | PRESENT | DEEP_COLD | INVISIBLE / FAINT_GLITCH |
| **Onyx** | SHY | PRESENT | DEEP_COLD | SHADOW_SILHOUETTE / DEEP_SHADOW |
| **Trickster** | UNSTABLE | PRESENT | COLD_SPOT | GLITCH_STREAKS / FAINT_GLITCH |

---

## Identification Paths (Requiring 2-3 Traits)

### Example: Identifying Banshee
- **AGGRESSIVE EMF** → Could be Banshee OR Wraith (2 ghosts)
- **+ PRESENT Whispers** → Banshee (Wraith has RULED_OUT) ✅ **2 traits needed**

### Example: Identifying Phantom
- **DEEP_COLD Thermal** → Could be Phantom OR Onyx (2 ghosts)
- **+ CALM EMF** → Phantom (Onyx has SHY) ✅ **2 traits needed**

### Example: Identifying Trickster
- **UNSTABLE EMF** → Could be Trickster OR Poltergeist (2 ghosts)
- **+ PRESENT Whispers** → Trickster (Poltergeist has RULED_OUT) ✅ **2 traits needed**

### Example: Identifying Wraith
- **AGGRESSIVE EMF** → Could be Wraith OR Banshee (2 ghosts)
- **+ RULED_OUT Whispers** → Wraith (Banshee has PRESENT) ✅ **2 traits needed**

### Example: Identifying Poltergeist
- **UNSTABLE EMF** → Could be Poltergeist OR Trickster (2 ghosts)
- **+ RULED_OUT Whispers** → Poltergeist (Trickster has PRESENT) ✅ **2 traits needed**

### Example: Identifying Shade
- **SHY EMF** → Could be Shade OR Onyx (2 ghosts)
- **+ NORMAL Thermal** → Shade (Onyx has DEEP_COLD) ✅ **2 traits needed**

### Example: Identifying Onyx
- **SHY EMF** → Could be Onyx OR Shade (2 ghosts)
- **+ DEEP_COLD Thermal** → Onyx (Shade has NORMAL) ✅ **2 traits needed**

**Perfect!** Every ghost requires **exactly 2 traits** to identify uniquely. No single trait solves anything.

---

## Skill-Based Mechanics

### 1. **EMF Pattern Recognition** (Skill Required)
- **AGGRESSIVE**: Banshee spikes early (distance), Wraith spikes when moving fast (proximity)
  - **Skill**: Player must observe WHEN the spike happens (early = Banshee, close = Wraith)
- **UNSTABLE**: Poltergeist jitters randomly, Trickster oscillates in sine wave
  - **Skill**: Player must observe the PATTERN (random = Poltergeist, sine wave = Trickster)
- **SHY**: Shade reads low until very close, Onyx reads low until very close
  - **Skill**: Both similar, need other traits to distinguish

### 2. **Camera Manifestation Probability** (Skill Required)
- Each ghost has 2 possible manifestations with different probabilities
- **Skill**: Player must take MULTIPLE photos to see both types, or recognize the pattern
- Example: Banshee shows SCREAMING_FACE (85%) or DEEP_SHADOW (15%)
  - If player only sees DEEP_SHADOW, they might think it's Onyx
  - Need multiple photos to be sure

### 3. **Thermal Reading Patterns** (Skill Required)
- **COLD_SPOT**: Poltergeist (appears/disappears randomly), Banshee (stable), Trickster (moves)
  - **Skill**: Player must observe BEHAVIOR, not just presence
- **DEEP_COLD**: Phantom (stable extreme cold), Onyx (cold rises from ground)
  - **Skill**: Player must observe SOURCE of cold

### 4. **Spirit Box Word Context** (Skill Required)
- Words overlap, but COMBINATIONS are unique
- Example: "behind" appears for Trickster AND Banshee
- But Trickster says "playful, behind" while Banshee says "anger, behind"
- **Skill**: Player must remember WORD COMBINATIONS, not single words

---

## Implementation Changes Needed

### 1. Update EMF Personalities
- **Wraith**: Change from CALM to AGGRESSIVE (fast movement = aggressive spikes)
- **Banshee**: Keep AGGRESSIVE (spikes early at distance)
- **Poltergeist**: Keep UNSTABLE (random jitter)
- **Trickster**: Keep UNSTABLE (sine wave oscillation)
- **Shade**: Keep SHY
- **Onyx**: Keep SHY
- **Phantom**: Keep CALM

### 2. Update Camera Manifestations
- **Wraith**: FAINT_SILHOUETTE (primary), INVISIBLE (secondary 20%)
- **Shade**: HALF_FORMED_BODY (primary 70%), INVISIBLE (secondary 30%)
- **Poltergeist**: MOTION_BLUR (primary 75%), SCREAMING_FACE (secondary 25%)
- **Banshee**: SCREAMING_FACE (primary 85%), DEEP_SHADOW (secondary 15%)
- **Phantom**: INVISIBLE (primary 95%), FAINT_GLITCH (secondary 5%)
- **Onyx**: SHADOW_SILHOUETTE (primary 80%), DEEP_SHADOW (secondary 20%)
- **Trickster**: GLITCH_STREAKS (primary 70%), FAINT_GLITCH (secondary 30%)

### 3. Add Pattern Recognition to EMF Tool
- Display pattern type (jitter vs sine wave) in dev mode or as subtle hint
- Or require player to observe pattern over time

### 4. Add Thermal Behavior to Thermal Tool
- Show if cold spot is stable, moving, or appearing/disappearing
- Show source direction (ground vs air)

---

## Testing Checklist

- [ ] No single trait identifies a ghost uniquely
- [ ] Every ghost requires 2 traits minimum to identify
- [ ] EMF patterns are distinguishable (jitter vs sine wave)
- [ ] Camera manifestations overlap properly
- [ ] Thermal behaviors are distinguishable
- [ ] Word combinations help narrow down (not single words)

---

## Result

**Every ghost requires 2-3 pieces of evidence to identify uniquely.**
**Players must use skill to:**
- Observe EMF patterns (not just personality type)
- Take multiple photos to see manifestation probabilities
- Observe thermal behavior (not just reading type)
- Remember word combinations (not just single words)

This creates proper problem-solving gameplay with skill expression!


