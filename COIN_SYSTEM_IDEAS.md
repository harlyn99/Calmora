# 🪙 Calmora Coin System - Ideas & Implementation

## Coin Usage Ideas

### 1. **Virtual Pet Shop** 🐾
- **Food & Treats** (50-200 coins)
  - Regular food: 50 coins
  - Premium treats: 100 coins
  - Special snacks: 200 coins
  
- **Accessories** (300-1000 coins)
  - Hats, bows, collars
  - Seasonal items
  - Limited edition accessories

- **Outfits** (500-2000 coins)
  - Costume changes
  - Theme outfits (sakura, ocean, etc.)
  - Holiday special outfits

### 2. **Gacha System** 🎰
- **Single Pull**: 100 coins
  - Random sticker, badge, or item
  
- **10x Pull**: 900 coins (10% discount)
  - Guaranteed rare item
  
- **Premium Gacha**: 500 coins
  - Exclusive themes
  - Rare backgrounds
  - Limited edition items

### 3. **Power-Ups** ⚡
- **Double XP** (30 minutes): 200 coins
- **Double Coins** (30 minutes): 250 coins
- **Focus Boost** (Pomodoro bonus): 150 coins
- **Streak Freeze** (1 day): 500 coins

### 4. **Exclusive Themes** 🎨
- **Premium Themes**: 2000-5000 coins
  - Special animated backgrounds
  - Custom color schemes
  - Exclusive icon packs

### 5. **Achievement Badges** 🏆
- **Collector Badges**: 1000-3000 coins
  - Display on profile
  - Show off achievements
  - Limited edition badges

### 6. **Mini Games** 🎮
- **Memory Lane Game**: Bet 100-500 coins
  - Win 2x-5x your bet
  - Lose your bet
  
- **Daily Lucky Draw**: 50 coins
  - Random rewards
  - Jackpot possibility

### 7. **Customization Items** ✨
- **Profile Frames**: 500-1500 coins
- **Avatar Borders**: 300-1000 coins
- **Name Effects**: 1000-2000 coins
- **Special Titles**: 2000-5000 coins

### 8. **Productivity Boosters** 📈
- **Extra Task Slots**: 1000 coins
- **Custom Task Icons**: 500 coins
- **Priority Markers**: 300 coins
- **Task Templates**: 800 coins

### 9. **Social Features** 👥
- **Send Gifts to Friends**: Variable
- **Unlock Friend Slots**: 500 coins per slot
- **Custom Friend Emojis**: 200 coins each

### 10. **Daily/Weekly Deals** 💰
- Rotating shop items
- Discounted bundles
- Time-limited offers

---

## Earning Methods

### Daily
- Complete schedule tasks: 10-20 coins each
- Daily login bonus: 50-100 coins
- Daily challenges: 100-300 coins

### Weekly
- Weekly goals: 500-1000 coins
- Streak bonuses: 50-500 coins

### Achievements
- First task completed: 100 coins
- 7-day streak: 500 coins
- 30-day streak: 2000 coins
- Task master (100 tasks): 1000 coins

### Special
- Referral bonus: 1000 coins
- Feedback submission: 200 coins
- Bug report: 300-500 coins

---

## Recommended Implementation Priority

### Phase 1 (Core Features)
1. ✅ Virtual Pet (already implemented)
2. 🔄 Pet Shop (food, accessories)
3. 🔄 Power-ups (Double XP, etc.)

### Phase 2 (Engagement)
4. Gacha System
5. Daily Challenges
6. Achievement Badges

### Phase 3 (Advanced)
7. Mini Games
8. Social Features
9. Premium Themes

---

## UI/UX Suggestions

### Coin Display
- Show coin count in header (already implemented)
- Add coin animation on earn/spend
- Tooltip showing recent coin activity

### Shop Interface
- Categorized tabs (Pet, Gacha, Power-ups, etc.)
- "On Sale" section
- "New Items" badge
- Purchase confirmation modal

### Transaction History
- Accessible from settings or coin display
- Shows earned/spent coins
- Filterable by category

---

## Balance Considerations

### Inflation Control
- Daily coin cap: 500-1000 coins
- Sink mechanisms (consumables, gacha)
- Limited-time items to encourage spending

### Fair Pricing
- Free users can earn enough for core items
- Premium items require dedication or patience
- No pay-to-win mechanics

### Engagement Rewards
- Bonus for consecutive days
- Weekly/monthly rewards
- Special event bonuses

---

## Technical Implementation

### Database Schema
```javascript
// User coins
{
  userId: String,
  coins: Number,
  lifetimeEarned: Number,
  lifetimeSpent: Number,
  lastDailyBonus: Date,
  inventory: [{
    itemId: String,
    type: String,
    acquiredAt: Date
  }]
}

// Shop items
{
  itemId: String,
  name: String,
  description: String,
  price: Number,
  category: String,
  type: String, // consumable, permanent, limited
  stock: Number, // -1 for unlimited
  endDate: Date // for limited items
}
```

---

## Fun Ideas 💡

1. **Coin Fountain**: Throw coins for good luck (animation only)
2. **Rich Title**: Get special title when reaching coin milestones
3. **Coin Rain**: Random bonus coins during productivity sessions
4. **Lucky Hours**: Double coin earnings during specific hours
5. **Treasure Hunt**: Hidden coins throughout the app

---

**Status**: Document created for future implementation reference
