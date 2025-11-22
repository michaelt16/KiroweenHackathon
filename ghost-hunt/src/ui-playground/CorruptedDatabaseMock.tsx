// Corrupted Database Mock - Glitched Government Terminal
// Pure visual mockup - no functionality

interface CorruptedDatabaseMockProps {
  screen: 'entity-list' | 'entity-entry' | 'error';
}

export function CorruptedDatabaseMock({ screen }: CorruptedDatabaseMockProps) {
  if (screen === 'entity-list') return <EntityListScreen />;
  if (screen === 'entity-entry') return <EntityEntryScreen />;
  return <RedactedErrorScreen />;
}

// Entity List Screen
function EntityListScreen() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Courier New, monospace',
    }}>
      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)
        `,
        pointerEvents: 'none',
        zIndex: 100,
      }} />

      {/* Glitch overlay */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '200px',
        height: '3px',
        background: '#00ff00',
        opacity: 0.3,
        zIndex: 99,
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '15%',
        width: '150px',
        height: '2px',
        background: '#ff0000',
        opacity: 0.4,
        zIndex: 99,
      }} />

      {/* Main content */}
      <div style={{
        padding: '40px',
        color: '#00ff00',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '30px',
          borderBottom: '2px solid #00ff00',
          paddingBottom: '20px',
        }}>
          <div style={{
            fontSize: '24px',
            marginBottom: '10px',
            textShadow: '0 0 10px #00ff00',
          }}>
            ╔═══════════════════════════════════════╗
          </div>
          <div style={{
            fontSize: '20px',
            marginBottom: '5px',
            textShadow: '0 0 10px #00ff00',
          }}>
            ║  CLASSIFIED ENTITY DATABASE v2.4.1  ║
          </div>
          <div style={{
            fontSize: '24px',
            textShadow: '0 0 10px #00ff00',
          }}>
            ╚═══════════════════════════════════════╝
          </div>
        </div>

        {/* Warning banner */}
        <div style={{
          background: 'rgba(139, 0, 0, 0.3)',
          border: '2px solid #ff0000',
          padding: '15px',
          marginBottom: '30px',
          color: '#ff0000',
          fontSize: '14px',
          textShadow: '0 0 8px #ff0000',
          animation: 'flicker 3s infinite',
        }}>
          ⚠ WARNING: UNAUTHORIZED ACCESS DETECTED ⚠
          <br />
          SECURITY PROTOCOL INITIATED
          <br />
          CONNECTION UNSTABLE
        </div>

        {/* Entity list */}
        <div style={{
          fontSize: '14px',
          lineHeight: '2',
        }}>
          <div style={{ marginBottom: '15px', opacity: 0.7 }}>
            &gt; LOADING ENTITY RECORDS...
          </div>
          
          {/* Entity 1 */}
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #00ff00',
            position: 'relative',
          }}>
            <div style={{ marginBottom: '8px' }}>
              ID: <span style={{ color: '#00ff00', textShadow: '0 0 5px #00ff00' }}>ENT-001</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              TYPE: WRAITH
            </div>
            <div style={{ marginBottom: '8px' }}>
              THREAT: <span style={{ color: '#ff0000' }}>HIGH</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              STATUS: ACTIVE
            </div>
            <div style={{ fontSize: '12px', opacity: 0.6 }}>
              &gt; [VIEW DETAILS]
            </div>
          </div>

          {/* Entity 2 - Glitched */}
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #00ff00',
            position: 'relative',
            opacity: 0.8,
          }}>
            <div style={{ marginBottom: '8px' }}>
              ID: <span style={{ color: '#00ff00' }}>EN█-0█2</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              TYPE: ███████
            </div>
            <div style={{ marginBottom: '8px' }}>
              THREAT: <span style={{ color: '#ffff00' }}>MED█UM</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              STATUS: ████IVE
            </div>
            <div style={{ fontSize: '12px', opacity: 0.6 }}>
              &gt; [FILE CORRUPTED]
            </div>
            
            {/* Glitch line */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '2px',
              background: '#ff0000',
              opacity: 0.5,
            }} />
          </div>

          {/* Entity 3 */}
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #00ff00',
            position: 'relative',
          }}>
            <div style={{ marginBottom: '8px' }}>
              ID: <span style={{ color: '#00ff00', textShadow: '0 0 5px #00ff00' }}>ENT-003</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              TYPE: POLTERGEIST
            </div>
            <div style={{ marginBottom: '8px' }}>
              THREAT: <span style={{ color: '#ff0000' }}>HIGH</span>
            </div>
            <div style={{ marginBottom: '8px' }}>
              STATUS: CONTAINED
            </div>
            <div style={{ fontSize: '12px', opacity: 0.6 }}>
              &gt; [VIEW DETAILS]
            </div>
          </div>

          {/* Entity 4 - Heavily corrupted */}
          <div style={{
            marginBottom: '20px',
            padding: '15px',
            border: '1px solid #ff0000',
            position: 'relative',
            opacity: 0.5,
          }}>
            <div style={{ marginBottom: '8px', color: '#ff0000' }}>
              ID: ████-███
            </div>
            <div style={{ marginBottom: '8px', color: '#ff0000' }}>
              TYPE: [REDACTED]
            </div>
            <div style={{ marginBottom: '8px', color: '#ff0000' }}>
              THREAT: ████████
            </div>
            <div style={{ marginBottom: '8px', color: '#ff0000' }}>
              STATUS: ████████
            </div>
            <div style={{ fontSize: '12px', color: '#ff0000' }}>
              &gt; [ACCESS DENIED]
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '30px',
          fontSize: '12px',
          opacity: 0.5,
        }}>
          &gt; END OF RECORDS
          <br />
          &gt; CONNECTION: UNSTABLE
          <br />
          &gt; _
        </div>
      </div>

      {/* Handwritten annotation overlay */}
      <div style={{
        position: 'absolute',
        top: '30%',
        right: '10%',
        fontFamily: 'Courier New, monospace',
        fontSize: '16px',
        color: '#ff0000',
        transform: 'rotate(-8deg)',
        fontWeight: 'bold',
        textShadow: '0 0 5px #ff0000',
        zIndex: 101,
      }}>
        Why are files<br />corrupting?
      </div>

      {/* Red string overlay */}
      <svg style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
        opacity: 0.3,
      }}>
        <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="#ff0000" strokeWidth="1" strokeDasharray="5,5" />
        <line x1="80%" y1="30%" x2="20%" y2="70%" stroke="#ff0000" strokeWidth="1" strokeDasharray="5,5" />
      </svg>
    </div>
  );
}

// Individual Entity Entry Screen
function EntityEntryScreen() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Courier New, monospace',
    }}>
      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)
        `,
        pointerEvents: 'none',
        zIndex: 100,
      }} />

      {/* Heavy glitch effects */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        height: '80px',
        background: 'rgba(255, 0, 0, 0.1)',
        zIndex: 99,
      }} />

      {/* Main content */}
      <div style={{
        padding: '40px',
        color: '#00ff00',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Header */}
        <div style={{
          marginBottom: '30px',
          fontSize: '18px',
          textShadow: '0 0 10px #00ff00',
        }}>
          ╔═══════════════════════════════════════╗
          <br />
          ║  ENTITY RECORD: ENT-001              ║
          <br />
          ╚═══════════════════════════════════════╝
        </div>

        {/* Two column layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 2fr',
          gap: '30px',
        }}>
          {/* Left: Photo */}
          <div>
            <div style={{
              marginBottom: '15px',
              fontSize: '14px',
            }}>
              VISUAL RECORD:
            </div>
            <div style={{
              width: '250px',
              height: '300px',
              border: '2px solid #00ff00',
              position: 'relative',
              background: '#0a0a0a',
              overflow: 'hidden',
            }}>
              {/* Corrupted polaroid */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '100px',
                filter: 'blur(3px)',
                opacity: 0.5,
              }}>
                👻
              </div>
              
              {/* Static overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `
                  repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.05) 3px, rgba(255,255,255,0.05) 6px)
                `,
              }} />
              
              {/* Glitch bars */}
              <div style={{
                position: 'absolute',
                top: '30%',
                left: 0,
                right: 0,
                height: '20px',
                background: 'rgba(255, 0, 0, 0.3)',
              }} />
              <div style={{
                position: 'absolute',
                top: '70%',
                left: 0,
                right: 0,
                height: '15px',
                background: 'rgba(0, 255, 0, 0.2)',
              }} />
              
              {/* Corrupted text overlay */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                fontSize: '12px',
                color: '#ff0000',
              }}>
                [FILE DAMAGED]
              </div>
            </div>
            
            {/* Handwritten note */}
            <div style={{
              marginTop: '20px',
              padding: '10px',
              background: 'rgba(255, 235, 59, 0.1)',
              border: '1px solid rgba(255, 235, 59, 0.3)',
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              color: '#ffeb3b',
              fontStyle: 'italic',
            }}>
              "Photo corrupted during<br />
              manifestation event.<br />
              Entity aware of surveillance?"
            </div>
          </div>

          {/* Right: Data */}
          <div style={{
            fontSize: '14px',
            lineHeight: '2',
          }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#00ff00', marginBottom: '10px' }}>
                ═══ CLASSIFICATION ═══
              </div>
              <div>TYPE: WRAITH</div>
              <div>THREAT LEVEL: <span style={{ color: '#ff0000' }}>HIGH</span></div>
              <div>STATUS: ACTIVE</div>
              <div>FIRST CONTACT: 2024-11-13</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#00ff00', marginBottom: '10px' }}>
                ═══ CHARACTERISTICS ═══
              </div>
              <div>• FAST MOVEMENT</div>
              <div>• EXTREME COLD MANIFESTATION</div>
              <div>• EMF LEVEL: <span style={{ color: '#ff0000' }}>5.0</span></div>
              <div>• AUDIO: WHISPERS DETECTED</div>
              <div>• VISUAL: ███████ [REDACTED]</div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#00ff00', marginBottom: '10px' }}>
                ═══ BEHAVIOR PATTERNS ═══
              </div>
              <div style={{ opacity: 0.8 }}>
                • AGGRESSIVE TOWARDS INVESTIGATORS
              </div>
              <div style={{ opacity: 0.8 }}>
                • PEAK ACTIVITY: 23:00 - 03:00
              </div>
              <div style={{ opacity: 0.6, color: '#ff0000' }}>
                • ████████ [DATA CORRUPTED]
              </div>
              <div style={{ opacity: 0.8 }}>
                • TERRITORIAL BEHAVIOR OBSERVED
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ color: '#00ff00', marginBottom: '10px' }}>
                ═══ INCIDENT REPORTS ═══
              </div>
              <div style={{ fontSize: '12px', opacity: 0.7 }}>
                &gt; 2024-11-13: Initial contact. 2 investigators.
                <br />
                &gt; 2024-11-14: Equipment malfunction. 1 injury.
                <br />
                &gt; 2024-11-15: ████████████████████████
                <br />
                &gt; [ADDITIONAL RECORDS CORRUPTED]
              </div>
            </div>

            {/* Warning box */}
            <div style={{
              background: 'rgba(139, 0, 0, 0.3)',
              border: '2px solid #ff0000',
              padding: '15px',
              color: '#ff0000',
              fontSize: '13px',
              textShadow: '0 0 8px #ff0000',
            }}>
              ⚠ CONTAINMENT PROTOCOL: ALPHA-3
              <br />
              DO NOT INVESTIGATE WITHOUT BACKUP
              <br />
              MAINTAIN MINIMUM DISTANCE: 5 METERS
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '30px',
          fontSize: '12px',
          opacity: 0.5,
        }}>
          &gt; END OF RECORD
          <br />
          &gt; FILE INTEGRITY: 67%
          <br />
          &gt; _
        </div>
      </div>

      {/* Handwritten annotations */}
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '5%',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        color: '#ff0000',
        transform: 'rotate(5deg)',
        fontWeight: 'bold',
        textShadow: '0 0 5px #ff0000',
        zIndex: 101,
      }}>
        DANGEROUS<br />
        ↓
      </div>

      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '10%',
        fontFamily: 'Courier New, monospace',
        fontSize: '12px',
        color: '#ffeb3b',
        transform: 'rotate(-3deg)',
        fontStyle: 'italic',
        zIndex: 101,
      }}>
        "Why does it corrupt<br />
        the recordings?"
      </div>
    </div>
  );
}

// Redacted Error Screen
function RedactedErrorScreen() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#000',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Courier New, monospace',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Scanlines */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)
        `,
        pointerEvents: 'none',
        zIndex: 100,
      }} />

      {/* Heavy glitch effects */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: 0,
        right: 0,
        height: '100px',
        background: 'rgba(255, 0, 0, 0.2)',
        zIndex: 99,
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        left: 0,
        right: 0,
        height: '80px',
        background: 'rgba(255, 0, 0, 0.15)',
        zIndex: 99,
      }} />

      {/* Main error content */}
      <div style={{
        textAlign: 'center',
        color: '#ff0000',
        position: 'relative',
        zIndex: 1,
      }}>
        <div style={{
          fontSize: '48px',
          marginBottom: '30px',
          textShadow: '0 0 20px #ff0000',
          animation: 'flicker 2s infinite',
        }}>
          ⚠ ERROR ⚠
        </div>

        <div style={{
          fontSize: '24px',
          marginBottom: '20px',
          textShadow: '0 0 15px #ff0000',
        }}>
          ACCESS DENIED
        </div>

        <div style={{
          fontSize: '16px',
          marginBottom: '40px',
          color: '#00ff00',
          textShadow: '0 0 10px #00ff00',
        }}>
          ╔═══════════════════════════════════════╗
          <br />
          ║  SECURITY BREACH DETECTED            ║
          <br />
          ║  FILE: ████████████████              ║
          <br />
          ║  CLEARANCE LEVEL: ████████           ║
          <br />
          ╚═══════════════════════════════════════╝
        </div>

        <div style={{
          fontSize: '14px',
          marginBottom: '30px',
          opacity: 0.8,
        }}>
          ERROR CODE: 0x████████
          <br />
          TIMESTAMP: 2024-11-██ ██:██:██
          <br />
          USER: [REDACTED]
        </div>

        <div style={{
          fontSize: '18px',
          marginBottom: '20px',
          color: '#ff0000',
          textShadow: '0 0 15px #ff0000',
        }}>
          THIS INCIDENT WILL BE REPORTED
        </div>

        <div style={{
          fontSize: '12px',
          opacity: 0.6,
          color: '#00ff00',
        }}>
          &gt; TERMINATING CONNECTION...
          <br />
          &gt; ████████████████████
          <br />
          &gt; _
        </div>
      </div>

      {/* Corrupted data overlay */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        fontSize: '10px',
        color: '#00ff00',
        opacity: 0.3,
        zIndex: 50,
        lineHeight: '1.5',
      }}>
        01001000 01000101 01001100 01010000
        <br />
        01010111 01001000 01011001 00100000
        <br />
        01001001 01010011 00100000 01001001
        <br />
        01010100 00100000 01001000 01000101
      </div>

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '10%',
        fontSize: '10px',
        color: '#ff0000',
        opacity: 0.3,
        zIndex: 50,
        lineHeight: '1.5',
      }}>
        ████████████████████
        <br />
        ██ WATCHING ████████
        <br />
        ████████████████████
        <br />
        ████ US ████████████
      </div>

      {/* Handwritten panic note */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '50%',
        transform: 'translateX(-50%) rotate(-2deg)',
        fontFamily: 'Courier New, monospace',
        fontSize: '16px',
        color: '#ffeb3b',
        fontWeight: 'bold',
        textShadow: '0 0 10px #ffeb3b',
        zIndex: 101,
        textAlign: 'center',
      }}>
        "The database knows<br />
        we're looking"
      </div>

      {/* Red string overlay */}
      <svg style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
        opacity: 0.4,
      }}>
        <line x1="10%" y1="10%" x2="90%" y2="90%" stroke="#ff0000" strokeWidth="2" />
        <line x1="90%" y1="10%" x2="10%" y2="90%" stroke="#ff0000" strokeWidth="2" />
        <circle cx="50%" cy="50%" r="30%" stroke="#ff0000" strokeWidth="2" fill="none" />
      </svg>

      <style>
        {`
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
            75% { opacity: 0.9; }
          }
        `}
      </style>
    </div>
  );
}
