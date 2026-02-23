import React, { createContext, useState, useContext, useEffect } from 'react'

const GachaContext = createContext()

// Gacha Items with rarity
const GACHA_ITEMS = {
  // Common (60%)
  common: [
    { id: 'c1', name: 'Wooden Sword', type: 'weapon', rarity: 'common', icon: '🗡️' },
    { id: 'c2', name: 'Leather Shield', type: 'armor', rarity: 'common', icon: '🛡️' },
    { id: 'c3', name: 'Cloth Hat', type: 'accessory', rarity: 'common', icon: '🧢' },
    { id: 'c4', name: 'Iron Ring', type: 'accessory', rarity: 'common', icon: '💍' },
    { id: 'c5', name: 'Health Potion', type: 'consumable', rarity: 'common', icon: '🧪' },
    { id: 'c6', name: 'Magic Scroll', type: 'consumable', rarity: 'common', icon: '📜' },
  ],
  // Rare (30%)
  rare: [
    { id: 'r1', name: 'Crystal Sword', type: 'weapon', rarity: 'rare', icon: '⚔️' },
    { id: 'r2', name: 'Silver Armor', type: 'armor', rarity: 'rare', icon: '🦾' },
    { id: 'r3', name: 'Crown', type: 'accessory', rarity: 'rare', icon: '👑' },
    { id: 'r4', name: 'Magic Wand', type: 'weapon', rarity: 'rare', icon: '🪄' },
    { id: 'r5', name: 'Phoenix Feather', type: 'consumable', rarity: 'rare', icon: '🪶' },
  ],
  // Epic (8%)
  epic: [
    { id: 'e1', name: 'Dragon Slayer', type: 'weapon', rarity: 'epic', icon: '🐉' },
    { id: 'e2', name: 'Holy Armor', type: 'armor', rarity: 'epic', icon: '✨' },
    { id: 'e3', name: 'Amulet of Power', type: 'accessory', rarity: 'epic', icon: '🔮' },
    { id: 'e4', name: 'Legendary Bow', type: 'weapon', rarity: 'epic', icon: '🏹' },
  ],
  // Legendary (2%)
  legendary: [
    { id: 'l1', name: 'Excalibur', type: 'weapon', rarity: 'legendary', icon: '⭐' },
    { id: 'l2', name: 'God Armor', type: 'armor', rarity: 'legendary', icon: '💫' },
    { id: 'l3', name: 'Infinity Gauntlet', type: 'accessory', rarity: 'legendary', icon: '🥊' },
    { id: 'l4', name: 'Philosopher Stone', type: 'consumable', rarity: 'legendary', icon: '💎' },
  ]
}

const RARITY_CONFIG = {
  common: { 
    chance: 0.6, 
    color: '#9e9e9e', 
    bgGradient: 'linear-gradient(135deg, #424242, #616161)',
    stars: 1 
  },
  rare: { 
    chance: 0.3, 
    color: '#4fc3f7', 
    bgGradient: 'linear-gradient(135deg, #0288d1, #29b6f6)',
    stars: 2 
  },
  epic: { 
    chance: 0.08, 
    color: '#ce93d8', 
    bgGradient: 'linear-gradient(135deg, #7b1fa2, #ab47bc)',
    stars: 3 
  },
  legendary: { 
    chance: 0.02, 
    color: '#ffd700', 
    bgGradient: 'linear-gradient(135deg, #ff6f00, #ffd700)',
    stars: 4 
  }
}

const GACHA_COST = 100 // coins per pull

export const GachaProvider = ({ children }) => {
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('calmoraCoins')
    return saved ? JSON.parse(saved) : 500 // Starting coins
  })

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('calmoraGachaInventory')
    return saved ? JSON.parse(saved) : []
  })

  const [pullHistory, setPullHistory] = useState(() => {
    const saved = localStorage.getItem('calmoraGachaHistory')
    return saved ? JSON.parse(saved) : []
  })

  const [isPulling, setIsPulling] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [lastPull, setLastPull] = useState(null)

  useEffect(() => {
    localStorage.setItem('calmoraCoins', JSON.stringify(coins))
  }, [coins])

  useEffect(() => {
    localStorage.setItem('calmoraGachaInventory', JSON.stringify(inventory))
  }, [inventory])

  useEffect(() => {
    localStorage.setItem('calmoraGachaHistory', JSON.stringify(pullHistory))
  }, [pullHistory])

  const getRandomRarity = () => {
    const rand = Math.random()
    if (rand < 0.02) return 'legendary'
    if (rand < 0.10) return 'epic'
    if (rand < 0.40) return 'rare'
    return 'common'
  }

  const getRandomItem = (rarity) => {
    const items = GACHA_ITEMS[rarity]
    return items[Math.floor(Math.random() * items.length)]
  }

  const pull = (times = 1) => {
    const cost = GACHA_COST * times
    if (coins < cost) {
      return { success: false, message: 'Not enough coins!' }
    }

    setIsPulling(true)
    setCoins(prev => prev - cost)

    // Simulate pull animation delay
    setTimeout(() => {
      const results = []
      for (let i = 0; i < times; i++) {
        const rarity = getRandomRarity()
        const item = getRandomItem(rarity)
        results.push({ ...item, pullId: Date.now() + i })
      }

      setInventory(prev => [...prev, ...results])
      setPullHistory(prev => [...results, ...prev].slice(0, 50))
      setLastPull(results)
      setIsPulling(false)
      setShowResult(true)

      return { success: true, results }
    }, 1500)

    return { success: true, pending: true }
  }

  const addCoins = (amount) => {
    setCoins(prev => prev + amount)
  }

  const getCollectionStats = () => {
    const allItems = Object.values(GACHA_ITEMS).flat()
    const uniqueOwned = new Set(inventory.map(i => i.id))
    const totalCollected = uniqueOwned.size
    const totalItems = allItems.length
    const legendaryCount = inventory.filter(i => i.rarity === 'legendary').length
    const epicCount = inventory.filter(i => i.rarity === 'epic').length

    return {
      totalCollected,
      totalItems,
      completionRate: ((totalCollected / totalItems) * 100).toFixed(1),
      legendaryCount,
      epicCount
    }
  }

  return (
    <GachaContext.Provider value={{
      coins,
      inventory,
      pullHistory,
      isPulling,
      showResult,
      lastPull,
      GACHA_COST,
      RARITY_CONFIG,
      GACHA_ITEMS,
      pull,
      addCoins,
      setShowResult,
      getCollectionStats
    }}>
      {children}
    </GachaContext.Provider>
  )
}

export const useGacha = () => {
  const context = useContext(GachaContext)
  if (!context) throw new Error('useGacha must be used within GachaProvider')
  return context
}

export default GachaContext
