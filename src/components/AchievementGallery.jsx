import React, { useState } from 'react'
import { useXP } from '../contexts/XPContext'
import { Trophy, Star, Lock, Sparkles, Crown, Zap, Heart, Target, Calendar, Flame } from 'lucide-react'
import './AchievementGallery.css'

// ============================================
// ACHIEVEMENT CATEGORIES
// ============================================
const CATEGORIES = {
  all: { name: 'All', icon: Star },
  tasks: { name: 'Tasks', icon: Target },
  streak: { name: 'Streaks', icon: Flame },
  focus: { name: 'Focus', icon: Zap },
  wellness: { name: 'Wellness', icon: Heart },
  special: { name: 'Special', icon: Crown }
}

// ============================================
// ACHIEVEMENTS DATA - Enhanced with rarity & effects
// ============================================
const ACHIEVEMENTS = [
  // TASK ACHIEVEMENTS
  {
    id: 'first_task',
    name: 'First Step',
    description: 'Complete your first task',
    category: 'tasks',
    rarity: 'common',
    icon: '🎯',
    xpReward: 25,
    coinReward: 10,
    requirement: 1
  },
  {
    id: 'task_novice',
    name: 'Task Novice',
    description: 'Complete 10 tasks',
    category: 'tasks',
    rarity: 'common',
    icon: '📝',
    xpReward: 50,
    coinReward: 25,
    requirement: 10
  },
  {
    id: 'task_master',
    name: 'Task Master',
    description: 'Complete 100 tasks',
    category: 'tasks',
    rarity: 'rare',
    icon: '🏆',
    xpReward: 200,
    coinReward: 100,
    requirement: 100
  },
  {
    id: 'task_legend',
    name: 'Task Legend',
    description: 'Complete 500 tasks',
    category: 'tasks',
    rarity: 'legendary',
    icon: '👑',
    xpReward: 500,
    coinReward: 300,
    requirement: 500
  },

  // STREAK ACHIEVEMENTS
  {
    id: 'week_streak',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    category: 'streak',
    rarity: 'uncommon',
    icon: '🔥',
    xpReward: 100,
    coinReward: 50,
    requirement: 7
  },
  {
    id: 'month_streak',
    name: 'Month Master',
    description: 'Maintain a 30-day streak',
    category: 'streak',
    rarity: 'rare',
    icon: '💪',
    xpReward: 300,
    coinReward: 150,
    requirement: 30
  },
  {
    id: 'year_streak',
    name: 'Year Legend',
    description: 'Maintain a 365-day streak',
    category: 'streak',
    rarity: 'legendary',
    icon: '⚡',
    xpReward: 1000,
    coinReward: 500,
    requirement: 365
  },

  // FOCUS ACHIEVEMENTS
  {
    id: 'focus_10min',
    name: 'Focused Start',
    description: 'Complete 10 minutes of focus',
    category: 'focus',
    rarity: 'common',
    icon: '🎯',
    xpReward: 30,
    coinReward: 15,
    requirement: 10
  },
  {
    id: 'focus_master',
    name: 'Focus Master',
    description: 'Complete 10 hours of focus',
    category: 'focus',
    rarity: 'rare',
    icon: '🧘',
    xpReward: 250,
    coinReward: 120,
    requirement: 600
  },
  {
    id: 'focus_god',
    name: 'Focus God',
    description: 'Complete 100 hours of focus',
    category: 'focus',
    rarity: 'legendary',
    icon: '🌟',
    xpReward: 600,
    coinReward: 350,
    requirement: 6000
  },

  // WELLNESS ACHIEVEMENTS
  {
    id: 'zen_master',
    name: 'Zen Master',
    description: 'Complete 10 meditation sessions',
    category: 'wellness',
    rarity: 'uncommon',
    icon: '🧘',
    xpReward: 100,
    coinReward: 50,
    requirement: 10
  },
  {
    id: 'mood_tracker',
    name: 'Mood Explorer',
    description: 'Log your mood 20 times',
    category: 'wellness',
    rarity: 'common',
    icon: '😊',
    xpReward: 50,
    coinReward: 25,
    requirement: 20
  },
  {
    id: 'gratitude_7',
    name: 'Grateful Heart',
    description: 'Write 7 gratitude entries',
    category: 'wellness',
    rarity: 'uncommon',
    icon: '💝',
    xpReward: 80,
    coinReward: 40,
    requirement: 7
  },
  {
    id: 'habit_champion',
    name: 'Habit Champion',
    description: 'Complete 50 habits',
    category: 'wellness',
    rarity: 'rare',
    icon: '⭐',
    xpReward: 200,
    coinReward: 100,
    requirement: 50
  },

  // SPECIAL ACHIEVEMENTS
  {
    id: 'level_5',
    name: 'Rising Star',
    description: 'Reach level 5',
    category: 'special',
    rarity: 'uncommon',
    icon: '🌟',
    xpReward: 150,
    coinReward: 75,
    requirement: 5
  },
  {
    id: 'level_10',
    name: 'Productivity Legend',
    description: 'Reach maximum level',
    category: 'special',
    rarity: 'legendary',
    icon: '👑',
    xpReward: 1000,
    coinReward: 500,
    requirement: 10
  },
  {
    id: 'early_bird',
    name: 'Early Bird',
    description: 'Complete a task before 6 AM',
    category: 'special',
    rarity: 'rare',
    icon: '🌅',
    xpReward: 100,
    coinReward: 50,
    requirement: 1
  },
  {
    id: 'night_owl',
    name: 'Night Owl',
    description: 'Complete a task after 11 PM',
    category: 'special',
    rarity: 'rare',
    icon: '🌙',
    xpReward: 100,
    coinReward: 50,
    requirement: 1
  },
  {
    id: 'perfectionist',
    name: 'Perfectionist',
    description: 'Complete all daily tasks',
    category: 'special',
    rarity: 'epic',
    icon: '💎',
    xpReward: 300,
    coinReward: 150,
    requirement: 1
  },
  {
    id: 'collector',
    name: 'Collector',
    description: 'Unlock 25 achievements',
    category: 'special',
    rarity: 'epic',
    icon: '🏅',
    xpReward: 400,
    coinReward: 200,
    requirement: 25
  }
]

// ============================================
// RARITY CONFIG
// ============================================
const RARITY_CONFIG = {
  common: { 
    color: '#94a3b8', 
    bgColor: 'rgba(148, 163, 184, 0.1)',
    borderColor: '#cbd5e1',
    glowColor: 'rgba(203, 213, 225, 0.3)'
  },
  uncommon: { 
    color: '#22c55e', 
    bgColor: 'rgba(34, 197, 94, 0.1)',
    borderColor: '#4ade80',
    glowColor: 'rgba(74, 222, 128, 0.3)'
  },
  rare: { 
    color: '#3b82f6', 
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: '#60a5fa',
    glowColor: 'rgba(96, 165, 250, 0.3)'
  },
  epic: { 
    color: '#a855f7', 
    bgColor: 'rgba(168, 85, 247, 0.1)',
    borderColor: '#c084fc',
    glowColor: 'rgba(192, 132, 252, 0.3)'
  },
  legendary: { 
    color: '#f59e0b', 
    bgColor: 'rgba(245, 158, 11, 0.1)',
    borderColor: '#fbbf24',
    glowColor: 'rgba(251, 191, 36, 0.4)'
  }
}

export const AchievementGallery = () => {
  const { achievements, xp } = useXP()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAchievement, setSelectedAchievement] = useState(null)

  const filteredAchievements = selectedCategory === 'all'
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === selectedCategory)

  const unlockedCount = achievements.length
  const totalCount = ACHIEVEMENTS.length
  const progressPercent = (unlockedCount / totalCount) * 100

  const getRarityStyle = (rarity) => {
    return RARITY_CONFIG[rarity] || RARITY_CONFIG.common
  }

  const isUnlocked = (id) => achievements.includes(id)

  return (
    <div className="achievement-gallery">
      {/* Header with Stats */}
      <div className="achievement-header">
        <div className="achievement-title">
          <Trophy size={28} className="trophy-icon" />
          <h2>Achievement Gallery</h2>
        </div>
        
        <div className="achievement-stats">
          <div className="achievement-progress">
            <div className="progress-info">
              <span>Progress</span>
              <span>{unlockedCount}/{totalCount}</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          
          <div className="achievement-summary">
            <div className="summary-item">
              <Sparkles size={16} />
              <span>{unlockedCount} Unlocked</span>
            </div>
            <div className="summary-item">
              <Lock size={16} />
              <span>{totalCount - unlockedCount} Locked</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="achievement-categories">
        {Object.entries(CATEGORIES).map(([key, { name, icon: Icon }]) => (
          <button
            key={key}
            className={`category-btn ${selectedCategory === key ? 'active' : ''}`}
            onClick={() => setSelectedCategory(key)}
          >
            <Icon size={18} />
            <span>{name}</span>
          </button>
        ))}
      </div>

      {/* Achievement Grid */}
      <div className="achievement-grid">
        {filteredAchievements.map((achievement) => {
          const unlocked = isUnlocked(achievement.id)
          const rarity = getRarityStyle(achievement.rarity)
          
          return (
            <div
              key={achievement.id}
              className={`achievement-card ${unlocked ? 'unlocked' : 'locked'} ${achievement.rarity}`}
              onClick={() => unlocked && setSelectedAchievement(achievement)}
              style={!unlocked ? {} : {
                borderColor: rarity.borderColor,
                background: `linear-gradient(135deg, ${rarity.bgColor} 0%, transparent 100%)`
              }}
            >
              {/* Rarity Glow Effect */}
              {unlocked && (
                <div 
                  className="achievement-glow"
                  style={{ backgroundColor: rarity.glowColor }}
                />
              )}

              {/* Icon */}
              <div className="achievement-card-icon">
                {unlocked ? (
                  <span className="icon-emoji">{achievement.icon}</span>
                ) : (
                  <Lock size={32} />
                )}
              </div>

              {/* Info */}
              <div className="achievement-card-info">
                <h4 className="achievement-name">{achievement.name}</h4>
                <p className="achievement-description">
                  {unlocked ? achievement.description : '???'}
                </p>
                
                {unlocked && (
                  <div className="achievement-rewards-mini">
                    <span className="xp-badge">+{achievement.xpReward} XP</span>
                    <span className="coin-badge">+{achievement.coinReward} 🪙</span>
                  </div>
                )}
              </div>

              {/* Rarity Badge */}
              {unlocked && (
                <div 
                  className="rarity-badge"
                  style={{ color: rarity.color }}
                >
                  {achievement.rarity}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Achievement Detail Modal */}
      {selectedAchievement && (
        <div 
          className="achievement-modal-overlay"
          onClick={() => setSelectedAchievement(null)}
        >
          <div 
            className="achievement-modal"
            onClick={(e) => e.stopPropagation()}
            style={{
              borderColor: getRarityStyle(selectedAchievement.rarity).borderColor
            }}
          >
            <button 
              className="modal-close"
              onClick={() => setSelectedAchievement(null)}
            >
              <Lock size={20} className="rotate-45" />
            </button>

            <div className="modal-content">
              <div 
                className="modal-icon-large"
                style={{
                  background: `linear-gradient(135deg, ${getRarityStyle(selectedAchievement.rarity).bgColor} 0%, transparent 100%)`
                }}
              >
                <span className="icon-emoji-large">{selectedAchievement.icon}</span>
              </div>

              <div className="modal-info">
                <div 
                  className="modal-rarity"
                  style={{ color: getRarityStyle(selectedAchievement.rarity).color }}
                >
                  {selectedAchievement.rarity.toUpperCase()}
                </div>
                <h3 className="modal-name">{selectedAchievement.name}</h3>
                <p className="modal-description">{selectedAchievement.description}</p>
                
                <div className="modal-requirement">
                  <Target size={16} />
                  <span>Requirement: {selectedAchievement.requirement}</span>
                </div>

                <div className="modal-rewards">
                  <h4>Rewards</h4>
                  <div className="rewards-grid">
                    <div className="reward-item-detailed">
                      <Star size={20} className="star-icon" />
                      <span>+{selectedAchievement.xpReward} XP</span>
                    </div>
                    <div className="reward-item-detailed">
                      <span className="coin-icon">🪙</span>
                      <span>+{selectedAchievement.coinReward} Coins</span>
                    </div>
                  </div>
                </div>

                <div className="modal-stats">
                  <div className="stat-item">
                    <Calendar size={16} />
                    <span>Category: {CATEGORIES[selectedAchievement.category].name}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AchievementGallery
