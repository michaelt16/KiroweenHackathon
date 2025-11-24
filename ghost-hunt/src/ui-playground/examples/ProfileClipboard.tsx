import { Clipboard } from '../../components/analog/templates/Clipboard';
import { IDCard } from '../../components/analog/elements/IDCard';
import { HandwrittenText } from '../../components/analog/elements/HandwrittenText';
import { TypewrittenText } from '../../components/analog/elements/TypewrittenText';
import pfp from '../../assets/images/agent/pfp.png';

/**
 * Profile Clipboard
 * Agent ID card clipped to official clipboard
 * Professional, organized presentation
 */
export function ProfileClipboard() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>
        
        {/* Title above clipboard */}
        <div style={{
          textAlign: 'center',
          marginBottom: '30px',
        }}>
          <h1 style={{
            fontFamily: 'Impact, sans-serif',
            fontSize: '36px',
            color: '#d8d4c8',
            textTransform: 'uppercase',
            letterSpacing: '4px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
            margin: 0,
            marginBottom: '10px',
          }}>
            AGENT DOSSIER
          </h1>
          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '14px',
            color: '#999',
            margin: 0,
          }}>
            CLASSIFIED - AUTHORIZED PERSONNEL ONLY
          </p>
        </div>

        <Clipboard>
          {/* ID Card */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '30px',
          }}>
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
              seed="morrison-clipboard"
            />
          </div>

          {/* Additional notes section */}
          <div style={{
            background: '#f4f0e6',
            padding: '20px',
            borderRadius: '4px',
            border: '2px solid #2a2520',
            marginTop: '20px',
          }}>
            <TypewrittenText fontSize="16px" fontWeight="bold">
              PERFORMANCE NOTES:
            </TypewrittenText>

            <HandwrittenText urgency="calm" fontSize="18px">
              Exceptional track record with aggressive{'\n'}
              entities. Specializes in Wraith identification.{'\n'}
              {'\n'}
              Recommended for high-priority cases.
            </HandwrittenText>

            <div style={{
              borderTop: '1px solid #8b7355',
              marginTop: '15px',
              paddingTop: '15px',
            }}>
              <TypewrittenText fontSize="14px" variant="faded">
                Last Updated: November 21, 2024
              </TypewrittenText>
              <TypewrittenText fontSize="14px" variant="faded">
                Clearance: LEVEL 12 - SENIOR INVESTIGATOR
              </TypewrittenText>
            </div>

            {/* Signature */}
            <div style={{
              marginTop: '20px',
              textAlign: 'right',
            }}>
              <HandwrittenText urgency="calm" fontSize="24px">
                - Director Chen
              </HandwrittenText>
            </div>
          </div>

          {/* Recent assignments */}
          <div style={{
            background: '#f4f0e6',
            padding: '20px',
            borderRadius: '4px',
            border: '2px solid #2a2520',
            marginTop: '20px',
          }}>
            <TypewrittenText fontSize="16px" fontWeight="bold">
              RECENT ASSIGNMENTS:
            </TypewrittenText>

            <div style={{ marginTop: '10px' }}>
              <TypewrittenText fontSize="14px">
                • Whitmore Estate Investigation (11/15/24)
              </TypewrittenText>
              <HandwrittenText urgency="calm" fontSize="16px" color="#22c55e">
                ✓ SUCCESS - Wraith identified and banished
              </HandwrittenText>

              <TypewrittenText fontSize="14px">
                • Oakwood Cemetery Survey (11/20/24)
              </TypewrittenText>
              <HandwrittenText urgency="calm" fontSize="16px" color="#22c55e">
                ✓ SUCCESS - Multiple entities catalogued
              </HandwrittenText>

              <TypewrittenText fontSize="14px">
                • Hillcrest Manor (PENDING)
              </TypewrittenText>
              <HandwrittenText urgency="urgent" fontSize="16px" color="#f59e0b">
                ⚠ ACTIVE - High priority case
              </HandwrittenText>
            </div>
          </div>

          {/* Equipment status */}
          <div style={{
            background: '#f4f0e6',
            padding: '20px',
            borderRadius: '4px',
            border: '2px solid #2a2520',
            marginTop: '20px',
          }}>
            <TypewrittenText fontSize="16px" fontWeight="bold">
              EQUIPMENT STATUS:
            </TypewrittenText>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '10px',
            }}>
              <TypewrittenText fontSize="14px">
                EMF Reader: <span style={{ color: '#22c55e' }}>✓ READY</span>
              </TypewrittenText>
              <TypewrittenText fontSize="14px">
                Thermal Scanner: <span style={{ color: '#22c55e' }}>✓ READY</span>
              </TypewrittenText>
              <TypewrittenText fontSize="14px">
                Spirit Box: <span style={{ color: '#22c55e' }}>✓ READY</span>
              </TypewrittenText>
              <TypewrittenText fontSize="14px">
                Camera: <span style={{ color: '#f59e0b' }}>⚠ LOW FILM</span>
              </TypewrittenText>
            </div>

            <HandwrittenText urgency="calm" fontSize="16px" color="#dc2626">
              Note: Restock camera film before next deployment
            </HandwrittenText>
          </div>

        </Clipboard>

        {/* Footer note */}
        <div style={{
          textAlign: 'center',
          marginTop: '30px',
          padding: '15px',
          background: 'rgba(42, 37, 32, 0.8)',
          border: '1px solid #5a4f48',
          borderRadius: '8px',
        }}>
          <p style={{
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            color: '#999',
            margin: 0,
          }}>
            📋 OFFICIAL AGENT DOSSIER - CLIPBOARD FORMAT
          </p>
        </div>

      </div>
    </div>
  );
}

export default ProfileClipboard;
