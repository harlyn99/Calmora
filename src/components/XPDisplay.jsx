import React from 'react'
import { useXP } from '../contexts/XPContext'
import { useSound } from '../contexts/SoundContext'
import { Star, Trophy, Award, Zap } from 'lucide-react'
import './XPDisplay.css'

export const XPDisplay = () => {
  const { xp, getLevelProgress, getLevelTitle } = useXP()
  const { showXP, lastXP } = useXP()

  return (
    <div className="xp-display">
      <div className="xp-header">
        <div className="level-badge">
          <Star size={20} />
          <span>Lv.{xp.level}</span>
        </div>
        <span className="level-title">{getLevelTitle()}</span>
      </div>
      
      <div className="xp-progress-container">
        <div 
          className="xp-progress-bar"
          style={{ width: `${getLevelProgress()}%` }}
        />
      </div>
      
      <div className="xp-values">
        <span>{xp.current} XP</span>
        <span className="xp-total\">Total: {xp.total} XP</span>
      </div>

      {showXP && lastXP && (
        <div className="xp-gain-animation">
          +{lastXP.amount} XP
        </div>
      )}
    </div>
  )
}

export const LevelUpModal = ({ show }) => {
  const { xp, getLevelTitle } = useXP()
  const { playLevelUp } = useSound()

  React.useEffect(() => {
    if (show) playLevelUp()
  }, [show])

  if (!show) return null

  return (
    <div className="level-up-modal">
      <div className="level-up-content">
        <div className="level-up-icon">
          <Trophy size={64} />
        </div>
        <h2>Level Up!</h2>
        <p className="new-level">Level {xp.level}</p>
        <p className="level-title">{getLevelTitle()}</p>
        <div className="level-up-confetti" />
      </div>
    </div>
  )
}

export const AchievementBadge = ({ achievement }) => {
  const badges = {
    first_task: { emoji: '🎯', name: 'First Step', description: 'Complete your first task' },
    task_master: { emoji: '👑', name: 'Task Master', description: 'Complete 100 tasks' },
    week_streak: { emoji: '🔥', name: 'Week Warrior', description: '7 day streak' },
    month_streak: { emoji: '💪', name: 'Month Master', description: '30 day streak' },
    focus_master: { emoji: '⚡', name: 'Focus Master', description: '10 hours of focus' },
    zen_master: { emoji: '🧘', name: 'Zen Master', description: '10 meditation sessions' },
    level_5: { emoji: '⭐', name: 'Rising Star', description: 'Reach level 5' },
    level_10: { emoji: '🌟', name: 'Legend', description: 'Reach level 10' }
  }

  const badge = badges[achievement.id] || achievement

  return (
    <div className={`achievement-badge ${achievement.unlocked ? 'unlocked' : 'locked'}`}>
      <span className="badge-emoji">{badge.emoji}</span>
      <span className="badge-name">{badge.name}</span>
      <span className="badge-description">{badge.description}</span>
    </div>
  )
}

export default XPDisplay
