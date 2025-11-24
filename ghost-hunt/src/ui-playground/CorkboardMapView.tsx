// Corkboard Map View - Full detective corkboard aesthetic
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { Map } from 'leaflet';
import { useGameState } from '../context/GameStateContext';
import { useMapData } from '../context/MapDataContext';
// MapController component
function MapController() {
  const map = useMap();
  const { playerPosition } = useGameState();

  useEffect(() => {
    map.setView([playerPosition.lat, playerPosition.lng], map.getZoom());
  }, [playerPosition, map]);

  return null;
}
import { PlayerMarker } from '../components/PlayerMarker';
import { CollectionRadius } from '../components/CollectionRadius';
import { MapClickHandler } from '../components/MapClickHandler';
import { divIcon } from 'leaflet';
import { isInRange } from '../utils/distance';
import { useNavigate } from 'react-router-dom';
import corkboardTexture from '../assets/texture/corkboardtexture.png';
import wrinkledPaper from '../assets/texture/wrinkledpaper.png';
import dust from '../assets/texture/dust.png';
import tape from '../assets/texture/tape.png';
import filmgrain from '../assets/texture/filmgrain.png';
import 'leaflet/dist/leaflet.css';

// Component to expose map instance
function MapRefController({ mapRef }: { mapRef: React.MutableRefObject<Map | null> }) {
  const map = useMap();
  
  useEffect(() => {
    mapRef.current = map;
    return () => {
      mapRef.current = null;
    };
  }, [map, mapRef]);
  
  return null;
}

// Physical Pin Marker Component
function PhysicalPinMarker({ 
  position, 
  label, 
  status = 'available',
  isSelected = false,
  onMarkerClick 
}: { 
  position: [number, number];
  label: string;
  status?: 'locked' | 'available' | 'active';
  isSelected?: boolean;
  onMarkerClick?: () => void;
}) {
  const { playerPosition } = useGameState();
  const inRange = isInRange(playerPosition, { lat: position[0], lng: position[1] });
  
  const pinColor = status === 'locked' 
    ? '#666' 
    : status === 'active' 
    ? '#ff4444' 
    : '#cc0000';
  
  const pinGlow = status === 'active' 
    ? '0 0 12px rgba(255, 68, 68, 0.6), 0 0 24px rgba(255, 68, 68, 0.3)'
    : '0 2px 8px rgba(0,0,0,0.6)';
  
  const labelBg = status === 'locked' 
    ? 'rgba(200, 200, 200, 0.9)' 
    : status === 'active'
    ? 'rgba(255, 240, 240, 0.95)'
    : 'rgba(255, 255, 255, 0.95)';
  
  const labelColor = status === 'locked' 
    ? '#666' 
    : status === 'active'
    ? '#8B0000'
    : '#1a1a1a';
  
  const rotation = Math.random() * 8 - 4;
  
  const icon = divIcon({
    html: `
      <div style="
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
      ">
        ${status === 'active' ? `
        <!-- Red scribbled circle for active mission -->
        <div style="
          position: absolute;
          width: 80px;
          height: 80px;
          border: 3px solid rgba(200, 0, 0, 0.4);
          border-radius: 50%;
          top: -30px;
          left: -30px;
          animation: pulse 2s ease-in-out infinite;
        "></div>
        ` : ''}
        
        <!-- Push Pin -->
        <div style="
          width: 18px;
          height: 18px;
          border-radius: 50% 50% 50% 0;
          background: radial-gradient(circle at 30% 30%, ${pinColor}, ${status === 'locked' ? '#333' : '#990000'});
          transform: rotate(-45deg);
          box-shadow: ${pinGlow};
          z-index: 10;
        "></div>
        
        <!-- Pin Shadow -->
        <div style="
          position: absolute;
          top: 16px;
          width: 10px;
          height: 4px;
          background: rgba(0,0,0,0.4);
          border-radius: 50%;
          filter: blur(2px);
        "></div>
        
        <!-- Label Tag -->
        <div style="
          margin-top: 12px;
          background: ${labelBg};
          padding: 4px 8px;
          border-radius: 4px;
          font-family: 'Caveat', cursive;
          font-size: 12px;
          color: ${labelColor};
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          transform: rotate(${rotation}deg);
          ${status === 'locked' ? 'text-decoration: line-through; opacity: 0.6;' : ''}
          ${status === 'active' ? 'font-weight: bold; border: 1px solid rgba(200, 0, 0, 0.3);' : ''}
        ">
          ${label}
          ${status === 'active' ? '<span style="font-size: 9px; margin-left: 4px; color: #cc0000;">ACTIVE</span>' : ''}
        </div>
      </div>
      <style>
        @keyframes pulse {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      </style>
    `,
    className: 'physical-pin-marker',
    iconSize: [120, 100],
    iconAnchor: [9, 9],
  });

  return (
    <Marker 
      position={position} 
      icon={icon}
      eventHandlers={{
        click: () => onMarkerClick?.(),
      }}
    >
      <Popup>
        <div style={{ textAlign: 'center', minWidth: '150px', padding: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', fontFamily: '"Caveat", cursive' }}>
            {label}
          </h3>
          <p style={{ 
            margin: '4px 0', 
            fontSize: '11px', 
            color: inRange ? '#2dd4bf' : '#ef4444',
            fontFamily: '"Courier New", monospace',
          }}>
            {inRange ? '✓ In range' : '⚠ Out of range'}
          </p>
          <p style={{ 
            margin: '4px 0', 
            fontSize: '10px', 
            color: '#888',
            fontFamily: '"Courier New", monospace',
            textTransform: 'uppercase',
          }}>
            Status: {status.toUpperCase()}
          </p>
        </div>
      </Popup>
    </Marker>
  );
}

// Polaroid Component for Selected Location
function PolaroidThumbnail({ 
  position, 
  label 
}: { 
  position: [number, number];
  label: string;
}) {
  const icon = divIcon({
    html: `
      <div style="
        position: relative;
        pointer-events: none;
      ">
        <div style="
          background: #e8e4dc;
          padding: 6px 6px 20px 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.6);
          border-radius: 2px;
          transform: rotate(${Math.random() * 6 - 3}deg);
        ">
          <div style="
            width: 80px;
            height: 60px;
            background: radial-gradient(ellipse at center, #1a1a2a 0%, #0a0a15 100%);
            border-radius: 2px;
            position: relative;
          ">
            <div style="
              position: absolute;
              inset: 0;
              background-image: url(${filmgrain});
              background-size: 200% 200%;
              mix-blend-mode: overlay;
              opacity: 0.6;
            "></div>
          </div>
          <div style="
            font-family: 'Caveat', cursive;
            fontSize: 9px;
            color: #1a1a1a;
            margin-top: 4px;
            text-align: center;
          ">${label}</div>
        </div>
        
        <!-- Tape on top -->
        <div style="
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%) rotate(-5deg);
          width: 30px;
          height: 10px;
          background-image: url(${tape});
          background-size: cover;
          opacity: 0.8;
        "></div>
      </div>
    `,
    className: 'polaroid-thumbnail',
    iconSize: [100, 100],
    iconAnchor: [50, 50],
  });

  return <Marker position={position} icon={icon} />;
}

export function CorkboardMapView() {
  const { playerPosition } = useGameState();
  const { supplyNodes, hotspots, removeSupplyNode } = useMapData();
  const mapRef = useRef<Map | null>(null);
  const navigate = useNavigate();
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView([playerPosition.lat, playerPosition.lng], 16, {
        animate: true,
      });
    }
  };

  // Get selected hotspot data
  const selectedHotspotData = selectedHotspot 
    ? hotspots.find(h => h.id === selectedHotspot)
    : null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden',
    }}>
      {/* Full-screen Corkboard Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        zIndex: 400,
        background: `
          url(${corkboardTexture}),
          linear-gradient(135deg, #8B6F47 0%, #6B5230 50%, #5A4228 100%)
        `,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply, normal',
      }}>
        {/* Cork texture overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${corkboardTexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.6,
        }} />
        
        {/* Cork board vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
        }} />
      </div>

      {/* Paper Map Container - Pinned in center */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'min(95vw, 1400px)',
        height: 'min(85vh, 950px)',
        zIndex: 450,
        pointerEvents: 'none',
      }}>
        {/* Paper map frame */}
        <div style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: `
            url(${wrinkledPaper}),
            linear-gradient(135deg, #e8e4dc 0%, #d4c5b0 50%, #c4b5a0 100%)
          `,
          backgroundSize: 'cover, cover',
          backgroundBlendMode: 'multiply, normal',
          borderRadius: '4px',
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.6),
            0 4px 16px rgba(0,0,0,0.4),
            inset 0 2px 4px rgba(255,255,255,0.1)
          `,
          transform: 'rotate(-1deg)',
          border: '2px solid rgba(139, 69, 19, 0.3)',
          overflow: 'hidden',
        }}>
          {/* Paper texture overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${wrinkledPaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.3,
            pointerEvents: 'none',
          }} />

          {/* Dust overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.15,
            pointerEvents: 'none',
          }} />

          {/* Map container - Leaflet rendered here */}
          <div style={{
            position: 'absolute',
            inset: '20px',
            borderRadius: '2px',
            overflow: 'hidden',
            pointerEvents: 'auto',
            zIndex: 1,
          }}>
            <MapContainer
              center={[playerPosition.lat, playerPosition.lng]}
              zoom={16}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <MapRefController mapRef={mapRef} />
              <MapController />
              <MapClickHandler />
              
              {/* Base tile layer */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                maxZoom={20}
              />

              {/* Player marker */}
              <PlayerMarker />

              {/* Collection radius */}
              <CollectionRadius />

              {/* Hotspot markers as physical pins */}
              {hotspots.map((hotspot) => (
                <PhysicalPinMarker
                  key={hotspot.id}
                  position={[hotspot.lat, hotspot.lng]}
                  label={hotspot.name}
                  status={hotspot.status === 'locked' ? 'locked' : 'available'}
                  isSelected={selectedHotspot === hotspot.id}
                  onMarkerClick={() => {
                    const inRange = isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng });
                    if (inRange && hotspot.status === 'unlocked') {
                      navigate(`/investigate/${hotspot.id}`);
                    } else {
                      setSelectedHotspot(hotspot.id);
                    }
                  }}
                />
              ))}

              {/* Polaroid for selected hotspot */}
              {selectedHotspotData && (
                <PolaroidThumbnail
                  position={[selectedHotspotData.lat, selectedHotspotData.lng]}
                  label={selectedHotspotData.name}
                />
              )}

              {/* Supply nodes as physical pins */}
              {supplyNodes.map((supply) => (
                <PhysicalPinMarker
                  key={supply.id}
                  position={[supply.lat, supply.lng]}
                  label={`Supply: ${supply.type}`}
                  status="available"
                  onMarkerClick={() => {
                    const inRange = isInRange(playerPosition, { lat: supply.lat, lng: supply.lng });
                    if (inRange) {
                      removeSupplyNode(supply.id);
                    }
                  }}
                />
              ))}
            </MapContainer>
          </div>

          {/* Push pins holding the map */}
          {[
            { top: '15px', left: '15px' },
            { top: '15px', right: '15px' },
            { bottom: '15px', left: '15px' },
            { bottom: '15px', right: '15px' },
          ].map((pin, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...pin,
                transform: 'translate(-50%, -50%)',
                zIndex: 10,
                pointerEvents: 'none',
              }}
            >
              {/* Push pin */}
              <div style={{
                width: '16px',
                height: '16px',
                borderRadius: '50% 50% 50% 0',
                background: 'radial-gradient(circle at 30% 30%, #cc0000, #990000)',
                transform: 'rotate(-45deg)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.6)',
              }} />
              
              {/* Pin shadow */}
              <div style={{
                position: 'absolute',
                top: '14px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '10px',
                height: '4px',
                background: 'rgba(0,0,0,0.4)',
                borderRadius: '50%',
                filter: 'blur(2px)',
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Status Strip */}
      {selectedHotspotData && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 500,
          background: `
            url(${wrinkledPaper}),
            linear-gradient(135deg, #f4f0e6 0%, #e8e4dc 100%)
          `,
          backgroundSize: 'cover, cover',
          backgroundBlendMode: 'multiply, normal',
          padding: '12px 20px',
          borderRadius: '4px',
          boxShadow: '0 4px 16px rgba(0,0,0,0.6)',
          border: '2px solid rgba(139, 69, 19, 0.4)',
          transform: 'translateX(-50%) rotate(-0.5deg)',
          minWidth: '300px',
          maxWidth: '90vw',
        }}>
          {/* Tape on top */}
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-5deg)',
            width: '40px',
            height: '12px',
            backgroundImage: `url(${tape})`,
            backgroundSize: 'cover',
            opacity: 0.8,
          }} />

          {/* Case file content */}
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: '#1a1a1a',
            marginBottom: '4px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}>
            CASE FILE
          </div>
          
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '18px',
            color: '#1a1a1a',
            marginBottom: '8px',
            fontWeight: 'bold',
          }}>
            {selectedHotspotData.name}
          </div>

          <div style={{
            display: 'flex',
            gap: '16px',
            alignItems: 'center',
          }}>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '9px',
              color: '#666',
            }}>
              THREAT: <span style={{ color: '#cc0000', fontWeight: 'bold' }}>MEDIUM</span>
            </div>
            
            {/* Red stamp */}
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '8px',
              color: '#cc0000',
              border: '2px solid #cc0000',
              padding: '2px 6px',
              borderRadius: '2px',
              transform: 'rotate(-2deg)',
            }}>
              ACTIVE
            </div>
          </div>
        </div>
      )}

      {/* Recenter button */}
      <button
        onClick={handleRecenter}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          width: '48px',
          height: '48px',
          padding: '0',
          backgroundColor: 'rgba(139, 111, 71, 0.9)',
          border: '2px solid rgba(139, 69, 19, 0.6)',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.6)',
          color: '#fff',
        }}
        title="Recenter on player"
      >
        📍
      </button>
    </div>
  );
}

