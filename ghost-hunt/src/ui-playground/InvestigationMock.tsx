// Investigation Mock - 3 Visual Styles
// Pure visual mockup - no functionality

interface InvestigationMockProps {
  style: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

export function InvestigationMock({ style }: InvestigationMockProps) {
  if (style === 'A') return <InvestigationStyleA />;
  if (style === 'B') return <InvestigationStyleB />;
  if (style === 'C') return <InvestigationStyleC />;
  if (style === 'D') return <InvestigationStyleD />;
  if (style === 'E') return <InvestigationStyleE />;
  if (style === 'F') return <InvestigationStyleF />;
  return <InvestigationStyleG />;
}

// Style A: Clean Digital Scanner
function InvestigationStyleA() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0f14',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Radar */}
      <div style={{
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, #1a1f2e 0%, #0a0f14 100%)',
        border: '2px solid #2dd4bf',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: '0 0 40px rgba(45, 212, 191, 0.3), inset 0 0 40px rgba(0,0,0,0.5)',
      }}>
        {/* Range Rings */}
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${i * 25}%`,
              height: `${i * 25}%`,
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: '50%',
            }}
          />
        ))}

        {/* Crosshairs */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '0',
          right: '0',
          height: '1px',
          background: 'rgba(45, 212, 191, 0.2)',
        }} />
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '0',
          bottom: '0',
          width: '1px',
          background: 'rgba(45, 212, 191, 0.2)',
        }} />

        {/* Center Dot */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '12px',
          height: '12px',
          background: '#2dd4bf',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(45, 212, 191, 0.8)',
        }} />

        {/* Ghost Blip */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '60%',
          width: '16px',
          height: '16px',
          background: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.8)',
          animation: 'pulse 2s infinite',
        }} />
      </div>

      {/* Heading Display */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '1px solid #2dd4bf',
        borderRadius: '8px',
        padding: '12px 24px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px' }}>
          HEADING
        </div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#2dd4bf' }}>
          045°
        </div>
        <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
          NE
        </div>
      </div>

      {/* Tool Bar */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        gap: '12px',
      }}>
        {['📡', '📊', '🌡️', '🎤', '📷'].map((icon, i) => (
          <div
            key={i}
            style={{
              width: '50px',
              height: '50px',
              background: i === 0 ? '#2dd4bf' : 'rgba(45, 212, 191, 0.1)',
              border: `2px solid ${i === 0 ? '#2dd4bf' : '#334155'}`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              cursor: 'pointer',
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

// Style B: Analog Journal Overlay
function InvestigationStyleB() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#1a1a1a',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Dark Radar Background */}
      <div style={{
        width: '400px',
        height: '400px',
        background: '#0a0a0a',
        borderRadius: '50%',
        position: 'relative',
        border: '2px solid #333',
      }}>
        {/* Simple rings */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${i * 30}%`,
              height: `${i * 30}%`,
              border: '1px solid #222',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* Sticky Note - Heading */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        width: '120px',
        height: '120px',
        background: '#fbbf24',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        transform: 'rotate(3deg)',
        fontFamily: 'Courier New, monospace',
      }}>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '8px' }}>
          Heading:
        </div>
        <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a' }}>
          045°
        </div>
        <div style={{ fontSize: '14px', color: '#666', marginTop: '4px' }}>
          NE
        </div>
      </div>

      {/* Polaroid - Ghost Photo */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        width: '140px',
        background: '#fff',
        padding: '12px 12px 40px 12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
        transform: 'rotate(-5deg)',
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
          👻
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '10px',
          color: '#666',
          marginTop: '8px',
          textAlign: 'center',
        }}>
          Last sighting
        </div>
      </div>

      {/* Handwritten Notes */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '40px',
        background: '#f5f1e8',
        padding: '16px',
        maxWidth: '200px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontFamily: 'Courier New, monospace',
        fontSize: '12px',
        color: '#1a1a1a',
        lineHeight: '1.6',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          Evidence:
        </div>
        <div>☑ EMF Level 5</div>
        <div>☐ Ghost Orbs</div>
        <div>☑ Freezing Temp</div>
        <div style={{
          marginTop: '12px',
          color: '#ef4444',
          fontWeight: 'bold',
        }}>
          Likely: WRAITH
        </div>
      </div>

      {/* Tool Icons with Tape */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        right: '40px',
        display: 'flex',
        gap: '8px',
      }}>
        {['📡', '📊', '🌡️', '🎤', '📷'].map((icon, i) => (
          <div key={i} style={{ position: 'relative' }}>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-5deg)',
              width: '30px',
              height: '15px',
              background: 'rgba(255, 255, 255, 0.6)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            }} />
            {/* Icon */}
            <div style={{
              width: '50px',
              height: '50px',
              background: i === 0 ? '#fff' : '#f5f1e8',
              border: '2px solid #1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
            }}>
              {icon}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Style C: Hybrid Tech + Analog
function InvestigationStyleC() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0f14',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Digital Radar */}
      <div style={{
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, #1a1f2e 0%, #0a0f14 100%)',
        border: '2px solid #2dd4bf',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: '0 0 40px rgba(45, 212, 191, 0.3)',
      }}>
        {/* Rings */}
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: `${i * 30}%`,
              height: `${i * 30}%`,
              border: '1px solid rgba(45, 212, 191, 0.2)',
              borderRadius: '50%',
            }}
          />
        ))}
      </div>

      {/* Paper Note with Digital Border */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '8px',
        padding: '4px',
      }}>
        <div style={{
          background: '#f5f1e8',
          padding: '16px',
          borderRadius: '4px',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{ fontSize: '10px', color: '#666', marginBottom: '4px' }}>
            Heading:
          </div>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1a1a1a' }}>
            045°
          </div>
        </div>
      </div>

      {/* Digital Tool Bar with Paper Background */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '12px',
        padding: '4px',
      }}>
        <div style={{
          background: '#f5f1e8',
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
                boxShadow: i === 0 ? '0 0 15px rgba(45, 212, 191, 0.3)' : 'none',
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style D: Paranormal Detective Bureau
function InvestigationStyleD() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #2a2520 0%, #1a1510 100%)',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Equipment Display - Analog Meter Style */}
      <div style={{
        width: '350px',
        height: '350px',
        background: '#d4c5a0',
        border: '3px solid #8b7355',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 4px 12px rgba(0,0,0,0.2)',
      }}>
        {/* Meter Face */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '300px',
          height: '300px',
          background: '#f5f1e8',
          borderRadius: '50%',
          border: '2px solid #8b7355',
        }}>
          {/* Dial Markings */}
          {[0, 30, 60, 90, 120, 150, 180].map((angle) => (
            <div
              key={angle}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '2px',
                height: '20px',
                background: '#1a1a1a',
                transformOrigin: 'center top',
                transform: `translate(-50%, -50%) rotate(${angle - 90}deg) translateY(-130px)`,
              }}
            />
          ))}

          {/* Needle */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '4px',
            height: '100px',
            background: '#ef4444',
            transformOrigin: 'center top',
            transform: 'translate(-50%, -50%) rotate(45deg) translateY(-50px)',
            borderRadius: '2px',
          }} />

          {/* Center Rivet */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '16px',
            height: '16px',
            background: '#8b7355',
            borderRadius: '50%',
            border: '2px solid #1a1a1a',
          }} />

          {/* Label */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Arial, sans-serif',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#1a1a1a',
            textAlign: 'center',
          }}>
            PARANORMAL<br />ACTIVITY
          </div>
        </div>
      </div>

      {/* Case File Notes */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        width: '200px',
        background: '#f5f1e8',
        border: '2px solid #8b7355',
        padding: '16px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        fontFamily: 'Courier New, monospace',
        fontSize: '12px',
        color: '#1a1a1a',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '12px', textAlign: 'center' }}>
          CASE NOTES
        </div>
        <div style={{ lineHeight: '1.6' }}>
          <div>Time: 23:47</div>
          <div>Location: Sector 7</div>
          <div>Activity: HIGH</div>
          <div style={{ marginTop: '12px', color: '#ef4444', fontWeight: 'bold' }}>
            ⚠ ENTITY DETECTED
          </div>
        </div>
      </div>

      {/* Equipment Buttons */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '12px',
      }}>
        {['EMF', 'THERMAL', 'AUDIO', 'CAMERA'].map((tool, i) => (
          <div
            key={tool}
            style={{
              width: '70px',
              height: '70px',
              background: i === 0 ? '#d4c5a0' : '#8b7355',
              border: '2px solid #1a1a1a',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'Arial, sans-serif',
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '20px', marginBottom: '4px' }}>
              {i === 0 ? '📊' : i === 1 ? '🌡️' : i === 2 ? '🎤' : '📷'}
            </div>
            {tool}
          </div>
        ))}
      </div>
    </div>
  );
}

// Style E: Explorer's Field Diary
function InvestigationStyleE() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#3d3428',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Journal Page */}
      <div style={{
        width: '90%',
        maxWidth: '600px',
        height: '80%',
        background: '#f5ead8',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        padding: '40px',
        position: 'relative',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(139, 92, 62, 0.1) 24px, rgba(139, 92, 62, 0.1) 25px)
        `,
      }}>
        {/* Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#2a1f1a',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(180, 50, 50, 0.6)',
          }}>
            Active Investigation
          </div>
          <div style={{
            fontSize: '12px',
            color: '#8b5c3e',
            marginTop: '8px',
          }}>
            Field Observations
          </div>
        </div>

        {/* Hand-drawn Compass */}
        <div style={{
          width: '200px',
          height: '200px',
          margin: '0 auto 32px',
          position: 'relative',
        }}>
          {/* Circle */}
          <div style={{
            width: '100%',
            height: '100%',
            border: '3px solid #2a1f1a',
            borderRadius: '50%',
            position: 'relative',
          }}>
            {/* Cardinal Directions */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Courier New, monospace',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#2a1f1a',
            }}>
              N
            </div>
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Courier New, monospace',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#2a1f1a',
            }}>
              S
            </div>
            <div style={{
              position: 'absolute',
              left: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'Courier New, monospace',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#2a1f1a',
            }}>
              W
            </div>
            <div style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              fontFamily: 'Courier New, monospace',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#2a1f1a',
            }}>
              E
            </div>

            {/* Needle */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '4px',
              height: '70px',
              background: '#ef4444',
              transformOrigin: 'center top',
              transform: 'translate(-50%, -50%) rotate(45deg) translateY(-35px)',
            }} />

            {/* Center */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '12px',
              height: '12px',
              background: '#2a1f1a',
              borderRadius: '50%',
            }} />
          </div>
        </div>

        {/* Handwritten Notes */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '14px',
          color: '#2a1f1a',
          lineHeight: '2',
        }}>
          <div style={{ marginBottom: '8px' }}>
            <strong>Heading:</strong> NE (045°)
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Distance:</strong> Approx. 15m
          </div>
          <div style={{ marginBottom: '8px' }}>
            <strong>Activity:</strong> Strong EMF readings
          </div>
          <div style={{
            marginTop: '16px',
            padding: '12px',
            borderLeft: '3px solid rgba(180, 50, 50, 0.6)',
            fontStyle: 'italic',
            color: 'rgba(180, 50, 50, 0.8)',
          }}>
            "Entity appears to be moving. Recommend caution."
          </div>
        </div>

        {/* Sketched Tools */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          display: 'flex',
          gap: '8px',
        }}>
          {['📊', '🌡️', '🎤', '📷'].map((icon, i) => (
            <div
              key={i}
              style={{
                width: '50px',
                height: '50px',
                border: '2px solid #2a1f1a',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                background: i === 0 ? 'rgba(139, 92, 62, 0.2)' : 'transparent',
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Style F: Modern Agent with Analog Notes
function InvestigationStyleF() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0f14',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Digital Radar */}
      <div style={{
        width: '350px',
        height: '350px',
        background: 'radial-gradient(circle, #1a1f2e 0%, #0a0f14 100%)',
        border: '2px solid #2dd4bf',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: '0 0 40px rgba(45, 212, 191, 0.3)',
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
              border: '1px solid rgba(45, 212, 191, 0.15)',
              borderRadius: '50%',
            }}
          />
        ))}

        {/* Sweep */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '175px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, rgba(45, 212, 191, 0.8))',
          transformOrigin: 'left center',
          transform: 'translate(0, -50%) rotate(30deg)',
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

        {/* Ghost Blip */}
        <div style={{
          position: 'absolute',
          top: '35%',
          right: '30%',
          width: '12px',
          height: '12px',
          background: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 0 15px rgba(239, 68, 68, 0.8)',
        }} />
      </div>

      {/* Sticky Note - Heading */}
      <div style={{
        position: 'absolute',
        top: '40px',
        right: '40px',
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
          Heading:
        </div>
        <div style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '4px' }}>
          045°
        </div>
        <div>NE Direction</div>
      </div>

      {/* Polaroid - Evidence */}
      <div style={{
        position: 'absolute',
        top: '40px',
        left: '40px',
        width: '120px',
        background: '#fff',
        padding: '10px 10px 30px 10px',
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
          height: '100px',
          background: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
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
          Evidence #1
        </div>
      </div>

      {/* Digital Tool Bar */}
      <div style={{
        position: 'absolute',
        bottom: '40px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '12px',
        padding: '12px',
        display: 'flex',
        gap: '10px',
      }}>
        {['📡', '📊', '🌡️', '🎤', '📷'].map((icon, i) => (
          <div
            key={i}
            style={{
              width: '50px',
              height: '50px',
              background: i === 0 ? '#2dd4bf' : 'rgba(45, 212, 191, 0.1)',
              border: `2px solid ${i === 0 ? '#2dd4bf' : '#334155'}`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              boxShadow: i === 0 ? '0 0 15px rgba(45, 212, 191, 0.3)' : 'none',
            }}
          >
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

// Style G: Premium Horror Notebook
function InvestigationStyleG() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#faf8f5',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Clean Interface */}
      <div style={{
        width: '90%',
        maxWidth: '500px',
        height: '80%',
        background: '#fffef9',
        borderRadius: '8px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        border: '1px solid #e8e4dc',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Title */}
        <div style={{
          fontSize: '20px',
          fontWeight: '300',
          color: '#1a1a1a',
          fontFamily: 'Arial, sans-serif',
          letterSpacing: '1px',
          marginBottom: '40px',
          textAlign: 'center',
        }}>
          ACTIVE INVESTIGATION
        </div>

        {/* Minimal Radar */}
        <div style={{
          width: '280px',
          height: '280px',
          border: '2px solid #1a1a1a',
          borderRadius: '50%',
          position: 'relative',
          marginBottom: '40px',
        }}>
          {/* Rings */}
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${i * 30}%`,
                height: `${i * 30}%`,
                border: '1px solid rgba(0,0,0,0.1)',
                borderRadius: '50%',
              }}
            />
          ))}

          {/* Center */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '8px',
            height: '8px',
            background: '#1a1a1a',
            borderRadius: '50%',
          }} />

          {/* Detection Point */}
          <div style={{
            position: 'absolute',
            top: '30%',
            right: '35%',
            width: '10px',
            height: '10px',
            background: '#ef4444',
            borderRadius: '50%',
          }} />
        </div>

        {/* Info Card */}
        <div style={{
          width: '100%',
          padding: '20px',
          background: '#e8c547',
          borderRadius: '4px',
          fontFamily: 'Arial, sans-serif',
          fontSize: '14px',
          color: '#1a1a1a',
          lineHeight: '1.8',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666' }}>Heading</span>
            <span style={{ fontWeight: '600' }}>045° NE</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#666' }}>Distance</span>
            <span style={{ fontWeight: '600' }}>~15m</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#666' }}>Activity</span>
            <span style={{ fontWeight: '600', color: '#ef4444' }}>HIGH</span>
          </div>
        </div>

        {/* Tool Icons */}
        <div style={{
          marginTop: '32px',
          display: 'flex',
          gap: '16px',
        }}>
          {['📡', '📊', '🌡️', '🎤', '📷'].map((icon, i) => (
            <div
              key={i}
              style={{
                width: '50px',
                height: '50px',
                border: '1px solid #e8e4dc',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                background: i === 0 ? '#1a1a1a' : '#fff',
                color: i === 0 ? '#fff' : '#1a1a1a',
              }}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
