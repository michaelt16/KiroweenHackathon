import React from 'react';
import rust from '../../../../../assets/texture/brownrust.png';

interface RustSpotConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  opacity: number;
}

interface RustSpotsProps {
  seed?: string | number;
  count?: number;
}

/**
 * RustSpots - Scattered rust spots across device
 * 
 * Features:
 * - Uses rust texture image
 * - Circular spots
 * - 5-7 scattered across device
 * - Seed-based deterministic randomization
 * 
 * Usage:
 * <RustSpots seed="emf-001" count={6} />
 */
export const RustSpots: React.FC<RustSpotsProps> = ({ seed = 0, count = 6 }) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 211) % 100) / 100;
  };

  const generateRustSpots = (): RustSpotConfig[] => {
    const spots: RustSpotConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const rand = getRandom(i);
      const isTop = rand > 0.5;
      const isLeft = getRandom(i + 1) > 0.5;
      
      spots.push({
        ...(isTop ? { top: `${getRandom(i + 2) * 70 + 15}%` } : { bottom: `${getRandom(i + 2) * 70 + 15}%` }),
        ...(isLeft ? { left: `${getRandom(i + 3) * 70 + 12}%` } : { right: `${getRandom(i + 3) * 70 + 12}%` }),
        size: `${getRandom(i + 4) * 6 + 12}px`,
        opacity: getRandom(i + 5) * 0.15 + 0.5,
      });
    }
    
    return spots;
  };

  const rustSpots = generateRustSpots();

  return (
    <>
      {rustSpots.map((spot, i) => (
        <div
          key={`rust-${i}`}
          style={{
            position: 'absolute',
            ...(spot.top ? { top: spot.top } : {}),
            ...(spot.bottom ? { bottom: spot.bottom } : {}),
            ...(spot.left ? { left: spot.left } : {}),
            ...(spot.right ? { right: spot.right } : {}),
            width: spot.size,
            height: spot.size,
            backgroundImage: `url(${rust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: spot.opacity,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 7,
          }}
        />
      ))}
    </>
  );
};
