import React from 'react';
import { PaperBase } from '../base/PaperBase';
import { DamageOverlay } from '../base/DamageOverlay';
import { TypewrittenText } from '../elements/TypewrittenText';
import { HandwrittenText } from '../elements/HandwrittenText';
import { OfficialStamp } from '../elements/OfficialStamp';
import { PolaroidPhoto } from '../elements/PolaroidPhoto';

interface FieldReportProps {
  reportId: string;
  children: React.ReactNode;
}

/**
 * FieldReport Template - Medium damage, structured but used
 * Purpose: Official investigation report - structured with handwritten additions
 * 
 * Composition:
 * - Aged paper variant
 * - Medium damage (0.3-0.5 opacity)
 * - Mixed typewritten + handwritten
 * - Structured layout with official stamps
 */
export function FieldReport({ reportId, children }: FieldReportProps) {
  return (
    <PaperBase variant="aged" seed={reportId}>
      {/* Medium damage - official but field-worn */}
      <DamageOverlay type="coffee" opacity={0.4} seed={reportId} />
      <DamageOverlay type="water" opacity={0.3} seed={reportId + '-water'} />
      <DamageOverlay type="fingerprint" opacity={0.25} seed={reportId + '-print'} />
      
      {children}
    </PaperBase>
  );
}

// Export sub-components for composition
FieldReport.Header = TypewrittenText;
FieldReport.Note = HandwrittenText;
FieldReport.Stamp = OfficialStamp;
FieldReport.Photo = PolaroidPhoto;
