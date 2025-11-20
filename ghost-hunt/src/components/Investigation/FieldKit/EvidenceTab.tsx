// Evidence Tab - Manual evidence logging
import { useInvestigation } from '../../../context/InvestigationContext';
import { TRAIT_LABELS, type EvidenceTrait, type TraitState } from '../../../data/ghosts';

const TRAIT_ORDER: EvidenceTrait[] = [
  'emf',
  'whispers',
  'cold',
  'static',
  'photos',
  'sanityBehavior',
  'movement',
];

const STATE_COLORS: Record<TraitState, string> = {
  unknown: '#6b7280',
  present: '#10b981',
  ruled_out: '#ef4444',
};

const STATE_LABELS: Record<TraitState, string> = {
  unknown: '?',
  present: '✓',
  ruled_out: '✗',
};

export function EvidenceTab() {
  const { evidence, setEvidenceTrait } = useInvestigation();

  const cycleTraitState = (trait: EvidenceTrait) => {
    const currentState = evidence[trait];
    let nextState: TraitState;

    switch (currentState) {
      case 'unknown':
        nextState = 'present';
        break;
      case 'present':
        nextState = 'ruled_out';
        break;
      case 'ruled_out':
        nextState = 'unknown';
        break;
    }

    setEvidenceTrait(trait, nextState);
  };

  return (
    <div
      style={{
        padding: '16px',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <h3
        style={{
          margin: '0 0 16px 0',
          color: '#00ffff',
          fontFamily: 'monospace',
          fontSize: '16px',
          textTransform: 'uppercase',
          letterSpacing: '1px',
        }}
      >
        📋 Evidence Log
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}
      >
        {TRAIT_ORDER.map((trait) => {
          const state = evidence[trait];
          const isMovement = trait === 'movement';

          return (
            <div
              key={trait}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: `1px solid ${isMovement ? 'rgba(100, 100, 100, 0.3)' : 'rgba(45, 212, 191, 0.3)'}`,
                borderRadius: '8px',
                opacity: isMovement ? 0.5 : 1,
              }}
            >
              {/* Trait label */}
              <div
                style={{
                  flex: 1,
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  color: isMovement ? '#888888' : 'white',
                }}
              >
                {TRAIT_LABELS[trait]}
                {isMovement && (
                  <div
                    style={{
                      fontSize: '10px',
                      color: '#666666',
                      marginTop: '2px',
                    }}
                  >
                    (N/A - Ghost is static)
                  </div>
                )}
              </div>

              {/* State button */}
              <button
                onClick={() => !isMovement && cycleTraitState(trait)}
                disabled={isMovement}
                style={{
                  width: '80px',
                  padding: '8px 12px',
                  backgroundColor: STATE_COLORS[state],
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: isMovement ? 'not-allowed' : 'pointer',
                  fontFamily: 'monospace',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
                onMouseDown={(e) => {
                  if (!isMovement) {
                    e.currentTarget.style.transform = 'scale(0.95)';
                  }
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span style={{ fontSize: '14px' }}>{STATE_LABELS[state]}</span>
                <span style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                  {state === 'unknown' ? 'Unknown' : state === 'present' ? 'Present' : 'Ruled Out'}
                </span>
              </button>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: '16px',
          padding: '12px',
          backgroundColor: 'rgba(0, 100, 100, 0.1)',
          border: '1px solid rgba(0, 255, 255, 0.2)',
          borderRadius: '8px',
          fontSize: '11px',
          color: 'rgba(255, 255, 255, 0.7)',
          fontFamily: 'monospace',
        }}
      >
        💡 Tip: Tap each trait to cycle between Unknown → Present → Ruled Out
      </div>
    </div>
  );
}
