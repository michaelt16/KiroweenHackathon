// Radar Tool Component - Thin wrapper that connects production component to investigation context
// Production component: src/components/Investigation/Tools/RadarTool.tsx
// Design reference: src/ui-playground/tools/RadarToolMock.tsx

import { RadarTool as RadarToolProduction } from '../Investigation/Tools/RadarTool';
import { useInvestigation } from '../../context/InvestigationContext';

interface RadarToolProps {
  mode: 'view' | 'investigation';
}

export function RadarTool({ mode }: RadarToolProps) {
  const investigation = mode === 'investigation' ? useInvestigation() : null;

  // Calculate if ghost is in forward cone (±45°)
  const isGhostInCone = investigation 
    ? Math.abs(((investigation.ghostBearing - investigation.playerHeading + 180) % 360) - 180) <= 45
    : false;

  return (
    <RadarToolProduction
      mode={mode}
      ghostBearing={investigation?.ghostBearing ?? 45}
      playerHeading={investigation?.playerHeading ?? 0}
      isGhostInCone={isGhostInCone}
      isGhostMoving={false}
      sweepSpeed={2}
    />
  );
}

