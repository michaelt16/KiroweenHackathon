// Journal Horror Mock - Dark Paranormal Field Journal
// Pure visual mockup - no functionality

interface JournalHorrorMockProps {
  page: 'ghost-entry' | 'player-notes' | 'evidence';
}

export function JournalHorrorMock({ page }: JournalHorrorMockProps) {
  if (page === 'ghost-entry') return <GhostEntryPage />;
  if (page === 'player-notes') return <PlayerNotesPage />;
  return <EvidencePage />;
}

// Ghost Entry Page - Disturbing entity documentation
function GhostEntryPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1510',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Aged Journal Page */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#e8dcc0',
        backgroundImage: `
          radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(101, 67, 33, 0.2) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.05) 0%, transparent 60%)
        `,
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '800px',
        transform: 'rotate(-0.5deg)',
      }}>
        {/* Water damage stain */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '30px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(101, 67, 33, 0.3) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(8px)',
        }} />

        {/* Smudge marks */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '50px',
          width: '80px',
          height: '40px',
          background: 'rgba(0, 0, 0, 0.1)',
          borderRadius: '50%',
          filter: 'blur(4px)',
          transform: 'rotate(-15deg)',
        }} />

        {/* Title - scratched and rewritten */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#2a1f1a',
            textDecoration: 'line-through',
            opacity: 0.4,
          }}>
            Ghost Type: Unknown
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#8b0000',
            marginTop: '-10px',
            transform: 'rotate(-1deg)',
          }}>
            THE WRAITH
          </div>
          <div style={{
            position: 'absolute',
            top: '50px',
            right: '20px',
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            color: '#8b0000',
            transform: 'rotate(8deg)',
            fontWeight: 'bold',
          }}>
            ← DON'T LOOK DIRECTLY
          </div>
        </div>

        {/* Taped Polaroid */}
        <div style={{
          width: '180px',
          margin: '0 0 30px 20px',
          position: 'relative',
          float: 'left',
        }}>
          {/* Masking tape - worn */}
          <div style={{
            position: 'absolute',
            top: '-12px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-3deg)',
            width: '70px',
            height: '20px',
            background: 'rgba(210, 180, 140, 0.7)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }} />
          
          {/* Polaroid */}
          <div style={{
            background: '#f5f5f0',
            padding: '12px 12px 45px 12px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
            transform: 'rotate(-4deg)',
            border: '1px solid #ccc',
          }}>
            <div style={{
              width: '100%',
              height: '150px',
              background: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Distorted ghost */}
              <div style={{
                fontSize: '80px',
                filter: 'blur(2px)',
                opacity: 0.7,
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
                  repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
                `,
              }} />
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              color: '#333',
              marginTop: '10px',
              textAlign: 'center',
              fontStyle: 'italic',
            }}>
              Last seen: 11/13/24
            </div>
          </div>
          
          {/* Red circle around photo */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200px',
            height: '200px',
            border: '3px solid #8b0000',
            borderRadius: '50%',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Handwritten notes - shaky */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '15px',
          color: '#2a1f1a',
          lineHeight: '2.2',
          marginBottom: '30px',
        }}>
          <div style={{ marginBottom: '15px', transform: 'rotate(-0.3deg)' }}>
            First encounter: <span style={{ textDecoration: 'line-through' }}>October 31</span> November 13
          </div>
          <div style={{ marginBottom: '15px', transform: 'rotate(0.2deg)' }}>
            Location: Whitmore Estate, 2nd floor hallway
          </div>
          <div style={{ marginBottom: '15px', transform: 'rotate(-0.1deg)' }}>
            Temperature drop: <span style={{ fontWeight: 'bold', color: '#8b0000' }}>-15°C</span>
          </div>
          <div style={{ marginBottom: '15px', transform: 'rotate(0.3deg)' }}>
            EMF Reading: <span style={{ fontWeight: 'bold', color: '#8b0000' }}>5.0 (MAX)</span>
          </div>
        </div>

        {/* Frantic observations */}
        <div style={{
          background: 'rgba(255, 255, 200, 0.4)',
          padding: '20px',
          borderLeft: '4px solid #8b0000',
          marginBottom: '30px',
          transform: 'rotate(0.5deg)',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            color: '#2a1f1a',
            lineHeight: '1.8',
            fontStyle: 'italic',
          }}>
            <div style={{ marginBottom: '10px' }}>
              "It moved through the wall. Impossible speed."
            </div>
            <div style={{ marginBottom: '10px' }}>
              "Sarah heard whispers. I heard nothing."
            </div>
            <div style={{ marginBottom: '10px', color: '#8b0000', fontWeight: 'bold' }}>
              "It knows we're watching."
            </div>
          </div>
          
          {/* Scratch marks */}
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '20px',
            fontFamily: 'Courier New, monospace',
            fontSize: '20px',
            color: '#8b0000',
            transform: 'rotate(-15deg)',
            fontWeight: 'bold',
          }}>
            ///
          </div>
        </div>

        {/* Margin scribbles */}
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '200px',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#8b0000',
          transform: 'rotate(90deg)',
          transformOrigin: 'right center',
          whiteSpace: 'nowrap',
        }}>
          FAST MOVEMENT • COLD • AGGRESSIVE • AVOID DIRECT CONTACT
        </div>

        {/* Bottom warning */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'Courier New, monospace',
          fontSize: '24px',
          color: '#8b0000',
          fontWeight: 'bold',
          textAlign: 'center',
          letterSpacing: '3px',
        }}>
          DO NOT INVESTIGATE ALONE
        </div>

        {/* Disturbing doodle */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          right: '40px',
          width: '80px',
          height: '80px',
          border: '2px solid #2a1f1a',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '40px',
          transform: 'rotate(15deg)',
        }}>
          👁️
        </div>

        {/* Fingerprint smudge */}
        <div style={{
          position: 'absolute',
          top: '150px',
          left: '100px',
          width: '40px',
          height: '50px',
          background: 'radial-gradient(ellipse, rgba(101, 67, 33, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'rotate(25deg)',
          opacity: 0.5,
        }} />
      </div>
    </div>
  );
}

// Player Notes Page - Chaotic investigation notes
function PlayerNotesPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1510',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Aged Journal Page */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#e8dcc0',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 28px, rgba(139, 92, 62, 0.15) 28px, rgba(139, 92, 62, 0.15) 29px),
          radial-gradient(circle at 70% 20%, rgba(101, 67, 33, 0.1) 0%, transparent 50%)
        `,
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '800px',
        transform: 'rotate(0.3deg)',
      }}>
        {/* Coffee stain */}
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '60px',
          width: '100px',
          height: '100px',
          background: 'radial-gradient(circle, rgba(101, 67, 33, 0.4) 0%, rgba(101, 67, 33, 0.1) 50%, transparent 70%)',
          borderRadius: '50%',
          border: '2px solid rgba(101, 67, 33, 0.2)',
        }} />

        {/* Title */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#2a1f1a',
          marginBottom: '30px',
          textDecoration: 'underline',
          textDecorationColor: '#8b0000',
        }}>
          Investigation Log - Day 3
        </div>

        {/* Checklist - frantic */}
        <div style={{
          marginBottom: '30px',
          fontFamily: 'Courier New, monospace',
          fontSize: '14px',
          color: '#2a1f1a',
          lineHeight: '2',
        }}>
          <div style={{ transform: 'rotate(-0.2deg)' }}>☑ EMF Detector - WORKING</div>
          <div style={{ transform: 'rotate(0.1deg)' }}>☑ Thermal Camera - WORKING</div>
          <div style={{ transform: 'rotate(-0.3deg)' }}>☐ Spirit Box - <span style={{ color: '#8b0000', fontWeight: 'bold' }}>BROKEN</span></div>
          <div style={{ transform: 'rotate(0.2deg)' }}>☑ Camera - LOW BATTERY</div>
          <div style={{ transform: 'rotate(-0.1deg)', textDecoration: 'line-through' }}>☐ Sanity Pills</div>
          <div style={{ transform: 'rotate(0.3deg)', color: '#8b0000', fontWeight: 'bold' }}>☐ GET OUT</div>
        </div>

        {/* Sticky note */}
        <div style={{
          position: 'absolute',
          top: '200px',
          right: '30px',
          width: '140px',
          height: '140px',
          background: '#ffeb3b',
          padding: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          transform: 'rotate(8deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#1a1a1a',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', textDecoration: 'underline' }}>
            REMEMBER:
          </div>
          <div style={{ lineHeight: '1.6' }}>
            • Don't go alone
            <br />
            • Check EMF first
            <br />
            • <span style={{ color: '#8b0000', fontWeight: 'bold' }}>TRUST YOUR GUT</span>
            <br />
            • Exit if sanity &lt; 30%
          </div>
        </div>

        {/* Observations */}
        <div style={{
          marginBottom: '30px',
          fontFamily: 'Courier New, monospace',
          fontSize: '14px',
          color: '#2a1f1a',
          lineHeight: '2',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>Observations:</div>
          <div style={{ transform: 'rotate(-0.1deg)', marginBottom: '10px' }}>
            23:47 - Temperature dropped suddenly. Breath visible.
          </div>
          <div style={{ transform: 'rotate(0.2deg)', marginBottom: '10px' }}>
            23:52 - EMF spike in hallway. <span style={{ color: '#8b0000' }}>5.0 reading</span>
          </div>
          <div style={{ transform: 'rotate(-0.3deg)', marginBottom: '10px' }}>
            00:03 - Heard footsteps. No one there.
          </div>
          <div style={{ transform: 'rotate(0.1deg)', marginBottom: '10px', color: '#8b0000', fontWeight: 'bold' }}>
            00:15 - IT SAW ME
          </div>
        </div>

        {/* Arrows pointing */}
        <div style={{
          position: 'absolute',
          left: '50px',
          top: '500px',
          fontSize: '30px',
          color: '#8b0000',
          transform: 'rotate(-45deg)',
        }}>
          ↗
        </div>

        {/* Scribbled warning */}
        <div style={{
          background: 'rgba(255, 0, 0, 0.1)',
          border: '3px solid #8b0000',
          padding: '20px',
          marginBottom: '30px',
          transform: 'rotate(-1deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '16px',
          color: '#8b0000',
          fontWeight: 'bold',
          textAlign: 'center',
        }}>
          PATTERN DETECTED:<br />
          ACTIVITY PEAKS AT MIDNIGHT<br />
          AVOID 2ND FLOOR AFTER 23:00
        </div>

        {/* Taped evidence photo */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: '60px',
          width: '120px',
        }}>
          {/* Tape */}
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%) rotate(5deg)',
            width: '50px',
            height: '18px',
            background: 'rgba(210, 180, 140, 0.7)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }} />
          
          <div style={{
            background: '#f5f5f0',
            padding: '8px 8px 30px 8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
            transform: 'rotate(-8deg)',
          }}>
            <div style={{
              width: '100%',
              height: '100px',
              background: '#333',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '40px',
            }}>
              📷
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '9px',
              color: '#333',
              marginTop: '6px',
              textAlign: 'center',
            }}>
              EMF spike
            </div>
          </div>
        </div>

        {/* Margin panic scribble */}
        <div style={{
          position: 'absolute',
          right: '15px',
          bottom: '200px',
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          color: '#8b0000',
          transform: 'rotate(90deg)',
          transformOrigin: 'right center',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
        }}>
          WHY IS IT FOLLOWING ME • WHY IS IT FOLLOWING ME • WHY
        </div>
      </div>
    </div>
  );
}

// Evidence Page - Collected proof
function EvidencePage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#1a1510',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Aged Journal Page */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#e8dcc0',
        backgroundImage: `
          radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.2) 0%, transparent 40%),
          radial-gradient(circle at 60% 80%, rgba(101, 67, 33, 0.15) 0%, transparent 50%)
        `,
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '800px',
        transform: 'rotate(-0.2deg)',
      }}>
        {/* Title */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2a1f1a',
          marginBottom: '40px',
          textAlign: 'center',
          textDecoration: 'underline',
          textDecorationColor: '#8b0000',
        }}>
          EVIDENCE COLLECTED
        </div>

        {/* Evidence grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '30px',
          marginBottom: '40px',
        }}>
          {[
            { type: 'EMF', value: '5.0', icon: '📊', status: 'CONFIRMED' },
            { type: 'THERMAL', value: '-15°C', icon: '🌡️', status: 'CONFIRMED' },
            { type: 'AUDIO', value: 'Whispers', icon: '🎤', status: 'UNCLEAR' },
            { type: 'VISUAL', value: 'Shadow', icon: '📷', status: 'CONFIRMED' },
          ].map((evidence, i) => (
            <div
              key={i}
              style={{
                position: 'relative',
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              {/* Tape */}
              <div style={{
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-5deg)',
                width: '60px',
                height: '18px',
                background: 'rgba(210, 180, 140, 0.7)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 2,
              }} />
              
              {/* Evidence card */}
              <div style={{
                background: '#fff',
                padding: '20px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                border: '2px solid #ccc',
              }}>
                <div style={{
                  fontSize: '40px',
                  textAlign: 'center',
                  marginBottom: '10px',
                }}>
                  {evidence.icon}
                </div>
                <div style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '14px',
                  color: '#1a1a1a',
                  textAlign: 'center',
                  marginBottom: '8px',
                  fontWeight: 'bold',
                }}>
                  {evidence.type}
                </div>
                <div style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '18px',
                  color: '#8b0000',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: '8px',
                }}>
                  {evidence.value}
                </div>
                <div style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '11px',
                  color: evidence.status === 'CONFIRMED' ? '#006400' : '#666',
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                  {evidence.status}
                </div>
              </div>
              
              {/* Red circle if confirmed */}
              {evidence.status === 'CONFIRMED' && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '140px',
                  height: '140px',
                  border: '3px solid #8b0000',
                  borderRadius: '50%',
                  pointerEvents: 'none',
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Conclusion box */}
        <div style={{
          background: 'rgba(139, 0, 0, 0.1)',
          border: '4px solid #8b0000',
          padding: '25px',
          marginBottom: '30px',
          transform: 'rotate(0.5deg)',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '16px',
            color: '#2a1f1a',
            marginBottom: '15px',
            fontWeight: 'bold',
          }}>
            CONCLUSION:
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            color: '#2a1f1a',
            lineHeight: '1.8',
            marginBottom: '15px',
          }}>
            Based on collected evidence:
            <br />
            • EMF Level 5 (Confirmed)
            <br />
            • Extreme temperature drop (Confirmed)
            <br />
            • Visual manifestation (Confirmed)
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '20px',
            color: '#8b0000',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '20px',
          }}>
            ENTITY TYPE: WRAITH
          </div>
          
          {/* Underline */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '3px',
            background: '#8b0000',
          }} />
        </div>

        {/* Warning note */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          right: '40px',
          width: '160px',
          height: '160px',
          background: '#ffeb3b',
          padding: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          transform: 'rotate(-5deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '13px',
          color: '#1a1a1a',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', color: '#8b0000', textAlign: 'center' }}>
            ⚠ WARNING ⚠
          </div>
          <div style={{ lineHeight: '1.6', fontSize: '11px' }}>
            Wraith confirmed.
            <br /><br />
            Extremely dangerous.
            <br /><br />
            <span style={{ fontWeight: 'bold' }}>DO NOT RETURN</span>
          </div>
        </div>

        {/* Smudge marks */}
        <div style={{
          position: 'absolute',
          top: '100px',
          left: '80px',
          width: '60px',
          height: '30px',
          background: 'rgba(0, 0, 0, 0.15)',
          borderRadius: '50%',
          filter: 'blur(3px)',
          transform: 'rotate(-20deg)',
        }} />
      </div>
    </div>
  );
}
