import { EvidencePage } from '../../components/analog/templates/EvidencePage';
import { PolaroidPhoto } from '../../components/analog/elements/PolaroidPhoto';
import { HandwrittenText } from '../../components/analog/elements/HandwrittenText';
import { DamageOverlay } from '../../components/analog/base/DamageOverlay';
import ghost1 from '../../assets/images/ghost1.png';
import ghost2 from '../../assets/images/ghost2.png';

/**
 * Investigation Log Mock
 * Heavy damage, chaotic field notes from an active investigation
 */
export function InvestigationLogMock() {
  const investigationId = 'oakwood-cemetery-789';

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
    }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <EvidencePage investigationId={investigationId}>
          
          {/* Title - frantic handwriting */}
          <div style={{
            borderBottom: '3px solid #8b0000',
            paddingBottom: '10px',
            marginBottom: '25px',
            transform: 'rotate(-2deg)',
          }}>
            <HandwrittenText urgency="frantic" fontSize="38px">
              INVESTIGATION LOG
            </HandwrittenText>
            <HandwrittenText urgency="urgent" fontSize="20px">
              Oakwood Cemetery - 11/20/2024
            </HandwrittenText>
          </div>

          {/* Entry 1 - Initial arrival */}
          <HandwrittenText urgency="calm">
            <span style={{ fontWeight: 'bold' }}>23:45</span> - Arrived on site.{"\n"}
            Fog rolling in. Visibility poor.{"\n"}
            Temperature: 4°C
          </HandwrittenText>

          {/* Entry 2 - First contact */}
          <HandwrittenText urgency="urgent">
            <span style={{ fontWeight: 'bold' }}>00:12</span> - EMF spike detected!{"\n"}
            Reading: <span style={{ 
              fontSize: '28px',
              color: '#8b0000',
              textShadow: '2px 2px 4px rgba(139,0,0,0.6)',
            }}>4.7</span> near Morrison plot
          </HandwrittenText>

          {/* Photo 1 - Evidence */}
          <div style={{ 
            margin: '25px 0',
            transform: 'rotate(-8deg)',
            marginLeft: '30px',
          }}>
            <PolaroidPhoto 
              src={ghost1}
              caption="ANOMALY DETECTED - 00:15"
              damage="heavy"
              rotation={-12}
              seed={investigationId + '-photo1'}
            />
          </div>

          {/* Entry 3 - Temperature drop */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <HandwrittenText urgency="urgent">
              <span style={{ fontWeight: 'bold' }}>00:18</span> - Sudden temp drop{"\n"}
              Now at <span style={{ fontWeight: 'bold', fontSize: '26px' }}>-6°C</span>{"\n"}
              Breath visible. Equipment functioning.
            </HandwrittenText>
            {/* Coffee stain over this section */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
              <DamageOverlay type="coffee" opacity={0.3} seed={investigationId + '-coffee2'} />
            </div>
          </div>

          {/* Entry 4 - Audio phenomena */}
          <HandwrittenText urgency="frantic" fontSize="26px">
            <span style={{ fontWeight: 'bold' }}>00:32</span> - HEARD CHILDREN LAUGHING{"\n"}
            NO CHILDREN PRESENT{"\n"}
            CEMETERY CLOSED AT NIGHT
          </HandwrittenText>

          {/* Entry 5 - Spirit box */}
          <HandwrittenText urgency="urgent">
            Spirit box session:{"\n"}
            - "GET OUT"{"\n"}
            - "LEAVE US"{"\n"}
            - "NOT WELCOME"{"\n"}
            {"\n"}
            Multiple entities confirmed.
          </HandwrittenText>

          {/* Photo 2 - Second manifestation */}
          <div style={{ 
            margin: '25px 0',
            transform: 'rotate(6deg)',
            marginLeft: '-20px',
          }}>
            <PolaroidPhoto 
              src={ghost2}
              caption="SECOND ENTITY - 00:45"
              damage="heavy"
              rotation={8}
              seed={investigationId + '-photo2'}
            />
          </div>

          {/* Entry 6 - Escalation */}
          <div style={{ position: 'relative', marginBottom: '20px' }}>
            <HandwrittenText urgency="frantic" fontSize="28px">
              <span style={{ fontWeight: 'bold' }}>00:51</span> - SITUATION ESCALATING{"\n"}
              {"\n"}
              Footsteps behind me{"\n"}
              Shadow figures moving between graves{"\n"}
              EMF now at 5.0
            </HandwrittenText>
            {/* Blood smear */}
            <div style={{ position: 'absolute', top: '20%', left: 0, right: 0, bottom: 0 }}>
              <DamageOverlay type="blood" opacity={0.25} seed={investigationId + '-blood'} />
            </div>
          </div>

          {/* Entry 7 - Equipment failure */}
          <HandwrittenText urgency="urgent">
            <span style={{ fontWeight: 'bold' }}>01:03</span> - Flashlight flickering{"\n"}
            Camera battery draining fast{"\n"}
            Down to 12% from full charge
          </HandwrittenText>

          {/* Entry 8 - Direct interaction */}
          <div style={{
            background: 'rgba(139, 0, 0, 0.2)',
            border: '3px dashed #8b0000',
            padding: '20px',
            marginTop: '25px',
            transform: 'rotate(-2deg)',
            position: 'relative',
          }}>
            <DamageOverlay type="ink" opacity={0.4} seed={investigationId + '-ink'} />
            
            <HandwrittenText urgency="frantic" fontSize="30px">
              <span style={{ fontWeight: 'bold' }}>01:15</span> - DIRECT CONTACT{"\n"}
              {"\n"}
              Something touched my shoulder{"\n"}
              Turned around - nothing there{"\n"}
              {"\n"}
              GETTING OUT NOW
            </HandwrittenText>
          </div>

          {/* Final entry - Conclusion */}
          <div style={{
            marginTop: '30px',
            paddingTop: '20px',
            borderTop: '2px solid #1a0f0a',
          }}>
            <HandwrittenText urgency="urgent">
              <span style={{ fontWeight: 'bold' }}>CONCLUSION:</span>{"\n"}
              {"\n"}
              Multiple entities present{"\n"}
              Highly aggressive behavior{"\n"}
              Evidence collected:{"\n"}
              • EMF Level 5 ✓{"\n"}
              • Freezing Temps ✓{"\n"}
              • Spirit Box ✓{"\n"}
              • Photo Evidence ✓{"\n"}
              • Direct Contact ✓{"\n"}
              {"\n"}
              Recommend IMMEDIATE cleansing{"\n"}
              DO NOT RETURN ALONE
            </HandwrittenText>
          </div>

          {/* Signature */}
          <div style={{
            marginTop: '40px',
            textAlign: 'right',
          }}>
            <HandwrittenText urgency="calm" fontSize="28px">
              - Agent Rodriguez
            </HandwrittenText>
            <HandwrittenText urgency="calm" fontSize="18px" color="#666">
              01:47 AM
            </HandwrittenText>
          </div>

          {/* Additional damage overlays for chaos */}
          <div style={{ position: 'absolute', top: '15%', right: '10%' }}>
            <DamageOverlay type="fingerprint" opacity={0.3} seed={investigationId + '-print1'} />
          </div>
          <div style={{ position: 'absolute', bottom: '20%', left: '5%' }}>
            <DamageOverlay type="fingerprint" opacity={0.25} seed={investigationId + '-print2'} />
          </div>

        </EvidencePage>
      </div>
    </div>
  );
}

export default InvestigationLogMock;
