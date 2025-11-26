import React from 'react';

interface FingerprintConfig {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  size: string;
  opacity: number;
}

interface FingerprintsProps {
  seed?: string | number;
  count?: number;
}

/**
 * Fingerprints - Smudge marks on device
 * 
 * Features:
 * - Radial gradient for smudge effect
 * - 3-5 per device
 * - Blur filter for realistic smudge
 * - Seed-based deterministic randomization
 * 
 * Usage:
 * <Fingerprints seed="emf-001" count={4} />
 */
export const Fingerprints: React.FC<FingerprintsProps> = ({ seed = 0, count = 4 }) => {
  const getRandom = (index: number) => {
    const seedNum = typeof seed === 'number' ? seed : seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return ((seedNum + index * 283) % 100) / 100;
  };

  const generateFingerprints = (): FingerprintConfig[] => {
    const prints: FingerprintConfig[] = [];
    
    for (let i = 0; i < count; i++) {
      const rand = getRandom(i);
      const isTop = rand > 0.5;
      const isLeft = getRandom(i + 1) > 0.5;
      
      prints.push({
        ...(isTop ? { top: `${getRandom(i + 2) * 60 + 20}%` } : { bottom: `${getRandom(i + 2) * 60 + 20}%` }),
        ...(isLeft ? { left: `${getRandom(i + 3) * 60 + 10}%` } : { right: `${getRandom(i + 3) * 60 + 10}%` }),
        size: `${getRandom(i + 4) * 10 + 20}px`,
        opacity: getRandom(i + 5) * 0.1 + 0.25,
      });
    }
    
    return prints;
  };

  const fingerprints = generateFingerprints();

  return (
    <>
      {fingerprints.map((print, i) => (
        <div
          key={`fingerprint-${i}`}
          style={{
            position: 'absolute',
            ...(print.top ? { top: print.top } : {}),
            ...(print.bottom ? { bottom: print.bottom } : {}),
            ...(print.left ? { left: print.left } : {}),
            ...(print.right ? { right: print.right } : {}),
            width: print.size,
            height: print.size,
            background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            filter: 'blur(3px)',
            opacity: print.opacity,
            zIndex: 8,
          }}
        />
      ))}
    </>
  );
};
