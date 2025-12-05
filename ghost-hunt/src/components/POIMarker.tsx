// POI Marker - Visual indicator for real-world landmarks
// Shows as a subtle marker that can become investigation hotspots
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { getPOIIcon, type POI } from '../utils/overpassAPI';

interface POIMarkerProps {
  poi: POI;
  onClick?: () => void;
}

export function POIMarker({ poi, onClick }: POIMarkerProps) {
  const icon = getPOIIcon(poi.type);
  
  const markerIcon = divIcon({
    className: 'poi-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: rgba(139, 0, 0, 0.7);
        border: 2px solid rgba(139, 0, 0, 0.9);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.5);
      ">
        ${icon}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });

  return (
    <Marker 
      position={[poi.lat, poi.lng]} 
      icon={markerIcon}
      zIndexOffset={1500}
    >
      <Popup>
        <div style={{ 
          textAlign: 'center', 
          minWidth: '150px', 
          padding: '8px',
          fontFamily: '"Courier New", monospace',
        }}>
          <div style={{ fontSize: '16px', marginBottom: '4px' }}>
            {getPOIIcon(poi.type)} {poi.name}
          </div>
          <div style={{ fontSize: '11px', color: '#666', textTransform: 'uppercase' }}>
            {poi.type}
          </div>
          {onClick && (
            <button
              onClick={onClick}
              style={{
                marginTop: '8px',
                padding: '6px 12px',
                backgroundColor: '#8b0000',
                color: '#f4f0e6',
                border: '1px solid #1a0f0a',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
                fontFamily: '"Courier New", monospace',
              }}
            >
              Investigate
            </button>
          )}
        </div>
      </Popup>
    </Marker>
  );
}



