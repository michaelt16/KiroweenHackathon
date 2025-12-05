/**
 * SpiritBoxCasing Component
 * 
 * Spirit Box-specific casing details including:
 * - Physical knobs (tune, volume)
 * - Bent antenna
 * - Radio-style body architecture
 * 
 * Extracted from SpiritBoxMock.tsx
 */

import { memo } from 'react';
import type { SpiritBoxCasingProps } from './types';
import metalTexture from '../../../../assets/texture/metalscratchedtexture.png';

const SpiritBoxCasingComponent = ({
  knobA = 0.5,
  knobB = 0.5,
  onKnobAChange,
  onKnobBChange,
  mode = 'view',
}: SpiritBoxCasingProps) => {
  // Unified handler for both mouse and touch events
  const createKnobHandler = (knobType: 'A' | 'B') => {
    let isDragging = false;
    let knobContainer: HTMLElement | null = null;
    
    const handleKnobInteraction = (
      clientX: number,
      clientY: number,
      containerElement: HTMLElement
    ) => {
      if (mode !== 'investigation' || !onKnobAChange || !onKnobBChange) return;
      
      // Use the knob container's center for calculation (larger touch area)
      const rect = containerElement.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate angle from center
      const angle = Math.atan2(clientY - centerY, clientX - centerX);
      // Convert to 0-360 degrees, then to 0-1 range
      // 0° (right) = 0.0, 90° (down) = 0.25, 180° (left) = 0.5, 270° (up) = 0.75
      let normalizedValue = ((angle + Math.PI / 2) / (2 * Math.PI)) % 1;
      if (normalizedValue < 0) normalizedValue += 1;
      
      if (knobType === 'A') {
        onKnobAChange(normalizedValue);
      } else {
        onKnobBChange(normalizedValue);
      }
    };
    
    const startDrag = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (mode !== 'investigation') return;
      
      // Only preventDefault for mouse events (touch events are handled by touchAction: 'none' and passive: false listeners)
      if (!('touches' in e)) {
        e.preventDefault();
      }
      e.stopPropagation();
      
      isDragging = true;
      knobContainer = e.currentTarget;
      
      // Get initial coordinates
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      
      // Add visual feedback
      if (knobContainer) {
        knobContainer.style.transform = 'scale(1.1)';
        knobContainer.style.transition = 'transform 0.1s';
      }
      
      // Mouse handlers
      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!isDragging || !knobContainer) return;
        handleKnobInteraction(moveEvent.clientX, moveEvent.clientY, knobContainer);
      };
      
      const handleMouseUp = () => {
        isDragging = false;
        if (knobContainer) {
          knobContainer.style.transform = 'scale(1)';
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      // Touch handlers
      const handleTouchMove = (moveEvent: TouchEvent) => {
        if (!isDragging || !knobContainer) return;
        moveEvent.preventDefault(); // Prevent scrolling
        const touch = moveEvent.touches[0];
        handleKnobInteraction(touch.clientX, touch.clientY, knobContainer);
      };
      
      const handleTouchEnd = () => {
        isDragging = false;
        if (knobContainer) {
          knobContainer.style.transform = 'scale(1)';
        }
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      // Add both mouse and touch listeners
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
      
      // Initial interaction
      handleKnobInteraction(clientX, clientY, knobContainer);
    };
    
    return startDrag;
  };
  
  const handleKnobAStart = createKnobHandler('A');
  const handleKnobBStart = createKnobHandler('B');
  
  // Calculate rotation angle for knob indicator (0-360 degrees)
  // knobA/knobB is 0.0-1.0, convert to degrees
  const knobARotation = knobA * 360; // 0.0 = 0°, 0.5 = 180°, 1.0 = 360°
  const knobBRotation = knobB * 360;
  return (
    <>
      {/* Physical knobs - Below frequency display */}
      <div style={{
        position: 'absolute',
        top: '68%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '40px',
        justifyContent: 'center',
        zIndex: 15,
      }}>
        {/* Frequency knob (TUNE - Knob A) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}>
          {/* Expanded touch area for mobile - invisible but interactive */}
          <div
            onMouseDown={handleKnobAStart}
            onTouchStart={handleKnobAStart}
            style={{
              width: '80px', // Larger touch area (60px knob + 20px padding)
              height: '80px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: mode === 'investigation' ? 'grab' : 'default',
              userSelect: 'none',
              touchAction: 'none', // Prevent default touch behaviors
              WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
            }}>
            <div 
              style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
            border: '4px solid rgba(0,0,0,0.8)',
            boxShadow: 
              'inset 0 3px 6px rgba(255,255,255,0.2), ' +
              'inset 0 -3px 6px rgba(0,0,0,0.9), ' +
              '0 6px 16px rgba(0,0,0,0.9)',
            position: 'relative',
                pointerEvents: 'none', // Let parent handle events
          }}>
              {/* Knob indicator (rotates based on knobA value) */}
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: `translateX(-50%) rotate(${knobARotation}deg)`,
              transformOrigin: '50% 24px', // Rotate around center of knob: indicator top (6px) + distance to knob center (24px) = 30px
              width: '4px',
              height: '18px',
              background: '#ff6600',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(255,102,0,0.6)',
              transition: mode === 'view' ? 'transform 0.1s' : 'none',
            }} />
            {/* Knob grip ridges */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
                  width: '2px',
                  height: '20px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
                  borderRadius: '1px',
                }}
              />
            ))}
            </div>
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: 'rgba(200,200,200,0.5)',
            letterSpacing: '1px',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
          }}>
            TUNE
          </div>
        </div>

        {/* Volume knob (VOL - Knob B) */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
        }}>
          {/* Expanded touch area for mobile - invisible but interactive */}
          <div
            onMouseDown={handleKnobBStart}
            onTouchStart={handleKnobBStart}
            style={{
              width: '80px', // Larger touch area (60px knob + 20px padding)
              height: '80px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: mode === 'investigation' ? 'grab' : 'default',
              userSelect: 'none',
              touchAction: 'none', // Prevent default touch behaviors
              WebkitTapHighlightColor: 'transparent', // Remove tap highlight on mobile
            }}>
            <div 
              style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, #5a5a5a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
            border: '4px solid rgba(0,0,0,0.8)',
            boxShadow: 
              'inset 0 3px 6px rgba(255,255,255,0.2), ' +
              'inset 0 -3px 6px rgba(0,0,0,0.9), ' +
              '0 6px 16px rgba(0,0,0,0.9)',
            position: 'relative',
                pointerEvents: 'none', // Let parent handle events
          }}>
              {/* Knob indicator (rotates based on knobB value) */}
            <div style={{
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: `translateX(-50%) rotate(${knobBRotation}deg)`,
              transformOrigin: '50% 24px', // Rotate around center of knob: indicator top (6px) + distance to knob center (24px) = 30px
              width: '4px',
              height: '18px',
              background: '#00ff00',
              borderRadius: '2px',
              boxShadow: '0 0 8px rgba(0,255,0,0.6)',
              transition: mode === 'view' ? 'transform 0.1s' : 'none',
            }} />
            {/* Knob grip ridges */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 18}deg)`,
                  width: '2px',
                  height: '20px',
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 50%, rgba(0,0,0,0.5) 100%)',
                  borderRadius: '1px',
                }}
              />
            ))}
            </div>
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: 'rgba(200,200,200,0.5)',
            letterSpacing: '1px',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
          }}>
            VOL
          </div>
        </div>
      </div>

      {/* Bent antenna - Top right */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        right: '8%',
        width: '5px',
        height: '80px',
        background: 'linear-gradient(180deg, #6a6a6a 0%, #4a4a4a 50%, #2a2a2a 100%)',
        transform: 'rotate(12deg)',
        borderRadius: '2px',
        boxShadow: 
          '2px 2px 6px rgba(0,0,0,0.8), ' +
          'inset 0 1px 0 rgba(255,255,255,0.2)',
        zIndex: 10,
      }}>
        {/* Metal texture on antenna */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${metalTexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.5,
          borderRadius: '2px',
        }} />
        {/* Antenna tip */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 30% 30%, #8a8a8a 0%, #4a4a4a 60%, #1a1a1a 100%)',
          boxShadow: '0 2px 4px rgba(0,0,0,0.8)',
        }} />
      </div>

      {/* Device Architecture sections */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '15%',
        background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 100%)',
        borderBottom: '2px solid rgba(0,0,0,0.8)',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.9)',
        zIndex: 1,
      }} />
      
      <div style={{
        position: 'absolute',
        top: '15%',
        left: 0,
        right: 0,
        bottom: '30%',
        background: 'linear-gradient(180deg, #2d2d2d 0%, #252525 50%, #1f1f1f 100%)',
        zIndex: 1,
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%',
        background: 'linear-gradient(0deg, #1a1a1a 0%, #1f1f1f 100%)',
        borderTop: '2px solid rgba(0,0,0,0.8)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
        zIndex: 1,
      }} />

      {/* Weld lines/seams */}
      {[
        { top: '15%', left: '8%', right: '8%', height: '2px', opacity: 0.6 },
        { bottom: '30%', left: '10%', right: '10%', height: '2px', opacity: 0.55 },
        { top: '15%', left: '6%', width: '2px', bottom: '30%', opacity: 0.5 },
        { top: '15%', right: '6%', width: '2px', bottom: '30%', opacity: 0.5 },
      ].map((seam, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...(seam.top ? { top: seam.top } : {}),
            ...(seam.bottom ? { bottom: seam.bottom } : {}),
            ...(seam.left ? { left: seam.left } : {}),
            ...(seam.right ? { right: seam.right } : {}),
            ...(seam.width ? { width: seam.width } : {}),
            ...(seam.height ? { height: seam.height } : {}),
            background: seam.width 
              ? 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)'
              : 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.9) 20%, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.9) 80%, transparent 100%)',
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
            opacity: seam.opacity,
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      ))}

      {/* Wires extending past edges */}
      {[
        { top: '35%', right: '-18px', width: '55px', height: '3px', rotation: 22 },
        { bottom: '20%', left: '-15px', width: '45px', height: '3px', rotation: -18 },
      ].map((wire, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            ...(wire.top ? { top: wire.top } : {}),
            ...(wire.bottom ? { bottom: wire.bottom } : {}),
            ...(wire.left ? { left: wire.left } : {}),
            ...(wire.right ? { right: wire.right } : {}),
            width: wire.width,
            height: wire.height,
            background: 'linear-gradient(90deg, #2a2a2a 0%, #1a1a1a 100%)',
            transform: `rotate(${wire.rotation}deg)`,
            opacity: 0.8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.7)',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      ))}
    </>
  );
};

export const SpiritBoxCasing = memo(SpiritBoxCasingComponent);

