import { CodexPage } from '../../components/analog/templates/CodexPage';
import { EvidencePage } from '../../components/analog/templates/EvidencePage';
import { FieldReport } from '../../components/analog/templates/FieldReport';
import ghost1 from '../../assets/images/ghost1.png';

/**
 * Component System Demo
 * Shows how to build different document types using the same LEGO pieces
 */
export function ComponentSystemDemo() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Example 1: Codex Entry */}
        <div>
          <h2 style={{ color: '#22c55e', marginBottom: '20px', fontFamily: 'monospace' }}>
            1. Codex Entry (Light Damage)
          </h2>
          <CodexPage ghostId="shade-001">
            <CodexPage.Title fontSize="24px" fontWeight="bold">
              ENTITY: THE SHADE
            </CodexPage.Title>
            
            <CodexPage.Title fontSize="16px">
              Type: Passive Apparition
            </CodexPage.Title>
            
            <div style={{ textAlign: 'center', margin: '25px 0' }}>
              <CodexPage.Photo 
                src={ghost1}
                caption="confirmed sighting"
                damage="light"
                seed="shade-001"
              />
            </div>
            
            <CodexPage.Note urgency="calm">
              Shy entity. Avoids groups. Most active when{"\n"}
              investigator is alone. Prefers darkness.
            </CodexPage.Note>
            
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
              <CodexPage.StickyNote color="yellow" size="small" seed="shade-note">
                Do not investigate alone!
              </CodexPage.StickyNote>
            </div>
          </CodexPage>
        </div>

        {/* Example 2: Evidence Page */}
        <div>
          <h2 style={{ color: '#22c55e', marginBottom: '20px', fontFamily: 'monospace' }}>
            2. Evidence Page (Heavy Damage)
          </h2>
          <EvidencePage investigationId="whitmore-001">
            <EvidencePage.Note urgency="frantic">
              EMF spiked to 5.0!{"\n"}
              Temperature: -2°C{"\n"}
              IT KNOWS I'M HERE
            </EvidencePage.Note>
            
            <div style={{ margin: '25px 0' }}>
              <EvidencePage.Photo 
                src={ghost1}
                caption="ENTITY MANIFESTATION"
                damage="heavy"
                rotation={-12}
                seed="whitmore-photo"
              />
            </div>
            
            <EvidencePage.Note urgency="urgent">
              Heard footsteps behind me.{"\n"}
              No one else here.{"\n"}
              Getting out NOW.
            </EvidencePage.Note>
          </EvidencePage>
        </div>

        {/* Example 3: Field Report */}
        <div>
          <h2 style={{ color: '#22c55e', marginBottom: '20px', fontFamily: 'monospace' }}>
            3. Field Report (Medium Damage)
          </h2>
          <FieldReport reportId="report-2847">
            <FieldReport.Stamp text="CLOSED" color="red" seed="report-stamp" />
            
            <FieldReport.Header fontSize="18px" fontWeight="bold">
              INVESTIGATION REPORT - WHITMORE ESTATE
            </FieldReport.Header>
            
            <FieldReport.Header fontSize="14px" variant="faded">
              Date: November 15, 2024{"\n"}
              Lead Investigator: Agent Morrison
            </FieldReport.Header>
            
            <FieldReport.Note urgency="calm">
              Arrived on site at 21:30.{"\n"}
              Initial sweep revealed no anomalies.
            </FieldReport.Note>
            
            <FieldReport.Note urgency="urgent">
              22:15 - First contact.{"\n"}
              EMF spike to 4.8 in second floor hallway.
            </FieldReport.Note>
            
            <FieldReport.Note urgency="calm">
              Conclusion: Entity confirmed as WRAITH.{"\n"}
              Recommend immediate cleansing ritual.
            </FieldReport.Note>
          </FieldReport>
        </div>

        {/* Explanation */}
        <div style={{
          background: 'rgba(34, 197, 94, 0.1)',
          border: '2px solid #22c55e',
          padding: '30px',
          borderRadius: '8px',
          color: '#22c55e',
          fontFamily: 'monospace',
          fontSize: '14px',
          lineHeight: '1.8',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px' }}>🧩 Component System Benefits:</h3>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Same components, different compositions</li>
            <li>Randomized damage based on seed (deterministic)</li>
            <li>Light/Medium/Heavy damage levels</li>
            <li>Reusable across all document types</li>
            <li>Easy to maintain and extend</li>
          </ul>
        </div>

      </div>
    </div>
  );
}

export default ComponentSystemDemo;
