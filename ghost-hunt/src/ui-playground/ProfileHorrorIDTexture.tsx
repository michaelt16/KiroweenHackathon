import idTexture from '../assets/texture/ID.png';
import corkTexture from '../assets/texture/corkboardtexture.png';
import tapeTexture from '../assets/texture/tape.png';
import stickyNote from '../assets/texture/stickynote.png';

// Horror-styled Agent ID using actual texture assets
export function ProfileHorrorIDTexture() {
  const agentData = {
    name: 'AGENT MORRISON',
    id: 'GH-2847',
    level: 12,
    clearance: 'LEVEL 3',
    rank: 'Senior Investigator',
    investigations: 47,
    ghostsCaught: 23,
    successRate: 68,
    sanity: 72,
    experience: 8450,
    nextLevel: 9500
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${corkTexture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        fontFamily: '"Courier New", monospace',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Dark overlay for better contrast */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', paddingTop: '40px' }}>
        
        {/* Pinned Sticky Note - Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '-20px',
            width: '120px',
            height: '120px',
            backgroundImage: `url(${stickyNote})`,
            backgroundSize: 'cover',
            padding: '15px',
            transform: 'rotate(-8deg)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            fontSize: '11px',
            color: '#1a1a1a',
            fontWeight: 'bold',
            lineHeight: '1.3',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          {/* Push pin */}
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              backgroundColor: '#dc2626',
              borderRadius: '50% 50% 50% 0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          />
          ACTIVE CASE
          <br />
          <div style={{ fontSize: '9px', marginTop: '4px' }}>
            Whitmore Estate
            <br />
            Status: ONGOING
          </div>
        </div>

        {/* Main ID Card with Texture */}
        <div
          style={{
            position: 'relative',
            transform: 'rotate(-0.5deg)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)'
          }}
        >
          {/* ID Texture Background */}
          <div
            style={{
              position: 'relative',
              backgroundImage: `url(${idTexture})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              minHeight: '600px',
              padding: '40px 30px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Header Section */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                width: '100%'
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  textShadow: '1px 1px 2px rgba(255, 255, 255, 0.5)'
                }}
              >
                GHOST HUNT
              </div>
              <div
                style={{
                  fontSize: '10px',
                  color: '#333',
                  letterSpacing: '2px',
                  textTransform: 'uppercase'
                }}
              >
                Paranormal Investigation Division
              </div>
            </div>

            {/* Agent Photo/Avatar */}
            <div
              style={{
                width: '120px',
                height: '140px',
                margin: '0 auto 15px',
                backgroundColor: '#1a1a1a',
                border: '3px solid #333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
              }}
            >
              🕵️
            </div>

            {/* Agent Name */}
            <div
              style={{
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: '6px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                textShadow: '1px 1px 2px rgba(255, 255, 255, 0.3)'
              }}
            >
              {agentData.name}
            </div>

            {/* Agent ID */}
            <div
              style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#333',
                marginBottom: '15px',
                fontFamily: '"Courier New", monospace'
              }}
            >
              ID: {agentData.id}
            </div>

            {/* Clearance Badge */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '15px'
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  backgroundColor: 'rgba(220, 38, 38, 0.9)',
                  color: '#fff',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  borderRadius: '3px',
                  transform: 'rotate(-2deg)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  border: '2px solid rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.4)'
                }}
              >
                {agentData.clearance} - RESTRICTED
              </div>
            </div>

            {/* Rank */}
            <div
              style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#1a1a1a',
                marginBottom: '20px',
                fontWeight: 'bold'
              }}
            >
              {agentData.rank}
            </div>

            {/* Level & XP */}
            <div
              style={{
                width: '100%',
                maxWidth: '300px',
                marginBottom: '15px',
                padding: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '6px',
                border: '2px solid #333'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '6px'
                }}
              >
                <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  LEVEL {agentData.level}
                </span>
                <span style={{ fontSize: '11px', color: '#333' }}>
                  {agentData.experience} / {agentData.nextLevel} XP
                </span>
              </div>
              {/* XP Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '10px',
                  backgroundColor: '#ccc',
                  borderRadius: '5px',
                  overflow: 'hidden',
                  border: '1px solid #333'
                }}
              >
                <div
                  style={{
                    width: `${(agentData.experience / agentData.nextLevel) * 100}%`,
                    height: '100%',
                    backgroundColor: '#8B4513',
                    backgroundImage: 'linear-gradient(90deg, #8B4513 0%, #A0522D 100%)'
                  }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                width: '100%',
                maxWidth: '300px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px'
              }}
            >
              {/* Investigations */}
              <div
                style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {agentData.investigations}
                </div>
                <div style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase' }}>
                  Cases
                </div>
              </div>

              {/* Ghosts Caught */}
              <div
                style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {agentData.ghostsCaught}
                </div>
                <div style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase' }}>
                  Caught
                </div>
              </div>

              {/* Success Rate */}
              <div
                style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '2px solid #333',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#1a1a1a' }}>
                  {agentData.successRate}%
                </div>
                <div style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase' }}>
                  Success
                </div>
              </div>

              {/* Sanity */}
              <div
                style={{
                  padding: '10px',
                  backgroundColor: agentData.sanity < 50 ? 'rgba(220, 38, 38, 0.3)' : 'rgba(255, 255, 255, 0.8)',
                  border: `2px solid ${agentData.sanity < 50 ? '#dc2626' : '#333'}`,
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: agentData.sanity < 50 ? '#dc2626' : '#1a1a1a'
                  }}
                >
                  {agentData.sanity}%
                </div>
                <div style={{ fontSize: '10px', color: '#333', textTransform: 'uppercase' }}>
                  Sanity
                </div>
              </div>
            </div>
          </div>

          {/* Tape Pieces on ID Card */}
          <div
            style={{
              position: 'absolute',
              top: '-10px',
              left: '40px',
              width: '60px',
              height: '30px',
              backgroundImage: `url(${tapeTexture})`,
              backgroundSize: 'cover',
              transform: 'rotate(-8deg)',
              opacity: 0.9,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '-10px',
              right: '40px',
              width: '60px',
              height: '30px',
              backgroundImage: `url(${tapeTexture})`,
              backgroundSize: 'cover',
              transform: 'rotate(12deg)',
              opacity: 0.9,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />
        </div>

        {/* Warning Note - Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%) rotate(2deg)',
            width: '200px',
            padding: '15px',
            backgroundImage: `url(${stickyNote})`,
            backgroundSize: 'cover',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            fontSize: '11px',
            color: '#1a1a1a',
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          {/* Push pin */}
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '12px',
              height: '12px',
              backgroundColor: '#dc2626',
              borderRadius: '50% 50% 50% 0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
            }}
          />
          ⚠️ REMINDER ⚠️
          <br />
          <div style={{ fontSize: '9px', marginTop: '6px' }}>
            Always check equipment
            <br />
            before entering hotspots
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHorrorIDTexture;
