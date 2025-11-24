import coffeestain from '../../../assets/texture/coffeestain.png';
import burnhole from '../../../assets/texture/burnhole.png';
import { getDamageVariant } from '../utils/randomization';
import { coffeeVariants, burnVariants, fingerprintVariants, inkVariants } from '../utils/damageVariants';

interface DamageOverlayProps {
  type: 'coffee' | 'burn' | 'blood' | 'water' | 'fingerprint' | 'ink';
  opacity?: number;
  seed?: string | number;
}

export function DamageOverlay({ type, opacity = 0.4, seed = Date.now() }: DamageOverlayProps) {
  const getVariant = () => {
    switch (type) {
      case 'coffee':
        return coffeeVariants[getDamageVariant(seed, coffeeVariants.length)];
      case 'burn':
        return burnVariants[getDamageVariant(seed, burnVariants.length)];
      case 'fingerprint':
        return fingerprintVariants[getDamageVariant(seed, fingerprintVariants.length)];
      case 'ink':
        return inkVariants[getDamageVariant(seed, inkVariants.length)];
      default:
        return coffeeVariants[0];
    }
  };

  const variant = getVariant();

  if (type === 'coffee') {
    const coffeeVariant = variant as typeof coffeeVariants[0];
    return (
      <div style={{
        position: 'absolute',
        top: coffeeVariant.top,
        right: coffeeVariant.right,
        left: coffeeVariant.left,
        bottom: coffeeVariant.bottom,
        width: coffeeVariant.size,
        height: coffeeVariant.size,
        backgroundImage: `url(${coffeestain})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: 'multiply',
        opacity,
        transform: `rotate(${coffeeVariant.rotation}deg)`,
        pointerEvents: 'none',
      }} />
    );
  }

  if (type === 'burn') {
    const burnVariant = variant as typeof burnVariants[0];
    return (
      <div style={{
        position: 'absolute',
        bottom: burnVariant.bottom,
        left: burnVariant.left,
        right: burnVariant.right,
        top: burnVariant.top,
        width: burnVariant.size,
        height: burnVariant.size,
        backgroundImage: `url(${burnhole})`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: 'multiply',
        opacity,
        pointerEvents: 'none',
      }} />
    );
  }

  if (type === 'blood') {
    return (
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '5%',
        right: '5%',
        height: '35%',
        background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.25) 15%, rgba(139,0,0,0.3) 50%, rgba(139,0,0,0.25) 85%, transparent)',
        transform: 'rotate(-1.5deg)',
        opacity,
        pointerEvents: 'none',
      }} />
    );
  }

  if (type === 'water') {
    return (
      <div style={{
        position: 'absolute',
        top: '20%',
        right: '10%',
        width: '150px',
        height: '200px',
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
        transform: 'rotate(5deg)',
        opacity,
        pointerEvents: 'none',
      }} />
    );
  }

  if (type === 'fingerprint') {
    const fingerprintVariant = variant as typeof fingerprintVariants[0];
    return (
      <div style={{
        position: 'absolute',
        top: fingerprintVariant.top,
        right: fingerprintVariant.right,
        left: fingerprintVariant.left,
        bottom: fingerprintVariant.bottom,
        width: fingerprintVariant.width,
        height: fingerprintVariant.height,
        background: 'radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)',
        transform: `rotate(${fingerprintVariant.rotation}deg)`,
        opacity,
        pointerEvents: 'none',
      }} />
    );
  }

  if (type === 'ink') {
    const inkVariant = variant as typeof inkVariants[0];
    return (
      <div style={{
        position: 'absolute',
        bottom: inkVariant.bottom,
        left: inkVariant.left,
        right: inkVariant.right,
        top: inkVariant.top,
        width: inkVariant.size,
        height: inkVariant.size,
        background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
        borderRadius: '50%',
        transform: `rotate(${inkVariant.rotation}deg)`,
        opacity,
        pointerEvents: 'none',
      }} />
    );
  }

  return null;
}
