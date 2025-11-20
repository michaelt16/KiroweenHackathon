// Tool bar component - bottom HUD with tool buttons
import { useInvestigation } from '../../context/InvestigationContext';
import './ToolBar.css';

const TOOLS = [
  { id: 'emf', icon: '📡', name: 'EMF' },
  { id: 'thermal', icon: '🌡️', name: 'Thermal' },
  { id: 'audio', icon: '📻', name: 'Audio' },
  { id: 'camera', icon: '📷', name: 'Camera' },
  { id: 'static', icon: '📺', name: 'Static' },
] as const;

export function ToolBar() {
  const { toolsEnabled, toggleTool } = useInvestigation();

  return (
    <div className="tool-bar">
      {TOOLS.map((tool) => {
        const isActive = toolsEnabled[tool.id];
        return (
          <button
            key={tool.id}
            onClick={() => toggleTool(tool.id)}
            className={`tool-button ${isActive ? 'active' : ''}`}
            title={tool.name}
          >
            <span className="tool-icon">{tool.icon}</span>
            <span className="tool-name">{tool.name}</span>
          </button>
        );
      })}
    </div>
  );
}
