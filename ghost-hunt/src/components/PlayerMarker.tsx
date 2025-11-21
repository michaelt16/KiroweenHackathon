// Custom player marker - Game-like with pulsing rings
import { CircleMarker, Popup, Circle } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';

export function PlayerMarker() {
  const { playerPosition } = useGameState();

  return (
    <>
      {/* Outer pulsing ring */}
      <Circle
        center={[playerPosition.lat, playerPosition.lng]}
        radius={12}
        pathOptions={{
          color: 'rgba(45, 212, 191, 0.4)',
          fillColor: 'transparent',
          fillOpacity: 0,
          weight: 2,
          opacity: 0.6,
        }}
        className="player-marker-ring"
      />
      
      {/* Main player marker */}
      <CircleMarker
        center={[playerPosition.lat, playerPosition.lng]}
        radius={10}
        pathOptions={{
          fillColor: '#2dd4bf',
          fillOpacity: 0.9,
          color: '#2dd4bf',
          weight: 3,
          opacity: 1,
        }}
        className="player-marker"
      >
        <Popup>You are here</Popup>
      </CircleMarker>
      
      {/* Inner glow dot */}
      <CircleMarker
        center={[playerPosition.lat, playerPosition.lng]}
        radius={4}
        pathOptions={{
          fillColor: '#5eead4',
          fillOpacity: 1,
          color: 'transparent',
          weight: 0,
        }}
        className="player-marker-core"
      />
    </>
  );
}
