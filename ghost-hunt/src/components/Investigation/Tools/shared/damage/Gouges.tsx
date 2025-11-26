import React from 'react';

interface GougeConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width: string;
  angle: number;
  depth: string;
  opacity: number;
}

interface GougesProps {
  seed?: string | number;
  count?: number;
}

/**
 * Gouges - Deep damage marks heavier than scratches
 * 
 * Features:
 * - Deeper than scratches (2px height)
 * - Gradient background for depth
 * - 3-5 per device
 * - Seed-based deterministic randomization
 * 
 * Usage:
 * <Gouges seed="emf-001" count={4} />
 */
export const Gouges: React.FC<GougesProps> = ({ seed = 0, count = 4 }) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 173) % 100) / 100;
  };

  const generateGouges = (): GougeConfig[] => {
    const gouges: GougeConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const rand = getRandom(i);
      const isTop = rand > 0.5;
      
      gouges.push({
        ...(isTop 
          ? { top: `${getRandom(i + 1) * 70 + 15}%`, left: `${getRandom(i + 2) * 70 + 8}%` }
          : { bottom: `${getRandom(i + 1) * 70 + 15}%`, right: `${getRandom(i + 2) * 70 + 8}%` }
        ),
        width: `${getRandom(i + 3) * 40 + 80}px`,
        angle: getRandom(i + 4) * 75 - 37.5,
        depth: '2px',
        opacity: getRandom(i + 5) * 0.15 + 0.6,
      });
    }
    
    return gouges;
  };

  const gouges = generateGouges();

  return (
    <>
      {gouges.map((gouge, i) => (
        <div
          key={`gouge-${i}`}
          style={{
            position: 'absolute',
            ...(gouge.top ? { top: gouge.top } : {}),
            ...(gouge.bottom ? { bottom: gouge.bottom } : {}),
            ...(gouge.left ? { left: gouge.left } : {}),
            ...(gouge.right ? { right: gouge.right } : {}),
            width: gouge.width,
            height: gouge.depth,
            background: 'linear-gradient(90deg, rgba(0,0,0,0.9) 0%, rgba(50,30,20,0.8) 50%, rgba(0,0,0,0.9) 100%)',
            transform: `rotate(${gouge.angle}deg)`,
            opacity: gouge.opacity,
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,0.7)',
            pointerEvents: 'none',
            zIndex: 8,
          }}
        />
      ))}
    </>
  );
};
