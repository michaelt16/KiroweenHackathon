// Inventory screen
import { useGameState } from '../context/GameStateContext';

const toolIcons: Record<string, string> = {
  EMF: '📡',
  SpiritBox: '📻',
  ThermalCam: '📷',
  Salt: '🧂',
};

export function InventoryScreen() {
  const { inventory } = useGameState();

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#1a1a2e',
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
            color: '#f59e0b',
          }}
        >
          🎒 Inventory
        </h1>

        {inventory.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '12px',
            }}
          >
            <p style={{ fontSize: '48px', marginBottom: '16px' }}>📦</p>
            <p style={{ fontSize: '18px', color: '#999' }}>
              No tools collected yet.
            </p>
            <p style={{ fontSize: '14px', color: '#666', marginTop: '8px' }}>
              Explore the map and collect ghost-hunting tools!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {inventory.map((item) => (
              <div
                key={item.type}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  padding: '20px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  border: '2px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.borderColor = 'rgba(245,158,11,0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    width: '60px',
                    textAlign: 'center',
                  }}
                >
                  {toolIcons[item.type] || '🔧'}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: '0 0 4px 0', fontSize: '20px' }}>
                    {item.type}
                  </h3>
                  <p style={{ margin: 0, color: '#999', fontSize: '14px' }}>
                    Ghost hunting tool
                  </p>
                </div>
                <div
                  style={{
                    backgroundColor: '#f59e0b',
                    color: '#1a1a2e',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontWeight: 'bold',
                    fontSize: '18px',
                  }}
                >
                  ×{item.quantity}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
