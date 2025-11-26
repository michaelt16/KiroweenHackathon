import React from 'react';

interface EtchedLabelProps {
  text: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  font?: 'caveat' | 'courier';
  fontSize?: string;
  rotation?: number;
  opacity?: number;
}

/**
 * EtchedLabel - Etched metal text labels
 * 
 * Features:
 * - Light top highlight + dark bottom shadow (etched effect)
 * - 40-50% opacity
 * - Slight rotation for imperfection
 * - Caveat (handwritten) or Courier (printed) fonts
 * 
 * Usage:
 * <EtchedLabel 
 *   text="EMF METER" 
 *   position={{ top: '8px', left: '25px' }}
 *   font="caveat"
 *   fontSize="14px"
 *   rotation={-1.5}
 * />
 */
export const EtchedLabel: React.FC<EtchedLabelProps> = ({
  text,
  position,
  font = 'caveat',
  fontSize = '14px',
  rotation = 0,
  opacity = 0.5,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        ...(position.top ? { top: position.top } : {}),
        ...(position.bottom ? { bottom: position.bottom } : {}),
        ...(position.left ? { left: position.left } : {}),
        ...(position.right ? { right: position.right } : {}),
        fontFamily: font === 'caveat' ? '"Caveat", cursive' : '"Courier New", monospace',
        fontSize,
        color: `rgba(200,200,200,${opacity})`,
        transform: `rotate(${rotation}deg)`,
        textShadow: 
          '0 -1px 1px rgba(255,255,255,0.3), ' +  // Light top highlight (ETCHED)
          '0 1px 2px rgba(0,0,0,0.9), ' +          // Dark bottom shadow (ETCHED)
          '1px 1px 3px rgba(0,0,0,0.8)',           // Additional depth
        letterSpacing: font === 'courier' ? '0.5px' : '0px',
        pointerEvents: 'none',
        zIndex: 21,
        whiteSpace: 'nowrap',
      }}
    >
      {text}
    </div>
  );
};
