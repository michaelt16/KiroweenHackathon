import React from 'react';

interface VentGrilleProps {
  side: 'left' | 'right';
  slitCount?: number;
  width?: string;
  height?: string;
}

/**
 * VentGrilles - Industrial cooling vents for metal tools
 * 
 * Features:
 * - Vertical slits with gradient
 * - Left or right side placement
 * - Customizable slit count (default 15)
 * - Inset shadows for depth
 * 
 * Usage:
 * <VentGrilles side="left" slitCount={15} />
 * <VentGrilles side="right" slitCount={15} />
 */
export const VentGrilles: React.FC<VentGrilleProps> = ({ 
  side, 
  slitCount = 15,
  width = '8px',
  height = '120px'
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        [side]: '8px',
        top: '50%',
        transform: 'translateY(-50%)',
        width,
        height,
        display: 'flex',
        flexDirection: 'column',
        gap: '3px',
        pointerEvents: 'none',
        zIndex: 9,
      }}
    >
      {[...Array(slitCount)].map((_, i) => (
        <div
          key={i}
          style={{
            width: '100%',
            height: '2px',
            background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
          }}
        />
      ))}
    </div>
  );
};
