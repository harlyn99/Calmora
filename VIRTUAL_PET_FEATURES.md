# 🐾 Calmora Virtual Pet - Aesthetic Features Documentation

## Overview
Virtual Pet Calmora telah ditingkatkan dengan fitur-fitur aesthetic yang membuat pengalaman lebih imersif, personal, dan visually appealing.

---

## ✨ New Features

### 1. 🌈 Mood-Based Evolution
**Pet akan berevolusi berdasarkan mood rata-rata user!**

#### Cara Kerja:
- Sistem membaca 10 mood terakhir dari **Mood Tracker**
- Menghitung rata-rata mood dan menyesuaikan evolusi pet
- 5 tingkatan mood evolution:
  - **Great (4.5+)** → "Radiant" ✨ - Pet bersinar dengan glow emas
  - **Good (3.5-4.4)** → "Cheerful" 💫 - Glow hijau lembut
  - **Okay (2.5-3.4)** → "Calm" 💭 - Glow biru tenang
  - **Bad (1.5-2.4)** → "Concerned" 🌧️ - Glow abu-abu
  - **Terrible (<1.5)** → "Supportive" 🤗 - Glow pink hangat

#### Visual Effects:
- Glow effect di sekitar pet
- Badge khusus di bawah nama pet
- Weather effects berubah sesuai mood

---

### 2. 🌱 Habit Garden Integration
**Habits yang kamu selesaikan tumbuh menjadi tanaman!**

#### Cara Kerja:
- Sistem membaca data dari **Habit Tracker**
- Setiap habit dengan streak akan tumbuh menjadi tanaman
- Jenis tanaman berdasarkan streak:
  - 🌱 **Seedling** - 1 hari
  - 🌿 **Sprout** - 3 hari
  - 🌸 **Flower** - 7 hari
  - 🌺 **Bloom** - 14 hari
  - 🌳 **Tree** - 30 hari
  - 💎 **Crystal** - 60 hari
  - ⭐ **Star Plant** - 90 hari

#### View Mode:
- Tab "Garden" menampilkan semua tanaman
- Grid layout dengan hover effects
- Stats: Total plants & best streak

---

### 3. 🧘 Focus Companion Mode
**Pet menemaniimu saat fokus Pomodoro!**

#### Cara Kerja:
- Toggle di **Focus Timer** page
- Pet akan "meditasi" selama timer berjalan
- Reward saat selesai:
  - +20 XP
  - +15 coins
  - +10 happiness

#### Visual:
- Status indicator: "Pet is meditating with you..."
- Pet emoji berdasarkan tipe pet yang dipilih
- Animasi pulse saat meditating

---

### 4. 🌤️ Seasonal Themes & Weather Effects
**Lingkungan pet berubah sesuai musim dan mood!**

#### Seasonal Particles:
- **Spring** 🌸 - Sakura petals falling
- **Summer** ☀️ - Bright sunshine
- **Autumn** 🍂 - Falling leaves
- **Winter** ❄️ - Snowflakes

#### Weather Effects (based on mood):
- **Sunny** - Matahari berputar dengan rays
- **Cloudy** - Awan floating
- **Rainy** - Raindrops falling

#### Auto-detection:
- Musim ditentukan dari bulan saat ini
- Weather ditentukan dari mood evolution

---

### 5. 💭 Whisper Journal
**Curhat ke pet, dia akan ingat!**

#### Cara Kerja:
- Tab "Whisper" untuk menulis thoughts
- Enter untuk submit
- Setiap whisper disimpan dengan:
  - Text content
  - Date
  - Mood saat itu

#### Features:
- Scrollable memories list
- Mood indicator untuk setiap memory
- Hover effects
- Max 50 memories (auto-delete yang lama)

---

### 6. ⭐ Achievement Orbs System
**Kumpulkan orbs dari milestones!**

#### Achievement Types:
- 🌟 **Level 5** - Reach level 5
- ⭐ **Level 10** - Reach level 10
- 💰 **Rich** - Have 1000+ coins
- 🏆 **Dedicated** - 30+ day habit streak
- ✨ **Happy Soul** - Great mood evolution
- 📸 **Photographer** - 10+ photos

#### Visual:
- Grid layout dengan cards
- Hover animation (rotate + lift)
- Orb emoji besar di tengah
- Date earned

---

### 7. 🎨 Enhanced Visual Aesthetics

#### Glassmorphism UI:
- Frosted glass effect pada cards
- Subtle shadows dan borders
- Gradient backgrounds

#### Animations:
- Smooth transitions (cubic-bezier)
- Particle effects
- Hover lift effects
- Pulse animations
- Rotation effects

#### Color Palette:
- Soft pastels
- Gradient text
- Mood-based colors
- Seasonal themes

---

## 🎯 How to Use

### First Time Setup:
1. Buka **Virtual Pet** page (/pet)
2. Pilih pet type (bear, dog, cat, bunny)
3. Beri nama pet-mu

### Daily Interaction:
1. **Feed** - Kurangi hunger, dapat coins
2. **Play** - Tingkatkan happiness
3. **Rest** - Restore energy
4. **Train** - Dapat XP lebih banyak
5. **Bath** - Jaga hygiene
6. **Walk** - Exercise ringan

### Mood Tracking:
1. Buka **Mood Tracker** (/mood)
2. Log mood harian
3. Pet akan evolve berdasarkan mood

### Habit Building:
1. Buka **Habit Tracker** (/habits)
2. Tambah habits
3. Check off setiap hari
4. Lihat plants tumbuh di **Garden** tab

### Focus Sessions:
1. Buka **Focus Timer** (/timer)
2. Enable "Focus Companion"
3. Start timer
4. Pet akan meditasi bersamamu!

### Whisper Journal:
1. Buka **Whisper** tab di Virtual Pet
2. Tulis thoughts
3. Enter untuk submit
4. Pet akan ingat!

---

## 📊 Technical Implementation

### Data Storage:
```javascript
// Virtual Pet
localStorage.setItem('virtualPet', {
  // Basic stats
  type, name, level, xp, coins,
  // Needs
  happiness, hunger, energy, health, hygiene,
  // Inventory
  foods, clothes, equippedClothes,
  // Unlocks
  roomTheme, unlockedThemes, photos,
  // NEW FEATURES
  moodEvolution,
  gardenPlants,
  seasonalTheme,
  achievementOrbs,
  whisperMemories
})

// Moods
localStorage.setItem('moods', [...])

// Habits
localStorage.setItem('habits', [...])
```

### Sync System:
```javascript
// Mood sync (runs on mount & mood change)
useEffect(() => {
  const moods = JSON.parse(localStorage.getItem('moods') || '[]')
  const avgMood = calculateAverage(moods.slice(0, 10))
  setMoodEvolution(getEvolutionFromMood(avgMood))
}, [])

// Habit sync
useEffect(() => {
  const habits = JSON.parse(localStorage.getItem('habits') || '[]')
  const plants = habits.map(h => getPlantFromStreak(calculateStreak(h)))
  setGardenPlants(plants)
}, [])
```

---

## 🎨 CSS Highlights

### Key Animations:
```css
@keyframes radiantGlow {
  0%, 100% { filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.5)); }
  50% { filter: drop-shadow(0 0 25px rgba(255, 215, 0, 0.8)); }
}

@keyframes particleFall {
  to { transform: translateY(400px) rotate(360deg); }
}

@keyframes meditatePulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
}
```

### Glassmorphism:
```css
.card {
  background: linear-gradient(135deg, #ffffff, #f0f9ff);
  border: 2px solid rgba(255, 182, 193, 0.2);
  box-shadow: 0 8px 32px rgba(255, 182, 193, 0.2);
  backdrop-filter: blur(10px);
}
```

---

## 🚀 Future Enhancements (Planned)

### Energy Sync:
- Track screen time
- Pet energy reflects usage balance
- Break reminders

### Multi-Pet Adoption:
- Adopt multiple pets
- Different pets for different goals
- Pet interactions

### Social Features:
- Visit friends' pets
- Gift exchange
- Leaderboards

### More Customization:
- Background themes
- Pet accessories shop
- Room decoration

---

## 📱 Responsive Design

All features are fully responsive:
- Mobile-first approach
- Touch-friendly buttons
- Adaptive grid layouts
- Optimized animations for mobile

---

## 🎵 Sound Effects (Future)

Planned sound enhancements:
- Ambient background music
- Interaction sounds
- Achievement jingles
- Seasonal soundscapes

---

## Credits

Developed with ❤️ for Calmora
- React + Vite
- CSS3 Animations
- LocalStorage persistence
- Lucide React icons

---

**Enjoy your aesthetic virtual pet journey! 🐾✨**
