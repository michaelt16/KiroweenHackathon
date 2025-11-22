// Profile Panel - ID Badge on Cork Board
// ID card in center with info on sticky notes around it

import corkboardtexture from '../assets/texture/corkboardtexture.png';
import idCard from '../assets/texture/ID.png';
import stickynote from '../assets/texture/stickynote.png';
import tape from '../assets/texture/tape.png';
import dust from '../assets/texture/dust.png';

export function ProfilePanelHorror() {
  // Mock data - replace with actual game state
  const agentName = 'Agent M.';
  const level = 5;
  const caseNumber = 'PDB-2024-047';
  const investigations = 12;
  const ghostsCaught = 8;
  const successRate = 87;

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0d0a08',
        padding: '20px',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      {/* Cork Board Background */}
      <div
        style={{
          maxWidth: '500px',
          margin: '0 auto',
          minHeight: '90vh',
          background: '#8b7355',
          borderRadius: '8px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
          padding: '40px 20px',
          position: 'relative',
        }}
      >
        {/* Cork texture */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${corkboardtexture})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.9,
            pointerEvents: 'none',
            borderRadius: '8px',
          }}
        />

        {/* Dust overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.2,
            pointerEvents: 'none',
          }}
        />

        {/* Content layer */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* ID CARD IN CENTER */}
          <div
            style={{
              position: 'relative',
              width: '280px',
              margin: '0 auto 30px',
              transform: 'rotate(-1deg)',
            }}
          >
            {/* Tape at top */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%) rotate(-5deg)',
                width: '100px',
                height: '30px',
                backgroundImage: `url(${tape})`,
                backgroundSize: 'cover',
                zIndex: 2,
              }}
            />

            {/* ID Card Image */}
            <div
              style={{
                width: '100%',
                boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
              }}
            >
              <img
                src={idCard}
                alt="Agent ID Card"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>
          </div>

          {/* Sticky Note - Agent Name */}
          <div
            style={{
              position: 'relative',
              width: '200px',
              margin: '0 auto 20px',
              transform: 'rotate(2deg)',
            }}
          >
            {/* Pushpin */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '16px',
                background: '#dc2626',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            />

            <div
              style={{
                backgroundImage: `url(${stickynote})`,
                backgroundSize: 'cover',
                padding: '20px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                minHeight: '120px',
              }}
            >
              <div
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '18px',
                  color: '#1a1a1a',
                  marginBottom: '8px',
                }}
              >
                Agent:
              </div>
              <div
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '32px',
                  color: '#1a0f0a',
                  fontWeight: 'bold',
                  transform: 'rotate(-1deg) translateX(-0.5px)',
                }}
              >
                {agentName}
              </div>
            </div>
          </div>

          {/* Sticky Note - Level */}
          <div
            style={{
              position: 'relative',
              width: '180px',
              margin: '0 auto 20px',
              transform: 'rotate(-3deg)',
            }}
          >
            {/* Pushpin */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '16px',
                background: '#3b82f6',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            />

            <div
              style={{
                backgroundImage: `url(${stickynote})`,
                backgroundSize: 'cover',
                padding: '20px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                minHeight: '100px',
              }}
            >
              <div
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '18px',
                  color: '#1a1a1a',
                  marginBottom: '8px',
                }}
              >
                Clearance Level:
              </div>
              <div
                style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '48px',
                  color: '#8b0000',
                  fontWeight: 'bold',
                  textShadow: '2.5px 2.5px 5px rgba(139,0,0,0.6)',
                  transform: 'rotate(-2deg) translateX(0.8px)',
                }}
              >
                {level}
              </div>
            </div>
          </div>

          {/* Index Card - Stats */}
          <div
            style={{
              position: 'relative',
              width: '260px',
              margin: '0 auto 20px',
              transform: 'rotate(1deg)',
            }}
          >
            {/* Pushpin */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '16px',
                height: '16px',
                background: '#fbbf24',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                zIndex: 2,
              }}
            />

            <div
              style={{
                background: '#f5f1e8',
                padding: '20px',
                boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
                border: '1px solid #d4cfc4',
              }}
            >
              <div
                style={{
                  fontFamily: 'Courier New, monospace',
                  fontSize: '14px',
                  color: '#1a0f0a',
                  lineHeight: '1.8',
                }}
              >
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>INVESTIGATIONS:</span>{' '}
                  <span style={{ fontWeight: 'bold' }}>{investigations}</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>ENTITIES:</span>{' '}
                  <span style={{ fontWeight: 'bold' }}>{ghostsCaught}</span>
                </div>
                <div style={{ marginBottom: '8px' }}>
                  <span style={{ color: '#666' }}>SUCCESS RATE:</span>{' '}
                  <span
                    style={{
                      fontWeight: 'bold',
                      color: successRate >= 80 ? '#16a34a' : successRate >= 50 ? '#f59e0b' : '#dc2626',
                    }}
                  >
                    {successRate}%
                  </span>
                </div>
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #d4cfc4' }}>
                  <span style={{ color: '#666', fontSize: '12px' }}>CASE NO:</span>{' '}
                  <span style={{ fontSize: '12px' }}>{caseNumber}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Classified Stamp */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '30px',
              transform: 'rotate(-15deg)',
              border: '4px solid #8b0000',
              padding: '8px 16px',
              fontFamily: 'Impact, sans-serif',
              fontSize: '20px',
              color: '#8b0000',
              letterSpacing: '3px',
              opacity: 0.7,
            }}
          >
            CLASSIFIED
          </div>

          {/* Fingerprint */}
          <div
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '40px',
              width: '60px',
              height: '80px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
              transform: 'rotate(25deg)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* Back Button */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          onClick={() => (window.location.href = '/')}
          style={{
            background: 'rgba(45, 212, 191, 0.1)',
            border: '2px solid #2dd4bf',
            color: '#2dd4bf',
            padding: '12px 24px',
            borderRadius: '4px',
            fontFamily: 'Courier New, monospace',
            fontSize: '14px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          ← BACK TO MAP
        </button>
      </div>
    </div>
  );
}
