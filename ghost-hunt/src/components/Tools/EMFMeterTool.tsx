// EMF Meter Tool Component - Reusable with mode prop
import EMFMeterMock from '../../ui-playground/tools/EMFMeterMock';
import { useInvestigation } from '../../context/InvestigationContext';

interface EMFMeterToolProps {
  mode: 'view' | 'investigation';
}

export function EMFMeterTool({ mode }: EMFMeterToolProps) {
  const investigation = mode === 'investigation' ? useInvestigation() : null;
  
  // For now, render the mock component directly
  // TODO: Pass investigation data (ghostDistance, ghostType) to mock when in investigation mode
  return <EMFMeterMock />;
}


