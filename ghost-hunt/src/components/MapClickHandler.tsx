// Component to handle map clicks for tap-to-teleport in Dev Mode
import { useMapEvents } from 'react-leaflet';
import { useGameState } from '../context/GameStateContext';

export function MapClickHandler() {
  const { devModeEnabled, setPlayerPosition } = useGameState();

  useMapEvents({
    click(e) {
      console.log('🗺️ Map clicked at:', e.latlng);
      console.log('🔧 Dev Mode enabled:', devModeEnabled);
      
      if (devModeEnabled) {
        console.log('✅ Teleporting player to:', e.latlng);
        setPlayerPosition({
          lat: e.latlng.lat,
          lng: e.latlng.lng,
        });
      } else {
        console.log('❌ Dev Mode disabled - teleport blocked');
      }
    },
  });

  return null;
}
