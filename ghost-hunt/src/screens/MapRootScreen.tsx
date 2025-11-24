// Main map screen - Detective Corkboard Aesthetic
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import type { Map } from 'leaflet';
import { useGameState } from '../context/GameStateContext';
import { useMapData } from '../context/MapDataContext';
import { useFieldJournals } from '../context/FieldJournalsContext';
import { getJournalById } from '../data/fieldJournals';
import { JournalReadingModal } from '../components/JournalReadingModal';
import { DevModeBadge } from '../components/DevModeBadge';
import { MapClickHandler } from '../components/MapClickHandler';
import { SupplyMarker } from '../components/SupplyMarker';
import { FieldJournalMarker } from '../components/FieldJournalMarker';
import { CollectionRadius } from '../components/CollectionRadius';
import { PlayerMarker } from '../components/PlayerMarker';
import { TopStatusBar } from '../components/HUD/TopStatusBar';
import { CompassIndicator } from '../components/HUD/CompassIndicator';
import { useCompass } from '../hooks/useCompass';
import { isInRange, COLLECTION_RADIUS } from '../utils/distance';
import { useNavigate } from 'react-router-dom';
import { divIcon } from 'leaflet';
import { UnifiedBackpack } from '../components/Backpack';
import corkboardTexture from '../assets/texture/corkboardtexture.png';
import wrinkledPaper from '../assets/texture/wrinkledpaper.png';
import dust from '../assets/texture/dust.png';
import tape from '../assets/texture/tape.png';
import filmgrain from '../assets/texture/filmgrain.png';
import abandonedHouseImage from '../assets/images/abandonedhouse.png';
import creepyClassroomImage from '../assets/images/creepyclassroom.png';
import type { Hotspot } from '../types/game';
import 'leaflet/dist/leaflet.css';

// Component to enforce zoom limits
function ZoomLimiter() {
  const map = useMap();
  const MIN_ZOOM = 16;
  const MAX_ZOOM = 20;

  useEffect(() => {
    // Set zoom limits on the map instance
    map.setMinZoom(MIN_ZOOM);
    map.setMaxZoom(MAX_ZOOM);
    
    // Also enforce limits on zoom events as a backup
    const handleZoom = () => {
      const currentZoom = map.getZoom();
      if (currentZoom < MIN_ZOOM) {
        map.setZoom(MIN_ZOOM, { animate: false });
      } else if (currentZoom > MAX_ZOOM) {
        map.setZoom(MAX_ZOOM, { animate: false });
      }
    };

    map.on('zoom', handleZoom);
    map.on('zoomend', handleZoom);

    return () => {
      map.off('zoom', handleZoom);
      map.off('zoomend', handleZoom);
    };
  }, [map]);

  return null;
}

// Component to handle map recentering
function MapController() {
  const map = useMap();
  const { playerPosition, isPlayerMoving } = useGameState();

  useEffect(() => {
    if (isPlayerMoving) {
      // Smoothly pan the map to follow the player during walking
      map.panTo([playerPosition.lat, playerPosition.lng], {
        animate: true,
        duration: 0.1, // Very short duration for smooth following
      });
    } else {
      // Only recenter if position actually changed (avoid resetting after animation)
      const currentCenter = map.getCenter();
      const distance = Math.sqrt(
        Math.pow(playerPosition.lat - currentCenter.lat, 2) + 
        Math.pow(playerPosition.lng - currentCenter.lng, 2)
      );
      // Only recenter if the difference is significant (more than a tiny drift)
      if (distance > 0.00001) {
        map.setView([playerPosition.lat, playerPosition.lng], map.getZoom());
      }
    }
  }, [playerPosition, map, isPlayerMoving]);

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

// Investigation radius circle for each hotspot
function InvestigationRadiusCircle({ position, inRange }: { position: [number, number]; inRange: boolean }) {
  // Enhanced colors and opacity when player is in range
  const outerGlowOpacity = inRange ? 0.3 : 0.15;
  const innerGlowOpacity = inRange ? 0.2 : 0.1;
  const outerColor = inRange ? '#ff6666' : '#ff3333';
  const mainColor = inRange ? '#ff0000' : '#ff0000';
  const outerWeight = inRange ? 4 : 3;
  const mainWeight = inRange ? 7 : 5;
  const innerWeight = inRange ? 3 : 2;
  const outerOpacity = inRange ? 1 : 1;
  const mainOpacity = inRange ? 1 : 1;
  const innerOpacity = inRange ? 1 : 1;

  return (
    <>
      {/* Glow effect - outer glow circle */}
      <Circle
        center={position}
        radius={COLLECTION_RADIUS + 5}
        pathOptions={{
          color: 'transparent',
          fillColor: '#ff0000',
          fillOpacity: outerGlowOpacity,
          weight: 0,
        }}
      />
      {/* Glow effect - inner glow circle */}
      <Circle
        center={position}
        radius={COLLECTION_RADIUS + 2}
        pathOptions={{
          color: 'transparent',
          fillColor: '#ff0000',
          fillOpacity: innerGlowOpacity,
          weight: 0,
        }}
      />
      {/* Outer circle - red dotted/dashed style */}
      <Circle
        center={position}
        radius={COLLECTION_RADIUS + 3}
        pathOptions={{
          color: outerColor,
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: outerWeight,
          opacity: outerOpacity,
          dashArray: inRange ? '8 4' : '6 3',
        }}
      />
      {/* Main investigation radius - bold red dotted/dashed style */}
      <Circle
        center={position}
        radius={COLLECTION_RADIUS}
        pathOptions={{
          color: mainColor,
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: mainWeight,
          opacity: mainOpacity,
          dashArray: inRange ? '10 5' : '8 4',
        }}
      />
      {/* Inner circle - red dotted/dashed style */}
      <Circle
        center={position}
        radius={COLLECTION_RADIUS - 2}
        pathOptions={{
          color: outerColor,
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: innerWeight,
          opacity: innerOpacity,
          dashArray: inRange ? '8 4' : '6 3',
        }}
      />
    </>
  );
}

// Hand-drawn red circle marker for main location
function HandDrawnCircle({ position, label }: { position: [number, number]; label: string }) {
  return (
    <>
      {/* Outer circle - hand-drawn style */}
      <Circle
        center={position}
        radius={80}
        pathOptions={{
          color: '#cc0000',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 3,
          opacity: 0.7,
          dashArray: '8 4',
        }}
      />
      {/* Inner circle */}
      <Circle
        center={position}
        radius={60}
        pathOptions={{
          color: '#cc0000',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 2,
          opacity: 0.5,
          dashArray: '6 3',
        }}
      />
      {/* Arrow and label pointing to location */}
      <Marker
        position={[position[0] + 0.00012, position[1] + 0.00008]}
        icon={divIcon({
          html: `
            <div style="
              font-family: 'Caveat', cursive;
              font-size: 13px;
              color: #cc0000;
              font-weight: bold;
              text-shadow: 0 1px 2px rgba(0,0,0,0.5);
              white-space: nowrap;
              background: rgba(255, 255, 255, 0.9);
              padding: 2px 6px;
              border-radius: 3px;
              border: 1px solid rgba(204, 0, 0, 0.3);
            ">HIGH ACTIVITY →</div>
          `,
          className: 'hand-drawn-label',
          iconSize: [130, 25],
          iconAnchor: [0, 12],
        })}
      />
    </>
  );
}

// Paper tag label marker
function PaperTagMarker({ position, label, status }: { position: [number, number]; label: string; status: 'locked' | 'unlocked' }) {
  const rotation = Math.random() * 6 - 3;
  const icon = divIcon({
    html: `
      <div style="
        position: relative;
        pointer-events: none;
      ">
        <div style="
          background: ${status === 'locked' ? 'rgba(200, 200, 200, 0.9)' : '#f4f0e6'};
          padding: 4px 8px;
          border-radius: 3px;
          font-family: 'Caveat', cursive;
          font-size: 11px;
          color: ${status === 'locked' ? '#666' : '#1a0f0a'};
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          transform: rotate(${rotation}deg);
          ${status === 'locked' ? 'text-decoration: line-through; opacity: 0.6;' : ''}
          border: 1px solid rgba(139, 69, 19, 0.2);
        ">${label}</div>
        <!-- Small tape piece -->
        <div style="
          position: absolute;
          top: -4px;
          left: 50%;
          transform: translateX(-50%) rotate(-5deg);
          width: 20px;
          height: 8px;
          background-image: url(${tape});
          background-size: cover;
          opacity: 0.7;
        "></div>
      </div>
    `,
    className: 'paper-tag-marker',
    iconSize: [100, 40],
    iconAnchor: [50, 20],
  });

  return <Marker position={position} icon={icon} />;
}

// Red push pin marker
function RedPinMarker({ position }: { position: [number, number] }) {
  const icon = divIcon({
    html: `
      <div style="
        width: 14px;
        height: 14px;
        border-radius: 50% 50% 50% 0;
        background: radial-gradient(circle at 30% 30%, #cc0000, #990000);
        transform: rotate(-45deg);
        box-shadow: 0 2px 6px rgba(0,0,0,0.6);
      "></div>
    `,
    className: 'red-pin-marker',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });

  return <Marker position={position} icon={icon} />;
}

export function MapRootScreen() {
  const { playerPosition } = useGameState();
  const { supplyNodes, hotspots, fieldJournalNodes, removeSupplyNode, removeFieldJournalNode } = useMapData();
  const { addJournal, hasJournal } = useFieldJournals();
  const [selectedJournalForReading, setSelectedJournalForReading] = useState<string | null>(null);
  const [journalNodeToRemove, setJournalNodeToRemove] = useState<string | null>(null);
  const [showJournalNotification, setShowJournalNotification] = useState(false);
  const mapRef = useRef<Map | null>(null);
  const navigate = useNavigate();
  const [playerHeading, setPlayerHeading] = useState<number | null>(null);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(
    hotspots.length > 0 ? hotspots[0] : null
  );
  const [isPolaroidZoomed, setIsPolaroidZoomed] = useState(false);
  const [zoomedPolaroidData, setZoomedPolaroidData] = useState<{ image: string; name: string } | null>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);
  
  // Map hotspot names to images
  const hotspotImageMap: Record<string, string> = {
    'Abandoned Victorian House': abandonedHouseImage,
    'Abandoned Classroom': creepyClassroomImage,
    'Haunted Hospital': abandonedHouseImage, // Using house image as placeholder
    'Cursed Chapel': creepyClassroomImage, // Using classroom image as placeholder
    'Forgotten Asylum': abandonedHouseImage, // Using house image as placeholder
  };
  
  // Polaroid positions on the edges of the screen (not covering the map)
  const polaroidPositions: Record<string, { top?: string; bottom?: string; left?: string; right?: string; rotation: number }> = {
    'Abandoned Victorian House': { top: '100px', right: '10px', rotation: -5 },
    'Abandoned Classroom': { bottom: '100px', left: '10px', rotation: 3 },
  };
  const [zoomedStickyNote, setZoomedStickyNote] = useState<string | null>(null);

  // Try to get compass heading for map screen (optional)
  const compass = useCompass({
    onHeadingUpdate: (heading) => {
      setPlayerHeading(heading);
    },
    onError: () => {
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

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMapFullscreen) {
        setIsMapFullscreen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMapFullscreen]);

  const handleRecenter = () => {
    if (mapRef.current) {
      mapRef.current.setView([playerPosition.lat, playerPosition.lng], 16, {
        animate: true,
      });
    }
  };

  // Helper function to render a polaroid
  const renderPolaroid = (hotspot: Hotspot) => {
    const image = hotspotImageMap[hotspot.name] || abandonedHouseImage;
    const position = polaroidPositions[hotspot.name] || { top: '100px', right: '10px', rotation: -5 };
    
    return (
      <div 
        key={hotspot.id}
        style={{
          position: 'absolute',
          top: position.top,
          bottom: position.bottom,
          left: position.left,
          right: position.right,
          zIndex: 471,
          transform: `rotate(${position.rotation}deg)`,
          pointerEvents: 'auto',
          cursor: 'pointer',
        }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering map fullscreen
          setZoomedPolaroidData({ image, name: hotspot.name });
          setIsPolaroidZoomed(true);
        }}
      >
        <div style={{
          background: '#e8e4dc',
          padding: '8px 8px 30px 8px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
          borderRadius: '2px',
          transition: 'all 0.2s ease',
          position: 'relative',
          border: '2px solid transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 16px 40px rgba(139, 0, 0, 0.6), 0 6px 12px rgba(0,0,0,0.5), 0 0 20px rgba(139, 0, 0, 0.4)';
          e.currentTarget.style.borderColor = '#8b0000';
          e.currentTarget.style.zIndex = '10';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)';
          e.currentTarget.style.borderColor = 'transparent';
          e.currentTarget.style.zIndex = '1';
        }}
        >
          {/* Wrinkled paper texture on frame */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${wrinkledPaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
            borderRadius: '2px',
          }} />
          
          <div style={{
            width: '100px',
            height: '80px',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <img 
              src={image}
              alt={hotspot.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {/* Heavy static/grain overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${filmgrain})`,
              backgroundSize: '200% 200%',
              mixBlendMode: 'overlay',
              opacity: 0.9,
              pointerEvents: 'none',
            }} />
            {/* Additional dust overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.6,
              pointerEvents: 'none',
            }} />
            {/* Scratch marks */}
            <div style={{
              position: 'absolute',
              top: '8px',
              left: '4px',
              width: '25px',
              height: '1.5px',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              transform: 'rotate(15deg)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '12px',
              right: '8px',
              width: '20px',
              height: '1.5px',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              transform: 'rotate(-20deg)',
              pointerEvents: 'none',
            }} />
            {/* Corner damage */}
            <div style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '15px',
              height: '15px',
              background: 'radial-gradient(circle at top right, transparent 40%, rgba(0,0,0,0.3) 100%)',
              pointerEvents: 'none',
            }} />
          </div>
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '10px',
            color: '#1a1a1a',
            marginTop: '4px',
            textAlign: 'center',
          }}>
            {hotspot.name}
          </div>
        </div>
        
        {/* Tape on top */}
        <div style={{
          position: 'absolute',
          top: '-6px',
          left: '50%',
          transform: 'translateX(-50%) rotate(-5deg)',
          width: '30px',
          height: '10px',
          backgroundImage: `url(${tape})`,
          backgroundSize: 'cover',
          opacity: 0.8,
          pointerEvents: 'none',
        }} />
      </div>
    );
  };

  return (
    <div style={{ height: '100vh', width: '100vw', position: 'relative', overflow: 'hidden' }}>
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

      {/* Top Status Bar - Game UI */}
      <TopStatusBar />

      {/* Fullscreen Toggle Button - Eye Icon */}
      <button
        onClick={() => setIsMapFullscreen(!isMapFullscreen)}
        style={{
          position: 'fixed',
          top: '80px',
          left: '20px',
          zIndex: 1000,
          width: '48px',
          height: '48px',
          background: '#d8d4c8',
          border: '2px solid #1a0f0a',
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          color: '#1a0f0a',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
          transition: 'all 0.2s ease',
          transform: 'rotate(-0.3deg)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#8b0000';
          e.currentTarget.style.color = '#f4f0e6';
          e.currentTarget.style.transform = 'rotate(0.3deg) scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(139, 0, 0, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#d8d4c8';
          e.currentTarget.style.color = '#1a0f0a';
          e.currentTarget.style.transform = 'rotate(-0.3deg) scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.6)';
        }}
        title={isMapFullscreen ? 'Exit fullscreen (or press ESC)' : 'Enter fullscreen'}
      >
        {isMapFullscreen ? '👁️‍🗨️' : '👁️'}
      </button>

      {/* Compass Indicator - Game UI Element */}
      {playerHeading !== null && (
        <CompassIndicator heading={playerHeading} />
      )}

      {/* Paper Map Container - Pinned to corkboard */}
      <div style={{
        position: 'absolute',
        top: '60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(95vw, 1400px)',
        height: 'calc(100vh - 120px)',
        maxHeight: '900px',
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
          transform: 'rotate(1.5deg)',
          border: '2px solid rgba(139, 69, 19, 0.3)',
          overflow: 'hidden',
        }}>
          {/* Aged paper edges - darker corners */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(circle at top left, rgba(139, 69, 19, 0.2) 0%, transparent 40%),
              radial-gradient(circle at top right, rgba(139, 69, 19, 0.15) 0%, transparent 40%),
              radial-gradient(circle at bottom left, rgba(139, 69, 19, 0.18) 0%, transparent 40%),
              radial-gradient(circle at bottom right, rgba(139, 69, 19, 0.2) 0%, transparent 40%)
            `,
            pointerEvents: 'none',
            zIndex: 2,
          }} />



          {/* Paper texture overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${wrinkledPaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 3,
          }} />

          {/* Map container - Leaflet rendered here with photocopy effect */}
          <div 
            style={{
              position: 'absolute',
              inset: '25px',
              borderRadius: '2px',
              overflow: 'hidden',
              pointerEvents: 'auto',
              zIndex: 1,
              filter: 'saturate(0.6) contrast(1.1) brightness(0.92)',
            }}
          >
            <MapContainer
              center={[playerPosition.lat, playerPosition.lng]}
              zoom={16}
              minZoom={16}
              maxZoom={20}
              style={{ height: '100%', width: '100%' }}
              scrollWheelZoom={true}
              zoomControl={false}
            >
              <MapRefController mapRef={mapRef} />
              <ZoomLimiter />
              <MapController />
              <MapClickHandler />
              
              {/* Base tile layer - desaturated, photocopy style */}
              <TileLayer
                attribution=''
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                minZoom={16}
                maxZoom={20}
              />

              {/* Player marker */}
              <PlayerMarker />

              {/* Collection radius */}
              <CollectionRadius />

              {/* Investigation radius circles for all hotspots */}
              {hotspots.map((hotspot) => {
                const inRange = isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng });
                return (
                  <InvestigationRadiusCircle
                    key={`investigation-radius-${hotspot.id}`}
                    position={[hotspot.lat, hotspot.lng]}
                    inRange={inRange}
                  />
                );
              })}

              {/* Hand-drawn red circle for selected hotspot */}
              {selectedHotspot && (
                <HandDrawnCircle
                  position={[selectedHotspot.lat, selectedHotspot.lng]}
                  label={selectedHotspot.name}
                />
              )}

              {/* Hotspot markers - red pins + paper tags */}
              {hotspots.map((hotspot) => (
                <div key={hotspot.id}>
                  <RedPinMarker position={[hotspot.lat, hotspot.lng]} />
                  <PaperTagMarker
                    position={[hotspot.lat + 0.00008, hotspot.lng + 0.00008]}
                    label={hotspot.name}
                    status={hotspot.status}
                  />
                  <Marker
                    position={[hotspot.lat, hotspot.lng]}
                    eventHandlers={{
                      click: () => {
                        setSelectedHotspot(hotspot);
                      },
                    }}
                  >
                    <Popup>
                      <div style={{ textAlign: 'center', minWidth: '150px', padding: '8px', fontFamily: '"Caveat", cursive' }}>
                        <h3 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#1a0f0a' }}>
                          {hotspot.name}
                        </h3>
                        <p style={{
                          margin: '4px 0',
                          fontSize: '11px',
                          color: isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng }) ? '#2dd4bf' : '#ef4444',
                          fontFamily: '"Courier New", monospace',
                        }}>
                          {isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng }) ? '✓ In range' : '⚠ Out of range'}
                        </p>
                        {hotspot.status === 'unlocked' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const inRange = isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng });
                              if (inRange) {
                                console.log('🔍 Starting investigation at:', hotspot.name);
                                navigate(`/investigate/${hotspot.id}`);
                              } else {
                                console.log('❌ Hotspot out of range');
                                alert('Move closer to investigate this location');
                              }
                            }}
                            disabled={!isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng })}
                            style={{
                              marginTop: '8px',
                              padding: '8px 16px',
                              backgroundColor: isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng }) ? '#8b0000' : '#6b7280',
                              color: '#f4f0e6',
                              border: '2px solid #1a0f0a',
                              borderRadius: '4px',
                              cursor: isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng }) ? 'pointer' : 'not-allowed',
                              fontWeight: 'bold',
                              fontSize: '12px',
                              fontFamily: '"Courier New", monospace',
                              opacity: isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng }) ? 1 : 0.6,
                              textTransform: 'uppercase',
                              letterSpacing: '1px',
                              transition: 'all 0.2s ease',
                            }}
                            onMouseEnter={(e) => {
                              if (isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng })) {
                                e.currentTarget.style.backgroundColor = '#cc0000';
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 4px 12px rgba(139, 0, 0, 0.6), 0 2px 6px rgba(0, 0, 0, 0.4)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (isInRange(playerPosition, { lat: hotspot.lat, lng: hotspot.lng })) {
                                e.currentTarget.style.backgroundColor = '#8b0000';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                              }
                            }}
                          >
                            👻 Investigate
                          </button>
                        )}
                        {hotspot.status === 'locked' && (
                          <p style={{
                            margin: '8px 0 0 0',
                            fontSize: '10px',
                            color: '#666',
                            fontFamily: '"Courier New", monospace',
                            fontStyle: 'italic',
                          }}>
                            Locked
                          </p>
                        )}
                      </div>
                    </Popup>
                  </Marker>
                </div>
              ))}

              {/* Supply node markers */}
              {supplyNodes.map((supply) => (
                <SupplyMarker key={supply.id} supply={supply} onCollect={removeSupplyNode} />
              ))}

              {/* Field Journal markers - RARE spawns */}
              {fieldJournalNodes.map((journalNode) => {
                const journal = getJournalById(journalNode.journalId);
                if (!journal) return null;
                
                return (
                  <FieldJournalMarker
                    key={journalNode.id}
                    journalNode={journalNode}
                    onCollect={(id) => {
                      // Show reading interface first
                      setSelectedJournalForReading(journalNode.journalId);
                      setJournalNodeToRemove(id);
                    }}
                  />
                );
              })}
            </MapContainer>
            
            {/* Paper texture overlay on map - photocopy effect */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${wrinkledPaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.35,
              pointerEvents: 'none',
              zIndex: 1000,
            }} />
          </div>

          {/* Vignette around map edges */}
          <div style={{
            position: 'absolute',
            inset: '25px',
            borderRadius: '2px',
            pointerEvents: 'none',
            zIndex: 5,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
          }} />

          {/* Push pins holding the map */}
          {[
            { top: '12px', left: '12px' },
            { top: '12px', right: '12px' },
            { bottom: '12px', left: '12px' },
            { bottom: '12px', right: '12px' },
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

          {/* Masking tape strips */}
          {[
            { top: '8px', left: '15%', rotation: -8, width: '80px' },
            { bottom: '8px', right: '20%', rotation: 12, width: '60px' },
          ].map((tapeStrip, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...tapeStrip,
                transform: `translateX(-50%) rotate(${tapeStrip.rotation}deg)`,
                width: tapeStrip.width,
                height: '20px',
                backgroundImage: `url(${tape})`,
                backgroundSize: 'cover',
                opacity: 0.7,
                zIndex: 9,
                pointerEvents: 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Red thread connecting selected hotspot to Polaroid */}
      {selectedHotspot && (
        <svg
          style={{
            position: 'absolute',
            top: '60px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(95vw, 1400px)',
            height: 'calc(100vh - 120px)',
            maxHeight: '900px',
            zIndex: 460,
            pointerEvents: 'none',
          }}
        >
          {/* Calculate approximate positions - this is a simplified connection */}
          <line
            x1="75%"
            y1="60%"
            x2="85%"
            y2="15%"
            stroke="rgba(200, 0, 0, 0.5)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      {/* Multiple Polaroid photos on screen edges - Hidden in fullscreen */}
      {!isMapFullscreen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 470,
          pointerEvents: 'none',
        }}>
          {hotspots
            .filter(hotspot => polaroidPositions[hotspot.name])
            .map(hotspot => renderPolaroid(hotspot))}
        </div>
      )}

      {/* Zoomed Polaroid Modal */}
      {isPolaroidZoomed && zoomedPolaroidData && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => {
            setIsPolaroidZoomed(false);
            setZoomedPolaroidData(null);
          }}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              transform: 'rotate(-2deg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              background: '#e8e4dc',
              padding: '20px 20px 60px 20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
              borderRadius: '4px',
              position: 'relative',
            }}>
              {/* Wrinkled paper texture on frame */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${wrinkledPaper})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.5,
                pointerEvents: 'none',
                borderRadius: '4px',
              }} />
              
              <div style={{ position: 'relative' }}>
                <img 
                  src={zoomedPolaroidData.image}
                  alt={zoomedPolaroidData.name}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '800px',
                    maxHeight: '70vh',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                {/* Heavy static/grain overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${filmgrain})`,
                  backgroundSize: '200% 200%',
                  mixBlendMode: 'overlay',
                  opacity: 0.9,
                  pointerEvents: 'none',
                }} />
                {/* Additional dust overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${dust})`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'overlay',
                  opacity: 0.6,
                  pointerEvents: 'none',
                }} />
                {/* Scratch marks */}
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  width: '60px',
                  height: '3px',
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  transform: 'rotate(15deg)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute',
                  bottom: '80px',
                  right: '30px',
                  width: '50px',
                  height: '3px',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  transform: 'rotate(-20deg)',
                  pointerEvents: 'none',
                }} />
                {/* Corner damage */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '40px',
                  height: '40px',
                  background: 'radial-gradient(circle at top right, transparent 40%, rgba(0,0,0,0.4) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '24px',
                color: '#1a1a1a',
                marginTop: '12px',
                textAlign: 'center',
              }}>
                {zoomedPolaroidData.name}
              </div>
            </div>
            
            {/* Tape on top */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-8deg)',
              width: '80px',
              height: '25px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              opacity: 0.9,
            }} />
            
            {/* Close button */}
            <button
              onClick={() => {
                setIsPolaroidZoomed(false);
                setZoomedPolaroidData(null);
              }}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#f4f0e6',
                border: '2px solid #1a0f0a',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace',
                zIndex: 10000,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Sticky notes overlapping map edges - Hidden in fullscreen */}
      {!isMapFullscreen && (
        <>
          <div 
            style={{
              position: 'absolute',
              top: '120px',
              left: '3%',
              zIndex: 480,
              transform: 'rotate(-8deg)',
              pointerEvents: 'auto',
              cursor: 'pointer',
            }}
            onClick={() => setZoomedStickyNote('warning')}
          >
        <div style={{
          background: '#ffeb3b',
          padding: '12px',
          width: '140px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          fontFamily: '"Caveat", cursive',
          fontSize: '14px',
          color: '#1a0f0a',
          lineHeight: '1.6',
          transition: 'all 0.2s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 12px 30px rgba(139, 0, 0, 0.5), 0 6px 16px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.3), 0 0 15px rgba(139, 0, 0, 0.3)';
          e.currentTarget.style.zIndex = '10';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)';
          e.currentTarget.style.zIndex = '1';
        }}
        >
          {/* Wrinkled texture overlay for depth */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${wrinkledPaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.3,
            pointerEvents: 'none',
          }} />
          {/* Subtle shadow for 3D effect */}
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '-2px',
            bottom: '-2px',
            background: 'rgba(0,0,0,0.1)',
            zIndex: -1,
            borderRadius: '2px',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50% 50% 50% 0',
            background: 'radial-gradient(circle at 30% 30%, #cc0000, #990000)',
            transform: 'translateX(-50%) rotate(-45deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }} />
          Do NOT go alone.
        </div>
      </div>

        <div 
          style={{
            position: 'absolute',
            bottom: '100px',
            right: '3%',
            zIndex: 480,
            transform: 'rotate(6deg)',
            pointerEvents: 'auto',
            cursor: 'pointer',
          }}
          onClick={() => setZoomedStickyNote('incident')}
        >
        <div style={{
          background: '#ffeb3b',
          padding: '12px',
          width: '160px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.5), 0 4px 12px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.3)',
          fontFamily: '"Caveat", cursive',
          fontSize: '13px',
          color: '#1a0f0a',
          lineHeight: '1.6',
          transition: 'transform 0.2s ease',
          position: 'relative',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
        }}
        >
          {/* Wrinkled texture overlay for depth */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${wrinkledPaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.3,
            pointerEvents: 'none',
          }} />
          {/* Subtle shadow for 3D effect */}
          <div style={{
            position: 'absolute',
            top: '2px',
            left: '2px',
            right: '-2px',
            bottom: '-2px',
            background: 'rgba(0,0,0,0.1)',
            zIndex: -1,
            borderRadius: '2px',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: '-8px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '12px',
            height: '12px',
            borderRadius: '50% 50% 50% 0',
            background: 'radial-gradient(circle at 30% 30%, #cc0000, #990000)',
            transform: 'translateX(-50%) rotate(-45deg)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }} />
          Last incident:<br />
          02:37 AM – 3 missing.
        </div>
      </div>
        </>
      )}

      {/* Exit Fullscreen Button - Only visible in fullscreen mode */}
      {isMapFullscreen && (
        <button
          onClick={() => setIsMapFullscreen(false)}
          style={{
            position: 'fixed',
            top: '80px',
            right: '20px',
            zIndex: 1000,
            padding: '10px 20px',
            background: '#8b0000',
            border: '2px solid #1a0f0a',
            borderRadius: '4px',
            color: '#f4f0e6',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#cc0000';
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#8b0000';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          Exit Fullscreen
        </button>
      )}

      {/* Zoomed Sticky Note Modal */}
      {zoomedStickyNote && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setZoomedStickyNote(null)}
        >
          <div
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              transform: zoomedStickyNote === 'warning' ? 'rotate(-8deg)' : 'rotate(6deg)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              background: '#ffeb3b',
              padding: '40px',
              width: zoomedStickyNote === 'warning' ? '400px' : '450px',
              boxShadow: '0 12px 40px rgba(0,0,0,0.8), 0 6px 20px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.4)',
              fontFamily: '"Caveat", cursive',
              fontSize: zoomedStickyNote === 'warning' ? '32px' : '28px',
              color: '#1a0f0a',
              lineHeight: '1.8',
              position: 'relative',
            }}>
              {/* Wrinkled texture overlay for depth */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${wrinkledPaper})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.4,
                pointerEvents: 'none',
              }} />
              {/* Subtle shadow for 3D effect */}
              <div style={{
                position: 'absolute',
                top: '4px',
                left: '4px',
                right: '-4px',
                bottom: '-4px',
                background: 'rgba(0,0,0,0.15)',
                zIndex: -1,
                borderRadius: '2px',
                pointerEvents: 'none',
              }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                {zoomedStickyNote === 'warning' ? (
                  'Do NOT go alone.'
                ) : (
                  <>
                    Last incident:<br />
                    02:37 AM – 3 missing.
                  </>
                )}
              </div>
            </div>
            
            {/* Push pin */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-45deg)',
              width: '20px',
              height: '20px',
              borderRadius: '50% 50% 50% 0',
              background: 'radial-gradient(circle at 30% 30%, #cc0000, #990000)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.6)',
            }} />
            
            {/* Close button */}
            <button
              onClick={() => setZoomedStickyNote(null)}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#f4f0e6',
                border: '2px solid #1a0f0a',
                fontSize: '24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'monospace',
                zIndex: 10000,
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Low-contrast attribution */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 500,
        fontFamily: '"Courier New", monospace',
        fontSize: '8px',
        color: 'rgba(139, 111, 71, 0.3)',
        pointerEvents: 'none',
      }}>
        © OpenStreetMap contributors
      </div>

      {/* Journal Reading Modal */}
      {selectedJournalForReading && (() => {
        const journal = getJournalById(selectedJournalForReading);
        if (!journal) return null;
        
        return (
          <JournalReadingModal
            journal={journal}
            onClose={() => {
              setSelectedJournalForReading(null);
              // Remove journal node from map if it was collected
              if (journalNodeToRemove) {
                removeFieldJournalNode(journalNodeToRemove);
                setJournalNodeToRemove(null);
              }
            }}
            onAddToCollection={() => {
              // Add journal to collection - ensure it's actually added
              const journalId = selectedJournalForReading;
              if (!journalId || !journal) {
                console.error('❌ Cannot add journal: missing ID or journal data');
                return;
              }
              
              // Always add the journal (the context will check for duplicates)
              console.log('📚 Adding journal to collection:', journalId, journal.location);
              addJournal(journal);
              
              // Show notification
              setShowJournalNotification(true);
              setTimeout(() => {
                setShowJournalNotification(false);
              }, 3000);
              
              // Remove from map after collection
              if (journalNodeToRemove) {
                setTimeout(() => {
                  removeFieldJournalNode(journalNodeToRemove);
                  setJournalNodeToRemove(null);
                }, 500);
              }
            }}
          />
        );
      })()}

      {/* Journal Collected Notification - Analog Horror Style */}
      {showJournalNotification && (
        <div
          style={{
            position: 'fixed',
            top: '100px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-0.5deg)',
            zIndex: 10001,
            backgroundColor: '#d8d4c8',
            border: '3px solid #1a0f0a',
            borderRadius: '4px',
            padding: '20px 28px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.8), 0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(0,0,0,0.1)',
            fontFamily: '"Courier New", monospace',
            fontSize: '16px',
            color: '#1a0f0a',
            fontWeight: 'bold',
            textAlign: 'center',
            animation: 'fadeInScale 0.3s ease-out',
            pointerEvents: 'none',
            maxWidth: '90%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Aged paper texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${wrinkledPaper})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
          }} />
          
          {/* Dust overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.2,
            pointerEvents: 'none',
          }} />
          
          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ 
              fontSize: '28px', 
              marginBottom: '10px',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
            }}>
              📚
            </div>
            <div style={{
              fontSize: '18px',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '4px',
            }}>
              Journal Collected
            </div>
            <div style={{
              fontSize: '11px',
              color: '#666',
              fontStyle: 'italic',
              letterSpacing: '0.5px',
            }}>
              Added to Field Journals
            </div>
          </div>
          
          {/* Tape piece for authenticity */}
          <div style={{
            position: 'absolute',
            top: '-6px',
            left: '20px',
            width: '30px',
            height: '12px',
            backgroundImage: `url(${tape})`,
            backgroundSize: 'cover',
            opacity: 0.6,
            transform: 'rotate(-15deg)',
            pointerEvents: 'none',
          }} />
        </div>
      )}

      {/* Dev Mode Badge */}
      <DevModeBadge />

      {/* Recenter button - restyled for corkboard */}
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

      {/* Unified Backpack - Overworld Mode */}
      <UnifiedBackpack mode="overworld" />
    </div>
  );
}
