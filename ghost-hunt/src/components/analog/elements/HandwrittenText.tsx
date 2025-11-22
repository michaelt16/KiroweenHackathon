import React from 'react';

interface HandwrittenTextProps {
  children: React.ReactNode;
  urgency?: 'calm' | 'urgent' | 'frantic';
  color?: string;
  fontSize?: string;
  jitter?: boolean;
}

export function HandwrittenText({ 
  children, 
  urgency = 'calm', 
  color,
  fontSize,
  jitter = true 
}: HandwrittenTextProps) {
  const urgencyStyles = {
    calm: {
      fontSize: fontSize || '22px',
      fontWeight: 'normal' as const,
      color: color || '#1a0f0a',
      textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.2)',
      letterSpacing: '0.5px',
    },
    urgent: {
      fontSize: fontSize || '24px',
      fontWeight: 'bold' as const,
      color: color || '#4a0000',
      textShadow: '2px 2px 4px rgba(139,0,0,0.5)',
      letterSpacing: '1px',
    },
    frantic: {
      fontSize: fontSize || '28px',
      fontWeight: 'bold' as const,
      color: color || '#8b0000',
      textShadow: '2.5px 2.5px 5px rgba(139,0,0,0.6)',
      letterSpacing: '2px',
      textTransform: 'uppercase' as const,
    },
  };

  const jitterTransforms = [
    'rotate(-0.5deg) translateX(-0.6px)',
    'rotate(0.6deg) translateX(0.7px)',
    'rotate(-0.7deg) translateX(-0.8px)',
    'rotate(0.4deg) translateX(0.5px)',
    'rotate(-0.3deg) translateX(-0.4px)',
  ];

  const baseStyle = {
    fontFamily: '"Caveat", cursive',
    lineHeight: '1.9',
    marginBottom: '15px',
    ...urgencyStyles[urgency],
  };

  // If children is a string, split into lines for jitter
  if (typeof children === 'string' && jitter) {
    const lines = children.split('\n');
    return (
      <div>
        {lines.map((line, index) => (
          <div
            key={index}
            style={{
              ...baseStyle,
              transform: jitterTransforms[index % jitterTransforms.length],
            }}
          >
            {line}
          </div>
        ))}
      </div>
    );
  }

  // For non-string children or no jitter
  return (
    <div style={{
      ...baseStyle,
      transform: jitter ? jitterTransforms[0] : 'none',
    }}>
      {children}
    </div>
  );
}
