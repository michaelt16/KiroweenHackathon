import React from 'react';

interface SerialNumberProps {
  text: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  rotation?: number;
}

/**
 * SerialNumber - Small serial number label
 * 
 * Features:
 * - Courier New font, 8-9px
 * - Etched metal appearance
 * - 40-50% opacity
 * - Slight rotation (0.3deg - 0.6deg)
 * 
 * Usage:
 * <SerialNumber 
 *   text="SN: EMF-2019-K2" 
 *   position={{ bottom: '8px', left: '25px' }}
 *   rotation={0.4}
 * />
 */
export const SerialNumber: React.FC<SerialNumberProps> = ({
  text,
  position,
  rotation = 0.4,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        ...(position.top ? { top: position.top } : {}),
        ...(position.bottom ? { bottom: position.bottom } : {}),
        ...(position.left ? { left: position.left } : {}),
        ...(position.right ? { right: position.right } : {}),
        fontFamily: '"Courier New", monospace',
        fontSize: '8px',
        color: 'rgba(150,150,150,0.45)',
        transform: `rotate(${rotation}deg)`,
        textShadow: 
          '0 -1px 1px rgba(255,255,255,0.2), ' +
          '0 1px 2px rgba(0,0,0,0.9), ' +
          '1px 1px 3px rgba(0,0,0,0.8)',
        pointerEvents: 'none',
        zIndex: 21,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};
