import { useEffect, useState } from 'react';
import './GlitchTransition.css';

type TransitionType = 'static-burst' | 'rgb-split' | 'screen-shake' | 'vhs-tracking';

interface GlitchTransitionProps {
  type: TransitionType;
  active: boolean;
  duration?: number; // milliseconds
  onComplete?: () => void;
}

export function GlitchTransition({
  type,
  active,
  duration = 500,
  onComplete,
}: GlitchTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (active) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
        onComplete?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration, onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="glitch-transition">
      {type === 'static-burst' && <StaticBurst />}
      {type === 'rgb-split' && <RGBSplit />}
      {type === 'screen-shake' && <ScreenShake />}
      {type === 'vhs-tracking' && <VHSTracking />}
    </div>
  );
}

function StaticBurst() {
  return (
    <div className="glitch-static-burst">
      <div className="static-layer" />
      <div className="static-layer" />
      <div className="static-layer" />
    </div>
  );
}

function RGBSplit() {
  return (
    <div className="glitch-rgb-split">
      <div className="rgb-layer rgb-red" />
      <div className="rgb-layer rgb-green" />
      <div className="rgb-layer rgb-blue" />
    </div>
  );
}

function ScreenShake() {
  return <div className="glitch-screen-shake" />;
}

function VHSTracking() {
  return (
    <div className="glitch-vhs-tracking">
      <div className="tracking-bar" />
      <div className="tracking-bar" />
      <div className="tracking-bar" />
    </div>
  );
}
