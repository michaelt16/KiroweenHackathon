// Journal Horror Enhanced - AAA INDIE HORROR QUALITY
// Pro-level analog horror with authentic damage and chaos

// Texture imports
import burnhole from '../assets/texture/burnhole.png';
import coffeestain from '../assets/texture/coffeestain.png';
import dust from '../assets/texture/dust.png';
import rippedpaper from '../assets/texture/rippedpaper.png';
import rippedtexture from '../assets/texture/rippedtexture.png';
import tape from '../assets/texture/tape.png';
import wrinkledpaper from '../assets/texture/wrinkledpaper.png';
import corkboardtexture from '../assets/texture/corkboardtexture.png';

// Image imports
import ghost1 from '../assets/images/ghost1.png';
import ghost2 from '../assets/images/ghost2.png';
import creepyclassroom from '../assets/images/creepyclassroom.png';

interface JournalHorrorEnhancedProps {
  page: 'ghost-entry' | 'player-notes' | 'evidence';
}

export function JournalHorrorEnhanced({ page }: JournalHorrorEnhancedProps) {
  if (page === 'ghost-entry') return <GhostEntryPageEnhanced />;
  if (page === 'player-notes') return <PlayerNotesPageEnhanced />;
  return <EvidencePageEnhanced />;
}

// Ghost Entry Page - AAA POLISH
function GhostEntryPageEnhanced() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Aged Journal Page - DARKER BASE */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#c4b49a', // Darker, more aged
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '850px',
        transform: 'rotate(-0.8deg)',
      }}>
        {/* VHS noise/grain overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            repeating-linear-gradient(
              0deg,
              transparent 0px,
              rgba(0,0,0,0.03) 1px,
              transparent 2px
            )
          `,
          mixBlendMode: 'overlay',
          opacity: 0.4,
          pointerEvents: 'none',
        }} />

        {/* Wrinkled paper texture overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${wrinkledpaper})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.8, // Increased
          pointerEvents: 'none',
          borderRadius: '4px',
        }} />

        {/* Dust/grain overlay */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.5, // Increased
          pointerEvents: 'none',
        }} />

        {/* Water damage - DARKER edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.45) 100%)', // Much darker
          pointerEvents: 'none',
        }} />

        {/* Fold crease down the middle */}
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

        {/* Micro tears - top right corner */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '20px',
          width: '40px',
          height: '40px',
          background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.3) 41%, rgba(0,0,0,0.3) 43%, transparent 44%)',
          pointerEvents: 'none',
        }} />

        {/* Burnt edge - bottom left */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '80px',
          height: '80px',
          background: 'radial-gradient(ellipse at bottom left, rgba(40,20,0,0.6) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />

        {/* Ripped texture damage */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '300px',
          backgroundImage: `url(${rippedtexture})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.7,
          pointerEvents: 'none',
        }} />

        {/* Burn hole damage */}
        <div style={{
          position: 'absolute',
          bottom: '50px',
          left: '30px',
          width: '150px',
          height: '150px',
          backgroundImage: `url(${burnhole})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.8,
          pointerEvents: 'none',
        }} />

        {/* Coffee stain */}
        <div style={{
          position: 'absolute',
          top: '100px',
          right: '80px',
          width: '180px',
          height: '180px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.6,
          pointerEvents: 'none',
          transform: 'rotate(45deg)',
        }} />

        {/* Fingerprint smudge - LOWER RIGHT */}
        <div style={{
          position: 'absolute',
          bottom: '180px',
          right: '100px',
          width: '70px',
          height: '90px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 70%)',
          transform: 'rotate(-25deg)',
          pointerEvents: 'none',
        }} />

        {/* Ripple/wave distortion on bottom half */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 8px,
              rgba(0,0,0,0.03) 8px,
              rgba(0,0,0,0.03) 10px
            )
          `,
          pointerEvents: 'none',
          opacity: 0.7,
        }} />

        {/* Content layer - above all damage */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Frantic handwritten title - MORE CHAOTIC */}
          <div style={{
            fontFamily: '"Caveat", "Permanent Marker", cursive',
            fontSize: '42px',
            color: '#1a0f0a',
            marginBottom: '30px',
            textAlign: 'center',
            transform: 'rotate(-2deg)', // More tilt
            letterSpacing: '3px', // More spacing
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
          }}>
            <span style={{ 
              display: 'inline-block',
              transform: 'rotate(3deg) translateX(-2px) translateY(-1px)', // More chaos
              marginRight: '12px',
            }}>ENTITY</span>
            <span style={{ 
              display: 'inline-block',
              transform: 'rotate(-4deg) translateX(2px) translateY(1px)', // More chaos
              color: '#4a0000',
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(139,0,0,0.5)', // Ink bleed
            }}>REPORT</span>
          </div>

          {/* Urgent stamp */}
          <div style={{
            position: 'absolute',
            top: '20px',
            right: '40px',
            transform: 'rotate(15deg)',
            border: '4px solid #8b0000',
            padding: '8px 16px',
            fontFamily: 'Impact, sans-serif',
            fontSize: '24px',
            color: '#8b0000',
            letterSpacing: '3px',
            opacity: 0.7,
          }}>
            URGENT
          </div>

          {/* Polaroid with tape - Ghost photo - ANGLED */}
          <div style={{
            position: 'relative',
            width: '220px',
            margin: '0 auto 30px',
            transform: 'rotate(-5deg) perspective(600px) rotateY(-2deg)', // Slight 3D angle
          }}>
            {/* Tape at top */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-8deg)', // More angle
              width: '100px',
              height: '30px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              zIndex: 2,
            }} />

            {/* Polaroid frame with SHADOW */}
            <div style={{
              background: '#e8e4dc',
              padding: '12px 12px 45px 12px',
              boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)', // Lifting shadow
              position: 'relative',
            }}>
              {/* Photo content - REAL GHOST IMAGE */}
              <div style={{
                width: '100%',
                height: '180px',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img 
                  src={ghost1} 
                  alt="Ghost manifestation"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Static/grain on photo */}
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

              {/* Handwritten caption - MORE CHAOTIC */}
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '17px',
                color: '#1a1a1a',
                marginTop: '8px',
                textAlign: 'center',
                transform: 'rotate(-2deg) translateX(-1px)', // More chaos
                textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.2)',
                letterSpacing: '0.5px',
              }}>
                manifested 3:47 AM
              </div>
            </div>
          </div>

          {/* Frantic handwritten notes - LESS STERILE */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '22px',
            color: '#1a0f0a',
            lineHeight: '1.9',
            marginBottom: '25px',
          }}>
            <div style={{ 
              marginBottom: '15px',
              transform: 'rotate(-1deg) translateX(-1px)', // More tilt
            }}>
              <span style={{ fontWeight: 'bold', fontSize: '24px' }}>Name:</span>{' '}
              <span style={{ 
                color: '#4a0000',
                fontWeight: 'bold',
                letterSpacing: '2px', // More spacing
                textShadow: '2px 2px 4px rgba(139,0,0,0.5)', // STRONGER ink bleed
                transform: 'translateX(1px)',
                display: 'inline-block',
              }}>THE WRAITH</span>
            </div>

            <div style={{ 
              marginBottom: '15px',
              transform: 'rotate(0.5deg) translateX(1px)',
            }}>
              <span style={{ fontWeight: 'bold' }}>Classification:</span>{' '}
              <span style={{ 
                fontStyle: 'italic',
                letterSpacing: '0.5px',
              }}>Class-A Hostile</span>
            </div>

            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(-0.8deg) translateX(-0.5px)',
            }}>
              <span style={{ fontWeight: 'bold' }}>Threat Level:</span>{' '}
              <span style={{ 
                color: '#8b0000',
                fontWeight: 'bold',
                fontSize: '28px',
                textShadow: '2.5px 2.5px 5px rgba(139,0,0,0.6)', // HEAVY ink bleed
                transform: 'translateX(1.5px)',
                display: 'inline-block',
                letterSpacing: '2px',
              }}>EXTREME</span>
            </div>

            {/* Underlined section */}
            <div style={{
              borderBottom: '3px solid #1a0f0a',
              paddingBottom: '15px',
              marginBottom: '20px',
              transform: 'rotate(-0.5deg)',
            }}>
              <div style={{ 
                fontWeight: 'bold', 
                marginBottom: '10px',
                transform: 'translateX(-0.5px)',
              }}>
                Behavioral Notes:
              </div>
            </div>

            {/* Messy bullet points with MORE jitter */}
            <div style={{ 
              marginLeft: '20px',
              marginBottom: '25px',
            }}>
              <div style={{ 
                marginBottom: '12px',
                transform: 'rotate(1deg) translateX(1px)',
              }}>
                • Moves FAST - impossible to track
              </div>
              <div style={{ 
                marginBottom: '12px',
                transform: 'rotate(-0.8deg) translateX(-1.2px)',
              }}>
                • Temperature drops to <span style={{ fontWeight: 'bold' }}>-15°C</span>
              </div>
              <div style={{ 
                marginBottom: '12px',
                transform: 'rotate(0.9deg) translateX(1.3px)',
                color: '#4a0000',
                fontWeight: 'bold',
                textShadow: '1.5px 1.5px 3px rgba(139,0,0,0.4)', // Ink bleed
              }}>
                • AGGRESSIVE when provoked
              </div>
              <div style={{ 
                transform: 'rotate(-0.6deg) translateX(-0.8px)',
              }}>
                • Responds to name calling
              </div>
            </div>

            {/* Blood smear over warning text */}
            <div style={{
              background: 'rgba(139, 0, 0, 0.1)',
              border: '2px solid #8b0000',
              padding: '15px',
              marginTop: '25px',
              transform: 'rotate(-1.5deg)',
              position: 'relative',
            }}>
              {/* Blood smear overlay */}
              <div style={{
                position: 'absolute',
                top: '30%',
                left: '10%',
                right: '10%',
                height: '40%',
                background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.2) 20%, rgba(139,0,0,0.25) 50%, rgba(139,0,0,0.2) 80%, transparent)',
                transform: 'rotate(-2deg)',
                pointerEvents: 'none',
              }} />

              <div style={{
                fontWeight: 'bold',
                fontSize: '20px',
                color: '#8b0000',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                textShadow: '2px 2px 4px rgba(139,0,0,0.5)', // Ink bleed
                transform: 'translateX(0.8px)',
              }}>
                ⚠ WARNING ⚠
              </div>
              <div style={{ 
                fontSize: '19px', 
                lineHeight: '1.6',
                transform: 'translateX(-0.5px)',
              }}>
                DO NOT investigate alone. Entity has shown
                ability to manipulate electronics. Keep EMF
                reader active at ALL times.
              </div>

              {/* Scratch marks */}
              <div style={{
                position: 'absolute',
                bottom: '5px',
                right: '10px',
                fontSize: '32px',
                color: '#4a0000',
                opacity: 0.6,
                transform: 'rotate(-15deg)',
              }}>
                ///
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Player Notes Page - ALREADY GREAT, MINOR POLISH
function PlayerNotesPageEnhanced() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Damaged notebook page - DARKER */}
      <div style={{
        maxWidth: '700px',
        margin: '0 auto',
        background: '#d8d4c8', // Slightly darker
        borderRadius: '4px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        padding: '50px 40px',
        position: 'relative',
        minHeight: '850px',
        transform: 'rotate(1deg)', // TILTED for natural feel
      }}>
        {/* Static noise band at TOP */}
        <div style={{
          position: 'absolute',
          top: '80px',
          left: 0,
          right: 0,
          height: '3px',
          background: 'repeating-linear-gradient(90deg, rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 2px, transparent 2px, transparent 4px)',
          pointerEvents: 'none',
        }} />

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

        {/* Water damage - DARKER edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)', // Darker
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

        {/* Coffee stain bottom */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          right: '60px',
          width: '200px',
          height: '200px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          mixBlendMode: 'multiply',
          opacity: 0.4,
          transform: 'rotate(-30deg)',
          pointerEvents: 'none',
        }} />

        {/* TINY stain near bottom */}
        <div style={{
          position: 'absolute',
          bottom: '120px',
          left: '100px',
          width: '40px',
          height: '40px',
          background: 'radial-gradient(circle, rgba(139,69,19,0.3) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* Fingerprint smudge */}
        <div style={{
          position: 'absolute',
          top: '150px',
          right: '120px',
          width: '70px',
          height: '90px',
          background: 'radial-gradient(ellipse, rgba(0,0,0,0.12) 0%, transparent 70%)',
          transform: 'rotate(35deg)',
          pointerEvents: 'none',
        }} />

        {/* Ripple distortion bottom half */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 10px,
              rgba(0,0,0,0.025) 10px,
              rgba(0,0,0,0.025) 12px
            )
          `,
          pointerEvents: 'none',
          opacity: 0.7,
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Scribbled title with jitter - DARKER */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '38px',
            color: '#0a0a0a', // Darker ink
            marginBottom: '35px',
            transform: 'rotate(-2deg) translateX(-0.8px)',
            borderBottom: '3px solid #0a0a0a',
            paddingBottom: '10px',
          }}>
            Investigation Log - Night 3
          </div>

          {/* Time stamp */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '18px',
            color: '#555',
            marginBottom: '25px',
            transform: 'rotate(0.8deg) translateX(0.5px)',
          }}>
            2:34 AM - Whitmore Estate
          </div>

          {/* Frantic notes with jitter */}
          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '24px',
            color: '#1a0f0a',
            lineHeight: '2',
          }}>
            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(-0.5deg) translateX(-0.6px)',
            }}>
              Something's wrong. EMF spiked to <span style={{ 
                fontWeight: 'bold',
                fontSize: '28px',
                color: '#8b0000',
                textShadow: '2px 2px 4px rgba(139,0,0,0.5)', // Ink bleed
                transform: 'translateX(0.8px)',
                display: 'inline-block',
              }}>5.0</span> in the hallway.
            </div>

            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(0.6deg) translateX(0.7px)',
            }}>
              Temperature dropped <span style={{ fontWeight: 'bold' }}>15 degrees</span> in
              under a minute. My breath is visible.
            </div>

            <div style={{ 
              marginBottom: '20px',
              transform: 'rotate(-0.7deg) translateX(-0.8px)',
              fontSize: '26px',
              fontWeight: 'bold',
              position: 'relative',
            }}>
              I heard it whisper my name.
              {/* Blood smear over this line */}
              <div style={{
                position: 'absolute',
                top: '30%',
                left: '-5%',
                right: '-5%',
                height: '50%',
                background: 'linear-gradient(90deg, transparent, rgba(139,0,0,0.15) 20%, rgba(139,0,0,0.2) 50%, rgba(139,0,0,0.15) 80%, transparent)',
                transform: 'rotate(-1deg)',
                pointerEvents: 'none',
              }} />
            </div>

            <div style={{ 
              marginBottom: '25px',
              transform: 'rotate(0.4deg) translateX(0.6px)',
            }}>
              Camera caught something in the basement.
              Can't explain it. Looks like a shadow but
              it moved <span style={{ 
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}>against</span> the light source.
            </div>

            {/* Crossed out section */}
            <div style={{ 
              marginBottom: '25px',
              transform: 'rotate(-0.6deg) translateX(-0.5px)',
              position: 'relative',
            }}>
              <div style={{
                textDecoration: 'line-through',
                color: '#666',
              }}>
                Maybe I'm just tired. Need to get out.
              </div>
              {/* Scribble over it */}
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

            {/* Small scribbles - "no no no" */}
            <div style={{
              marginBottom: '20px',
              fontSize: '18px',
              color: '#666',
              fontStyle: 'italic',
              transform: 'rotate(-2deg) translateX(-1px)',
              opacity: 0.7,
            }}>
              no no no
            </div>

            {/* Urgent note with blood smear - ROUGHER EDGES */}
            <div style={{
              background: 'rgba(139, 0, 0, 0.15)',
              border: '3px solid #8b0000',
              borderStyle: 'dashed', // ROUGHER
              padding: '20px',
              marginTop: '30px',
              transform: 'rotate(-2deg) translateX(0.7px)', // More tilt
              fontSize: '26px',
              fontWeight: 'bold',
              color: '#4a0000',
              lineHeight: '1.8',
              position: 'relative',
            }}>
              {/* Blood smear across middle */}
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

              <div style={{ transform: 'translateX(-0.7px)' }}>
                IT KNOWS I'M HERE.
              </div>
              <br />
              <br />
              <div style={{ transform: 'translateX(0.6px)' }}>
                Door just slammed shut.
              </div>
              <br />
              <br />
              <div style={{ 
                fontSize: '22px',
                transform: 'translateX(-0.5px)',
              }}>
                Getting out NOW.
              </div>
            </div>

            {/* Shaky signature */}
            <div style={{
              marginTop: '40px',
              fontSize: '28px',
              transform: 'rotate(-4deg) translateX(1.2px)', // More shake
              color: '#1a0f0a',
            }}>
              - Agent M.
            </div>
          </div>

          {/* Ink smudge */}
          <div style={{
            position: 'absolute',
            bottom: '100px',
            left: '50px',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle, rgba(0,0,0,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            transform: 'rotate(45deg)',
          }} />
        </div>
      </div>
    </div>
  );
}

// Evidence Page - CHAOS & OVERLAP
function EvidencePageEnhanced() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Cork board / evidence board aesthetic */}
      <div style={{
        maxWidth: '900px',
        margin: '0 auto',
        background: '#8b7355',
        borderRadius: '8px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
        padding: '60px 40px',
        position: 'relative',
        minHeight: '900px',
      }}>
        {/* REAL Cork board texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${corkboardtexture})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
          opacity: 0.9,
          pointerEvents: 'none',
          borderRadius: '8px',
        }} />

        {/* Additional cork texture overlay for depth */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${corkboardtexture})`,
          backgroundSize: '150%',
          backgroundPosition: '30% 50%',
          mixBlendMode: 'overlay',
          opacity: 0.3,
          pointerEvents: 'none',
        }} />

        {/* Subtle darkening around edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Title card pinned */}
        <div style={{
          position: 'relative',
          background: '#f5f1e8',
          padding: '20px',
          marginBottom: '40px',
          transform: 'rotate(-1deg)',
          boxShadow: '0 6px 16px rgba(0,0,0,0.5)', // Deeper shadow
        }}>
          {/* Pushpin */}
          <div style={{
            position: 'absolute',
            top: '-10px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '20px',
            height: '20px',
            background: '#dc2626',
            borderRadius: '50%',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
          }} />

          <div style={{
            fontFamily: '"Caveat", cursive',
            fontSize: '42px',
            color: '#1a0f0a',
            textAlign: 'center',
            fontWeight: 'bold',
            transform: 'translateX(-0.5px)',
          }}>
            EVIDENCE COLLECTED
          </div>
        </div>

        {/* Evidence items grid - MORE CHAOS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* Polaroid 1 - Ghost 1 - MORE ROTATION */}
          <div style={{
            position: 'relative',
            transform: 'rotate(-6deg)', // More angle
          }}>
            {/* Tape - NOT PERFECTLY ALIGNED */}
            <div style={{
              position: 'absolute',
              top: '-15px',
              left: '28%', // Slightly off-center
              width: '80px',
              height: '25px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              zIndex: 2,
              transform: 'rotate(12deg)', // More angle
            }} />

            <div style={{
              background: '#e8e4dc',
              padding: '12px 12px 45px 12px',
              boxShadow: '0 10px 28px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.4)', // LAYERED shadow
            }}>
              {/* Photo - REAL GHOST IMAGE */}
              <div style={{
                width: '100%',
                height: '200px',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img 
                  src={ghost1} 
                  alt="Ghost manifestation"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Heavy grain + scratches */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${dust})`,
                  mixBlendMode: 'overlay',
                  opacity: 0.6,
                }} />
                {/* Scratch marks */}
                <div style={{
                  position: 'absolute',
                  top: '20%',
                  left: '10%',
                  width: '80%',
                  height: '2px',
                  background: 'rgba(255,255,255,0.3)',
                  transform: 'rotate(-5deg)',
                }} />
              </div>

              {/* Caption with jitter */}
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '18px',
                color: '#1a1a1a',
                marginTop: '10px',
                textAlign: 'center',
                transform: 'translateX(-0.5px)',
              }}>
                Entity - Hallway
              </div>
            </div>

            {/* Red circle mark - ROUGHER */}
            <div style={{
              position: 'absolute',
              bottom: '60px',
              right: '20px',
              width: '50px',
              height: '50px',
              border: '4px solid #dc2626',
              borderRadius: '50%',
              transform: 'rotate(15deg)',
              borderStyle: 'dashed', // Rougher
            }} />

            {/* Fingerprint on corner */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              width: '40px',
              height: '50px',
              background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
              transform: 'rotate(-30deg)',
            }} />
          </div>

          {/* Polaroid 2 - Ghost 2 - OVERLAPPING */}
          <div style={{
            position: 'relative',
            transform: 'rotate(4deg)', // Different angle
            marginTop: '-10px', // OVERLAP
          }}>
            {/* Tape - MISALIGNED */}
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '22%', // Off-center
              width: '70px',
              height: '25px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              zIndex: 2,
              transform: 'rotate(-15deg)', // More angle
            }} />

            <div style={{
              background: '#e8e4dc',
              padding: '12px 12px 45px 12px',
              boxShadow: '0 12px 32px rgba(0,0,0,0.75), 0 5px 12px rgba(0,0,0,0.5)', // LAYERED
            }}>
              <div style={{
                width: '100%',
                height: '200px',
                background: '#0a0a0a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img 
                  src={ghost2} 
                  alt="Ghost manifestation 2"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Heavy grain */}
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
                fontSize: '18px',
                color: '#1a1a1a',
                marginTop: '10px',
                textAlign: 'center',
                transform: 'translateX(0.6px)',
              }}>
                Manifestation - 3:47 AM
              </div>
            </div>

            {/* Urgent mark */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontFamily: 'Impact, sans-serif',
              fontSize: '20px',
              color: '#dc2626',
              transform: 'rotate(-15deg)',
              fontWeight: 'bold',
            }}>
              !!!
            </div>
          </div>

          {/* Polaroid 3 - Classroom - SLIGHTLY TORN */}
          <div style={{
            position: 'relative',
            transform: 'rotate(-3deg)',
          }}>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: '-14px',
              left: '32%',
              width: '75px',
              height: '25px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              zIndex: 2,
              transform: 'rotate(8deg)',
            }} />

            <div style={{
              background: '#e8e4dc',
              padding: '12px 12px 45px 12px',
              boxShadow: '0 10px 28px rgba(0,0,0,0.7), 0 4px 10px rgba(0,0,0,0.4)',
              position: 'relative',
            }}>
              {/* Torn edge effect */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '30px',
                height: '30px',
                background: 'linear-gradient(135deg, transparent 40%, rgba(0,0,0,0.2) 41%, rgba(0,0,0,0.2) 43%, transparent 44%)',
              }} />

              <div style={{
                width: '100%',
                height: '200px',
                background: '#1a1a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <img 
                  src={creepyclassroom} 
                  alt="Location - Classroom"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Grain */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundImage: `url(${dust})`,
                  mixBlendMode: 'overlay',
                  opacity: 0.6,
                }} />
              </div>

              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '18px',
                color: '#1a1a1a',
                marginTop: '10px',
                textAlign: 'center',
                transform: 'translateX(-0.5px)',
              }}>
                Location - Classroom
              </div>
            </div>
          </div>

          {/* Sticky note - Temperature - MORE ROTATION */}
          <div style={{
            position: 'relative',
            transform: 'rotate(-4deg)', // More angle
            marginTop: '-15px', // OVERLAP
          }}>
            <div style={{
              background: '#fbbf24',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)', // Deeper
              minHeight: '200px',
            }}>
              {/* Wrinkle overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url(${wrinkledpaper})`,
                mixBlendMode: 'multiply',
                opacity: 0.4,
                pointerEvents: 'none',
              }} />

              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '24px',
                color: '#1a1a1a',
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{ 
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  fontSize: '26px',
                  transform: 'translateX(-0.6px)',
                }}>
                  Temperature Log:
                </div>
                <div style={{ 
                  marginBottom: '10px',
                  transform: 'translateX(0.4px)',
                }}>
                  2:30 AM - 18°C
                </div>
                <div style={{ 
                  marginBottom: '10px',
                  transform: 'translateX(-0.3px)',
                }}>
                  2:45 AM - 12°C
                </div>
                <div style={{ 
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  fontSize: '28px',
                  textShadow: '2px 2px 4px rgba(220,38,38,0.5)',
                  transform: 'translateX(0.7px)',
                }}>
                  3:00 AM - 3°C !!!
                </div>
                <div style={{ 
                  marginTop: '15px',
                  fontSize: '20px',
                  fontStyle: 'italic',
                  transform: 'translateX(-0.4px)',
                }}>
                  Freezing temps confirmed
                </div>
              </div>
            </div>
          </div>

          {/* Index card - Audio evidence */}
          <div style={{
            position: 'relative',
            transform: 'rotate(2deg)',
          }}>
            {/* Pushpin */}
            <div style={{
              position: 'absolute',
              top: '-8px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '16px',
              height: '16px',
              background: '#3b82f6',
              borderRadius: '50%',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              zIndex: 2,
            }} />

            <div style={{
              background: '#f5f1e8',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              border: '1px solid #d4cfc4',
              minHeight: '200px',
            }}>
              {/* Coffee stain */}
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '10px',
                width: '60px',
                height: '60px',
                backgroundImage: `url(${coffeestain})`,
                backgroundSize: 'contain',
                mixBlendMode: 'multiply',
                opacity: 0.4,
                pointerEvents: 'none',
              }} />

              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '22px',
                color: '#1a0f0a',
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{ 
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  textDecoration: 'underline',
                  transform: 'translateX(-0.4px)',
                }}>
                  Audio Recording:
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  transform: 'translateX(0.5px)',
                }}>
                  🎤 Spirit Box active
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  transform: 'translateX(-0.3px)',
                }}>
                  Timestamp: 2:58 AM
                </div>
                <div style={{
                  background: 'rgba(220, 38, 38, 0.1)',
                  padding: '10px',
                  marginTop: '15px',
                  border: '2px solid #dc2626',
                  fontWeight: 'bold',
                  fontSize: '24px',
                  textShadow: '1.5px 1.5px 3px rgba(220,38,38,0.4)',
                  transform: 'translateX(0.6px)',
                }}>
                  "GET OUT"
                </div>
                <div style={{ 
                  marginTop: '12px',
                  fontSize: '18px',
                  fontStyle: 'italic',
                  transform: 'translateX(-0.5px)',
                }}>
                  Clear EVP response
                </div>
              </div>
            </div>
          </div>

          {/* Torn paper note - CIRCLED EVIDENCE */}
          <div style={{
            position: 'relative',
            transform: 'rotate(-7deg)', // More angle
          }}>
            <div style={{
              background: '#e8e4d8',
              padding: '25px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              position: 'relative',
            }}>
              {/* Ripped edge overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100px',
                height: '150px',
                backgroundImage: `url(${rippedpaper})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                mixBlendMode: 'multiply',
                opacity: 0.8,
                pointerEvents: 'none',
              }} />

              {/* Water damage edges */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.2) 100%)',
                pointerEvents: 'none',
              }} />

              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '26px',
                color: '#1a0f0a',
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{ 
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  fontSize: '28px',
                  color: '#dc2626',
                  textShadow: '2px 2px 4px rgba(220,38,38,0.5)',
                  transform: 'translateX(-0.7px)',
                }}>
                  CONCLUSION:
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  transform: 'translateX(0.4px)',
                  position: 'relative',
                }}>
                  ✓ EMF Level 5
                  {/* Red circle around this */}
                  <div style={{
                    position: 'absolute',
                    top: '-8px',
                    left: '-10px',
                    right: '-10px',
                    bottom: '-8px',
                    border: '3px solid #dc2626',
                    borderRadius: '8px',
                    borderStyle: 'dashed',
                  }} />
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  transform: 'translateX(-0.5px)',
                }}>
                  ✓ Freezing Temps
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  transform: 'translateX(0.6px)',
                }}>
                  ✓ Spirit Box Response
                </div>
                <div style={{
                  marginTop: '20px',
                  padding: '15px',
                  background: 'rgba(139, 0, 0, 0.2)',
                  border: '3px solid #8b0000',
                  fontWeight: 'bold',
                  fontSize: '30px',
                  textAlign: 'center',
                  transform: 'rotate(-2deg) translateX(0.8px)',
                  textShadow: '2.5px 2.5px 5px rgba(139,0,0,0.5)',
                }}>
                  WRAITH
                </div>
              </div>
            </div>
          </div>

          {/* Burned note */}
          <div style={{
            position: 'relative',
            transform: 'rotate(3deg)',
          }}>
            <div style={{
              background: '#d4c4a8',
              padding: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
              position: 'relative',
              minHeight: '200px',
            }}>
              {/* Burn damage */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                width: '120px',
                height: '120px',
                backgroundImage: `url(${burnhole})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                mixBlendMode: 'multiply',
                opacity: 0.9,
                pointerEvents: 'none',
              }} />

              {/* Fingerprint */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                width: '50px',
                height: '65px',
                background: 'radial-gradient(ellipse, rgba(0,0,0,0.15) 0%, transparent 70%)',
                transform: 'rotate(-20deg)',
                pointerEvents: 'none',
              }} />

              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '24px',
                color: '#1a0f0a',
                lineHeight: '1.8',
                position: 'relative',
                zIndex: 1,
              }}>
                <div style={{ 
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  fontSize: '26px',
                  transform: 'translateX(-0.5px)',
                }}>
                  Final Notes:
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  transform: 'translateX(0.4px)',
                }}>
                  Entity is HOSTILE
                </div>
                <div style={{ 
                  marginBottom: '12px',
                  transform: 'translateX(-0.6px)',
                }}>
                  Recommend immediate
                </div>
                <div style={{ 
                  fontSize: '28px',
                  fontWeight: 'bold',
                  color: '#dc2626',
                  textShadow: '2px 2px 4px rgba(220,38,38,0.5)',
                  transform: 'translateX(0.8px)',
                }}>
                  EVACUATION
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Red string connections - ROUGHER */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            opacity: 0.4, // More visible
          }}
        >
          <line
            x1="30%"
            y1="40%"
            x2="70%"
            y2="60%"
            stroke="#dc2626"
            strokeWidth="3" // Thicker
            strokeDasharray="8,4" // Rougher
          />
          <line
            x1="50%"
            y1="30%"
            x2="50%"
            y2="70%"
            stroke="#dc2626"
            strokeWidth="3"
            strokeDasharray="8,4"
          />
          <line
            x1="20%"
            y1="50%"
            x2="80%"
            y2="55%"
            stroke="#dc2626"
            strokeWidth="2"
            strokeDasharray="6,3"
          />
        </svg>
      </div>
    </div>
  );
}
