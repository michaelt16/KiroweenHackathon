// Thermal Scanner - Infrared Temperature Detection
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

export function ThermalScanner() {
  const { ghostPosition, ghostType } = useInvestigation();
  const [temperature, setTemperature] = useState(68); // Base temp in Fahrenheit
  const [coldSpots, setColdSpots] = useState<Array<{ x: number; y: number; id: number; intensity: number }>>([]);

  useEffect(() => {
    // Temperature drop multiplier based on ghost type
    const coldMultipliers: Record<string, number> = {
      Wraith: 0.3,      // Minimal cold (not a cold ghost)
      Shade: 2.0,       // Very cold (key trait)
      Poltergeist: 0.2, // Almost no cold
    };
    
    const multiplier = coldMultipliers[ghostType] || 1;
    
    // Temperature drops when ghost is closer, modified by ghost type
    const interval = setInterval(() => {
      const baseDrop = (1 - ghostPosition.distance) * 30 * multiplier;
      const baseTemp = 68 - baseDrop; // Can drop significantly for Shade
      const noise = Math.random() * 4 - 2;
      setTemperature(baseTemp + noise);
    }, 500);

    return () => clearInterval(interval);
  }, [ghostPosition.distance, ghostType]);

  useEffect(() => {
    // Cold spot generation frequency based on ghost type
    const coldSpotChances: Record<string, number> = {
      Wraith: 0.8,      // Rare cold spots
      Shade: 0.3,       // Frequent cold spots (key trait)
      Poltergeist: 0.9, // Very rare cold spots
    };
    
    const threshold = coldSpotChances[ghostType] || 0.6;
    
    // Generate cold spots randomly
    const interval = setInterval(() => {
      if (Math.random() > threshold) {
        const newSpot = {
          x: Math.random() * 100,
          y: Math.random() * 100,
          id: Date.now(),
          intensity: Math.random(),
        };
        setColdSpots((prev) => [...prev, newSpot].slice(-5));
      }
    }, 2000);

    // Fade out old spots
    const fadeInterval = setInterval(() => {
      setColdSpots((prev) => prev.filter((spot) => Date.now() - spot.id < 4000));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(fadeInterval);
    };
  }, []);

  const isCold = temperature < 50;
  const isFreezingCold = temperature < 40;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
      }}
    >
      {/* Thermal Overlay Effect */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `radial-gradient(circle at 50% 50%, 
            rgba(139, 0, 139, 0.3) 0%, 
            rgba(0, 0, 139, 0.3) 30%, 
            rgba(0, 100, 200, 0.2) 60%, 
            rgba(0, 0, 0, 0.8) 100%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Cold Spots */}
      {coldSpots.map((spot) => (
        <div
          key={spot.id}
          style={{
            position: 'absolute',
            left: `${spot.x}%`,
            top: `${spot.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${80 + spot.intensity * 40}px`,
            height: `${80 + spot.intensity * 40}px`,
            borderRadius: '50%',
            background: `radial-gradient(circle, 
              rgba(0, 100, 255, ${0.6 * spot.intensity}) 0%, 
              rgba(0, 200, 255, ${0.3 * spot.intensity}) 40%, 
              transparent 70%)`,
            animation: 'coldPulse 2s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* HUD Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        {/* Crosshair */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100px',
            height: '100px',
          }}
        >
          {/* Horizontal line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              width: '100%',
              height: '1px',
              backgroundColor: 'rgba(0, 255, 255, 0.5)',
            }}
          />
          {/* Vertical line */}
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '50%',
              width: '1px',
              height: '100%',
              backgroundColor: 'rgba(0, 255, 255, 0.5)',
            }}
          />
          {/* Center circle */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '20px',
              height: '20px',
              border: '2px solid rgba(0, 255, 255, 0.5)',
              borderRadius: '50%',
            }}
          />
        </div>

        {/* Temperature Display */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            padding: '16px 20px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: `2px solid ${isFreezingCold ? '#3b82f6' : isCold ? '#06b6d4' : '#6b7280'}`,
            borderRadius: '8px',
            fontFamily: 'monospace',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(0, 255, 255, 0.7)',
              marginBottom: '4px',
              letterSpacing: '1px',
            }}
          >
            TEMPERATURE
          </div>
          <div
            style={{
              fontSize: '36px',
              color: isFreezingCold ? '#3b82f6' : isCold ? '#06b6d4' : '#9ca3af',
              fontWeight: 'bold',
              textShadow: `0 0 10px ${isFreezingCold ? '#3b82f6' : isCold ? '#06b6d4' : 'transparent'}`,
            }}
          >
            {temperature.toFixed(1)}°F
          </div>
          <div
            style={{
              fontSize: '10px',
              color: isFreezingCold ? '#3b82f6' : isCold ? '#06b6d4' : '#6b7280',
              marginTop: '4px',
              fontWeight: 'bold',
            }}
          >
            {isFreezingCold ? '❄️ FREEZING' : isCold ? '🧊 COLD SPOT' : '— NORMAL'}
          </div>
        </div>

        {/* Mode Indicator */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            padding: '12px 16px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid rgba(0, 255, 255, 0.3)',
            borderRadius: '8px',
            fontFamily: 'monospace',
            fontSize: '12px',
            color: '#00ffff',
            letterSpacing: '1px',
          }}
        >
          🌡️ THERMAL SCAN
        </div>

        {/* Scan Lines Effect */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 255, 0.03) 2px, rgba(0, 255, 255, 0.03) 4px)',
            animation: 'scanlines 8s linear infinite',
          }}
        />
      </div>

      <style>
        {`
          @keyframes coldPulse {
            0%, 100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
            50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
          }
          @keyframes scanlines {
            0% { transform: translateY(0); }
            100% { transform: translateY(4px); }
          }
        `}
      </style>
    </div>
  );
}
