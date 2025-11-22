import React from 'react';

interface PushPinProps {
  color?: 'red' | 'silver';
  position?: { top?: string; left?: string; right?: string; bottom?: string };
}

export function PushPin({ color = 'red', position = { top: '-8px', left: '50%' } }: PushPinProps) {
  const colors = {
    red: '#dc2626',
    silver: '#666',
  };

  return (
    <div style={{
      position: 'absolute',
      ...position,
      width: '12px',
      height: '12px',
      background: colors[color],
      borderRadius: '50% 50% 50% 0',
      transform: position.left === '50%' ? 'translateX(-50%) rotate(45deg)' : 'rotate(45deg)',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
      zIndex: 2,
    }} />
  );
}
