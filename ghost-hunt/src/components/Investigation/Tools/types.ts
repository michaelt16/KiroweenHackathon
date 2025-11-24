/**
 * Investigation Tools - Type Definitions
 * 
 * This file defines all TypeScript interfaces for the investigation tool components.
 * Based on Spec 009 - Investigation UI Transformation
 */

// ============================================================================
// TOOL PROPS INTERFACES
// ============================================================================

/**
 * RadarTool - Circular CRT radar display with ghost detection
 */
export interface RadarToolProps {
  ghostBearing: number;        // 0-360 degrees
  ghostDistance: number;       // meters
  playerHeading: number;       // 0-360 degrees
  isGhostMoving: boolean;
  sweepSpeed?: number;         // degrees per frame (default: 2)
}

/**
 * EMFTool - LED bar graph meter for electromagnetic field detection
 */
export interface EMFToolProps {
  emfLevel: number;           // 0-5
  isFlickering: boolean;
  lastSpikeTime?: number;
}

/**
 * ThermalTool - Thermal imaging camera for cold spot detection
 */
export interface ThermalToolProps {
  coldSpots: ColdSpot[];
  ambientTemp: number;        // Celsius
  scanLinePosition: number;   // 0-100%
}

export interface ColdSpot {
  x: number;                  // pixels from left
  y: number;                  // pixels from top
  intensity: number;          // 0-1
  radius: number;             // pixels
}

/**
 * CameraTool - 1980s Polaroid camera viewfinder
 */
export interface CameraToolProps {
  filmCount: number;
  batteryLevel: number;       // 0-100%
  isRecording: boolean;
  timestamp: string;          // HH:MM:SS
  onCapture: () => void;
}

/**
 * SpiritBoxTool - Oscilloscope-style EVP recorder
 */
export interface SpiritBoxToolProps {
  waveform: number[];         // Array of amplitude values 0-1
  frequency: number;          // MHz
  staticLevel: number;        // 0-1
  evpResponse?: string;       // Current EVP text
  showResponse: boolean;
}

// ============================================================================
// DAMAGE CONFIGURATION INTERFACES
// ============================================================================

/**
 * Scratch configuration for damage elements
 */
export interface ScratchConfig {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  width: string;
  angle: number;
  opacity: number;
  color: 'light' | 'dark';
}

/**
 * Rust spot configuration for damage elements
 */
export interface RustSpotConfig {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: string;
  opacity: number;
}

/**
 * Tape patch configuration for damage elements
 */
export interface TapePatchConfig {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  width: string;
  height: string;
  rotation: number;
  opacity: number;
}

/**
 * Chipped corner configuration for damage elements
 */
export interface ChipConfig {
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  size: string;
  clipPath: string;
}

/**
 * Complete damage configuration for a tool
 */
export interface DamageConfig {
  scratches?: ScratchConfig[];
  rustSpots?: RustSpotConfig[];
  tapePatches?: TapePatchConfig[];
  chippedCorners?: ChipConfig[];
}

// ============================================================================
// TEXTURE LAYER INTERFACES
// ============================================================================

/**
 * Texture layer configuration
 */
export interface TextureLayerConfig {
  type: 'base' | 'dust' | 'wrinkled' | 'rust' | 'metal' | 'plastic';
  opacity?: number;
  blendMode?: 'multiply' | 'overlay' | 'screen' | 'normal';
  zIndex?: number;
  imagePath?: string;
}

/**
 * Material type for tool casing
 */
export type MaterialType = 'metal' | 'plastic-light' | 'plastic-dark';

// ============================================================================
// BASE COMPONENT PROPS
// ============================================================================

/**
 * ToolContainer - Full-screen wrapper for all investigation tools
 */
export interface ToolContainerProps {
  children: React.ReactNode;
  zIndex?: number;
  backgroundColor?: string;
}

/**
 * ToolCasing - Device body with material-specific styling
 */
export interface ToolCasingProps {
  material: MaterialType;
  children: React.ReactNode;
  className?: string;
}

/**
 * TextureLayer - Reusable texture overlay component
 */
export interface TextureLayerProps {
  type: 'base' | 'dust' | 'wrinkled' | 'rust' | 'metal' | 'plastic';
  opacity?: number;
  blendMode?: 'multiply' | 'overlay' | 'screen' | 'normal';
  zIndex?: number;
  imagePath?: string;
}

/**
 * DamageLayer - Container for damage elements
 */
export interface DamageLayerProps {
  scratches?: ScratchConfig[];
  rustSpots?: RustSpotConfig[];
  tapePatches?: TapePatchConfig[];
  chippedCorners?: ChipConfig[];
}

// ============================================================================
// TOOL CONFIGURATION
// ============================================================================

/**
 * Tool type identifier
 */
export type ToolType = 'radar' | 'emf' | 'thermal' | 'camera' | 'spiritBox';

/**
 * Complete tool configuration
 */
export interface ToolConfig {
  id: ToolType;
  name: string;
  icon: string;
  component: React.ComponentType<any>;
  damageConfig: DamageConfig;
}

// ============================================================================
// INVESTIGATION TOOL STATE
// ============================================================================

/**
 * Complete investigation tool state
 */
export interface InvestigationToolState {
  activeTool: ToolType;
  radar: RadarData;
  emf: EMFData;
  thermal: ThermalData;
  camera: CameraData;
  spiritBox: SpiritBoxData;
}

export interface RadarData {
  ghostBearing: number;
  ghostDistance: number;
  playerHeading: number;
  isGhostMoving: boolean;
}

export interface EMFData {
  level: number;              // 0-5
  isFlickering: boolean;
  history: number[];          // Last 10 readings
}

export interface ThermalData {
  coldSpots: ColdSpot[];
  ambientTemp: number;
  scanLinePosition: number;
}

export interface CameraData {
  filmCount: number;
  batteryLevel: number;
  isRecording: boolean;
  capturedPhotos: Photo[];
}

export interface Photo {
  id: string;
  timestamp: string;
  imageData: string;
}

export interface SpiritBoxData {
  waveform: number[];
  frequency: number;
  staticLevel: number;
  evpResponse: string | null;
  showResponse: boolean;
}
