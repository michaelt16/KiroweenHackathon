// Thermal Scanner Tool Component - Reusable with mode prop
import { ThermalScannerMock } from '../../ui-playground/tools/ThermalScannerMock';
import { useInvestigation } from '../../context/InvestigationContext';

interface ThermalScannerToolProps {
  mode: 'view' | 'investigation';
}

export function ThermalScannerTool({ mode }: ThermalScannerToolProps) {
  const investigation = mode === 'investigation' ? useInvestigation() : null;
  
  // For now, render the mock component directly
  // TODO: Pass investigation data to mock when in investigation mode
  return <ThermalScannerMock />;
}


