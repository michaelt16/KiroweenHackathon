# Investigation Mode MVP — Design

## 1. State Structure

### Player Investigation State

```typescript
{
  ghostType: "Wraith" | "Shade" | "Poltergeist"
  ghostPosition: { angle: number, dist: number }
  sanity: number // 0–100
  events: array of recent anomalies
  toolsEnabled: object of booleans
  mode: "investigating" | "deducing" | "ritual" | "complete"
}
```

---

## 2. Radar UI

- **Full-screen circular radar**
- Player is fixed at center
- Ghost is rendered as pulsing dot
- Rings sweep outward every 2 seconds
- Subtle grain/noise overlay
- Optional: faint vignette to increase mood

---

## 3. Tool Buttons

### Bottom HUD (above ritual):
- EMF
- Thermal
- Audio
- Camera
- Static

### Pressing a tool:
- **EMF** → bar appears
- **Thermal** → blue pulses
- **Audio** → subtitles + whispers
- **Camera** → flash + silhouette chance
- **Static** → noise burst

**Tools don't "collect clues" — they let you see the ghost's behavior in different channels.**

---

## 4. Ghost Behavior Engine

### Behavior Tick (Every 1–2 seconds)

Depending on ghost type, it chooses:
- Move
- Generate anomaly
- Generate whisper
- Cause static
- Affect sanity
- Trigger silhouette
- Idle

### Each ghost type has:
- `behaviorWeights`
- `anomalyFrequency`
- `movementSpeed`
- `silhouetteChance`
- `sanityDrain`

### Example (Shade):
- high `whisperFrequency`
- medium `coldFrequency`
- low `emf`
- low `static`
- lowest `aggression`
- low `silhouette chance`

---

## 5. Deduction Screen

### Triggered when:
- enough anomalies logged **OR**
- user presses "Deduce" in Dev Mode

### UI:
- "Which ghost is haunting this location?"
- **3 options**
- Each represented by:
  - silhouette
  - name
  - 3 bullet-point traits

**Select one → go to Ritual.**

---

## 6. Ritual Screen

### Simple MVP interactions:

#### Option A: Hold to Banish
- Full-screen icon
- "Hold to Banish"
- Progress ring fills
- If user lifts → fail

#### Option B: Tap-sequence
- Show 3 symbols
- Player must tap them in order

### Outcomes:
- **Success** → "Ghost Banished"
- **Failure** → "Ghost Escaped"

---

## 7. Sound & Atmosphere (Optional MVP)

- Soft heartbeat
- Static hiss
- Cold wind
- Whisper SFX
- Radar ping
- Camera shutter

**If time is short:**
Use only **radar ping + static burst**.
That's enough to sell the vibe.
