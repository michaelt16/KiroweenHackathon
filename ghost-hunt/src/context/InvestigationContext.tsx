// Investigation state context
import { createContext, useContext, useState, useCallback, useRef, type ReactNode } from 'react';
import type {
  GhostType,
  InvestigationState,
  GhostPosition,
  Anomaly,
  AnomalyType,
  InvestigationMode,
} from '../types/investigation';
import type { TraitState, EvidenceTrait } from '../data/ghosts';
import type { GPSPosition } from '../utils/gps';
import { haversineDistance, calculateBearing } from '../utils/gps';
import { throttle } from '../utils/throttle';

type ToolId = 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';

// Supplies available for this investigation run
export interface SuppliesForRun {
  film: number;
  boosts: number;
  charms: number;
}

// Photo captured during investigation
export interface Photo {
  id: string;
  timestamp: number;
  status: 'developing' | 'ready';
  quality: 'none' | 'faint' | 'strong';
  ghostDistance: number; // Distance when photo was taken
}

// Evidence state for manual logging
export type EvidenceState = Record<EvidenceTrait, TraitState>;

// Sanity impact event types
export type SanityImpactType = 
  | 'whisper'
  | 'static'
  | 'manifestation'
  | 'proximity'
  | 'ambient';

interface InvestigationContextType extends InvestigationState {
  activeTool: ToolId;
  suppliesForRun: SuppliesForRun;
  photos: Photo[];
  evidence: EvidenceState;
  
  // GPS/Compass state
  playerPosition: GPSPosition | null;
  playerHeading: number | null; // 0-360° or null if no compass
  ghostGPSPosition: GPSPosition | null;
  ghostDistance: number; // Meters
  ghostBearing: number; // 0-360°
  gpsAccuracy: number; // Meters
  compassAccuracy: number; // Degrees
  hasOrientationPermission: boolean;
  
  setActiveTool: (tool: ToolId) => void;
  setGhostType: (type: GhostType) => void;
  setGhostPosition: (positionOrUpdater: GhostPosition | ((prev: GhostPosition) => GhostPosition)) => void;
  setSanity: (sanityOrUpdater: number | ((prev: number) => number)) => void;
  applySanityImpact: (type: SanityImpactType, magnitude?: number) => void;
  addAnomaly: (type: AnomalyType, intensity: number) => void;
  toggleTool: (tool: keyof InvestigationState['toolsEnabled']) => void;
  setMode: (mode: InvestigationMode) => void;
  takePhoto: () => boolean;
  initializeSupplies: (supplies: SuppliesForRun) => void;
  initializeInvestigation: () => void;
  setEvidenceTrait: (trait: EvidenceTrait, state: TraitState) => void;
  completeInvestigation: (selectedGhostId: GhostType) => void;
  
  // GPS methods
  updatePlayerPosition: (position: GPSPosition) => void;
  setGhostGPSPosition: (position: GPSPosition) => void;
  
  // Compass methods
  updatePlayerHeading: (heading: number, accuracy: number) => void;
  requestOrientationPermission: () => Promise<boolean>;
  
  resetInvestigation: () => void;
}

const InvestigationContext = createContext<InvestigationContextType | undefined>(
  undefined
);

const INITIAL_STATE: InvestigationState = {
  ghostType: 'Wraith', // Will be randomized
  ghostPosition: { angle: 0, distance: 0.5 },
  sanity: 100,
  events: [],
  toolsEnabled: {
    emf: false,
    thermal: false,
    audio: false,
    camera: false,
    static: false,
  },
  mode: 'investigating',
};

const INITIAL_EVIDENCE: EvidenceState = {
  emf: 'unknown',
  whispers: 'unknown',
  cold: 'unknown',
  static: 'unknown',
  photos: 'unknown',
  sanityBehavior: 'unknown',
  movement: 'unknown',
};

export function InvestigationProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InvestigationState>(INITIAL_STATE);
  const [activeTool, setActiveToolState] = useState<ToolId>('radar');
  const [suppliesForRun, setSuppliesForRun] = useState<SuppliesForRun>({
    film: 0,
    boosts: 0,
    charms: 0,
  });
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [evidence, setEvidence] = useState<EvidenceState>(INITIAL_EVIDENCE);
  
  // GPS/Compass state
  const [playerPosition, setPlayerPosition] = useState<GPSPosition | null>(null);
  const [playerHeading, setPlayerHeading] = useState<number | null>(null);
  const [ghostGPSPosition, setGhostGPSPosition] = useState<GPSPosition | null>(null);
  const [ghostDistance, setGhostDistance] = useState<number>(0);
  const [ghostBearing, setGhostBearing] = useState<number>(0);
  const [gpsAccuracy, setGpsAccuracy] = useState<number>(0);
  const [compassAccuracy, setCompassAccuracy] = useState<number>(20);
  const [hasOrientationPermission, setHasOrientationPermission] = useState<boolean>(false);
  
  // Throttle distance/bearing calculations to 5Hz (200ms) for performance
  const throttledCalculateDistanceBearing = useRef(
    throttle((playerPos: GPSPosition, ghostPos: GPSPosition) => {
      const distance = haversineDistance(playerPos, ghostPos);
      const bearing = calculateBearing(playerPos, ghostPos);
      
      console.log(`📏 Distance: ${distance.toFixed(1)}m, Bearing: ${bearing.toFixed(0)}°`);
      
      setGhostDistance(distance);
      setGhostBearing(bearing);
    }, 200)
  );

  const setGhostType = useCallback((type: GhostType) => {
    console.log('👻 Ghost type set:', type);
    setState((prev) => ({ ...prev, ghostType: type }));
  }, []);

  const setGhostPosition = useCallback((positionOrUpdater: GhostPosition | ((prev: GhostPosition) => GhostPosition)) => {
    setState((prev) => {
      const newPosition = typeof positionOrUpdater === 'function'
        ? positionOrUpdater(prev.ghostPosition)
        : positionOrUpdater;
      console.log('👻 Ghost position updated:', newPosition);
      return { ...prev, ghostPosition: newPosition };
    });
  }, []);

  const setSanity = useCallback((sanityOrUpdater: number | ((prev: number) => number)) => {
    setState((prev) => {
      const newSanity = typeof sanityOrUpdater === 'function' 
        ? sanityOrUpdater(prev.sanity)
        : sanityOrUpdater;
      const clampedSanity = Math.max(0, Math.min(100, newSanity));
      
      // Check for sanity reaching 0 (hard fail)
      if (clampedSanity === 0 && prev.sanity > 0) {
        console.log('💀 Sanity reached 0 - Investigation failed');
        // Trigger failure mode
        setTimeout(() => {
          setState((current) => ({ ...current, mode: 'failure' }));
        }, 100);
      }
      
      return { ...prev, sanity: clampedSanity };
    });
  }, []);

  const applySanityImpact = useCallback((type: SanityImpactType, magnitude?: number) => {
    // Default magnitudes for different event types
    const defaultMagnitudes: Record<SanityImpactType, number> = {
      whisper: 2,        // Small impact from audio
      static: 3,         // Medium impact from visual distortion
      manifestation: 5,  // Large impact from strong photo/visual
      proximity: 4,      // Medium-high impact from being close
      ambient: 0.5,      // Very small ambient drain
    };

    const impact = magnitude ?? defaultMagnitudes[type];
    
    console.log(`😰 Sanity impact: ${type} (-${impact})`);
    
    setSanity((prev) => prev - impact);
  }, [setSanity]);

  const addAnomaly = useCallback((type: AnomalyType, intensity: number) => {
    const anomaly: Anomaly = {
      id: `${type}-${Date.now()}`,
      type,
      timestamp: Date.now(),
      intensity,
    };
    console.log('⚡ Anomaly detected:', anomaly);
    setState((prev) => ({
      ...prev,
      events: [...prev.events, anomaly].slice(-20), // Keep last 20 events
    }));
  }, []);

  const toggleTool = useCallback((tool: keyof InvestigationState['toolsEnabled']) => {
    console.log('🔧 Tool toggled:', tool);
    setState((prev) => ({
      ...prev,
      toolsEnabled: {
        ...prev.toolsEnabled,
        [tool]: !prev.toolsEnabled[tool],
      },
    }));
  }, []);

  const setMode = useCallback((mode: InvestigationMode) => {
    console.log('🎮 Investigation mode changed:', mode);
    setState((prev) => ({ ...prev, mode }));
  }, []);

  const setActiveTool = useCallback((tool: ToolId) => {
    console.log('🔧 Active tool changed:', tool);
    setActiveToolState(tool);
  }, []);

  const initializeSupplies = useCallback((supplies: SuppliesForRun) => {
    console.log('📦 Initializing investigation supplies:', supplies);
    setSuppliesForRun(supplies);
  }, []);

  const takePhoto = useCallback((): boolean => {
    if (suppliesForRun.film <= 0) {
      console.warn('📸 No film available');
      return false;
    }

    // Decrement film in local run supplies
    setSuppliesForRun((prev) => ({
      ...prev,
      film: prev.film - 1,
    }));
    
    // Note: Global supplies will be consumed via useSupplies().consumeFilm() 
    // in the InvestigationScreen component

    // Create new photo with developing status
    const photoId = `photo-${Date.now()}`;
    const newPhoto: Photo = {
      id: photoId,
      timestamp: Date.now(),
      status: 'developing',
      quality: 'none',
      ghostDistance: state.ghostPosition.distance,
    };

    setPhotos((prev) => [...prev, newPhoto]);
    console.log('📸 Photo taken:', photoId, 'Film remaining:', suppliesForRun.film - 1);

    // Start 7-second development timer
    setTimeout(() => {
      setPhotos((prev) =>
        prev.map((photo) => {
          if (photo.id === photoId) {
            // Determine quality based on ghost distance when photo was taken
            // Closer = better chance of strong manifestation
            const distance = photo.ghostDistance;
            let quality: Photo['quality'] = 'none';

            const roll = Math.random();
            if (distance < 0.3) {
              // Very close: 60% strong, 30% faint, 10% none
              quality = roll < 0.6 ? 'strong' : roll < 0.9 ? 'faint' : 'none';
            } else if (distance < 0.6) {
              // Medium: 20% strong, 50% faint, 30% none
              quality = roll < 0.2 ? 'strong' : roll < 0.7 ? 'faint' : 'none';
            } else {
              // Far: 5% strong, 25% faint, 70% none
              quality = roll < 0.05 ? 'strong' : roll < 0.3 ? 'faint' : 'none';
            }

            console.log(`📷 Photo ${photoId} developed: ${quality}`);
            
            // Apply sanity impact based on photo quality
            if (quality === 'strong') {
              applySanityImpact('manifestation', 5);
            } else if (quality === 'faint') {
              applySanityImpact('manifestation', 2);
            }
            
            return { ...photo, status: 'ready', quality };
          }
          return photo;
        })
      );
    }, 7000);

    return true;
  }, [suppliesForRun.film, state.ghostPosition.distance, applySanityImpact]);

  const setEvidenceTrait = useCallback((trait: EvidenceTrait, newState: TraitState) => {
    console.log(`📋 Evidence updated: ${trait} = ${newState}`);
    setEvidence((prev) => ({
      ...prev,
      [trait]: newState,
    }));
  }, []);

  const completeInvestigation = useCallback((selectedGhostId: GhostType) => {
    console.log('🎯 Investigation completed. Selected:', selectedGhostId, 'Actual:', state.ghostType);
    const isCorrect = selectedGhostId === state.ghostType;
    
    // Set mode to show result
    setState((prev) => ({
      ...prev,
      mode: isCorrect ? 'success' : 'failure',
    }));
  }, [state.ghostType]);

  const initializeInvestigation = useCallback(() => {
    // Randomize ghost type
    const ghostTypes: GhostType[] = ['Wraith', 'Shade', 'Poltergeist'];
    const randomGhost = ghostTypes[Math.floor(Math.random() * ghostTypes.length)];
    
    console.log('🎲 Randomized ghost type:', randomGhost);
    setGhostType(randomGhost);
  }, [setGhostType]);

  // GPS Methods
  const updatePlayerPosition = useCallback((position: GPSPosition) => {
    console.log('📍 Player position updated:', position);
    setPlayerPosition(position);
    setGpsAccuracy(position.accuracy);
    
    // Throttled recalculation of distance and bearing (5Hz max)
    if (ghostGPSPosition) {
      throttledCalculateDistanceBearing.current(position, ghostGPSPosition);
    }
  }, [ghostGPSPosition]);

  // Compass Methods
  const updatePlayerHeading = useCallback((heading: number, accuracy: number) => {
    console.log(`🧭 Player heading updated: ${heading.toFixed(0)}° (±${accuracy.toFixed(0)}°)`);
    setPlayerHeading(heading);
    setCompassAccuracy(accuracy);
  }, []);

  const requestOrientationPermission = useCallback(async (): Promise<boolean> => {
    // iOS 13+ requires explicit permission
    if (typeof DeviceOrientationEvent !== 'undefined' && 
        typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        const granted = permission === 'granted';
        setHasOrientationPermission(granted);
        console.log('🧭 Orientation permission:', permission);
        return granted;
      } catch (error) {
        console.error('❌ Orientation permission error:', error);
        return false;
      }
    } else {
      // Android or older iOS - permission not required
      setHasOrientationPermission(true);
      return true;
    }
  }, []);

  const updateGhostGPSPosition = useCallback((position: GPSPosition) => {
    console.log('👻 Ghost GPS position set:', position);
    setGhostGPSPosition(position);
    
    // Recalculate distance and bearing if player position exists
    if (playerPosition) {
      const distance = haversineDistance(playerPosition, position);
      const bearing = calculateBearing(playerPosition, position);
      
      setGhostDistance(distance);
      setGhostBearing(bearing);
    }
  }, [playerPosition]);

  const resetInvestigation = useCallback(() => {
    console.log('🔄 Investigation reset');
    setState(INITIAL_STATE);
    setActiveToolState('radar');
    setSuppliesForRun({ film: 0, boosts: 0, charms: 0 });
    setPhotos([]);
    setEvidence(INITIAL_EVIDENCE);
    
    // Reset GPS state
    setPlayerPosition(null);
    setGhostGPSPosition(null);
    setGhostDistance(0);
    setGhostBearing(0);
    setGpsAccuracy(0);
  }, []);

  return (
    <InvestigationContext.Provider
      value={{
        ...state,
        activeTool,
        suppliesForRun,
        photos,
        evidence,
        
        // GPS/Compass state
        playerPosition,
        playerHeading,
        ghostGPSPosition,
        ghostDistance,
        ghostBearing,
        gpsAccuracy,
        compassAccuracy,
        hasOrientationPermission,
        
        setActiveTool,
        setGhostType,
        setGhostPosition,
        setSanity,
        applySanityImpact,
        addAnomaly,
        toggleTool,
        setMode,
        takePhoto,
        initializeSupplies,
        initializeInvestigation,
        setEvidenceTrait,
        completeInvestigation,
        
        // GPS methods
        updatePlayerPosition,
        setGhostGPSPosition: updateGhostGPSPosition,
        
        // Compass methods
        updatePlayerHeading,
        requestOrientationPermission,
        
        resetInvestigation,
      }}
    >
      {children}
    </InvestigationContext.Provider>
  );
}

export function useInvestigation() {
  const context = useContext(InvestigationContext);
  if (!context) {
    throw new Error('useInvestigation must be used within InvestigationProvider');
  }
  return context;
}
