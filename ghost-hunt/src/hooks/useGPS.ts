// GPS hook for watching player position
import { useEffect, useRef, useCallback } from 'react';
import { GPSSmoother, type GPSPosition } from '../utils/gps';
import { throttle } from '../utils/throttle';

interface UseGPSOptions {
  onPositionUpdate: (position: GPSPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

interface UseGPSReturn {
  startWatching: () => void;
  stopWatching: () => void;
  requestPermission: () => Promise<PermissionState>;
}

/**
 * Hook for watching GPS position with smoothing
 * @param options Configuration options
 * @returns Methods to control GPS watching
 */
export function useGPS(options: UseGPSOptions): UseGPSReturn {
  const {
    onPositionUpdate,
    onError,
    enableHighAccuracy = true,
    timeout = 5000,
    maximumAge = 1000,
  } = options;

  const watchIdRef = useRef<number | null>(null);
  const smootherRef = useRef(new GPSSmoother());
  
  // Throttle position updates to 1Hz (1000ms) for battery optimization
  const throttledUpdateRef = useRef(
    throttle((position: GPSPosition) => {
      onPositionUpdate(position);
    }, 1000)
  );

  const requestPermission = useCallback(async (): Promise<PermissionState> => {
    try {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      console.log('📍 Geolocation permission:', result.state);
      return result.state;
    } catch (error) {
      console.error('Failed to query geolocation permission:', error);
      return 'prompt';
    }
  }, []);

  const startWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      console.log('📍 GPS already watching');
      return;
    }

    if (!navigator.geolocation) {
      console.error('❌ Geolocation not supported');
      return;
    }

    console.log('📍 Starting GPS watch...');

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const rawPosition: GPSPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };

        // Smooth the position to reduce jitter
        const smoothedPosition = smootherRef.current.addPosition(rawPosition);

        console.log(
          `📍 GPS update: ${smoothedPosition.lat.toFixed(6)}, ${smoothedPosition.lng.toFixed(6)} (±${smoothedPosition.accuracy.toFixed(0)}m)`
        );

        // Throttled update (1Hz max)
        throttledUpdateRef.current(smoothedPosition);
      },
      (error) => {
        console.error('❌ GPS error:', error.message);
        if (onError) {
          onError(error);
        }
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      }
    );

    console.log('✅ GPS watch started');
  }, [onPositionUpdate, onError, enableHighAccuracy, timeout, maximumAge]);

  const stopWatching = useCallback(() => {
    if (watchIdRef.current !== null) {
      console.log('🛑 Stopping GPS watch...');
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
      smootherRef.current.reset();
      console.log('✅ GPS watch stopped');
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopWatching();
    };
  }, [stopWatching]);

  return {
    startWatching,
    stopWatching,
    requestPermission,
  };
}
