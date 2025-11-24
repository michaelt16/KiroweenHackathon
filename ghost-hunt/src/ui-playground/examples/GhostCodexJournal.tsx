import { useState } from 'react';
import { BookPage } from '../../components/analog/templates/BookPage';
import { HandwrittenText } from '../../components/analog/elements/HandwrittenText';
import { TypewrittenText } from '../../components/analog/elements/TypewrittenText';
import { PolaroidPhoto } from '../../components/analog/elements/PolaroidPhoto';
import ghost1 from '../../assets/images/ghost1.png';
import ghost2 from '../../assets/images/ghost2.png';

/**
 * Ghost Codex Journal
 * Player's personal reference book for ghost types
 * Shows spine, organized entries, light damage
 */
export function GhostCodexJournal() {
  const [currentPage, setCurrentPage] = useState(0);

  const ghostEntries = [
    {
      id: 'shade',
      name: 'THE SHADE',
      type: 'Passive Apparition',
      threat: 'MEDIUM',
      threatColor: '#f59e0b',
      image: ghost1,
      evidence: ['Ghost Orbs', 'Freezing Temps', 'Ghost Writing'],
      behavior: [
        'Shy entity that avoids groups',
        'Most active when alone',
        'Prefers darkness and isolation',
        'Rarely aggressive',
        'Will retreat if confronted',
      ],
      tips: [
        'Turn off lights to encourage activity',
        'Investigate alone for best results',
        'Use EMF reader to track movement',
        'Entity manifests more in darkness',
      ],
      notes: 'Very timid. Patient approach required.',
    },
    {
      id: 'wraith',
      name: 'WRAITH',
      type: 'Aggressive Apparition',
      threat: 'HIGH',
      threatColor: '#dc2626',
      image: ghost2,
      evidence: ['EMF Level 5', 'Spirit Box', 'Freezing Temps'],
      behavior: [
        'Extremely fast movement',
        'Passes through walls freely',
        'Known for sudden temperature drops',
        'Highly aggressive during hunts',
        'Difficult to track or escape',
      ],
      tips: [
        'DO NOT investigate alone',
        'Salt barriers only slow it down',
        'Smudge sticks provide brief protection',
        'EVACUATE immediately if hunt begins',
        'Keep escape route clear at all times',
      ],
      notes: 'DANGER - Approach with extreme caution!',
    },
    {
      id: 'poltergeist',
      name: 'POLTERGEIST',
      type: 'Kinetic Entity',
      threat: 'MEDIUM',
      threatColor: '#f59e0b',
      image: ghost1,
      evidence: ['Spirit Box', 'Fingerprints', 'Ghost Writing'],
      behavior: [
        'Throws and moves objects',
        'Multiple simultaneous interactions',
        'Drains sanity rapidly',
        'Most active around many items',
        'Can affect entire room at once',
      ],
      tips: [
        'Watch for flying objects',
        'Clear area of loose items if possible',
        'Multiple cameras recommended',
        'Entity becomes more active with more objects',
        'Sanity drains faster than other ghosts',
      ],
      notes: 'Chaotic but predictable. Watch your head!',
    },
  ];

  const currentGhost = ghostEntries[currentPage];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Book title at top */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
      }}>
        <h1 style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '32px',
          color: '#d8d4c8',
          textTransform: 'uppercase',
          letterSpacing: '4px',
          marginBottom: '10px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
        }}>
          GHOST HUNTER'S CODEX
        </h1>
        <p style={{
          fontFamily: '"Caveat", cursive',
          fontSize: '20px',
          color: '#999',
          fontStyle: 'italic',
        }}>
          Field Guide to Paranormal Entities
        </p>
      </div>

      {/* Page navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
        marginBottom: '30px',
      }}>
        <button
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          style={{
            padding: '10px 20px',
            background: currentPage === 0 ? '#333' : '#4a3f38',
            color: currentPage === 0 ? '#666' : '#d8d4c8',
            border: '2px solid #5a4f48',
            borderRadius: '4px',
            cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
          }}
        >
          ← Previous
        </button>
        <div style={{
          padding: '10px 20px',
          background: '#2a2520',
          color: '#d8d4c8',
          border: '2px solid #5a4f48',
          borderRadius: '4px',
          fontFamily: '"Courier New", monospace',
          fontSize: '14px',
        }}>
          Page {currentPage + 1} of {ghostEntries.length}
        </div>
        <button
          onClick={() => setCurrentPage(Math.min(ghostEntries.length - 1, currentPage + 1))}
          disabled={currentPage === ghostEntries.length - 1}
          style={{
            padding: '10px 20px',
            background: currentPage === ghostEntries.length - 1 ? '#333' : '#4a3f38',
            color: currentPage === ghostEntries.length - 1 ? '#666' : '#d8d4c8',
            border: '2px solid #5a4f48',
            borderRadius: '4px',
            cursor: currentPage === ghostEntries.length - 1 ? 'not-allowed' : 'pointer',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
          }}
        >
          Next →
        </button>
      </div>

      {/* Book page with spine */}
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <BookPage pageId={currentGhost.id} showSpine={true} spinePosition="left">
          
          {/* Page header */}
          <div style={{
            borderBottom: '3px double #1a0f0a',
            paddingBottom: '15px',
            marginBottom: '25px',
          }}>
            <TypewrittenText fontSize="28px" fontWeight="bold">
              {currentGhost.name}
            </TypewrittenText>
            <TypewrittenText fontSize="16px" variant="faded">
              Classification: {currentGhost.type}
            </TypewrittenText>
          </div>

          {/* Threat level */}
          <div style={{
            background: `${currentGhost.threatColor}15`,
            border: `2px solid ${currentGhost.threatColor}`,
            padding: '12px',
            marginBottom: '25px',
            transform: 'rotate(-0.5deg)',
          }}>
            <TypewrittenText fontSize="18px" fontWeight="bold" color={currentGhost.threatColor}>
              ⚠ THREAT LEVEL: {currentGhost.threat}
            </TypewrittenText>
          </div>

          {/* Photo evidence */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '30px',
          }}>
            <PolaroidPhoto 
              src={currentGhost.image}
              caption={`${currentGhost.name} - confirmed sighting`}
              damage="light"
              seed={currentGhost.id}
            />
          </div>

          {/* Evidence section */}
          <div style={{
            marginBottom: '25px',
          }}>
            <TypewrittenText fontSize="18px" fontWeight="bold">
              EVIDENCE TYPES:
            </TypewrittenText>
            <div style={{ 
              marginLeft: '20px',
              marginTop: '10px',
            }}>
              {currentGhost.evidence.map((evidence, index) => (
                <HandwrittenText key={index} urgency="calm" fontSize="20px">
                  • {evidence}
                </HandwrittenText>
              ))}
            </div>
          </div>

          {/* Behavioral notes */}
          <div style={{
            marginBottom: '25px',
          }}>
            <TypewrittenText fontSize="18px" fontWeight="bold">
              BEHAVIORAL NOTES:
            </TypewrittenText>
            <div style={{ 
              marginLeft: '20px',
              marginTop: '10px',
            }}>
              {currentGhost.behavior.map((note, index) => (
                <HandwrittenText key={index} urgency="calm" fontSize="18px">
                  {index + 1}. {note}
                </HandwrittenText>
              ))}
            </div>
          </div>

          {/* Investigation tips */}
          <div style={{
            background: 'rgba(34, 197, 94, 0.1)',
            border: '2px dashed #22c55e',
            padding: '15px',
            marginBottom: '25px',
            transform: 'rotate(0.5deg)',
          }}>
            <TypewrittenText fontSize="18px" fontWeight="bold" color="#22c55e">
              💡 INVESTIGATION TIPS:
            </TypewrittenText>
            <div style={{ marginTop: '10px' }}>
              {currentGhost.tips.map((tip, index) => (
                <HandwrittenText key={index} urgency="calm" fontSize="17px">
                  • {tip}
                </HandwrittenText>
              ))}
            </div>
          </div>

          {/* Personal notes */}
          <div style={{
            borderTop: '1px dashed #8b7355',
            paddingTop: '15px',
            marginTop: '30px',
          }}>
            <HandwrittenText urgency="calm" fontSize="19px">
              <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                Personal Notes:
              </span>
              {'\n'}
              {currentGhost.notes}
            </HandwrittenText>
          </div>

          {/* Page number */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            right: '30px',
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            color: '#666',
          }}>
            - {currentPage + 1} -
          </div>

        </BookPage>
      </div>

      {/* Legend at bottom */}
      <div style={{
        maxWidth: '600px',
        margin: '40px auto 0',
        padding: '20px',
        background: 'rgba(42, 37, 32, 0.8)',
        border: '1px solid #5a4f48',
        borderRadius: '8px',
      }}>
        <p style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '14px',
          color: '#999',
          textAlign: 'center',
          margin: 0,
        }}>
          📖 Use arrow buttons to browse ghost entries • Each page contains detailed behavioral analysis and investigation strategies
        </p>
      </div>
    </div>
  );
}

export default GhostCodexJournal;
