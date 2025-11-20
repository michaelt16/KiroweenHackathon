// Main map screen
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import type { Map } from 'leaflet';
import { useGameState } from '../context/GameStateContext';
import { useMapData } from '../context/MapDataContext';
import { DevModeBadge } from '../components/DevModeBadge';
import { MapClickHandler } from '../components/MapClickHandler';
import { ToolMarker } from '../components/ToolMarker';
import { HotspotMarker } from '../components/HotspotMarker';
import { CollectionRadius } from '../components/CollectionRadius';
import { PlayerMarker } from '../components/PlayerMarker';
import 'leaflet/dist/leaflet.css';

// Component to handle map recentering
function MapController() {
  const map = useMap();
  const { playerPosition } = useGameState();

  useEffect(() => {
    map.setView([playerPosition.lat, playerPosition.lng], map.getZoom());
  }, [playerPosition, map]);

  return null;
}

// Component to expose map instance for recenter button
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

export function MapRootScreen() {
  const { playerPosition } = useGameState();
  const { toolNodes, hotspots, removeToolNode } = useMapData();
  const mapRef = useRef<Map | null>(null);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView([playerPosition.lat, playerPosition.lng], 16, {
        animate: true,
      });
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
      {/* Map Container */}
      <MapContainer
        center={[playerPosition.lat, playerPosition.lng]}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapRefController mapRef={mapRef} />
        <MapController />
        <MapClickHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={20}
        />
        {/* Player marker with glow */}
        <PlayerMarker />

        {/* Collection radius circle */}
        <CollectionRadius />

        {/* Tool node markers */}
        {toolNodes.map((tool) => (
          <ToolMarker key={tool.id} tool={tool} onCollect={removeToolNode} />
        ))}

        {/* Hotspot markers */}
        {hotspots.map((hotspot) => (
          <HotspotMarker key={hotspot.id} hotspot={hotspot} />
        ))}
      </MapContainer>

      {/* Gradient Overlay for atmosphere */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 400,
          background: `
            radial-gradient(circle at center, transparent 0%, rgba(11, 15, 26, 0.3) 100%),
            linear-gradient(to top, rgba(11, 15, 26, 0.7) 0%, transparent 40%)
          `,
        }}
      />

      {/* Dev Mode Badge */}
      <DevModeBadge />

      {/* Recenter button */}
      <button
        onClick={handleRecenter}
        style={{
          position: 'absolute',
          top: '80px',
          right: '10px',
          zIndex: 1000,
          padding: '10px',
          backgroundColor: 'white',
          border: '2px solid rgba(0,0,0,0.2)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '20px',
        }}
        title="Recenter on player"
      >
        📍
      </button>
    </div>
  );
}
