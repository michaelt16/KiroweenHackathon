// Audio Receiver (Spirit Box) Tool Component - Reusable with mode prop
import SpiritBoxMock from '../../ui-playground/tools/SpiritBoxMock';
import { useInvestigation } from '../../context/InvestigationContext';

interface AudioReceiverToolProps {
  mode: 'view' | 'investigation';
}

export function AudioReceiverTool({ mode }: AudioReceiverToolProps) {
  const investigation = mode === 'investigation' ? useInvestigation() : null;
  
  // For now, render the mock component directly
  // TODO: Pass investigation data to mock when in investigation mode
  return <SpiritBoxMock />;
}







