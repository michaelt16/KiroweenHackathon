// Analog Horror Hybrid Mock - Dark UI with Physical Artifacts
// Pure visual mockup - no functionality

interface AnalogHorrorHybridMockProps {
  screen: 'profile' | 'codex' | 'map' | 'investigation';
}

export function AnalogHorrorHybridMock({ screen }: AnalogHorrorHybridMockProps) {
  if (screen === 'profile') return <HybridProfile />;
  if (screen === 'codex') return <HybridCodex />;
  if (screen === 'map') return <HybridMap />;
  return <HybridInvestigation />;
}

// Shared VHS/Analog effects component
function AnalogEffects() {
  return (
    <>
      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 0, 0, 0.1) 2px, rgba(0, 0, 0, 0.1) 4px)
        `,
        pointerEvents: 'none',
        zIndex: 1000,
      }} />
      
      {/* VHS noise */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          repeating-linear-gradient(90deg, transparent, transparent 1px, rgba(255,255,255,0.01) 1px, rgba(255,255,255,0.01) 2px)
        `,
        pointerEvents: 'none',
        zIndex: 1000,
        opacity: 0.3,
      }} />
      
      {/* Chromatic aberration effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: '2px',
        background: 'rgba(255, 0, 0, 0.2)',
        zIndex: 999,
      }} />
    </>
  );
}

// Hybrid Profile
function HybridProfile() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      backgroundImage: `
        radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.05) 0%, transparent 50%),
        radial-gradient(circle at 70% 60%, rgba(45, 212, 191, 0.03) 0%, transparent 50%)
      `,
      position: 'relative',
      padding: '40px 20px',
    }}>
      <AnalogEffects />

      {/* Corkboard background hint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(139, 115, 85, 0.02) 3px, rgba(139, 115, 85, 0.02) 6px),
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(139, 115, 85, 0.02) 3px, rgba(139, 115, 85, 0.02) 6px)
        `,
        opacity: 0.3,
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Digital Frame */}
        <div style={{
          background: 'rgba(15, 26, 31, 0.95)',
          border: '2px solid #2dd4bf',
          borderRadius: '8px',
          padding: '4px',
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.2), 0 8px 32px rgba(0,0,0,0.8)',
          position: 'relative',
        }}>
          {/* Glitch effect */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: 0,
            right: 0,
            height: '2px',
            background: '#ff0000',
            opacity: 0.3,
            zIndex: 10,
          }} />

          {/* Paper ID Card Inside */}
          <div style={{
            background: '#e8dcc0',
            borderRadius: '4px',
            padding: '24px',
            position: 'relative',
          }}>
            {/* Tape corner */}
            <div style={{
              position: 'absolute',
              top: '-4px',
              right: '20px',
              width: '40px',
              height: '16px',
              background: 'rgba(210, 180, 140, 0.7)',
              transform: 'rotate(5deg)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }} />

            {/* Digital header bar */}
            <div style={{
              background: '#0a0f14',
              margin: '-24px -24px 20px -24px',
              padding: '16px 24px',
              borderRadius: '4px 4px 0 0',
              borderBottom: '2px solid #2dd4bf',
            }}>
              <div style={{
                fontSize: '10px',
                color: '#2dd4bf',
                letterSpacing: '2px',
                textShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
              }}>
                AGENT PROFILE
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#fff',
                marginTop: '4px',
                fontFamily: 'Arial, sans-serif',
              }}>
                AGENT_001
              </div>
            </div>

            {/* Photo with digital glow */}
            <div style={{
              width: '100px',
              height: '100px',
              margin: '0 auto 20px',
              background: '#ddd',
              border: '3px solid #2dd4bf',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              boxShadow: '0 0 20px rgba(45, 212, 191, 0.4)',
              position: 'relative',
            }}>
              👤
              {/* Flicker effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(45, 212, 191, 0.1)',
                borderRadius: '50%',
              }} />
            </div>

            {/* Handwritten info */}
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              color: '#2a1f1a',
              lineHeight: '2',
              marginBottom: '20px',
            }}>
              <div>Level: <strong>5</strong></div>
              <div>Rank: <strong>Investigator</strong></div>
              <div>Status: <strong>Active</strong></div>
            </div>

            {/* Digital stats bar */}
            <div style={{
              background: '#0a0f14',
              margin: '0 -24px -24px -24px',
              padding: '16px 24px',
              borderRadius: '0 0 4px 4px',
              display: 'flex',
              justifyContent: 'space-around',
            }}>
              {[
                { label: 'Cases', value: '12' },
                { label: 'Caught', value: '8' },
                { label: 'Rate', value: '67%' },
              ].map((stat) => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#2dd4bf',
                    textShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
                    fontFamily: 'Arial, sans-serif',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#64748b',
                    marginTop: '2px',
                    fontFamily: 'Arial, sans-serif',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky note overlay */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-30px',
          width: '120px',
          height: '120px',
          background: '#ffeb3b',
          padding: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          transform: 'rotate(8deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          color: '#1a1a1a',
          zIndex: 10,
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            NOTES:
          </div>
          <div style={{ lineHeight: '1.4' }}>
            ✓ Equipment ready
            <br />
            ✓ Clearance OK
            <br />
            ⚠ Stay alert
          </div>
        </div>

        {/* Red string overlay */}
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 5,
          opacity: 0.2,
        }}>
          <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#ff0000" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>
    </div>
  );
}

// Hybrid Codex
function HybridCodex() {
  const ghosts = [
    { name: 'Wraith', threat: 'HIGH', discovered: true },
    { name: 'Shade', threat: 'MEDIUM', discovered: true },
    { name: 'Unknown', threat: '???', discovered: false },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0a0a',
      position: 'relative',
      padding: '40px 20px',
    }}>
      <AnalogEffects />

      {/* Desk/corkboard hint */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(139, 115, 85, 0.02) 3px, rgba(139, 115, 85, 0.02) 6px)
        `,
        opacity: 0.3,
        zIndex: 0,
      }} />

      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Digital header */}
        <div style={{
          background: 'rgba(15, 26, 31, 0.95)',
          border: '2px solid #2dd4bf',
          borderRadius: '8px',
          padding: '20px',
          marginBottom: '30px',
          textAlign: 'center',
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.2)',
        }}>
          <div style={{
            fontSize: '12px',
            color: '#2dd4bf',
            letterSpacing: '2px',
            textShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
            fontFamily: 'Arial, sans-serif',
          }}>
            ENTITY DATABASE
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#fff',
            marginTop: '4px',
            fontFamily: 'Arial, sans-serif',
          }}>
            Ghost Codex
          </div>
        </div>

        {/* Ghost entries */}
        {ghosts.map((ghost, i) => (
          <div
            key={i}
            style={{
              marginBottom: '25px',
              position: 'relative',
            }}
          >
            {/* Digital frame */}
            <div style={{
              background: 'rgba(15, 26, 31, 0.95)',
              border: '1px solid #334155',
              borderRadius: '8px',
              padding: '4px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
            }}>
              {/* Paper card inside */}
              <div style={{
                background: '#e8dcc0',
                borderRadius: '4px',
                padding: '20px',
                position: 'relative',
              }}>
                {/* Tape */}
                <div style={{
                  position: 'absolute',
                  top: '-4px',
                  right: '20px',
                  width: '40px',
                  height: '16px',
                  background: 'rgba(210, 180, 140, 0.7)',
                  transform: 'rotate(-5deg)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                }} />

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {/* Digital icon with glow */}
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: ghost.discovered ? '#2dd4bf' : '#666',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    boxShadow: ghost.discovered ? '0 0 20px rgba(45, 212, 191, 0.5)' : 'none',
                    flexShrink: 0,
                    filter: ghost.discovered ? 'none' : 'grayscale(1)',
                  }}>
                    👻
                  </div>

                  {/* Handwritten info */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#2a1f1a',
                      marginBottom: '4px',
                    }}>
                      {ghost.discovered ? ghost.name : '???'}
                    </div>
                    <div style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '12px',
                      color: '#666',
                    }}>
                      {ghost.discovered ? `Threat: ${ghost.threat}` : 'Locked'}
                    </div>
                  </div>

                  {/* Digital badge */}
                  {ghost.discovered && (
                    <div style={{
                      padding: '4px 10px',
                      background: '#0a0f14',
                      border: '1px solid #2dd4bf',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: '#2dd4bf',
                      fontWeight: 'bold',
                      textShadow: '0 0 5px rgba(45, 212, 191, 0.5)',
                      fontFamily: 'Arial, sans-serif',
                    }}>
                      {ghost.threat}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Red string if discovered */}
            {ghost.discovered && i < ghosts.length - 1 && (
              <svg style={{
                position: 'absolute',
                bottom: '-25px',
                left: '50%',
                width: '2px',
                height: '25px',
                zIndex: -1,
              }}>
                <line x1="1" y1="0" x2="1" y2="25" stroke="#ff0000" strokeWidth="1" strokeDasharray="3,3" opacity="0.3" />
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Hybrid Map
function HybridMap() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0a0a',
      position: 'relative',
    }}>
      <AnalogEffects />

      {/* Dark map grid */}
      <div style={{
        width: '100%',
        height: '100%',
        background: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(45, 212, 191, 0.05) 50px, rgba(45, 212, 191, 0.05) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(45, 212, 191, 0.05) 50px, rgba(45, 212, 191, 0.05) 51px)
        `,
        position: 'relative',
      }}>
        {/* Player marker - digital glow */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          background: '#2dd4bf',
          borderRadius: '50%',
          border: '2px solid #fff',
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
          animation: 'pulse 2s infinite',
        }}>
          📍
        </div>

        {/* Hotspots - digital with distortion */}
        {[
          { top: '30%', left: '40%' },
          { top: '60%', left: '70%' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Digital marker with flicker */}
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(239, 68, 68, 0.3)',
              border: '2px solid #ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.5)',
              position: 'relative',
            }}>
              👻
              {/* Distortion effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 0, 0, 0.2)',
                borderRadius: '50%',
              }} />
            </div>

            {/* Paper label taped on */}
            <div style={{
              position: 'absolute',
              top: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#e8dcc0',
              padding: '4px 8px',
              border: '1px solid #2dd4bf',
              borderRadius: '4px',
              fontFamily: 'Courier New, monospace',
              fontSize: '9px',
              color: '#2a1f1a',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
            }}>
              {/* Tape */}
              <div style={{
                position: 'absolute',
                top: '-6px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '30px',
                height: '12px',
                background: 'rgba(210, 180, 140, 0.7)',
                boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
              }} />
              Hotspot {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom HUD - hybrid */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(15, 26, 31, 0.98)',
        border: '2px solid #2dd4bf',
        borderBottom: 'none',
        borderRadius: '12px 12px 0 0',
        padding: '4px',
        boxShadow: '0 0 30px rgba(45, 212, 191, 0.3)',
      }}>
        <div style={{
          background: '#e8dcc0',
          borderRadius: '8px 8px 0 0',
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
          {[
            { icon: '👤', label: 'Profile' },
            { icon: '🎒', label: 'Kit' },
            { icon: '📖', label: 'Codex' },
          ].map((btn) => (
            <div
              key={btn.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'Courier New, monospace',
              }}
            >
              <div style={{ fontSize: '28px' }}>{btn.icon}</div>
              <div style={{ fontSize: '10px', color: '#2a1f1a' }}>{btn.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky note overlay */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '140px',
        height: '140px',
        background: '#ffeb3b',
        padding: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
        transform: 'rotate(5deg)',
        fontFamily: 'Courier New, monospace',
        fontSize: '11px',
        color: '#1a1a1a',
        zIndex: 10,
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          MISSION:
        </div>
        <div style={{ lineHeight: '1.6' }}>
          ☐ Check hotspot A
          <br />
          ☐ Collect evidence
          <br />
          ☐ Return safely
        </div>
      </div>

      {/* Profile badge - digital frame */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '8px',
        padding: '4px',
        boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)',
      }}>
        <div style={{
          background: '#e8dcc0',
          borderRadius: '4px',
          padding: '8px',
          width: '60px',
          textAlign: 'center',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{ fontSize: '32px' }}>👤</div>
          <div style={{ fontSize: '8px', color: '#2a1f1a', marginTop: '4px' }}>
            Lv.5
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.1); }
          }
        `}
      </style>
    </div>
  );
}

// Hybrid Investigation
function HybridInvestigation() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0a0a',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <AnalogEffects />

      {/* Faint corkboard background */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(139, 115, 85, 0.02) 3px, rgba(139, 115, 85, 0.02) 6px)
        `,
        opacity: 0.2,
        zIndex: 0,
      }} />

      {/* Digital radar with distortion */}
      <div style={{
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, #1a1f2e 0%, #0a0f14 100%)',
        border: '2px solid #2dd4bf',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: '0 0 40px rgba(45, 212, 191, 0.4)',
        zIndex: 1,
      }}>
        {/* Rings */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${i * 22}%`,
              height: `${i * 22}%`,
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: '50%',
            }}
          />
        ))}

        {/* Sweep with distortion */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '175px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.8))',
          transformOrigin: 'left center',
          transform: 'translate(0, -50%) rotate(30deg)',
          boxShadow: '0 0 10px rgba(45, 212, 191, 0.5)',
        }} />

        {/* Center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '8px',
          height: '8px',
          background: '#2dd4bf',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(45, 212, 191, 0.8)',
        }} />

        {/* Ghost blip - flickering */}
        <div style={{
          position: 'absolute',
          top: '35%',
          right: '30%',
          width: '12px',
          height: '12px',
          background: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)',
          animation: 'flicker 1.5s infinite',
        }} />

        {/* VHS distortion on radar */}
        <div style={{
          position: 'absolute',
          top: '40%',
          left: 0,
          right: 0,
          height: '20px',
          background: 'rgba(255, 0, 0, 0.1)',
        }} />
      </div>

      {/* Paper note with digital border */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '8px',
        padding: '4px',
        boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)',
        zIndex: 10,
      }}>
        <div style={{
          background: '#e8dcc0',
          padding: '16px',
          borderRadius: '4px',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
            Heading:
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2a1f1a' }}>
            045°
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
            NE Direction
          </div>
        </div>
      </div>

      {/* Polaroid with tape */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        width: '120px',
        zIndex: 10,
      }}>
        {/* Tape */}
        <div style={{
          position: 'absolute',
          top: '-8px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-5deg)',
          width: '50px',
          height: '16px',
          background: 'rgba(210, 180, 140, 0.7)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          zIndex: 2,
        }} />
        
        <div style={{
          background: '#fff',
          padding: '10px 10px 30px 10px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
          transform: 'rotate(-8deg)',
        }}>
          <div style={{
            width: '100%',
            height: '100px',
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '40px',
            position: 'relative',
          }}>
            <div style={{ filter: 'blur(2px)', opacity: 0.6 }}>👻</div>
            {/* Static */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
              `,
            }} />
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '9px',
            color: '#666',
            marginTop: '6px',
            textAlign: 'center',
          }}>
            Evidence #1
          </div>
        </div>
      </div>

      {/* Digital tool bar with paper background */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '12px',
        padding: '4px',
        boxShadow: '0 0 30px rgba(45, 212, 191, 0.3)',
        zIndex: 10,
      }}>
        <div style={{
          background: '#e8dcc0',
          borderRadius: '8px',
          padding: '12px',
          display: 'flex',
          gap: '8px',
        }}>
          {['📡', '📊', '🌡️', '🎤', '📷'].map((icon, i) => (
            <div
              key={i}
              style={{
                width: '50px',
                height: '50px',
                background: i === 0 ? '#2dd4bf' : '#fff',
                border: `2px solid ${i === 0 ? '#2dd4bf' : '#ddd'}`,
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                boxShadow: i === 0 ? '0 0 15px rgba(45, 212, 191, 0.5)' : 'none',
                position: 'relative',
              }}
            >
              {icon}
              {/* Glitch on active tool */}
              {i === 0 && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'rgba(255, 0, 0, 0.1)',
                  borderRadius: '8px',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Red string overlay */}
      <svg style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 5,
        opacity: 0.2,
      }}>
        <line x1="20%" y1="20%" x2="80%" y2="80%" stroke="#ff0000" strokeWidth="1" strokeDasharray="5,5" />
        <line x1="80%" y1="20%" x2="20%" y2="80%" stroke="#ff0000" strokeWidth="1" strokeDasharray="5,5" />
      </svg>

      <style>
        {`
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            25% { opacity: 0.3; }
            50% { opacity: 0.8; }
            75% { opacity: 0.5; }
          }
        `}
      </style>
    </div>
  );
}
