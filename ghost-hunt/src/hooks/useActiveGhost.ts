import { useGhostStore, GhostType, GhostBehavior } from '../stores/ghostStore';

/**
 * Custom hook for investigation tools to access active ghost behavior
 * 
 * This hook provides easy access to the behavioral profile of the currently
 * active ghost during an investigation, including:
 * - EMF personality patterns
 * - Spirit Box signature (knob frequencies and tolerance)
 * - Word families for Spirit Box communication
 * - Camera manifestation types and probabilities
 * - Thermal reading category
 * 
 * @param activeGhostType - The type of ghost currently being investigated
 * @returns GhostBehavior object or null if no ghost is active
 * 
 * @example
 * ```tsx
 * // In EMF Meter component
 * const ghostBehavior = useActiveGhost(currentGhostType);
 * const emfPattern = ghostBehavior?.emfPersonality; // 'calm', 'unstable', etc.
 * ```
 * 
 * @example
 * ```tsx
 * // In Spirit Box component
 * const ghostBehavior = useActiveGhost(currentGhostType);
 * const { knobA, knobB, tolerance } = ghostBehavior?.spiritBoxSignature || {};
 * const words = [...ghostBehavior?.wordFamilies.emotion || [], ...ghostBehavior?.wordFamilies.theme || []];
 * ```
 */
export const useActiveGhost = (activeGhostType?: GhostType): GhostBehavior | null => {
  const getActiveGhostBehavior = useGhostStore((state) => state.getActiveGhostBehavior);
  
  if (!activeGhostType) {
    return null;
  }
  
  return getActiveGhostBehavior(activeGhostType);
};

/**
 * Hook to get EMF personality for the active ghost
 * 
 * @param activeGhostType - The type of ghost currently being investigated
 * @returns EMF personality enum value or null
 * 
 * @example
 * ```tsx
 * const emfPersonality = useActiveGhostEMF(currentGhostType);
 * // Returns: 'calm' | 'unstable' | 'shy' | 'aggressive' | 'mischievous' | null
 * ```
 */
export const useActiveGhostEMF = (activeGhostType?: GhostType) => {
  // EMF personality simplified - return null for now
  return null;
};

/**
 * Hook to get Spirit Box signature for the active ghost
 * 
 * @param activeGhostType - The type of ghost currently being investigated
 * @returns Spirit Box signature with knob frequencies and tolerance, or null
 * 
 * @example
 * ```tsx
 * const spiritBoxSig = useActiveGhostSpiritBox(currentGhostType);
 * // Returns: { knobA: 0.35, knobB: 0.72, tolerance: 0.06 } or null
 * ```
 */
export const useActiveGhostSpiritBox = (activeGhostType?: GhostType) => {
  const behavior = useActiveGhost(activeGhostType);
  return behavior?.spiritBoxSignature || null;
};

/**
 * Hook to get word families for the active ghost
 * 
 * @param activeGhostType - The type of ghost currently being investigated
 * @returns Word families (emotion and theme arrays) or null
 * 
 * @example
 * ```tsx
 * const wordFamilies = useActiveGhostWords(currentGhostType);
 * const allWords = [...wordFamilies?.emotion || [], ...wordFamilies?.theme || []];
 * const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
 * ```
 */
export const useActiveGhostWords = (activeGhostType?: GhostType) => {
  const behavior = useActiveGhost(activeGhostType);
  return behavior?.wordFamilies || null;
};

/**
 * Hook to get camera manifestations for the active ghost
 * 
 * @param activeGhostType - The type of ghost currently being investigated
 * @returns Array of camera manifestations with probabilities, or null
 * 
 * @example
 * ```tsx
 * const manifestations = useActiveGhostCamera(currentGhostType);
 * // Returns: [{ primary: 'faint_silhouette', probability: 0.8 }, ...] or null
 * ```
 */
export const useActiveGhostCamera = (activeGhostType?: GhostType) => {
  const behavior = useActiveGhost(activeGhostType);
  return behavior?.cameraManifestations || null;
};

/**
 * Hook to get thermal reading for the active ghost
 * 
 * @param activeGhostType - The type of ghost currently being investigated
 * @returns Thermal reading category or null
 * 
 * @example
 * ```tsx
 * const thermalReading = useActiveGhostThermal(currentGhostType);
 * // Returns: 'normal' | 'cold_spot' | 'deep_cold' | null
 * ```
 */
export const useActiveGhostThermal = (activeGhostType?: GhostType) => {
  const behavior = useActiveGhost(activeGhostType);
  return behavior?.thermalReading || null;
};
