// Top Status Bar - Game-like Mobile UI
import { useSupplies } from '../../context/SuppliesContext';
import './TopStatusBar.css';

export function TopStatusBar() {
  const { supplies } = useSupplies();

  return (
    <div className="top-status-bar">
      {/* Left: Player Info */}
      <div className="status-section">
        <div className="status-item">
          <span className="status-icon">👤</span>
          <div className="status-content">
            <div className="status-label">AGENT</div>
            <div className="status-value">LEVEL 1</div>
          </div>
        </div>
      </div>

      {/* Center: Supplies Quick View */}
      <div className="status-section status-supplies">
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
      <div className="status-section">
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

