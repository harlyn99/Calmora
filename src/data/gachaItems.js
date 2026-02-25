// Gacha Items Database - Pets & Themes
// Rarity: common, rare, sr, ssr
// Types: pet, theme

export const GachaItems = [
  // ========== PETS (17 pets total) ==========
  // Common Pets (50% of pet pool)
  { id: 'pet_001', name: 'Cat', type: 'pet', petType: 'cat', rarity: 'common', color: '#E8D5C4', emoji: '🐱' },
  { id: 'pet_002', name: 'Dog', type: 'pet', petType: 'dog', rarity: 'common', color: '#F5DEB3', emoji: '🐶' },
  { id: 'pet_003', name: 'Bunny', type: 'pet', petType: 'bunny', rarity: 'common', color: '#FFE4E1', emoji: '🐰' },
  { id: 'pet_004', name: 'Hamster', type: 'pet', petType: 'hamster', rarity: 'common', color: '#FFE5B4', emoji: '🐹' },
  { id: 'pet_005', name: 'Bird', type: 'pet', petType: 'bird', rarity: 'common', color: '#87CEEB', emoji: '🐦' },
  
  // Rare Pets (30% of pet pool)
  { id: 'pet_006', name: 'Bear', type: 'pet', petType: 'bear', rarity: 'rare', color: '#D4C4B0', emoji: '🐻' },
  { id: 'pet_007', name: 'Fox', type: 'pet', petType: 'fox', rarity: 'rare', color: '#FF8C42', emoji: '🦊' },
  { id: 'pet_008', name: 'Panda', type: 'pet', petType: 'panda', rarity: 'rare', color: '#FFFFFF', emoji: '🐼' },
  { id: 'pet_009', name: 'Raccoon', type: 'pet', petType: 'raccoon', rarity: 'rare', color: '#A0A0A0', emoji: '🦝' },
  
  // SR Pets (15% of pet pool)
  { id: 'pet_010', name: 'Elephant', type: 'pet', petType: 'elephant', rarity: 'sr', color: '#E8E8E8', emoji: '🐘' },
  { id: 'pet_011', name: 'Penguin', type: 'pet', petType: 'penguin', rarity: 'sr', color: '#2A2A3A', emoji: '🐧' },
  { id: 'pet_012', name: 'Owl', type: 'pet', petType: 'owl', rarity: 'sr', color: '#8B7355', emoji: '🦉' },
  { id: 'pet_013', name: 'Unicorn', type: 'pet', petType: 'unicorn', rarity: 'sr', color: '#FFFFFF', emoji: '🦄' },
  
  // SSR Pets (5% of pet pool)
  { id: 'pet_014', name: 'Dragon', type: 'pet', petType: 'dragon', rarity: 'ssr', color: '#4169E1', emoji: '🐉' },
  { id: 'pet_015', name: 'Phoenix', type: 'pet', petType: 'phoenix', rarity: 'ssr', color: '#FF4500', emoji: '🔥' },
  { id: 'pet_016', name: 'Griffin', type: 'pet', petType: 'griffin', rarity: 'ssr', color: '#DAA520', emoji: '🦅' },
  { id: 'pet_017', name: 'Celestial Cat', type: 'pet', petType: 'celestial', rarity: 'ssr', color: '#1a1a2e', emoji: '✨' },
  
  // ========== THEMES (10 themes) ==========
  // Common Themes
  { id: 'theme_001', name: 'Sakura', type: 'theme', themeId: 'sakura', rarity: 'common', color: '#FFB7C5', emoji: '🌸' },
  { id: 'theme_002', name: 'Ocean', type: 'theme', themeId: 'ocean', rarity: 'common', color: '#4DD0E1', emoji: '🌊' },
  { id: 'theme_003', name: 'Forest', type: 'theme', themeId: 'forest', rarity: 'common', color: '#7CB342', emoji: '🌲' },
  
  // Rare Themes
  { id: 'theme_004', name: 'Sunset', type: 'theme', themeId: 'sunset', rarity: 'rare', color: '#FF8A65', emoji: '🌅' },
  { id: 'theme_005', name: 'Lavender', type: 'theme', themeId: 'lavender', rarity: 'rare', color: '#BA68C8', emoji: '💜' },
  { id: 'theme_006', name: 'Citrus', type: 'theme', themeId: 'citrus', rarity: 'rare', color: '#FFD54F', emoji: '🍊' },
  
  // SR Themes
  { id: 'theme_007', name: 'Moonlight', type: 'theme', themeId: 'moonlight', rarity: 'sr', color: '#7986CB', emoji: '🌙' },
  { id: 'theme_008', name: 'Cosmic', type: 'theme', themeId: 'cosmic', rarity: 'sr', color: '#6B4C9A', emoji: '🌌' },
  
  // SSR Themes
  { id: 'theme_009', name: 'Golden', type: 'theme', themeId: 'golden', rarity: 'ssr', color: '#FFD700', emoji: '✨' },
  { id: 'theme_010', name: 'Rainbow', type: 'theme', themeId: 'rainbow', rarity: 'ssr', color: '#FF69B4', emoji: '🌈' }
]

// Gacha rates (pets + themes combined)
export const GachaRates = {
  common: 0.50,    // 50%
  rare: 0.30,      // 30%
  sr: 0.15,        // 15%
  ssr: 0.05        // 5%
}

// Pity system - guaranteed SSR after 90 pulls
export const PITY_COUNT = 90

// Get items by rarity
export const getItemsByRarity = (rarity) => {
  return GachaItems.filter(item => item.rarity === rarity)
}

// Get items by type
export const getItemsByType = (type) => {
  return GachaItems.filter(item => item.type === type)
}

// Get random item based on rates
export const getRandomItem = () => {
  const rand = Math.random()
  let rarity
  
  if (rand < GachaRates.ssr) {
    rarity = 'ssr'
  } else if (rand < GachaRates.ssr + GachaRates.sr) {
    rarity = 'sr'
  } else if (rand < GachaRates.ssr + GachaRates.sr + GachaRates.rare) {
    rarity = 'rare'
  } else {
    rarity = 'common'
  }
  
  const items = getItemsByRarity(rarity)
  const randomItem = items[Math.floor(Math.random() * items.length)]
  
  return {
    ...randomItem,
    pullId: Date.now() + Math.random(),
    obtainedAt: new Date().toISOString()
  }
}

// Rarity colors
export const RarityColors = {
  common: {
    bg: '#9ca3af',
    text: '#ffffff',
    glow: 'rgba(156, 163, 175, 0.5)',
    border: '#6b7280'
  },
  rare: {
    bg: '#3b82f6',
    text: '#ffffff',
    glow: 'rgba(59, 130, 246, 0.5)',
    border: '#2563eb'
  },
  sr: {
    bg: '#a855f7',
    text: '#ffffff',
    glow: 'rgba(168, 85, 247, 0.5)',
    border: '#7e22ce'
  },
  ssr: {
    bg: '#f59e0b',
    text: '#ffffff',
    glow: 'rgba(245, 158, 11, 0.6)',
    border: '#d97706'
  }
}

// Rarity labels
export const RarityLabels = {
  common: 'COMMON',
  rare: 'RARE',
  sr: 'SUPER RARE',
  ssr: 'LEGENDARY'
}

export default GachaItems
