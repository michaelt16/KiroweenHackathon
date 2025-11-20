// Investigation Mode Screen - Field Scanner + Field Kit
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InvestigationProvider, useInvestigation } from '../context/InvestigationContext';
import { useSupplies } from '../context/SuppliesContext';
import { FieldScanner } from '../components/Investigation/FieldScanner';
import { FieldKitDrawer } from '../components/Investigation/FieldKitDrawer';
import { SanityBar } from '../components/Investigation/SanityBar';
import { InvestigationResultOverlay } from '../components/Investigation/InvestigationResultOverlay';
import { ManualRotationControls } from '../components/Investigation/ManualRotationControls';
import { DevModeControls } from '../components/Investigation/DevModeControls';
import { DebugOverlay } from '../components/Investigation/DebugOverlay';
import { LoadingOverlay } from '../components/Investigation/LoadingOverlay';
import { CRTOverlay } from '../components/Effects/CRTOverlay';
import { useGhostBehavior } from '../hooks/useGhostBehavior';
import { useGPS } from '../hooks/useGPS';
import { useCompass } from '../hooks/useCompass';
import { spawnGhostPosition } from '../utils/gps';
import type { GPSPosition } from '../utils/gps';

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
  const {
    ghostType,
    sanity,
    mode,
    activeTool,
    initializeSupplies,
    initializeInvestigation,
    resetInvestigation,
    updatePlayerPosition,
    updatePlayerHeading,
    setGhostGPSPosition,
    requestOrientationPermission,
    ghostGPSPosition,
    ghostDistance,
    ghostBearing,
    gpsAccuracy,
    compassAccuracy,
    playerPosition: investigationPlayerPosition,
    playerHeading,
  } = useInvestigation();
  const { supplies } = useSupplies();
  const [isFieldKitOpen, setIsFieldKitOpen] = useState(false);
  const [manualHeading, setManualHeading] = useState(0);
  const [useManualRotation, setUseManualRotation] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [devPosition, setDevPosition] = useState<GPSPosition>({
    lat: 40.7128,
    lng: -74.006,
    accuracy: 5,
    timestamp: Date.now(),
  });
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Initialize ghost behavior engine
  useGhostBehavior();

  // Manual rotation handler
  const handleManualRotate = (delta: number) => {
    setManualHeading((prev) => {
      const newHeading = (prev + delta + 360) % 360;
      updatePlayerHeading(newHeading, 45); // 45° accuracy for manual
      console.log('🎮 Manual rotation:', newHeading);
      return newHeading;
    });
  };

  // Dev mode position handler
  const handleDevPositionUpdate = (position: GPSPosition) => {
    setDevPosition(position);
    updatePlayerPosition(position);
  };

  // Initialize GPS tracking (skip if dev mode)
  const gps = useGPS({
    onPositionUpdate: (position) => {
      if (!devMode) {
        updatePlayerPosition(position);
      }
    },
    onError: (error) => {
      console.error('GPS error:', error);
      // Auto-enable dev mode on GPS error (for desktop testing)
      setDevMode(true);
    },
  });

  // Initialize compass tracking
  const compass = useCompass({
    onHeadingUpdate: (heading, accuracy) => {
      if (!useManualRotation) {
        updatePlayerHeading(heading, accuracy);
      }
    },
    onError: (error) => {
      console.error('Compass error:', error);
      // Fallback to manual rotation
      setUseManualRotation(true);
      console.error('Compass error:', error);
    },
  });

  // Initialize investigation (randomize ghost type)
  useEffect(() => {
    console.log('🎲 Initializing investigation...');
    initializeInvestigation();
  }, [initializeInvestigation]); // Only run once on mount

  // Initialize GPS and Compass sensors
  useEffect(() => {
    const initSensors = async () => {
      try {
        setLoadingMessage('Requesting permissions');
        setLoadingProgress(10);
        console.log('🧭 Requesting orientation permission...');
        await requestOrientationPermission();
        
        setLoadingProgress(30);

        if (!devMode) {
          setLoadingMessage('Acquiring GPS signal');
          setLoadingProgress(40);
          console.log('📍 Starting GPS...');
          gps.startWatching();
          
          // Wait a bit for GPS to acquire
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.log('🎮 Dev Mode: Using simulated GPS');
          // Initialize with dev position
          updatePlayerPosition(devPosition);
        }
        
        setLoadingProgress(60);
        setLoadingMessage('Calibrating compass');
        console.log('🧭 Starting compass...');
        compass.startListening();
        
        setLoadingProgress(80);
        
        // Wait for initial sensor readings
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setLoadingProgress(100);
        setLoadingMessage('Ready');
        
        // Hide loading after a brief moment
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
        
      } catch (error) {
        console.error('❌ Sensor initialization error:', error);
        setLoadingMessage('Sensor error - using fallbacks');
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    initSensors();

    // Cleanup on unmount
    return () => {
      console.log('🛑 Stopping sensors...');
      gps.stopWatching();
      compass.stopListening();
    };
  }, [gps, compass, requestOrientationPermission, devMode]);

  // Spawn ghost at random GPS position when player position is first available
  useEffect(() => {
    if (investigationPlayerPosition && !ghostGPSPosition) {
      setLoadingMessage('Spawning ghost');
      console.log('👻 Spawning ghost near player...');
      const ghostPos = spawnGhostPosition(
        investigationPlayerPosition,
        30 // Spawn within 30 meters
      );
      setGhostGPSPosition(ghostPos);
      console.log('👻 Ghost spawned at:', ghostPos);
    }
  }, [investigationPlayerPosition, ghostGPSPosition, setGhostGPSPosition]);

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
      {/* CRT Overlay - Analog Horror Effects */}
      <CRTOverlay 
        intensity={0.6}
        scanlineSpacing={3}
        staticOpacity={0.08}
        flickerEnabled={true}
      />

      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        message={loadingMessage}
        progress={loadingProgress}
      />

      {/* Field Scanner (Main Radar View) */}
      <FieldScanner />

      {/* Sanity Bar */}
      <SanityBar />

      {/* Dev Mode Controls (for desktop testing) */}
      {devMode && (
        <DevModeControls
          onPositionUpdate={handleDevPositionUpdate}
          initialPosition={devPosition}
          ghostPosition={ghostGPSPosition}
          ghostDistance={ghostDistance}
          currentHeading={useManualRotation ? manualHeading : (playerHeading ?? 0)}
        />
      )}

      {/* Manual Rotation Controls (when compass unavailable or dev mode) */}
      {(devMode || useManualRotation || !compass.isSupported) && activeTool === 'radar' && (
        <ManualRotationControls
          onRotate={handleManualRotate}
          currentHeading={manualHeading}
        />
      )}

      {/* Field Kit Drawer */}
      <FieldKitDrawer
        isOpen={isFieldKitOpen}
        onClose={() => setIsFieldKitOpen(!isFieldKitOpen)}
        activeToolIcon={TOOL_ICONS[activeTool]}
      />

      {/* Investigation Result Overlay (shows on success/failure) */}
      {(mode === 'success' || mode === 'failure') && <InvestigationResultOverlay />}

      {/* Debug Overlay (bottom-right) */}
      {showDebug && (
        <DebugOverlay
          playerPosition={investigationPlayerPosition}
          playerHeading={playerHeading}
          ghostPosition={ghostGPSPosition}
          ghostDistance={ghostDistance}
          ghostBearing={ghostBearing}
          gpsAccuracy={gpsAccuracy}
          compassAccuracy={compassAccuracy}
          ghostType={ghostType}
          sanity={sanity}
        />
      )}

      {/* Quick Controls (top-left) */}
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
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}
      >
        <button
          onClick={() => setDevMode(!devMode)}
          style={{
            padding: '4px 8px',
            backgroundColor: devMode ? '#8b5cf6' : '#374151',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          {devMode ? '🎮 Dev Mode ON' : '🎮 Dev Mode OFF'}
        </button>
        <button
          onClick={() => setShowDebug(!showDebug)}
          style={{
            padding: '4px 8px',
            backgroundColor: showDebug ? '#22c55e' : '#374151',
            border: 'none',
            borderRadius: '4px',
            color: 'white',
            fontSize: '10px',
            cursor: 'pointer',
          }}
        >
          {showDebug ? '🐛 Debug ON' : '🐛 Debug OFF'}
        </button>
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
