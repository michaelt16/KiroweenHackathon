// Collection radius circle component
import { Circle } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';
import { COLLECTION_RADIUS } from '../utils/distance';

export function CollectionRadius() {
  const { playerPosition } = useGameState();

  return (
    <Circle
      center={[playerPosition.lat, playerPosition.lng]}
      radius={COLLECTION_RADIUS}
      pathOptions={{
        color: '#2dd4bf',
        fillColor: '#2dd4bf',
        fillOpacity: 0.1,
        weight: 2,
        opacity: 0.6,
      }}
    />
  );
}
