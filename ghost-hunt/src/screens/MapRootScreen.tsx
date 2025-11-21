// Main map screen - Game-like Mobile UI
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import type { Map } from 'leaflet';
import { useGameState } from '../context/GameStateContext';
import { useMapData } from '../context/MapDataContext';
import { DevModeBadge } from '../components/DevModeBadge';
import { MapClickHandler } from '../components/MapClickHandler';
import { SupplyMarker } from '../components/SupplyMarker';
import { HotspotMarker } from '../components/HotspotMarker';
import { CollectionRadius } from '../components/CollectionRadius';
import { PlayerMarker } from '../components/PlayerMarker';
import { TopStatusBar } from '../components/HUD/TopStatusBar';
import { CompassIndicator } from '../components/HUD/CompassIndicator';
import { CRTOverlay } from '../components/Effects/CRTOverlay';
import { useCompass } from '../hooks/useCompass';
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
  const { supplyNodes, hotspots, removeSupplyNode } = useMapData();
  const mapRef = useRef<Map | null>(null);
  const [playerHeading, setPlayerHeading] = useState<number | null>(null);

  // Try to get compass heading for map screen (optional)
  const compass = useCompass({
    onHeadingUpdate: (heading) => {
      setPlayerHeading(heading);
    },
    onError: () => {
      // Compass not available on map screen is fine
      setPlayerHeading(null);
    },
  });

  // Start compass if available
  useEffect(() => {
    compass.startListening();
    return () => {
      compass.stopListening();
    };
  }, []);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView([playerPosition.lat, playerPosition.lng], 16, {
        animate: true,
      });
    }
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle CRT Overlay for game feel */}
      <CRTOverlay intensity={0.15} scanlineSpacing={4} staticOpacity={0.01} flickerEnabled={false} />

      {/* Top Status Bar - Game UI */}
      <TopStatusBar />

      {/* Compass Indicator - Game UI Element */}
      {playerHeading !== null && (
        <CompassIndicator heading={playerHeading} />
      )}

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

        {/* Supply node markers */}
        {supplyNodes.map((supply) => (
          <SupplyMarker key={supply.id} supply={supply} onCollect={removeSupplyNode} />
        ))}

        {/* Hotspot markers */}
        {hotspots.map((hotspot) => (
          <HotspotMarker key={hotspot.id} hotspot={hotspot} />
        ))}
      </MapContainer>

      {/* Enhanced Gradient Overlay for game atmosphere */}
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
            radial-gradient(circle at center, transparent 0%, rgba(11, 15, 26, 0.2) 60%, rgba(11, 15, 26, 0.4) 100%),
            linear-gradient(to top, rgba(11, 15, 26, 0.5) 0%, rgba(11, 15, 26, 0.2) 30%, transparent 60%)
          `,
        }}
      />

      {/* Vignette effect for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 401,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.2) 100%)',
        }}
      />

      {/* Dev Mode Badge */}
      <DevModeBadge />

      {/* Recenter button - Game-style */}
      <button
        onClick={handleRecenter}
        style={{
          position: 'absolute',
          top: '70px',
          right: '12px',
          zIndex: 1000,
          width: '44px',
          height: '44px',
          padding: '0',
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          border: '1px solid rgba(45, 212, 191, 0.3)',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 
            '0 4px 12px rgba(0, 0, 0, 0.5), ' +
            'inset 0 1px 0 rgba(45, 212, 191, 0.1)',
          transition: 'all 0.2s ease',
          color: 'rgba(45, 212, 191, 0.8)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.5)';
          e.currentTarget.style.boxShadow = 
            '0 0 16px rgba(45, 212, 191, 0.4), ' +
            'inset 0 0 12px rgba(45, 212, 191, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.3)';
          e.currentTarget.style.boxShadow = 
            '0 4px 12px rgba(0, 0, 0, 0.5), ' +
            'inset 0 1px 0 rgba(45, 212, 191, 0.1)';
        }}
        title="Recenter on player"
      >
        📍
      </button>
    </div>
  );
}
