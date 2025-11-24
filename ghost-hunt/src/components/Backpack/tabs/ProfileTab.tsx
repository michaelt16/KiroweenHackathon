import React from 'react';

interface ProfileData {
  agentName: string;
  level: number;
  xp: number;
  xpToNext: number;
  investigationsCompleted: number;
  ghostsCaught: number;
  successRate: number;
  rank: string;
}

interface ProfileTabProps {
  profile?: ProfileData;
}

const DEFAULT_PROFILE: ProfileData = {
  agentName: 'AGENT-7B',
  level: 12,
  xp: 2450,
  xpToNext: 3000,
  investigationsCompleted: 47,
  ghostsCaught: 38,
  successRate: 81,
  rank: 'INVESTIGATOR',
};

const ProfileTab: React.FC<ProfileTabProps> = ({
  profile = DEFAULT_PROFILE,
}) => {
  const xpPercentage = (profile.xp / profile.xpToNext) * 100;

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1a0f0a',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          borderBottom: '2px solid rgba(139, 69, 19, 0.4)',
          paddingBottom: '8px',
        }}
      >
        🆔 AGENT PROFILE
      </div>

      {/* ID Card */}
      <div
        style={{
          background: '#e8e4dc',
          border: '3px solid rgba(139, 69, 19, 0.5)',
          borderRadius: '8px',
          padding: '20px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {/* Texture overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
          }}
        />

        {/* Stamp */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            padding: '6px 12px',
            border: '3px solid rgba(139, 0, 0, 0.6)',
            borderRadius: '4px',
            fontFamily: 'Impact, sans-serif',
            fontSize: '14px',
            color: 'rgba(139, 0, 0, 0.6)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transform: 'rotate(12deg)',
            opacity: 0.7,
          }}
        >
          ACTIVE
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Agent Name */}
          <div
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#1a0f0a',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {profile.agentName}
          </div>

          {/* Rank */}
          <div
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '13px',
              color: '#8b7355',
              marginBottom: '16px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            RANK: {profile.rank}
          </div>

          {/* Level and XP */}
          <div style={{ marginBottom: '12px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '6px',
              }}
            >
              <span
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#1a0f0a',
                }}
              >
                LEVEL {profile.level}
              </span>
              <span
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  color: '#4a3a2a',
                }}
              >
                {profile.xp} / {profile.xpToNext} XP
              </span>
            </div>

            {/* XP Bar */}
            <div
              style={{
                width: '100%',
                height: '12px',
                background: 'rgba(139, 69, 19, 0.2)',
                borderRadius: '6px',
                overflow: 'hidden',
                border: '1px solid rgba(139, 69, 19, 0.4)',
              }}
            >
              <div
                style={{
                  width: `${xpPercentage}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #8b7355 0%, #6b5230 100%)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '12px',
        }}
      >
        <div
          style={{
            padding: '16px',
            background: '#e8e4dc',
            border: '2px solid rgba(139, 69, 19, 0.3)',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1a0f0a',
              marginBottom: '4px',
            }}
          >
            {profile.investigationsCompleted}
          </div>
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '13px',
              color: '#4a3a2a',
            }}
          >
            Investigations
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            background: '#e8e4dc',
            border: '2px solid rgba(139, 69, 19, 0.3)',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#1a0f0a',
              marginBottom: '4px',
            }}
          >
            {profile.ghostsCaught}
          </div>
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '13px',
              color: '#4a3a2a',
            }}
          >
            Ghosts Caught
          </div>
        </div>

        <div
          style={{
            padding: '16px',
            background: '#e8e4dc',
            border: '2px solid rgba(139, 69, 19, 0.3)',
            borderRadius: '6px',
            textAlign: 'center',
            gridColumn: 'span 2',
          }}
        >
          <div
            style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '24px',
              fontWeight: 'bold',
              color: profile.successRate >= 80 ? '#8b7355' : profile.successRate >= 60 ? '#ff8800' : '#cc0000',
              marginBottom: '4px',
            }}
          >
            {profile.successRate}%
          </div>
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '13px',
              color: '#4a3a2a',
            }}
          >
            Success Rate
          </div>
        </div>
      </div>

      {/* Handwritten note */}
      <div
        style={{
          marginTop: '8px',
          padding: '12px',
          background: 'rgba(139, 115, 85, 0.1)',
          borderRadius: '4px',
          transform: 'rotate(0.3deg)',
        }}
      >
        <div
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '14px',
            color: '#4a3a2a',
            lineHeight: '1.6',
            textAlign: 'center',
          }}
        >
          Keep investigating to level up and unlock new abilities
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
