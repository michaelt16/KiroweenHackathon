import React, { useState } from 'react';

interface BinderTab {
  id: string;
  label: string;
  color?: string;
}

interface BinderViewProps {
  tabs: BinderTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  children: React.ReactNode;
}

/**
 * BinderView - A physical binder/folder aesthetic with tab dividers at the top
 * Perfect for mobile-friendly navigation that looks like a real case file binder
 */
export const BinderView: React.FC<BinderViewProps> = ({
  tabs,
  activeTab,
  onTabChange,
  children,
}) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Binder tabs at the top - like folder dividers */}
      <div
        style={{
          display: 'flex',
          gap: '2px',
          paddingLeft: '8px',
          paddingRight: '8px',
          position: 'relative',
          zIndex: 2,
          marginBottom: '-2px', // Overlap with content
        }}
      >
        {tabs.map((tab, index) => {
          const isActive = tab.id === activeTab;
          const tabColor = tab.color || '#d8d4c8';
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              style={{
                flex: 1,
                maxWidth: '120px',
                minWidth: '60px',
                height: isActive ? '36px' : '32px',
                background: isActive ? tabColor : `color-mix(in srgb, ${tabColor} 70%, #8b7355)`,
                border: 'none',
                borderTopLeftRadius: '6px',
                borderTopRightRadius: '6px',
                borderTop: '2px solid rgba(139, 69, 19, 0.4)',
                borderLeft: '2px solid rgba(139, 69, 19, 0.4)',
                borderRight: '2px solid rgba(139, 69, 19, 0.4)',
                cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
                marginTop: isActive ? '0' : '4px',
                boxShadow: isActive 
                  ? '0 -2px 4px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)'
                  : 'inset 0 2px 4px rgba(0,0,0,0.2)',
                transform: isActive ? 'translateY(2px)' : 'none',
              }}
            >
              {/* Tab texture */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
                  mixBlendMode: 'multiply',
                  opacity: 0.3,
                  pointerEvents: 'none',
                  borderTopLeftRadius: '6px',
                  borderTopRightRadius: '6px',
                }}
              />

              {/* Tab label */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 1,
                  fontFamily: '"Courier New", monospace',
                  fontSize: '10px',
                  fontWeight: isActive ? 'bold' : 'normal',
                  color: isActive ? '#1a0f0a' : '#4a3a2a',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  padding: '0 4px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </div>

              {/* Worn edge on inactive tabs */}
              {!isActive && (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '2px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(139, 69, 19, 0.3) 50%, transparent 100%)',
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Binder folder - brown cardboard outer folder */}
      <div
        style={{
          flex: 1,
          background: '#d8d4c8',
          border: '2px solid rgba(139, 69, 19, 0.4)',
          borderRadius: '0 8px 8px 8px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 
            '0 4px 12px rgba(0,0,0,0.2), ' +
            'inset 0 2px 4px rgba(255,255,255,0.1)',
          padding: '12px', // Padding for the folder border
        }}
      >
        {/* Brown cardboard folder texture - outer layer */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.15'/%3E%3C/svg%3E")`,
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Dust overlay on folder */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='dust'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23dust)' opacity='0.2'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
            opacity: 0.2,
            pointerEvents: 'none',
            zIndex: 1,
          }}
        />

        {/* Paper content inside the folder - white/cream paper */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            background: '#f4f0e6',
            borderRadius: '4px',
            overflow: 'hidden',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          {/* Wrinkled paper texture on the inner paper */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23paper)' opacity='0.15'/%3E%3C/svg%3E")`,
              mixBlendMode: 'multiply',
              opacity: 0.3,
              pointerEvents: 'none',
            }}
          />

          {/* Binder rings shadow (left side) */}
          <div
            style={{
              position: 'absolute',
              left: '20px',
              top: '10%',
              bottom: '10%',
              width: '2px',
              background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.1) 10%, rgba(0,0,0,0.1) 90%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Content area with scroll */}
          <div
            style={{
              position: 'relative',
              height: '100%',
              overflow: 'auto',
              padding: '20px',
            }}
          >
            {children}
          </div>

          {/* Coffee stain decoration on paper */}
          <div
            style={{
              position: 'absolute',
              bottom: '15%',
              right: '10%',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(139, 69, 19, 0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      <style>{`
        /* Custom scrollbar for binder content */
        .binder-content::-webkit-scrollbar {
          width: 8px;
        }

        .binder-content::-webkit-scrollbar-track {
          background: rgba(139, 69, 19, 0.1);
        }

        .binder-content::-webkit-scrollbar-thumb {
          background: rgba(139, 69, 19, 0.4);
          border-radius: 4px;
        }

        .binder-content::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 69, 19, 0.6);
        }
      `}</style>
    </div>
  );
};
