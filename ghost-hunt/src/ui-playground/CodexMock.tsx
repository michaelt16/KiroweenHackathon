// Codex Mock - 3 Visual Styles
// Pure visual mockup - no functionality

interface CodexMockProps {
  style: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

export function CodexMock({ style }: CodexMockProps) {
  if (style === 'A') return <CodexStyleA />;
  if (style === 'B') return <CodexStyleB />;
  if (style === 'C') return <CodexStyleC />;
  if (style === 'D') return <CodexStyleD />;
  if (style === 'E') return <CodexStyleE />;
  if (style === 'F') return <CodexStyleF />;
  return <CodexStyleG />;
}

const MOCK_GHOSTS = [
  { name: 'Wraith', threat: 'HIGH', discovered: true },
  { name: 'Shade', threat: 'MEDIUM', discovered: true },
  { name: 'Poltergeist', threat: 'HIGH', discovered: true },
  { name: 'Unknown', threat: '???', discovered: false },
];

// Style A: Clean Digital Classified Database
function CodexStyleA() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f14 0%, #1a1f2e 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          borderBottom: '2px solid #2dd4bf',
          paddingBottom: '20px',
        }}>
          <div style={{
            fontSize: '12px',
            color: '#2dd4bf',
            letterSpacing: '3px',
            marginBottom: '8px',
          }}>
            CLASSIFIED DATABASE
          </div>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#fff',
          }}>
            👻 ENTITY CODEX
          </div>
        </div>

        {/* Ghost List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {MOCK_GHOSTS.map((ghost, i) => (
            <div
              key={i}
              style={{
                background: 'rgba(15, 26, 31, 0.8)',
                border: `2px solid ${ghost.discovered ? '#2dd4bf' : '#334155'}`,
                borderRadius: '8px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                opacity: ghost.discovered ? 1 : 0.5,
                boxShadow: ghost.discovered ? '0 0 20px rgba(45, 212, 191, 0.1)' : 'none',
              }}
            >
              {/* Icon */}
              <div style={{
                width: '60px',
                height: '60px',
                background: ghost.discovered ? 'linear-gradient(135deg, #2dd4bf 0%, #1a8f7a 100%)' : '#1e293b',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                filter: ghost.discovered ? 'none' : 'grayscale(1)',
              }}>
                👻
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: ghost.discovered ? '#fff' : '#475569',
                  marginBottom: '4px',
                }}>
                  {ghost.discovered ? ghost.name : '???'}
                </div>
                <div style={{
                  fontSize: '12px',
                  color: '#64748b',
                }}>
                  {ghost.discovered ? `Threat Level: ${ghost.threat}` : 'LOCKED - Complete investigation to unlock'}
                </div>
              </div>

              {/* Threat Badge */}
              {ghost.discovered && (
                <div style={{
                  padding: '6px 12px',
                  background: ghost.threat === 'HIGH' ? '#ef4444' : '#fbbf24',
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  color: '#fff',
                }}>
                  {ghost.threat}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style B: Analog Journal with Tabs
function CodexStyleB() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#2a2520',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Journal */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#f5f1e8',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        position: 'relative',
        minHeight: '600px',
      }}>
        {/* Binding */}
        <div style={{
          position: 'absolute',
          left: '0',
          top: '0',
          bottom: '0',
          width: '40px',
          background: 'linear-gradient(90deg, #1a1a1a 0%, #2a2520 100%)',
          borderRadius: '8px 0 0 8px',
        }}>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                height: '2px',
                background: '#666',
                marginTop: i === 0 ? '40px' : '60px',
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ paddingLeft: '60px', padding: '40px 40px 40px 80px' }}>
          {/* Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '30px',
            borderBottom: '2px solid #1a1a1a',
            paddingBottom: '20px',
          }}>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '32px',
              fontWeight: 'bold',
              color: '#1a1a1a',
            }}>
              Ghost Huntin'
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '16px',
              color: '#666',
              marginTop: '8px',
            }}>
              A Survivor's Guide
            </div>
          </div>

          {/* Ghost Entries */}
          {MOCK_GHOSTS.map((ghost, i) => (
            <div
              key={i}
              style={{
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: '1px dashed #ccc',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginBottom: '12px',
              }}>
                {/* Polaroid-style photo */}
                <div style={{
                  width: '80px',
                  height: '90px',
                  background: '#fff',
                  padding: '8px 8px 20px 8px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                  transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
                }}>
                  <div style={{
                    width: '100%',
                    height: '64px',
                    background: ghost.discovered ? '#ddd' : '#999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    filter: ghost.discovered ? 'none' : 'blur(4px)',
                  }}>
                    👻
                  </div>
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    marginBottom: '4px',
                  }}>
                    {ghost.discovered ? ghost.name : '???'}
                  </div>
                  <div style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '12px',
                    color: '#666',
                  }}>
                    {ghost.discovered ? `Threat: ${ghost.threat}` : 'Not yet discovered'}
                  </div>
                  {ghost.discovered && (
                    <div style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '11px',
                      color: '#999',
                      marginTop: '8px',
                      fontStyle: 'italic',
                    }}>
                      "Fast movement, strong EMF..."
                    </div>
                  )}
                </div>
              </div>

              {/* Red underline for discovered */}
              {ghost.discovered && (
                <div style={{
                  height: '2px',
                  background: '#ef4444',
                  width: '60%',
                  marginTop: '8px',
                }}/>
              )}
            </div>
          ))}
        </div>

        {/* Tabs on right edge */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          top: '100px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
        }}>
          {['Spirit', 'Wraith', 'Shade', 'Demon'].map((tab, i) => (
            <div
              key={tab}
              style={{
                background: i === 1 ? '#fbbf24' : '#d4cfc4',
                padding: '8px 12px',
                borderRadius: '0 4px 4px 0',
                fontSize: '10px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                boxShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style C: Hybrid Tech + Analog
function CodexStyleC() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f14',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Digital Frame */}
        <div style={{
          background: 'rgba(15, 26, 31, 0.8)',
          border: '2px solid #2dd4bf',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: '0 0 20px rgba(45, 212, 191, 0.2)',
        }}>
          {/* Paper Inside */}
          <div style={{
            background: '#f5f1e8',
            borderRadius: '8px',
            padding: '32px',
          }}>
            {/* Digital Header */}
            <div style={{
              background: '#0a0f14',
              margin: '-32px -32px 24px -32px',
              padding: '20px 32px',
              borderRadius: '8px 8px 0 0',
              borderBottom: '2px solid #2dd4bf',
            }}>
              <div style={{
                fontSize: '12px',
                color: '#2dd4bf',
                letterSpacing: '2px',
              }}>
                ENTITY DATABASE
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                marginTop: '4px',
              }}>
                Ghost Codex
              </div>
            </div>

            {/* Ghost Entries */}
            {MOCK_GHOSTS.map((ghost, i) => (
              <div
                key={i}
                style={{
                  marginBottom: '20px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #d4cfc4',
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                }}>
                  {/* Digital Icon */}
                  <div style={{
                    width: '50px',
                    height: '50px',
                    background: ghost.discovered ? '#2dd4bf' : '#999',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '28px',
                    boxShadow: ghost.discovered ? '0 0 15px rgba(45, 212, 191, 0.3)' : 'none',
                  }}>
                    👻
                  </div>

                  {/* Handwritten Info */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      color: '#1a1a1a',
                    }}>
                      {ghost.discovered ? ghost.name : '???'}
                    </div>
                    <div style={{
                      fontFamily: 'Courier New, monospace',
                      fontSize: '12px',
                      color: '#666',
                      marginTop: '4px',
                    }}>
                      {ghost.discovered ? `Threat: ${ghost.threat}` : 'Locked'}
                    </div>
                  </div>

                  {/* Digital Badge */}
                  {ghost.discovered && (
                    <div style={{
                      padding: '4px 10px',
                      background: '#0a0f14',
                      border: '1px solid #2dd4bf',
                      borderRadius: '4px',
                      fontSize: '10px',
                      color: '#2dd4bf',
                      fontWeight: 'bold',
                    }}>
                      {ghost.threat}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Style D: Paranormal Detective Bureau
function CodexStyleD() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2a2520 0%, #1a1510 100%)',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* File Folder Header */}
        <div style={{
          background: '#d4c5a0',
          border: '2px solid #8b7355',
          borderRadius: '8px 8px 0 0',
          padding: '20px',
          position: 'relative',
        }}>
          {/* Tab */}
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '20px',
            background: '#d4c5a0',
            border: '2px solid #8b7355',
            borderBottom: 'none',
            borderRadius: '8px 8px 0 0',
            padding: '8px 20px',
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#1a1a1a',
          }}>
            ENTITY FILES
          </div>
          
          <div style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '10px',
            color: '#666',
            letterSpacing: '1px',
            marginBottom: '8px',
          }}>
            PARANORMAL INVESTIGATION BUREAU
          </div>
          <div style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#1a1a1a',
          }}>
            CLASSIFIED ENTITY DATABASE
          </div>
        </div>

        {/* File Contents */}
        <div style={{
          background: '#f5f1e8',
          border: '2px solid #8b7355',
          borderTop: 'none',
          borderRadius: '0 0 8px 8px',
          padding: '30px',
        }}>
          {MOCK_GHOSTS.map((ghost, i) => (
            <div
              key={i}
              style={{
                marginBottom: '24px',
                paddingBottom: '20px',
                borderBottom: i < MOCK_GHOSTS.length - 1 ? '1px solid #d4cfc4' : 'none',
              }}
            >
              {/* Case File Header */}
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px',
                marginBottom: '12px',
              }}>
                {/* Photo */}
                <div style={{
                  width: '80px',
                  height: '100px',
                  background: ghost.discovered ? '#ddd' : '#999',
                  border: '1px solid #999',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  filter: ghost.discovered ? 'none' : 'blur(4px)',
                  flexShrink: 0,
                }}>
                  👻
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    marginBottom: '8px',
                  }}>
                    {ghost.discovered ? ghost.name.toUpperCase() : 'REDACTED'}
                  </div>
                  <div style={{
                    fontFamily: 'Arial, sans-serif',
                    fontSize: '12px',
                    color: '#666',
                    lineHeight: '1.6',
                  }}>
                    <div><strong>Classification:</strong> {ghost.discovered ? ghost.threat : 'UNKNOWN'}</div>
                    <div><strong>Status:</strong> {ghost.discovered ? 'DOCUMENTED' : 'UNDER INVESTIGATION'}</div>
                  </div>
                </div>

                {/* Stamp */}
                {ghost.discovered && (
                  <div style={{
                    width: '60px',
                    height: '60px',
                    border: '3px solid rgba(180, 50, 50, 0.6)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: 'rotate(15deg)',
                    flexShrink: 0,
                  }}>
                    <div style={{
                      fontSize: '9px',
                      fontWeight: 'bold',
                      color: 'rgba(180, 50, 50, 0.6)',
                      textAlign: 'center',
                      lineHeight: '1.2',
                      fontFamily: 'Arial, sans-serif',
                    }}>
                      VERIFIED
                    </div>
                  </div>
                )}
              </div>

              {/* Typewriter Notes */}
              {ghost.discovered && (
                <div style={{
                  background: 'rgba(251, 191, 36, 0.2)',
                  borderLeft: '3px solid rgba(180, 50, 50, 0.6)',
                  padding: '12px',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '11px',
                  color: '#1a1a1a',
                  fontStyle: 'italic',
                }}>
                  "Exhibits aggressive behavior. Approach with extreme caution."
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style E: Explorer's Field Diary
function CodexStyleE() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#3d3428',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Leather Journal */}
        <div style={{
          background: '#f5ead8',
          borderRadius: '8px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          padding: '40px 32px',
          position: 'relative',
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(139, 92, 62, 0.1) 24px, rgba(139, 92, 62, 0.1) 25px)
          `,
        }}>
          {/* Title Page */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px',
            paddingBottom: '24px',
            borderBottom: '2px dashed #8b5c3e',
          }}>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#2a1f1a',
              textDecoration: 'underline',
              textDecorationColor: 'rgba(180, 50, 50, 0.6)',
              marginBottom: '8px',
            }}>
              Field Guide
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              color: '#8b5c3e',
              fontStyle: 'italic',
            }}>
              Paranormal Entities Encountered
            </div>
          </div>

          {/* Entries */}
          {MOCK_GHOSTS.map((ghost, i) => (
            <div
              key={i}
              style={{
                marginBottom: '32px',
                position: 'relative',
              }}
            >
              {/* Sketch/Photo */}
              <div style={{
                width: '120px',
                margin: '0 auto 16px',
                position: 'relative',
              }}>
                {/* Tape */}
                <div style={{
                  position: 'absolute',
                  top: '-8px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-3deg)',
                  width: '50px',
                  height: '16px',
                  background: 'rgba(255, 255, 255, 0.6)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  zIndex: 2,
                }} />
                
                {/* Polaroid */}
                <div style={{
                  background: '#fff',
                  padding: '10px 10px 30px 10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                }}>
                  <div style={{
                    width: '100%',
                    height: '100px',
                    background: ghost.discovered ? '#ddd' : '#999',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '40px',
                    filter: ghost.discovered ? 'none' : 'blur(4px)',
                  }}>
                    👻
                  </div>
                  <div style={{
                    fontFamily: 'Courier New, monospace',
                    fontSize: '9px',
                    color: '#666',
                    marginTop: '6px',
                    textAlign: 'center',
                  }}>
                    {ghost.discovered ? ghost.name : '???'}
                  </div>
                </div>
              </div>

              {/* Handwritten Entry */}
              <div style={{
                fontFamily: 'Courier New, monospace',
                fontSize: '14px',
                color: '#2a1f1a',
                lineHeight: '2',
              }}>
                <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
                  Entry #{i + 1}: {ghost.discovered ? ghost.name : 'Unknown Entity'}
                </div>
                <div style={{ fontSize: '12px', color: '#666' }}>
                  Threat Level: {ghost.discovered ? ghost.threat : 'ASSESSING'}
                </div>
                {ghost.discovered && (
                  <div style={{
                    marginTop: '12px',
                    fontSize: '12px',
                    fontStyle: 'italic',
                    color: '#8b5c3e',
                  }}>
                    "Encountered at dusk. Fast movement. Strong electromagnetic signature."
                  </div>
                )}
              </div>

              {/* Red pen underline */}
              {ghost.discovered && (
                <div style={{
                  marginTop: '12px',
                  height: '2px',
                  background: 'rgba(180, 50, 50, 0.6)',
                  width: '60%',
                  transform: 'rotate(-0.5deg)',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style F: Modern Agent with Analog Notes
function CodexStyleF() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f14',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', position: 'relative' }}>
        {/* Digital Panel */}
        <div style={{
          background: 'rgba(15, 26, 31, 0.9)',
          border: '2px solid #2dd4bf',
          borderRadius: '12px',
          padding: '24px',
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.2)',
        }}>
          {/* Header */}
          <div style={{
            textAlign: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #2dd4bf',
          }}>
            <div style={{
              fontSize: '12px',
              color: '#2dd4bf',
              letterSpacing: '2px',
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

          {/* Ghost Cards */}
          {MOCK_GHOSTS.map((ghost, i) => (
            <div
              key={i}
              style={{
                marginBottom: '20px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '16px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                {/* Digital Icon */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: ghost.discovered ? 'linear-gradient(135deg, #2dd4bf 0%, #1a8f7a 100%)' : '#1e293b',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  flexShrink: 0,
                  boxShadow: ghost.discovered ? '0 0 20px rgba(45, 212, 191, 0.3)' : 'none',
                }}>
                  👻
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: ghost.discovered ? '#cbd5e1' : '#475569',
                    marginBottom: '4px',
                    fontFamily: 'Arial, sans-serif',
                  }}>
                    {ghost.discovered ? ghost.name : 'CLASSIFIED'}
                  </div>
                  <div style={{
                    fontSize: '12px',
                    color: '#64748b',
                    fontFamily: 'Arial, sans-serif',
                  }}>
                    {ghost.discovered ? `Threat: ${ghost.threat}` : 'Requires investigation'}
                  </div>
                </div>
              </div>

              {/* Sticky Note Overlay */}
              {ghost.discovered && i === 0 && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  width: '100px',
                  height: '100px',
                  background: '#fbbf24',
                  padding: '10px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                  transform: 'rotate(8deg)',
                  fontFamily: 'Courier New, monospace',
                  fontSize: '10px',
                  color: '#1a1a1a',
                  zIndex: 10,
                }}>
                  <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>
                    NOTE:
                  </div>
                  <div>
                    Very dangerous!
                    <br />
                    Use caution
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Polaroid Decoration */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          right: '-40px',
          width: '100px',
          background: '#fff',
          padding: '8px 8px 24px 8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          transform: 'rotate(12deg)',
        }}>
          {/* Tape */}
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '40px',
            height: '12px',
            background: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
          }} />
          <div style={{
            width: '100%',
            height: '80px',
            background: '#ddd',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
          }}>
            📚
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '8px',
            color: '#666',
            marginTop: '4px',
            textAlign: 'center',
          }}>
            Research
          </div>
        </div>
      </div>
    </div>
  );
}

// Style G: Premium Horror Notebook
function CodexStyleG() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#faf8f5',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Clean Notebook */}
        <div style={{
          background: '#fffef9',
          borderRadius: '8px',
          padding: '40px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e8e4dc',
        }}>
          {/* Title */}
          <div style={{
            textAlign: 'center',
            marginBottom: '40px',
            paddingBottom: '24px',
            borderBottom: '2px solid #1a1a1a',
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '300',
              color: '#1a1a1a',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '1px',
            }}>
              ENTITY COMPENDIUM
            </div>
          </div>

          {/* Entries */}
          {MOCK_GHOSTS.map((ghost, i) => (
            <div
              key={i}
              style={{
                marginBottom: '32px',
                paddingBottom: '24px',
                borderBottom: i < MOCK_GHOSTS.length - 1 ? '1px solid #e8e4dc' : 'none',
              }}
            >
              {/* Photo */}
              <div style={{
                width: '140px',
                margin: '0 auto 20px',
                background: '#fff',
                padding: '12px 12px 40px 12px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}>
                <div style={{
                  width: '100%',
                  height: '120px',
                  background: ghost.discovered ? '#f0f0f0' : '#ddd',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  filter: ghost.discovered ? 'none' : 'blur(4px)',
                }}>
                  👻
                </div>
                <div style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '10px',
                  color: '#666',
                  marginTop: '8px',
                  textAlign: 'center',
                }}>
                  {ghost.discovered ? ghost.name : 'Unknown'}
                </div>
              </div>

              {/* Info */}
              <div style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '14px',
                color: '#1a1a1a',
                lineHeight: '2',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>Name</span>
                  <span style={{ fontWeight: '600' }}>{ghost.discovered ? ghost.name : 'Classified'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>Threat</span>
                  <span style={{ fontWeight: '600' }}>{ghost.discovered ? ghost.threat : '—'}</span>
                </div>
                {ghost.discovered && (
                  <div style={{
                    marginTop: '16px',
                    padding: '12px',
                    background: '#e8c547',
                    fontSize: '12px',
                    lineHeight: '1.6',
                    fontFamily: 'Courier New, monospace',
                  }}>
                    Exhibits aggressive behavior patterns. Documented electromagnetic anomalies.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
