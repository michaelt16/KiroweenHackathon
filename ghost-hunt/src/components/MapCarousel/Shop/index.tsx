import React from 'react';
import woodTexture from '../../../assets/texture/woodtexture.png';
import wrinkledPaper from '../../../assets/texture/wrinkledpaper.png';
import dust from '../../../assets/texture/dust.png';
import coffeeStain from '../../../assets/texture/coffeestain.png';
import burnhole from '../../../assets/texture/burnhole.png';
import rippedtexture from '../../../assets/texture/rippedtexture.png';
import { StorefrontSign } from './StorefrontSign';
import { WoodenShelf } from './WoodenShelf';
import { ShopItemCard } from './ShopItemCard';
import { ClosedStamp } from './ClosedStamp';
import { MOCK_SHOP_ITEMS, SHOP_CONFIG } from './mockData';

export function ShopView() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: `
          linear-gradient(180deg, #d8d4c8 0%, #c4b49a 100%),
          url(${woodTexture})
        `,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Aged paper texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${wrinkledPaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.3,
          pointerEvents: 'none',
        }}
      />

      {/* Dust/grain overlay for analog horror feel */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.4,
          pointerEvents: 'none',
        }}
      />

      {/* Vignette effect - dark edges */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Coffee stains for aged effect - Mobile optimized */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '12%',
          width: 'min(120px, 18vw)',
          height: 'min(120px, 18vw)',
          backgroundImage: `url(${coffeeStain})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.4,
          transform: 'rotate(20deg)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: 'min(100px, 15vw)',
          height: 'min(100px, 15vw)',
          backgroundImage: `url(${coffeeStain})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.35,
          transform: 'rotate(-35deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Burn hole damage - Mobile optimized */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          left: '8%',
          width: 'min(60px, 10vw)',
          height: 'min(60px, 10vw)',
          backgroundImage: `url(${burnhole})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.5,
          pointerEvents: 'none',
        }}
      />

      {/* Ripped texture damage - Mobile optimized */}
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '8%',
          width: 'min(80px, 12vw)',
          height: 'min(80px, 12vw)',
          backgroundImage: `url(${rippedtexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.3,
          transform: 'rotate(15deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Storefront Sign */}
      <StorefrontSign
        storeName={SHOP_CONFIG.storeName}
        establishedDate={SHOP_CONFIG.establishedDate}
      />

      {/* Top Shelf (Shelf 1) */}
      <WoodenShelf top="min(25%, 140px)">
        {MOCK_SHOP_ITEMS.filter(item => item.shelf === 1)
          .sort((a, b) => a.position - b.position)
          .map(item => (
            <ShopItemCard key={item.id} item={item} />
          ))}
      </WoodenShelf>

      {/* Bottom Shelf (Shelf 2) - Closer to top shelf */}
      <WoodenShelf top="min(32%, calc(100vh - 320px))">
        {MOCK_SHOP_ITEMS.filter(item => item.shelf === 2)
          .sort((a, b) => a.position - b.position)
          .map(item => (
            <ShopItemCard key={item.id} item={item} />
          ))}
      </WoodenShelf>

      {/* Closed Stamp Overlay */}
      <ClosedStamp />
    </div>
  );
}
