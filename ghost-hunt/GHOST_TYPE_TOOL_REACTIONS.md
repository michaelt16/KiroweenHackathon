# 👻 Ghost Type Tool Reactions

## Overview

All tools now react differently based on ghost type, matching their key traits from the ghost definitions!

## 🎯 Ghost Trait Profiles

### Wraith (Fast & Aggressive)
**Key Traits**: EMF Reactivity, Static Disturbance, Sanity Behavior
- ✅ **Strong EMF** (0.4 weight)
- ❌ **Weak Cold** (0.1 weight)
- ❌ **Weak Whispers** (0.1 weight)

### Shade (Shy & Cold)
**Key Traits**: Whispers, Cold Spots
- ❌ **Weak EMF** (0.1 weight)
- ✅ **Strong Cold** (0.3 weight)
- ✅ **Strong Whispers** (0.4 weight)

### Poltergeist (Chaotic & Visual)
**Key Traits**: Static Disturbance, Photo Manifestation
- ❌ **Weak EMF** (0.15 weight)
- ❌ **Very Weak Cold** (0.05 weight)
- ❌ **Weak Whispers** (0.1 weight)

---

## 📊 EMF Meter Reactions

### Wraith
- **Multiplier**: 2.5x
- **Readings**: 60-100 mG (HIGH to EXTREME)
- **Behavior**: Constant high activity, frequent red bars
- **Status**: Often shows "⚠️ HIGH ACTIVITY" or "🚨 EXTREME ACTIVITY"

### Shade
- **Multiplier**: 0.3x
- **Readings**: 10-20 mG (NORMAL to SLIGHT)
- **Behavior**: Low, stable readings
- **Status**: Usually shows "NORMAL" or "SLIGHT ACTIVITY"

### Poltergeist
- **Multiplier**: 0.8x
- **Readings**: 30-50 mG (SLIGHT to MODERATE)
- **Behavior**: Medium readings with fluctuation
- **Status**: Shows "SLIGHT ACTIVITY" to "MODERATE ACTIVITY"

---

## 🌡️ Thermal Scanner Reactions

### Wraith
- **Cold Multiplier**: 0.3x
- **Temperature**: 58-65°F (barely cold)
- **Cold Spots**: Rare (20% chance)
- **Status**: Usually "— NORMAL"

### Shade
- **Cold Multiplier**: 2.0x
- **Temperature**: 20-35°F (FREEZING)
- **Cold Spots**: Frequent (70% chance)
- **Status**: Often "❄️ FREEZING" with many blue spots

### Poltergeist
- **Cold Multiplier**: 0.2x
- **Temperature**: 62-68°F (almost normal)
- **Cold Spots**: Very rare (10% chance)
- **Status**: Usually "— NORMAL"

---

## 📻 Audio Receiver Reactions

### Wraith
- **Audio Multiplier**: 0.4x
- **Audio Level**: 20-40% (low)
- **Whisper Chance**: 15% (rare)
- **Behavior**: Quiet, infrequent whispers
- **Status**: Mostly "📡 SCANNING..."

### Shade
- **Audio Multiplier**: 2.5x
- **Audio Level**: 80-100% (very high)
- **Whisper Chance**: 60% (frequent)
- **Behavior**: Constant activity, frequent whispers
- **Status**: Often "🔊 SIGNAL DETECTED"

### Poltergeist
- **Audio Multiplier**: 0.6x
- **Audio Level**: 30-50% (low-medium)
- **Whisper Chance**: 20% (rare)
- **Behavior**: Moderate activity, occasional whispers
- **Status**: Mix of scanning and occasional signals

---

## 🎮 Gameplay Impact

### Identifying Wraith
1. Switch to **EMF Meter** → See HIGH/EXTREME readings
2. Switch to **Thermal** → See normal temps, no cold spots
3. Switch to **Audio** → Hear very few whispers
4. **Conclusion**: High EMF + No Cold + No Audio = Wraith

### Identifying Shade
1. Switch to **EMF Meter** → See LOW readings
2. Switch to **Thermal** → See FREEZING temps, many cold spots
3. Switch to **Audio** → Hear frequent whispers
4. **Conclusion**: Low EMF + Cold + Whispers = Shade

### Identifying Poltergeist
1. Switch to **EMF Meter** → See MODERATE readings
2. Switch to **Thermal** → See normal temps
3. Switch to **Audio** → Hear few whispers
4. Switch to **Camera** → Take photos for manifestations
5. **Conclusion**: Medium EMF + No Cold + No Audio + Photos = Poltergeist

---

## 📈 Tool Effectiveness by Ghost

| Tool | Wraith | Shade | Poltergeist |
|------|--------|-------|-------------|
| **EMF Meter** | ⭐⭐⭐⭐⭐ | ⭐ | ⭐⭐ |
| **Thermal Scanner** | ⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Audio Receiver** | ⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Camera** | ⭐ | ⭐ | ⭐⭐⭐⭐⭐ |
| **Radar** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |

---

## ✨ Player Experience

### Before Enhancement
- All tools showed same readings regardless of ghost
- No way to distinguish ghost types through tools
- Evidence gathering felt arbitrary

### After Enhancement
- **Wraith**: EMF meter goes crazy, everything else quiet
- **Shade**: Freezing cold, constant whispers, low EMF
- **Poltergeist**: Moderate readings, best identified through photos

Players can now **actively investigate** and use tool readings to deduce ghost type, matching the Demonologist-style gameplay!

---

## 🔬 Technical Implementation

Each tool now:
1. Reads `ghostType` from InvestigationContext
2. Applies type-specific multipliers to readings
3. Adjusts frequency of events (cold spots, whispers)
4. Maintains realistic noise and fluctuation

**Multipliers are based on anomaly weights** from `useGhostBehavior.ts`:
- Wraith: emf=0.4, cold=0.1, whisper=0.1
- Shade: emf=0.1, cold=0.3, whisper=0.4
- Poltergeist: emf=0.15, cold=0.05, whisper=0.1

---

**Status**: ✅ All tools now react authentically to ghost types!
