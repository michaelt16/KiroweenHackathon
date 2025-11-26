// AnalogCharmsIndicator - Simple analog indicator on aged paper card
// Displays charm count with hand-drawn tally marks

import wrinkledPaper from '../../assets/texture/wrinkledpaper.png';
import tape from '../../assets/texture/tape.png';

export interface AnalogCharmsIndicatorProps {
  count: number;
}

export function AnalogCharmsIndicator({ count }: AnalogCharmsIndicatorProps) {
  // Clamp count to valid range (0-99)
  const displayCount = Math.max(0, Math.min(99, count));
  
  // Generate tally marks (groups of 5 with diagonal line, then remainder)
  const tallyGroups = Math.floor(displayCount / 5);
  const remainder = displayCount % 5;
  
  // Generate tally mark SVG elements
  const renderTallyMarks = () => {
    const marks: JSX.Element[] = [];
    let xOffset = 0;
    
    // Render groups of 5 (4 vertical lines + 1 diagonal)
    for (let i = 0; i < tallyGroups; i++) {
      marks.push(
        <g key={`group-${i}`} transform={`translate(${xOffset}, 0)`}>
          {/* 4 vertical lines */}
          <line x1="0" y1="0" x2="0" y2="20" stroke="#1a0f0a" strokeWidth="2" />
          <line x1="6" y1="0" x2="6" y2="20" stroke="#1a0f0a" strokeWidth="2" />
          <line x1="12" y1="0" x2="12" y2="20" stroke="#1a0f0a" strokeWidth="2" />
          <line x1="18" y1="0" x2="18" y2="20" stroke="#1a0f0a" strokeWidth="2" />
          {/* Diagonal line crossing through */}
          <line x1="-2" y1="18" x2="20" y2="2" stroke="#1a0f0a" strokeWidth="2.5" />
        </g>
      );
      xOffset += 28;
    }
    
    // Render remainder vertical lines
    for (let i = 0; i < remainder; i++) {
      marks.push(
        <line 
          key={`remainder-${i}`}
          x1={xOffset + (i * 6)} 
          y1="0" 
          x2={xOffset + (i * 6)} 
          y2="20" 
          stroke="#1a0f0a" 
          strokeWidth="2" 
        />
      );
    }
    
    return marks;
  };
  
  return (
    <div
      style={{
        width: '120px',
        height: '70px',
        position: 'relative',
      }}
    >
      {/* Aged paper card background */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#d8d4c8',
          borderRadius: '3px',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 2px 6px rgba(0,0,0,0.4)',
        }}
      >
        {/* Rough torn edges with clipPath */}
        <svg width="0" height="0">
          <defs>
            <clipPath id="torn-edges">
              <path d="
                M 2,0 
                L 5,2 L 8,1 L 12,3 L 15,1 L 20,2 L 25,1 L 30,3 L 35,2 L 40,1 L 45,2 L 50,1 L 55,3 L 60,2 L 65,1 L 70,2 L 75,1 L 80,3 L 85,2 L 90,1 L 95,2 L 100,1 L 105,2 L 110,1 L 115,3 L 118,2 L 120,0
                L 120,68
                L 118,70 L 115,69 L 110,70 L 105,68 L 100,70 L 95,69 L 90,70 L 85,68 L 80,69 L 75,70 L 70,68 L 65,70 L 60,69 L 55,70 L 50,68 L 45,69 L 40,70 L 35,68 L 30,70 L 25,69 L 20,70 L 15,68 L 10,69 L 5,70 L 2,68
                L 0,68
                L 0,2
                Z
              " />
            </clipPath>
          </defs>
        </svg>
        
        <div style={{
          clipPath: 'url(#torn-edges)',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}>
          {/* Paper texture overlay (wrinkled, 0.3 opacity) */}
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
            zIndex: 2,
          }} />
          
          {/* Large number display (Courier New, 36px, bold) */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: '"Courier New", monospace',
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#1a0f0a',
            textAlign: 'center',
            zIndex: 3,
          }}>
            {displayCount}
          </div>
          
          {/* Hand-drawn tally marks below number */}
          <div style={{
            position: 'absolute',
            top: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 3,
          }}>
            <svg 
              width={Math.max(30, tallyGroups * 28 + remainder * 6)} 
              height="22"
              style={{
                display: 'block',
              }}
            >
              {renderTallyMarks()}
            </svg>
          </div>
          
          {/* Handwritten label "CHARMS" (Caveat, 14px) */}
          <div style={{
            position: 'absolute',
            bottom: '4px',
            left: '50%',
            transform: 'translateX(-50%) rotate(-0.5deg)',
            fontFamily: '"Caveat", cursive',
            fontSize: '14px',
            color: '#1a0f0a',
            textAlign: 'center',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)',
            zIndex: 3,
          }}>
            CHARMS
          </div>
        </div>
      </div>
      
      {/* Tape strip at top (50px × 15px, -5deg rotation) */}
      <div style={{
        position: 'absolute',
        top: '-5px',
        left: '50%',
        transform: 'translateX(-50%) rotate(-5deg)',
        width: '50px',
        height: '15px',
        backgroundImage: `url(${tape})`,
        backgroundSize: 'cover',
        opacity: 0.8,
        boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
        zIndex: 10,
      }} />
    </div>
  );
}
