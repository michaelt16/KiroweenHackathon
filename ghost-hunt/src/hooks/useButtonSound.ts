/**
 * Hook to add sound effects to buttons easily
 * 
 * Usage:
 * const handleClick = useButtonSound(() => {
 *   // your button logic
 * });
 * 
 * <button onClick={handleClick}>Click me</button>
 */

import { useCallback } from 'react';
import { playButtonClick } from '../utils/soundEffects';

export function useButtonSound(callback?: () => void) {
  return useCallback((e?: React.MouseEvent) => {
    playButtonClick();
    if (callback) {
      callback();
    }
  }, [callback]);
}

/**
 * Higher-order function to wrap any onClick handler with sound
 */
export function withButtonSound<T extends (...args: any[]) => any>(
  handler: T
): T {
  return ((...args: any[]) => {
    playButtonClick();
    return handler(...args);
  }) as T;
}


