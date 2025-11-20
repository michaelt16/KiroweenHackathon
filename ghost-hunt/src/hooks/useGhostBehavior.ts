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
    setSanity,
    addAnomaly,
  } = useInvestigation();

  // Task 8: Ghost Movement Loop
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

  // Task 9: Behavior Loop - Generate anomalies
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
          break;
        }
      }
    }, 1500);

    return () => clearInterval(behaviorInterval);
  }, [ghostType, addAnomaly]);

  // Task 10: Sanity System
  useEffect(() => {
    const profile = GHOST_PROFILES[ghostType];

    const sanityInterval = setInterval(() => {
      // Use functional update to avoid stale closure
      setSanity((prevSanity) => prevSanity - profile.sanityDrain);
    }, 1000);

    return () => clearInterval(sanityInterval);
  }, [ghostType, setSanity]);
}
