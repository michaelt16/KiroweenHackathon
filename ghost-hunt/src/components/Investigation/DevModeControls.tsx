// Dev Mode Controls for testing GPS movement on desktop
import { useEffect, useState } from 'react';
import type { GPSPosition } from '../../utils/gps';
import { useInvestigationStore } from '../../stores/investigationStore';
import { calculateDistance, calculateBearing } from '../../utils/toolBehaviors';

// Helper: Get cardinal direction from degrees
function getCardinalDirection(degrees: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.round(normalized / 45) % 8;
  return directions[index];
}

interface DevModeControlsProps {
  onPositionUpdate: (position: GPSPosition) => void;
  initialPosition: GPSPosition;
  ghostPosition?: GPSPosition | null;
  ghostDistance?: number;
  currentHeading?: number; // Compass heading (0-360°)
}

export function DevModeControls({ onPositionUpdate, initialPosition, ghostPosition, ghostDistance, currentHeading = 0 }: DevModeControlsProps) {
  const [position, setPosition] = useState(initialPosition);
  const [startPosition] = useState(initialPosition); // Fixed reference point
  const [isVisible, setIsVisible] = useState(true);
  
  // Get heading directly from investigation store to ensure it's always in sync
  const storeHeading = useInvestigationStore((state) => state.playerHeading);
  // Use store heading if available, otherwise fall back to prop
  const effectiveHeading = storeHeading ?? currentHeading;
  
  // Get Spirit Box tuning info for dev mode
  const spiritBoxSignature = useInvestigationStore((state) => state.spiritBoxSignature);
  const spiritBoxKnobs = useInvestigationStore((state) => state.spiritBoxKnobs);
  const activeTool = useInvestigationStore((state) => state.activeTool);
  const generateNewSignature = useInvestigationStore((state) => state.generateNewSpiritBoxSignature);
  const setSpiritBoxKnobs = useInvestigationStore((state) => state.setSpiritBoxKnobs);

  // Movement speed: ~10 meters per keypress (faster for testing)
  const METERS_PER_STEP = 10;
  const METERS_PER_DEGREE_LAT = 111000; // ~111km per degree latitude (constant)
  
  // Calculate movement delta based on heading
  // Note: Longitude conversion depends on latitude (lines converge at poles)
  const moveInDirection = (forward: boolean) => {
    const heading = effectiveHeading || 0;
    const headingRad = (heading * Math.PI) / 180;
    const direction = forward ? 1 : -1;
    
    // Calculate lat/lng delta based on heading
    // Heading 0° = North, 90° = East, 180° = South, 270° = West
    // Latitude: constant ~111km per degree
    const latDelta = Math.cos(headingRad) * METERS_PER_STEP / METERS_PER_DEGREE_LAT * direction;
    // Longitude: varies by latitude (111km * cos(lat) per degree)
    const currentLatRad = (position.lat * Math.PI) / 180;
    const metersPerDegreeLng = METERS_PER_DEGREE_LAT * Math.cos(currentLatRad);
    const lngDelta = Math.sin(headingRad) * METERS_PER_STEP / metersPerDegreeLng * direction;
    
    console.log('🎮 Movement calc:', {
      heading,
      headingRad,
      direction,
      latDelta,
      lngDelta,
      currentLat: position.lat,
      metersPerStep: METERS_PER_STEP,
      metersPerDegreeLat: METERS_PER_DEGREE_LAT,
      metersPerDegreeLng: metersPerDegreeLng
    });
    
    return { latDelta, lngDelta };
  };

  // Handle keyboard controls (W/S or Arrow Up/Down)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      let latDelta = 0;
      let lngDelta = 0;

      switch (e.key.toLowerCase()) {
        case 'w':
        case 'arrowup': {
          // Move forward in the direction of current heading
          const headingRad = (effectiveHeading * Math.PI) / 180;
          latDelta = Math.cos(headingRad) * METERS_PER_STEP / METERS_PER_DEGREE_LAT;
          const currentLatRad = (position.lat * Math.PI) / 180;
          const metersPerDegreeLng = METERS_PER_DEGREE_LAT * Math.cos(currentLatRad);
          lngDelta = Math.sin(headingRad) * METERS_PER_STEP / metersPerDegreeLng;
          break;
        }
        case 's':
        case 'arrowdown': {
          // Move backward (opposite of current heading)
          const headingRad = (effectiveHeading * Math.PI) / 180;
          latDelta = -Math.cos(headingRad) * METERS_PER_STEP / METERS_PER_DEGREE_LAT;
          const currentLatRad = (position.lat * Math.PI) / 180;
          const metersPerDegreeLng = METERS_PER_DEGREE_LAT * Math.cos(currentLatRad);
          lngDelta = -Math.sin(headingRad) * METERS_PER_STEP / metersPerDegreeLng;
          break;
        }
        default:
          return;
      }

      const newPosition: GPSPosition = {
        lat: position.lat + latDelta,
        lng: position.lng + lngDelta,
        accuracy: 5,
        timestamp: Date.now(),
      };

      setPosition(newPosition);
      onPositionUpdate(newPosition);
      console.log('🎮 Dev Mode: Moved to', newPosition, 'heading:', effectiveHeading);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position, onPositionUpdate, effectiveHeading]);

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        style={{
          position: 'absolute',
          top: '80px',
          left: '10px',
          padding: '8px 12px',
          backgroundColor: 'rgba(139, 92, 246, 0.9)',
          border: '2px solid rgba(167, 139, 250, 0.5)',
          borderRadius: '8px',
          color: '#e9d5ff',
          fontSize: '12px',
          cursor: 'pointer',
          zIndex: 1000,
          fontWeight: 'bold',
        }}
      >
        🎮 Dev Mode
      </button>
    );
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '80px',
        left: '10px',
        zIndex: 1000,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '2px solid rgba(139, 92, 246, 0.5)',
        borderRadius: '12px',
        padding: '12px',
        width: '320px',
        maxHeight: '85vh',
        overflowY: 'auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
      className="dev-mode-panel"
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#a78bfa',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          🎮 Dev Mode
        </div>
        <button
          onClick={() => setIsVisible(false)}
          style={{
            padding: '4px 8px',
            backgroundColor: 'rgba(139, 92, 246, 0.2)',
            border: '1px solid rgba(167, 139, 250, 0.3)',
            borderRadius: '4px',
            color: '#a78bfa',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          Hide
        </button>
      </div>

      {/* Controls Info */}
      <div
        style={{
          marginBottom: '12px',
          padding: '12px',
          backgroundColor: 'rgba(139, 92, 246, 0.1)',
          borderRadius: '8px',
        }}
      >
        <div style={{ fontSize: '11px', color: '#c4b5fd', marginBottom: '8px', fontWeight: 'bold' }}>
          Movement Controls:
        </div>
        <div style={{ fontSize: '10px', color: '#a78bfa', lineHeight: '1.6' }}>
          <div>🔼 <strong>W / ↑</strong> - Move Forward</div>
          <div>🔽 <strong>S / ↓</strong> - Move Backward</div>
        </div>
        <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '6px', fontStyle: 'italic' }}>
          Direction follows radar heading
        </div>
        <div style={{ fontSize: '10px', color: '#c4b5fd', marginTop: '6px', fontWeight: 'bold' }}>
          🧭 Heading: {Math.round(effectiveHeading)}° ({getCardinalDirection(effectiveHeading)})
        </div>
        <div style={{ fontSize: '9px', color: '#94a3b8', marginTop: '4px', fontStyle: 'italic' }}>
          Forward = Move in this direction
        </div>
      </div>

      {/* Position Info - Side by Side */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
        {/* Current Position */}
        <div
          style={{
            padding: '6px',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '6px',
            fontSize: '9px',
            fontFamily: 'monospace',
            flex: 1,
          }}
        >
          <div style={{ color: '#94a3b8', marginBottom: '2px', fontSize: '8px' }}>Your Pos:</div>
          <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '10px' }}>
            X: {Math.round((position.lng - startPosition.lng) * 111000)}m
          </div>
          <div style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '10px' }}>
            Y: {Math.round((position.lat - startPosition.lat) * 111000)}m
          </div>
        </div>

        {/* Ghost Position */}
        {ghostPosition && (
          <div
            style={{
              padding: '6px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '6px',
              fontSize: '9px',
              fontFamily: 'monospace',
              flex: 1,
            }}
          >
            <div style={{ color: '#fca5a5', marginBottom: '2px', fontSize: '8px' }}>👻 Ghost:</div>
            <div style={{ color: '#fca5a5', fontWeight: 'bold', fontSize: '10px' }}>
              X: {Math.round((ghostPosition.lng - startPosition.lng) * 111000)}m
            </div>
            <div style={{ color: '#fca5a5', fontWeight: 'bold', fontSize: '10px' }}>
              Y: {Math.round((ghostPosition.lat - startPosition.lat) * 111000)}m
            </div>
            {ghostDistance !== undefined && (
              <div style={{ color: '#ef4444', marginTop: '4px', fontWeight: 'bold', fontSize: '9px' }}>
                📏 {ghostDistance.toFixed(1)}m
              </div>
            )}
          </div>
        )}
      </div>

      {/* Distance & Bearing to Ghost - Compact */}
      {ghostPosition && (
        <div
          style={{
            padding: '6px',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '6px',
            fontSize: '9px',
            fontFamily: 'monospace',
            marginBottom: '8px',
          }}
        >
          <div style={{ color: '#86efac', marginBottom: '2px', fontWeight: 'bold', fontSize: '10px' }}>
            📍 Nav: {Math.round(calculateDistance(position, ghostPosition))}m | {Math.round(calculateBearing(position, ghostPosition))}° | Facing: {Math.round(effectiveHeading)}°
          </div>
        </div>
      )}

      {/* Ghost Position Helper - Visual Guide */}
      {ghostPosition && (() => {
        const ghostBearingAbs = calculateBearing(position, ghostPosition);
        const relativeBearing = (ghostBearingAbs - effectiveHeading + 360) % 360;
        const distance = calculateDistance(position, ghostPosition);
        
        // Determine position relative to player
        let positionText = '';
        let positionEmoji = '';
        let instructionText = '';
        let bgColor = 'rgba(139, 92, 246, 0.2)';
        let borderColor = 'rgba(167, 139, 250, 0.5)';
        
        if (relativeBearing >= 337.5 || relativeBearing < 22.5) {
          positionText = 'AHEAD';
          positionEmoji = '⬆️';
          instructionText = 'Ghost is straight ahead!';
          bgColor = 'rgba(34, 197, 94, 0.2)';
          borderColor = 'rgba(34, 197, 94, 0.5)';
        } else if (relativeBearing >= 22.5 && relativeBearing < 67.5) {
          positionText = 'FRONT-RIGHT';
          positionEmoji = '↗️';
          instructionText = 'Ghost is to your front-right';
          bgColor = 'rgba(34, 197, 94, 0.15)';
          borderColor = 'rgba(34, 197, 94, 0.4)';
        } else if (relativeBearing >= 67.5 && relativeBearing < 112.5) {
          positionText = 'RIGHT';
          positionEmoji = '➡️';
          instructionText = 'Turn LEFT to face ghost';
          bgColor = 'rgba(251, 191, 36, 0.2)';
          borderColor = 'rgba(251, 191, 36, 0.5)';
        } else if (relativeBearing >= 112.5 && relativeBearing < 157.5) {
          positionText = 'BACK-RIGHT';
          positionEmoji = '↘️';
          instructionText = 'Ghost is behind-right - Turn LEFT';
          bgColor = 'rgba(239, 68, 68, 0.2)';
          borderColor = 'rgba(239, 68, 68, 0.5)';
        } else if (relativeBearing >= 157.5 && relativeBearing < 202.5) {
          positionText = 'BEHIND';
          positionEmoji = '⬇️';
          instructionText = 'Ghost is BEHIND you - TURN AROUND';
          bgColor = 'rgba(239, 68, 68, 0.3)';
          borderColor = 'rgba(239, 68, 68, 0.6)';
        } else if (relativeBearing >= 202.5 && relativeBearing < 247.5) {
          positionText = 'BACK-LEFT';
          positionEmoji = '↙️';
          instructionText = 'Ghost is behind-left - Turn RIGHT';
          bgColor = 'rgba(239, 68, 68, 0.2)';
          borderColor = 'rgba(239, 68, 68, 0.5)';
        } else if (relativeBearing >= 247.5 && relativeBearing < 292.5) {
          positionText = 'LEFT';
          positionEmoji = '⬅️';
          instructionText = 'Turn RIGHT to face ghost';
          bgColor = 'rgba(251, 191, 36, 0.2)';
          borderColor = 'rgba(251, 191, 36, 0.5)';
        } else {
          positionText = 'FRONT-LEFT';
          positionEmoji = '↖️';
          instructionText = 'Ghost is to your front-left';
          bgColor = 'rgba(34, 197, 94, 0.15)';
          borderColor = 'rgba(34, 197, 94, 0.4)';
        }
        
        return (
          <div
            style={{
              padding: '8px',
              backgroundColor: bgColor,
              border: `2px solid ${borderColor}`,
              borderRadius: '6px',
              fontSize: '10px',
              fontFamily: 'monospace',
              textAlign: 'center',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <div style={{ 
              fontSize: '20px', 
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              flexShrink: 0,
            }}>
              {positionEmoji}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ 
                color: '#ffffff', 
                fontWeight: 'bold', 
                fontSize: '11px',
                marginBottom: '2px',
                textTransform: 'uppercase',
              }}>
                {positionText}
              </div>
              <div style={{ 
                color: '#e9d5ff', 
                fontSize: '9px',
                marginBottom: '2px',
                fontWeight: 'bold'
              }}>
                {instructionText}
              </div>
              <div style={{ 
                color: '#c4b5fd', 
                fontSize: '8px',
              }}>
                📏 {distance.toFixed(1)}m
              </div>
            </div>
          </div>
        );
      })()}

      {/* Quick Movement Buttons */}
      <div
        style={{
          marginTop: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          alignItems: 'center',
        }}
      >
        <button
          onClick={() => {
            // Get fresh heading from store on click to ensure it's current
            const freshHeading = useInvestigationStore.getState().playerHeading ?? effectiveHeading;
            const headingRad = (freshHeading * Math.PI) / 180;
            
            // Calculate movement with proper coordinate conversion
            const latDelta = Math.cos(headingRad) * METERS_PER_STEP / METERS_PER_DEGREE_LAT;
            const currentLatRad = (position.lat * Math.PI) / 180;
            const metersPerDegreeLng = METERS_PER_DEGREE_LAT * Math.cos(currentLatRad);
            const lngDelta = Math.sin(headingRad) * METERS_PER_STEP / metersPerDegreeLng;
            
            const newPos = {
              ...position,
              lat: position.lat + latDelta,
              lng: position.lng + lngDelta,
              timestamp: Date.now(),
            };
            setPosition(newPos);
            onPositionUpdate(newPos);
            
            // Calculate distance to ghost for debugging
            const store = useInvestigationStore.getState();
            let distanceToGhost = null;
            if (store.ghostPosition) {
              const { calculateDistance } = require('../../utils/toolBehaviors');
              distanceToGhost = calculateDistance(newPos, store.ghostPosition);
            }
            
            console.log('🎮 Forward: Heading', freshHeading, '→ Moved', { 
              latDelta: latDelta.toFixed(8), 
              lngDelta: lngDelta.toFixed(8),
              newPos: { lat: newPos.lat.toFixed(6), lng: newPos.lng.toFixed(6) },
              distanceToGhost: distanceToGhost ? distanceToGhost.toFixed(1) + 'm' : 'N/A'
            });
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(139, 92, 246, 0.3)',
            border: '1px solid rgba(167, 139, 250, 0.5)',
            borderRadius: '4px',
            color: '#e9d5ff',
            fontSize: '14px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          ⬆️ Forward
        </button>
        <button
          onClick={() => {
            // Get fresh heading from store on click to ensure it's current
            const freshHeading = useInvestigationStore.getState().playerHeading ?? effectiveHeading;
            const headingRad = (freshHeading * Math.PI) / 180;
            
            // Calculate movement with proper coordinate conversion (negative for backward)
            const latDelta = -Math.cos(headingRad) * METERS_PER_STEP / METERS_PER_DEGREE_LAT;
            const currentLatRad = (position.lat * Math.PI) / 180;
            const metersPerDegreeLng = METERS_PER_DEGREE_LAT * Math.cos(currentLatRad);
            const lngDelta = -Math.sin(headingRad) * METERS_PER_STEP / metersPerDegreeLng;
            
            const newPos = {
              ...position,
              lat: position.lat + latDelta,
              lng: position.lng + lngDelta,
              timestamp: Date.now(),
            };
            setPosition(newPos);
            onPositionUpdate(newPos);
            
            // Calculate distance to ghost for debugging
            const store = useInvestigationStore.getState();
            let distanceToGhost = null;
            if (store.ghostPosition) {
              const { calculateDistance } = require('../../utils/toolBehaviors');
              distanceToGhost = calculateDistance(newPos, store.ghostPosition);
            }
            
            console.log('🎮 Backward: Heading', freshHeading, '→ Moved', { 
              latDelta: latDelta.toFixed(8), 
              lngDelta: lngDelta.toFixed(8),
              newPos: { lat: newPos.lat.toFixed(6), lng: newPos.lng.toFixed(6) },
              distanceToGhost: distanceToGhost ? distanceToGhost.toFixed(1) + 'm' : 'N/A'
            });
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: 'rgba(139, 92, 246, 0.3)',
            border: '1px solid rgba(167, 139, 250, 0.5)',
            borderRadius: '4px',
            color: '#e9d5ff',
            fontSize: '14px',
            cursor: 'pointer',
            flex: 1,
          }}
        >
          ⬇️ Backward
        </button>
      </div>

      <div
        style={{
          marginTop: '8px',
          fontSize: '9px',
          color: '#64748b',
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        ~10m per key/button
      </div>

      {/* Spirit Box Tuning Debug - Always show in dev mode */}
      <div
        style={{
          marginTop: '16px',
          padding: '10px',
          backgroundColor: 'rgba(139, 92, 246, 0.2)',
          border: '1px solid rgba(167, 139, 250, 0.4)',
          borderRadius: '6px',
        }}
      >
        <div
          style={{
            fontSize: '11px',
            fontWeight: 'bold',
            color: '#a78bfa',
            marginBottom: '8px',
            borderBottom: '1px solid rgba(167, 139, 250, 0.3)',
            paddingBottom: '4px',
          }}
        >
          🎛️ Spirit Box Tuning
        </div>
        
        {spiritBoxSignature ? (
          <>
            {/* Target Frequency */}
            <div style={{ marginBottom: '6px' }}>
              <div style={{ fontSize: '9px', color: '#a78bfa', marginBottom: '2px' }}>Target Frequency:</div>
              <div style={{ fontSize: '10px', color: '#86efac', fontFamily: 'monospace' }}>
                TUNE: <strong>{spiritBoxSignature.knobA.toFixed(4)}</strong>
              </div>
              <div style={{ fontSize: '10px', color: '#86efac', fontFamily: 'monospace' }}>
                VOL: <strong>{spiritBoxSignature.knobB.toFixed(4)}</strong>
              </div>
            </div>
            
            {/* Current Frequency */}
            {spiritBoxKnobs ? (
              <div style={{ marginBottom: '6px' }}>
                <div style={{ fontSize: '9px', color: '#a78bfa', marginBottom: '2px' }}>Current Frequency:</div>
                <div style={{ fontSize: '10px', color: '#e9d5ff', fontFamily: 'monospace' }}>
                  TUNE: <strong>{spiritBoxKnobs.knobA.toFixed(4)}</strong>
                </div>
                <div style={{ fontSize: '10px', color: '#e9d5ff', fontFamily: 'monospace' }}>
                  VOL: <strong>{spiritBoxKnobs.knobB.toFixed(4)}</strong>
                </div>
              </div>
            ) : (
              <div style={{ marginBottom: '6px', fontSize: '9px', color: '#ffaa00', fontStyle: 'italic' }}>
                (No current values - open Spirit Box tool)
              </div>
            )}
            
            {/* Difference */}
            {spiritBoxKnobs && (
              <div style={{ marginBottom: '6px' }}>
                <div style={{ fontSize: '9px', color: '#a78bfa', marginBottom: '2px' }}>Difference:</div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace' }}>
                  TUNE: <span style={{ 
                    color: Math.abs(spiritBoxKnobs.knobA - spiritBoxSignature.knobA) < (spiritBoxSignature.tolerance * 1.5) ? '#00ff00' : '#ffaa00'
                  }}>
                    {(spiritBoxKnobs.knobA - spiritBoxSignature.knobA).toFixed(4)}
                  </span>
                </div>
                <div style={{ fontSize: '10px', fontFamily: 'monospace' }}>
                  VOL: <span style={{ 
                    color: Math.abs(spiritBoxKnobs.knobB - spiritBoxSignature.knobB) < (spiritBoxSignature.tolerance * 1.5) ? '#00ff00' : '#ffaa00'
                  }}>
                    {(spiritBoxKnobs.knobB - spiritBoxSignature.knobB).toFixed(4)}
                  </span>
                </div>
              </div>
            )}
            
            {/* Quick Set Buttons */}
            <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
              <button
                onClick={() => {
                  if (spiritBoxSignature && setSpiritBoxKnobs) {
                    setSpiritBoxKnobs({
                      knobA: spiritBoxSignature.knobA,
                      knobB: spiritBoxSignature.knobB,
                    });
                    console.log('🎯 Dev Mode: Auto-calibrated knobs to target:', {
                      knobA: spiritBoxSignature.knobA.toFixed(4),
                      knobB: spiritBoxSignature.knobB.toFixed(4),
                    });
                  }
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  backgroundColor: 'rgba(139, 92, 246, 0.3)',
                  border: '1px solid rgba(167, 139, 250, 0.5)',
                  borderRadius: '4px',
                  color: '#a78bfa',
                  fontSize: '9px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                Auto Calibrate
              </button>
              
              <button
                onClick={() => {
                  if (generateNewSignature) {
                    generateNewSignature();
                  }
                }}
                style={{
                  flex: 1,
                  padding: '6px',
                  backgroundColor: 'rgba(139, 92, 246, 0.2)',
                  border: '1px solid rgba(167, 139, 250, 0.3)',
                  borderRadius: '4px',
                  color: '#a78bfa',
                  fontSize: '9px',
                  cursor: 'pointer',
                  fontFamily: 'monospace',
                }}
              >
                New Signature
              </button>
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: '9px', color: '#ffaa00', fontStyle: 'italic', marginBottom: '8px' }}>
              No signature initialized. Click below to generate one.
            </div>
            <button
              onClick={() => {
                if (generateNewSignature) {
                  generateNewSignature();
                }
              }}
              style={{
                width: '100%',
                padding: '6px',
                backgroundColor: 'rgba(139, 92, 246, 0.3)',
                border: '1px solid rgba(167, 139, 250, 0.5)',
                borderRadius: '4px',
                color: '#a78bfa',
                fontSize: '9px',
                cursor: 'pointer',
                fontFamily: 'monospace',
              }}
            >
              Initialize Signature
            </button>
          </>
        )}
      </div>

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .dev-mode-panel {
            top: 10px !important;
            left: 5px !important;
            width: 200px !important;
            max-width: 200px !important;
            padding: 8px !important;
            font-size: 10px !important;
            max-height: 90vh !important;
          }
          
          .dev-mode-panel > div {
            margin-bottom: 6px !important;
          }
          
          .dev-mode-panel button {
            padding: 8px 12px !important;
            font-size: 12px !important;
          }
        }
        
        @media (max-width: 480px) {
          .dev-mode-panel {
            width: 180px !important;
            max-width: 180px !important;
            padding: 6px !important;
            font-size: 9px !important;
            max-height: 85vh !important;
          }
          
          .dev-mode-panel button {
            padding: 6px 10px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
}
