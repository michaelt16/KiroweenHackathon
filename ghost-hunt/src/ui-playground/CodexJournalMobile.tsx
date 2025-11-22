import React, { useState } from 'react';

// Texture imports
import coffeestain from '../assets/texture/coffeestain.png';
import dust from '../assets/texture/dust.png';
import wrinkledpaper from '../assets/texture/wrinkledpaper.png';
import tape from '../assets/texture/tape.png';
import ghost1 from '../assets/images/ghost1.png';
import bookFrame from '../assets/frame/book.png';

// Codex Journal - Personal Field Guide (Mobile)
// Well-used but cared for - not destroyed
export function CodexJournalMobile() {
  const [selectedGhost, setSelectedGhost] = useState('wraith');

  const ghosts = [
    { id: 'spirit', name: 'Spirit', discovered: true },
    { id: 'wraith', name: 'Wraith', discovered: true },
    { id: 'shade', name: 'Shade', discovered: true },
    { id: 'poltergeist', name: 'Poltergeist', discovered: true },
    { id: 'banshee', name: 'Banshee', discovered: false },
    { id: 'demon', name: 'Demon', discovered: false },
  ];

  const ghostData: Record<string, any> = {
    wraith: {
      name: 'Wraith',
      threat: 'HIGH',
      summary: 'Aggressive entity capable of moving through walls. Known for sudden temperature drops and electromagnetic disturbances. Highly mobile during hunts.',
      evidence: ['EMF Level 5', 'Spirit Box', 'Freezing Temps'],
      notes: 'VERY FAST - difficult to track. Responds aggressively to provocation. Do not investigate alone.',
      weakness: 'Salt barriers temporarily slow movement',
      discovered: true,
    },
    shade: {
      name: 'Shade',
      threat: 'MEDIUM',
      summary: 'Shy ghost that prefers darkness and solitude. Rarely aggressive unless provoked. Most active when investigator is alone.',
      evidence: ['Ghost Orbs', 'Ghost Writing', 'Freezing Temps'],
      notes: 'Easiest to identify in complete darkness. Avoids groups - send one person in.',
      weakness: 'Light sources, group presence',
      discovered: true,
    },
    spirit: {
      name: 'Spirit',
      threat: 'LOW',
      summary: 'Common ghost type. No special abilities. Standard behavior patterns make it relatively easy to identify and handle.',
      evidence: ['Spirit Box', 'Ghost Writing', 'EMF Level 5'],
      notes: 'Good for training new investigators. Responds well to smudge sticks.',
      weakness: 'Smudge sticks highly effective',
      discovered: true,
    },
    poltergeist: {
      name: 'Poltergeist',
      threat: 'HIGH',
      summary: 'Chaotic entity known for throwing multiple objects. Feeds on fear and environmental chaos. Can drain sanity quickly.',
      evidence: ['Spirit Box', 'Fingerprints', 'Ghost Writing'],
      notes: 'Can throw MULTIPLE items at once - stay alert. Keep area organized to track activity.',
      weakness: 'Calm environment, smudge sticks',
      discovered: true,
    },
  };

  const current = ghostData[selectedGhost] || ghostData.wraith;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
      fontFamily: '"Courier New", monospace',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* CSS Book Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '450px',
        background: '#2d1f15',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: `
          0 30px 80px rgba(0,0,0,0.9),
          inset -15px 0 30px rgba(0,0,0,0.4),
          inset 15px 0 30px rgba(0,0,0,0.2)
        `,
      }}>
        {/* Book spine shadow (left side) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '40px',
          background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 0%, transparent 100%)',
          borderRadius: '8px 0 0 8px',
          pointerEvents: 'none',
        }} />
        
        {/* Book edge highlight (right side) */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '20px',
          background: 'linear-gradient(270deg, rgba(139,69,19,0.3) 0%, transparent 100%)',
          borderRadius: '0 8px 8px 0',
          pointerEvents: 'none',
        }} />
        
        {/* Leather texture overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              transparent 0px,
              rgba(0, 0, 0, 0.1) 1px,
              transparent 2px,
              transparent 12px
            ),
            repeating-linear-gradient(
              -45deg,
              transparent 0px,
              rgba(0, 0, 0, 0.08) 1px,
              transparent 2px,
              transparent 15px
            )
          `,
          borderRadius: '8px',
          pointerEvents: 'none',
        }} />
        
        {/* Book Page Content Area */}
        <div style={{
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            background: '#d8d4c8',
            borderRadius: '4px',
            boxShadow: `
              0 4px 12px rgba(0,0,0,0.3),
              inset -3px 0 6px rgba(0,0,0,0.1)
            `,
            padding: '35px 25px',
            position: 'relative',
            maxHeight: '700px',
            overflowY: 'auto',
          }}>
          {/* Light wrinkled paper texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${wrinkledpaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
            borderRadius: '4px',
          }} />

          {/* Very light dust */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.2,
            pointerEvents: 'none',
          }} />

          {/* Subtle edge darkening */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.15) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Vertical crease (book spine suggestion) */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '1px',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 80%, transparent)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }} />

          {/* Small coffee ring - top right corner */}
          <div style={{
            position: 'absolute',
            top: '30px',
            right: '40px',
            width: '80px',
            height: '80px',
            backgroundImage: `url(${coffeestain})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            opacity: 0.3,
            transform: 'rotate(15deg)',
            pointerEvents: 'none',
          }} />

          {/* Sticky tab bookmark */}
          <div style={{
            position: 'absolute',
            top: '100px',
            right: '-10px',
            width: '30px',
            height: '60px',
            background: '#ffeb3b',
            boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
            transform: 'rotate(2deg)',
            borderRadius: '2px 0 0 2px',
          }}>
            <div style={{
              fontSize: '10px',
              color: '#1a1a1a',
              fontWeight: 'bold',
              transform: 'rotate(90deg)',
              position: 'absolute',
              top: '25px',
              left: '8px',
              whiteSpace: 'nowrap',
            }}>
              ACTIVE
            </div>
          </div>

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Header */}
            <div style={{
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '2px solid #8B4513',
            }}>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '28px',
                fontWeight: 'bold',
                color: '#1a0f0a',
                marginBottom: '6px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                GHOST CODEX
              </div>
              <div style={{
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: '#8B4513',
                letterSpacing: '1px',
              }}>
                Personal Field Guide - Agent_001
              </div>
            </div>

            {/* Ghost Tabs */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginBottom: '25px',
              paddingBottom: '15px',
              borderBottom: '1px solid rgba(139, 69, 19, 0.3)',
            }}>
              {ghosts.map((ghost) => (
                <div
                  key={ghost.id}
                  onClick={() => ghost.discovered && setSelectedGhost(ghost.id)}
                  style={{
                    padding: '6px 12px',
                    background: selectedGhost === ghost.id ? 'rgba(139, 69, 19, 0.2)' : 'rgba(255, 255, 255, 0.3)',
                    border: `2px solid ${selectedGhost === ghost.id ? '#8B4513' : 'rgba(139, 69, 19, 0.3)'}`,
                    borderRadius: '3px',
                    cursor: ghost.discovered ? 'pointer' : 'not-allowed',
                    opacity: ghost.discovered ? 1 : 0.4,
                    fontSize: '11px',
                    fontWeight: selectedGhost === ghost.id ? 'bold' : 'normal',
                    color: '#1a0f0a',
                    transition: 'all 0.2s',
                  }}
                >
                  {ghost.discovered ? ghost.name : '???'}
                </div>
              ))}
            </div>

            {/* Ghost Details */}
            {current.discovered ? (
              <>
                {/* Ghost Name */}
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#1a0f0a',
                  marginBottom: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                }}>
                  {current.name}
                </div>

                {/* Threat Level */}
                <div style={{
                  display: 'inline-block',
                  padding: '6px 14px',
                  background: 
                    current.threat === 'HIGH' ? 'rgba(220, 38, 38, 0.2)' :
                    current.threat === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' :
                    'rgba(34, 197, 94, 0.2)',
                  border: `2px solid ${
                    current.threat === 'HIGH' ? '#dc2626' :
                    current.threat === 'MEDIUM' ? '#f59e0b' :
                    '#22c55e'
                  }`,
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#1a0f0a',
                  letterSpacing: '1px',
                  marginBottom: '20px',
                }}>
                  ⚠️ THREAT: {current.threat}
                </div>

                {/* Polaroid Photo */}
                <div style={{
                  position: 'relative',
                  width: '180px',
                  margin: '0 auto 25px',
                  transform: 'rotate(-3deg)',
                }}>
                  {/* Tape */}
                  <div style={{
                    position: 'absolute',
                    top: '-10px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(-5deg)',
                    width: '70px',
                    height: '22px',
                    backgroundImage: `url(${tape})`,
                    backgroundSize: 'cover',
                    zIndex: 2,
                  }} />

                  {/* Polaroid */}
                  <div style={{
                    background: '#e8e4dc',
                    padding: '10px 10px 35px 10px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.5)',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '140px',
                      background: '#1a1a1a',
                      position: 'relative',
                      overflow: 'hidden',
                    }}>
                      <img 
                        src={ghost1} 
                        alt={current.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                        }}
                      />
                      {/* Light static */}
                      <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundImage: `url(${dust})`,
                        mixBlendMode: 'overlay',
                        opacity: 0.5,
                      }} />
                    </div>

                    <div style={{
                      fontFamily: '"Caveat", cursive',
                      fontSize: '14px',
                      color: '#1a1a1a',
                      marginTop: '6px',
                      textAlign: 'center',
                    }}>
                      confirmed sighting
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div style={{
                  marginBottom: '20px',
                }}>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#1a0f0a',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Description
                  </div>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '13px',
                    color: '#1a1a1a',
                    lineHeight: '1.6',
                    padding: '12px',
                    background: 'rgba(255, 255, 255, 0.4)',
                    borderRadius: '3px',
                    border: '1px solid rgba(139, 69, 19, 0.2)',
                  }}>
                    {current.summary}
                  </div>
                </div>

                {/* Evidence */}
                <div style={{
                  marginBottom: '20px',
                }}>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#1a0f0a',
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    Evidence Types
                  </div>
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                  }}>
                    {current.evidence.map((ev: string, idx: number) => (
                      <div
                        key={idx}
                        style={{
                          padding: '6px 12px',
                          background: '#2d1810',
                          color: '#f4f0e6',
                          fontSize: '11px',
                          fontWeight: 'bold',
                          borderRadius: '3px',
                          border: '1px solid #8B4513',
                        }}
                      >
                        {ev}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Handwritten Notes */}
                <div style={{
                  marginBottom: '20px',
                  padding: '15px',
                  background: 'rgba(139, 69, 19, 0.08)',
                  border: '2px dashed #8B4513',
                  borderRadius: '4px',
                  position: 'relative',
                }}>
                  <div style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#8B4513',
                    marginBottom: '8px',
                    letterSpacing: '0.5px',
                  }}>
                    ✍️ Field Notes:
                  </div>
                  <div style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '16px',
                    color: '#1a0f0a',
                    lineHeight: '1.6',
                    transform: 'rotate(-0.3deg)',
                  }}>
                    {current.notes}
                  </div>

                  {/* Small underline emphasis */}
                  {current.threat === 'HIGH' && (
                    <div style={{
                      position: 'absolute',
                      bottom: '25px',
                      left: '20px',
                      width: '60px',
                      height: '2px',
                      background: '#dc2626',
                      transform: 'rotate(-1deg)',
                    }} />
                  )}
                </div>

                {/* Weakness */}
                <div style={{
                  padding: '12px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '2px solid #22c55e',
                  borderRadius: '4px',
                }}>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    color: '#1a0f0a',
                    marginBottom: '6px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}>
                    🛡️ Weakness
                  </div>
                  <div style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '12px',
                    color: '#1a1a1a',
                    lineHeight: '1.5',
                  }}>
                    {current.weakness}
                  </div>
                </div>

                {/* Small margin note */}
                <div style={{
                  position: 'absolute',
                  bottom: '40px',
                  right: '35px',
                  fontFamily: '"Caveat", cursive',
                  fontSize: '11px',
                  color: '#8B4513',
                  transform: 'rotate(5deg)',
                  opacity: 0.7,
                }}>
                  - verified 11/15/24
                </div>
              </>
            ) : (
              // Locked ghost
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '20px',
                  opacity: 0.3,
                }}>
                  🔒
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#666',
                  marginBottom: '12px',
                }}>
                  UNKNOWN ENTITY
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '13px',
                  color: '#999',
                  maxWidth: '250px',
                  margin: '0 auto',
                  lineHeight: '1.6',
                }}>
                  Complete more investigations to unlock this entry.
                </div>
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default CodexJournalMobile;
