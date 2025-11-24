import React, { useEffect, useState } from 'react';
import type { TextureLayerProps } from '../types';

// Texture imports
import metalTexture from '../../../../assets/texture/metalscratchedtexture.png';
import rust from '../../../../assets/texture/brownrust.png';
import dust from '../../../../assets/texture/dust.png';
import wrinkledPaper from '../../../../assets/texture/wrinkledpaper.png';
import smoothPlastic from '../../../../assets/texture/smoothplastictexture.png';
import scratchedPlasticDark from '../../../../assets/texture/scratchedplasticdark.png';

/**
 * TextureLayer - Reusable texture overlay component
 * 
 * Purpose: Applies texture overlays with configurable blend modes and opacity
 * 
 * Texture Types:
 * - metal: Scratched metal texture (for metal tools)
 * - rust: Rust/wear overlay
 * - dust: Dust/grime layer
 * - wrinkled: Wrinkled paper texture
 * - plastic: Smooth plastic texture
 * - base: Generic base texture
 * 
 * Based on Spec 009 - Investigation UI Transformation
 * Reference: 007 Investigation Tools Design System
 */
export const TextureLayer: React.FC<TextureLayerProps> = ({
  type,
  opacity = 0.5,
  blendMode = 'multiply',
  zIndex = 2,
  imagePath,
}) => {
  const [textureLoaded, setTextureLoaded] = useState(false);

  // Get texture path based on type
  const getTexturePath = () => {
    if (imagePath) return imagePath;
    
    switch (type) {
      case 'metal':
        return metalTexture;
      case 'rust':
        return rust;
      case 'dust':
        return dust;
      case 'wrinkled':
        return wrinkledPaper;
      case 'plastic':
        return smoothPlastic;
      case 'base':
        return scratchedPlasticDark;
      default:
        return dust;
    }
  };

  const texturePath = getTexturePath();

  // Preload texture image
  useEffect(() => {
    const img = new Image();
    img.src = texturePath;
    img.onload = () => setTextureLoaded(true);
    img.onerror = () => {
      console.warn(`Failed to load texture: ${texturePath}`);
      setTextureLoaded(true); // Still render, just without texture
    };
  }, [texturePath]);

  // Get default opacity based on type (from 007 spec)
  const getDefaultOpacity = () => {
    switch (type) {
      case 'metal':
        return 0.6;  // EXACT: 0.6 for metal tools
      case 'rust':
        return 0.4;  // EXACT: 0.4 for rust layer
      case 'dust':
        return 0.3;  // EXACT: 0.3 for dust layer
      case 'wrinkled':
        return 0.12; // For wrinkled paper overlay
      case 'plastic':
        return 0.5;  // For smooth plastic
      case 'base':
        return 0.25; // For base dark plastic
      default:
        return opacity;
    }
  };

  const finalOpacity = opacity === 0.5 ? getDefaultOpacity() : opacity;

  // Get default blend mode based on type
  const getDefaultBlendMode = () => {
    switch (type) {
      case 'metal':
        return 'overlay';
      case 'rust':
        return 'multiply';
      case 'dust':
        return 'multiply';
      case 'wrinkled':
        return 'overlay';
      case 'plastic':
        return 'multiply';
      case 'base':
        return 'multiply';
      default:
        return blendMode;
    }
  };

  const finalBlendMode = blendMode === 'multiply' ? getDefaultBlendMode() : blendMode;

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: textureLoaded ? `url(${texturePath})` : 'none',
        backgroundSize: type === 'plastic' ? '300px 300px' : 'cover',
        backgroundRepeat: type === 'plastic' ? 'repeat' : 'no-repeat',
        mixBlendMode: finalBlendMode as any,
        opacity: finalOpacity,
        pointerEvents: 'none',
        zIndex,
      }}
    />
  );
};

export default TextureLayer;
