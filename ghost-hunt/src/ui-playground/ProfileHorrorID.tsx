import React from 'react';

// Horror-styled Agent ID Profile with cork board background
export function ProfileHorrorID() {
  const agentData = {
    name: 'AGENT MORRISON',
    id: 'GH-2847',
    level: 12,
    clearance: 'LEVEL 3 - RESTRICTED',
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
        backgroundColor: '#3d2f24',
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 3px,
            transparent 4px,
            transparent 8px
          ),
          repeating-linear-gradient(
            90deg,
            transparent 0px,
            transparent 2px,
            rgba(0, 0, 0, 0.1) 3px,
            transparent 4px,
            transparent 8px
          ),
          radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 80% 70%, rgba(92, 51, 23, 0.15) 0%, transparent 40%)
        `,
        backgroundSize: '8px 8px, 8px 8px, 100% 100%, 100% 100%',
        padding: '20px',
        fontFamily: '"Courier New", monospace',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Cork board texture overlay */}
      <div
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          backgroundImage: `
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.15"/></svg>')
          `,
          pointerEvents: 'none',
          opacity: 0.6
        }}
      />

      <div style={{ maxWidth: '500px', margin: '0 auto', position: 'relative', paddingTop: '40px' }}>
        
        {/* Pinned Notes - Top Left */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '-20px',
            width: '100px',
            height: '100px',
            backgroundColor: '#ffeb3b',
            padding: '12px',
            transform: 'rotate(-8deg)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
            fontSize: '11px',
            color: '#1a1a1a',
            fontWeight: 'bold',
            lineHeight: '1.3'
          }}
        >
          {/* Push pin */}
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              backgroundColor: '#dc2626',
              borderRadius: '50% 50% 50% 0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              transform: 'translateX(-50%) rotate(45deg)'
            }}
          />
          ACTIVE CASE
          <br />
          <div style={{ fontSize: '9px', marginTop: '4px', color: '#8B4513' }}>
            Whitmore Estate
            <br />
            Status: ONGOING
          </div>
        </div>

        {/* Pinned Photo - Top Right */}
        <div
          style={{
            position: 'absolute',
            top: '30px',
            right: '-30px',
            width: '90px',
            height: '110px',
            backgroundColor: '#e8e4dc',
            padding: '6px 6px 16px 6px',
            transform: 'rotate(12deg)',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.5)',
            border: '1px solid #d0ccc4'
          }}
        >
          {/* Push pin */}
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              backgroundColor: '#dc2626',
              borderRadius: '50% 50% 50% 0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              transform: 'translateX(-50%) rotate(45deg)'
            }}
          />
          <div
            style={{
              width: '100%',
              height: '70px',
              backgroundColor: '#1a1a1a',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}
          >
            👻
          </div>
          <div
            style={{
              textAlign: 'center',
              marginTop: '4px',
              fontSize: '8px',
              color: '#1a1a1a',
              fontFamily: '"Courier New", monospace'
            }}
          >
            Last Encounter
          </div>
        </div>

        {/* Main ID Card */}
        <div
          style={{
            backgroundColor: '#2d2419',
            border: '4px solid #1a1410',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: `
              0 20px 60px rgba(0, 0, 0, 0.8),
              inset 0 1px 0 rgba(255, 255, 255, 0.1)
            `,
            position: 'relative',
            transform: 'rotate(-0.5deg)'
          }}
        >
          {/* ID Card Inner */}
          <div
            style={{
              backgroundColor: '#f4f0e6',
              backgroundImage: `
                repeating-linear-gradient(
                  0deg,
                  transparent 0px,
                  transparent 27px,
                  rgba(139, 69, 19, 0.1) 28px,
                  rgba(139, 69, 19, 0.1) 29px
                ),
                radial-gradient(circle at 70% 20%, rgba(139, 69, 19, 0.08) 0%, transparent 40%)
              `,
              border: '3px solid #8B4513',
              borderRadius: '8px',
              padding: '25px',
              position: 'relative',
              boxShadow: 'inset 0 0 20px rgba(0, 0, 0, 0.1)'
            }}
          >
            {/* Header Stamp */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '20px',
                paddingBottom: '15px',
                borderBottom: '2px solid #8B4513'
              }}
            >
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#8B0000',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  marginBottom: '4px',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                GHOST HUNT
              </div>
              <div
                style={{
                  fontSize: '11px',
                  color: '#8B4513',
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
                margin: '0 auto 20px',
                backgroundColor: '#1a1a1a',
                border: '3px solid #8B4513',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px',
                position: 'relative',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)'
              }}
            >
              🕵️
              {/* Photo corner damage */}
              <div
                style={{
                  position: 'absolute',
                  top: '5px',
                  right: '5px',
                  width: '20px',
                  height: '20px',
                  backgroundColor: 'rgba(139, 0, 0, 0.3)',
                  borderRadius: '0 0 0 100%',
                  mixBlendMode: 'multiply'
                }}
              />
            </div>

            {/* Agent Name */}
            <div
              style={{
                textAlign: 'center',
                fontSize: '20px',
                fontWeight: 'bold',
                color: '#2d1810',
                marginBottom: '8px',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}
            >
              {agentData.name}
            </div>

            {/* Agent ID */}
            <div
              style={{
                textAlign: 'center',
                fontSize: '14px',
                color: '#8B4513',
                marginBottom: '20px',
                fontFamily: '"Courier New", monospace'
              }}
            >
              ID: {agentData.id}
            </div>

            {/* Clearance Stamp */}
            <div
              style={{
                textAlign: 'center',
                marginBottom: '20px'
              }}
            >
              <div
                style={{
                  display: 'inline-block',
                  padding: '8px 20px',
                  backgroundColor: 'rgba(220, 38, 38, 0.9)',
                  color: '#fff',
                  fontSize: '12px',
                  fontWeight: 'bold',
                  borderRadius: '4px',
                  transform: 'rotate(-2deg)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  border: '2px solid rgba(0, 0, 0, 0.3)',
                  boxShadow: '0 3px 8px rgba(0, 0, 0, 0.4)'
                }}
              >
                {agentData.clearance}
              </div>
            </div>

            {/* Rank */}
            <div
              style={{
                textAlign: 'center',
                fontSize: '16px',
                color: '#2d1810',
                marginBottom: '25px',
                fontWeight: 'bold'
              }}
            >
              {agentData.rank}
            </div>

            {/* Level & XP Bar */}
            <div
              style={{
                marginBottom: '20px',
                padding: '15px',
                backgroundColor: 'rgba(139, 69, 19, 0.1)',
                borderRadius: '6px',
                border: '2px solid #d4c4a8'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '8px'
                }}
              >
                <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#2d1810' }}>
                  LEVEL {agentData.level}
                </span>
                <span style={{ fontSize: '12px', color: '#8B4513' }}>
                  {agentData.experience} / {agentData.nextLevel} XP
                </span>
              </div>
              {/* XP Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '12px',
                  backgroundColor: '#d4c4a8',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  border: '1px solid #8B4513'
                }}
              >
                <div
                  style={{
                    width: `${(agentData.experience / agentData.nextLevel) * 100}%`,
                    height: '100%',
                    backgroundColor: '#8B4513',
                    backgroundImage: 'linear-gradient(90deg, #8B4513 0%, #A0522D 100%)',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                marginBottom: '15px'
              }}
            >
              {/* Investigations */}
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: '2px solid #d4c4a8',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d1810' }}>
                  {agentData.investigations}
                </div>
                <div style={{ fontSize: '11px', color: '#8B4513', textTransform: 'uppercase' }}>
                  Investigations
                </div>
              </div>

              {/* Ghosts Caught */}
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: '2px solid #d4c4a8',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d1810' }}>
                  {agentData.ghostsCaught}
                </div>
                <div style={{ fontSize: '11px', color: '#8B4513', textTransform: 'uppercase' }}>
                  Ghosts Caught
                </div>
              </div>

              {/* Success Rate */}
              <div
                style={{
                  padding: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  border: '2px solid #d4c4a8',
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2d1810' }}>
                  {agentData.successRate}%
                </div>
                <div style={{ fontSize: '11px', color: '#8B4513', textTransform: 'uppercase' }}>
                  Success Rate
                </div>
              </div>

              {/* Sanity */}
              <div
                style={{
                  padding: '12px',
                  backgroundColor: agentData.sanity < 50 ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255, 255, 255, 0.5)',
                  border: `2px solid ${agentData.sanity < 50 ? '#dc2626' : '#d4c4a8'}`,
                  borderRadius: '4px',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: agentData.sanity < 50 ? '#dc2626' : '#2d1810'
                  }}
                >
                  {agentData.sanity}%
                </div>
                <div style={{ fontSize: '11px', color: '#8B4513', textTransform: 'uppercase' }}>
                  Sanity
                </div>
              </div>
            </div>

            {/* Water stain damage */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                right: '20px',
                width: '60px',
                height: '60px',
                backgroundColor: 'rgba(139, 69, 19, 0.2)',
                borderRadius: '50% 30% 70% 40%',
                transform: 'rotate(25deg)',
                filter: 'blur(2px)',
                mixBlendMode: 'multiply'
              }}
            />

            {/* Signature line */}
            <div
              style={{
                marginTop: '20px',
                paddingTop: '15px',
                borderTop: '2px solid #8B4513',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div style={{ fontSize: '10px', color: '#8B4513' }}>
                AUTHORIZED SIGNATURE
              </div>
              <div
                style={{
                  fontSize: '18px',
                  fontStyle: 'italic',
                  color: '#2d1810',
                  fontFamily: 'cursive'
                }}
              >
                A. Morrison
              </div>
            </div>
          </div>

          {/* Tape corners on ID card */}
          <div
            style={{
              position: 'absolute',
              top: '-8px',
              left: '40px',
              width: '50px',
              height: '25px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backgroundImage: `
                linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)
              `,
              backgroundSize: '4px 4px',
              transform: 'rotate(-8deg)',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: '-8px',
              right: '40px',
              width: '50px',
              height: '25px',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backgroundImage: `
                linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)
              `,
              backgroundSize: '4px 4px',
              transform: 'rotate(12deg)',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />
        </div>

        {/* Pinned Warning Note - Bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '50%',
            transform: 'translateX(-50%) rotate(2deg)',
            width: '200px',
            padding: '15px',
            backgroundColor: '#fef3c7',
            border: '2px solid #f59e0b',
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
              transform: 'translateX(-50%)',
              width: '12px',
              height: '12px',
              backgroundColor: '#dc2626',
              borderRadius: '50% 50% 50% 0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              transform: 'translateX(-50%) rotate(45deg)'
            }}
          />
          ⚠️ REMINDER ⚠️
          <br />
          <div style={{ fontSize: '9px', marginTop: '6px', color: '#8B4513' }}>
            Always check equipment
            <br />
            before entering hotspots
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHorrorID;
