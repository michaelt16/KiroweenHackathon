// Hook to fetch and manage POI-based hotspots from real-world landmarks
import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchNearbyPOIs, type POI } from '../utils/overpassAPI';
import type { Hotspot } from '../types/game';

// Module-level cache to persist across component remounts
let globalPOICache: {
  hotspots: Hotspot[];
  lastFetchPosition: { lat: number; lng: number } | null;
  hasFetched: boolean;
} = {
  hotspots: [],
  lastFetchPosition: null,
  hasFetched: false,
};

interface UsePOIHotspotsOptions {
  playerLat: number;
  playerLng: number;
  enabled?: boolean;
  radiusMeters?: number;
  maxHotspots?: number;
  refreshDistanceMeters?: number; // Refresh when player moves this far
}

interface UsePOIHotspotsReturn {
  poiHotspots: Hotspot[];
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

/**
 * Hook to fetch real-world POIs and convert them to investigation hotspots
 * Similar to Pokemon Go's Pokestops/Gyms at real locations
 */
export function usePOIHotspots({
  playerLat,
  playerLng,
  enabled = true,
  radiusMeters = 2500, // 2.5km radius - preload larger area like Pokemon Go
  maxHotspots = 15, // More hotspots in the preloaded area
  refreshDistanceMeters = 500, // Refresh when player moves 500m (new cell)
}: UsePOIHotspotsOptions): UsePOIHotspotsReturn {
  const [poiHotspots, setPoiHotspots] = useState<Hotspot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const lastFetchPosition = useRef<{ lat: number; lng: number } | null>(null);
  const isFetchingRef = useRef(false);
  const hasFetchedOnceRef = useRef(false); // Track if we've done initial fetch

  // Calculate distance between two points
  const calculateDistance = useCallback((lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lng2 - lng1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }, []);

  // Convert POI to Hotspot
  const convertPOIToHotspot = useCallback((poi: POI, index: number): Hotspot => {
    // Use the actual landmark name without spooky prefixes
    return {
      id: `poi-hotspot-${poi.id}`,
      lat: poi.lat,
      lng: poi.lng,
      name: poi.name, // Use actual landmark name
      status: 'unlocked' as const,
    };
  }, []);

  // Fetch POIs and convert to hotspots
  const fetchPOIHotspots = useCallback(async () => {
    if (!enabled || isFetchingRef.current) return;
    
    // If we've already fetched once, check if player moved far enough
    if (hasFetchedOnceRef.current && lastFetchPosition.current) {
      const distance = calculateDistance(
        lastFetchPosition.current.lat,
        lastFetchPosition.current.lng,
        playerLat,
        playerLng
      );
      
      if (distance < refreshDistanceMeters) {
        // Don't refresh yet - player hasn't moved far enough
        return;
      }
    }

    isFetchingRef.current = true;
    setIsLoading(true);
    setError(null);

    try {
      console.log('🌍 Fetching real-world POIs for hotspots...', { playerLat, playerLng, radiusMeters });
      const pois = await fetchNearbyPOIs(playerLat, playerLng, radiusMeters);
      
      if (pois.length === 0) {
        console.warn('⚠️ No POIs found nearby');
        console.log('📍 Searched at:', { playerLat, playerLng, radiusMeters });
        // Don't set empty array - let it fall through to show error or use mock hotspots
        setPoiHotspots([]);
        setIsLoading(false);
        isFetchingRef.current = false;
        return;
      }
      
      console.log(`📊 Found ${pois.length} raw POIs before filtering`);

      // Convert POIs to hotspots (POIs are already filtered for spacing)
      const hotspots = pois
        .slice(0, maxHotspots)
        .map((poi, index) => convertPOIToHotspot(poi, index));

      console.log(`✅ Found ${hotspots.length} real-world hotspots:`, hotspots.map(h => h.name));
      
      setPoiHotspots(hotspots);
      lastFetchPosition.current = { lat: playerLat, lng: playerLng };
      hasFetchedOnceRef.current = true; // Mark that we've fetched once
      
      // Update global cache to persist across component remounts
      globalPOICache = {
        hotspots,
        lastFetchPosition: { lat: playerLat, lng: playerLng },
        hasFetched: true,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch POIs';
      console.error('❌ Error fetching POI hotspots:', errorMessage);
      setError(errorMessage);
      setPoiHotspots([]);
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, [enabled, playerLat, playerLng, radiusMeters, maxHotspots, refreshDistanceMeters, calculateDistance, convertPOIToHotspot]);

  // Initial fetch only once on mount
  // Use ref to avoid infinite loop - fetchPOIHotspots changes on every render
  const fetchRef = useRef(fetchPOIHotspots);
  useEffect(() => {
    fetchRef.current = fetchPOIHotspots;
  }, [fetchPOIHotspots]);

  // Only fetch once globally (across all component mounts), then rely on distance-based refresh
  useEffect(() => {
    if (!enabled) {
      // Don't clear if we have cached data - just don't fetch
      return;
    }

    // Only fetch if we haven't fetched globally yet
    if (!globalPOICache.hasFetched) {
      // Set loading state immediately when we need to fetch
      setIsLoading(true);
      // Debounce initial fetch to avoid too many API calls
      const timeoutId = setTimeout(() => {
        fetchRef.current();
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      // If we have cached data, use it immediately
      if (globalPOICache.hotspots.length > 0) {
        setPoiHotspots(globalPOICache.hotspots);
        lastFetchPosition.current = globalPOICache.lastFetchPosition;
        hasFetchedOnceRef.current = true;
        setIsLoading(false); // Make sure loading is false when using cache
      }
    }
  }, [enabled]); // Only depend on enabled, not position - fetch once globally

  return {
    poiHotspots,
    isLoading,
    error,
    refresh: fetchPOIHotspots,
  };
}



