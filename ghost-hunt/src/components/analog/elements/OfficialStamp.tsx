import { getDamageVariant } from '../utils/randomization';

interface OfficialStampProps {
  text: string;
  color?: 'red' | 'black';
  rotation?: number;
  opacity?: number;
  seed?: string | number;
}

export function OfficialStamp({ 
  text, 
  color = 'red', 
  rotation,
  opacity = 0.7,
  seed = Date.now() 
}: OfficialStampProps) {
  const rotations = [10, 12, 15, 18, 20, -10, -12, -15];
  const finalRotation = rotation ?? rotations[getDamageVariant(seed, rotations.length)];

  const colors = {
    red: '#8b0000',
    black: '#1a0f0a',
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '40px',
      transform: `rotate(${finalRotation}deg)`,
      border: `4px solid ${colors[color]}`,
      padding: '8px 16px',
      fontFamily: 'Impact, sans-serif',
      fontSize: '24px',
      color: colors[color],
      letterSpacing: '3px',
      opacity,
      textTransform: 'uppercase',
      fontWeight: 'bold',
    }}>
      {text}
    </div>
  );
}
