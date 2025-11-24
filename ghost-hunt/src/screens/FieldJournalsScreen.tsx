// Field Journals Screen - Heavy damage investigation logs with horror notes
import { useState, useEffect } from 'react';
import React from 'react';
import { EvidencePage } from '../components/analog/templates/EvidencePage';
import { HandwrittenText } from '../components/analog/elements/HandwrittenText';
import { TypewrittenText } from '../components/analog/elements/TypewrittenText';
import { PolaroidPhoto } from '../components/analog/elements/PolaroidPhoto';
import { OfficialStamp } from '../components/analog/elements/OfficialStamp';
import { Tape } from '../components/analog/base/Tape';
import { DamageOverlay } from '../components/analog/base/DamageOverlay';
import { BackToMapButton } from '../components/analog/elements/BackToMapButton';
import { useFieldJournals } from '../context/FieldJournalsContext';
import type { JournalEntry } from '../types/game';
import ghost1Image from '../assets/images/ghost1.png';
import ghost2Image from '../assets/images/ghost2.png';

export function FieldJournalsScreen() {
  const { collectedJournals } = useFieldJournals();
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(
    collectedJournals.length > 0 ? collectedJournals[0] : null
  );
  const [currentPage, setCurrentPage] = useState(0);
  
  // Update selected entry when journals change
  useEffect(() => {
    if (collectedJournals.length > 0 && (!selectedEntry || !collectedJournals.find(j => j.id === selectedEntry.id))) {
      setSelectedEntry(collectedJournals[0]);
      setCurrentPage(0);
    } else if (collectedJournals.length === 0) {
      setSelectedEntry(null);
    }
  }, [collectedJournals]);
  
  // If no journals collected, show empty state
  if (collectedJournals.length === 0) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#d8d4c8',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <BackToMapButton />
        <div style={{
          maxWidth: '600px',
          textAlign: 'center',
          fontFamily: '"Courier New", monospace',
          color: '#1a0f0a',
        }}>
          <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>No Field Journals Collected</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            Explore the map to find field journals left behind by previous agents.
            Collect them to read their investigation notes and learn from their experiences.
          </p>
        </div>
      </div>
    );
  }
  
  if (!selectedEntry) {
    return null;
  }
  
  // Split content into pages
  const getPages = (entry: JournalEntry) => {
    const pages: React.ReactNode[][] = [];
    let currentPageContent: React.ReactNode[] = [];
    
    // Page 1: Header info, status warning, date/location
    currentPageContent.push('header');
    if (entry.agentStatus === 'MISSING' || entry.agentStatus === 'DECEASED') {
      currentPageContent.push('status-warning');
    }
    currentPageContent.push('date-location');
    pages.push([...currentPageContent]);
    currentPageContent = [];
    
    // Page 2: Photos and evidence
    if (entry.photos && entry.photos.length > 0) {
      currentPageContent.push('photos');
    }
    currentPageContent.push('evidence-list');
    pages.push([...currentPageContent]);
    currentPageContent = [];
    
    // Page 3+: Field notes (split into chunks)
    const notesPerPage = 3; // Show 3 notes per page
    for (let i = 0; i < entry.notes.length; i += notesPerPage) {
      currentPageContent.push(`notes-${i}-${Math.min(i + notesPerPage, entry.notes.length)}`);
      pages.push([...currentPageContent]);
      currentPageContent = [];
    }
    
    // Last page: Final entry
    if (entry.finalEntry) {
      currentPageContent.push('final-entry');
      pages.push([...currentPageContent]);
    }
    
    return pages;
  };
  
  const pages = getPages(selectedEntry);
  
  // Reset to first page when entry changes
  useEffect(() => {
    setCurrentPage(0);
  }, [selectedEntry.id]);

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        height: 'auto',
        backgroundColor: '#0d0a08', // Dark background like InvestigationReportExample
        position: 'relative',
        overflowY: 'auto',
        overflowX: 'hidden',
        WebkitOverflowScrolling: 'touch',
        touchAction: 'pan-y',
      }}
    >
      <div style={{
        paddingTop: '20px',
        paddingBottom: '40px',
        paddingLeft: '16px',
        paddingRight: '16px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* Back to Map Button */}
        <div style={{ marginBottom: '20px' }}>
          <BackToMapButton />
        </div>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <HandwrittenText urgency="frantic" fontSize="36px" color="#8b0000">
            FIELD JOURNALS
          </HandwrittenText>
          <TypewrittenText variant="faded" fontSize="11px" style={{ marginTop: '-10px', color: '#999' }}>
            CURSED FILES - RECOVERED FROM FIELD - AGENT CASUALTIES
          </TypewrittenText>
        </div>

        {/* Journal Entry List */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          marginBottom: '32px',
        }}>
          {collectedJournals.map((entry) => (
            <button
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              style={{
                background: selectedEntry.id === entry.id ? '#d8d4c8' : '#c4b49a',
                border: selectedEntry.id === entry.id ? '2px solid #8b0000' : '1px solid #1a0f0a',
                padding: '12px 16px',
                fontFamily: '"Courier New", monospace',
                fontSize: '12px',
                color: '#1a0f0a',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                textAlign: 'left',
                transform: 'rotate(0.3deg)',
                boxShadow: selectedEntry.id === entry.id
                  ? '0 4px 12px rgba(0,0,0,0.4)'
                  : '0 2px 6px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div>{entry.date} - {entry.location}</div>
                  <div style={{ fontSize: '10px', color: '#666', fontStyle: 'italic' }}>
                    {entry.agentName} - {entry.agentStatus}
                  </div>
                </div>
                <span style={{
                  fontSize: '10px',
                  color: entry.threatLevel === 'EXTREME' ? '#cc0000' : entry.threatLevel === 'HIGH' ? '#8b0000' : '#1a0f0a',
                  fontWeight: 'bold',
                }}>
                  {entry.threatLevel}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Selected Journal Entry - EvidencePage with heavy damage (Paged) */}
        {pages.length > 0 && (
          <div style={{ position: 'relative', maxWidth: '100%' }}>
            {/* Pagination Controls - At the top */}
            {pages.length > 1 && (
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '24px',
                gap: '16px',
                maxWidth: window.innerWidth < 768 ? '100%' : '600px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  style={{
                    padding: '10px 20px',
                    background: currentPage === 0 ? '#6b5230' : '#8b6f47',
                    border: '2px solid #1a0f0a',
                    borderRadius: '4px',
                    color: '#f4f0e6',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === 0 ? 0.5 : 1,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 0) {
                      e.currentTarget.style.backgroundColor = '#a0826d';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 0) {
                      e.currentTarget.style.backgroundColor = '#8b6f47';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  ← Previous
                </button>
                
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '14px',
                  color: '#1a0f0a',
                  fontWeight: 'bold',
                  background: '#d8d4c8',
                  padding: '8px 16px',
                  border: '2px solid #1a0f0a',
                  borderRadius: '4px',
                }}>
                  Page {currentPage + 1} / {pages.length}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                  disabled={currentPage === pages.length - 1}
                  style={{
                    padding: '10px 20px',
                    background: currentPage === pages.length - 1 ? '#6b5230' : '#8b6f47',
                    border: '2px solid #1a0f0a',
                    borderRadius: '4px',
                    color: '#f4f0e6',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    cursor: currentPage === pages.length - 1 ? 'not-allowed' : 'pointer',
                    opacity: currentPage === pages.length - 1 ? 0.5 : 1,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== pages.length - 1) {
                      e.currentTarget.style.backgroundColor = '#a0826d';
                      e.currentTarget.style.transform = 'scale(1.05)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== pages.length - 1) {
                      e.currentTarget.style.backgroundColor = '#8b6f47';
                      e.currentTarget.style.transform = 'scale(1)';
                    }
                  }}
                >
                  Next →
                </button>
              </div>
            )}
            
            <div style={{
              maxWidth: window.innerWidth < 768 ? '100%' : '600px',
              margin: '0 auto',
            }}>
              <EvidencePage investigationId={selectedEntry.id + '-page-' + currentPage}>
              {/* Additional heavy damage for horror aesthetic */}
              <DamageOverlay type="water" opacity={0.3} seed={selectedEntry.id + '-water-' + currentPage} />
              {selectedEntry.threatLevel === 'EXTREME' && (
                <DamageOverlay type="blood" opacity={0.4} seed={selectedEntry.id + '-blood-main-' + currentPage} />
              )}
              
              {/* Urgent Stamp */}
              {currentPage === 0 && selectedEntry.threatLevel === 'EXTREME' && (
                <div style={{ position: 'relative', zIndex: 5 }}>
                  <OfficialStamp text="URGENT" color="red" seed={selectedEntry.id + '-stamp'} />
                </div>
              )}
              {currentPage === 0 && selectedEntry.threatLevel === 'HIGH' && (
                <div style={{ position: 'relative', zIndex: 5 }}>
                  <OfficialStamp text="DANGER" color="red" seed={selectedEntry.id + '-stamp'} />
                </div>
              )}


              {/* Page 1: Header info, status warning, date/location */}
              {currentPage === 0 && (
                <>
                  {/* Agent Status Warning */}
                  {(selectedEntry.agentStatus === 'MISSING' || selectedEntry.agentStatus === 'DECEASED') && (
                    <div style={{
                      background: 'rgba(139, 0, 0, 0.3)',
                      border: '3px dashed #8b0000',
                      padding: '16px',
                      marginBottom: '24px',
                      transform: 'rotate(-1.5deg)',
                      position: 'relative',
                    }}>
                      <DamageOverlay type="blood" opacity={0.4} seed={selectedEntry.id + '-status-warning'} />
                      <HandwrittenText urgency="frantic" fontSize="20px" color="#cc0000">
                        ⚠️ AGENT STATUS: {selectedEntry.agentStatus} ⚠️{'\n'}
                        FILE RECOVERED FROM FIELD - HANDLE WITH CAUTION
                      </HandwrittenText>
                    </div>
                  )}

                  {/* Date and Location - Typewriter */}
                  <div style={{ marginBottom: '24px' }}>
                    <TypewrittenText variant="carbon" fontSize="16px" style={{ marginBottom: '8px' }}>
                      DATE: {selectedEntry.date}
                    </TypewrittenText>
                    <TypewrittenText variant="carbon" fontSize="16px" style={{ marginBottom: '8px' }}>
                      LOCATION: {selectedEntry.location}
                    </TypewrittenText>
                    <TypewrittenText variant="carbon" fontSize="16px" style={{ marginBottom: '8px' }}>
                      INVESTIGATOR: {selectedEntry.agentName}
                    </TypewrittenText>
                    <TypewrittenText
                      variant="carbon"
                      fontSize="14px"
                      color={selectedEntry.agentStatus === 'DECEASED' ? '#cc0000' : selectedEntry.agentStatus === 'MISSING' ? '#8b0000' : '#1a0f0a'}
                      style={{ marginBottom: '8px' }}
                    >
                      STATUS: {selectedEntry.agentStatus}
                    </TypewrittenText>
                    <TypewrittenText
                      variant="carbon"
                      fontSize="14px"
                      color={selectedEntry.threatLevel === 'EXTREME' ? '#cc0000' : selectedEntry.threatLevel === 'HIGH' ? '#8b0000' : '#1a0f0a'}
                    >
                      THREAT LEVEL: {selectedEntry.threatLevel}
                    </TypewrittenText>
                  </div>
                </>
              )}

              {/* Page 2: Photos and evidence */}
              {currentPage === 1 && (
                <>
                  {/* Evidence Photos */}
                  {selectedEntry.photos && selectedEntry.photos.length > 0 && (
                    <div style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '16px',
                      marginBottom: '24px',
                      justifyContent: 'center',
                    }}>
                      {selectedEntry.photos.map((photo, index) => (
                        <div key={index} style={{ position: 'relative' }}>
                          <Tape position="top" size="medium" seed={selectedEntry.id + '-tape-' + index} />
                          <PolaroidPhoto
                            src={photo}
                            caption={`Evidence ${index + 1}`}
                            damage="heavy"
                            seed={selectedEntry.id + '-photo-' + index}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Evidence List */}
                  <div style={{
                    background: 'rgba(0,0,0,0.1)',
                    padding: '16px',
                    border: '2px solid rgba(0,0,0,0.2)',
                    marginBottom: '24px',
                    transform: 'rotate(-0.5deg)',
                    width: '100%',
                    maxWidth: '100%',
                    wordWrap: 'break-word',
                    overflowWrap: 'break-word',
                  }}>
                    <TypewrittenText variant="carbon" fontSize="14px" style={{ marginBottom: '12px' }}>
                      EVIDENCE COLLECTED:
                    </TypewrittenText>
                    {selectedEntry.evidence.map((ev, index) => (
                      <HandwrittenText
                        key={index}
                        urgency="calm"
                        fontSize="16px"
                        color="#4a0000"
                        style={{ marginBottom: '8px', paddingLeft: '20px' }}
                      >
                        • {ev}
                      </HandwrittenText>
                    ))}
                  </div>
                </>
              )}

              {/* Pages 3+: Field Notes */}
              {currentPage >= 2 && currentPage < pages.length - (selectedEntry.finalEntry ? 1 : 0) && (
                <div style={{ marginBottom: '24px' }}>
                  {currentPage === 2 && (
                    <TypewrittenText variant="carbon" fontSize="14px" style={{ marginBottom: '16px' }}>
                      FIELD NOTES - INVESTIGATION LOG:
                    </TypewrittenText>
                  )}
                  {(() => {
                    const notesStartIndex = (currentPage - 2) * 3;
                    const notesEndIndex = Math.min(notesStartIndex + 3, selectedEntry.notes.length);
                    const timestamps = selectedEntry.id === 'journal-001' 
                      ? ['21:30', '21:45', '22:15', '22:30', '22:47', '23:00', '23:30', '23:45']
                      : selectedEntry.id === 'journal-002'
                      ? ['23:45', '00:12', '00:18', '00:32', '00:45', '00:51', '01:03', '01:15']
                      : ['20:00', '20:30', '21:15', '21:45', '22:20', '22:50', '23:10'];
                    
                    return selectedEntry.notes.slice(notesStartIndex, notesEndIndex).map((note, relativeIndex) => {
                      const index = notesStartIndex + relativeIndex;
                      const urgency = selectedEntry.threatLevel === 'EXTREME' ? 'frantic' : selectedEntry.threatLevel === 'HIGH' ? 'urgent' : selectedEntry.agentStatus === 'DECEASED' ? 'frantic' : 'calm';
                      const timestamp = timestamps[index] || `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;
                      
                      return (
                        <div key={index} style={{ 
                          marginBottom: '18px',
                          position: 'relative',
                          transform: `rotate(${index % 2 === 0 ? -0.5 : 0.5}deg)`,
                          width: '100%',
                          maxWidth: '100%',
                          wordWrap: 'break-word',
                          overflowWrap: 'break-word',
                        }}>
                          <HandwrittenText
                            urgency={urgency}
                            fontSize={urgency === 'frantic' ? '22px' : urgency === 'urgent' ? '20px' : '18px'}
                            style={{ marginBottom: 0 }}
                          >
                            <span style={{ fontWeight: 'bold' }}>{timestamp}</span> - {note}
                          </HandwrittenText>
                          {/* Add blood smear for deceased agents on certain entries */}
                          {selectedEntry.agentStatus === 'DECEASED' && index >= selectedEntry.notes.length - 2 && (
                            <div style={{ position: 'absolute', top: '30%', left: 0, right: 0, height: '40%' }}>
                              <DamageOverlay type="blood" opacity={0.25} seed={selectedEntry.id + '-note-blood-' + index} />
                            </div>
                          )}
                        </div>
                      );
                    });
                  })()}
                </div>
              )}

              {/* Last page: Final Entry */}
              {currentPage === pages.length - 1 && selectedEntry.finalEntry && (
                <div style={{
                  background: selectedEntry.agentStatus === 'DECEASED' 
                    ? 'rgba(139, 0, 0, 0.3)' 
                    : selectedEntry.agentStatus === 'MISSING'
                    ? 'rgba(139, 69, 19, 0.25)'
                    : 'rgba(0, 0, 0, 0.15)',
                  border: '3px dashed #8b0000',
                  padding: '20px',
                  marginTop: '24px',
                  transform: 'rotate(-2deg)',
                  position: 'relative',
                  width: '100%',
                  maxWidth: '100%',
                  wordWrap: 'break-word',
                  overflowWrap: 'break-word',
                }}>
                  <DamageOverlay 
                    type={selectedEntry.agentStatus === 'DECEASED' ? 'blood' : 'ink'} 
                    opacity={selectedEntry.agentStatus === 'DECEASED' ? 0.4 : 0.3} 
                    seed={selectedEntry.id + '-final-entry'} 
                  />
                  <TypewrittenText variant="carbon" fontSize="14px" style={{ marginBottom: '12px', fontWeight: 'bold' }}>
                    FINAL ENTRY / FILE RECOVERY NOTE:
                  </TypewrittenText>
                  <HandwrittenText 
                    urgency={selectedEntry.agentStatus === 'DECEASED' ? 'frantic' : 'urgent'} 
                    fontSize={selectedEntry.agentStatus === 'DECEASED' ? '22px' : '20px'}
                    color={selectedEntry.agentStatus === 'DECEASED' ? '#cc0000' : '#8b0000'}
                  >
                    {selectedEntry.finalEntry}
                  </HandwrittenText>
                </div>
              )}
              </EvidencePage>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

