import React, { useState, useEffect } from 'react'
import { Heart, Utensils, Gamepad2, Moon, Sparkles, Award, Gift, Home, Activity, Camera, Star, Zap, Lock, Bath, Footprints, TreePine, X } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './VirtualPetPage.css'

const PET_TYPES = [
  { id: 'bear', name: 'Beruang', emoji: '🐻', color: '#8B7355', secondary: '#6B5345', accent: '#A08060', blushColor: '#FFB6C1' },
  { id: 'dog', name: 'Guguk', emoji: '🐶', color: '#D4A574', secondary: '#C49564', accent: '#E0B584', blushColor: '#FFB6C1' },
  { id: 'cat', name: 'Kucing', emoji: '🐱', color: '#C4A584', secondary: '#B49574', accent: '#D4B594', blushColor: '#FFB6C1' },
  { id: 'bunny', name: 'Kelinci', emoji: '🐰', color: '#E8D5C4', secondary: '#D8C5B4', accent: '#F0E0D4', blushColor: '#FFB6C1' },
  { id: 'elephant', name: 'Gajah', emoji: '🐘', color: '#9CA3AF', secondary: '#6B7280', accent: '#B0B8C0', blushColor: '#FFB6C1' }
]

const FOODS = [
  { id: 1, name: 'Apel', cost: 50, icon: '🍎', happy: 10, heal: 5, fill: 15, eatTime: 2000 },
  { id: 2, name: 'Cookie', cost: 75, icon: '🍪', happy: 20, heal: 5, fill: 10, eatTime: 1500 },
  { id: 3, name: 'Ikan', cost: 100, icon: '🐟', happy: 25, heal: 10, fill: 25, eatTime: 2500 },
  { id: 4, name: 'Obat', cost: 150, icon: '💊', happy: 5, heal: 30, fill: 0, eatTime: 1000 },
  { id: 5, name: 'Crown', cost: 200, icon: '👑', happy: 50, heal: 0, fill: 0, eatTime: 500 },
  { id: 6, name: 'Diamond', cost: 500, icon: '💎', happy: 100, heal: 50, fill: 0, eatTime: 500 },
  { id: 7, name: 'Wortel', cost: 60, icon: '🥕', happy: 15, heal: 5, fill: 20, eatTime: 1800 },
  { id: 8, name: 'Pisang', cost: 55, icon: '🍌', happy: 12, heal: 5, fill: 18, eatTime: 1800 },
  { id: 9, name: 'Anggur', cost: 70, icon: '🍇', happy: 18, heal: 8, fill: 15, eatTime: 1500 },
  { id: 10, name: 'Semangka', cost: 80, icon: '🍉', happy: 20, heal: 10, fill: 22, eatTime: 2500 },
  { id: 11, name: 'Roti', cost: 65, icon: '🍞', happy: 15, heal: 5, fill: 20, eatTime: 2000 },
  { id: 12, name: 'Keju', cost: 90, icon: '🧀', happy: 22, heal: 8, fill: 18, eatTime: 1800 },
  { id: 13, name: 'Telur', cost: 85, icon: '🥚', happy: 18, heal: 10, fill: 20, eatTime: 2000 },
  { id: 14, name: 'Daging', cost: 120, icon: '🍖', happy: 28, heal: 12, fill: 30, eatTime: 3000 },
  { id: 15, name: 'Es Krim', cost: 95, icon: '🍦', happy: 30, heal: -5, fill: 15, eatTime: 1500 },
  { id: 16, name: 'Donat', cost: 85, icon: '🍩', happy: 25, heal: 5, fill: 18, eatTime: 1800 },
  { id: 17, name: 'Permen', cost: 40, icon: '🍬', happy: 15, heal: -3, fill: 8, eatTime: 1000 },
  { id: 18, name: 'Coklat', cost: 75, icon: '🍫', happy: 22, heal: 5, fill: 12, eatTime: 1500 },
  { id: 19, name: 'Popcorn', cost: 50, icon: '🍿', happy: 18, heal: 3, fill: 10, eatTime: 2000 },
  { id: 20, name: 'Susu', cost: 70, icon: '🥛', happy: 15, heal: 10, fill: 15, eatTime: 1500 }
]

// CLOTHES with stat bonuses
const CLOTHES = [
  // Shirts with bonuses
  { id: 'shirt_red', name: 'Kaos Merah', cost: 150, icon: '👕', color: '#ef4444', type: 'shirt', bonus: { happiness: 5 } },
  { id: 'shirt_blue', name: 'Kaos Biru', cost: 150, icon: '👕', color: '#3b82f6', type: 'shirt', bonus: { energy: 5 } },
  { id: 'shirt_green', name: 'Kaos Hijau', cost: 150, icon: '👕', color: '#22c55e', type: 'shirt', bonus: { health: 5 } },
  { id: 'shirt_yellow', name: 'Kaos Kuning', cost: 150, icon: '👕', color: '#eab308', type: 'shirt', bonus: { coins: 5 } },
  { id: 'shirt_purple', name: 'Kaos Ungu', cost: 150, icon: '👕', color: '#a855f7', type: 'shirt', bonus: { xp: 5 } },
  { id: 'shirt_pink', name: 'Kaos Pink', cost: 150, icon: '👕', color: '#ec4899', type: 'shirt', bonus: { happiness: 8 } },
  { id: 'shirt_black', name: 'Kaos Hitam', cost: 180, icon: '👕', color: '#1f2937', type: 'shirt', bonus: { energy: 8 } },
  { id: 'shirt_white', name: 'Kaos Putih', cost: 180, icon: '👕', color: '#f3f4f6', type: 'shirt', bonus: { health: 8 } },
  { id: 'shirt_orange', name: 'Kaos Orange', cost: 150, icon: '👕', color: '#f97316', type: 'shirt', bonus: { happiness: 6 } },
  { id: 'shirt_cyan', name: 'Kaos Cyan', cost: 150, icon: '👕', color: '#06b6d4', type: 'shirt', bonus: { energy: 6 } },
  
  // Pajamas - Energy recovery bonus
  { id: 'pajamas_blue', name: 'Piyama Biru', cost: 250, icon: '👔', color: '#60A5FA', type: 'shirt', bonus: { energyRecovery: 50 } },
  { id: 'pajamas_pink', name: 'Piyama Pink', cost: 250, icon: '👔', color: '#F472B6', type: 'shirt', bonus: { energyRecovery: 50 } },
  { id: 'pajamas_white', name: 'Piyama Putih', cost: 280, icon: '👔', color: '#E5E7EB', type: 'shirt', bonus: { energyRecovery: 70 } },
  
  // Sweater - Happiness bonus
  { id: 'sweater_red', name: 'Sweater Merah', cost: 300, icon: '🧥', color: '#DC2626', type: 'shirt', bonus: { happinessGain: 20 } },
  { id: 'sweater_beige', name: 'Sweater Beige', cost: 300, icon: '🧥', color: '#D4C4B0', type: 'shirt', bonus: { happinessGain: 20 } },

  // Bows & Accessories with bonuses
  { id: 'bow_pink', name: 'Pita Pink', cost: 200, icon: '🎀', color: '#ec4899', type: 'accessory', bonus: { happiness: 10, coinBonus: 5 } },
  { id: 'bow_blue', name: 'Pita Biru', cost: 200, icon: '🎀', color: '#3b82f6', type: 'accessory', bonus: { energy: 8, coinBonus: 5 } },
  { id: 'bow_purple', name: 'Pita Ungu', cost: 200, icon: '🎀', color: '#a855f7', type: 'accessory', bonus: { xp: 8, coinBonus: 5 } },
  { id: 'bow_red', name: 'Pita Merah', cost: 200, icon: '🎀', color: '#dc2626', type: 'accessory', bonus: { happiness: 12, coinBonus: 5 } },
  { id: 'hat', name: 'Topi Hitam', cost: 250, icon: '🎩', color: '#1f2937', type: 'accessory', bonus: { moodStability: 15 } },
  { id: 'hat_red', name: 'Topi Merah', cost: 250, icon: '🎩', color: '#dc2626', type: 'accessory', bonus: { moodStability: 15 } },
  { id: 'hat_blue', name: 'Topi Biru', cost: 250, icon: '🎩', color: '#2563eb', type: 'accessory', bonus: { moodStability: 15 } },
  { id: 'glasses', name: 'Kacamata', cost: 180, icon: '👓', color: '#1e293b', type: 'accessory', bonus: { xp: 10 } },
  { id: 'sunglasses', name: 'Kacamata Hitam', cost: 220, icon: '🕶️', color: '#0f172a', type: 'accessory', bonus: { happiness: 15, moodStability: 10 } },
  { id: 'crown', name: 'Mahkota', cost: 500, icon: '👑', color: '#fbbf24', type: 'accessory', bonus: { all: 10, coinBonus: 15 } },
  { id: 'flower', name: 'Bunga', cost: 180, icon: '🌸', color: '#f472b6', type: 'accessory', bonus: { happiness: 15 } },
  { id: 'star', name: 'Bintang', cost: 200, icon: '⭐', color: '#fbbf24', type: 'accessory', bonus: { xp: 12 } },
  { id: 'heart', name: 'Hati', cost: 180, icon: '❤️', color: '#ef4444', type: 'accessory', bonus: { happiness: 18 } },
  { id: 'moon', name: 'Bulan', cost: 200, icon: '🌙', color: '#fcd34d', type: 'accessory', bonus: { energyRecovery: 30 } },
  
  // Special accessories
  { id: 'scarf', name: 'Syal', cost: 280, icon: '🧣', color: '#dc2626', type: 'accessory', bonus: { health: 15, moodStability: 10 } },
  { id: 'tie', name: 'Dasi', cost: 250, icon: '👔', color: '#2563eb', type: 'accessory', bonus: { coins: 15 } },
  { id: 'cape', name: 'Jubah', cost: 350, icon: '🦸', color: '#7c3aed', type: 'accessory', bonus: { energy: 20, xp: 10 } },
  { id: 'wings', name: 'Sayap', cost: 400, icon: '🪽', color: '#ffffff', type: 'accessory', bonus: { happiness: 25, xp: 15 } }
]

// BED items with sleep quality
const BEDS = [
  { id: 'no_bed', name: 'Tanpa Kasur', cost: 0, icon: '', sleepQuality: 1.0 },
  { id: 'basic_bed', name: 'Kasur Biasa', cost: 300, icon: '🛏️', sleepQuality: 1.5 },
  { id: 'cozy_bed', name: 'Kasur Empuk', cost: 600, icon: '🛏️', sleepQuality: 2.0 },
  { id: 'luxury_bed', name: 'Kasur Mewah', cost: 1000, icon: '🛏️', sleepQuality: 2.5 }
]

// ENVIRONMENT themes with layers
const ENVIRONMENTS = [
  { id: 'house', name: 'Rumah', type: 'house', cost: 0,
    bg: { wall: 'linear-gradient(180deg, #F5F5F0 0%, #E8E8E0 100%)', floor: 'linear-gradient(180deg, #D4C4B0 0%, #C4B4A0 100%)' },
    lighting: 'warm' },
  { id: 'bedroom', name: 'Kamar Tidur', type: 'house', cost: 300,
    bg: { wall: 'linear-gradient(180deg, #FFF5E5 0%, #FFE8D0 100%)', floor: 'linear-gradient(180deg, #C4A584 0%, #B49574 100%)' },
    lighting: 'soft' },
  { id: 'forest', name: 'Hutan', type: 'forest', cost: 500,
    bg: { wall: 'linear-gradient(180deg, #A8D5A0 0%, #88C080 50%, #68A860 100%)', floor: 'linear-gradient(180deg, #568050 0%, #487040 100%)' },
    lighting: 'natural' },
  { id: 'garden', name: 'Taman', type: 'garden', cost: 500,
    bg: { wall: 'linear-gradient(180deg, #E5F5FF 0%, #D0EBFF 50%, #C0E0FF 100%)', floor: 'linear-gradient(180deg, #88C080 0%, #78B070 100%)' },
    lighting: 'bright' },
  { id: 'beach', name: 'Pantai', type: 'outdoor', cost: 750,
    bg: { wall: 'linear-gradient(180deg, #87CEEB 0%, #98D8EA 50%, #B0E0E8 100%)', floor: 'linear-gradient(180deg, #F5DEB3 0%, #E8D0A0 100%)' },
    lighting: 'sunny' },
  { id: 'sunset', name: 'Senja', type: 'outdoor', cost: 750,
    bg: { wall: 'linear-gradient(180deg, #FF9A8B 0%, #FF6A88 50%, #FF99AC 100%)', floor: 'linear-gradient(180deg, #D4A574 0%, #C49564 100%)' },
    lighting: 'warm' },
  { id: 'space', name: 'Angkasa', type: 'special', cost: 1000,
    bg: { wall: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', floor: 'linear-gradient(180deg, #2d2d44 0%, #1f1f30 100%)' },
    lighting: 'dim' },
  { id: 'castle', name: 'Istana', type: 'house', cost: 1500,
    bg: { wall: 'linear-gradient(180deg, #F8E8FF 0%, #E8D5FF 50%, #D8C0F0 100%)', floor: 'linear-gradient(180deg, #C4B4D0 0%, #B4A4C0 100%)' },
    lighting: 'elegant' }
]

// NEW: EXPANDED FOOD LIST
const EXPANDED_FOODS = [
  // Fruits
  { id: 1, name: 'Apel', cost: 50, icon: '🍎', happy: 10, heal: 5, fill: 15, eatTime: 2000 },
  { id: 7, name: 'Wortel', cost: 60, icon: '🥕', happy: 15, heal: 5, fill: 20, eatTime: 1800 },
  { id: 8, name: 'Pisang', cost: 55, icon: '🍌', happy: 12, heal: 5, fill: 18, eatTime: 1800 },
  { id: 9, name: 'Anggur', cost: 70, icon: '🍇', happy: 18, heal: 8, fill: 15, eatTime: 1500 },
  { id: 10, name: 'Semangka', cost: 80, icon: '🍉', happy: 20, heal: 10, fill: 22, eatTime: 2500 },
  
  // Baked Goods
  { id: 2, name: 'Cookie', cost: 75, icon: '🍪', happy: 20, heal: 5, fill: 10, eatTime: 1500 },
  { id: 11, name: 'Roti', cost: 65, icon: '🍞', happy: 15, heal: 5, fill: 20, eatTime: 2000 },
  { id: 16, name: 'Donat', cost: 85, icon: '🍩', happy: 25, heal: 5, fill: 18, eatTime: 1800 },
  { id: 21, name: 'Kue', cost: 90, icon: '🍰', happy: 30, heal: 5, fill: 15, eatTime: 2000 },
  { id: 22, name: 'Pastry', cost: 80, icon: '🥐', happy: 22, heal: 3, fill: 16, eatTime: 1800 },
  
  // Meals
  { id: 3, name: 'Ikan', cost: 100, icon: '🐟', happy: 25, heal: 10, fill: 25, eatTime: 2500 },
  { id: 14, name: 'Daging', cost: 120, icon: '🍖', happy: 28, heal: 12, fill: 30, eatTime: 3000 },
  { id: 23, name: 'Nasi', cost: 70, icon: '🍚', happy: 15, heal: 5, fill: 25, eatTime: 2000 },
  { id: 24, name: 'Mie', cost: 85, icon: '🍜', happy: 20, heal: 5, fill: 28, eatTime: 2500 },
  { id: 25, name: 'Sup', cost: 75, icon: '🍲', happy: 18, heal: 15, fill: 20, eatTime: 2500 },
  { id: 26, name: 'Pizza', cost: 110, icon: '🍕', happy: 30, heal: -5, fill: 25, eatTime: 2500 },
  
  // Snacks
  { id: 12, name: 'Keju', cost: 90, icon: '🧀', happy: 22, heal: 8, fill: 18, eatTime: 1800 },
  { id: 13, name: 'Telur', cost: 85, icon: '🥚', happy: 18, heal: 10, fill: 20, eatTime: 2000 },
  { id: 19, name: 'Popcorn', cost: 50, icon: '🍿', happy: 18, heal: 3, fill: 10, eatTime: 2000 },
  { id: 27, name: 'Keripik', cost: 45, icon: '🍟', happy: 15, heal: -5, fill: 12, eatTime: 1500 },
  
  // Sweets
  { id: 15, name: 'Es Krim', cost: 95, icon: '🍦', happy: 30, heal: -5, fill: 15, eatTime: 1500 },
  { id: 17, name: 'Permen', cost: 40, icon: '🍬', happy: 15, heal: -3, fill: 8, eatTime: 1000 },
  { id: 18, name: 'Coklat', cost: 75, icon: '🍫', happy: 22, heal: 5, fill: 12, eatTime: 1500 },
  
  // Drinks
  { id: 20, name: 'Susu', cost: 70, icon: '🥛', happy: 15, heal: 10, fill: 15, eatTime: 1500 },
  { id: 28, name: 'Jus', cost: 65, icon: '🧃', happy: 18, heal: 8, fill: 12, eatTime: 1200 },
  { id: 29, name: 'Teh', cost: 55, icon: '🍵', happy: 12, heal: 5, fill: 8, eatTime: 1000 },
  { id: 30, name: 'Kopi', cost: 60, icon: '☕', happy: 10, heal: 3, fill: 5, eatTime: 1000 }
]

// Merge with existing FOODS
const ALL_FOODS = [...FOODS, ...EXPANDED_FOODS.filter(f => !FOODS.find(existing => existing.id === f.id))]

// NEW: BATHTUBS
const BATHTUBS = [
  { id: 'none', name: 'Tanpa Bathtub', cost: 0, icon: '', size: 1.0 },
  { id: 'small_tub', name: 'Bathtub Kecil', cost: 200, icon: '🛁', size: 1.2 },
  { id: 'medium_tub', name: 'Bathtub Sedang', cost: 400, icon: '🛁', size: 1.5 },
  { id: 'large_tub', name: 'Bathtub Besar', cost: 600, icon: '🛁', size: 1.8 }
]

// NEW: USER MOODS
const USER_MOODS = [
  { id: 'happy', name: 'Happy', icon: '😊', color: '#4ade80', petBonus: { happiness: 10, fun: 5 } },
  { id: 'tired', name: 'Tired', icon: '😴', color: '#a78bfa', petBonus: { energy: -5 } },
  { id: 'calm', name: 'Calm', icon: '😌', color: '#60a5fa', petBonus: { happiness: 5 } },
  { id: 'stressed', name: 'Stressed', icon: '😫', color: '#f97316', petBonus: { happiness: -5, energy: -5 } },
  { id: 'productive', name: 'Productive', icon: '💪', color: '#fbbf24', petBonus: { happiness: 8, xp: 10 } }
]

// NEW: MUSIC TRACKS
const MUSIC_TRACKS = [
  { id: 'lofi', name: 'Lofi Beats', icon: '🎵', mood: 'calm' },
  { id: 'rain', name: 'Rain Sounds', icon: '🌧️', mood: 'calm' },
  { id: 'piano', name: 'Cozy Piano', icon: '🎹', mood: 'cozy' },
  { id: 'cafe', name: 'Cafe Ambience', icon: '☕', mood: 'cheerful' },
  { id: 'nature', name: 'Nature Sounds', icon: '🌿', mood: 'calm' }
]

const MINIGAMES = [
  { id: 'whack', name: 'Pukul Mole', icon: '🔨', difficulty: 0.6, duration: 20, target: 10 },
  { id: 'memory', name: 'Memory Card', icon: '🃏', difficulty: 0.5, duration: 90, target: 4 },
  { id: 'bubble', name: 'Pecah Bubble', icon: '🫧', difficulty: 0.6, duration: 18, target: 12 }
]

const EVOLUTION_STAGES = {
  1: { stage: 'baby', name: 'Baby', size: 0.85 },
  5: { stage: 'child', name: 'Child', size: 1.0 },
  10: { stage: 'adult', name: 'Adult', size: 1.1 }
}

export default function VirtualPetPage() {
  const navigate = useNavigate()

  const [pet, setPet] = useState({
    type: 'bear',
    name: 'Mochi',
    level: 1,
    xp: 0,
    xpToNext: 100,
    happiness: 80,
    hunger: 50,
    energy: 80,
    fun: 70,
    health: 100,
    hygiene: 100,
    coins: 500,
    foods: [],
    clothes: [],
    equippedClothes: [],
    equippedAccessories: [],
    roomTheme: 'default',
    environment: 'house',
    unlockedThemes: ['default'],
    unlockedEnvironments: ['house'],
    photos: [],
    isSick: false,
    isSleeping: false,
    sleepRotation: 0,
    isWalking: false,
    walkPosition: 50,
    selectedBed: 'no_bed',
    furniture: [],
    lighting: 'warm',
    
    // NEW: Planner System
    dailyTasks: [],
    habits: [],
    moodLogs: [],
    journalEntries: [],
    studySessions: [],
    userMood: 'calm',
    
    // NEW: Pet Visual State
    currentExpression: 'normal',
    eyeState: 'open',
    isBlinking: false,
    sicknessLevel: 0,
    
    // NEW: Music
    musicEnabled: false,
    musicTrack: 'lofi',
    volume: 0.5,
    
    // NEW: Bath
    selectedBathtub: 'none',
    isBathing: false
  })

  // NEW: Eating animation state
  const [eatingState, setEatingState] = useState({
    isEating: false,
    foodItem: null,
    appleSize: 1,
    mouthOpen: false
  })

  // NEW: Blush visibility based on happiness
  const [showBlush, setShowBlush] = useState(false)
  
  // NEW: Mini game state
  const [miniGame, setMiniGame] = useState({
    active: false,
    type: null,
    score: 0,
    reward: 0
  })
  
  // NEW: Music state
  const [musicState, setMusicState] = useState({
    enabled: false,
    track: 'lofi',
    volume: 0.5
  })
  
  const [animation, setAnimation] = useState(null)
  const [message, setMessage] = useState('')
  const [showShop, setShowShop] = useState(false)
  const [shopTab, setShopTab] = useState('food')
  const [showPetSelect, setShowPetSelect] = useState(false)
  const [showMinigame, setShowMinigame] = useState(false)
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameResult, setGameResult] = useState(null)
  const [petExpression, setPetExpression] = useState('normal')
  const [particles, setParticles] = useState([])
  const [dayCount, setDayCount] = useState(1)
  const [showRename, setShowRename] = useState(false)
  const [newName, setNewName] = useState('')
  const [showRoom, setShowRoom] = useState(false)
  const [showPhotos, setShowPhotos] = useState(false)
  const [viewMode, setViewMode] = useState('pet')
  
  // Minigame states
  const [whackGame, setWhackGame] = useState({ score: 0, timeLeft: 20, clicked: [], activeMoles: [], round: 1, totalRounds: 3 })
  const [memoryGame, setMemoryGame] = useState({ cards: [], flipped: [], matched: [], moves: 0, round: 1, totalRounds: 3, isProcessing: false })
  const [bubbleGame, setBubbleGame] = useState({ bubbles: [], score: 0, timeLeft: 18, round: 1, totalRounds: 3 })

  const getEvolutionStage = (level) => {
    if (level >= 10) return EVOLUTION_STAGES[10]
    if (level >= 5) return EVOLUTION_STAGES[5]
    return EVOLUTION_STAGES[1]
  }

  const evolutionStage = getEvolutionStage(pet.level)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('virtualPet')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPet({ ...pet, ...parsed })
        setNewName(parsed.name || 'Mochi')
      } catch (e) {
        console.error('Failed to load pet:', e)
      }
    } else {
      setNewName('Mochi')
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('virtualPet', JSON.stringify(pet))
  }, [pet])

  // Day counter
  useEffect(() => {
    const timer = setInterval(() => setDayCount(d => d + 1), 60000 * 60)
    return () => clearInterval(timer)
  }, [])

  // Decay stats with CLOTHES/ACCESSORIES bonuses & IMPROVED SLEEP & SICKNESS
  useEffect(() => {
    const timer = setInterval(() => {
      setPet(p => {
        // Calculate bonuses from equipped items
        const bonuses = calculateItemBonuses(p.equippedClothes, p.equippedAccessories)

        // Get sleep quality multiplier from bed
        const bed = BEDS.find(b => b.id === p.selectedBed) || BEDS[0]
        const sleepQuality = bed.sleepQuality || 1.0

        const newHunger = Math.min(100, p.hunger + 0.3)

        // IMPROVED: Energy recovery with sleep quality multiplier and pajamas bonus
        const energyRecoveryBonus = bonuses.energyRecovery || 0
        const newEnergy = p.isSleeping
          ? Math.min(100, p.energy + (0.5 * sleepQuality) + (energyRecoveryBonus / 100))
          : Math.max(0, p.energy - 0.15)

        const newFun = Math.max(0, p.fun - 0.5)
        const newHygiene = Math.max(0, p.hygiene - 0.1)

        // IMPROVED: Happiness decay with mood stability bonus
        const moodStability = bonuses.moodStability || 0
        const happinessDecay = 0.15 - (moodStability / 100)
        let newHappiness = p.happiness - Math.max(0.05, happinessDecay)

        let newHealth = p.health
        let isSick = p.isSick
        let sicknessLevel = p.sicknessLevel || 0

        // NEW: ENHANCED SICKNESS SYSTEM
        // Calculate sickness risk from multiple factors
        const sicknessRisk = (
          (newHunger > 90 ? 0.3 : 0) +
          (newHygiene < 30 ? 0.3 : 0) +
          (newEnergy < 20 ? 0.2 : 0) +
          (newHealth < 50 ? 0.2 : 0)
        )

        // Chance to get sick if risk is high
        if (sicknessRisk > 0.5 && !isSick && Math.random() < 0.05) {
          isSick = true
          sicknessLevel = 1
          newHealth = Math.max(0, p.health - 5)
          showMessage('😷 ' + p.name + ' got sick! Needs medicine!')
        }

        // Sickness progression
        if (isSick) {
          // Gradual health drain (slower with higher sickness level)
          const drain = 0.5 * (1 - sicknessLevel * 0.1)
          newHealth = Math.max(0, newHealth - drain)
          newHappiness = Math.max(0, newHappiness - 0.3)
          
          // Chance to recover naturally
          if (newHealth > 80 && Math.random() < 0.1) {
            isSick = false
            sicknessLevel = 0
            showMessage('✨ ' + p.name + ' recovered!')
          }
        }

        // NEW: Update blush visibility based on happiness
        setShowBlush(p.happiness > 70 && !isSick)

        // Update expression based on stats
        if (isSick) setPetExpression('sick')
        else if (newHunger > 90) setPetExpression('hungry')
        else if (newEnergy < 20) setPetExpression('tired')
        else if (newHygiene < 30) setPetExpression('dirty')
        else if (newHappiness < 30) setPetExpression('sad')
        else if (newHappiness > 80) setPetExpression('happy')
        else setPetExpression('normal')

        const isSleeping = p.isSleeping && newEnergy >= 100 ? false : p.isSleeping

        return {
          ...p, hunger: newHunger, energy: newEnergy, fun: newFun, hygiene: newHygiene,
          happiness: Math.max(0, Math.min(100, newHappiness)),
          health: newHealth, isSick, isSleeping, sicknessLevel
        }
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // NEW: Blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      // Don't blink when sleeping or sick
      if (pet.isSleeping || pet.isSick) return
      
      setPet(p => ({ ...p, isBlinking: true }))
      setTimeout(() => {
        setPet(p => ({ ...p, isBlinking: false }))
      }, 200)
    }, 4000)  // Blink every 4 seconds
    
    return () => clearInterval(blinkInterval)
  }, [pet.isSleeping, pet.isSick])

  // NEW: Helper function to calculate item bonuses
  const calculateItemBonuses = (equippedClothes, equippedAccessories) => {
    const bonuses = {
      happiness: 0,
      energy: 0,
      health: 0,
      coins: 0,
      xp: 0,
      energyRecovery: 0,
      happinessGain: 0,
      moodStability: 0,
      coinBonus: 0
    }
    
    // Add bonuses from clothes
    equippedClothes?.forEach(item => {
      const clothesItem = CLOTHES.find(c => c.id === item.id)
      if (clothesItem?.bonus) {
        Object.entries(clothesItem.bonus).forEach(([key, value]) => {
          bonuses[key] = (bonuses[key] || 0) + value
        })
      }
    })
    
    // Add bonuses from accessories
    equippedAccessories?.forEach(item => {
      const accItem = CLOTHES.find(c => c.id === item.id)
      if (accItem?.bonus) {
        Object.entries(accItem.bonus).forEach(([key, value]) => {
          bonuses[key] = (bonuses[key] || 0) + value
        })
      }
    })
    
    return bonuses
  }

  // Level up & evolution
  useEffect(() => {
    if (pet.xp >= pet.xpToNext) {
      const newLevel = pet.level + 1
      const newStage = getEvolutionStage(newLevel)
      const oldStage = getEvolutionStage(pet.level)
      
      setPet(p => ({
        ...p, 
        level: newLevel, 
        xp: p.xp - p.xpToNext,
        xpToNext: Math.floor(p.xpToNext * 1.5), 
        coins: p.coins + 50, 
        health: 100
      }))
      
      if (newStage.stage !== oldStage.stage) {
        showMessage(`🎉 ${pet.name} evolved to ${newStage.name}!`)
        createParticles('evolution')
      } else {
        showMessage('🎉 Level Up! +50 coins! Full heal!')
        createParticles('levelup')
      }
    }
  }, [pet.xp, pet.xpToNext])

  // Walking animation
  useEffect(() => {
    if (pet.isWalking) {
      const interval = setInterval(() => {
        setPet(p => ({
          ...p,
          walkPosition: p.walkPosition + (Math.random() > 0.5 ? 5 : -5)
        }))
      }, 500)
      return () => clearInterval(interval)
    }
  }, [pet.isWalking])

  const createParticles = (type) => {
    const newParticles = []
    const count = type === 'evolution' ? 30 : type === 'levelup' ? 20 : 10
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: type === 'evolution' ? '✨' : type === 'levelup' ? '⭐' : type === 'heart' ? '❤️' : type === 'bubble' ? '🫧' : '✨',
        type
      })
    }
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2500)
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2500)
  }

  const handleAction = (action) => {
    if (pet.isSleeping && action !== 'rest') {
      showMessage('💤 ' + pet.name + ' is sleeping!')
      return
    }

    const effects = {
      feed: { hunger: -30, happiness: 10, energy: -5, fun: 5, xp: 10, coins: 5 },
      play: { hunger: 10, happiness: 20, energy: -15, fun: 25, xp: 15, coins: 8 },
      rest: { hunger: 5, happiness: 5, energy: 30, fun: -10, xp: 5, coins: 2 },
      train: { hunger: 15, happiness: -5, energy: -20, fun: 10, xp: 25, coins: 10 }
    }

    const e = effects[action]
    
    if (pet.energy < 10 && action !== 'rest') {
      showMessage('😴 Too tired! Rest first.')
      setPetExpression('tired')
      setAnimation('tired')
      setTimeout(() => { setAnimation(null); updateExpression() }, 1000)
      return
    }

    if (pet.health < 30 && action === 'play') {
      showMessage('🏥 Too sick to play!')
      setPetExpression('sad')
      return
    }

    setPet(p => ({
      ...p,
      hunger: Math.max(0, Math.min(100, p.hunger + e.hunger)),
      energy: Math.max(0, Math.min(100, p.energy + e.energy)),
      fun: Math.max(0, Math.min(100, p.fun + e.fun)),
      happiness: Math.max(0, Math.min(100, p.happiness + e.happiness)),
      xp: p.xp + e.xp,
      coins: p.coins + e.coins,
      health: Math.max(0, Math.min(100, p.health + (action === 'rest' && p.isSick ? 5 : 0))),
      isSick: p.isSick && p.health < 50 ? true : false
    }))

    const anims = { feed: 'eat', play: 'happy', rest: 'sleep', train: 'train' }
    setAnimation(anims[action])
    setTimeout(() => setAnimation(null), 1500)

    const msgs = { feed: 'Yum! +5 coins 🍽️', play: 'Fun! +8 coins 🎾', rest: 'Rest! +2 coins 💤', train: 'Train! +10 coins 💪' }
    showMessage(msgs[action])
    updateExpression()
  }

  const updateExpression = () => {
    if (pet.happiness >= 80) setPetExpression('happy')
    else if (pet.happiness <= 30) setPetExpression('sad')
    else setPetExpression('normal')
  }

  // NEW: IMPROVED BATH SYSTEM with bathtub
  const takeBath = () => {
    if (pet.isSick) {
      showMessage('😷 Too sick for bath!')
      return
    }
    if (pet.hygiene >= 100) {
      showMessage('Already clean!')
      return
    }
    
    // Check if bathtub exists
    const hasBathtub = pet.selectedBathtub !== 'none'
    
    setPet(p => ({ ...p, isBathing: true }))
    setAnimation('bathing')
    
    // Bath animation sequence
    setTimeout(() => {
      const bathtubBonus = pet.selectedBathtub === 'large_tub' ? 15 : pet.selectedBathtub === 'medium_tub' ? 10 : 5
      setPet(p => ({
        ...p,
        hygiene: 100,
        happiness: Math.min(100, p.happiness + 10 + bathtubBonus),
        health: Math.min(100, p.health + 5),
        isBathing: false
      }))
      showMessage(`🛁 So clean and fresh! +${10 + bathtubBonus} happy!`)
      createParticles('bubble')
      setAnimation(null)
    }, 3000)
  }

  // NEW: PLANNER SYSTEM FUNCTIONS
  const addTask = (task) => {
    setPet(p => ({
      ...p,
      dailyTasks: [...p.dailyTasks, { ...task, id: Date.now(), completed: false }]
    }))
    showMessage('📝 Task added!')
  }

  const completeTask = (taskId) => {
    const task = pet.dailyTasks.find(t => t.id === taskId)
    if (!task || task.completed) return
    
    const difficulty = task.difficulty || 1
    const coinReward = difficulty * 10
    const xpReward = difficulty * 15
    
    setPet(p => ({
      ...p,
      dailyTasks: p.dailyTasks.map(t => t.id === taskId ? { ...t, completed: true } : t),
      happiness: Math.min(100, p.happiness + difficulty * 5),
      coins: p.coins + coinReward,
      xp: p.xp + xpReward
    }))
    
    setAnimation('celebrate')
    showMessage(`✅ Task completed! +${coinReward} coins, +${xpReward} XP!`)
    createParticles('sparkle')
  }

  const logMood = (moodId) => {
    const mood = USER_MOODS.find(m => m.id === moodId)
    if (!mood) return
    
    setPet(p => ({
      ...p,
      moodLogs: [...p.moodLogs, { mood: moodId, timestamp: Date.now() }],
      userMood: moodId,
      happiness: Math.min(100, p.happiness + (mood.petBonus.happiness || 0)),
      energy: Math.max(0, p.energy + (mood.petBonus.energy || 0)),
      fun: Math.min(100, p.fun + (mood.petBonus.fun || 0)),
      xp: p.xp + (mood.petBonus.xp || 0)
    }))
    
    showMessage(`${mood.icon} Mood logged!`)
  }

  const addJournalEntry = (entry) => {
    setPet(p => ({
      ...p,
      journalEntries: [...p.journalEntries, { ...entry, id: Date.now(), timestamp: Date.now() }]
    }))
    setPet(p => ({ ...p, happiness: Math.min(100, p.happiness + 5) }))
    showMessage('📔 Journal saved! +5 happy!')
  }

  const completeStudySession = (duration) => {
    const coinReward = Math.floor(duration / 25) * 20
    
    setPet(p => ({
      ...p,
      studySessions: [...p.studySessions, { duration, timestamp: Date.now() }],
      coins: p.coins + coinReward,
      happiness: Math.min(100, p.happiness + 5),
      energy: Math.max(0, p.energy - 10)
    }))
    
    showMessage(`📚 Study session complete! +${coinReward} coins!`)
    createParticles('sparkle')
  }

  const toggleWalk = () => {
    setPet(p => ({ ...p, isWalking: !p.isWalking, energy: p.energy - 5 }))
    showMessage(pet.isWalking ? 'Stopped walking!' : 'Walking around! -5 energy')
  }

  const buyItem = (item, type) => {
    if (pet.coins >= item.cost) {
      if (type === 'food') {
        if (pet.foods.find(i => i.id === item.id)) {
          showMessage('❌ Already owned!')
          return
        }
        setPet(p => ({
          ...p,
          coins: p.coins - item.cost,
          foods: [...p.foods, { ...item, boughtAt: Date.now() }]
        }))
        showMessage(`🎁 Bought ${item.name}!`)
        createParticles('heart')
      } else if (type === 'clothes') {
        if (pet.clothes.find(i => i.id === item.id)) {
          showMessage('❌ Already owned!')
          return
        }
        setPet(p => ({
          ...p,
          coins: p.coins - item.cost,
          clothes: [...p.clothes, { ...item, boughtAt: Date.now() }]
        }))
        showMessage(`🎁 Bought ${item.name}!`)
        createParticles('heart')
      } else if (type === 'bed') {
        setPet(p => ({
          ...p,
          coins: p.coins - item.cost,
          selectedBed: item.id
        }))
        showMessage(`🎁 Bought ${item.name}! +${Math.round((item.sleepQuality - 1) * 100)}% energy boost!`)
        createParticles('sparkle')
      } else if (type === 'bathtub') {
        setPet(p => ({
          ...p,
          coins: p.coins - item.cost,
          selectedBathtub: item.id
        }))
        showMessage(`🎁 Bought ${item.name}! Bath time improved!`)
        createParticles('sparkle')
      } else if (type === 'environment') {
        setPet(p => ({
          ...p,
          coins: p.coins - item.cost,
          environment: item.id,
          lighting: item.lighting
        }))
        showMessage(`🎁 Changed to ${item.name}!`)
        createParticles('sparkle')
      } else if (type === 'medicine') {
        if (pet.isSick) {
          setPet(p => ({
            ...p,
            coins: p.coins - item.cost,
            isSick: false,
            sicknessLevel: 0,
            health: Math.min(100, p.health + 30)
          }))
          showMessage(`💊 Medicine used! +30 health!`)
          setAnimation('heal')
          createParticles('sparkle')
        } else {
          showMessage('Not sick yet!')
        }
      }
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  // NEW: Music controls
  const toggleMusic = () => {
    setMusicState(m => ({ ...m, enabled: !m.enabled }))
    showMessage(musicState.enabled ? '🎵 Music paused' : '🎵 Music playing')
  }

  const changeMusicTrack = (trackId) => {
    setMusicState(m => ({ ...m, track: trackId }))
  }

  const setMusicVolume = (vol) => {
    setMusicState(m => ({ ...m, volume: vol }))
  }

  const buyRoomTheme = (theme) => {
    if (pet.unlockedThemes.includes(theme.id)) {
      setPet(p => ({ ...p, roomTheme: theme.id }))
      showMessage(`Room changed to ${theme.name}!`)
      return
    }
    if (pet.coins >= theme.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - theme.cost,
        roomTheme: theme.id,
        unlockedThemes: [...p.unlockedThemes, theme.id]
      }))
      showMessage(`🏠 Unlocked ${theme.name} room!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  // NEW: IMPROVED EATING with apple animation and chewing
  const useFood = (food) => {
    if (!pet.foods.find(f => f.id === food.id)) return
    if (pet.isSleeping) {
      showMessage('💤 Too sleepy to eat!')
      return
    }

    // Start eating animation
    setEatingState({
      isEating: true,
      foodItem: food,
      appleSize: 1,
      mouthOpen: true
    })
    setAnimation('eating')
    setPetExpression('happy')

    // Animate apple decreasing
    const eatTime = food.eatTime || 2000
    const biteInterval = 200
    let size = 1
    const interval = setInterval(() => {
      size -= 0.1
      setEatingState(prev => ({ ...prev, appleSize: size, mouthOpen: !prev.mouthOpen }))
      
      if (size <= 0.2) {
        clearInterval(interval)
        
        // Finish eating
        setTimeout(() => {
          setEatingState({ isEating: false, foodItem: null, appleSize: 0, mouthOpen: false })
          setAnimation(null)
          
          // Apply food effects with bonuses
          const bonuses = calculateItemBonuses(pet.equippedClothes, pet.equippedAccessories)
          const happinessGain = bonuses.happinessGain || 0
          
          setPet(p => ({
            ...p,
            hunger: Math.max(0, p.hunger - (food.fill || 0)),
            happiness: Math.min(100, p.happiness + (food.happy || 0) + happinessGain),
            health: Math.min(100, p.health + (food.heal || 0)),
            foods: p.foods.filter(f => f.id !== food.id),
            isSick: p.isSick && p.health + (food.heal || 0) >= 50 ? false : p.isSick,
            coins: p.coins + 5 + (bonuses.coinBonus || 0)
          }))
          
          showMessage(`😋 Yummy! ${food.name}! +${5 + (bonuses.coinBonus || 0)} coins`)
          createParticles('heart')
          updateExpression()
        }, 500)
      }
    }, biteInterval)
  }

  const equipClothes = (clothe) => {
    if (!pet.clothes.find(c => c.id === clothe.id)) return
    setPet(p => {
      const equipped = p.equippedClothes.filter(c => c.type !== clothe.type)
      return { ...p, equippedClothes: [...equipped, clothe] }
    })
    showMessage(`👕 Equipped ${clothe.name}!`)
    createParticles('sparkle')
  }

  const unequipClothes = (type) => {
    setPet(p => ({ ...p, equippedClothes: p.equippedClothes.filter(c => c.type !== type) }))
    showMessage('Unequipped!')
  }

  const takePhoto = () => {
    const photo = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      pet: { ...pet },
      expression: petExpression,
      evolution: evolutionStage.stage
    }
    setPet(p => ({ ...p, photos: [photo, ...p.photos].slice(0, 50) }))
    showMessage('📸 Photo saved!')
    createParticles('sparkle')
  }

  const changePet = (type) => {
    setPet(p => ({ ...p, type: type.id, name: type.name }))
    setNewName(type.name)
    setShowPetSelect(false)
    showMessage(`Pet changed to ${type.name}!`)
  }

  const handleRename = () => {
    if (newName.trim()) {
      setPet(p => ({ ...p, name: newName.trim() }))
      setShowRename(false)
      showMessage(`Renamed to ${newName.trim()}!`)
    }
  }

  // Minigame Functions
  const playMinigame = (game) => {
    setSelectedGame(game)
    setShowMinigame(true)
    setGameResult(null)
    
    if (game.id === 'whack') {
      setWhackGame({ score: 0, timeLeft: game.duration, clicked: [], activeMoles: [], round: 1, totalRounds: 3 })
      startWhackGame(game.duration)
    } else if (game.id === 'memory') {
      startMemoryGame()
    } else if (game.id === 'bubble') {
      setBubbleGame({ bubbles: [], score: 0, timeLeft: game.duration, round: 1, totalRounds: 3 })
      startBubbleGame(game.duration)
    }
  }

  // Whack Game - FASTER, MORE MOLES, NO SCROLL
  const startWhackGame = (duration) => {
    const moleInterval = setInterval(() => {
      setWhackGame(prev => {
        if (prev.timeLeft <= 0) return prev
        const newActiveMoles = prev.activeMoles.filter(m => Date.now() - m.time < 800)  // Faster disappear
        if (Math.random() < 0.85 && newActiveMoles.length < 6) {  // More moles (max 6 instead of 4)
          const pos = Math.floor(Math.random() * 9)
          if (!newActiveMoles.find(m => m.pos === pos)) {
            newActiveMoles.push({ pos, time: Date.now(), id: Date.now() })
          }
        }
        return { ...prev, activeMoles: newActiveMoles }
      })
    }, 400)  // Faster spawn rate (400ms instead of 600ms)

    const timerInterval = setInterval(() => {
      setWhackGame(prev => {
        if (prev.timeLeft <= 0) {
          clearInterval(timerInterval)
          clearInterval(moleInterval)
          if (prev.score >= 15) {  // Higher target
            if (prev.round < prev.totalRounds) {
              setWhackGame({ score: 0, timeLeft: duration, clicked: [], activeMoles: [], round: prev.round + 1, totalRounds: prev.totalRounds })
              startWhackGame(duration)
              return prev
            } else {
              endMinigame(true, prev.score)
              return prev
            }
          } else {
            endMinigame(false, prev.score)
            return prev
          }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)
  }

  const whackMole = (pos) => {
    setWhackGame(prev => {
      const mole = prev.activeMoles.find(m => m.pos === pos)
      if (mole && !prev.clicked.includes(pos)) {
        return { 
          ...prev, 
          score: prev.score + 1, 
          clicked: [...prev.clicked, pos],
          activeMoles: prev.activeMoles.filter(m => m.pos !== pos)
        }
      }
      return prev
    })
  }

  // Memory Game
  const startMemoryGame = () => {
    const emojis = ['🐾', '🦴', '🐟', '🥕', '🐾', '🦴', '🐟', '🥕']
    const shuffled = emojis.sort(() => Math.random() - 0.5)
    setMemoryGame({ cards: shuffled, flipped: [], matched: [], moves: 0, round: 1, totalRounds: 3, isProcessing: false })
  }

  const flipCard = (index) => {
    if (memoryGame.isProcessing || memoryGame.flipped.length >= 2 || memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) return
    
    setMemoryGame(prev => {
      const newFlipped = [...prev.flipped, index]
      if (newFlipped.length === 2) {
        const [first, second] = newFlipped
        if (prev.cards[first] === prev.cards[second]) {
          prev.isProcessing = true
          setTimeout(() => {
            setMemoryGame(p => {
              const newMatched = [...p.matched, first, second]
              if (newMatched.length === 8) {
                if (p.round < p.totalRounds) {
                  const emojis = ['🐾', '🦴', '🐟', '🥕', '🐾', '🦴', '🐟', '🥕']
                  const shuffled = emojis.sort(() => Math.random() - 0.5)
                  return { cards: shuffled, flipped: [], matched: [], moves: p.moves + 1, round: p.round + 1, totalRounds: p.totalRounds, isProcessing: false }
                } else {
                  endMinigame(true, p.moves)
                  return { ...p, isProcessing: false }
                }
              }
              return { ...p, matched: newMatched, flipped: [], isProcessing: false }
            })
          }, 500)
        } else {
          prev.isProcessing = true
          setTimeout(() => setMemoryGame(p => ({ ...p, flipped: [], isProcessing: false })), 1000)
        }
        return { ...prev, flipped: newFlipped, moves: prev.moves + 1, isProcessing: true }
      }
      return { ...prev, flipped: newFlipped }
    })
  }

  // Bubble Game - SUPER FAST & LOTS OF BUBBLES
  const startBubbleGame = (duration) => {
    const bubbleInterval = setInterval(() => {
      setBubbleGame(prev => {
        if (prev.timeLeft <= 0) return prev
        const newBubbles = prev.bubbles.filter(b => b.y > -10).map(b => ({ ...b, y: b.y - 8 }))  // SUPER FAST: -8 (was -5)
        if (Math.random() < 0.9 && newBubbles.length < 15) {  // LOTS: max 15 (was 10), spawn rate 0.9 (was 0.7)
          newBubbles.push({ x: Math.random() * 80 + 10, y: 100, id: Date.now(), size: Math.random() * 20 + 30 })
        }
        return { ...prev, bubbles: newBubbles }
      })
    }, 300)  // SUPER FAST spawn: 300ms (was 500ms)

    const timerInterval = setInterval(() => {
      setBubbleGame(prev => {
        if (prev.timeLeft <= 0) {
          clearInterval(timerInterval)
          clearInterval(bubbleInterval)
          if (prev.score >= 30) {  // Higher target for more bubbles
            if (prev.round < prev.totalRounds) {
              setBubbleGame({ bubbles: [], score: 0, timeLeft: duration, round: prev.round + 1, totalRounds: prev.totalRounds })
              startBubbleGame(duration)
              return prev
            } else {
              endMinigame(true, prev.score)
              return prev
            }
          } else {
            endMinigame(false, prev.score)
            return prev
          }
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)
  }

  const popBubble = (id) => {
    setBubbleGame(prev => ({
      ...prev,
      score: prev.score + 1,
      bubbles: prev.bubbles.filter(b => b.id !== id)
    }))
    createParticles('bubble')
  }

  const endMinigame = (won, extraData) => {
    setGameResult(won ? 'win' : 'lose')
    if (won) {
      setPet(p => ({ ...p, xp: p.xp + 30, coins: p.coins + 25, happiness: Math.min(100, p.happiness + 25), fun: Math.min(100, p.fun + 30) }))
      showMessage(`🎉 Won! +30XP +25coins!`)
      createParticles('win')
    } else {
      setPet(p => ({ ...p, happiness: Math.max(0, p.happiness - 5) }))
      showMessage('😢 Lost! Try again!')
    }
    setTimeout(() => { setShowMinigame(false); setSelectedGame(null); setGameResult(null) }, 2500)
  }

  const healPet = () => {
    if (pet.health >= 100 && !pet.isSick) { showMessage('Already healthy!'); return }
    if (pet.coins >= 20) {
      setPet(p => ({ ...p, health: Math.min(100, p.health + 30), coins: p.coins - 20, isSick: p.health + 30 >= 50 ? false : p.isSick }))
      showMessage(`💖 Healed! +30 health! -20 coins`)
      createParticles('heart')
      setPetExpression('happy')
    } else { showMessage('❌ Not enough coins!') }
  }

  // IMPROVED: Sleep with bed positioning and rotation
  const toggleSleep = () => {
    const willSleep = !pet.isSleeping
    
    // If going to sleep, check if bed exists and snap to position
    let sleepRotation = 0
    if (willSleep) {
      const bed = BEDS.find(b => b.id === pet.selectedBed)
      if (bed && bed.id !== 'no_bed') {
        sleepRotation = 15 // Slight rotation when sleeping on bed
        showMessage(`🛏️ Sleeping on ${bed.name}! +${Math.round((bed.sleepQuality - 1) * 100)}% energy boost!`)
      } else {
        showMessage('🌙 Going to sleep... (no bed - slower recovery)')
      }
    } else {
      showMessage('☀️ Woke up!')
    }
    
    setPet(p => ({ 
      ...p, 
      isSleeping: willSleep,
      sleepRotation: willSleep ? sleepRotation : 0
    }))
    setAnimation(willSleep ? 'sleep' : null)
  }

  const getExpression = () => {
    if (pet.health < 30) return { emoji: '🤒', text: 'Sick', color: '#ef4444' }
    if (pet.hygiene < 30) return { emoji: '🤢', text: 'Dirty', color: '#f97316' }
    if (petExpression === 'angry') return { emoji: '😠', text: 'Angry', color: '#f97316' }
    if (petExpression === 'sad') return { emoji: '😢', text: 'Sad', color: '#60a5fa' }
    if (petExpression === 'happy') return { emoji: '😄', text: 'Happy', color: '#4ade80' }
    if (petExpression === 'tired') return { emoji: '😴', text: 'Tired', color: '#a78bfa' }
    return { emoji: '😊', text: 'Normal', color: '#4ade80' }
  }

  const expression = getExpression()

  const StatBar = ({ icon: Icon, value, color, label, showHygiene }) => (
    <div className="stat-bar">
      <div className="stat-header">
        <Icon size={16} />
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  )

  return (
    <div className="virtual-pet-page">
      <nav className="pet-top-nav">
        <div className="pet-nav-container">
          <button className="pet-nav-btn" onClick={() => navigate('/dashboard')}><Home size={20} /><span>Home</span></button>
          <h1>🐾 Virtual Pet</h1>
          <div className="pet-stats-mini">
            <span className="mini-stat">💰 {pet.coins}</span>
            <span className="mini-stat">❤️ {pet.health}%</span>
            <span className="mini-stat">📅 Day {dayCount}</span>
          </div>
        </div>
      </nav>

      {message && <div className="message-toast">{message}</div>}
      {particles.length > 0 && (
        <div className="particles-container">
          {particles.map(p => (<div key={p.id} className="particle" style={{ left: p.x + '%', top: p.y + '%' }}>{p.emoji}</div>))}
        </div>
      )}

      <div className="pet-container">
        {/* View Mode Toggle */}
        <div className="view-mode-toggle">
          <button className={`mode-btn ${viewMode === 'pet' ? 'active' : ''}`} onClick={() => setViewMode('pet')}><Sparkles size={18} /> Pet</button>
          <button className={`mode-btn ${viewMode === 'room' ? 'active' : ''}`} onClick={() => setViewMode('room')}><TreePine size={18} /> Place</button>
        </div>

        {viewMode === 'pet' ? (
          <>
            {/* Pet Display */}
            <div className={`pet-display ${animation || ''} ${pet.isSleeping ? 'sleeping' : ''} ${pet.isSleeping && pet.selectedBed !== 'no_bed' ? 'sleeping-on-bed' : ''}`}>
              <div 
                className="pet-scene" 
                style={{ 
                  '--wall-bg': ENVIRONMENTS.find(e => e.id === pet.environment)?.bg.wall,
                  '--floor-bg': ENVIRONMENTS.find(e => e.id === pet.environment)?.bg.floor
                }}
                data-environment={pet.environment}
                data-lighting={pet.lighting}
              >
                <div className="pet-avatar-container" style={{ left: `${pet.walkPosition}%` }}>
                  <div className={`pet-avatar-3d ${pet.isWalking ? 'walking' : ''}`} style={{ transform: `scale(${evolutionStage.size})` }}>
                    {/* Cute connected pet body */}
                    <div className={`cute-pet-body pet-${pet.type}`}>
                      {/* Tail - connected to body */}
                      <div className={`cute-tail pet-tail-${pet.type} ${animation === 'happy' || pet.isWalking ? 'wagging' : ''}`}></div>
                      
                      {/* Body - main connected part */}
                      <div className="cute-body-main">
                        {/* Shirt */}
                        {pet.equippedClothes.find(c => c.type === 'shirt') && (
                          <div className="pet-shirt" style={{ backgroundColor: pet.equippedClothes.find(c => c.type === 'shirt').color }}></div>
                        )}
                        
                        {/* Legs - connected to body bottom */}
                        <div className={`cute-legs ${pet.isWalking ? 'walking' : ''}`}>
                          <div className="cute-leg left"></div>
                          <div className="cute-leg right"></div>
                        </div>
                      </div>
                      
                      {/* Head - connected to body top */}
                      <div className="cute-head">
                        {/* Hat */}
                        {pet.equippedClothes.find(c => c.type === 'hat') && (
                          <div className="pet-hat" style={{ backgroundColor: pet.equippedClothes.find(c => c.type === 'hat').color }}></div>
                        )}
                        
                        {/* Ears - connected to head top */}
                        <div className="cute-ears">
                          <div className={`cute-ear left pet-ear-${pet.type}`}></div>
                          <div className={`cute-ear right pet-ear-${pet.type}`}></div>
                        </div>
                        
                        {/* Face */}
                        <div className="cute-face">
                          {/* Big dot eyes */}
                          <div className="cute-eyes">
                            <div className={`cute-eye left ${pet.isSleeping || animation === 'sleep' || pet.isBlinking ? 'closed' : ''}`}></div>
                            <div className={`cute-eye right ${pet.isSleeping || animation === 'sleep' || pet.isBlinking ? 'closed' : ''}`}></div>
                          </div>
                          
                          {/* Cheeks - visible when happiness > 70 */}
                          <div className={`cute-cheeks ${showBlush ? 'visible' : 'hidden'}`}>
                            <div className="cute-cheek left"></div>
                            <div className="cute-cheek right"></div>
                          </div>
                          
                          {/* Nose */}
                          <div className="cute-nose"></div>
                          
                          {/* Mouth */}
                          <div className={`cute-mouth ${petExpression} ${animation === 'eat' || animation === 'eating' ? 'eating' : ''} ${eatingState.mouthOpen ? 'mouth-open' : ''}`}></div>
                        </div>
                      </div>
                      
                      {/* Arms - connected to body sides */}
                      <div className="cute-arms">
                        <div className={`cute-arm left ${animation === 'happy' ? 'waving' : ''}`}></div>
                        <div className={`cute-arm right ${animation === 'train' ? 'flexing' : ''}`}></div>
                      </div>
                      
                      {/* Bow accessory */}
                      {pet.equippedClothes.find(c => c.type === 'bow') && (
                        <div className="pet-bow" style={{ backgroundColor: pet.equippedClothes.find(c => c.type === 'bow').color }}>
                          <div className="bow-loop left"></div>
                          <div className="bow-loop right"></div>
                        </div>
                      )}
                      
                      {/* Bath bubbles */}
                      {animation === 'bath' && (
                        <div className="bath-bubbles">
                          <span>🫧</span><span>🫧</span><span>🫧</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NEW: Eating Apple Animation */}
                  {eatingState.isEating && eatingState.foodItem && (
                    <div 
                      className="eating-apple" 
                      style={{ transform: `translateX(-50%) scale(${eatingState.appleSize})` }}
                    >
                      {eatingState.foodItem.icon}
                    </div>
                  )}

                  {/* Sleep ZZZ */}
                  {(animation === 'sleep' || pet.isSleeping) && (
                    <div className="sleep-zzz"><span>Z</span><span>z</span><span>z</span></div>
                  )}
                </div>
              </div>

              <div className="pet-info">
                <div className="evolution-badge">{evolutionStage.name}</div>
                <h2 className="pet-name">
                  {pet.name}
                  <button className="edit-name-btn" onClick={() => setShowRename(true)}>✏️</button>
                  <button className="edit-name-btn" onClick={() => setShowPetSelect(true)}>🔄</button>
                </h2>
                <p className="pet-mood" style={{ color: expression.color }}>{expression.emoji} {expression.text}</p>
                <div className="pet-level">
                  <Sparkles size={16} /> Level {pet.level}
                  <div className="xp-bar"><div className="xp-fill" style={{ width: `${(pet.xp / pet.xpToNext) * 100}%` }} /></div>
                  <small>{pet.xp}/{pet.xpToNext} XP</small>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-row">
              <button className="action-icon-btn" onClick={takePhoto}><Camera size={24} /><span>Photo</span></button>
              <button className="action-icon-btn" onClick={takeBath}><Bath size={24} /><span>Bath</span></button>
              <button className="action-icon-btn" onClick={toggleWalk}><Footprints size={24} /><span>{pet.isWalking ? 'Stop' : 'Walk'}</span></button>
              <button className="action-icon-btn" onClick={() => setViewMode('room')}><TreePine size={24} /><span>Place</span></button>
            </div>

            {/* Actions Below Pet */}
            <div className="actions-below-pet">
              <h3>🎮 Actions</h3>
              <div className="actions-grid">
                <button className="action-btn feed" onClick={() => handleAction('feed')} disabled={pet.hunger <= 10 || pet.isSleeping}>
                  <Utensils size={28} /><span>Feed</span><small>+5 💰</small>
                </button>
                <button className="action-btn play" onClick={() => handleAction('play')} disabled={pet.energy < 10 || pet.isSleeping || pet.health < 30}>
                  <Gamepad2 size={28} /><span>Play</span><small>+8 💰</small>
                </button>
                <button className="action-btn rest" onClick={() => handleAction('rest')} disabled={pet.energy >= 90}>
                  <Moon size={28} /><span>Rest</span><small>+2 💰</small>
                </button>
                <button className="action-btn train" onClick={() => handleAction('train')} disabled={pet.energy < 20 || pet.isSleeping || pet.health < 50}>
                  <Sparkles size={28} /><span>Train</span><small>+10 💰</small>
                </button>
              </div>

              <div className="quick-actions">
                <button className="quick-action-btn" onClick={() => { setShopTab('food'); setShowShop(true); }}>
                  <Utensils size={20} /><span>Food</span><small>{pet.foods.length}</small>
                </button>
                <button className="quick-action-btn" onClick={() => { setShopTab('clothes'); setShowShop(true); }}>
                  <Gift size={20} /><span>Clothes</span><small>{pet.clothes.length}</small>
                </button>
                <button className="quick-action-btn" onClick={healPet}>
                  <Activity size={20} /><span>Heal</span><small>-20 💰</small>
                </button>
                <button className="quick-action-btn" onClick={toggleSleep}>
                  <Moon size={20} /><span>{pet.isSleeping ? 'Wake' : 'Sleep'}</span><small>{pet.isSleeping ? '☀️' : '🌙'}</small>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              <StatBar icon={Heart} value={pet.happiness} color="#ff6b9d" label="Happiness" />
              <StatBar icon={Utensils} value={pet.hunger} color="#ffa726" label="Hunger" />
              <StatBar icon={Moon} value={pet.energy} color="#7e57c2" label="Energy" />
              <StatBar icon={Activity} value={pet.health} color={pet.health < 50 ? '#ef4444' : '#4ade80'} label="Health" />
              <StatBar icon={Bath} value={pet.hygiene} color={pet.hygiene < 50 ? '#f97316' : '#22c55e'} label="Hygiene" />
            </div>

            {/* Minigames */}
            <div className="minigames-section">
              <h3>🎮 Minigames (3 Rounds)</h3>
              <div className="minigames-grid">
                {MINIGAMES.map(game => (
                  <button key={game.id} className="minigame-card" onClick={() => playMinigame(game)} disabled={pet.isSleeping || pet.health < 30}>
                    <span className="minigame-icon">{game.icon}</span>
                    <span className="minigame-name">{game.name}</span>
                    <small>{game.duration}s | Target: {game.target}</small>
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Room View */
          <div className="room-display" style={{ background: ROOM_THEMES.find(t => t.id === pet.roomTheme)?.bg }}>
            <div className="room-content">
              <div className="room-pet-container">
                <div className="room-pet" style={{ transform: `scale(${evolutionStage.size * 1.2})` }}>
                  <div className={`cute-pet-body pet-${pet.type} room-pet-body`}>
                    <div className="cute-tail pet-tail-${pet.type}"></div>
                    <div className="cute-body-main">
                      <div className="cute-legs"><div className="cute-leg left"></div><div className="cute-leg right"></div></div>
                    </div>
                    <div className="cute-head">
                      <div className="cute-ears">
                        <div className={`cute-ear left pet-ear-${pet.type}`}></div>
                        <div className={`cute-ear right pet-ear-${pet.type}`}></div>
                      </div>
                      <div className="cute-face">
                        <div className="cute-eyes">
                          <div className="cute-eye left"></div>
                          <div className="cute-eye right"></div>
                        </div>
                        <div className="cute-nose"></div>
                        <div className="cute-mouth"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="room-info">
                <h3>{pet.name}'s {ROOM_THEMES.find(t => t.id === pet.roomTheme)?.name}</h3>
                <p>Level: {pet.level} ({evolutionStage.name})</p>
                <p>Hygiene: {Math.round(pet.hygiene)}%</p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        <div className="stats-summary">
          <div className="stat-card"><h4>Level</h4><p>{pet.level}</p></div>
          <div className="stat-card"><h4>Stage</h4><p>{evolutionStage.name}</p></div>
          <div className="stat-card"><h4>Photos</h4><p>{pet.photos.length}</p></div>
          <div className="stat-card"><h4>Mood</h4><p>{expression.emoji}</p></div>
        </div>
      </div>

      {/* Rename Modal */}
      {showRename && (
        <div className="modal-overlay" onClick={() => setShowRename(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>✏️ Rename Pet</h3>
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name..." maxLength={15} autoFocus onKeyPress={(e) => e.key === 'Enter' && handleRename()} />
            <div className="modal-actions">
              <button onClick={() => setShowRename(false)}>Cancel</button>
              <button className="primary" onClick={handleRename}>Rename</button>
            </div>
          </div>
        </div>
      )}

      {/* Pet Select Modal */}
      {showPetSelect && (
        <div className="modal-overlay" onClick={() => setShowPetSelect(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>🔄 Choose Your Pet</h3>
            <div className="pet-type-grid">
              {PET_TYPES.map(type => (
                <button key={type.id} className={`pet-type-card ${pet.type === type.id ? 'selected' : ''}`} onClick={() => changePet(type)}>
                  <div className="pet-type-preview">{type.emoji}</div>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowPetSelect(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Shop Modal */}
      {showShop && (
        <div className="modal-overlay" onClick={() => setShowShop(false)}>
          <div className="modal-content shop-modal" onClick={e => e.stopPropagation()}>
            <div className="shop-header">
              <h3>🎁 Shop</h3>
              <button className="close-minigame" onClick={() => setShowShop(false)}><X size={20} /></button>
            </div>
            <p className="modal-subtitle">Coins: 💰 {pet.coins}</p>
            <div className="shop-tabs">
              <button className={`shop-tab ${shopTab === 'food' ? 'active' : ''}`} onClick={() => setShopTab('food')}>🍎 Food</button>
              <button className={`shop-tab ${shopTab === 'clothes' ? 'active' : ''}`} onClick={() => setShopTab('clothes')}>👕 Clothes</button>
              <button className={`shop-tab ${shopTab === 'medicine' ? 'active' : ''}`} onClick={() => setShopTab('medicine')}>💊 Medicine</button>
              <button className={`shop-tab ${shopTab === 'bathtubs' ? 'active' : ''}`} onClick={() => setShopTab('bathtubs')}>🛁 Bathtubs</button>
              <button className={`shop-tab ${shopTab === 'beds' ? 'active' : ''}`} onClick={() => setShopTab('beds')}>🛏️ Beds</button>
              <button className={`shop-tab ${shopTab === 'environment' ? 'active' : ''}`} onClick={() => setShopTab('environment')}>🏡 Environment</button>
            </div>
            {shopTab === 'food' && (
              <div className="shop-content">
                <h4>🛒 Buy Food</h4>
                <div className="rewards-grid">
                  {FOODS.map(item => (
                    <button key={item.id} className="reward-card" onClick={() => buyItem(item, 'food')}>
                      <div className="reward-icon">{item.icon}</div>
                      <span className="reward-name">{item.name}</span>
                      <span className="reward-cost">💰 {item.cost}</span>
                    </button>
                  ))}
                </div>
                <h4>🎒 Your Food</h4>
                <div className="rewards-grid">
                  {pet.foods.length === 0 && <p className="empty-inventory">No food</p>}
                  {pet.foods.map(item => (
                    <button key={item.id} className="reward-card owned" onClick={() => useFood(item)}>
                      <div className="reward-icon">{item.icon}</div>
                      <span className="reward-name">{item.name}</span>
                      <span className="use-badge">Use</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {shopTab === 'clothes' && (
              <div className="shop-content">
                <h4>🛒 Buy Clothes</h4>
                <div className="rewards-grid">
                  {CLOTHES.map(item => (
                    <button key={item.id} className="reward-card" onClick={() => buyItem(item, 'clothes')}>
                      <div className="reward-icon" style={{ background: item.color }}>{item.icon}</div>
                      <span className="reward-name">{item.name}</span>
                      <span className="reward-cost">💰 {item.cost}</span>
                    </button>
                  ))}
                </div>
                <h4>🎒 Your Wardrobe</h4>
                <div className="rewards-grid">
                  {pet.clothes.length === 0 && <p className="empty-inventory">No clothes</p>}
                  {pet.clothes.map(item => {
                    const isEquipped = pet.equippedClothes.find(c => c.id === item.id)
                    return (
                      <button key={item.id} className={`reward-card owned ${isEquipped ? 'equipped' : ''}`} onClick={() => isEquipped ? unequipClothes(item.type) : equipClothes(item)}>
                        <div className="reward-icon" style={{ background: item.color }}>{item.icon}</div>
                        <span className="reward-name">{item.name}</span>
                        <span className="use-badge">{isEquipped ? 'On' : 'Off'}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            
            {/* NEW: Beds Shop Tab */}
            {shopTab === 'beds' && (
              <div className="shop-content">
                <h4>🛏️ Buy Beds</h4>
                <p className="shop-info">Better beds = faster energy recovery while sleeping!</p>
                <div className="rewards-grid">
                  {BEDS.filter(b => b.id !== 'no_bed').map(item => {
                    const isOwned = pet.selectedBed === item.id
                    return (
                      <button key={item.id} className={`reward-card ${isOwned ? 'owned' : ''}`} onClick={() => !isOwned && buyItem(item, 'bed')}>
                        <div className="reward-icon">{item.icon}</div>
                        <span className="reward-name">{item.name}</span>
                        <span className="reward-cost">💰 {item.cost}</span>
                        <span className="reward-bonus">+{Math.round((item.sleepQuality - 1) * 100)}% energy</span>
                      </button>
                    )
                  })}
                </div>
                <h4>🛏️ Current Bed</h4>
                <div className="rewards-grid">
                  <div className="reward-card owned equipped">
                    <div className="reward-icon">{(BEDS.find(b => b.id === pet.selectedBed) || BEDS[0]).icon}</div>
                    <span className="reward-name">{(BEDS.find(b => b.id === pet.selectedBed) || BEDS[0]).name}</span>
                    <span className="reward-bonus">+{Math.round(((BEDS.find(b => b.id === pet.selectedBed) || BEDS[0]).sleepQuality - 1) * 100)}% energy</span>
                  </div>
                </div>
              </div>
            )}
            
            {/* NEW: Environment Shop Tab */}
            {shopTab === 'environment' && (
              <div className="shop-content">
                <h4>🏡 Change Environment</h4>
                <div className="rewards-grid">
                  {ENVIRONMENTS.map(item => {
                    const isOwned = pet.environment === item.id
                    return (
                      <button key={item.id} className={`reward-card ${isOwned ? 'owned' : ''}`} onClick={() => !isOwned && buyItem(item, 'environment')}>
                        <div className="reward-icon" style={{ background: item.bg.wall }}>{item.icon || '🏡'}</div>
                        <span className="reward-name">{item.name}</span>
                        <span className="reward-cost">💰 {item.cost}</span>
                        <span className="reward-bonus">{item.lighting} lighting</span>
                      </button>
                    )
                  })}
                </div>
                <h4>🏡 Current Environment</h4>
                <div className="rewards-grid">
                  <div className="reward-card owned equipped">
                    <div className="reward-icon" style={{ background: ENVIRONMENTS.find(e => e.id === pet.environment)?.bg.wall }}>
                      {ENVIRONMENTS.find(e => e.id === pet.environment)?.icon || '🏡'}
                    </div>
                    <span className="reward-name">{ENVIRONMENTS.find(e => e.id === pet.environment)?.name}</span>
                    <span className="reward-bonus">{ENVIRONMENTS.find(e => e.id === pet.environment)?.lighting} lighting</span>
                  </div>
                </div>
              </div>
            )}

            {/* NEW: Medicine Shop Tab */}
            {shopTab === 'medicine' && (
              <div className="shop-content">
                <h4>💊 Medicine</h4>
                <p className="shop-info">Use when your pet is sick to restore health!</p>
                <div className="rewards-grid">
                  <button className="reward-card" onClick={() => buyItem({ id: 'medicine', name: 'Obat', cost: 100, icon: '💊' }, 'medicine')}>
                    <div className="reward-icon">💊</div>
                    <span className="reward-name">Obat</span>
                    <span className="reward-cost">💰 100</span>
                    <span className="reward-bonus">+30 health</span>
                  </button>
                </div>
                <h4>🎒 Your Medicine</h4>
                <div className="rewards-grid">
                  {pet.isSick ? (
                    <button className="reward-card owned" onClick={() => buyItem({ id: 'medicine', name: 'Obat', cost: 0, icon: '💊' }, 'medicine')}>
                      <div className="reward-icon">💊</div>
                      <span className="reward-name">Use Medicine</span>
                      <span className="use-badge">Use</span>
                    </button>
                  ) : (
                    <p className="empty-inventory">Pet is healthy!</p>
                  )}
                </div>
              </div>
            )}

            {/* NEW: Bathtubs Shop Tab */}
            {shopTab === 'bathtubs' && (
              <div className="shop-content">
                <h4>🛁 Bathtubs</h4>
                <p className="shop-info">Better bathtubs = cleaner and happier pet!</p>
                <div className="rewards-grid">
                  {BATHTUBS.filter(b => b.id !== 'none').map(item => {
                    const isOwned = pet.selectedBathtub === item.id
                    return (
                      <button key={item.id} className={`reward-card ${isOwned ? 'owned' : ''}`} onClick={() => !isOwned && buyItem(item, 'bathtub')}>
                        <div className="reward-icon">{item.icon}</div>
                        <span className="reward-name">{item.name}</span>
                        <span className="reward-cost">💰 {item.cost}</span>
                        <span className="reward-bonus">{item.size}x size</span>
                      </button>
                    )
                  })}
                </div>
                <h4>🛁 Current Bathtub</h4>
                <div className="rewards-grid">
                  <div className="reward-card owned equipped">
                    <div className="reward-icon">{(BATHTUBS.find(b => b.id === pet.selectedBathtub) || BATHTUBS[0]).icon}</div>
                    <span className="reward-name">{(BATHTUBS.find(b => b.id === pet.selectedBathtub) || BATHTUBS[0]).name}</span>
                    <span className="reward-bonus">{(BATHTUBS.find(b => b.id === pet.selectedBathtub) || BATHTUBS[0]).size}x size</span>
                  </div>
                </div>
              </div>
            )}

            <button className="close-btn" onClick={() => setShowShop(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Room Themes Modal */}
      {showRoom && (
        <div className="modal-overlay" onClick={() => setShowRoom(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>🏠 Places</h3>
            <p className="modal-subtitle">Coins: 💰 {pet.coins}</p>
            <div className="room-themes-grid">
              {ROOM_THEMES.map(theme => {
                const isUnlocked = pet.unlockedThemes.includes(theme.id)
                const isCurrent = pet.roomTheme === theme.id
                return (
                  <button key={theme.id} className={`room-theme-card ${isCurrent ? 'current' : ''} ${isUnlocked ? 'unlocked' : ''}`} onClick={() => buyRoomTheme(theme)} style={{ background: theme.bg }}>
                    <span className="room-theme-icon">{theme.icon}</span>
                    <span className="room-theme-name" style={{ color: theme.id === 'space' ? '#fff' : '#333' }}>{theme.name}</span>
                    {!isUnlocked && <span className="room-theme-cost">💰 {theme.cost}</span>}
                    {isUnlocked && !isCurrent && <span className="room-theme-unlocked">✓</span>}
                    {isCurrent && <span className="room-theme-current">Current</span>}
                  </button>
                )
              })}
            </div>
            <button className="close-btn" onClick={() => setShowRoom(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Photos Modal */}
      {showPhotos && (
        <div className="modal-overlay" onClick={() => setShowPhotos(false)}>
          <div className="modal-content photos-modal" onClick={e => e.stopPropagation()}>
            <h3>📸 Photo Album</h3>
            <div className="photos-grid">
              {pet.photos.length === 0 && <p className="empty-inventory">No photos yet</p>}
              {pet.photos.map(photo => (
                <div key={photo.id} className="photo-card">
                  <div className="photo-pet">{PET_TYPES.find(p => p.id === photo.pet.type)?.emoji || '🐾'}</div>
                  <div className="photo-info"><span>{photo.date}</span><span>{photo.evolution}</span></div>
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowPhotos(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Minigame Modal */}
      {showMinigame && selectedGame && (
        <div className="modal-overlay" onClick={() => setShowMinigame(false)}>
          <div className="modal-content minigame-modal" onClick={e => e.stopPropagation()}>
            <div className="minigame-header">
              <h3>{selectedGame.icon} {selectedGame.name}</h3>
              <button className="close-minigame" onClick={() => setShowMinigame(false)}><X size={20} /></button>
            </div>
            {!gameResult ? (
              <div className="minigame-content">
                {selectedGame.id === 'whack' && (
                  <>
                    <div className="game-round-indicator">Round {whackGame.round}/{whackGame.totalRounds}</div>
                    <div className="whack-game">
                      {[0,1,2,3,4,5,6,7,8].map(pos => (
                        <div key={pos} className={`whack-hole ${whackGame.activeMoles.find(m => m.pos === pos) ? 'mole-up' : ''}`} onClick={() => whackMole(pos)}>
                          {whackGame.activeMoles.find(m => m.pos === pos) && !whackGame.clicked.includes(pos) && (<span className="mole">🦫</span>)}
                        </div>
                      ))}
                    </div>
                    <div className="game-stats"><span>Score: {whackGame.score} | Need: 10</span><span>Time: {whackGame.timeLeft}s</span></div>
                  </>
                )}
                {selectedGame.id === 'memory' && (
                  <>
                    <div className="game-round-indicator">Round {memoryGame.round}/{memoryGame.totalRounds}</div>
                    <div className="memory-game">
                      {memoryGame.cards.map((card, index) => (
                        <div key={index} className={`memory-card ${memoryGame.flipped.includes(index) || memoryGame.matched.includes(index) ? 'flipped' : ''}`} onClick={() => flipCard(index)}>
                          <span>{memoryGame.flipped.includes(index) || memoryGame.matched.includes(index) ? card : '❓'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="game-stats"><span>Moves: {memoryGame.moves}</span><span>Matched: {memoryGame.matched.length / 4}/4</span></div>
                  </>
                )}
                {selectedGame.id === 'bubble' && (
                  <>
                    <div className="game-round-indicator">Round {bubbleGame.round}/{bubbleGame.totalRounds}</div>
                    <div className="bubble-game">
                      {bubbleGame.bubbles.map(bubble => (
                        <div key={bubble.id} className="bubble" style={{ left: bubble.x + '%', top: bubble.y + '%', width: bubble.size, height: bubble.size }} onClick={() => popBubble(bubble.id)}>🫧</div>
                      ))}
                    </div>
                    <div className="game-stats"><span>Score: {bubbleGame.score} | Need: 12</span><span>Time: {bubbleGame.timeLeft}s</span></div>
                  </>
                )}
              </div>
            ) : (
              <div className={`game-result ${gameResult}`}>
                {gameResult === 'win' ? (<><span className="result-emoji">🎉</span><h4>You Won!</h4><p>+30XP +25coins!</p></>) : (<><span className="result-emoji">😢</span><h4>Oops!</h4><p>Try again!</p></>)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
