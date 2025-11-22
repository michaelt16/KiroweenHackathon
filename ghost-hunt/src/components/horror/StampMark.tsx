// StampMark - Urgent/classified stamps
import { CSSProperties } from 'react';

interface StampMarkProps {
  text: string;
  color?: 'red' | 'black';
  rotation?: number;
  style?: CSSProperties;
}

export function StampMark({ text, color = 'red', rotation = 15, style = {} }: StampMarkProps) {
  const stampColor = color === 'red' ? '#8b0000' : '#1a1a1a';

  return (
    <div
      style={{
        display: 'inline-block',
        border: `4px solid ${stampColor}`,
        padding: '6px 12px',
        fontFamily: 'Impact, sans-serif',
        fontSize: '18px',
        color: stampColor,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        transform: `rotate(${rotation}deg)`,
        opacity: 0.7,
        ...style,
      }}
    >
      {text}
    </div>
  );
}
