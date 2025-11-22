// Base Components (Atoms)
export { PaperBase } from './base/PaperBase';
export { DamageOverlay } from './base/DamageOverlay';
export { Tape } from './base/Tape';
export { PushPin } from './base/PushPin';

// Element Components (Molecules)
export { PolaroidPhoto } from './elements/PolaroidPhoto';
export { StickyNote } from './elements/StickyNote';
export { HandwrittenText } from './elements/HandwrittenText';
export { TypewrittenText } from './elements/TypewrittenText';
export { OfficialStamp } from './elements/OfficialStamp';

// Template Components (Organisms)
export { CodexPage } from './templates/CodexPage';
export { EvidencePage } from './templates/EvidencePage';
export { FieldReport } from './templates/FieldReport';

// Utilities
export { getDamageVariant } from './utils/randomization';
export { coffeeVariants, burnVariants, fingerprintVariants, inkVariants } from './utils/damageVariants';
