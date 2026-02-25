import React from 'react'
import './PetDisplay.css'

// Pet configurations dengan WARNA ASLI dan DETAIL UNIK
const PET_CONFIG = {
  cat: {
    name: 'Cat',
    colors: { body: '#F5E6D6', ear: '#E8C4A4', belly: '#FFF0E0', inner: '#FFB6C1', stripes: '#C4A890', nose: '#FF99AC' },
    features: { ears: 'pointed', whiskers: true, tail: 'cat', markings: 'tabby' }
  },
  dog: {
    name: 'Dog',
    colors: { body: '#F8D8B8', ear: '#E8B890', belly: '#FFF4E0', inner: '#DEB887', nose: '#3C2818' },
    features: { ears: 'floppy', whiskers: true, tail: 'dog', markings: 'none' }
  },
  bunny: {
    name: 'Bunny',
    colors: { body: '#FFE8F0', ear: '#FFC0D0', belly: '#FFF8FC', inner: '#FFB6C1', nose: '#FF99AC' },
    features: { ears: 'long', whiskers: false, tail: 'fluffy', markings: 'none' }
  },
  hamster: {
    name: 'Hamster',
    colors: { body: '#FFECC8', ear: '#E8C8A0', belly: '#FFF8E8', inner: '#FFB6C1', nose: '#FF99AC' },
    features: { ears: 'round', whiskers: true, tail: 'small', markings: 'none' }
  },
  bird: {
    name: 'Bird',
    colors: { body: '#87CEEB', belly: '#E0F7FA', wing: '#4682B4', beak: '#FFA500', feet: '#FFA500' },
    features: { ears: 'none', whiskers: false, tail: 'bird', markings: 'none' }
  },
  bear: {
    name: 'Bear',
    colors: { body: '#A08060', ear: '#806040', belly: '#D4C4B0', nose: '#2A1810' },
    features: { ears: 'round', whiskers: false, tail: 'small', markings: 'none' }
  },
  fox: {
    name: 'Fox',
    colors: { body: '#FF8C42', ear: '#FF6B35', belly: '#FFE8D0', nose: '#2A2A2A', tailTip: '#FFFFFF' },
    features: { ears: 'pointed', whiskers: true, tail: 'fox', markings: 'white-cheeks' }
  },
  panda: {
    name: 'Panda',
    colors: { body: '#FFFFFF', ear: '#3A3A3A', belly: '#F8F8F8', patch: '#3A3A3A', nose: '#2A2A2A' },
    features: { ears: 'round', whiskers: false, tail: 'fluffy', markings: 'panda-patches' }
  },
  raccoon: {
    name: 'Raccoon',
    colors: { body: '#A0A0A0', ear: '#696969', belly: '#E8E8E8', mask: '#2A2A2A', nose: '#2A2A2A', tail: '#696969' },
    features: { ears: 'pointed', whiskers: true, tail: 'ringed', markings: 'mask' }
  },
  elephant: {
    name: 'Elephant',
    colors: { body: '#B0B0C0', ear: '#A0A0B0', belly: '#C0C0D0', trunk: '#A0A0B0' },
    features: { ears: 'big', whiskers: false, tail: 'thin', markings: 'none' }
  },
  penguin: {
    name: 'Penguin',
    colors: { body: '#2A2A3A', belly: '#FFFFFF', beak: '#FFA500', feet: '#FFA500' },
    features: { ears: 'none', whiskers: false, tail: 'small', markings: 'penguin' }
  },
  owl: {
    name: 'Owl',
    colors: { body: '#D4B890', ear: '#C4A880', belly: '#E8D8C0', beak: '#FFA500' },
    features: { ears: 'tuft', whiskers: false, tail: 'bird', markings: 'facial-disc' }
  },
  unicorn: {
    name: 'Unicorn',
    colors: { body: '#FFFFFF', ear: '#FFD0E0', belly: '#FFF8FC', horn: '#FFD700', mane: '#FF69B4' },
    features: { ears: 'pointed', whiskers: false, tail: 'unicorn', markings: 'magical' }
  },
  dragon: {
    name: 'Dragon',
    colors: { body: '#5080E0', ear: '#4070D0', belly: '#D0E0FC', horn: '#3060C0', wing: '#4070D0' },
    features: { ears: 'horn', whiskers: false, tail: 'dragon', markings: 'scales' }
  },
  phoenix: {
    name: 'Phoenix',
    colors: { body: '#FF6850', belly: '#FFD0C0', beak: '#FFA500', crest: '#FFD700', wing: '#FF8060' },
    features: { ears: 'none', whiskers: false, tail: 'phoenix', markings: 'fire' }
  },
  griffin: {
    name: 'Griffin',
    colors: { body: '#D4B870', ear: '#C4A860', belly: '#F8F0E0', beak: '#8B4513', wing: '#B89850' },
    features: { ears: 'pointed', whiskers: false, tail: 'lion', markings: 'eagle' }
  },
  celestial: {
    name: 'Celestial Cat',
    colors: { body: '#2A3050', ear: '#304070', belly: '#405080', nose: '#FF99AC', halo: '#FFD700', stars: '#FFD700' },
    features: { ears: 'pointed', whiskers: true, tail: 'cosmic', markings: 'stars' }
  }
}

const EXPRESSIONS = {
  happy: { eyeShape: 'dot', mouthCurve: 'smile' },
  normal: { eyeShape: 'dot', mouthCurve: 'neutral' },
  excited: { eyeShape: 'sparkle', mouthCurve: 'big-smile' },
  sleepy: { eyeShape: 'closed', mouthCurve: 'small' },
  love: { eyeShape: 'heart', mouthCurve: 'smile' }
}

const PetDisplay = ({ petType = 'cat', expression = 'happy', size = 'medium' }) => {
  const config = PET_CONFIG[petType] || PET_CONFIG.cat
  const colors = config.colors
  const features = config.features
  const expr = EXPRESSIONS[expression] || EXPRESSIONS.normal

  const sizeClass = { small: 'pet-small', medium: 'pet-medium', large: 'pet-large' }[size] || 'pet-medium'

  // Render ears based on pet type
  const renderEars = () => {
    if (features.ears === 'none') return null
    
    if (features.ears === 'long') {
      // Bunny - TALLER ears
      return (<>
        <ellipse cx="55" cy="20" rx="14" ry="68" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
        <ellipse cx="55" cy="20" rx="7" ry="55" fill={colors.inner} opacity="0.7" />
        <ellipse cx="145" cy="20" rx="14" ry="68" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
        <ellipse cx="145" cy="20" rx="7" ry="55" fill={colors.inner} opacity="0.7" />
      </>)
    } else if (features.ears === 'floppy') {
      return (<>
        <ellipse cx="38" cy="72" rx="22" ry="32" fill={colors.ear} stroke="#5C4033" strokeWidth="2" transform="rotate(-30 38 72)" />
        <ellipse cx="162" cy="72" rx="22" ry="32" fill={colors.ear} stroke="#5C4033" strokeWidth="2" transform="rotate(30 162 72)" />
      </>)
    } else if (features.ears === 'big') {
      // Elephant - BIGGER ears
      return (<>
        <ellipse cx="22" cy="105" rx="42" ry="58" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
        <ellipse cx="178" cy="105" rx="42" ry="58" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
      </>)
    } else if (features.ears === 'round') {
      return (<>
        <circle cx="42" cy="58" r="22" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
        <circle cx="158" cy="58" r="22" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
      </>)
    } else if (features.ears === 'tuft') {
      return (<>
        <path d="M48 58 L40 30 L62 55 Z" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
        <path d="M152 58 L160 30 L138 55 Z" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
      </>)
    } else if (features.ears === 'horn') {
      return (<>
        <path d="M42 58 L28 28 L58 55 Z" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
        <path d="M158 58 L172 28 L142 55 Z" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
      </>)
    } else {
      return (<>
        <path d="M42 58 L48 30 L72 55 Z" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
        <path d="M158 58 L152 30 L128 55 Z" fill={colors.ear} stroke="#5C4033" strokeWidth="2" />
      </>)
    }
  }

  // Render tail
  const renderTail = () => {
    if (!features.tail || features.tail === 'none') return null
    
    if (features.tail === 'cat') return <path d="M140 165 Q170 160, 185 145 Q192 138, 185 132 Q178 128, 168 140 Q155 158, 140 165" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
    if (features.tail === 'fluffy') return <circle cx="148" cy="170" r="18" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
    if (features.tail === 'fox') return (<><path d="M140 165 Q175 160, 192 145 Q200 138, 192 132 Q185 128, 172 140 Q155 158, 140 165" fill={colors.body} stroke="#5C4033" strokeWidth="2" /><circle cx="190" cy="140" r="8" fill={colors.tailTip || 'white'} /></>)
    if (features.tail === 'ringed') return (<><path d="M140 168 Q170 165, 185 152 Q192 146, 185 142 Q178 138, 168 148 Q155 162, 140 168" fill={colors.body} stroke="#5C4033" strokeWidth="2" /><path d="M155 162 Q172 160, 180 152" stroke={colors.tail} strokeWidth="4" fill="none" opacity="0.5" /></>)
    if (features.tail === 'thin') return <path d="M140 172 Q160 168, 170 162" stroke={colors.body} strokeWidth="4" fill="none" strokeLinecap="round" />
    if (features.tail === 'bird') return <path d="M140 168 L158 162 L158 174 Z" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
    if (features.tail === 'small') return <circle cx="145" cy="175" r="10" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
    if (features.tail === 'dragon') return (<><path d="M140 165 Q175 160, 195 148 Q205 142, 198 138 Q190 134, 180 145 Q165 158, 140 165" fill={colors.body} stroke="#5C4033" strokeWidth="2" /><path d="M155 160 L160 155 M165 155 L170 150 M175 150 L180 148" stroke={colors.body} strokeWidth="3" /></>)
    if (features.tail === 'phoenix') return (<><path d="M140 165 Q175 160, 198 145 Q208 138, 202 135 Q195 132, 185 145 Q168 158, 140 165" fill={colors.body} stroke="#5C4033" strokeWidth="2" /><path d="M160 158 Q180 150, 195 142" stroke={colors.crest} strokeWidth="3" fill="none" opacity="0.6" /></>)
    if (features.tail === 'unicorn') return <path d="M140 165 Q172 160, 188 148 Q195 142, 188 138 Q182 135, 172 148 Q158 160, 140 165" fill={colors.mane} opacity="0.7" stroke="#5C4033" strokeWidth="2" />
    if (features.tail === 'lion') return (<><path d="M140 168 Q168 165, 182 155 Q188 150, 182 148 Q175 146, 168 158 Q155 168, 140 168" fill={colors.wing} stroke="#5C4033" strokeWidth="2" /><circle cx="185" cy="152" r="10" fill={colors.wing} stroke="#5C4033" strokeWidth="2" /></>)
    if (features.tail === 'cosmic') return (<><path d="M140 165 Q172 160, 188 148 Q195 142, 188 138 Q182 135, 172 148 Q158 160, 140 165" fill={colors.body} stroke="#5C4033" strokeWidth="2" /><circle cx="165" cy="155" r="3" fill={colors.stars} /><circle cx="178" cy="148" r="2" fill={colors.stars} /><circle cx="185" cy="142" r="2.5" fill={colors.stars} /></>)
    return null
  }

  // Render whiskers
  const renderWhiskers = () => {
    if (!features.whiskers) return null
    return (
      <g className="whiskers">
        <line x1="52" y1="105" x2="22" y2="100" stroke="#333" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <line x1="52" y1="110" x2="22" y2="110" stroke="#333" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <line x1="52" y1="115" x2="22" y2="120" stroke="#333" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <line x1="148" y1="105" x2="178" y2="100" stroke="#333" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <line x1="148" y1="110" x2="178" y2="110" stroke="#333" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
        <line x1="148" y1="115" x2="178" y2="120" stroke="#333" strokeWidth="1.5" opacity="0.5" strokeLinecap="round" />
      </g>
    )
  }

  // Render special markings
  const renderMarkings = () => {
    if (features.markings === 'tabby') {
      return (
        <g>
          <path d="M78 102 Q88 90, 96 100 Q100 88, 104 100 Q112 90, 122 102" stroke={colors.stripes} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M90 106 L95 114" stroke={colors.stripes} strokeWidth="4" strokeLinecap="round" />
          <path d="M100 108 L100 116" stroke={colors.stripes} strokeWidth="4" strokeLinecap="round" />
          <path d="M110 106 L105 114" stroke={colors.stripes} strokeWidth="4" strokeLinecap="round" />
          <path d="M60 162 Q75 158, 88 165" stroke={colors.stripes} strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M140 162 Q125 158, 112 165" stroke={colors.stripes} strokeWidth="3" fill="none" strokeLinecap="round" />
        </g>
      )
    } else if (features.markings === 'panda-patches') {
      return (
        <g>
          <ellipse cx="72" cy="95" rx="22" ry="20" fill={colors.patch} />
          <ellipse cx="128" cy="95" rx="22" ry="20" fill={colors.patch} />
          <circle cx="42" cy="58" r="22" fill={colors.patch} />
          <circle cx="158" cy="58" r="22" fill={colors.patch} />
        </g>
      )
    } else if (features.markings === 'mask') {
      return (
        <path d="M58 88 Q85 75, 100 88 Q115 75, 142 88 L148 108 Q115 95, 100 108 Q85 95, 52 108 Z" fill={colors.mask} />
      )
    } else if (features.markings === 'white-cheeks') {
      return (
        <g>
          <ellipse cx="70" cy="110" rx="15" ry="12" fill={colors.belly} opacity="0.6" />
          <ellipse cx="130" cy="110" rx="15" ry="12" fill={colors.belly} opacity="0.6" />
        </g>
      )
    } else if (features.markings === 'facial-disc') {
      return (
        <ellipse cx="100" cy="100" rx="52" ry="48" fill={colors.belly} opacity="0.3" stroke="#5C4033" strokeWidth="1.5" />
      )
    } else if (features.markings === 'penguin') {
      // Penguin - BLACK HEAD with 2 WHITE eye patches
      return (
        <g>
          {/* Black head marking that goes up */}
          <path d="M55 85 Q100 55, 145 85 L145 120 Q100 100, 55 120 Z" fill={colors.body} />
          {/* 2 WHITE eye patches */}
          <ellipse cx="75" cy="95" rx="10" ry="8" fill="white" />
          <ellipse cx="125" cy="95" rx="10" ry="8" fill="white" />
          {/* White belly - LEBIH NAIK! */}
          <ellipse cx="100" cy="130" rx="48" ry="58" fill={colors.belly} />
        </g>
      )
    } else if (features.markings === 'fire') {
      return (
        <g>
          <path d="M85 45 Q80 30, 88 22 Q95 30, 100 45 Q105 30, 112 22 Q120 30, 115 45" fill={colors.crest} stroke="#5C4033" strokeWidth="2" />
        </g>
      )
    } else if (features.markings === 'magical') {
      return (
        <g>
          <path d="M100 48 L90 20 L94 14 L100 10 L106 14 L110 20 L100 48" fill={`url(#horn-gradient)`} stroke="#E8C860" strokeWidth="2.5" />
          <path d="M94 28 Q100 30, 106 28" stroke="#E8C860" strokeWidth="2" fill="none" />
          <path d="M93 36 Q100 38, 107 36" stroke="#E8C860" strokeWidth="2" fill="none" />
          <path d="M50 105 Q38 125, 45 150 Q52 170, 58 150 Q65 125, 52 105" fill={colors.mane} opacity="0.7" />
        </g>
      )
    } else if (features.markings === 'scales') {
      return (
        <g>
          <path d="M75 145 Q85 140, 95 145" stroke={colors.horn} strokeWidth="2" fill="none" />
          <path d="M105 145 Q115 140, 125 145" stroke={colors.horn} strokeWidth="2" fill="none" />
          <path d="M75 155 Q85 150, 95 155" stroke={colors.horn} strokeWidth="2" fill="none" />
          <path d="M105 155 Q115 150, 125 155" stroke={colors.horn} strokeWidth="2" fill="none" />
        </g>
      )
    } else if (features.markings === 'eagle') {
      return (
        <ellipse cx="100" cy="95" rx="48" ry="45" fill={colors.belly} opacity="0.4" />
      )
    } else if (features.markings === 'stars') {
      return (
        <g>
          <circle cx="65" cy="75" r="2" fill={colors.stars} />
          <circle cx="135" cy="75" r="2" fill={colors.stars} />
          <circle cx="55" cy="95" r="1.5" fill={colors.stars} />
          <circle cx="145" cy="95" r="1.5" fill={colors.stars} />
          <circle cx="70" cy="120" r="2" fill={colors.stars} />
          <circle cx="130" cy="120" r="2" fill={colors.stars} />
        </g>
      )
    }
    return null
  }

  // Render wings - CONNECTED to body
  const renderWings = () => {
    if (petType === 'bird') {
      return (
        <g>
          <path d="M55 150 Q35 140, 30 155 Q35 170, 55 160" fill={colors.wing} stroke="#5C4033" strokeWidth="2" />
          <path d="M145 150 Q165 140, 170 155 Q165 170, 145 160" fill={colors.wing} stroke="#5C4033" strokeWidth="2" />
        </g>
      )
    } else if (petType === 'dragon') {
      return (
        <g>
          <path d="M55 145 Q20 125, 12 155 Q20 185, 55 165" fill={colors.wing} opacity="0.85" stroke="#5C4033" strokeWidth="2" />
          <path d="M145 145 Q180 125, 188 155 Q180 185, 145 165" fill={colors.wing} opacity="0.85" stroke="#5C4033" strokeWidth="2" />
        </g>
      )
    } else if (petType === 'phoenix') {
      return (
        <g>
          <path d="M55 145 Q18 120, 10 152 Q18 188, 55 168" fill={colors.wing} opacity="0.8" stroke="#5C4033" strokeWidth="2" />
          <path d="M145 145 Q182 120, 190 152 Q182 188, 145 168" fill={colors.wing} opacity="0.8" stroke="#5C4033" strokeWidth="2" />
          <path d="M28 135 Q22 120, 28 110" stroke={colors.crest} strokeWidth="2.5" fill="none" />
          <path d="M172 135 Q178 120, 172 110" stroke={colors.crest} strokeWidth="2.5" fill="none" />
        </g>
      )
    } else if (petType === 'griffin') {
      return (
        <g>
          <path d="M55 145 Q22 122, 14 155 Q22 188, 55 168" fill={colors.wing} stroke="#5C4033" strokeWidth="2" />
          <path d="M145 145 Q178 122, 186 155 Q178 188, 145 168" fill={colors.wing} stroke="#5C4033" strokeWidth="2" />
        </g>
      )
    } else if (petType === 'owl') {
      return (
        <g>
          <path d="M52 155 Q35 145, 32 158 Q35 172, 52 165" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
          <path d="M148 155 Q165 145, 168 158 Q165 172, 148 165" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
        </g>
      )
    }
    return null
  }

  // Render beak - SMOOTH CURVED
  const renderBeak = () => {
    if (petType === 'bird') return <path d="M95 115 Q100 120, 105 115" fill={colors.beak} stroke="#CC8400" strokeWidth="1.5" strokeLinecap="round" />
    if (petType === 'penguin') return <path d="M95 115 Q100 120, 105 115" fill={colors.beak} stroke="#CC8400" strokeWidth="1.5" strokeLinecap="round" />
    if (petType === 'phoenix') return <path d="M95 115 Q100 120, 105 115 L100 125 Q98 120, 95 115" fill={colors.beak} stroke="#CC8400" strokeWidth="1.5" />
    if (petType === 'griffin') return <path d="M92 112 Q100 122, 108 112 L100 118 Z" fill={colors.beak} stroke="#5C4033" strokeWidth="2" />
    if (petType === 'owl') return <path d="M96 115 Q100 120, 104 115 L100 122 Z" fill={colors.beak} stroke="#CC8400" strokeWidth="1.5" />
    return null
  }

  // Render trunk for elephant - LEBIH NAIK!
  const renderTrunk = () => {
    if (petType !== 'elephant') return null
    return (
      <path d="M100 108 Q100 130, 95 148 Q90 162, 85 170 Q80 178, 78 185 Q76 192, 82 196 Q88 198, 92 190 Q98 180, 102 165 Q105 148, 105 132 Q105 118, 100 108" 
        fill={colors.trunk} stroke="#5C4033" strokeWidth="2.5" />
    )
  }

  // Render halo for celestial
  const renderHalo = () => {
    if (petType !== 'celestial') return null
    return (
      <ellipse cx="100" cy="32" rx="32" ry="12" fill="none" stroke={colors.halo} strokeWidth="4" opacity="0.8" />
    )
  }

  // Render eyes - PANDA & RACCOON: Dark gray patches with black eyes + white highlight
  const renderEyes = () => {
    const isPandaOrRaccoon = (petType === 'panda' || petType === 'raccoon')
    
    if (expr.eyeShape === 'dot') {
      if (isPandaOrRaccoon) {
        return (<>
          <circle cx="75" cy="95" r="4" fill="#0a0a0a" />
          <circle cx="125" cy="95" r="4" fill="#0a0a0a" />
          <circle cx="77" cy="93" r="1.5" fill="white" opacity="0.9" />
          <circle cx="127" cy="93" r="1.5" fill="white" opacity="0.9" />
        </>)
      } else {
        return (<>
          <circle cx="75" cy="95" r="4" fill="#1a1a1a" />
          <circle cx="125" cy="95" r="4" fill="#1a1a1a" />
        </>)
      }
    } else if (expr.eyeShape === 'sparkle') {
      return (<>
        <circle cx="75" cy="95" r="5" fill={isPandaOrRaccoon ? '#0a0a0a' : '#1a1a1a'} />
        <circle cx="125" cy="95" r="5" fill={isPandaOrRaccoon ? '#0a0a0a' : '#1a1a1a'} />
        <circle cx="77" cy="93" r="2" fill="white" />
        <circle cx="127" cy="93" r="2" fill="white" />
      </>)
    } else if (expr.eyeShape === 'closed') {
      return (<>
        <path d="M68 95 Q75 98, 82 95" stroke={isPandaOrRaccoon ? '#0a0a0a' : '#1a1a1a'} strokeWidth="2" fill="none" />
        <path d="M118 95 Q125 98, 132 95" stroke={isPandaOrRaccoon ? '#0a0a0a' : '#1a1a1a'} strokeWidth="2" fill="none" />
      </>)
    } else if (expr.eyeShape === 'heart') {
      return (<>
        <path d="M75 92 C72 88, 68 92, 75 98 C82 92, 78 88, 75 92" fill="#FF69B4" />
        <path d="M125 92 C122 88, 118 92, 125 98 C132 92, 128 88, 125 92" fill="#FF69B4" />
      </>)
    }
    return null
  }

  // Render nose/beak/trunk
  const renderNose = () => {
    if (petType === 'bird' || petType === 'penguin' || petType === 'phoenix' || petType === 'griffin' || petType === 'owl') {
      return renderBeak()
    } else if (petType === 'elephant') {
      return renderTrunk()
    } else if (petType === 'cat' || petType === 'bunny' || petType === 'fox') {
      return <path d="M94 115 L106 115 L100 122 Z" fill={colors.nose} stroke="#CC5566" strokeWidth="1.5" />
    } else {
      return <ellipse cx="100" cy="115" rx="7" ry="5" fill={colors.nose} stroke="#CC5566" strokeWidth="1.5" />
    }
  }

  // Render mouth
  const renderMouth = () => {
    if (petType === 'elephant') {
      if (expr.mouthCurve === 'smile') return <path d="M90 125 Q100 135, 110 125" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
      if (expr.mouthCurve === 'big-smile') return <path d="M85 125 Q100 140, 115 125" stroke="#333" strokeWidth="2" fill="#FF69B4" strokeLinecap="round" />
      if (expr.mouthCurve === 'neutral') return <line x1="95" y1="130" x2="105" y2="130" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      if (expr.mouthCurve === 'small') return <circle cx="100" cy="130" r="3" fill="#333" />
    }
    if (petType === 'bird' || petType === 'penguin' || petType === 'phoenix' || petType === 'griffin' || petType === 'owl') return null
    if (expr.mouthCurve === 'smile') return <path d="M90 125 Q100 135, 110 125" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />
    if (expr.mouthCurve === 'big-smile') return <path d="M85 125 Q100 140, 115 125" stroke="#333" strokeWidth="2" fill="#FF69B4" strokeLinecap="round" />
    if (expr.mouthCurve === 'neutral') return <line x1="95" y1="130" x2="105" y2="130" stroke="#333" strokeWidth="2" strokeLinecap="round" />
    if (expr.mouthCurve === 'small') return <circle cx="100" cy="130" r="3" fill="#333" />
    return null
  }

  // Render feet for penguin
  const renderFeet = () => {
    if (petType !== 'penguin') return null
    return (
      <g>
        <ellipse cx="68" cy="198" rx="20" ry="10" fill={colors.feet} stroke="#5C4033" strokeWidth="2" />
        <ellipse cx="132" cy="198" rx="20" ry="10" fill={colors.feet} stroke="#5C4033" strokeWidth="2" />
      </g>
    )
  }

  return (
    <div className={`pet-display ${sizeClass}`}>
      <div className="pet-background" style={{ background: `linear-gradient(180deg, var(--bg-primary), var(--bg-secondary))` }} />

      <div className="pet-body">
        {renderTail()}
        
        <svg className="pet-svg" viewBox="0 0 200 200">
          <defs>
            <linearGradient id="horn-gradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFF8DC" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
          
          {/* Ears - BEHIND head */}
          {renderEars()}
          
          {/* Halo for celestial */}
          {renderHalo()}
          
          {/* Head - MAIN SHAPE */}
          <ellipse cx="100" cy="90" rx="70" ry="60" fill={colors.body} stroke="#5C4033" strokeWidth="3" />
          
          {/* Special markings (patches, mask, etc) */}
          {renderMarkings()}
          
          {/* Wings - CONNECTED to body */}
          {renderWings()}
          
          {/* Belly - CONNECTED to body (no gap!) */}
          <ellipse cx="100" cy="165" rx="38" ry="32" fill={colors.belly} stroke="#5C4033" strokeWidth="2" />
          
          {/* Arms - CONNECTED to body */}
          {petType !== 'bird' && petType !== 'phoenix' && petType !== 'griffin' && petType !== 'owl' && (
            <>
              <ellipse cx="55" cy="155" rx="18" ry="22" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
              <ellipse cx="145" cy="155" rx="18" ry="22" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
            </>
          )}
          
          {/* Legs - CONNECTED to body */}
          {petType !== 'penguin' && (
            <>
              <ellipse cx="75" cy="195" rx="22" ry="14" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
              <ellipse cx="125" cy="195" rx="22" ry="14" fill={colors.body} stroke="#5C4033" strokeWidth="2" />
              {/* Paw pads */}
              <ellipse cx="75" cy="198" rx="14" ry="8" fill={colors.belly} opacity="0.6" />
              <ellipse cx="125" cy="198" rx="14" ry="8" fill={colors.belly} opacity="0.6" />
            </>
          )}
          
          {/* Feet for penguin */}
          {renderFeet()}
          
          {/* Blush */}
          {petType !== 'panda' && petType !== 'raccoon' && petType !== 'elephant' && petType !== 'dragon' && (
            <>
              <ellipse cx="65" cy="110" rx="12" ry="8" fill="#FFB6C1" opacity="0.35" />
              <ellipse cx="135" cy="110" rx="12" ry="8" fill="#FFB6C1" opacity="0.35" />
            </>
          )}
          
          {/* Whiskers */}
          {renderWhiskers()}
          
          {/* Eyes */}
          {renderEyes()}
          
          {/* Nose/Beak/Trunk */}
          {renderNose()}
          
          {/* Mouth */}
          {renderMouth()}
        </svg>
      </div>
    </div>
  )
}

export default PetDisplay
