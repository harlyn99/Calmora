# 🌟 Calmora - Feature Integration Plan

## Executive Summary

This document outlines the high-level implementation plan for integrating new features into the existing virtual pet architecture **without rewriting the current structure**. All features will extend the existing state management and rendering system.

---

## 📋 TABLE OF CONTENTS

1. [Face & Visual Requirements](#1-face--visual-requirements)
2. [Sleep System Extension](#2-sleep-system-extension)
3. [Food & Item Interaction Extension](#3-food--item-interaction-extension)
4. [Clothes System Extension](#4-clothes-system-extension)
5. [Accessories System Extension](#5-accessories-system-extension)
6. [Environment System Upgrade](#6-environment-system-upgrade)
7. [Mini Game System](#7-mini-game-system)
8. [System Integration Requirements](#8-system-integration-requirements)
9. [Rendering Layer Architecture](#9-rendering-layer-architecture)
10. [State Management Extensions](#10-state-management-extensions)

---

## 1. FACE & VISUAL REQUIREMENTS

### Current State
✅ Eyes always visible (dot eyes `• •`)
✅ Blink animation every 4 seconds
✅ Mouth always visible
✅ Blush appears when happiness > 70%

### Required Extensions

#### 1.1 Eye State System (Extend Existing)
```javascript
// Current: eyeState: 'open' | 'closed' | 'curved' | 'half-closed' | 'small-dots'
// Add sleep transformation:
eyeStates: {
  open: '• •',           // Normal
  closed: '¯ ¯',         // Blink/Sleep
  curved: '^ ^',         // Happy
  halfClosed: '- -',     // Tired
  smallDots: '× ×',      // Sick
  sleepCurved: '⌒ ⌒'     // NEW: Sleep closed eyes (small curved lines)
}
```

#### 1.2 Facial Feature Proportions
**Implementation:**
- CSS-based facial features (not hardcoded emoji)
- Proportional scaling with pet size
- Center alignment maintained in all animations

**CSS Structure:**
```css
.pet-face {
  position: relative;
  width: 100%;
  height: 100%;
}

.pet-eyes {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 40px;
}

.pet-eye {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #2d3436;
  transition: all 0.3s ease;
}

.pet-eye.sleep {
  width: 20px;
  height: 8px;
  border-radius: 10px;
  background: transparent;
  border-bottom: 3px solid #2d3436;
}

.pet-mouth {
  position: absolute;
  top: 55%;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 8px;
  border-radius: 0 0 16px 16px;
  border: 3px solid #2d3436;
  border-top: none;
  transition: all 0.3s ease;
}
```

#### 1.3 Blush System Enhancement
**Current:** `showBlush` based on happiness > 70%
**Extension:** Add blush intensity levels

```javascript
blushIntensity: {
  none: 0,      // happiness < 70
  light: 0.5,   // happiness 70-85
  medium: 0.75, // happiness 85-95
  heavy: 1.0    // happiness > 95
}
```

**CSS:**
```css
.pet-blush {
  position: absolute;
  top: 50%;
  width: 20px;
  height: 12px;
  background: radial-gradient(ellipse, rgba(255, 182, 193, 0.6), transparent);
  border-radius: 50%;
  opacity: var(--blush-opacity, 0);
  transition: opacity 0.5s ease;
}

.pet-blush.left { left: -35px; }
.pet-blush.right { right: -35px; }
```

---

## 2. SLEEP SYSTEM EXTENSION

### Current State
✅ `isSleeping` flag exists
✅ Energy recovery with sleep quality multiplier from bed
✅ Auto sleep when energy < 20

### Required Extensions

#### 2.1 Sleep Entry Logic
```javascript
// NEW: Sleep threshold and state
const SLEEP_THRESHOLD = 25 // Energy level to trigger sleep

// Add to pet state:
sleepState: {
  isSleeping: false,
  canSleep: false,        // NEW: Meets sleep conditions
  sleepStage: 'none',     // 'none' | 'drowsy' | 'asleep' | 'deep'
  sleepStartTime: null,   // For tracking sleep duration
  bedAligned: false       // NEW: Positioned on bed
}
```

#### 2.2 Sleeping Animation States

**CSS Animations:**
```css
/* Side rotation for sleep */
.pet-avatar-container.sleeping {
  transform: translateX(-50%) rotate(5deg);
}

/* Body curl inward */
.cute-pet-body.curled {
  transform: scale(0.95) rotate(-2deg);
}

/* Subtle breathing scale */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.03); }
}

.cute-pet-body.sleeping {
  animation: breathe 3s ease-in-out infinite;
}

/* Sleep Z's */
.pet-sleep-z {
  position: absolute;
  top: -40px;
  right: 20px;
  font-size: 24px;
  opacity: 0;
  animation: floatZ 2s ease-in-out infinite;
}

@keyframes floatZ {
  0% { opacity: 0; transform: translateY(0) scale(0.5); }
  50% { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(-30px) scale(1); }
}
```

#### 2.3 Bed Alignment System

```javascript
// NEW: Bed positioning logic
const alignPetToBed = (bedId) => {
  const bed = BEDS.find(b => b.id === bedId)
  if (!bed || bed.id === 'no_bed') return { x: 50, rotation: 0 }
  
  // Snap to bed center position
  return {
    x: 50, // Center aligned
    rotation: 5, // Slight tilt for sleep pose
    offsetY: 10 // Adjust for bed height
  }
}
```

#### 2.4 Energy Recovery Multiplier

```javascript
// Current: energyRecovery = 0.5 * sleepQuality + (energyRecoveryBonus / 100)
// NEW: Add bed quality tiers

const BED_QUALITY_MULTIPLIERS = {
  no_bed: 1.0,      // Base recovery (slow)
  basic_bed: 1.5,   // 1.5x faster
  cozy_bed: 2.0,    // 2x faster
  luxury_bed: 2.5   // 2.5x faster
}

// Pajamas bonus stacks:
const totalRecovery = baseRecovery * bedQuality * (1 + pajamasBonus / 100)
```

#### 2.5 Sleep Without Bed (Penalty)
```javascript
// If no bed exists:
const sleepQuality = pet.selectedBed === 'no_bed' 
  ? 0.5  // 50% slower recovery
  : BEDS.find(b => b.id === pet.selectedBed)?.sleepQuality || 1.0
```

---

## 3. FOOD & ITEM INTERACTION EXTENSION

### Current State
✅ 30+ food items with stats
✅ Eating animation (food size decrease)
✅ Chewing mouth animation
✅ Food affects hunger/happiness/health

### Required Extensions

#### 3.1 Food Interaction States

```javascript
// Extend eatingState:
eatingState: {
  isEating: false,
  foodItem: null,
  foodSize: 1,          // NEW: Visual size (1.0 → 0.2)
  biteCount: 0,         // NEW: Track bites
  maxBites: 5,          // NEW: Total bites needed
  mouthOpen: false,
  chewingSpeed: 1,      // NEW: Based on food type
  eatingProgress: 0     // NEW: 0-100%
}
```

#### 3.2 Food-Specific Effects

```javascript
const FOOD_EFFECTS = {
  // Fruits
  'apple': { hunger: +15, happiness: +10, energy: 0, effect: 'balanced' },
  'strawberry': { hunger: +10, happiness: +15, energy: 0, effect: 'mood_boost' },
  'banana': { hunger: +18, happiness: +12, energy: +5, effect: 'energy_fruit' },
  
  // Meals
  'fish': { hunger: +25, happiness: +25, energy: +10, effect: 'full_boost' },
  'cake': { hunger: +30, happiness: +30, energy: -5, effect: 'sugar_crash' },
  
  // Drinks
  'milk': { hunger: +15, happiness: +15, energy: +15, effect: 'recovery' },
  'juice': { hunger: +12, happiness: +18, energy: +8, effect: 'refresh' }
}
```

#### 3.3 Visual Food Appearance

```javascript
// NEW: Food object renders in front of pet
const renderFoodObject = () => {
  if (!eatingState.isEating) return null
  
  return (
    <div className="food-object" style={{
      transform: `scale(${eatingState.foodSize})`,
      opacity: eatingState.foodSize > 0.2 ? 1 : 0
    }}>
      {eatingState.foodItem.icon}
    </div>
  )
}
```

**CSS:**
```css
.food-object {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 48px;
  z-index: 15;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

@keyframes biteDecrease {
  0% { transform: translateX(-50%) scale(1); }
  100% { transform: translateX(-50%) scale(0.2); }
}
```

#### 3.4 Chewing Animation Enhancement

```css
.pet-mouth.chewing {
  animation: chew 0.3s ease-in-out infinite;
}

@keyframes chew {
  0%, 100% { height: 8px; border-radius: 0 0 16px 16px; }
  50% { height: 12px; border-radius: 0 0 12px 12px; }
}
```

#### 3.5 Food Completion Logic

```javascript
const completeEating = (food) => {
  const effects = FOOD_EFFECTS[food.name.toLowerCase()] || food
  
  setPet(p => ({
    ...p,
    hunger: Math.min(100, p.hunger + effects.hunger),
    happiness: Math.min(100, p.happiness + effects.happy),
    health: Math.min(100, p.health + (effects.heal || 0)),
    energy: Math.min(100, Math.max(0, p.energy + (effects.energy || 0)))
  }))
  
  setEatingState({ isEating: false, foodItem: null, foodSize: 0 })
  showMessage(`+${effects.hunger} Hunger, +${effects.happy} Happy!`)
}
```

---

## 4. CLOTHES SYSTEM EXTENSION

### Current State
✅ 40+ clothing items
✅ Stat bonuses (energyRecovery, happinessGain, etc.)
✅ Overlay rendering (z-index: 20-30)
✅ Equipped clothes array

### Required Extensions

#### 4.1 Clothing Categories Expansion

```javascript
const CLOTHING_CATEGORIES = {
  hats: { 
    layer: 'head', 
    zIndex: 35,
    yOffset: -60,
    items: ['chef_hat', 'gardening_hat', 'hammer_hat', 'beanie', 'cap']
  },
  wings: { 
    layer: 'back', 
    zIndex: 15,
    items: ['fairy_wings', 'angel_wings', 'butterfly_wings']
  },
  sweaters: { 
    layer: 'body', 
    zIndex: 25,
    items: ['cute_sweater', 'hoodie', 'vest']
  },
  pajamas: { 
    layer: 'body', 
    zIndex: 25,
    sleepOnly: true,
    items: ['pajamas_blue', 'pajamas_pink', 'pajamas_white']
  },
  glasses: { 
    layer: 'face', 
    zIndex: 30,
    yOffset: -20,
    items: ['glasses', 'sunglasses', 'monocle']
  },
  scarves: { 
    layer: 'neck', 
    zIndex: 28,
    yOffset: 10,
    items: ['scarf_red', 'scarf_blue', 'bowtie']
  },
  costumes: { 
    layer: 'full', 
    zIndex: 26,
    items: ['chef_outfit', 'gardener_outfit', 'wizard_robe']
  }
}
```

#### 4.2 Clothing Attachment Points

```javascript
const CLOTHING_ATTACHMENTS = {
  head: {
    position: 'absolute',
    top: 'auto',
    bottom: '180px', // Above head
    left: '50%',
    transform: 'translateX(-50%)'
  },
  body: {
    position: 'absolute',
    top: '80px',
    left: '50%',
    transform: 'translateX(-50%)'
  },
  face: {
    position: 'absolute',
    top: '100px', // Eye level
    left: '50%',
    transform: 'translateX(-50%)'
  },
  back: {
    position: 'absolute',
    top: '60px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 15 // Behind body
  }
}
```

#### 4.3 Sleep Pose Adaptation

```css
/* Clothing adapts during sleep */
.pet-avatar-container.sleeping .clothing-layer {
  transform: translateX(-50%) rotate(-2deg) scale(0.95);
}

/* Pajamas only visible during sleep */
.clothing-layer.pajamas {
  opacity: 0;
  transition: opacity 0.5s ease;
}

.pet-avatar-container.sleeping .clothing-layer.pajamas {
  opacity: 1;
}

/* Wings fold during sleep */
.clothing-layer.wings.sleeping {
  transform: translateX(-50%) scaleX(0.7);
}
```

#### 4.4 Stat Bonus Implementation

```javascript
// Current: calculateItemBonuses() exists
// EXTEND with new bonuses:

const CLOTHING_BONUSES = {
  // Pajamas → faster energy recovery
  'pajamas_blue': { energyRecovery: 50 },
  'pajamas_pink': { energyRecovery: 50 },
  'pajamas_white': { energyRecovery: 70 },
  
  // Wings → faster happiness gain
  'fairy_wings': { happinessGain: 25, xp: 15 },
  'angel_wings': { happinessGain: 30, health: 10 },
  
  // Chef hat → cooking mini game bonus
  'chef_hat': { cookingBonus: 20, coinBonus: 10 },
  
  // Gardening hat → Garden Catch bonus
  'gardening_hat': { gardenCatchBonus: 25, happiness: 10 },
  
  // Hammer hat → Whack-a-Mole bonus
  'hammer_hat': { whackMoleBonus: 30, energy: 5 }
}
```

---

## 5. ACCESSORIES SYSTEM EXTENSION

### Current State
✅ Bows, hats, glasses, scarves exist
✅ Stat bonuses implemented
✅ Overlay rendering works

### Required Extensions

#### 5.1 Accessory Layers (Top Layer)

```javascript
const ACCESSORY_LAYERS = {
  top: { zIndex: 40, items: ['bow', 'hair_clip', 'headband'] },
  head: { zIndex: 35, items: ['hat', 'crown', 'chef_hat'] },
  face: { zIndex: 32, items: ['glasses', 'monocle'] },
  neck: { zIndex: 30, items: ['scarf', 'tie', 'bowtie'] },
  back: { zIndex: 15, items: ['wings', 'cape'] }
}
```

#### 5.2 Gameplay Effects

```javascript
const ACCESSORY_EFFECTS = {
  // Coin gain bonus
  'gold_crown': { coinBonus: 20, all: 10 },
  'silver_crown': { coinBonus: 15, happiness: 8 },
  
  // Mood stability bonus
  'lucky_scarf': { moodStability: 20, happiness: 10 },
  'calm_glasses': { moodStability: 15, xp: 8 },
  
  // Interaction bonus
  'friendship_bow': { interactionBonus: 25, happiness: 15 },
  'playful_ribbon': { interactionBonus: 20, fun: 10 }
}
```

#### 5.3 Visibility in All States

```css
/* Accessories visible in idle */
.accessory-layer {
  opacity: 1;
  transition: all 0.3s ease;
}

/* Adjust position during eating */
.pet-avatar-container.eating .accessory-layer.face {
  transform: translateX(-50%) translateY(2px);
}

/* Sleep position adjustment */
.pet-avatar-container.sleeping .accessory-layer {
  transform: translateX(-50%) rotate(-2deg);
}

/* Hat stays on during sleep */
.pet-avatar-container.sleeping .accessory-layer.head {
  transform: translateX(-50%) rotate(5deg);
}
```

---

## 6. ENVIRONMENT SYSTEM UPGRADE

### Current State
✅ 8 environments (house, bedroom, forest, garden, beach, sunset, space, castle)
✅ Wall + floor separation exists
✅ Lighting effects (warm, soft, dim, bright, etc.)

### Required Extensions

#### 6.1 House Interior Enhancement

```javascript
const HOUSE_INTERIOR = {
  wall: {
    type: 'separate_layer',
    texture: 'wallpaper',
    colors: ['#F5F5F0', '#FFF5E5', '#E8F0F8', '#F0E8F8'],
    patterns: ['stripes', 'dots', 'floral', 'plain']
  },
  floor: {
    type: 'separate_layer',
    material: 'wood',
    colors: ['#D4C4B0', '#C4A584', '#A08060', '#8B7355']
  },
  furniture: {
    grid: true,
    gridSize: '50px',
    snapToGrid: true,
    items: ['table', 'chair', 'lamp', 'rug', 'plant']
  }
}
```

**CSS:**
```css
.pet-scene.house::before {
  /* Wall layer */
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 40%;
  background: var(--wall-color);
  background-image: var(--wallpaper-pattern);
  z-index: 1;
}

.pet-scene.house::after {
  /* Floor layer */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 40%;
  background: var(--floor-color);
  z-index: 2;
}
```

#### 6.2 Forest Layered Background

```javascript
const FOREST_LAYERS = {
  background: {
    items: ['distant_trees', 'mountains', 'sky'],
    parallax: 0.2
  },
  midground: {
    items: ['trees', 'bushes', 'rocks'],
    parallax: 0.5
  },
  foreground: {
    items: ['grass', 'flowers', 'pet'],
    parallax: 1.0
  }
}
```

**CSS:**
```css
.pet-scene.forest {
  background: linear-gradient(180deg, #87CEEB 0%, #A8D5A0 30%, #68A860 100%);
}

.pet-scene.forest::before {
  /* Background trees */
  content: '';
  position: absolute;
  top: 20%;
  left: 0;
  right: 0;
  height: 60%;
  background: url('forest-bg.svg') repeat-x;
  opacity: 0.6;
  z-index: 1;
}

.pet-scene.forest::after {
  /* Foreground grass */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: url('grass-fg.svg') repeat-x;
  z-index: 3;
}
```

#### 6.3 Garden Elements

```javascript
const GARDEN_ELEMENTS = {
  path: {
    type: 'stone',
    position: 'center',
    width: '100px'
  },
  flowers: {
    types: ['rose', 'tulip', 'sunflower', 'daisy'],
    positions: 'random_sides'
  },
  objects: ['fountain', 'bench', 'tree', 'bush'],
  lighting: 'outdoor_natural',
  windAnimation: true
}
```

**CSS:**
```css
.pet-scene.garden {
  background: linear-gradient(180deg, #E5F5FF 0%, #D0EBFF 50%, #88C080 100%);
}

/* Wind animation for flowers */
@keyframes flowerSway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}

.garden-flower {
  animation: flowerSway 3s ease-in-out infinite;
}
```

#### 6.4 Lighting System Enhancement

```javascript
const LIGHTING_SYSTEM = {
  warm: {
    brightness: 1.0,
    shadowIntensity: 0.3,
    colorTemp: 3000,
    moodModifier: +5 happiness
  },
  soft: {
    brightness: 1.05,
    shadowIntensity: 0.2,
    colorTemp: 4000,
    moodModifier: +3 happiness
  },
  dim: {
    brightness: 0.85,
    shadowIntensity: 0.5,
    colorTemp: 2700,
    moodModifier: -2 energy
  },
  bright: {
    brightness: 1.1,
    shadowIntensity: 0.1,
    colorTemp: 5500,
    moodModifier: +5 energy
  },
  natural: {
    brightness: 1.0,
    shadowIntensity: 0.25,
    colorTemp: 5000,
    moodModifier: +3 health
  }
}
```

**CSS:**
```css
.pet-scene[lighting="warm"] {
  filter: sepia(0.2) saturate(1.1);
}

.pet-scene[lighting="dim"] {
  filter: brightness(0.85);
}

.pet-scene[lighting="bright"] {
  filter: brightness(1.1) saturate(1.05);
}

/* Lamp toggle affects global brightness */
.lamp-on {
  filter: brightness(1.15);
}

.lamp-off {
  filter: brightness(0.9);
}
```

---

## 7. MINI GAME SYSTEM

### Current State
✅ 3 mini games exist (Whack-a-Mole, Memory Card, Bubble Pop)
✅ Coin reward system (+30 XP, +25 coins, +25 happiness on win)
✅ Separate from play mode

### Required Extensions

#### 7.1 Whack-a-Mole (Cozy Version)

**Visual Design:**
```css
/* Pastel holes */
.mole-hole {
  width: 80px;
  height: 80px;
  background: radial-gradient(ellipse, #E8D5C4 0%, #D4C4B0 100%);
  border-radius: 50%;
  border: 4px solid #C4A584;
  position: relative;
  overflow: hidden;
}

/* Cute mole (dot eyes style) */
.mole {
  width: 70px;
  height: 70px;
  background: #8B7355;
  border-radius: 50% 50% 40% 40%;
  position: absolute;
  bottom: -70px;
  left: 50%;
  transform: translateX(-50%);
  transition: bottom 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.mole.pop {
  bottom: 0;
}

.mole-eyes {
  position: absolute;
  top: 25px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
}

.mole-eye {
  width: 8px;
  height: 8px;
  background: #2d3436;
  border-radius: 50%;
}
```

**Game Logic:**
```javascript
const WHACK_GAME_CONFIG = {
  duration: 60,           // 60 seconds
  gridSize: '3x3',
  popDelay: 800,          // Mole stays up 800ms
  comboWindow: 2000,      // 2s for combo
  rewards: {
    hit: 10,              // Base coins per hit
    combo: 1.5,           // 1.5x for consecutive hits
    perfect: 2.0          // 2x for perfect timing
  },
  penalties: {
    wrongTap: 5,          // -5 coins for wrong tap
    miss: 0               // No penalty for miss
  }
}

// Score → Coin conversion
const calculateCoins = (score, combos) => {
  const baseCoins = score * WHACK_GAME_CONFIG.rewards.hit
  const comboBonus = combos * WHACK_GAME_CONFIG.rewards.combo
  return Math.floor(baseCoins + comboBonus)
}
```

#### 7.2 Garden Catch

**Visual Design:**
```css
/* Falling fruits */
.falling-fruit {
  position: absolute;
  font-size: 40px;
  animation: fall linear forwards;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

@keyframes fall {
  0% { 
    transform: translateY(-50px) rotate(0deg);
    opacity: 1;
  }
  100% { 
    transform: translateY(400px) rotate(360deg);
    opacity: 0.8;
  }
}

/* Soft floating animation */
.fruit-basket {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-10px); }
}
```

**Game Logic:**
```javascript
const GARDEN_CATCH_CONFIG = {
  fruits: [
    { id: 'apple', icon: '🍎', value: 10, speed: 2 },
    { id: 'strawberry', icon: '🍓', value: 15, speed: 2.5 },
    { id: 'peach', icon: '🍑', value: 12, speed: 2.2 },
    { id: 'carrot', icon: '🥕', value: 8, speed: 1.8 }
  ],
  difficulty: {
    startSpeed: 2,
    speedIncrease: 0.2,    // +0.2 per 10 seconds
    spawnRate: 1000        // ms between spawns
  },
  scoring: {
    catch: 10,             // Base points per catch
    multiplier: 1.1,       // 1.1x per consecutive catch
    maxMultiplier: 3.0
  },
  penalties: {
    miss: -5               // -5 mood per missed fruit
  }
}
```

#### 7.3 Cooking Match

**Visual Design:**
```css
/* Match-3 grid */
.cooking-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  padding: 20px;
  background: linear-gradient(135deg, #FFF5E5, #FFE8D0);
  border-radius: 16px;
}

/* Ingredients */
.ingredient {
  width: 50px;
  height: 50px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.ingredient:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.ingredient.selected {
  transform: scale(1.15);
  box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
}

.ingredient.matched {
  animation: matchPop 0.5s ease-out;
}

@keyframes matchPop {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.8; }
  100% { transform: scale(0); opacity: 0; }
}
```

**Game Logic:**
```javascript
const COOKING_MATCH_CONFIG = {
  ingredients: [
    { id: 'egg', icon: '🥚', value: 10 },
    { id: 'milk', icon: '🥛', value: 10 },
    { id: 'flour', icon: '🌾', value: 10 },
    { id: 'carrot', icon: '🥕', value: 10 },
    { id: 'fish', icon: '🐟', value: 15 },
    { id: 'tomato', icon: '🍅', value: 10 }
  ],
  gridSize: '6x6',
  matchMin: 3,
  rewards: {
    match3: 30,            // 30 coins for 3-match
    match4: 60,            // 60 coins for 4-match
    match5: 100,           // 100 coins for 5-match
    happiness: 5           // +5 happiness per match
  },
  combos: {
    cascade: 1.2,          // 1.2x for cascade matches
    chain: 1.5             // 1.5x for chain reactions
  }
}
```

#### 7.4 Mini Game Integration with Economy

```javascript
// Central coin reward system
const MINIGAME_REWARDS = {
  whackMole: {
    baseCoins: 10,
    comboMultiplier: 1.5,
    bonusThreshold: 20     // Bonus after 20 hits
  },
  gardenCatch: {
    baseCoins: 5,
    multiplierCap: 3.0,
    streakBonus: 10        // Bonus for 10+ streak
  },
  cookingMatch: {
    baseCoins: 30,
    matchBonus: 20,
    happinessBoost: 5
  }
}

// Integration function
const completeMiniGame = (gameType, score, bonuses) => {
  const config = MINIGAME_REWARDS[gameType]
  let coins = score * config.baseCoins
  
  // Apply bonuses
  if (bonuses.combo) coins *= config.comboMultiplier
  if (bonuses.streak) coins += config.streakBonus
  
  // Apply clothing bonuses
  const clothingBonus = calculateItemBonuses(pet.equippedClothes)
  if (clothingBonus.coinBonus) coins *= (1 + clothingBonus.coinBonus / 100)
  
  // Update pet stats
  setPet(p => ({
    ...p,
    coins: p.coins + coins,
    happiness: Math.min(100, p.happiness + (bonuses.happiness || 0))
  }))
  
  return coins
}
```

---

## 8. SYSTEM INTEGRATION REQUIREMENTS

### 8.1 State Management Connections

#### Current Pet State Structure (Extended)
```javascript
const [pet, setPet] = useState({
  // ... existing fields ...
  
  // NEW: Sleep System
  sleepState: {
    isSleeping: false,
    canSleep: false,
    sleepStage: 'none',
    sleepStartTime: null,
    bedAligned: false
  },
  
  // NEW: Eating System
  eatingState: {
    isEating: false,
    foodItem: null,
    foodSize: 1,
    biteCount: 0,
    maxBites: 5,
    mouthOpen: false,
    chewingSpeed: 1,
    eatingProgress: 0
  },
  
  // NEW: Environment System
  environmentState: {
    wallpaperPattern: 'plain',
    floorMaterial: 'wood',
    furnitureGrid: [],
    lampOn: true,
    windEnabled: false
  },
  
  // NEW: Mini Game System
  miniGameState: {
    activeGame: null,
    score: 0,
    combo: 0,
    multiplier: 1.0,
    timeLeft: 0
  }
})
```

### 8.2 How Features Connect

#### Mini Games → Coin System
```
Mini Game Complete
    ↓
Calculate Base Score
    ↓
Apply Clothing Bonuses (chef_hat, etc.)
    ↓
Apply Combo Multipliers
    ↓
Convert to Coins (formula per game)
    ↓
Update pet.coins
    ↓
Trigger Coin Animation
    ↓
Save to localStorage
```

#### Clothing → Gameplay Stats
```
Item Equipped
    ↓
calculateItemBonuses() runs
    ↓
Returns bonus object:
  { energyRecovery: 50, cookingBonus: 20 }
    ↓
Applied in decay loop:
  - energy += 0.5 * sleepQuality * (1 + 50/100)
  - gameCoins *= (1 + 20/100)
    ↓
Visual layer renders item
    ↓
Position adapts to animation state
```

#### Food → Stats (Specific)
```
Food Selected (e.g., 'fish')
    ↓
FOOD_EFFECTS['fish'] lookup:
  { hunger: +25, happiness: +25, energy: +10 }
    ↓
Eating Animation:
  - Food appears
  - Size decreases per bite
  - Mouth chews
    ↓
Animation Complete
    ↓
Apply specific effects:
  - hunger = min(100, hunger + 25)
  - happiness = min(100, happiness + 25)
  - energy = min(100, energy + 10)
    ↓
Food object removed
```

### 8.3 Rendering Layer Architecture

```
Layer Stack (z-index order):
┌─────────────────────────────────────────┐
│ Layer 6: UI Overlay (z: 100+)           │
│   - Mini game UI                        │
│   - Shop panels                         │
│   - Toast messages                      │
├─────────────────────────────────────────┤
│ Layer 5: Accessories (z: 30-40)         │
│   - Hats, crowns, bows                  │
│   - Glasses, scarves                    │
│   - Wings (back layer z: 15)            │
├─────────────────────────────────────────┤
│ Layer 4: Clothes (z: 25-30)             │
│   - Sweaters, pajamas                   │
│   - Costumes                            │
├─────────────────────────────────────────┤
│ Layer 3: Pet Body (z: 20)               │
│   - Base pet model                      │
│   - Facial features                     │
│   - Tail, ears                          │
├─────────────────────────────────────────┤
│ Layer 2: Food Objects (z: 15)           │
│   - Eating animation items              │
│   - Interactive food                    │
├─────────────────────────────────────────┤
│ Layer 1: Environment (z: 1-10)          │
│   - Background (wall)                   │
│   - Floor                               │
│   - Furniture                           │
│   - Decorative elements                 │
└─────────────────────────────────────────┘
```

**CSS Implementation:**
```css
/* Environment layer */
.pet-scene { z-index: 1; }
.pet-scene::before { z-index: 2; }  /* Wall */
.pet-scene::after { z-index: 3; }   /* Floor */

/* Pet layer */
.pet-avatar-container { z-index: 20; }

/* Food layer */
.food-object { z-index: 15; }

/* Clothing layer */
.clothing-layer { z-index: 25; }
.clothing-layer.back { z-index: 15; }  /* Wings behind body */

/* Accessory layer */
.accessory-layer { z-index: 35; }
.accessory-layer.face { z-index: 32; }

/* UI layer */
.mini-game-ui { z-index: 100; }
.shop-panel { z-index: 100; }
```

### 8.4 Preventing Visual Bugs

#### Layer Clipping Prevention
```css
/* Ensure no overflow clipping */
.pet-scene {
  overflow: visible;  /* Changed from hidden */
  position: relative;
}

/* Contain animations within bounds */
.pet-avatar-container {
  contain: layout style;
  will-change: transform;
}

/* Hardware acceleration */
.clothing-layer,
.accessory-layer {
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

#### Animation State Sync
```javascript
// Sync clothing position with pet animation
useEffect(() => {
  const updateClothingPosition = () => {
    const clothing = document.querySelectorAll('.clothing-layer')
    clothing.forEach(layer => {
      // Adjust for sleep pose
      if (pet.isSleeping) {
        layer.style.transform = 'translateX(-50%) rotate(-2deg) scale(0.95)'
      } else if (eatingState.isEating) {
        layer.style.transform = 'translateX(-50%) translateY(2px)'
      } else {
        layer.style.transform = 'translateX(-50%)'
      }
    })
  }
  
  updateClothingPosition()
}, [pet.isSleeping, eatingState.isEating])
```

---

## 9. IMPLEMENTATION PRIORITY

### Phase 1: Core Visual System (Week 1)
1. ✅ Face & eye system refinement
2. ✅ Sleep animation extension
3. ✅ Food interaction enhancement

### Phase 2: Clothing & Accessories (Week 2)
1. ✅ Clothing category expansion
2. ✅ Accessory layer system
3. ✅ Stat bonus implementation

### Phase 3: Environment Upgrade (Week 3)
1. ✅ House interior enhancement
2. ✅ Forest/garden layering
3. ✅ Lighting system

### Phase 4: Mini Games (Week 4)
1. ✅ Whack-a-Mole cozy version
2. ✅ Garden Catch
3. ✅ Cooking Match
4. ✅ Economy integration

---

## 10. KEY INTEGRATION POINTS

### Existing Functions to Extend

```javascript
// 1. Extend calculateItemBonuses()
const calculateItemBonuses = (equippedClothes, equippedAccessories) => {
  const bonuses = {
    // ... existing bonuses ...
    
    // NEW: Mini game bonuses
    cookingBonus: 0,
    gardenCatchBonus: 0,
    whackMoleBonus: 0,
    
    // NEW: Interaction bonuses
    interactionBonus: 0
  }
  
  // ... existing logic ...
  
  return bonuses
}

// 2. Extend decay loop
useEffect(() => {
  const timer = setInterval(() => {
    setPet(p => {
      const bonuses = calculateItemBonuses(p.equippedClothes, p.equippedAccessories)
      const bed = BEDS.find(b => b.id === p.selectedBed) || BEDS[0]
      const sleepQuality = bed.sleepQuality || 1.0
      
      // ... existing decay logic ...
      
      // NEW: Mini game coin bonus applied here
      const coinGainMultiplier = 1 + (bonuses.coinBonus / 100)
      
      return { ...p, /* updated stats */ }
    })
  }, 3000)
  return () => clearInterval(timer)
}, [])

// 3. Extend rendering
const renderPet = () => {
  return (
    <div className="pet-scene">
      {/* Environment layer */}
      <EnvironmentLayer />
      
      {/* Pet body */}
      <PetAvatar />
      
      {/* Clothing overlay */}
      <ClothingOverlay />
      
      {/* Accessory overlay */}
      <AccessoryOverlay />
      
      {/* Food interaction */}
      {eatingState.isEating && <FoodObject />}
    </div>
  )
}
```

---

## SUMMARY

This integration plan:
- ✅ **Extends** existing state management (no rewrite)
- ✅ **Defines** new states (sleeping, eating, wearing, lighting)
- ✅ **Explains** rendering layer architecture
- ✅ **Connects** mini games to coin system
- ✅ **Details** clothing stat modifications
- ✅ **Specifies** food-specific stat effects
- ✅ **Prevents** visual bugs with proper z-indexing
- ✅ **Maintains** current aesthetic and code style

All features build upon the existing 1738-line VirtualPetPage.jsx structure without breaking changes.
