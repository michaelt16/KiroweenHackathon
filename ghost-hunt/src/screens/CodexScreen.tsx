// Codex screen
const placeholderGhosts = [
  { id: 1, name: 'Poltergeist', discovered: false },
  { id: 2, name: 'Wraith', discovered: false },
  { id: 3, name: 'Phantom', discovered: false },
  { id: 4, name: 'Banshee', discovered: false },
];

export function CodexScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#16213e',
        color: 'white',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h1
          style={{
            fontSize: '32px',
            marginBottom: '24px',
            textAlign: 'center',
            color: '#8b5cf6',
          }}
        >
          📖 Ghost Codex
        </h1>

        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            marginBottom: '24px',
          }}
        >
          <p style={{ fontSize: '48px', marginBottom: '16px' }}>👻</p>
          <p style={{ fontSize: '18px', color: '#999' }}>
            No ghosts discovered yet.
          </p>
          <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
            Complete investigations to add ghosts to your codex!
          </p>
        </div>

        <h2
          style={{
            fontSize: '20px',
            marginBottom: '16px',
            color: '#999',
          }}
        >
          Known Ghost Types
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {placeholderGhosts.map((ghost) => (
            <div
              key={ghost.id}
              style={{
                backgroundColor: 'rgba(255,255,255,0.05)',
                padding: '20px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                border: '2px solid rgba(255,255,255,0.05)',
                opacity: ghost.discovered ? 1 : 0.5,
              }}
            >
              <div
                style={{
                  fontSize: '40px',
                  width: '60px',
                  textAlign: 'center',
                  filter: ghost.discovered ? 'none' : 'brightness(0)',
                }}
              >
                👻
              </div>
              <div style={{ flex: 1 }}>
                <h3
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '18px',
                    color: ghost.discovered ? 'white' : '#666',
                  }}
                >
                  {ghost.discovered ? ghost.name : '???'}
                </h3>
                <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
                  {ghost.discovered ? 'Discovered' : 'Not yet discovered'}
                </p>
              </div>
              {!ghost.discovered && (
                <div
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '6px 12px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#999',
                  }}
                >
                  🔒 Locked
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
