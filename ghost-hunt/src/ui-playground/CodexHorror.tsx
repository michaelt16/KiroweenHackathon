import { useState } from 'react';

// Horror Codex - Ghost encyclopedia with journal entries
export function CodexHorror() {
  const [selectedGhost, setSelectedGhost] = useState<number | null>(1);

  const ghosts = [
    {
      id: 1,
      name: 'Wraith',
      discovered: true,
      threat: 'HIGH',
      encounters: 7,
      evidence: ['EMF Level 5', 'Spirit Box', 'Freezing Temps'],
      description: 'Aggressive entity that moves quickly through walls. Known for sudden temperature drops and electromagnetic disturbances.',
      behavior: 'Highly mobile, aggressive during hunts, responds to provocation',
      weakness: 'Salt barriers, UV light',
      notes: 'DANGEROUS - Do not investigate alone'
    },
    {
      id: 2,
      name: 'Shade',
      discovered: true,
      threat: 'MEDIUM',
      encounters: 12,
      evidence: ['Ghost Orbs', 'Ghost Writing', 'Freezing Temps'],
      description: 'Shy ghost that prefers darkness. Rarely aggressive unless provoked. Often found in quiet, isolated areas.',
      behavior: 'Passive, avoids groups, more active when alone',
      weakness: 'Light sources, group presence',
      notes: 'Easiest to identify in complete darkness'
    },
    {
      id: 3,
      name: 'Poltergeist',
      discovered: true,
      threat: 'HIGH',
      encounters: 5,
      evidence: ['Spirit Box', 'Fingerprints', 'Ghost Writing'],
      description: 'Chaotic entity known for throwing objects and causing disturbances. Feeds on fear and chaos.',
      behavior: 'Throws multiple objects, drains sanity quickly',
      weakness: 'Smudge sticks, calm environment',
      notes: 'Can throw multiple items at once - STAY ALERT'
    },
    {
      id: 4,
      name: 'Banshee',
      discovered: false,
      threat: 'EXTREME',
      encounters: 0,
      evidence: ['???', '???', '???'],
      description: '???',
      behavior: '???',
      weakness: '???',
      notes: 'Not yet encountered'
    },
    {
      id: 5,
      name: 'Demon',
      discovered: false,
      threat: 'EXTREME',
      encounters: 0,
      evidence: ['???', '???', '???'],
      description: '???',
      behavior: '???',
      weakness: '???',
      notes: 'Not yet encountered'
    },
  ];

  const selected = ghosts.find(g => g.id === selectedGhost);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1612',
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(92, 51, 23, 0.1) 0%, transparent 50%)
        `,
        padding: '20px',
        fontFamily: '"Courier New", monospace',
        position: 'relative',
        overflow: 'auto'
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
        
        {/* Journal Container */}
        <div
          style={{
            backgroundColor: '#2d2419',
            backgroundImage: `
              linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
              linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)
            `,
            backgroundSize: '40px 40px',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.8),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            transform: 'rotate(-0.5deg)',
            position: 'relative',
            border: '3px solid #3d2f1f'
          }}
        >
          {/* Pages Container */}
          <div
            style={{
              backgroundColor: '#f4f0e6',
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 27px,
                  rgba(139, 69, 19, 0.15) 28px,
                  rgba(139, 69, 19, 0.15) 29px
                ),
                radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.08) 0%, transparent 40%)
              `,
              border: '2px solid #d4c4a8',
              borderRadius: '6px',
              padding: '30px',
              minHeight: '700px',
              position: 'relative',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1)',
              display: 'grid',
              gridTemplateColumns: '250px 1fr',
              gap: '30px'
            }}
          >
            {/* Left Side - Ghost List */}
            <div>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2d1810',
                  marginBottom: '20px',
                  textAlign: 'center',
                  paddingBottom: '15px',
                  borderBottom: '2px solid #8B4513',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}
              >
                GHOST CODEX
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ghosts.map((ghost) => (
                  <div
                    key={ghost.id}
                    onClick={() => setSelectedGhost(ghost.id)}
                    style={{
                      padding: '12px',
                      backgroundColor: selectedGhost === ghost.id ? 'rgba(139, 69, 19, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                      border: `2px solid ${selectedGhost === ghost.id ? '#8B4513' : '#d4c4a8'}`,
                      borderRadius: '4px',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      opacity: ghost.discovered ? 1 : 0.5,
                      position: 'relative'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '14px',
                        fontWeight: 'bold',
                        color: '#2d1810',
                        marginBottom: '4px'
                      }}
                    >
                      {ghost.discovered ? ghost.name : '???'}
                    </div>
                    <div
                      style={{
                        fontSize: '10px',
                        color: '#8B4513'
                      }}
                    >
                      {ghost.discovered ? `${ghost.encounters} encounters` : 'LOCKED'}
                    </div>

                    {/* Threat indicator */}
                    {ghost.discovered && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '8px',
                          right: '8px',
                          width: '8px',
                          height: '8px',
                          backgroundColor:
                            ghost.threat === 'EXTREME' ? '#8B0000' :
                            ghost.threat === 'HIGH' ? '#dc2626' :
                            '#f59e0b',
                          borderRadius: '50%',
                          boxShadow: '0 0 4px rgba(0, 0, 0, 0.3)'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Stats Summary */}
              <div
                style={{
                  marginTop: '20px',
                  padding: '12px',
                  backgroundColor: 'rgba(139, 69, 19, 0.1)',
                  border: '2px dashed #8B4513',
                  borderRadius: '4px',
                  fontSize: '11px',
                  color: '#2d1810'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>PROGRESS</div>
                <div>Discovered: {ghosts.filter(g => g.discovered).length}/{ghosts.length}</div>
                <div>Total Encounters: {ghosts.reduce((sum, g) => sum + g.encounters, 0)}</div>
              </div>
            </div>

            {/* Right Side - Ghost Details */}
            {selected && (
              <div style={{ position: 'relative' }}>
                {selected.discovered ? (
                  <>
                    {/* Ghost Name Header */}
                    <div
                      style={{
                        marginBottom: '20px',
                        paddingBottom: '15px',
                        borderBottom: '3px solid #8B4513'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '28px',
                          fontWeight: 'bold',
                          color: '#2d1810',
                          marginBottom: '8px',
                          letterSpacing: '1px',
                          textTransform: 'uppercase'
                        }}
                      >
                        {selected.name}
                      </div>
                      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                        <div
                          style={{
                            padding: '4px 12px',
                            backgroundColor:
                              selected.threat === 'EXTREME' ? 'rgba(139, 0, 0, 0.8)' :
                              selected.threat === 'HIGH' ? 'rgba(220, 38, 38, 0.8)' :
                              'rgba(245, 158, 11, 0.8)',
                            color: '#fff',
                            fontSize: '10px',
                            fontWeight: 'bold',
                            borderRadius: '3px',
                            textTransform: 'uppercase',
                            letterSpacing: '1px'
                          }}
                        >
                          ⚠️ {selected.threat} THREAT
                        </div>
                        <div style={{ fontSize: '12px', color: '#8B4513' }}>
                          {selected.encounters} encounters logged
                        </div>
                      </div>
                    </div>

                    {/* Ghost Photo */}
                    <div
                      style={{
                        width: '180px',
                        height: '200px',
                        backgroundColor: '#e8e4dc',
                        padding: '8px 8px 20px 8px',
                        marginBottom: '20px',
                        float: 'right',
                        marginLeft: '20px',
                        transform: 'rotate(3deg)',
                        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                        border: '1px solid #d0ccc4'
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '140px',
                          backgroundColor: '#1a1a1a',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px',
                          border: '1px solid #333'
                        }}
                      >
                        👻
                      </div>
                      <div
                        style={{
                          textAlign: 'center',
                          marginTop: '6px',
                          fontSize: '10px',
                          color: '#1a1a1a',
                          fontFamily: '"Courier New", monospace'
                        }}
                      >
                        Evidence Photo #{selected.id}
                      </div>
                    </div>

                    {/* Description */}
                    <div style={{ marginBottom: '20px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#2d1810',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        📋 Description
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
                          lineHeight: '1.6',
                          padding: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          borderRadius: '4px',
                          border: '1px solid #d4c4a8'
                        }}
                      >
                        {selected.description}
                      </div>
                    </div>

                    {/* Evidence */}
                    <div style={{ marginBottom: '20px', clear: 'both' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#2d1810',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        🔍 Evidence Types
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {selected.evidence.map((ev, idx) => (
                          <div
                            key={idx}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#2d1810',
                              color: '#f4f0e6',
                              fontSize: '11px',
                              fontWeight: 'bold',
                              borderRadius: '4px',
                              border: '1px solid #8B4513'
                            }}
                          >
                            {ev}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Behavior */}
                    <div style={{ marginBottom: '20px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#2d1810',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        ⚡ Behavior Pattern
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
                          lineHeight: '1.6',
                          padding: '12px',
                          backgroundColor: 'rgba(255, 255, 255, 0.5)',
                          borderRadius: '4px',
                          border: '1px solid #d4c4a8'
                        }}
                      >
                        {selected.behavior}
                      </div>
                    </div>

                    {/* Weakness */}
                    <div style={{ marginBottom: '20px' }}>
                      <div
                        style={{
                          fontSize: '14px',
                          fontWeight: 'bold',
                          color: '#2d1810',
                          marginBottom: '8px',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        🛡️ Weakness
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: '#1a1a1a',
                          lineHeight: '1.6',
                          padding: '12px',
                          backgroundColor: 'rgba(34, 197, 94, 0.2)',
                          borderRadius: '4px',
                          border: '2px solid #22c55e'
                        }}
                      >
                        {selected.weakness}
                      </div>
                    </div>

                    {/* Handwritten Notes */}
                    <div
                      style={{
                        marginTop: '25px',
                        padding: '15px',
                        backgroundColor: 'rgba(139, 69, 19, 0.1)',
                        border: '2px dashed #8B4513',
                        borderRadius: '4px',
                        position: 'relative'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '12px',
                          fontWeight: 'bold',
                          color: '#8B0000',
                          marginBottom: '8px',
                          fontStyle: 'italic',
                          letterSpacing: '0.5px'
                        }}
                      >
                        ✍️ Field Notes:
                      </div>
                      <div
                        style={{
                          fontSize: '13px',
                          color: '#2d1810',
                          fontStyle: 'italic',
                          lineHeight: '1.5'
                        }}
                      >
                        {selected.notes}
                      </div>

                      {/* Coffee stain */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '10px',
                          right: '15px',
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'rgba(139, 69, 19, 0.2)',
                          borderRadius: '50% 30% 70% 40%',
                          transform: 'rotate(25deg)',
                          filter: 'blur(2px)',
                          mixBlendMode: 'multiply'
                        }}
                      />
                    </div>
                  </>
                ) : (
                  // Locked Ghost
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '400px',
                      textAlign: 'center'
                    }}
                  >
                    <div
                      style={{
                        fontSize: '64px',
                        marginBottom: '20px',
                        opacity: 0.3
                      }}
                    >
                      🔒
                    </div>
                    <div
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#666',
                        marginBottom: '12px'
                      }}
                    >
                      UNKNOWN ENTITY
                    </div>
                    <div
                      style={{
                        fontSize: '14px',
                        color: '#999',
                        maxWidth: '300px'
                      }}
                    >
                      This ghost type has not been encountered yet. Complete more investigations to unlock.
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodexHorror;
