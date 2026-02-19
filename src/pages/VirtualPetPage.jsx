import React, { useState, useEffect } from 'react'
import { Heart, Utensils, Gamepad2, Moon, Sparkles, Award, Gift, Home, Activity, Play, X, Shirt, Zap } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './VirtualPetPage.css'

const PET_TYPES = [
  { id: 'bear', name: 'Beruang', emoji: '🐻', color: '#8B7355', secondary: '#6B5345' },
  { id: 'dog', name: 'Guguk', emoji: '🐶', color: '#D4A574', secondary: '#C49564' },
  { id: 'elephant', name: 'Gajah', emoji: '🐘', color: '#9CA3AF', secondary: '#6B7280' },
  { id: 'cat', name: 'Kucing', emoji: '🐱', color: '#C4A584', secondary: '#B49574' },
  { id: 'bunny', name: 'Kelinci', emoji: '🐰', color: '#E8D5C4', secondary: '#D8C5B4' }
]

const FOODS = [
  { id: 1, name: 'Apel', cost: 50, icon: '🍎', happy: 10, heal: 5, fill: 15 },
  { id: 2, name: 'Cookie', cost: 75, icon: '🍪', happy: 20, heal: 5, fill: 10 },
  { id: 3, name: 'Ikan', cost: 100, icon: '🐟', happy: 25, heal: 10, fill: 25 },
  { id: 4, name: 'Obat', cost: 150, icon: '💊', happy: 5, heal: 30, fill: 0 },
  { id: 5, name: 'Crown', cost: 200, icon: '👑', happy: 50, heal: 0, fill: 0 },
  { id: 6, name: 'Diamond', cost: 500, icon: '💎', happy: 100, heal: 50, fill: 0 }
]

const CLOTHES = [
  { id: 'shirt_red', name: 'Kaos Merah', cost: 150, icon: '👕', color: '#ef4444', type: 'shirt' },
  { id: 'shirt_blue', name: 'Kaos Biru', cost: 150, icon: '👕', color: '#3b82f6', type: 'shirt' },
  { id: 'shirt_green', name: 'Kaos Hijau', cost: 150, icon: '👕', color: '#22c55e', type: 'shirt' },
  { id: 'bow', name: 'Pita', cost: 200, icon: '🎀', color: '#ec4899', type: 'accessory' },
  { id: 'hat', name: 'Topi', cost: 250, icon: '🎩', color: '#8B4513', type: 'accessory' },
  { id: 'glasses', name: 'Kacamata', cost: 180, icon: '👓', color: '#1e293b', type: 'accessory' }
]

const MINIGAMES = [
  { id: 'catch', name: 'Tangkap Bola', icon: '⚾', difficulty: 0.7, duration: 20 },
  { id: 'whack', name: 'Pukul Mole', icon: '🔨', difficulty: 0.6, duration: 25 },
  { id: 'memory', name: 'Memory Card', icon: '🃏', difficulty: 0.5, duration: 60 }
]

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
    coins: 200,
    items: [],
    foods: [],
    clothes: [],
    equippedClothes: [],
    isSick: false,
    isSleeping: false,
    consecutivePlays: 0
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
  
  // Minigame states
  const [catchGame, setCatchGame] = useState({ ballX: 50, score: 0, timeLeft: 20, balls: [] })
  const [whackGame, setWhackGame] = useState({ moles: [], score: 0, timeLeft: 25, clicked: [], activeMoles: [] })
  const [memoryGame, setMemoryGame] = useState({ cards: [], flipped: [], matched: [], moves: 0, attempts: 0 })

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

  // Decay stats
  useEffect(() => {
    const timer = setInterval(() => {
      setPet(p => {
        const newHunger = Math.min(100, p.hunger + 1)
        const newEnergy = p.isSleeping ? Math.min(100, p.energy + 1) : Math.max(0, p.energy - 0.3)
        const newFun = Math.max(0, p.fun - 2)
        let newHappiness = p.happiness - 0.5
        let newHealth = p.health
        let isSick = p.isSick

        if (newHunger > 85 && Math.random() < 0.03) {
          isSick = true
          newHealth = Math.max(0, p.health - 10)
          showMessage('😷 ' + p.name + ' got sick!')
        }

        if (isSick) {
          newHealth = Math.max(0, p.health - 1)
          newHappiness = Math.max(0, p.happiness - 1)
        }

        if (newHunger > 90 || isSick) setPetExpression('angry')
        else if (newHappiness < 30) setPetExpression('sad')
        else if (newHappiness > 80) setPetExpression('happy')
        else setPetExpression('normal')

        const isSleeping = p.isSleeping && newEnergy >= 100 ? false : p.isSleeping

        return {
          ...p, hunger: newHunger, energy: newEnergy, fun: newFun,
          happiness: Math.max(0, Math.min(100, newHappiness)),
          health: newHealth, isSick, isSleeping
        }
      })
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Level up
  useEffect(() => {
    if (pet.xp >= pet.xpToNext) {
      setPet(p => ({
        ...p, level: p.level + 1, xp: p.xp - p.xpToNext,
        xpToNext: Math.floor(p.xpToNext * 1.5), coins: p.coins + 50, health: 100
      }))
      showMessage('🎉 Level Up! +50 coins! Full heal!')
      createParticles('levelup')
    }
  }, [pet.xp, pet.xpToNext])

  const createParticles = (type) => {
    const newParticles = []
    const count = type === 'levelup' ? 20 : 10
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: type === 'levelup' ? '⭐' : type === 'heart' ? '❤️' : '✨',
        type
      })
    }
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 2000)
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

  const buyItem = (item, type) => {
    if (pet.coins >= item.cost) {
      const itemsKey = type === 'food' ? 'foods' : 'clothes'
      if (pet[itemsKey].find(i => i.id === item.id)) {
        showMessage('❌ Already owned!')
        return
      }
      setPet(p => ({
        ...p,
        coins: p.coins - item.cost,
        [itemsKey]: [...p[itemsKey], { ...item, boughtAt: Date.now() }]
      }))
      showMessage(`🎁 Bought ${item.name}!`)
      createParticles('heart')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const useFood = (food) => {
    if (!pet.foods.find(f => f.id === food.id)) return
    setPet(p => ({
      ...p,
      hunger: Math.max(0, p.hunger - (food.fill || 0)),
      happiness: Math.min(100, p.happiness + (food.happy || 0)),
      health: Math.min(100, p.health + (food.heal || 0)),
      foods: p.foods.filter(f => f.id !== food.id),
      isSick: p.isSick && p.health + (food.heal || 0) >= 50 ? false : p.isSick
    }))
    showMessage(`🍽️ Used ${food.name}! +${food.fill} fill +${food.happy} happy ${food.heal > 0 ? '+' + food.heal + ' health' : ''}`)
    setAnimation('eat')
    setTimeout(() => setAnimation(null), 1500)
    createParticles('heart')
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
    
    if (game.id === 'catch') {
      setCatchGame({ ballX: 50, score: 0, timeLeft: game.duration, balls: [] })
      startCatchGame(game.duration)
    } else if (game.id === 'whack') {
      setWhackGame({ moles: [], score: 0, timeLeft: game.duration, clicked: [], activeMoles: [] })
      startWhackGame(game.duration)
    } else if (game.id === 'memory') {
      startMemoryGame()
    }
  }

  // Catch Ball Game
  const startCatchGame = (duration) => {
    const interval = setInterval(() => {
      setCatchGame(prev => {
        if (prev.timeLeft <= 0) {
          clearInterval(interval)
          endMinigame(prev.score >= 5, prev.score)
          return prev
        }
        
        const newBalls = prev.balls.filter(b => b.y < 100).map(b => ({ ...b, y: b.y + 4 }))
        const caught = newBalls.filter(b => b.y >= 85 && Math.abs(b.x - prev.ballX) < 15)
        const newScore = prev.score + caught.length
        
        if (Math.random() < 0.4 && newBalls.length < 4) {
          newBalls.push({ x: Math.random() * 80 + 10, y: 0, id: Date.now() })
        }
        
        return { ...prev, balls: newBalls, score: newScore, timeLeft: prev.timeLeft - 1 }
      })
    }, 1000)
  }

  const moveBasket = (dir) => {
    setCatchGame(prev => ({ ...prev, ballX: Math.max(10, Math.min(90, prev.ballX + dir * 12)) }))
  }

  // Whack Game
  const startWhackGame = (duration) => {
    const moleInterval = setInterval(() => {
      setWhackGame(prev => {
        if (prev.timeLeft <= 0) return prev
        
        const newActiveMoles = prev.activeMoles.filter(m => Date.now() - m.time < 1200)
        
        if (Math.random() < 0.5 && newActiveMoles.length < 3) {
          const pos = Math.floor(Math.random() * 9)
          if (!newActiveMoles.find(m => m.pos === pos)) {
            newActiveMoles.push({ pos, time: Date.now(), id: Date.now() })
          }
        }
        
        return { ...prev, activeMoles: newActiveMoles }
      })
    }, 800)

    const timerInterval = setInterval(() => {
      setWhackGame(prev => {
        if (prev.timeLeft <= 0) {
          clearInterval(timerInterval)
          clearInterval(moleInterval)
          endMinigame(prev.score >= 5, prev.score)
          return prev
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
    setMemoryGame({ cards: shuffled, flipped: [], matched: [], moves: 0, attempts: 0 })
  }

  const flipCard = (index) => {
    if (memoryGame.flipped.length >= 2 || memoryGame.flipped.includes(index) || memoryGame.matched.includes(index)) return
    
    setMemoryGame(prev => {
      const newFlipped = [...prev.flipped, index]
      
      if (newFlipped.length === 2) {
        const [first, second] = newFlipped
        if (prev.cards[first] === prev.cards[second]) {
          setTimeout(() => {
            setMemoryGame(p => ({ ...p, matched: [...p.matched, first, second], attempts: p.attempts + 1 }))
          }, 500)
        } else {
          setTimeout(() => {
            setMemoryGame(p => ({ ...p, flipped: [], attempts: p.attempts + 1 }))
          }, 1000)
        }
        return { ...prev, flipped: newFlipped, moves: prev.moves + 1 }
      }
      return { ...prev, flipped: newFlipped }
    })
  }

  useEffect(() => {
    if (memoryGame.matched.length === 8 && memoryGame.cards.length > 0) {
      endMinigame(true, memoryGame.moves)
    }
  }, [memoryGame.matched])

  const endMinigame = (won, extraData) => {
    setGameResult(won ? 'win' : 'lose')
    
    if (won) {
      const xpGain = 25
      const coinGain = 20
      const happyGain = 20
      setPet(p => ({
        ...p,
        xp: p.xp + xpGain,
        coins: p.coins + coinGain,
        happiness: Math.min(100, p.happiness + happyGain),
        fun: Math.min(100, p.fun + 25)
      }))
      showMessage(`🎉 Won! +${xpGain}XP +${coinGain}coins!`)
      createParticles('win')
    } else {
      const fellAndHurt = Math.random() < 0.2
      if (fellAndHurt) {
        const damage = Math.floor(Math.random() * 10) + 3
        setPet(p => ({ ...p, health: Math.max(0, p.health - damage), happiness: Math.max(0, p.happiness - 10) }))
        showMessage(`😵 Fell! -${damage} health!`)
        setPetExpression('hurt')
        setAnimation('hurt')
        setTimeout(() => { setAnimation(null); updateExpression() }, 2000)
      } else {
        setPet(p => ({ ...p, happiness: Math.max(0, p.happiness - 5) }))
        showMessage('😢 Lost! Try again!')
      }
    }
    
    setTimeout(() => {
      setShowMinigame(false)
      setSelectedGame(null)
      setGameResult(null)
    }, 2500)
  }

  const healPet = () => {
    if (pet.health >= 100 && !pet.isSick) { showMessage('Already healthy!'); return }
    if (pet.coins >= 20) {
      setPet(p => ({
        ...p, health: Math.min(100, p.health + 30), coins: p.coins - 20,
        isSick: p.health + 30 >= 50 ? false : p.isSick
      }))
      showMessage(`💖 Healed! +30 health! -20 coins`)
      createParticles('heart')
      setPetExpression('happy')
    } else { showMessage('❌ Not enough coins!') }
  }

  const toggleSleep = () => {
    setPet(p => ({ ...p, isSleeping: !p.isSleeping }))
    showMessage(pet.isSleeping ? '☀️ Woke up!' : '🌙 Going to sleep...')
    setAnimation(pet.isSleeping ? null : 'sleep')
  }

  const getExpression = () => {
    if (pet.health < 30) return { emoji: '🤒', text: 'Sick', color: '#ef4444' }
    if (petExpression === 'angry') return { emoji: '😠', text: 'Angry', color: '#f97316' }
    if (petExpression === 'sad') return { emoji: '😢', text: 'Sad', color: '#60a5fa' }
    if (petExpression === 'happy') return { emoji: '😄', text: 'Happy', color: '#4ade80' }
    if (petExpression === 'tired') return { emoji: '😴', text: 'Tired', color: '#a78bfa' }
    if (petExpression === 'hurt') return { emoji: '🤕', text: 'Hurt', color: '#f43f5e' }
    return { emoji: '😊', text: 'Normal', color: '#4ade80' }
  }

  const expression = getExpression()

  const StatBar = ({ icon: Icon, value, color, label, showHealth }) => (
    <div className="stat-bar">
      <div className="stat-header">
        <Icon size={16} />
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
      {showHealth && pet.isSick && <span className="sick-badge">🤒</span>}
    </div>
  )

  const petType = PET_TYPES.find(p => p.id === pet.type) || PET_TYPES[0]

  return (
    <div className="virtual-pet-page">
      <nav className="pet-top-nav">
        <div className="pet-nav-container">
          <button className="pet-nav-btn" onClick={() => navigate('/dashboard')}>
            <Home size={20} /><span>Home</span>
          </button>
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
          {particles.map(p => (
            <div key={p.id} className="particle" style={{ left: p.x + '%', top: p.y + '%' }}>{p.emoji}</div>
          ))}
        </div>
      )}

      <div className="pet-container">
        <div className="pet-main-section">
          {/* Pet Display */}
          <div className={`pet-display ${animation || ''} ${pet.isSleeping ? 'sleeping' : ''}`}>
            <div className="pet-avatar-3d">
              {animation === 'happy' && (
                <div className="effect-overlay happy-effect"><span>❤️</span><span>💕</span><span>✨</span></div>
              )}
              {animation === 'eat' && (
                <div className="effect-overlay eat-effect"><span>🍖</span><span>😋</span><span>✨</span></div>
              )}

              <div className={`pet-body pet-${pet.type}`}>
                {/* Clothes - Shirt */}
                {pet.equippedClothes.find(c => c.type === 'shirt') && (
                  <div className="pet-clothe pet-shirt" style={{ backgroundColor: pet.equippedClothes.find(c => c.type === 'shirt').color }}></div>
                )}
                
                {/* Ears */}
                <div className="pet-ears">
                  <div className={`pet-ear left pet-ear-${pet.type} ${animation === 'happy' ? 'wiggle' : ''}`}></div>
                  <div className={`pet-ear right pet-ear-${pet.type} ${animation === 'happy' ? 'wiggle' : ''}`}></div>
                </div>
                
                {/* Head */}
                <div className="pet-head">
                  {/* Hat accessory */}
                  {pet.equippedClothes.find(c => c.type === 'accessory' && c.name === 'Topi') && (
                    <div className="pet-hat" style={{ backgroundColor: pet.equippedClothes.find(c => c.name === 'Topi').color }}></div>
                  )}
                  
                  <div className="pet-face">
                    {/* Eyes */}
                    <div className="pet-eyes">
                      <div className={`pet-eye left ${petExpression === 'sad' ? 'sad' : ''} ${petExpression === 'angry' ? 'angry' : ''} ${animation === 'sleep' || pet.isSleeping ? 'closed' : ''} ${petExpression === 'hurt' ? 'hurt' : ''}`}></div>
                      <div className={`pet-eye right ${petExpression === 'sad' ? 'sad' : ''} ${petExpression === 'angry' ? 'angry' : ''} ${animation === 'sleep' || pet.isSleeping ? 'closed' : ''} ${petExpression === 'hurt' ? 'hurt' : ''}`}></div>
                    </div>
                    {/* Glasses accessory */}
                    {pet.equippedClothes.find(c => c.type === 'accessory' && c.name === 'Kacamata') && (
                      <div className="pet-glasses"></div>
                    )}
                    {/* Eyebrows */}
                    {petExpression === 'angry' && (
                      <div className="pet-eyebrows"><div className="eyebrow left"></div><div className="eyebrow right"></div></div>
                    )}
                    {/* Tears */}
                    {petExpression === 'sad' && (
                      <div className="pet-tears"><div className="tear left"></div><div className="tear right"></div></div>
                    )}
                    {/* Cheeks */}
                    <div className="pet-cheeks"><div className="pet-cheek left"></div><div className="pet-cheek right"></div></div>
                    {/* Nose */}
                    <div className={`pet-nose pet-nose-${pet.type}`}></div>
                    {/* Mouth */}
                    <div className={`pet-mouth ${petExpression} ${animation === 'eat' ? 'eating' : ''}`}></div>
                  </div>
                </div>
                
                {/* Body */}
                <div className="pet-torso"></div>
                
                {/* Arms */}
                <div className="pet-arms">
                  <div className={`pet-arm left ${animation === 'play' ? 'waving' : ''}`}></div>
                  <div className={`pet-arm right ${animation === 'train' ? 'flexing' : ''}`}></div>
                </div>
                
                {/* Legs - Curled when sleeping */}
                <div className={`pet-legs ${pet.isSleeping ? 'curled' : ''}`}>
                  <div className={`pet-leg left ${animation === 'happy' ? 'waving' : ''}`}></div>
                  <div className="pet-leg right"></div>
                </div>
                
                {/* Tail */}
                <div className={`pet-tail pet-tail-${pet.type} ${animation === 'happy' ? 'wagging' : ''}`}></div>
                
                {/* Trunk */}
                {pet.type === 'elephant' && (
                  <div className={`pet-trunk ${animation === 'happy' ? 'swinging' : ''}`}></div>
                )}

                {/* Bow accessory */}
                {pet.equippedClothes.find(c => c.type === 'accessory' && c.name === 'Pita') && (
                  <div className="pet-bow" style={{ backgroundColor: pet.equippedClothes.find(c => c.name === 'Pita').color }}></div>
                )}

                {/* Bandage */}
                {(pet.health < 50 || pet.isSick) && (
                  <div className="pet-bandage"><span>🩹</span></div>
                )}
              </div>
              
              {/* Sleep ZZZ */}
              {(animation === 'sleep' || pet.isSleeping) && (
                <div className="sleep-zzz"><span className="zzz-1">Z</span><span className="zzz-2">z</span><span className="zzz-3">z</span></div>
              )}
            </div>

            <div className="pet-info">
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

          {/* Actions Panel - Beside Pet */}
          <div className="actions-panel">
            <h3>🎮 Actions</h3>
            <div className="actions-grid-vertical">
              <button className="action-btn feed" onClick={() => handleAction('feed')} disabled={pet.hunger <= 10 || pet.isSleeping}>
                <Utensils size={24} /><div><span>Feed</span><small>+5 💰</small></div>
              </button>
              <button className="action-btn play" onClick={() => handleAction('play')} disabled={pet.energy < 10 || pet.isSleeping || pet.health < 30}>
                <Gamepad2 size={24} /><div><span>Play</span><small>+8 💰</small></div>
              </button>
              <button className="action-btn rest" onClick={() => handleAction('rest')} disabled={pet.energy >= 90}>
                <Moon size={24} /><div><span>Rest</span><small>+2 💰</small></div>
              </button>
              <button className="action-btn train" onClick={() => handleAction('train')} disabled={pet.energy < 20 || pet.isSleeping || pet.health < 50}>
                <Sparkles size={24} /><div><span>Train</span><small>+10 💰</small></div>
              </button>
            </div>

            <div className="quick-actions-vertical">
              <button className="quick-action-btn" onClick={() => { setShopTab('food'); setShowShop(true); }}>
                <Utensils size={20} /><span>Use Food</span><small>{pet.foods.length} items</small>
              </button>
              <button className="quick-action-btn" onClick={() => { setShopTab('clothes'); setShowShop(true); }}>
                <Shirt size={20} /><span>Wardrobe</span><small>{pet.clothes.length} items</small>
              </button>
              <button className="quick-action-btn" onClick={healPet}>
                <Activity size={20} /><span>Heal</span><small>-20 💰</small>
              </button>
              <button className="quick-action-btn" onClick={toggleSleep}>
                <Moon size={20} /><span>{pet.isSleeping ? 'Wake' : 'Sleep'}</span><small>{pet.isSleeping ? '☀️' : '🌙'}</small>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid">
          <StatBar icon={Heart} value={pet.happiness} color="#ff6b9d" label="Happiness" />
          <StatBar icon={Utensils} value={pet.hunger} color="#ffa726" label="Hunger" />
          <StatBar icon={Moon} value={pet.energy} color="#7e57c2" label="Energy" />
          <StatBar icon={Gamepad2} value={pet.fun} color="#26c6da" label="Fun" />
          <StatBar icon={Activity} value={pet.health} color={pet.health < 50 ? '#ef4444' : '#4ade80'} label="Health" showHealth />
        </div>

        {/* Minigames */}
        <div className="minigames-section">
          <h3>🎮 Minigames</h3>
          <div className="minigames-grid">
            {MINIGAMES.map(game => (
              <button key={game.id} className="minigame-card" onClick={() => playMinigame(game)} disabled={pet.isSleeping || pet.health < 30}>
                <span className="minigame-icon">{game.icon}</span>
                <span className="minigame-name">{game.name}</span>
                <small>{game.duration}s | Win: +25XP +20💰</small>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="stats-summary">
          <div className="stat-card"><h4>Level</h4><p>{pet.level}</p></div>
          <div className="stat-card"><h4>Coins</h4><p>{pet.coins}</p></div>
          <div className="stat-card"><h4>Items</h4><p>{pet.foods.length + pet.clothes.length}</p></div>
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
              <h3>🎁 Shop & Inventory</h3>
              <button className="close-minigame" onClick={() => setShowShop(false)}><X size={20} /></button>
            </div>
            <p className="modal-subtitle">Coins: 💰 {pet.coins}</p>
            
            <div className="shop-tabs">
              <button className={`shop-tab ${shopTab === 'food' ? 'active' : ''}`} onClick={() => setShopTab('food')}>🍎 Food</button>
              <button className={`shop-tab ${shopTab === 'clothes' ? 'active' : ''}`} onClick={() => setShopTab('clothes')}>👕 Clothes</button>
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
                      <span className="reward-effects">
                        {item.fill > 0 && <span>🍽️+{item.fill}</span>}
                        {item.happy > 0 && <span>😊+{item.happy}</span>}
                        {item.heal > 0 && <span>❤️+{item.heal}</span>}
                      </span>
                    </button>
                  ))}
                </div>
                <h4>🎒 Your Food</h4>
                <div className="rewards-grid">
                  {pet.foods.length === 0 && <p className="empty-inventory">No food items</p>}
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
                      <span className="reward-effects"><span>{item.type === 'shirt' ? '👕 Shirt' : '🎀 Accessory'}</span></span>
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
                        <span className="use-badge">{isEquipped ? 'Unequip' : 'Equip'}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
            <button className="close-btn" onClick={() => setShowShop(false)}>Close</button>
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
                {selectedGame.id === 'catch' && (
                  <>
                    <div className="catch-game">
                      <div className="catch-area">
                        {catchGame.balls.map(ball => (
                          <div key={ball.id} className="catch-ball" style={{ left: ball.x + '%', top: ball.y + '%' }}>⚾</div>
                        ))}
                        <div className="catch-basket" style={{ left: catchGame.ballX + '%' }}>🧺</div>
                      </div>
                      <div className="catch-controls">
                        <button onClick={() => moveBasket(-1)}>◀ Left</button>
                        <button onClick={() => moveBasket(1)}>Right ▶</button>
                      </div>
                    </div>
                    <div className="game-stats"><span>Score: {catchGame.score} | Need: 5</span><span>Time: {catchGame.timeLeft}s</span></div>
                  </>
                )}

                {selectedGame.id === 'whack' && (
                  <>
                    <div className="whack-game">
                      {[0,1,2,3,4,5,6,7,8].map(pos => (
                        <div key={pos} className={`whack-hole ${whackGame.activeMoles.find(m => m.pos === pos) ? 'mole-up' : ''}`} onClick={() => whackMole(pos)}>
                          {whackGame.activeMoles.find(m => m.pos === pos) && !whackGame.clicked.includes(pos) && (
                            <span className="mole">🦫</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="game-stats"><span>Score: {whackGame.score} | Need: 5</span><span>Time: {whackGame.timeLeft}s</span></div>
                  </>
                )}

                {selectedGame.id === 'memory' && (
                  <>
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
              </div>
            ) : (
              <div className={`game-result ${gameResult}`}>
                {gameResult === 'win' ? (
                  <><span className="result-emoji">🎉</span><h4>You Won!</h4><p>+25XP +20coins +20happy!</p></>
                ) : (
                  <><span className="result-emoji">😢</span><h4>Oops!</h4><p>Try again!</p></>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
