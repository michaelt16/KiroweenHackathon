
// Texture imports
import coffeestain from '../../assets/texture/coffeestain.png';
import dust from '../../assets/texture/dust.png';
import tape from '../../assets/texture/tape.png';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import corkboardtexture from '../../assets/texture/corkboardtexture.png';
import stickynote from '../../assets/texture/stickynote.png';
import ghost2 from '../../assets/images/ghost2.png';

// Case File - Evidence Summary
export function CaseFileExample() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0d0a08',
      padding: '40px 20px',
      position: 'relative',
    }}>
      {/* Cork board */}
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
        {/* Cork texture */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${corkboardtexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'multiply',
          opacity: 0.9,
          pointerEvents: 'none',
          borderRadius: '8px',
        }} />

        {/* Darkening edges */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          {/* Title card */}
          <div style={{
            background: '#f4f0e6',
            padding: '25px',
            marginBottom: '40px',
            transform: 'rotate(-1deg)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.6)',
            border: '3px solid #8B4513',
            position: 'relative',
          }}>
            {/* Tape */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%) rotate(-5deg)',
              width: '80px',
              height: '25px',
              backgroundImage: `url(${tape})`,
              backgroundSize: 'cover',
              zIndex: 2,
            }} />

            <div style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '38px',
              color: '#1a0f0a',
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: '8px',
              transform: 'rotate(-0.5deg)',
            }}>
              CASE FILE #2847
            </div>
            <div style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '20px',
              color: '#8B4513',
              textAlign: 'center',
              transform: 'rotate(0.3deg)',
            }}>
              Whitmore Estate Investigation
            </div>

            {/* Classified stamp */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              transform: 'rotate(18deg)',
              border: '4px solid #dc2626',
              padding: '6px 12px',
              fontFamily: 'Impact, sans-serif',
              fontSize: '18px',
              color: '#dc2626',
              letterSpacing: '2px',
              opacity: 0.7,
            }}>
              CLOSED
            </div>
          </div>

          {/* Evidence grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '30px',
            marginBottom: '40px',
          }}>
            {/* Evidence card 1 */}
            <div style={{
              background: '#f4f0e6',
              padding: '20px',
              transform: 'rotate(-2deg)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
              border: '2px solid #8B4513',
              position: 'relative',
            }}>
              {/* Push pin */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '30px',
                width: '12px',
                height: '12px',
                backgroundColor: '#dc2626',
                borderRadius: '50% 50% 50% 0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                transform: 'rotate(45deg)',
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
                opacity: 0.6,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a0f0a',
                  marginBottom: '12px',
                  transform: 'rotate(-0.5deg)',
                }}>
                  EMF Evidence
                </div>

                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '18px',
                  color: '#1a0f0a',
                  lineHeight: '1.7',
                }}>
                  <div style={{ transform: 'rotate(0.3deg) translateX(0.4px)' }}>
                    Peak reading: <span style={{ fontWeight: 'bold', color: '#8b0000' }}>5.0</span>
                  </div>
                  <div style={{ transform: 'rotate(-0.4deg) translateX(-0.5px)' }}>
                    Location: 2nd floor hallway
                  </div>
                  <div style={{ transform: 'rotate(0.5deg) translateX(0.6px)' }}>
                    Time: 22:15
                  </div>
                  <div style={{ 
                    marginTop: '10px',
                    fontWeight: 'bold',
                    color: '#22c55e',
                    transform: 'rotate(-0.3deg)',
                  }}>
                    ✓ CONFIRMED
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence card 2 */}
            <div style={{
              background: '#f4f0e6',
              padding: '20px',
              transform: 'rotate(1.5deg)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
              border: '2px solid #8B4513',
              position: 'relative',
            }}>
              {/* Push pin */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                right: '30px',
                width: '12px',
                height: '12px',
                backgroundColor: '#dc2626',
                borderRadius: '50% 50% 50% 0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
                transform: 'rotate(45deg)',
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
                opacity: 0.6,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a0f0a',
                  marginBottom: '12px',
                  transform: 'rotate(0.6deg)',
                }}>
                  Temperature
                </div>

                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '18px',
                  color: '#1a0f0a',
                  lineHeight: '1.7',
                }}>
                  <div style={{ transform: 'rotate(-0.5deg) translateX(-0.6px)' }}>
                    Lowest: <span style={{ fontWeight: 'bold', color: '#8b0000' }}>-2°C</span>
                  </div>
                  <div style={{ transform: 'rotate(0.4deg) translateX(0.5px)' }}>
                    Baseline: 8°C
                  </div>
                  <div style={{ transform: 'rotate(-0.3deg) translateX(-0.4px)' }}>
                    Drop duration: 30 seconds
                  </div>
                  <div style={{ 
                    marginTop: '10px',
                    fontWeight: 'bold',
                    color: '#22c55e',
                    transform: 'rotate(0.5deg)',
                  }}>
                    ✓ FREEZING CONFIRMED
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence card 3 */}
            <div style={{
              background: '#f4f0e6',
              padding: '20px',
              transform: 'rotate(2deg)',
              boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
              border: '2px solid #8B4513',
              position: 'relative',
            }}>
              {/* Push pin */}
              <div style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%) rotate(45deg)',
                width: '12px',
                height: '12px',
                backgroundColor: '#dc2626',
                borderRadius: '50% 50% 50% 0',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
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
                opacity: 0.6,
                pointerEvents: 'none',
              }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a0f0a',
                  marginBottom: '12px',
                  transform: 'rotate(-0.7deg)',
                }}>
                  Spirit Box
                </div>

                <div style={{
                  fontFamily: '"Caveat", cursive',
                  fontSize: '18px',
                  color: '#1a0f0a',
                  lineHeight: '1.7',
                }}>
                  <div style={{ transform: 'rotate(0.6deg) translateX(0.7px)' }}>
                    Responses: <span style={{ fontWeight: 'bold' }}>3</span>
                  </div>
                  <div style={{ transform: 'rotate(-0.4deg) translateX(-0.5px)' }}>
                    Clarity: High
                  </div>
                  <div style={{ transform: 'rotate(0.5deg) translateX(0.6px)' }}>
                    Voice pattern: Female
                  </div>
                  <div style={{ 
                    marginTop: '10px',
                    fontWeight: 'bold',
                    color: '#22c55e',
                    transform: 'rotate(-0.6deg)',
                  }}>
                    ✓ CONFIRMED
                  </div>
                </div>
              </div>
            </div>

            {/* Photo evidence */}
            <div style={{
              position: 'relative',
              transform: 'rotate(-3deg)',
            }}>
              {/* Polaroid */}
              <div style={{
                background: '#e8e4dc',
                padding: '12px 12px 40px 12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
              }}>
                {/* Tape */}
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  left: '50%',
                  transform: 'translateX(-50%) rotate(-7deg)',
                  width: '80px',
                  height: '25px',
                  backgroundImage: `url(${tape})`,
                  backgroundSize: 'cover',
                  zIndex: 2,
                }} />

                <div style={{
                  width: '100%',
                  height: '200px',
                  background: '#1a1a1a',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  <img 
                    src={ghost2} 
                    alt="Evidence"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                  {/* Static */}
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
                  transform: 'rotate(-1deg)',
                }}>
                  Master bedroom - 22:47
                </div>
              </div>
            </div>
          </div>

          {/* Sticky note - Conclusion */}
          <div style={{
            position: 'relative',
            width: '350px',
            margin: '0 auto',
            transform: 'rotate(-8deg)',
          }}>
            {/* Push pin */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              left: '50%',
              transform: 'translateX(-50%) rotate(45deg)',
              width: '14px',
              height: '14px',
              backgroundColor: '#dc2626',
              borderRadius: '50% 50% 50% 0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              zIndex: 2,
            }} />

            <div style={{
              backgroundImage: `url(${stickynote})`,
              backgroundSize: 'cover',
              padding: '25px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.5)',
              minHeight: '200px',
            }}>
              <div style={{
                fontFamily: '"Caveat", cursive',
                fontSize: '26px',
                color: '#1a1a1a',
                lineHeight: '1.8',
                textAlign: 'center',
              }}>
                <div style={{ 
                  fontWeight: 'bold',
                  marginBottom: '15px',
                  fontSize: '28px',
                  transform: 'rotate(-1deg)',
                }}>
                  CONCLUSION
                </div>

                <div style={{ transform: 'rotate(0.5deg) translateX(0.6px)' }}>
                  Entity identified:
                </div>
                <div style={{ 
                  fontWeight: 'bold',
                  fontSize: '32px',
                  color: '#8b0000',
                  marginTop: '10px',
                  marginBottom: '10px',
                  textShadow: '2px 2px 4px rgba(139,0,0,0.5)',
                  transform: 'rotate(-0.8deg)',
                }}>
                  WRAITH
                </div>

                <div style={{ 
                  fontSize: '20px',
                  marginTop: '15px',
                  transform: 'rotate(0.6deg)',
                }}>
                  Case Status: CLOSED
                </div>
                <div style={{ 
                  fontSize: '18px',
                  color: '#666',
                  marginTop: '8px',
                  transform: 'rotate(-0.4deg)',
                }}>
                  Cleansing scheduled
                </div>
              </div>
            </div>
          </div>

          {/* Coffee stain on cork */}
          <div style={{
            position: 'absolute',
            bottom: '80px',
            right: '100px',
            width: '150px',
            height: '150px',
            backgroundImage: `url(${coffeestain})`,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            mixBlendMode: 'multiply',
            opacity: 0.5,
            transform: 'rotate(45deg)',
            pointerEvents: 'none',
          }} />
        </div>
      </div>
    </div>
  );
}

export default CaseFileExample;
