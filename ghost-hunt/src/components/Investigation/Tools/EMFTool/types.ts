/**
 * EMFTool Type Definitions
 * 
 * Defines interfaces for the EMF Meter tool component and its sub-components.
 */

export interface EMFToolProps {
  mode: 'view' | 'investigation';
  
  // Investigation mode props (optional, only used when mode="investigation")
  emfLevel?: number;        // 0-5
  isFlickering?: boolean;
}

export interface LEDDisplayProps {
  emfLevel: number;         // 0-5
  isFlickering: boolean;
  columns?: number;         // Default: 5
  segmentsPerColumn?: number; // Default: 8
}

export interface EMFCasingProps {
  emfLevel: number;         // 0-5 (for warning LED state)
}
