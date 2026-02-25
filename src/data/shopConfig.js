// Shop Categories
export const SHOP_CATEGORIES = {
  ALL: 'all',
  PET_FOOD: 'pet-food',
  PET_ACCESSORIES: 'pet-accessories',
  POWERUPS: 'powerups',
  GACHA: 'gacha',
  THEMES: 'themes'
}

// Shop Items Configuration
export const SHOP_ITEMS = {
  // Pet Food
  'pet-food-basic': {
    id: 'pet-food-basic',
    name: 'Basic Food',
    description: 'Regular pet food. Restores 20 hunger.',
    price: 50,
    category: SHOP_CATEGORIES.PET_FOOD,
    type: 'consumable',
    effect: { hunger: 20 },
    icon: '🍖',
    color: '#8B4513'
  },
  'pet-food-premium': {
    id: 'pet-food-premium',
    name: 'Premium Food',
    description: 'High-quality food. Restores 50 hunger.',
    price: 100,
    category: SHOP_CATEGORIES.PET_FOOD,
    type: 'consumable',
    effect: { hunger: 50 },
    icon: '🥩',
    color: '#CD5C5C'
  },
  'pet-food-deluxe': {
    id: 'pet-food-deluxe',
    name: 'Deluxe Meal',
    description: 'Luxury meal. Restores 100 hunger.',
    price: 200,
    category: SHOP_CATEGORIES.PET_FOOD,
    type: 'consumable',
    effect: { hunger: 100, happiness: 10 },
    icon: '🍱',
    color: '#FFD700'
  },
  'pet-treat': {
    id: 'pet-treat',
    name: 'Happy Treat',
    description: 'Delicious treat. +15 happiness.',
    price: 75,
    category: SHOP_CATEGORIES.PET_FOOD,
    type: 'consumable',
    effect: { happiness: 15, energy: 5 },
    icon: '🍪',
    color: '#FFA07A'
  },
  'pet-snack': {
    id: 'pet-snack',
    name: 'Energy Snack',
    description: 'Boosts energy. +25 energy.',
    price: 80,
    category: SHOP_CATEGORIES.PET_FOOD,
    type: 'consumable',
    effect: { energy: 25 },
    icon: '🍎',
    color: '#90EE90'
  },

  // Pet Accessories
  'hat-basic': {
    id: 'hat-basic',
    name: 'Basic Hat',
    description: 'A simple hat for your pet.',
    price: 300,
    category: SHOP_CATEGORIES.PET_ACCESSORIES,
    type: 'permanent',
    equipType: 'hat',
    icon: '🎩',
    color: '#4A4A4A'
  },
  'hat-sakura': {
    id: 'hat-sakura',
    name: 'Sakura Crown',
    description: 'Beautiful cherry blossom crown.',
    price: 500,
    category: SHOP_CATEGORIES.PET_ACCESSORIES,
    type: 'permanent',
    equipType: 'hat',
    icon: '🌸',
    color: '#FFB7C5'
  },
  'bow-tie': {
    id: 'bow-tie',
    name: 'Elegant Bow Tie',
    description: 'Fancy bow tie for special occasions.',
    price: 400,
    category: SHOP_CATEGORIES.PET_ACCESSORIES,
    type: 'permanent',
    equipType: 'accessory',
    icon: '🎀',
    color: '#DC143C'
  },
  'collar-star': {
    id: 'collar-star',
    name: 'Star Collar',
    description: 'Cool collar with star design.',
    price: 350,
    category: SHOP_CATEGORIES.PET_ACCESSORIES,
    type: 'permanent',
    equipType: 'collar',
    icon: '⭐',
    color: '#FFD700'
  },
  'glasses-cool': {
    id: 'glasses-cool',
    name: 'Cool Glasses',
    description: 'Stylish glasses for your pet.',
    price: 450,
    category: SHOP_CATEGORIES.PET_ACCESSORIES,
    type: 'permanent',
    equipType: 'glasses',
    icon: '👓',
    color: '#4169E1'
  },

  // Power-ups
  'double-xp-30m': {
    id: 'double-xp-30m',
    name: 'Double XP',
    description: '2x XP for 30 minutes.',
    price: 200,
    category: SHOP_CATEGORIES.POWERUPS,
    type: 'consumable',
    effect: { xpMultiplier: 2 },
    duration: 30 * 60 * 1000, // 30 minutes
    icon: '⚡',
    color: '#FFD700'
  },
  'double-coins-30m': {
    id: 'double-coins-30m',
    name: 'Double Coins',
    description: '2x coins for 30 minutes.',
    price: 250,
    category: SHOP_CATEGORIES.POWERUPS,
    type: 'consumable',
    effect: { coinMultiplier: 2 },
    duration: 30 * 60 * 1000,
    icon: '🪙',
    color: '#FFA500'
  },
  'streak-freeze': {
    id: 'streak-freeze',
    name: 'Streak Freeze',
    description: 'Protects your streak for 1 day.',
    price: 500,
    category: SHOP_CATEGORIES.POWERUPS,
    type: 'consumable',
    effect: { protectStreak: true },
    duration: 24 * 60 * 60 * 1000, // 24 hours
    icon: '🛡️',
    color: '#4169E1'
  },
  'focus-boost': {
    id: 'focus-boost',
    name: 'Focus Boost',
    description: '+50% Pomodoro coins for 1 hour.',
    price: 150,
    category: SHOP_CATEGORIES.POWERUPS,
    type: 'consumable',
    effect: { pomodoroBonus: 0.5 },
    duration: 60 * 60 * 1000,
    icon: '🎯',
    color: '#32CD32'
  },

  // Gacha
  'gacha-single': {
    id: 'gacha-single',
    name: 'Single Pull',
    description: 'Try your luck! Random item.',
    price: 100,
    category: SHOP_CATEGORIES.GACHA,
    type: 'gacha',
    gachaType: 'single',
    icon: '🎰',
    color: '#9370DB'
  },
  'gacha-10x': {
    id: 'gacha-10x',
    name: '10x Pull',
    description: '10 items at once! 10% discount.',
    price: 900,
    category: SHOP_CATEGORIES.GACHA,
    type: 'gacha',
    gachaType: 'multi',
    icon: '🎁',
    color: '#BA55D3'
  },

  // Themes
  'theme-sakura': {
    id: 'theme-sakura',
    name: 'Sakura Theme',
    description: 'Beautiful cherry blossom theme.',
    price: 2000,
    category: SHOP_CATEGORIES.THEMES,
    type: 'permanent',
    themeKey: 'sakura',
    icon: '🌸',
    color: '#FFB7C5'
  },
  'theme-ocean': {
    id: 'theme-ocean',
    name: 'Ocean Theme',
    description: 'Calming ocean waves theme.',
    price: 2000,
    category: SHOP_CATEGORIES.THEMES,
    type: 'permanent',
    themeKey: 'ocean',
    icon: '🌊',
    color: '#4DD0E1'
  },
  'theme-aurora': {
    id: 'theme-aurora',
    name: 'Aurora Theme',
    description: 'Northern lights inspired theme.',
    price: 2000,
    category: SHOP_CATEGORIES.THEMES,
    type: 'permanent',
    themeKey: 'aurora',
    icon: '🌌',
    color: '#81C784'
  },
  'theme-sunset': {
    id: 'theme-sunset',
    name: 'Sunset Theme',
    description: 'Warm sunset colors.',
    price: 2000,
    category: SHOP_CATEGORIES.THEMES,
    type: 'permanent',
    themeKey: 'sunset',
    icon: '🌅',
    color: '#FFB74D'
  }
}

// Gacha Pool (rewards)
export const GACHA_REWARDS = {
  common: [
    { id: 'sticker-star', name: 'Star Sticker', icon: '⭐', rarity: 'common', weight: 30 },
    { id: 'sticker-heart', name: 'Heart Sticker', icon: '💖', rarity: 'common', weight: 30 },
    { id: 'sticker-flower', name: 'Flower Sticker', icon: '🌸', rarity: 'common', weight: 30 },
    { id: 'coin-bonus-small', name: '50 Coins', icon: '🪙', rarity: 'common', weight: 25, effect: { coins: 50 } }
  ],
  rare: [
    { id: 'sticker-rare-dragon', name: 'Dragon Sticker', icon: '🐉', rarity: 'rare', weight: 15 },
    { id: 'sticker-rare-unicorn', name: 'Unicorn Sticker', icon: '🦄', rarity: 'rare', weight: 15 },
    { id: 'badge-collector', name: 'Collector Badge', icon: '🏆', rarity: 'rare', weight: 10 },
    { id: 'coin-bonus-medium', name: '200 Coins', icon: '💰', rarity: 'rare', weight: 12, effect: { coins: 200 } }
  ],
  legendary: [
    { id: 'sticker-legend-phoenix', name: 'Phoenix Sticker', icon: '🔥', rarity: 'legendary', weight: 5 },
    { id: 'sticker-legend-galaxy', name: 'Galaxy Sticker', icon: '🌌', rarity: 'legendary', weight: 5 },
    { id: 'badge-master', name: 'Master Badge', icon: '👑', rarity: 'legendary', weight: 3 },
    { id: 'coin-bonus-large', name: '1000 Coins', icon: '💎', rarity: 'legendary', weight: 5, effect: { coins: 1000 } }
  ]
}

// Helper function to get items by category
export const getItemsByCategory = (category) => {
  return Object.values(SHOP_ITEMS).filter(item => item.category === category)
}

// Helper function to get all items
export const getAllItems = () => {
  return Object.values(SHOP_ITEMS)
}

// Helper function to get item by ID
export const getItemById = (id) => {
  return SHOP_ITEMS[id]
}

// Gacha pull logic
export const pullGacha = (type = 'single') => {
  const results = []
  const pulls = type === 'multi' ? 10 : 1
  
  for (let i = 0; i < pulls; i++) {
    const rand = Math.random() * 100
    let pool
    
    if (rand < 5) {
      // 5% legendary
      pool = GACHA_REWARDS.legendary
    } else if (rand < 20) {
      // 15% rare
      pool = GACHA_REWARDS.rare
    } else {
      // 80% common
      pool = GACHA_REWARDS.common
    }
    
    // Weighted random selection
    const totalWeight = pool.reduce((sum, item) => sum + item.weight, 0)
    let random = Math.random() * totalWeight
    
    for (const item of pool) {
      random -= item.weight
      if (random <= 0) {
        results.push({ ...item, id: `${item.id}-${Date.now()}-${Math.random()}` })
        break
      }
    }
  }
  
  return results
}
