# Virtual Pet Planner System - Implementation Architecture

## Current System Overview

The existing Virtual Pet system already has:
- ✅ Pet types (bear, dog, cat, bunny, elephant)
- ✅ Basic stats (happiness, hunger, energy, fun, health, hygiene)
- ✅ Food system with 20 items
- ✅ Clothes & accessories with stat bonuses
- ✅ Sleep system with bed quality multipliers
- ✅ Environment system (house, forest, garden, etc.)
- ✅ Eating animation with apple
- ✅ Mini games (whack-a-mole, memory, bubble)
- ✅ Shop system
- ✅ Evolution system (baby → child → adult)

## New Features to Add

### 1. PLANNER SYSTEM
### 2. ENHANCED PET VISUALS (Eyes always visible, proper expressions)
### 3. SICKNESS SYSTEM
### 4. BATH SYSTEM with bathtub
### 5. EXPANDED FOOD SYSTEM
### 6. MUSIC SYSTEM
### 7. FURNITURE SCALING
### 8. IMPROVED STATE MANAGEMENT

---

## STATE MANAGEMENT STRUCTURE

### Current Pet State (Extended)
```javascript
const [pet, setPet] = useState({
  // Identity
  type: 'bear',
  name: 'Mochi',
  level: 1,
  
  // Core Stats (0-100)
  happiness: 80,
  hunger: 50,      // 0 = full, 100 = starving
  energy: 80,
  fun: 70,
  health: 100,
  hygiene: 100,
  
  // Progression
  xp: 0,
  xpToNext: 100,
  coins: 500,
  
  // Inventory
  foods: [],
  clothes: [],
  equippedClothes: [],
  equippedAccessories: [],
  
  // Environment
  roomTheme: 'default',
  environment: 'house',
  selectedBed: 'no_bed',
  furniture: [],
  lighting: 'warm',
  
  // States
  isSick: false,
  isSleeping: false,
  sleepRotation: 0,
  isWalking: false,
  walkPosition: 50,
  
  // NEW: Planner System
  tasks: [],           // Daily tasks
  habits: [],          // Habit tracker
  moodLogs: [],        // Mood history
  journalEntries: [],  // Journal notes
  studySessions: [],   // Pomodoro sessions
  
  // NEW: Pet Visual State
  currentExpression: 'normal',
  eyeState: 'open',
  isBlinking: false,
  sicknessLevel: 0,
  
  // NEW: Music
  musicEnabled: false,
  musicTrack: 'lofi',
  volume: 0.5
})
```

---

## HOW STAT UPDATES TRIGGER RE-RENDER

### Mechanism:
1. **State Change**: `setPet()` updates state
2. **React Re-render**: Component re-renders automatically
3. **Expression Update**: `useEffect` watches stats → updates expression
4. **Visual Update**: CSS classes change based on expression state

### Implementation:
```javascript
// Stat decay timer
useEffect(() => {
  const timer = setInterval(() => {
    setPet(p => {
      // Calculate new stats
      const newHunger = Math.min(100, p.hunger + 0.3)
      const newEnergy = p.isSleeping ? Math.min(100, p.energy + 0.5) : Math.max(0, p.energy - 0.15)
      
      // Trigger expression update
      if (newHunger > 90 || p.health < 30) {
        setPetExpression('sick')
      } else if (p.happiness < 30) {
        setPetExpression('sad')
      } else if (p.happiness > 80) {
        setPetExpression('happy')
      }
      
      return { ...p, hunger: newHunger, energy: newEnergy }
    })
  }, 3000)
  
  return () => clearInterval(timer)
}, [])

// Expression watcher
useEffect(() => {
  // Update eye state based on expression
  if (petExpression === 'tired') {
    setEyeState('half-closed')
  } else if (petExpression === 'happy') {
    setEyeState('curved')
  } else if (petExpression === 'sick') {
    setEyeState('small-dots')
  } else {
    setEyeState('open')
  }
}, [petExpression, pet.health, pet.hunger, pet.happiness])
```

---

## HOW EXPRESSIONS BIND TO STATS

### Expression Logic Tree:
```javascript
const getExpression = () => {
  // Sickness priority (highest)
  if (pet.health < 30 || pet.isSick) return 'sick'
  
  // Critical stats
  if (pet.hunger > 90) return 'hungry'
  if (pet.energy < 20) return 'tired'
  if (pet.hygiene < 30) return 'dirty'
  
  // Mood states
  if (pet.happiness < 30) return 'sad'
  if (pet.happiness > 80) return 'happy'
  if (pet.fun < 30) return 'bored'
  
  // Default
  return 'normal'
}
```

### Visual Mapping:
```javascript
const expressionVisuals = {
  normal: { eyes: '• •', mouth: '⌣', blush: false },
  happy: { eyes: '^ ^', mouth: '◡', blush: true },
  sad: { eyes: '• •', mouth: '⌢', blush: false },
  sick: { eyes: '× ×', mouth: '︿', blush: false, pale: true },
  tired: { eyes: '¯ ¯', mouth: '‿', blush: false },
  hungry: { eyes: '• •', mouth: '○', blush: false },
  excited: { eyes: '⭐ ⭐', mouth: '▽', blush: true },
  dirty: { eyes: '• •', mouth: '﹏', blush: false }
}
```

---

## PLANNER SYSTEM INTEGRATION

### How Planner Connects to Pet Stats:

```javascript
// Task completion
const completeTask = (taskId) => {
  const task = tasks.find(t => t.id === taskId)
  
  // Update task state
  setTasks(prev => prev.map(t => 
    t.id === taskId ? { ...t, completed: true } : t
  ))
  
  // Pet reacts
  setPet(p => ({
    ...p,
    happiness: Math.min(100, p.happiness + task.difficulty * 5),
    coins: p.coins + task.difficulty * 10,
    xp: p.xp + task.difficulty * 15
  }))
  
  // Show pet celebration animation
  setAnimation('celebrate')
}

// Mood logging
const logMood = (mood) => {
  setMoodLogs(prev => [...prev, { mood, timestamp: Date.now() }])
  
  // Pet mirrors user mood
  const moodMap = {
    happy: { happiness: 10, fun: 5 },
    tired: { energy: -5 },
    calm: { happiness: 5 },
    stressed: { happiness: -5, energy: -5 },
    productive: { happiness: 8, xp: 10 }
  }
  
  setPet(p => ({
    ...p,
    ...moodMap[mood]
  }))
}

// Study timer (Pomodoro)
const completeStudySession = (duration) => {
  setStudySessions(prev => [...prev, { duration, timestamp: Date.now() }])
  
  setPet(p => ({
    ...p,
    coins: p.coins + Math.floor(duration / 25) * 20,
    happiness: Math.min(100, p.happiness + 5),
    energy: Math.max(0, p.energy - 10)
  }))
}
```

---

## MINI GAMES vs PLAY MODE

### Mini Games (Coin Earning):
```javascript
// Separate game state
const [miniGame, setMiniGame] = useState({
  active: false,
  type: null,  // 'whack', 'garden', 'cooking'
  score: 0,
  reward: 0
})

const endMiniGame = (won, score) => {
  const coinReward = score * 5
  
  setPet(p => ({
    ...p,
    coins: p.coins + coinReward,
    happiness: won ? p.happiness + 15 : p.happiness - 5,
    energy: p.energy - 10
  }))
  
  setMiniGame({ active: false, type: null, score: 0, reward: 0 })
}
```

### Play Mode (Bonding):
```javascript
const playWithPet = (toy) => {
  // No coins, just happiness
  setPet(p => ({
    ...p,
    happiness: Math.min(100, p.happiness + 20),
    energy: Math.max(0, p.energy - 15),
    fun: Math.min(100, p.fun + 25)
  }))
  
  setAnimation('playing')
}
```

---

## SICKNESS SYSTEM

### Sickness Logic:
```javascript
// Check sickness conditions
useEffect(() => {
  const sicknessFactors = {
    hunger: pet.hunger > 90 ? 0.3 : 0,
    hygiene: pet.hygiene < 30 ? 0.3 : 0,
    energy: pet.energy < 20 ? 0.2 : 0,
    health: pet.health < 50 ? 0.2 : 0
  }
  
  const totalRisk = Object.values(sicknessFactors).reduce((a, b) => a + b, 0)
  
  if (totalRisk > 0.5 && !pet.isSick && Math.random() < 0.05) {
    setPet(p => ({ ...p, isSick: true, sicknessLevel: 1 }))
    showMessage('😷 ' + pet.name + ' got sick!')
  }
  
  if (pet.isSick) {
    // Gradual health drain
    const drain = 0.5 * (1 - pet.sicknessLevel * 0.2)
    setPet(p => ({ ...p, health: Math.max(0, p.health - drain) }))
  }
}, [pet.hunger, pet.hygiene, pet.energy, pet.health, pet.isSick])

// Medicine effect
const useMedicine = () => {
  setPet(p => ({
    ...p,
    isSick: false,
    sicknessLevel: 0,
    health: Math.min(100, p.health + 30)
  }))
  setAnimation('heal')
}
```

---

## BATH SYSTEM

### Bathtub Furniture:
```javascript
const BATHTUBS = [
  { id: 'small_tub', name: 'Small Tub', size: 1.2, cost: 200 },
  { id: 'medium_tub', name: 'Medium Tub', size: 1.5, cost: 400 },
  { id: 'large_tub', name: 'Large Tub', size: 1.8, cost: 600 }
]

const takeBath = () => {
  if (pet.isSick) {
    showMessage('Too sick for bath!')
    return
  }
  
  setAnimation('bathing')
  
  // Bath animation sequence
  setTimeout(() => {
    setPet(p => ({
      ...p,
      hygiene: 100,
      happiness: Math.min(100, p.happiness + 10),
      health: Math.min(100, p.health + 5)
    }))
    showMessage('🛁 So clean and fresh!')
    createParticles('sparkle')
  }, 3000)
}
```

---

## FURNITURE SCALING

### Scale Calculation:
```javascript
const PET_BASE_SIZE = 100  // Base pet size in pixels

const calculateFurnitureScale = (furnitureType) => {
  const petScale = evolutionStage.size  // 0.85 (baby), 1.0 (child), 1.1 (adult)
  
  const scales = {
    bed: 1.5 * petScale,      // Bed is 1.5x pet size
    bathtub: 1.3 * petScale,  // Tub is 1.3x pet size
    chair: 0.8 * petScale,    // Chair is 0.8x pet size
    table: 1.2 * petScale,    // Table is 1.2x pet size
    lamp: 1.1 * petScale      // Lamp is 1.1x pet height
  }
  
  return scales[furnitureType] || 1.0
}

// Usage in CSS
const furnitureStyle = {
  transform: `scale(${calculateFurnitureScale(item.type)})`
}
```

---

## MUSIC SYSTEM

### Background Music:
```javascript
const MUSIC_TRACKS = {
  lofi: { url: '/music/lofi.mp3', mood: 'calm' },
  rain: { url: '/music/rain.mp3', mood: 'calm' },
  piano: { url: '/music/piano.mp3', mood: 'cozy' },
  cafe: { url: '/music/cafe.mp3', mood: 'cheerful' }
}

// Music state
const [music, setMusic] = useState({
  enabled: false,
  track: 'lofi',
  volume: 0.5,
  audio: null
})

// Music controller
useEffect(() => {
  if (music.enabled) {
    const audio = new Audio(MUSIC_TRACKS[music.track].url)
    audio.loop = true
    audio.volume = music.volume
    audio.play()
    
    setMusic(m => ({ ...m, audio }))
    
    return () => {
      audio.pause()
      audio.currentTime = 0
    }
  }
}, [music.enabled, music.track])

const toggleMusic = () => {
  setMusic(m => ({ ...m, enabled: !m.enabled }))
}

const changeTrack = (track) => {
  setMusic(m => ({ ...m, track }))
}

const setVolume = (vol) => {
  if (music.audio) {
    music.audio.volume = vol
  }
  setMusic(m => ({ ...m, volume: vol }))
}
```

---

## ANIMATION LOOP

### How Animation Loop Works:
```javascript
// Blink animation
useEffect(() => {
  const blinkInterval = setInterval(() => {
    setEyeState('closed')
    setTimeout(() => {
      setEyeState(currentExpression === 'happy' ? 'curved' : 'open')
    }, 200)
  }, 4000)  // Blink every 4 seconds
  
  return () => clearInterval(blinkInterval)
}, [currentExpression])

// Breathing animation (CSS)
@keyframes breathe {
  0%, 100% { transform: scale(1) }
  50% { transform: scale(1.02) }
}

.cute-pet-body {
  animation: breathe 3s ease-in-out infinite
}
```

---

## IMPLEMENTATION PRIORITY

1. ✅ Fix pet visual structure (eyes always visible)
2. ✅ Add planner system UI
3. ✅ Connect planner to pet stats
4. ✅ Implement sickness system
5. ✅ Add bath system
6. ✅ Expand food shop
7. ✅ Add music system
8. ✅ Fix furniture scaling

---

## TECHNICAL NOTES

- **DO NOT** rewrite existing architecture
- **DO** extend current state management
- **DO** maintain backward compatibility
- **DO** use existing animation system
- **DO** keep pastel aesthetic
- **DO** ensure smooth transitions

All new features must integrate cleanly with existing code.
