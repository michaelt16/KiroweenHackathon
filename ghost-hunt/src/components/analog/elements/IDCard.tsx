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

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const cardWidth = isMobile ? '280px' : '320px';
  const cardPadding = isMobile ? '16px' : '20px';
  
  return (
    <div style={{
      position: 'relative',
      width: cardWidth,
      maxWidth: '100%',
      background: '#f4f0e6',
      border: '3px solid #2a2520',
      borderRadius: '8px',
      padding: cardPadding,
      transform: `rotate(${rotation}deg)`,
      boxShadow: 
        '0 12px 30px rgba(0,0,0,0.7), ' +
        '0 4px 8px rgba(0,0,0,0.4), ' +
        'inset 0 0 0 1px rgba(255,255,255,0.3), ' +
        '0 0 20px rgba(255,255,255,0.1)',
      overflow: 'hidden',
    }}>
      {/* Laminated gloss overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.2) 100%)',
        pointerEvents: 'none',
        zIndex: 10,
        borderRadius: '5px',
      }} />
      {/* Shine effect */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        left: '-50%',
        width: '200%',
        height: '200%',
        background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
        transform: 'rotate(45deg)',
        pointerEvents: 'none',
        zIndex: 11,
        animation: 'shimmer 3s ease-in-out infinite',
      }} />
      {/* Reflective edge highlights */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
        pointerEvents: 'none',
        zIndex: 12,
      }} />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '2px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.5), transparent)',
        pointerEvents: 'none',
        zIndex: 12,
      }} />
      {/* Header stripe */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: isMobile ? '35px' : '40px',
        background: 'linear-gradient(135deg, #8b0000 0%, #4a0000 100%)',
        borderRadius: '5px 5px 0 0',
      }}>
        <div style={{
          fontFamily: 'Impact, sans-serif',
          fontSize: isMobile ? '14px' : '16px',
          color: '#f4f0e6',
          textAlign: 'center',
          paddingTop: isMobile ? '8px' : '10px',
          letterSpacing: isMobile ? '2px' : '2.5px',
        }}>
          PARANORMAL INVESTIGATOR
        </div>
      </div>

      {/* Content area */}
      <div style={{ marginTop: isMobile ? '30px' : '35px' }}>
        {/* Photo and basic info */}
        <div style={{
          display: 'flex',
          gap: isMobile ? '12px' : '16px',
          marginBottom: isMobile ? '12px' : '16px',
        }}>
          {/* Agent photo */}
          <div style={{
            width: isMobile ? '80px' : '100px',
            height: isMobile ? '95px' : '120px',
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
              fontSize: isMobile ? '9px' : '11px',
              color: '#666',
              marginBottom: '4px',
            }}>
              AGENT NAME:
            </div>
            <div style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: isMobile ? '16px' : '18px',
              color: '#1a0f0a',
              marginBottom: isMobile ? '10px' : '12px',
              letterSpacing: '1px',
            }}>
              {agentName}
            </div>

            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: isMobile ? '9px' : '11px',
              color: '#666',
              marginBottom: '4px',
            }}>
              ID NUMBER:
            </div>
            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: isMobile ? '13px' : '14px',
              color: '#1a0f0a',
              marginBottom: isMobile ? '10px' : '12px',
              fontWeight: 'bold',
            }}>
              {agentId}
            </div>

            <div style={{
              fontFamily: '"Courier New", monospace',
              fontSize: isMobile ? '9px' : '11px',
              color: '#666',
              marginBottom: '4px',
            }}>
              RANK:
            </div>
            <div style={{
              fontFamily: 'Impact, sans-serif',
              fontSize: isMobile ? '14px' : '16px',
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
          padding: isMobile ? '6px' : '8px',
          marginBottom: isMobile ? '12px' : '16px',
          textAlign: 'center',
        }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: isMobile ? '9px' : '11px',
            color: '#1a0f0a',
            marginBottom: '2px',
          }}>
            CLEARANCE LEVEL
          </div>
          <div style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: isMobile ? '24px' : '28px',
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
            paddingTop: isMobile ? '10px' : '12px',
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: isMobile ? '8px' : '10px',
            }}>
              <div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '9px' : '10px',
                  color: '#666',
                }}>
                  INVESTIGATIONS:
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#1a0f0a',
                  fontWeight: 'bold',
                }}>
                  {stats.investigations}
                </div>
              </div>

              <div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '9px' : '10px',
                  color: '#666',
                }}>
                  GHOSTS CAUGHT:
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '14px' : '16px',
                  color: '#1a0f0a',
                  fontWeight: 'bold',
                }}>
                  {stats.ghostsCaught}
                </div>
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '9px' : '10px',
                  color: '#666',
                }}>
                  SUCCESS RATE:
                </div>
                <div style={{
                  fontFamily: '"Courier New", monospace',
                  fontSize: isMobile ? '14px' : '16px',
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
          marginTop: isMobile ? '12px' : '16px',
          height: isMobile ? '30px' : '35px',
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
        fontSize: isMobile ? '50px' : '60px',
        color: 'rgba(139, 0, 0, 0.05)',
        letterSpacing: isMobile ? '6px' : '8px',
        pointerEvents: 'none',
      }}>
        OFFICIAL
      </div>
    </div>
  );
}
