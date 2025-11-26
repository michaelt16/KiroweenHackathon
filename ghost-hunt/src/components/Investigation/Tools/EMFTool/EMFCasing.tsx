import { memo } from 'react';
import dust from '../../../../assets/texture/dust.png';

interface EMFCasingProps {
  emfLevel: number;
}

/**
 * EMFCasing Component
 * 
 * EMF-specific casing details including:
 * - Warning LED (red when level >= 4)
 * - Toggle switch
 * - Calibration screw
 * - Micro-indentations
 * - Calibration label
 * - Battery label
 * - Small printed text
 * - Localized rust around screws
 * 
 * Extracted from EMFMeterMock.tsx
 */
const EMFCasingComponent = ({ emfLevel }: EMFCasingProps) => {
  return (
    <>
      {/* Warning light (red LED indicator) */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '8%',
        width: '10px',
        height: '10px',
        borderRadius: '50%',
        background: emfLevel >= 4 
          ? 'radial-gradient(circle at 30% 30%, #ff0000 0%, #aa0000 50%, #660000 100%)'
          : 'radial-gradient(circle at 30% 30%, #3a1a1a 0%, #1a0a0a 60%, #0a0a0a 100%)',
        boxShadow: emfLevel >= 4
          ? `0 0 8px rgba(255,0,0,0.8), 0 0 16px rgba(255,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2), inset 0 -1px 2px rgba(0,0,0,0.9)`
          : 'inset 0 1px 2px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)',
        border: '1px solid rgba(0,0,0,0.7)',
        pointerEvents: 'none',
        zIndex: 10,
        transition: 'all 0.3s',
      }} />
      
      {/* Fake toggle switch */}
      <div style={{
        position: 'absolute',
        top: '8%',
        right: '12%',
        width: '24px',
        height: '14px',
        borderRadius: '7px',
        background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 50%, #0a0a0a 100%)',
        boxShadow: 
          'inset 0 2px 4px rgba(0,0,0,0.9), ' +
          'inset 0 -1px 2px rgba(255,255,255,0.1), ' +
          '0 2px 4px rgba(0,0,0,0.8)',
        border: '1px solid rgba(0,0,0,0.8)',
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        <div style={{
          position: 'absolute',
          top: '2px',
          left: '2px',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #4a4a4a 0%, #2a2a2a 50%, #0a0a0a 100%)',
          boxShadow: 
            'inset 0 1px 2px rgba(255,255,255,0.15), ' +
            'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
            '0 1px 2px rgba(0,0,0,0.8)',
          transition: 'left 0.2s',
        }} />
      </div>
      
      {/* Calibration screw */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '6%',
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #3a3a3a 0%, #1a1a1a 60%, #0a0a0a 100%)',
        boxShadow: 
          'inset 0 1px 2px rgba(255,255,255,0.1), ' +
          'inset 0 -1px 2px rgba(0,0,0,0.9), ' +
          '0 2px 4px rgba(0,0,0,0.8)',
        border: '1px solid rgba(0,0,0,0.7)',
        pointerEvents: 'none',
        zIndex: 10,
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '6px',
          height: '0.5px',
          background: '#0a0a0a',
        }} />
      </div>
      
      {/* Calibration label */}
      <div style={{
        position: 'absolute',
        top: '7%',
        left: '20%',
        fontFamily: '"Courier New", monospace',
        fontSize: '7px',
        color: 'rgba(150,150,150,0.5)',
        transform: 'rotate(0.2deg)',
        textShadow: '1px 1px 2px rgba(0,0,0,0.9)',
        pointerEvents: 'none',
        zIndex: 21,
      }}>
        CAL
      </div>
      
      {/* Battery label */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '8%',
        fontFamily: '"Courier New", monospace',
        fontSize: '7px',
        color: 'rgba(150,150,150,0.5)',
        transform: 'rotate(0.5deg)',
        textShadow: '1px 1px 2px rgba(0,0,0,0.9)',
        pointerEvents: 'none',
        zIndex: 21,
      }}>
        BAT
      </div>
      
      {/* Small printed text around frame */}
      {[
        { top: '14%', left: '5%', text: '9V', rotation: 0.3 },
        { top: '65%', left: '5%', text: '±0.1V', rotation: -0.2 },
        { bottom: '20%', right: '5%', text: 'DC', rotation: 0.4 },
      ].map((item, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...(item.top ? { top: item.top } : {}),
            ...(item.bottom ? { bottom: item.bottom } : {}),
            ...(item.left ? { left: item.left } : {}),
            ...(item.right ? { right: item.right } : {}),
            fontFamily: '"Courier New", monospace',
            fontSize: '5px',
            color: 'rgba(120,120,120,0.3)',
            transform: `rotate(${item.rotation}deg)`,
            letterSpacing: '0.2px',
            pointerEvents: 'none',
            zIndex: 21,
          }}
        >
          {item.text}
        </div>
      ))}
      
      {/* Micro-indentations (small dents/scratches) */}
      {[
        { top: '18%', left: '7%', size: '3px' },
        { top: '42%', right: '7%', size: '2.5px' },
        { bottom: '22%', left: '7%', size: '3px' },
        { top: '28%', left: '50%', size: '2px', transform: 'translateX(-50%)' },
      ].map((dent, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...(dent.top ? { top: dent.top } : {}),
            ...(dent.bottom ? { bottom: dent.bottom } : {}),
            ...(dent.left ? { left: dent.left } : {}),
            ...(dent.right ? { right: dent.right } : {}),
            ...(dent.transform ? { transform: dent.transform } : {}),
            width: dent.size,
            height: dent.size,
            background: 'radial-gradient(circle at 30% 30%, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)',
            borderRadius: '50%',
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            zIndex: 9,
          }}
        />
      ))}
      
      {/* Localized rust around screws */}
      {[
        { top: '12%', left: '8%', size: '16px' },
        { top: '12%', right: '8%', size: '14px' },
        { bottom: '27%', left: '10%', size: '15px' },
      ].map((rustSpot, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...(rustSpot.top ? { top: rustSpot.top } : {}),
            ...(rustSpot.bottom ? { bottom: rustSpot.bottom } : {}),
            ...(rustSpot.left ? { left: rustSpot.left } : {}),
            ...(rustSpot.right ? { right: rustSpot.right } : {}),
            width: rustSpot.size,
            height: rustSpot.size,
            backgroundImage: `url(${dust})`,  // Using dust as placeholder for rust
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.5,
            borderRadius: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 9,
          }}
        />
      ))}
    </>
  );
};

export const EMFCasing = memo(EMFCasingComponent);
