// Investigation Drawer Mock - Worn Field Bag Container
// This is a visual prototype for iterating on the drawer design
import React, { useState } from 'react';
import { PhysicalToolDevice } from '../components/Equipment/PhysicalToolDevice';
import { MechanicalFilmCounter } from '../components/Equipment/MechanicalFilmCounter';
import { LEDBoostGauge } from '../components/Equipment/LEDBoostGauge';
import { AnalogCharmsIndicator } from '../components/Equipment/AnalogCharmsIndicator';
import { GhostCodex } from '../components/Codex/GhostCodex';
import { GhostCodexContent } from '../components/Codex/GhostCodexContent';
import { FieldJournalsScreen } from '../screens/FieldJournalsScreen';
import { PolaroidPhoto } from '../components/analog/elements/PolaroidPhoto';
import { HandwrittenText } from '../components/analog/elements/HandwrittenText';
import { TypewrittenText } from '../components/analog/elements/TypewrittenText';
import { PaperBase } from '../components/analog/base/PaperBase';
import foamTexture from '../assets/texture/foam.png';
import ghost1Image from '../assets/images/ghost1.png';

export function InvestigationDrawerMock() {
  const [activeTab, setActiveTab] = useState<'tools' | 'photos' | 'evidence' | 'journal' | 'codex'>('tools');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#0a0a0a',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
      position: 'relative',
    }}>
      {/* Background context (investigation screen would be here) */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        fontFamily: '"Courier New", monospace',
        fontSize: '14px',
        color: '#666',
      }}>
        Investigation Screen Background
      </div>

      {/* Toggle button for testing */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '10px 20px',
          background: '#3a3a3a',
          border: '2px solid #1a1a1a',
          color: '#ccc',
          fontFamily: '"Courier New", monospace',
          fontSize: '12px',
          cursor: 'pointer',
          borderRadius: '4px',
        }}
      >
        {isOpen ? 'Close Drawer' : 'Open Drawer'}
      </button>

      {/* Investigation Drawer */}
      <div style={{
        position: 'fixed',
        bottom: isOpen ? 0 : '-60vh',
        left: 0,
        right: 0,
        height: '60vh',
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
            backgroundImage: 'url(/assets/texture/wrinkledpaper.png)', // Using existing texture as placeholder
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
          {[
            { top: '5%', left: '10%', width: '80px', angle: -25 },
            { top: '15%', right: '15%', width: '60px', angle: 35 },
            { bottom: '20%', left: '20%', width: '70px', angle: -15 },
          ].map((scratch, i) => (
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
          {[
            { top: '10%', right: '8%', size: '30px' },
            { bottom: '15%', left: '12%', size: '25px' },
          ].map((spot, i) => (
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
          <div style={{
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
          }} />

          {/* Stitching lines along edges */}
          {[
            { side: 'left', offset: '8px' },
            { side: 'right', offset: '8px' },
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
            {[
              { id: 'tools', label: 'TOOLS' },
              { id: 'photos', label: 'PHOTOS' },
              { id: 'evidence', label: 'EVIDENCE' },
              { id: 'journal', label: 'JOURNAL' },
              { id: 'codex', label: 'CODEX' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
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
                {/* Canvas texture on tab */}
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
                  borderRadius: '6px 6px 0 0',
                }} />
                <span style={{ position: 'relative', zIndex: 1 }}>{tab.label}</span>
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
            {/* TOOLS TAB - Equipment Case Interior */}
            {activeTab === 'tools' && (
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
                      {[
                        { toolType: 'radar' as const, name: 'Radar' },
                        { toolType: 'emf' as const, name: 'EMF Meter' },
                        { toolType: 'thermal' as const, name: 'Thermal' },
                        { toolType: 'audio' as const, name: 'Audio' },
                        { toolType: 'camera' as const, name: 'Camera' },
                      ].map((item) => (
                        <div key={item.toolType} style={{
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
                        }}>
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
                        <MechanicalFilmCounter count={12} />
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
                        <LEDBoostGauge count={3} max={99} />
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
                        <AnalogCharmsIndicator count={5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PHOTOS TAB - Fresh Polaroids on Dark Surface */}
            {activeTab === 'photos' && (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#1a1612',
                padding: '20px',
                overflow: 'auto',
              }}>
                {/* Title - Handwritten on tape */}
                <div style={{
                  textAlign: 'center',
                  marginBottom: '30px',
                  position: 'relative',
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(255, 255, 255, 0.85)',
                    padding: '8px 24px',
                    transform: 'rotate(-1deg)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
                  }}>
                    <HandwrittenText urgency="calm" fontSize="18px" color="#1a0f0a">
                      Evidence Photos - Just Taken
                    </HandwrittenText>
                  </div>
                </div>
                
                {/* Polaroids scattered on dark surface */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '32px',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  maxWidth: '800px',
                  margin: '0 auto',
                }}>
                  {[1, 2, 3].map((i) => (
                    <div key={i} style={{ 
                      position: 'relative',
                      transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)`,
                    }}>
                      <PolaroidPhoto
                        src={ghost1Image}
                        caption={`23:${15 + i * 5}`}
                        damage="light"
                        seed={`photo-${i}`}
                      />
                    </div>
                  ))}
                </div>

                {/* Photo count - handwritten on tape */}
                <div style={{
                  textAlign: 'center',
                  marginTop: '40px',
                }}>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(255, 255, 255, 0.75)',
                    padding: '6px 20px',
                    transform: 'rotate(1.5deg)',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                  }}>
                    <HandwrittenText urgency="calm" fontSize="14px" color="#1a0f0a">
                      3 photos captured
                    </HandwrittenText>
                  </div>
                </div>
              </div>
            )}

            {/* EVIDENCE TAB - Field Notepad/Clipboard */}
            {activeTab === 'evidence' && (
              <div style={{
                width: '100%',
                height: '100%',
                background: '#1a1612',
                padding: '20px',
                overflow: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
                {/* Clipboard/Notepad */}
                <div style={{
                  maxWidth: '500px',
                  width: '100%',
                  background: '#f4f0e6',
                  padding: '30px 25px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                  transform: 'rotate(-0.5deg)',
                  position: 'relative',
                  borderRadius: '4px',
                }}>
                  {/* Clipboard clip at top */}
                  <div style={{
                    position: 'absolute',
                    top: '-15px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '30px',
                    background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
                    borderRadius: '8px 8px 0 0',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    border: '2px solid #1a1a1a',
                  }} />

                  {/* Title - Handwritten */}
                  <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                    <HandwrittenText urgency="urgent" fontSize="24px" color="#1a0f0a">
                      Evidence Checklist
                    </HandwrittenText>
                  </div>

                  {/* Evidence Collected - Handwritten checklist */}
                  <div style={{ marginBottom: '32px' }}>
                    <HandwrittenText urgency="calm" fontSize="16px" color="#1a0f0a" style={{ marginBottom: '16px', textDecoration: 'underline' }}>
                      Evidence Found:
                    </HandwrittenText>
                    {[
                      { name: 'EMF Level 5', checked: true },
                      { name: 'Freezing Temps', checked: true },
                      { name: 'Spirit Box Response', checked: false },
                      { name: 'Ghost Orbs', checked: false },
                      { name: 'Ghost Writing', checked: false },
                      { name: 'Fingerprints', checked: false },
                    ].map((evidence, i) => (
                      <HandwrittenText
                        key={i}
                        urgency="calm"
                        fontSize="18px"
                        color={evidence.checked ? '#1a0f0a' : '#999'}
                        style={{ 
                          marginBottom: '10px', 
                          paddingLeft: '10px',
                          textDecoration: evidence.checked ? 'none' : 'none',
                        }}
                      >
                        {evidence.checked ? '✓' : '○'} {evidence.name}
                      </HandwrittenText>
                    ))}
                  </div>

                  {/* Possible Ghosts - Circled with red marker */}
                  <div style={{
                    background: 'rgba(255, 255, 0, 0.15)',
                    padding: '20px',
                    border: '3px solid rgba(255, 200, 0, 0.6)',
                    marginBottom: '24px',
                    transform: 'rotate(1deg)',
                    position: 'relative',
                  }}>
                    <HandwrittenText urgency="urgent" fontSize="18px" color="#8b0000" style={{ marginBottom: '16px', textDecoration: 'underline' }}>
                      Suspects:
                    </HandwrittenText>
                    {[
                      { name: 'WRAITH', confidence: 'High' },
                      { name: 'BANSHEE', confidence: 'Medium' },
                      { name: 'DEMON', confidence: 'Low' },
                    ].map((ghost, i) => (
                      <HandwrittenText
                        key={i}
                        urgency="urgent"
                        fontSize="20px"
                        color={i === 0 ? '#cc0000' : '#8b0000'}
                        style={{ 
                          marginBottom: '10px', 
                          paddingLeft: '10px',
                          fontWeight: i === 0 ? 'bold' : 'normal',
                        }}
                      >
                        {i === 0 ? '⭕' : '○'} {ghost.name} - {ghost.confidence}
                      </HandwrittenText>
                    ))}
                  </div>

                  {/* Identify Button - Handwritten style */}
                  <button style={{
                    width: '100%',
                    padding: '16px',
                    background: '#8b0000',
                    border: '3px solid #4a0000',
                    borderRadius: '6px',
                    fontFamily: '"Caveat", cursive',
                    fontSize: '22px',
                    fontWeight: 'bold',
                    color: '#fff',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(139,0,0,0.6)',
                    transform: 'rotate(-0.5deg)',
                  }}>
                    Make Identification
                  </button>
                </div>
              </div>
            )}

            {/* JOURNAL TAB - Field Journals (ACTUAL COMPONENT) */}
            {activeTab === 'journal' && (
              <div style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
              }}>
                <FieldJournalsScreen />
              </div>
            )}

            {/* CODEX TAB - Ghost Encyclopedia (FOLDER CONTENT ONLY - NO WOOD TABLE) */}
            {activeTab === 'codex' && (
              <div style={{
                width: '100%',
                height: '100%',
                overflow: 'auto',
              }}>
                <GhostCodexContent />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
