# EMFTool Component

## Overview

The EMFTool is a refactored, modular implementation of the EMF Meter investigation tool. It follows the component-based architecture defined in Spec 013 (Tool Component Refactoring).

## Structure

```
EMFTool/
├── index.tsx           - Main EMFTool component (orchestrates all parts)
├── types.ts            - TypeScript interfaces
├── LEDDisplay.tsx      - LED matrix display (5 columns × 8 segments)
├── EMFCasing.tsx       - EMF-specific casing details ✅ COMPLETE
└── README.md           - This file
```

## Components

### EMFCasing.tsx ✅ COMPLETE

**Purpose**: Renders EMF-specific casing details that are unique to the EMF Meter.

**Features Implemented**:
- ✅ Warning LED (red when level >= 4, dark when inactive)
- ✅ Toggle switch (fake, decorative)
- ✅ Calibration screw (single-slot screw)
- ✅ Micro-indentations (4 small dents scattered across casing)
- ✅ Labels:
  - CAL (calibration label)
  - BAT (battery label)
  - Small printed text (9V, ±0.1V, DC)
- ✅ Localized rust spots around screws (3 spots)

**Props**:
```typescript
interface EMFCasingProps {
  emfLevel: number;  // 0-5 (controls warning LED state)
}
```

**Usage**:
```tsx
import { EMFCasing } from './EMFCasing';

<EMFCasing emfLevel={4} />  // Warning LED will be red
```

**Visual Test**:
A visual test component is available at `src/ui-playground/EMFCasingTest.tsx` that allows testing the EMFCasing in isolation with different EMF levels.

## Implementation Status

### Phase 2: Refactor EMFTool (Proof of Concept)

#### Task 2.1: Create EMFTool Folder Structure ✅ COMPLETE
- ✅ Created `src/components/Investigation/Tools/EMFTool/`
- ✅ Created `EMFTool/types.ts` for interfaces
- ✅ Created `EMFTool/index.tsx` (main component)
- ✅ Created `EMFTool/LEDDisplay.tsx`
- ✅ Created `EMFTool/EMFCasing.tsx`

#### Task 2.2: Implement LEDDisplay Component ✅ COMPLETE
- ✅ Extracted LED matrix logic from mock
- ✅ Implemented 5 columns × 8 segments grid
- ✅ Implemented color progression (green → yellow → orange → red)
- ✅ Implemented flickering logic for Level 5
- ✅ Added BezelRing wrapper
- ✅ Added DirtyGlass and FilmGrain effects

#### Task 2.3: Implement EMFCasing Component ✅ COMPLETE
- ✅ Extracted EMF-specific casing details from mock
- ✅ Implemented warning LED (red when level >= 4)
- ✅ Implemented toggle switch
- ✅ Implemented calibration screw
- ✅ Implemented micro-indentations
- ✅ Tested casing details render correctly

## Next Steps

### Task 2.4: Implement Main EMFTool Component
- [ ] Set up props interface (mode, emfLevel, isFlickering)
- [ ] Implement view mode mock state
- [ ] Implement investigation mode real state
- [ ] Compose all shared components
- [ ] Add MetalCasing wrapper
- [ ] Add TextureOverlays
- [ ] Add all damage elements
- [ ] Add all hardware elements
- [ ] Add all labels
- [ ] Add EMFCasing component
- [ ] Add LEDDisplay component
- [ ] Test main component renders correctly

## Design Principles

The EMFCasing component follows these principles from the Tool Component Refactoring spec:

1. **Modularity**: EMF-specific details are isolated in their own component
2. **Reusability**: Can be used in both view and investigation modes
3. **Maintainability**: Clear, focused responsibility (only EMF-specific details)
4. **Visual Consistency**: Matches the EMFMeterMock.tsx exactly
5. **Type Safety**: Full TypeScript support with defined interfaces

## References

- **Spec 013**: Tool Component Refactoring
- **Steering 013**: Tool Component Refactoring System
- **Steering 007**: Investigation Tools Design System
- **Mock Reference**: `src/ui-playground/tools/EMFMeterMock.tsx`
