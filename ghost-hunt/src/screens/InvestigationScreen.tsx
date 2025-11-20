// Investigation Mode Screen - Field Scanner + Field Kit
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InvestigationProvider, useInvestigation } from '../context/InvestigationContext';
import { useSupplies } from '../context/SuppliesContext';
import { FieldScanner } from '../components/Investigation/FieldScanner';
import { FieldKitDrawer } from '../components/Investigation/FieldKitDrawer';
import { SanityBar } from '../components/Investigation/SanityBar';
import { InvestigationResultOverlay } from '../components/Investigation/InvestigationResultOverlay';
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
  const { ghostType, sanity, mode, activeTool, suppliesForRun, initializeSupplies, initializeInvestigation, resetInvestigation } = useInvestigation();
  const { supplies } = useSupplies();
  const [isFieldKitOpen, setIsFieldKitOpen] = useState(false);
  const [initialFilm] = useState(supplies.film); // Track initial film for consumption

  // Initialize ghost behavior engine
  useGhostBehavior();

  // Initialize investigation (randomize ghost type)
  useEffect(() => {
    console.log('🎲 Initializing investigation...');
    initializeInvestigation();
  }, [initializeInvestigation]); // Only run once on mount

  // Initialize supplies for this investigation run
  useEffect(() => {
    console.log('📦 Initializing investigation with supplies:', supplies);
    initializeSupplies({
      film: supplies.film,
      boosts: supplies.boosts,
      charms: supplies.charms,
    });
    
    // TODO (Spec 006+): Apply boosts to investigation
    // - Scanner clarity enhancement
    // - Anomaly signal strength
    
    // TODO (Spec 006+): Apply charms to investigation
    // - Sanity drain resistance
    // - Ghost aggression reduction
  }, [initializeSupplies]); // Only run once on mount

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

      {/* Investigation Result Overlay (shows on success/failure) */}
      {(mode === 'success' || mode === 'failure') && <InvestigationResultOverlay />}

      {/* Debug Info (top-left) - TODO: Remove or hide in production */}
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
