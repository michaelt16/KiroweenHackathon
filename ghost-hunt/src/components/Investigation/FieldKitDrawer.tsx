// Field Kit Drawer - Worn Field Bag Container (Production)
import { useState, useMemo } from 'react';
import { ToolsTab } from './FieldKit/ToolsTab';
import { PhotosTab } from './FieldKit/PhotosTab';
import { EvidenceTab } from './FieldKit/EvidenceTab';
import { CodexTab } from './FieldKit/CodexTab';
import { FieldJournalsScreen } from '../../screens/FieldJournalsScreen';
import { ToolIcon } from '../Equipment/ToolIcon';

type TabType = 'tools' | 'photos' | 'evidence' | 'journal' | 'codex';

interface FieldKitDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeTool?: 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';
}

// Static decoration data - defined outside component to prevent re-creation
const SCRATCHES = [
  { top: '5%', left: '10%', width: '80px', angle: -25 },
  { top: '15%', right: '15%', width: '60px', angle: 35 },
  { bottom: '20%', left: '20%', width: '70px', angle: -15 },
];

const DUST_SPOTS = [
  { top: '10%', right: '8%', size: '30px' },
  { bottom: '15%', left: '12%', size: '25px' },
];

const STITCHES = [
  { side: 'left' as const, offset: '8px' },
  { side: 'right' as const, offset: '8px' },
];

export function FieldKitDrawer({ isOpen, onClose, activeTool = 'radar' }: FieldKitDrawerProps) {
  const [activeTab, setActiveTab] = useState<TabType>('tools');

  const tabs: { id: TabType; label: string }[] = [
    { id: 'tools', label: 'TOOLS' },
    { id: 'photos', label: 'PHOTOS' },
    { id: 'evidence', label: 'EVIDENCE' },
    { id: 'journal', label: 'JOURNAL' },
    { id: 'codex', label: 'CODEX' },
  ];

  return (
    <>
      {/* Handle/Pull Tab - Always visible */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          bottom: isOpen ? 'calc(60vh - 10px)' : '0',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1001,
          width: '120px',
          height: '40px',
          background: 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer',
          border: '2px solid #1a1a1a',
          borderBottom: 'none',
          transition: 'bottom 0.3s ease-in-out',
          boxShadow: '0 -4px 12px rgba(0,0,0,0.6)',
        }}
      >
        {/* Active Tool Icon - CSS Tool Icon */}
        <div style={{ 
          width: '24px', 
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <ToolIcon toolType={activeTool} size={24} />
        </div>
        
        {/* Pull indicator */}
        <div style={{
          width: '40px',
          height: '4px',
          background: 'rgba(200,200,200,0.5)',
          borderRadius: '2px',
        }} />
      </div>

      {/* Drawer */}
      <div style={{
        position: 'fixed',
        bottom: isOpen ? 0 : '-60vh',
        left: 0,
        right: 0,
        height: '60vh',
        maxHeight: '600px',
        transition: 'bottom 0.3s ease-in-out',
        zIndex: 1000,
      }}>
      {/* Drawer Frame - Worn field bag interior */}
      <div style={{
        width: '100%',
        height: '100%',
        background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
        border: '3px solid #0f0f0f',
        borderBottom: 'none',
        borderRadius: '12px 12px 0 0',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.9), inset 0 2px 8px rgba(0,0,0,0.6)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        
        {/* Canvas texture overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/texture/wrinkledpaper.png)',
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Dust overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/assets/texture/dust.png)',
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.25,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Light scratches on frame */}
        {SCRATCHES.map((scratch, i) => (
          <div
            key={`scratch-${i}`}
            style={{
              position: 'absolute',
              top: scratch.top,
              bottom: scratch.bottom,
              left: scratch.left,
              right: scratch.right,
              width: scratch.width,
              height: '1px',
              background: 'rgba(255,255,255,0.15)',
              transform: `rotate(${scratch.angle}deg)`,
              opacity: 0.4,
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        ))}

        {/* Dust/grime spots */}
        {DUST_SPOTS.map((spot, i) => (
          <div
            key={`dust-${i}`}
            style={{
              position: 'absolute',
              top: spot.top,
              bottom: spot.bottom,
              left: spot.left,
              right: spot.right,
              width: spot.size,
              height: spot.size,
              backgroundImage: 'url(/assets/texture/dust.png)',
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        ))}

        {/* Zipper line at top */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '10%',
          right: '10%',
          height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(100,100,100,0.6) 10%, rgba(100,100,100,0.8) 50%, rgba(100,100,100,0.6) 90%, transparent 100%)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.8)',
          zIndex: 3,
        }} />

        {/* Zipper pull */}
        <div 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '10px',
            background: 'linear-gradient(135deg, #6a6a6a 0%, #4a4a4a 50%, #2a2a2a 100%)',
            borderRadius: '3px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.8)',
            zIndex: 3,
            cursor: 'pointer',
          }}
        />

        {/* Stitching lines along edges */}
        {[
          { side: 'left' as const, offset: '8px' },
          { side: 'right' as const, offset: '8px' },
        ].map((stitch, i) => (
          <div
            key={`stitch-${i}`}
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              [stitch.side]: stitch.offset,
              width: '2px',
              background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(150,130,100,0.4) 2px, transparent 4px, transparent 10px)',
              pointerEvents: 'none',
              zIndex: 2,
            }}
          />
        ))}

        {/* Tab Bar */}
        <div style={{
          display: 'flex',
          gap: '4px',
          padding: '12px 20px 0',
          borderBottom: '2px solid #0f0f0f',
          position: 'relative',
          zIndex: 10,
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                background: activeTab === tab.id
                  ? 'linear-gradient(180deg, #4a4a4a 0%, #3a3a3a 100%)'
                  : 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)',
                border: '1px solid #1a1a1a',
                borderBottom: 'none',
                padding: '8px 16px',
                borderRadius: '6px 6px 0 0',
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                color: activeTab === tab.id ? 'rgba(220,220,220,0.8)' : 'rgba(200,200,200,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                cursor: 'pointer',
                transform: activeTab === tab.id ? 'translateY(-2px)' : 'none',
                boxShadow: activeTab === tab.id
                  ? '0 -2px 8px rgba(0,0,0,0.6), inset 0 1px 2px rgba(0,0,0,0.6)'
                  : 'inset 0 1px 2px rgba(0,0,0,0.6)',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div style={{
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0f0f0f 100%)',
          padding: '20px',
          height: 'calc(100% - 60px)',
          overflowY: 'auto',
          boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.8), inset 0 -2px 6px rgba(0,0,0,0.6)',
          position: 'relative',
          zIndex: 5,
        }}>
          {activeTab === 'tools' && <ToolsTab onSelectTool={onClose} />}
          {activeTab === 'photos' && <PhotosTab />}
          {activeTab === 'evidence' && <EvidenceTab />}
          {activeTab === 'journal' && (
            <div style={{
              width: '100%',
              height: '100%',
              overflow: 'auto',
            }}>
              <FieldJournalsScreen hideBackButton={true} />
            </div>
          )}
          {activeTab === 'codex' && <CodexTab />}
        </div>
      </div>
      </div>
    </>
  );
}
