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
  isLocked?: boolean;         // Whether signal is locked (investigation mode)
  showNoResponse?: boolean;   // Show "NO RESPONSE" feedback
  showFrequencyReset?: boolean; // Show "FREQUENCY RESET" feedback
  onQuestionAsked?: (questionId: 'q1' | 'q2' | 'q3') => void; // Question click handler
  questionCooldown?: boolean; // Whether questions are on cooldown
}

export interface SpiritBoxCasingProps {
  // Investigation mode props
  knobA?: number; // 0.0-1.0
  knobB?: number; // 0.0-1.0
  onKnobAChange?: (value: number) => void;
  onKnobBChange?: (value: number) => void;
  mode?: 'view' | 'investigation';
}




