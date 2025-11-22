import React from 'react';

// Texture imports
import coffeestain from '../../assets/texture/coffeestain.png';
import dust from '../../assets/texture/dust.png';
import rippedpaper from '../../assets/texture/rippedpaper.png';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';

// Investigation Report - Field Notes
export function InvestigationReportExample() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Damaged notebook page */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#d8d4c8',
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '850px',
        transform: 'rotate(0.8deg)',
      }}>
        {/* Wrinkled overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.7,
          pointerEvents: 'none',
        }} />

        {/* Dust */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />

        {/* Water damage edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Fold crease */}
        <div style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          width: '2px',
          background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.2) 20%, rgba(0,0,0,0.2) 80%, transparent)',
          transform: 'translateX(-50%)',
          pointerEvents: 'none',
        }} />

        {/* Ripped corner */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '180px',
          height: '180px',
          backgroundImage: `url(${rippedpaper})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.7,
          pointerEvents: 'none',
        }} />

        {/* Coffee stain */}
        <div style={{
          position: 'absolute',
          bottom: '100px',
          right: '70px',
          width: '190px',
          height: '190px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.4,
          transform: 'rotate(-25deg)',
          pointerEvents: 'none',
        }} />

        {/* Fingerprint smudge */}
        <div style={{
          position: 'absolute',
          top: '180px',
          right: '100px',
          width: '70px',
          height: '90px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)',
          transform: 'rotate(30deg)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Title */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '36px',
            color: '#0a0a0a',
            marginBottom: '30px',
            transform: 'rotate(-1.5deg) translateX(-0.7px)',
            borderBottom: '3px solid #0a0a0a',
            paddingBottom: '10px',
          }}>
            Field Report - Whitmore Estate
          </div>

          {/* Metadata */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '18px',
            color: '#555',
            marginBottom: '10px',
            transform: 'rotate(0.6deg) translateX(0.5px)',
          }}>
            Date: November 15, 2024
          </div>

          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '18px',
            color: '#555',
            marginBottom: '25px',
            transform: 'rotate(-0.4deg) translateX(-0.4px)',
          }}>
            Lead Investigator: Agent Morrison
          </div>

          {/* Report content */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '23px',
            color: '#1a0f0a',
            lineHeight: '2',
          }}>
            <div style={{ 
              marginBottom: '18px',
              transform: 'rotate(-0.6deg) translateX(-0.7px)',
            }}>
              Arrived on site at <span style={{ fontWeight: 'bold' }}>21:30</span>.
              Temperature outside: 8°C. Clear night.
            </div>

            <div style={{ 
              marginBottom: '18px',
              transform: 'rotate(0.5deg) translateX(0.6px)',
            }}>
              Initial sweep of ground floor revealed no
              anomalies. EMF baseline: 0.2-0.4.
            </div>

            <div style={{ 
              marginBottom: '18px',
              transform: 'rotate(-0.7deg) translateX(-0.8px)',
            }}>
              <span style={{ fontWeight: 'bold' }}>22:15</span> - First contact.
              EMF spike to <span style={{ 
                fontWeight: 'bold',
                fontSize: '26px',
                color: '#8b0000',
                textShadow: '2px 2px 4px rgba(139,0,0,0.5)',
              }}>4.8</span> in second floor hallway.
            </div>

            <div style={{ 
              marginBottom: '18px',
              transform: 'rotate(0.4deg) translateX(0.5px)',
            }}>
              Temperature dropped to <span style={{ fontWeight: 'bold' }}>-2°C</span> within
              30 seconds. Breath visible. Equipment
              functioning normally.
            </div>

            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(-0.5deg) translateX(-0.6px)',
              fontSize: '25px',
              fontWeight: 'bold',
              position: 'relative',
            }}>
              Heard distinct footsteps above me.
              {/* Blood smear */}
              <div style={{
                position: 'absolute',
                top: '30%',
                left: '-3%',
                right: '-3%',
                height: '50%',
                background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.15) 20%, rgba(139,0,0,0.2) 50%, rgba(139,0,0,0.15) 80%, transparent)',
                transform: 'rotate(-1deg)',
                pointerEvents: 'none',
              }} />
            </div>

            <div style={{ 
              marginBottom: '18px',
              transform: 'rotate(0.6deg) translateX(0.7px)',
            }}>
              Proceeded to third floor. Door to master
              bedroom was closed. I left it open.
            </div>

            <div style={{ 
              marginBottom: '18px',
              transform: 'rotate(-0.8deg) translateX(-0.9px)',
            }}>
              <span style={{ fontWeight: 'bold' }}>22:47</span> - Camera captured
              anomaly in bedroom. Reviewing footage shows
              shadow figure near window. No natural
              explanation.
            </div>

            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(0.5deg) translateX(0.6px)',
            }}>
              Spirit box session yielded <span style={{ 
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}>three</span> distinct
              responses. Voice pattern matches previous
              recordings from this location.
            </div>

            {/* Crossed out section */}
            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(-0.7deg) translateX(-0.7px)',
              position: 'relative',
            }}>
              <div style={{
                textDecoration: 'line-through',
                color: '#666',
              }}>
                Recommend closing investigation. Nothing here.
              </div>
              {/* Heavy scribble */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: 0,
                right: 0,
                height: '3px',
                background: '#1a0f0a',
                transform: 'rotate(-2deg)',
              }} />
            </div>

            {/* Urgent section */}
            <div style={{
              background: 'rgba(139, 0, 0, 0.15)',
              border: '3px dashed #8b0000',
              padding: '18px',
              marginTop: '25px',
              transform: 'rotate(-1.8deg)',
              fontSize: '25px',
              fontWeight: 'bold',
              color: '#4a0000',
              lineHeight: '1.8',
              position: 'relative',
            }}>
              {/* Blood smear across */}
              <div style={{
                position: 'absolute',
                top: '35%',
                left: '5%',
                right: '5%',
                height: '35%',
                background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.25) 15%, rgba(139,0,0,0.3) 50%, rgba(139,0,0,0.25) 85%, transparent)',
                transform: 'rotate(-1.5deg)',
                pointerEvents: 'none',
              }} />

              <div style={{ transform: 'translateX(-0.6px)' }}>
                <span style={{ fontWeight: 'bold' }}>23:30</span> - ENTITY BECAME HOSTILE
              </div>
              <br />
              <div style={{ transform: 'translateX(0.5px)' }}>
                All doors slammed simultaneously.
              </div>
              <br />
              <div style={{ transform: 'translateX(-0.4px)' }}>
                Lights failed. Backup flashlight only.
              </div>
              <br />
              <div style={{ 
                fontSize: '22px',
                transform: 'translateX(0.6px)',
              }}>
                Evacuated immediately. Investigation
                incomplete but evidence sufficient.
              </div>
            </div>

            {/* Conclusion */}
            <div style={{
              marginTop: '30px',
              paddingTop: '20px',
              borderTop: '2px solid #0a0a0a',
            }}>
              <div style={{ 
                fontWeight: 'bold',
                marginBottom: '15px',
                transform: 'rotate(-0.5deg) translateX(-0.5px)',
              }}>
                Conclusion:
              </div>

              <div style={{ 
                marginBottom: '15px',
                transform: 'rotate(0.4deg) translateX(0.5px)',
              }}>
                Entity confirmed as <span style={{ 
                  fontWeight: 'bold',
                  color: '#4a0000',
                  textShadow: '1.5px 1.5px 3px rgba(139,0,0,0.4)',
                }}>WRAITH</span>. Evidence
                collected: EMF Level 5, Freezing Temps,
                Spirit Box response, Photo evidence.
              </div>

              <div style={{ 
                transform: 'rotate(-0.6deg) translateX(-0.6px)',
              }}>
                Recommend <span style={{ 
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                }}>immediate</span> cleansing ritual.
                Entity shows signs of increasing aggression.
              </div>
            </div>

            {/* Signature */}
            <div style={{
              marginTop: '40px',
              fontSize: '28px',
              transform: 'rotate(-3.5deg) translateX(1.1px)',
              color: '#1a0f0a',
            }}>
              - Agent M. Morrison
            </div>
          </div>

          {/* Ink smudge */}
          <div style={{
            position: 'absolute',
            bottom: '120px',
            left: '60px',
            width: '75px',
            height: '75px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'rotate(40deg)',
          }} />
        </div>
      </div>
    </div>
  );
}

export default InvestigationReportExample;
