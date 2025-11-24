import React from 'react';
import { ToolIcon } from '../../Equipment/ToolIcon';

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
}

const TOOLS: Tool[] = [
  { id: 'radar', name: 'RADAR', description: 'Direction detector', icon: '📡' },
  { id: 'emf', name: 'EMF', description: 'Distance meter', icon: '📊' },
  { id: 'thermal', name: 'THERMAL', description: 'Cold spot scanner', icon: '🌡️' },
  { id: 'audio', name: 'AUDIO', description: 'Spirit box', icon: '📻' },
  { id: 'camera', name: 'CAMERA', description: 'Ghost camera', icon: '📷' },
];

interface ToolsTabProps {
  onToolSelect?: (toolId: string) => void;
  activeTool?: string;
}

const ToolsTab: React.FC<ToolsTabProps> = ({ onToolSelect, activeTool }) => {
  const handleToolClick = (toolId: string) => {
    onToolSelect?.(toolId);
  };

  return (
    <div
      style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      {/* Header */}
      <div
        style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '16px',
          fontWeight: 'bold',
          color: '#1a0f0a',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginBottom: '8px',
          borderBottom: '2px solid rgba(139, 69, 19, 0.4)',
          paddingBottom: '8px',
        }}
      >
        🔧 FIELD EQUIPMENT
      </div>

      {/* Tool grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '12px',
        }}
      >
        {TOOLS.map((tool) => {
          const isActive = tool.id === activeTool;
          
          return (
            <button
              key={tool.id}
              onClick={() => handleToolClick(tool.id)}
              style={{
                background: isActive ? '#e8e4dc' : '#d8d4c8',
                border: isActive ? '2px solid #8b7355' : '2px solid rgba(139, 69, 19, 0.3)',
                borderRadius: '8px',
                padding: '16px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: isActive
                  ? '0 4px 8px rgba(0,0,0,0.2), inset 0 2px 4px rgba(255,255,255,0.3)'
                  : '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {/* Aged card texture */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'multiply',
                  opacity: 0.3,
                  pointerEvents: 'none',
                }}
              />

              {/* Content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {/* Icon */}
                <div
                  style={{
                    fontSize: '32px',
                    marginBottom: '8px',
                    filter: isActive ? 'drop-shadow(0 0 4px rgba(139, 115, 85, 0.6))' : 'none',
                  }}
                >
                  {tool.icon}
                </div>

                {/* Name */}
                <div
                  style={{
                    fontFamily: '"Courier New", monospace',
                    fontSize: '13px',
                    fontWeight: 'bold',
                    color: '#1a0f0a',
                    marginBottom: '4px',
                    letterSpacing: '0.5px',
                  }}
                >
                  {tool.name}
                </div>

                {/* Description */}
                <div
                  style={{
                    fontFamily: '"Caveat", cursive',
                    fontSize: '12px',
                    color: '#4a3a2a',
                    lineHeight: '1.4',
                  }}
                >
                  {tool.description}
                </div>
              </div>

              {/* Active indicator */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#8b7355',
                    boxShadow: '0 0 8px rgba(139, 115, 85, 0.8)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Instructions */}
      <div
        style={{
          marginTop: '12px',
          padding: '12px',
          background: 'rgba(139, 69, 19, 0.1)',
          borderRadius: '4px',
          fontFamily: '"Caveat", cursive',
          fontSize: '14px',
          color: '#4a3a2a',
          lineHeight: '1.6',
        }}
      >
        Tap a tool to select and close backpack
      </div>
    </div>
  );
};

export default ToolsTab;
