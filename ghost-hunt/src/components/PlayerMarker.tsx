// Custom player marker with glowing circle
import { CircleMarker, Popup } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';

export function PlayerMarker() {
  const { playerPosition } = useGameState();

  return (
    <CircleMarker
      center={[playerPosition.lat, playerPosition.lng]}
      radius={8}
      pathOptions={{
        fillColor: '#2dd4bf',
        fillOpacity: 1,
        color: '#2dd4bf',
        weight: 3,
        opacity: 0.8,
      }}
      className="player-marker"
    >
      <Popup>You are here</Popup>
    </CircleMarker>
  );
}
