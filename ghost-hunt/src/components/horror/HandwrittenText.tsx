// HandwrittenText - Text with jitter and ink bleed
import { CSSProperties, ReactNode } from 'react';

interface HandwrittenTextProps {
  children: ReactNode;
  size?: 'small' | 'medium' | 'large';
  color?: 'black' | 'red' | 'dark';
  jitter?: boolean;
  inkBleed?: boolean;
  bold?: boolean;
  style?: CSSProperties;
}

export function HandwrittenText({
  children,
  size = 'medium',
  color = 'black',
  jitter = true,
  inkBleed = false,
  bold = false,
  style = {},
}: HandwrittenTextProps) {
  const sizes = {
    small: '18px',
    medium: '24px',
    large: '32px',
  };

  const colors = {
    black: '#1a0f0a',
    red: '#8b0000',
    dark: '#0a0a0a',
  };

  const jitterTransform = jitter
    ? `rotate(${Math.random() * 1.4 - 0.7}deg) translateX(${Math.random() * 1.6 - 0.8}px)`
    : 'none';

  const inkBleedShadow = inkBleed
    ? `2px 2px 4px ${color === 'red' ? 'rgba(139,0,0,0.5)' : 'rgba(0,0,0,0.3)'}`
    : 'none';

  return (
    <span
      style={{
        fontFamily: '"Caveat", cursive',
        fontSize: sizes[size],
        color: colors[color],
        fontWeight: bold ? 'bold' : 'normal',
        transform: jitterTransform,
        textShadow: inkBleedShadow,
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
}
