# Spec 013: Tool Component Refactoring - Design

## Component API Design

### Shared Component APIs

#### MetalCasing
```typescript
interface MetalCasingProps {
  children: React.ReactNode;
  sections?: {
    top?: string;      // Height percentage (default: '10%')
    middle?: string;   // Auto-calculated
    bottom?: string;   // Height percentage (default: '25%')
  };
}

// Usage
<MetalCasing sections={{ top: '10%', bottom: '25%' }}>
  <LEDDisplay />
</MetalCasing>
```

#### Scratches
```typescript
interface ScratchConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  angle: number;
  opacity: number;
}

interface ScratchesProps {
  type: 'light' | 'dark';
  count?: number;
  seed?: string;
  custom?: ScratchConfig[];  // Override random generation
}

// Usage
<Scratches type="light" count={6} seed="emf-scratches" />
<Scratches type="dark" count={5} seed="emf-scratches" />
```

#### Screws
```typescript
interface ScrewPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

interface ScrewsProps {
  positions: ScrewPosition[];
  size?: number;           // Default: 14px
  type?: 'single' | 'cross';  // Slot type
}

// Usage - Corner screws
<Screws 
  positions={[
    { top: '12px', left: '12px' },
    { top: '12px', right: '12px' },
    { bottom: '12px', left: '12px' },
    { bottom: '12px', right: '12px' },
  ]}
  size={14}
  type="cross"
/>

// Usage - Bezel screws
<Screws 
  positions={[
    { top: '18px', left: '50%', transform: 'translateX(-50%)' },
    { bottom: '18px', left: '50%', transform: 'translateX(-50%)' },
    { top: '50%', left: '18px', transform: 'translateY(-50%)' },
    { top: '50%', right: '18px', transform: 'translateY(-50%)' },
  ]}
  size={12}
  type="single"
/>
```

#### EtchedLabel
```typescript
interface EtchedLabelProps {
  text: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    transform?: string;
  };
  font: 'caveat' | 'courier';
  fontSize: string;
  rotation: number;
  opacity?: number;  // Default: 0.45 (40-50%)
}

// Usage
<EtchedLabel
  text="EMF METER"
  position={{ top: '8px', left: '25px' }}
  font="caveat"
  fontSize="13px"
  rotation={-1.2}
/>

<EtchedLabel
  text="SN: EMF-2019-K2"
  position={{ bottom: '8px', left: '25px' }}
  font="courier"
  fontSize="8px"
  rotation={0.4}
/>
```

#### TapePatches
```typescript
interface TapePatchConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  rotation: number;
  opacity?: number;
}

interface TapePatchesProps {
  patches: TapePatchConfig[];
}

// Usage
<TapePatches
  patches={[
    { top: '5%', left: '-8px', width: '60px', height: '18px', rotation: -2.5, opacity: 0.7 },
    { bottom: '15%', right: '-10px', width: '55px', height: '16px', rotation: 1.8, opacity: 0.65 },
  ]}
/>
```

#### BezelRing
```typescript
interface BezelRingProps {
  offset: number;          // 28-35px
  shape: 'circle' | 'rectangle';
  borderRadius?: string;   // For rectangle shape
  children?: React.ReactNode;  // Screws, damage on bezel
}

// Usage
<BezelRing offset={28} shape="rectangle" borderRadius="12px">
  <Screws positions={[...]} />
  <RustSpots spots={[...]} />
</BezelRing>
```

#### TextureOverlays
```typescript
interface TextureOverlaysProps {
  type: 'metal' | 'plastic';
}

// Usage
<TextureOverlays type="metal" />
// Renders:
// - Metal texture (overlay, 0.6)
// - Rust overlay (multiply, 0.4)
// - Dust layer (multiply, 0.3)
// - Plastic dark (multiply, 0.25) - optional
```

### Tool-Specific Component APIs

#### EMFTool/LEDDisplay
```typescript
interface LEDDisplayProps {
  emfLevel: number;        // 0-5
  isFlickering: boolean;
  columns?: number;        // Default: 5
  segmentsPerColumn?: number;  // Default: 8
}

// Usage
<LEDDisplay 
  emfLevel={effectiveEmfLevel} 
  isFlickering={effectiveFlickering}
/>
```

#### RadarTool/RadarDisplay
```typescript
interface RadarDisplayProps {
  ghostBearing?: number;
  playerHeading?: number;
  isGhostInCone?: boolean;
  sweepAngle?: number;
}

// Usage
<RadarDisplay
  ghostBearing={ghostBearing}
  playerHeading={playerHeading}
  isGhostInCone={isGhostInCone}
/>
```

## File Structure Details

```
src/components/Investigation/Tools/
├── shared/
│   ├── casings/
│   │   ├── MetalCasing.tsx          (150 lines)
│   │   ├── PlasticCasing.tsx        (120 lines)
│   │   └── index.ts                 (exports)
│   ├── damage/
│   │   ├── Scratches.tsx            (80 lines)
│   │   ├── Gouges.tsx               (60 lines)
│   │   ├── RustSpots.tsx            (50 lines)
│   │   ├── EdgeChips.tsx            (70 lines)
│   │   ├── Fingerprints.tsx         (40 lines)
│   │   ├── RainStreaks.tsx          (40 lines)
│   │   └── index.ts                 (exports)
│   ├── hardware/
│   │   ├── Screws.tsx               (80 lines)
│   │   ├── VentGrilles.tsx          (60 lines)
│   │   ├── WeldSeams.tsx            (50 lines)
│   │   ├── TapePatches.tsx          (50 lines)
│   │   └── index.ts                 (exports)
│   ├── labels/
│   │   ├── EtchedLabel.tsx          (60 lines)
│   │   ├── SerialNumber.tsx         (40 lines)
│   │   ├── HandwrittenNote.tsx      (40 lines)
│   │   └── index.ts                 (exports)
│   ├── textures/
│   │   ├── TextureOverlays.tsx      (80 lines)
│   │   ├── BezelRing.tsx            (120 lines)
│   │   └── index.ts                 (exports)
│   ├── effects/
│   │   ├── FilmGrain.tsx            (40 lines)
│   │   ├── DirtyGlass.tsx           (50 lines)
│   │   └── index.ts                 (exports)
│   └── index.ts                     (master export)
├── EMFTool/
│   ├── index.tsx                    (200 lines)
│   ├── LEDDisplay.tsx               (150 lines)
│   ├── EMFCasing.tsx                (100 lines)
│   └── types.ts                     (interfaces)
├── RadarTool/
│   ├── index.tsx                    (200 lines)
│   ├── RadarDisplay.tsx             (150 lines)
│   ├── RadarCasing.tsx              (100 lines)
│   └── types.ts
└── ... (other tools)
```

## Example: Refactored EMFTool

### EMFTool/index.tsx (Main Component)
```typescript
import { useState, useEffect, memo } from 'react';
import { MetalCasing } from '../shared/casings';
import { TextureOverlays } from '../shared/textures';
import { Scratches, Gouges, RustSpots, EdgeChips, Fingerprints, RainStreaks } from '../shared/damage';
import { Screws, VentGrilles, WeldSeams, TapePatches } from '../shared/hardware';
import { EtchedLabel } from '../shared/labels';
import { LEDDisplay } from './LEDDisplay';
import { EMFCasing } from './EMFCasing';
import type { EMFToolProps } from './types';

const EMFToolComponent = ({ mode, emfLevel = 0, isFlickering = false }: EMFToolProps) => {
  // Internal state for view mode
  const [mockEmfLevel, setMockEmfLevel] = useState(0);
  const [mockFlickering, setMockFlickering] = useState(false);

  // Mock animation for view mode
  useEffect(() => {
    if (mode === 'view') {
      // ... mock animation logic
    }
  }, [mode]);

  const effectiveEmfLevel = mode === 'view' ? mockEmfLevel : emfLevel;
  const effectiveFlickering = mode === 'view' ? mockFlickering : isFlickering;

  return (
    <div style={{ position: 'fixed', inset: 0, background: '#0a0a0a' }}>
      {/* Background gradient */}
      <div style={{ /* ... */ }} />
      
      {/* Metal casing with all damage/hardware */}
      <MetalCasing sections={{ top: '10%', bottom: '25%' }}>
        {/* Texture overlays */}
        <TextureOverlays type="metal" />
        
        {/* Damage elements */}
        <Scratches type="light" count={6} seed="emf-light" />
        <Scratches type="dark" count={5} seed="emf-dark" />
        <Gouges count={4} seed="emf-gouges" />
        <RustSpots count={5} seed="emf-rust" />
        <EdgeChips count={6} seed="emf-chips" />
        <Fingerprints count={3} seed="emf-prints" />
        <RainStreaks count={4} seed="emf-rain" />
        
        {/* Hardware elements */}
        <Screws positions={[/* corner screws */]} size={14} type="cross" />
        <VentGrilles positions={[/* vent positions */]} />
        <WeldSeams seams={[/* seam positions */]} />
        <TapePatches patches={[/* tape configs */]} />
        
        {/* Labels */}
        <EtchedLabel text="EMF METER" position={{ top: '8px', left: '25px' }} font="caveat" fontSize="13px" rotation={-1.2} />
        <EtchedLabel text="K-II METER" position={{ top: '3%', left: '50%', transform: 'translateX(-50%)' }} font="courier" fontSize="9px" rotation={0.4} />
        <EtchedLabel text="SN: EMF-2019-K2" position={{ bottom: '8px', left: '15%' }} font="courier" fontSize="8px" rotation={0.4} />
        <EtchedLabel text="cal. 03/19" position={{ bottom: '8px', right: '15%' }} font="caveat" fontSize="10px" rotation={-0.5} />
        
        {/* EMF-specific casing details */}
        <EMFCasing emfLevel={effectiveEmfLevel} />
        
        {/* LED Display */}
        <LEDDisplay emfLevel={effectiveEmfLevel} isFlickering={effectiveFlickering} />
      </MetalCasing>
    </div>
  );
};

export const EMFTool = memo(EMFToolComponent);
```

### EMFTool/LEDDisplay.tsx
```typescript
import { memo } from 'react';
import { BezelRing } from '../shared/textures';
import { Screws } from '../shared/hardware';
import { FilmGrain, DirtyGlass } from '../shared/effects';
import type { LEDDisplayProps } from './types';

const LEDDisplayComponent = ({ emfLevel, isFlickering, columns = 5, segmentsPerColumn = 8 }: LEDDisplayProps) => {
  return (
    <div style={{ /* LED housing container */ }}>
      {/* Thick metallic bezel */}
      <BezelRing offset={28} shape="rectangle" borderRadius="12px">
        <Screws positions={[/* bezel screws */]} size={12} />
      </BezelRing>
      
      {/* LED panel */}
      <div style={{ /* LED panel background */ }}>
        <DirtyGlass />
        <FilmGrain />
        
        {/* LED Matrix */}
        <div style={{ /* LED grid */ }}>
          {[...Array(columns)].map((_, colIndex) => (
            <div key={colIndex} style={{ /* column */ }}>
              {[...Array(segmentsPerColumn)].map((_, segIndex) => {
                const isActive = emfLevel >= colIndex + 1;
                // ... LED segment rendering logic
                return <div key={segIndex} style={{ /* segment */ }} />;
              })}
            </div>
          ))}
        </div>
        
        {/* Level labels */}
        <div style={{ /* labels */ }}>
          {[1, 2, 3, 4, 5].map(level => (
            <div key={level}>{level}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const LEDDisplay = memo(LEDDisplayComponent);
```

### EMFTool/EMFCasing.tsx
```typescript
import { memo } from 'react';
import type { EMFCasingProps } from './types';

const EMFCasingComponent = ({ emfLevel }: EMFCasingProps) => {
  return (
    <>
      {/* Warning LED */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '8%',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: emfLevel >= 4 
          ? 'radial-gradient(circle at 30% 30%, #ff0000 0%, #aa0000 50%, #660000 100%)'
          : 'radial-gradient(circle at 30% 30%, #3a1a1a 0%, #1a0a0a 60%, #0a0a0a 100%)',
        boxShadow: emfLevel >= 4
          ? '0 0 8px rgba(255,0,0,0.8), 0 0 16px rgba(255,0,0,0.5)'
          : 'inset 0 1px 2px rgba(0,0,0,0.9)',
      }} />
      
      {/* Toggle switch */}
      <div style={{ /* toggle switch */ }}>
        <div style={{ /* toggle knob */ }} />
      </div>
      
      {/* Calibration screw */}
      <div style={{ /* calibration screw */ }} />
      
      {/* Micro-indentations */}
      {[/* dent configs */].map((dent, i) => (
        <div key={i} style={{ /* dent */ }} />
      ))}
    </>
  );
};

export const EMFCasing = memo(EMFCasingComponent);
```

## Benefits of This Architecture

### Maintainability
- Each file under 200 lines
- Clear separation of concerns
- Easy to find and modify specific elements

### Reusability
- Shared components used across all tools
- Consistent visual language
- DRY principle

### Testability
- Each component can be tested independently
- Props are well-defined
- Easy to mock

### Extensibility
- Adding new damage elements is trivial
- New tools can reuse existing components
- Easy to add new features

### Performance
- Components can be memoized
- Shared components render once
- No unnecessary re-renders

## Migration Strategy

1. **Phase 1**: Create all shared components
2. **Phase 2**: Refactor EMFTool as proof of concept
3. **Phase 3**: Verify EMFTool matches mock exactly
4. **Phase 4**: Refactor remaining tools one by one
5. **Phase 5**: Remove old files, update docs

