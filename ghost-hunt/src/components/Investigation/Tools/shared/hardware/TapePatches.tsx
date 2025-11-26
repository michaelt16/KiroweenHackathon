import React from 'react';
import tape from '../../../../../assets/texture/tape.png';

interface TapePatchConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  rotation: number;
  opacity: number;
}

interface TapePatchesProps {
  count?: number;
  seed?: string | number;
}

/**
 * TapePatches - Crooked tape patches on device casing
 * 
 * Features:
 * - Uses tape texture image
 * - Crooked rotation (-15deg to 15deg)
 * - 3-5 per device
 * - Some with edge overhang
 * - Seed-based deterministic randomization
 * 
 * Usage:
 * <TapePatches count={4} seed="emf-001" />
 */
export const TapePatches: React.FC<TapePatchesProps> = ({ count = 4, seed = 0 }) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 359) % 100) / 100;
  };

  const generatePatches = (): TapePatchConfig[] => {
    const patches: TapePatchConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const rand = getRandom(i);
      const isTop = rand > 0.5;
      const isLeft = getRandom(i + 1) > 0.5;
      const hasOverhang = getRandom(i + 2) > 0.7; // 30% chance of overhang
      
      patches.push({
        ...(isTop ? { top: hasOverhang ? '-5px' : `${getRandom(i + 3) * 60 + 5}%` } : { bottom: hasOverhang ? '-5px' : `${getRandom(i + 3) * 60 + 5}%` }),
        ...(isLeft ? { left: hasOverhang ? '-10px' : `${getRandom(i + 4) * 70 + 5}%` } : { right: hasOverhang ? '-10px' : `${getRandom(i + 4) * 70 + 5}%` }),
        width: `${getRandom(i + 5) * 30 + 45}px`,
        height: `${getRandom(i + 6) * 15 + 20}px`,
        rotation: getRandom(i + 7) * 30 - 15, // -15 to 15 degrees
        opacity: getRandom(i + 8) * 0.2 + 0.7, // 0.7 to 0.9
      });
    }
    
    return patches;
  };

  const patches = generatePatches();

  return (
    <>
      {patches.map((patch, i) => (
        <div
          key={`tape-${i}`}
          style={{
            position: 'absolute',
            ...(patch.top ? { top: patch.top } : {}),
            ...(patch.bottom ? { bottom: patch.bottom } : {}),
            ...(patch.left ? { left: patch.left } : {}),
            ...(patch.right ? { right: patch.right } : {}),
            width: patch.width,
            height: patch.height,
            backgroundImage: `url(${tape})`,
            backgroundSize: 'cover',
            mixBlendMode: i % 2 === 0 ? 'normal' : 'multiply',
            transform: `rotate(${patch.rotation}deg)`,
            opacity: patch.opacity,
            boxShadow: '0 2px 6px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
            pointerEvents: 'none',
            zIndex: 12,
          }}
        />
      ))}
    </>
  );
};
