// MechanicalFilmCounter - Physical rotary tally counter for film count
// Mechanical odometer-style display with metal housing

import metalTexture from '../../assets/texture/metalscratchedtexture.png';
import rust from '../../assets/texture/brownrust.png';
import dust from '../../assets/texture/dust.png';

export interface MechanicalFilmCounterProps {
  count: number;
}

export function MechanicalFilmCounter({ count }: MechanicalFilmCounterProps) {
  // Clamp count to valid range (0-99)
  const displayCount = Math.max(0, Math.min(99, count));
  
  // Format count with leading zero if needed
  const formattedCount = displayCount.toString().padStart(2, '0');
  
  return (
    <div
      style={{
        width: '120px',
        height: '70px',
        position: 'relative',
      }}
    >
      {/* Metal housing container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
          borderRadius: '6px',
          boxShadow: 
            'inset 0 4px 8px rgba(255,255,255,0.06), ' +
            'inset 0 -8px 16px rgba(0,0,0,0.98), ' +
            'inset 3px 0 6px rgba(0,0,0,0.9), ' +
            'inset -3px 0 6px rgba(0,0,0,0.9), ' +
            '0 4px 12px rgba(0,0,0,0.85)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Metal texture overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${metalTexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.6,
          pointerEvents: 'none',
          zIndex: 2,
        }} />
        
        {/* Rust overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${rust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.4,
          pointerEvents: 'none',
          zIndex: 3,
        }} />
        
        {/* Dust layer */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 4,
        }} />
        
        {/* Display window (deeply inset, 80px × 45px) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80px',
          height: '45px',
          background: '#0a0a0a',
          borderRadius: '4px',
          boxShadow: 
            'inset 0 30px 70px rgba(0,0,0,0.99), ' +
            'inset 0 18px 45px rgba(0,0,0,0.98), ' +
            'inset 0 10px 25px rgba(0,0,0,0.97), ' +
            'inset 0 5px 15px rgba(0,0,0,0.95)',
          border: '2px solid #000',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 11,
        }}>
          {/* White glowing digits with 3D effect */}
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#ffffff',
            textShadow: 
              '1px 1px 0 rgba(255,255,255,0.3), ' +
              '2px 2px 0 rgba(0,0,0,0.8), ' +
              '0 0 8px rgba(255,255,255,0.5)',
            letterSpacing: '2px',
            zIndex: 1,
          }}>
            {formattedCount}
          </div>
        </div>
        
        {/* Corner screws (4 screws, 5px diameter) */}
        {[
          { top: '5px', left: '5px' },
          { top: '5px', right: '5px' },
          { bottom: '5px', left: '5px' },
          { bottom: '5px', right: '5px' },
        ].map((screw, i) => (
          <div
            key={`screw-${i}`}
            style={{
              position: 'absolute',
              ...screw,
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
              boxShadow: 
                'inset 0 1px 2px rgba(255,255,255,0.3), ' +
                'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
                '0 1px 2px rgba(0,0,0,0.8)',
              border: '0.5px solid rgba(0,0,0,0.7)',
              zIndex: 10,
            }}
          >
            {/* Screw slot */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '3px',
              height: '0.5px',
              background: '#0a0a0a',
            }} />
          </div>
        ))}
        
        {/* Etched label "FILM ROLLS" below display */}
        <div style={{
          position: 'absolute',
          bottom: '6px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: '"Courier New", monospace',
          fontSize: '9px',
          color: 'rgba(200,200,200,0.5)',
          textShadow: 
            '0 -1px 1px rgba(255,255,255,0.25), ' +
            '0 1px 2px rgba(0,0,0,0.9), ' +
            '1px 1px 3px rgba(0,0,0,0.8)',
          letterSpacing: '0.5px',
          textAlign: 'center',
          pointerEvents: 'none',
          zIndex: 21,
        }}>
          FILM ROLLS
        </div>
      </div>
    </div>
  );
}
