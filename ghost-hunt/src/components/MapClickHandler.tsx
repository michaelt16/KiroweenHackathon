// Component to handle map clicks for smooth walking in Dev Mode
import { useMapEvents } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';
import { useRef } from 'react';
import type { Position } from '../types/game';

export function MapClickHandler() {
  const { devModeEnabled, setPlayerPosition, playerPosition, setIsPlayerMoving, setMovementDirection } = useGameState();
  const animationFrameRef = useRef<number | null>(null);

  // Walking speed: ~50 meters per second (fast teleport-like movement but with animation)
  const WALKING_SPEED_MPS = 50;
  const METERS_TO_DEGREES = 1 / 111000; // Approximate conversion

  // Animation function
  const animateWalk = (targetPos: Position, startPos: Position, startTime: number) => {
    // Calculate total distance once
    const latDiff = targetPos.lat - startPos.lat;
    const lngDiff = targetPos.lng - startPos.lng;
    
    // Convert to meters (approximate)
    const latMeters = latDiff / METERS_TO_DEGREES;
    const lngMeters = lngDiff / METERS_TO_DEGREES;
    const totalDistance = Math.sqrt(latMeters * latMeters + lngMeters * lngMeters);
    
    console.log('🚶 Starting walk animation:', {
      start: startPos,
      target: targetPos,
      distance: totalDistance.toFixed(2) + 'm',
      estimatedTime: (totalDistance / WALKING_SPEED_MPS).toFixed(1) + 's'
    });
    
    const animate = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000; // Convert to seconds
      
      // Calculate progress (0 to 1)
      const distanceTraveled = WALKING_SPEED_MPS * elapsed;
      const progress = Math.min(1, distanceTraveled / totalDistance);
      
      // Interpolate position
      const currentLat = startPos.lat + latDiff * progress;
      const currentLng = startPos.lng + lngDiff * progress;
      
      setPlayerPosition({
        lat: currentLat,
        lng: currentLng,
      });
      
      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Reached destination - ensure final position is set exactly to target
        const finalPosition = {
          lat: targetPos.lat,
          lng: targetPos.lng,
        };
        console.log('✅ Reached destination, setting final position:', finalPosition);
        setPlayerPosition(finalPosition);
        animationFrameRef.current = null;
        // Use requestAnimationFrame to ensure position update is processed before stopping movement
        requestAnimationFrame(() => {
          setIsPlayerMoving(false);
          setMovementDirection(null);
        });
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  useMapEvents({
    click(e) {
      console.log('🗺️ Map clicked at:', e.latlng);
      console.log('🔧 Dev Mode enabled:', devModeEnabled);
      
      if (devModeEnabled) {
        // Cancel any existing animation
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        
        const targetPosition: Position = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        };
        
        // Calculate distance to determine if we should walk
        const latDiff = targetPosition.lat - playerPosition.lat;
        const lngDiff = targetPosition.lng - playerPosition.lng;
        const latMeters = latDiff / METERS_TO_DEGREES;
        const lngMeters = lngDiff / METERS_TO_DEGREES;
        const distance = Math.sqrt(latMeters * latMeters + lngMeters * lngMeters);
        
        // If very close, just teleport (less than 2 meters)
        if (distance < 2) {
          console.log('✅ Player very close, teleporting');
          setPlayerPosition(targetPosition);
          setIsPlayerMoving(false);
          setMovementDirection(null);
          return;
        }
        
        console.log('🚶 Walking player to:', targetPosition, 'Distance:', distance.toFixed(2), 'meters');
        
        // Calculate direction based on movement
        // North: latDiff > 0 (latitude increasing)
        // South: latDiff < 0 (latitude decreasing)
        // East: lngDiff > 0 (longitude increasing)
        // West: lngDiff < 0 (longitude decreasing)
        let direction: 'north' | 'south' | 'east' | 'west' | 'other' = 'other';
        
        const absLatDiff = Math.abs(latDiff);
        const absLngDiff = Math.abs(lngDiff);
        
        // Determine primary direction based on which component is larger
        if (absLatDiff > absLngDiff) {
          // Primarily moving north-south
          direction = latDiff > 0 ? 'north' : 'south';
        } else if (absLngDiff > absLatDiff) {
          // Primarily moving east-west
          direction = lngDiff > 0 ? 'east' : 'west';
        } else {
          // Equal movement, use the larger absolute value
          if (absLatDiff > 0) {
            direction = latDiff > 0 ? 'north' : 'south';
          } else if (absLngDiff > 0) {
            direction = lngDiff > 0 ? 'east' : 'west';
          }
        }
        
        setMovementDirection(direction);
        
        // Set up walking animation
        setIsPlayerMoving(true);
        animateWalk(targetPosition, { ...playerPosition }, performance.now());
      } else {
        console.log('❌ Dev Mode disabled - movement blocked');
      }
    },
  });

  return null;
}
