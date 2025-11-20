// Supply node marker component
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import type { SupplyNode } from '../types/game';
import { useGameState } from '../context/GameStateContext';
import { useSupplies } from '../context/SuppliesContext';
import { isInRange } from '../utils/distance';

interface SupplyMarkerProps {
  supply: SupplyNode;
  onCollect: (id: string) => void;
}

// Supply icons and colors
const SUPPLY_CONFIG = {
  film: {
    icon: '🎞️',
    name: 'Film Roll',
    color: '#3b82f6', // blue
    glowSize: '20px',
  },
  boost: {
    icon: '⚡',
    name: 'Scanner Boost',
    color: '#f59e0b', // amber
    glowSize: '30px',
  },
  charm: {
    icon: '🔮',
    name: 'Charm',
    color: '#a855f7', // purple
    glowSize: '30px',
  },
};

// Create custom icon for supply nodes
const getSupplyIcon = (type: 'film' | 'boost' | 'charm', inRange: boolean) => {
  const config = SUPPLY_CONFIG[type];
  const opacity = inRange ? 1 : 0.6;
  const glowStyle = inRange
    ? `filter: drop-shadow(0 0 ${config.glowSize} ${config.color}); animation: supplyPulse 2s ease-in-out infinite;`
    : '';

  return divIcon({
    html: `<div style="font-size: 32px; text-align: center; opacity: ${opacity}; ${glowStyle}">${config.icon}</div>`,
    className: 'supply-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export function SupplyMarker({ supply, onCollect }: SupplyMarkerProps) {
  const { playerPosition } = useGameState();
  const { addFilm, addBoost, addCharm } = useSupplies();
  const inRange = isInRange(playerPosition, { lat: supply.lat, lng: supply.lng });
  const config = SUPPLY_CONFIG[supply.type];

  const handleCollect = () => {
    console.log('🎯 Attempting to collect supply:', supply.type, 'In range:', inRange);
    if (inRange) {
      // Add supplies based on type
      switch (supply.type) {
        case 'film':
          addFilm(supply.amount);
          break;
        case 'boost':
          addBoost();
          break;
        case 'charm':
          addCharm();
          break;
      }
      
      console.log(`✅ Collected ${supply.amount}x ${supply.type}!`);
      onCollect(supply.id);
    } else {
      console.log('❌ Supply out of range');
    }
  };

  return (
    <Marker position={[supply.lat, supply.lng]} icon={getSupplyIcon(supply.type, inRange)}>
      <Popup>
        <div style={{ textAlign: 'center', minWidth: '180px', padding: '8px' }}>
          <div style={{ fontSize: '48px', marginBottom: '8px' }}>{config.icon}</div>
          <h3 style={{ margin: '0 0 4px 0', color: config.color }}>{config.name}</h3>
          <p style={{ margin: '4px 0', fontSize: '14px', color: '#888' }}>
            {supply.rarity}
          </p>
          <p style={{ margin: '8px 0', fontSize: '16px', fontWeight: 'bold' }}>
            +{supply.amount} {supply.type}
          </p>
          
          {/* Range indicator */}
          <p
            style={{
              margin: '8px 0',
              fontSize: '12px',
              color: inRange ? '#2dd4bf' : '#ef4444',
              fontWeight: 'bold',
            }}
          >
            {inRange ? '✓ In range – tap to collect' : '⚠ Move closer to collect'}
          </p>
          
          <button
            onClick={handleCollect}
            disabled={!inRange}
            style={{
              marginTop: '8px',
              padding: '10px 20px',
              backgroundColor: inRange ? config.color : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: inRange ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              fontSize: '14px',
              width: '100%',
            }}
          >
            {inRange ? 'Collect' : 'Out of Range'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
