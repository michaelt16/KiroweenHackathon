// Map Mock - 3 Visual Styles
// Pure visual mockup - no functionality

interface MapMockProps {
  style: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
}

export function MapMock({ style }: MapMockProps) {
  if (style === 'A') return <MapStyleA />;
  if (style === 'B') return <MapStyleB />;
  if (style === 'C') return <MapStyleC />;
  if (style === 'D') return <MapStyleD />;
  if (style === 'E') return <MapStyleE />;
  if (style === 'F') return <MapStyleF />;
  return <MapStyleG />;
}

// Style A: Clean Digital Map
function MapStyleA() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0f14 0%, #1a1f2e 100%)',
      position: 'relative',
    }}>
      {/* Map Area */}
      <div style={{
        width: '100%',
        height: '100%',
        background: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(45, 212, 191, 0.03) 50px, rgba(45, 212, 191, 0.03) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(45, 212, 191, 0.03) 50px, rgba(45, 212, 191, 0.03) 51px)
        `,
        position: 'relative',
      }}>
        {/* Player Marker */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40px',
          height: '40px',
          background: '#2dd4bf',
          borderRadius: '50%',
          border: '3px solid #fff',
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          📍
        </div>

        {/* Hotspot Markers */}
        {[
          { top: '30%', left: '40%', icon: '👻' },
          { top: '60%', left: '70%', icon: '👻' },
          { top: '40%', left: '80%', icon: '👻' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '50px',
              height: '50px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid #ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              animation: 'pulse 2s infinite',
            }}
          >
            {marker.icon}
          </div>
        ))}

        {/* Supply Markers */}
        {[
          { top: '25%', left: '60%', icon: '📦' },
          { top: '70%', left: '30%', icon: '📦' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '40px',
              height: '40px',
              background: 'rgba(45, 212, 191, 0.2)',
              border: '2px solid #2dd4bf',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            {marker.icon}
          </div>
        ))}
      </div>

      {/* Bottom HUD */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(15, 26, 31, 0.95)',
        borderTop: '2px solid #2dd4bf',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {[
          { icon: '👤', label: 'Profile' },
          { icon: '🎒', label: 'Inventory' },
          { icon: '📖', label: 'Codex' },
        ].map((btn) => (
          <div
            key={btn.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: '28px' }}>{btn.icon}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>{btn.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Icon */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '50px',
        height: '50px',
        background: '#2dd4bf',
        borderRadius: '50%',
        border: '2px solid #fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>
        👤
      </div>
    </div>
  );
}

// Style B: Analog Map with Paper Overlay
function MapStyleB() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#2a2520',
      position: 'relative',
    }}>
      {/* Paper Map */}
      <div style={{
        width: '100%',
        height: '100%',
        background: '#f5f1e8',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(0,0,0,0.02) 100px, rgba(0,0,0,0.02) 101px),
          repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(0,0,0,0.02) 100px, rgba(0,0,0,0.02) 101px)
        `,
        position: 'relative',
      }}>
        {/* Player Marker - Pin */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            background: '#ef4444',
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            border: '2px solid #1a1a1a',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }} />
        </div>

        {/* Hotspot Markers - Circled */}
        {[
          { top: '30%', left: '40%' },
          { top: '60%', left: '70%' },
          { top: '40%', left: '80%' },
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
            {/* Red circle */}
            <div style={{
              width: '60px',
              height: '60px',
              border: '3px solid #ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.1)',
            }}>
              <div style={{ fontSize: '28px' }}>👻</div>
            </div>
            {/* Handwritten label */}
            <div style={{
              position: 'absolute',
              top: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: '#1a1a1a',
              whiteSpace: 'nowrap',
            }}>
              Hotspot {i + 1}
            </div>
          </div>
        ))}

        {/* Supply Markers - Sticky Notes */}
        {[
          { top: '25%', left: '60%', label: 'Film' },
          { top: '70%', left: '30%', label: 'EMF' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '60px',
              height: '60px',
              background: '#fbbf24',
              padding: '8px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
              transform: `rotate(${i % 2 === 0 ? -5 : 5}deg)`,
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: '#1a1a1a',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
            }}
          >
            <div style={{ fontSize: '20px' }}>📦</div>
            <div>{marker.label}</div>
          </div>
        ))}
      </div>

      {/* Bottom Tabs - Paper Style */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#d4cfc4',
        borderTop: '2px solid #1a1a1a',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {[
          { icon: '👤', label: 'Profile' },
          { icon: '🎒', label: 'Bag' },
          { icon: '📖', label: 'Journal' },
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
            <div style={{ fontSize: '10px', color: '#1a1a1a' }}>{btn.label}</div>
          </div>
        ))}
      </div>

      {/* ID Card Preview */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '80px',
        height: '100px',
        background: '#fff',
        border: '2px solid #1a1a1a',
        padding: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
        fontFamily: 'Courier New, monospace',
        fontSize: '8px',
      }}>
        <div style={{
          width: '100%',
          height: '50px',
          background: '#ddd',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}>
          👤
        </div>
        <div style={{ fontSize: '9px', fontWeight: 'bold' }}>AGENT_001</div>
        <div style={{ fontSize: '7px', color: '#666' }}>Level 5</div>
      </div>
    </div>
  );
}

// Style C: Hybrid Tech + Analog
function MapStyleC() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0f14',
      position: 'relative',
    }}>
      {/* Digital Grid Map */}
      <div style={{
        width: '100%',
        height: '100%',
        background: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(45, 212, 191, 0.05) 50px, rgba(45, 212, 191, 0.05) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(45, 212, 191, 0.05) 50px, rgba(45, 212, 191, 0.05) 51px)
        `,
        position: 'relative',
      }}>
        {/* Player Marker - Digital */}
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
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          📍
        </div>

        {/* Hotspots - Digital with Paper Labels */}
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
            {/* Digital marker */}
            <div style={{
              width: '50px',
              height: '50px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid #ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
            }}>
              👻
            </div>
            {/* Paper label */}
            <div style={{
              position: 'absolute',
              top: '60px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#f5f1e8',
              padding: '4px 8px',
              border: '1px solid #2dd4bf',
              borderRadius: '4px',
              fontFamily: 'Courier New, monospace',
              fontSize: '9px',
              color: '#1a1a1a',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}>
              Hotspot {i + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom HUD - Hybrid */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderBottom: 'none',
        borderRadius: '12px 12px 0 0',
        padding: '4px',
      }}>
        <div style={{
          background: '#f5f1e8',
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
              <div style={{ fontSize: '10px', color: '#1a1a1a' }}>{btn.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile - Digital Frame with Paper */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '8px',
        padding: '4px',
        boxShadow: '0 0 20px rgba(45, 212, 191, 0.2)',
      }}>
        <div style={{
          background: '#f5f1e8',
          borderRadius: '4px',
          padding: '8px',
          width: '60px',
          textAlign: 'center',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{ fontSize: '32px' }}>👤</div>
          <div style={{ fontSize: '8px', color: '#1a1a1a', marginTop: '4px' }}>
            Lv.5
          </div>
        </div>
      </div>
    </div>
  );
}

// Style D: Paranormal Detective Bureau
function MapStyleD() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #2a2520 0%, #1a1510 100%)',
      position: 'relative',
    }}>
      {/* Map Area - Topographic Style */}
      <div style={{
        width: '100%',
        height: '100%',
        background: '#d4c5a0',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 80px, rgba(0,0,0,0.05) 80px, rgba(0,0,0,0.05) 81px),
          repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(0,0,0,0.05) 80px, rgba(0,0,0,0.05) 81px)
        `,
        position: 'relative',
      }}>
        {/* Player Marker - Pin with Flag */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -100%)',
        }}>
          <div style={{
            width: '30px',
            height: '30px',
            background: '#1a1a1a',
            borderRadius: '50% 50% 50% 0',
            transform: 'rotate(-45deg)',
            border: '2px solid #8b7355',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          }} />
        </div>

        {/* Hotspot Markers - Circled with Labels */}
        {[
          { top: '30%', left: '40%', label: 'SITE A' },
          { top: '60%', left: '70%', label: 'SITE B' },
          { top: '40%', left: '80%', label: 'SITE C' },
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
            {/* Circle */}
            <div style={{
              width: '60px',
              height: '60px',
              border: '3px solid #ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.1)',
            }}>
              <div style={{ fontSize: '28px' }}>👻</div>
            </div>
            {/* Label */}
            <div style={{
              position: 'absolute',
              top: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Arial, sans-serif',
              fontSize: '10px',
              fontWeight: 'bold',
              color: '#1a1a1a',
              whiteSpace: 'nowrap',
              background: '#f5f1e8',
              padding: '4px 8px',
              border: '1px solid #8b7355',
            }}>
              {marker.label}
            </div>
          </div>
        ))}

        {/* Supply Markers - Boxes */}
        {[
          { top: '25%', left: '60%', label: 'SUPPLY' },
          { top: '70%', left: '30%', label: 'SUPPLY' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '50px',
              height: '50px',
              background: '#8b7355',
              border: '2px solid #1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            }}
          >
            📦
          </div>
        ))}
      </div>

      {/* Bottom HUD - Bureau Style */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#f5f1e8',
        borderTop: '3px solid #8b7355',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {[
          { icon: '👤', label: 'Agent' },
          { icon: '🎒', label: 'Equipment' },
          { icon: '📖', label: 'Files' },
        ].map((btn) => (
          <div
            key={btn.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <div style={{ fontSize: '28px' }}>{btn.icon}</div>
            <div style={{ fontSize: '10px', color: '#1a1a1a', fontWeight: 'bold' }}>{btn.label}</div>
          </div>
        ))}
      </div>

      {/* ID Badge */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '70px',
        height: '90px',
        background: '#f5f1e8',
        border: '2px solid #8b7355',
        padding: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        fontFamily: 'Arial, sans-serif',
        fontSize: '8px',
      }}>
        <div style={{
          width: '100%',
          height: '45px',
          background: '#ddd',
          marginBottom: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          👤
        </div>
        <div style={{ fontSize: '9px', fontWeight: 'bold', textAlign: 'center' }}>AGENT</div>
        <div style={{ fontSize: '7px', color: '#666', textAlign: 'center' }}>Level 5</div>
      </div>
    </div>
  );
}

// Style E: Explorer's Field Diary
function MapStyleE() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#3d3428',
      position: 'relative',
    }}>
      {/* Aged Paper Map */}
      <div style={{
        width: '100%',
        height: '100%',
        background: '#f5ead8',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(139, 92, 62, 0.1) 24px, rgba(139, 92, 62, 0.1) 25px)
        `,
        position: 'relative',
      }}>
        {/* Player Marker - Hand-drawn X */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '40px',
          color: '#ef4444',
          fontWeight: 'bold',
          fontFamily: 'Courier New, monospace',
        }}>
          ✗
        </div>

        {/* Hotspot Markers - Circled with Notes */}
        {[
          { top: '30%', left: '40%', note: 'Haunted' },
          { top: '60%', left: '70%', note: 'Active' },
          { top: '40%', left: '80%', note: 'Danger!' },
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
            {/* Hand-drawn circle */}
            <div style={{
              width: '60px',
              height: '60px',
              border: '3px solid #ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(239, 68, 68, 0.05)',
            }}>
              <div style={{ fontSize: '28px' }}>👻</div>
            </div>
            {/* Handwritten note */}
            <div style={{
              position: 'absolute',
              top: '70px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: '#2a1f1a',
              whiteSpace: 'nowrap',
              fontStyle: 'italic',
            }}>
              {marker.note}
            </div>
          </div>
        ))}

        {/* Supply Markers - Sketched */}
        {[
          { top: '25%', left: '60%' },
          { top: '70%', left: '30%' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '40px',
              height: '40px',
              border: '2px solid #2a1f1a',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              background: 'rgba(139, 92, 62, 0.1)',
            }}
          >
            📦
          </div>
        ))}

        {/* Compass Rose */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '80px',
          height: '80px',
          border: '2px solid #2a1f1a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#2a1f1a',
          background: 'rgba(245, 234, 216, 0.9)',
        }}>
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: '8px', left: '50%', transform: 'translateX(-50%)' }}>N</div>
            <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)' }}>S</div>
            <div style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)' }}>W</div>
            <div style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)' }}>E</div>
          </div>
        </div>
      </div>

      {/* Bottom Tabs - Journal Style */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#8b5c3e',
        borderTop: '2px solid #2a1f1a',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {[
          { icon: '👤', label: 'Profile' },
          { icon: '🎒', label: 'Pack' },
          { icon: '📖', label: 'Journal' },
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
            <div style={{ fontSize: '10px', color: '#f5ead8' }}>{btn.label}</div>
          </div>
        ))}
      </div>

      {/* Taped Photo */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '80px',
        background: '#fff',
        padding: '8px 8px 24px 8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transform: 'rotate(-5deg)',
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
          height: '60px',
          background: '#ddd',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
        }}>
          👤
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '8px',
          color: '#666',
          marginTop: '4px',
          textAlign: 'center',
        }}>
          Explorer
        </div>
      </div>
    </div>
  );
}

// Style F: Modern Agent with Analog Notes
function MapStyleF() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0f14',
      position: 'relative',
    }}>
      {/* Digital Grid Map */}
      <div style={{
        width: '100%',
        height: '100%',
        background: `
          repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(45, 212, 191, 0.05) 50px, rgba(45, 212, 191, 0.05) 51px),
          repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(45, 212, 191, 0.05) 50px, rgba(45, 212, 191, 0.05) 51px)
        `,
        position: 'relative',
      }}>
        {/* Player Marker - Digital */}
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
          boxShadow: '0 0 30px rgba(45, 212, 191, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '20px',
        }}>
          📍
        </div>

        {/* Hotspots - Digital */}
        {[
          { top: '30%', left: '40%' },
          { top: '60%', left: '70%' },
          { top: '40%', left: '80%' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '50px',
              height: '50px',
              background: 'rgba(239, 68, 68, 0.2)',
              border: '2px solid #ef4444',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 0 20px rgba(239, 68, 68, 0.3)',
            }}
          >
            👻
          </div>
        ))}

        {/* Supply Markers */}
        {[
          { top: '25%', left: '60%' },
          { top: '70%', left: '30%' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '40px',
              height: '40px',
              background: 'rgba(45, 212, 191, 0.2)',
              border: '2px solid #2dd4bf',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
            }}
          >
            📦
          </div>
        ))}
      </div>

      {/* Sticky Note - Objectives */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '140px',
        height: '140px',
        background: '#fbbf24',
        padding: '12px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        transform: 'rotate(3deg)',
        fontFamily: 'Courier New, monospace',
        fontSize: '11px',
        color: '#1a1a1a',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
          TODO:
        </div>
        <div style={{ lineHeight: '1.6' }}>
          ☐ Check Site A
          <br />
          ☐ Collect supplies
          <br />
          ☐ Investigate hotspot
          <br />
          ☑ Review equipment
        </div>
      </div>

      {/* Bottom HUD - Hybrid */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderBottom: 'none',
        borderRadius: '12px 12px 0 0',
        padding: '4px',
      }}>
        <div style={{
          background: '#f5f1e8',
          borderRadius: '8px 8px 0 0',
          padding: '12px',
          display: 'flex',
          justifyContent: 'space-around',
        }}>
          {[
            { icon: '👤', label: 'Agent' },
            { icon: '🎒', label: 'Kit' },
            { icon: '📖', label: 'Files' },
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
              <div style={{ fontSize: '10px', color: '#1a1a1a' }}>{btn.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Profile - Digital Frame */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        background: 'rgba(15, 26, 31, 0.95)',
        border: '2px solid #2dd4bf',
        borderRadius: '8px',
        padding: '4px',
        boxShadow: '0 0 20px rgba(45, 212, 191, 0.2)',
      }}>
        <div style={{
          background: '#f5f1e8',
          borderRadius: '4px',
          padding: '8px',
          width: '60px',
          textAlign: 'center',
          fontFamily: 'Courier New, monospace',
        }}>
          <div style={{ fontSize: '32px' }}>👤</div>
          <div style={{ fontSize: '8px', color: '#1a1a1a', marginTop: '4px' }}>
            Lv.5
          </div>
        </div>
      </div>
    </div>
  );
}

// Style G: Premium Horror Notebook
function MapStyleG() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#faf8f5',
      position: 'relative',
    }}>
      {/* Clean Map */}
      <div style={{
        width: '100%',
        height: '100%',
        background: '#fffef9',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 100px, rgba(0,0,0,0.02) 100px, rgba(0,0,0,0.02) 101px),
          repeating-linear-gradient(90deg, transparent, transparent 100px, rgba(0,0,0,0.02) 100px, rgba(0,0,0,0.02) 101px)
        `,
        position: 'relative',
      }}>
        {/* Player Marker - Minimal */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '30px',
          height: '30px',
          background: '#1a1a1a',
          borderRadius: '50%',
          border: '2px solid #fff',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '16px',
        }}>
          📍
        </div>

        {/* Hotspot Markers - Clean Circles */}
        {[
          { top: '30%', left: '40%' },
          { top: '60%', left: '70%' },
          { top: '40%', left: '80%' },
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
            <div style={{
              width: '50px',
              height: '50px',
              border: '2px solid #1a1a1a',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#fff',
              fontSize: '24px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            }}>
              👻
            </div>
          </div>
        ))}

        {/* Supply Markers - Minimal Boxes */}
        {[
          { top: '25%', left: '60%' },
          { top: '70%', left: '30%' },
        ].map((marker, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: marker.top,
              left: marker.left,
              width: '40px',
              height: '40px',
              background: '#fff',
              border: '1px solid #e8e4dc',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            📦
          </div>
        ))}
      </div>

      {/* Bottom HUD - Minimal */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#fff',
        borderTop: '1px solid #e8e4dc',
        padding: '16px',
        display: 'flex',
        justifyContent: 'space-around',
      }}>
        {[
          { icon: '👤', label: 'Profile' },
          { icon: '🎒', label: 'Items' },
          { icon: '📖', label: 'Codex' },
        ].map((btn) => (
          <div
            key={btn.label}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              fontFamily: 'Arial, sans-serif',
            }}
          >
            <div style={{ fontSize: '28px' }}>{btn.icon}</div>
            <div style={{ fontSize: '11px', color: '#666', fontWeight: '500' }}>{btn.label}</div>
          </div>
        ))}
      </div>

      {/* Profile Badge - Minimal */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        width: '60px',
        height: '60px',
        background: '#fff',
        border: '1px solid #e8e4dc',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '28px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        👤
      </div>

      {/* Info Card */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        background: '#e8c547',
        padding: '12px 16px',
        borderRadius: '4px',
        fontFamily: 'Arial, sans-serif',
        fontSize: '12px',
        color: '#1a1a1a',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <div style={{ fontWeight: '600', marginBottom: '4px' }}>Active Mission</div>
        <div style={{ fontSize: '11px', color: '#666' }}>3 hotspots nearby</div>
      </div>
    </div>
  );
}
