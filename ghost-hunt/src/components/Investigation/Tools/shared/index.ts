/**
 * Investigation Tools - Shared Components
 * 
 * This file exports all reusable visual components for investigation tools.
 * Based on Spec 009 - Investigation UI Transformation
 */

export { ToolCasing } from './ToolCasing';
export { ToolScrews } from './ToolScrews';
export { TextureLayer } from './TextureLayer';
export { DamageLayer } from './DamageLayer';
export { HandwrittenLabel } from './HandwrittenLabel';
export { SerialNumber } from './SerialNumber';

// Re-export types for convenience
export type { ToolCasingProps } from '../types';
export type { TextureLayerProps } from '../types';
export type { DamageLayerProps } from '../types';
export type { HandwrittenLabelProps } from './HandwrittenLabel';
export type { SerialNumberProps } from './SerialNumber';
