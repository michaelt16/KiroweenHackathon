import React from 'react';

/**
 * HandwrittenLabel - Handwritten label component (Caveat font)
 * 
 * Purpose: Renders handwritten-style labels with etched metal appearance
 * 
 * Features:
 * - Caveat font for handwritten feel
 * - Etched style with light top highlight + dark bottom shadow
 * - Slight rotation for imperfection
 * - 40-50% opacity for worn appearance
 * 
 * Based on Spec 009 - Investigation UI Transformation
 * Reference: 007 Investigation Tools Design System - ETCHED STYLE
 */

export interface HandwrittenLabelProps {
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

export const HandwrittenLabel: React.FC<HandwrittenLabelProps> = ({
  text,
  position,
  fontSize = '14px',
  rotation = -1.5,
  opacity = 0.5,
  color = 'rgba(200,200,200,0.5)',
  zIndex = 21,
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        ...position,
        fontFamily: '"Caveat", cursive',
        fontSize,
        color,
        transform: `rotate(${rotation}deg)`,
        textShadow: 
          '0 -1px 1px rgba(255,255,255,0.3), ' +  // Light top highlight (ETCHED)
          '0 1px 2px rgba(0,0,0,0.9), ' +          // Dark bottom shadow (ETCHED)
          '1px 1px 3px rgba(0,0,0,0.8)',           // Additional depth
        letterSpacing: '0.5px',
        pointerEvents: 'none',
        zIndex,
        opacity,
      }}
    >
      {text}
    </div>
  );
};

export default HandwrittenLabel;
