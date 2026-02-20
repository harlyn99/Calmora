# 🎮 Mini Games & Systems Integration Guide

## ✅ Extended Features (NOT Redesigned)

All features extend the existing architecture without rebuilding.

---

## 1. MINI GAME SYSTEM

### Three Fully Designed Games:

### A) Whack-a-Mole (Cozy Version) 🔨

**Features:**
- ✅ Grid of 9 soft pastel holes
- ✅ Cute mole with dot eyes (• • ω)
- ✅ Smooth pop-up animation (1.5s)
- ✅ Random spawn every 800ms
- ✅ 60-second timer
- ✅ Combo system for consecutive hits
- ✅ **NEW**: Wrong tap penalty (-5 score, reset combo)
- ✅ Score → Coin conversion

**Game Logic:**
```javascript
// Hit mole
const hitMole = (id) => {
  setGameState(prev => ({
    ...prev,
    score: prev.score + 10 * (prev.combo + 1), // Combo multiplier
    combo: prev.combo + 1
  }))
}

// Wrong tap penalty
const handleMiss = () => {
  setGameState(prev => ({
    ...prev,
    combo: 0,
    score: Math.max(0, prev.score - 5) // Small penalty
  }))
}

// Mole escapes (lose combo)
setTimeout(() => {
  setGameState(prev => ({
    ...prev,
    items: prev.items.filter(i => i.id !== newMole.id),
    combo: 0 // Lose combo if mole escapes
  }))
}, 1500)
```

**Coin Conversion:**
```javascript
const completeMiniGame = (gameId, score) => {
  const game = MINI_GAMES.find(g => g.id === gameId)
  const bonuses = calculateItemBonuses(...)
  
  // Get game-specific bonus
  let gameBonus = 0
  if (gameId === 'whack') gameBonus = bonuses.whackBonus || 0
  
  // Formula: score × baseReward × (1 + bonus/100)
  const multiplier = 1 + (gameBonus / 100)
  const coins = Math.floor(score * game.baseReward * multiplier)
  
  setPet(p => ({
    ...p,
    coins: p.coins + coins,
    happiness: Math.min(100, p.happiness + 10)
  }))
}
```

**Clothing Bonuses:**
- Hammer Hat → +25% whack coins
- Chef Hat → No bonus (cooking only)
- Garden Hat → No bonus (garden only)

---

### B) Garden Catch 🧺

**Features:**
- ✅ Fruits fall from top (🍎🍓🍑🥕🍇)
- ✅ Player taps fruit before hitting ground
- ✅ **NEW**: If missed, happiness decreases (-3 per fruit)
- ✅ Increasing difficulty (faster fall over time)
- ✅ Soft floating animation
- ✅ Score multiplier system (up to 5x)

**Game Logic:**
```javascript
// Catch fruit
const handleCatch = (fruitId) => {
  const fruit = gameState.items.find(f => f.id === fruitId)
  setGameState(prev => ({
    ...prev,
    score: prev.score + fruit.value * prev.multiplier,
    multiplier: Math.min(5, prev.multiplier + 0.5), // Increase multiplier
    items: prev.items.filter(f => f.id !== fruitId)
  }))
}

// Miss detection (fruit hits ground)
const fallInterval = setInterval(() => {
  setGameState(prev => {
    const missed = prev.items.filter(item => item.y >= 90)
    if (missed.length > 0 && onMiss) {
      onMiss(missed.length) // Trigger mood decrease
    }
    return {
      ...prev,
      items: prev.items.filter(item => item.y < 95),
      multiplier: missed.length > 0 ? 1 : prev.multiplier // Reset on miss
    }
  })
}, 50)
```

**Mood Decrease on Miss:**
```javascript
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
```

**Clothing Bonuses:**
- Garden Hat → +25% garden coins
- Chef Hat → No bonus
- Hammer Hat → No bonus

---

### C) Cooking Match 🍳

**Features:**
- ✅ Simple match-3 puzzle
- ✅ Ingredients: 🥚🥛🌾🥕🐟
- ✅ Matching creates food item
- ✅ Reward: coins + pet happiness boost
- ✅ Cozy and clean UI

**Game Logic:**
```javascript
// Check for matches
const checkMatch = () => {
  const matched = findMatches(grid)
  if (matches.length >= 3) {
    setScore(prev => prev + matches.length * 10)
    setHappiness(prev => prev + matches.length * 2)
    removeMatches(matches)
    createParticles('heart')
  }
}

// Match detection (rows and columns)
for (let r = 0; r < 4; r++) {
  for (let c = 0; c < 2; c++) {
    const idx = r * 4 + c
    if (prev[idx]?.icon === prev[idx + 1]?.icon && 
        prev[idx]?.icon === prev[idx + 2]?.icon) {
      matched.add(idx)
      matched.add(idx + 1)
      matched.add(idx + 2)
    }
  }
}
```

**Clothing Bonuses:**
- Chef Hat → +25% cooking coins
- Garden Hat → No bonus
- Hammer Hat → No bonus

---

## 2. CLOTHING SYSTEM EXPANSION

### Expanded Catalog (24 Items Total)

**Categories:**

#### Pajamas (4 items) - Energy Recovery Bonus
```javascript
{ id: 'pajamas_blue', bonus: { energyRecovery: 50 } },
{ id: 'pajamas_pink', bonus: { energyRecovery: 50 } },
{ id: 'pajamas_white', bonus: { energyRecovery: 70 } },
{ id: 'pajamas_green', bonus: { energyRecovery: 60 } }
```

**Effect:**
```javascript
// In stat decay
const energyRecoveryBonus = bonuses.energyRecovery || 0
const newEnergy = pet.isSleeping
  ? Math.min(100, pet.energy + (0.5 * sleepQuality) + (energyRecoveryBonus / 100))
  : Math.max(0, pet.energy - 0.2)
```

#### Sweaters (4 items) - Happiness Gain Bonus
```javascript
{ id: 'sweater_red', bonus: { happinessGain: 20 } },
{ id: 'sweater_beige', bonus: { happinessGain: 20 } },
{ id: 'sweater_blue', bonus: { happinessGain: 20 } },
{ id: 'sweater_pink', bonus: { happinessGain: 25 } }
```

**Effect:**
```javascript
// When eating food
if (bonuses.happinessGain) {
  happinessGain *= (1 + bonuses.happinessGain / 100)
}

// In stat decay
const happinessDecay = Math.max(0.05, 0.15 - (bonuses.happinessGain / 1000))
```

#### Wings (3 items) - Happiness & XP Boost
```javascript
{ id: 'wings_white', bonus: { happiness: 25, xp: 15 } },
{ id: 'wings_black', bonus: { happiness: 25, xp: 15 } },
{ id: 'wings_rainbow', bonus: { happiness: 35, xp: 20 } }
```

#### Scarves (3 items) - Mood Stability
```javascript
{ id: 'scarf_red', bonus: { moodStability: 15 } },
{ id: 'scarf_blue', bonus: { moodStability: 15 } },
{ id: 'scarf_pink', bonus: { moodStability: 18 } }
```

**Effect:**
```javascript
// Reduces happiness decay
const moodStability = bonuses.moodStability || 0
const happinessDecay = Math.max(0.05, 0.15 - (moodStability / 100))
```

#### Costumes (3 items) - Special Bonuses
```javascript
{ id: 'costume_chef', bonus: { cookingBonus: 30, happiness: 10 } },
{ id: 'costume_nurse', bonus: { health: 15, energyRecovery: 30 } },
{ id: 'costume_wizard', bonus: { xp: 25, happiness: 15 } }
```

#### Hats (8 items) - Mini Game Bonuses
```javascript
{ id: 'hat_chef', bonus: { cookingBonus: 25 } },      // Cooking match
{ id: 'hat_garden', bonus: { gardenBonus: 25 } },     // Garden catch
{ id: 'hat_hammer', bonus: { whackBonus: 25 } },      // Whack-a-mole
{ id: 'hat_crown', bonus: { all: 10, coinBonus: 15 } },
{ id: 'hat_flower', bonus: { happiness: 15 } },
{ id: 'hat_santa', bonus: { happiness: 20, coinBonus: 10 } },
{ id: 'hat_witch', bonus: { xp: 15, happiness: 10 } },
{ id: 'hat_cap', bonus: { energy: 10 } }
```

#### Bows (3 items) - Coin & Happiness
```javascript
{ id: 'bow_pink', bonus: { happiness: 10, coinBonus: 5 } },
{ id: 'bow_blue', bonus: { energy: 8, coinBonus: 5 } },
{ id: 'bow_red', bonus: { happiness: 12, coinBonus: 8 } }
```

#### Glasses (3 items) - XP & Mood
```javascript
{ id: 'glasses_round', bonus: { xp: 10 } },
{ id: 'glasses_sun', bonus: { moodStability: 15, happiness: 5 } },
{ id: 'glasses_heart', bonus: { happiness: 20 } }
```

### Layering System (Prevents Visual Bugs)

**Render Order (z-index):**
```jsx
<div className="cute-pet-container">
  {/* Layer 8: Back Accessories (Wings) */}
  {equippedBack && <BackAccessory />}  // z-index: 8
  
  {/* Base Pet Body */}
  <div className="cute-pet-body">...</div>  // z-index: 5
  
  {/* Layer 9: Body Clothes (Pajamas, Sweaters) */}
  {equippedBody && <BodyClothes />}  // z-index: 9
  
  {/* Layer 11: Neck Accessories (Scarves) */}
  {equippedNeck && <NeckAccessory />}  // z-index: 11
  
  {/* Pet Face (Eyes, Mouth, Blush) */}
  <div className="cute-pet-face">...</div>  // z-index: 20
  
  {/* Layer 12: Head Accessories (Hats, Bows) */}
  {equippedHead && <HeadAccessory />}  // z-index: 12
  
  {/* Layer 13: Face Accessories (Glasses) */}
  {equippedFace && <FaceAccessory />}  // z-index: 13
</div>
```

**CSS Positioning:**
```css
.back-accessory { z-index: 8; }
.pet-body { z-index: 5; }
.body-clothes { z-index: 9; }
.neck-accessory { z-index: 11; }
.pet-face { z-index: 20; }
.head-accessory { z-index: 12; }
.face-accessory { z-index: 13; }

/* Prevent clipping */
.clothes-overlay {
  pointer-events: none;
  mix-blend-mode: multiply;
  isolation: isolate;
}
```

**Animation Adaptation:**
```css
/* Pajamas adapt to sleep pose */
.cute-pet-container.sleeping .body-clothes {
  transform: rotate(15deg) scale(0.95);
}

/* Wings adjust during all animations */
.back-accessory {
  animation: wingFlutter 3s ease-in-out infinite;
}

@keyframes wingFlutter {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}
```

---

## 3. FOOD SYSTEM EXPANSION

### Expanded Catalog (20 Foods Total)

**Food Types & Effects:**

#### Fruits (6 items) - Balanced + Happiness
```javascript
{ id: 'apple', happiness: 15, energy: 0, fill: 20, type: 'fruit' },
{ id: 'strawberry', happiness: 20, energy: 0, fill: 15, type: 'fruit' },
{ id: 'banana', happiness: 12, energy: 8, fill: 18, type: 'fruit' },
{ id: 'carrot', happiness: 12, energy: 0, fill: 18, type: 'vegetable' },
{ id: 'peach', happiness: 18, energy: 5, fill: 16, type: 'fruit' },
{ id: 'grape', happiness: 16, energy: 3, fill: 14, type: 'fruit' }
```

**Effect:**
```javascript
if (food.type === 'fruit') {
  happinessGain *= 1.2  // +20% happiness
  fillAmount *= 1.1     // +10% fill
}
```

#### Treats (6 items) - High Happiness, Energy Drop
```javascript
{ id: 'cookie', happiness: 20, energy: -5, fill: 15, type: 'treat' },
{ id: 'cake', happiness: 30, energy: -10, fill: 20, type: 'treat' },
{ id: 'icecream', happiness: 25, energy: -8, fill: 12, type: 'treat' },
{ id: 'donut', happiness: 22, energy: -6, fill: 16, type: 'treat' },
{ id: 'candy', happiness: 15, energy: -3, fill: 8, type: 'treat' },
{ id: 'chocolate', happiness: 20, energy: -4, fill: 12, type: 'treat' }
```

**Effect:**
```javascript
if (food.type === 'treat') {
  happinessGain *= 1.3  // +30% happiness
  energyGain -= 3       // Extra energy drop
}
```

#### Meals (5 items) - High Fill, Balanced
```javascript
{ id: 'fish', happiness: 25, energy: 10, fill: 25, type: 'meal' },
{ id: 'sandwich', happiness: 18, energy: 5, fill: 22, type: 'meal' },
{ id: 'rice', happiness: 15, energy: 8, fill: 28, type: 'meal' },
{ id: 'noodles', happiness: 17, energy: 10, fill: 26, type: 'meal' },
{ id: 'soup', happiness: 16, energy: 12, fill: 20, type: 'meal' }
```

**Effect:**
```javascript
if (food.type === 'meal') {
  fillAmount *= 1.3     // +30% fill
  energyGain *= 1.1     // +10% energy
}
```

#### Drinks (4 items) - Energy Boost
```javascript
{ id: 'milk', happiness: 15, energy: 15, fill: 10, type: 'drink' },
{ id: 'juice', happiness: 16, energy: 12, fill: 8, type: 'drink' },
{ id: 'tea', happiness: 12, energy: 8, fill: 6, type: 'drink' },
{ id: 'coffee', happiness: 10, energy: 20, fill: 5, type: 'drink' }
```

**Effect:**
```javascript
if (food.type === 'drink') {
  energyGain *= 1.3     // +30% energy
  fillAmount *= 0.8     // -20% fill
}
```

### Feeding Animation

```javascript
const feedPet = (food) => {
  setAnimation('eating')
  setEatingState({ isEating: true, foodItem: food, size: 1, bites: 0 })
  
  // Bite animation (decrease size per bite)
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
```

---

## 4. INTEGRATION EXPLANATION

### How Mini Games Connect to Coin System

```javascript
// 1. Game has base reward
const MINI_GAMES = [
  { id: 'whack', baseReward: 2 },   // 2 coins per point
  { id: 'garden', baseReward: 3 },  // 3 coins per point
  { id: 'cooking', baseReward: 4 }  // 4 coins per point
]

// 2. Calculate clothing bonus
const bonuses = calculateItemBonuses(equippedClothes, equippedAccessories)
let gameBonus = 0
if (gameId === 'whack') gameBonus = bonuses.whackBonus || 0
if (gameId === 'garden') gameBonus = bonuses.gardenBonus || 0
if (gameId === 'cooking') gameBonus = bonuses.cookingBonus || 0

// 3. Apply multiplier
const multiplier = 1 + (gameBonus / 100)
const coins = Math.floor(score * baseReward * multiplier)

// 4. Add to pet coins
setPet(p => ({
  ...p,
  coins: p.coins + coins,
  happiness: Math.min(100, p.happiness + 10) // Small happiness boost
}))
```

### How Clothing Modifies Gameplay Stats

```javascript
// 1. Calculate all bonuses
const calculateItemBonuses = (clothes, accessories) => {
  const bonuses = {
    energyRecovery: 0,
    happinessGain: 0,
    moodStability: 0,
    cookingBonus: 0,
    gardenBonus: 0,
    whackBonus: 0,
    coinBonus: 0,
    xp: 0
  }
  
  // Add clothes bonuses
  clothes?.forEach(itemId => {
    const item = CLOTHING_CATALOG.find(c => c.id === itemId)
    if (item?.bonus) {
      Object.entries(item.bonus).forEach(([key, value]) => {
        bonuses[key] = (bonuses[key] || 0) + value
      })
    }
  })
  
  // Add accessories bonuses
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

// 2. Apply in stat decay
useEffect(() => {
  const timer = setInterval(() => {
    setPet(p => {
      const bonuses = calculateItemBonuses(p.equippedClothes, p.equippedAccessories)
      
      // Energy recovery with pajamas bonus
      const energyRecoveryBonus = bonuses.energyRecovery || 0
      const newEnergy = p.isSleeping
        ? Math.min(100, p.energy + (0.5 * sleepQuality) + (energyRecoveryBonus / 100))
        : Math.max(0, p.energy - 0.2)
      
      // Happiness decay with mood stability
      const moodStability = bonuses.moodStability || 0
      const happinessDecay = Math.max(0.05, 0.15 - (moodStability / 100))
      const newHappiness = Math.max(0, p.happiness - happinessDecay)
      
      return { ...p, energy: newEnergy, happiness: newHappiness }
    })
  }, 3000)
}, [])
```

### How Food Modifies Hunger, Energy, Happiness

```javascript
const completeEating = (food) => {
  // Base values from food
  let happinessGain = food.happiness
  let energyGain = food.energy || 0
  let fillAmount = food.fill
  
  // Type-based modifiers
  if (food.type === 'fruit') {
    // Fruit: Small hunger restore + happiness
    happinessGain *= 1.2
    fillAmount *= 1.1
  } else if (food.type === 'treat') {
    // Treat: Large happiness + small energy drop
    happinessGain *= 1.3
    energyGain -= 3
  } else if (food.type === 'meal') {
    // Meal: Large hunger restore + balanced
    fillAmount *= 1.3
    energyGain *= 1.1
  } else if (food.type === 'drink') {
    // Drink: Energy boost
    energyGain *= 1.3
    fillAmount *= 0.8
  }
  
  // Apply clothing bonuses
  const bonuses = calculateItemBonuses(...)
  if (bonuses.happinessGain) {
    happinessGain *= (1 + bonuses.happinessGain / 100)
  }
  
  // Apply to stats
  setPet(p => ({
    ...p,
    hunger: Math.max(0, p.hunger - fillAmount),     // Decrease hunger
    happiness: Math.min(100, p.happiness + happinessGain), // Increase happiness
    energy: Math.min(100, p.energy + energyGain)    // Increase/decrease energy
  }))
}
```

### How Layering System Prevents Visual Bugs

```javascript
// 1. Z-index hierarchy prevents clipping
const LAYER_ORDER = {
  back: 8,      // Wings (behind body)
  body: 5,      // Pet base
  clothes: 9,   // Pajamas/sweaters (on body)
  neck: 11,     // Scarves (on clothes)
  face: 20,     // Eyes/mouth (always on top)
  head: 12,     // Hats/bows
  faceAcc: 13   // Glasses (on face)
}

// 2. CSS isolation
.clothes-overlay {
  pointer-events: none;  // Can't click through clothes
  mix-blend-mode: multiply;  // Proper color blending
  isolation: isolate;  // Create new stacking context
}

// 3. Position relative to pet
.body-clothes {
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9;
}

// 4. Adapt to animations
.cute-pet-container.sleeping .body-clothes {
  transform: translateX(-50%) rotate(15deg) scale(0.95);
}
```

### How to Extend Current State Management

```javascript
// Current state structure (extended)
const [pet, setPet] = useState({
  // Core stats
  happiness: 80,
  hunger: 30,
  energy: 80,
  cleanliness: 100,
  health: 100,
  
  // Visual states
  expression: 'normal',
  eyeState: 'open',
  isBlinking: false,
  blushVisible: false,
  
  // Sickness
  isSick: false,
  sicknessLevel: 0,
  
  // Bathing
  isBathing: false,
  hasBathtub: false,
  
  // Inventory
  foods: [],
  furniture: [],
  clothes: [],      // Owned clothing IDs
  accessories: [],  // Owned accessory IDs
  equippedClothes: [],     // Currently worn
  equippedAccessories: [], // Currently worn
  
  // Mini games
  coins: 150
})

// Extension pattern (add new fields without breaking existing)
const [planner, setPlanner] = useState({
  dailyTasks: [],
  habits: [],
  userMood: 'calm'
})

// State updates are additive
setPet(p => ({
  ...p,              // Keep existing fields
  coins: p.coins + 10  // Add/modify specific fields
}))
```

---

## 📊 Summary

| System | Integration Method |
|--------|-------------------|
| Mini Games | Connect via coin system, clothing bonuses |
| Clothing | Overlay layers, stat bonuses in decay logic |
| Food | Type-based modifiers, unique stat effects |
| Layering | Z-index hierarchy, CSS isolation |
| State Management | Extend existing structure, don't rebuild |

**All systems extend current architecture without redesign!** ✨
