import { useEffect, useState } from 'react';
import { getDamageVariant } from '../utils/randomization';
import pfp from '../../../assets/images/agent/pfp.png';

interface HorizontalIDCardProps {
  agentName?: string;
  agentId?: string;
  rank?: string;
  level?: number;
  photoUrl?: string;
  seed?: string | number;
}

/**
 * HorizontalIDCard Component - Compact horizontal ID card for status bar
 * Purpose: Display agent info in top status bar
 */
export function HorizontalIDCard({ 
  agentName: propAgentName,
  agentId = 'PI-0001-A',
  rank = 'ROOKIE',
  level = 1,
  photoUrl: propPhotoUrl,
  seed = Date.now() 
}: HorizontalIDCardProps) {
  const [agentName, setAgentName] = useState(() => {
    const saved = localStorage.getItem('agentName');
    return propAgentName || saved || 'AGENT_001';
  });
  const [photoUrl, setPhotoUrl] = useState(() => {
    const saved = localStorage.getItem('agentPhoto');
    return propPhotoUrl || saved || pfp;
  });

  useEffect(() => {
    const updateData = () => {
      const savedName = localStorage.getItem('agentName');
      const savedPhoto = localStorage.getItem('agentPhoto');
      if (savedName) setAgentName(savedName);
      if (savedPhoto) setPhotoUrl(savedPhoto);
    };
    
    // Initial load
    updateData();
    
    // Listen for storage changes
    window.addEventListener('storage', updateData);
    
    // Listen for custom events (for same-window updates)
    window.addEventListener('agentNameUpdated', updateData);
    window.addEventListener('agentPhotoUpdated', updateData);
    
    return () => {
      window.removeEventListener('storage', updateData);
      window.removeEventListener('agentNameUpdated', updateData);
      window.removeEventListener('agentPhotoUpdated', updateData);
    };
  }, []);
  const rotations = [-0.5, -0.3, 0, 0.3, 0.5];
  const rotation = rotations[getDamageVariant(seed, rotations.length)];

  return (
    <div style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: '6px',
      background: '#f4f0e6',
      border: '2px solid #2a2520',
      borderRadius: '4px',
      padding: '3px 6px',
      transform: `rotate(${rotation}deg)`,
      boxShadow: '0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.3)',
      width: '140px',
      height: '36px',
    }}>
      {/* Left stripe - Red header */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '4px',
        background: 'linear-gradient(180deg, #8b0000 0%, #4a0000 100%)',
        borderRadius: '4px 0 0 4px',
      }} />

      {/* Photo */}
      <div style={{
        width: '28px',
        height: '28px',
        border: '1px solid #2a2520',
        background: '#1a1a1a',
        overflow: 'hidden',
        borderRadius: '2px',
        flexShrink: 0,
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

      {/* Info */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 0,
      }}>
        {/* Name and Level */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '4px',
          marginBottom: '1px',
        }}>
          <div style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '9px',
            color: '#1a0f0a',
            letterSpacing: '0.3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '60px',
          }}>
            {agentName}
          </div>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '8px',
            color: '#666',
            fontWeight: 'bold',
          }}>
            L{level}
          </div>
        </div>

        {/* ID and Rank */}
        <div style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: '4px',
        }}>
          <div style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '6px',
            color: '#666',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '50px',
          }}>
            {agentId}
          </div>
          <div style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '7px',
            color: '#8b0000',
            letterSpacing: '0.3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '50px',
          }}>
            {rank}
          </div>
        </div>
      </div>
    </div>
  );
}

