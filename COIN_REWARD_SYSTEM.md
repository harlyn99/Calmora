# 🪙 Coin Reward System - Integration Complete

## Overview
Integrated a coin reward system across the app to motivate productivity and feed your virtual pet!

---

## 🎯 How to Earn Coins

### From Timer (Focus Sessions)
- **1 coin per minute** of focused work
- **+10 bonus coins** for sessions ≥25 minutes
- Example: 25 min session = 35 coins total

### From Planner (Daily Tasks)
Complete schedule tasks to earn coins based on energy level:

| Energy Level | Coins | Examples |
|-------------|-------|----------|
| 🔴 **HIGH** | 15 🪙 | Deep Learning, Protected Focus |
| 🟡 **MEDIUM** | 10 🪙 | Practice Exercises, Daily Goals |
| 🟢 **LOW** | 5 🪙 | Review, Chores, Light Study |
| ⚪ **BREAK** | 3 🪙 | Rest, Meals, Buffer Time |

---

## 📊 Coin System Features

### Timer Page
- Shows current coin balance at top
- Animated reward popup when session completes
- Coins auto-saved to localStorage (`petCoins`)

### Planner Page
- Coin display in header
- Reward animation when completing tasks
- Different rewards based on task difficulty (energy level)

### Virtual Pet Integration
- Coins shared across all pages
- Use coins to buy:
  - 🍎 Food for your pet
  - 👕 Clothes & accessories
  - 🛏️ Furniture & beds
  - 🏠 Room decorations
  - 🌸 Environment themes

---

## 💾 Data Storage

All coin data is stored in `localStorage`:
```javascript
localStorage.setItem('petCoins', '150') // Starting balance
```

Coins persist across:
- Page refreshes
- Different app sections
- Browser sessions

---

## 🎨 Visual Features

### Coin Display
```
┌─────────────────────────────────┐
│ 🪙 Pet Coins: 150               │
│ Earn coins by completing tasks! │
└─────────────────────────────────┘
```

### Reward Popup Animation
```
    ╔═══════════════╗
    ║     🪙        ║  ← Spinning coin
    ║  +15 Coins!   ║  ← Floats & glows
    ╚═══════════════╝
```

---

## 🔄 Daily Schedule Integration

The adaptive schedule auto-resets daily with:
- ✅ 15 time blocks with energy labels
- ✅ Progress tracking (% completion)
- ✅ Coin rewards for each completed block
- ✅ Calendar view on click (task details + history)

### Energy-Based Task Matching
- **HIGH energy** → Deep work (most coins, hardest tasks)
- **MEDIUM energy** → Practice (moderate coins)
- **LOW energy** → Review/light tasks (fewer coins, easier)

---

## 🎮 Gamification Benefits

1. **Motivation**: Earn coins → Buy pet items
2. **Consistency**: Daily schedule resets = fresh start
3. **Progress**: Visual tracking + completion %
4. **Rewards**: Immediate feedback (popup animations)
5. **Pet Care**: Coins make pet care more engaging

---

## 📱 Pages Updated

1. **PlannerPage.jsx** - Schedule + coin rewards
2. **TimerPage.jsx** - Focus sessions + coin rewards  
3. **CuteVirtualPet.jsx** - Coin sync & spending
4. **PlannerPage.css** - Coin display styles
5. **TimerPage.css** - Reward animations

---

## 🚀 How to Use

1. **Open Timer** → Complete focus session → Earn coins
2. **Open Planner** → Click tasks to complete → Earn coins
3. **Open Pet** → Spend coins on food/items → Keep pet happy

Coins are automatically synced across all pages!

---

## 💡 Tips for Users

- Complete HIGH energy tasks first (most coins)
- 25+ min timer sessions give best coin/minute ratio
- Check pet regularly - needs food & care
- Daily schedule resets at midnight
- Track completion % to stay motivated

---

*Smangat! (Stay motivated! 💪)*
