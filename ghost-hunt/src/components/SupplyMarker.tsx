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

// CSS Art Film Roll Icon
const FilmRollIcon = ({ size = 36 }: { size?: number }) => {
  const scale = size / 36;
  return `
    <div style="
      width: ${size}px;
      height: ${size}px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <!-- Main spool circle -->
      <div style="
        width: ${28 * scale}px;
        height: ${28 * scale}px;
        border-radius: 50%;
        background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
        border: ${2 * scale}px solid #0a0a0a;
        box-shadow: 
          inset 0 ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 0.8),
          inset 0 -${2 * scale}px ${4 * scale}px rgba(255, 255, 255, 0.1),
          0 0 ${8 * scale}px rgba(0, 0, 0, 0.6);
        position: relative;
      ">
        <!-- Center hole -->
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: ${10 * scale}px;
          height: ${10 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: inset 0 0 ${4 * scale}px rgba(0, 0, 0, 1);
        "></div>
        
        <!-- Side holes (spool holes) -->
        <div style="
          position: absolute;
          top: 50%;
          left: ${4 * scale}px;
          transform: translateY(-50%);
          width: ${3 * scale}px;
          height: ${3 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: inset 0 0 ${2 * scale}px rgba(0, 0, 0, 1);
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          right: ${4 * scale}px;
          transform: translateY(-50%);
          width: ${3 * scale}px;
          height: ${3 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: inset 0 0 ${2 * scale}px rgba(0, 0, 0, 1);
        "></div>
        <div style="
          position: absolute;
          top: ${4 * scale}px;
          left: 50%;
          transform: translateX(-50%);
          width: ${3 * scale}px;
          height: ${3 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: inset 0 0 ${2 * scale}px rgba(0, 0, 0, 1);
        "></div>
        <div style="
          position: absolute;
          bottom: ${4 * scale}px;
          left: 50%;
          transform: translateX(-50%);
          width: ${3 * scale}px;
          height: ${3 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
          box-shadow: inset 0 0 ${2 * scale}px rgba(0, 0, 0, 1);
        "></div>
      </div>
      
      <!-- Film strip hanging down -->
      <div style="
        position: absolute;
        top: ${26 * scale}px;
        left: 50%;
        transform: translateX(-50%);
        width: ${20 * scale}px;
        height: ${8 * scale}px;
        background: linear-gradient(to bottom, #1a1a1a 0%, #0f0f0f 100%);
        border: ${1 * scale}px solid #0a0a0a;
        border-top: none;
        border-radius: 0 0 ${2 * scale}px ${2 * scale}px;
        box-shadow: 0 ${2 * scale}px ${4 * scale}px rgba(0, 0, 0, 0.8);
      ">
        <!-- Film perforations -->
        <div style="
          position: absolute;
          top: ${2 * scale}px;
          left: ${3 * scale}px;
          width: ${2 * scale}px;
          height: ${2 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
        "></div>
        <div style="
          position: absolute;
          top: ${2 * scale}px;
          right: ${3 * scale}px;
          width: ${2 * scale}px;
          height: ${2 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
        "></div>
        <div style="
          position: absolute;
          top: ${5 * scale}px;
          left: ${3 * scale}px;
          width: ${2 * scale}px;
          height: ${2 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
        "></div>
        <div style="
          position: absolute;
          top: ${5 * scale}px;
          right: ${3 * scale}px;
          width: ${2 * scale}px;
          height: ${2 * scale}px;
          border-radius: 50%;
          background: #0a0a0a;
        "></div>
      </div>
    </div>
  `;
};

// Supply icons and colors
const SUPPLY_CONFIG = {
  film: {
    icon: null, // Using CSS art instead
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
  const opacity = inRange ? 1 : 0.95; // Increased from 0.6 to 0.95 for better visibility
  const glowSize = inRange ? parseInt(config.glowSize) * 1.2 : 8; // Slightly increase glow size when in range
  // When in range, counteract parent filter and add subtle boost for visibility
  // Parent filter: saturate(0.6) brightness(0.92)
  // Reduced brightness and saturation for less glare
  const iconSize = inRange ? 56 : 44; // Larger when in range
  const filmSize = inRange ? 48 : 36; // Larger when in range
  const brightnessFilter = inRange 
    ? `filter: brightness(1.1) saturate(1.6) contrast(1.1) drop-shadow(0 0 ${glowSize}px ${config.color}88) drop-shadow(0 0 ${glowSize * 0.5}px ${config.color}66) !important; animation: supplyPulse 2s ease-in-out infinite;`
    : `filter: brightness(1) saturate(1) drop-shadow(0 0 8px ${config.color}80);`; // Subtle glow even when out of range

  // Use CSS art for film roll, emoji for others
  const iconHtml = config.icon 
    ? `<div class="supply-icon-${inRange ? 'in-range' : 'out-range'}" style="font-size: ${filmSize}px; text-align: center; opacity: ${opacity}; ${brightnessFilter}">${config.icon}</div>`
    : `<div class="supply-icon-${inRange ? 'in-range' : 'out-range'}" style="opacity: ${opacity}; ${brightnessFilter}">${FilmRollIcon({ size: filmSize })}</div>`;

  return divIcon({
    html: iconHtml,
    className: 'supply-marker',
    iconSize: [iconSize, iconSize],
    iconAnchor: [iconSize / 2, iconSize / 2],
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
    <Marker 
      position={[supply.lat, supply.lng]} 
      icon={getSupplyIcon(supply.type, inRange)}
      zIndexOffset={2000}
    >
      <Popup>
        <div style={{ textAlign: 'center', minWidth: '180px', padding: '8px' }}>
          <div style={{ marginBottom: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {config.icon ? (
              <div style={{ fontSize: '48px' }}>{config.icon}</div>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: FilmRollIcon({ size: 48 }) }} />
            )}
          </div>
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
