import React from 'react';

interface HandwrittenNoteProps {
  text: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  fontSize?: string;
  rotation?: number;
  color?: string;
}

/**
 * HandwrittenNote - Caveat font handwritten notes
 * 
 * Features:
 * - Caveat font for handwritten appearance
 * - Etched metal appearance
 * - 40-50% opacity
 * - Slight rotation for authenticity
 * 
 * Usage:
 * <HandwrittenNote 
 *   text="cal. 03/19" 
 *   position={{ bottom: '8px', right: '15%' }}
 *   fontSize="10px"
 *   rotation={-0.5}
 * />
 */
export const HandwrittenNote: React.FC<HandwrittenNoteProps> = ({
  text,
  position,
  fontSize = '10px',
  rotation = -0.5,
  color = 'rgba(180,180,150,0.45)',
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        ...(position.top ? { top: position.top } : {}),
        ...(position.bottom ? { bottom: position.bottom } : {}),
        ...(position.left ? { left: position.left } : {}),
        ...(position.right ? { right: position.right } : {}),
        fontFamily: '"Caveat", cursive',
        fontSize,
        color,
        transform: `rotate(${rotation}deg)`,
        textShadow: 
          '0 -1px 1px rgba(255,255,255,0.2), ' +
          '0 1px 2px rgba(0,0,0,0.9), ' +
          '1px 1px 3px rgba(0,0,0,0.8)',
        pointerEvents: 'none',
        zIndex: 21,
        whiteSpace: 'pre-line',
      }}
    >
      {text}
    </div>
  );
};
