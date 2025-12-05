// Ghost behavior engine hook
import { useEffect } from 'react';
import { useInvestigation } from '../context/InvestigationContext';
import type { GhostType, AnomalyType } from '../types/investigation';

// Ghost behavior profiles
const GHOST_PROFILES: Record<
  GhostType,
  {
    movementSpeed: number;
    anomalyWeights: Record<AnomalyType, number>;
    sanityDrain: number;
  }
> = {
  Wraith: {
    movementSpeed: 0.8,
    anomalyWeights: {
      emf: 0.4,
      cold: 0.1,
      whisper: 0.1,
      motion: 0.2,
      static: 0.1,
      silhouette: 0.1,
    },
    sanityDrain: 0.5,
  },
  Shade: {
    movementSpeed: 0.3,
    anomalyWeights: {
      emf: 0.1,
      cold: 0.3,
      whisper: 0.4,
      motion: 0.1,
      static: 0.05,
      silhouette: 0.05,
    },
    sanityDrain: 0.2,
  },
  Poltergeist: {
    movementSpeed: 0.5,
    anomalyWeights: {
      emf: 0.15,
      cold: 0.05,
      whisper: 0.1,
      motion: 0.3,
      static: 0.3,
      silhouette: 0.1,
    },
    sanityDrain: 0.35,
  },
};

export function useGhostBehavior() {
  const {
    ghostType,
    setGhostPosition,
    addAnomaly,
    applySanityImpact,
  } = useInvestigation();

  // TODO (Spec 006+): Ghost Movement Loop - Currently disabled for 005
  // Ghost position is static for MVP v2 to allow consistent Radar/EMF testing
  // Uncomment and adapt this code when implementing dynamic ghost movement
  /*
  useEffect(() => {
    console.log('🚀 Ghost movement loop started for:', ghostType);
    const profile = GHOST_PROFILES[ghostType];

    const movementInterval = setInterval(() => {
      console.log('⏰ Movement interval fired!');
      // Random walk algorithm - use functional update to avoid stale closure
      setGhostPosition((prevPosition) => {
        console.log('📍 Previous position:', prevPosition);
        const angleChange = (Math.random() - 0.5) * 60 * profile.movementSpeed;
        const distanceChange = (Math.random() - 0.5) * 0.1 * profile.movementSpeed;

        const newPosition = {
          angle: (prevPosition.angle + angleChange + 360) % 360,
          distance: Math.max(0.2, Math.min(0.9, prevPosition.distance + distanceChange)),
        };
        
        console.log('👻 New position calculated:', newPosition);
        return newPosition;
      });
    }, 2000);

    return () => {
      console.log('🛑 Ghost movement loop stopped');
      clearInterval(movementInterval);
    };
  }, [ghostType, setGhostPosition]);
  */

  // Set ghost to static position for 005
  useEffect(() => {
    console.log('👻 Setting ghost to static position for MVP v2');
    // Fixed position: 45 degrees, medium distance
    setGhostPosition({ angle: 45, distance: 0.6 });
  }, [setGhostPosition]);

  // Behavior Loop - Generate anomalies WITHOUT sanity impacts (TESTING MODE)
  useEffect(() => {
    const profile = GHOST_PROFILES[ghostType];

    const behaviorInterval = setInterval(() => {
      // Roll for anomaly
      const roll = Math.random();
      let cumulative = 0;

      for (const [anomalyType, weight] of Object.entries(profile.anomalyWeights)) {
        cumulative += weight;
        if (roll < cumulative) {
          const intensity = Math.random() * 0.5 + 0.5; // 0.5 to 1.0
          addAnomaly(anomalyType as AnomalyType, intensity);
          
          // SANITY IMPACTS DISABLED FOR TESTING
          // TODO: Re-enable after EMF tool testing is complete
          /*
          switch (anomalyType) {
            case 'whisper':
              applySanityImpact('whisper', intensity * 2);
              break;
            case 'static':
            case 'silhouette':
              applySanityImpact('static', intensity * 3);
              break;
            case 'motion':
              // Motion doesn't directly impact sanity
              break;
            default:
              // Other anomalies have small impact
              applySanityImpact('ambient', intensity);
          }
          */
          
          break;
        }
      }
    }, 1500);

    return () => clearInterval(behaviorInterval);
  }, [ghostType, addAnomaly, applySanityImpact]);

  // Ambient sanity drain - DISABLED FOR TESTING
  // TODO: Re-enable after EMF tool testing is complete
  /*
  useEffect(() => {
    const ambientInterval = setInterval(() => {
      // Small ambient drain every 5 seconds
      applySanityImpact('ambient', 0.5);
    }, 5000);

    return () => clearInterval(ambientInterval);
  }, [applySanityImpact]);
  */
}
