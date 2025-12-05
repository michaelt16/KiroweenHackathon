# Design Document

## Overview

This design refactors the Spirit Box and EMF Meter to create a clearer separation of concerns: EMF provides pure distance measurement while Spirit Box becomes the exclusive tool for discovering ghost personality through interactive questions. The redesign maintains the core principle that no single tool can identify a ghost - players must combine evidence from multiple sources.

## Architecture

### High-Level Changes

1. **EMF Meter Simplification**
   - Remove `EMFPersonality` enum and all personality-related logic
   - EMF becomes a pure distance indicator (0-5 scale)
   - Remove personality noise from EMF calculations

2. **Spirit Box Enhancement**
   - Add question system (3 questions after signal lock)
   - Implement response frequency system (30-80% based on personality)
   - Expand word pool system (Common, Personality, Unique)
   - Add response cooldown (2-3 seconds between questions)

3. **Evidence System Update**
   - Remove "EMF Personality" from evidence checklist
   - Add "Spirit Box Personality" to evidence checklist
   - Update ghost filtering logic to use Spirit Box personality

4. **Data Model Changes**
   - Expand `WordFamily` to include personality categories
   - Add response frequency to ghost definitions
   - Add question-response mapping

## Components and Interfaces

### 1. Ghost Store Updates

#### Remove EMFPersonality Enum
```typescript
// DELETE THIS ENUM
export enum EMFPersonality {
  CALM = 'calm',
  UNSTABLE = 'unstable',
  SHY = 'shy',
  AGGRESSIVE = 'aggressive',
}
```

#### Add Spirit Box Personality Enum
```typescript
export enum SpiritBoxPersonality {
  AGGRESSIVE = 'aggressive',  // Wraith, Onyx, Trickster
  SHY = 'shy',                // Banshee, Shade
  CHAOTIC = 'chaotic',        // Poltergeist, Phantom
  CONTRADICTORY = 'contradictory', // Trickster only (uses all words)
}
```

#### Expand Word Pool System
```typescript
export interface WordPools {
  common: string[];           // 20-40% chance - all ghosts
  personality: string[];      // 50-60% chance - personality-specific
  unique: string[];           // 10-20% chance - ghost-specific
}

export interface ResponseBehavior {
  frequency: number;          // 0.3-0.8 (30-80% response rate)
  wordPools: WordPools;
  personality: SpiritBoxPersonality | SpiritBoxPersonality[]; // Wraith has dual
}
```

#### Update GhostData Interface
```typescript
export interface GhostData {
  id: GhostType;
  name: string;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME';
  difficulty: 'EASIEST' | 'EASY' | 'MEDIUM' | 'HARD' | 'HARDEST';
  
  // Behavioral Profile
  // emfPersonality: EMFPersonality; // ❌ REMOVE THIS
  spiritBoxSignature: SpiritBoxSignature;
  spiritBoxResponse: ResponseBehavior; // ✅ ADD THIS
  cameraManifestations: CameraManifestation[];
  thermalReading: ThermalReading;
  
  // ... rest unchanged
}
```

### 2. Investigation Store Updates

#### Update Evidence Checklist
```typescript
evidenceChecklist: {
  // emfPersonality: EMFPersonalityState; // ❌ REMOVE THIS
  spiritBoxPersonality: SpiritBoxPersonality | 'unknown'; // ✅ ADD THIS
  whispers: 'present' | 'ruled_out' | 'unknown';
  thermalReading: ThermalReadingState;
  cameraManifestation: CameraManifestationState;
}
```

#### Add Spirit Box Question State
```typescript
spiritBoxState: {
  isLocked: boolean;
  currentKnobs: { knobA: number; knobB: number } | null;
  questionCooldown: boolean;
  cooldownEndTime: number | null;
  wordsHeard: string[]; // Track all words heard during investigation
}
```

#### Update Evidence Entry Type
```typescript
export interface EvidenceEntry {
  id: string;
  timestamp: number;
  type: 'emf' | 'spiritbox' | 'thermal' | 'photo';
  data: {
    // EMF (simplified - no personality)
    level?: number;
    distance?: number;
    
    // Spirit Box (expanded)
    word?: string;
    wordCategory?: 'common' | 'personality' | 'unique';
    question?: string; // Which question was asked
    responded?: boolean; // Did ghost respond or show "No response"
    frequency?: { knobA: number; knobB: number };
    
    // Thermal
    temperature?: number;
    category?: string;
    
    // Photo
    manifestation?: string | null;
  };
}
```

### 3. Spirit Box Component Updates

#### Add Question System UI
```typescript
interface SpiritBoxQuestion {
  id: string;
  text: string;
  category: 'nature' | 'presence' | 'motivation';
}

const QUESTIONS: SpiritBoxQuestion[] = [
  { id: 'friendly', text: 'Are you friendly?', category: 'nature' },
  { id: 'here', text: 'Are you here?', category: 'presence' },
  { id: 'why', text: 'Why are you here?', category: 'motivation' },
];
```

#### Response Logic (Context-Aware)
```typescript
function handleQuestionAsked(question: SpiritBoxQuestion): void {
  const ghost = getCurrentGhost();
  const responseFrequency = ghost.spiritBoxResponse.frequency;
  
  // Roll for response
  const willRespond = Math.random() < responseFrequency;
  
  if (willRespond) {
    // Select word from pools based on question context
    const questionContext = question.id; // 'friendly', 'here', or 'why'
    const word = selectContextualWord(
      ghost.spiritBoxResponse.wordPools,
      questionContext
    );
    
    // Display word with animation
    displayWord(word);
    
    // Log evidence
    logEvidence({
      type: 'spiritbox',
      data: {
        word,
        wordCategory: determineCategory(word, ghost),
        question: question.text,
        questionContext,
        responded: true,
      },
    });
  } else {
    // Show "No response..."
    displayNoResponse();
    
    // Log non-response
    logEvidence({
      type: 'spiritbox',
      data: {
        question: question.text,
        responded: false,
      },
    });
  }
  
  // Start cooldown (2-3 seconds)
  startQuestionCooldown();
}
```

#### Word Selection Algorithm (Context-Aware)
```typescript
function selectContextualWord(
  pools: WordPools,
  questionContext: 'friendly' | 'here' | 'why'
): string {
  const roll = Math.random();
  
  // Common words: 30% (same for all questions)
  if (roll < 0.3) {
    return randomChoice(pools.common);
  }
  
  // Personality words: 55% (context-aware)
  if (roll < 0.85) {
    // Select from personality words matching the question
    const contextualWords = pools.personality[questionContext];
    return randomChoice(contextualWords);
  }
  
  // Unique words: 15% (context-aware)
  const uniqueWords = pools.unique[questionContext];
  return randomChoice(uniqueWords);
}

// Example usage:
// Question: "Are you friendly?"
// Context: 'friendly'
// Aggressive ghost → selects from ['Run', 'Die', 'No', 'Leave', 'Hate', 'Never']
// Shy ghost → selects from ['Hide', 'Quiet', 'Away', 'No', 'Scared', 'Alone']
// Chaotic ghost → selects from ['Play', 'Maybe', 'Fun', 'Chaos', 'Trick']
```

### 4. EMF Meter Component Updates

#### Simplified EMF Calculation
```typescript
function calculateEMFLevel(distance: number): number {
  // Pure distance-based calculation (no personality noise)
  if (distance > 40) return 0;
  if (distance > 20) return 1;
  if (distance > 10) return 2;
  if (distance > 6) return 3;
  if (distance > 3) return 4;
  return 5;
}
```

#### Remove Personality Display
```typescript
// ❌ DELETE THIS
function getEMFPersonalityLabel(personality: EMFPersonality): string {
  // ...
}

// ❌ DELETE THIS
<div className="emf-personality">
  {getEMFPersonalityLabel(personality)}
</div>
```

### 5. Evidence Tab Updates

#### Remove EMF Personality Selection
```typescript
// ❌ DELETE THIS
<EvidenceSelector
  label="EMF Personality"
  options={['calm', 'unstable', 'shy', 'aggressive']}
  value={evidenceChecklist.emfPersonality}
  onChange={(value) => setEvidenceState('emfPersonality', value)}
/>
```

#### Add Spirit Box Personality Selection
```typescript
// ✅ ADD THIS
<EvidenceSelector
  label="Spirit Box Personality"
  options={['aggressive', 'lost', 'chaotic', 'shy', 'contradictory', 'unknown']}
  value={evidenceChecklist.spiritBoxPersonality}
  onChange={(value) => setEvidenceState('spiritBoxPersonality', value)}
/>
```

#### Update Ghost Filtering Logic
```typescript
function filterGhostsByEvidence(checklist: EvidenceChecklist): GhostType[] {
  let possibleGhosts = Object.values(GhostType);
  
  // Filter by Spirit Box personality (not EMF)
  if (checklist.spiritBoxPersonality !== 'unknown') {
    possibleGhosts = possibleGhosts.filter(ghostType => {
      const ghost = getGhost(ghostType);
      const personalities = Array.isArray(ghost.spiritBoxResponse.personality)
        ? ghost.spiritBoxResponse.personality
        : [ghost.spiritBoxResponse.personality];
      
      return personalities.includes(checklist.spiritBoxPersonality);
    });
  }
  
  // Filter by camera manifestation
  if (checklist.cameraManifestation !== 'unknown') {
    possibleGhosts = possibleGhosts.filter(ghostType => {
      const ghost = getGhost(ghostType);
      return ghost.cameraManifestations.some(
        m => m.primary === checklist.cameraManifestation
      );
    });
  }
  
  // Filter by thermal reading
  if (checklist.thermalReading !== 'unknown') {
    possibleGhosts = possibleGhosts.filter(ghostType => {
      const ghost = getGhost(ghostType);
      return ghost.thermalReading === checklist.thermalReading;
    });
  }
  
  return possibleGhosts;
}
```

## Data Models

### Word Pool Definitions

#### Question 1: "What do you want?" (Intent/Motivation)

**Common Words** (30% - All ghosts):
```typescript
const Q1_COMMON = [
  'help me', 'stay here', 'so cold', 'find me', 'go back'
];
```

**Aggressive Words** (55% - Wraith, Onyx, Trickster):
```typescript
const Q1_AGGRESSIVE = [
  'your fear', 'leave now', 'your pain', 'silence you', 'come closer'
];
```

**Shy Words** (55% - Banshee, Shade):
```typescript
const Q1_SHY = [
  'quiet please', 'go away', 'let me', 'hide now', 'need peace'
];
```

**Chaotic Words** (55% - Poltergeist, Phantom):
```typescript
const Q1_CHAOTIC = [
  'break things', 'make noise', 'hear me', 'play now', 'mine now'
];
```

**Unique Words** (15% - Ghost-specific):
```typescript
const Q1_UNIQUE = {
  wraith: ['lost soul'],
  banshee: ['mourning song'],
  shade: ['still quiet'],
  poltergeist: ['mess maker'],
  phantom: ['empty echo'],
  onyx: ['deep hunger'],
  trickster: ['again again'], // Glitched repeat
};
```

---

#### Question 2: "Where are you?" (Location/Presence)

**Common Words** (30% - All ghosts):
```typescript
const Q2_COMMON = [
  'right here', 'behind you', 'nearby now', 'all around', "can't see"
];
```

**Aggressive Words** (55% - Wraith, Onyx, Trickster):
```typescript
const Q2_AGGRESSIVE = [
  'watching you', 'right above', 'waiting here', 'under you', 'next to you'
];
```

**Shy Words** (55% - Banshee, Shade):
```typescript
const Q2_SHY = [
  'far away', 'in shadows', 'hiding now', 'too dark', 'not close'
];
```

**Chaotic Words** (55% - Poltergeist, Phantom):
```typescript
const Q2_CHAOTIC = [
  'everywhere now', 'nowhere close', 'circling you', 'behind walls', 'moving fast'
];
```

**Unique Words** (15% - Ghost-specific):
```typescript
const Q2_UNIQUE = {
  wraith: ['thin veil'],
  banshee: ['doorway edge'],
  shade: ['deep corner'],
  poltergeist: ['inside walls'],
  phantom: ['between worlds'],
  onyx: ['below earth'],
  trickster: ['look up'],
};
```

---

#### Question 3: "Are you here?" (Confirmation/Proximity)

**Common Words** (30% - All ghosts):
```typescript
const Q3_COMMON = [
  'maybe so', 'i am', 'not now', 'almost here', 'very close'
];
```

**Aggressive Words** (55% - Wraith, Onyx, Trickster):
```typescript
const Q3_AGGRESSIVE = [
  'always here', 'run now', 'too late', 'with you', 'danger near'
];
```

**Shy Words** (55% - Banshee, Shade):
```typescript
const Q3_SHY = [
  "don't know", 'soft yes', 'not sure', 'stay back', 'i hide'
];
```

**Chaotic Words** (55% - Poltergeist, Phantom):
```typescript
const Q3_CHAOTIC = [
  'echo here', 'laughing no', 'where again', 'shift now', 'almost here'
];
```

**Unique Words** (15% - Ghost-specific):
```typescript
const Q3_UNIQUE = {
  wraith: ['drifting by'],
  banshee: ['still listening'],
  shade: ['watching softly'],
  poltergeist: ['here-here'], // Glitch double
  phantom: ['fading in'],
  onyx: ['heavy breath'],
  trickster: ['behind you'], // Even if said earlier
};
```

### Ghost Response Configurations

```typescript
const GHOST_RESPONSES: Record<GhostType, ResponseBehavior> = {
  [GhostType.WRAITH]: {
    frequency: 0.75, // 70-80% (Aggressive)
    personality: SpiritBoxPersonality.AGGRESSIVE,
    wordPools: {
      q1: { common: Q1_COMMON, personality: Q1_AGGRESSIVE, unique: Q1_UNIQUE.wraith },
      q2: { common: Q2_COMMON, personality: Q2_AGGRESSIVE, unique: Q2_UNIQUE.wraith },
      q3: { common: Q3_COMMON, personality: Q3_AGGRESSIVE, unique: Q3_UNIQUE.wraith },
    },
  },
  
  [GhostType.BANSHEE]: {
    frequency: 0.35, // 30-40% (Shy)
    personality: SpiritBoxPersonality.SHY,
    wordPools: {
      q1: { common: Q1_COMMON, personality: Q1_SHY, unique: Q1_UNIQUE.banshee },
      q2: { common: Q2_COMMON, personality: Q2_SHY, unique: Q2_UNIQUE.banshee },
      q3: { common: Q3_COMMON, personality: Q3_SHY, unique: Q3_UNIQUE.banshee },
    },
  },
  
  [GhostType.SHADE]: {
    frequency: 0.35, // 30-40% (Shy)
    personality: SpiritBoxPersonality.SHY,
    wordPools: {
      q1: { common: Q1_COMMON, personality: Q1_SHY, unique: Q1_UNIQUE.shade },
      q2: { common: Q2_COMMON, personality: Q2_SHY, unique: Q2_UNIQUE.shade },
      q3: { common: Q3_COMMON, personality: Q3_SHY, unique: Q3_UNIQUE.shade },
    },
  },
  
  [GhostType.POLTERGEIST]: {
    frequency: 0.55, // 50-60% (Chaotic)
    personality: SpiritBoxPersonality.CHAOTIC,
    wordPools: {
      q1: { common: Q1_COMMON, personality: Q1_CHAOTIC, unique: Q1_UNIQUE.poltergeist },
      q2: { common: Q2_COMMON, personality: Q2_CHAOTIC, unique: Q2_UNIQUE.poltergeist },
      q3: { common: Q3_COMMON, personality: Q3_CHAOTIC, unique: Q3_UNIQUE.poltergeist },
    },
  },
  
  [GhostType.PHANTOM]: {
    frequency: 0.55, // 50-60% (Chaotic)
    personality: SpiritBoxPersonality.CHAOTIC,
    wordPools: {
      q1: { common: Q1_COMMON, personality: Q1_CHAOTIC, unique: Q1_UNIQUE.phantom },
      q2: { common: Q2_COMMON, personality: Q2_CHAOTIC, unique: Q2_UNIQUE.phantom },
      q3: { common: Q3_COMMON, personality: Q3_CHAOTIC, unique: Q3_UNIQUE.phantom },
    },
  },
  
  [GhostType.ONYX]: {
    frequency: 0.75, // 70-80% (Aggressive)
    personality: SpiritBoxPersonality.AGGRESSIVE,
    wordPools: {
      q1: { common: Q1_COMMON, personality: Q1_AGGRESSIVE, unique: Q1_UNIQUE.onyx },
      q2: { common: Q2_COMMON, personality: Q2_AGGRESSIVE, unique: Q2_UNIQUE.onyx },
      q3: { common: Q3_COMMON, personality: Q3_AGGRESSIVE, unique: Q3_UNIQUE.onyx },
    },
  },
  
  [GhostType.TRICKSTER]: {
    frequency: 0.75, // 70-80% (Aggressive frequency, but uses ALL words)
    personality: SpiritBoxPersonality.CONTRADICTORY,
    wordPools: {
      // Trickster uses ALL personality words (creates contradictions)
      q1: { 
        common: Q1_COMMON, // 40% chance
        personality: [...Q1_AGGRESSIVE, ...Q1_SHY, ...Q1_CHAOTIC], // 45% chance
        unique: Q1_UNIQUE.trickster, // 15% chance
      },
      q2: { 
        common: Q2_COMMON,
        personality: [...Q2_AGGRESSIVE, ...Q2_SHY, ...Q2_CHAOTIC],
        unique: Q2_UNIQUE.trickster,
      },
      q3: { 
        common: Q3_COMMON,
        personality: [...Q3_AGGRESSIVE, ...Q3_SHY, ...Q3_CHAOTIC],
        unique: Q3_UNIQUE.trickster,
      },
    },
  },
};
```

## Trickster Special Behavior

### How Trickster Creates Contradictions

Trickster is unique because it:
1. **Responds like an Aggressive ghost** (70-80% frequency)
2. **Uses words from ALL personality categories** (Aggressive, Shy, Chaotic)
3. **Creates contradictions** with other tool evidence
4. **Most likely to give glitched/repeated words** (e.g., "again again", "here-here")

### Example Contradiction Scenario

**Investigation Evidence:**
- **Camera**: Glitch Streaks (Trickster manifestation)
- **Thermal**: Cold Spot (matches Trickster)
- **EMF**: Distance only (no personality)
- **Spirit Box**: 
  - Q1: "What do you want?" → "quiet please" (Shy word)
  - Q2: "Where are you?" → "under you" (Aggressive word)
  - Q3: "Are you here?" → "echo here" (Chaotic word)
  - Q1 again: "again again" (Unique glitch)

**Player Realization:**
- "Wait, it said 'quiet please' (shy), then 'under you' (aggressive), then 'echo here' (chaotic)?"
- "That doesn't match any single ghost personality..."
- "And it said 'again again' - that's a glitched response!"
- "It must be Trickster pretending to be different ghosts!"

### Implementation Details

```typescript
// Trickster's word selection
if (ghostType === GhostType.TRICKSTER) {
  const roll = Math.random();
  
  // Common words: 40% (higher than other ghosts)
  if (roll < 0.4) {
    return randomChoice(COMMON_WORDS[questionContext]);
  }
  
  // Personality words: 45% (from ANY personality)
  if (roll < 0.85) {
    const allPersonalityWords = [
      ...Q_AGGRESSIVE[questionContext],
      ...Q_SHY[questionContext],
      ...Q_CHAOTIC[questionContext],
    ];
    return randomChoice(allPersonalityWords);
  }
  
  // Unique words: 15% (glitched responses)
  return randomChoice(Q_UNIQUE.trickster[questionContext]);
}
```

### Why This Works

- **Other ghosts**: Consistent personality (always Aggressive, always Shy, or always Chaotic)
- **Trickster**: Inconsistent personality (mixes all three randomly)
- **Player deduction**: "These words contradict each other → must be Trickster"

### Trickster Word Pool

Trickster has access to ALL words:
```typescript
const TRICKSTER_WORD_POOL = {
  q1: [...Q1_COMMON, ...Q1_AGGRESSIVE, ...Q1_SHY, ...Q1_CHAOTIC, ...Q1_UNIQUE.trickster],
  q2: [...Q2_COMMON, ...Q2_AGGRESSIVE, ...Q2_SHY, ...Q2_CHAOTIC, ...Q2_UNIQUE.trickster],
  q3: [...Q3_COMMON, ...Q3_AGGRESSIVE, ...Q3_SHY, ...Q3_CHAOTIC, ...Q3_UNIQUE.trickster],
};
```

## Error Handling

### Spirit Box Edge Cases

1. **Signal Lost During Question**
   - Cancel question cooldown
   - Hide question buttons
   - Display "SIGNAL LOST" message

2. **Multiple Rapid Questions**
   - Enforce 2-3 second cooldown between questions
   - Disable buttons during cooldown
   - Show cooldown timer (optional)

3. **No Response Handling**
   - Display "No response..." with static effect
   - Log as evidence (non-response is data)
   - Allow asking another question after cooldown

### EMF Edge Cases

1. **Distance Calculation Errors**
   - Default to level 0 if distance unavailable
   - Clamp values to 0-5 range
   - Handle negative distances gracefully

2. **Rapid Position Changes**
   - Smooth EMF transitions (0.2s animation)
   - Prevent flickering between levels
   - Use debouncing for rapid updates

## Testing Strategy

### Unit Tests

1. **Word Selection Algorithm**
   - Test probability distribution (common 30%, personality 55%, unique 15%)
   - Verify all word pools are accessible
   - Test Trickster's random selection from all categories

2. **Response Frequency**
   - Test each ghost's response rate over 100 iterations
   - Verify Shy ghosts respond 30-40% of time
   - Verify Aggressive ghosts respond 70-80% of time

3. **EMF Distance Calculation**
   - Test all distance thresholds (40m, 20m, 10m, 6m, 3m)
   - Verify level 0-5 output
   - Test edge cases (exactly 10m, negative distance)

4. **Evidence Filtering**
   - Test ghost filtering by Spirit Box personality
   - Verify Wraith appears for both Aggressive and Lost
   - Verify Trickster only appears for Contradictory
   - Test multi-tool evidence combinations

### Integration Tests

1. **Spirit Box Question Flow**
   - Achieve signal lock → Questions appear
   - Ask question → Word or "No response" appears
   - Cooldown enforced → Buttons disabled for 2-3s
   - Evidence logged correctly

2. **EMF Meter Simplification**
   - EMF shows only distance (no personality)
   - EMF updates as player moves
   - No personality noise in readings

3. **Evidence Tab Integration**
   - Spirit Box personality selection works
   - Ghost filtering updates correctly
   - EMF personality field removed

### Dev Mode Testing

1. **Force Response**
   - Button to bypass response frequency RNG
   - Always get a word response
   - Test all word pools

2. **Ghost Type Override**
   - Select any ghost type
   - Verify correct response behavior
   - Test Trickster contradictions

3. **Word Pool Inspection**
   - Display current ghost's word pools
   - Show response frequency percentage
   - Log word category on selection

## Performance Considerations

### Word Selection Optimization

- Pre-compute word pool arrays on investigation start
- Cache personality word arrays
- Use weighted random selection (O(1) lookup)

### Evidence Logging

- Batch evidence updates (max 1 per second)
- Limit evidence array to last 50 entries
- Use indexed lookups for filtering

### Spirit Box State Management

- Debounce knob adjustments (50ms)
- Throttle signal lock checks (100ms)
- Use memoization for proximity calculations

## Migration Strategy

### Phase 1: Data Model Updates
1. Add `SpiritBoxPersonality` enum
2. Add `ResponseBehavior` interface
3. Update `GhostData` interface
4. Populate ghost response configurations

### Phase 2: Store Updates
1. Remove `EMFPersonality` from ghost store
2. Add `spiritBoxResponse` to ghost data
3. Update investigation store evidence checklist
4. Add Spirit Box question state

### Phase 3: Component Updates
1. Update EMF Meter (remove personality display)
2. Update Spirit Box (add question system)
3. Update Evidence Tab (swap EMF → Spirit Box personality)
4. Update ghost filtering logic

### Phase 4: Testing & Validation
1. Test all word pools
2. Verify response frequencies
3. Test evidence filtering
4. Validate Dev Mode functionality

### Phase 5: Cleanup
1. Remove unused EMF personality code
2. Remove old word family system
3. Update documentation
4. Final QA pass

## Related Documents

- **Requirements**: `.kiro/specs/018-spirit-box-emf-redesign/requirements.md`
- **Word System**: `.kiro/specs/018-spirit-box-redesign/spirit-box-word-system.md`
- **Redesign Proposal**: `ghost-hunt/SPIRIT_BOX_REDESIGN_PROPOSAL.md`
- **Ghost Tool Mechanics**: `.kiro/steering/014-ghost-tool-mechanics.md`
- **Trickster Mechanic**: `.kiro/steering/015-trickster-contradiction-mechanic.md`
