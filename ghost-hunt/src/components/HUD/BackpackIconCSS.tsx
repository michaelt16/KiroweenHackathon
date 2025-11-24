// CSS-based Backpack Icon - Analog Horror Style
interface BackpackIconCSSProps {
  size?: number;
  color?: string;
}

/**
 * BackpackIconCSS Component - Pure CSS backpack for analog horror aesthetic
 * Purpose: Replace SVG icon with CSS art that matches the analog vibe
 */
export function BackpackIconCSS({ 
  size = 40, 
  color = '#1a0f0a' 
}: BackpackIconCSSProps) {
  const scale = size / 40; // Base size is 40px

  return (
    <div
      style={{
        position: 'relative',
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Main backpack body */}
      <div
        style={{
          position: 'relative',
          width: `${28 * scale}px`,
          height: `${32 * scale}px`,
          background: 'linear-gradient(180deg, #5a4228 0%, #4a3520 50%, #3a2818 100%)',
          border: `${1.5 * scale}px solid ${color}`,
          borderRadius: `${3 * scale}px`,
          boxShadow: `inset 0 ${2 * scale}px ${4 * scale}px rgba(0,0,0,0.5)`,
        }}
      >
        {/* Top flap */}
        <div
          style={{
            position: 'absolute',
            top: `${-4 * scale}px`,
            left: `${-2 * scale}px`,
            right: `${-2 * scale}px`,
            height: `${6 * scale}px`,
            background: 'linear-gradient(180deg, #6b5230 0%, #4a3520 100%)',
            border: `${1.5 * scale}px solid ${color}`,
            borderBottom: 'none',
            borderRadius: `${3 * scale}px ${3 * scale}px 0 0`,
            boxShadow: `0 ${1 * scale}px ${2 * scale}px rgba(0,0,0,0.4)`,
          }}
        />

        {/* Front pocket */}
        <div
          style={{
            position: 'absolute',
            top: `${8 * scale}px`,
            left: `${4 * scale}px`,
            right: `${4 * scale}px`,
            height: `${10 * scale}px`,
            background: '#3a2818',
            border: `${1.2 * scale}px solid ${color}`,
            borderRadius: `${2 * scale}px`,
            opacity: 0.9,
          }}
        >
          {/* Zipper line */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: `${2 * scale}px`,
              right: `${2 * scale}px`,
              height: `${0.5 * scale}px`,
              background: color,
              opacity: 0.7,
              transform: 'translateY(-50%)',
            }}
          />
          {/* Zipper pull */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${2 * scale}px`,
              height: `${2 * scale}px`,
              background: color,
              borderRadius: '50%',
              opacity: 0.6,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Side compression straps - left */}
        <div
          style={{
            position: 'absolute',
            left: `${-3 * scale}px`,
            top: `${12 * scale}px`,
            width: `${5 * scale}px`,
            height: `${5 * scale}px`,
            border: `${1.2 * scale}px solid ${color}`,
            borderRadius: '50%',
            opacity: 0.8,
            background: 'transparent',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${2 * scale}px`,
              height: `${2 * scale}px`,
              background: color,
              borderRadius: '50%',
              opacity: 0.5,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Side compression straps - right */}
        <div
          style={{
            position: 'absolute',
            right: `${-3 * scale}px`,
            top: `${12 * scale}px`,
            width: `${5 * scale}px`,
            height: `${5 * scale}px`,
            border: `${1.2 * scale}px solid ${color}`,
            borderRadius: '50%',
            opacity: 0.8,
            background: 'transparent',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: `${2 * scale}px`,
              height: `${2 * scale}px`,
              background: color,
              borderRadius: '50%',
              opacity: 0.5,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>

        {/* Shoulder straps - left */}
        <div
          style={{
            position: 'absolute',
            top: `${-6 * scale}px`,
            left: `${4 * scale}px`,
            width: `${2 * scale}px`,
            height: `${8 * scale}px`,
            background: color,
            opacity: 0.9,
            transform: 'rotate(-25deg)',
            transformOrigin: 'bottom center',
            borderRadius: `${1 * scale}px`,
          }}
        />

        {/* Shoulder straps - right */}
        <div
          style={{
            position: 'absolute',
            top: `${-6 * scale}px`,
            right: `${4 * scale}px`,
            width: `${2 * scale}px`,
            height: `${8 * scale}px`,
            background: color,
            opacity: 0.9,
            transform: 'rotate(25deg)',
            transformOrigin: 'bottom center',
            borderRadius: `${1 * scale}px`,
          }}
        />

        {/* Top handle/loop */}
        <div
          style={{
            position: 'absolute',
            top: `${-2 * scale}px`,
            left: '50%',
            transform: 'translateX(-50%)',
            width: `${8 * scale}px`,
            height: `${3 * scale}px`,
            border: `${1.5 * scale}px solid ${color}`,
            borderBottom: 'none',
            borderRadius: `${4 * scale}px ${4 * scale}px 0 0`,
            opacity: 0.7,
          }}
        />

        {/* Bottom reinforcement strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: `${3 * scale}px`,
            background: '#3a2818',
            borderTop: `${1 * scale}px solid ${color}`,
            opacity: 0.8,
            borderRadius: `0 0 ${3 * scale}px ${3 * scale}px`,
          }}
        />

        {/* Vertical seams/stitching */}
        <div
          style={{
            position: 'absolute',
            left: `${6 * scale}px`,
            top: `${4 * scale}px`,
            bottom: `${3 * scale}px`,
            width: `${0.6 * scale}px`,
            background: color,
            opacity: 0.5,
            borderLeft: `${0.3 * scale}px dashed transparent`,
            borderRight: `${0.3 * scale}px dashed transparent`,
            backgroundImage: `repeating-linear-gradient(to bottom, ${color} 0, ${color} ${1.5 * scale}px, transparent ${1.5 * scale}px, transparent ${3 * scale}px)`,
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: `${6 * scale}px`,
            top: `${4 * scale}px`,
            bottom: `${3 * scale}px`,
            width: `${0.6 * scale}px`,
            background: color,
            opacity: 0.5,
            backgroundImage: `repeating-linear-gradient(to bottom, ${color} 0, ${color} ${1.5 * scale}px, transparent ${1.5 * scale}px, transparent ${3 * scale}px)`,
          }}
        />
      </div>
    </div>
  );
}

