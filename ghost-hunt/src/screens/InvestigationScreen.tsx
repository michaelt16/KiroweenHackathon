// Investigation Mode Screen - Field Scanner + Field Kit
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InvestigationProvider, useInvestigation } from '../context/InvestigationContext';
import { FieldScanner } from '../components/Investigation/FieldScanner';
import { FieldKitDrawer } from '../components/Investigation/FieldKitDrawer';
import { SanityBar } from '../components/Investigation/SanityBar';
import { DeductionButton } from '../components/Investigation/DeductionButton';
import { DeductionUI } from '../components/Investigation/DeductionUI';
import { useGhostBehavior } from '../hooks/useGhostBehavior';

// Tool icon mapping
const TOOL_ICONS: Record<string, string> = {
  radar: '📡',
  emf: '📊',
  thermal: '🌡️',
  audio: '📻',
  camera: '📷',
};

function InvestigationContent() {
  const { hotspotId } = useParams<{ hotspotId: string }>();
  const navigate = useNavigate();
  const { ghostType, sanity, mode, activeTool, resetInvestigation } = useInvestigation();
  const [isFieldKitOpen, setIsFieldKitOpen] = useState(false);

  // Initialize ghost behavior engine
  useGhostBehavior();

  useEffect(() => {
    console.log('🔍 Investigation started for hotspot:', hotspotId);
    console.log('👻 Ghost type:', ghostType);
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
      {/* Field Scanner (Main Radar View) */}
      <FieldScanner />

      {/* Sanity Bar */}
      <SanityBar />

      {/* Field Kit Drawer */}
      <FieldKitDrawer
        isOpen={isFieldKitOpen}
        onClose={() => setIsFieldKitOpen(!isFieldKitOpen)}
        activeToolIcon={TOOL_ICONS[activeTool]}
      />

      {/* Deduction Button (only show in investigating mode) - TODO: Remove in Phase 5 */}
      {mode === 'investigating' && <DeductionButton />}

      {/* Deduction UI (only show in deducing mode) - TODO: Replace with Codex flow in Phase 5 */}
      {mode === 'deducing' && <DeductionUI />}

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
