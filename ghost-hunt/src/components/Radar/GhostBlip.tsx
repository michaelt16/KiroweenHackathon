// Ghost blip component - pulsing dot on radar
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { calculateRelativeAngle, isInForwardCone, isDirectlyAhead } from '../../utils/compass';

interface GhostBlipProps {
  radarSize: number;
  sweepAngle: number;
  playerHeading?: number | null; // Player's compass heading
  ghostBearing?: number; // Bearing to ghost
}

export function GhostBlip({
  radarSize,
  sweepAngle,
  playerHeading = null,
  ghostBearing,
}: GhostBlipProps) {
  const { ghostPosition } = useInvestigation();
  const [pulse, setPulse] = useState(0);
  const [lastDetectedPosition, setLastDetectedPosition] = useState(ghostPosition);
  const [opacity, setOpacity] = useState(1);
  const [isVisible, setIsVisible] = useState(false);

  // Check if ghost is in forward cone (compass mode)
  useEffect(() => {
    if (playerHeading !== null && ghostBearing !== undefined) {
      // Compass mode: only show if ghost is in ±45° forward cone
      const inCone = isInForwardCone(ghostBearing, playerHeading, 45);
      setIsVisible(inCone);

      if (inCone) {
        console.log('📡 Ghost in forward cone!', {
          bearing: ghostBearing,
          heading: playerHeading,
          relative: calculateRelativeAngle(ghostBearing, playerHeading),
        });
        setLastDetectedPosition(ghostPosition);
        setOpacity(1);
      }
    } else {
      // Legacy mode: use sweep detection
      const ghostAngleRad = (ghostPosition.angle * Math.PI) / 180;

      // Normalize angles to 0-2π
      const normalizedSweep = sweepAngle % (Math.PI * 2);
      const normalizedGhost = ghostAngleRad % (Math.PI * 2);

      // Calculate angular difference
      let diff = Math.abs(normalizedSweep - normalizedGhost);
      if (diff > Math.PI) diff = Math.PI * 2 - diff;

      // If sweep is within 30 degrees of ghost, update position
      const detectionThreshold = (30 * Math.PI) / 180; // 30 degrees

      if (diff < detectionThreshold) {
        console.log('📡 Ghost detected by sweep!', {
          ghostAngle: ghostPosition.angle,
          sweepAngle: (sweepAngle * 180) / Math.PI,
        });
        setLastDetectedPosition(ghostPosition);
        setOpacity(1);
        setIsVisible(true);
      }
    }
  }, [sweepAngle, ghostPosition, playerHeading, ghostBearing]);

  // Fade out over time (only in legacy mode)
  useEffect(() => {
    if (playerHeading === null) {
      const fadeInterval = setInterval(() => {
        // Fade out over 3 seconds
        setOpacity((prev) => {
          const newOpacity = Math.max(0.1, prev - 0.01);
          if (newOpacity <= 0.1) {
            setIsVisible(false);
          }
          return newOpacity;
        });
      }, 50);
      return () => clearInterval(fadeInterval);
    }
  }, [playerHeading]);

  // Pulse animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Don't render if not visible
  if (!isVisible) {
    return null;
  }

  // Convert polar coordinates to cartesian (use last detected position)
  // Radar is centered on screen, not at top-left
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxRadius = radarSize / 2 - 60; // Match RadarCanvas padding

  // In compass mode, calculate position based on relative angle
  let x, y;
  if (playerHeading !== null && ghostBearing !== undefined) {
    // Calculate relative angle
    const relativeAngle = calculateRelativeAngle(ghostBearing, playerHeading);
    const relativeAngleRad = (relativeAngle * Math.PI) / 180;

    // Position on radar (pointing up is 0°, clockwise is positive)
    // Adjust by -90° to make 0° point up instead of right
    const adjustedAngle = relativeAngleRad - Math.PI / 2;

    // Fixed distance on radar (we don't show distance, just direction)
    const displayDistance = maxRadius * 0.7;

    x = centerX + Math.cos(adjustedAngle) * displayDistance;
    y = centerY + Math.sin(adjustedAngle) * displayDistance;
  } else {
    // Legacy mode: use polar coordinates
    const angleRad = (lastDetectedPosition.angle * Math.PI) / 180;
    const distance = lastDetectedPosition.distance * maxRadius;

    x = centerX + Math.cos(angleRad) * distance;
    y = centerY + Math.sin(angleRad) * distance;
  }

  // Enhanced pulse when directly ahead (±5°)
  const isAhead =
    playerHeading !== null &&
    ghostBearing !== undefined &&
    isDirectlyAhead(ghostBearing, playerHeading, 5);
  const scale = isAhead
    ? 1.5 + Math.sin((pulse / 100) * Math.PI * 2) * 0.5
    : 1 + Math.sin((pulse / 100) * Math.PI * 2) * 0.2;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: isAhead ? '16px' : '12px',
        height: isAhead ? '16px' : '12px',
        borderRadius: '50%',
        backgroundColor: isAhead ? '#fbbf24' : '#ef4444',
        boxShadow: isAhead
          ? `0 0 ${20 + pulse / 5}px rgba(251, 191, 36, 0.9)`
          : `0 0 ${10 + pulse / 10}px rgba(239, 68, 68, 0.8)`,
        opacity: opacity,
        transition: 'left 0.3s ease-out, top 0.3s ease-out, opacity 0.05s linear',
        zIndex: 600,
      }}
    />
  );
}
