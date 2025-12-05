# Ghost Behavior API - Usage Guide

## Overview

The Ghost Behavior API provides investigation tools with access to the behavioral profile of the currently active ghost. This API is designed to be used during investigations to determine how tools should react based on the ghost's characteristics.

## Core Hook: `useActiveGhost()`

The main hook that returns the complete behavioral profile of a ghost.

```tsx
import { useActiveGhost } from '../hooks/useActiveGhost';
import { GhostType } from '../stores/ghostStore';

function InvestigationTool() {
  const currentGhostType = GhostType.WRAITH; // From investigation context
  const ghostBehavior = useActiveGhost(currentGhostType);
  
  if (!ghostBehavior) {
    return <div>No active ghost</div>;
  }
  
  // Access all behavioral properties
  const { 
    emfPersonality,
    spiritBoxSignature,
    wordFamilies,
    cameraManifestations,
    thermalReading 
  } = ghostBehavior;
  
  return <div>Investigating {emfPersonality} ghost</div>;
}
```

## Specialized Hooks

For convenience, specialized hooks are provided for each tool type:

### 1. EMF Meter - `useActiveGhostEMF()`

Returns the EMF personality pattern for the active ghost.

```tsx
import { useActiveGhostEMF } from '../hooks/useActiveGhost';

function EMFMeter({ activeGhostType }) {
  const emfPersonality = useActiveGhostEMF(activeGhostType);
  
  // Personality types:
  // - 'calm': Consistent, smooth readings
  // - 'unstable': Chaotic ±1 jitter
  // - 'shy': Reads lower until close
  // - 'aggressive': Spikes early
  // - 'mischievous': Oscillating sin-wave
  
  const getReadingPattern = () => {
    switch (emfPersonality) {
      case 'calm':
        return baseReading; // Smooth, consistent
      case 'unstable':
        return baseReading + (Math.random() * 2 - 1); // ±1 jitter
      case 'shy':
        return distance > 10 ? baseReading * 0.5 : baseReading; // Lower until close
      case 'aggressive':
        return baseReading * 1.5; // Spikes early
      case 'mischievous':
        return baseReading + Math.sin(time) * 2; // Oscillating
      default:
        return baseReading;
    }
  };
  
  return <EMFDisplay reading={getReadingPattern()} />;
}
```

### 2. Spirit Box - `useActiveGhostSpiritBox()` & `useActiveGhostWords()`

Returns the Spirit Box tuning signature and word families.

```tsx
import { useActiveGhostSpiritBox, useActiveGhostWords } from '../hooks/useActiveGhost';

function SpiritBox({ activeGhostType }) {
  const spiritBoxSig = useActiveGhostSpiritBox(activeGhostType);
  const wordFamilies = useActiveGhostWords(activeGhostType);
  
  if (!spiritBoxSig || !wordFamilies) return null;
  
  const { knobA, knobB, tolerance } = spiritBoxSig;
  
  // Check if player has tuned correctly
  const isLocked = 
    Math.abs(playerKnobA - knobA) < tolerance &&
    Math.abs(playerKnobB - knobB) < tolerance;
  
  // Select random word from combined families
  const allWords = [...wordFamilies.emotion, ...wordFamilies.theme];
  const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
  
  return (
    <div>
      {isLocked ? (
        <div>
          <div>SIGNAL LOCKED</div>
          <div>{randomWord}</div>
        </div>
      ) : (
        <div>STATIC</div>
      )}
    </div>
  );
}
```

### 3. Camera - `useActiveGhostCamera()`

Returns camera manifestation types and their probabilities.

```tsx
import { useActiveGhostCamera } from '../hooks/useActiveGhost';

function Camera({ activeGhostType }) {
  const manifestations = useActiveGhostCamera(activeGhostType);
  
  if (!manifestations) return null;
  
  const takePhoto = () => {
    // Roll for manifestation based on probabilities
    const roll = Math.random();
    let cumulative = 0;
    
    for (const manifestation of manifestations) {
      cumulative += manifestation.probability;
      if (roll <= cumulative) {
        return manifestation.primary;
      }
    }
    
    return manifestations[0].primary; // Fallback
  };
  
  const result = takePhoto();
  
  return (
    <div>
      <div>Photo Result: {result}</div>
      {/* Display appropriate visual based on manifestation type */}
    </div>
  );
}
```

### 4. Thermal Scanner - `useActiveGhostThermal()`

Returns the thermal reading category.

```tsx
import { useActiveGhostThermal } from '../hooks/useActiveGhost';

function ThermalScanner({ activeGhostType }) {
  const thermalReading = useActiveGhostThermal(activeGhostType);
  
  // Reading types:
  // - 'normal': Ambient temperature
  // - 'cold_spot': Chill zone
  // - 'deep_cold': <8°C
  
  const getTemperature = () => {
    switch (thermalReading) {
      case 'normal':
        return 20; // 20°C
      case 'cold_spot':
        return 10; // 10°C
      case 'deep_cold':
        return 5; // 5°C
      default:
        return 20;
    }
  };
  
  const temp = getTemperature();
  const color = temp < 8 ? 'blue' : temp < 15 ? 'cyan' : 'green';
  
  return (
    <div style={{ color }}>
      <div>Temperature: {temp}°C</div>
      <div>Reading: {thermalReading}</div>
    </div>
  );
}
```

## Complete Example: Investigation Tool Integration

Here's a complete example showing how to integrate the Ghost Behavior API into an investigation screen:

```tsx
import { useState } from 'react';
import { GhostType } from '../stores/ghostStore';
import { 
  useActiveGhost,
  useActiveGhostEMF,
  useActiveGhostSpiritBox,
  useActiveGhostWords,
  useActiveGhostCamera,
  useActiveGhostThermal
} from '../hooks/useActiveGhost';

function InvestigationScreen() {
  const [activeGhostType] = useState<GhostType>(GhostType.WRAITH);
  const [activeTool, setActiveTool] = useState<'emf' | 'spirit' | 'camera' | 'thermal'>('emf');
  
  // Get complete behavior profile
  const ghostBehavior = useActiveGhost(activeGhostType);
  
  // Or use specialized hooks for specific tools
  const emfPersonality = useActiveGhostEMF(activeGhostType);
  const spiritBoxSig = useActiveGhostSpiritBox(activeGhostType);
  const wordFamilies = useActiveGhostWords(activeGhostType);
  const cameraManifestations = useActiveGhostCamera(activeGhostType);
  const thermalReading = useActiveGhostThermal(activeGhostType);
  
  if (!ghostBehavior) {
    return <div>No active investigation</div>;
  }
  
  return (
    <div>
      <div>
        <h2>Investigation Tools</h2>
        <button onClick={() => setActiveTool('emf')}>EMF Meter</button>
        <button onClick={() => setActiveTool('spirit')}>Spirit Box</button>
        <button onClick={() => setActiveTool('camera')}>Camera</button>
        <button onClick={() => setActiveTool('thermal')}>Thermal</button>
      </div>
      
      <div>
        {activeTool === 'emf' && (
          <div>
            <h3>EMF Meter</h3>
            <p>Personality: {emfPersonality}</p>
          </div>
        )}
        
        {activeTool === 'spirit' && (
          <div>
            <h3>Spirit Box</h3>
            <p>Target: A={spiritBoxSig?.knobA}, B={spiritBoxSig?.knobB}</p>
            <p>Words: {[...wordFamilies?.emotion || [], ...wordFamilies?.theme || []].join(', ')}</p>
          </div>
        )}
        
        {activeTool === 'camera' && (
          <div>
            <h3>Camera</h3>
            <p>Manifestations:</p>
            <ul>
              {cameraManifestations?.map((m, i) => (
                <li key={i}>{m.primary} ({(m.probability * 100).toFixed(0)}%)</li>
              ))}
            </ul>
          </div>
        )}
        
        {activeTool === 'thermal' && (
          <div>
            <h3>Thermal Scanner</h3>
            <p>Reading: {thermalReading}</p>
          </div>
        )}
      </div>
    </div>
  );
}
```

## API Reference

### Types

```typescript
interface GhostBehavior {
  emfPersonality: EMFPersonality;
  spiritBoxSignature: SpiritBoxSignature;
  wordFamilies: WordFamily;
  cameraManifestations: CameraManifestation[];
  thermalReading: ThermalReading;
}

interface SpiritBoxSignature {
  knobA: number;  // 0.0 - 1.0
  knobB: number;  // 0.0 - 1.0
  tolerance: number; // 0.06 for all ghosts (MVP)
}

interface WordFamily {
  emotion: string[];
  theme: string[];
}

interface CameraManifestation {
  primary: CameraManifestationType;
  secondary?: CameraManifestationType;
  probability: number; // 0.0 - 1.0
}

enum EMFPersonality {
  CALM = 'calm',
  UNSTABLE = 'unstable',
  SHY = 'shy',
  AGGRESSIVE = 'aggressive',
  MISCHIEVOUS = 'mischievous',
}

enum ThermalReading {
  NORMAL = 'normal',
  COLD_SPOT = 'cold_spot',
  DEEP_COLD = 'deep_cold',
}
```

## Requirements Validation

This implementation satisfies all requirements from Spec 014:

- ✅ **14.1**: Ghost Behavior API provides `getActiveGhostBehavior()` method
- ✅ **14.2**: EMF personality exposed via `useActiveGhostEMF()` hook
- ✅ **14.3**: Spirit Box signature (knobA, knobB, tolerance) exposed via `useActiveGhostSpiritBox()`
- ✅ **14.4**: Word families exposed via `useActiveGhostWords()`
- ✅ **14.5**: Camera manifestations exposed via `useActiveGhostCamera()`
- ✅ **14.5**: Thermal reading exposed via `useActiveGhostThermal()`

## Next Steps

This API is now ready for integration with Spec 015 (Investigation Tools & Ghost Interaction). Investigation tools can use these hooks to:

1. Query the active ghost's behavioral profile
2. Adjust tool readings based on ghost personality
3. Display appropriate manifestations
4. Provide accurate evidence for deduction

The API is designed to be simple, type-safe, and easy to use across all investigation tools.
