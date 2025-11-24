import React from 'react';
import type { DamageLayerProps, ScratchConfig, RustSpotConfig, TapePatchConfig, ChipConfig } from '../types';
import rust from '../../../../assets/texture/brownrust.png';
import tape from '../../../../assets/texture/tape.png';

/**
 * DamageLayer - Container for damage elements (scratches, rust, tape, chips)
 * 
 * Purpose: Renders damage elements at specified positions with deterministic placement
 * 
 * Sub-components:
 * - Scratches: Light and dark scratches on casing
 * - RustSpots: Rust spots scattered across device
 * - TapePatches: Tape patches (crooked, clustered)
 * - ChippedCorners: Chipped paint areas
 * 
 * Based on Spec 009 - Investigation UI Transformation
 * Reference: 007 Investigation Tools Design System
 */

/**
 * Scratches sub-component
 */
const Scratches: React.FC<{ scratches: ScratchConfig[] }> = ({ scratches }) => {
  return (
    <>
      {scratches.map((scratch, i) => (
        <div
          key={`scratch-${i}`}
          style={{
            position: 'absolute',
            ...scratch.position,
            width: scratch.width,
            height: '2px',
            background: scratch.color === 'light' 
              ? 'rgba(255,255,255,0.35)'  // Light scratches (exposed metal)
              : 'rgba(0,0,0,0.6)',         // Dark scratches (deep gouges)
            transform: `rotate(${scratch.angle}deg)`,
            opacity: scratch.opacity,
            boxShadow: scratch.color === 'light'
              ? '0 0 4px rgba(0,0,0,0.7), inset 0 0 3px rgba(0,0,0,0.5)'
              : '0 0 2px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            zIndex: scratch.color === 'light' ? 6 : 8,
          }}
        />
      ))}
    </>
  );
};

/**
 * RustSpots sub-component
 */
const RustSpots: React.FC<{ rustSpots: RustSpotConfig[] }> = ({ rustSpots }) => {
  return (
    <>
      {rustSpots.map((rustSpot, i) => (
        <div
          key={`rust-${i}`}
          style={{
            position: 'absolute',
            ...rustSpot.position,
            width: rustSpot.size,
            height: rustSpot.size,
            backgroundImage: `url(${rust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: rustSpot.opacity,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 7,
          }}
        />
      ))}
    </>
  );
};

/**
 * TapePatches sub-component
 */
const TapePatches: React.FC<{ tapePatches: TapePatchConfig[] }> = ({ tapePatches }) => {
  return (
    <>
      {tapePatches.map((tapePatch, i) => (
        <div
          key={`tape-${i}`}
          style={{
            position: 'absolute',
            ...tapePatch.position,
            width: tapePatch.width,
            height: tapePatch.height,
            backgroundImage: `url(${tape})`,
            backgroundSize: 'cover',
            mixBlendMode: i % 2 === 1 ? 'multiply' : 'normal',
            transform: `rotate(${tapePatch.rotation}deg)`,
            opacity: tapePatch.opacity,
            boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
            pointerEvents: 'none',
            zIndex: 12,
          }}
        />
      ))}
    </>
  );
};

/**
 * ChippedCorners sub-component
 */
const ChippedCorners: React.FC<{ chippedCorners: ChipConfig[] }> = ({ chippedCorners }) => {
  return (
    <>
      {chippedCorners.map((chip, i) => (
        <div
          key={`chip-${i}`}
          style={{
            position: 'absolute',
            ...chip.position,
            width: chip.size,
            height: chip.size,
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
            clipPath: chip.clipPath,
            opacity: 0.8,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 8,
          }}
        />
      ))}
    </>
  );
};

/**
 * DamageLayer - Main component
 */
export const DamageLayer: React.FC<DamageLayerProps> = ({
  scratches = [],
  rustSpots = [],
  tapePatches = [],
  chippedCorners = [],
}) => {
  return (
    <>
      {scratches.length > 0 && <Scratches scratches={scratches} />}
      {rustSpots.length > 0 && <RustSpots rustSpots={rustSpots} />}
      {tapePatches.length > 0 && <TapePatches tapePatches={tapePatches} />}
      {chippedCorners.length > 0 && <ChippedCorners chippedCorners={chippedCorners} />}
    </>
  );
};

export default DamageLayer;
