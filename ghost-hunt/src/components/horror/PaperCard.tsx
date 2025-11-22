// PaperCard - Reusable aged paper container with damage
import { CSSProperties, ReactNode } from 'react';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import dust from '../../assets/texture/dust.png';
import coffeestain from '../../assets/texture/coffeestain.png';
import burnhole from '../../assets/texture/burnhole.png';

interface PaperCardProps {
  children: ReactNode;
  damage?: 'light' | 'medium' | 'heavy';
  rotation?: number;
  stains?: boolean;
  burns?: boolean;
  foldCrease?: boolean;
  style?: CSSProperties;
}

export function PaperCard({
  children,
  damage = 'medium',
  rotation = 0,
  stains = false,
  burns = false,
  foldCrease = true,
  style = {},
}: PaperCardProps) {
  const damageOpacity = {
    light: { wrinkle: 0.5, dust: 0.3, vignette: 0.25 },
    medium: { wrinkle: 0.7, dust: 0.4, vignette: 0.35 },
    heavy: { wrinkle: 0.8, dust: 0.5, vignette: 0.45 },
  };

  const opacity = damageOpacity[damage];

  return (
    <div
      style={{
        position: 'relative',
        background: '#c4b49a',
        borderRadius: '4px',
        padding: '24px',
        transform: `rotate(${rotation}deg)`,
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        ...style,
      }}
    >
      {/* Wrinkled paper texture */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: opacity.wrinkle,
          pointerEvents: 'none',
          borderRadius: '4px',
        }}
      />

      {/* Dust/grain overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: opacity.dust,
          pointerEvents: 'none',
        }}
      />

      {/* Water damage vignette */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${opacity.vignette}) 100%)`,
          pointerEvents: 'none',
        }}
      />

      {/* Fold crease */}
      {foldCrease && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '2px',
            background:
              'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.2) 80%, transparent)',
            transform: 'translateX(-50%)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Coffee stain */}
      {stains && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '30px',
            width: '100px',
            height: '100px',
            backgroundImage: `url(${coffeestain})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            opacity: 0.4,
            transform: 'rotate(-25deg)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Burn hole */}
      {burns && (
        <div
          style={{
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            width: '80px',
            height: '80px',
            backgroundImage: `url(${burnhole})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            opacity: 0.8,
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
}
