// Codex Tab - Ghost identification and deduction
import { useInvestigation } from '../../../context/InvestigationContext';
import { GHOST_DEFINITIONS, doesGhostMatchEvidence, TRAIT_LABELS } from '../../../data/ghosts';
import type { GhostType } from '../../../types/investigation';

export function CodexTab() {
  const { evidence, completeInvestigation } = useInvestigation();

  const ghostList: GhostType[] = ['Wraith', 'Shade', 'Poltergeist'];

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
        📖 Ghost Codex
      </h3>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        {ghostList.map((ghostId) => {
          const ghost = GHOST_DEFINITIONS[ghostId];
          const matches = doesGhostMatchEvidence(ghost.keyTraits, evidence);

          return (
            <div
              key={ghostId}
              style={{
                padding: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                border: `2px solid ${matches ? 'rgba(45, 212, 191, 0.5)' : 'rgba(100, 100, 100, 0.3)'}`,
                borderRadius: '12px',
                opacity: matches ? 1 : 0.5,
                transition: 'all 0.3s',
              }}
            >
              {/* Ghost header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '12px',
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    color: matches ? '#00ffff' : '#888888',
                    fontFamily: 'monospace',
                    fontSize: '18px',
                    fontWeight: 'bold',
                  }}
                >
                  {ghost.name}
                </h4>
                {!matches && (
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#ef4444',
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                    }}
                  >
                    ✗ CONFLICT
                  </span>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  margin: '0 0 12px 0',
                  fontSize: '12px',
                  color: matches ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                  fontFamily: 'sans-serif',
                  lineHeight: '1.4',
                }}
              >
                {ghost.description}
              </p>

              {/* Key traits */}
              <div
                style={{
                  marginBottom: '12px',
                  padding: '8px',
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderRadius: '6px',
                }}
              >
                <div
                  style={{
                    fontSize: '10px',
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontFamily: 'monospace',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Key Traits:
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '4px',
                  }}
                >
                  {Object.entries(ghost.keyTraits)
                    .filter(([_, state]) => state === 'present')
                    .map(([trait]) => (
                      <span
                        key={trait}
                        style={{
                          padding: '4px 8px',
                          backgroundColor: 'rgba(16, 185, 129, 0.2)',
                          border: '1px solid rgba(16, 185, 129, 0.4)',
                          borderRadius: '4px',
                          fontSize: '10px',
                          color: '#10b981',
                          fontFamily: 'monospace',
                        }}
                      >
                        {TRAIT_LABELS[trait as keyof typeof TRAIT_LABELS]}
                      </span>
                    ))}
                </div>
              </div>

              {/* Confirm button */}
              <button
                onClick={() => completeInvestigation(ghostId)}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: matches ? 'rgba(45, 212, 191, 0.2)' : 'rgba(100, 100, 100, 0.2)',
                  border: `2px solid ${matches ? '#2dd4bf' : '#666666'}`,
                  borderRadius: '8px',
                  color: matches ? '#2dd4bf' : '#888888',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = 'scale(0.98)';
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                🎯 Confirm Identity
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
        💡 Tip: Ghosts that conflict with your evidence are dimmed. Use the Evidence tab to log your findings.
      </div>
    </div>
  );
}
