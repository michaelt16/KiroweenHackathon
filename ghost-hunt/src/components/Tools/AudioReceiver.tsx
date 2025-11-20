// Audio Receiver - shows whisper subtitles
import { useEffect, useState } from 'react';
import { useInvestigation } from '../../context/InvestigationContext';

const WHISPERS = [
  'Get out...',
  'Leave...',
  'Help me...',
  'Why are you here?',
  'Go away...',
  'I see you...',
];

export function AudioReceiver() {
  const { toolsEnabled } = useInvestigation();
  const [whisper, setWhisper] = useState<string | null>(null);

  useEffect(() => {
    if (!toolsEnabled.audio) {
      setWhisper(null);
      return;
    }

    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const randomWhisper = WHISPERS[Math.floor(Math.random() * WHISPERS.length)];
        setWhisper(randomWhisper);
        setTimeout(() => setWhisper(null), 3000);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [toolsEnabled.audio]);

  if (!toolsEnabled.audio || !whisper) return null;

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '120px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        padding: '12px 24px',
        background: 'rgba(0, 0, 0, 0.9)',
        borderRadius: '8px',
        border: '2px solid #a78bfa',
        animation: 'fadeIn 0.3s',
      }}
    >
      <div style={{ fontSize: '14px', color: '#a78bfa', fontStyle: 'italic' }}>
        "{whisper}"
      </div>
    </div>
  );
}
