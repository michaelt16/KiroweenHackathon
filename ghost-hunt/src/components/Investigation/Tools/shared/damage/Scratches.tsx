import React from 'react';

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
  seed?: string | number;
  count?: number;
  variant?: 'light' | 'dark' | 'mixed';
}

/**
 * Scratches - Light and dark scratches for tool casings
 * 
 * Features:
 * - Light scratches (exposed metal, rgba(255,255,255,0.35))
 * - Dark scratches (deep gouges, rgba(0,0,0,0.6))
 * - Seed-based deterministic randomization
 * - 6-8 scratches per device
 * 
 * Usage:
 * <Scratches seed="emf-001" count={8} variant="mixed" />
 */
export const Scratches: React.FC<ScratchesProps> = ({ 
  seed = 0, 
  count = 8,
  variant = 'mixed'
}) => {
  // Deterministic random based on seed
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 137) % 100) / 100;
  };

  const generateScratches = (): ScratchConfig[] => {
    const scratches: ScratchConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const rand = getRandom(i);
      const isVertical = rand > 0.5;
      
      scratches.push({
        ...(isVertical 
          ? { top: `${getRandom(i + 1) * 80 + 10}%`, left: `${getRandom(i + 2) * 80 + 5}%` }
          : { bottom: `${getRandom(i + 1) * 80 + 10}%`, right: `${getRandom(i + 2) * 80 + 5}%` }
        ),
        width: `${getRandom(i + 3) * 50 + 100}px`,
        angle: getRandom(i + 4) * 70 - 35,
        opacity: getRandom(i + 5) * 0.15 + 0.45,
      });
    }
    
    return scratches;
  };

  const lightScratches = variant === 'dark' ? [] : generateScratches().slice(0, Math.ceil(count * 0.6));
  const darkScratches = variant === 'light' ? [] : generateScratches().slice(Math.ceil(count * 0.6));

  return (
    <>
      {/* Light scratches (exposed metal) */}
      {lightScratches.map((scratch, i) => (
        <div
          key={`light-scratch-${i}`}
          style={{
            position: 'absolute',
            ...(scratch.top ? { top: scratch.top } : {}),
            ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
            ...(scratch.left ? { left: scratch.left } : {}),
            ...(scratch.right ? { right: scratch.right } : {}),
            width: scratch.width,
            height: '2px',
            background: 'rgba(255,255,255,0.35)',
            transform: `rotate(${scratch.angle}deg)`,
            opacity: scratch.opacity,
            boxShadow: '0 0 4px rgba(0,0,0,0.7), inset 0 0 3px rgba(0,0,0,0.5)',
            pointerEvents: 'none',
            zIndex: 6,
          }}
        />
      ))}
      
      {/* Dark scratches (deep gouges) */}
      {darkScratches.map((scratch, i) => (
        <div
          key={`dark-scratch-${i}`}
          style={{
            position: 'absolute',
            ...(scratch.top ? { top: scratch.top } : {}),
            ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
            ...(scratch.left ? { left: scratch.left } : {}),
            ...(scratch.right ? { right: scratch.right } : {}),
            width: scratch.width,
            height: '2px',
            background: 'rgba(0,0,0,0.6)',
            transform: `rotate(${scratch.angle}deg)`,
            opacity: scratch.opacity,
            boxShadow: '0 0 2px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            zIndex: 8,
          }}
        />
      ))}
    </>
  );
};
