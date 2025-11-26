import React from 'react';
import dust from '../../../../../assets/texture/dust.png';

interface DirtyGlassProps {
  opacity?: number;
  scratchCount?: number;
  seed?: string | number;
}

/**
 * DirtyGlass - Dirty glass overlay with scratches and smudges
 * 
 * Features:
 * - Dust texture overlay
 * - Random scratches
 * - Fingerprint smudges
 * - Screen blend mode
 * 
 * Usage:
 * <DirtyGlass opacity={0.15} scratchCount={3} seed="display-001" />
 */
export const DirtyGlass: React.FC<DirtyGlassProps> = ({ 
  opacity = 0.15,
  scratchCount = 3,
  seed = 0
}) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 397) % 100) / 100;
  };

  const scratches = [];
  for (let i = 0; i < scratchCount; i++) {
    scratches.push({
      top: `${getRandom(i) * 80 + 10}%`,
      left: `${getRandom(i + 1) * 80 + 10}%`,
      width: `${getRandom(i + 2) * 40 + 30}px`,
      angle: getRandom(i + 3) * 180 - 90,
      opacity: getRandom(i + 4) * 0.2 + 0.3,
    });
  }

  return (
    <>
      {/* Dust overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'screen',
          opacity,
          pointerEvents: 'none',
          zIndex: 14,
        }}
      />
      
      {/* Scratches */}
      {scratches.map((scratch, i) => (
        <div
          key={`scratch-${i}`}
          style={{
            position: 'absolute',
            top: scratch.top,
            left: scratch.left,
            width: scratch.width,
            height: '1px',
            background: 'rgba(255,255,255,0.2)',
            transform: `rotate(${scratch.angle}deg)`,
            opacity: scratch.opacity,
            pointerEvents: 'none',
            zIndex: 15,
          }}
        />
      ))}
      
      {/* Fingerprint smudges */}
      {[
        { top: '25%', left: '30%', size: '40px' },
        { bottom: '35%', right: '25%', size: '35px' },
      ].map((smudge, i) => (
        <div
          key={`smudge-${i}`}
          style={{
            position: 'absolute',
            ...(smudge.top ? { top: smudge.top } : {}),
            ...(smudge.bottom ? { bottom: smudge.bottom } : {}),
            ...(smudge.left ? { left: smudge.left } : {}),
            ...(smudge.right ? { right: smudge.right } : {}),
            width: smudge.size,
            height: smudge.size,
            background: 'radial-gradient(circle, rgba(0,0,0,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            filter: 'blur(3px)',
            zIndex: 15,
          }}
        />
      ))}
    </>
  );
};
