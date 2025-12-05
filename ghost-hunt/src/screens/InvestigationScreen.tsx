// Investigation Mode Screen - Field Scanner + Field Kit
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { InvestigationProvider, useInvestigation } from '../context/InvestigationContext';
import { useSupplies } from '../context/SuppliesContext';

import { InvestigationResultOverlay } from '../components/Investigation/InvestigationResultOverlay';
import { ManualRotationControls } from '../components/Investigation/ManualRotationControls';
import { DevModeControls } from '../components/Investigation/DevModeControls';
import { DebugOverlay } from '../components/Investigation/DebugOverlay';
import { LoadingOverlay } from '../components/Investigation/LoadingOverlay';
import { FieldKitDrawer } from '../components/Investigation/FieldKitDrawer';
import { ToolTransition } from '../components/Investigation/ToolTransition';
import { PerformanceMonitor } from '../components/Investigation/PerformanceMonitor';
import { useGhostBehavior } from '../hooks/useGhostBehavior';
import { useGPS } from '../hooks/useGPS';
import { useCompass } from '../hooks/useCompass';
import { spawnGhostPosition } from '../utils/gps';
import type { GPSPosition } from '../utils/gps';
import { preloadAllTextures } from '../utils/texturePreloader';
import { calculateEMFLevel } from '../utils/toolBehaviors';

// Import new investigation tools
import { RadarTool } from '../components/Investigation/Tools/RadarTool';
import { EMFTool } from '../components/Investigation/Tools/EMFTool/index';
import { ThermalTool } from '../components/Investigation/Tools/ThermalTool';
import { CameraTool } from '../components/Investigation/Tools/CameraTool';
import { SpiritBoxTool } from '../components/Investigation/Tools/SpiritBoxTool/index';



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
    takePhoto,
  } = useInvestigation();
  const { supplies } = useSupplies();
  const [manualHeading, setManualHeading] = useState(0);
  const [useManualRotation, setUseManualRotation] = useState(false);
  const [devMode, setDevMode] = useState(false);
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false);
  const [devPosition, setDevPosition] = useState<GPSPosition>({
    lat: 40.7128,
    lng: -74.006,
    accuracy: 5,
    timestamp: Date.now(),
  });
  
  // Tool transition state
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [previousTool, setPreviousTool] = useState<typeof activeTool>(activeTool);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  // Field Kit Drawer state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Initialize ghost behavior engine
  useGhostBehavior();
  
  // Handle tool transitions
  useEffect(() => {
    if (activeTool !== previousTool) {
      console.log('🔄 Tool transition:', previousTool, '→', activeTool);
      setIsTransitioning(true);
      setPreviousTool(activeTool);
    }
  }, [activeTool, previousTool]);

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
        // Preload textures first
        setLoadingMessage('Loading textures');
        setLoadingProgress(5);
        console.log('🎨 Preloading textures...');
        await preloadAllTextures((progress) => {
          setLoadingProgress(5 + (progress.percentage * 0.2)); // 5-25%
          setLoadingMessage(`Loading textures (${progress.percentage}%)`);
        });
        
        setLoadingMessage('Requesting permissions');
        setLoadingProgress(30);
        console.log('🧭 Requesting orientation permission...');
        await requestOrientationPermission();
        
        setLoadingProgress(40);

        if (!devMode) {
          setLoadingMessage('Acquiring GPS signal');
          setLoadingProgress(50);
          console.log('📍 Starting GPS...');
          gps.startWatching();
          
          // Wait a bit for GPS to acquire
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          console.log('🎮 Dev Mode: Using simulated GPS');
          // Initialize with dev position
          updatePlayerPosition(devPosition);
        }
        
        setLoadingProgress(70);
        setLoadingMessage('Calibrating compass');
        console.log('🧭 Starting compass...');
        compass.startListening();
        
        setLoadingProgress(90);
        
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

  // Initialize Dev Mode position when Dev Mode is enabled
  useEffect(() => {
    if (devMode && !investigationPlayerPosition) {
      console.log('🎮 Dev Mode enabled: Initializing position');
      updatePlayerPosition(devPosition);
    }
  }, [devMode, investigationPlayerPosition, devPosition, updatePlayerPosition]);

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
  
  // Keyboard shortcut to toggle performance monitor (P key)
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'p' || e.key === 'P') {
        setShowPerformanceMonitor((prev) => !prev);
        console.log('📊 Performance monitor:', !showPerformanceMonitor ? 'enabled' : 'disabled');
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showPerformanceMonitor]);

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
      {/* All filter overlays removed per user request */}

      {/* Loading Overlay */}
      <LoadingOverlay
        isLoading={isLoading}
        message={loadingMessage}
        progress={loadingProgress}
      />
      
      {/* Tool Transition Effect */}
      <ToolTransition
        isTransitioning={isTransitioning}
        onComplete={() => setIsTransitioning(false)}
      />

      {/* Investigation Tools - Conditional rendering based on activeTool */}
      {console.log('🔧 Current activeTool:', activeTool)}
      {activeTool === 'radar' && (
        <RadarTool
          mode="investigation"
          ghostBearing={ghostBearing}
          playerHeading={playerHeading || 0}
          isGhostInCone={
            // Ghost is in cone if within ±45° of player heading and within reasonable distance
            ghostDistance < 100 && 
            playerHeading !== null &&
            Math.abs(((ghostBearing - playerHeading + 540) % 360) - 180) <= 45
          }
        />
      )}
      
      {activeTool === 'emf' && (
        <EMFTool
          mode="investigation"
          emfLevel={calculateEMFLevel(ghostDistance)}
          isFlickering={ghostDistance < 3 && calculateEMFLevel(ghostDistance) === 5}
        />
      )}
      
      {activeTool === 'thermal' && (
        <ThermalTool
          mode="investigation"
          coldSpots={
            // Generate cold spot at ghost location if close enough
            ghostDistance < 50 ? [{
              x: 50, // Center of screen (percentage)
              y: 50,
              intensity: Math.max(0, 1 - (ghostDistance / 50))
            }] : []
          }
          temperature={
            // Temperature drops when ghost is near
            ghostDistance < 30 ? 32 : // Freezing
            ghostDistance < 50 ? 55 : // Cold
            68 // Normal
          }
          hotSpotDetected={ghostDistance < 30}
        />
      )}
      
      {activeTool === 'camera' && (
        <CameraTool
          mode="investigation"
          filmCount={supplies.film}
          battery={72}
          onCapture={() => {
            console.log('📸 Photo capture requested');
            // Use the takePhoto method from investigation context
            const success = takePhoto();
            if (success) {
              console.log('✅ Photo taken successfully');
            } else {
              console.warn('❌ Photo capture failed (no film)');
            }
          }}
        />
      )}
      
      {activeTool === 'audio' && (
        <SpiritBoxTool
          mode="investigation"
          frequency={87.5}
          staticLevel={
            // Static increases with proximity
            ghostDistance < 20 ? 0.8 :
            ghostDistance < 40 ? 0.5 :
            0.3
          }
          evpResponse={
            // Show EVP when very close
            ghostDistance < 15 ? "I'm here..." : ""
          }
          showEvp={ghostDistance < 15}
        />
      )}

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
      
      {/* Performance Monitor (toggle with P key) */}
      <PerformanceMonitor enabled={showPerformanceMonitor} position="top-left" />

      {/* Field Kit Drawer - Investigation Mode */}
      <FieldKitDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(!isDrawerOpen)}
        activeTool={activeTool}
      />

      {/* Exit Button - Repositioned to top-right without top bar */}
      <button
        onClick={handleExit}
        style={{
          position: 'absolute',
          top: '12px',
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
