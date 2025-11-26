// Evidence Tab - Field Notepad/Clipboard (Production)
import React from 'react';
import { useInvestigation } from '../../../context/InvestigationContext';
import { HandwrittenText } from '../../analog/elements/HandwrittenText';
import { TRAIT_LABELS, type EvidenceTrait } from '../../../data/ghosts';

const TRAIT_ORDER: EvidenceTrait[] = [
  'emf',
  'whispers',
  'cold',
  'static',
  'photos',
  'sanityBehavior',
];

export function EvidenceTab() {
  const { evidence } = useInvestigation();

  // Count collected evidence
  const collectedCount = TRAIT_ORDER.filter(trait => evidence[trait] === 'present').length;

  // Mock suspects for MVP (TODO: Connect to actual ghost deduction logic)
  const mockSuspects = [
    { name: 'WRAITH', confidence: 'High' as const },
    { name: 'BANSHEE', confidence: 'Medium' as const },
    { name: 'DEMON', confidence: 'Low' as const },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#1a1612',
      padding: '20px',
      overflow: 'auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
    }}>
      {/* Clipboard/Notepad */}
      <div style={{
        maxWidth: '500px',
        width: '100%',
        background: '#f4f0e6',
        padding: '30px 25px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
        transform: 'rotate(-0.5deg)',
        position: 'relative',
        borderRadius: '4px',
      }}>
        {/* Clipboard clip at top */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80px',
          height: '30px',
          background: 'linear-gradient(135deg, #4a4a4a 0%, #2a2a2a 100%)',
          borderRadius: '8px 8px 0 0',
          boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
          border: '2px solid #1a1a1a',
        }} />

        {/* Title - Handwritten */}
        <div style={{ marginBottom: '24px', textAlign: 'center' }}>
          <HandwrittenText urgency="urgent" fontSize="24px" color="#1a0f0a">
            Evidence Checklist
          </HandwrittenText>
        </div>

        {/* Evidence Collected - Handwritten checklist */}
        <div style={{ marginBottom: '32px' }}>
          <HandwrittenText urgency="calm" fontSize="16px" color="#1a0f0a" style={{ marginBottom: '16px', textDecoration: 'underline' }}>
            Evidence Found:
          </HandwrittenText>
          {TRAIT_ORDER.map((trait) => {
            const isFound = evidence[trait] === 'present';
            return (
              <HandwrittenText
                key={trait}
                urgency="calm"
                fontSize="18px"
                color={isFound ? '#1a0f0a' : '#999'}
                style={{ 
                  marginBottom: '10px', 
                  paddingLeft: '10px',
                }}
              >
                {isFound ? '✓' : '○'} {TRAIT_LABELS[trait]}
              </HandwrittenText>
            );
          })}
        </div>

        {/* Possible Ghosts - Circled with red marker */}
        <div style={{
          background: 'rgba(255, 255, 0, 0.15)',
          padding: '20px',
          border: '3px solid rgba(255, 200, 0, 0.6)',
          marginBottom: '24px',
          transform: 'rotate(1deg)',
          position: 'relative',
        }}>
          <HandwrittenText urgency="urgent" fontSize="18px" color="#8b0000" style={{ marginBottom: '16px', textDecoration: 'underline' }}>
            Suspects:
          </HandwrittenText>
          {mockSuspects.map((ghost, i) => (
            <HandwrittenText
              key={i}
              urgency="urgent"
              fontSize="20px"
              color={i === 0 ? '#cc0000' : '#8b0000'}
              style={{ 
                marginBottom: '10px', 
                paddingLeft: '10px',
                fontWeight: i === 0 ? 'bold' : 'normal',
              }}
            >
              {i === 0 ? '⭕' : '○'} {ghost.name} - {ghost.confidence}
            </HandwrittenText>
          ))}
        </div>

        {/* Identify Button - Handwritten style */}
        <button style={{
          width: '100%',
          padding: '16px',
          background: '#8b0000',
          border: '3px solid #4a0000',
          borderRadius: '6px',
          fontFamily: '"Caveat", cursive',
          fontSize: '22px',
          fontWeight: 'bold',
          color: '#fff',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(139,0,0,0.6)',
          transform: 'rotate(-0.5deg)',
        }}>
          Make Identification
        </button>
      </div>
    </div>
  );
}
