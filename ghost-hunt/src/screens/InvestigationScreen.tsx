// Investigation Mode Screen - Radar-based ghost hunting
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InvestigationProvider, useInvestigation } from '../context/InvestigationContext';
import { RadarCanvas } from '../components/Radar/RadarCanvas';
import { GhostBlip } from '../components/Radar/GhostBlip';
import { NoiseOverlay } from '../components/Radar/NoiseOverlay';
import { ToolBar } from '../components/Tools/ToolBar';
import { EMFMeter } from '../components/Tools/EMFMeter';
import { ThermalScanner } from '../components/Tools/ThermalScanner';
import { AudioReceiver } from '../components/Tools/AudioReceiver';
import { SanityBar } from '../components/Investigation/SanityBar';
import { DeductionButton } from '../components/Investigation/DeductionButton';
import { DeductionUI } from '../components/Investigation/DeductionUI';
import { useGhostBehavior } from '../hooks/useGhostBehavior';

function InvestigationContent() {
  const { hotspotId } = useParams<{ hotspotId: string }>();
  const navigate = useNavigate();
  const { ghostType, sanity, mode, resetInvestigation } = useInvestigation();
  const [radarSize, setRadarSize] = useState(0);
  const [sweepAngle, setSweepAngle] = useState(0);

  // Initialize ghost behavior engine
  useGhostBehavior();

  useEffect(() => {
    console.log('🔍 Investigation started for hotspot:', hotspotId);
    console.log('👻 Ghost type:', ghostType);
    
    // Calculate radar size
    const size = Math.min(window.innerWidth, window.innerHeight);
    setRadarSize(size);
  }, [hotspotId, ghostType]);

  const handleExit = () => {
    console.log('🚪 Exiting investigation');
    resetInvestigation();
    navigate('/');
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0b0f1a',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Radar Canvas */}
      <RadarCanvas onSweepAngleChange={setSweepAngle} />

      {/* Ghost Blip */}
      {radarSize > 0 && <GhostBlip radarSize={radarSize} sweepAngle={sweepAngle} />}

      {/* Noise Overlay */}
      <NoiseOverlay />

      {/* Tool Effects */}
      <EMFMeter />
      <ThermalScanner />
      <AudioReceiver />

      {/* Sanity Bar */}
      <SanityBar />

      {/* Deduction Button (only show in investigating mode) */}
      {mode === 'investigating' && <DeductionButton />}

      {/* Deduction UI (only show in deducing mode) */}
      {mode === 'deducing' && <DeductionUI />}

      {/* Tool Bar */}
      <ToolBar />

      {/* Debug Info (top-left) */}
      <div
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: '8px 12px',
          borderRadius: '8px',
          fontSize: '12px',
        }}
      >
        <div>Ghost: {ghostType}</div>
        <div>Sanity: {sanity}%</div>
        <div>Mode: {mode}</div>
      </div>

      {/* Exit Button */}
      <button
        onClick={handleExit}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '10px 20px',
          backgroundColor: '#ef4444',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Exit
      </button>
    </div>
  );
}

export function InvestigationScreen() {
  return (
    <InvestigationProvider>
      <InvestigationContent />
    </InvestigationProvider>
  );
}
