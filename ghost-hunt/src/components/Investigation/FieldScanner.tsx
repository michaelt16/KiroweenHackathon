// Field Scanner - Main radar view component
import { useState, useEffect } from 'react';
import { RadarCanvas } from '../Radar/RadarCanvas';
import { GhostBlip } from '../Radar/GhostBlip';
import { NoiseOverlay } from '../Radar/NoiseOverlay';
import { EMFMeter } from '../Tools/EMFMeter';
import { ThermalScanner } from '../Tools/ThermalScanner';
import { AudioReceiver } from '../Tools/AudioReceiver';

export function FieldScanner() {
  const [radarSize, setRadarSize] = useState(0);
  const [sweepAngle, setSweepAngle] = useState(0);

  useEffect(() => {
    // Calculate radar size
    const size = Math.min(window.innerWidth, window.innerHeight);
    setRadarSize(size);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      {/* Radar Canvas */}
      <RadarCanvas onSweepAngleChange={setSweepAngle} />

      {/* Ghost Blip */}
      {radarSize > 0 && <GhostBlip radarSize={radarSize} sweepAngle={sweepAngle} />}

      {/* Noise Overlay */}
      <NoiseOverlay />

      {/* Tool Effects - TODO: These will be controlled by activeTool in Phase 3 */}
      <EMFMeter />
      <ThermalScanner />
      <AudioReceiver />
    </div>
  );
}
