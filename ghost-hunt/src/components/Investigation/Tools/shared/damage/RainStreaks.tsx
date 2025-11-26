import React from 'react';

interface RainStreakConfig {
  left?: string;
  right?: string;
  top: string;
  bottom: string;
  width: string;
  opacity: number;
}

interface RainStreaksProps {
  seed?: string | number;
  count?: number;
}

/**
 * RainStreaks - Vertical weathering marks
 * 
 * Features:
 * - Vertical gradient streaks
 * - 3-5 per device
 * - Blur filter for weathered effect
 * - Seed-based deterministic randomization
 * 
 * Usage:
 * <RainStreaks seed="emf-001" count={4} />
 */
export const RainStreaks: React.FC<RainStreaksProps> = ({ seed = 0, count = 4 }) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 307) % 100) / 100;
  };

  const generateStreaks = (): RainStreakConfig[] => {
    const streaks: RainStreakConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const isLeft = getRandom(i) > 0.5;
      
      streaks.push({
        ...(isLeft ? { left: `${getRandom(i + 1) * 70 + 8}%` } : { right: `${getRandom(i + 1) * 70 + 8}%` }),
        top: `${getRandom(i + 2) * 20 + 10}%`,
        bottom: `${getRandom(i + 3) * 40 + 30}%`,
        width: '1px',
        opacity: getRandom(i + 4) * 0.1 + 0.25,
      });
    }
    
    return streaks;
  };

  const streaks = generateStreaks();

  return (
    <>
      {streaks.map((streak, i) => (
        <div
          key={`rain-${i}`}
          style={{
            position: 'absolute',
            ...(streak.left ? { left: streak.left } : {}),
            ...(streak.right ? { right: streak.right } : {}),
            top: streak.top,
            bottom: streak.bottom,
            width: streak.width,
            background: 'linear-gradient(180deg, transparent 0%, rgba(100,80,60,0.4) 30%, rgba(100,80,60,0.5) 70%, transparent 100%)',
            opacity: streak.opacity,
            filter: 'blur(0.5px)',
            pointerEvents: 'none',
            zIndex: 7,
          }}
        />
      ))}
    </>
  );
};
