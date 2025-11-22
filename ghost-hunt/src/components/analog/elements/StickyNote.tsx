import React from 'react';
import { PushPin } from '../base/PushPin';
import { getDamageVariant } from '../utils/randomization';

interface StickyNoteProps {
  children: React.ReactNode;
  color?: 'yellow' | 'pink' | 'blue';
  size?: 'small' | 'medium' | 'large';
  rotation?: number;
  withPin?: boolean;
  seed?: string | number;
}

export function StickyNote({ 
  children, 
  color = 'yellow', 
  size = 'medium',
  rotation,
  withPin = true,
  seed = Date.now() 
}: StickyNoteProps) {
  const colors = {
    yellow: '#ffeb3b',
    pink: '#ffc0cb',
    blue: '#add8e6',
  };

  const sizes = {
    small: '100px',
    medium: '130px',
    large: '150px',
  };

  const rotations = [-20, -15, -10, -5, 5, 10, 15, 20];
  const finalRotation = rotation ?? rotations[getDamageVariant(seed, rotations.length)];

  return (
    <div style={{
      position: 'relative',
      width: sizes[size],
      minHeight: sizes[size],
      background: colors[color],
      padding: '15px',
      transform: `rotate(${finalRotation}deg)`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
      fontFamily: '"Caveat", cursive',
      fontSize: '16px',
      color: '#1a0f0a',
      lineHeight: '1.6',
    }}>
      {withPin && <PushPin color="red" position={{ top: '-8px', left: '50%' }} />}
      {children}
    </div>
  );
}
