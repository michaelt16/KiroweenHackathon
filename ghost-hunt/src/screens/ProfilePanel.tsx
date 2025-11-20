// Profile panel
export function ProfilePanel() {
  const level = 1;
  const currentXP = 30;
  const maxXP = 100;
  const xpPercentage = (currentXP / maxXP) * 100;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0f172a',
        color: 'white',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '32px',
            marginBottom: '32px',
            textAlign: 'center',
            color: '#6b46c1',
          }}
        >
          👤 Profile
        </h1>

        {/* Avatar Section */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              backgroundColor: '#6b46c1',
              border: '4px solid white',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
              margin: '0 auto 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '64px',
            }}
          >
            👤
          </div>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>
            Ghost Hunter
          </h2>
          <p style={{ margin: 0, color: '#999', fontSize: '14px' }}>
            Paranormal Investigator
          </p>
        </div>

        {/* Stats Section */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '24px',
            borderRadius: '12px',
            marginBottom: '24px',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '16px',
            }}
          >
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>
              Level {level}
            </span>
            <span style={{ color: '#999' }}>
              {currentXP} / {maxXP} XP
            </span>
          </div>

          {/* XP Bar */}
          <div
            style={{
              width: '100%',
              height: '12px',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '6px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${xpPercentage}%`,
                height: '100%',
                backgroundColor: '#4ade80',
                transition: 'width 0.3s',
                boxShadow: '0 0 10px rgba(74,222,128,0.5)',
              }}
            />
          </div>
        </div>

        {/* Achievements Section */}
        <div
          style={{
            backgroundColor: 'rgba(255,255,255,0.05)',
            padding: '24px',
            borderRadius: '12px',
          }}
        >
          <h3 style={{ margin: '0 0 16px 0', fontSize: '20px' }}>
            🏆 Achievements
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
              }}
            >
              <span style={{ fontSize: '32px' }}>🎮</span>
              <div>
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                  First Steps
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#999' }}>
                  Started your ghost hunting journey
                </p>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                borderRadius: '8px',
                opacity: 0.4,
              }}
            >
              <span style={{ fontSize: '32px', filter: 'grayscale(1)' }}>
                🔍
              </span>
              <div>
                <p style={{ margin: '0 0 4px 0', fontWeight: 'bold' }}>
                  First Investigation
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  Complete your first case
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
