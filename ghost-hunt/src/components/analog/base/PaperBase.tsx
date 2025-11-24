import wrinkledpaper from '../../../assets/texture/wrinkledpaper.png';
import dust from '../../../assets/texture/dust.png';
import { getDamageVariant } from '../utils/randomization';

interface PaperBaseProps {
  children: React.ReactNode;
  variant?: 'aged' | 'clean' | 'damaged';
  seed?: string | number;
}

export function PaperBase({ children, variant = 'aged', seed = Date.now() }: PaperBaseProps) {
  const colors = {
    aged: '#d8d4c8',
    clean: '#f4f0e6',
    damaged: '#c4b49a',
  };

  const rotations = [0.3, 0.5, 0.8, -0.3, -0.5, -0.8];
  const rotation = rotations[getDamageVariant(seed, rotations.length)];

  return (
    <div style={{
      position: 'relative',
      background: colors[variant],
      padding: window.innerWidth < 768 ? '30px 20px' : '45px',
      borderRadius: '4px',
      transform: `rotate(${rotation}deg)`,
      boxShadow: '0 8px 24px rgba(0,0,0,0.6), 0 2px 6px rgba(0,0,0,0.4)',
      maxHeight: window.innerWidth < 768 ? 'calc(100vh - 250px)' : 'calc(100vh - 200px)',
      overflowY: 'auto',
      overflowX: 'hidden',
      WebkitOverflowScrolling: 'touch',
    }}>
      {/* Wrinkled texture layer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${wrinkledpaper})`,
        backgroundSize: 'cover',
        mixBlendMode: 'multiply',
        opacity: 0.6,
        pointerEvents: 'none',
      }} />

      {/* Dust overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${dust})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />

      {/* Edge darkening */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.15) 100%)',
        pointerEvents: 'none',
      }} />

      {/* Vertical fold crease */}
      <div style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: '50%',
        width: '2px',
        background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1) 20%, rgba(0,0,0,0.1) 80%, transparent)',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 1,
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        hyphens: 'auto',
      }}>
        {children}
      </div>
    </div>
  );
}
