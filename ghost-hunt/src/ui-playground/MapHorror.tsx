import React from 'react';

// Horror Map - Cork board with pinned locations and case files
export function MapHorror() {
  const locations = [
    { id: 1, name: 'Whitmore Estate', status: 'ACTIVE', threat: 'HIGH', distance: '0.3 mi', type: 'Mansion' },
    { id: 2, name: 'Old Mill', status: 'AVAILABLE', threat: 'MEDIUM', distance: '0.8 mi', type: 'Industrial' },
    { id: 3, name: 'Cemetery', status: 'LOCKED', threat: 'EXTREME', distance: '1.2 mi', type: 'Graveyard' },
    { id: 4, name: 'Abandoned School', status: 'COMPLETED', threat: 'LOW', distance: '0.5 mi', type: 'School' },
  ];

  const supplies = [
    { id: 1, type: 'Film', amount: 3, distance: '0.1 mi' },
    { id: 2, type: 'Boost', amount: 1, distance: '0.4 mi' },
    { id: 3, type: 'Charm', amount: 2, distance: '0.6 mi' },
  ];

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
          radial-gradient(circle at 30% 40%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, rgba(92, 51, 23, 0.15) 0%, transparent 40%)
        `,
        backgroundSize: '8px 8px, 8px 8px, 100% 100%, 100% 100%',
        padding: '20px',
        fontFamily: '"Courier New", monospace',
        position: 'relative',
        overflow: 'auto'
      }}
    >
      {/* Cork texture overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><defs><filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter></defs><rect width="100%" height="100%" filter="url(%23noise)" opacity="0.15"/></svg>')
          `,
          pointerEvents: 'none',
          opacity: 0.6
        }}
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', position: 'relative' }}>
        
        {/* Title Card */}
        <div
          style={{
            backgroundColor: '#f4f0e6',
            border: '3px solid #8B4513',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '30px',
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
            transform: 'rotate(-0.5deg)',
            position: 'relative'
          }}
        >
          {/* Tape corner */}
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
              transform: 'rotate(-12deg)',
              borderRadius: '2px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          />

          <div
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#2d1810',
              textAlign: 'center',
              marginBottom: '8px',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)'
            }}
          >
            INVESTIGATION MAP
          </div>
          <div
            style={{
              fontSize: '12px',
              color: '#8B4513',
              textAlign: 'center',
              fontStyle: 'italic'
            }}
          >
            Active Hotspots & Supply Locations
          </div>

          {/* Current location indicator */}
          <div
            style={{
              marginTop: '15px',
              padding: '10px',
              backgroundColor: 'rgba(139, 69, 19, 0.1)',
              borderRadius: '4px',
              border: '2px dashed #8B4513',
              textAlign: 'center',
              fontSize: '12px',
              color: '#2d1810'
            }}
          >
            📍 <strong>Your Location:</strong> Downtown District
          </div>
        </div>

        {/* Hotspots Section */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#f4f0e6',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>👻</span>
            <span>HAUNTED HOTSPOTS</span>
          </div>

          <div style={{ display: 'grid', gap: '20px' }}>
            {locations.map((location, index) => (
              <div
                key={location.id}
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
                    ${location.status === 'ACTIVE' ? 'radial-gradient(circle at 80% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 40%)' : ''}
                  `,
                  border: `3px solid ${
                    location.status === 'ACTIVE' ? '#dc2626' :
                    location.status === 'LOCKED' ? '#666' :
                    location.status === 'COMPLETED' ? '#22c55e' :
                    '#8B4513'
                  }`,
                  borderRadius: '6px',
                  padding: '20px',
                  position: 'relative',
                  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
                  transform: `rotate(${index % 2 === 0 ? '0.5deg' : '-0.3deg'})`,
                  marginLeft: index % 2 === 0 ? '10px' : '-5px',
                  opacity: location.status === 'LOCKED' ? 0.6 : 1
                }}
              >
                {/* Push pin */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '30px',
                    width: '12px',
                    height: '12px',
                    backgroundColor: '#dc2626',
                    borderRadius: '50% 50% 50% 0',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                    transform: 'rotate(45deg)'
                  }}
                />

                {/* Status badge */}
                <div
                  style={{
                    position: 'absolute',
                    top: '15px',
                    right: '15px',
                    padding: '4px 12px',
                    backgroundColor:
                      location.status === 'ACTIVE' ? 'rgba(220, 38, 38, 0.9)' :
                      location.status === 'LOCKED' ? 'rgba(100, 100, 100, 0.9)' :
                      location.status === 'COMPLETED' ? 'rgba(34, 197, 94, 0.9)' :
                      'rgba(245, 158, 11, 0.9)',
                    color: '#fff',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    borderRadius: '3px',
                    transform: 'rotate(-8deg)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    border: '1px solid rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {location.status}
                </div>

                {/* Location name */}
                <div
                  style={{
                    fontSize: '20px',
                    fontWeight: 'bold',
                    color: '#2d1810',
                    marginBottom: '8px',
                    letterSpacing: '0.5px'
                  }}
                >
                  {location.name}
                </div>

                {/* Details */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '12px', fontSize: '12px', color: '#8B4513' }}>
                  <div>
                    <strong>Type:</strong> {location.type}
                  </div>
                  <div>
                    <strong>Distance:</strong> {location.distance}
                  </div>
                </div>

                {/* Threat level */}
                <div
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    backgroundColor:
                      location.threat === 'EXTREME' ? 'rgba(139, 0, 0, 0.2)' :
                      location.threat === 'HIGH' ? 'rgba(220, 38, 38, 0.2)' :
                      location.threat === 'MEDIUM' ? 'rgba(245, 158, 11, 0.2)' :
                      'rgba(34, 197, 94, 0.2)',
                    border: `2px solid ${
                      location.threat === 'EXTREME' ? '#8B0000' :
                      location.threat === 'HIGH' ? '#dc2626' :
                      location.threat === 'MEDIUM' ? '#f59e0b' :
                      '#22c55e'
                    }`,
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    color: '#2d1810'
                  }}
                >
                  ⚠️ THREAT: {location.threat}
                </div>

                {/* Action button */}
                {location.status !== 'LOCKED' && location.status !== 'COMPLETED' && (
                  <div
                    style={{
                      marginTop: '15px',
                      padding: '10px',
                      backgroundColor: '#2d1810',
                      color: '#f4f0e6',
                      textAlign: 'center',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: '2px solid #8B4513'
                    }}
                  >
                    {location.status === 'ACTIVE' ? '▶ CONTINUE INVESTIGATION' : '🔍 START INVESTIGATION'}
                  </div>
                )}

                {location.status === 'LOCKED' && (
                  <div
                    style={{
                      marginTop: '15px',
                      padding: '10px',
                      backgroundColor: 'rgba(100, 100, 100, 0.3)',
                      color: '#666',
                      textAlign: 'center',
                      borderRadius: '4px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      border: '2px dashed #666'
                    }}
                  >
                    🔒 REQUIRES LEVEL {location.id * 5}
                  </div>
                )}

                {/* Damage overlay */}
                {index === 0 && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      width: '50px',
                      height: '50px',
                      backgroundColor: 'rgba(139, 69, 19, 0.2)',
                      borderRadius: '50% 30% 70% 40%',
                      transform: 'rotate(25deg)',
                      filter: 'blur(2px)',
                      mixBlendMode: 'multiply'
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Supplies Section */}
        <div style={{ marginBottom: '40px' }}>
          <div
            style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#f4f0e6',
              marginBottom: '20px',
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.8)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span>📦</span>
            <span>NEARBY SUPPLIES</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            {supplies.map((supply, index) => (
              <div
                key={supply.id}
                style={{
                  backgroundColor: '#fef3c7',
                  border: '2px solid #f59e0b',
                  borderRadius: '6px',
                  padding: '15px',
                  position: 'relative',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
                  transform: `rotate(${index % 2 === 0 ? '1deg' : '-1deg'})`
                }}
              >
                {/* Push pin */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%) rotate(45deg)',
                    width: '10px',
                    height: '10px',
                    backgroundColor: '#dc2626',
                    borderRadius: '50% 50% 50% 0',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
                  }}
                />

                <div
                  style={{
                    fontSize: '16px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    marginBottom: '8px',
                    textAlign: 'center'
                  }}
                >
                  {supply.type === 'Film' ? '🎞️' : supply.type === 'Boost' ? '⚡' : '🔮'} {supply.type}
                </div>

                <div
                  style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    color: '#1a1a1a',
                    textAlign: 'center',
                    marginBottom: '8px'
                  }}
                >
                  x{supply.amount}
                </div>

                <div
                  style={{
                    fontSize: '11px',
                    color: '#8B4513',
                    textAlign: 'center',
                    marginBottom: '10px'
                  }}
                >
                  📍 {supply.distance} away
                </div>

                <div
                  style={{
                    padding: '8px',
                    backgroundColor: '#f59e0b',
                    color: '#fff',
                    textAlign: 'center',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  COLLECT
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div
          style={{
            backgroundColor: '#f4f0e6',
            border: '2px solid #8B4513',
            borderRadius: '6px',
            padding: '15px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            transform: 'rotate(0.3deg)'
          }}
        >
          <div
            style={{
              fontSize: '14px',
              fontWeight: 'bold',
              color: '#2d1810',
              marginBottom: '10px'
            }}
          >
            📋 LEGEND
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', fontSize: '11px', color: '#2d1810' }}>
            <div>🔴 <strong>ACTIVE:</strong> Investigation in progress</div>
            <div>🟡 <strong>AVAILABLE:</strong> Ready to investigate</div>
            <div>🔒 <strong>LOCKED:</strong> Level requirement</div>
            <div>🟢 <strong>COMPLETED:</strong> Case closed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapHorror;
