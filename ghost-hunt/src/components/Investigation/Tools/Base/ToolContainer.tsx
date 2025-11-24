import React from 'react';
import { ToolContainerProps } from '../types';

/**
 * ToolContainer - Full-screen wrapper for all investigation tools
 * 
 * Purpose: Provides full-screen layout (100vw × 100vh) for immersive tool display
 * 
 * Requirements:
 * - Full-screen layout (no UI chrome, just the device)
 * - Z-index management for proper layering
 * - Background color handling
 * 
 * Based on Spec 009 - Investigation UI Transformation
 * Reference: 007 Investigation Tools Design System
 */
export const ToolContainer: React.FC<ToolContainerProps> = ({
  children,
  zIndex = 0,
  backgroundColor = '#0a0a0a',
}) => {
  return (
    <div
      style={{
        // Full-screen layout - CRITICAL for immersion
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        
        // Z-index management
        zIndex,
        
        // Background color
        backgroundColor,
        
        // Ensure proper rendering
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      }}
    >
      {children}
    </div>
  );
};

export default ToolContainer;
