// Audio Receiver - Spirit Box / EVP Detector
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

const WHISPERS = [
  'Get out...',
  'Leave...',
  'Help me...',
  'Why are you here?',
  'Go away...',
  'I see you...',
  'Behind you...',
  'Cold...',
  'Alone...',
  'Run...',
];

export function AudioReceiver() {
  const { ghostPosition, ghostType } = useInvestigation();
  const [whisper, setWhisper] = useState<string | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  // Audio level based on ghost proximity and type
  useEffect(() => {
    // Audio multiplier based on ghost type
    const audioMultipliers: Record<string, number> = {
      Wraith: 0.4,      // Low audio activity
      Shade: 2.5,       // Very high audio (key trait)
      Poltergeist: 0.6, // Low-medium audio
    };
    
    const multiplier = audioMultipliers[ghostType] || 1;
    
    const interval = setInterval(() => {
      const baseLevel = (1 - ghostPosition.distance) * 80 * multiplier;
      const noise = Math.random() * 20;
      setAudioLevel(Math.max(0, Math.min(100, baseLevel + noise)));
    }, 100);

    return () => clearInterval(interval);
  }, [ghostPosition.distance, ghostType]);

  // Frequency sweep
  useEffect(() => {
    if (!isScanning) return;
    
    const interval = setInterval(() => {
      setFrequency((prev) => (prev + 0.5) % 100);
    }, 50);

    return () => clearInterval(interval);
  }, [isScanning]);

  // Whisper generation based on ghost type
  useEffect(() => {
    // Whisper frequency based on ghost type
    const whisperChances: Record<string, number> = {
      Wraith: 0.85,     // Rare whispers
      Shade: 0.4,       // Frequent whispers (key trait)
      Poltergeist: 0.8, // Rare whispers
    };
    
    const threshold = whisperChances[ghostType] || 0.7;
    
    const interval = setInterval(() => {
      if (Math.random() > threshold) {
        const randomWhisper = WHISPERS[Math.floor(Math.random() * WHISPERS.length)];
        setWhisper(randomWhisper);
        setIsScanning(false);
        setTimeout(() => {
          setWhisper(null);
          setIsScanning(true);
        }, 3000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [ghostType]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Device Frame */}
      <div
        style={{
          width: '90%',
          maxWidth: '400px',
          padding: '32px 24px',
          backgroundColor: 'rgba(30, 20, 40, 0.95)',
          border: '3px solid rgba(167, 139, 250, 0.5)',
          borderRadius: '16px',
          boxShadow: '0 0 30px rgba(167, 139, 250, 0.3)',
        }}
      >
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '24px',
            fontFamily: 'monospace',
          }}
        >
          <div
            style={{
              fontSize: '12px',
              color: 'rgba(167, 139, 250, 0.7)',
              letterSpacing: '2px',
              marginBottom: '4px',
            }}
          >
            ELECTRONIC VOICE PHENOMENON
          </div>
          <div
            style={{
              fontSize: '24px',
              color: '#a78bfa',
              fontWeight: 'bold',
              letterSpacing: '3px',
            }}
          >
            SPIRIT BOX
          </div>
        </div>

        {/* Waveform Display */}
        <div
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            border: '2px solid rgba(167, 139, 250, 0.3)',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '20px',
            height: '120px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Waveform bars */}
          <div
            style={{
              display: 'flex',
              gap: '3px',
              alignItems: 'center',
              height: '100%',
            }}
          >
            {Array.from({ length: 30 }).map((_, i) => {
              const height = Math.sin((i + frequency) * 0.5) * 30 + audioLevel * 0.5;
              return (
                <div
                  key={i}
                  style={{
                    width: '6px',
                    height: `${Math.max(5, height)}%`,
                    backgroundColor: whisper ? '#a78bfa' : 'rgba(167, 139, 250, 0.5)',
                    borderRadius: '3px',
                    transition: 'all 0.1s',
                    boxShadow: whisper ? '0 0 10px #a78bfa' : 'none',
                  }}
                />
              );
            })}
          </div>

          {/* Whisper Text Overlay */}
          {whisper && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '18px',
                color: '#a78bfa',
                fontStyle: 'italic',
                fontWeight: 'bold',
                textShadow: '0 0 20px #a78bfa',
                animation: 'whisperFade 3s ease-in-out',
                textAlign: 'center',
                padding: '0 20px',
              }}
            >
              "{whisper}"
            </div>
          )}
        </div>

        {/* Audio Level Meter */}
        <div
          style={{
            marginBottom: '16px',
          }}
        >
          <div
            style={{
              fontSize: '11px',
              color: 'rgba(167, 139, 250, 0.7)',
              marginBottom: '6px',
              fontFamily: 'monospace',
              letterSpacing: '1px',
            }}
          >
            AUDIO LEVEL
          </div>
          <div
            style={{
              height: '12px',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              borderRadius: '6px',
              overflow: 'hidden',
              border: '1px solid rgba(167, 139, 250, 0.3)',
            }}
          >
            <div
              style={{
                height: '100%',
                width: `${audioLevel}%`,
                backgroundColor: audioLevel > 60 ? '#a78bfa' : 'rgba(167, 139, 250, 0.5)',
                transition: 'width 0.1s',
                boxShadow: audioLevel > 60 ? '0 0 10px #a78bfa' : 'none',
              }}
            />
          </div>
        </div>

        {/* Frequency Display */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '12px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            borderRadius: '6px',
            fontFamily: 'monospace',
            fontSize: '12px',
          }}
        >
          <div style={{ color: 'rgba(167, 139, 250, 0.7)' }}>
            FREQ: {(frequency * 10 + 100).toFixed(1)} Hz
          </div>
          <div
            style={{
              color: whisper ? '#a78bfa' : 'rgba(167, 139, 250, 0.5)',
              fontWeight: 'bold',
            }}
          >
            {whisper ? '🔊 SIGNAL DETECTED' : isScanning ? '📡 SCANNING...' : '— IDLE'}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes whisperFade {
            0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
            20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          }
        `}
      </style>
    </div>
  );
}
