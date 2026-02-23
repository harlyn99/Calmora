import React, { createContext, useContext, useState, useEffect } from 'react'

const GamificationContext = createContext()

export const useGamification = () => {
  const context = useContext(GamificationContext)
  if (!context) {
    throw new Error('useGamification must be used within GamificationProvider')
  }
  return context
}

// ============================================
// ACHIEVEMENTS DATA
// ============================================
const ACHIEVEMENTS = {
  // Productivity
  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete 5 morning sessions before 9 AM',
    icon: '🌅',
    category: 'productivity',
    requirement: 5,
    hidden: false
  },
  focus_master: {
    id: 'focus_master',
    name: 'Focus Master',
    description: 'Accumulate 1000 focus minutes',
    icon: '🎯',
    category: 'productivity',
    requirement: 1000,
    hidden: false
  },
  knowledge_seeker: {
    id: 'knowledge_seeker',
    name: 'Knowledge Seeker',
    description: 'Complete 20 learning tasks',
    icon: '📚',
    category: 'productivity',
    requirement: 20,
    hidden: false
  },
  perfect_day: {
    id: 'perfect_day',
    name: 'Perfect Day',
    description: 'Complete all schedule tasks in one day',
    icon: '🌟',
    category: 'productivity',
    requirement: 1,
    hidden: false
  },
  
  // Streaks
  week_warrior: {
    id: 'week_warrior',
    name: '7-Day Streak',
    description: 'Use the app 7 days in a row',
    icon: '🔥',
    category: 'streak',
    requirement: 7,
    hidden: false
  },
  month_master: {
    id: 'month_master',
    name: '30-Day Streak',
    description: 'Use the app 30 days in a row',
    icon: '👑',
    category: 'streak',
    requirement: 30,
    hidden: false
  },
  
  // Coins
  coin_collector: {
    id: 'coin_collector',
    name: 'Coin Collector',
    description: 'Earn 500 coins total',
    icon: '💰',
    category: 'coins',
    requirement: 500,
    hidden: false
  },
  coin_master: {
    id: 'coin_master',
    name: 'Coin Master',
    description: 'Earn 1000 coins total',
    icon: '🪙',
    category: 'coins',
    requirement: 1000,
    hidden: false
  },
  
  // Pet Care
  clean_freak: {
    id: 'clean_freak',
    name: 'Clean Freak',
    description: 'Complete all chores 10 times',
    icon: '🧹',
    category: 'pet',
    requirement: 10,
    hidden: false
  },
  pet_lover: {
    id: 'pet_lover',
    name: 'Pet Lover',
    description: 'Feed your pet 50 times',
    icon: '🐾',
    category: 'pet',
    requirement: 50,
    hidden: false
  },
  
  // Secret Achievements
  night_owl: {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Complete a task after midnight',
    icon: '🦉',
    category: 'secret',
    requirement: 1,
    hidden: true
  },
  coffee_addict: {
    id: 'coffee_addict',
    name: 'Coffee Addict',
    description: 'Buy 10 coffees for your pet',
    icon: '☕',
    category: 'secret',
    requirement: 10,
    hidden: true
  },
  early_bug: {
    id: 'early_bug',
    name: 'Early Bug',
    description: 'Use the app before 6 AM',
    icon: '🐛',
    category: 'secret',
    requirement: 1,
    hidden: true
  },
  perfectionist: {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Achieve 100% completion for a week',
    icon: '💎',
    category: 'secret',
    requirement: 1,
    hidden: true
  },
  mystery: {
    id: 'mystery',
    name: '???',
    description: '???',
    icon: '❓',
    category: 'secret',
    requirement: 1,
    hidden: true,
    unlockChance: 0.01 // 1% chance
  }
}

const CATEGORIES = {
  productivity: { name: 'Productivity', color: '#74b9ff', icon: '🎯' },
  streak: { name: 'Streaks', color: '#ff7675', icon: '🔥' },
  coins: { name: 'Coins', color: '#fdcb6e', icon: '💰' },
  pet: { name: 'Pet Care', color: '#a29bfe', icon: '🐾' },
  secret: { name: 'Secret', color: '#636e72', icon: '🤫' }
}

// ============================================
// LEVELS & XP
// ============================================
const LEVELS = {
  1: { name: 'Beginner', xpRequired: 0, reward: null },
  2: { name: 'Learner', xpRequired: 100, reward: 'Unlock Basic Furniture' },
  3: { name: 'Achiever', xpRequired: 250, reward: 'Unlock New Pet' },
  4: { name: 'Master', xpRequired: 500, reward: 'Unlock Special Theme' },
  5: { name: 'Expert', xpRequired: 1000, reward: 'Unlock Pet Outfit' },
  6: { name: 'Legend', xpRequired: 2000, reward: 'Exclusive Badge' },
  7: { name: 'Grandmaster', xpRequired: 4000, reward: 'Legendary Pet Color' },
  8: { name: 'Mythic', xpRequired: 8000, reward: 'Mythic Title' },
  9: { name: 'Divine', xpRequired: 15000, reward: 'Divine Aura' },
  10: { name: 'Eternal', xpRequired: 30000, reward: '🏆 Eternal Trophy' }
}

const XP_SOURCES = {
  task_complete: { LOW: 5, MEDIUM: 10, HIGH: 20, '-': 3 },
  focus_session: 2, // per 5 minutes
  daily_quest: 25,
  achievement: 50,
  streak_bonus: 10,
  perfect_day: 100
}

// ============================================
// DAILY QUESTS
// ============================================
const QUEST_POOL = [
  { id: 'q1', title: 'Complete 3 HIGH energy tasks', reward: { coins: 50, xp: 25 }, type: 'high_energy', target: 3 },
  { id: 'q2', title: 'Focus for 100 minutes', reward: { coins: 30, xp: 20 }, type: 'focus_minutes', target: 100 },
  { id: 'q3', title: 'Feed pet 3 times', reward: { coins: 20, xp: 15 }, type: 'feed_pet', target: 3 },
  { id: 'q4', title: 'Complete all chores', reward: { coins: 40, xp: 30 }, type: 'chores', target: 1 },
  { id: 'q5', title: 'No skipped tasks', reward: { coins: 25, xp: 20 }, type: 'no_skip', target: 1 },
  { id: 'q6', title: 'Complete 5 MEDIUM tasks', reward: { coins: 35, xp: 25 }, type: 'medium_energy', target: 5 },
  { id: 'q7', title: 'Earn 100 coins', reward: { coins: 20, xp: 15 }, type: 'earn_coins', target: 100 },
  { id: 'q8', title: 'Complete morning routine', reward: { coins: 30, xp: 20 }, type: 'morning', target: 1 }
]

export const GamificationProvider = ({ children }) => {
  // ============================================
  // STATE
  // ============================================
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('achievements')
    return saved ? JSON.parse(saved) : { unlocked: [], progress: {} }
  })
  
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem('userLevel')
    return saved ? parseInt(saved) : 1
  })
  
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('userXP')
    return saved ? parseInt(saved) : 0
  })
  
  const [dailyQuests, setDailyQuests] = useState(() => {
    const saved = localStorage.getItem('dailyQuests')
    const date = localStorage.getItem('dailyQuestsDate')
    const today = new Date().toDateString()
    
    if (saved && date === today) {
      return JSON.parse(saved)
    }
    return generateDailyQuests()
  })
  
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('gamificationStats')
    return saved ? JSON.parse(saved) : {
      totalCoins: 0,
      totalXP: 0,
      tasksCompleted: 0,
      focusMinutes: 0,
      streakDays: 0,
      perfectDays: 0,
      achievementsUnlocked: 0,
      feedCount: 0,
      choresCompleted: 0,
      highEnergyTasks: 0,
      mediumEnergyTasks: 0,
      lowEnergyTasks: 0,
      tasksAfterMidnight: 0,
      tasksBefore6AM: 0,
      coffeePurchases: 0
    }
  })
  
  const [showAchievementPopup, setShowAchievementPopup] = useState(null)
  const [showLevelUpPopup, setShowLevelUpPopup] = useState(false)
  const [unlockedAchievements, setUnlockedAchievements] = useState([])

  // ============================================
  // SAVE DATA
  // ============================================
  useEffect(() => {
    localStorage.setItem('achievements', JSON.stringify(achievements))
  }, [achievements])
  
  useEffect(() => {
    localStorage.setItem('userLevel', level.toString())
    localStorage.setItem('userXP', xp.toString())
  }, [level, xp])
  
  useEffect(() => {
    localStorage.setItem('dailyQuests', JSON.stringify(dailyQuests))
    localStorage.setItem('dailyQuestsDate', new Date().toDateString())
  }, [dailyQuests])
  
  useEffect(() => {
    localStorage.setItem('gamificationStats', JSON.stringify(stats))
  }, [stats])

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
  const generateDailyQuests = () => {
    const shuffled = [...QUEST_POOL].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, 3).map(quest => ({
      ...quest,
      progress: 0,
      completed: false,
      claimed: false
    }))
  }
  
  const resetDailyQuests = () => {
    setDailyQuests(generateDailyQuests())
  }

  const checkDailyQuestReset = () => {
    const lastDate = localStorage.getItem('dailyQuestsDate')
    const today = new Date().toDateString()
    if (lastDate !== today) {
      resetDailyQuests()
    }
  }

  const getXPForLevel = (lvl) => {
    const levelData = LEVELS[lvl]
    if (!levelData) return 999999
    return levelData.xpRequired
  }

  const getCurrentLevelProgress = () => {
    const currentLevelXP = getXPForLevel(level)
    const nextLevelXP = getXPForLevel(level + 1)
    const progress = xp - currentLevelXP
    const total = nextLevelXP - currentLevelXP
    return { progress, total, percentage: Math.round((progress / total) * 100) }
  }

  // ============================================
  // ACHIEVEMENT CHECKS
  // ============================================
  const checkAchievements = () => {
    const newAchievements = []
    
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      if (achievements.unlocked.includes(achievement.id)) return
      
      let unlocked = false
      let progress = achievements.progress[achievement.id] || 0
      
      switch (achievement.id) {
        case 'early_bird':
          progress = stats.tasksBefore6AM
          unlocked = progress >= achievement.requirement
          break
        case 'focus_master':
          progress = stats.focusMinutes
          unlocked = progress >= achievement.requirement
          break
        case 'knowledge_seeker':
          progress = stats.lowEnergyTasks
          unlocked = progress >= achievement.requirement
          break
        case 'perfect_day':
          progress = stats.perfectDays
          unlocked = progress >= achievement.requirement
          break
        case 'week_warrior':
          progress = stats.streakDays
          unlocked = progress >= achievement.requirement
          break
        case 'month_master':
          progress = stats.streakDays
          unlocked = progress >= achievement.requirement
          break
        case 'coin_collector':
          progress = stats.totalCoins
          unlocked = progress >= achievement.requirement
          break
        case 'coin_master':
          progress = stats.totalCoins
          unlocked = progress >= achievement.requirement
          break
        case 'clean_freak':
          progress = stats.choresCompleted
          unlocked = progress >= achievement.requirement
          break
        case 'pet_lover':
          progress = stats.feedCount
          unlocked = progress >= achievement.requirement
          break
        case 'night_owl':
          progress = stats.tasksAfterMidnight
          unlocked = progress >= achievement.requirement
          break
        case 'coffee_addict':
          progress = stats.coffeePurchases
          unlocked = progress >= achievement.requirement
          break
        case 'early_bug':
          progress = stats.tasksBefore6AM
          unlocked = progress >= achievement.requirement
          break
        case 'mystery':
          // Random chance check
          unlocked = Math.random() < achievement.unlockChance
          progress = unlocked ? 1 : 0
          break
        default:
          break
      }
      
      if (unlocked && !achievements.unlocked.includes(achievement.id)) {
        newAchievements.push(achievement.id)
        setAchievements(prev => ({
          unlocked: [...prev.unlocked, achievement.id],
          progress: { ...prev.progress, [achievement.id]: progress }
        }))
      } else {
        setAchievements(prev => ({
          ...prev,
          progress: { ...prev.progress, [achievement.id]: progress }
        }))
      }
    })
    
    if (newAchievements.length > 0) {
      const unlockedData = newAchievements.map(id => ACHIEVEMENTS[id])
      setUnlockedAchievements(unlockedData)
      setShowAchievementPopup(unlockedData[0])
      
      // Award bonus for achievements
      addXP(XP_SOURCES.achievement)
      addCoins(25) // Bonus coins per achievement
    }
  }

  // ============================================
  // LEVEL UP CHECK
  // ============================================
  const checkLevelUp = (prevXP) => {
    const nextLevelXP = getXPForLevel(level + 1)
    if (xp >= nextLevelXP && prevXP < nextLevelXP) {
      setLevel(l => l + 1)
      setShowLevelUpPopup(true)
      
      // Award level up bonus
      const bonus = level * 50
      addCoins(bonus)
    }
  }

  // ============================================
  // ADD XP & COINS
  // ============================================
  const addXP = (amount) => {
    setXp(prev => {
      const newXp = prev + amount
      checkLevelUp(prev)
      return newXp
    })
    setStats(prev => ({ ...prev, totalXP: prev.totalXP + amount }))
  }

  const addCoins = (amount) => {
    const currentCoins = parseInt(localStorage.getItem('petCoins') || '150')
    const newCoins = currentCoins + amount
    localStorage.setItem('petCoins', newCoins.toString())
    setStats(prev => ({ ...prev, totalCoins: prev.totalCoins + amount }))
  }

  // ============================================
  // TRACK ACTIONS
  // ============================================
  const trackTaskComplete = (energy, time = new Date()) => {
    const hour = time.getHours()
    
    setStats(prev => ({
      ...prev,
      tasksCompleted: prev.tasksCompleted + 1,
      [`${energy.toLowerCase()}EnergyTasks`]: prev[`${energy.toLowerCase()}EnergyTasks`] + 1 || 0,
      tasksAfterMidnight: hour >= 0 && hour < 6 ? prev.tasksAfterMidnight + 1 : prev.tasksAfterMidnight,
      tasksBefore6AM: hour >= 0 && hour < 9 ? prev.tasksBefore6AM + 1 : prev.tasksBefore6AM
    }))
    
    // Add XP based on energy
    addXP(XP_SOURCES.task_complete[energy] || 5)
    
    // Track quest progress
    trackQuestProgress('high_energy', energy === 'HIGH' ? 1 : 0)
    trackQuestProgress('medium_energy', energy === 'MEDIUM' ? 1 : 0)
    
    checkAchievements()
  }

  const trackFocusMinutes = (minutes) => {
    setStats(prev => ({ ...prev, focusMinutes: prev.focusMinutes + minutes }))
    addXP(Math.floor(minutes / 5) * XP_SOURCES.focus_session)
    
    trackQuestProgress('focus_minutes', minutes)
    checkAchievements()
  }

  const trackFeedPet = () => {
    setStats(prev => ({ ...prev, feedCount: prev.feedCount + 1 }))
    trackQuestProgress('feed_pet', 1)
    checkAchievements()
  }

  const trackChoresComplete = () => {
    setStats(prev => ({ ...prev, choresCompleted: prev.choresCompleted + 1 }))
    trackQuestProgress('chores', 1)
    checkAchievements()
  }

  const trackCoffeePurchase = () => {
    setStats(prev => ({ ...prev, coffeePurchases: prev.coffeePurchases + 1 }))
    checkAchievements()
  }

  const trackPerfectDay = () => {
    setStats(prev => ({ ...prev, perfectDays: prev.perfectDays + 1 }))
    addXP(XP_SOURCES.perfect_day)
    checkAchievements()
  }

  const trackStreak = (days) => {
    setStats(prev => ({ ...prev, streakDays: days }))
    if (days >= 7) {
      addXP(XP_SOURCES.streak_bonus * Math.floor(days / 7))
    }
    checkAchievements()
  }

  // ============================================
  // QUEST PROGRESS
  // ============================================
  const trackQuestProgress = (type, amount) => {
    setDailyQuests(quests => quests.map(quest => {
      if (quest.type !== type || quest.completed) return quest
      
      const newProgress = Math.min(quest.target, quest.progress + amount)
      const completed = newProgress >= quest.target
      
      if (completed && !quest.completed) {
        // Quest completed!
        addCoins(quest.reward.coins)
        addXP(quest.reward.xp)
      }
      
      return {
        ...quest,
        progress: newProgress,
        completed
      }
    }))
  }

  const claimQuestReward = (questId) => {
    setDailyQuests(quests => quests.map(quest => {
      if (quest.id !== questId || !quest.completed || quest.claimed) return quest
      return { ...quest, claimed: true }
    }))
  }

  // ============================================
  // GETTERS
  // ============================================
  const getAchievementProgress = (id) => {
    return achievements.progress[id] || 0
  }

  const isAchievementUnlocked = (id) => {
    return achievements.unlocked.includes(id)
  }

  const getUnlockedAchievements = () => {
    return achievements.unlocked.map(id => ACHIEVEMENTS[id])
  }

  const getLockedAchievements = () => {
    return Object.values(ACHIEVEMENTS).filter(
      a => !achievements.unlocked.includes(a.id)
    )
  }

  const getCurrentLevelData = () => {
    return LEVELS[level] || LEVELS[10]
  }

  const getNextLevelData = () => {
    return LEVELS[level + 1] || null
  }

  // ============================================
  // VALUE
  // ============================================
  const value = {
    // State
    achievements,
    level,
    xp,
    dailyQuests,
    stats,
    
    // Achievements
    ACHIEVEMENTS,
    CATEGORIES,
    getAchievementProgress,
    isAchievementUnlocked,
    getUnlockedAchievements,
    getLockedAchievements,
    checkAchievements,
    showAchievementPopup,
    setShowAchievementPopup,
    unlockedAchievements,
    
    // Level & XP
    LEVELS,
    XP_SOURCES,
    getCurrentLevelData,
    getNextLevelData,
    getCurrentLevelProgress,
    addXP,
    addCoins,
    showLevelUpPopup,
    setShowLevelUpPopup,
    
    // Quests
    QUEST_POOL,
    dailyQuests,
    checkDailyQuestReset,
    trackQuestProgress,
    claimQuestReward,
    
    // Tracking
    trackTaskComplete,
    trackFocusMinutes,
    trackFeedPet,
    trackChoresComplete,
    trackCoffeePurchase,
    trackPerfectDay,
    trackStreak,
    
    // Utils
    generateDailyQuests,
    resetDailyQuests
  }

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  )
}

export default GamificationContext
