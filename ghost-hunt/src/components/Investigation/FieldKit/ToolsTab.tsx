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

  const handleSelectTool = (toolId: ToolId) => {
    console.log('🔧 Tool selected:', toolId);
    setActiveTool(toolId);
    onSelectTool(); // Close drawer
  };

  return (
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
            }}
          >
            {/* Icon */}
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
                }}
              >
                {tool.name}
              </div>
              <div
                style={{
                  fontSize: '13px',
                  color: '#9ca3af',
                }}
              >
                {tool.description}
              </div>
            </div>

            {/* Active Indicator */}
            {isActive && (
              <div
                style={{
                  fontSize: '20px',
                  color: '#2dd4bf',
                }}
              >
                ✓
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
