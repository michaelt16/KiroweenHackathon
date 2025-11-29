/**
 * SpiritBoxTool Type Definitions
 * 
 * Defines interfaces for the Spirit Box tool component and its sub-components.
 */

export interface SpiritBoxToolProps {
  mode: 'view' | 'investigation';
  
  // Investigation mode props (optional, only used when mode="investigation")
  frequency?: number;        // MHz
  staticLevel?: number;      // 0-1
  evpResponse?: string;      // Current EVP text
  showEvp?: boolean;         // Whether to show EVP response
}

export interface SpiritBoxDisplayProps {
  waveform: number[];        // Array of amplitude values 0-1
  frequency: number;         // MHz
  staticLevel: number;       // 0-1
  evpResponse?: string;       // Current EVP text
  showEvp: boolean;           // Whether to show EVP response
}

export interface SpiritBoxCasingProps {
  // No props needed for casing - it's purely visual
}


