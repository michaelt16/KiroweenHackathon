// Field Journal marker component
import { Marker, Popup } from 'react-leaflet';
import { divIcon } from 'leaflet';
import { useGameState } from '../context/GameStateContext';
import { useFieldJournals } from '../context/FieldJournalsContext';
import { isInRange } from '../utils/distance';
import type { FieldJournalNode } from '../types/game';
import { getJournalById } from '../data/fieldJournals';

interface FieldJournalMarkerProps {
  journalNode: FieldJournalNode;
  onCollect: (id: string) => void;
}

// CSS Art Journal Icon
const JournalIcon = ({ size = 36, inRange = false }: { size?: number; inRange?: boolean }) => {
  const scale = size / 36;
  const iconSize = inRange ? size + 8 : size;
  const scaleFactor = iconSize / 36;
  
  return `
    <div style="
      width: ${iconSize}px;
      height: ${iconSize}px;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <!-- Journal/Notebook -->
      <div style="
        width: ${24 * scaleFactor}px;
        height: ${30 * scaleFactor}px;
        background: linear-gradient(135deg, #8b6f47 0%, #6b5230 50%, #5a4228 100%);
        border: ${2 * scaleFactor}px solid #3a2818;
        border-radius: ${2 * scaleFactor}px ${2 * scaleFactor}px ${1 * scaleFactor}px ${1 * scaleFactor}px;
        box-shadow: 
          inset 0 ${1 * scaleFactor}px ${2 * scaleFactor}px rgba(0, 0, 0, 0.6),
          inset 0 -${1 * scaleFactor}px ${2 * scaleFactor}px rgba(255, 255, 255, 0.1),
          0 ${2 * scaleFactor}px ${6 * scaleFactor}px rgba(0, 0, 0, 0.8);
        position: relative;
        transform: rotate(-5deg);
      ">
        <!-- Binding rings -->
        <div style="
          position: absolute;
          left: ${3 * scaleFactor}px;
          top: ${6 * scaleFactor}px;
          width: ${2 * scaleFactor}px;
          height: ${18 * scaleFactor}px;
          background: #3a2818;
          border-radius: ${1 * scaleFactor}px;
        "></div>
        <div style="
          position: absolute;
          left: ${6 * scaleFactor}px;
          top: ${6 * scaleFactor}px;
          width: ${2 * scaleFactor}px;
          height: ${18 * scaleFactor}px;
          background: #3a2818;
          border-radius: ${1 * scaleFactor}px;
        "></div>
        
        <!-- Lines on paper -->
        <div style="
          position: absolute;
          top: ${8 * scaleFactor}px;
          left: ${10 * scaleFactor}px;
          right: ${3 * scaleFactor}px;
          height: ${1 * scaleFactor}px;
          background: rgba(0, 0, 0, 0.2);
        "></div>
        <div style="
          position: absolute;
          top: ${12 * scaleFactor}px;
          left: ${10 * scaleFactor}px;
          right: ${3 * scaleFactor}px;
          height: ${1 * scaleFactor}px;
          background: rgba(0, 0, 0, 0.2);
        "></div>
        <div style="
          position: absolute;
          top: ${16 * scaleFactor}px;
          left: ${10 * scaleFactor}px;
          right: ${3 * scaleFactor}px;
          height: ${1 * scaleFactor}px;
          background: rgba(0, 0, 0, 0.2);
        "></div>
        
        <!-- Red stamp/seal -->
        <div style="
          position: absolute;
          bottom: ${4 * scaleFactor}px;
          right: ${4 * scaleFactor}px;
          width: ${8 * scaleFactor}px;
          height: ${8 * scaleFactor}px;
          border: ${1 * scaleFactor}px solid #8b0000;
          border-radius: 50%;
          background: rgba(139, 0, 0, 0.3);
        "></div>
      </div>
    </div>
  `;
};

export function FieldJournalMarker({ journalNode, onCollect }: FieldJournalMarkerProps) {
  const { playerPosition } = useGameState();
  const { hasJournal } = useFieldJournals();
  const inRange = isInRange(playerPosition, { lat: journalNode.lat, lng: journalNode.lng });
  const journal = getJournalById(journalNode.journalId);
  const isCollected = hasJournal(journalNode.journalId);

  // Don't render if already collected
  if (isCollected || !journal) {
    return null;
  }

  const handleCollect = () => {
    console.log('📚 Attempting to collect field journal:', journalNode.journalId, 'In range:', inRange);
    if (inRange) {
      onCollect(journalNode.id);
    } else {
      console.log('❌ Field journal out of range');
    }
  };

  const iconSize = inRange ? 52 : 44;
  const journalSize = inRange ? 44 : 36;
  const brightnessFilter = inRange 
    ? `filter: brightness(1.2) saturate(2.8) contrast(1.15) drop-shadow(0 0 20px #8b6f47) drop-shadow(0 0 12px #8b6f47) !important; animation: supplyPulse 2s ease-in-out infinite;`
    : `filter: brightness(1) saturate(1) drop-shadow(0 0 8px rgba(139, 111, 71, 0.5));`;

  return (
    <Marker 
      position={[journalNode.lat, journalNode.lng]} 
      icon={divIcon({
        html: `<div style="${brightnessFilter}">${JournalIcon({ size: journalSize, inRange })}</div>`,
        className: 'field-journal-marker',
        iconSize: [iconSize, iconSize],
        iconAnchor: [iconSize / 2, iconSize / 2],
      })}
      zIndexOffset={2000}
    >
      <Popup>
        <div style={{ textAlign: 'center', minWidth: '200px', padding: '8px' }}>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: '#8b6f47' }}>
            Field Journal
          </h3>
          <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>
            {journal.location}
          </p>
          <p style={{ margin: '4px 0', fontSize: '11px', color: '#888' }}>
            Agent: {journal.agentName}
          </p>
          
          {/* Range indicator */}
          <p
            style={{
              margin: '8px 0',
              fontSize: '12px',
              color: inRange ? '#2dd4bf' : '#ef4444',
              fontWeight: 'bold',
            }}
          >
            {inRange ? '✓ In range – tap to collect' : '⚠ Move closer to collect'}
          </p>
          
          <button
            onClick={handleCollect}
            disabled={!inRange}
            style={{
              marginTop: '8px',
              padding: '10px 20px',
              backgroundColor: inRange ? '#8b6f47' : '#ccc',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: inRange ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              fontSize: '14px',
              width: '100%',
            }}
          >
            {inRange ? 'Collect Journal' : 'Out of Range'}
          </button>
        </div>
      </Popup>
    </Marker>
  );
}




