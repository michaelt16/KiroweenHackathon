// Sketchbook Field Notes - Investigation Observations
// Pure visual mockup - no functionality

export function SketchbookFieldNotes() {
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
        }}>
          Field Notes - Whitmore Case
        </div>

        {/* Date */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '13px',
          color: '#666',
          marginBottom: '30px',
        }}>
          Date: November 13, 2024
        </div>

        {/* Sketched radar diagram */}
        <div style={{
          float: 'right',
          width: '180px',
          height: '180px',
          margin: '0 0 20px 20px',
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
            background: 'rgba(210, 180, 140, 0.6)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }} />
          
          {/* Hand-drawn radar */}
          <div style={{
            width: '100%',
            height: '100%',
            border: '2px solid #2a2a2a',
            borderRadius: '50%',
            position: 'relative',
            background: 'rgba(255, 255, 255, 0.5)',
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
                  border: '1px solid #2a2a2a',
                  borderRadius: '50%',
                  opacity: 0.5,
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
              background: '#2a2a2a',
              borderRadius: '50%',
            }} />
            
            {/* Ghost mark */}
            <div style={{
              position: 'absolute',
              top: '30%',
              right: '30%',
              fontSize: '20px',
            }}>
              ✗
            </div>
            
            {/* Label */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: 'Courier New, monospace',
              fontSize: '10px',
              color: '#2a2a2a',
            }}>
              Radar Sketch
            </div>
          </div>
        </div>

        {/* Observations */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '14px',
          color: '#2a2a2a',
          lineHeight: '2.5',
          marginBottom: '30px',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>
            Observations:
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(-0.1deg)' }}>
            • Arrived at 23:30
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(0.2deg)' }}>
            • Temperature: 18°C outside
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(-0.2deg)' }}>
            • EMF baseline: 0.2 mG
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(0.1deg)' }}>
            • House is very quiet
          </div>
        </div>

        {/* Sketched EMF reading */}
        <div style={{
          border: '2px solid #2a2a2a',
          padding: '15px',
          marginBottom: '30px',
          transform: 'rotate(-0.5deg)',
          background: 'rgba(255, 255, 255, 0.3)',
          position: 'relative',
        }}>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '13px',
            color: '#2a2a2a',
            marginBottom: '10px',
            fontWeight: 'bold',
          }}>
            EMF Reading - 2nd Floor:
          </div>
          
          {/* Hand-drawn graph */}
          <div style={{
            width: '100%',
            height: '80px',
            position: 'relative',
            borderBottom: '2px solid #2a2a2a',
            borderLeft: '2px solid #2a2a2a',
            marginBottom: '10px',
          }}>
            {/* Graph line */}
            <svg style={{ width: '100%', height: '100%', position: 'absolute' }}>
              <polyline
                points="0,70 50,65 100,40 150,20 200,15 250,18 300,25"
                fill="none"
                stroke="#2a2a2a"
                strokeWidth="2"
              />
            </svg>
            
            {/* Peak marker */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '200px',
              fontSize: '20px',
              color: '#8b0000',
            }}>
              ↑
            </div>
          </div>
          
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '12px',
            color: '#666',
          }}>
            Peak: 5.0 mG at 23:47
          </div>
        </div>

        {/* Taped Polaroid */}
        <div style={{
          width: '140px',
          margin: '0 0 30px 0',
          position: 'relative',
          display: 'inline-block',
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
          
          <div style={{
            background: '#fff',
            padding: '10px 10px 35px 10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            transform: 'rotate(-3deg)',
          }}>
            <div style={{
              width: '100%',
              height: '110px',
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
              color: '#666',
              marginTop: '6px',
              textAlign: 'center',
            }}>
              Hallway - 23:47
            </div>
          </div>
          
          {/* Arrow pointing to it */}
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            right: '-40px',
            fontSize: '25px',
            color: '#2a2a2a',
            transform: 'rotate(45deg)',
          }}>
            →
          </div>
        </div>

        {/* More notes */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '14px',
          color: '#2a2a2a',
          lineHeight: '2.5',
          marginBottom: '30px',
          marginTop: '50px',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px' }}>
            What happened:
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(-0.1deg)' }}>
            1. Heard footsteps upstairs
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(0.1deg)' }}>
            2. Temperature dropped suddenly
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(-0.2deg)' }}>
            3. EMF spiked to 5.0
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(0.2deg)' }}>
            4. Took photo - nothing visible
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(-0.1deg)', color: '#8b0000', fontWeight: 'bold' }}>
            5. Felt like being watched
          </div>
        </div>

        {/* Sticky note */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '60px',
          width: '140px',
          height: '140px',
          background: '#ffeb3b',
          padding: '15px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          transform: 'rotate(-5deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#1a1a1a',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            REMEMBER:
          </div>
          <div style={{ lineHeight: '1.6', fontSize: '11px' }}>
            • Bring backup next time
            <br />
            • Check batteries
            <br />
            • Don't go alone!
            <br />
            • Trust your instincts
          </div>
        </div>

        {/* Doodle: Temperature icon */}
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '80px',
          fontSize: '50px',
          opacity: 0.3,
        }}>
          🌡️
        </div>

        {/* Margin scribble */}
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '300px',
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          color: '#666',
          transform: 'rotate(90deg)',
          transformOrigin: 'right center',
          whiteSpace: 'nowrap',
        }}>
          Something is definitely here
        </div>

        {/* Coffee ring */}
        <div style={{
          position: 'absolute',
          top: '150px',
          right: '100px',
          width: '80px',
          height: '80px',
          border: '3px solid rgba(101, 67, 33, 0.3)',
          borderRadius: '50%',
        }} />
      </div>
    </div>
  );
}
