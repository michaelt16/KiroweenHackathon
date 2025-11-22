import React from 'react';
import { PaperBase } from '../base/PaperBase';
import { DamageOverlay } from '../base/DamageOverlay';
import { HandwrittenText } from '../elements/HandwrittenText';
import { PolaroidPhoto } from '../elements/PolaroidPhoto';
import { Tape } from '../base/Tape';

interface EvidencePageProps {
  investigationId: string;
  children: React.ReactNode;
}

/**
 * EvidencePage Template - Heavy damage, chaotic layout
 * Purpose: Active investigation notes - urgent and panic-scrawled
 * 
 * Composition:
 * - Damaged paper variant
 * - Heavy damage (0.5-0.8 opacity)
 * - Mostly handwritten, frantic
 * - Chaotic, overlapping elements
 */
export function EvidencePage({ investigationId, children }: EvidencePageProps) {
  return (
    <PaperBase variant="damaged" seed={investigationId}>
      {/* Heavy damage - field-worn panic notes */}
      <DamageOverlay type="coffee" opacity={0.5} seed={investigationId} />
      <DamageOverlay type="blood" opacity={0.3} seed={investigationId + '-blood'} />
      <DamageOverlay type="burn" opacity={0.7} seed={investigationId + '-burn'} />
      <DamageOverlay type="ink" opacity={0.4} seed={investigationId + '-ink'} />
      
      {children}
    </PaperBase>
  );
}

// Export sub-components for composition
EvidencePage.Note = HandwrittenText;
EvidencePage.Photo = PolaroidPhoto;
EvidencePage.Tape = Tape;
