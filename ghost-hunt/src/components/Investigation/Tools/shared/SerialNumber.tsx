import React from 'react';

/**
 * SerialNumber - Serial number label component (Courier New font)
 * 
 * Purpose: Renders serial number labels with etched metal appearance
 * 
 * Features:
 * - Courier New font for technical feel
 * - Etched style with light top highlight + dark bottom shadow
 * - Slight rotation for imperfection (0.3deg to 0.6deg)
 * - 40-50% opacity for worn appearance
 * 
 * Based on Spec 009 - Investigation UI Transformation
 * Reference: 007 Investigation Tools Design System - ETCHED STYLE
 */

export interface SerialNumberProps {
  text: string;
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  fontSize?: string;
  rotation?: number;
  opacity?: number;
  color?: string;
  zIndex?: number;
}

export const SerialNumber: React.FC<SerialNumberProps> = ({
  text,
  position,
  fontSize = '8px',
  rotation = 0.4,
  opacity = 0.45,
  color = 'rgba(150,150,150,0.45)',
  zIndex = 21,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        fontFamily: '"Courier New", monospace',
        fontSize,
        color,
        transform: `rotate(${rotation}deg)`,
        textShadow: 
          '0 -1px 1px rgba(255,255,255,0.2), ' +  // Light top highlight
          '0 1px 2px rgba(0,0,0,0.9), ' +          // Dark bottom shadow
          '1px 1px 3px rgba(0,0,0,0.8)',
        pointerEvents: 'none',
        zIndex,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

export default SerialNumber;
