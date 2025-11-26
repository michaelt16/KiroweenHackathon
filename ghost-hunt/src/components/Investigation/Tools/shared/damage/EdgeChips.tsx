import React from 'react';

interface EdgeChipsProps {
  seed?: string | number;
  count?: number;
}

/**
 * EdgeChips - Chipped paint areas at corners and edges
 * 
 * Features:
 * - 4-6 per device (corners + edges)
 * - Triangular clip-path for chip effect
 * - Seed-based deterministic randomization
 * 
 * Usage:
 * <EdgeChips seed="emf-001" count={5} />
 */
export const EdgeChips: React.FC<EdgeChipsProps> = ({ seed = 0, count = 5 }) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 251) % 100) / 100;
  };

  // Always include 4 corner chips
  const cornerChips = [
    { top: '0', left: '0', width: '35px', height: '35px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)', opacity: 0.8 },
    { top: '0', right: '0', width: '40px', height: '40px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)', opacity: 0.75 },
    { bottom: '0', left: '0', width: '32px', height: '32px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)', opacity: 0.78 },
    { bottom: '0', right: '0', width: '38px', height: '38px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)', opacity: 0.8 },
  ];

  // Additional edge chips
  const edgeChips = [];
  for (let i = 0; i < count - 4; i++) {
    const rand = getRandom(i);
    edgeChips.push({
      top: `${getRandom(i + 1) * 60 + 20}%`,
      left: `${getRandom(i + 2) * 60 + 20}%`,
      width: `${getRandom(i + 3) * 10 + 15}px`,
      height: `${getRandom(i + 4) * 10 + 15}px`,
      clipPath: 'polygon(0% 0%, 60% 0%, 0% 60%)',
      opacity: getRandom(i + 5) * 0.2 + 0.65,
    });
  }

  const allChips = [...cornerChips, ...edgeChips];

  return (
    <>
      {allChips.map((chip, i) => (
        <div
          key={`chip-${i}`}
          style={{
            position: 'absolute',
            ...(chip.top ? { top: chip.top } : {}),
            ...(chip.bottom ? { bottom: chip.bottom } : {}),
            ...(chip.left ? { left: chip.left } : {}),
            ...(chip.right ? { right: chip.right } : {}),
            width: chip.width,
            height: chip.height,
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
            clipPath: chip.clipPath,
            opacity: chip.opacity,
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 8,
          }}
        />
      ))}
    </>
  );
};
