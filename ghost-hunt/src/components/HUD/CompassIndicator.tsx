// Compass Indicator - Game-like Mini Compass
import './CompassIndicator.css';

interface CompassIndicatorProps {
  heading?: number; // 0-360 degrees
}

export function CompassIndicator({ heading = 0 }: CompassIndicatorProps) {
  const getCardinalDirection = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div className="compass-indicator">
      <div className="compass-rose">
        <div 
          className="compass-needle"
          style={{ transform: `rotate(${heading}deg)` }}
        />
        <div className="compass-north">N</div>
      </div>
      <div className="compass-info">
        <div className="compass-heading">{Math.round(heading)}°</div>
        <div className="compass-direction">{getCardinalDirection(heading)}</div>
      </div>
    </div>
  );
}

