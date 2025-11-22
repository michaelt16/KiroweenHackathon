// Deterministic randomization based on seed
export function getDamageVariant(seed: string | number, variantCount: number): number {
  if (typeof seed === 'number') {
    return seed % variantCount;
  }
  
  // Simple string hash
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  return Math.abs(hash) % variantCount;
}
