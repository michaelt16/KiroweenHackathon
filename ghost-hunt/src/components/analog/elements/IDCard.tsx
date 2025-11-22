import React from 'react';
import { getDamageVariant } from '../utils/randomization';

interface IDCardProps {
  agentName: string;
  agentId: string;
  rank: string;
  level: number;
  photoUrl: string;
  stats?: {
    investigations: number;
    ghostsCaught: number;
    successRate: number;
  };
  seed?: string | number;
}

/**
 * IDCard Component - Official agent identification card
 * Purpose: Player profile display
 */
export function IDCard({ 
  agentName, 
  agentId, 
  rank, 
  level,
  photoUrl,
  stats,
  seed = Date.now() 
}: IDCardProps) {
  const rotations = [-2, -1, 0, 1, 2];
  const rotation = rotations[getDamageVariant(seed, rotations.length)];

  return (
    <div style={{
      position: 'relative',
      width: '400px',
      background: '#f4f0e6',
      border: '3px solid #2a2520',
      borderRadius: '8px',
      padding: '25px',
      transform: `rotate(${rotation}deg)`,
      boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
    }}>
      {/* Header stripe */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '50px',
        background: 'linear-gradient(135deg, #8b0000 0%, #4a0000 100%)',
        borderRadius: '5px 5px 0 0',
      }}>
        <div style={{
          fontFamily: 'Impact, sans-serif',
          fontSize: '20px',
          color: '#f4f0e6',
          textAlign: 'center',
          paddingTop: '12px',
          letterSpacing: '3px',
        }}>
          PARANORMAL INVESTIGATOR
        </div>
      </div>

      {/* Content area */}
      <div style={{ marginTop: '40px' }}>
        {/* Photo and basic info */}
        <div style={{
          display: 'flex',
          gap: '20px',
          marginBottom: '20px',
        }}>
          {/* Agent photo */}
          <div style={{
            width: '120px',
            height: '140px',
            border: '3px solid #2a2520',
            background: '#1a1a1a',
            overflow: 'hidden',
          }}>
            <img 
              src={photoUrl}
              alt="Agent"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {/* Agent details */}
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              color: '#666',
              marginBottom: '5px',
            }}>
              AGENT NAME:
            </div>
            <div style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '22px',
              color: '#1a0f0a',
              marginBottom: '15px',
              letterSpacing: '1px',
            }}>
              {agentName}
            </div>

            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              color: '#666',
              marginBottom: '5px',
            }}>
              ID NUMBER:
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '16px',
              color: '#1a0f0a',
              marginBottom: '15px',
              fontWeight: 'bold',
            }}>
              {agentId}
            </div>

            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              color: '#666',
              marginBottom: '5px',
            }}>
              RANK:
            </div>
            <div style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: '18px',
              color: '#8b0000',
              letterSpacing: '1px',
            }}>
              {rank}
            </div>
          </div>
        </div>

        {/* Level badge */}
        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          border: '2px solid #92400e',
          borderRadius: '4px',
          padding: '10px',
          marginBottom: '20px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            color: '#1a0f0a',
            marginBottom: '3px',
          }}>
            CLEARANCE LEVEL
          </div>
          <div style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '32px',
            color: '#1a0f0a',
            letterSpacing: '2px',
          }}>
            {level}
          </div>
        </div>

        {/* Stats section */}
        {stats && (
          <div style={{
            borderTop: '2px solid #2a2520',
            paddingTop: '15px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}>
              <div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  color: '#666',
                }}>
                  INVESTIGATIONS:
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '18px',
                  color: '#1a0f0a',
                  fontWeight: 'bold',
                }}>
                  {stats.investigations}
                </div>
              </div>

              <div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  color: '#666',
                }}>
                  GHOSTS CAUGHT:
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '18px',
                  color: '#1a0f0a',
                  fontWeight: 'bold',
                }}>
                  {stats.ghostsCaught}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  color: '#666',
                }}>
                  SUCCESS RATE:
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: '18px',
                  color: stats.successRate >= 75 ? '#22c55e' : stats.successRate >= 50 ? '#f59e0b' : '#dc2626',
                  fontWeight: 'bold',
                }}>
                  {stats.successRate}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Barcode */}
        <div style={{
          marginTop: '20px',
          height: '40px',
          background: 'repeating-linear-gradient(90deg, #1a0f0a 0px, #1a0f0a 2px, transparent 2px, transparent 4px)',
          opacity: 0.8,
        }} />
      </div>

      {/* Watermark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(-45deg)',
        fontFamily: 'Impact, sans-serif',
        fontSize: '80px',
        color: 'rgba(139, 0, 0, 0.05)',
        letterSpacing: '10px',
        pointerEvents: 'none',
      }}>
        OFFICIAL
      </div>
    </div>
  );
}
