import { PaperBase } from '../analog/base/PaperBase';
import { DamageOverlay } from '../analog/base/DamageOverlay';
import { HandwrittenText } from '../analog/elements/HandwrittenText';
import { TypewrittenText } from '../analog/elements/TypewrittenText';
import { OfficialStamp } from '../analog/elements/OfficialStamp';
import { Tape } from '../analog/base/Tape';
import './ProfileBadge.css';

interface ProfileBadgeProps {
  username?: string;
  rank?: string;
  level?: number;
  xp?: number;
  xpToNextLevel?: number;
  investigationsCompleted?: number;
  ghostsCaught?: number;
  successRate?: number;
}

export function ProfileBadge({
  username = 'AGENT_001',
  rank = 'ROOKIE',
  level = 1,
  xp = 0,
  xpToNextLevel = 100,
  investigationsCompleted = 0,
  ghostsCaught = 0,
  successRate = 0,
}: ProfileBadgeProps) {
  const xpPercentage = (xp / xpToNextLevel) * 100;
  const seed = username;

  return (
    <PaperBase variant="clean" seed={seed} style={{ position: 'relative' }}>
      {/* Damage elements - ID badge wear */}
      <DamageOverlay type="fingerprint" opacity={0.2} seed={seed} />
      <DamageOverlay type="ink" opacity={0.15} seed={seed + '-ink'} />
      
      {/* Official Stamp */}
      <OfficialStamp text="CLASSIFIED" color="red" seed={seed} />
      <Tape position="top-right" size="medium" seed={seed} />

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '20px', borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
        <TypewrittenText variant="carbon" fontSize="18px" style={{ marginBottom: '8px' }}>
          INVESTIGATOR ID
        </TypewrittenText>
        <TypewrittenText variant="faded" fontSize="11px">
          CLEARANCE: LEVEL {level}
        </TypewrittenText>
      </div>

      {/* Avatar - Simple ID photo style */}
      <div style={{
        width: '140px',
        height: '140px',
        margin: '0 auto 24px',
        border: '3px solid #1a0f0a',
        background: '#e8e4dc',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: 'rotate(0.5deg)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}>
        <div style={{
          fontSize: '64px',
          color: '#1a0f0a',
          opacity: 0.6,
        }}>👤</div>
      </div>

      {/* User Info */}
      <div style={{
        textAlign: 'center',
        marginBottom: '24px',
        padding: '16px',
        background: 'rgba(0,0,0,0.05)',
        border: '1px solid rgba(0,0,0,0.1)',
        transform: 'rotate(-0.3deg)',
      }}>
        <TypewrittenText variant="carbon" fontSize="22px" style={{ marginBottom: '8px' }}>
          {username}
        </TypewrittenText>
        <HandwrittenText urgency="calm" fontSize="18px" color="#4a0000">
          {rank}
        </HandwrittenText>
      </div>

      {/* XP Progress - Hand-drawn style */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}>
          <TypewrittenText variant="faded" fontSize="10px">
            EXPERIENCE
          </TypewrittenText>
          <TypewrittenText variant="standard" fontSize="10px">
            {xp} / {xpToNextLevel}
          </TypewrittenText>
        </div>
        <div style={{
          width: '100%',
          height: '20px',
          background: '#c4b49a',
          border: '2px solid #1a0f0a',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${xpPercentage}%`,
            height: '100%',
            background: '#1a0f0a',
            transition: 'width 0.5s ease',
          }} />
        </div>
      </div>

      {/* Stats - Typewriter grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '12px',
        marginTop: '20px',
      }}>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: 'rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.1)',
          transform: 'rotate(0.2deg)',
        }}>
          <TypewrittenText variant="faded" fontSize="9px" style={{ marginBottom: '6px' }}>
            INVESTIGATIONS
          </TypewrittenText>
          <TypewrittenText variant="carbon" fontSize="20px">
            {investigationsCompleted}
          </TypewrittenText>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: 'rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.1)',
          transform: 'rotate(-0.2deg)',
        }}>
          <TypewrittenText variant="faded" fontSize="9px" style={{ marginBottom: '6px' }}>
            GHOSTS CAUGHT
          </TypewrittenText>
          <TypewrittenText variant="carbon" fontSize="20px">
            {ghostsCaught}
          </TypewrittenText>
        </div>
        <div style={{
          textAlign: 'center',
          padding: '12px',
          background: 'rgba(0,0,0,0.05)',
          border: '1px solid rgba(0,0,0,0.1)',
          transform: 'rotate(0.3deg)',
        }}>
          <TypewrittenText variant="faded" fontSize="9px" style={{ marginBottom: '6px' }}>
            SUCCESS RATE
          </TypewrittenText>
          <TypewrittenText variant="carbon" fontSize="20px">
            {successRate}%
          </TypewrittenText>
        </div>
      </div>

      {/* Achievement stamps (if any achievements) */}
      {ghostsCaught > 0 && (
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', zIndex: 10 }}>
          <OfficialStamp text="ACTIVE" color="red" seed={seed + '-achievement'} />
        </div>
      )}
    </PaperBase>
  );
}
