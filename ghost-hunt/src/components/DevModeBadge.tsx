// Dev Mode badge component
import { useGameState } from '../context/GameStateContext';

export function DevModeBadge() {
  const { devModeEnabled, setDevModeEnabled } = useGameState();

  const handleToggle = () => {
    const newState = !devModeEnabled;
    console.log('🔧 Dev Mode toggled:', newState);
    setDevModeEnabled(newState);
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: devModeEnabled ? '#ff6b6b' : '#4a5568',
        color: 'white',
        padding: '8px 16px',
        borderRadius: '20px',
        fontSize: '14px',
        fontWeight: 'bold',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}
    >
      <span>{devModeEnabled ? '🔧 DEV MODE' : '🔒 NORMAL MODE'}</span>
      <button
        onClick={handleToggle}
        style={{
          background: 'rgba(255,255,255,0.3)',
          border: 'none',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '10px',
          cursor: 'pointer',
          fontSize: '12px',
        }}
      >
        {devModeEnabled ? 'Disable' : 'Enable'}
      </button>
    </div>
  );
}
