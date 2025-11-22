import React from 'react';
import tape from '../../../assets/texture/tape.png';
import { getDamageVariant } from '../utils/randomization';

interface TapeProps {
  size?: 'small' | 'medium' | 'large';
  rotation?: number;
  position?: 'top' | 'top-left' | 'top-right';
  seed?: string | number;
}

export function Tape({ size = 'medium', rotation, position = 'top', seed = Date.now() }: TapeProps) {
  const sizes = {
    small: { width: '50px', height: '20px' },
    medium: { width: '70px', height: '25px' },
    large: { width: '100px', height: '30px' },
  };

  const rotations = [-15, -12, -8, -5, 5, 8, 12, 15];
  const finalRotation = rotation ?? rotations[getDamageVariant(seed, rotations.length)];

  const positions = {
    'top': { top: '-10px', left: '50%', transform: `translateX(-50%) rotate(${finalRotation}deg)` },
    'top-left': { top: '-10px', left: '20%', transform: `rotate(${finalRotation}deg)` },
    'top-right': { top: '-10px', right: '20%', transform: `rotate(${finalRotation}deg)` },
  };

  return (
    <div style={{
      position: 'absolute',
      ...positions[position],
      ...sizes[size],
      backgroundImage: `url(${tape})`,
      backgroundSize: 'cover',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      zIndex: 2,
    }} />
  );
}
