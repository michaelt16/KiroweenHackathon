// Sketchbook Evidence - Collected Proof Sketches
// Pure visual mockup - no functionality

export function SketchbookEvidence() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#2a2520',
      padding: '40px 20px',
    }}>
      {/* Sketchbook Page */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#f5f5f0',
        backgroundImage: `
          repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(150, 150, 150, 0.3) 30px, rgba(150, 150, 150, 0.3) 31px)
        `,
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '900px',
        borderLeft: '40px solid #d4cfc4',
      }}>
        {/* Perforated edge */}
        <div style={{
          position: 'absolute',
          left: '-40px',
          top: 0,
          bottom: 0,
          width: '40px',
          backgroundImage: `
            repeating-linear-gradient(0deg, #8b7355 0px, #8b7355 20px, transparent 20px, transparent 40px)
          `,
        }} />

        {/* Title */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '22px',
          color: '#2a2a2a',
          marginBottom: '30px',
          fontWeight: 'bold',
          textDecoration: 'underline',
          textAlign: 'center',
        }}>
          Evidence Collection
        </div>

        {/* Evidence grid - sketched */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '30px',
          marginBottom: '40px',
        }}>
          {/* EMF Evidence */}
          <div style={{
            border: '2px solid #2a2a2a',
            padding: '20px',
            transform: 'rotate(-1deg)',
            background: 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
          }}>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-5deg)',
              width: '50px',
              height: '16px',
              background: 'rgba(210, 180, 140, 0.6)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 2,
            }} />
            
            {/* Sketched EMF meter */}
            <div style={{
              width: '80px',
              height: '100px',
              border: '2px solid #2a2a2a',
              borderRadius: '8px',
              margin: '0 auto 15px',
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.5)',
            }}>
              <div style={{
                position: 'absolute',
                top: '15px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '50px',
                height: '30px',
                border: '1px solid #2a2a2a',
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '16px',
                fontFamily: 'Courier New, monospace',
                fontWeight: 'bold',
              }}>
                5.0
              </div>
              <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '50%',
                transform: 'translateX(-50%)',
                fontSize: '20px',
              }}>
                📊
              </div>
            </div>
            
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '13px',
              color: '#2a2a2a',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>EMF</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Level 5 detected</div>
            </div>
            
            {/* Checkmark */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '20px',
              color: '#006400',
            }}>
              ✓
            </div>
          </div>

          {/* Temperature Evidence */}
          <div style={{
            border: '2px solid #2a2a2a',
            padding: '20px',
            transform: 'rotate(1deg)',
            background: 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
          }}>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(5deg)',
              width: '50px',
              height: '16px',
              background: 'rgba(210, 180, 140, 0.6)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 2,
            }} />
            
            {/* Sketched thermometer */}
            <div style={{
              width: '40px',
              height: '100px',
              margin: '0 auto 15px',
              position: 'relative',
            }}>
              <div style={{
                width: '20px',
                height: '80px',
                border: '2px solid #2a2a2a',
                borderRadius: '10px 10px 0 0',
                margin: '0 auto',
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.5)',
              }}>
                {/* Mercury */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '8px',
                  height: '60%',
                  background: '#0066cc',
                  borderRadius: '4px 4px 0 0',
                }} />
              </div>
              <div style={{
                width: '30px',
                height: '30px',
                border: '2px solid #2a2a2a',
                borderRadius: '50%',
                margin: '-5px auto 0',
                background: '#0066cc',
              }} />
            </div>
            
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '13px',
              color: '#2a2a2a',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>TEMP</div>
              <div style={{ fontSize: '11px', color: '#666' }}>-15°C drop</div>
            </div>
            
            {/* Checkmark */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '20px',
              color: '#006400',
            }}>
              ✓
            </div>
          </div>

          {/* Audio Evidence */}
          <div style={{
            border: '2px solid #2a2a2a',
            padding: '20px',
            transform: 'rotate(-0.5deg)',
            background: 'rgba(255, 255, 255, 0.3)',
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
              background: 'rgba(210, 180, 140, 0.6)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 2,
            }} />
            
            {/* Sketched waveform */}
            <div style={{
              width: '100%',
              height: '80px',
              margin: '0 auto 15px',
              position: 'relative',
              border: '1px solid #2a2a2a',
              background: 'rgba(255, 255, 255, 0.5)',
            }}>
              <svg style={{ width: '100%', height: '100%' }}>
                <polyline
                  points="0,40 10,30 20,50 30,20 40,60 50,25 60,55 70,30 80,50 90,35 100,45"
                  fill="none"
                  stroke="#2a2a2a"
                  strokeWidth="2"
                />
              </svg>
            </div>
            
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '13px',
              color: '#2a2a2a',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>AUDIO</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Whispers heard</div>
            </div>
            
            {/* Question mark */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '20px',
              color: '#666',
            }}>
              ?
            </div>
          </div>

          {/* Visual Evidence */}
          <div style={{
            border: '2px solid #2a2a2a',
            padding: '20px',
            transform: 'rotate(0.5deg)',
            background: 'rgba(255, 255, 255, 0.3)',
            position: 'relative',
          }}>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(3deg)',
              width: '50px',
              height: '16px',
              background: 'rgba(210, 180, 140, 0.6)',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
              zIndex: 2,
            }} />
            
            {/* Sketched camera */}
            <div style={{
              width: '80px',
              height: '60px',
              border: '2px solid #2a2a2a',
              borderRadius: '8px',
              margin: '0 auto 15px',
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '30px',
                height: '30px',
                border: '2px solid #2a2a2a',
                borderRadius: '50%',
              }} />
              <div style={{
                position: 'absolute',
                top: '5px',
                right: '5px',
                width: '10px',
                height: '10px',
                border: '1px solid #2a2a2a',
                borderRadius: '2px',
              }} />
            </div>
            
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '13px',
              color: '#2a2a2a',
              textAlign: 'center',
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>VISUAL</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Shadow seen</div>
            </div>
            
            {/* Checkmark */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontSize: '20px',
              color: '#006400',
            }}>
              ✓
            </div>
          </div>
        </div>

        {/* Conclusion box */}
        <div style={{
          border: '3px solid #2a2a2a',
          padding: '25px',
          marginBottom: '30px',
          transform: 'rotate(-0.3deg)',
          background: 'rgba(255, 255, 255, 0.5)',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '16px',
            color: '#2a2a2a',
            marginBottom: '15px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            My Conclusion:
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            color: '#2a2a2a',
            lineHeight: '2',
            marginBottom: '15px',
          }}>
            Based on what I found:
            <br />
            ✓ EMF Level 5
            <br />
            ✓ Extreme cold
            <br />
            ? Whispers (unclear)
            <br />
            ✓ Shadow figure
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '20px',
            color: '#2a2a2a',
            fontWeight: 'bold',
            textAlign: 'center',
            marginTop: '20px',
          }}>
            → WRAITH ←
          </div>
          
          {/* Underline */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '150px',
            height: '3px',
            background: '#2a2a2a',
          }} />
        </div>

        {/* Taped Polaroids */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginBottom: '30px',
        }}>
          {[1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '120px',
                position: 'relative',
              }}
            >
              {/* Tape */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: `translateX(-50%) rotate(${i % 2 === 0 ? -5 : 5}deg)`,
                width: '50px',
                height: '16px',
                background: 'rgba(210, 180, 140, 0.6)',
                boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                zIndex: 2,
              }} />
              
              <div style={{
                background: '#fff',
                padding: '8px 8px 30px 8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
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
                  {i === 1 ? '📷' : '👻'}
                </div>
                <div style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '9px',
                  color: '#666',
                  marginTop: '6px',
                  textAlign: 'center',
                }}>
                  Evidence #{i}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sticky note */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '60px',
          width: '140px',
          height: '140px',
          background: '#ff9999',
          padding: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transform: 'rotate(5deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#1a1a1a',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
            ⚠ NOTE ⚠
          </div>
          <div style={{ lineHeight: '1.6', fontSize: '11px' }}>
            This was scary.
            <br /><br />
            Don't want to go back alone.
            <br /><br />
            Need backup!
          </div>
        </div>

        {/* Doodle: Ghost stick figure */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '80px',
          fontSize: '50px',
          opacity: 0.3,
          transform: 'rotate(-15deg)',
        }}>
          👻
        </div>

        {/* Pencil circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          border: '2px solid #2a2a2a',
          borderRadius: '50%',
          opacity: 0.1,
          pointerEvents: 'none',
        }} />
      </div>
    </div>
  );
}
