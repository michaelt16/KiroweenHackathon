// Back to Map Button - Analog Horror Style
import { useNavigate } from 'react-router-dom';
import wrinkledPaper from '../../../assets/texture/wrinkledpaper.png';
import dust from '../../../assets/texture/dust.png';

interface BackToMapButtonProps {
  style?: React.CSSProperties;
}

/**
 * BackToMapButton Component - Analog horror styled navigation button
 * Purpose: Navigate back to map with aged paper aesthetic
 */
export function BackToMapButton({ style }: BackToMapButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/')}
      style={{
        background: '#d8d4c8', // Aged paper
        border: '2px solid #1a0f0a',
        borderRadius: '4px',
        padding: '10px 20px',
        fontFamily: '"Courier New", monospace',
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#1a0f0a',
        cursor: 'pointer',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        transform: 'rotate(-0.5deg)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'rotate(0.2deg) scale(1.05)';
        e.currentTarget.style.borderColor = '#8b0000';
        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.6), 0 3px 8px rgba(0,0,0,0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'rotate(-0.5deg) scale(1)';
        e.currentTarget.style.borderColor = '#1a0f0a';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.5), 0 2px 6px rgba(0,0,0,0.3)';
      }}
    >
      {/* Aged paper texture */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${wrinkledPaper})`,
        backgroundSize: 'cover',
        mixBlendMode: 'multiply',
        opacity: 0.3,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `url(${dust})`,
        backgroundSize: 'cover',
        mixBlendMode: 'overlay',
        opacity: 0.2,
        pointerEvents: 'none',
      }} />
      <span style={{ position: 'relative', zIndex: 1 }}>
        ← BACK TO MAP
      </span>
    </button>
  );
}

