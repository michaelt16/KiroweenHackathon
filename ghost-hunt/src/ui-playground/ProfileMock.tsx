// Profile Mock - 3 Visual Styles
// Pure visual mockup - no functionality

interface ProfileMockProps {
  style: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

export function ProfileMock({ style }: ProfileMockProps) {
  if (style === 'A') return <ProfileStyleA />;
  if (style === 'B') return <ProfileStyleB />;
  if (style === 'C') return <ProfileStyleC />;
  if (style === 'D') return <ProfileStyleD />;
  if (style === 'E') return <ProfileStyleE />;
  if (style === 'F') return <ProfileStyleF />;
  return <ProfileStyleG />;
}

// Style A: Clean Digital Classified OS
function ProfileStyleA() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0f14 0%, #1a1f2e 100%)',
      padding: '40px 20px',
      color: '#cbd5e1',
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
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
            CLASSIFIED - LEVEL 3 CLEARANCE
          </div>
          <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff' }}>
            AGENT PROFILE
          </div>
        </div>

        {/* Avatar */}
        <div style={{
          width: '120px',
          height: '120px',
          margin: '0 auto 30px',
          background: 'linear-gradient(135deg, #2dd4bf 0%, #1a8f7a 100%)',
          borderRadius: '50%',
          border: '3px solid #2dd4bf',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.3)',
        }}>
          👤
        </div>

        {/* Info Cards */}
        <div style={{
          background: 'rgba(15, 26, 31, 0.8)',
          border: '1px solid #2dd4bf',
          borderRadius: '8px',
          padding: '24px',
          marginBottom: '20px',
          boxShadow: '0 0 20px rgba(45, 212, 191, 0.1)',
        }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>
            AGENT_001
          </div>
          <div style={{ color: '#64748b', fontSize: '14px' }}>
            Paranormal Investigator • Level 5
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px',
        }}>
          {[
            { label: 'INVESTIGATIONS', value: '12' },
            { label: 'GHOSTS CAUGHT', value: '8' },
            { label: 'SUCCESS RATE', value: '67%' },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: 'rgba(15, 26, 31, 0.6)',
                border: '1px solid #334155',
                borderRadius: '8px',
                padding: '16px',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2dd4bf' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style B: Analog Journal (Cork Board + ID Card)
function ProfileStyleB() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8b7355 0%, #6b5d4f 100%)',
      backgroundImage: `
        repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
        repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)
      `,
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '400px', margin: '0 auto' }}>
        {/* ID Card */}
        <div style={{
          background: '#f5f1e8',
          borderRadius: '8px',
          padding: '24px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          transform: 'rotate(-1deg)',
          position: 'relative',
        }}>
          {/* Tape Corner */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '20px',
            width: '60px',
            height: '20px',
            background: 'rgba(255, 255, 255, 0.6)',
            transform: 'rotate(5deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }} />

          {/* Header */}
          <div style={{
            textAlign: 'center',
            borderBottom: '2px solid #1a1a1a',
            paddingBottom: '12px',
            marginBottom: '20px',
          }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '2px',
              color: '#666',
            }}>
              PARANORMAL INVESTIGATION BUREAU
            </div>
            <div style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              marginTop: '4px',
            }}>
              INVESTIGATOR ID
            </div>
          </div>

          {/* Photo */}
          <div style={{
            width: '100px',
            height: '120px',
            background: '#ddd',
            margin: '0 auto 16px',
            border: '2px solid #1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
          }}>
            👤
          </div>

          {/* Info */}
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            color: '#1a1a1a',
            lineHeight: '1.8',
          }}>
            <div><strong>NAME:</strong> AGENT_001</div>
            <div><strong>RANK:</strong> INVESTIGATOR</div>
            <div><strong>LEVEL:</strong> 5</div>
            <div><strong>CLEARANCE:</strong> ALPHA-3</div>
          </div>

          {/* Stamp */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '80px',
            height: '80px',
            border: '3px solid #ef4444',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: 'rotate(15deg)',
            opacity: 0.7,
          }}>
            <div style={{
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#ef4444',
              textAlign: 'center',
              lineHeight: '1.2',
            }}>
              ACTIVE<br/>2024
            </div>
          </div>
        </div>

        {/* Stats on Sticky Notes */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginTop: '30px',
          justifyContent: 'center',
        }}>
          {[
            { label: 'Cases', value: '12' },
            { label: 'Caught', value: '8' },
            { label: 'Rate', value: '67%' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                background: '#fbbf24',
                width: '90px',
                height: '90px',
                padding: '12px',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                fontFamily: 'Courier New, monospace',
              }}
            >
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style C: Hybrid Tech + Analog
function ProfileStyleC() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f14',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        {/* Digital Frame with Paper Inside */}
        <div style={{
          background: 'rgba(15, 26, 31, 0.8)',
          border: '2px solid #2dd4bf',
          borderRadius: '12px',
          padding: '4px',
          boxShadow: '0 0 20px rgba(45, 212, 191, 0.2)',
        }}>
          {/* Paper Card Inside */}
          <div style={{
            background: '#f5f1e8',
            borderRadius: '8px',
            padding: '24px',
            position: 'relative',
          }}>
            {/* Digital Header */}
            <div style={{
              background: '#0a0f14',
              margin: '-24px -24px 20px -24px',
              padding: '16px 24px',
              borderRadius: '8px 8px 0 0',
              borderBottom: '2px solid #2dd4bf',
            }}>
              <div style={{
                fontSize: '10px',
                color: '#2dd4bf',
                letterSpacing: '2px',
              }}>
                AGENT PROFILE
              </div>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#fff',
                marginTop: '4px',
              }}>
                AGENT_001
              </div>
            </div>

            {/* Photo with Digital Border */}
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
              boxShadow: '0 0 20px rgba(45, 212, 191, 0.3)',
            }}>
              👤
            </div>

            {/* Handwritten Info */}
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '14px',
              color: '#1a1a1a',
              lineHeight: '2',
              marginBottom: '20px',
            }}>
              <div>Level: <strong>5</strong></div>
              <div>Rank: <strong>Investigator</strong></div>
              <div>Status: <strong>Active</strong></div>
            </div>

            {/* Digital Stats Bar */}
            <div style={{
              background: '#0a0f14',
              margin: '0 -24px -24px -24px',
              padding: '16px 24px',
              borderRadius: '0 0 8px 8px',
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
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: '#64748b',
                    marginTop: '2px',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


// Style D: Paranormal Detective Bureau
function ProfileStyleD() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #2a2520 0%, #1a1510 100%)',
      backgroundImage: `
        radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)
      `,
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '400px', margin: '0 auto', position: 'relative' }}>
        {/* Lanyard/Badge Holder */}
        <div style={{
          width: '60px',
          height: '40px',
          background: 'linear-gradient(180deg, #666 0%, #444 100%)',
          margin: '0 auto',
          borderRadius: '8px 8px 0 0',
          position: 'relative',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}>
          {/* Clip hole */}
          <div style={{
            width: '20px',
            height: '8px',
            background: '#222',
            margin: '0 auto',
            position: 'relative',
            top: '8px',
            borderRadius: '4px',
          }} />
        </div>

        {/* Physical ID Card */}
        <div style={{
          background: '#fff',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          position: 'relative',
          overflow: 'hidden',
          border: '2px solid #ddd',
        }}>
          {/* Header Bar - Dark */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            padding: '16px',
            textAlign: 'center',
            borderBottom: '3px solid #d4af37',
          }}>
            <div style={{
              fontSize: '10px',
              letterSpacing: '3px',
              color: '#d4af37',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              marginBottom: '4px',
            }}>
              PARANORMAL INVESTIGATION BUREAU
            </div>
            <div style={{
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '1px',
            }}>
              AGENT CREDENTIALS
            </div>
          </div>

          {/* Main Card Body */}
          <div style={{
            padding: '24px',
            background: '#f8f8f8',
          }}>
            {/* Photo Section */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
            }}>
              {/* Photo */}
              <div style={{
                width: '120px',
                height: '140px',
                background: '#ddd',
                border: '2px solid #999',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '56px',
                flexShrink: 0,
              }}>
                👤
              </div>

              {/* Info beside photo */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '11px',
                  color: '#666',
                  marginBottom: '8px',
                  letterSpacing: '1px',
                }}>
                  AGENT ID
                </div>
                <div style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  marginBottom: '12px',
                }}>
                  001
                </div>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '3px solid rgba(180, 50, 50, 0.6)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: 'rotate(-15deg)',
                }}>
                  <div style={{
                    fontSize: '9px',
                    fontWeight: 'bold',
                    color: 'rgba(180, 50, 50, 0.6)',
                    textAlign: 'center',
                    lineHeight: '1.2',
                    fontFamily: 'Arial, sans-serif',
                  }}>
                    ACTIVE<br/>2024
                  </div>
                </div>
              </div>
            </div>

            {/* Info Fields */}
            <div style={{
              background: '#fff',
              padding: '16px',
              borderRadius: '4px',
              marginBottom: '16px',
              border: '1px solid #ddd',
            }}>
              <div style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: '12px',
                color: '#1a1a1a',
                lineHeight: '2',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#666', fontWeight: '600' }}>NAME:</span>
                  <span style={{ fontWeight: 'bold' }}>AGENT_001</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#666', fontWeight: '600' }}>RANK:</span>
                  <span style={{ fontWeight: 'bold' }}>INVESTIGATOR</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #eee', paddingBottom: '8px', marginBottom: '8px' }}>
                  <span style={{ color: '#666', fontWeight: '600' }}>LEVEL:</span>
                  <span style={{ fontWeight: 'bold' }}>5</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#666', fontWeight: '600' }}>CLEARANCE:</span>
                  <span style={{ fontWeight: 'bold', color: '#d4af37' }}>ALPHA-3</span>
                </div>
              </div>
            </div>

            {/* Stats Bar */}
            <div style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '16px',
            }}>
              {[
                { label: 'CASES', value: '12' },
                { label: 'CAUGHT', value: '8' },
                { label: 'RATE', value: '67%' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    background: '#1a1a1a',
                    padding: '12px 8px',
                    borderRadius: '4px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#d4af37',
                    fontFamily: 'Arial, sans-serif',
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    fontSize: '9px',
                    color: '#999',
                    marginTop: '4px',
                    fontFamily: 'Arial, sans-serif',
                    letterSpacing: '1px',
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Barcode */}
            <div style={{
              background: '#fff',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ddd',
            }}>
              <div style={{
                display: 'flex',
                gap: '2px',
                height: '40px',
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}>
                {[8, 12, 6, 10, 8, 14, 6, 12, 8, 10, 6, 14, 8, 12, 6, 10, 8, 14, 6, 12].map((height, i) => (
                  <div
                    key={i}
                    style={{
                      width: '3px',
                      height: `${height * 2}px`,
                      background: '#1a1a1a',
                    }}
                  />
                ))}
              </div>
              <div style={{
                textAlign: 'center',
                fontFamily: 'Courier New, monospace',
                fontSize: '10px',
                color: '#666',
                marginTop: '8px',
                letterSpacing: '2px',
              }}>
                PIB-001-2024-ALPHA3
              </div>
            </div>
          </div>

          {/* Footer Bar */}
          <div style={{
            background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
            padding: '8px 16px',
            textAlign: 'center',
            borderTop: '3px solid #d4af37',
          }}>
            <div style={{
              fontSize: '9px',
              color: '#999',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '1px',
            }}>
              AUTHORIZED PERSONNEL ONLY
            </div>
          </div>
        </div>

        {/* Holographic shine effect */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'linear-gradient(135deg, transparent 0%, rgba(212, 175, 55, 0.1) 50%, transparent 100%)',
          pointerEvents: 'none',
          borderRadius: '12px',
        }} />
      </div>
    </div>
  );
}

// Style E: Explorer's Field Diary
function ProfileStyleE() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#3d3428',
      padding: '40px 20px',
    }}>
      {/* Journal Page */}
      <div style={{
        maxWidth: '500px',
        margin: '0 auto',
        background: '#f5ead8',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        padding: '40px 32px',
        position: 'relative',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(139, 92, 62, 0.1) 24px, rgba(139, 92, 62, 0.1) 25px)
        `,
      }}>
        {/* Handwritten Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#2a1f1a',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(180, 50, 50, 0.6)',
            textDecorationThickness: '2px',
          }}>
            Agent Profile
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8b5c3e',
            marginTop: '8px',
            fontStyle: 'italic',
          }}>
            Field Investigation Record
          </div>
        </div>

        {/* Taped Polaroid */}
        <div style={{
          width: '140px',
          margin: '0 auto 24px',
          position: 'relative',
        }}>
          {/* Tape */}
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-3deg)',
            width: '60px',
            height: '16px',
            background: 'rgba(255, 255, 255, 0.6)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            zIndex: 2,
          }} />
          {/* Polaroid */}
          <div style={{
            background: '#fff',
            padding: '12px 12px 40px 12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transform: 'rotate(-2deg)',
          }}>
            <div style={{
              width: '100%',
              height: '120px',
              background: '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
            }}>
              👤
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: '#666',
              marginTop: '8px',
              textAlign: 'center',
            }}>
              Agent_001
            </div>
          </div>
        </div>

        {/* Handwritten Info */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '14px',
          color: '#2a1f1a',
          lineHeight: '2',
          marginBottom: '20px',
        }}>
          <div>Name: <span style={{ fontWeight: 'bold' }}>Agent_001</span></div>
          <div>Rank: <span style={{ fontWeight: 'bold' }}>Investigator</span></div>
          <div>Level: <span style={{ fontWeight: 'bold' }}>5</span></div>
          <div style={{ marginTop: '12px', color: 'rgba(180, 50, 50, 0.8)' }}>
            Status: <span style={{ fontWeight: 'bold' }}>ACTIVE</span>
          </div>
        </div>

        {/* Drawn Stats */}
        <div style={{
          borderTop: '2px dashed #8b5c3e',
          paddingTop: '16px',
          display: 'flex',
          justifyContent: 'space-around',
          fontFamily: 'Courier New, monospace',
        }}>
          {[
            { label: 'Cases', value: '12' },
            { label: 'Caught', value: '8' },
            { label: 'Success', value: '67%' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#2a1f1a',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '10px',
                color: '#8b5c3e',
                marginTop: '2px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Red Pen Note */}
        <div style={{
          marginTop: '20px',
          padding: '12px',
          borderLeft: '3px solid rgba(180, 50, 50, 0.6)',
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          color: 'rgba(180, 50, 50, 0.8)',
          fontStyle: 'italic',
        }}>
          "Specializes in high-threat entities. Recommended for Level 4+ cases."
        </div>
      </div>
    </div>
  );
}

// Style F: Modern Agent with Analog Notes
function ProfileStyleF() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a0f14',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative' }}>
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
              AGENT PROFILE
            </div>
            <div style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#fff',
              marginTop: '4px',
              fontFamily: 'Arial, sans-serif',
            }}>
              AGENT_001
            </div>
          </div>

          {/* Avatar */}
          <div style={{
            width: '100px',
            height: '100px',
            margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #2dd4bf 0%, #1a8f7a 100%)',
            borderRadius: '50%',
            border: '3px solid #2dd4bf',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            boxShadow: '0 0 30px rgba(45, 212, 191, 0.4)',
          }}>
            👤
          </div>

          {/* Digital Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginBottom: '20px',
          }}>
            {[
              { label: 'LEVEL', value: '5' },
              { label: 'CASES', value: '12' },
              { label: 'RATE', value: '67%' },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: 'rgba(45, 212, 191, 0.1)',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  padding: '12px',
                  textAlign: 'center',
                }}
              >
                <div style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  color: '#2dd4bf',
                  fontFamily: 'Arial, sans-serif',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '9px',
                  color: '#64748b',
                  marginTop: '4px',
                  fontFamily: 'Arial, sans-serif',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Note Overlay */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          background: '#fbbf24',
          padding: '12px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
          transform: 'rotate(5deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          color: '#1a1a1a',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            Notes:
          </div>
          <div style={{ lineHeight: '1.4' }}>
            ✓ Cleared for field work
            <br />
            ✓ High success rate
            <br />
            ⚠ Monitor sanity
          </div>
        </div>

        {/* Taped Polaroid */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '-30px',
          width: '100px',
          background: '#fff',
          padding: '8px 8px 24px 8px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          transform: 'rotate(-8deg)',
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
            🎖️
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '8px',
            color: '#666',
            marginTop: '4px',
            textAlign: 'center',
          }}>
            Commendation
          </div>
        </div>
      </div>
    </div>
  );
}

// Style G: Premium Horror Notebook
function ProfileStyleG() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#faf8f5',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '450px', margin: '0 auto' }}>
        {/* Notebook Page */}
        <div style={{
          background: '#fffef9',
          borderRadius: '8px',
          padding: '40px 32px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          border: '1px solid #e8e4dc',
        }}>
          {/* Title - Simple Line Drawing */}
          <div style={{
            textAlign: 'center',
            marginBottom: '32px',
            paddingBottom: '20px',
            borderBottom: '2px solid #1a1a1a',
          }}>
            <div style={{
              fontSize: '24px',
              fontWeight: '300',
              color: '#1a1a1a',
              fontFamily: 'Arial, sans-serif',
              letterSpacing: '1px',
            }}>
              INVESTIGATOR PROFILE
            </div>
          </div>

          {/* Polaroid - Tilted */}
          <div style={{
            width: '140px',
            margin: '0 auto 32px',
            background: '#fff',
            padding: '12px 12px 40px 12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
            transform: 'rotate(-3deg)',
          }}>
            <div style={{
              width: '100%',
              height: '120px',
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
            }}>
              👤
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: '#666',
              marginTop: '8px',
              textAlign: 'center',
            }}>
              Agent_001
            </div>
          </div>

          {/* Info - Clean Typography */}
          <div style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '14px',
            color: '#1a1a1a',
            lineHeight: '2',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>Name</span>
              <span style={{ fontWeight: '600' }}>Agent_001</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>Rank</span>
              <span style={{ fontWeight: '600' }}>Investigator</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#666' }}>Level</span>
              <span style={{ fontWeight: '600' }}>5</span>
            </div>
          </div>

          {/* Stats - Minimal */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            paddingTop: '20px',
            borderTop: '1px solid #e8e4dc',
            marginBottom: '24px',
          }}>
            {[
              { label: 'Cases', value: '12' },
              { label: 'Caught', value: '8' },
              { label: 'Success', value: '67%' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '28px',
                  fontWeight: '300',
                  color: '#1a1a1a',
                  fontFamily: 'Arial, sans-serif',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: '#999',
                  marginTop: '4px',
                  fontFamily: 'Arial, sans-serif',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Note - Mustard Yellow */}
          <div style={{
            background: '#e8c547',
            padding: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            color: '#1a1a1a',
            lineHeight: '1.6',
            position: 'relative',
          }}>
            <div style={{
              position: 'absolute',
              top: '-6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px',
              height: '12px',
              background: 'rgba(255, 255, 255, 0.5)',
              boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }} />
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Field Notes:
            </div>
            <div>
              Specializes in high-threat entities. Recommended for advanced cases.
            </div>
          </div>

          {/* Red Underline Accent */}
          <div style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '3px solid rgba(180, 50, 50, 0.6)',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif',
            fontSize: '11px',
            color: '#999',
          }}>
            CLEARANCE: ALPHA-3
          </div>
        </div>
      </div>
    </div>
  );
}
