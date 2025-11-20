// Compass hook for watching device orientation
import { useEffect, useRef, useCallback } from 'react';
import { CompassSmoother } from '../utils/compass';

interface UseCompassOptions {
  onHeadingUpdate: (heading: number, accuracy: number) => void;
  onError?: (error: Error) => void;
}

interface UseCompassReturn {
  startListening: () => void;
  stopListening: () => void;
  requestPermission: () => Promise<boolean>;
  isSupported: boolean;
}

/**
 * Hook for watching device compass orientation with smoothing
 * @param options Configuration options
 * @returns Methods to control compass listening
 */
export function useCompass(options: UseCompassOptions): UseCompassReturn {
  const { onHeadingUpdate, onError } = options;

  const smootherRef = useRef(new CompassSmoother());
  const listenerRef = useRef<((event: DeviceOrientationEvent) => void) | null>(null);
  const isListeningRef = useRef(false);

  // Check if device orientation is supported
  const isSupported = typeof DeviceOrientationEvent !== 'undefined';

  const requestPermission = useCallback(async (): Promise<boolean> => {
    // iOS 13+ requires explicit permission
    if (
      typeof DeviceOrientationEvent !== 'undefined' &&
      typeof (DeviceOrientationEvent as any).requestPermission === 'function'
    ) {
      try {
        const permission = await (DeviceOrientationEvent as any).requestPermission();
        const granted = permission === 'granted';
        console.log('🧭 Orientation permission:', permission);
        return granted;
      } catch (error) {
        console.error('❌ Orientation permission error:', error);
        if (onError) {
          onError(error as Error);
        }
        return false;
      }
    } else {
      // Android or older iOS - permission not required
      console.log('🧭 Orientation permission not required');
      return true;
    }
  }, [onError]);

  const startListening = useCallback(() => {
    if (isListeningRef.current) {
      console.log('🧭 Compass already listening');
      return;
    }

    if (!isSupported) {
      console.error('❌ Device orientation not supported');
      if (onError) {
        onError(new Error('Device orientation not supported'));
      }
      return;
    }

    console.log('🧭 Starting compass listening...');

    const handleOrientation = (event: DeviceOrientationEvent) => {
      // Try to get absolute heading first (preferred)
      let heading: number | null = null;
      let accuracy = 20; // Default accuracy estimate

      if (event.webkitCompassHeading !== undefined) {
        // iOS - webkitCompassHeading gives true north
        heading = event.webkitCompassHeading;
        accuracy = event.webkitCompassAccuracy !== undefined ? event.webkitCompassAccuracy : 20;
      } else if (event.absolute && event.alpha !== null) {
        // Android - alpha with absolute=true gives magnetic north
        // Convert to 0-360 range (alpha is 0-360 but we need to invert)
        heading = 360 - event.alpha;
      } else if (event.alpha !== null) {
        // Fallback - relative orientation
        heading = 360 - event.alpha;
        accuracy = 30; // Less accurate
      }

      if (heading !== null) {
        // Smooth the heading to reduce jitter
        const smoothedHeading = smootherRef.current.addHeading(heading);

        console.log(
          `🧭 Compass update: ${smoothedHeading.toFixed(0)}° (±${accuracy.toFixed(0)}°)`
        );

        onHeadingUpdate(smoothedHeading, accuracy);
      }
    };

    // Try to use deviceorientationabsolute first (better for compass)
    if ('ondeviceorientationabsolute' in window) {
      window.addEventListener('deviceorientationabsolute', handleOrientation as any);
      listenerRef.current = handleOrientation;
      console.log('✅ Listening to deviceorientationabsolute');
    } else {
      window.addEventListener('deviceorientation', handleOrientation);
      listenerRef.current = handleOrientation;
      console.log('✅ Listening to deviceorientation');
    }

    isListeningRef.current = true;
  }, [onHeadingUpdate, onError, isSupported]);

  const stopListening = useCallback(() => {
    if (!isListeningRef.current || !listenerRef.current) {
      return;
    }

    console.log('🛑 Stopping compass listening...');

    // Remove both possible event listeners
    if ('ondeviceorientationabsolute' in window) {
      window.removeEventListener('deviceorientationabsolute', listenerRef.current as any);
    }
    window.removeEventListener('deviceorientation', listenerRef.current);

    listenerRef.current = null;
    isListeningRef.current = false;
    smootherRef.current.reset();

    console.log('✅ Compass listening stopped');
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    startListening,
    stopListening,
    requestPermission,
    isSupported,
  };
}
