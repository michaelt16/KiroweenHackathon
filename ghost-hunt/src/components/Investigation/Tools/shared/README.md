# Investigation Tools - Shared Components

This directory contains reusable visual components for investigation tools, extracted from the playground mocks.

## Components

### ToolCasing
Device body with material-specific styling (metal, plastic-light, plastic-dark).

**Usage:**
```tsx
<ToolCasing material="metal">
  {/* Tool content */}
</ToolCasing>
```

### TextureLayer
Reusable texture overlay component with configurable blend modes.

**Usage:**
```tsx
<TextureLayer type="metal" opacity={0.6} blendMode="overlay" zIndex={2} />
<TextureLayer type="rust" opacity={0.4} blendMode="multiply" zIndex={3} />
<TextureLayer type="dust" opacity={0.3} blendMode="multiply" zIndex={4} />
```

### DamageLayer
Container for damage elements (scratches, rust, tape, chips).

**Usage:**
```tsx
<DamageLayer
  scratches={[
    { position: { top: '15%', left: '5%' }, width: '150px', angle: -25, opacity: 0.5, color: 'light' }
  ]}
  rustSpots={[
    { position: { top: '18%', left: '15%' }, size: '14px', opacity: 0.55 }
  ]}
  tapePatches={[
    { position: { top: '5%', left: '-15px' }, width: '60px', height: '3px', rotation: -15, opacity: 0.8 }
  ]}
  chippedCorners={[
    { position: { top: '0', left: '0' }, size: '35px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)' }
  ]}
/>
```

### HandwrittenLabel
Handwritten-style labels with etched metal appearance (Caveat font).

**Usage:**
```tsx
<HandwrittenLabel
  text="RADAR UNIT B"
  position={{ top: '8px', left: '25px' }}
  fontSize="14px"
  rotation={-1.5}
/>
```

### SerialNumber
Serial number labels with etched metal appearance (Courier New font).

**Usage:**
```tsx
<SerialNumber
  text="SN: RD-1985-7B"
  position={{ bottom: '8px', left: '25px' }}
  fontSize="9px"
  rotation={0.4}
/>
```

## Example: Complete Tool Structure

```tsx
import { ToolContainer } from './Base/ToolContainer';
import { ToolCasing, TextureLayer, DamageLayer, HandwrittenLabel, SerialNumber } from './shared';

export const MyTool = () => {
  return (
    <ToolContainer>
      <ToolCasing material="metal">
        {/* Texture layers (z-index 2-5) */}
        <TextureLayer type="metal" zIndex={2} />
        <TextureLayer type="rust" zIndex={3} />
        <TextureLayer type="dust" zIndex={4} />
        
        {/* Damage elements (z-index 6-10) */}
        <DamageLayer
          scratches={[...]}
          rustSpots={[...]}
          tapePatches={[...]}
          chippedCorners={[...]}
        />
        
        {/* Display content (z-index 11-15) */}
        <div style={{ zIndex: 11 }}>
          {/* Tool-specific display */}
        </div>
        
        {/* Labels (z-index 21) */}
        <HandwrittenLabel text="TOOL NAME" position={{ top: '8px', left: '25px' }} />
        <SerialNumber text="SN: XX-1985-XX" position={{ bottom: '8px', left: '25px' }} />
      </ToolCasing>
    </ToolContainer>
  );
};
```

## Design System Reference

All components follow the **007 Investigation Tools Design System** specifications:

- **Full-screen layouts**: All tools fill 100% viewport
- **Heavy texture layering**: 3-5 texture layers per device
- **Extensive damage**: 7-15+ damage elements per device
- **Deep screen insets**: 25-40px depth for displays
- **Thick bezels**: 28-35px offset for metal tools
- **Material-specific casings**: Metal (Radar, EMF, Spirit Box) vs Plastic (Thermal, Camera)
- **Etched-style labels**: 40-50% opacity with light top highlight + dark bottom shadow

## Z-Index Layering

The components follow a strict z-index hierarchy:

- **0**: Background (optional camera view)
- **1**: Device Casing
- **2-5**: Texture Overlays
- **6-10**: Damage Elements
- **11-15**: Display/Screen
- **16-20**: Screen Effects
- **21-25**: UI Elements (labels, text)

## Based On

- **Spec 009**: Investigation UI Transformation
- **Spec 007**: Investigation Tools Design System
- **Reference Implementations**: RadarToolMock, EMFMeterMock, ThermalScannerMock, CameraViewfinderMock, SpiritBoxMock
