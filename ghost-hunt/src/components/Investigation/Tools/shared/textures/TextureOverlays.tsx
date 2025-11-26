import React from 'react';

// Note: These texture overlays are already applied in MetalCasing and PlasticCasing
// This component is for additional texture layers if needed

interface TextureOverlaysProps {
  type?: 'metal' | 'plastic' | 'none';
  children?: React.ReactNode;
}

/**
 * TextureOverlays - Additional texture layers (if needed beyond casing)
 * 
 * Note: MetalCasing and PlasticCasing already include texture layers.
 * This component is for additional custom texture overlays.
 * 
 * Usage:
 * <TextureOverlays type="metal">
 *   {content}
 * </TextureOverlays>
 */
export const TextureOverlays: React.FC<TextureOverlaysProps> = ({ 
  type = 'none',
  children 
}) => {
  if (type === 'none') {
    return <>{children}</>;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};
