import React, { createContext, useState, useContext, useEffect } from 'react'

const XPContext = createContext()

const XP_CONFIG = {
  taskComplete: 10,
  taskCompleteStreak: 5,
  focusMinute: 2,
  meditationSession: 25,
  journalEntry: 15,
  habitComplete: 8,
  dailyGoalComplete: 50,
  weeklyGoalComplete: 200
}

const LEVEL_CONFIG = {
  1: { xpRequired: 100, title: 'Beginner' },
  2: { xpRequired: 250, title: 'Novice' },
  3: { xpRequired: 500, title: 'Apprentice' },
  4: { xpRequired: 1000, title: 'Intermediate' },
  5: { xpRequired: 2000, title: 'Advanced' },
  6: { xpRequired: 3500, title: 'Expert' },
  7: { xpRequired: 5500, title: 'Master' },
  8: { xpRequired: 8000, title: 'Grand Master' },
  9: { xpRequired: 11000, title: 'Legend' },
  10: { xpRequired: 15000, title: 'Mythic' }
}

export const XPProvider = ({ children }) => {
  const [xp, setXp] = useState(() => {
    const saved = localStorage.getItem('calmoraXP')
    return saved ? JSON.parse(saved) : { total: 0, current: 0, level: 1 }
  })
  
  const [achievements, setAchievements] = useState(() => {
    const saved = localStorage.getItem('calmoraAchievements')
    return saved ? JSON.parse(saved) : []
  })

  const [showLevelUp, setShowLevelUp] = useState(false)
  const [showXP, setShowXP] = useState(false)
  const [lastXP, setLastXP] = useState(0)

  useEffect(() => {
    localStorage.setItem('calmoraXP', JSON.stringify(xp))
  }, [xp])

  useEffect(() => {
    localStorage.setItem('calmoraAchievements', JSON.stringify(achievements))
  }, [achievements])

  const addXP = (amount, reason = '') => {
    const now = Date.now()
    setLastXP({ amount, reason, timestamp: now })
    setShowXP(true)
    
    setTimeout(() => setShowXP(false), 2000)
    
    setXp(prev => {
      const newCurrent = prev.current + amount
      const newTotal = prev.total + amount
      const currentLevelConfig = LEVEL_CONFIG[prev.level]
      
      // Check for level up
      if (newCurrent >= currentLevelConfig.xpRequired && prev.level < 10) {
        const newLevel = prev.level + 1
        setShowLevelUp(true)
        
        setTimeout(() => setShowLevelUp(false), 3000)
        
        return {
          total: newTotal,
          current: newCurrent - currentLevelConfig.xpRequired,
          level: newLevel
        }
      }
      
      return {
        total: newTotal,
        current: newCurrent,
        level: prev.level
      }
    })
  }

  const getLevelProgress = () => {
    const currentLevelConfig = LEVEL_CONFIG[xp.level] || LEVEL_CONFIG[10]
    const prevLevelConfig = LEVEL_CONFIG[xp.level - 1] || { xpRequired: 0 }
    const progress = (xp.current / (currentLevelConfig.xpRequired - prevLevelConfig.xpRequired)) * 100
    return Math.min(progress, 100)
  }

  const unlockAchievement = (achievementId) => {
    if (!achievements.includes(achievementId)) {
      setAchievements(prev => [...prev, achievementId])
      addXP(100, 'Achievement Unlocked!')
      return true
    }
    return false
  }

  const checkAchievements = (stats) => {
    // First Task
    if (stats.tasksCompleted >= 1) {
      unlockAchievement('first_task')
    }
    
    // Task Master (100 tasks)
    if (stats.tasksCompleted >= 100) {
      unlockAchievement('task_master')
    }
    
    // Week Streak
    if (stats.currentStreak >= 7) {
      unlockAchievement('week_streak')
    }
    
    // Month Streak
    if (stats.currentStreak >= 30) {
      unlockAchievement('month_streak')
    }
    
    // Focus Master (10 hours)
    if (stats.focusMinutes >= 600) {
      unlockAchievement('focus_master')
    }
    
    // Zen Master (10 meditations)
    if (stats.meditationSessions >= 10) {
      unlockAchievement('zen_master')
    }
    
    // Level 5
    if (xp.level >= 5) {
      unlockAchievement('level_5')
    }
    
    // Level 10
    if (xp.level >= 10) {
      unlockAchievement('level_10')
    }
  }

  const getLevelTitle = () => {
    return LEVEL_CONFIG[xp.level]?.title || 'Mythic'
  }

  return (
    <XPContext.Provider value={{
      xp,
      achievements,
      addXP,
      unlockAchievement,
      checkAchievements,
      getLevelProgress,
      getLevelTitle,
      showLevelUp,
      showXP,
      lastXP,
      XP_CONFIG,
      LEVEL_CONFIG
    }}>
      {children}
    </XPContext.Provider>
  )
}

export const useXP = () => {
  const context = useContext(XPContext)
  if (!context) throw new Error('useXP must be used within XPProvider')
  return context
}
