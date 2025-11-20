// Dev Mode Controls for testing GPS movement on desktop
import { useEffect, useState } from 'react';
import type { GPSPosition } from '../../utils/gps';

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

  // Movement speed: ~10 meters per keypress (faster for testing)
  const METERS_PER_STEP = 10;
  const METERS_TO_DEGREES = 1 / 111000; // Approximate conversion

  // Calculate movement delta based on heading
  const moveInDirection = (forward: boolean) => {
    const heading = currentHeading || 0;
    const headingRad = (heading * Math.PI) / 180;
    const direction = forward ? 1 : -1;
    
    // Calculate lat/lng delta based on heading
    // Heading 0° = North, 90° = East, 180° = South, 270° = West
    const latDelta = Math.cos(headingRad) * METERS_PER_STEP * METERS_TO_DEGREES * direction;
    const lngDelta = Math.sin(headingRad) * METERS_PER_STEP * METERS_TO_DEGREES * direction;
    
    console.log('🎮 Movement calc:', {
      heading,
      headingRad,
      direction,
      latDelta,
      lngDelta,
      metersPerStep: METERS_PER_STEP,
      metersToDegrees: METERS_TO_DEGREES
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
          const delta = moveInDirection(true);
          latDelta = delta.latDelta;
          lngDelta = delta.lngDelta;
          break;
        }
        case 's':
        case 'arrowdown': {
          // Move backward (opposite of current heading)
          const delta = moveInDirection(false);
          latDelta = delta.latDelta;
          lngDelta = delta.lngDelta;
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
      console.log('🎮 Dev Mode: Moved to', newPosition, 'heading:', currentHeading);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [position, onPositionUpdate, currentHeading]);

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
        position: 'absolute',
        top: '80px',
        left: '10px',
        zIndex: 1000,
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        border: '2px solid rgba(139, 92, 246, 0.5)',
        borderRadius: '12px',
        padding: '16px',
        minWidth: '200px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }}
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
        {currentHeading !== undefined && (
          <div style={{ fontSize: '10px', color: '#c4b5fd', marginTop: '6px', fontWeight: 'bold' }}>
            🧭 Heading: {Math.round(currentHeading)}°
          </div>
        )}
      </div>

      {/* Current Position */}
      <div
        style={{
          padding: '8px',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '6px',
          fontSize: '10px',
          fontFamily: 'monospace',
        }}
      >
        <div style={{ color: '#94a3b8', marginBottom: '4px' }}>Your Position:</div>
        <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>
          X: {Math.round((position.lng - startPosition.lng) * 111000)}m
        </div>
        <div style={{ color: '#a78bfa', fontWeight: 'bold' }}>
          Y: {Math.round((position.lat - startPosition.lat) * 111000)}m
        </div>
        <div style={{ color: '#64748b', fontSize: '8px', marginTop: '4px' }}>
          {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
        </div>
      </div>

      {/* Ghost Position */}
      {ghostPosition && (
        <div
          style={{
            padding: '8px',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '6px',
            fontSize: '10px',
            fontFamily: 'monospace',
            marginTop: '8px',
          }}
        >
          <div style={{ color: '#fca5a5', marginBottom: '4px' }}>👻 Ghost Position:</div>
          <div style={{ color: '#fca5a5', fontWeight: 'bold' }}>
            X: {Math.round((ghostPosition.lng - startPosition.lng) * 111000)}m
          </div>
          <div style={{ color: '#fca5a5', fontWeight: 'bold' }}>
            Y: {Math.round((ghostPosition.lat - startPosition.lat) * 111000)}m
          </div>
          <div style={{ color: '#64748b', fontSize: '8px', marginTop: '4px' }}>
            {ghostPosition.lat.toFixed(6)}, {ghostPosition.lng.toFixed(6)}
          </div>
          {ghostDistance !== undefined && (
            <div style={{ color: '#ef4444', marginTop: '6px', fontWeight: 'bold', fontSize: '11px' }}>
              📏 Distance: {ghostDistance.toFixed(1)}m
            </div>
          )}
        </div>
      )}

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
            const delta = moveInDirection(true);
            const newPos = {
              ...position,
              lat: position.lat + delta.latDelta,
              lng: position.lng + delta.lngDelta,
              timestamp: Date.now(),
            };
            setPosition(newPos);
            onPositionUpdate(newPos);
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(139, 92, 246, 0.3)',
            border: '1px solid rgba(167, 139, 250, 0.5)',
            borderRadius: '4px',
            color: '#e9d5ff',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          ⬆️ Forward
        </button>
        <button
          onClick={() => {
            const delta = moveInDirection(false);
            const newPos = {
              ...position,
              lat: position.lat + delta.latDelta,
              lng: position.lng + delta.lngDelta,
              timestamp: Date.now(),
            };
            setPosition(newPos);
            onPositionUpdate(newPos);
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: 'rgba(139, 92, 246, 0.3)',
            border: '1px solid rgba(167, 139, 250, 0.5)',
            borderRadius: '4px',
            color: '#e9d5ff',
            fontSize: '16px',
            cursor: 'pointer',
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
    </div>
  );
}
