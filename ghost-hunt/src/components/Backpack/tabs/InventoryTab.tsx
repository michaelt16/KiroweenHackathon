import React from 'react';

interface Supply {
  id: string;
  name: string;
  icon: string;
  count: number;
  description: string;
}

interface InventoryTabProps {
  supplies?: Supply[];
}

const DEFAULT_SUPPLIES: Supply[] = [
  { id: 'film', name: 'FILM ROLLS', icon: '🎞️', count: 12, description: 'Camera ammunition' },
  { id: 'boosts', name: 'SCANNER BOOSTS', icon: '⚡', count: 3, description: 'Enhance detection' },
  { id: 'charms', name: 'PROTECTIVE CHARMS', icon: '🔮', count: 5, description: 'Sanity protection' },
];

const InventoryTab: React.FC<InventoryTabProps> = ({
  supplies = DEFAULT_SUPPLIES,
}) => {
  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
      }}
    >
      {/* Case label plate */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
          padding: '12px 16px',
          borderRadius: '4px',
          border: '2px solid #1a1a1a',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        {/* Rivets */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              [i < 2 ? 'top' : 'bottom']: '6px',
              [i % 2 === 0 ? 'left' : 'right']: '8px',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #5a5a5a, #2a2a2a)',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
            }}
          />
        ))}

        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            fontWeight: 'bold',
            color: 'rgba(200,200,200,0.5)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            textAlign: 'center',
            textShadow: '0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.9)',
          }}
        >
          🎒 FIELD KIT - SUPPLIES
        </div>
      </div>

      {/* Equipment case interior */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
          padding: '20px',
          borderRadius: '8px',
          border: '3px solid #0f0f0f',
          boxShadow: 
            'inset 0 8px 16px rgba(0,0,0,0.9), ' +
            'inset 0 -4px 8px rgba(0,0,0,0.7), ' +
            '0 4px 12px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
      >
        {/* Foam texture overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.4,
            pointerEvents: 'none',
            borderRadius: '8px',
          }}
        />

        {/* Supply slots (foam cutouts) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', zIndex: 1 }}>
          {supplies.map((supply, index) => (
            <div
              key={supply.id}
              style={{
                position: 'relative',
              }}
            >
              {/* Foam cutout */}
              <div
                style={{
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
                  padding: '16px',
                  borderRadius: '6px',
                  border: '2px solid #000',
                  boxShadow: 
                    'inset 0 4px 12px rgba(0,0,0,0.95), ' +
                    'inset 0 -2px 6px rgba(0,0,0,0.8), ' +
                    '0 2px 4px rgba(0,0,0,0.5)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Foam texture */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='foam'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23foam)' opacity='0.2'/%3E%3C/svg%3E")`,
                    mixBlendMode: 'overlay',
                    opacity: 0.6,
                    pointerEvents: 'none',
                  }}
                />

                <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Icon in foam cutout */}
                  <div
                    style={{
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '36px',
                      flexShrink: 0,
                      background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                      borderRadius: '8px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8)',
                    }}
                  >
                    {supply.icon}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1 }}>
                    {/* Name - etched style */}
                    <div
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontSize: '13px',
                        fontWeight: 'bold',
                        color: 'rgba(200,200,200,0.5)',
                        marginBottom: '6px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        textShadow: '0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.9)',
                      }}
                    >
                      {supply.name}
                    </div>

                    {/* Description - handwritten on tape */}
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 10px',
                        background: 'rgba(255, 255, 255, 0.15)',
                        borderRadius: '2px',
                        transform: 'rotate(-0.5deg)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                      }}
                    >
                      <div
                        style={{
                          fontFamily: '"Caveat", cursive',
                          fontSize: '12px',
                          color: 'rgba(200,200,200,0.7)',
                          lineHeight: '1.3',
                        }}
                      >
                        {supply.description}
                      </div>
                    </div>
                  </div>

                  {/* Count display - LED style */}
                  <div
                    style={{
                      background: '#0a0a0a',
                      padding: '8px 16px',
                      borderRadius: '4px',
                      border: '2px solid #1a1a1a',
                      boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.9)',
                      minWidth: '70px',
                      textAlign: 'center',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: supply.count > 0 ? '#00ff55' : '#ff0000',
                        textShadow: supply.count > 0 
                          ? '0 0 8px rgba(0,255,85,0.8), 0 0 12px rgba(0,255,85,0.4)'
                          : '0 0 8px rgba(255,0,0,0.8), 0 0 12px rgba(255,0,0,0.4)',
                        letterSpacing: '2px',
                      }}
                    >
                      {supply.count}
                    </div>
                  </div>
                </div>

                {/* Status indicator LED */}
                <div
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: supply.count > 0 ? '#00ff55' : '#ff0000',
                    boxShadow: supply.count > 0
                      ? '0 0 8px rgba(0,255,85,0.9), 0 0 12px rgba(0,255,85,0.5)'
                      : '0 0 8px rgba(255,0,0,0.9), 0 0 12px rgba(255,0,0,0.5)',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Equipment status panel */}
      <div
        style={{
          background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
          padding: '16px',
          borderRadius: '6px',
          border: '2px solid #0f0f0f',
          boxShadow: 'inset 0 4px 8px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4)',
          position: 'relative',
        }}
      >
        <div
          style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            color: 'rgba(200,200,200,0.5)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            textShadow: '0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.9)',
          }}
        >
          SYSTEM STATUS:
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { label: 'All tools operational', status: true },
            { label: 'Battery: 87%', status: true },
            { label: 'GPS: Active', status: true },
          ].map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* LED indicator */}
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: item.status ? '#00ff55' : '#ff0000',
                  boxShadow: item.status
                    ? '0 0 6px rgba(0,255,85,0.9), 0 0 10px rgba(0,255,85,0.4)'
                    : '0 0 6px rgba(255,0,0,0.9), 0 0 10px rgba(255,0,0,0.4)',
                  flexShrink: 0,
                }}
              />
              <div
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  color: 'rgba(200,200,200,0.7)',
                  letterSpacing: '0.5px',
                }}
              >
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warning label */}
      <div
        style={{
          background: 'rgba(255, 235, 59, 0.15)',
          padding: '10px 14px',
          borderRadius: '4px',
          border: '2px solid rgba(255, 235, 59, 0.3)',
          transform: 'rotate(-0.3deg)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        <div
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '13px',
            color: 'rgba(200,200,150,0.9)',
            lineHeight: '1.5',
            textAlign: 'center',
          }}
        >
          Collect supplies on the map before investigations
        </div>
      </div>
    </div>
  );
};

export default InventoryTab;
