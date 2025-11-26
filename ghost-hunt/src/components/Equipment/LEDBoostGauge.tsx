// LEDBoostGauge - Physical LED bar gauge for boost count
// Horizontal LED bar with 5 segments in dark plastic housing

import metalTexture from '../../assets/texture/metalscratchedtexture.png';
import rust from '../../assets/texture/brownrust.png';
import dust from '../../assets/texture/dust.png';
import filmgrain from '../../assets/texture/filmgrain.png';

export interface LEDBoostGaugeProps {
  count: number;
  max?: number; // typically 99
}

export function LEDBoostGauge({ count, max = 99 }: LEDBoostGaugeProps) {
  // Clamp count to valid range (0-max)
  const displayCount = Math.max(0, Math.min(max, count));
  
  // Calculate how many segments should be active (5 segments total)
  // Each segment represents 20% of the max value
  const activeSegments = Math.min(5, Math.ceil((displayCount / max) * 5));
  
  return (
    <div
      style={{
        width: '120px',
        height: '70px',
        position: 'relative',
      }}
    >
      {/* Dark plastic housing container */}
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #2a2a2a 0%, #1f1f1f 30%, #1a1a1a 70%, #0f0f0f 100%)',
          borderRadius: '6px',
          boxShadow: 
            'inset 0 4px 8px rgba(255,255,255,0.04), ' +
            'inset 0 -10px 18px rgba(0,0,0,0.9), ' +
            'inset 5px 0 10px rgba(0,0,0,0.9), ' +
            'inset -5px 0 10px rgba(0,0,0,0.9), ' +
            '0 4px 12px rgba(0,0,0,0.85)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Metal texture overlay (subtle for plastic) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${metalTexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.3,
          pointerEvents: 'none',
          zIndex: 2,
        }} />
        
        {/* Rust overlay (minimal for plastic) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${rust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.2,
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
        
        {/* LED display area (recessed) */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '45px',
          background: '#1a1a1a',
          borderRadius: '4px',
          boxShadow: 
            'inset 0 4px 12px rgba(0,0,0,0.95), ' +
            'inset 0 2px 6px rgba(0,0,0,0.9)',
          border: '1px solid #0a0a0a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
          padding: '0 8px',
          zIndex: 11,
        }}>
          {/* Vignette on LED block */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
            zIndex: 5,
          }} />
          
          {/* 5 LED segments */}
          {[0, 1, 2, 3, 4].map((segmentIndex) => {
            const isActive = segmentIndex < activeSegments;
            
            return (
              <div
                key={`segment-${segmentIndex}`}
                style={{
                  width: '16px',
                  height: '35px',
                  background: isActive 
                    ? 'linear-gradient(to bottom, #2dd4bf, #14b8a6)'
                    : '#1a1a1a',
                  borderRadius: '2px',
                  boxShadow: isActive 
                    ? '0 0 12px rgba(45, 212, 191, 0.9), 0 0 24px rgba(45, 212, 191, 0.4), inset 0 1px 2px rgba(255,255,255,0.2)'
                    : 'none',
                  border: isActive ? 'none' : '1px solid rgba(45, 212, 191, 0.2)',
                  opacity: isActive ? 0.9 + Math.random() * 0.1 : 0.3,
                  transition: 'all 0.1s',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {/* Film grain overlay on active segments */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${filmgrain})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'screen',
                    opacity: 0.3,
                    pointerEvents: 'none',
                  }} />
                )}
                
                {/* Dust overlay on active segments */}
                {isActive && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `url(${dust})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'multiply',
                    opacity: 0.25,
                    pointerEvents: 'none',
                  }} />
                )}
              </div>
            );
          })}
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
        
        {/* Etched label "SCANNER BOOSTS" below display */}
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
          SCANNER BOOSTS
        </div>
      </div>
    </div>
  );
}
