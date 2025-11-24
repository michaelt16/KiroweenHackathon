// Collection radius circle - Game-like with animated border
import { Circle } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';
import { COLLECTION_RADIUS } from '../utils/distance';

export function CollectionRadius() {
  const { playerPosition } = useGameState();

  return (
    <>
      {/* Glow effect - outer glow circle */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS + 5}
        pathOptions={{
          color: 'transparent',
          fillColor: '#00d9ff',
          fillOpacity: 0.2,
          weight: 0,
        }}
      />
      {/* Glow effect - inner glow circle */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS + 2}
        pathOptions={{
          color: 'transparent',
          fillColor: '#00d9ff',
          fillOpacity: 0.15,
          weight: 0,
        }}
      />
      {/* Outer circle - dotted style matching investigation areas */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS + 3}
        pathOptions={{
          color: '#33e5ff',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 3,
          opacity: 1,
          dashArray: '6 3',
        }}
      />
      
      {/* Main collection radius - bold dotted style */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS}
        pathOptions={{
          color: '#00d9ff',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 6,
          opacity: 1,
          dashArray: '8 4',
        }}
        className="collection-radius-main"
      />
      
      {/* Inner circle - dotted style */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={COLLECTION_RADIUS - 2}
        pathOptions={{
          color: '#33e5ff',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 2,
          opacity: 1,
          dashArray: '6 3',
        }}
      />
    </>
  );
}
