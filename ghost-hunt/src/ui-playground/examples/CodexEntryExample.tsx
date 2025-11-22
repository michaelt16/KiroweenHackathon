import React from 'react';

// Texture imports
import burnhole from '../../assets/texture/burnhole.png';
import coffeestain from '../../assets/texture/coffeestain.png';
import dust from '../../assets/texture/dust.png';
import rippedpaper from '../../assets/texture/rippedpaper.png';
import tape from '../../assets/texture/tape.png';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import ghost1 from '../../assets/images/ghost1.png';

// Codex Entry - Ghost Documentation
export function CodexEntryExample() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Aged Journal Page */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#c4b49a',
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '850px',
        transform: 'rotate(-0.6deg)',
      }}>
        {/* Wrinkled paper texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.8,
          pointerEvents: 'none',
          borderRadius: '4px',
        }} />

        {/* Dust overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.5,
          pointerEvents: 'none',
        }} />

        {/* Water damage edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Coffee stain */}
        <div style={{
          position: 'absolute',
          top: '120px',
          right: '70px',
          width: '180px',
          height: '180px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.6,
          transform: 'rotate(35deg)',
          pointerEvents: 'none',
        }} />

        {/* Burn damage */}
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '40px',
          width: '140px',
          height: '140px',
          backgroundImage: `url(${burnhole})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.7,
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Title */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '40px',
            color: '#1a0f0a',
            marginBottom: '25px',
            textAlign: 'center',
            transform: 'rotate(-1.5deg)',
            letterSpacing: '2px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}>
            <span style={{ 
              display: 'inline-block',
              transform: 'rotate(2deg) translateX(-1px)',
              marginRight: '10px',
            }}>CODEX</span>
            <span style={{ 
              display: 'inline-block',
              transform: 'rotate(-3deg) translateX(1px)',
              color: '#4a0000',
              fontWeight: 'bold',
            }}>ENTRY</span>
          </div>

          {/* Classification stamp */}
          <div style={{
            position: 'absolute',
            top: '15px',
            right: '30px',
            transform: 'rotate(12deg)',
            border: '3px solid #8b0000',
            padding: '6px 14px',
            fontFamily: 'Impact, sans-serif',
            fontSize: '20px',
            color: '#8b0000',
            letterSpacing: '2px',
            opacity: 0.7,
          }}>
            CLASS-A
          </div>

          {/* Polaroid with tape */}
          <div style={{
            position: 'relative',
            width: '220px',
            margin: '0 auto 25px',
            transform: 'rotate(-4deg) perspective(600px) rotateY(-1deg)',
          }}>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-6deg)',
              width: '90px',
              height: '28px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              zIndex: 2,
            }} />

            {/* Polaroid */}
            <div style={{
              background: '#e8e4dc',
              padding: '12px 12px 40px 12px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
            }}>
              <div style={{
                width: '100%',
                height: '180px',
                background: '#1a1a1a',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img 
                  src={ghost1} 
                  alt="Entity"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Static overlay */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${dust})`,
                  mixBlendMode: 'overlay',
                  opacity: 0.7,
                }} />
              </div>

              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '16px',
                color: '#1a1a1a',
                marginTop: '8px',
                textAlign: 'center',
                transform: 'rotate(-1deg)',
              }}>
                captured 11/15/2024
              </div>
            </div>
          </div>

          {/* Entry details */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '22px',
            color: '#1a0f0a',
            lineHeight: '1.9',
          }}>
            <div style={{ 
              marginBottom: '15px',
              transform: 'rotate(-0.8deg) translateX(-0.5px)',
            }}>
              <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Entity Name:</span>{' '}
              <span style={{ 
                color: '#4a0000',
                fontWeight: 'bold',
                letterSpacing: '1.5px',
                textShadow: '2px 2px 4px rgba(139,0,0,0.5)',
                display: 'inline-block',
              }}>THE SHADE</span>
            </div>

            <div style={{ 
              marginBottom: '15px',
              transform: 'rotate(0.4deg) translateX(0.6px)',
            }}>
              <span style={{ fontWeight: 'bold' }}>Type:</span>{' '}
              <span style={{ fontStyle: 'italic' }}>Passive Apparition</span>
            </div>

            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(-0.6deg) translateX(-0.7px)',
            }}>
              <span style={{ fontWeight: 'bold' }}>Threat Level:</span>{' '}
              <span style={{ 
                color: '#f59e0b',
                fontWeight: 'bold',
                fontSize: '24px',
                textShadow: '2px 2px 4px rgba(245,158,11,0.5)',
              }}>MEDIUM</span>
            </div>

            {/* Underlined section */}
            <div style={{
              borderBottom: '2px solid #1a0f0a',
              paddingBottom: '12px',
              marginBottom: '18px',
              transform: 'rotate(-0.3deg)',
            }}>
              <div style={{ fontWeight: 'bold' }}>Evidence Types:</div>
            </div>

            {/* Evidence list */}
            <div style={{ 
              marginLeft: '20px',
              marginBottom: '20px',
            }}>
              <div style={{ 
                marginBottom: '10px',
                transform: 'rotate(0.7deg) translateX(0.8px)',
              }}>
                • Ghost Orbs
              </div>
              <div style={{ 
                marginBottom: '10px',
                transform: 'rotate(-0.5deg) translateX(-0.6px)',
              }}>
                • Freezing Temperatures
              </div>
              <div style={{ 
                transform: 'rotate(0.6deg) translateX(0.7px)',
              }}>
                • Ghost Writing
              </div>
            </div>

            {/* Behavior notes */}
            <div style={{
              borderBottom: '2px solid #1a0f0a',
              paddingBottom: '12px',
              marginBottom: '18px',
              transform: 'rotate(0.4deg)',
            }}>
              <div style={{ fontWeight: 'bold' }}>Behavioral Notes:</div>
            </div>

            <div style={{ 
              marginBottom: '15px',
              transform: 'rotate(-0.7deg) translateX(-0.8px)',
            }}>
              Shy entity. Avoids groups. Most active when
              investigator is alone. Prefers darkness.
            </div>

            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(0.5deg) translateX(0.6px)',
            }}>
              Rarely aggressive. Will retreat if confronted
              with light or multiple people.
            </div>

            {/* Warning box */}
            <div style={{
              background: 'rgba(245, 158, 11, 0.15)',
              border: '2px dashed #f59e0b',
              padding: '15px',
              marginTop: '25px',
              transform: 'rotate(-1deg)',
              position: 'relative',
            }}>
              <div style={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#f59e0b',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
              }}>
                ⚠ Investigation Tips
              </div>
              <div style={{ 
                fontSize: '18px',
                lineHeight: '1.6',
              }}>
                Turn off lights. Investigate alone. Use
                EMF reader to track movement. Entity will
                manifest more readily in complete darkness.
              </div>
            </div>

            {/* Signature */}
            <div style={{
              marginTop: '35px',
              fontSize: '26px',
              transform: 'rotate(-3deg) translateX(1px)',
              color: '#1a0f0a',
              textAlign: 'right',
            }}>
              - Dr. Chen
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CodexEntryExample;
