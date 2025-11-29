// Journal Reading Modal - Full reading interface when journal is collected
import React, { useState } from 'react';
import { EvidencePage } from './analog/templates/EvidencePage';
import { HandwrittenText } from './analog/elements/HandwrittenText';
import { TypewrittenText } from './analog/elements/TypewrittenText';
import { PolaroidPhoto } from './analog/elements/PolaroidPhoto';
import { OfficialStamp } from './analog/elements/OfficialStamp';
import { DamageOverlay } from './analog/base/DamageOverlay';
import type { JournalEntry } from '../types/game';

interface JournalReadingModalProps {
  journal: JournalEntry;
  onClose: () => void;
  onAddToCollection: () => void;
}

export function JournalReadingModal({ journal, onClose, onAddToCollection }: JournalReadingModalProps) {
  const [currentPage, setCurrentPage] = useState(0);
  
  // Split content into pages (similar to FieldJournalsScreen)
  const getPages = (entry: JournalEntry) => {
    const pages: string[][] = [];
    let currentPageContent: string[] = [];
    
    // Page 1: Header info
    currentPageContent.push('header');
    if (entry.agentStatus === 'MISSING' || entry.agentStatus === 'DECEASED') {
      currentPageContent.push('status-warning');
    }
    currentPageContent.push('date-location');
    pages.push([...currentPageContent]);
    currentPageContent = [];
    
    // Notes pages (3 notes per page)
    for (let i = 0; i < entry.notes.length; i += 3) {
      pages.push(['notes']);
    }
    
    // Evidence page
    if (entry.evidence.length > 0 || entry.photos) {
      pages.push(['evidence']);
    }
    
    // Final entry page
    if (entry.finalEntry) {
      pages.push(['final']);
    }
    
    return pages;
  };
  
  const pages = getPages(journal);
  const notesPerPage = 3;
  
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        zIndex: 10000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: '900px',
          width: '100%',
          maxHeight: '90vh',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '-50px',
            right: '0',
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            backgroundColor: '#8b0000',
            color: '#f4f0e6',
            border: '2px solid #1a0f0a',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'monospace',
            zIndex: 10001,
          }}
        >
          ✕
        </button>
        
        {/* Journal Content */}
        <div style={{
          maxWidth: window.innerWidth < 768 ? '100%' : '600px',
          margin: '0 auto',
        }}>
          <EvidencePage investigationId={journal.id + '-reading-' + currentPage}>
            {/* Page 1: Header */}
            {currentPage === 0 && (
              <>
                <HandwrittenText urgency="frantic" fontSize="32px" color="#8b0000" style={{ marginBottom: '16px' }}>
                  FIELD JOURNAL
                </HandwrittenText>
                
                {journal.agentStatus === 'MISSING' && (
                  <div style={{
                    background: 'rgba(139, 69, 19, 0.4)',
                    border: '3px dashed #8b0000',
                    padding: '12px',
                    marginBottom: '16px',
                    transform: 'rotate(-1deg)',
                  }}>
                    <HandwrittenText urgency="frantic" fontSize="20px" color="#cc0000">
                      ⚠ AGENT MISSING ⚠
                    </HandwrittenText>
                  </div>
                )}
                
                {journal.agentStatus === 'DECEASED' && (
                  <div style={{
                    background: 'rgba(139, 0, 0, 0.5)',
                    border: '3px dashed #cc0000',
                    padding: '12px',
                    marginBottom: '16px',
                    transform: 'rotate(1deg)',
                  }}>
                    <HandwrittenText urgency="frantic" fontSize="20px" color="#cc0000">
                      ⚠ AGENT DECEASED ⚠
                    </HandwrittenText>
                  </div>
                )}
                
                <TypewrittenText variant="carbon" fontSize="14px" style={{ marginBottom: '8px' }}>
                  LOCATION: {journal.location}
                </TypewrittenText>
                <TypewrittenText variant="carbon" fontSize="12px" style={{ marginBottom: '8px' }}>
                  AGENT: {journal.agentName}
                </TypewrittenText>
                <TypewrittenText variant="carbon" fontSize="12px" style={{ marginBottom: '16px' }}>
                  DATE: {journal.date} | THREAT: {journal.threatLevel}
                </TypewrittenText>
                
                {journal.threatLevel === 'EXTREME' && (
                  <OfficialStamp text="EXTREME THREAT" color="red" seed={journal.id + '-stamp'} />
                )}
              </>
            )}
            
            {/* Notes pages */}
            {currentPage > 0 && currentPage < pages.length - (journal.finalEntry ? 2 : 1) && (
              <div>
                {(() => {
                  const notesStartIndex = (currentPage - 1) * notesPerPage;
                  const notesEndIndex = Math.min(notesStartIndex + notesPerPage, journal.notes.length);
                  
                  return journal.notes.slice(notesStartIndex, notesEndIndex).map((note, relativeIndex) => {
                    const index = notesStartIndex + relativeIndex;
                    return (
                      <div key={index} style={{ marginBottom: '20px' }}>
                        <HandwrittenText 
                          urgency={journal.agentStatus === 'DECEASED' ? 'frantic' : 'urgent'} 
                          fontSize="16px"
                          color={journal.agentStatus === 'DECEASED' ? '#8b0000' : '#1a0f0a'}
                        >
                          {note}
                        </HandwrittenText>
                      </div>
                    );
                  });
                })()}
              </div>
            )}
            
            {/* Evidence page */}
            {currentPage === pages.length - (journal.finalEntry ? 2 : 1) && (
              <div>
                <TypewrittenText variant="carbon" fontSize="18px" style={{ marginBottom: '16px', fontWeight: 'bold' }}>
                  EVIDENCE COLLECTED:
                </TypewrittenText>
                {journal.evidence.map((ev, idx) => (
                  <TypewrittenText key={idx} variant="carbon" fontSize="14px" style={{ marginBottom: '8px' }}>
                    ✓ {ev}
                  </TypewrittenText>
                ))}
                {journal.photos && journal.photos.length > 0 && (
                  <div style={{ marginTop: '20px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {journal.photos.map((photo, idx) => (
                      <PolaroidPhoto key={idx} src={photo} caption="Evidence" seed={journal.id + '-photo-' + idx} />
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Final entry page */}
            {currentPage === pages.length - 1 && journal.finalEntry && (
              <div style={{
                background: journal.agentStatus === 'DECEASED' 
                  ? 'rgba(139, 0, 0, 0.3)' 
                  : journal.agentStatus === 'MISSING'
                  ? 'rgba(139, 69, 19, 0.25)'
                  : 'rgba(0, 0, 0, 0.15)',
                border: '3px dashed #8b0000',
                padding: '20px',
                marginTop: '24px',
                transform: 'rotate(-2deg)',
                position: 'relative',
              }}>
                <DamageOverlay 
                  type={journal.agentStatus === 'DECEASED' ? 'blood' : 'ink'} 
                  opacity={journal.agentStatus === 'DECEASED' ? 0.4 : 0.3} 
                  seed={journal.id + '-final-entry'} 
                />
                <TypewrittenText variant="carbon" fontSize="14px" style={{ marginBottom: '12px', fontWeight: 'bold' }}>
                  FINAL ENTRY / FILE RECOVERY NOTE:
                </TypewrittenText>
                <HandwrittenText 
                  urgency={journal.agentStatus === 'DECEASED' ? 'frantic' : 'urgent'} 
                  fontSize={journal.agentStatus === 'DECEASED' ? '22px' : '20px'}
                  color={journal.agentStatus === 'DECEASED' ? '#cc0000' : '#8b0000'}
                >
                  {journal.finalEntry}
                </HandwrittenText>
              </div>
            )}
          </EvidencePage>
          
          {/* Pagination */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '24px',
            gap: '16px',
          }}>
            <button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              style={{
                padding: '10px 20px',
                backgroundColor: currentPage === 0 ? '#ccc' : '#8b6f47',
                color: '#f4f0e6',
                border: '2px solid #1a0f0a',
                borderRadius: '4px',
                fontFamily: '"Courier New", monospace',
                fontSize: '14px',
                fontWeight: 'bold',
                cursor: currentPage === 0 ? 'not-allowed' : 'pointer',
                opacity: currentPage === 0 ? 0.5 : 1,
              }}
            >
              ← Previous
            </button>
            
            <span style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              color: '#1a0f0a',
            }}>
              Page {currentPage + 1} of {pages.length}
            </span>
            
            {currentPage === pages.length - 1 ? (
              <button
                onClick={() => {
                  // Add to collection first
                  onAddToCollection();
                  // Close modal after collection
                  setTimeout(() => {
                    onClose();
                  }, 200);
                }}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#8b0000',
                  color: '#f4f0e6',
                  border: '2px solid #1a0f0a',
                  borderRadius: '4px',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Close & Save to Collection ✓
              </button>
            ) : (
              <button
                onClick={() => setCurrentPage(Math.min(pages.length - 1, currentPage + 1))}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#8b6f47',
                  color: '#f4f0e6',
                  border: '2px solid #1a0f0a',
                  borderRadius: '4px',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                }}
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

