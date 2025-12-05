import React from 'react';
import { StringConnection, MockPolaroid } from './mockData';

interface RedStringConnectionProps {
  connections: StringConnection[];
  polaroids: MockPolaroid[];
}

export const RedStringConnection: React.FC<RedStringConnectionProps> = ({ 
  connections, 
  polaroids 
}) => {
  // Helper function to get Polaroid center position
  const getPolaroidCenter = (polaroidId: string) => {
    const polaroid = polaroids.find(p => p.id === polaroidId);
    if (!polaroid) return { x: 0, y: 0 };
    
    // Parse percentage values and convert to viewport coordinates
    const x = parseFloat(polaroid.position.x);
    const y = parseFloat(polaroid.position.y);
    
    return { x, y };
  };

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10, // Higher than polaroids (zIndex: 5) so strings appear on top
      }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {connections.map((conn, index) => {
        const from = getPolaroidCenter(conn.from);
        const to = getPolaroidCenter(conn.to);
        
        return (
          <line
            key={`${conn.from}-${conn.to}-${index}`}
            x1={from.x}
            y1={from.y}
            x2={to.x}
            y2={to.y}
            stroke={conn.color}
            strokeWidth={conn.thickness / 10} // Scale for viewBox
            opacity={0.8}
            strokeLinecap="round"
          />
        );
      })}
    </svg>
  );
};
