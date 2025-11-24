// Field Scanner - Main radar view component
// Renders the active investigation tool in full-screen mode
import { useInvestigation } from '../../context/InvestigationContext';
import { RadarTool, EMFMeterTool, ThermalScannerTool, AudioReceiverTool, CameraTool } from '../Tools';

export function FieldScanner() {
  const { activeTool } = useInvestigation();

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      {/* Tool components - Full-screen investigation tools */}
      {activeTool === 'radar' && <RadarTool mode="investigation" />}
      {activeTool === 'emf' && <EMFMeterTool mode="investigation" />}
      {activeTool === 'thermal' && <ThermalScannerTool mode="investigation" />}
      {activeTool === 'audio' && <AudioReceiverTool mode="investigation" />}
      {activeTool === 'camera' && <CameraTool mode="investigation" />}
      
      {/* Default to radar if no tool is active */}
      {!activeTool && <RadarTool mode="investigation" />}
    </div>
  );
}
