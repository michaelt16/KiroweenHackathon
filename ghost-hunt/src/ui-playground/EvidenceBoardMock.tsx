// Evidence Board Mock - Detective Investigation Board
// Pure visual mockup - no functionality

export function EvidenceBoardMock() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#8b7355',
      backgroundImage: `
        repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 6px),
        repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.05) 3px, rgba(0,0,0,0.05) 6px),
        radial-gradient(circle at 30% 40%, rgba(101, 67, 33, 0.1) 0%, transparent 50%)
      `,
      position: 'relative',
      overflow: 'hidden',
      padding: '40px',
    }}>
      {/* Red string connections - background layer */}
      <svg style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        {/* String lines connecting evidence */}
        <line x1="50%" y1="20%" x2="30%" y2="45%" stroke="#8b0000" strokeWidth="2" />
        <line x1="50%" y1="20%" x2="70%" y2="45%" stroke="#8b0000" strokeWidth="2" />
        <line x1="30%" y1="45%" x2="50%" y2="70%" stroke="#8b0000" strokeWidth="2" />
        <line x1="70%" y1="45%" x2="50%" y2="70%" stroke="#8b0000" strokeWidth="2" />
        <line x1="30%" y1="45%" x2="20%" y2="65%" stroke="#8b0000" strokeWidth="2" strokeDasharray="5,5" />
        <line x1="70%" y1="45%" x2="80%" y2="65%" stroke="#8b0000" strokeWidth="2" strokeDasharray="5,5" />
      </svg>

      {/* Center: ACTIVE CASE card */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        background: '#fff',
        padding: '20px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
        border: '3px solid #8b0000',
        zIndex: 10,
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute',
          top: '-15px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '20px',
          height: '20px',
          background: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          border: '2px solid #8b0000',
        }} />
        
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          color: '#666',
          letterSpacing: '2px',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          CASE #2024-113
        </div>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          textAlign: 'center',
          marginBottom: '12px',
        }}>
          ACTIVE CASE
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '14px',
          color: '#1a1a1a',
          lineHeight: '1.6',
          marginBottom: '12px',
        }}>
          <div><strong>Location:</strong> Whitmore Estate</div>
          <div><strong>Entity:</strong> Unknown</div>
          <div><strong>Threat:</strong> <span style={{ color: '#8b0000', fontWeight: 'bold' }}>HIGH</span></div>
        </div>
        <div style={{
          background: '#ffeb3b',
          padding: '10px',
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          color: '#1a1a1a',
          fontStyle: 'italic',
        }}>
          "Multiple witnesses. Consistent reports. Investigate immediately."
        </div>
      </div>

      {/* Top Left: Location Photo */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '8%',
        width: '200px',
        transform: 'rotate(-3deg)',
        zIndex: 5,
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '16px',
          height: '16px',
          background: '#666',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        }} />
        
        <div style={{
          background: '#fff',
          padding: '12px 12px 40px 12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        }}>
          <div style={{
            width: '100%',
            height: '150px',
            background: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '60px',
          }}>
            🏚️
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '10px',
            color: '#333',
            marginTop: '8px',
            textAlign: 'center',
          }}>
            Whitmore Estate - Front
          </div>
        </div>
        
        {/* Handwritten arrow */}
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          right: '-40px',
          fontSize: '30px',
          color: '#8b0000',
          transform: 'rotate(45deg)',
        }}>
          →
        </div>
      </div>

      {/* Top Right: Witness Statement */}
      <div style={{
        position: 'absolute',
        top: '15%',
        right: '8%',
        width: '220px',
        background: '#f5f1e8',
        padding: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        transform: 'rotate(2deg)',
        zIndex: 5,
        border: '1px solid #ccc',
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '20px',
          width: '16px',
          height: '16px',
          background: '#666',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        }} />
        
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: '#666',
          letterSpacing: '1px',
          marginBottom: '8px',
        }}>
          WITNESS STATEMENT
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '11px',
          color: '#1a1a1a',
          lineHeight: '1.6',
        }}>
          "I heard footsteps on the second floor. No one was there. The temperature dropped suddenly. I felt like I was being watched."
          <br /><br />
          - Sarah M., 11/10/24
        </div>
      </div>

      {/* Middle Left: EMF Evidence */}
      <div style={{
        position: 'absolute',
        top: '45%',
        left: '15%',
        width: '180px',
        background: '#fff',
        padding: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        transform: 'rotate(-5deg)',
        zIndex: 5,
        border: '2px solid #ccc',
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '30px',
          width: '16px',
          height: '16px',
          background: '#666',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        }} />
        
        <div style={{
          fontSize: '50px',
          textAlign: 'center',
          marginBottom: '12px',
        }}>
          📊
        </div>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          EMF READING
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#8b0000',
          textAlign: 'center',
        }}>
          5.0
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '10px',
          color: '#666',
          textAlign: 'center',
          marginTop: '8px',
        }}>
          2nd Floor Hallway
        </div>
      </div>

      {/* Middle Right: Temperature Evidence */}
      <div style={{
        position: 'absolute',
        top: '45%',
        right: '15%',
        width: '180px',
        background: '#fff',
        padding: '16px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        transform: 'rotate(4deg)',
        zIndex: 5,
        border: '2px solid #ccc',
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          right: '30px',
          width: '16px',
          height: '16px',
          background: '#666',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        }} />
        
        <div style={{
          fontSize: '50px',
          textAlign: 'center',
          marginBottom: '12px',
        }}>
          🌡️
        </div>
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#1a1a1a',
          textAlign: 'center',
          marginBottom: '8px',
        }}>
          TEMPERATURE
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#0066cc',
          textAlign: 'center',
        }}>
          -15°C
        </div>
        <div style={{
          fontFamily: 'Courier New, monospace',
          fontSize: '10px',
          color: '#666',
          textAlign: 'center',
          marginTop: '8px',
        }}>
          Extreme Drop
        </div>
      </div>

      {/* Bottom Center: Ghost Photo */}
      <div style={{
        position: 'absolute',
        bottom: '15%',
        left: '50%',
        transform: 'translateX(-50%) rotate(-2deg)',
        width: '200px',
        zIndex: 5,
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '16px',
          height: '16px',
          background: '#ef4444',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
          border: '2px solid #8b0000',
        }} />
        
        <div style={{
          background: '#fff',
          padding: '12px 12px 40px 12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        }}>
          <div style={{
            width: '100%',
            height: '150px',
            background: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '70px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ filter: 'blur(2px)', opacity: 0.6 }}>👻</div>
            {/* Static overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: `
                repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)
              `,
            }} />
          </div>
          <div style={{
            fontFamily: 'Courier New, monospace',
            fontSize: '10px',
            color: '#333',
            marginTop: '8px',
            textAlign: 'center',
          }}>
            Manifestation - 11/13/24
          </div>
        </div>
        
        {/* Red circle */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '220px',
          height: '220px',
          border: '4px solid #8b0000',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Bottom Left: Sticky Note */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        width: '140px',
        height: '140px',
        background: '#ffeb3b',
        padding: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transform: 'rotate(-8deg)',
        fontFamily: 'Courier New, monospace',
        fontSize: '12px',
        color: '#1a1a1a',
        zIndex: 5,
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>
          Possible location?
        </div>
        <div style={{ lineHeight: '1.6', fontSize: '11px' }}>
          • 2nd floor hallway
          <br />
          • Near old bedroom
          <br />
          • Check at midnight
        </div>
      </div>

      {/* Bottom Right: Sticky Note */}
      <div style={{
        position: 'absolute',
        bottom: '20%',
        right: '10%',
        width: '140px',
        height: '140px',
        background: '#ff9999',
        padding: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        transform: 'rotate(6deg)',
        fontFamily: 'Courier New, monospace',
        fontSize: '12px',
        color: '#1a1a1a',
        zIndex: 5,
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '10px', textAlign: 'center' }}>
          ⚠ WARNING ⚠
        </div>
        <div style={{ lineHeight: '1.6', fontSize: '11px' }}>
          Aggressive behavior
          <br /><br />
          Do NOT investigate alone
        </div>
      </div>

      {/* Top Center: Map */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '20%',
        width: '160px',
        background: '#f5f1e8',
        padding: '12px',
        boxShadow: '0 6px 20px rgba(0,0,0,0.5)',
        transform: 'rotate(-8deg)',
        zIndex: 4,
        border: '1px solid #ccc',
      }}>
        {/* Pin */}
        <div style={{
          position: 'absolute',
          top: '-10px',
          left: '20px',
          width: '16px',
          height: '16px',
          background: '#666',
          borderRadius: '50%',
          boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
        }} />
        
        <div style={{
          fontFamily: 'Arial, sans-serif',
          fontSize: '10px',
          color: '#666',
          marginBottom: '8px',
          textAlign: 'center',
        }}>
          FLOOR PLAN
        </div>
        <div style={{
          width: '100%',
          height: '120px',
          border: '2px solid #1a1a1a',
          position: 'relative',
          background: '#fff',
        }}>
          {/* Simple floor plan */}
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '60%',
            height: '60%',
            border: '2px solid #666',
          }} />
          {/* X mark */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '30px',
            color: '#8b0000',
            fontWeight: 'bold',
          }}>
            ✗
          </div>
        </div>
      </div>

      {/* Handwritten note in corner */}
      <div style={{
        position: 'absolute',
        bottom: '5%',
        right: '5%',
        fontFamily: 'Courier New, monospace',
        fontSize: '14px',
        color: '#8b0000',
        transform: 'rotate(-5deg)',
        fontWeight: 'bold',
        zIndex: 5,
      }}>
        Why here?
      </div>
    </div>
  );
}
