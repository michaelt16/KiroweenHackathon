// Demo for AnalogCharmsIndicator component
import { useState } from 'react';
import { AnalogCharmsIndicator } from '../components/Equipment';

export function AnalogCharmsIndicatorDemo() {
  const [count, setCount] = useState(7);
  
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '40px',
      padding: '20px',
    }}>
      <h1 style={{
        fontFamily: '"Courier New", monospace',
        color: '#00ff55',
        fontSize: '24px',
        marginBottom: '20px',
      }}>
        AnalogCharmsIndicator Demo
      </h1>
      
      {/* Component Display */}
      <div style={{
        background: '#2a2a2a',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
      }}>
        <AnalogCharmsIndicator count={count} />
      </div>
      
      {/* Controls */}
      <div style={{
        display: 'flex',
        gap: '20px',
        alignItems: 'center',
      }}>
        <button
          onClick={() => setCount(Math.max(0, count - 1))}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            fontFamily: '"Courier New", monospace',
            background: '#ff4444',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          -1
        </button>
        
        <div style={{
          fontFamily: '"Courier New", monospace',
          fontSize: '20px',
          color: '#00ff55',
          minWidth: '100px',
          textAlign: 'center',
        }}>
          Count: {count}
        </div>
        
        <button
          onClick={() => setCount(Math.min(99, count + 1))}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            fontFamily: '"Courier New", monospace',
            background: '#44ff44',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          +1
        </button>
        
        <button
          onClick={() => setCount(Math.min(99, count + 5))}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            fontFamily: '"Courier New", monospace',
            background: '#44ff44',
            color: '#000',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          +5
        </button>
      </div>
      
      {/* Test Cases */}
      <div style={{
        display: 'flex',
        gap: '20px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {[0, 3, 5, 7, 12, 23, 50, 99].map(testCount => (
          <button
            key={testCount}
            onClick={() => setCount(testCount)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontFamily: '"Courier New", monospace',
              background: count === testCount ? '#00ff55' : '#444',
              color: count === testCount ? '#000' : '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Set to {testCount}
          </button>
        ))}
      </div>
      
      {/* Multiple instances */}
      <div style={{
        display: 'flex',
        gap: '30px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '20px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: '"Courier New", monospace', 
            color: '#00ff55', 
            marginBottom: '10px',
            fontSize: '12px',
          }}>
            Empty (0)
          </div>
          <AnalogCharmsIndicator count={0} />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: '"Courier New", monospace', 
            color: '#00ff55', 
            marginBottom: '10px',
            fontSize: '12px',
          }}>
            Few (3)
          </div>
          <AnalogCharmsIndicator count={3} />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: '"Courier New", monospace', 
            color: '#00ff55', 
            marginBottom: '10px',
            fontSize: '12px',
          }}>
          Group (5)
          </div>
          <AnalogCharmsIndicator count={5} />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: '"Courier New", monospace', 
            color: '#00ff55', 
            marginBottom: '10px',
            fontSize: '12px',
          }}>
            Many (23)
          </div>
          <AnalogCharmsIndicator count={23} />
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            fontFamily: '"Courier New", monospace', 
            color: '#00ff55', 
            marginBottom: '10px',
            fontSize: '12px',
          }}>
            Max (99)
          </div>
          <AnalogCharmsIndicator count={99} />
        </div>
      </div>
    </div>
  );
}
