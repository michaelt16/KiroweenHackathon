import React from 'react';

interface Evidence {
  id: string;
  name: string;
  collected: boolean;
}

interface GhostType {
  id: string;
  name: string;
  confidence: 'high' | 'medium' | 'low';
  requiredEvidence: string[];
}

interface EvidenceDeductionTabProps {
  evidence?: Evidence[];
  possibleGhosts?: GhostType[];
  onIdentifyGhost?: () => void;
}

const DEFAULT_EVIDENCE: Evidence[] = [
  { id: 'emf5', name: 'EMF Level 5', collected: false },
  { id: 'freezing', name: 'Freezing Temps', collected: false },
  { id: 'spiritbox', name: 'Spirit Box Response', collected: false },
  { id: 'orbs', name: 'Ghost Orbs', collected: false },
  { id: 'writing', name: 'Ghost Writing', collected: false },
  { id: 'fingerprints', name: 'Fingerprints', collected: false },
];

const EvidenceDeductionTab: React.FC<EvidenceDeductionTabProps> = ({
  evidence = DEFAULT_EVIDENCE,
  possibleGhosts = [],
  onIdentifyGhost,
}) => {
  const collectedCount = evidence.filter(e => e.collected).length;
  const canIdentify = possibleGhosts.length <= 2 && collectedCount >= 3;

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
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
        🔍 EVIDENCE & DEDUCTION
      </div>

      {/* Evidence Checklist */}
      <div>
        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#4a3a2a',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          EVIDENCE COLLECTED: {collectedCount}/{evidence.length}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {evidence.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                background: item.collected ? 'rgba(139, 115, 85, 0.15)' : 'rgba(139, 69, 19, 0.05)',
                borderRadius: '4px',
                border: item.collected ? '2px solid rgba(139, 115, 85, 0.4)' : '1px solid rgba(139, 69, 19, 0.2)',
              }}
            >
              {/* Checkbox */}
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  border: '2px solid #4a3a2a',
                  borderRadius: '3px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: item.collected ? '#8b7355' : 'transparent',
                  flexShrink: 0,
                }}
              >
                {item.collected && (
                  <span style={{ color: '#fff', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                )}
              </div>

              {/* Evidence name */}
              <div
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '12px',
                  color: item.collected ? '#1a0f0a' : '#4a3a2a',
                  fontWeight: item.collected ? 'bold' : 'normal',
                  textDecoration: item.collected ? 'none' : 'none',
                }}
              >
                {item.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Possible Ghosts */}
      <div>
        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '13px',
            fontWeight: 'bold',
            color: '#4a3a2a',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          POSSIBLE GHOSTS:
        </div>

        {possibleGhosts.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {possibleGhosts.map((ghost) => {
              const confidenceColor =
                ghost.confidence === 'high' ? '#cc0000' :
                ghost.confidence === 'medium' ? '#ff8800' :
                '#ffaa00';

              return (
                <div
                  key={ghost.id}
                  style={{
                    padding: '12px',
                    background: 'rgba(139, 69, 19, 0.08)',
                    borderRadius: '4px',
                    border: `2px solid ${confidenceColor}`,
                    position: 'relative',
                  }}
                >
                  {/* Red circle indicator */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: confidenceColor,
                      boxShadow: `0 0 8px ${confidenceColor}`,
                    }}
                  />

                  {/* Ghost name */}
                  <div
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      color: '#1a0f0a',
                      marginLeft: '24px',
                      textTransform: 'uppercase',
                    }}
                  >
                    {ghost.name}
                  </div>

                  {/* Confidence */}
                  <div
                    style={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: '12px',
                      color: '#4a3a2a',
                      marginLeft: '24px',
                      marginTop: '4px',
                    }}
                  >
                    {ghost.confidence} confidence
                  </div>

                  {/* Handwritten note */}
                  <div
                    style={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: '11px',
                      color: confidenceColor,
                      marginTop: '6px',
                      marginLeft: '24px',
                      transform: 'rotate(-0.5deg)',
                    }}
                  >
                    matches {ghost.requiredEvidence.length} evidence types
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              padding: '20px',
              textAlign: 'center',
              fontFamily: '"Caveat", cursive',
              fontSize: '14px',
              color: '#4a3a2a',
              background: 'rgba(139, 69, 19, 0.05)',
              borderRadius: '4px',
            }}
          >
            Collect evidence to narrow down ghost types
          </div>
        )}
      </div>

      {/* Identify Ghost Button */}
      {canIdentify && (
        <button
          onClick={onIdentifyGhost}
          style={{
            padding: '14px 20px',
            background: 'linear-gradient(135deg, #8b7355 0%, #6b5230 100%)',
            border: '2px solid #4a3218',
            borderRadius: '6px',
            color: '#fff',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.2s ease',
          }}
          onMouseDown={(e) => {
            e.currentTarget.style.transform = 'translateY(2px)';
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
          }}
          onMouseUp={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
          }}
        >
          🎯 IDENTIFY GHOST
        </button>
      )}
    </div>
  );
};

export default EvidenceDeductionTab;
