import { CorkBoard } from '../../components/analog/templates/CorkBoard';
import { IDCard } from '../../components/analog/elements/IDCard';
import { PushPin } from '../../components/analog/base/PushPin';
import { StickyNote } from '../../components/analog/elements/StickyNote';
import { PolaroidPhoto } from '../../components/analog/elements/PolaroidPhoto';
import pfp from '../../assets/images/agent/pfp.png';
import ghost1 from '../../assets/images/ghost1.png';
import ghost2 from '../../assets/images/ghost2.png';

/**
 * Profile Cork Board
 * Agent ID card pinned to detective-style cork board
 * with evidence photos and notes
 */
export function ProfileCorkBoard() {
  return (
    <CorkBoard boardId="profile-board">
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        minHeight: '800px',
      }}>
        
        {/* Title at top */}
        <div style={{
          textAlign: 'center',
          marginBottom: '40px',
        }}>
          <h1 style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '48px',
            color: '#2a2520',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            margin: 0,
          }}>
            AGENT PROFILE
          </h1>
        </div>

        {/* ID Card - Center */}
        <div style={{
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '40px',
        }}>
          <PushPin color="red" position={{ top: '-12px', left: '50%' }} />
          <IDCard 
            agentName="SARAH MORRISON"
            agentId="PI-2847-A"
            rank="SENIOR INVESTIGATOR"
            level={12}
            photoUrl={pfp}
            stats={{
              investigations: 47,
              ghostsCaught: 38,
              successRate: 81,
            }}
            seed="morrison-id"
          />
        </div>

        {/* Recent Evidence - Left side */}
        <div style={{
          position: 'absolute',
          top: '200px',
          left: '50px',
        }}>
          <PushPin color="red" position={{ top: '-12px', left: '50%' }} />
          <PolaroidPhoto 
            src={ghost1}
            caption="Whitmore Estate - 11/15"
            damage="medium"
            rotation={-8}
            seed="evidence-1"
          />
        </div>

        {/* Recent Evidence - Right side */}
        <div style={{
          position: 'absolute',
          top: '180px',
          right: '80px',
        }}>
          <PushPin color="silver" position={{ top: '-12px', left: '50%' }} />
          <PolaroidPhoto 
            src={ghost2}
            caption="Oakwood Cemetery - 11/20"
            damage="medium"
            rotation={6}
            seed="evidence-2"
          />
        </div>

        {/* Sticky Note - Top Left */}
        <div style={{
          position: 'absolute',
          top: '120px',
          left: '120px',
        }}>
          <StickyNote color="yellow" size="small" rotation={-15} seed="note-1">
            <div style={{ fontSize: '16px' }}>
              Check EMF calibration{'\n'}
              before next investigation
            </div>
          </StickyNote>
        </div>

        {/* Sticky Note - Top Right */}
        <div style={{
          position: 'absolute',
          top: '100px',
          right: '150px',
        }}>
          <StickyNote color="pink" size="small" rotation={12} seed="note-2">
            <div style={{ fontSize: '16px' }}>
              Restock salt{'\n'}
              and sage!
            </div>
          </StickyNote>
        </div>

        {/* Achievement Note - Bottom Left */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          left: '80px',
        }}>
          <StickyNote color="blue" size="medium" rotation={-8} seed="note-3">
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              🏆 ACHIEVEMENT{'\n'}
              {'\n'}
              Identified 5 Wraiths{'\n'}
              in one week!{'\n'}
              {'\n'}
              - Director Chen
            </div>
          </StickyNote>
        </div>

        {/* Current Case Note - Bottom Right */}
        <div style={{
          position: 'absolute',
          bottom: '120px',
          right: '100px',
        }}>
          <StickyNote color="yellow" size="medium" rotation={5} seed="note-4">
            <div style={{ fontSize: '17px' }}>
              <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                ACTIVE CASE:
              </span>
              {'\n\n'}
              Hillcrest Manor{'\n'}
              Multiple entities{'\n'}
              High priority{'\n'}
              {'\n'}
              Deploy tomorrow
            </div>
          </StickyNote>
        </div>

        {/* String connections (visual only) */}
        <svg style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}>
          {/* Connect ID to evidence photos */}
          <line 
            x1="50%" 
            y1="400" 
            x2="200" 
            y2="350" 
            stroke="#dc2626" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            opacity="0.6"
          />
          <line 
            x1="50%" 
            y1="400" 
            x2="85%" 
            y2="330" 
            stroke="#dc2626" 
            strokeWidth="2" 
            strokeDasharray="5,5"
            opacity="0.6"
          />
        </svg>

        {/* Legend at bottom */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(42, 37, 32, 0.9)',
          border: '2px solid #5a4f48',
          borderRadius: '8px',
          padding: '15px 30px',
        }}>
          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            color: '#d8d4c8',
            margin: 0,
          }}>
            📌 AGENT PROFILE - CORK BOARD STYLE
          </p>
        </div>

      </div>
    </CorkBoard>
  );
}

export default ProfileCorkBoard;
