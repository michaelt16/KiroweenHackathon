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
 * - Horizontal and vertical seams aligned with casing sections
 * - Gradient for depth
 * - 3-5 per device
 * - Matches EMF mock placement
 * 
 * Usage:
 * <WeldSeams count={5} seed="emf-001" />
 */
export const WeldSeams: React.FC<WeldSeamsProps> = ({ count = 5, seed = 0 }) => {
  // Welded metal seams aligned with casing sections (match EMF mock)
  const horizontalSeams: SeamConfig[] = [
    { top: '10%', left: '8%', right: '8%', height: '2px', opacity: 0.6 },  // Top seam - aligns with top section end
    { bottom: '25%', left: '10%', right: '10%', height: '2px', opacity: 0.55 },  // Bottom seam - aligns with bottom section start
  ];
  
  const verticalSeams: SeamConfig[] = [
    { top: '10%', left: '6%', width: '2px', bottom: '25%', opacity: 0.5 },  // Left vertical seam
    { top: '10%', right: '6%', width: '2px', bottom: '25%', opacity: 0.5 },  // Right vertical seam
  ];

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
