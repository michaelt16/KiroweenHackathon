import React from 'react';
import { PaperBase } from '../base/PaperBase';
import { DamageOverlay } from '../base/DamageOverlay';
import { TypewrittenText } from '../elements/TypewrittenText';
import { HandwrittenText } from '../elements/HandwrittenText';
import { PolaroidPhoto } from '../elements/PolaroidPhoto';
import { StickyNote } from '../elements/StickyNote';

interface CodexPageProps {
  ghostId: string;
  children: React.ReactNode;
}

/**
 * CodexPage Template - Light damage, organized layout
 * Purpose: Player's personal ghost guide - readable and well-maintained
 * 
 * Composition:
 * - Clean paper variant
 * - Light damage (0.2-0.3 opacity)
 * - Mostly typewritten with handwritten notes
 * - Organized structure
 */
export function CodexPage({ ghostId, children }: CodexPageProps) {
  return (
    <PaperBase variant="clean" seed={ghostId}>
      {/* Light damage - well-maintained field guide */}
      <DamageOverlay type="coffee" opacity={0.2} seed={ghostId} />
      <DamageOverlay type="fingerprint" opacity={0.15} seed={ghostId + '-2'} />
      
      {children}
    </PaperBase>
  );
}

// Export sub-components for composition
CodexPage.Title = TypewrittenText;
CodexPage.Note = HandwrittenText;
CodexPage.Photo = PolaroidPhoto;
CodexPage.StickyNote = StickyNote;
