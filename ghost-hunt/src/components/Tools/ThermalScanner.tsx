// Thermal Scanner overlay - shows cold spots
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

export function ThermalScanner() {
  const { toolsEnabled } = useInvestigation();
  const [coldSpots, setColdSpots] = useState<Array<{ angle: number; distance: number; id: number }>>([]);

  useEffect(() => {
    if (!toolsEnabled.thermal) {
      setColdSpots([]);
      return;
    }

    const interval = setInterval(() => {
      // Randomly generate cold spots within radar circle
      if (Math.random() > 0.7) {
        const newSpot = {
          angle: Math.random() * 360, // 0-360 degrees
          distance: Math.random() * 0.8, // 0-0.8 of radius (keep within bounds)
          id: Date.now(),
        };
        setColdSpots((prev) => [...prev, newSpot].slice(-3));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [toolsEnabled.thermal]);

  if (!toolsEnabled.thermal) return null;

  // Calculate radar dimensions
  const radarSize = Math.min(window.innerWidth, window.innerHeight);
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxRadius = radarSize / 2 - 20;

  return (
    <>
      {/* Blue overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(59, 130, 246, 0.05)',
          pointerEvents: 'none',
          zIndex: 500,
        }}
      />

      {/* Cold spots */}
      {coldSpots.map((spot) => {
        // Convert polar to cartesian
        const angleRad = (spot.angle * Math.PI) / 180;
        const distance = spot.distance * maxRadius;
        const x = centerX + Math.cos(angleRad) * distance;
        const y = centerY + Math.sin(angleRad) * distance;

        return (
          <div
            key={spot.id}
            style={{
              position: 'absolute',
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
              animation: 'coldPulse 2s ease-in-out infinite',
              pointerEvents: 'none',
              zIndex: 500,
            }}
          />
        );
      })}
    </>
  );
}
