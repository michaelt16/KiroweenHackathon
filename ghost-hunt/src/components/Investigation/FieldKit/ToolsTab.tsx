// Tools Tab - Device selection
import { useInvestigation } from '../../../context/InvestigationContext';

interface ToolsTabProps {
  onSelectTool: () => void; // Callback to close drawer
}

type ToolId = 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';

const TOOLS: { id: ToolId; icon: string; name: string; description: string }[] = [
  {
    id: 'radar',
    icon: '📡',
    name: 'Radar Device',
    description: 'Shows direction to ghost',
  },
  {
    id: 'emf',
    icon: '📊',
    name: 'EMF Meter',
    description: 'Shows proximity (hot/cold)',
  },
  {
    id: 'thermal',
    icon: '🌡️',
    name: 'Thermal Scanner',
    description: 'Detects cold spots',
  },
  {
    id: 'audio',
    icon: '📻',
    name: 'Audio/EVP Device',
    description: 'Captures whispers',
  },
  {
    id: 'camera',
    icon: '📷',
    name: 'Camera',
    description: 'Captures manifestations',
  },
];

export function ToolsTab({ onSelectTool }: ToolsTabProps) {
  const { activeTool, setActiveTool } = useInvestigation();
  
  // Add pulse animation for active indicator
  const pulseAnimation = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.6; }
    }
  `;

  const handleSelectTool = (toolId: ToolId) => {
    console.log('🔧 Tool selected:', toolId);
    setActiveTool(toolId);
    onSelectTool(); // Close drawer
  };

  return (
    <>
      <style>{pulseAnimation}</style>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
      <h3
        style={{
          margin: '0 0 8px 0',
          fontSize: '18px',
          color: '#2dd4bf',
          fontWeight: 'bold',
        }}
      >
        Select Device
      </h3>

      {TOOLS.map((tool) => {
        const isActive = activeTool === tool.id;
        
        return (
          <button
            key={tool.id}
            onClick={() => handleSelectTool(tool.id)}
            style={{
              padding: '16px',
              backgroundColor: isActive ? 'rgba(45, 212, 191, 0.15)' : 'rgba(255, 255, 255, 0.05)',
              border: isActive ? '2px solid #2dd4bf' : '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.2s',
              textAlign: 'left',
              boxShadow: isActive 
                ? '0 0 16px rgba(45, 212, 191, 0.3), inset 0 1px 0 rgba(45, 212, 191, 0.2)'
                : '0 2px 8px rgba(0, 0, 0, 0.3)',
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'rgba(45, 212, 191, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(45, 212, 191, 0.4)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(45, 212, 191, 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.3)';
              }
            }}
          >
            {/* Icon with 007-style treatment */}
            <div
              style={{
                fontSize: '32px',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: isActive ? 'rgba(45, 212, 191, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                border: isActive ? '1px solid rgba(45, 212, 191, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isActive 
                  ? 'inset 0 2px 4px rgba(0, 0, 0, 0.3), 0 0 12px rgba(45, 212, 191, 0.4)'
                  : 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
                filter: isActive ? 'drop-shadow(0 0 8px rgba(45, 212, 191, 0.6))' : 'none',
              }}
            >
              {tool.icon}
            </div>

            {/* Info */}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: '16px',
                  fontWeight: 'bold',
                  color: isActive ? '#2dd4bf' : 'white',
                  marginBottom: '4px',
                  fontFamily: '"Courier New", monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  textShadow: isActive ? '0 0 8px rgba(45, 212, 191, 0.5)' : 'none',
                }}
              >
                {tool.name}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#9ca3af',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}
              >
                {tool.description}
              </div>
            </div>

            {/* Active Indicator with glow */}
            {isActive && (
              <div
                style={{
                  fontSize: '20px',
                  color: '#2dd4bf',
                  filter: 'drop-shadow(0 0 6px rgba(45, 212, 191, 0.8))',
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              >
                ✓
              </div>
            )}
          </button>
        );
      })}
      </div>
    </>
  );
}
