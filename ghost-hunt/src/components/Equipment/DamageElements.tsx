// Damage Elements Component - Renders damage overlays for equipment case
import React from 'react';
import type { DamageElement } from '../../utils/damageElements';

interface DamageElementsProps {
  lightScratches: DamageElement[];
  darkScratches: DamageElement[];
  rustSpots: DamageElement[];
  paintChips: DamageElement[];
  fingerprints: DamageElement[];
  tapePatches: DamageElement[];
}

export function DamageElements({
  lightScratches,
  darkScratches,
  rustSpots,
  paintChips,
  fingerprints,
  tapePatches,
}: DamageElementsProps) {
  return (
    <>
      {/* CSS Scratches removed - using texture-based damage instead */}
      
      {/* Rust Spots (5-7) */}
      {rustSpots.map((spot, i) => (
        <div
          key={`rust-${i}`}
          style={{
            position: 'absolute',
            ...spot.position,
            width: spot.size.width,
            height: spot.size.height,
            backgroundImage: 'url(/assets/texture/brownrust.png)',
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: spot.opacity,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 7,
          }}
        />
      ))}

      {/* Paint Chips (4-6) */}
      {paintChips.map((chip, i) => (
        <div
          key={`chip-${i}`}
          style={{
            position: 'absolute',
            ...chip.position,
            width: chip.size.width,
            height: chip.size.height,
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
            clipPath: chip.clipPath,
            opacity: chip.opacity,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 8,
          }}
        />
      ))}

      {/* Fingerprint Smudges (3-5) */}
      {fingerprints.map((smudge, i) => (
        <div
          key={`smudge-${i}`}
          style={{
            position: 'absolute',
            ...smudge.position,
            width: smudge.size.width,
            height: smudge.size.height,
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            filter: 'blur(2px)',
            opacity: smudge.opacity,
            zIndex: 8,
          }}
        />
      ))}

      {/* Tape Patches (3-5, crooked) */}
      {tapePatches.map((tape, i) => (
        <div
          key={`tape-${i}`}
          style={{
            position: 'absolute',
            ...tape.position,
            width: tape.size.width,
            height: tape.size.height,
            backgroundImage: 'url(/assets/texture/tape.png)',
            backgroundSize: 'cover',
            mixBlendMode: i === 1 ? 'multiply' : 'normal',
            transform: `rotate(${tape.rotation || 0}deg)`,
            opacity: tape.opacity,
            boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
            pointerEvents: 'none',
            zIndex: 12,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Handwritten note on tape (if present) */}
          {tape.note && (
            <div
              style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '10px',
                color: 'rgba(0,0,0,0.7)',
                textAlign: 'center',
                transform: 'rotate(-0.5deg)',
                pointerEvents: 'none',
              }}
            >
              {tape.note}
            </div>
          )}
        </div>
      ))}
    </>
  );
}
