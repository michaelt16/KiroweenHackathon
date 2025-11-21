// Investigation Mode Screen - Field Scanner + Field Kit
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InvestigationProvider, useInvestigation } from '../context/InvestigationContext';
import { useSupplies } from '../context/SuppliesContext';
import { FieldScanner } from '../components/Investigation/FieldScanner';
import { CRTOverlay } from '../components/Effects/CRTOverlay';
import { AtmosphereLayer } from '../components/Investigation/AtmosphereLayer';
import { TopStatusBar } from '../components/HUD/TopStatusBar';

import { InvestigationResultOverlay } from '../components/Investigation/InvestigationResultOverlay';
import { ManualRotationControls } from '../components/Investigation/ManualRotationControls';
import { DevModeControls } from '../components/Investigation/DevModeControls';
import { DebugOverlay } from '../components/Investigation/DebugOverlay';
import { LoadingOverlay } from '../components/Investigation/LoadingOverlay';
import { FieldKitDrawer } from '../components/Investigation/FieldKitDrawer';
import { useGhostBehavior } from '../hooks/useGhostBehavior';
import { useGPS } from '../hooks/useGPS';
import { useCompass } from '../hooks/useCompass';
import { spawnGhostPosition } from '../utils/gps';
import type { GPSPosition } from '../utils/gps';



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
  const [manualHeading, setManualHeading] = useState(0);
  const [useManualRotation, setUseManualRotation] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [isFieldKitOpen, setIsFieldKitOpen] = useState(false);
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
    console.log('🚪 Exit button clicked - leaving investigation');
    try {
      // Navigate first, then reset will happen on unmount
      navigate('/');
      console.log('✅ Navigation to map initiated');
      // Reset after a small delay to ensure navigation happens first
      setTimeout(() => {
        resetInvestigation();
        console.log('✅ Investigation reset complete');
      }, 100);
    } catch (error) {
      console.error('❌ Error during exit:', error);
    }
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#0a0f14',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle CRT Overlay - Match main screen */}
      <CRTOverlay intensity={0.15} scanlineSpacing={4} staticOpacity={0.01} flickerEnabled={false} />

      {/* Top Status Bar - Match main screen */}
      <TopStatusBar />

      {/* Atmosphere Layer - Vignette and particles */}
      <AtmosphereLayer sanity={sanity} />

      {/* Gradient Overlay - Match main screen */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 400,
          background: `
            radial-gradient(circle at center, transparent 0%, rgba(11, 15, 26, 0.2) 60%, rgba(11, 15, 26, 0.4) 100%),
            linear-gradient(to top, rgba(11, 15, 26, 0.5) 0%, rgba(11, 15, 26, 0.2) 30%, transparent 60%)
          `,
        }}
      />

      {/* Vignette effect - Match main screen */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 401,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0, 0, 0, 0.2) 100%)',
        }}
      />

      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        message={loadingMessage}
        progress={loadingProgress}
      />

      {/* Field Scanner (Main Radar View) */}
      <FieldScanner />

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



      {/* Investigation Result Overlay (shows on success/failure) */}
      {(mode === 'success' || mode === 'failure') && <InvestigationResultOverlay />}

      {/* Debug Overlay (always available, manages own visibility) */}
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

      {/* Field Kit Drawer */}
      <FieldKitDrawer
        isOpen={isFieldKitOpen}
        onClose={() => setIsFieldKitOpen(!isFieldKitOpen)}
        activeToolIcon={activeTool === 'radar' ? '📡' : activeTool === 'emf' ? '📊' : activeTool === 'thermal' ? '🌡️' : activeTool === 'audio' ? '🎤' : '📷'}
      />

      {/* Exit Button - Match main screen style */}
      <button
        onClick={handleExit}
        style={{
          position: 'absolute',
          top: '70px',
          right: '12px',
          zIndex: 1000,
          width: '44px',
          height: '44px',
          padding: '0',
          backgroundColor: 'rgba(239, 68, 68, 0.9)',
          border: '1px solid rgba(220, 38, 38, 0.5)',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 
            '0 4px 12px rgba(0, 0, 0, 0.5), ' +
            'inset 0 1px 0 rgba(239, 68, 68, 0.1)',
          transition: 'all 0.2s ease',
          color: 'white',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.7)';
          e.currentTarget.style.boxShadow = 
            '0 0 16px rgba(239, 68, 68, 0.4), ' +
            'inset 0 0 12px rgba(239, 68, 68, 0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.5)';
          e.currentTarget.style.boxShadow = 
            '0 4px 12px rgba(0, 0, 0, 0.5), ' +
            'inset 0 1px 0 rgba(239, 68, 68, 0.1)';
        }}
        title="Exit Investigation"
      >
        ✕
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
