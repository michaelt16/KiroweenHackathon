// Hotspot marker component
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../context/GameStateContext';
import { isInRange } from '../utils/distance';
import type { Hotspot } from '../types/game';

interface HotspotMarkerProps {
  hotspot: Hotspot;
}

// Create custom icon for hotspots
const getHotspotIcon = (inRange: boolean) => {
  // When in range, counteract parent filter and add subtle boost for visibility
  // Parent filter: saturate(0.6) brightness(0.92)
  // Reduced brightness and saturation for less glare
  const brightnessBoost = inRange 
    ? `filter: brightness(1.1) saturate(1.6) contrast(1.1) drop-shadow(0 0 12px rgba(167, 139, 250, 0.4)) drop-shadow(0 0 6px rgba(167, 139, 250, 0.3)) !important;`
    : `filter: brightness(1) saturate(1);`;
  
  const size = inRange ? 68 : 52; // Larger when in range
  const fontSize = inRange ? 36 : 28; // Larger emoji when in range
  const borderSize = inRange ? 6 : 4;
  const outerRingSize = inRange ? 80 : 60;
  
  return divIcon({
    html: `
      <div class="hotspot-marker-circle ${inRange ? 'hotspot-in-range' : ''}" style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background-color: #a78bfa;
        border: ${borderSize}px solid rgba(167, 139, 250, 0.6);
        box-shadow: 0 0 20px rgba(167, 139, 250, 0.5), 0 0 12px rgba(167, 139, 250, 0.4), 0 4px 12px rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: ${fontSize}px;
        position: relative;
        opacity: 1;
        ${brightnessBoost}
        transition: transform 0.2s ease;
      ">
        <span style="${brightnessBoost}">👻</span>
        <div style="
          position: absolute;
          width: ${outerRingSize}px;
          height: ${outerRingSize}px;
          border: 2px solid rgba(167, 139, 250, 0.4);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        "></div>
      </div>
    `,
    className: 'hotspot-marker',
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export function HotspotMarker({ hotspot }: HotspotMarkerProps) {
  const navigate = useNavigate();
  const { playerPosition } = useGameState();
  const inRange = isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng });

  const handleInvestigate = () => {
    if (inRange) {
      console.log('🔍 Starting investigation at:', hotspot.name);
      navigate(`/investigate/${hotspot.id}`);
    } else {
      console.log('❌ Hotspot out of range');
    }
  };

  return (
    <Marker 
      position={[hotspot.lat, hotspot.lng]} 
      icon={getHotspotIcon(inRange)}
      zIndexOffset={2000}
    >
      <Popup>
        <div style={{ textAlign: 'center', minWidth: '200px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>
            {hotspot.name}
          </h3>
          <p
            style={{
              margin: '8px 0',
              fontSize: '12px',
              color: inRange ? '#2dd4bf' : '#ef4444',
              fontWeight: 'bold',
            }}
          >
            {inRange ? '✓ In range – ready to investigate' : '⚠ Move closer to investigate'}
          </p>
          <button
            onClick={handleInvestigate}
            disabled={!inRange}
            style={{
              marginTop: '8px',
              padding: '10px 20px',
              backgroundColor: inRange ? '#a78bfa' : '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: inRange ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              fontSize: '14px',
              opacity: inRange ? 1 : 0.6,
            }}
          >
            👻 Investigate
          </button>
        </div>
      </Popup>
    </Marker>
  );
}
