// Top Status Bar - 5 Even Items
import { useState, useEffect } from 'react';
import { useSupplies } from '../../context/SuppliesContext';
import { HorizontalIDCard } from '../analog/elements/HorizontalIDCard';
import './TopStatusBar.css';

interface TopStatusBarProps {
  position?: 'top' | 'left';
}

export function TopStatusBar({ position = 'top' }: TopStatusBarProps) {
  const { supplies } = useSupplies();
  const level = 1; // TODO: Get from game state
  
  // Get money from localStorage or default to 0
  const [money, setMoney] = useState<number>(() => {
    const saved = localStorage.getItem('ghost-hunt-money');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Listen for money updates (if updated elsewhere)
  useEffect(() => {
    const handleStorageChange = () => {
      const saved = localStorage.getItem('ghost-hunt-money');
      if (saved) {
        setMoney(parseInt(saved, 10));
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Also check periodically in case updated in same tab
    const interval = setInterval(handleStorageChange, 500);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const getRank = (level: number) => {
    if (level >= 20) return 'SENIOR INVESTIGATOR';
    if (level >= 10) return 'INVESTIGATOR';
    if (level >= 5) return 'JUNIOR INVESTIGATOR';
    return 'ROOKIE';
  };

  return (
    <div className={`top-status-bar ${position === 'left' ? 'top-status-bar-left' : ''}`}>
      {/* Item 1: ID Card */}
      <div className="status-item-wrapper">
        <HorizontalIDCard
          agentName="AGENT_001"
          agentId="PI-0001-A"
          rank={getRank(level)}
          level={level}
          seed="topbar-id"
        />
      </div>

      {/* Item 2: Film */}
      <div className="status-item-wrapper supply-item">
        <span className="supply-icon">🎞️</span>
        <span className="supply-count">{supplies.film}</span>
      </div>

      {/* Item 3: Boost */}
      <div className="status-item-wrapper supply-item">
        <span className="supply-icon">⚡</span>
        <span className="supply-count">{supplies.boosts}</span>
      </div>

      {/* Item 4: Charm */}
      <div className="status-item-wrapper supply-item">
        <span className="supply-icon">🔮</span>
        <span className="supply-count">{supplies.charms}</span>
      </div>

      {/* Item 5: Money */}
      <div className="status-item-wrapper money-item">
        <div className="money-icon">💰</div>
        <div className="money-content">
          <div className="money-label">BALANCE</div>
          <div className="money-value">${money.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}
