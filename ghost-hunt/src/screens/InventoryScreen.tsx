// Equipment Suitcase - Looking into your field kit
import { useState, useMemo } from 'react';
import { useSupplies } from '../context/SuppliesContext';
import { BackToMapButton } from '../components/analog/elements/BackToMapButton';
import { PhysicalToolDevice } from '../components/Equipment/PhysicalToolDevice';
import { MechanicalFilmCounter } from '../components/Equipment/MechanicalFilmCounter';
import { LEDBoostGauge } from '../components/Equipment/LEDBoostGauge';
import { AnalogCharmsIndicator } from '../components/Equipment/AnalogCharmsIndicator';
import { DamageElements } from '../components/Equipment/DamageElements';
// Import refactored investigation tools (same as InvestigationScreen)
import { RadarTool } from '../components/Investigation/Tools/RadarTool';
import { EMFTool } from '../components/Investigation/Tools/EMFTool/index';
import { ThermalTool } from '../components/Investigation/Tools/ThermalTool';
import { CameraTool } from '../components/Investigation/Tools/CameraTool';
import { SpiritBoxTool } from '../components/Investigation/Tools/SpiritBoxTool/index';
import { generateCaseDamage } from '../utils/damageElements';
import foamTexture from '../assets/texture/foam.png';
import { FieldNoteCard } from '../components/Equipment/FieldNoteCard';
import { DetailedNoteModal } from '../components/Equipment/DetailedNoteModal';

export function InventoryScreen() {
  const { supplies } = useSupplies();
  const isMobile = window.innerWidth < 768;
  const [viewingTool, setViewingTool] = useState<'radar' | 'emf' | 'thermal' | 'audio' | 'camera' | null>(null);
  const [viewingNote, setViewingNote] = useState<string | null>(null);
  
  // Generate damage elements once (exterior and interior)
  const caseDamage = useMemo(() => generateCaseDamage(), []);
  const interiorDamage = useMemo(() => generateCaseDamage(), []);

  // Equipment items - tools in suitcase
  const equipmentItems = [
    { id: 'radar', name: 'Radar', toolType: 'radar' as const },
    { id: 'emf', name: 'EMF Meter', toolType: 'emf' as const },
    { id: 'thermal', name: 'Thermal', toolType: 'thermal' as const },
    { id: 'audio', name: 'Audio', toolType: 'audio' as const },
    { id: 'camera', name: 'Camera', toolType: 'camera' as const },
  ];

  // Field notes for each tool
  const toolNotes: Record<string, { brief: string; detailed: string; position: 'left' | 'right'; title: string }> = {
    radar: {
      brief: 'SPIN TO\nSCAN',
      title: 'RADAR UNIT',
      detailed: 'Rotate your body 360° to scan for ghost direction.\n\nGreen blip = ghost detected in that direction.\n\nDoes NOT show distance - only direction.',
      position: 'left',
    },
    emf: {
      brief: 'WALK\nCLOSER',
      title: 'EMF METER',
      detailed: 'Walk toward the ghost location.\n\nBeeps get faster = getting closer\nBeeps get slower = moving away\n\nLevel 5 = very close!',
      position: 'right',
    },
    thermal: {
      brief: 'COLD =\nGHOST',
      title: 'THERMAL SCANNER',
      detailed: 'Look for blue/cold spots on screen.\n\nGhosts create freezing temperatures.\n\nScan slowly across the area.',
      position: 'left',
    },
    audio: {
      brief: 'LISTEN\nCLOSE',
      title: 'AUDIO RECEIVER',
      detailed: 'Listen for whispers and EVP.\n\nGhosts communicate through static.\n\nTurn up volume, stay quiet.',
      position: 'right',
    },
    camera: {
      brief: 'SNAP\nPHOTO',
      title: 'CAMERA',
      detailed: 'Take photos to capture ghost manifestations.\n\nUses film rolls (limited).\n\nWait 7 seconds between shots.',
      position: 'left',
    },
  };

  // Supply items
  const supplyItems = [
    { icon: '🎞️', label: 'Film', count: supplies.film },
    { icon: '⚡', label: 'Boosts', count: supplies.boosts },
    { icon: '🔮', label: 'Charms', count: supplies.charms },
  ];

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#1a1a1a',
        padding: isMobile ? '16px' : '24px',
        overflowY: 'auto',
      }}
    >
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Back button */}
        <div style={{ marginBottom: '20px' }}>
          <BackToMapButton />
        </div>

        {/* Suitcase exterior */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
            border: '4px solid #0f0f0f',
            borderRadius: '12px',
            padding: isMobile ? '20px' : '32px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.9), inset 0 2px 8px rgba(0,0,0,0.6)',
            position: 'relative',
          }}
        >
          {/* Metal texture overlay on suitcase exterior */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/assets/texture/metalscratchedtexture.png)',
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.6,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 0,
            }}
          />

          {/* Rust/wear overlay on suitcase */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/assets/texture/brownrust.png)',
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 0,
            }}
          />

          {/* Dust/grime layer on suitcase */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url(/assets/texture/dust.png)',
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.3,
              pointerEvents: 'none',
              borderRadius: '12px',
              zIndex: 0,
            }}
          />

          {/* Damage Elements - Exterior */}
          <DamageElements
            lightScratches={caseDamage.lightScratches}
            darkScratches={caseDamage.darkScratches}
            rustSpots={caseDamage.rustSpots}
            paintChips={caseDamage.paintChips}
            fingerprints={caseDamage.fingerprints}
            tapePatches={caseDamage.tapePatches}
          />

          {/* Upgraded Latches with realistic metal gradients */}
          {[0, 1].map((i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: '20px',
                [i === 0 ? 'left' : 'right']: '20px',
                width: '40px',
                height: '20px',
                background: 'linear-gradient(135deg, #5a5a5a 0%, #4a4a4a 20%, #3a3a3a 50%, #2a2a2a 80%, #1a1a1a 100%)',
                border: '2px solid #0f0f0f',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                borderRadius: '4px',
                boxShadow: 
                  'inset 0 3px 6px rgba(0,0,0,0.9), ' +
                  'inset 0 -2px 4px rgba(255,255,255,0.08), ' +
                  '0 4px 8px rgba(0,0,0,0.8)',
                zIndex: 1,
              }}
            >
              {/* Latch screw with enhanced 3D appearance */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #7a7a7a 0%, #5a5a5a 30%, #3a3a3a 60%, #1a1a1a 100%)',
                  boxShadow: 
                    'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                    'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                    '0 2px 4px rgba(0,0,0,0.8)',
                  border: '1px solid rgba(0,0,0,0.7)',
                }}
              >
                {/* Screw slot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '7px',
                    height: '1px',
                    background: '#0a0a0a',
                    boxShadow: '0 0 2px rgba(0,0,0,0.9)',
                  }}
                />
              </div>
            </div>
          ))}

          {/* Enhanced Handle with proper beveling and depth shadows */}
          <div
            style={{
              position: 'absolute',
              top: '-20px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '120px',
              height: '30px',
              background: 'linear-gradient(135deg, #5a5a5a 0%, #4a4a4a 15%, #3a3a3a 35%, #2a2a2a 65%, #1a1a1a 85%, #0f0f0f 100%)',
              border: '3px solid #0a0a0a',
              borderTop: '2px solid rgba(255,255,255,0.12)',
              borderRadius: '15px',
              boxShadow: 
                '0 6px 16px rgba(0,0,0,0.9), ' +
                '0 3px 8px rgba(0,0,0,0.7), ' +
                'inset 0 3px 6px rgba(0,0,0,0.8), ' +
                'inset 0 -2px 4px rgba(255,255,255,0.1)',
              zIndex: 1,
            }}
          >
            {/* Handle grip texture lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${20 + i * 15}%`,
                  transform: 'translateY(-50%)',
                  width: '2px',
                  height: '60%',
                  background: 'linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.6) 100%)',
                  borderRadius: '1px',
                }}
              />
            ))}
          </div>

          {/* Label plate */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 50%, #1a1a1a 100%)',
              padding: '12px 20px',
              borderRadius: '6px',
              border: '2px solid #0f0f0f',
              boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.6)',
              marginBottom: '24px',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '400px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Metal texture overlay - EXACT match to Radar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/texture/metalscratchedtexture.png)',
                backgroundSize: 'cover',
                mixBlendMode: 'overlay',
                opacity: 0.6,
                pointerEvents: 'none',
                borderRadius: '6px',
                zIndex: 0,
              }}
            />

            {/* Rust/wear overlay - EXACT match to Radar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/texture/brownrust.png)',
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.4,
                pointerEvents: 'none',
                borderRadius: '6px',
                zIndex: 0,
              }}
            />

            {/* Dust/grime layer - EXACT match to Radar */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'url(/assets/texture/dust.png)',
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: 0.3,
                pointerEvents: 'none',
                borderRadius: '6px',
                zIndex: 0,
              }}
            />

            {/* Upgraded Rivets with 3D appearance */}
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  [i < 2 ? 'top' : 'bottom']: '6px',
                  [i % 2 === 0 ? 'left' : 'right']: '10px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle at 35% 35%, #6a6a6a 0%, #5a5a5a 25%, #3a3a3a 60%, #1a1a1a 100%)',
                  boxShadow: 
                    'inset 0 2px 3px rgba(255,255,255,0.25), ' +
                    'inset 0 -2px 3px rgba(0,0,0,0.95), ' +
                    '0 2px 4px rgba(0,0,0,0.8)',
                  border: '0.5px solid rgba(0,0,0,0.6)',
                  zIndex: 1,
                }}
              >
                {/* Rivet center depression */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '3px',
                    height: '3px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, #1a1a1a 0%, #0a0a0a 100%)',
                    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                  }}
                />
              </div>
            ))}

            <div
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: isMobile ? '14px' : '16px',
                fontWeight: 'bold',
                color: 'rgba(200,200,200,0.5)',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textShadow: '0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.9)',
                position: 'relative',
                zIndex: 2,
              }}
            >
              FIELD INVESTIGATION KIT
            </div>
          </div>

          {/* Suitcase interior - foam cutouts */}
          <div
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 50%, #0a0a0a 100%)',
              padding: isMobile ? '24px' : '28px',
              borderRadius: '8px',
              border: '3px solid #000',
              boxShadow: 'inset 0 12px 24px rgba(0,0,0,0.95), inset 0 -6px 12px rgba(0,0,0,0.8)',
              position: 'relative',
            }}
          >
            {/* Foam texture */}
            <div
              style={{
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
              }}
            />

            {/* Damage Elements - Interior */}
            <DamageElements
              lightScratches={interiorDamage.lightScratches}
              darkScratches={interiorDamage.darkScratches}
              rustSpots={interiorDamage.rustSpots}
              paintChips={interiorDamage.paintChips}
              fingerprints={interiorDamage.fingerprints}
              tapePatches={interiorDamage.tapePatches}
            />

            {/* Physical Details System */}
            {/* Serial Number - Bottom right */}
            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '15px',
                fontFamily: '"Courier New", monospace',
                fontSize: '8px',
                color: 'rgba(150,150,150,0.45)',
                transform: 'rotate(0.4deg)',
                textShadow: '0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 21,
              }}
            >
              SN: FK-1985-A7
            </div>

            {/* Calibration Note - Near tools section */}
            <div
              style={{
                position: 'absolute',
                top: '15%',
                right: '8%',
                fontFamily: '"Caveat", cursive',
                fontSize: '10px',
                color: 'rgba(180,180,150,0.45)',
                transform: 'rotate(-0.5deg)',
                textShadow: '0 -1px 1px rgba(255,255,255,0.2), 0 1px 2px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 21,
              }}
            >
              cal. 03/19
            </div>

            {/* Manufacturing Stamps */}
            <div
              style={{
                position: 'absolute',
                top: '12px',
                left: '15px',
                fontFamily: '"Courier New", monospace',
                fontSize: '8px',
                fontWeight: 'bold',
                color: 'rgba(139,0,0,0.4)',
                transform: 'rotate(-8deg)',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
                zIndex: 21,
                border: '1px solid rgba(139,0,0,0.3)',
                padding: '2px 4px',
              }}
            >
              INSPECTED
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '10%',
                fontFamily: '"Courier New", monospace',
                fontSize: '8px',
                fontWeight: 'bold',
                color: 'rgba(0,0,0,0.4)',
                transform: 'rotate(12deg)',
                textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
                zIndex: 21,
                border: '1px solid rgba(0,0,0,0.3)',
                padding: '2px 4px',
              }}
            >
              QC PASS
            </div>

            {/* Weld Lines/Seams (3-5 horizontal/vertical) */}
            {/* Horizontal seams */}
            {[
              { top: '12%', left: '10%', right: '10%' },
              { top: '25%', left: '8%', right: '8%' },
              { bottom: '15%', left: '12%', right: '12%' },
            ].map((weld, i) => (
              <div
                key={`h-weld-${i}`}
                style={{
                  position: 'absolute',
                  top: weld.top,
                  bottom: weld.bottom,
                  left: weld.left,
                  right: weld.right,
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                  opacity: 0.4 + i * 0.05,
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />
            ))}

            {/* Vertical seams */}
            {[
              { top: '10%', left: '6%', bottom: '25%' },
              { top: '10%', right: '6%', bottom: '25%' },
            ].map((weld, i) => (
              <div
                key={`v-weld-${i}`}
                style={{
                  position: 'absolute',
                  top: weld.top,
                  bottom: weld.bottom,
                  left: weld.left,
                  right: weld.right,
                  width: '2px',
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                  opacity: 0.5,
                  pointerEvents: 'none',
                  zIndex: 5,
                }}
              />
            ))}

            {/* Tools section */}
            <div style={{ marginBottom: '24px', position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '11px' : '12px',
                  color: 'rgba(200,200,200,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                  textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                }}
              >
                INVESTIGATION TOOLS
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
                  gap: isMobile ? '16px' : '16px',
                }}
              >
                {equipmentItems.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      // Enhanced foam color gradient - charcoal gray EVA foam
                      background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
                      // Even padding all around
                      padding: '16px',
                      borderRadius: '8px',
                      // Darker foam edges (2px border, #1a1a1a)
                      border: '2px solid #1a1a1a',
                      // Multi-layer deep inset shadows for realistic depth
                      boxShadow: 
                        'inset 0 6px 16px rgba(0,0,0,0.95), ' +
                        'inset 0 -3px 8px rgba(0,0,0,0.9), ' +
                        'inset 0 0 20px rgba(0,0,0,0.85)',
                      position: 'relative',
                      minHeight: isMobile ? '130px' : '140px',
                      // Flex layout: evenly spaced - edge, tool, middle, card, edge
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      gap: '0px',
                    }}
                  >
                    {/* Enhanced EVA foam texture with grain pattern */}
                    <div
                      style={{
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
                      }}
                    />

                    {/* Tool device (left side) - BIGGER to look like physical item */}
                    <div style={{ position: 'relative', zIndex: 1, flexShrink: 0 }}>
                      <PhysicalToolDevice 
                        toolType={item.toolType} 
                        size={isMobile ? 90 : 100}
                        onClick={() => setViewingTool(item.toolType)}
                      />
                    </div>

                    {/* Field note card (right side) - smaller, card-sized */}
                    {toolNotes[item.id] && (
                      <div 
                        onClick={() => setViewingNote(item.id)}
                        style={{ 
                          position: 'relative', 
                          zIndex: 1, 
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <FieldNoteCard
                          briefText={toolNotes[item.id].brief}
                          detailedText={toolNotes[item.id].detailed}
                          position="right"
                          onClick={() => setViewingNote(item.id)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Supplies section */}
            <div style={{ position: 'relative', zIndex: 1 }}>
              <div
                style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '11px' : '12px',
                  color: 'rgba(200,200,200,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                  textShadow: '0 -1px 1px rgba(255,255,255,0.15), 0 1px 2px rgba(0,0,0,0.9)',
                }}
              >
                SUPPLIES
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
                  gap: isMobile ? '20px' : '20px',
                  justifyItems: 'center',
                }}
              >
                {/* Film Counter */}
                <div style={{ 
                  // Enhanced foam color gradient - charcoal gray EVA foam
                  background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
                  // Adjusted tool spacing to 10px padding
                  padding: '10px',
                  borderRadius: '8px',
                  // Darker foam edges (2px border, #1a1a1a)
                  border: '2px solid #1a1a1a',
                  // Multi-layer deep inset shadows for realistic depth
                  boxShadow: 
                    'inset 0 6px 16px rgba(0,0,0,0.95), ' +
                    'inset 0 -3px 8px rgba(0,0,0,0.9), ' +
                    'inset 0 0 20px rgba(0,0,0,0.85)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '100%' : 'auto',
                  minHeight: isMobile ? '110px' : 'auto',
                }}>
                  {/* Enhanced EVA foam texture with grain pattern */}
                  <div
                    style={{
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
                    }}
                  />
                  <MechanicalFilmCounter count={supplies.film} />
                </div>

                {/* Boosts Gauge */}
                <div style={{ 
                  // Enhanced foam color gradient - charcoal gray EVA foam
                  background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
                  // Adjusted tool spacing to 10px padding
                  padding: '10px',
                  borderRadius: '8px',
                  // Darker foam edges (2px border, #1a1a1a)
                  border: '2px solid #1a1a1a',
                  // Multi-layer deep inset shadows for realistic depth
                  boxShadow: 
                    'inset 0 6px 16px rgba(0,0,0,0.95), ' +
                    'inset 0 -3px 8px rgba(0,0,0,0.9), ' +
                    'inset 0 0 20px rgba(0,0,0,0.85)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '100%' : 'auto',
                  minHeight: isMobile ? '110px' : 'auto',
                }}>
                  {/* Enhanced EVA foam texture with grain pattern */}
                  <div
                    style={{
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
                    }}
                  />
                  <LEDBoostGauge count={supplies.boosts} max={99} />
                </div>

                {/* Charms Indicator */}
                <div style={{ 
                  // Enhanced foam color gradient - charcoal gray EVA foam
                  background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 50%, #1a1a1a 100%)',
                  // Adjusted tool spacing to 10px padding
                  padding: '10px',
                  borderRadius: '8px',
                  // Darker foam edges (2px border, #1a1a1a)
                  border: '2px solid #1a1a1a',
                  // Multi-layer deep inset shadows for realistic depth
                  boxShadow: 
                    'inset 0 6px 16px rgba(0,0,0,0.95), ' +
                    'inset 0 -3px 8px rgba(0,0,0,0.9), ' +
                    'inset 0 0 20px rgba(0,0,0,0.85)',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: isMobile ? '100%' : 'auto',
                  minHeight: isMobile ? '110px' : 'auto',
                }}>
                  {/* Enhanced EVA foam texture with grain pattern */}
                  <div
                    style={{
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
                    }}
                  />
                  <AnalogCharmsIndicator count={supplies.charms} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Tool Viewer Modal - Analog Horror Styling */}
      {viewingTool && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            background: '#0a0a0a',
            transition: 'opacity 0.3s ease-in-out',
            opacity: 1,
          }}
        >
          {/* Enhanced Close Button - Physical Aesthetic */}
          <button
            onClick={() => setViewingTool(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 10001,
              width: '50px',
              height: '50px',
              padding: '0',
              // Heavy metal button with red warning color
              background: 'linear-gradient(135deg, #8b0000 0%, #6b0000 50%, #4a0000 100%)',
              border: '3px solid #2a0000',
              borderTop: '2px solid rgba(255,100,100,0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '24px',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              // Physical depth shadows
              boxShadow: 
                '0 6px 16px rgba(0, 0, 0, 0.9), ' +
                '0 3px 8px rgba(0, 0, 0, 0.7), ' +
                'inset 0 2px 4px rgba(0,0,0,0.6), ' +
                'inset 0 -1px 2px rgba(255,100,100,0.2)',
              color: '#ffffff',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
              transition: 'all 0.15s ease-out',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = 'scale(0.95)';
              e.currentTarget.style.boxShadow = 
                '0 3px 8px rgba(0, 0, 0, 0.9), ' +
                'inset 0 3px 6px rgba(0,0,0,0.8)';
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 
                '0 6px 16px rgba(0, 0, 0, 0.9), ' +
                '0 3px 8px rgba(0, 0, 0, 0.7), ' +
                'inset 0 2px 4px rgba(0,0,0,0.6), ' +
                'inset 0 -1px 2px rgba(255,100,100,0.2)';
            }}
            title="Close"
          >
            ✕
          </button>

          {/* Tool Component with smooth transition */}
          <div style={{ 
            width: '100%', 
            height: '100%',
            transition: 'opacity 0.2s ease-in',
            opacity: 1,
          }}>
            {viewingTool === 'radar' && <RadarTool mode="view" />}
            {viewingTool === 'emf' && <EMFTool mode="view" />}
            {viewingTool === 'thermal' && <ThermalTool mode="view" />}
            {viewingTool === 'audio' && <SpiritBoxTool mode="view" />}
            {viewingTool === 'camera' && <CameraTool mode="view" />}
          </div>
        </div>
      )}

      {/* Detailed Note Modal */}
      {viewingNote && toolNotes[viewingNote] && (
        <DetailedNoteModal
          title={toolNotes[viewingNote].title}
          detailedText={toolNotes[viewingNote].detailed}
          onClose={() => setViewingNote(null)}
        />
      )}
    </div>
  );
}
