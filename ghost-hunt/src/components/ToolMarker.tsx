// Tool node marker component
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import type { ToolNode } from '../types/game';
import { useGameState } from '../context/GameStateContext';
import { isInRange } from '../utils/distance';

interface ToolMarkerProps {
  tool: ToolNode;
  onCollect: (id: string) => void;
}

// Create custom icons for different tool types
const getToolIcon = (type: string, inRange: boolean) => {
  const iconMap: Record<string, string> = {
    EMF: '📡',
    SpiritBox: '📻',
    ThermalCam: '📷',
    Salt: '🧂',
  };

  const opacity = inRange ? 1 : 0.6;
  const glowStyle = inRange
    ? 'filter: drop-shadow(0 0 8px rgba(45, 212, 191, 0.8)); animation: toolPulse 2s ease-in-out infinite;'
    : '';

  return divIcon({
    html: `<div style="font-size: 28px; text-align: center; opacity: ${opacity}; ${glowStyle}">${iconMap[type] || '🔧'}</div>`,
    className: 'tool-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export function ToolMarker({ tool, onCollect }: ToolMarkerProps) {
  const { playerPosition, addToInventory } = useGameState();
  const inRange = isInRange(playerPosition, { lat: tool.lat, lng: tool.lng });

  const handleCollect = () => {
    console.log('🎯 Attempting to collect tool:', tool.type, 'In range:', inRange);
    if (inRange) {
      console.log('✅ Tool collected!');
      addToInventory(tool.type);
      onCollect(tool.id);
    } else {
      console.log('❌ Tool out of range');
    }
  };

  return (
    <Marker position={[tool.lat, tool.lng]} icon={getToolIcon(tool.type, inRange)}>
      <Popup>
        <div style={{ textAlign: 'center', minWidth: '150px' }}>
          <h3 style={{ margin: '0 0 8px 0' }}>{tool.type}</h3>
          <p style={{ margin: '4px 0', color: getRarityColor(tool.rarity) }}>
            {tool.rarity}
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
            {inRange ? '✓ In range – collect now' : '⚠ Move closer to collect'}
          </p>
          <button
            onClick={handleCollect}
            disabled={!inRange}
            style={{
              marginTop: '8px',
              padding: '8px 16px',
              backgroundColor: inRange ? '#6b46c1' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: inRange ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
            }}
          >
            {inRange ? 'Collect' : 'Out of Range'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'Common':
      return '#888';
    case 'Rare':
      return '#4a90e2';
    case 'Epic':
      return '#9b59b6';
    default:
      return '#000';
  }
}
