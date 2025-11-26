import React from 'react';

interface ScrewPosition {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  transform?: string;
}

interface ScrewsProps {
  positions: ScrewPosition[];
  size?: number;
  type?: 'single' | 'cross';
}

/**
 * Screws - Realistic screw hardware for tool casings
 * 
 * Features:
 * - Radial gradient for 3D appearance
 * - Single slot or cross-slot variants
 * - Customizable size (12-18px)
 * - Inset shadows for depth
 * 
 * Usage:
 * <Screws 
 *   positions={[
 *     { top: '12px', left: '12px' },
 *     { top: '12px', right: '12px' }
 *   ]}
 *   size={14}
 *   type="single"
 * />
 */
export const Screws: React.FC<ScrewsProps> = ({ 
  positions, 
  size = 14,
  type = 'single'
}) => {
  return (
    <>
      {positions.map((pos, i) => (
        <div
          key={`screw-${i}`}
          style={{
            position: 'absolute',
            ...(pos.top ? { top: pos.top } : {}),
            ...(pos.bottom ? { bottom: pos.bottom } : {}),
            ...(pos.left ? { left: pos.left } : {}),
            ...(pos.right ? { right: pos.right } : {}),
            ...(pos.transform ? { transform: pos.transform } : {}),
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
          }}
        >
          {/* Single slot screw */}
          {type === 'single' && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${size * 0.5}px`,
              height: '1px',
              background: '#0a0a0a',
              boxShadow: '0 0 2px rgba(0,0,0,0.9)',
            }} />
          )}
          
          {/* Cross-slot screw */}
          {type === 'cross' && (
            <>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${size * 0.5}px`,
                height: '1px',
                background: '#0a0a0a',
                boxShadow: '0 0 2px rgba(0,0,0,0.9)',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                width: `${size * 0.5}px`,
                height: '1px',
                background: '#0a0a0a',
                boxShadow: '0 0 2px rgba(0,0,0,0.9)',
              }} />
            </>
          )}
        </div>
      ))}
    </>
  );
};
