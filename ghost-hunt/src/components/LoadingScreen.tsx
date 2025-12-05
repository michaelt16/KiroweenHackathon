// Full-screen loading screen with cork board aesthetic - match history style
import { useEffect, useState } from 'react';
import corkboardTexture from '../assets/texture/corkboardtexture.png';
import wrinkledPaper from '../assets/texture/wrinkledpaper.png';
import dust from '../assets/texture/dust.png';
import tape from '../assets/texture/tape.png';
import coffeestain from '../assets/texture/coffeestain.png';
import agentPfp from '../assets/images/agent/pfp.png';
// @ts-ignore - PNG imports
import classroomImage from '../assets/images/locations/classroom.PNG';
// @ts-ignore - PNG imports
import bathroomImage from '../assets/images/locations/bathroom.PNG';
import hospitalImage from '../assets/images/locations/hospital.png';
import victorianMansionImage from '../assets/images/locations/victorianmansion.png';
import victorianRoomImage from '../assets/images/locations/victorianroom.png';
import filmgrain from '../assets/texture/filmgrain.png';
import { getDamageVariant } from './analog/utils/randomization';

interface LoadingScreenProps {
  isLoading: boolean;
  message?: string;
}

interface Polaroid {
  id: string;
  position: { x: string; y: string };
  rotation: number;
  imageUrl: string;
  caption: string;
}

interface StringConnection {
  from: string;
  to: string;
}

export function LoadingScreen({ isLoading, message = 'Loading real-world landmarks' }: LoadingScreenProps) {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [loadingDots, setLoadingDots] = useState(0);

  // Location polaroids scattered across the board - spread out, agent in center
  const locationPolaroids: Polaroid[] = [
    {
      id: 'loc-1',
      position: { x: '15%', y: '20%' },
      rotation: -8,
      imageUrl: classroomImage,
      caption: 'Classroom',
    },
    {
      id: 'loc-2',
      position: { x: '85%', y: '25%' },
      rotation: 5,
      imageUrl: bathroomImage,
      caption: 'Bathroom',
    },
    {
      id: 'loc-3',
      position: { x: '20%', y: '75%' },
      rotation: -6,
      imageUrl: hospitalImage,
      caption: 'Hospital',
    },
    {
      id: 'loc-4',
      position: { x: '80%', y: '70%' },
      rotation: 7,
      imageUrl: victorianMansionImage,
      caption: 'Mansion',
    },
    {
      id: 'loc-5',
      position: { x: '50%', y: '15%' },
      rotation: -4,
      imageUrl: victorianRoomImage,
      caption: 'Room',
    },
    {
      id: 'agent',
      position: { x: '50%', y: '50%' },
      rotation: 3,
      imageUrl: agentPfp,
      caption: 'Agent',
    },
  ];

  // Red string connections - all locations connect to agent in center
  const stringConnections: StringConnection[] = [
    { from: 'agent', to: 'loc-1' },
    { from: 'agent', to: 'loc-2' },
    { from: 'agent', to: 'loc-3' },
    { from: 'agent', to: 'loc-4' },
    { from: 'agent', to: 'loc-5' },
  ];

  // Pin holes scattered around - spread out more
  const pinHoles = [
    { id: 'pin-1', x: '10%', y: '15%' },
    { id: 'pin-2', x: '90%', y: '20%' },
    { id: 'pin-3', x: '15%', y: '70%' },
    { id: 'pin-4', x: '85%', y: '65%' },
    { id: 'pin-5', x: '45%', y: '10%' },
    { id: 'pin-6', x: '55%', y: '10%' },
    { id: 'pin-7', x: '30%', y: '50%' },
    { id: 'pin-8', x: '70%', y: '50%' },
    { id: 'pin-9', x: '10%', y: '50%' },
    { id: 'pin-10', x: '90%', y: '50%' },
  ];

  // Animate radar sweep
  useEffect(() => {
    if (!isLoading) return;

    let animationId: number;
    const animate = () => {
      setSweepAngle((prev) => (prev + 2) % 360);
      animationId = requestAnimationFrame(animate);
    };
    
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isLoading]);

  // Animate loading dots
  useEffect(() => {
    if (!isLoading) return;

    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev + 1) % 4);
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Helper to get polaroid center for string connections
  const getPolaroidCenter = (polaroidId: string) => {
    const polaroid = locationPolaroids.find(p => p.id === polaroidId);
    if (!polaroid) return { x: 0, y: 0 };
    return {
      x: parseFloat(polaroid.position.x),
      y: parseFloat(polaroid.position.y),
    };
  };

  if (!isLoading) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        // Cork board background
        background: `
          url(${corkboardTexture}),
          linear-gradient(135deg, #8B6F47 0%, #6B5230 50%, #5A4228 100%)
        `,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply, normal',
        overflow: 'hidden',
      }}
    >
      {/* Cork texture overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${corkboardTexture})`,
          backgroundSize: 'cover',
          mixBlendMode: 'overlay',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Cork board vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.3) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Dust overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `url(${dust})`,
          backgroundSize: 'cover',
          opacity: 0.2,
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />

      {/* Coffee stains */}
      <div
        style={{
          position: 'absolute',
          top: '25%',
          right: '10%',
          width: '180px',
          height: '180px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'cover',
          opacity: 0.4,
          transform: 'rotate(15deg)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          width: '200px',
          height: '200px',
          backgroundImage: `url(${coffeestain})`,
          backgroundSize: 'cover',
          opacity: 0.35,
          transform: 'rotate(45deg)',
          pointerEvents: 'none',
        }}
      />

      {/* Pin holes */}
      {pinHoles.map((hole) => (
        <div
          key={hole.id}
          style={{
            position: 'absolute',
            left: hole.x,
            top: hole.y,
            width: '4px',
            height: '4px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.6)',
            boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.8)',
            pointerEvents: 'none',
            zIndex: 15,
          }}
        />
      ))}

      {/* Red string connections */}
      <svg
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {stringConnections.map((conn, index) => {
          const from = getPolaroidCenter(conn.from);
          const to = getPolaroidCenter(conn.to);
          
          return (
            <line
              key={`${conn.from}-${conn.to}-${index}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="#8b0000"
              strokeWidth="0.15"
              opacity={0.6}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Location Polaroids - Match history style, larger and closer */}
      {locationPolaroids.map((polaroid, index) => {
        // Use polaroid ID as seed for consistent randomization
        const seed = polaroid.id;
        const rotations = [-8, -5, -3, 3, 5, 8];
        const finalRotation = polaroid.rotation ?? rotations[getDamageVariant(seed, rotations.length)];
        
        const tapeRotations = [-12, -8, -5, 5, 8, 12];
        const tapeRotation = tapeRotations[getDamageVariant(seed, tapeRotations.length)];
        
        // Agent polaroid is bigger and in center
        const isAgent = polaroid.id === 'agent';
        const polaroidWidth = isAgent ? 'min(360px, 65vw)' : 'min(200px, 40vw)'; // Smaller location polaroids
        const photoHeight = isAgent ? '260px' : '150px'; // Smaller photo height for locations
        
        return (
          <div
            key={polaroid.id}
            style={{
              position: 'absolute',
              left: polaroid.position.x,
              top: polaroid.position.y,
              transform: `translate(-50%, -50%) rotate(${finalRotation}deg) perspective(600px) rotateY(-2deg)`,
              width: polaroidWidth,
              zIndex: isAgent ? 6 : 5, // Agent on top
              animation: `breathe 3s ease-in-out ${index * 0.3}s infinite`,
            }}
          >
            {/* Tape */}
            <div
              style={{
                position: 'absolute',
                top: '-15px',
                left: '50%',
                transform: `translateX(-50%) rotate(${tapeRotation}deg)`,
                width: '100px',
                height: '30px',
                backgroundImage: `url(${tape})`,
                backgroundSize: 'cover',
                zIndex: 2,
              }}
            />

            {/* Polaroid frame - Match history style */}
            <div
              style={{
                background: '#e8e4dc',
                padding: '12px 12px 45px 12px',
                boxShadow: '0 12px 30px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'visible',
              }}
            >
              {/* Damaged border effects */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, rgba(139, 111, 78, 0.4) 20%, rgba(139, 111, 78, 0.6) 50%, rgba(139, 111, 78, 0.4) 80%, transparent)',
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, transparent, rgba(139, 111, 78, 0.5) 20%, rgba(139, 111, 78, 0.7) 50%, rgba(139, 111, 78, 0.5) 80%, transparent)',
                  opacity: 0.6,
                }}
              />

              {/* Photo area */}
              <div
                style={{
                  width: '100%',
                  height: photoHeight, // Dynamic height - larger for agent
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img 
                  src={polaroid.imageUrl}
                  alt={polaroid.caption}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
                {/* Heavy static/grain overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${filmgrain})`,
                    backgroundSize: '200% 200%',
                    mixBlendMode: 'overlay',
                    opacity: 0.9,
                    pointerEvents: 'none',
                  }}
                />
                {/* Additional dust overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${dust})`,
                    backgroundSize: 'cover',
                    mixBlendMode: 'overlay',
                    opacity: 0.6,
                    pointerEvents: 'none',
                  }}
                />
              </div>

              {/* Caption */}
              <div
                style={{
                  marginTop: '8px',
                  fontFamily: '"Courier New", monospace',
                  fontSize: '11px',
                  color: '#1a0f0a',
                  textAlign: 'center',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {polaroid.caption}
              </div>
            </div>

            {/* Push pin */}
            <div
              style={{
                position: 'absolute',
                top: '-8px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '12px',
                height: '12px',
                background: '#8b0000',
                borderRadius: '50%',
                boxShadow: '0 2px 4px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.3)',
                zIndex: 3,
              }}
            />
          </div>
        );
      })}

      {/* Small Radar Spinner - Bottom Center */}
      <div
        style={{
          position: 'absolute',
          bottom: '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '120px',
          height: '120px',
          zIndex: 8,
        }}
      >
        {/* Radar background - analog horror style (amber/orange) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle, rgba(20, 10, 0, 0.95) 0%, rgba(10, 5, 0, 0.98) 100%)',
            borderRadius: '50%',
            border: '2px solid #d4a574', // Amber/orange color
            boxShadow: `
              0 0 20px rgba(212, 165, 116, 0.4),
              inset 0 0 30px rgba(212, 165, 116, 0.15)
            `,
            overflow: 'hidden',
          }}
        >
          {/* Radar SVG */}
          <svg width="100%" height="100%" viewBox="0 0 120 120" style={{ position: 'absolute', top: 0, left: 0 }}>
            <defs>
              {/* Glow filter */}
              <filter id="radarGlowSmall">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              
              {/* Sweep gradient - amber/orange */}
              <radialGradient id="sweepGradientSmall">
                <stop offset="0%" stopColor="#d4a574" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#d4a574" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Range rings - amber/orange */}
            <circle cx="60" cy="60" r="45" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.3" />
            <circle cx="60" cy="60" r="30" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.3" />
            <circle cx="60" cy="60" r="15" fill="none" stroke="#d4a574" strokeWidth="1" opacity="0.3" />
            
            {/* Crosshair */}
            <line x1="60" y1="15" x2="60" y2="105" stroke="#d4a574" strokeWidth="0.5" opacity="0.2" />
            <line x1="15" y1="60" x2="105" y2="60" stroke="#d4a574" strokeWidth="0.5" opacity="0.2" />

            {/* Sweep line */}
            <line
              x1="60"
              y1="60"
              x2={60 + Math.cos((sweepAngle * Math.PI) / 180) * 45}
              y2={60 + Math.sin((sweepAngle * Math.PI) / 180) * 45}
              stroke="#d4a574"
              strokeWidth="1.5"
              opacity="0.9"
              filter="url(#radarGlowSmall)"
            />

            {/* Sweep fade trail (30-degree arc) */}
            <path
              d={`M 60 60 L ${60 + Math.cos(((sweepAngle - 30) * Math.PI) / 180) * 45} ${60 + Math.sin(((sweepAngle - 30) * Math.PI) / 180) * 45} A 45 45 0 0 1 ${60 + Math.cos((sweepAngle * Math.PI) / 180) * 45} ${60 + Math.sin((sweepAngle * Math.PI) / 180) * 45} Z`}
              fill="url(#sweepGradientSmall)"
              opacity="0.4"
            />
          </svg>

          {/* Center dot */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '4px',
              height: '4px',
              background: '#d4a574',
              borderRadius: '50%',
              boxShadow: '0 0 8px rgba(212, 165, 116, 0.8)',
            }}
          />
        </div>
      </div>

      {/* Loading text with animated dots */}
      <div
        style={{
          position: 'absolute',
          bottom: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 8,
          fontFamily: '"Courier New", monospace',
          fontSize: '18px',
          color: '#d4a574',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '2px',
          textShadow: '0 0 10px rgba(212, 165, 116, 0.5)',
        }}
      >
        Loading{'.'.repeat(loadingDots)}
      </div>
    </div>
  );
}



