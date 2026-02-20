import React, { useState, useEffect, useRef } from 'react'
import { Heart, Utensils, Moon, Sparkles, Home, ShoppingBag, X, Shirt, ArrowLeft, Droplets, Music } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '../contexts/ThemeContext'
import './CuteVirtualPet.css'

// ============================================
// PET TYPES - Visual appearance
// ============================================
const PET_TYPES = [
  { id: 'bunny', name: 'Bunny', color: '#FFE4E1', earColor: '#FFB6C1', blushColor: '#FFB6C1' },
  { id: 'cat', name: 'Cat', color: '#E8D5C4', earColor: '#D4A574', blushColor: '#FFB6C1' },
  { id: 'bear', name: 'Bear', color: '#D4C4B0', earColor: '#A08060', blushColor: '#FFB6C1' },
  { id: 'elephant', name: 'Elephant', color: '#E8E8E8', earColor: '#C0C0C0', blushColor: '#FFB6C1' },
  { id: 'dog', name: 'Dog', color: '#F5DEB3', earColor: '#DEB887', blushColor: '#FFB6C1' }
]

// ============================================
// EXPANDED FOOD SYSTEM - Each food has unique effects
// ============================================
const FOODS = [
  // Fruits - Balanced stats, small happiness boost
  { id: 'apple', name: 'Apple', cost: 10, icon: '🍎', happiness: 15, energy: 0, fill: 20, type: 'fruit', eatTime: 2000 },
  { id: 'strawberry', name: 'Strawberry', cost: 12, icon: '🍓', happiness: 20, energy: 0, fill: 15, type: 'fruit', eatTime: 1500 },
  { id: 'banana', name: 'Banana', cost: 11, icon: '🍌', happiness: 12, energy: 8, fill: 18, type: 'fruit', eatTime: 1800 },
  { id: 'carrot', name: 'Carrot', cost: 12, icon: '🥕', happiness: 12, energy: 0, fill: 18, type: 'vegetable', eatTime: 1800 },
  { id: 'peach', name: 'Peach', cost: 14, icon: '🍑', happiness: 18, energy: 5, fill: 16, type: 'fruit', eatTime: 1600 },
  { id: 'grape', name: 'Grapes', cost: 13, icon: '🍇', happiness: 16, energy: 3, fill: 14, type: 'fruit', eatTime: 1500 },
  
  // Treats - High happiness, low energy, small fill
  { id: 'cookie', name: 'Cookie', cost: 15, icon: '🍪', happiness: 20, energy: -5, fill: 15, type: 'treat', eatTime: 1500 },
  { id: 'cake', name: 'Cake', cost: 25, icon: '🍰', happiness: 30, energy: -10, fill: 20, type: 'treat', eatTime: 2000 },
  { id: 'icecream', name: 'Ice Cream', cost: 18, icon: '🍦', happiness: 25, energy: -8, fill: 12, type: 'treat', eatTime: 1500 },
  { id: 'donut', name: 'Donut', cost: 16, icon: '🍩', happiness: 22, energy: -6, fill: 16, type: 'treat', eatTime: 1600 },
  { id: 'candy', name: 'Candy', cost: 8, icon: '🍬', happiness: 15, energy: -3, fill: 8, type: 'treat', eatTime: 1000 },
  { id: 'chocolate', name: 'Chocolate', cost: 14, icon: '🍫', happiness: 20, energy: -4, fill: 12, type: 'treat', eatTime: 1400 },
  
  // Meals - High fill, balanced stats
  { id: 'fish', name: 'Fish', cost: 20, icon: '🐟', happiness: 25, energy: 10, fill: 25, type: 'meal', eatTime: 2500 },
  { id: 'sandwich', name: 'Sandwich', cost: 16, icon: '🥪', happiness: 18, energy: 5, fill: 22, type: 'meal', eatTime: 2000 },
  { id: 'rice', name: 'Rice Bowl', cost: 18, icon: '🍚', happiness: 15, energy: 8, fill: 28, type: 'meal', eatTime: 2200 },
  { id: 'noodles', name: 'Noodles', cost: 19, icon: '🍜', happiness: 17, energy: 10, fill: 26, type: 'meal', eatTime: 2400 },
  { id: 'soup', name: 'Soup', cost: 17, icon: '🍲', happiness: 16, energy: 12, fill: 20, type: 'meal', eatTime: 2000 },
  
  // Drinks - Energy boost, small fill
  { id: 'milk', name: 'Milk', cost: 18, icon: '🥛', happiness: 15, energy: 15, fill: 10, type: 'drink', eatTime: 1200 },
  { id: 'juice', name: 'Juice', cost: 14, icon: '🧃', happiness: 16, energy: 12, fill: 8, type: 'drink', eatTime: 1000 },
  { id: 'tea', name: 'Tea', cost: 12, icon: '🍵', happiness: 12, energy: 8, fill: 6, type: 'drink', eatTime: 1000 },
  { id: 'coffee', name: 'Coffee', cost: 15, icon: '☕', happiness: 10, energy: 20, fill: 5, type: 'drink', eatTime: 800 }
]

// ============================================
// CLOTHES SYSTEM - Overlay with stat bonuses
// ============================================
const CLOTHING_CATALOG = [
  // Pajamas - Energy recovery bonus
  { id: 'pajamas_blue', name: 'Blue Pajamas', cost: 100, icon: '👔', color: '#60A5FA', type: 'body', bonus: { energyRecovery: 50 } },
  { id: 'pajamas_pink', name: 'Pink Pajamas', cost: 100, icon: '👔', color: '#F472B6', type: 'body', bonus: { energyRecovery: 50 } },
  { id: 'pajamas_white', name: 'White Pajamas', cost: 130, icon: '👔', color: '#E5E7EB', type: 'body', bonus: { energyRecovery: 70 } },
  { id: 'pajamas_green', name: 'Green Pajamas', cost: 120, icon: '👔', color: '#86EFAC', type: 'body', bonus: { energyRecovery: 60 } },
  
  // Sweaters - Happiness gain bonus
  { id: 'sweater_red', name: 'Red Sweater', cost: 120, icon: '🧥', color: '#DC2626', type: 'body', bonus: { happinessGain: 20 } },
  { id: 'sweater_beige', name: 'Beige Sweater', cost: 120, icon: '🧥', color: '#D4C4B0', type: 'body', bonus: { happinessGain: 20 } },
  { id: 'sweater_blue', name: 'Blue Sweater', cost: 120, icon: '🧥', color: '#3B82F6', type: 'body', bonus: { happinessGain: 20 } },
  { id: 'sweater_pink', name: 'Pink Sweater', cost: 130, icon: '🧥', color: '#EC4899', type: 'body', bonus: { happinessGain: 25 } },
  
  // Wings - Happiness boost
  { id: 'wings_white', name: 'Angel Wings', cost: 200, icon: '🪽', color: '#FFFFFF', type: 'back', bonus: { happiness: 25, xp: 15 } },
  { id: 'wings_black', name: 'Dark Wings', cost: 200, icon: '🦇', color: '#1F2937', type: 'back', bonus: { happiness: 25, xp: 15 } },
  { id: 'wings_rainbow', name: 'Rainbow Wings', cost: 250, icon: '🦋', color: '#F472B6', type: 'back', bonus: { happiness: 35, xp: 20 } },
  
  // Scarves - Mood stability
  { id: 'scarf_red', name: 'Red Scarf', cost: 100, icon: '🧣', color: '#DC2626', type: 'neck', bonus: { moodStability: 15 } },
  { id: 'scarf_blue', name: 'Blue Scarf', cost: 100, icon: '🧣', color: '#3B82F6', type: 'neck', bonus: { moodStability: 15 } },
  { id: 'scarf_pink', name: 'Pink Scarf', cost: 110, icon: '🧣', color: '#EC4899', type: 'neck', bonus: { moodStability: 18 } },
  
  // Costumes - Special bonuses
  { id: 'costume_chef', name: 'Chef Costume', cost: 300, icon: '👨‍🍳', color: '#FFFFFF', type: 'body', bonus: { cookingBonus: 30, happiness: 10 } },
  { id: 'costume_nurse', name: 'Nurse Outfit', cost: 280, icon: '👩‍⚕️', color: '#F0F0F0', type: 'body', bonus: { health: 15, energyRecovery: 30 } },
  { id: 'costume_wizard', name: 'Wizard Robe', cost: 350, icon: '🧙', color: '#7C3AED', type: 'body', bonus: { xp: 25, happiness: 15 } }
]

// ============================================
// ACCESSORIES - Top layer with gameplay effects
// ============================================
const ACCESSORIES_CATALOG = [
  // Hats - Various bonuses
  { id: 'hat_chef', name: 'Chef Hat', cost: 150, icon: '👨‍🍳', color: '#FFFFFF', type: 'head', bonus: { cookingBonus: 25 } },
  { id: 'hat_garden', name: 'Garden Hat', cost: 150, icon: '👒', color: '#22C55E', type: 'head', bonus: { gardenBonus: 25 } },
  { id: 'hat_hammer', name: 'Hammer Hat', cost: 150, icon: '🔨', color: '#6B7280', type: 'head', bonus: { whackBonus: 25 } },
  { id: 'hat_crown', name: 'Crown', cost: 300, icon: '👑', color: '#FBBF24', type: 'head', bonus: { all: 10, coinBonus: 15 } },
  { id: 'hat_flower', name: 'Flower', cost: 70, icon: '🌸', color: '#F472B6', type: 'head', bonus: { happiness: 15 } },
  { id: 'hat_santa', name: 'Santa Hat', cost: 180, icon: '🎅', color: '#DC2626', type: 'head', bonus: { happiness: 20, coinBonus: 10 } },
  { id: 'hat_witch', name: 'Witch Hat', cost: 160, icon: '🧙‍♀️', color: '#7C3AED', type: 'head', bonus: { xp: 15, happiness: 10 } },
  { id: 'hat_cap', name: 'Baseball Cap', cost: 100, icon: '🧢', color: '#3B82F6', type: 'head', bonus: { energy: 10 } },
  
  // Bows - Coin bonus
  { id: 'bow_pink', name: 'Pink Bow', cost: 80, icon: '🎀', color: '#EC4899', type: 'head', bonus: { happiness: 10, coinBonus: 5 } },
  { id: 'bow_blue', name: 'Blue Bow', cost: 80, icon: '🎀', color: '#3B82F6', type: 'head', bonus: { energy: 8, coinBonus: 5 } },
  { id: 'bow_red', name: 'Red Bow', cost: 90, icon: '🎀', color: '#DC2626', type: 'head', bonus: { happiness: 12, coinBonus: 8 } },
  
  // Glasses - XP and mood
  { id: 'glasses_round', name: 'Round Glasses', cost: 80, icon: '👓', color: '#1E293B', type: 'face', bonus: { xp: 10 } },
  { id: 'glasses_sun', name: 'Sunglasses', cost: 90, icon: '🕶️', color: '#0F172A', type: 'face', bonus: { moodStability: 15, happiness: 5 } },
  { id: 'glasses_heart', name: 'Heart Glasses', cost: 100, icon: '😍', color: '#EC4899', type: 'face', bonus: { happiness: 20 } }
]

// ============================================
// BED SYSTEM - Sleep quality multiplier
// ============================================
const BEDS = [
  { id: 'no_bed', name: 'Floor', cost: 0, icon: '', sleepQuality: 0.5 },
  { id: 'basic_bed', name: 'Basic Bed', cost: 100, icon: '🛏️', sleepQuality: 1.0 },
  { id: 'cozy_bed', name: 'Cozy Bed', cost: 200, icon: '🛏️', sleepQuality: 1.5 },
  { id: 'luxury_bed', name: 'Luxury Bed', cost: 350, icon: '🛏️', sleepQuality: 2.0 }
]

// ============================================
// ENVIRONMENT SYSTEM - House, Forest, Garden
// ============================================
const ENVIRONMENTS = [
  // House themes
  { 
    id: 'pastel_room', 
    name: 'Pastel Room', 
    type: 'house',
    cost: 0,
    bg: 'linear-gradient(180deg, #FFE5E5 0%, #FFE5F0 50%, #E5F0FF 100%)',
    floor: 'linear-gradient(180deg, #D4C4B0 0%, #C4B4A0 100%)',
    lighting: 'warm'
  },
  { 
    id: 'sunset_room', 
    name: 'Sunset Room', 
    type: 'house',
    cost: 150,
    bg: 'linear-gradient(180deg, #FFE4CC 0%, #FFD4E5 50%, #F0E5FF 100%)',
    floor: 'linear-gradient(180deg, #C4A584 0%, #B49574 100%)',
    lighting: 'warm'
  },
  
  // Forest themes
  { 
    id: 'deep_forest', 
    name: 'Deep Forest', 
    type: 'forest',
    cost: 250,
    bg: 'linear-gradient(180deg, #2D5016 0%, #3D6016 50%, #4D7026 100%)',
    floor: 'linear-gradient(180deg, #568050 0%, #487040 100%)',
    lighting: 'natural',
    hasTrees: true
  },
  
  // Garden themes
  { 
    id: 'flower_garden', 
    name: 'Flower Garden', 
    type: 'garden',
    cost: 300,
    bg: 'linear-gradient(180deg, #87CEEB 0%, #98D8EA 50%, #B0E0E8 100%)',
    floor: 'linear-gradient(180deg, #88C080 0%, #78B070 100%)',
    lighting: 'bright',
    hasFlowers: true
  },
  { 
    id: 'zen_garden', 
    name: 'Zen Garden', 
    type: 'garden',
    cost: 350,
    bg: 'linear-gradient(180deg, #E5F5FF 0%, #D0EBFF 50%, #C0E0FF 100%)',
    floor: 'linear-gradient(180deg, #A0B0A0 0%, #90A090 100%)',
    lighting: 'soft',
    hasPath: true
  }
]

// ============================================
// FURNITURE - Decorative and functional
// ============================================
const FURNITURE = [
  { id: 'bed_basic', name: 'Basic Bed', icon: '🛏️', cost: 100, type: 'bed', bedId: 'basic_bed' },
  { id: 'bed_cozy', name: 'Cozy Bed', icon: '🛏️', cost: 200, type: 'bed', bedId: 'cozy_bed' },
  { id: 'bed_luxury', name: 'Luxury Bed', icon: '🛏️', cost: 350, type: 'bed', bedId: 'luxury_bed' },
  { id: 'bathtub', name: 'Bathtub', icon: '🛁', cost: 150, type: 'bathtub', hasBathtub: true },
  { id: 'plant', name: 'Plant', icon: '🪴', cost: 30, type: 'decoration' },
  { id: 'lamp', name: 'Lamp', icon: '💡', cost: 50, type: 'lighting', lightBonus: 0.2 },
  { id: 'rug', name: 'Rug', icon: '🧶', cost: 40, type: 'decoration' },
  { id: 'bookshelf', name: 'Books', icon: '📚', cost: 60, type: 'decoration', xpBonus: 5 },
  { id: 'toy', name: 'Toy', icon: '🧸', cost: 35, type: 'decoration', funBonus: 5 },
  { id: 'tree', name: 'Tree', icon: '🌳', cost: 80, type: 'nature' },
  { id: 'flower', name: 'Flowers', icon: '💐', cost: 45, type: 'nature' }
]

// ============================================
// MINI GAMES - Config
// ============================================
const MINI_GAMES = [
  { id: 'whack', name: 'Whack-a-Mole', icon: '🔨', duration: 60, baseReward: 2 },
  { id: 'garden', name: 'Garden Catch', icon: '🧺', duration: 90, baseReward: 3 },
  { id: 'cooking', name: 'Cooking Match', icon: '🍳', duration: 120, baseReward: 4 },
  { id: 'memory', name: 'Memory Flip', icon: '🃏', duration: 90, baseReward: 5 }
]

export default function CuteVirtualPet() {
  const navigate = useNavigate()
  const { activeTheme, isDark } = useTheme()
  
  // ============================================
  // MAIN PET STATE - Enhanced with all stats
  // ============================================
  const [pet, setPet] = useState({
    type: 'bunny',
    name: 'Mochi',
    level: 1,
    coins: 150,
    
    // Core Stats (0-100)
    happiness: 80,
    hunger: 30,      // Lower = more hungry
    energy: 80,
    cleanliness: 100,
    health: 100,
    
    // Visual States
    isSleeping: false,
    sleepRotation: 0,
    expression: 'normal',  // normal, happy, sad, tired, sick, excited
    eyeState: 'open',      // open, closed, half, happy, sad, sick
    isBlinking: false,
    blushVisible: false,
    animation: null,
    
    // Sickness
    isSick: false,
    sicknessLevel: 0,
    
    // Bathing
    isBathing: false,
    hasBathtub: false,
    
    // Inventory & Equipment
    foods: [],
    furniture: [],
    selectedBed: 'no_bed',
    clothes: [],
    equippedClothes: [],
    accessories: [],
    equippedAccessories: [],
    
    // Environment
    environment: 'pastel_room',
    lighting: 'warm',
    lightIntensity: 1.0,
    
    // Planner Integration
    dailyTasks: [],
    habits: [],
    userMood: 'calm'
  })

  // ============================================
  // UI STATES
  // ============================================
  const [showShop, setShowShop] = useState(false)
  const [shopTab, setShopTab] = useState('food')
  const [showRoomEdit, setShowRoomEdit] = useState(false)
  const [showPetSelect, setShowPetSelect] = useState(false)
  const [showCloset, setShowCloset] = useState(false)
  const [showBath, setShowBath] = useState(false)
  const [showPlanner, setShowPlanner] = useState(false)
  const [animation, setAnimation] = useState(null)
  const [message, setMessage] = useState('')
  
  // ============================================
  // EATING ANIMATION STATE
  // ============================================
  const [eatingState, setEatingState] = useState({
    isEating: false,
    foodItem: null,
    size: 1,
    bites: 0
  })

  // ============================================
  // FOOD SELECTOR STATE (Inventory-based)
  // ============================================
  const [showFoodSelect, setShowFoodSelect] = useState(false)
  const [availableFoods, setAvailableFoods] = useState([])

  // ============================================
  // MINI GAME STATE
  // ============================================
  const [activeGame, setActiveGame] = useState(null)
  const [gameState, setGameState] = useState({
    score: 0,
    timeLeft: 0,
    items: [],
    combo: 0
  })
  
  // ============================================
  // MUSIC STATE
  // ============================================
  const [musicState, setMusicState] = useState({
    enabled: false,
    track: 'lofi',
    volume: 0.5
  })
  
  // ============================================
  // BUBBLES FOR BATH
  // ============================================
  const [bubbles, setBubbles] = useState([])

  // ============================================
  // LOAD/SAVE SYSTEM
  // ============================================
  useEffect(() => {
    const saved = localStorage.getItem('cutePet')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPet({ ...pet, ...parsed })
      } catch (e) { console.error(e) }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cutePet', JSON.stringify(pet))
  }, [pet])

  // ============================================
  // STAT DECAY WITH BONUSES & EXPRESSION BINDING
  // ============================================
  useEffect(() => {
    const timer = setInterval(() => {
      setPet(p => {
        // Calculate bonuses from equipped items
        const bonuses = calculateItemBonuses(p.equippedClothes, p.equippedAccessories)
        
        // Get sleep quality from bed
        const bed = BEDS.find(b => b.id === p.selectedBed) || BEDS[0]
        const sleepQuality = bed.sleepQuality || 0.5
        
        // Calculate stat changes
        const energyRecoveryBonus = bonuses.energyRecovery || 0
        const moodStability = bonuses.moodStability || 0
        
        // Stat decay/gain
        const newHunger = Math.min(100, p.hunger + 0.3)
        const newEnergy = p.isSleeping
          ? Math.min(100, p.energy + (0.5 * sleepQuality) + (energyRecoveryBonus / 100))
          : Math.max(0, p.energy - 0.2)
        const newCleanliness = Math.max(0, p.cleanliness - 0.1)
        const happinessDecay = Math.max(0.05, 0.15 - (moodStability / 100))
        const newHappiness = Math.max(0, p.happiness - happinessDecay)
        
        // Health calculation based on other stats
        let newHealth = p.health
        let isSick = p.isSick
        let sicknessLevel = p.sicknessLevel || 0
        
        // Sickness risk calculation
        const sicknessRisk = (
          (newHunger > 90 ? 0.3 : 0) +
          (newCleanliness < 30 ? 0.3 : 0) +
          (newEnergy < 20 ? 0.2 : 0) +
          (newHealth < 50 ? 0.2 : 0)
        )
        
        // Chance to get sick
        if (sicknessRisk > 0.5 && !isSick && Math.random() < 0.05) {
          isSick = true
          sicknessLevel = 1
          newHealth = Math.max(0, p.health - 5)
        }
        
        // Sickness progression
        if (isSick) {
          newHealth = Math.max(0, newHealth - 0.3)
          if (newHealth > 80 && Math.random() < 0.1) {
            isSick = false
            sicknessLevel = 0
          }
        }
        
        // Update blush visibility
        const newBlushVisible = newHappiness > 70 && !isSick
        
        // EXPRESSION BINDING - Auto-update based on stats
        let newExpression = 'normal'
        let newEyeState = 'open'
        
        if (isSick) {
          newExpression = 'sick'
          newEyeState = 'sick'
        } else if (newHunger > 90) {
          newExpression = 'hungry'
          newEyeState = 'sad'
        } else if (newEnergy < 30) {
          newExpression = 'tired'
          newEyeState = 'half'
        } else if (newCleanliness < 30) {
          newExpression = 'dirty'
          newEyeState = 'sad'
        } else if (newHappiness < 40) {
          newExpression = 'sad'
          newEyeState = 'sad'
        } else if (newHappiness > 90) {
          newExpression = 'excited'
          newEyeState = 'happy'
        } else if (newHappiness > 70) {
          newExpression = 'happy'
          newEyeState = 'happy'
        }
        
        if (p.isSleeping) {
          newEyeState = 'closed'
        }
        
        return {
          ...p,
          hunger: newHunger,
          energy: newEnergy,
          cleanliness: newCleanliness,
          happiness: newHappiness,
          health: newHealth,
          isSick,
          sicknessLevel,
          blushVisible: newBlushVisible,
          expression: newExpression,
          eyeState: newEyeState
        }
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // ============================================
  // AUTO WAKE UP
  // ============================================
  useEffect(() => {
    if (pet.isSleeping && pet.energy >= 100) {
      setPet(p => ({ ...p, isSleeping: false, sleepRotation: 0 }))
      showMessage('☀️ Good morning!')
      setAnimation('wake')
      setTimeout(() => setAnimation(null), 1000)
    }
  }, [pet.energy, pet.isSleeping])
  
  // ============================================
  // BLINK ANIMATION (Every 3-5 seconds)
  // ============================================
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      // Don't blink when sleeping or sick
      if (pet.isSleeping || pet.isSick) return
      
      setPet(p => ({ ...p, isBlinking: true }))
      setTimeout(() => {
        setPet(p => ({ ...p, isBlinking: false }))
      }, 200)
    }, 4000)
    
    return () => clearInterval(blinkInterval)
  }, [pet.isSleeping, pet.isSick])

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2000)
  }

  const calculateItemBonuses = (clothes, accessories) => {
    const bonuses = {
      energyRecovery: 0,
      happinessGain: 0,
      happiness: 0,
      energy: 0,
      xp: 0,
      moodStability: 0,
      coinBonus: 0,
      cookingBonus: 0,
      gardenBonus: 0,
      whackBonus: 0
    }

    // Clothes bonuses
    clothes?.forEach(itemId => {
      const item = CLOTHING_CATALOG.find(c => c.id === itemId)
      if (item?.bonus) {
        Object.entries(item.bonus).forEach(([key, value]) => {
          bonuses[key] = (bonuses[key] || 0) + value
        })
      }
    })

    // Accessories bonuses
    accessories?.forEach(itemId => {
      const item = ACCESSORIES_CATALOG.find(a => a.id === itemId)
      if (item?.bonus) {
        Object.entries(item.bonus).forEach(([key, value]) => {
          bonuses[key] = (bonuses[key] || 0) + value
        })
      }
    })

    return bonuses
  }

  const createParticles = (type) => {
    const container = document.querySelector('.particles-container')
    if (!container) return
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.textContent = type === 'heart' ? '❤️' : type === 'sparkle' ? '✨' : type === 'coin' ? '🪙' : '💖'
      particle.style.left = (40 + Math.random() * 20) + '%'
      particle.style.top = (40 + Math.random() * 20) + '%'
      container.appendChild(particle)
      setTimeout(() => particle.remove(), 1500)
    }
  }

  // ============================================
  // FEED PET - Inventory-based feeding
  // ============================================
  const feedPet = () => {
    if (pet.isSleeping) {
      showMessage('💤 Sleeping...')
      return
    }
    if (pet.hunger <= 10) {
      showMessage('😋 Not hungry!')
      return
    }
    
    // Check inventory for available foods
    const foods = pet.foods || []
    if (foods.length === 0) {
      showMessage('🛒 No food available. Please buy from shop.')
      setShowShop(true)
      setShopTab('food')
      return
    }
    
    // Show food selector
    setAvailableFoods(foods)
    setShowFoodSelect(true)
  }
  
  const selectFood = (food, index) => {
    setShowFoodSelect(false)
    setEatingState({ isEating: true, foodItem: food, size: 1, bites: 0 })
    setAnimation('eating')
    
    // Remove from inventory
    setPet(p => ({
      ...p,
      foods: p.foods.filter((_, i) => i !== index)
    }))
    
    // Bite animation
    const maxBites = 5
    const biteInterval = setInterval(() => {
      setEatingState(prev => {
        const newBites = prev.bites + 1
        const newSize = 1 - (newBites / maxBites)
        
        // Chewing mouth animation
        setPet(p => ({ ...p, mouthState: 'chewing' }))
        
        if (newBites >= maxBites) {
          clearInterval(biteInterval)
          completeEating(food)
        }
        
        return { ...prev, bites: newBites, size: newSize }
      })
    }, food.eatTime / maxBites)
  }

  const completeEating = (food) => {
    setEatingState({ isEating: false, foodItem: null, size: 0, bites: 0 })
    setPet(p => ({ ...p, mouthState: 'normal' }))
    
    // Apply food-specific effects based on type
    let happinessGain = food.happiness
    let energyGain = food.energy || 0
    let fillAmount = food.fill
    
    // Type-based modifiers for unique effects
    if (food.type === 'fruit') {
      // Fruits: Small hunger restore + happiness boost
      happinessGain *= 1.2
      fillAmount *= 1.1
    } else if (food.type === 'treat') {
      // Treats: Large happiness + small energy drop
      happinessGain *= 1.3
      energyGain -= 3
    } else if (food.type === 'meal') {
      // Meals: Large hunger restore + balanced stats
      fillAmount *= 1.3
      energyGain *= 1.1
    } else if (food.type === 'drink') {
      // Drinks: Energy recovery boost
      energyGain *= 1.3
      fillAmount *= 0.8
    }
    
    // Apply bonuses from clothing
    const bonuses = calculateItemBonuses(pet.equippedClothes, pet.equippedAccessories)
    if (bonuses.happinessGain) {
      happinessGain *= (1 + bonuses.happinessGain / 100)
    }
    
    setPet(p => ({
      ...p,
      hunger: Math.max(0, p.hunger - fillAmount),
      happiness: Math.min(100, p.happiness + happinessGain),
      energy: Math.min(100, p.energy + energyGain),
      coins: p.coins + 3
    }))
    
    setAnimation('happy')
    createParticles('heart')
    showMessage(`😋 Yummy! +${Math.floor(happinessGain)} happy`)
    setTimeout(() => setAnimation(null), 1500)
  }

  // ============================================
  // SLEEP SYSTEM - Proper bed alignment
  // ============================================
  const toggleSleep = () => {
    if (pet.isSleeping) {
      // Wake up
      setPet(p => ({ ...p, isSleeping: false, sleepRotation: 0 }))
      showMessage('☀️ Wake up!')
      setAnimation('wake')
      setTimeout(() => setAnimation(null), 1000)
    } else {
      // Try to sleep
      if (pet.energy > 20) {
        showMessage('😅 Not tired!')
        return
      }
      
      const bed = pet.furniture.find(f => f.type === 'bed')
      if (bed) {
        // Sleep on bed - snap to position, fully closed eyes
        setPet(p => ({ 
          ...p, 
          isSleeping: true, 
          sleepRotation: 0,
          eyeState: 'closed',  // Fully closed for sleep
          mouthState: 'relaxed' // Small relaxed shape
        }))
        showMessage('🛏️ Good night!')
      } else {
        // Sleep on floor - slower recovery
        setPet(p => ({ 
          ...p, 
          isSleeping: true, 
          sleepRotation: 15,
          eyeState: 'closed',
          mouthState: 'relaxed'
        }))
        showMessage('💤 Floor sleep...')
      }
      setAnimation('sleep')
    }
    setTimeout(() => setAnimation(null), 1000)
  }

  // ============================================
  // PLAY SYSTEM
  // ============================================
  const playWithPet = () => {
    if (pet.isSleeping) {
      showMessage('💤 Too sleepy!')
      return
    }
    if (pet.energy < 20) {
      showMessage('😴 Too tired!')
      return
    }

    setAnimation('playing')
    const bonuses = calculateItemBonuses(pet.equippedClothes, pet.equippedAccessories)
    const happinessGain = 20 + (bonuses.happinessGain || 0) / 5
    
    setPet(p => ({
      ...p,
      happiness: Math.min(100, p.happiness + happinessGain),
      energy: Math.max(0, p.energy - 15),
      hunger: Math.min(100, p.hunger + 10),
      coins: p.coins + 8 + (bonuses.coinBonus || 0)
    }))
    createParticles('sparkle')
    showMessage('🎉 Fun! +8 coins')
    setTimeout(() => setAnimation(null), 1500)
  }

  // ============================================
  // SHOP SYSTEM
  // ============================================
  const buyFood = (food) => {
    if (pet.coins >= food.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - food.cost,
        foods: [...p.foods, food]
      }))
      showMessage(`🛒 Bought ${food.name}!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const buyFurniture = (item) => {
    if (pet.furniture.find(f => f.id === item.id)) {
      showMessage('✅ Already owned!')
      return
    }
    
    if (pet.coins >= item.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - item.cost,
        furniture: [...p.furniture, item],
        // Auto-equip bed
        selectedBed: item.type === 'bed' ? item.bedId : p.selectedBed,
        // Set bathtub flag
        hasBathtub: item.type === 'bathtub' ? true : p.hasBathtub
      }))
      showMessage(`🛒 Bought ${item.name}!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const buyEnvironment = (env) => {
    if (pet.coins >= env.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - env.cost,
        environment: env.id,
        lighting: env.lighting
      }))
      showMessage(`🏠 Changed to ${env.name}!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const buyClothes = (item) => {
    if (pet.clothes.find(c => c.id === item.id)) {
      showMessage('✅ Already owned!')
      return
    }
    
    if (pet.coins >= item.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - item.cost,
        clothes: [...p.clothes, item.id]
      }))
      showMessage(`👕 Bought ${item.name}!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const buyAccessory = (item) => {
    if (pet.accessories.find(a => a.id === item.id)) {
      showMessage('✅ Already owned!')
      return
    }
    
    if (pet.coins >= item.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - item.cost,
        accessories: [...p.accessories, item.id]
      }))
      showMessage(`🎀 Bought ${item.name}!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  // ============================================
  // EQUIPMENT SYSTEM
  // ============================================
  const equipClothes = (itemId) => {
    const item = CLOTHING_CATALOG.find(c => c.id === itemId)
    if (!item) return
    
    setPet(p => {
      const currentOfType = p.equippedClothes.filter(id => {
        const c = CLOTHING_CATALOG.find(x => x.id === id)
        return c?.type === item.type
      })
      
      const newEquipped = p.equippedClothes.filter(id => !currentOfType.includes(id))
      return { ...p, equippedClothes: [...newEquipped, itemId] }
    })
    showMessage(`👕 Equipped ${item.name}!`)
  }

  const equipAccessory = (itemId) => {
    const item = ACCESSORIES_CATALOG.find(a => a.id === itemId)
    if (!item) return
    
    setPet(p => {
      const currentOfType = p.equippedAccessories.filter(id => {
        const a = ACCESSORIES_CATALOG.find(x => x.id === id)
        return a?.type === item.type
      })
      
      const newEquipped = p.equippedAccessories.filter(id => !currentOfType.includes(id))
      return { ...p, equippedAccessories: [...newEquipped, itemId] }
    })
    showMessage(`🎀 Equipped ${item.name}!`)
  }

  const changePet = (type) => {
    setPet(p => ({ ...p, type: type.id, name: type.name }))
    setShowPetSelect(false)
    showMessage(`✨ Meet ${type.name}!`)
    createParticles('sparkle')
  }

  // ============================================
  // MINI GAME SYSTEM
  // ============================================
  const startMiniGame = (gameId) => {
    const game = MINI_GAMES.find(g => g.id === gameId)
    if (!game) return
    
    setActiveGame(gameId)
    setGameState({
      score: 0,
      timeLeft: game.duration,
      items: [],
      combo: 0
    })
    
    // Start game timer
    const timer = setInterval(() => {
      setGameState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timer)
          completeMiniGame(gameId, prev.score)
          return prev
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)
  }

  const completeMiniGame = (gameId, score) => {
    const game = MINI_GAMES.find(g => g.id === gameId)
    const bonuses = calculateItemBonuses(pet.equippedClothes, pet.equippedAccessories)
    
    // Calculate reward with bonuses
    let gameBonus = 0
    if (gameId === 'whack') gameBonus = bonuses.whackBonus || 0
    if (gameId === 'garden') gameBonus = bonuses.gardenBonus || 0
    if (gameId === 'cooking') gameBonus = bonuses.cookingBonus || 0
    
    const multiplier = 1 + (gameBonus / 100)
    const coins = Math.floor(score * game.baseReward * multiplier)
    
    setPet(p => ({
      ...p,
      coins: p.coins + coins,
      happiness: Math.min(100, p.happiness + 10)
    }))
    
    setActiveGame(null)
    showMessage(`🎮 +${coins} coins!`)
    createParticles('coin')
  }

  // ============================================
  // RENDER HELPERS
  // ============================================
  const currentPet = PET_TYPES.find(p => p.id === pet.type)
  const currentEnv = ENVIRONMENTS.find(e => e.id === pet.environment)
  const currentBed = BEDS.find(b => b.id === pet.selectedBed)

  // Get equipped items
  const equippedBody = pet.equippedClothes.find(id => {
    const item = CLOTHING_CATALOG.find(c => c.id === id)
    return item?.type === 'body'
  })
  const equippedBack = pet.equippedClothes.find(id => {
    const item = CLOTHING_CATALOG.find(c => c.id === id)
    return item?.type === 'back'
  })
  const equippedNeck = pet.equippedClothes.find(id => {
    const item = CLOTHING_CATALOG.find(c => c.id === id)
    return item?.type === 'neck'
  })
  const equippedHead = pet.equippedAccessories.find(id => {
    const item = ACCESSORIES_CATALOG.find(a => a.id === id)
    return item?.type === 'head'
  })
  const equippedFace = pet.equippedAccessories.find(id => {
    const item = ACCESSORIES_CATALOG.find(a => a.id === id)
    return item?.type === 'face'
  })

  // ============================================
  // MINI GAME RENDERER
  // ============================================
  if (activeGame) {
    return (
      <div className="mini-game-overlay">
        <div className="mini-game-container">
          <div className="mini-game-header">
            <h3>{MINI_GAMES.find(g => g.id === activeGame)?.name}</h3>
            <div className="game-stats">
              <span>Score: {gameState.score}</span>
              <span>Time: {gameState.timeLeft}s</span>
              {gameState.combo > 1 && <span>Combo: x{gameState.combo}</span>}
            </div>
            <button className="close-btn" onClick={() => setActiveGame(null)}>
              <X size={20} />
            </button>
          </div>
          
          <div className="mini-game-content">
            {activeGame === 'whack' && (
              <WhackAMoleGame
                gameState={gameState}
                setGameState={setGameState}
              />
            )}
            {activeGame === 'garden' && (
              <GardenCatchGame
                gameState={gameState}
                setGameState={setGameState}
                onMiss={(count) => {
                  // Mood decrease for each missed fruit
                  setPet(p => ({
                    ...p,
                    happiness: Math.max(0, p.happiness - count * 3)
                  }))
                }}
              />
            )}
            {activeGame === 'cooking' && (
              <CookingMatchGame
                gameState={gameState}
                setGameState={setGameState}
              />
            )}
            {activeGame === 'memory' && (
              <MemoryFlipGame
                gameState={gameState}
                setGameState={setGameState}
                onComplete={(coins) => {
                  setPet(p => ({
                    ...p,
                    coins: p.coins + coins,
                    happiness: Math.min(100, p.happiness + 10)
                  }))
                  showMessage(`🎮 +${coins} coins!`)
                  createParticles('coin')
                }}
              />
            )}
          </div>
        </div>
      </div>
    )
  }

  // ============================================
  // MAIN RENDER
  // ============================================
  return (
    <div className="cute-virtual-pet-page">
      {/* Header Stats */}
      <div className="cute-pet-header">
        <div className="cute-pet-header-top">
          <button className="cute-home-btn" onClick={() => navigate('/dashboard')} title="Back to Home">
            <ArrowLeft size={20} />
            <span>Home</span>
          </button>
          <div className="cute-pet-name-row">
            <button className="cute-pet-name-btn" onClick={() => setShowPetSelect(true)}>
              <span className="cute-pet-type-icon">{currentPet?.name}</span>
              <span className="cute-pet-display-name">{pet.name}</span>
            </button>
            <div className="cute-level-badge">Lv.{pet.level}</div>
          </div>
        </div>
        
        {/* All Stats Bars */}
        <div className="cute-stats-row">
          <div className="cute-stat">
            <Heart size={14} fill="#FF6B8A" color="#FF6B8A" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill happiness" style={{ width: `${pet.happiness}%` }} />
            </div>
          </div>
          <div className="cute-stat">
            <Utensils size={14} fill="#FFB347" color="#FFB347" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill hunger" style={{ width: `${100 - pet.hunger}%` }} />
            </div>
          </div>
          <div className="cute-stat">
            <Moon size={14} fill="#B39DDB" color="#B39DDB" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill energy" style={{ width: `${pet.energy}%` }} />
            </div>
          </div>
          <div className="cute-stat">
            <Droplets size={14} fill="#74b9ff" color="#74b9ff" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill cleanliness" style={{ width: `${pet.cleanliness}%` }} />
            </div>
          </div>
          <div className="cute-stat">
            <Sparkles size={14} fill="#55efc4" color="#55efc4" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill health" style={{ width: `${pet.health}%` }} />
            </div>
          </div>
          <div className="cute-coins">🪙 {pet.coins}</div>
        </div>
      </div>

      {/* Pet Room with Environment */}
      <div 
        className="cute-pet-room" 
        style={{ 
          background: currentEnv?.bg,
        }}
      >
        {/* Floor Layer */}
        <div 
          className="cute-floor-layer"
          style={{ background: currentEnv?.floor }}
        />
        
        {/* Environment Features */}
        {currentEnv?.hasTrees && (
          <div className="env-trees">
            <span className="tree">🌲</span>
            <span className="tree">🌳</span>
            <span className="tree">🌲</span>
          </div>
        )}
        {currentEnv?.hasFlowers && (
          <div className="env-flowers">
            <span className="flower">🌸</span>
            <span className="flower">🌺</span>
            <span className="flower">🌼</span>
            <span className="flower">🌷</span>
          </div>
        )}
        {currentEnv?.hasPath && (
          <div className="env-path" />
        )}

        {/* Furniture Layer */}
        <div className="cute-furniture-layer">
          {pet.furniture.map((item, idx) => (
            <div 
              key={idx} 
              className={`cute-furniture-item furniture-${item.type}`}
              style={{
                left: `${15 + (idx % 3) * 35}%`,
                top: `${55 + Math.floor(idx / 3) * 20}%`
              }}
            >
              {item.icon}
            </div>
          ))}
        </div>

        {/* Pet with Layered Clothes */}
        <div className={`cute-pet-container ${animation || ''} ${pet.isSleeping ? 'sleeping' : ''}`}>
          <div className="cute-pet">
            {/* Layer 1: Back Accessories (Wings) */}
            {equippedBack && (
              <div className="back-accessory" style={{ '--acc-color': CLOTHING_CATALOG.find(c => c.id === equippedBack)?.color }}>
                {CLOTHING_CATALOG.find(c => c.id === equippedBack)?.icon}
              </div>
            )}
            
            {/* Base Pet Body */}
            <div className="cute-pet-body" style={{ '--pet-color': currentPet?.color, '--pet-ear-color': currentPet?.earColor }}>
              {/* Ears based on pet type */}
              {pet.type === 'bunny' && (
                <>
                  <div className="cute-ear left" />
                  <div className="cute-ear right" />
                </>
              )}
              {pet.type === 'cat' && (
                <>
                  <div className="cute-ear-cat left" />
                  <div className="cute-ear-cat right" />
                </>
              )}
              {pet.type === 'bear' && (
                <>
                  <div className="cute-ear-bear left" />
                  <div className="cute-ear-bear right" />
                </>
              )}
              {pet.type === 'elephant' && (
                <>
                  <div className="cute-ear-elephant left" />
                  <div className="cute-ear-elephant right" />
                  <div className="cute-trunk" />
                </>
              )}
              {pet.type === 'dog' && (
                <>
                  <div className="cute-ear-dog left" />
                  <div className="cute-ear-dog right" />
                </>
              )}

              {/* Face - Always Visible */}
              <div className="cute-pet-face">
                {/* Eyes - Transform during sleep */}
                <div className="cute-eyes">
                  <div className={`cute-eye left ${pet.isSleeping ? 'sleep' : pet.eyeState}`} />
                  <div className={`cute-eye right ${pet.isSleeping ? 'sleep' : pet.eyeState}`} />
                </div>

                {/* Blush - Visible when happy */}
                {pet.blushVisible && (
                  <div className="cute-blush" style={{ '--blush-color': currentPet?.blushColor }} />
                )}

                {/* Mouth - Animates when eating */}
                <div className={`cute-mouth ${pet.mouthState}`} />
              </div>

              {/* Belly */}
              <div className="cute-belly" />

              {/* Arms */}
              <div className="cute-arm left" />
              <div className="cute-arm right" />

              {/* Feet */}
              <div className="cute-feet">
                <div className="cute-foot left" />
                <div className="cute-foot right" />
              </div>
            </div>

            {/* Layer 2: Body Clothes (Pajamas, Sweaters) */}
            {equippedBody && (
              <div className="body-clothes" style={{ '--clothes-color': CLOTHING_CATALOG.find(c => c.id === equippedBody)?.color }}>
                {CLOTHING_CATALOG.find(c => c.id === equippedBody)?.icon}
              </div>
            )}
            
            {/* Layer 3: Neck Accessories (Scarves) */}
            {equippedNeck && (
              <div className="neck-accessory" style={{ '--acc-color': CLOTHING_CATALOG.find(c => c.id === equippedNeck)?.color }}>
                {CLOTHING_CATALOG.find(c => c.id === equippedNeck)?.icon}
              </div>
            )}

            {/* Layer 4: Head Accessories (Hats, Bows) */}
            {equippedHead && (
              <div className="head-accessory" style={{ '--acc-color': ACCESSORIES_CATALOG.find(a => a.id === equippedHead)?.color }}>
                {ACCESSORIES_CATALOG.find(a => a.id === equippedHead)?.icon}
              </div>
            )}
            
            {/* Layer 5: Face Accessories (Glasses) */}
            {equippedFace && (
              <div className="face-accessory" style={{ '--acc-color': ACCESSORIES_CATALOG.find(a => a.id === equippedFace)?.color }}>
                {ACCESSORIES_CATALOG.find(a => a.id === equippedFace)?.icon}
              </div>
            )}

            {/* Eating Animation */}
            {eatingState.isEating && eatingState.foodItem && (
              <div 
                className="cute-eating-food" 
                style={{ 
                  transform: `scale(${eatingState.size})`,
                }}
              >
                {eatingState.foodItem.icon}
              </div>
            )}
          </div>

          {/* Sleep Zzz */}
          {pet.isSleeping && (
            <div className="cute-sleep-zzz">
              <span>💤</span>
            </div>
          )}
        </div>

        {/* Particles */}
        <div className="particles-container" />
      </div>

      {/* Action Buttons */}
      <div className="cute-action-buttons">
        <button className="cute-action-btn" onClick={() => setShowShop(true)} disabled={pet.isSleeping}>
          <ShoppingBag size={20} />
          <span>Shop</span>
        </button>
        <button className="cute-action-btn" onClick={feedPet} disabled={pet.isSleeping || pet.hunger <= 10}>
          <Utensils size={20} />
          <span>Feed</span>
        </button>
        <button className="cute-action-btn" onClick={playWithPet} disabled={pet.isSleeping || pet.energy < 20}>
          <Sparkles size={20} />
          <span>Play</span>
        </button>
        <button className="cute-action-btn" onClick={toggleSleep}>
          <Moon size={20} />
          <span>{pet.isSleeping ? 'Wake' : 'Sleep'}</span>
        </button>
        <button className="cute-action-btn" onClick={() => setShowBath(true)} disabled={pet.isSleeping || !pet.hasBathtub}>
          <Droplets size={20} />
          <span>Bath</span>
        </button>
        <button className="cute-action-btn" onClick={() => setShowCloset(true)}>
          <Shirt size={20} />
          <span>Closet</span>
        </button>
        <button className="cute-action-btn" onClick={() => startMiniGame('whack')}>
          <Sparkles size={20} />
          <span>Games</span>
        </button>
      </div>

      {/* Message Toast */}
      {message && (
        <div className="cute-message-toast">
          {message}
        </div>
      )}

      {/* Shop Modal */}
      {showShop && (
        <div className="cute-modal-overlay" onClick={() => setShowShop(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>🛒 Shop</h3>
              <button className="cute-modal-close" onClick={() => setShowShop(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cute-shop-tabs">
              <button className={`cute-shop-tab ${shopTab === 'food' ? 'active' : ''}`} onClick={() => setShopTab('food')}>
                🍎 Food
              </button>
              <button className={`cute-shop-tab ${shopTab === 'furniture' ? 'active' : ''}`} onClick={() => setShopTab('furniture')}>
                🪑 Furniture
              </button>
              <button className={`cute-shop-tab ${shopTab === 'room' ? 'active' : ''}`} onClick={() => setShopTab('room')}>
                🏠 Room
              </button>
            </div>

            <div className="cute-shop-content">
              {shopTab === 'food' && (
                <div className="cute-shop-grid">
                  {FOODS.map(food => (
                    <button key={food.id} className="cute-shop-item" onClick={() => buyFood(food)}>
                      <span className="cute-shop-item-icon">{food.icon}</span>
                      <span className="cute-shop-item-name">{food.name}</span>
                      <span className="cute-shop-item-cost">🪙 {food.cost}</span>
                    </button>
                  ))}
                </div>
              )}

              {shopTab === 'furniture' && (
                <div className="cute-shop-grid">
                  {FURNITURE.map(item => (
                    <button key={item.id} className="cute-shop-item" onClick={() => buyFurniture(item)}>
                      <span className="cute-shop-item-icon">{item.icon}</span>
                      <span className="cute-shop-item-name">{item.name}</span>
                      <span className="cute-shop-item-cost">🪙 {item.cost}</span>
                    </button>
                  ))}
                </div>
              )}

              {shopTab === 'room' && (
                <div className="cute-shop-grid">
                  {ENVIRONMENTS.map(env => (
                    <button key={env.id} className="cute-shop-item" onClick={() => buyEnvironment(env)}>
                      <div className="cute-room-preview" style={{ background: env.bg }} />
                      <span className="cute-shop-item-name">{env.name}</span>
                      <span className="cute-shop-item-cost">🪙 {env.cost}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Closet Modal */}
      {showCloset && (
        <div className="cute-modal-overlay" onClick={() => setShowCloset(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>👕 Closet</h3>
              <button className="cute-modal-close" onClick={() => setShowCloset(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cute-closet-tabs">
              <button className={`cute-closet-tab ${shopTab === 'clothes' ? 'active' : ''}`} onClick={() => setShopTab('clothes')}>
                👔 Clothes
              </button>
              <button className={`cute-closet-tab ${shopTab === 'accessories' ? 'active' : ''}`} onClick={() => setShopTab('accessories')}>
                🎀 Accessories
              </button>
            </div>

            <div className="cute-shop-content">
              {shopTab === 'clothes' && (
                <>
                  <div className="cute-shop-grid">
                    {CLOTHING_CATALOG.map(item => {
                      const owned = pet.clothes.includes(item.id)
                      const equipped = pet.equippedClothes.includes(item.id)
                      return (
                        <button 
                          key={item.id} 
                          className={`cute-shop-item ${equipped ? 'equipped' : ''}`}
                          onClick={() => owned ? equipClothes(item.id) : buyClothes(item)}
                        >
                          <span className="cute-shop-item-icon">{item.icon}</span>
                          <span className="cute-shop-item-name">{item.name}</span>
                          <span className="cute-shop-item-cost">{owned ? (equipped ? '✅' : '👕') : `🪙 ${item.cost}`}</span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}

              {shopTab === 'accessories' && (
                <>
                  <div className="cute-shop-grid">
                    {ACCESSORIES_CATALOG.map(item => {
                      const owned = pet.accessories.includes(item.id)
                      const equipped = pet.equippedAccessories.includes(item.id)
                      return (
                        <button 
                          key={item.id} 
                          className={`cute-shop-item ${equipped ? 'equipped' : ''}`}
                          onClick={() => owned ? equipAccessory(item.id) : buyAccessory(item)}
                        >
                          <span className="cute-shop-item-icon">{item.icon}</span>
                          <span className="cute-shop-item-name">{item.name}</span>
                          <span className="cute-shop-item-cost">{owned ? (equipped ? '✅' : '🎀') : `🪙 ${item.cost}`}</span>
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bath Modal */}
      {showBath && (
        <div className="cute-modal-overlay" onClick={() => setShowBath(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>🛁 Bath Time</h3>
              <button className="cute-modal-close" onClick={() => setShowBath(false)}>
                <X size={20} />
              </button>
            </div>
            
            {!pet.hasBathtub ? (
              <div className="cute-bath-content">
                <p className="cute-no-bathtub">You need a bathtub first!</p>
                <button 
                  className="cute-buy-bathtub-btn"
                  onClick={() => {
                    setShowBath(false)
                    setShowShop(true)
                    setShopTab('furniture')
                  }}
                >
                  Go to Shop →
                </button>
              </div>
            ) : (
              <div className="cute-bath-content">
                <div className="cute-bath-preview">
                  <div className="cute-bath-tub">🛁</div>
                  {pet.isBathing && (
                    <div className="cute-bath-bubbles">
                      {bubbles.map(bubble => (
                        <span 
                          key={bubble.id} 
                          className="bubble"
                          style={{
                            left: `${bubble.x}%`,
                            top: `${bubble.y}%`,
                            width: `${bubble.size}px`,
                            height: `${bubble.size}px`
                          }}
                        >
                          ○
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="cute-bath-stats">
                  <div className="cute-bath-stat-row">
                    <span>Cleanliness:</span>
                    <div className="cute-bath-bar">
                      <div 
                        className="cute-bath-fill" 
                        style={{ width: `${pet.cleanliness}%` }}
                      />
                    </div>
                    <span>{Math.round(pet.cleanliness)}%</span>
                  </div>
                </div>
                
                <button 
                  className="cute-bath-action-btn"
                  onClick={() => {
                    if (pet.isBathing) {
                      // Stop bath
                      setPet(p => ({ ...p, isBathing: false }))
                      setBubbles([])
                      showMessage('✨ All clean!')
                    } else {
                      // Start bath
                      setPet(p => ({ ...p, isBathing: true }))
                      
                      // Spawn bubbles
                      const bubbleInterval = setInterval(() => {
                        const newBubble = {
                          id: Date.now(),
                          x: 30 + Math.random() * 40,
                          y: 60 - Math.random() * 40,
                          size: 15 + Math.random() * 15
                        }
                        setBubbles(prev => [...prev, newBubble])
                        setTimeout(() => {
                          setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
                        }, 2000)
                      }, 500)
                      
                      // Increase cleanliness over time
                      const cleanInterval = setInterval(() => {
                        setPet(p => {
                          if (p.cleanliness >= 100 || !p.isBathing) {
                            clearInterval(cleanInterval)
                            clearInterval(bubbleInterval)
                            setPet(p2 => ({ ...p2, isBathing: false }))
                            setBubbles([])
                            return { ...p, cleanliness: 100, isBathing: false, happiness: Math.min(100, p.happiness + 10) }
                          }
                          return { ...p, cleanliness: Math.min(100, p.cleanliness + 3) }
                        })
                      }, 1000)
                    }
                  }}
                  disabled={pet.isBathing && pet.cleanliness >= 100}
                >
                  {pet.isBathing ? '✨ Finish Bath' : '🛁 Start Bath'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Room Edit Modal */}
      {showRoomEdit && (
        <div className="cute-modal-overlay" onClick={() => setShowRoomEdit(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>🏠 Edit Room</h3>
              <button className="cute-modal-close" onClick={() => setShowRoomEdit(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="cute-room-themes">
              {ENVIRONMENTS.map(env => (
                <button
                  key={env.id}
                  className={`cute-room-theme-btn ${pet.environment === env.id ? 'active' : ''}`}
                  onClick={() => {
                    buyEnvironment(env)
                    setShowRoomEdit(false)
                  }}
                  style={{ background: env.bg }}
                >
                  {env.name}
                </button>
              ))}
            </div>
            <div className="cute-furniture-list">
              <h4>Your Furniture</h4>
              <div className="cute-furniture-grid">
                {pet.furniture.length === 0 ? (
                  <p className="cute-no-furniture">No furniture yet. Visit the shop!</p>
                ) : (
                  pet.furniture.map((item, idx) => (
                    <div key={idx} className="cute-furniture-owned">
                      {item.icon} {item.name}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pet Select Modal */}
      {showPetSelect && (
        <div className="cute-modal-overlay" onClick={() => setShowPetSelect(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>🐾 Choose Pet</h3>
              <button className="cute-modal-close" onClick={() => setShowPetSelect(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="cute-pet-select-grid">
              {PET_TYPES.map(type => (
                <button
                  key={type.id}
                  className={`cute-pet-select-btn ${pet.type === type.id ? 'active' : ''}`}
                  onClick={() => changePet(type)}
                  style={{ '--select-color': type.color }}
                >
                  <div className="cute-pet-select-preview" style={{ background: type.color }}>
                    <div className="cute-pet-select-face">
                      <div className="cute-select-eye left" />
                      <div className="cute-select-eye right" />
                      <div className="cute-select-mouth" />
                    </div>
                  </div>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ============================================
// MINI GAME COMPONENTS
// ============================================

function WhackAMoleGame({ gameState, setGameState }) {
  const handleMoleClick = (id) => {
    setGameState(prev => ({
      ...prev,
      score: prev.score + 10 * (prev.combo + 1),
      combo: prev.combo + 1
    }))
    // Remove mole
    setGameState(prev => ({
      ...prev,
      items: prev.items.filter(i => i.id !== id)
    }))
  }

  const handleMiss = () => {
    // Penalty for wrong tap
    setGameState(prev => ({
      ...prev,
      combo: 0,
      score: Math.max(0, prev.score - 5) // Small penalty
    }))
  }

  // Spawn moles
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      if (gameState.items.length < 3) {
        const newMole = {
          id: Date.now(),
          position: Math.floor(Math.random() * 9)
        }
        setGameState(prev => ({
          ...prev,
          items: [...prev.items, newMole]
        }))
        
        // Auto-hide after 1.5s
        setTimeout(() => {
          setGameState(prev => ({
            ...prev,
            items: prev.items.filter(i => i.id !== newMole.id),
            combo: 0 // Lose combo if mole escapes
          }))
        }, 1500)
      }
    }, 800)
    
    return () => clearInterval(spawnInterval)
  }, [gameState.items])

  return (
    <div className="whack-mole-game">
      <div className="mole-grid">
        {Array(9).fill(null).map((_, i) => {
          const mole = gameState.items.find(m => m.position === i)
          return (
            <div 
              key={i} 
              className="mole-hole"
              onClick={() => mole ? handleMoleClick(mole.id) : handleMiss()}
            >
              {mole && (
                <div className="mole-popup">
                  <div className="mole-face">
                    <div className="mole-eye left">•</div>
                    <div className="mole-eye right">•</div>
                    <div className="mole-mouth">ω</div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function GardenCatchGame({ gameState, setGameState, onMiss }) {
  const fruits = [
    { icon: '🍎', value: 10 },
    { icon: '🍓', value: 15 },
    { icon: '🍑', value: 12 },
    { icon: '🥕', value: 8 },
    { icon: '🍇', value: 14 }
  ]

  const handleCatch = (fruitId) => {
    const fruit = gameState.items.find(f => f.id === fruitId)
    setGameState(prev => ({
      ...prev,
      score: prev.score + fruit.value * prev.multiplier,
      multiplier: Math.min(5, prev.multiplier + 0.5),
      items: prev.items.filter(f => f.id !== fruitId)
    }))
  }

  // Spawn fruits
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const fruit = fruits[Math.floor(Math.random() * fruits.length)]
      const newFruit = {
        id: Date.now(),
        ...fruit,
        x: Math.random() * 80 + 10,
        y: 0
      }
      setGameState(prev => ({
        ...prev,
        items: [...prev.items, newFruit]
      }))
    }, 1000)

    return () => clearInterval(spawnInterval)
  }, [])

  // Fall animation and miss detection
  useEffect(() => {
    const fallInterval = setInterval(() => {
      setGameState(prev => {
        const missed = prev.items.filter(item => item.y >= 90)
        if (missed.length > 0 && onMiss) {
          onMiss(missed.length) // Trigger mood decrease
        }
        return {
          ...prev,
          items: prev.items.map(item => ({
            ...item,
            y: item.y + 2
          })).filter(item => item.y < 95),
          // Reset multiplier on miss
          multiplier: missed.length > 0 ? 1 : prev.multiplier
        }
      })
    }, 50)

    return () => clearInterval(fallInterval)
  }, [onMiss])

  return (
    <div className="garden-catch-game">
      <div className="fruit-container">
        {gameState.items.map(fruit => (
          <div
            key={fruit.id}
            className="falling-fruit"
            style={{
              left: `${fruit.x}%`,
              top: `${fruit.y}%`
            }}
            onClick={() => handleCatch(fruit.id)}
          >
            {fruit.icon}
          </div>
        ))}
      </div>
    </div>
  )
}

function CookingMatchGame({ gameState, setGameState }) {
  const ingredients = [
    { icon: '🥚', name: 'Egg' },
    { icon: '🥛', name: 'Milk' },
    { icon: '🌾', name: 'Flour' },
    { icon: '🥕', name: 'Carrot' },
    { icon: '🐟', name: 'Fish' }
  ]

  const [grid, setGrid] = useState([])
  const [selected, setSelected] = useState(null)

  // Initialize grid
  useEffect(() => {
    const newGrid = Array(16).fill(null).map(() => 
      ingredients[Math.floor(Math.random() * ingredients.length)]
    )
    setGrid(newGrid)
  }, [])

  const handleSelect = (index) => {
    if (selected === null) {
      setSelected(index)
    } else if (selected !== index) {
      // Check if adjacent
      const row1 = Math.floor(selected / 4)
      const col1 = selected % 4
      const row2 = Math.floor(index / 4)
      const col2 = index % 4
      
      const isAdjacent = (Math.abs(row1 - row2) + Math.abs(col1 - col2)) === 1
      
      if (isAdjacent) {
        // Swap
        const newGrid = [...grid]
        ;[newGrid[selected], newGrid[index]] = [newGrid[index], newGrid[selected]]
        setGrid(newGrid)
        
        // Check for matches (simplified)
        setTimeout(() => {
          setGrid(prev => {
            const matched = new Set()
            // Check rows
            for (let r = 0; r < 4; r++) {
              for (let c = 0; c < 2; c++) {
                const idx = r * 4 + c
                if (prev[idx]?.icon === prev[idx + 1]?.icon && prev[idx]?.icon === prev[idx + 2]?.icon) {
                  matched.add(idx)
                  matched.add(idx + 1)
                  matched.add(idx + 2)
                }
              }
            }
            // Check columns
            for (let c = 0; c < 4; c++) {
              for (let r = 0; r < 2; r++) {
                const idx = r * 4 + c
                if (prev[idx]?.icon === prev[idx + 4]?.icon && prev[idx]?.icon === prev[idx + 8]?.icon) {
                  matched.add(idx)
                  matched.add(idx + 4)
                  matched.add(idx + 8)
                }
              }
            }
            
            if (matched.size > 0) {
              setGameState(prev => ({
                ...prev,
                score: prev.score + matched.size * 10,
                combo: prev.combo + 1
              }))
              // Replace matched
              const updated = [...prev]
              matched.forEach(i => {
                updated[i] = ingredients[Math.floor(Math.random() * ingredients.length)]
              })
              return updated
            }
            return prev
          })
        }, 300)
      }
      setSelected(null)
    }
  }

  return (
    <div className="cooking-match-game">
      <div className="ingredient-grid">
        {grid.map((cell, i) => (
          <div
            key={i}
            className={`ingredient-cell ${selected === i ? 'selected' : ''}`}
            onClick={() => handleSelect(i)}
          >
            {cell?.icon}
          </div>
        ))}
      </div>
    </div>
  )
}
