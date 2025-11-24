import React from 'react';

interface JournalSection {
  title: string;
  entries: string[];
}

const JOURNAL_CONTENT: JournalSection[] = [
  {
    title: 'TOOL USAGE TIPS:',
    entries: [
      'Radar shows direction only - spin to find ghost bearing',
      'EMF detects proximity - beeps faster when closer',
      'Thermal reveals cold spots - look for blue areas',
      'Audio captures whispers - listen for EVP responses',
      'Camera takes photos - uses film, wait for development',
    ],
  },
  {
    title: 'GHOST BEHAVIOR SIGNS:',
    entries: [
      'EMF spikes = ghost is nearby',
      'Whispers = attempting communication',
      'Cold spots = paranormal presence',
      'Static distortion = reality disturbance',
      'Sudden silence = ghost is watching',
    ],
  },
  {
    title: 'SAFETY REMINDERS:',
    entries: [
      'Watch your sanity meter',
      "Don't stay too long in one spot",
      'Trust your instincts',
      'Document everything',
      'Leave if you feel threatened',
    ],
  },
  {
    title: 'INVESTIGATION STRATEGY:',
    entries: [
      '1. Use Radar to find direction',
      '2. Switch to EMF to close distance',
      '3. Gather evidence with other tools',
      '4. Take photos when EMF is high',
      '5. Review evidence and deduce ghost type',
    ],
  },
];

const FieldJournalTab: React.FC = () => {
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1a0f0a',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          borderBottom: '2px solid rgba(139, 69, 19, 0.4)',
          paddingBottom: '8px',
        }}
      >
        📝 FIELD JOURNAL
      </div>

      {/* Coffee stain decoration */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 69, 19, 0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Journal sections */}
      {JOURNAL_CONTENT.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          style={{
            position: 'relative',
          }}
        >
          {/* Section title */}
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#1a0f0a',
              marginBottom: '12px',
              transform: 'rotate(-0.3deg)',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(26, 15, 10, 0.3)',
              textDecorationThickness: '2px',
              textUnderlineOffset: '4px',
            }}
          >
            {section.title}
          </div>

          {/* Entries */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              paddingLeft: '12px',
            }}
          >
            {section.entries.map((entry, entryIndex) => (
              <div
                key={entryIndex}
                style={{
                  display: 'flex',
                  gap: '8px',
                  alignItems: 'flex-start',
                }}
              >
                {/* Bullet point */}
                <div
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '18px',
                    color: '#4a3a2a',
                    lineHeight: '1.6',
                    flexShrink: 0,
                  }}
                >
                  •
                </div>

                {/* Entry text */}
                <div
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '15px',
                    color: '#1a0f0a',
                    lineHeight: '1.8',
                    transform: `rotate(${Math.sin(entryIndex) * 0.5}deg)`,
                  }}
                >
                  {entry}
                </div>
              </div>
            ))}
          </div>

          {/* Scribble underline for some sections */}
          {sectionIndex === 1 && (
            <div
              style={{
                position: 'absolute',
                bottom: '-8px',
                left: '20px',
                right: '20px',
                height: '2px',
                background: 'rgba(139, 0, 0, 0.3)',
                transform: 'rotate(-0.5deg)',
              }}
            />
          )}
        </div>
      ))}

      {/* Handwritten note at bottom */}
      <div
        style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(255, 235, 59, 0.3)',
          border: '1px dashed rgba(139, 69, 19, 0.4)',
          borderRadius: '4px',
          transform: 'rotate(0.5deg)',
        }}
      >
        <div
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '14px',
            color: '#4a3a2a',
            lineHeight: '1.8',
            textAlign: 'center',
          }}
        >
          Remember: Every investigation is different.
          <br />
          Stay alert. Stay safe. Trust the evidence.
        </div>
      </div>

      {/* Tape decoration */}
      <div
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '10px',
          width: '50px',
          height: '15px',
          background: 'rgba(255, 255, 255, 0.6)',
          transform: 'rotate(-8deg)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default FieldJournalTab;
