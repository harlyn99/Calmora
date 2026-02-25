import React from 'react'
import './PetDisplay.css'

const PetDisplay = ({ petType = 'cat', expression = 'happy', size = 'medium' }) => {
  // Kawaii colors for each pet
  const colors = {
    cat: { body: '#E8D5C4', ear: '#D4A574', belly: '#F5E6D3', inner: '#FFB6C1' },
    dog: { body: '#F5DEB3', ear: '#DEB887', belly: '#FFE4C4', inner: '#DEB887' },
    bunny: { body: '#FFE4E1', ear: '#FFB6C1', belly: '#FFF0F5', inner: '#FFB6C1' },
    hamster: { body: '#FFE5B4', ear: '#DEB887', belly: '#FFF8DC', inner: '#FFB6C1' },
    bird: { body: '#87CEEB', ear: '#4682B4', belly: '#E0F7FA', inner: '#FFA500' },
    bear: { body: '#D4C4B0', ear: '#A08060', belly: '#E8D5C4', inner: '#A08060' },
    fox: { body: '#FF8C42', ear: '#FF6B35', belly: '#FFE5CC', inner: '#FF6B35' },
    panda: { body: '#FFFFFF', ear: '#1a1a1a', belly: '#F0F0F0', inner: '#1a1a1a' },
    raccoon: { body: '#A0A0A0', ear: '#696969', belly: '#D3D3D3', inner: '#696969' },
    elephant: { body: '#E8E8E8', ear: '#C0C0C0', belly: '#F0F0F0', inner: '#C0C0C0' },
    penguin: { body: '#1a1a1a', ear: '#1a1a1a', belly: '#FFFFFF', inner: '#FFA500' },
    owl: { body: '#8B7355', ear: '#A0826D', belly: '#DEB887', inner: '#A0826D' },
    unicorn: { body: '#FFFFFF', ear: '#FFB6C1', belly: '#FFF8DC', inner: '#FFD700' },
    dragon: { body: '#4169E1', ear: '#1E3A8A', belly: '#87CEEB', inner: '#1E3A8A' },
    phoenix: { body: '#FF4500', ear: '#FF6347', belly: '#FFA500', inner: '#FFD700' },
    griffin: { body: '#DAA520', ear: '#B8860B', belly: '#F5DEB3', inner: '#8B4513' },
    celestial: { body: '#1a1a2e', ear: '#16213e', belly: '#0f3460', inner: '#FFD700' }
  }[petType] || { body: '#E8D5C4', ear: '#D4A574', belly: '#F5E6D3', inner: '#FFB6C1' }

  // KAWAII CHIBI STYLE - BIG HEAD, DOT EYES, DOT MOUTH
  const renderKawaiiBody = () => {
    if (petType === 'bunny') {
      return (
        <g>
          <ellipse cx="75" cy="65" rx="12" ry="40" fill={colors.ear} />
          <ellipse cx="75" cy="65" rx="6" ry="30" fill={colors.inner} opacity="0.7" />
          <ellipse cx="125" cy="65" rx="12" ry="40" fill={colors.ear} />
          <ellipse cx="125" cy="65" rx="6" ry="30" fill={colors.inner} opacity="0.7" />
          <circle cx="100" cy="115" r="55" fill={colors.body} />
          <ellipse cx="100" cy="195" rx="38" ry="42" fill={colors.body} />
          <ellipse cx="100" cy="200" rx="25" ry="30" fill={colors.belly} opacity="0.6" />
          <circle cx="138" cy="190" r="14" fill={colors.body} />
        </g>
      )
    } else if (petType === 'elephant') {
      return (
        <g>
          <ellipse cx="40" cy="120" rx="32" ry="40" fill={colors.ear} />
          <ellipse cx="160" cy="120" rx="32" ry="40" fill={colors.ear} />
          <circle cx="100" cy="120" r="52" fill={colors.body} />
          <path d="M100 140 Q95 165, 90 180 Q85 190, 80 195 Q75 200, 80 203 Q85 205, 90 200 Q95 195, 100 185 Q105 170, 105 155" fill={colors.body} stroke={colors.inner} strokeWidth="2" />
          <ellipse cx="100" cy="205" rx="40" ry="45" fill={colors.body} />
          <ellipse cx="100" cy="210" rx="28" ry="32" fill={colors.belly} opacity="0.6" />
        </g>
      )
    } else if (petType === 'bird' || petType === 'penguin' || petType === 'phoenix' || petType === 'griffin') {
      return (
        <g>
          <circle cx="100" cy="105" r="50" fill={colors.body} />
          <ellipse cx="100" cy="180" rx="40" ry="48" fill={colors.body} />
          <ellipse cx="100" cy="185" rx="28" ry="35" fill={colors.belly} />
          <circle cx="100" cy="125" r="5" fill={colors.inner} />
          <ellipse cx="62" cy="175" rx="12" ry="16" fill={petType === 'penguin' ? colors.body : colors.ear} />
          <ellipse cx="138" cy="175" rx="12" ry="16" fill={petType === 'penguin' ? colors.body : colors.ear} />
          {petType === 'penguin' && (
            <>
              <ellipse cx="78" cy="225" rx="15" ry="7" fill="#FFA500" />
              <ellipse cx="122" cy="225" rx="15" ry="7" fill="#FFA500" />
            </>
          )}
        </g>
      )
    } else if (petType === 'owl') {
      return (
        <g>
          <path d="M62 80 L52 50 L70 72 Z" fill={colors.ear} />
          <path d="M138 80 L148 50 L130 72 Z" fill={colors.ear} />
          <circle cx="100" cy="120" r="54" fill={colors.body} />
          <ellipse cx="100" cy="200" rx="38" ry="42" fill={colors.body} />
          <ellipse cx="100" cy="205" rx="26" ry="30" fill={colors.belly} opacity="0.6" />
          <ellipse cx="62" cy="190" rx="12" ry="15" fill={colors.body} />
          <ellipse cx="138" cy="190" rx="12" ry="15" fill={colors.body} />
        </g>
      )
    } else if (petType === 'unicorn') {
      return (
        <g>
          <path d="M100 55 L94 30 L97 25 L100 20 L103 25 L107 30 L100 55" fill={colors.inner} stroke="#FFD700" strokeWidth="1" />
          <path d="M65 80 L55 50 L72 73 Z" fill={colors.ear} />
          <path d="M135 80 L145 50 L128 73 Z" fill={colors.ear} />
          <circle cx="100" cy="120" r="52" fill={colors.body} />
          <path d="M55 105 Q45 125, 50 145 Q55 165, 60 145 Q65 125, 58 105" fill={colors.inner} opacity="0.8" />
          <ellipse cx="100" cy="200" rx="38" ry="45" fill={colors.body} />
          <ellipse cx="100" cy="205" rx="26" ry="32" fill={colors.belly} opacity="0.6" />
        </g>
      )
    } else if (petType === 'dragon') {
      return (
        <g>
          <path d="M52 85 L32 55 L57 75 Z" fill={colors.inner} />
          <path d="M148 85 L168 55 L143 75 Z" fill={colors.inner} />
          <circle cx="100" cy="120" r="52" fill={colors.body} />
          <path d="M55 145 Q20 125, 10 155 Q20 185, 55 165" fill={colors.ear} opacity="0.8" />
          <path d="M145 145 Q180 125, 190 155 Q180 185, 145 165" fill={colors.ear} opacity="0.8" />
          <ellipse cx="100" cy="205" rx="40" ry="48" fill={colors.body} />
          <ellipse cx="100" cy="210" rx="28" ry="35" fill={colors.belly} opacity="0.6" />
          <path d="M138 200 Q170 195, 185 180 Q190 175, 185 170 Q180 165, 170 175 Q155 190, 138 200" fill={colors.body} />
        </g>
      )
    } else if (petType === 'panda') {
      return (
        <g>
          <circle cx="55" cy="75" r="15" fill={colors.ear} />
          <circle cx="145" cy="75" r="15" fill={colors.ear} />
          <circle cx="100" cy="120" r="54" fill={colors.body} />
          <ellipse cx="80" cy="115" rx="15" ry="13" fill={colors.ear} />
          <ellipse cx="120" cy="115" rx="15" ry="13" fill={colors.ear} />
          <ellipse cx="100" cy="200" rx="40" ry="45" fill={colors.body} />
          <ellipse cx="100" cy="205" rx="28" ry="33" fill={colors.belly} opacity="0.6" />
        </g>
      )
    } else if (petType === 'raccoon') {
      return (
        <g>
          <path d="M60 80 L47 50 L68 72 Z" fill={colors.ear} />
          <path d="M140 80 L153 50 L132 72 Z" fill={colors.ear} />
          <circle cx="100" cy="120" r="54" fill={colors.body} />
          <path d="M68 105 Q85 95, 100 105 Q115 95, 132 105 L138 123 Q115 113, 100 123 Q85 113, 62 123 Z" fill={colors.ear} />
          <ellipse cx="100" cy="200" rx="40" ry="45" fill={colors.body} />
          <ellipse cx="100" cy="205" rx="28" ry="33" fill={colors.belly} opacity="0.6" />
          <path d="M138 195 Q168 190, 182 178 Q187 173, 182 168 Q177 163, 167 173 Q155 188, 138 195" fill={colors.body} />
          <path d="M152 192 Q168 188, 177 180" stroke={colors.inner} strokeWidth="5" fill="none" opacity="0.5" />
        </g>
      )
    } else if (petType === 'fox') {
      return (
        <g>
          <path d="M64 80 L50 45 L72 73 Z" fill={colors.ear} />
          <path d="M136 80 L150 45 L128 73 Z" fill={colors.ear} />
          <ellipse cx="100" cy="120" rx="54" ry="50" fill={colors.body} />
          <ellipse cx="100" cy="200" rx="36" ry="42" fill={colors.body} />
          <ellipse cx="100" cy="205" rx="24" ry="30" fill={colors.belly} opacity="0.6" />
          <path d="M136 195 Q172 190, 188 172 Q194 166, 188 160 Q182 154, 170 165 Q152 185, 136 195" fill={colors.body} />
        </g>
      )
    } else {
      return (
        <g>
          {petType === 'cat' || petType === 'celestial' ? (
            <>
              <path d="M64 80 L54 50 L74 73 Z" fill={colors.ear} />
              <path d="M136 80 L146 50 L126 73 Z" fill={colors.ear} />
            </>
          ) : petType === 'dog' ? (
            <>
              <ellipse cx="54" cy="85" rx="16" ry="22" fill={colors.ear} transform="rotate(-20 54 85)" />
              <ellipse cx="146" cy="85" rx="16" ry="22" fill={colors.ear} transform="rotate(20 146 85)" />
            </>
          ) : (
            <>
              <circle cx="60" cy="78" r="14" fill={colors.ear} />
              <circle cx="140" cy="78" r="14" fill={colors.ear} />
            </>
          )}
          <circle cx="100" cy="120" r="55" fill={colors.body} />
          <ellipse cx="100" cy="200" rx="40" ry="45" fill={colors.body} />
          <ellipse cx="100" cy="205" rx="28" ry="33" fill={colors.belly} opacity="0.6" />
          {petType === 'cat' && (
            <path d="M138 195 Q168 190, 182 172 Q187 167, 182 162 Q177 157, 167 167 Q155 185, 138 195" fill={colors.body} />
          )}
          {petType === 'celestial' && (
            <ellipse cx="100" cy="40" rx="25" ry="9" fill="none" stroke={colors.inner} strokeWidth="3" opacity="0.8" />
          )}
        </g>
      )
    }
  }

  // DOT EYES - Simple black dots (Pinterest kawaii style)
  const renderDotEyes = () => {
    const eyeY = 118
    const eyeSpacing = 20
    
    if (expression === 'happy' || expression === 'normal') {
      return (
        <g>
          <circle cx={100 - eyeSpacing} cy={eyeY} r="4" fill="#1a1a1a" />
          <circle cx={100 + eyeSpacing} cy={eyeY} r="4" fill="#1a1a1a" />
        </g>
      )
    } else if (expression === 'excited') {
      return (
        <g>
          <circle cx={100 - eyeSpacing} cy={eyeY} r="5" fill="#1a1a1a" />
          <circle cx={100 + eyeSpacing} cy={eyeY} r="5" fill="#1a1a1a" />
          <circle cx={100 - eyeSpacing + 2} cy={eyeY - 2} r="2" fill="white" />
          <circle cx={100 + eyeSpacing + 2} cy={eyeY - 2} r="2" fill="white" />
        </g>
      )
    } else if (expression === 'sleepy') {
      return (
        <g>
          <path d={`${100 - eyeSpacing - 6} ${eyeY} Q${100 - eyeSpacing} ${eyeY + 3}, ${100 - eyeSpacing + 6} ${eyeY}`} stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d={`${100 + eyeSpacing - 6} ${eyeY} Q${100 + eyeSpacing} ${eyeY + 3}, ${100 + eyeSpacing + 6} ${eyeY}`} stroke="#1a1a1a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </g>
      )
    } else if (expression === 'love') {
      return (
        <g>
          <circle cx={100 - eyeSpacing} cy={eyeY} r="4" fill="#1a1a1a" />
          <circle cx={100 + eyeSpacing} cy={eyeY} r="4" fill="#1a1a1a" />
          <path d={`${100 - eyeSpacing} ${eyeY - 2} C${100 - eyeSpacing - 3} ${eyeY - 5}, ${100 - eyeSpacing - 5} ${eyeY - 2}, ${100 - eyeSpacing} ${eyeY + 2}`} fill="#FF69B4" />
          <path d={`${100 + eyeSpacing} ${eyeY - 2} C${100 + eyeSpacing - 3} ${eyeY - 5}, ${100 + eyeSpacing - 5} ${eyeY - 2}, ${100 + eyeSpacing} ${eyeY + 2}`} fill="#FF69B4" />
        </g>
      )
    }
  }

  // DOT MOUTH - Simple dot (kawaii gemesh!)
  const renderDotMouth = () => {
    if (expression === 'happy' || expression === 'excited') {
      return <circle cx="100" cy="145" r="3" fill="#333" />
    } else if (expression === 'normal') {
      return <circle cx="100" cy="145" r="2.5" fill="#333" />
    } else if (expression === 'sleepy') {
      return <circle cx="100" cy="145" r="3" fill="#333" opacity="0.6" />
    } else if (expression === 'love') {
      return <circle cx="100" cy="145" r="3" fill="#333" />
    }
  }

  return (
    <div className={`pet-display pet-${size}`}>
      <svg className="pet-svg" viewBox="0 0 200 250">
        {/* Kawaii body with BIG HEAD */}
        {renderKawaiiBody()}
        
        {/* DOT EYES */}
        {renderDotEyes()}
        
        {/* DOT MOUTH */}
        {renderDotMouth()}
        
        {/* Arms */}
        <ellipse cx="60" cy="175" rx="13" ry="16" fill={colors.body} />
        <ellipse cx="140" cy="175" rx="13" ry="16" fill={colors.body} />
        
        {/* Legs/Feet */}
        <ellipse cx="78" cy="220" rx="18" ry="12" fill={colors.body} />
        <ellipse cx="122" cy="220" rx="18" ry="12" fill={colors.body} />
      </svg>
    </div>
  )
}

export default PetDisplay
