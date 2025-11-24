import React from 'react';
import type { ToolCasingProps } from '../types';

/**
 * ToolCasing - Device body with material-specific styling
 * 
 * Purpose: Provides material-specific gradients, beveled edges, and inset shadows
 * 
 * Material Types:
 * - metal: Heavy steel gradient (Radar, EMF, Spirit Box)
 * - plastic-light: Light plastic with smooth texture (Thermal Scanner)
 * - plastic-dark: Dark rubberized plastic (Camera)
 * 
 * Based on Spec 009 - Investigation UI Transformation
 * Reference: 007 Investigation Tools Design System
 */
export const ToolCasing: React.FC<ToolCasingProps> = ({
  material,
  children,
  className = '',
}) => {
  // Material-specific gradients
  const getMaterialStyle = () => {
    switch (material) {
      case 'metal':
        // Heavy industrial steel - matches Radar/EMF/Spirit Box
        return {
          background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
          boxShadow: 
            'inset 0 6px 12px rgba(255,255,255,0.06), ' +
            'inset 0 -12px 24px rgba(0,0,0,0.98), ' +
            'inset 4px 0 8px rgba(0,0,0,0.9), ' +
            'inset -4px 0 8px rgba(0,0,0,0.9)',
        };
      
      case 'plastic-light':
        // Light plastic - Thermal Scanner
        return {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)',
          boxShadow: 
            'inset 0 4px 8px rgba(255,255,255,0.04), ' +
            'inset 0 -10px 18px rgba(0,0,0,0.9), ' +
            'inset 5px 0 10px rgba(0,0,0,0.9), ' +
            'inset -5px 0 10px rgba(0,0,0,0.9), ' +
            '0 20px 35px rgba(0,0,0,0.55), ' +
            '0 8px 15px rgba(0,0,0,0.35)',
        };
      
      case 'plastic-dark':
        // Dark rubberized plastic - Camera
        return {
          background: 'linear-gradient(135deg, #1a1a1a 0%, #111111 30%, #0f0f0f 70%, #111111 100%)',
          boxShadow: 
            'inset 0 4px 8px rgba(255,255,255,0.04), ' +
            'inset 0 -12px 20px rgba(0,0,0,0.95), ' +
            'inset 6px 0 12px rgba(0,0,0,0.9), ' +
            'inset -6px 0 12px rgba(0,0,0,0.9), ' +
            '0 25px 40px rgba(0,0,0,0.6), ' +
            '0 10px 18px rgba(0,0,0,0.4)',
        };
      
      default:
        return {};
    }
  };

  const materialStyle = getMaterialStyle();

  return (
    <div
      className={className}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        ...materialStyle,
        zIndex: 1,
      }}
    >
      {/* Beveled edges for depth - 8-12px deep */}
      {/* Top bevel */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: material === 'metal' ? '12px' : '8px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Bottom bevel */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: material === 'metal' ? '12px' : '8px',
        background: 'linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Left bevel */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: material === 'metal' ? '12px' : '8px',
        background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {/* Right bevel */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        width: material === 'metal' ? '12px' : '8px',
        background: 'linear-gradient(270deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 50%, transparent 100%)',
        pointerEvents: 'none',
        zIndex: 2,
      }} />
      
      {children}
    </div>
  );
};

export default ToolCasing;
