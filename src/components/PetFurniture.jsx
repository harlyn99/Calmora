import React from 'react'

// ============================================
// FURNITURE COMPONENTS - Custom SVG (NO EMOJI)
// ============================================

export const BasicBed = () => (
  <svg viewBox="0 0 240 120" className="basic-bed" preserveAspectRatio="xMidYMid meet">
    <rect x="10" y="60" width="220" height="50" rx="8" fill="#8B7355" />
    <rect x="20" y="100" width="15" height="15" fill="#6B5345" />
    <rect x="205" y="100" width="15" height="15" fill="#6B5345" />
    <rect x="20" y="50" width="200" height="35" rx="5" fill="#F5F5F5" />
    <ellipse cx="60" cy="55" rx="30" ry="18" fill="#FFFFFF" />
    <rect x="90" y="50" width="120" height="30" rx="5" fill="#6B9F7F" />
    <path d="M90,55 L210,55" stroke="#5A8F6F" strokeWidth="2" />
  </svg>
)

export const CozyBed = () => (
  <svg viewBox="0 0 260 140" className="cozy-bed" preserveAspectRatio="xMidYMid meet">
    <rect x="10" y="70" width="240" height="60" rx="10" fill="#A08060" />
    <rect x="20" y="20" width="220" height="60" rx="5" fill="#8B7355" />
    <rect x="40" y="35" width="180" height="30" rx="3" fill="#6B5345" opacity="0.5" />
    <rect x="25" y="120" width="20" height="15" fill="#6B5345" />
    <rect x="215" y="120" width="20" height="15" fill="#6B5345" />
    <rect x="25" y="60" width="210" height="40" rx="5" fill="#FEF3C7" />
    <ellipse cx="70" cy="65" rx="35" ry="20" fill="#FFFFFF" />
    <ellipse cx="110" cy="65" rx="35" ry="20" fill="#FFFFFF" />
    <rect x="120" y="60" width="105" height="35" rx="5" fill="#F472B6" />
    <circle cx="170" cy="75" r="10" fill="#EC4899" opacity="0.3" />
  </svg>
)

export const LuxuryBed = () => (
  <svg viewBox="0 0 300 160" className="luxury-bed" preserveAspectRatio="xMidYMid meet">
    {/* Frame */}
    <rect x="15" y="80" width="270" height="70" rx="12" fill="#7C3AED" />
    {/* Headboard */}
    <rect x="30" y="15" width="240" height="75" rx="8" fill="#6D28D9" />
    {/* Headboard decorations */}
    <circle cx="150" cy="50" r="20" fill="#5B21B6" opacity="0.5" />
    <circle cx="150" cy="50" r="12" fill="#A78BFA" />
    {/* Legs */}
    <rect x="30" y="140" width="25" height="18" fill="#5B21B6" />
    <rect x="245" y="140" width="25" height="18" fill="#5B21B6" />
    {/* Mattress */}
    <rect x="30" y="70" width="240" height="45" rx="6" fill="#F5F3FF" />
    {/* Pillows */}
    <ellipse cx="85" cy="78" rx="40" ry="22" fill="#FFFFFF" />
    <ellipse cx="135" cy="78" rx="40" ry="22" fill="#FFFFFF" />
    <ellipse cx="185" cy="78" rx="40" ry="22" fill="#FFFFFF" />
    {/* Blanket */}
    <rect x="160" y="70" width="100" height="40" rx="6" fill="#C4B5FD" />
    {/* Decorative pattern */}
    <path d="M180,85 L240,85" stroke="#8B5CF6" strokeWidth="2" opacity="0.5" />
    <path d="M180,95 L240,95" stroke="#8B5CF6" strokeWidth="2" opacity="0.5" />
  </svg>
)

export const Lamp = () => (
  <svg viewBox="0 0 100 350" className="lamp" preserveAspectRatio="xMidYMid meet">
    <ellipse cx="50" cy="330" rx="35" ry="12" fill="#D4C4B0" />
    <rect x="35" y="310" width="30" height="20" fill="#C4B4A0" />
    <rect x="45" y="120" width="10" height="190" fill="#A08060" />
    <circle cx="50" cy="150" r="12" fill="#B09070" />
    <path d="M25,120 L75,120 L85,20 L15,20 Z" fill="#F5F5F5" />
    <path d="M25,120 L75,120" stroke="#D4C4B0" strokeWidth="3" />
    <ellipse cx="50" cy="70" r="20" fill="#FFD700" opacity="0.4">
      <animate attributeName="opacity" values="0.3;0.5;0.3" dur="2s" repeatCount="indefinite" />
    </ellipse>
  </svg>
)

export const Bathtub = () => (
  <svg viewBox="0 0 280 160" className="bathtub" preserveAspectRatio="xMidYMid meet">
    <rect x="15" y="60" width="250" height="90" rx="25" fill="#FFFFFF" 
          stroke="#E5E7EB" strokeWidth="2" />
    <ellipse cx="140" cy="105" rx="100" ry="35" fill="#F9FAFB" />
    <ellipse cx="140" cy="105" rx="95" ry="30" fill="#BAE6FD" opacity="0.6" />
    <path d="M60,100 Q80,95 100,100" stroke="#7DD3FC" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M140,95 Q160,90 180,95" stroke="#7DD3FC" strokeWidth="2" fill="none" opacity="0.5" />
    <path d="M245,60 L245,90" stroke="#9CA3AF" strokeWidth="10" strokeLinecap="round" />
    <circle cx="245" cy="55" r="8" fill="#6B7280" />
    <circle cx="80" cy="100" r="6" fill="#FFFFFF" opacity="0.8">
      <animate attributeName="cy" values="100;95;100" dur="1s" repeatCount="indefinite" />
    </circle>
    <circle cx="120" cy="105" r="5" fill="#FFFFFF" opacity="0.6">
      <animate attributeName="cy" values="105;100;105" dur="1.2s" repeatCount="indefinite" />
    </circle>
    <circle cx="180" cy="100" r="7" fill="#FFFFFF" opacity="0.7">
      <animate attributeName="cy" values="100;95;100" dur="0.8s" repeatCount="indefinite" />
    </circle>
  </svg>
)

export const Chair = () => (
  <svg viewBox="0 0 120 150" className="chair" preserveAspectRatio="xMidYMid meet">
    <rect x="15" y="100" width="12" height="45" fill="#8B7355" />
    <rect x="93" y="100" width="12" height="45" fill="#8B7355" />
    <rect x="25" y="110" width="12" height="35" fill="#7B6345" />
    <rect x="83" y="110" width="12" height="35" fill="#7B6345" />
    <rect x="10" y="85" width="100" height="25" rx="5" fill="#A08060" />
    <rect x="15" y="80" width="90" height="15" rx="5" fill="#D4C4B0" />
    <rect x="20" y="20" width="80" height="75" rx="5" fill="#A08060" />
    <rect x="28" y="28" width="64" height="59" rx="3" fill="#D4C4B0" />
    <circle cx="60" cy="58" r="12" fill="#B09070" opacity="0.5" />
  </svg>
)

export const Table = () => (
  <svg viewBox="0 0 180 140" className="table" preserveAspectRatio="xMidYMid meet">
    <rect x="20" y="80" width="15" height="55" fill="#8B7355" />
    <rect x="145" y="80" width="15" height="55" fill="#8B7355" />
    <rect x="35" y="90" width="12" height="45" fill="#7B6345" />
    <rect x="133" y="90" width="12" height="45" fill="#7B6345" />
    <rect x="35" y="120" width="110" height="10" fill="#6B5345" />
    <rect x="10" y="60" width="160" height="25" rx="5" fill="#A08060" />
    <rect x="15" y="55" width="150" height="15" rx="3" fill="#B09070" />
    <path d="M30,62 L150,62" stroke="#907050" strokeWidth="1" opacity="0.5" />
    <path d="M40,67 L140,67" stroke="#907050" strokeWidth="1" opacity="0.5" />
  </svg>
)

export const Bookshelf = () => (
  <svg viewBox="0 0 140 180" className="bookshelf" preserveAspectRatio="xMidYMid meet">
    {/* Frame */}
    <rect x="10" y="10" width="120" height="160" rx="5" fill="#A08060" />
    <rect x="20" y="20" width="100" height="140" fill="#8B7355" />
    {/* Shelves */}
    <rect x="20" y="65" width="100" height="8" fill="#7B6345" />
    <rect x="20" y="110" width="100" height="8" fill="#7B6345" />
    {/* Books - Top shelf */}
    <rect x="30" y="30" width="15" height="30" fill="#DC2626" />
    <rect x="47" y="30" width="15" height="30" fill="#2563EB" />
    <rect x="64" y="30" width="15" height="30" fill="#059669" />
    <rect x="81" y="30" width="15" height="30" fill="#7C3AED" />
    {/* Books - Middle shelf */}
    <rect x="30" y="78" width="12" height="28" fill="#DB2777" />
    <rect x="44" y="78" width="12" height="28" fill="#0891B2" />
    <rect x="58" y="78" width="12" height="28" fill="#D97706" />
    <rect x="72" y="78" width="12" height="28" fill="#4F46E5" />
    <rect x="86" y="78" width="12" height="28" fill="#047857" />
    {/* Books - Bottom shelf */}
    <rect x="30" y="123" width="18" height="32" fill="#9333EA" />
    <rect x="50" y="123" width="18" height="32" fill="#DC2626" />
    <rect x="70" y="123" width="18" height="32" fill="#2563EB" />
    <rect x="90" y="123" width="18" height="32" fill="#059669" />
  </svg>
)

export const Plant = () => (
  <svg viewBox="0 0 80 120" className="plant" preserveAspectRatio="xMidYMid meet">
    {/* Pot */}
    <rect x="25" y="90" width="30" height="25" fill="#B45309" />
    <rect x="28" y="93" width="24" height="8" fill="#92400E" />
    {/* Stem */}
    <path d="M40,90 Q45,70 40,50" stroke="#16A34A" strokeWidth="4" fill="none" />
    {/* Leaves */}
    <ellipse cx="30" cy="65" rx="15" ry="8" fill="#15803D" transform="rotate(-30,30,65)" />
    <ellipse cx="50" cy="55" rx="15" ry="8" fill="#16A34A" transform="rotate(30,50,55)" />
    <ellipse cx="35" cy="45" rx="12" ry="6" fill="#15803D" transform="rotate(-45,35,45)" />
    {/* Top leaf */}
    <ellipse cx="40" cy="35" rx="18" ry="10" fill="#22C55E" />
  </svg>
)

export const Tree = () => (
  <svg viewBox="0 0 120 200" className="tree" preserveAspectRatio="xMidYMid meet">
    <rect x="50" y="140" width="20" height="55" fill="#8B7355" />
    <ellipse cx="60" cy="120" rx="50" ry="35" fill="#22C55E" />
    <ellipse cx="60" cy="95" rx="45" ry="30" fill="#16A34A" />
    <ellipse cx="60" cy="70" rx="40" ry="25" fill="#15803D" />
    <ellipse cx="50" cy="100" rx="15" ry="10" fill="#4ADE80" opacity="0.4" />
    <ellipse cx="70" cy="85" rx="12" ry="8" fill="#4ADE80" opacity="0.4" />
  </svg>
)

export const Flower = () => (
  <svg viewBox="0 0 60 100" className="flower" preserveAspectRatio="xMidYMid meet">
    <path d="M30,100 Q35,70 30,40" stroke="#22C55E" strokeWidth="4" fill="none" />
    <ellipse cx="20" cy="70" rx="12" ry="6" fill="#16A34A" transform="rotate(-30,20,70)" />
    <ellipse cx="40" cy="60" rx="12" ry="6" fill="#16A34A" transform="rotate(30,40,60)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#F472B6" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#EC4899" transform="rotate(60,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#F472B6" transform="rotate(120,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#EC4899" transform="rotate(180,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#F472B6" transform="rotate(240,30,25)" />
    <ellipse cx="30" cy="25" rx="8" ry="15" fill="#EC4899" transform="rotate(300,30,25)" />
    <circle cx="30" cy="25" r="10" fill="#FBBF24" />
  </svg>
)

export const RugRound = () => (
  <svg viewBox="0 0 120 120" className="rug-round" preserveAspectRatio="xMidYMid meet">
    <ellipse cx="60" cy="60" rx="55" ry="55" fill="#FCA5A5" />
    <ellipse cx="60" cy="60" rx="40" ry="40" fill="#F9A8D4" />
    <ellipse cx="60" cy="60" rx="25" ry="25" fill="#F472B6" />
    <circle cx="60" cy="60" r="10" fill="#EC4899" />
  </svg>
)

export const Clock = () => (
  <svg viewBox="0 0 80 80" className="clock" preserveAspectRatio="xMidYMid meet">
    <circle cx="40" cy="40" r="38" fill="#8B7355" />
    <circle cx="40" cy="40" r="32" fill="#FEF3C7" />
    <circle cx="40" cy="15" r="2" fill="#1F2937" />
    <circle cx="65" cy="40" r="2" fill="#1F2937" />
    <circle cx="40" cy="65" r="2" fill="#1F2937" />
    <circle cx="15" cy="40" r="2" fill="#1F2937" />
    <line x1="40" y1="40" x2="40" y2="25" stroke="#1F2937" strokeWidth="2" />
    <line x1="40" y1="40" x2="52" y2="40" stroke="#1F2937" strokeWidth="2" />
    <circle cx="40" cy="40" r="3" fill="#1F2937" />
  </svg>
)
