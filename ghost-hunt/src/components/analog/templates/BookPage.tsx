import React from 'react';
import { PaperBase } from '../base/PaperBase';
import { DamageOverlay } from '../base/DamageOverlay';
import { TypewrittenText } from '../elements/TypewrittenText';
import { HandwrittenText } from '../elements/HandwrittenText';
import { PolaroidPhoto } from '../elements/PolaroidPhoto';

interface BookPageProps {
  pageId: string;
  children: React.ReactNode;
  showSpine?: boolean;
  spinePosition?: 'left' | 'right';
}

/**
 * BookPage Template - Bound journal page with spine
 * Purpose: Player's ghost codex - organized reference book
 * 
 * Composition:
 * - Clean paper variant
 * - Light damage (0.15-0.25 opacity)
 * - Spine shadow and gutter margin
 * - Vertical crease down binding
 * - Well-organized, readable layout
 */
export function BookPage({ 
  pageId, 
  children, 
  showSpine = true,
  spinePosition = 'left' 
}: BookPageProps) {
  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Book spine (left side) */}
      {showSpine && spinePosition === 'left' && (
        <div style={{
          position: 'absolute',
          left: '-15px',
          top: 0,
          bottom: 0,
          width: '30px',
          background: 'linear-gradient(to right, #3a2f28 0%, #4a3f38 30%, #5a4f48 50%, #4a3f38 70%, #3a2f28 100%)',
          boxShadow: 'inset -3px 0 8px rgba(0,0,0,0.6), inset 3px 0 8px rgba(0,0,0,0.4)',
          borderRadius: '4px 0 0 4px',
          zIndex: 0,
        }}>
          {/* Spine texture lines */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '1px',
            background: 'rgba(0,0,0,0.3)',
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '30%',
            width: '1px',
            background: 'rgba(0,0,0,0.2)',
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '70%',
            width: '1px',
            background: 'rgba(0,0,0,0.2)',
          }} />
        </div>
      )}

      {/* Page content */}
      <div style={{
        position: 'relative',
        marginLeft: showSpine && spinePosition === 'left' ? '15px' : '0',
        marginRight: showSpine && spinePosition === 'right' ? '15px' : '0',
      }}>
        <PaperBase variant="clean" seed={pageId}>
          {/* Very light damage - well-maintained book */}
          <DamageOverlay type="coffee" opacity={0.15} seed={pageId} />
          <DamageOverlay type="fingerprint" opacity={0.1} seed={pageId + '-print'} />
          
          {/* Spine shadow (inner edge) */}
          {showSpine && (
            <div style={{
              position: 'absolute',
              [spinePosition]: 0,
              top: 0,
              bottom: 0,
              width: '40px',
              background: spinePosition === 'left' 
                ? 'linear-gradient(to right, rgba(0,0,0,0.2) 0%, transparent 100%)'
                : 'linear-gradient(to left, rgba(0,0,0,0.2) 0%, transparent 100%)',
              pointerEvents: 'none',
            }} />
          )}

          {/* Gutter margin line */}
          {showSpine && (
            <div style={{
              position: 'absolute',
              [spinePosition]: '60px',
              top: '30px',
              bottom: '30px',
              width: '1px',
              background: 'rgba(139, 69, 19, 0.3)',
              pointerEvents: 'none',
            }} />
          )}

          {/* Content with gutter spacing */}
          <div style={{
            marginLeft: showSpine && spinePosition === 'left' ? '80px' : '0',
            marginRight: showSpine && spinePosition === 'right' ? '80px' : '0',
          }}>
            {children}
          </div>
        </PaperBase>
      </div>

      {/* Book spine (right side) */}
      {showSpine && spinePosition === 'right' && (
        <div style={{
          position: 'absolute',
          right: '-15px',
          top: 0,
          bottom: 0,
          width: '30px',
          background: 'linear-gradient(to left, #3a2f28 0%, #4a3f38 30%, #5a4f48 50%, #4a3f38 70%, #3a2f28 100%)',
          boxShadow: 'inset 3px 0 8px rgba(0,0,0,0.6), inset -3px 0 8px rgba(0,0,0,0.4)',
          borderRadius: '0 4px 4px 0',
          zIndex: 0,
        }}>
          {/* Spine texture lines */}
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: '50%',
            width: '1px',
            background: 'rgba(0,0,0,0.3)',
          }} />
        </div>
      )}
    </div>
  );
}

// Export sub-components for composition
BookPage.Title = TypewrittenText;
BookPage.Note = HandwrittenText;
BookPage.Photo = PolaroidPhoto;
