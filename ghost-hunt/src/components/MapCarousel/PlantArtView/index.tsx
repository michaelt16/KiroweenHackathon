import React from 'react';
import corkTexture from '../../../assets/texture/corkboardtexture.png';
import coffeeStain from '../../../assets/texture/coffeestain.png';
import dust from '../../../assets/texture/dust.png';
import WraithImage from '../../../assets/images/ghosts/Wraith.png';
import ShadeImage from '../../../assets/images/ghosts/Shade.png';
import PoltergeistImage from '../../../assets/images/ghosts/Poltergeist.png';
import { RedStringConnection } from '../CorkBoard/RedStringConnection';

// Detective's plan board - spread out photos with strings connecting them
// Less photos, more spread out across screen
const PREVIEW_POLAROIDS = [
  // Spread out across screen - not clustered
  { id: 'p1', x: '8%', y: '20%', rotation: -12 },
  { id: 'p2', x: '25%', y: '35%', rotation: 8 },
  { id: 'p3', x: '50%', y: '25%', rotation: -5 },
  { id: 'p4', x: '75%', y: '30%', rotation: 6 },
  { id: 'p5', x: '15%', y: '55%', rotation: -10 },
  { id: 'p6', x: '60%', y: '50%', rotation: 4 },
  { id: 'p7', x: '85%', y: '60%', rotation: -8 },
  { id: 'p8', x: '35%', y: '70%', rotation: 7 },
];

const PREVIEW_STRINGS = [
  // Strings connecting photos to each other - investigation web
  // Main chain connections
  { from: 'p1', to: 'p2' },
  { from: 'p2', to: 'p3' },
  { from: 'p3', to: 'p4' },
  // Branch connections
  { from: 'p2', to: 'p5' },
  { from: 'p3', to: 'p6' },
  { from: 'p4', to: 'p7' },
  { from: 'p5', to: 'p8' },
  { from: 'p6', to: 'p8' },
  // Cross-connections - detective's theory lines (connecting different areas)
  { from: 'p1', to: 'p5' },
  { from: 'p1', to: 'p6' },
  { from: 'p2', to: 'p6' },
  { from: 'p3', to: 'p7' },
  { from: 'p4', to: 'p8' },
  { from: 'p5', to: 'p7' },
  { from: 'p6', to: 'p7' },
];

const PREVIEW_PIN_HOLES = [
  // Pin holes around polaroids - spread out
  { id: 'h1', x: '6%', y: '18%' },
  { id: 'h2', x: '23%', y: '33%' },
  { id: 'h3', x: '48%', y: '23%' },
  { id: 'h4', x: '73%', y: '28%' },
  { id: 'h5', x: '13%', y: '53%' },
  { id: 'h6', x: '58%', y: '48%' },
  { id: 'h7', x: '83%', y: '58%' },
  { id: 'h8', x: '33%', y: '68%' },
  // Additional scattered holes
  { id: 'h9', x: '40%', y: '15%' },
  { id: 'h10', x: '65%', y: '40%' },
  { id: 'h11', x: '20%', y: '45%' },
  { id: 'h12', x: '90%', y: '45%' },
];

const PREVIEW_STICKY_NOTES = [
  { id: 'n1', x: '12%', y: '15%', rotation: -12, color: 'yellow', size: 'small' },
  { id: 'n2', x: '42%', y: '18%', rotation: 8, color: 'pink', size: 'small' },
  { id: 'n3', x: '78%', y: '22%', rotation: -5, color: 'yellow', size: 'medium' },
  { id: 'n4', x: '18%', y: '42%', rotation: 6, color: 'blue', size: 'small' },
  { id: 'n5', x: '68%', y: '45%', rotation: -8, color: 'yellow', size: 'medium' },
  { id: 'n6', x: '30%', y: '62%', rotation: 4, color: 'pink', size: 'small' },
  { id: 'n7', x: '88%', y: '55%', rotation: -6, color: 'blue', size: 'small' },
];

const PREVIEW_TAPE_MARKS = [
  { id: 't1', x: '10%', y: '12%', rotation: 18, width: 'min(50px, 6vw)', height: 'min(10px, 1.2vw)' },
  { id: 't2', x: '55%', y: '15%', rotation: -25, width: 'min(45px, 5.5vw)', height: 'min(10px, 1.2vw)' },
  { id: 't3', x: '82%', y: '20%', rotation: 12, width: 'min(55px, 6.5vw)', height: 'min(10px, 1.2vw)' },
  { id: 't4', x: '22%', y: '38%', rotation: -15, width: 'min(48px, 5.8vw)', height: 'min(10px, 1.2vw)' },
  { id: 't5', x: '72%', y: '42%', rotation: 20, width: 'min(42px, 5.2vw)', height: 'min(10px, 1.2vw)' },
  { id: 't6', x: '38%', y: '65%', rotation: -10, width: 'min(46px, 5.6vw)', height: 'min(10px, 1.2vw)' },
];

export function PlantArtView() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: `
          url(${corkTexture}),
          linear-gradient(135deg, #8B6F47 0%, #6B5230 50%, #5A4228 100%)
        `,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply, normal',
        position: 'relative',
        overflow: 'hidden',
        // Make it feel like looking at part of a larger board - crop to show partial view
        clipPath: 'inset(0% 0% 0% 0%)',
      }}
    >
      {/* Cork texture overlay - matches cork board */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${corkTexture})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />
      
      {/* Cork board vignette */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Coffee stain overlays */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '10%',
          width: 'min(180px, 25vw)',
          height: 'min(180px, 25vw)',
          backgroundImage: `url(${coffeeStain})`,
          backgroundSize: 'cover',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          width: 'min(200px, 28vw)',
          height: 'min(200px, 28vw)',
          backgroundImage: `url(${coffeeStain})`,
          backgroundSize: 'cover',
          opacity: 0.35,
          transform: 'rotate(45deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Scattered pin holes */}
      {PREVIEW_PIN_HOLES.map((hole) => (
        <div
          key={hole.id}
          style={{
            position: 'absolute',
            left: hole.x,
            top: hole.y,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Red string connections - connecting photos to each other */}
      <RedStringConnection 
        connections={[
          ...PREVIEW_STRINGS.map(s => ({
            from: s.from,
            to: s.to,
            color: '#dc2626',
            thickness: 2.5, // Thicker for better visibility
          })),
          // Connection strings that extend to right edge - visually connects to main board
          { from: 'p4', to: 'connection-right-1', color: '#dc2626', thickness: 2.5 },
          { from: 'p7', to: 'connection-right-2', color: '#dc2626', thickness: 2.5 },
        ]} 
        polaroids={[
          ...PREVIEW_POLAROIDS.map(p => ({
            id: p.id,
            position: { x: p.x, y: p.y },
            rotation: 0,
            imageUrl: '',
            caption: '',
            pinColor: 'red' as const,
            result: 'success' as const,
            ghostType: '',
            location: '',
            date: '',
            reward: 0,
            xp: 0,
          })),
          // Dummy polaroids at right edge to create connection strings
          {
            id: 'connection-right-1',
            position: { x: '100%', y: '28%' },
            rotation: 0,
            imageUrl: '',
            caption: '',
            pinColor: 'red' as const,
            result: 'success' as const,
            ghostType: '',
            location: '',
            date: '',
            reward: 0,
            xp: 0,
          },
          {
            id: 'connection-right-2',
            position: { x: '100%', y: '45%' },
            rotation: 0,
            imageUrl: '',
            caption: '',
            pinColor: 'red' as const,
            result: 'success' as const,
            ghostType: '',
            location: '',
            date: '',
            reward: 0,
            xp: 0,
          },
        ]}
      />

      {/* Tape residue marks */}
      {PREVIEW_TAPE_MARKS.map((mark) => (
        <div
          key={mark.id}
          style={{
            position: 'absolute',
            left: mark.x,
            top: mark.y,
            width: mark.width,
            height: mark.height,
            background: 'rgba(255,255,200,0.25)',
            transform: `translate(-50%, -50%) rotate(${mark.rotation}deg)`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Preview Polaroids - fuller detective board preview */}
      {PREVIEW_POLAROIDS.map((polaroid, index) => {
        const images = [WraithImage, ShadeImage, PoltergeistImage, WraithImage, ShadeImage];
        
        return (
          <div
            key={polaroid.id}
            style={{
              position: 'absolute',
              left: polaroid.x,
              top: polaroid.y,
              transform: `translate(-50%, -50%) rotate(${polaroid.rotation}deg)`,
              pointerEvents: 'none',
              zIndex: 5,
            }}
          >
            {/* Polaroid frame - same size as cork board */}
            <div style={{
              background: '#e8e4dc',
              padding: 'min(12px, 3vw) min(12px, 3vw) min(45px, 11vw) min(12px, 3vw)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
              width: 'min(140px, 35vw)',
            }}>
              {/* Photo content */}
              <div style={{
                width: '100%',
                height: 'min(110px, 28vw)',
                background: '#1a1a1a',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img 
                  src={images[index % images.length]} 
                  alt="Ghost"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top', // Position images at top to show heads
                  }}
                />
                
                {/* Static/grain overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${dust})`,
                  mixBlendMode: 'overlay',
                  opacity: 0.84, // medium damage level
                }} />
              </div>
            </div>
          </div>
        );
      })}

      {/* Sticky notes - messy detective board */}
      {PREVIEW_STICKY_NOTES.map((note) => {
        const size = note.size === 'medium' 
          ? { width: 'min(80px, 20vw)', height: 'min(80px, 20vw)' }
          : { width: 'min(60px, 15vw)', height: 'min(60px, 15vw)' };
        
        const colors: Record<string, string> = {
          yellow: '#ffeb3b',
          pink: '#ff4081',
          blue: '#42a5f5',
        };
        
        return (
          <div
            key={note.id}
            style={{
              position: 'absolute',
              left: note.x,
              top: note.y,
              transform: `translate(-50%, -50%) rotate(${note.rotation}deg)`,
              ...size,
              background: colors[note.color] || '#ffeb3b',
              boxShadow: '0 4px 8px rgba(0,0,0,0.4), 0 2px 4px rgba(0,0,0,0.3)',
              pointerEvents: 'none',
              zIndex: 4,
              opacity: 0.9,
            }}
          />
        );
      })}

      {/* Dust/grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
