import { useEffect, useState } from 'react';
import './VHSEffect.css';

interface VHSEffectProps {
  active?: boolean;
  intensity?: number;
}

export function VHSEffect({ active = false, intensity = 0.8 }: VHSEffectProps) {
  const [trackingOffset, setTrackingOffset] = useState(0);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setTrackingOffset(Math.random() * 10 - 5);
    }, 100);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div 
      className="vhs-effect"
      style={{ opacity: intensity }}
    >
      {/* Vertical Tracking Lines */}
      <div className="vhs-tracking" />

      {/* Horizontal Distortion Bars */}
      <div 
        className="vhs-distortion"
        style={{ transform: `translateX(${trackingOffset}px)` }}
      />

      {/* Color Bleeding */}
      <div className="vhs-color-bleed" />
    </div>
  );
}
