import React from 'react';
import dust from '../../../assets/texture/dust.png';
import { ShopItem } from './mockData';

interface ShopItemCardProps {
  item: ShopItem;
}

export const ShopItemCard: React.FC<ShopItemCardProps> = ({ item }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'min(6px, 1.5vw)',
        position: 'relative',
        flex: '1 1 0',
        minWidth: 0,
      }}
    >
      {/* Item icon */}
      <div
        style={{
          fontSize: 'clamp(28px, 7vw, 48px)',
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
          lineHeight: 1,
          position: 'relative',
        }}
      >
        {item.icon}
        {/* Subtle dust overlay on icon */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.2,
            pointerEvents: 'none',
          }}
        />
      </div>
      
      {/* Item name - handwritten with slight rotation */}
      <div
        style={{
          fontFamily: '"Caveat", cursive',
          fontSize: 'clamp(12px, 2.5vw, 16px)',
          color: '#1a0f0a',
          textAlign: 'center',
          fontWeight: 'bold',
          transform: 'rotate(-0.5deg)',
          textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
          lineHeight: 1.2,
        }}
      >
        {item.name}
      </div>
      
      {/* Price tag (handwritten style with damage) */}
      <div
        style={{
          background: '#f4f0e6',
          padding: 'min(3px, 1vw) min(10px, 2.5vw)',
          borderRadius: '2px',
          transform: 'rotate(-3deg)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          position: 'relative',
        }}
      >
        {/* Dust overlay on price tag */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.15,
            borderRadius: '2px',
            pointerEvents: 'none',
          }}
        />
        <div
          style={{
            fontFamily: '"Caveat", cursive',
            fontSize: 'clamp(14px, 3vw, 18px)',
            color: '#4a0000',
            fontWeight: 'bold',
            position: 'relative',
            zIndex: 1,
            whiteSpace: 'nowrap',
          }}
        >
          ${item.price}
        </div>
      </div>
    </div>
  );
};

