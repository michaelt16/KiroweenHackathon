// Tools Tab - Equipment Case Interior (Production)
import { useInvestigation } from '../../../context/InvestigationContext';
import { PhysicalToolDevice } from '../../Equipment/PhysicalToolDevice';
import { MechanicalFilmCounter } from '../../Equipment/MechanicalFilmCounter';
import { LEDBoostGauge } from '../../Equipment/LEDBoostGauge';
import { AnalogCharmsIndicator } from '../../Equipment/AnalogCharmsIndicator';
import foamTexture from '../../../assets/texture/foam.png';

interface ToolsTabProps {
  onSelectTool: () => void;
}

type ToolType = 'radar' | 'emf' | 'thermal' | 'audio' | 'camera';

// Static tool list - defined outside component to prevent re-creation
const TOOLS = [
  { toolType: 'radar' as const, name: 'Radar' },
  { toolType: 'emf' as const, name: 'EMF Meter' },
  { toolType: 'thermal' as const, name: 'Thermal' },
  { toolType: 'audio' as const, name: 'Audio' },
  { toolType: 'camera' as const, name: 'Camera' },
];

export function ToolsTab({ onSelectTool }: ToolsTabProps) {
  const { activeTool, setActiveTool, suppliesForRun } = useInvestigation();

  const handleSelectTool = (toolId: ToolType) => {
    console.log('🔧 Tool selected:', toolId);
    setActiveTool(toolId);
    onSelectTool();
  };

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Equipment case interior - foam cutouts */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
        padding: '24px',
        borderRadius: '8px',
        border: '3px solid #000',
        boxShadow: 'inset 0 12px 24px rgba(0,0,0,0.95), inset 0 -6px 12px rgba(0,0,0,0.8)',
        position: 'relative',
      }}>
        {/* Foam texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='4' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.3'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
          opacity: 0.5,
          pointerEvents: 'none',
          borderRadius: '8px',
        }} />

        {/* Tools section */}
        <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            color: 'rgba(200,200,200,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
            textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
          }}>
            INVESTIGATION TOOLS
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '16px',
          }}>
            {TOOLS.map((item) => (
              <div 
                key={item.toolType} 
                onClick={() => handleSelectTool(item.toolType)}
                style={{
                  background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
                  padding: '16px',
                  borderRadius: '8px',
                  border: '2px solid #1a1a1a',
                  boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.95), inset 0 -3px 8px rgba(0,0,0,0.9)',
                  position: 'relative',
                  minHeight: '140px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                {/* Foam texture */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${foamTexture})`,
                  backgroundSize: 'cover',
                  mixBlendMode: 'soft-light',
                  opacity: 0.9,
                  pointerEvents: 'none',
                  borderRadius: '8px',
                }} />
                <PhysicalToolDevice 
                  toolType={item.toolType} 
                  size={90}
                  onClick={() => {}}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Supplies section */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            color: 'rgba(200,200,200,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: '16px',
            textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
          }}>
            SUPPLIES
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '20px',
            justifyItems: 'center',
          }}>
            {/* Film Counter */}
            <div style={{ 
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
              padding: '10px',
              borderRadius: '8px',
              border: '2px solid #1a1a1a',
              boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.95), inset 0 -3px 8px rgba(0,0,0,0.9)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '110px',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${foamTexture})`,
                backgroundSize: 'cover',
                mixBlendMode: 'soft-light',
                opacity: 0.9,
                pointerEvents: 'none',
                borderRadius: '8px',
              }} />
              <MechanicalFilmCounter count={suppliesForRun.film} />
            </div>

            {/* Boosts Gauge */}
            <div style={{ 
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
              padding: '10px',
              borderRadius: '8px',
              border: '2px solid #1a1a1a',
              boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.95), inset 0 -3px 8px rgba(0,0,0,0.9)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '110px',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${foamTexture})`,
                backgroundSize: 'cover',
                mixBlendMode: 'soft-light',
                opacity: 0.9,
                pointerEvents: 'none',
                borderRadius: '8px',
              }} />
              <LEDBoostGauge count={suppliesForRun.boosts} max={99} />
            </div>

            {/* Charms Indicator */}
            <div style={{ 
              background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
              padding: '10px',
              borderRadius: '8px',
              border: '2px solid #1a1a1a',
              boxShadow: 'inset 0 6px 16px rgba(0,0,0,0.95), inset 0 -3px 8px rgba(0,0,0,0.9)',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '110px',
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${foamTexture})`,
                backgroundSize: 'cover',
                mixBlendMode: 'soft-light',
                opacity: 0.9,
                pointerEvents: 'none',
                borderRadius: '8px',
              }} />
              <AnalogCharmsIndicator count={suppliesForRun.charms} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
