import { useState, useEffect, useMemo, memo } from 'react';
import metalTexture from '../../../assets/texture/metalscratchedtexture.png';
import dirtyGlass from '../../../assets/texture/dirtyglass.png';
import dust from '../../../assets/texture/dust.png';
import tape from '../../../assets/texture/tape.png';
import rust from '../../../assets/texture/brownrust.png';
import filmgrain from '../../../assets/texture/filmgrain.png';
import crtTexture from '../../../assets/texture/crtexture.png';
import { useInvestigationStore } from '../../../stores/investigationStore';
import { useGhostStore } from '../../../stores/ghostStore';
import { selectContextualWord, shouldGhostRespond, type QuestionId } from '../../../data/spiritBoxWords';

/**
 * SpiritBoxTool - Production component for oscilloscope-style spirit box
 * 
 * Shows waveform visualization with EVP text overlays
 * 
 * Supports two modes:
 * - 'view': Inventory viewer mode with internal mock state
 * - 'investigation': Active investigation mode with real EVP data
 * 
 * Design reference: src/ui-playground/tools/SpiritBoxMock.tsx
 */

export interface SpiritBoxToolProps {
  mode: 'view' | 'investigation';
  // Investigation mode props
  frequency?: number;
  staticLevel?: number;
  evpResponse?: string;
  showEvp?: boolean;
  isSignalLocked?: boolean; // NEW: Signal lock state (both knobs aligned)
  knobALocked?: boolean; // NEW: Knob A (Carrier Frequency) lock state
  knobBLocked?: boolean; // NEW: Knob B (Modulation Frequency) lock state
}

interface SpiritBoxQuestion {
  id: 'q1' | 'q2' | 'q3';
  text: string;
  category: 'nature' | 'presence' | 'motivation';
}

const QUESTIONS: SpiritBoxQuestion[] = [
  { id: 'q1', text: 'What do you want?', category: 'motivation' },
  { id: 'q2', text: 'Where are you?', category: 'presence' },
  { id: 'q3', text: 'Are you here?', category: 'presence' },
];

const SpiritBoxToolComponent = ({
  mode,
  frequency = 87.5,
  staticLevel = 0.3,
  evpResponse = '',
  showEvp = false,
  isSignalLocked = false,
  knobALocked = false,
  knobBLocked = false,
}: SpiritBoxToolProps) => {
  // Internal state for view mode
  const [mockFrequency, setMockFrequency] = useState(87.5);
  const [mockStaticLevel, setMockStaticLevel] = useState(0.3);
  const [waveform, setWaveform] = useState<number[]>([]);
  const [mockResponse, setMockResponse] = useState('');
  const [mockShowResponse, setMockShowResponse] = useState(false);
  const [mockSignalLocked, setMockSignalLocked] = useState(false);
  const [mockKnobALocked, setMockKnobALocked] = useState(false);
  const [mockKnobBLocked, setMockKnobBLocked] = useState(false);
  
  // Word display animation state
  const [displayedWord, setDisplayedWord] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const responses = useMemo(() => 
    ['...behind...', '...get out...', '...help...', '...cold...', '...here...'],
    []
  );

  // Investigation store access (only used in investigation mode)
  const activeGhostType = useInvestigationStore((state) => state.activeGhostType);
  const questionCooldown = useInvestigationStore((state) => state.spiritBoxState.questionCooldown);
  const startQuestionCooldown = useInvestigationStore((state) => state.startQuestionCooldown);
  const logEvidence = useInvestigationStore((state) => state.logEvidence);
  const addWordHeard = useInvestigationStore((state) => state.addWordHeard);
  const getActiveGhostBehavior = useGhostStore((state) => state.getActiveGhostBehavior);

  // Memoize data calculations
  const effectiveFrequency = useMemo(() => 
    mode === 'view' ? mockFrequency : frequency,
    [mode, mockFrequency, frequency]
  );
  
  const effectiveStaticLevel = useMemo(() => 
    mode === 'view' ? mockStaticLevel : staticLevel,
    [mode, mockStaticLevel, staticLevel]
  );
  
  const effectiveResponse = useMemo(() => 
    mode === 'view' ? mockResponse : evpResponse,
    [mode, mockResponse, evpResponse]
  );
  
  const effectiveShowResponse = useMemo(() => 
    mode === 'view' ? mockShowResponse : showEvp,
    [mode, mockShowResponse, showEvp]
  );
  
  const effectiveSignalLocked = useMemo(() => 
    mode === 'view' ? mockSignalLocked : isSignalLocked,
    [mode, mockSignalLocked, isSignalLocked]
  );
  
  const effectiveKnobALocked = useMemo(() => 
    mode === 'view' ? mockKnobALocked : knobALocked,
    [mode, mockKnobALocked, knobALocked]
  );
  
  const effectiveKnobBLocked = useMemo(() => 
    mode === 'view' ? mockKnobBLocked : knobBLocked,
    [mode, mockKnobBLocked, knobBLocked]
  );
  
  // Both knobs must be locked for questions to appear
  const bothKnobsLocked = useMemo(() => 
    effectiveKnobALocked && effectiveKnobBLocked,
    [effectiveKnobALocked, effectiveKnobBLocked]
  );

  /**
   * Typed-out word animation effect
   * Displays word character by character with 0.5-1s duration
   * Requirement 13: Display selected word with typed-out animation
   */
  useEffect(() => {
    if (!effectiveResponse || !effectiveShowResponse) {
      setDisplayedWord('');
      setIsTyping(false);
      return;
    }

    // Clear previous word before showing new one
    setDisplayedWord('');
    setIsTyping(true);

    const word = effectiveResponse;
    const typingDuration = 700; // 0.7s for typing animation
    const charDelay = typingDuration / word.length;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex < word.length) {
        setDisplayedWord(word.substring(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, charDelay);

    return () => clearInterval(typingInterval);
  }, [effectiveResponse, effectiveShowResponse]);

  /**
   * Handle question click - implements Requirements 3, 4, 7
   * 
   * This function:
   * 1. Checks if cooldown is active (disable if true)
   * 2. Gets current ghost type from investigation store
   * 3. Rolls for response based on ghost's response frequency
   * 4. If responds: selects word from appropriate pools
   * 5. If no response: displays "No response..." with static effect
   * 6. Logs evidence and starts cooldown
   */
  const handleQuestionAsked = (question: SpiritBoxQuestion) => {
    // Only handle in investigation mode
    if (mode !== 'investigation') {
      console.log('Question asked in view mode:', question.text);
      return;
    }

    // Check if cooldown is active (Requirement 3)
    if (questionCooldown) {
      console.log('Question cooldown active - ignoring click');
      return;
    }

    // Get current ghost type from investigation store (Requirement 4)
    if (!activeGhostType) {
      console.error('No active ghost type - cannot process question');
      return;
    }

    // Get ghost behavior
    const ghostBehavior = getActiveGhostBehavior(activeGhostType);
    if (!ghostBehavior) {
      console.error('No ghost behavior found for:', activeGhostType);
      return;
    }

    // Roll for response based on ghost's response frequency (Requirement 7)
    const willRespond = shouldGhostRespond(activeGhostType);

    if (willRespond) {
      // Select word from appropriate pools (Requirement 4)
      const questionId = question.id;
      const { word, category } = selectContextualWord(activeGhostType, questionId);

      // Display word with animation (handled by parent component via props)
      console.log(`Ghost responds: "${word}" (${category})`);

      // Log evidence (Requirement 4)
      logEvidence({
        id: `spiritbox-${Date.now()}`,
        timestamp: Date.now(),
        type: 'spiritbox',
        data: {
          word,
          wordCategory: category,
          question: question.text,
          questionContext: questionId,
          responded: true,
        },
      });

      // Track word heard
      addWordHeard(word);

      // TODO: Trigger word display animation in parent component
      // This will be handled by passing the word up via a callback prop
      // For now, we just log it
    } else {
      // Display "No response..." with static effect (Requirement 4)
      console.log('Ghost does not respond');

      // Log non-response as evidence (Requirement 4)
      logEvidence({
        id: `spiritbox-${Date.now()}`,
        timestamp: Date.now(),
        type: 'spiritbox',
        data: {
          question: question.text,
          questionContext: question.id,
          responded: false,
        },
      });

      // TODO: Trigger "No response..." display in parent component
      // This will be handled by passing a callback prop
    }

    // Start cooldown (2-3 seconds) (Requirement 3)
    startQuestionCooldown();
  };

  useEffect(() => {
    if (mode === 'view') {
      let animationId: number;
      let lastFreqTime = performance.now();
      let lastStaticTime = performance.now();
      let lastResponseTime = performance.now();
      let lastLockTime = performance.now();
      
      const animate = (currentTime: number) => {
        // Frequency drift (~10fps, 100ms)
        if (currentTime - lastFreqTime >= 100) {
          lastFreqTime = currentTime;
          setMockFrequency((prev) => prev + (Math.random() - 0.5) * 0.1);
        }
        
        // Static variation (~6.67fps, 150ms)
        if (currentTime - lastStaticTime >= 150) {
          lastStaticTime = currentTime;
          setMockStaticLevel(0.2 + Math.random() * 0.6);
        }
        
        // Random knob lock toggles (~0.2fps, 5000ms)
        if (currentTime - lastLockTime >= 5000) {
          lastLockTime = currentTime;
          if (Math.random() > 0.7) {
            // Randomly toggle knob A
            setMockKnobALocked((prev) => !prev);
          }
          if (Math.random() > 0.7) {
            // Randomly toggle knob B
            setMockKnobBLocked((prev) => !prev);
          }
          // Signal is locked only when both knobs are locked
          setMockSignalLocked((prevA) => {
            setMockKnobALocked((a) => {
              setMockKnobBLocked((b) => {
                return a && b;
              });
              return a;
            });
            return prevA;
          });
        }
        
        // Random EVP responses (~0.5fps, 2000ms)
        if (currentTime - lastResponseTime >= 2000) {
          lastResponseTime = currentTime;
          if (Math.random() > 0.92) {
            setMockResponse(responses[Math.floor(Math.random() * responses.length)]);
            setMockShowResponse(true);
            setTimeout(() => setMockShowResponse(false), 3000);
          }
        }
        
        animationId = requestAnimationFrame(animate);
      };
      
      animationId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationId);
    }
  }, [mode, responses]);

  // Waveform generation (both modes) - optimized with requestAnimationFrame
  useEffect(() => {
    let animationId: number;
    let lastTime = performance.now();
    
    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      
      // Throttle to ~20fps (50ms per frame)
      if (deltaTime >= 50) {
        lastTime = currentTime;
        const newWave = Array.from({ length: 50 }, () => Math.random() * effectiveStaticLevel);
        setWaveform(newWave);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [effectiveStaticLevel]);

  return (
    <>
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { opacity: 0; }
        }
        @keyframes grain {
          0%, 100% { background-position: 0% 0%; }
          25% { background-position: 25% 25%; }
          50% { background-position: 50% 50%; }
          75% { background-position: 75% 75%; }
        }
        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#1a1a1a',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse at center, #1a1a1a 0%, #0a0a0a 100%)',
          opacity: 0.3,
          zIndex: 0,
        }} />
        
        {/* Device Casing - HEAVY STEEL (match Radar/EMF) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 20%, #1f1f1f 50%, #1a1a1a 80%, #0f0f0f 100%)',
          boxShadow: 
            'inset 0 6px 12px rgba(255,255,255,0.06), ' +
            'inset 0 -12px 24px rgba(0,0,0,0.98), ' +
            'inset 4px 0 8px rgba(0,0,0,0.9), ' +
            'inset -4px 0 8px rgba(0,0,0,0.9)',
          zIndex: 1,
        }}>
          
          {/* Uneven lighting */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 15% 15%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 20%, transparent 50%)',
            pointerEvents: 'none',
            zIndex: 3,
          }} />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse at 85% 85%, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 30%, transparent 60%)',
            pointerEvents: 'none',
            zIndex: 3,
          }} />
          
          {/* Directional brushed-metal texture */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'repeating-linear-gradient(45deg, transparent 0px, rgba(255,255,255,0.03) 1px, transparent 2px, transparent 10px)',
            backgroundSize: '20px 20px',
            mixBlendMode: 'overlay',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          
          {/* Beveled edges */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '12px',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '12px',
            background: 'linear-gradient(0deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.85) 50%, transparent 100%)',
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          
          {/* Device Architecture sections */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '15%',
            background: 'linear-gradient(180deg, #3a3a3a 0%, #2d2d2d 100%)',
            borderBottom: '2px solid rgba(0,0,0,0.8)',
            boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.9)',
          }} />
          
          <div style={{
            position: 'absolute',
            top: '15%',
            left: 0,
            right: 0,
            bottom: '30%',
            background: 'linear-gradient(180deg, #2d2d2d 0%, #252525 50%, #1f1f1f 100%)',
          }} />
          
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '30%',
            background: 'linear-gradient(0deg, #1a1a1a 0%, #1f1f1f 100%)',
            borderTop: '2px solid rgba(0,0,0,0.8)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
          }} />
          
          {/* Corner screws */}
          {[
            { top: '12px', left: '12px' },
            { top: '12px', right: '12px' },
            { bottom: '12px', left: '12px' },
            { bottom: '12px', right: '12px' },
          ].map((screw, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                ...(screw.top ? { top: screw.top } : {}),
                ...(screw.bottom ? { bottom: screw.bottom } : {}),
                ...(screw.left ? { left: screw.left } : {}),
                ...(screw.right ? { right: screw.right } : {}),
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, #6a6a6a 0%, #3a3a3a 40%, #1a1a1a 80%, #0a0a0a 100%)',
                boxShadow: 
                  'inset 0 2px 3px rgba(255,255,255,0.3), ' +
                  'inset 0 -2px 3px rgba(0,0,0,0.9), ' +
                  '0 2px 4px rgba(0,0,0,0.8)',
                border: '1px solid rgba(0,0,0,0.7)',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '6px',
                height: '0.5px',
                background: '#0a0a0a',
              }} />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%) rotate(90deg)',
                width: '6px',
                height: '0.5px',
                background: '#0a0a0a',
              }} />
            </div>
          ))}
          
          {/* Texture overlays */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${metalTexture})`,
            backgroundSize: 'cover',
            mixBlendMode: 'overlay',
            opacity: 0.6,
            pointerEvents: 'none',
            zIndex: 2,
          }} />
          
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${rust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.4,
            pointerEvents: 'none',
            zIndex: 3,
          }} />
          
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url(${dust})`,
            backgroundSize: 'cover',
            mixBlendMode: 'multiply',
            opacity: 0.3,
            pointerEvents: 'none',
            zIndex: 4,
          }} />
          
          {/* OSCILLOSCOPE DISPLAY */}
          <div style={{
            position: 'absolute',
            top: '18%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(85vw, 700px)',
            height: '32%',
            background: '#0a1a0a',
            borderRadius: '8px',
            boxShadow: 
              'inset 0 12px 30px rgba(0,0,0,0.99), ' +
              'inset 0 6px 15px rgba(0,0,0,0.97), ' +
              'inset 0 0 80px rgba(0,255,0,0.15)',
            border: '4px solid #000',
            zIndex: 11,
          }}>
            {/* Grid lines */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}>
              {[...Array(9)].map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1="0"
                  y1={`${(i + 1) * 10}%`}
                  x2="100%"
                  y2={`${(i + 1) * 10}%`}
                  stroke="#00ff00"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
              ))}
              {[...Array(19)].map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={`${(i + 1) * 5}%`}
                  y1="0"
                  x2={`${(i + 1) * 5}%`}
                  y2="100%"
                  stroke="#00ff00"
                  strokeWidth="0.5"
                  opacity="0.2"
                />
              ))}
            </svg>
            
            {/* Waveform */}
            <svg style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 2 }}>
              <polyline
                points={waveform.map((val, i) => 
                  `${(i / waveform.length) * 100}%,${50 - val * 40}%`
                ).join(' ')}
                fill="none"
                stroke="#00ff00"
                strokeWidth="2"
                opacity="0.8"
                filter="url(#glow)"
              />
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
            </svg>
            
            {/* CRT effects */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.03) 1px, transparent 2px)',
              pointerEvents: 'none',
              zIndex: 3,
            }} />
            
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${crtTexture})`,
              backgroundSize: 'cover',
              mixBlendMode: 'screen',
              opacity: 0.1,
              pointerEvents: 'none',
              zIndex: 4,
            }} />
            
            {/* Frequency readout */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              color: '#00ff00',
              textShadow: '0 0 8px #00ff00',
              zIndex: 10,
            }}>
              {effectiveFrequency.toFixed(1)} MHz
            </div>
            
            {/* Static level indicator */}
            <div style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              fontFamily: '"Courier New", monospace',
              fontSize: '12px',
              color: '#00ff00',
              textShadow: '0 0 6px #00ff00',
              zIndex: 10,
            }}>
              STATIC: {Math.floor(effectiveStaticLevel * 100)}%
            </div>
            
            {/* EVP Response overlay - Typed-out animation with green phosphor glow */}
            {effectiveShowResponse && displayedWord && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontFamily: '"Courier New", monospace',
                fontSize: '28px',
                color: '#00ff00',
                textShadow: 
                  '0 0 8px #00ff00, ' +
                  '0 0 16px #00ff00, ' +
                  '0 0 24px #00ff00, ' +
                  '0 0 32px rgba(0,255,0,0.5)',
                animation: isTyping ? 'none' : 'fadeInOut 3s ease-in-out',
                zIndex: 15,
                fontWeight: 'bold',
                letterSpacing: '3px',
                textTransform: 'uppercase',
                filter: 'blur(0.3px)', // Slight blur for CRT phosphor effect
                opacity: isTyping ? 1 : undefined,
              }}>
                {displayedWord}
                {/* Typing cursor effect */}
                {isTyping && (
                  <span style={{
                    animation: 'blink 0.8s infinite',
                    marginLeft: '4px',
                  }}>
                    _
                  </span>
                )}
              </div>
            )}
          </div>
          
          {/* QUESTION BUTTONS - Show only when BOTH knobs are locked */}
          {bothKnobsLocked && (
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(85vw, 700px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              zIndex: 11,
            }}>
              {QUESTIONS.map((question) => (
                <button
                  key={question.id}
                  onClick={() => handleQuestionAsked(question)}
                  disabled={mode === 'investigation' && questionCooldown}
                  style={{
                    width: '100%',
                    padding: '14px 20px',
                    fontFamily: '"Courier New", monospace',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    letterSpacing: '1px',
                    color: (mode === 'investigation' && questionCooldown) ? '#006600' : '#00ff00',
                    background: (mode === 'investigation' && questionCooldown) 
                      ? 'linear-gradient(135deg, #0a1a0a 0%, #050f05 100%)'
                      : 'linear-gradient(135deg, #1a2a1a 0%, #0f1f0f 100%)',
                    border: `2px solid ${(mode === 'investigation' && questionCooldown) ? '#006600' : '#00ff00'}`,
                    borderRadius: '4px',
                    boxShadow: (mode === 'investigation' && questionCooldown)
                      ? 'inset 0 2px 4px rgba(0,255,0,0.05), 0 0 6px rgba(0,255,0,0.15), 0 4px 8px rgba(0,0,0,0.8)'
                      : 'inset 0 2px 4px rgba(0,255,0,0.1), 0 0 12px rgba(0,255,0,0.3), 0 4px 8px rgba(0,0,0,0.8)',
                    textShadow: (mode === 'investigation' && questionCooldown) ? '0 0 4px #006600' : '0 0 8px #00ff00',
                    cursor: (mode === 'investigation' && questionCooldown) ? 'not-allowed' : 'pointer',
                    opacity: (mode === 'investigation' && questionCooldown) ? 0.5 : 1,
                    transition: 'all 0.2s ease',
                    textTransform: 'uppercase',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseDown={(e) => {
                    if (mode === 'investigation' && questionCooldown) return;
                    const target = e.currentTarget;
                    target.style.transform = 'scale(0.98)';
                    target.style.boxShadow = 
                      'inset 0 2px 4px rgba(0,255,0,0.2), ' +
                      '0 0 8px rgba(0,255,0,0.4), ' +
                      '0 2px 4px rgba(0,0,0,0.9)';
                  }}
                  onMouseUp={(e) => {
                    if (mode === 'investigation' && questionCooldown) return;
                    const target = e.currentTarget;
                    target.style.transform = 'scale(1)';
                    target.style.boxShadow = 
                      'inset 0 2px 4px rgba(0,255,0,0.1), ' +
                      '0 0 12px rgba(0,255,0,0.3), ' +
                      '0 4px 8px rgba(0,0,0,0.8)';
                  }}
                  onMouseEnter={(e) => {
                    if (mode === 'investigation' && questionCooldown) return;
                    const target = e.currentTarget;
                    target.style.background = 'linear-gradient(135deg, #1f3a1f 0%, #142814 100%)';
                    target.style.boxShadow = 
                      'inset 0 2px 4px rgba(0,255,0,0.15), ' +
                      '0 0 16px rgba(0,255,0,0.4), ' +
                      '0 4px 8px rgba(0,0,0,0.8)';
                  }}
                  onMouseLeave={(e) => {
                    if (mode === 'investigation' && questionCooldown) return;
                    const target = e.currentTarget;
                    target.style.background = 'linear-gradient(135deg, #1a2a1a 0%, #0f1f0f 100%)';
                    target.style.boxShadow = 
                      'inset 0 2px 4px rgba(0,255,0,0.1), ' +
                      '0 0 12px rgba(0,255,0,0.3), ' +
                      '0 4px 8px rgba(0,0,0,0.8)';
                  }}
                >
                  {/* Scanline effect on button */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'repeating-linear-gradient(0deg, transparent 0px, rgba(0,255,0,0.02) 1px, transparent 2px)',
                    pointerEvents: 'none',
                  }} />
                  {question.text}
                </button>
              ))}
              
              {/* Signal Lock Indicator - Both knobs locked */}
              <div style={{
                marginTop: '8px',
                textAlign: 'center',
                fontFamily: '"Courier New", monospace',
                fontSize: '11px',
                color: '#00ff00',
                textShadow: '0 0 6px #00ff00',
                letterSpacing: '2px',
                opacity: 0.8,
              }}>
                ● KNOB A LOCKED ● KNOB B LOCKED
              </div>
            </div>
          )}
          
          {/* Signal Lost Message - Show when both knobs aren't locked */}
          {!bothKnobsLocked && (
            <div style={{
              position: 'absolute',
              top: '55%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(85vw, 700px)',
              textAlign: 'center',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              color: '#ff6600',
              textShadow: '0 0 8px #ff6600',
              letterSpacing: '2px',
              opacity: 0.6,
              zIndex: 11,
            }}>
              {!effectiveKnobALocked && !effectiveKnobBLocked && 'TUNE BOTH KNOBS'}
              {effectiveKnobALocked && !effectiveKnobBLocked && 'KNOB A LOCKED - TUNE KNOB B'}
              {!effectiveKnobALocked && effectiveKnobBLocked && 'KNOB B LOCKED - TUNE KNOB A'}
            </div>
          )}
          
          {/* DAMAGE ELEMENTS */}
          
          {/* Deep scratches */}
          {[
            { top: '15%', left: '5%', width: '150px', angle: -25, opacity: 0.6 },
            { bottom: '20%', right: '8%', width: '130px', angle: 30, opacity: 0.55 },
            { top: '60%', left: '3%', width: '120px', angle: 45, opacity: 0.5 },
            { top: '35%', right: '5%', width: '110px', angle: -35, opacity: 0.6 },
            { bottom: '35%', left: '6%', width: '125px', angle: 40, opacity: 0.55 },
          ].map((scratch, i) => (
            <div
              key={`light-scratch-${i}`}
              style={{
                position: 'absolute',
                ...(scratch.top ? { top: scratch.top } : {}),
                ...(scratch.bottom ? { bottom: scratch.bottom } : {}),
                ...(scratch.left ? { left: scratch.left } : {}),
                ...(scratch.right ? { right: scratch.right } : {}),
                width: scratch.width,
                height: '2px',
                background: 'rgba(255,255,255,0.35)',
                transform: `rotate(${scratch.angle}deg)`,
                opacity: scratch.opacity,
                boxShadow: '0 0 4px rgba(0,0,0,0.7), inset 0 0 3px rgba(0,0,0,0.5)',
                pointerEvents: 'none',
                zIndex: 6,
              }}
            />
          ))}
          
          {/* Rust specks */}
          {[
            { top: '18%', left: '15%', size: '14px', opacity: 0.55 },
            { top: '45%', right: '12%', size: '16px', opacity: 0.6 },
            { bottom: '22%', left: '18%', size: '12px', opacity: 0.5 },
            { bottom: '30%', right: '15%', size: '15px', opacity: 0.58 },
          ].map((rustSpot, i) => (
            <div
              key={`rust-${i}`}
              style={{
                position: 'absolute',
                ...(rustSpot.top ? { top: rustSpot.top } : {}),
                ...(rustSpot.bottom ? { bottom: rustSpot.bottom } : {}),
                ...(rustSpot.left ? { left: rustSpot.left } : {}),
                ...(rustSpot.right ? { right: rustSpot.right } : {}),
                width: rustSpot.size,
                height: rustSpot.size,
                backgroundImage: `url(${rust})`,
                backgroundSize: 'cover',
                mixBlendMode: 'multiply',
                opacity: rustSpot.opacity,
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: 7,
              }}
            />
          ))}
          
          {/* Chipped paint areas */}
          {[
            { top: '0', left: '0', width: '35px', height: '35px', clipPath: 'polygon(0% 0%, 100% 0%, 0% 100%)', opacity: 0.8 },
            { top: '0', right: '0', width: '40px', height: '40px', clipPath: 'polygon(100% 0%, 100% 100%, 0% 0%)', opacity: 0.75 },
            { bottom: '0', left: '0', width: '32px', height: '32px', clipPath: 'polygon(0% 100%, 0% 0%, 100% 100%)', opacity: 0.78 },
            { bottom: '0', right: '0', width: '38px', height: '38px', clipPath: 'polygon(100% 100%, 0% 100%, 100% 0%)', opacity: 0.8 },
          ].map((chip, i) => (
            <div
              key={`chip-${i}`}
              style={{
                position: 'absolute',
                ...(chip.top ? { top: chip.top } : {}),
                ...(chip.bottom ? { bottom: chip.bottom } : {}),
                ...(chip.left ? { left: chip.left } : {}),
                ...(chip.right ? { right: chip.right } : {}),
                width: chip.width,
                height: chip.height,
                background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 50%, #000 100%)',
                clipPath: chip.clipPath,
                opacity: chip.opacity,
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
                pointerEvents: 'none',
                zIndex: 8,
              }}
            />
          ))}

          {/* Vent grilles on sides */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '8px',
            transform: 'translateY(-50%)',
            width: '8px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
          }}>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                }}
              />
            ))}
          </div>
          <div style={{
            position: 'absolute',
            top: '50%',
            right: '8px',
            transform: 'translateY(-50%)',
            width: '8px',
            height: '120px',
            display: 'flex',
            flexDirection: 'column',
            gap: '3px',
          }}>
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                style={{
                  width: '100%',
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.8) 20%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0.8) 80%, transparent 100%)',
                  boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.9)',
                }}
              />
            ))}
          </div>
          
          {/* Labels */}
          <div style={{
            position: 'absolute',
            top: '8px',
            left: '25px',
            fontFamily: '"Caveat", cursive',
            fontSize: '14px',
            color: 'rgba(200,200,200,0.5)',
            transform: 'rotate(-1.5deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.3), ' +
              '0 1px 2px rgba(0,0,0,0.9), ' +
              '1px 1px 3px rgba(0,0,0,0.8)',
            letterSpacing: '0.5px',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            SPIRIT BOX
          </div>
          
          {/* Engineering Labels */}
          {[
            { top: '3%', left: '12%', label: 'EVP', rotation: -0.5, fontSize: '11px' },
            { top: '3%', left: '22%', label: 'FREQ', rotation: 0.4, fontSize: '10px' },
            { top: '3%', right: '15%', label: 'STATIC', rotation: 0.6, fontSize: '10px' },
          ].map((label, i) => (
            <div
              key={`eng-label-${i}`}
              style={{
                position: 'absolute',
                ...(label.top ? { top: label.top } : {}),
                ...(label.left ? { left: label.left } : {}),
                ...(label.right ? { right: label.right } : {}),
                fontFamily: '"Courier New", monospace',
                fontSize: label.fontSize,
                color: 'rgba(200,200,200,0.45)',
                transform: `rotate(${label.rotation}deg)`,
                textShadow: 
                  '0 -1px 1px rgba(255,255,255,0.25), ' +
                  '0 1px 2px rgba(0,0,0,0.9), ' +
                  '1px 1px 3px rgba(0,0,0,0.8)',
                letterSpacing: '0.5px',
                pointerEvents: 'none',
                zIndex: 21,
              }}
            >
              {label.label}
            </div>
          ))}
          
          <div style={{
            position: 'absolute',
            top: '8px',
            right: '25px',
            fontFamily: '"Courier New", monospace',
            fontSize: '10px',
            color: 'rgba(200,200,200,0.45)',
            transform: 'rotate(0.8deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            letterSpacing: '1px',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            EVP RECORDER
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '8px',
            left: '25px',
            fontFamily: '"Courier New", monospace',
            fontSize: '8px',
            color: 'rgba(150,150,150,0.45)',
            transform: 'rotate(0.4deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            SN: SB-1985-EVP
          </div>
          
          <div style={{
            position: 'absolute',
            bottom: '8px',
            right: '25px',
            fontFamily: '"Caveat", cursive',
            fontSize: '10px',
            color: 'rgba(180,180,150,0.45)',
            transform: 'rotate(-0.5deg)',
            textShadow: 
              '0 -1px 1px rgba(255,255,255,0.2), ' +
              '0 1px 2px rgba(0,0,0,0.9)',
            pointerEvents: 'none',
            zIndex: 21,
          }}>
            cal. 03/19
          </div>
        </div>
      </div>
    </>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const SpiritBoxTool = memo(SpiritBoxToolComponent);
export default SpiritBoxTool;
