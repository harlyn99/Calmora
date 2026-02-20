import React from 'react'

// ============================================
// CLOTHING COMPONENTS - Custom SVG (NO EMOJI)
// ============================================

export const PajamasBlue = () => (
  <svg viewBox="0 0 100 120" className="pajamas-blue" preserveAspectRatio="xMidYMid meet">
    <path d="M25,20 L75,20 L85,110 L15,110 Z" fill="#60A5FA" />
    <path d="M40,20 L50,30 L60,20" fill="#3B82F6" />
    <circle cx="50" cy="40" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="55" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="70" r="3" fill="#FFFFFF" />
    <rect x="35" y="75" width="30" height="25" rx="3" fill="#3B82F6" opacity="0.5" />
  </svg>
)

export const PajamasPink = () => (
  <svg viewBox="0 0 100 120" className="pajamas-pink" preserveAspectRatio="xMidYMid meet">
    <path d="M25,20 L75,20 L85,110 L15,110 Z" fill="#F472B6" />
    <path d="M40,20 L50,30 L60,20" fill="#EC4899" />
    <circle cx="50" cy="40" r="3" fill="#FFFFFF" />
    <circle cx="50" cy="55" r="3" fill="#FFFFFF" />
    <path d="M50,85 Q45,80 40,85 Q35,90 40,95 L50,105 L60,95 Q65,90 60,85 Q55,80 50,85" 
          fill="#FFFFFF" opacity="0.6" />
  </svg>
)

export const PajamasWhite = () => (
  <svg viewBox="0 0 100 120" className="pajamas-white" preserveAspectRatio="xMidYMid meet">
    <path d="M25,20 L75,20 L85,110 L15,110 Z" fill="#E5E7EB" />
    <path d="M40,20 L50,30 L60,20" fill="#D1D5DB" />
    <circle cx="50" cy="40" r="3" fill="#9CA3AF" />
    <circle cx="50" cy="55" r="3" fill="#9CA3AF" />
    <path d="M30,60 L70,60" stroke="#D1D5DB" strokeWidth="2" />
    <path d="M30,75 L70,75" stroke="#D1D5DB" strokeWidth="2" />
  </svg>
)

export const SweaterRed = () => (
  <svg viewBox="0 0 100 120" className="sweater-red" preserveAspectRatio="xMidYMid meet">
    <path d="M20,25 L80,25 L90,110 L10,110 Z" fill="#DC2626" />
    <rect x="35" y="15" width="30" height="15" rx="5" fill="#DC2626" />
    <rect x="20" y="50" width="60" height="8" fill="#FCA5A5" opacity="0.5" />
    <rect x="20" y="70" width="60" height="8" fill="#FCA5A5" opacity="0.5" />
    <rect x="10" y="100" width="15" height="10" rx="3" fill="#FCA5A5" />
    <rect x="75" y="100" width="15" height="10" rx="3" fill="#FCA5A5" />
  </svg>
)

export const SweaterBeige = () => (
  <svg viewBox="0 0 100 120" className="sweater-beige" preserveAspectRatio="xMidYMid meet">
    <path d="M20,25 L80,25 L90,110 L10,110 Z" fill="#D4C4B0" />
    <rect x="35" y="15" width="30" height="15" rx="5" fill="#D4C4B0" />
    <rect x="20" y="50" width="60" height="8" fill="#C4B4A0" opacity="0.5" />
    <rect x="20" y="70" width="60" height="8" fill="#C4B4A0" opacity="0.5" />
    <circle cx="50" cy="60" r="8" fill="#A08060" opacity="0.4" />
  </svg>
)

export const WizardHat = () => (
  <svg viewBox="0 0 100 100" className="wizard-hat" preserveAspectRatio="xMidYMid meet">
    <polygon points="50,5 20,85 80,85" fill="#7C3AED" />
    <ellipse cx="50" cy="85" rx="40" ry="8" fill="#5B21B6" />
    <polygon points="50,20 52,26 58,26 54,30 55,36 50,33 45,36 46,30 42,26 48,26" 
             fill="#FBBF24" />
    <circle cx="35" cy="50" r="4" fill="#FBBF24" />
    <circle cx="65" cy="55" r="3" fill="#FBBF24" />
  </svg>
)

export const WizardRobe = () => (
  <svg viewBox="0 0 100 130" className="wizard-robe" preserveAspectRatio="xMidYMid meet">
    <path d="M15,15 L85,15 L95,125 L5,125 Z" fill="#7C3AED" />
    <path d="M50,15 L50,125" stroke="#FBBF24" strokeWidth="4" />
    <rect x="20" y="65" width="60" height="10" rx="3" fill="#FBBF24" />
    <rect x="42" y="67" width="16" height="6" fill="#5B21B6" />
    <path d="M70,40 Q75,35 70,30 Q65,35 70,40" fill="#FBBF24" opacity="0.6" />
  </svg>
)

export const AngelWings = () => (
  <svg viewBox="0 0 120 80" className="angel-wings" preserveAspectRatio="xMidYMid meet">
    <path d="M60,40 Q30,10 10,20 Q5,35 20,45 Q10,60 30,70 Q50,65 60,40" 
          fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
    <path d="M60,40 Q90,10 110,20 Q115,35 100,45 Q110,60 90,70 Q70,65 60,40" 
          fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2" />
    <path d="M30,30 Q40,35 35,45" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
    <path d="M90,30 Q80,35 85,45" stroke="#E5E7EB" strokeWidth="1.5" fill="none" />
  </svg>
)

// ============================================
// ACCESSORIES COMPONENTS - Custom SVG (NO EMOJI)
// ============================================

export const BowPink = () => (
  <svg viewBox="0 0 80 50" className="bow-pink" preserveAspectRatio="xMidYMid meet">
    <ellipse cx="30" cy="25" rx="20" ry="15" fill="#EC4899" />
    <ellipse cx="50" cy="25" rx="20" ry="15" fill="#EC4899" />
    <circle cx="40" cy="25" r="8" fill="#DB2777" />
    <ellipse cx="25" cy="20" rx="8" ry="5" fill="#F9A8D4" opacity="0.5" />
    <ellipse cx="55" cy="20" rx="8" ry="5" fill="#F9A8D4" opacity="0.5" />
  </svg>
)

export const RoundGlasses = () => (
  <svg viewBox="0 0 80 30" className="round-glasses" preserveAspectRatio="xMidYMid meet">
    <circle cx="25" cy="15" r="12" fill="#DBEAFE" opacity="0.3" 
            stroke="#1E293B" strokeWidth="2" />
    <circle cx="55" cy="15" r="12" fill="#DBEAFE" opacity="0.3" 
            stroke="#1E293B" strokeWidth="2" />
    <path d="M37,15 Q40,12 43,15" stroke="#1E293B" strokeWidth="2" fill="none" />
    <path d="M13,15 L5,12" stroke="#1E293B" strokeWidth="2" />
    <path d="M67,15 L75,12" stroke="#1E293B" strokeWidth="2" />
  </svg>
)

export const ScarfRed = () => (
  <svg viewBox="0 0 100 40" className="scarf-red" preserveAspectRatio="xMidYMid meet">
    <path d="M10,20 Q50,30 90,20 L90,30 Q50,40 10,30 Z" fill="#DC2626" />
    <line x1="15" y1="30" x2="15" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="25" y1="30" x2="25" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="35" y1="30" x2="35" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="75" y1="30" x2="75" y2="38" stroke="#DC2626" strokeWidth="2" />
    <line x1="85" y1="30" x2="85" y2="38" stroke="#DC2626" strokeWidth="2" />
    <circle cx="50" cy="25" r="5" fill="#FCA5A5" opacity="0.5" />
  </svg>
)
