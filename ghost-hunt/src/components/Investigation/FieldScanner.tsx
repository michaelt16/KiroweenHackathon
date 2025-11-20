// Field Scanner - Main radar view component
import { useState, useEffect } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';
import { RadarCanvas } from '../Radar/RadarCanvas';
import { GhostBlip } from '../Radar/GhostBlip';
import { NoiseOverlay } from '../Radar/NoiseOverlay';
import { EMFMeter } from '../Tools/EMFMeter';
import { ThermalScanner } from '../Tools/ThermalScanner';
import { AudioReceiver } from '../Tools/AudioReceiver';
import { Camera } from '../Tools/Camera';

export function FieldScanner() {
  const { activeTool } = useInvestigation();
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
      {/* Radar Canvas - Always visible for 'radar' tool */}
      {activeTool === 'radar' && <RadarCanvas onSweepAngleChange={setSweepAngle} />}
      
      {/* Ghost Blip - Only show on radar tool */}
      {activeTool === 'radar' && radarSize > 0 && (
        <GhostBlip radarSize={radarSize} sweepAngle={sweepAngle} />
      )}

      {/* Noise Overlay - Always present */}
      <NoiseOverlay />

      {/* Tool-specific displays */}
      {activeTool === 'emf' && <EMFMeter />}
      {activeTool === 'thermal' && <ThermalScanner />}
      {activeTool === 'audio' && <AudioReceiver />}
      {activeTool === 'camera' && <Camera />}
    </div>
  );
}
