import React from 'react';
import { PushPin } from '../../analog/base/PushPin';

interface IndexCardProps {
  title: string;
  details: string[];
  rotation?: number;
}

export const IndexCard: React.FC<IndexCardProps> = ({ 
  title, 
  details, 
  rotation = 0 
}) => {
  return (
    <div
      style={{
        position: 'relative',
        width: '200px',
        background: '#f4f0e6',
        padding: '15px',
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        border: '1px solid rgba(139, 69, 19, 0.2)',
      }}
    >
      {/* Push pin at top */}
      <PushPin color="silver" position={{ top: '-8px', left: '50%' }} />
      
      {/* Title */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#1a0f0a',
          marginBottom: '10px',
          letterSpacing: '1px',
          textAlign: 'center',
        }}
      >
        {title}
      </div>
      
      {/* Details */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '11px',
          color: '#1a0f0a',
          lineHeight: '1.6',
        }}
      >
        {details.map((detail, index) => (
          <div key={index} style={{ marginBottom: '4px' }}>
            {detail}
          </div>
        ))}
      </div>
    </div>
  );
};
