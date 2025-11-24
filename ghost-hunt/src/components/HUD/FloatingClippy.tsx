// Floating Clippy - Appears on all pages like original Microsoft Clippy
import { useState, useEffect, useRef } from 'react';
import clippyImage from '../../assets/images/agent/clippy.png';
import clippyVideo1 from '../../assets/videos/clippy_1.mp4';
import clippyVideo2 from '../../assets/videos/clippy_2.mp4';
import clippyVideo3 from '../../assets/videos/clippy_3.mp4';
import clippyVideo4 from '../../assets/videos/clippy_4.mp4';
import clippyIdle1 from '../../assets/videos/clippy_idle_1.mp4';
import clippyIdle2 from '../../assets/videos/clippy_idle_2.mp4';
import clippyIdle3 from '../../assets/videos/clippy_idle_3.mp4';
import clippyMagnifyingGlass from '../../assets/videos/clippy_magnifying_glass.mp4';
import wrinkledpaper from '../../assets/texture/wrinkledpaper.png';
import dust from '../../assets/texture/dust.png';

// Random tips for Clippy to share
const RANDOM_TIPS = [
  'EMF readings spike near active entities',
  'Freezing temperatures often indicate presence',
  'Check your film supply before investigations',
  'Spirit box responses can reveal entity type',
  'Some ghosts are more active at night',
  'Keep your sanity above 50% for safety',
  'Photo evidence is crucial for identification',
  'Multiple evidence types confirm entity type',
  'Investigation hotspots unlock new missions',
  'Field journals contain valuable intel',
  'Different entities have unique behaviors',
  'Scanner boosts improve evidence clarity',
  'Charms protect your sanity during hunts',
  'Codex entries reveal entity weaknesses',
  'Temperature drops signal nearby activity',
];

// Conversation dialogue options
interface ConversationOption {
  id: string;
  text: string;
  response: string;
  nextOptions?: ConversationOption[];
}

const CONVERSATION_TREE: ConversationOption[] = [
  {
    id: 'greeting',
    text: 'Hello! How can I help?',
    response: "Hi there! I'm Clippy, your investigation assistant. I'm here to help you with tips and information about ghost hunting!",
    nextOptions: [
      {
        id: 'tips',
        text: 'Give me some tips',
        response: 'Here are some helpful tips:\n\n• EMF readings spike near active entities\n• Freezing temperatures often indicate presence\n• Check your film supply before investigations\n• Photo evidence is crucial for identification',
        nextOptions: [
          {
            id: 'more-tips',
            text: 'Tell me more',
            response: 'More advanced tips:\n\n• Multiple evidence types confirm entity type\n• Different entities have unique behaviors\n• Keep your sanity above 50% for safety\n• Field journals contain valuable intel',
          },
          {
            id: 'back',
            text: 'Go back',
            response: "Sure! What else can I help you with?",
          },
        ],
      },
      {
        id: 'about',
        text: 'Tell me about yourself',
        response: "I'm Clippy, your friendly ghost hunting assistant! I've been helping investigators like you for years. I can provide tips, answer questions, and guide you through your investigations.",
        nextOptions: [
          {
            id: 'back',
            text: 'Go back',
            response: "Of course! What else would you like to know?",
          },
        ],
      },
      {
        id: 'investigation',
        text: 'Help with investigation',
        response: 'For investigations, remember:\n\n• Use your tools to gather evidence\n• Check the Codex for entity information\n• Keep track of your supplies\n• Don\'t let your sanity drop too low!',
        nextOptions: [
          {
            id: 'back',
            text: 'Go back',
            response: "Happy to help! Anything else?",
          },
        ],
      },
    ],
  },
];

export function FloatingClippy() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentTip, setCurrentTip] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [showConversation, setShowConversation] = useState(false);
  const [currentConversation, setCurrentConversation] = useState<ConversationOption | null>(null);
  const [conversationHistory, setConversationHistory] = useState<ConversationOption[]>([]);
  // Use fixed bottom-right positioning
  const [position, setPosition] = useState({ x: 0, y: 0 }); // Only used for drag offset
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [dragPosition, setDragPosition] = useState<{ x: number; y: number } | null>(null); // Only set when dragging
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const clippyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  
  // Clippy animation videos - idle animations and action animations
  const idleVideos = [clippyIdle1, clippyIdle2, clippyIdle3];
  const actionVideos = [clippyVideo1, clippyVideo2, clippyVideo3, clippyVideo4, clippyMagnifyingGlass];
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [currentIdleIndex, setCurrentIdleIndex] = useState(0);
  
  // Use showTooltip to determine if Clippy should be idle or active
  const isIdle = !showTooltip;

  // Get a random tip
  const getRandomTip = () => {
    const randomIndex = Math.floor(Math.random() * RANDOM_TIPS.length);
    return RANDOM_TIPS[randomIndex];
  };

  // Show a tip
  const showTip = () => {
    const tip = getRandomTip();
    setCurrentTip(tip);
    setShowTooltip(true);
    
    // Hide after 4-6 seconds
    const duration = 4000 + Math.random() * 2000;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowTooltip(false);
    }, duration);
  };

  // Set up periodic tip display
  useEffect(() => {
    // Show first tip after 8-12 seconds
    const initialDelay = 8000 + Math.random() * 4000;
    const initialTimeout = setTimeout(() => {
      showTip();
      
      // Then show tips every 15-25 seconds
      intervalRef.current = setInterval(() => {
        showTip();
      }, 15000 + Math.random() * 10000);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Cycle through action animations when speech bubble is showing
  useEffect(() => {
    if (showTooltip) {
      // When speech bubble appears, cycle through action animations
      const actionCycleInterval = setInterval(() => {
        setCurrentActionIndex((prev) => (prev + 1) % actionVideos.length);
      }, 3000 + Math.random() * 2000); // Change action animation every 3-5 seconds

      return () => clearInterval(actionCycleInterval);
    }
  }, [showTooltip]);

  // Randomly switch between idle animations when speech bubble is not showing
  useEffect(() => {
    if (!showTooltip) {
      // When idle, randomly pick from idle animations (but not the same one twice in a row)
      const idleCycleInterval = setInterval(() => {
        setCurrentIdleIndex((prev) => {
          // Get all possible indices except the current one
          const availableIndices = idleVideos
            .map((_, index) => index)
            .filter((index) => index !== prev);
          // Randomly pick from available indices
          const randomIndex = Math.floor(Math.random() * availableIndices.length);
          return availableIndices[randomIndex];
        });
      }, 4000 + Math.random() * 3000); // Change idle animation every 4-7 seconds

      return () => clearInterval(idleCycleInterval);
    }
  }, [showTooltip]);

  // Handle video end - loop it
  const handleVideoEnd = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    e.currentTarget.currentTime = 0;
    e.currentTarget.play();
  };

  // Handle drag
  const [mouseDownPos, setMouseDownPos] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left mouse button
    e.preventDefault();
    setMouseDownPos({ x: e.clientX, y: e.clientY });
    if (clippyRef.current) {
      const rect = clippyRef.current.getBoundingClientRect();
      // Calculate initial drag position based on current position
      const currentX = dragPosition ? dragPosition.x : window.innerWidth - 100; // 80px width + 20px right
      const currentY = dragPosition ? dragPosition.y : window.innerHeight - 112; // 80px height + 32px bottom
      setDragOffset({
        x: e.clientX - currentX - rect.width / 2,
        y: e.clientY - currentY - rect.height / 2,
      });
      // Set initial drag position
      setDragPosition({ x: currentX, y: currentY });
    }
  };

  useEffect(() => {
    const constrainPosition = (x: number, y: number) => {
      const clippySize = 80;
      const padding = 20;
      return {
        x: Math.max(padding, Math.min(window.innerWidth - clippySize - padding, x)),
        y: Math.max(padding, Math.min(window.innerHeight - clippySize - padding, y)),
      };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging && mouseDownPos.x !== 0 && mouseDownPos.y !== 0) {
        // Check if mouse moved enough to start dragging (5px threshold)
        const moveDistance = Math.sqrt(
          Math.pow(e.clientX - mouseDownPos.x, 2) + Math.pow(e.clientY - mouseDownPos.y, 2)
        );
        if (moveDistance > 5) {
          setIsDragging(true);
        }
      }
      
      if (isDragging) {
        const newPos = constrainPosition(
          e.clientX - dragOffset.x,
          e.clientY - dragOffset.y
        );
        setDragPosition(newPos);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setMouseDownPos({ x: 0, y: 0 });
      // Reset to bottom-right after drag ends
      setTimeout(() => {
        setDragPosition(null);
      }, 100);
    };

    // Always listen for mouse events when mouse is down
    if (mouseDownPos.x !== 0 || mouseDownPos.y !== 0 || isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, mouseDownPos]);

  const handleClick = (e: React.MouseEvent) => {
    // Don't open conversation if we were dragging
    if (isDragging) {
      setIsDragging(false);
      return;
    }
    e.stopPropagation();
    // Open conversation modal
    setShowConversation(true);
    setCurrentConversation(CONVERSATION_TREE[0]);
    setConversationHistory([]);
  };

  const handleOptionSelect = (option: ConversationOption) => {
    if (option.id === 'back' && conversationHistory.length > 0) {
      // Go back to previous conversation
      const previous = conversationHistory[conversationHistory.length - 1];
      setConversationHistory(prev => prev.slice(0, -1));
      setCurrentConversation(previous);
    } else {
      // Move forward in conversation
      setConversationHistory(prev => [...prev, currentConversation!]);
      setCurrentConversation(option);
    }
  };

  const handleCloseConversation = () => {
    setShowConversation(false);
    setCurrentConversation(null);
    setConversationHistory([]);
  };

  return (
    <div
      ref={clippyRef}
      style={{
        position: 'fixed',
        ...(dragPosition ? {
          left: `${dragPosition.x}px`,
          top: `${dragPosition.y}px`,
        } : {
          bottom: '32px', // Align with HUD bottom (24px padding + 8px margin)
          right: '20px',
        }),
        zIndex: 9999,
        cursor: isDragging ? 'grabbing' : 'grab',
        pointerEvents: 'auto',
        userSelect: 'none',
        width: '80px',
        height: '80px',
      }}
      onMouseDown={handleMouseDown}
    >
      {/* Speech Bubble - Late-90s Office Assistant (Clippy) Style */}
      {showTooltip && currentTip && (
        <div
          className="clippy-bubble"
          style={{
            position: 'absolute',
            bottom: '90px',
            right: '0',
            display: 'inline-block',
            maxWidth: '280px',
            background: 'linear-gradient(to bottom, #fffff7 0%, #ffffe1 40%, #fff7c5 100%)',
            border: '1px solid #808080',
            borderRadius: '6px',
            boxShadow: '0 0 0 1px #ffffff inset, 0 0 0 2px #808080 inset, 2px 3px 4px rgba(0, 0, 0, 0.35)',
            padding: '0',
            fontFamily: '"MS Sans Serif", "Segoe UI", system-ui, sans-serif',
            fontSize: '12px',
            color: '#000000',
            lineHeight: '1.3',
            zIndex: 10000,
            pointerEvents: 'none',
            animation: 'clippyBubbleAppear 0.15s ease-out',
          }}
        >
          {/* Header Row - Windows-style title bar */}
          <div style={{
            height: '20px',
            background: 'linear-gradient(to bottom, #0b3c7a 0%, #0b3c7a 50%, #002050 100%)',
            borderRadius: '6px 6px 0 0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 6px',
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 'bold',
              color: '#ffffff',
              padding: '2px 0',
            }}>
              Clippy
            </div>
            <div style={{
              width: '12px',
              height: '12px',
              background: '#c0c0c0',
              border: '1px solid #404040',
              borderRadius: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '8px',
              color: '#000000',
              fontWeight: 'bold',
              lineHeight: 1,
            }}>
              ×
            </div>
          </div>

          {/* Content */}
          <div style={{
            padding: '8px 10px 10px 10px',
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: '12px', 
              color: '#000000',
              lineHeight: '1.3',
              fontWeight: 'normal',
            }}>
              {currentTip}
            </p>
          </div>

          {/* Tail - pointing down to Clippy (Clippy-style) */}
          <div
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: '40px',
              width: '0',
              height: '0',
              borderStyle: 'solid',
              borderWidth: '10px 10px 0 10px',
              borderColor: '#808080 transparent transparent transparent',
              zIndex: -1,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '-9px',
              left: '40px',
              width: '0',
              height: '0',
              borderStyle: 'solid',
              borderWidth: '10px 10px 0 10px',
              borderColor: '#ffffe1 transparent transparent transparent',
            }}
          />
        </div>
      )}

      {/* Clippy button - Draggable */}
      <div
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '4px',
          backgroundColor: 'transparent',
          border: `2px solid ${isHovered ? '#8b0000' : '#1a0f0a'}`,
          padding: 0,
          boxShadow: 
            isHovered
              ? '0 6px 20px rgba(0, 0, 0, 0.8), 0 3px 12px rgba(0, 0, 0, 0.6)'
              : '0 6px 20px rgba(0, 0, 0, 0.7), 0 3px 12px rgba(0, 0, 0, 0.5)',
          cursor: isDragging ? 'grabbing' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'scale(1.05) rotate(0.3deg)' : 'rotate(-0.3deg)',
          transition: isDragging ? 'none' : 'all 0.2s ease',
          position: 'relative',
          overflow: 'hidden',
          pointerEvents: 'auto',
        }}
        title="Clippy Assistant - Click to talk! Drag to move."
      >
        <video
          ref={videoRef}
          src={isIdle ? idleVideos[currentIdleIndex] : actionVideos[currentActionIndex]}
          autoPlay
          loop
          muted
          playsInline
          onEnded={handleVideoEnd}
          key={isIdle ? `idle-${currentIdleIndex}` : `action-${currentActionIndex}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Conversation Modal - Analog Horror Style */}
      {showConversation && currentConversation && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'fadeIn 0.3s ease-out',
          }}
          onClick={handleCloseConversation}
        >
          <div
            style={{
              backgroundColor: '#d8d4c8', // Aged paper
              borderRadius: '4px',
              padding: '40px',
              maxWidth: '700px',
              width: '90%',
              maxHeight: '85vh',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8), 0 4px 16px rgba(0, 0, 0, 0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              animation: 'fadeInScale 0.3s ease-out',
              fontFamily: '"Courier New", monospace',
              transform: 'rotate(-0.5deg)',
              position: 'relative',
              overflowY: 'auto',
              overflowX: 'hidden',
              WebkitOverflowScrolling: 'touch',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Aged paper texture */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${wrinkledpaper})`,
              backgroundSize: 'cover',
              mixBlendMode: 'multiply',
              opacity: 0.4,
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: `url(${dust})`,
              backgroundSize: 'cover',
              mixBlendMode: 'overlay',
              opacity: 0.25,
              pointerEvents: 'none',
            }} />

            {/* Close button - Analog style */}
            <button
              onClick={handleCloseConversation}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: '#c4b49a',
                border: '2px solid #1a0f0a',
                borderRadius: '4px',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#1a0f0a',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: '"Courier New", monospace',
                fontWeight: 'bold',
                zIndex: 10,
                transform: 'rotate(0.5deg)',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#8b0000';
                e.currentTarget.style.color = '#f4f0e6';
                e.currentTarget.style.borderColor = '#8b0000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#c4b49a';
                e.currentTarget.style.color = '#1a0f0a';
                e.currentTarget.style.borderColor = '#1a0f0a';
              }}
            >
              ×
            </button>

            {/* Clippy Image - Zoomed with analog styling */}
            <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                padding: '8px',
                background: '#c4b49a',
                border: '2px solid #1a0f0a',
                borderRadius: '4px',
                transform: 'rotate(1deg)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
              }}>
                <video
                  ref={modalVideoRef}
                  src={isIdle ? idleVideos[currentIdleIndex] : actionVideos[currentActionIndex]}
                  autoPlay
                  loop
                  muted
                  playsInline
                  onEnded={handleVideoEnd}
                  key={isIdle ? 'idle-modal' : `action-modal-${currentActionIndex}`}
                  style={{
                    width: '180px',
                    height: '180px',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
            </div>

            {/* Clippy's Response - Typewriter style */}
            <div
              style={{
                backgroundColor: '#f4f0e6',
                padding: '20px 24px',
                borderRadius: '4px',
                border: '2px solid #1a0f0a',
                minHeight: '100px',
                maxHeight: '300px',
                position: 'relative',
                zIndex: 1,
                transform: 'rotate(0.3deg)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
                overflowY: 'auto',
                overflowX: 'hidden',
                WebkitOverflowScrolling: 'touch',
              }}
            >
              <p style={{
                margin: 0,
                fontSize: '14px',
                color: '#1a0f0a',
                lineHeight: '1.8',
                whiteSpace: 'pre-line',
                fontFamily: '"Courier New", monospace',
                letterSpacing: '0.3px',
              }}>
                <span style={{ fontWeight: 'bold', color: '#8b0000' }}>CLIPPY:</span> {currentConversation.response}
              </p>
            </div>

            {/* Dialogue Options - Analog style buttons */}
            {currentConversation.nextOptions && currentConversation.nextOptions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', position: 'relative', zIndex: 1 }}>
                {currentConversation.nextOptions.map((option, index) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionSelect(option)}
                    style={{
                      padding: '14px 20px',
                      backgroundColor: '#d8d4c8',
                      border: '2px solid #1a0f0a',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: '#1a0f0a',
                      textAlign: 'left',
                      transition: 'all 0.2s ease',
                      fontFamily: '"Courier New", monospace',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      transform: `rotate(${index % 2 === 0 ? -0.3 : 0.3}deg)`,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.4)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#8b0000';
                      e.currentTarget.style.color = '#f4f0e6';
                      e.currentTarget.style.borderColor = '#8b0000';
                      e.currentTarget.style.transform = `rotate(0deg) scale(1.02)`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#d8d4c8';
                      e.currentTarget.style.color = '#1a0f0a';
                      e.currentTarget.style.borderColor = '#1a0f0a';
                      e.currentTarget.style.transform = `rotate(${index % 2 === 0 ? -0.3 : 0.3}deg) scale(1)`;
                    }}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            )}

            {/* Back/Close option if no next options */}
            {(!currentConversation.nextOptions || currentConversation.nextOptions.length === 0) && (
              <button
                onClick={handleCloseConversation}
                style={{
                  padding: '14px 24px',
                  backgroundColor: '#8b0000',
                  border: '2px solid #1a0f0a',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#f4f0e6',
                  fontWeight: 'bold',
                  transition: 'all 0.2s ease',
                  fontFamily: '"Courier New", monospace',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  transform: 'rotate(-0.5deg)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
                  position: 'relative',
                  zIndex: 1,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#cc0000';
                  e.currentTarget.style.transform = 'rotate(0deg) scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#8b0000';
                  e.currentTarget.style.transform = 'rotate(-0.5deg) scale(1)';
                }}
              >
                CLOSE
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

