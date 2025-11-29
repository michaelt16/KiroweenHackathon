// Shared Screw Components
// Reusable screw elements for tool casings

import React from 'react';

interface ScrewProps {
  position: { top?: string; bottom?: string; left?: string; right?: string };
  size?: number;
  style?: React.CSSProperties;
}

export function Screw({ position, size = 14, style }: ScrewProps) {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
        boxShadow: 
          'inset 0 2px 3px rgba(255,255,255,0.3), ' +
          'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
          '0 2px 4px rgba(0,0,0,0.8)',
        border: '1px solid rgba(0,0,0,0.7)',
        pointerEvents: 'none',
        zIndex: 10,
        ...style,
      }}
    >
      {/* Screw slot - horizontal */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${size * 0.4}px`,
        height: '0.5px',
        background: '#0a0a0a',
      }} />
      {/* Screw slot - vertical */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(90deg)',
        width: `${size * 0.4}px`,
        height: '0.5px',
        background: '#0a0a0a',
      }} />
    </div>
  );
}

interface CornerScrewsProps {
  size?: number;
  offset?: string;
}

export function CornerScrews({ size = 14, offset = '12px' }: CornerScrewsProps) {
  return (
    <>
      <Screw position={{ top: offset, left: offset }} size={size} />
      <Screw position={{ top: offset, right: offset }} size={size} />
      <Screw position={{ bottom: offset, left: offset }} size={size} />
      <Screw position={{ bottom: offset, right: offset }} size={size} />
    </>
  );
}



