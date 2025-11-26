// Field Note Card Component - Brief instructions that expand on click
import React from 'react';
import tapeTexture from '../../assets/texture/tape.png';

interface FieldNoteCardProps {
  briefText: string;
  detailedText: string;
  position: 'left' | 'right';
  onClick: () => void;
}

export function FieldNoteCard({ briefText, detailedText, position, onClick }: FieldNoteCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
        transform: 'rotate(-2deg)',
        // Smaller, card-sized width (like a 3x5 index card)
        width: '80px',
        maxWidth: '80px',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-out',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(-2deg) translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'rotate(-2deg)';
      }}
    >
      {/* Tape strip at top - smaller */}
      <div
        style={{
          position: 'absolute',
          top: '-4px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-2deg)',
          width: '30px',
          height: '12px',
          backgroundImage: `url(${tapeTexture})`,
          backgroundSize: 'cover',
          opacity: 0.8,
          zIndex: 2,
        }}
      />

      {/* Index card - darker to match UI, smaller and more compact */}
      <div
        style={{
          background: '#3a3a3a',
          padding: '8px 6px',
          borderRadius: '2px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.8), inset 0 1px 2px rgba(255,255,255,0.05)',
          border: '1.5px solid rgba(80, 80, 80, 0.6)',
          position: 'relative',
          minHeight: '60px',
        }}
      >
        {/* Horizontal lines (index card style) - fewer lines for smaller card */}
        {[0, 1].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: `${20 + i * 12}px`,
              left: '4px',
              right: '4px',
              height: '1px',
              background: 'rgba(200, 200, 200, 0.15)',
            }}
          />
        ))}

        {/* Brief handwritten text - smaller font for card size */}
        <div
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '10px',
            color: '#d8d4c8',
            textAlign: 'center',
            lineHeight: '1.3',
            whiteSpace: 'pre-line',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {briefText}
        </div>

        {/* Click indicator - smaller */}
        <div
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '7px',
            color: 'rgba(200, 200, 200, 0.5)',
            textAlign: 'center',
            marginTop: '3px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          (tap)
        </div>
      </div>
    </div>
  );
}
