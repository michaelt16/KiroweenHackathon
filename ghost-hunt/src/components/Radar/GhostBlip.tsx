// Ghost blip component - pulsing dot on radar
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

interface GhostBlipProps {
  radarSize: number;
  sweepAngle: number;
}

export function GhostBlip({ radarSize, sweepAngle }: GhostBlipProps) {
  const { ghostPosition } = useInvestigation();
  const [pulse, setPulse] = useState(0);
  const [lastDetectedPosition, setLastDetectedPosition] = useState(ghostPosition);
  const [opacity, setOpacity] = useState(1);
  const [timeSinceDetection, setTimeSinceDetection] = useState(0);

  // Check if sweep has passed over ghost
  useEffect(() => {
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
      console.log('📡 Ghost detected by sweep!', { ghostAngle: ghostPosition.angle, sweepAngle: sweepAngle * 180 / Math.PI });
      setLastDetectedPosition(ghostPosition);
      setTimeSinceDetection(0);
      setOpacity(1);
    }
  }, [sweepAngle, ghostPosition]);

  // Fade out over time
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setTimeSinceDetection((prev) => prev + 50);
      // Fade out over 3 seconds
      setOpacity((prev) => Math.max(0.1, prev - 0.01));
    }, 50);
    return () => clearInterval(fadeInterval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulse((p) => (p + 1) % 100);
    }, 20);
    return () => clearInterval(interval);
  }, []);

  // Convert polar coordinates to cartesian (use last detected position)
  // Radar is centered on screen, not at top-left
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const maxRadius = radarSize / 2 - 20;

  const angleRad = (lastDetectedPosition.angle * Math.PI) / 180;
  const distance = lastDetectedPosition.distance * maxRadius;

  const x = centerX + Math.cos(angleRad) * distance;
  const y = centerY + Math.sin(angleRad) * distance;

  const scale = 1 + Math.sin((pulse / 100) * Math.PI * 2) * 0.2;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#ef4444',
        boxShadow: `0 0 ${10 + pulse / 10}px rgba(239, 68, 68, 0.8)`,
        opacity: opacity,
        transition: 'left 0.3s ease-out, top 0.3s ease-out, opacity 0.05s linear',
        zIndex: 600,
      }}
    />
  );
}
