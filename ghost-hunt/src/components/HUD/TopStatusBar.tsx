// Top Status Bar - Game-like Mobile UI with Horizontal ID Card
import { useSupplies } from '../../context/SuppliesContext';
import { HorizontalIDCard } from '../analog/elements/HorizontalIDCard';
import './TopStatusBar.css';

export function TopStatusBar() {
  const { supplies } = useSupplies();
  const level = 1; // TODO: Get from game state
  const getRank = (level: number) => {
    if (level >= 20) return 'SENIOR INVESTIGATOR';
    if (level >= 10) return 'INVESTIGATOR';
    if (level >= 5) return 'JUNIOR INVESTIGATOR';
    return 'ROOKIE';
  };

  return (
    <div className="top-status-bar">
      {/* Left: Horizontal ID Card */}
      <div className="status-section" style={{ position: 'relative', zIndex: 2 }}>
        <HorizontalIDCard
          agentName="AGENT_001"
          agentId="PI-0001-A"
          rank={getRank(level)}
          level={level}
          seed="topbar-id"
        />
      </div>

      {/* Center: Supplies Quick View */}
      <div className="status-section status-supplies" style={{ position: 'relative', zIndex: 2 }}>
        <div className="supply-item">
          <span className="supply-icon">🎞️</span>
          <span className="supply-count">{supplies.film}</span>
        </div>
        <div className="supply-item">
          <span className="supply-icon">⚡</span>
          <span className="supply-count">{supplies.boosts}</span>
        </div>
        <div className="supply-item">
          <span className="supply-icon">🔮</span>
          <span className="supply-count">{supplies.charms}</span>
        </div>
      </div>

      {/* Right: Signal/Status */}
      <div className="status-section" style={{ position: 'relative', zIndex: 2 }}>
        <div className="status-item">
          <div className="signal-indicator">
            <div className="signal-dot signal-active" />
            <div className="signal-dot signal-active" />
            <div className="signal-dot signal-active" />
          </div>
          <div className="status-content">
            <div className="status-label">SIGNAL</div>
            <div className="status-value">ONLINE</div>
          </div>
        </div>
      </div>
    </div>
  );
}

