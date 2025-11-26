import React from 'react';

interface SeamConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: string;
  height?: string;
  opacity: number;
}

interface WeldSeamsProps {
  count?: number;
  seed?: string | number;
}

/**
 * WeldSeams - Industrial construction seams for metal tools
 * 
 * Features:
 * - Horizontal and vertical seams
 * - Gradient for depth
 * - 3-5 per device
 * - Seed-based deterministic randomization
 * 
 * Usage:
 * <WeldSeams count={5} seed="emf-001" />
 */
export const WeldSeams: React.FC<WeldSeamsProps> = ({ count = 5, seed = 0 }) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 331) % 100) / 100;
  };

  // Generate horizontal seams
  const horizontalSeams: SeamConfig[] = [];
  for (let i = 0; i < Math.ceil(count * 0.6); i++) {
    horizontalSeams.push({
      top: `${getRandom(i) * 60 + 15}%`,
      left: `${getRandom(i + 1) * 10 + 8}%`,
      right: `${getRandom(i + 2) * 10 + 8}%`,
      height: '1px',
      opacity: getRandom(i + 3) * 0.15 + 0.4,
    });
  }

  // Generate vertical seams
  const verticalSeams: SeamConfig[] = [];
  for (let i = 0; i < Math.floor(count * 0.4); i++) {
    verticalSeams.push({
      top: `${getRandom(i + 10) * 20 + 10}%`,
      bottom: `${getRandom(i + 11) * 30 + 20}%`,
      left: `${getRandom(i + 12) * 80 + 6}%`,
      width: '2px',
      opacity: getRandom(i + 13) * 0.1 + 0.45,
    });
  }

  return (
    <>
      {/* Horizontal seams */}
      {horizontalSeams.map((seam, i) => (
        <div
          key={`h-seam-${i}`}
          style={{
            position: 'absolute',
            ...(seam.top ? { top: seam.top } : {}),
            ...(seam.bottom ? { bottom: seam.bottom } : {}),
            left: seam.left,
            right: seam.right,
            height: seam.height,
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
            opacity: seam.opacity,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
      ))}
      
      {/* Vertical seams */}
      {verticalSeams.map((seam, i) => (
        <div
          key={`v-seam-${i}`}
          style={{
            position: 'absolute',
            top: seam.top,
            bottom: seam.bottom,
            ...(seam.left ? { left: seam.left } : {}),
            ...(seam.right ? { right: seam.right } : {}),
            width: seam.width,
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)',
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
            opacity: seam.opacity,
            pointerEvents: 'none',
            zIndex: 5,
          }}
        />
      ))}
    </>
  );
};
