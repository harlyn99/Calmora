# 🐾 Cozy Life Planner - Virtual Pet Enhancement Plan

## ✅ COMPLETED: Classic Pet Removal

### Files Updated:
1. **TopNavigation.jsx** - Changed `/pet` → `/cute-pet`
2. **MiniPetWidget.jsx** - Removed "Classic" button, kept only "Open Pet"

---

## 🎯 APP IDENTITY

**Cozy Life Planner** dengan virtual pet companion yang:
- ✅ Tetap kecil selamanya (tidak evolve)
- ✅ Visual反映 user productivity & mood
- ✅ Soft pastel aesthetic
- ✅ Calm cozy vibe

---

## 📊 CORE STAT SYSTEM

### Visible Pastel Progress Bars:

```javascript
const [stats, setStats] = useState({
  hunger: 80,      // 0-100
  energy: 80,      // 0-100
  happiness: 80,   // 0-100
  cleanliness: 100,// 0-100
  health: 100      // 0-100
})
```

### Decay Logic:
```javascript
useEffect(() => {
  const timer = setInterval(() => {
    setStats(prev => ({
      hunger: Math.min(100, prev.hunger + 0.3),
      energy: Math.max(0, prev.energy - 0.2),
      happiness: Math.max(0, prev.happiness - 0.15),
      cleanliness: Math.max(0, prev.cleanliness - 0.1),
      health: calculateHealth(prev)
    }))
  }, 3000) // Update every 3 seconds
  return () => clearInterval(timer)
}, [])
```

### Real-time Updates:
- Stats decrease naturally over time
- Trigger visual expression changes
- Auto re-render via React state

---

## 🐾 PET VISUAL STRUCTURE

### Component Layers (z-index order):

```jsx
<div className="pet-container">
  {/* Layer 1: Body */}
  <div className="pet-body">...</div>
  
  {/* Layer 2: Eyes (ALWAYS VISIBLE) */}
  <div className="pet-eyes">
    <Eye left />
    <Eye right />
  </div>
  
  {/* Layer 3: Mouth */}
  <div className="pet-mouth" />
  
  {/* Layer 4: Blush */}
  {showBlush && <div className="pet-blush" />}
  
  {/* Layer 5: Accessories */}
  {equippedHat && <div className="pet-hat" />}
  {equippedGlasses && <div className="pet-glasses" />}
  {equippedWings && <div className="pet-wings" />}
</div>
```

### Eye System:

**Default**: Round eyes (• •)

**Blink Animation**:
```javascript
useEffect(() => {
  const blinkInterval = setInterval(() => {
    if (!isSleeping && !isSick) {
      setBlink(true)
      setTimeout(() => setBlink(false), 200)
    }
  }, 4000) // Blink every 4 seconds
  return () => clearInterval(blinkInterval)
}, [isSleeping, isSick])
```

**Mood-based Shapes**:
| Mood | Eye Shape | Trigger |
|------|-----------|---------|
| Happy | ^ ^ (curved up) | happiness > 70 |
| Sad | ⌒ ⌒ (curved down) | happiness < 40 |
| Tired | ˘ ˘ (half closed) | energy < 30 |
| Sick | • • (small dots) | health < 50 |
| Excited | ✨ ✨ (sparkles) | happiness > 90 |

### Expression Binding:

```javascript
const getEyeClass = () => {
  if (isSick) return 'sick'
  if (isSleeping) return 'closed'
  if (stats.energy < 30) return 'tired'
  if (stats.happiness < 40) return 'sad'
  if (stats.happiness > 70) return 'happy'
  return 'normal'
}

// In render:
<div className={`pet-eye ${getEyeClass()}`} />
```

---

## 📝 PLANNER SYSTEM INTEGRATION

### Data Structure:

```javascript
const [planner, setPlanner] = useState({
  tasks: [],        // Daily tasks
  habits: [],       // Habit tracker
  moods: [],        // Mood logs
  journals: [],     // Journal notes
  pomodoros: []     // Study sessions
})
```

### Pet Reactions:

```javascript
// When task completed
const completeTask = (taskId) => {
  setStats(prev => ({
    ...prev,
    happiness: Math.min(100, prev.happiness + 5)
  }))
  spawnParticles('heart')
}

// When pomodoro finished
const finishPomodoro = (minutes) => {
  setCoins(prev => prev + Math.floor(minutes / 5))
  setStats(prev => ({
    ...prev,
    happiness: Math.min(100, prev.happiness + 3),
    energy: Math.max(0, prev.energy - 5)
  }))
}

// When mood logged
const logMood = (mood) => {
  setStats(prev => ({
    ...prev,
    happiness: mood === 'happy' ? Math.min(100, prev.happiness + 8) : prev.happiness
  }))
  
  // Pet visually reacts to user mood
  setPetMood(mood)
}
```

### User Mood Selection:

```javascript
const USER_MOODS = [
  { id: 'happy', icon: '😊', petBonus: { happiness: +10 } },
  { id: 'tired', icon: '😴', petBonus: { energy: -5 } },
  { id: 'calm', icon: '😌', petBonus: { happiness: +5 } },
  { id: 'stressed', icon: '😫', petBonus: { happiness: -5, energy: -5 } },
  { id: 'productive', icon: '💪', petBonus: { happiness: +8, coins: +10 } }
]
```

---

## 🎮 MINI GAMES (Coin Earning)

### Separate from Play Mode!

```javascript
const [miniGame, setMiniGame] = useState({
  active: false,
  type: null,  // 'whack' | 'garden' | 'cooking'
  score: 0,
  coins: 0
})
```

### Game 1: Whack-a-Mole
```javascript
const WhackAMole = () => {
  const [moles, setMoles] = useState([])
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  
  // Spawn mole randomly
  const spawnMole = () => {
    const position = Math.floor(Math.random() * 9)
    setMoles(prev => [...prev, { id: Date.now(), position }])
    setTimeout(() => {
      setMoles(prev => prev.filter(m => m.id !== Date.now()))
    }, 1500)
  }
  
  // Hit mole
  const hitMole = (id) => {
    setScore(prev => prev + 10)
    setMoles(prev => prev.filter(m => m.id !== id))
    spawnParticles('sparkle')
  }
  
  // Game over
  useEffect(() => {
    if (timeLeft <= 0) {
      const coins = Math.floor(score / 5)
      setCoins(prev => prev + coins)
      setMiniGame({ active: false, type: null, score, coins })
    }
  }, [timeLeft])
}
```

### Game 2: Garden Catch
```javascript
const GardenCatch = () => {
  const [fruits, setFruits] = useState([])
  const [score, setScore] = useState(0)
  const [multiplier, setMultiplier] = useState(1)
  
  const fruits = [
    { icon: '🍎', value: 10 },
    { icon: '🍓', value: 15 },
    { icon: '🍑', value: 12 },
    { icon: '🥕', value: 8 }
  ]
  
  // Catch fruit
  const catchFruit = (id) => {
    const fruit = fruits.find(f => f.id === id)
    setScore(prev => prev + fruit.value * multiplier)
    setMultiplier(prev => Math.min(5, prev + 0.5))
  }
  
  // Miss fruit = mood decrease
  const missFruit = () => {
    setStats(prev => ({
      ...prev,
      happiness: Math.max(0, prev.happiness - 5)
    }))
    setMultiplier(1)
  }
}
```

### Game 3: Cooking Match
```javascript
const CookingMatch = () => {
  const [grid, setGrid] = useState([])
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  
  const ingredients = [
    { icon: '🥚', name: 'Egg' },
    { icon: '🥛', name: 'Milk' },
    { icon: '🌾', name: 'Flour' },
    { icon: '🥕', name: 'Carrot' }
  ]
  
  // Match 3 logic
  const checkMatch = () => {
    // Find matches in rows/columns
    const matches = findMatches(grid)
    if (matches.length >= 3) {
      setScore(prev => prev + matches.length * 10)
      setStats(prev => ({
        ...prev,
        happiness: Math.min(100, prev.happiness + 5)
      }))
      spawnParticles('heart')
    }
  }
}
```

---

## 🎾 PLAY MODE (Bonding)

### NOT for coins - just for bonding!

```javascript
const playWithPet = () => {
  if (stats.energy < 20) {
    showMessage('Too tired to play...')
    return
  }
  
  setStats(prev => ({
    happiness: Math.min(100, prev.happiness + 20),
    energy: Math.max(0, prev.energy - 15)
  }))
  
  // Play animation
  setAnimation('playing')
  spawnParticles('sparkle')
  setTimeout(() => setAnimation(null), 1500)
}
```

**Interactions**:
- Jump (click pet)
- Bubble pop
- Chase toy
- Pet (swipe)

Each increases happiness, consumes small energy.

---

## 🤒 SICKNESS SYSTEM

### Trigger Conditions:

```javascript
const checkSickness = () => {
  const risk = (
    (stats.hunger > 90 ? 0.3 : 0) +
    (stats.cleanliness < 30 ? 0.3 : 0) +
    (stats.energy < 20 ? 0.2 : 0) +
    (stats.health < 50 ? 0.2 : 0)
  )
  
  if (risk > 0.5 && !isSick && Math.random() < 0.05) {
    setIsSick(true)
    setSicknessLevel(1)
    showMessage('😷 Pet got sick! Needs medicine!')
  }
}
```

### Sick Effects:
- Slower animation speed
- Pale expression (reduced color saturation)
- Low movement (less responsive)
- Small dot eyes
- Occasional cough animation

### Medicine:

```javascript
const useMedicine = () => {
  if (coins >= 50) {
    setCoins(prev => prev - 50)
    setIsSick(false)
    setSicknessLevel(0)
    setStats(prev => ({
      ...prev,
      health: Math.min(100, prev.health + 30)
    }))
    
    // Medicine drinking animation
    setAnimation('drinking')
    spawnParticles('sparkle')
  }
}
```

---

## 🍽️ FOOD SYSTEM

### Expanded Food Catalog:

```javascript
const FOODS = [
  // Bread & Bakery
  { id: 'bread', name: 'Bread', cost: 8, icon: '🍞', effects: { hunger: -20, happiness: +10, energy: +5 } },
  { id: 'croissant', name: 'Croissant', cost: 12, icon: '🥐', effects: { hunger: -18, happiness: +15, energy: +8 } },
  
  // Cake & Sweets
  { id: 'cake', name: 'Cake', cost: 25, icon: '🍰', effects: { hunger: -20, happiness: +30, energy: -10 } },
  { id: 'cookie', name: 'Cookie', cost: 15, icon: '🍪', effects: { hunger: -15, happiness: +20, energy: -5 } },
  { id: 'donut', name: 'Donut', cost: 18, icon: '🍩', effects: { hunger: -18, happiness: +25, energy: -8 } },
  
  // Drinks
  { id: 'milk', name: 'Milk', cost: 18, icon: '🥛', effects: { hunger: -10, happiness: +15, energy: +15 } },
  { id: 'juice', name: 'Juice', cost: 14, icon: '🧃', effects: { hunger: -8, happiness: +16, energy: +12 } },
  { id: 'tea', name: 'Tea', cost: 12, icon: '🍵', effects: { hunger: -5, happiness: +12, energy: +8 } },
  
  // Meals
  { id: 'rice', name: 'Rice', cost: 15, icon: '🍚', effects: { hunger: -25, happiness: +10, energy: +10 } },
  { id: 'noodles', name: 'Noodles', cost: 20, icon: '🍜', effects: { hunger: -28, happiness: +15, energy: +12 } },
  { id: 'soup', name: 'Soup', cost: 18, icon: '🍲', effects: { hunger: -20, happiness: +18, energy: +15 } },
  
  // Snacks
  { id: 'chips', name: 'Chips', cost: 10, icon: '🍟', effects: { hunger: -12, happiness: +15, energy: -5 } },
  { id: 'popcorn', name: 'Popcorn', cost: 8, icon: '🍿', effects: { hunger: -10, happiness: +18, energy: +3 } }
]
```

### Feeding Animation:

```javascript
const feedPet = (food) => {
  setAnimation('eating')
  setEatingFood(food)
  setFoodSize(1)
  
  // Decrease food size over time
  const eatInterval = setInterval(() => {
    setFoodSize(prev => prev - 0.15)
    if (foodSize <= 0.2) {
      clearInterval(eatInterval)
      applyFoodEffects(food)
    }
  }, food.eatTime / 5)
}

const applyFoodEffects = (food) => {
  setStats(prev => ({
    hunger: Math.max(0, prev.hunger + food.effects.hunger),
    happiness: Math.min(100, prev.happiness + food.effects.happiness),
    energy: Math.min(100, prev.energy + food.effects.energy)
  }))
  setEatingFood(null)
  setAnimation('happy')
  spawnParticles('heart')
}
```

---

## 🛁 BATH SYSTEM

### Bathtub Furniture:

```javascript
const BATHTUBS = [
  { id: 'small_tub', name: 'Small Tub', cost: 100, icon: '🛁', size: 1.2 },
  { id: 'medium_tub', name: 'Medium Tub', cost: 200, icon: '🛁', size: 1.5 },
  { id: 'large_tub', name: 'Large Tub', cost: 300, icon: '🛁', size: 1.8 }
]
```

### Bathing Process:

```javascript
const startBath = () => {
  if (!hasBathtub) {
    showMessage('Need bathtub first!')
    return
  }
  
  setIsBathing(true)
  
  // Pet sits in tub
  setPetPosition('in_tub')
  
  // Soap bubbles animation
  spawnBubbles()
  
  // Cleanliness increases gradually
  const cleanInterval = setInterval(() => {
    setStats(prev => ({
      ...prev,
      cleanliness: Math.min(100, prev.cleanliness + 2)
    }))
  }, 1000)
  
  // Bath takes 10 seconds
  setTimeout(() => {
    clearInterval(cleanInterval)
    setIsBathing(false)
    setPetPosition('normal')
    setAnimation('clean')
    showMessage('✨ So fresh!')
  }, 10000)
}

const spawnBubbles = () => {
  const bubbleInterval = setInterval(() => {
    if (!isBathing) {
      clearInterval(bubbleInterval)
      return
    }
    createBubble()
  }, 500)
}

const createBubble = () => {
  const bubble = {
    id: Date.now(),
    x: Math.random() * 100,
    y: 0,
    size: Math.random() * 10 + 10
  }
  setBubbles(prev => [...prev, bubble])
  
  // Float up animation
  setTimeout(() => {
    setBubbles(prev => prev.filter(b => b.id !== bubble.id))
  }, 2000)
}
```

### After Bath:
- Pet looks shiny (increased brightness filter)
- Fresh particle effect
- Happiness boost (+10)

---

## 👕 CLOTHING & ACCESSORIES

### Wearable Items:

```javascript
const CLOTHING = [
  // Hats
  { id: 'hat_chef', name: 'Chef Hat', cost: 150, icon: '👨‍🍳', position: { x: 50, y: -10 } },
  { id: 'hat_garden', name: 'Garden Hat', cost: 150, icon: '👒', position: { x: 50, y: -10 } },
  { id: 'hat_crown', name: 'Crown', cost: 300, icon: '👑', position: { x: 50, y: -15 } },
  
  // Wings
  { id: 'wings_white', name: 'Angel Wings', cost: 200, icon: '🪽', position: { x: 50, y: 50 }, layer: 'back' },
  { id: 'wings_black', name: 'Dark Wings', cost: 200, icon: '🦇', position: { x: 50, y: 50 }, layer: 'back' },
  
  // Glasses
  { id: 'glasses_round', name: 'Round Glasses', cost: 80, icon: '👓', position: { x: 50, y: 35 } },
  { id: 'glasses_sun', name: 'Sunglasses', cost: 90, icon: '🕶️', position: { x: 50, y: 35 } },
  
  // Clothes
  { id: 'shirt_red', name: 'Red Shirt', cost: 100, icon: '👕', position: { x: 50, y: 60 } },
  { id: 'sweater', name: 'Sweater', cost: 150, icon: '🧥', position: { x: 50, y: 60 } },
  
  // Capes
  { id: 'cape_hero', name: 'Hero Cape', cost: 200, icon: '🦸', position: { x: 50, y: 70 }, layer: 'back' }
]
```

### Positioning System:

```javascript
const renderAccessory = (item) => {
  const config = CLOTHING.find(c => c.id === item.id)
  return (
    <div 
      className={`pet-accessory ${config.layer || 'front'}`}
      style={{
        left: `${config.position.x}%`,
        top: `${config.position.y}%`,
        transform: 'translate(-50%, -50%)',
        zIndex: config.layer === 'back' ? 5 : 15
      }}
    >
      {config.icon}
    </div>
  )
}
```

---

## 🪑 FURNITURE SYSTEM

### Scale Proportionally to Pet:

```javascript
const PET_SIZE = 160 // px

const FURNITURE_SCALES = {
  bed: { width: PET_SIZE * 1.5, height: PET_SIZE * 0.6 },
  lamp: { width: PET_SIZE * 0.3, height: PET_SIZE * 1.2 },
  bathtub: { width: PET_SIZE * 1.3, height: PET_SIZE * 0.5 },
  chair: { width: PET_SIZE * 0.5, height: PET_SIZE * 0.6 },
  table: { width: PET_SIZE * 1.2, height: PET_SIZE * 0.7 }
}

const renderFurniture = (item) => {
  const scale = FURNITURE_SCALES[item.type]
  return (
    <div 
      className="furniture-item"
      style={{
        width: `${scale.width}px`,
        height: `${scale.height}px`,
        fontSize: `${PET_SIZE * 0.4}px`
      }}
    >
      {item.icon}
    </div>
  )
}
```

### Furniture Catalog:

```javascript
const FURNITURE = [
  { id: 'bed_basic', name: 'Basic Bed', cost: 100, icon: '🛏️', type: 'bed' },
  { id: 'bed_cozy', name: 'Cozy Bed', cost: 200, icon: '🛏️', type: 'bed' },
  { id: 'lamp', name: 'Lamp', cost: 50, icon: '💡', type: 'lamp' },
  { id: 'bathtub', name: 'Bathtub', cost: 150, icon: '🛁', type: 'bathtub' },
  { id: 'chair', name: 'Chair', cost: 80, icon: '🪑', type: 'chair' },
  { id: 'table', name: 'Table', cost: 120, icon: '🪵', type: 'table' },
  { id: 'plant', name: 'Plant', cost: 40, icon: '🪴', type: 'decoration' }
]
```

---

## 🎵 MUSIC SYSTEM

### Built-in Looping BGM:

```javascript
const MUSIC_TRACKS = [
  { id: 'lofi', name: 'Lofi Beats', icon: '🎵', mood: 'calm' },
  { id: 'rain', name: 'Rain Sounds', icon: '🌧️', mood: 'calm' },
  { id: 'piano', name: 'Cozy Piano', icon: '🎹', mood: 'cozy' },
  { id: 'cafe', name: 'Cafe Ambience', icon: '☕', mood: 'cheerful' },
  { id: 'nature', name: 'Nature Sounds', icon: '🌿', mood: 'calm' }
]

const [music, setMusic] = useState({
  enabled: false,
  track: 'lofi',
  volume: 0.5
})

// Audio element
const audioRef = useRef(new Audio())

useEffect(() => {
  if (music.enabled) {
    audioRef.current.src = `/audio/${music.track}.mp3`
    audioRef.current.loop = true
    audioRef.current.volume = music.volume
    audioRef.current.play()
  } else {
    audioRef.current.pause()
  }
}, [music.enabled, music.track, music.volume])
```

### Volume Control:

```javascript
const VolumeControl = () => (
  <div className="volume-control">
    <button onClick={() => setMusic(prev => ({ ...prev, enabled: !prev.enabled }))}>
      {music.enabled ? '🔊' : '🔇'}
    </button>
    <input
      type="range"
      min="0"
      max="1"
      step="0.1"
      value={music.volume}
      onChange={(e) => {
        setMusic(prev => ({ ...prev, volume: parseFloat(e.target.value) }))
        audioRef.current.volume = parseFloat(e.target.value)
      }}
    />
  </div>
)
```

---

## 🎨 AESTHETIC REQUIREMENTS

### Color Palette:

```css
:root {
  --pastel-pink: #FFB6C1;
  --pastel-blue: #B6E5FF;
  --pastel-green: #C1FFD4;
  --pastel-yellow: #FFE5B6;
  --pastel-purple: #E5B6FF;
  --cream: #FFF8F0;
  --soft-white: #FFFAFA;
}
```

### Rounded UI:

```css
.cute-button {
  border-radius: 16px;
  padding: 12px 24px;
}

.cute-card {
  border-radius: 24px;
  background: linear-gradient(135deg, var(--soft-white), var(--cream));
}
```

### Smooth Animations:

```css
@keyframes breathe {
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(1.02); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes sparkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}
```

### Particle Effects:

```javascript
const spawnParticles = (type) => {
  const container = document.querySelector('.particles-container')
  const count = type === 'heart' ? 10 : type === 'sparkle' ? 15 : 8
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div')
    particle.className = `particle ${type}`
    particle.style.left = `${40 + Math.random() * 20}%`
    particle.style.top = `${40 + Math.random() * 20}%`
    particle.textContent = type === 'heart' ? '❤️' : type === 'sparkle' ? '✨' : '💖'
    container.appendChild(particle)
    
    setTimeout(() => particle.remove(), 1500)
  }
}
```

---

## 🔧 TECHNICAL REQUIREMENTS

### State Management Structure:

```javascript
// Main state
const [pet, setPet] = useState({
  // Core stats
  hunger: 80,
  energy: 80,
  happiness: 80,
  cleanliness: 100,
  health: 100,
  
  // Visual state
  expression: 'normal',
  animation: null,
  isSleeping: false,
  isSick: false,
  
  // Inventory
  coins: 100,
  foods: [],
  furniture: [],
  clothes: [],
  
  // Equipment
  equippedClothes: [],
  equippedAccessories: [],
  
  // Environment
  environment: 'pastel_room',
  selectedBed: 'no_bed',
  hasBathtub: false
})

// Planner state
const [planner, setPlanner] = useState({
  tasks: [],
  habits: [],
  moods: [],
  journals: [],
  pomodoros: []
})

// Mini game state
const [miniGame, setMiniGame] = useState({
  active: false,
  type: null,
  score: 0,
  coins: 0
})

// Music state
const [music, setMusic] = useState({
  enabled: false,
  track: 'lofi',
  volume: 0.5
})
```

### How Stat Updates Trigger Re-render:

```javascript
// React automatically re-renders when state changes
setStats(prev => ({
  ...prev,
  happiness: prev.happiness - 0.15
}))
// ↓ This triggers re-render
// ↓ Expression recalculates
// ↓ Visual updates
```

### Expression Binding to Stats:

```javascript
// Computed value based on stats
const expression = useMemo(() => {
  if (pet.isSick) return 'sick'
  if (pet.hunger < 30) return 'hungry'
  if (pet.energy < 30) return 'tired'
  if (pet.happiness < 40) return 'sad'
  if (pet.happiness > 80) return 'happy'
  return 'normal'
}, [pet.isSick, pet.hunger, pet.energy, pet.happiness])
```

### Mini Games → Coin System:

```javascript
const completeMiniGame = (gameType, score) => {
  const baseCoins = Math.floor(score / 5)
  const bonus = calculateClothingBonus(gameType)
  const total = baseCoins + bonus
  
  setPet(prev => ({
    ...prev,
    coins: prev.coins + total
  }))
  
  showMessage(`+${total} coins!`)
}
```

### Planner → Pet Stats Connection:

```javascript
// Task completion
const completeTask = (id) => {
  setPlanner(prev => ({
    tasks: prev.tasks.map(t => 
      t.id === id ? { ...t, completed: true } : t
    )
  }))
  
  setPet(prev => ({
    ...prev,
    happiness: Math.min(100, prev.happiness + 5)
  }))
  
  spawnParticles('heart')
}
```

### Furniture Scaling Calculation:

```javascript
const PET_BASE_SIZE = 160 // pixels

const calculateFurnitureSize = (type) => {
  const scales = {
    bed: { w: 1.5, h: 0.6 },
    lamp: { w: 0.3, h: 1.2 },
    bathtub: { w: 1.3, h: 0.5 },
    chair: { w: 0.5, h: 0.6 },
    table: { w: 1.2, h: 0.7 }
  }
  
  const scale = scales[type]
  return {
    width: PET_BASE_SIZE * scale.w,
    height: PET_BASE_SIZE * scale.h
  }
}
```

### Animation Loop:

```javascript
useEffect(() => {
  let animationFrame
  
  const animate = () => {
    // Update breathing animation
    setBreathOffset(prev => (prev + 0.01) % (Math.PI * 2))
    
    // Update floating particles
    setParticles(prev => 
      prev.map(p => ({
        ...p,
        y: p.y - 0.5,
        opacity: p.opacity - 0.01
      })).filter(p => p.opacity > 0)
    )
    
    animationFrame = requestAnimationFrame(animate)
  }
  
  animate()
  return () => cancelAnimationFrame(animationFrame)
}, [])
```

---

## 📁 Implementation Files

### Existing (Extended):
- `/src/pages/CuteVirtualPet.jsx` - Main component
- `/src/pages/CuteVirtualPet.css` - Styles

### New (To Create):
- `/src/hooks/usePetStats.js` - Stat management hook
- `/src/hooks/usePlanner.js` - Planner integration hook
- `/src/components/PetExpression.js` - Expression renderer
- `/src/components/MiniGames/` - Mini game components
- `/src/utils/petAnimations.js` - Animation utilities

---

**This plan extends the existing architecture without rewriting!** ✨
