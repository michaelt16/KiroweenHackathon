import React from 'react';
import woodTexture from '../../../assets/texture/woodtexture.png';
import dust from '../../../assets/texture/dust.png';

interface WoodenShelfProps {
  top: string;
  children: React.ReactNode;
}

export const WoodenShelf: React.FC<WoodenShelfProps> = ({ top, children }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top,
        left: '2%',
        right: '2%',
        height: 'min(120px, 25vh)',
        background: `
          linear-gradient(180deg, #5a4228 0%, #3a2818 100%),
          url(${woodTexture})
        `,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'overlay',
        borderRadius: '4px',
        boxShadow: 
          'inset 0 4px 8px rgba(0,0,0,0.6), ' +
          '0 8px 16px rgba(0,0,0,0.4), ' +
          'inset -2px 0 4px rgba(0,0,0,0.3), ' +
          'inset 2px 0 4px rgba(0,0,0,0.3)',
        border: '4px solid #2a1808',
        borderLeftWidth: '6px',
        borderRightWidth: '6px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 min(20px, 4vw)',
        gap: 'min(8px, 2vw)',
        minHeight: '100px',
      }}
    >
      {/* Dust overlay on shelf for analog horror */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.3,
          pointerEvents: 'none',
          borderRadius: '4px',
        }}
      />
      {children}
    </div>
  );
};

