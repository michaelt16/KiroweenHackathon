// Collection radius circle - Game-like with animated border
import { Circle } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';
import { COLLECTION_RADIUS } from '../utils/distance';

export function CollectionRadius() {
  const { playerPosition } = useGameState();

  return (
    <>
      {/* Outer glow ring */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS + 5}
        pathOptions={{
          color: 'rgba(45, 212, 191, 0.2)',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 1,
          opacity: 0.4,
        }}
        className="collection-radius-glow"
      />
      
      {/* Main collection radius */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS}
        pathOptions={{
          color: 'rgba(45, 212, 191, 0.6)',
          fillColor: 'rgba(45, 212, 191, 0.08)',
          fillOpacity: 0.08,
          weight: 2,
          opacity: 0.7,
          dashArray: '8, 4',
        }}
        className="collection-radius-main"
      />
      
      {/* Inner border */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS - 2}
        pathOptions={{
          color: 'rgba(45, 212, 191, 0.3)',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 1,
          opacity: 0.5,
        }}
      />
    </>
  );
}
