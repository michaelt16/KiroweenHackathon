import React, { useState, useCallback } from 'react';

export interface Tab {
  id: string;
  label: string;
  icon?: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabChange }) => {
  const [isDebouncing, setIsDebouncing] = useState(false);

  const handleTabClick = useCallback((tabId: string) => {
    if (isDebouncing || tabId === activeTab) return;

    setIsDebouncing(true);
    onTabChange(tabId);

    // Debounce for 200ms
    setTimeout(() => {
      setIsDebouncing(false);
    }, 200);
  }, [isDebouncing, activeTab, onTabChange]);

  return (
    <>
      <div
        className="tab-bar"
        style={{
          display: 'flex',
          borderBottom: '2px solid rgba(139, 69, 19, 0.4)',
          background: '#c4b49a',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          
          return (
            <button
              key={tab.id}
              className={`tab ${isActive ? 'tab-active' : 'tab-inactive'}`}
              onClick={() => handleTabClick(tab.id)}
              disabled={isDebouncing}
              style={{
                flex: 1,
                padding: '12px 8px',
                border: 'none',
                background: isActive ? '#d8d4c8' : '#b4a49a',
                color: isActive ? '#1a0f0a' : '#4a3a2a',
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                fontWeight: isActive ? 'bold' : 'normal',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                cursor: isDebouncing ? 'not-allowed' : 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease-in',
                borderRight: '1px solid rgba(139, 69, 19, 0.3)',
                opacity: isDebouncing ? 0.6 : 1,
              }}
            >
              {/* Active tab raised effect */}
              {isActive && (
                <>
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: -2,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: '#d8d4c8',
                    }}
                  />
                </>
              )}

              {/* Tab content */}
              <div style={{ position: 'relative', zIndex: 1 }}>
                {tab.icon && (
                  <span style={{ marginRight: '4px', fontSize: '14px' }}>
                    {tab.icon}
                  </span>
                )}
                <span>{tab.label}</span>
              </div>

              {/* Inactive tab shadow */}
              {!isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <style>{`
        .tab:last-child {
          border-right: none;
        }

        .tab:active:not(:disabled) {
          transform: translateY(1px);
        }

        .tab-active {
          box-shadow: 0 -2px 4px rgba(0,0,0,0.1);
        }

        .tab-inactive:hover:not(:disabled) {
          background: #a49484;
        }
      `}</style>
    </>
  );
};
