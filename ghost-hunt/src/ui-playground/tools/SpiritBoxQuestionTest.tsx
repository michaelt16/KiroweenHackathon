import { useState, useEffect } from 'react';
import { SpiritBoxTool } from '../../components/Investigation/Tools/SpiritBoxTool';
import { useInvestigationStore } from '../../stores/investigationStore';

/**
 * Test component for Spirit Box Question UI and Word Display Animation
 * Tests:
 * - Question buttons that appear when signal is locked
 * - Typed-out word animation (0.5-1s duration)
 * - Green phosphor glow effect (CRT aesthetic)
 * - Word clearing before showing new word
 * - Question cooldown system (2-3 seconds)
 * - Cooldown cancellation when signal lock is lost
 */
export function SpiritBoxQuestionTest() {
  const [isLocked, setIsLocked] = useState(true);
  const [evpResponse, setEvpResponse] = useState('');
  const [showEvp, setShowEvp] = useState(false);
  
  // Get cooldown state from store
  const questionCooldown = useInvestigationStore((state) => state.spiritBoxState.questionCooldown);
  const cooldownEndTime = useInvestigationStore((state) => state.spiritBoxState.cooldownEndTime);
  const startQuestionCooldown = useInvestigationStore((state) => state.startQuestionCooldown);
  const endQuestionCooldown = useInvestigationStore((state) => state.endQuestionCooldown);
  
  // Track cooldown time remaining for display
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  
  // Update cooldown timer
  useEffect(() => {
    if (questionCooldown && cooldownEndTime) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, cooldownEndTime - Date.now());
        setCooldownRemaining(Math.ceil(remaining / 1000));
        
        if (remaining <= 0) {
          clearInterval(interval);
        }
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setCooldownRemaining(0);
    }
  }, [questionCooldown, cooldownEndTime]);

  const testWords = [
    '...behind...',
    '...get out...',
    '...help...',
    '...cold...',
    '...here...',
    '...watching...',
    '...leave now...',
  ];

  const triggerTestWord = () => {
    // Check if cooldown is active
    if (questionCooldown) {
      console.log('Question cooldown active, cannot trigger word');
      return;
    }
    
    // Start cooldown
    startQuestionCooldown();
    
    // Clear previous word
    setShowEvp(false);
    setEvpResponse('');
    
    // Show new word after brief delay
    setTimeout(() => {
      const randomWord = testWords[Math.floor(Math.random() * testWords.length)];
      setEvpResponse(randomWord);
      setShowEvp(true);
      
      // Auto-hide after 3 seconds
      setTimeout(() => {
        setShowEvp(false);
      }, 3000);
    }, 100);
  };
  
  const testCooldownCancellation = () => {
    // Start cooldown
    startQuestionCooldown();
    
    // After 1 second, lose signal lock (should cancel cooldown)
    setTimeout(() => {
      setIsLocked(false);
    }, 1000);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Control Panel */}
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        zIndex: 1000,
        background: 'rgba(0,0,0,0.9)',
        padding: '16px',
        borderRadius: '8px',
        border: '2px solid #00ff00',
      }}>
        <div style={{
          color: '#00ff00',
          fontFamily: '"Courier New", monospace',
          fontSize: '12px',
          marginBottom: '12px',
        }}>
          SPIRIT BOX TEST CONTROLS
        </div>
        
        <button
          onClick={() => setIsLocked(!isLocked)}
          style={{
            padding: '8px 16px',
            background: isLocked ? '#00ff00' : '#333',
            color: isLocked ? '#000' : '#fff',
            border: '2px solid #00ff00',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            marginBottom: '8px',
            width: '100%',
          }}
        >
          {isLocked ? '● SIGNAL LOCKED' : '○ SIGNAL LOST'}
        </button>
        
        <button
          onClick={triggerTestWord}
          disabled={questionCooldown}
          style={{
            padding: '8px 16px',
            background: questionCooldown ? '#666' : '#ff6600',
            color: questionCooldown ? '#999' : '#000',
            border: `2px solid ${questionCooldown ? '#666' : '#ff6600'}`,
            borderRadius: '4px',
            cursor: questionCooldown ? 'not-allowed' : 'pointer',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            width: '100%',
            marginBottom: '8px',
            opacity: questionCooldown ? 0.5 : 1,
          }}
        >
          {questionCooldown ? `COOLDOWN (${cooldownRemaining}s)` : 'TEST WORD ANIMATION'}
        </button>
        
        <button
          onClick={testCooldownCancellation}
          style={{
            padding: '8px 16px',
            background: '#ffaa00',
            color: '#000',
            border: '2px solid #ffaa00',
            borderRadius: '4px',
            cursor: 'pointer',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            width: '100%',
            marginBottom: '8px',
          }}
        >
          TEST COOLDOWN CANCEL
        </button>
        
        <button
          onClick={endQuestionCooldown}
          disabled={!questionCooldown}
          style={{
            padding: '8px 16px',
            background: questionCooldown ? '#cc0000' : '#666',
            color: questionCooldown ? '#fff' : '#999',
            border: `2px solid ${questionCooldown ? '#cc0000' : '#666'}`,
            borderRadius: '4px',
            cursor: questionCooldown ? 'pointer' : 'not-allowed',
            fontFamily: '"Courier New", monospace',
            fontSize: '12px',
            fontWeight: 'bold',
            width: '100%',
            opacity: questionCooldown ? 1 : 0.5,
          }}
        >
          FORCE END COOLDOWN
        </button>
        
        <div style={{
          marginTop: '12px',
          color: '#00ff00',
          fontFamily: '"Courier New", monospace',
          fontSize: '10px',
          opacity: 0.7,
          lineHeight: '1.4',
        }}>
          • Word button starts 2.5s cooldown<br/>
          • Cancel test loses signal after 1s<br/>
          • Force end stops cooldown early
        </div>
        
        {questionCooldown && (
          <div style={{
            marginTop: '12px',
            padding: '8px',
            background: 'rgba(255,170,0,0.2)',
            border: '1px solid #ffaa00',
            borderRadius: '4px',
            color: '#ffaa00',
            fontFamily: '"Courier New", monospace',
            fontSize: '11px',
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
            ⏱️ COOLDOWN ACTIVE<br/>
            {cooldownRemaining}s remaining
          </div>
        )}
      </div>

      {/* Spirit Box Component */}
      <SpiritBoxTool
        mode="view"
        frequency={87.5}
        staticLevel={0.3}
        evpResponse={evpResponse}
        showEvp={showEvp}
        isSignalLocked={isLocked}
      />
    </div>
  );
}
