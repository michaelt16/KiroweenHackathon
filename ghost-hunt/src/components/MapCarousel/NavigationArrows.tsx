interface NavigationArrowsProps {
  currentIndex: number;
  totalViews: number;
  onNavigate: (direction: 'left' | 'right') => void;
  isAnimating: boolean;
}

export function NavigationArrows({
  currentIndex,
  totalViews,
  onNavigate,
  isAnimating,
}: NavigationArrowsProps) {
  const showLeftArrow = currentIndex > 0;
  const showRightArrow = currentIndex < totalViews - 1;

  // Analog horror style - aged paper button with damage
  const arrowStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    width: '60px',
    height: '60px',
    borderRadius: '4px', // Less rounded, more worn
    background: '#d8d4c8', // Aged paper color
    border: '2px solid #1a0f0a', // Dark ink color
    color: '#1a0f0a', // Dark ink
    fontSize: '28px',
    fontFamily: '"Courier New", monospace', // Typewriter font
    fontWeight: 'bold',
    cursor: isAnimating ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.1)', // Deep shadow
    transition: 'all 0.2s ease',
    opacity: isAnimating ? 0.4 : 0.9,
    overflow: 'hidden',
  };

  // Worn/damaged overlay effect
  const damageOverlay: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 30%, rgba(139, 69, 19, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(0, 0, 0, 0.1) 0%, transparent 50%)
    `,
    pointerEvents: 'none',
    mixBlendMode: 'multiply',
  };

  return (
    <>
      {/* Left Arrow */}
      {showLeftArrow && (
        <button
          onClick={() => !isAnimating && onNavigate('left')}
          disabled={isAnimating}
          style={{
            ...arrowStyle,
            left: '20px',
            transform: 'translateY(-50%) rotate(-0.8deg)', // Slight rotation
          }}
          onMouseEnter={(e) => {
            if (!isAnimating) {
              e.currentTarget.style.background = '#c4b49a'; // Darker aged paper
              e.currentTarget.style.transform = 'translateY(-50%) rotate(-0.8deg) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#d8d4c8';
            e.currentTarget.style.transform = 'translateY(-50%) rotate(-0.8deg) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={damageOverlay} />
          <span style={{ position: 'relative', zIndex: 1 }}>◄</span>
        </button>
      )}

      {/* Right Arrow */}
      {showRightArrow && (
        <button
          onClick={() => !isAnimating && onNavigate('right')}
          disabled={isAnimating}
          style={{
            ...arrowStyle,
            right: '20px',
            transform: 'translateY(-50%) rotate(0.7deg)', // Slight rotation (opposite)
          }}
          onMouseEnter={(e) => {
            if (!isAnimating) {
              e.currentTarget.style.background = '#c4b49a'; // Darker aged paper
              e.currentTarget.style.transform = 'translateY(-50%) rotate(0.7deg) scale(1.05)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.9), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#d8d4c8';
            e.currentTarget.style.transform = 'translateY(-50%) rotate(0.7deg) scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.8), inset 0 1px 2px rgba(255, 255, 255, 0.1)';
          }}
        >
          <div style={damageOverlay} />
          <span style={{ position: 'relative', zIndex: 1 }}>►</span>
        </button>
      )}
    </>
  );
}
