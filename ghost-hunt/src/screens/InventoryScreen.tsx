// Field Kit screen - displays supplies for investigations
import { useSupplies } from '../context/SuppliesContext';

export function InventoryScreen() {
  const { supplies } = useSupplies();

  const supplyItems = [
    {
      icon: '🎞️',
      label: 'Film',
      count: supplies.film,
      color: '#3b82f6',
      description: 'Camera flash ammo',
    },
    {
      icon: '⚡',
      label: 'Scanner Boosts',
      count: supplies.boosts,
      color: '#f59e0b',
      description: 'Enhances evidence clarity',
    },
    {
      icon: '🔮',
      label: 'Charms',
      count: supplies.charms,
      color: '#a855f7',
      description: 'Protects sanity',
    },
  ];

  const totalSupplies = supplies.film + supplies.boosts + supplies.charms;

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0b0f1a',
        color: 'white',
        padding: '20px',
      }}
    >
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: 'clamp(28px, 6vw, 36px)',
              marginBottom: '8px',
              background: 'linear-gradient(135deg, #2dd4bf 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            🎒 Field Kit
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '14px' }}>
            Supplies for paranormal investigations
          </p>
        </div>

        {/* Supply Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {supplyItems.map((item) => {
            const isEmpty = item.count === 0;
            
            return (
              <div
                key={item.label}
                style={{
                  background: isEmpty
                    ? 'rgba(255, 255, 255, 0.03)'
                    : 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: 'blur(10px)',
                  padding: '24px',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  border: isEmpty
                    ? '2px solid rgba(255, 255, 255, 0.05)'
                    : `2px solid ${item.color}40`,
                  transition: 'all 0.3s',
                  opacity: isEmpty ? 0.5 : 1,
                  boxShadow: isEmpty
                    ? 'none'
                    : `0 0 20px ${item.color}20`,
                }}
              >
                {/* Icon */}
                <div
                  style={{
                    fontSize: '56px',
                    width: '80px',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: isEmpty
                      ? 'rgba(255, 255, 255, 0.05)'
                      : `${item.color}20`,
                    borderRadius: '16px',
                    border: isEmpty
                      ? '2px solid rgba(255, 255, 255, 0.1)'
                      : `2px solid ${item.color}40`,
                  }}
                >
                  {item.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      margin: '0 0 4px 0',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      color: isEmpty ? '#6b7280' : 'white',
                    }}
                  >
                    {item.label}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: isEmpty ? '#4b5563' : '#9ca3af',
                      fontSize: '14px',
                    }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Count Badge */}
                <div
                  style={{
                    backgroundColor: isEmpty ? '#374151' : item.color,
                    color: isEmpty ? '#6b7280' : 'white',
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '24px',
                    minWidth: '70px',
                    textAlign: 'center',
                    boxShadow: isEmpty
                      ? 'none'
                      : `0 4px 12px ${item.color}40`,
                  }}
                >
                  {item.count}
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary Card */}
        <div
          style={{
            marginTop: '32px',
            padding: '24px',
            background: 'rgba(45, 212, 191, 0.1)',
            border: '2px solid rgba(45, 212, 191, 0.3)',
            borderRadius: '16px',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: '0 0 8px 0', color: '#9ca3af', fontSize: '14px' }}>
            Total Supplies
          </p>
          <p
            style={{
              margin: 0,
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#2dd4bf',
            }}
          >
            {totalSupplies}
          </p>
          {totalSupplies === 0 && (
            <p
              style={{
                marginTop: '12px',
                fontSize: '14px',
                color: '#6b7280',
              }}
            >
              Collect supplies from the map to prepare for investigations
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
