// Evidence Tab - Field Investigation Checklist (Phasmophobia-style)
import React, { useMemo } from 'react';
import { useInvestigationStore } from '../../../stores/investigationStore';
import { useGhostStore, GhostType } from '../../../stores/ghostStore';
import type { GhostType as GhostTypeType } from '../../../stores/ghostStore';
import { useInvestigation } from '../../../context/InvestigationContext';
import type { GhostType as ContextGhostType } from '../../../types/investigation';
import { HandwrittenText } from '../../analog/elements/HandwrittenText';
import { TypewrittenText } from '../../analog/elements/TypewrittenText';
import { PaperBase } from '../../analog/base/PaperBase';
import { DamageOverlay } from '../../analog/base/DamageOverlay';
import { playButtonClick } from '../../../utils/soundEffects';
import { 
  GHOST_DEFINITIONS, 
  TRAIT_LABELS, 
  type EvidenceTrait,
  type ThermalReadingState,
  type CameraManifestationState,
  THERMAL_READING_OPTIONS,
  CAMERA_MANIFESTATION_OPTIONS,
  doesGhostMatchEvidence 
} from '../../../data/ghosts';
import type { SpiritBoxPersonality } from '../../../stores/investigationStore';

const EVIDENCE_TRAITS: EvidenceTrait[] = ['spiritBoxPersonality', 'whispers', 'thermalReading', 'cameraManifestation'];

// Spirit Box Personality options
const SPIRIT_BOX_PERSONALITY_OPTIONS: Array<{ value: SpiritBoxPersonality; label: string }> = [
  { value: 'unknown', label: 'Unknown' },
  { value: 'aggressive', label: 'Aggressive' },
  { value: 'shy', label: 'Shy' },
  { value: 'chaotic', label: 'Chaotic' },
  { value: 'contradictory', label: 'Contradictory' },
];

// Map store GhostType enum to context GhostType string
const mapStoreGhostTypeToContext = (storeType: GhostTypeType): ContextGhostType => {
  const mapping: Record<GhostTypeType, ContextGhostType> = {
    [GhostType.WRAITH]: 'Wraith',
    [GhostType.SHADE]: 'Shade',
    [GhostType.POLTERGEIST]: 'Poltergeist',
    [GhostType.BANSHEE]: 'Wraith', // Fallback
    [GhostType.PHANTOM]: 'Wraith', // Fallback
    [GhostType.ONYX]: 'Wraith', // Fallback
    [GhostType.TRICKSTER]: 'Wraith', // Fallback
  };
  return mapping[storeType] || 'Wraith';
};

export function EvidenceTab() {
  console.log('🔍 EvidenceTab: Component rendering');
  
  const evidenceChecklist = useInvestigationStore((state) => state.evidenceChecklist);
  const selectedGhost = useInvestigationStore((state) => state.selectedGhost);
  const setEvidenceState = useInvestigationStore((state) => state.setEvidenceState);
  const setSelectedGhost = useInvestigationStore((state) => state.setSelectedGhost);
  const getAllGhosts = useGhostStore((state) => state.getAllGhosts);
  const tricksterTraits = useInvestigationStore((state) => state.tricksterTraits);
  const activeGhostType = useInvestigationStore((state) => state.activeGhostType);
  const completeInvestigationStore = useInvestigationStore((state) => state.completeInvestigation);
  const { setMode } = useInvestigation();
  
  console.log('🔍 EvidenceTab: State', {
    selectedGhost,
    activeGhostType,
    evidenceChecklist,
  });

  // Get all ghosts and check which ones match evidence
  const { allGhosts, matchingGhosts } = useMemo(() => {
    const allGhostsList = getAllGhosts();
    
    // Build evidence object from checklist
    const evidence: Partial<{
      spiritBoxPersonality: SpiritBoxPersonality;
      whispers: 'present' | 'ruled_out' | 'unknown';
      thermalReading: ThermalReadingState;
      cameraManifestation: CameraManifestationState;
    }> = {
      spiritBoxPersonality: (evidenceChecklist.spiritBoxPersonality as SpiritBoxPersonality) || 'unknown',
      whispers: (evidenceChecklist.whispers as 'present' | 'ruled_out' | 'unknown') || 'unknown',
      thermalReading: (evidenceChecklist.thermalReading as ThermalReadingState) || 'unknown',
      cameraManifestation: (evidenceChecklist.cameraManifestation as CameraManifestationState) || 'unknown',
    };

    // Map ghost store enum values to ghost definitions keys
    // Ghost store enum: 'wraith' (lowercase), Ghost definitions: 'Wraith' (capitalized)
    const getGhostDefKey = (ghostId: GhostType): keyof typeof GHOST_DEFINITIONS | null => {
      // Convert enum value to capitalized string
      const enumValue = ghostId.toString();
      const capitalized = enumValue.charAt(0).toUpperCase() + enumValue.slice(1);
      return capitalized as keyof typeof GHOST_DEFINITIONS;
    };

    // Check which ghosts match (but show all ghosts)
    const matchingSet = new Set<GhostType>();
    
    allGhostsList.forEach((ghost) => {
      const ghostDefKey = getGhostDefKey(ghost.id);
      if (!ghostDefKey || !GHOST_DEFINITIONS[ghostDefKey]) {
        // If ghost not in definitions, don't mark as matching
        return;
      }
      
      // Trickster is treated like any other ghost
      const ghostDef = GHOST_DEFINITIONS[ghostDefKey];
      if (ghostDefKey === 'Trickster' && activeGhostType === GhostType.TRICKSTER && tricksterTraits) {
        // If Trickster is active and we have generated traits, check against those
        if (doesGhostMatchEvidence(tricksterTraits, evidence)) {
          matchingSet.add(ghost.id);
        }
      } else if (doesGhostMatchEvidence(ghostDef.keyTraits, evidence)) {
        // Check against default ghost definition
        matchingSet.add(ghost.id);
      }
    });
    
    return {
      allGhosts: allGhostsList,
      matchingGhosts: matchingSet,
    };
  }, [evidenceChecklist, getAllGhosts, tricksterTraits, activeGhostType]);
  
  const possibleGhosts = Array.from(matchingGhosts);

  // Handle checkbox toggle for evidence traits
  const handleCheckboxToggle = (trait: 'spiritBoxPersonality' | 'thermalReading' | 'cameraManifestation', value: string) => {
    const currentValue = evidenceChecklist[trait];
    // If clicking the same value, set to 'unknown', otherwise set to the new value
    if (currentValue === value) {
      setEvidenceState(trait, 'unknown' as any);
    } else {
      setEvidenceState(trait, value as any);
    }
  };

  // Handle whispers toggle (simple present/ruled_out/unknown)
  const handleWhispersToggle = () => {
    const currentState = evidenceChecklist.whispers || 'unknown';
    let nextState: 'present' | 'ruled_out' | 'unknown';
    if (currentState === 'unknown') {
      nextState = 'present';
    } else if (currentState === 'present') {
      nextState = 'ruled_out';
    } else {
      nextState = 'unknown';
    }
    setEvidenceState('whispers', nextState);
  };

  // Count checked evidence (anything not 'unknown')
  const checkedCount = Object.values(evidenceChecklist).filter(
    (state) => state !== 'unknown'
  ).length;
  
  console.log('🔍 EvidenceTab: Button state', {
    selectedGhost,
    checkedCount,
    isButtonDisabled: !selectedGhost || checkedCount < 3,
  });

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#1a1612',
      padding: '0',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <PaperBase 
        variant="aged" 
        seed="evidence-checklist"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          boxShadow: 'none',
          borderRadius: '0',
          transform: 'none',
          maxHeight: '100%',
          padding: '20px',
          position: 'relative',
        }}
      >
        {/* Damage overlays for authenticity */}
        <DamageOverlay type="coffee" opacity={0.4} seed="evidence-coffee" />
        <DamageOverlay type="fingerprint" opacity={0.3} seed="evidence-fingerprint" />
        <DamageOverlay type="ink" opacity={0.2} seed="evidence-ink" />

          {/* Header Section */}
          <div style={{ marginBottom: '28px', position: 'relative' }}>
            {/* Title - Handwritten with urgency */}
            <div style={{ marginBottom: '12px', textAlign: 'center' }}>
              <HandwrittenText urgency="urgent" fontSize="28px" color="#1a0f0a">
                EVIDENCE CHECKLIST
              </HandwrittenText>
            </div>

            {/* Date/Time stamp - Typewritten */}
            <div style={{ textAlign: 'center', marginBottom: '16px' }}>
              <TypewrittenText variant="faded" fontSize="11px" color="#4a4a4a">
                FIELD INVESTIGATION LOG
              </TypewrittenText>
            </div>

            {/* Evidence count - Handwritten note */}
            <div style={{ 
              position: 'absolute', 
              top: '0px', 
              right: '0px',
              transform: 'rotate(2deg)',
            }}>
              <HandwrittenText urgency="calm" fontSize="14px" color="#8b0000">
                {checkedCount} checked
              </HandwrittenText>
            </div>
          </div>

          {/* Spirit Box Words Section - NEW */}
          {evidenceChecklist.spiritBoxPersonality !== 'unknown' && (
            <div style={{ 
              marginBottom: '28px', 
              position: 'relative',
              background: 'rgba(139, 115, 85, 0.08)',
              padding: '16px',
              borderRadius: '4px',
              border: '2px dashed rgba(139, 69, 19, 0.3)',
            }}>
              <HandwrittenText urgency="urgent" fontSize="18px" color="#8b0000" style={{ 
                marginBottom: '14px', 
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}>
                Spirit Box Words Heard:
              </HandwrittenText>

              {/* Words heard list */}
              {useInvestigationStore.getState().spiritBoxState.wordsHeard.length > 0 ? (
                <div style={{ marginBottom: '12px' }}>
                  {useInvestigationStore.getState().spiritBoxState.wordsHeard.map((word, index) => {
                    // Find the evidence entry for this word to get category
                    const evidenceEntry = useInvestigationStore.getState().evidence.find(
                      (e) => e.type === 'spiritbox' && e.data.word === word
                    );
                    const category = evidenceEntry?.data.wordCategory || 'unknown';
                    const categoryColor = 
                      category === 'unique' ? '#cc0000' :
                      category === 'personality' ? '#ff8800' :
                      '#666';
                    
                    return (
                      <div
                        key={`${word}-${index}`}
                        style={{
                          display: 'inline-block',
                          marginRight: '10px',
                          marginBottom: '8px',
                          padding: '6px 12px',
                          background: 'rgba(255, 255, 255, 0.6)',
                          border: `2px solid ${categoryColor}`,
                          borderRadius: '4px',
                          transform: `rotate(${(index % 3 - 1) * 1.5}deg)`,
                        }}
                      >
                        <HandwrittenText urgency="calm" fontSize="13px" color="#1a0f0a">
                          "{word}"
                        </HandwrittenText>
                        <TypewrittenText 
                          variant="faded" 
                          fontSize="9px" 
                          color={categoryColor}
                          style={{ 
                            marginTop: '2px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                          }}
                        >
                          {category}
                        </TypewrittenText>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <TypewrittenText variant="faded" fontSize="11px" color="#666" style={{ 
                  fontStyle: 'italic',
                  marginBottom: '12px',
                }}>
                  No Spirit Box responses recorded yet
                </TypewrittenText>
              )}

              {/* Response frequency pattern */}
              {useInvestigationStore.getState().evidence.filter(e => e.type === 'spiritbox').length > 0 && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgba(139, 69, 19, 0.2)' }}>
                  <HandwrittenText urgency="calm" fontSize="14px" color="#666" style={{ marginBottom: '8px' }}>
                    Response Pattern:
                  </HandwrittenText>
                  {(() => {
                    const spiritBoxEvidence = useInvestigationStore.getState().evidence.filter(e => e.type === 'spiritbox');
                    const totalQuestions = spiritBoxEvidence.length;
                    const responses = spiritBoxEvidence.filter(e => e.data.responded === true).length;
                    const responseRate = totalQuestions > 0 ? Math.round((responses / totalQuestions) * 100) : 0;
                    
                    // Determine personality hint based on response rate
                    let personalityHint = '';
                    let hintColor = '#666';
                    if (responseRate >= 70) {
                      personalityHint = 'High response rate → Aggressive personality';
                      hintColor = '#cc0000';
                    } else if (responseRate >= 50) {
                      personalityHint = 'Medium response rate → Chaotic personality';
                      hintColor = '#ff8800';
                    } else if (responseRate >= 30) {
                      personalityHint = 'Low response rate → Shy personality';
                      hintColor = '#8b7355';
                    } else {
                      personalityHint = 'Very low response rate → Shy personality';
                      hintColor = '#8b7355';
                    }
                    
                    return (
                      <>
                        <TypewrittenText variant="standard" fontSize="12px" color="#1a0f0a">
                          {responses}/{totalQuestions} responses ({responseRate}%)
                        </TypewrittenText>
                        <HandwrittenText urgency="calm" fontSize="12px" color={hintColor} style={{ 
                          marginTop: '6px',
                          fontStyle: 'italic',
                        }}>
                          {personalityHint}
                        </HandwrittenText>
                      </>
                    );
                  })()}
                </div>
              )}

              {/* Word category breakdown */}
              {useInvestigationStore.getState().spiritBoxState.wordsHeard.length > 0 && (
                <div style={{ marginTop: '12px', paddingTop: '12px', borderTop: '1px dashed rgba(139, 69, 19, 0.2)' }}>
                  <HandwrittenText urgency="calm" fontSize="14px" color="#666" style={{ marginBottom: '8px' }}>
                    Word Categories:
                  </HandwrittenText>
                  {(() => {
                    const spiritBoxEvidence = useInvestigationStore.getState().evidence.filter(
                      e => e.type === 'spiritbox' && e.data.wordCategory
                    );
                    const commonCount = spiritBoxEvidence.filter(e => e.data.wordCategory === 'common').length;
                    const personalityCount = spiritBoxEvidence.filter(e => e.data.wordCategory === 'personality').length;
                    const uniqueCount = spiritBoxEvidence.filter(e => e.data.wordCategory === 'unique').length;
                    
                    return (
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        <div style={{ 
                          padding: '6px 10px', 
                          background: 'rgba(102, 102, 102, 0.1)',
                          border: '1px solid #666',
                          borderRadius: '3px',
                        }}>
                          <TypewrittenText variant="standard" fontSize="11px" color="#666">
                            Common: {commonCount}
                          </TypewrittenText>
                        </div>
                        <div style={{ 
                          padding: '6px 10px', 
                          background: 'rgba(255, 136, 0, 0.1)',
                          border: '1px solid #ff8800',
                          borderRadius: '3px',
                        }}>
                          <TypewrittenText variant="standard" fontSize="11px" color="#ff8800">
                            Personality: {personalityCount}
                          </TypewrittenText>
                        </div>
                        <div style={{ 
                          padding: '6px 10px', 
                          background: 'rgba(204, 0, 0, 0.1)',
                          border: '1px solid #cc0000',
                          borderRadius: '3px',
                        }}>
                          <TypewrittenText variant="standard" fontSize="11px" color="#cc0000">
                            Unique: {uniqueCount}
                          </TypewrittenText>
                        </div>
                      </div>
                    );
                  })()}
                  
                  {/* Trickster hint if contradictory words detected */}
                  {(() => {
                    const spiritBoxEvidence = useInvestigationStore.getState().evidence.filter(
                      e => e.type === 'spiritbox' && e.data.wordCategory === 'personality'
                    );
                    
                    // Check if we have personality words from different categories
                    // This is a simplified check - in reality, we'd need to analyze the actual words
                    const personalityWords = spiritBoxEvidence.map(e => e.data.word || '');
                    const hasMultiplePersonalities = personalityWords.length >= 3;
                    
                    if (hasMultiplePersonalities) {
                      return (
                        <div style={{ 
                          marginTop: '10px',
                          padding: '8px 10px',
                          background: 'rgba(204, 0, 0, 0.05)',
                          border: '2px dashed #cc0000',
                          borderRadius: '4px',
                        }}>
                          <HandwrittenText urgency="urgent" fontSize="12px" color="#cc0000" style={{ 
                            fontStyle: 'italic',
                          }}>
                            ⚠️ Contradictory words detected - Could be Trickster!
                          </HandwrittenText>
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              )}
            </div>
          )}

          {/* Evidence Checklist Section */}
          <div style={{ marginBottom: '32px', position: 'relative' }}>
            <HandwrittenText urgency="calm" fontSize="18px" color="#1a0f0a" style={{ 
              marginBottom: '18px', 
              textDecoration: 'underline',
              fontWeight: 'bold',
            }}>
              Evidence Found:
            </HandwrittenText>
            
            {/* Spirit Box Personality - Checkboxes */}
            <div style={{ 
              marginBottom: '18px',
              paddingLeft: '8px',
              position: 'relative',
              transform: 'rotate(0.3deg)',
            }}>
              <HandwrittenText urgency="calm" fontSize="14px" color="#666" style={{ marginBottom: '8px' }}>
                Spirit Box Personality:
              </HandwrittenText>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {SPIRIT_BOX_PERSONALITY_OPTIONS.filter(opt => opt.value !== 'unknown').map((option) => {
                  const isChecked = evidenceChecklist.spiritBoxPersonality === option.value;
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleCheckboxToggle('spiritBoxPersonality', option.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        transform: 'rotate(-0.1deg)',
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid #1a0f0a',
                        borderRadius: '3px',
                        background: isChecked ? '#1a0f0a' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}>
                        {isChecked && (
                          <span style={{ 
                            color: '#f4f0e6', 
                            fontSize: '12px',
                            fontWeight: 'bold',
                            lineHeight: '1',
                          }}>✓</span>
                        )}
                      </div>
                      <HandwrittenText urgency={isChecked ? "urgent" : "calm"} fontSize="14px" color={isChecked ? '#1a0f0a' : '#666'}>
                        {option.label}
                      </HandwrittenText>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Whispers - Checkbox (simple present/ruled_out) */}
            <div 
              style={{ 
                marginBottom: '18px',
                paddingLeft: '32px',
                position: 'relative',
                transform: 'rotate(-0.2deg)',
                cursor: 'pointer',
              }}
              onClick={handleWhispersToggle}
            >
              {/* Checkbox */}
              <div style={{
                position: 'absolute',
                left: '0px',
                top: '2px',
                width: '20px',
                height: '20px',
                border: '2px solid #1a0f0a',
                borderRadius: '3px',
                background: evidenceChecklist.whispers === 'present' ? '#1a0f0a' : evidenceChecklist.whispers === 'ruled_out' ? '#8b0000' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}>
                {evidenceChecklist.whispers === 'present' && (
                  <span style={{ 
                    color: '#f4f0e6', 
                    fontSize: '14px',
                    fontWeight: 'bold',
                    lineHeight: '1',
                  }}>✓</span>
                )}
                {evidenceChecklist.whispers === 'ruled_out' && (
                  <span style={{ 
                    color: '#fff', 
                    fontSize: '16px',
                    fontWeight: 'bold',
                    lineHeight: '1',
                  }}>✗</span>
                )}
              </div>

              <HandwrittenText
                urgency={evidenceChecklist.whispers === 'present' ? "urgent" : "calm"}
                fontSize="16px"
                color={evidenceChecklist.whispers === 'present' ? '#1a0f0a' : evidenceChecklist.whispers === 'ruled_out' ? '#999' : '#666'}
                style={{ 
                  textDecoration: evidenceChecklist.whispers === 'ruled_out' ? 'line-through' : 'none',
                  opacity: evidenceChecklist.whispers === 'ruled_out' ? 0.5 : 1,
                }}
              >
                {TRAIT_LABELS.whispers}
              </HandwrittenText>
            </div>

            {/* Thermal Reading - Checkboxes */}
            <div style={{ 
              marginBottom: '18px',
              paddingLeft: '8px',
              position: 'relative',
              transform: 'rotate(0.4deg)',
            }}>
              <HandwrittenText urgency="calm" fontSize="14px" color="#666" style={{ marginBottom: '8px' }}>
                {TRAIT_LABELS.thermalReading}:
              </HandwrittenText>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {THERMAL_READING_OPTIONS.filter(opt => opt.value !== 'unknown').map((option) => {
                  const isChecked = evidenceChecklist.thermalReading === option.value;
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleCheckboxToggle('thermalReading', option.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        transform: 'rotate(0.1deg)',
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid #1a0f0a',
                        borderRadius: '3px',
                        background: isChecked ? '#1a0f0a' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}>
                        {isChecked && (
                          <span style={{ 
                            color: '#f4f0e6', 
                            fontSize: '12px',
                            fontWeight: 'bold',
                            lineHeight: '1',
                          }}>✓</span>
                        )}
                      </div>
                      <HandwrittenText urgency={isChecked ? "urgent" : "calm"} fontSize="14px" color={isChecked ? '#1a0f0a' : '#666'}>
                        {option.label}
                      </HandwrittenText>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Camera Manifestation - Checkboxes */}
            <div style={{ 
              marginBottom: '18px',
              paddingLeft: '8px',
              position: 'relative',
              transform: 'rotate(-0.3deg)',
            }}>
              <HandwrittenText urgency="calm" fontSize="14px" color="#666" style={{ marginBottom: '8px' }}>
                {TRAIT_LABELS.cameraManifestation}:
              </HandwrittenText>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {CAMERA_MANIFESTATION_OPTIONS.filter(opt => opt.value !== 'unknown').map((option) => {
                  const isChecked = evidenceChecklist.cameraManifestation === option.value;
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleCheckboxToggle('cameraManifestation', option.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        transform: 'rotate(-0.1deg)',
                      }}
                    >
                      <div style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid #1a0f0a',
                        borderRadius: '3px',
                        background: isChecked ? '#1a0f0a' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                      }}>
                        {isChecked && (
                          <span style={{ 
                            color: '#f4f0e6', 
                            fontSize: '12px',
                            fontWeight: 'bold',
                            lineHeight: '1',
                          }}>✓</span>
                        )}
                      </div>
                      <HandwrittenText urgency={isChecked ? "urgent" : "calm"} fontSize="14px" color={isChecked ? '#1a0f0a' : '#666'}>
                        {option.label}
                      </HandwrittenText>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Possible Ghosts Section - 3x3 Grid */}
          <div style={{
            background: 'rgba(255, 240, 230, 0.4)',
            padding: '20px 18px',
            border: '2px dashed rgba(139, 0, 0, 0.5)',
            marginBottom: '28px',
            transform: 'rotate(-1.2deg)',
            position: 'relative',
            boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.1)',
          }}>
            {/* Red marker circle in corner */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              width: '24px',
              height: '24px',
              border: '3px solid #cc0000',
              borderRadius: '50%',
              background: 'rgba(204, 0, 0, 0.1)',
            }} />

            <HandwrittenText urgency="urgent" fontSize="18px" color="#8b0000" style={{ 
              marginBottom: '16px', 
              textDecoration: 'underline',
              fontWeight: 'bold',
            }}>
              POSSIBLE GHOSTS ({possibleGhosts.length}):
            </HandwrittenText>
            
            {/* 3x3 Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
            }}>
              {allGhosts.map((ghost, i) => {
                const isSelected = selectedGhost === ghost.id;
                const isMatching = matchingGhosts.has(ghost.id);
                
                return (
                  <div 
                    key={ghost.id}
                    style={{
                      position: 'relative',
                      opacity: isMatching ? 1 : 0.6,
                    }}
                  >
                    {/* Cross-out effect for non-matching ghosts */}
                    {!isMatching && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '50%',
                          left: '0',
                          right: '0',
                          height: '2px',
                          background: 'linear-gradient(to right, transparent 0%, #1a0f0a 10%, #1a0f0a 90%, transparent 100%)',
                          transform: 'rotate(-15deg) translateY(-50%)',
                          pointerEvents: 'none',
                          zIndex: 1,
                        }}
                      />
                    )}
                    
                    <button
                      onClick={() => {
                        playButtonClick();
                        if (isMatching) {
                          setSelectedGhost(isSelected ? null : ghost.id);
                        }
                      }}
                      disabled={!isMatching}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        padding: '6px 4px',
                        cursor: isMatching ? 'pointer' : 'not-allowed',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        position: 'relative',
                        zIndex: 2,
                      }}
                    >
                      <div style={{
                        width: '16px',
                        height: '16px',
                        border: '2px solid',
                        borderColor: isSelected ? '#cc0000' : isMatching ? '#8b0000' : '#999',
                        backgroundColor: isSelected ? '#cc0000' : 'transparent',
                        flexShrink: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '2px',
                      }}>
                        {isSelected && (
                          <span style={{
                            color: '#fff',
                            fontSize: '12px',
                            lineHeight: '1',
                            fontWeight: 'bold',
                          }}>
                            ✓
                          </span>
                        )}
                      </div>
                      <HandwrittenText
                        urgency="urgent"
                        fontSize="14px"
                        color={isSelected ? '#cc0000' : isMatching ? '#8b0000' : '#999'}
                        style={{ 
                          fontWeight: isSelected ? 'bold' : 'normal',
                          textDecoration: !isMatching ? 'line-through' : 'none',
                          flex: 1,
                          textAlign: 'left',
                        }}
                      >
                        {ghost.name.toUpperCase()}
                      </HandwrittenText>
                    </button>
                  </div>
                );
              })}
            </div>
            
            {possibleGhosts.length === 0 && (
              <div style={{ marginTop: '16px' }}>
                <TypewrittenText variant="faded" fontSize="11px" color="#666" style={{ fontStyle: 'italic' }}>
                  No ghosts match this evidence combination.
                </TypewrittenText>
              </div>
            )}
          </div>


          {/* Identify Button - Handwritten style with damage */}
          <div style={{ position: 'relative' }}>
            {/* Small coffee stain near button */}
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '20px',
              width: '40px',
              height: '40px',
              background: 'radial-gradient(circle, rgba(139, 69, 19, 0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              transform: 'rotate(25deg)',
              pointerEvents: 'none',
            }} />
            
            <button 
              onClick={(e) => {
                playButtonClick();
                console.log('🔘 BUTTON CLICKED!', {
                  selectedGhost,
                  checkedCount,
                  disabled: !selectedGhost || checkedCount < 3,
                  event: e,
                });
                
                if (!selectedGhost) {
                  console.error('❌ No ghost selected!');
                  return;
                }
                
                console.log('🔍 EvidenceTab: Button clicked', {
                  selectedGhost,
                  selectedGhostType: typeof selectedGhost,
                  selectedGhostValue: selectedGhost?.toString(),
                });
                
                // Check correctness and calculate rewards in store
                const result = completeInvestigationStore(selectedGhost);
                
                console.log('🎯 EvidenceTab: Result from store', {
                  result,
                  isCorrect: result.isCorrect,
                  rewards: result.rewards,
                });
                
                // Set mode in context based on correctness from store
                // The store is the source of truth for the active ghost type
                const newMode = result.isCorrect ? 'success' : 'failure';
                console.log('🎯 EvidenceTab: Setting mode to', newMode);
                setMode(newMode);
                
                console.log('🎯 Ghost identified:', selectedGhost, 'Correct:', result.isCorrect);
                console.log('💰 Rewards:', result.rewards);
              }}
              disabled={!selectedGhost}
              style={{
                width: '100%',
                padding: '18px 16px',
                background: selectedGhost ? '#8b0000' : '#666',
                border: '3px solid #4a0000',
                borderRadius: '4px',
                fontFamily: '"Caveat", cursive',
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#fff',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                cursor: selectedGhost ? 'pointer' : 'not-allowed',
                boxShadow: 
                  selectedGhost 
                    ? '0 6px 16px rgba(139,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)'
                    : '0 2px 8px rgba(0,0,0,0.3)',
                transform: 'rotate(-0.8deg)',
                position: 'relative',
                transition: 'all 0.2s ease',
                opacity: selectedGhost ? 1 : 0.6,
              }}
              onMouseEnter={(e) => {
                if (selectedGhost) {
                  e.currentTarget.style.transform = 'rotate(-0.8deg) scale(1.02)';
                  e.currentTarget.style.boxShadow = 
                    '0 8px 20px rgba(139,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedGhost) {
                  e.currentTarget.style.transform = 'rotate(-0.8deg) scale(1)';
                  e.currentTarget.style.boxShadow = 
                    '0 6px 16px rgba(139,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1), inset 0 -2px 4px rgba(0,0,0,0.3)';
                }
              }}
            >
              {selectedGhost 
                ? `IDENTIFY: ${selectedGhost.toString().toUpperCase()}`
                : 'SELECT GHOST TO IDENTIFY'}
            </button>
          </div>

          {/* Footer note - Typewritten */}
          <div style={{ 
            marginTop: '24px', 
            textAlign: 'center',
            borderTop: '1px dashed rgba(0,0,0,0.2)',
            paddingTop: '16px',
          }}>
            <TypewrittenText variant="faded" fontSize="10px" color="#999">
              VERIFY ALL EVIDENCE BEFORE IDENTIFICATION
            </TypewrittenText>
          </div>
      </PaperBase>
    </div>
  );
}
