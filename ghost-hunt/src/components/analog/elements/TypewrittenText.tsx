import React from 'react';

interface TypewrittenTextProps {
  children: React.ReactNode;
  variant?: 'standard' | 'faded' | 'carbon';
  fontSize?: string;
  fontWeight?: 'normal' | 'bold';
  color?: string;
}

export function TypewrittenText({ 
  children, 
  variant = 'standard',
  fontSize = '14px',
  fontWeight = 'normal',
  color
}: TypewrittenTextProps) {
  const variantStyles = {
    standard: {
      color: color || '#1a0f0a',
      opacity: 1,
    },
    faded: {
      color: color || '#4a4a4a',
      opacity: 0.8,
    },
    carbon: {
      color: color || '#0a0a0a',
      opacity: 1,
      fontWeight: 'bold' as const,
    },
  };

  return (
    <div style={{
      fontFamily: '"Courier New", monospace',
      fontSize,
      fontWeight,
      lineHeight: '1.6',
      letterSpacing: '0.5px',
      marginBottom: '15px',
      ...variantStyles[variant],
    }}>
      {children}
    </div>
  );
}
