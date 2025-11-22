// Sketchbook Profile - Investigator's Personal Sketchbook
// Pure visual mockup - no functionality

export function SketchbookProfile() {
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

        {/* Coffee stain */}
        <div style={{
          position: 'absolute',
          top: '60px',
          right: '80px',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(101, 67, 33, 0.3) 0%, rgba(101, 67, 33, 0.1) 50%, transparent 70%)',
          borderRadius: '50%',
        }} />

        {/* Title - pencil sketch */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
          fontFamily: 'Courier New, monospace',
          fontSize: '24px',
          color: '#2a2a2a',
          fontWeight: 'bold',
          position: 'relative',
        }}>
          <div style={{ marginBottom: '10px' }}>
            My Investigation Profile
          </div>
          <div style={{
            width: '200px',
            height: '2px',
            background: '#2a2a2a',
            margin: '0 auto',
            opacity: 0.5,
          }} />
        </div>

        {/* Taped Polaroid */}
        <div style={{
          width: '160px',
          margin: '0 auto 30px',
          position: 'relative',
        }}>
          {/* Tape pieces */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '20px',
            width: '50px',
            height: '18px',
            background: 'rgba(210, 180, 140, 0.6)',
            transform: 'rotate(-5deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }} />
          <div style={{
            position: 'absolute',
            top: '-10px',
            right: '20px',
            width: '50px',
            height: '18px',
            background: 'rgba(210, 180, 140, 0.6)',
            transform: 'rotate(5deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 2,
          }} />
          
          {/* Polaroid */}
          <div style={{
            background: '#fff',
            padding: '12px 12px 40px 12px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.4)',
            transform: 'rotate(-2deg)',
          }}>
            <div style={{
              width: '100%',
              height: '140px',
              background: '#ddd',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
            }}>
              👤
            </div>
            <div style={{
              fontFamily: 'Courier New, monospace',
              fontSize: '11px',
              color: '#666',
              marginTop: '8px',
              textAlign: 'center',
            }}>
              Me - Day 1
            </div>
          </div>
        </div>

        {/* Pencil sketched info */}
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '15px',
          color: '#2a2a2a',
          lineHeight: '2.5',
          marginBottom: '30px',
        }}>
          <div style={{ marginBottom: '10px', transform: 'rotate(-0.2deg)' }}>
            Name: <span style={{ fontWeight: 'bold' }}>Agent_001</span>
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(0.1deg)' }}>
            Started: <span style={{ fontWeight: 'bold' }}>November 2024</span>
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(-0.1deg)' }}>
            Level: <span style={{ fontWeight: 'bold' }}>5</span>
          </div>
          <div style={{ marginBottom: '10px', transform: 'rotate(0.2deg)' }}>
            Cases: <span style={{ fontWeight: 'bold' }}>12</span>
          </div>
        </div>

        {/* Doodle: EMF meter sketch */}
        <div style={{
          position: 'absolute',
          top: '400px',
          right: '60px',
          width: '100px',
          height: '120px',
          border: '2px solid #2a2a2a',
          borderRadius: '8px',
          padding: '10px',
          background: 'rgba(255, 255, 255, 0.5)',
          transform: 'rotate(8deg)',
        }}>
          <div style={{
            fontSize: '10px',
            fontFamily: 'Courier New, monospace',
            color: '#2a2a2a',
            marginBottom: '8px',
            textAlign: 'center',
          }}>
            EMF Meter
          </div>
          <div style={{
            width: '100%',
            height: '40px',
            border: '1px solid #2a2a2a',
            borderRadius: '4px',
            marginBottom: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
          }}>
            📊
          </div>
          <div style={{
            fontSize: '9px',
            fontFamily: 'Courier New, monospace',
            color: '#666',
            textAlign: 'center',
          }}>
            (my favorite tool)
          </div>
        </div>

        {/* Margin notes */}
        <div style={{
          position: 'absolute',
          left: '60px',
          top: '500px',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#666',
          transform: 'rotate(-90deg)',
          transformOrigin: 'left center',
          whiteSpace: 'nowrap',
        }}>
          Remember to check equipment before each case
        </div>

        {/* Stats box - hand drawn */}
        <div style={{
          border: '2px solid #2a2a2a',
          padding: '20px',
          marginBottom: '30px',
          transform: 'rotate(-0.5deg)',
          background: 'rgba(255, 255, 255, 0.3)',
        }}>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            color: '#2a2a2a',
            marginBottom: '15px',
            fontWeight: 'bold',
            textDecoration: 'underline',
          }}>
            My Stats:
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '15px',
            fontFamily: 'Courier New, monospace',
            fontSize: '13px',
            color: '#2a2a2a',
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>12</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Cases</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>8</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Caught</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold' }}>67%</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Success</div>
            </div>
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
          transform: 'rotate(5deg)',
          fontFamily: 'Courier New, monospace',
          fontSize: '12px',
          color: '#1a1a1a',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
            Goals:
          </div>
          <div style={{ lineHeight: '1.6', fontSize: '11px' }}>
            ☐ Reach Level 10
            <br />
            ☐ Catch a Wraith
            <br />
            ☑ Buy new camera
            <br />
            ☐ Document 20 ghosts
          </div>
        </div>

        {/* Doodle: Ghost stick figure */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '80px',
          fontSize: '60px',
          opacity: 0.3,
          transform: 'rotate(-15deg)',
        }}>
          👻
        </div>

        {/* Fingerprint smudge */}
        <div style={{
          position: 'absolute',
          top: '200px',
          left: '120px',
          width: '40px',
          height: '50px',
          background: 'radial-gradient(ellipse, rgba(101, 67, 33, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'rotate(25deg)',
        }} />

        {/* Pencil arrow */}
        <div style={{
          position: 'absolute',
          top: '350px',
          left: '100px',
          fontSize: '30px',
          color: '#2a2a2a',
          opacity: 0.5,
          transform: 'rotate(-45deg)',
        }}>
          ↗
        </div>
      </div>
    </div>
  );
}
