// Realistic Backpack Icon - SVG Component
interface BackpackIconProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function BackpackIcon({ size = 40, color = '#2dd4bf', style }: BackpackIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      style={style}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main backpack body - dark canvas/nylon with gradient */}
      <defs>
        <linearGradient id="backpackBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a2a" />
          <stop offset="50%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0a0a0a" />
        </linearGradient>
        <linearGradient id="backpackFlap" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
      
      {/* Main body */}
      <path
        d="M 11 16 L 11 29 Q 11 33 15 33 L 25 33 Q 29 33 29 29 L 29 16 Q 29 12 25 12 L 20 12 L 20 10 Q 20 9 19 9 L 21 9 Q 20 9 20 10 L 20 12 L 15 12 Q 11 12 11 16 Z"
        fill="url(#backpackBody)"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Top flap with depth */}
      <path
        d="M 11 16 Q 11 14 13 14 L 27 14 Q 29 14 29 16"
        fill="url(#backpackFlap)"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Flap shadow/highlight */}
      <path
        d="M 11 16 Q 11 14 13 14 L 27 14 Q 29 14 29 16"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="0.5"
        strokeLinecap="round"
      />
      
      {/* Front pocket with depth */}
      <rect
        x="13"
        y="18"
        width="14"
        height="9"
        rx="1.5"
        fill="#0a0a0a"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.9"
      />
      
      {/* Pocket highlight */}
      <rect
        x="13.5"
        y="18.5"
        width="13"
        height="2"
        rx="0.5"
        fill="rgba(255,255,255,0.05)"
      />
      
      {/* Zipper on pocket */}
      <line
        x1="15"
        y1="20"
        x2="25"
        y2="20"
        stroke={color}
        strokeWidth="1"
        opacity="0.7"
      />
      {/* Zipper teeth */}
      <circle cx="16" cy="20" r="0.8" fill={color} opacity="0.6" />
      <circle cx="18" cy="20" r="0.8" fill={color} opacity="0.6" />
      <circle cx="20" cy="20" r="0.8" fill={color} opacity="0.6" />
      <circle cx="22" cy="20" r="0.8" fill={color} opacity="0.6" />
      <circle cx="24" cy="20" r="0.8" fill={color} opacity="0.6" />
      
      {/* Side compression straps with buckles */}
      <circle
        cx="10"
        cy="21"
        r="2.5"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
      <circle
        cx="10"
        cy="21"
        r="1"
        fill={color}
        opacity="0.5"
      />
      <line
        x1="10"
        y1="18.5"
        x2="10"
        y2="23.5"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.6"
      />
      
      <circle
        cx="30"
        cy="21"
        r="2.5"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        opacity="0.8"
      />
      <circle
        cx="30"
        cy="21"
        r="1"
        fill={color}
        opacity="0.5"
      />
      <line
        x1="30"
        y1="18.5"
        x2="30"
        y2="23.5"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.6"
      />
      
      {/* Shoulder straps - left */}
      <path
        d="M 13 12 L 9 9 L 7 7"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 13 12 L 9 9 L 7 7"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Shoulder straps - right */}
      <path
        d="M 27 12 L 31 9 L 33 7"
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
      <path
        d="M 27 12 L 31 9 L 33 7"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
      
      {/* Bottom reinforcement strip */}
      <rect
        x="11"
        y="29"
        width="18"
        height="2"
        fill="#0a0a0a"
        stroke={color}
        strokeWidth="1"
        opacity="0.8"
      />
      
      {/* Vertical stitching/seams */}
      <path
        d="M 15 16 L 15 29 M 25 16 L 25 29"
        fill="none"
        stroke={color}
        strokeWidth="0.6"
        strokeDasharray="1.5,1.5"
        opacity="0.5"
      />
      
      {/* Horizontal detail lines */}
      <line
        x1="13"
        y1="22"
        x2="27"
        y2="22"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.3"
      />
      
      {/* Top handle/loop */}
      <path
        d="M 18 12 Q 20 10 22 12"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

