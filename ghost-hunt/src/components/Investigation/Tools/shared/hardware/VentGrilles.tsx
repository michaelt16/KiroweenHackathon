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
 * - Multiple vent sections (top and bottom)
 * - Vertical slits with gradient
 * - Left or right side placement
 * - Matches EMF mock placement
 * 
 * Usage:
 * <VentGrilles side="left" />
 * <VentGrilles side="right" />
 */
export const VentGrilles: React.FC<VentGrilleProps> = ({ 
  side, 
  slitCount = 8,
  width = '2px',
  height = '120px'
}) => {
  // Industrial vent slits (like EMF mock) - Multiple sections
  const ventSections = [
    { top: '18%', bottom: '27%', count: 8 },  // Upper section
    { top: '60%', bottom: '68%', count: 6 },  // Lower section
  ];
  
  return (
    <>
      {ventSections.map((section, sectionIndex) => (
        <div
          key={`${side}-section-${sectionIndex}`}
          style={{
            position: 'absolute',
            [side]: side === 'left' ? '3%' : '3%',
            top: section.top,
            bottom: section.bottom,
            width,
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
            pointerEvents: 'none',
            zIndex: 9,
          }}
        >
          {[...Array(section.count)].map((_, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.95) 100%)',
                boxShadow: 'inset 0 0 3px rgba(0,0,0,0.9)',
                borderRadius: '1px',
              }}
            />
          ))}
        </div>
      ))}
    </>
  );
};
