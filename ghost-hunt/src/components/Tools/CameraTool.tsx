// Camera Tool Component - Reusable with mode prop
import CameraViewfinderMock from '../../ui-playground/tools/CameraViewfinderMock';
import { useInvestigation } from '../../context/InvestigationContext';

interface CameraToolProps {
  mode: 'view' | 'investigation';
}

export function CameraTool({ mode }: CameraToolProps) {
  const investigation = mode === 'investigation' ? useInvestigation() : null;
  
  // For now, render the mock component directly
  // TODO: Pass investigation data to mock when in investigation mode
  return <CameraViewfinderMock />;
}



