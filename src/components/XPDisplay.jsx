import React from 'react'
import { useXP } from '../contexts/XPContext'
import { Star, Trophy } from 'lucide-react'
import './XPDisplay.css'

export const XPDisplay = ({ compact = false }) => {
  const { xp, getLevelProgress, getLevelTitle } = useXP()
  const progress = getLevelProgress()

  if (compact) {
    return (
      <div className="xp-display-compact">
        <div className="xp-level-badge">
          <Star size={16} fill="#ffd700" color="#ffd700" />
          <span className="xp-level">{xp.level}</span>
        </div>
        <div className="xp-progress-mini">
          <div 
            className="xp-progress-fill-mini" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="xp-display">
      <div className="xp-header">
        <div className="xp-level-info">
          <Trophy size={20} color="#6b9f7f" />
          <span className="xp-level-number">Level {xp.level}</span>
        </div>
        <span className="xp-title">{getLevelTitle()}</span>
      </div>

      <div className="xp-progress-container">
        <div className="xp-progress-bar">
          <div 
            className="xp-progress-fill" 
            style={{ width: `${progress}%` }}
          >
            <div className="xp-progress-glow" />
          </div>
        </div>
        <div className="xp-progress-text">
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      <div className="xp-stats">
        <div className="xp-stat">
          <span className="xp-stat-label">Total XP</span>
          <span className="xp-stat-value">{xp.total.toLocaleString()}</span>
        </div>
        <div className="xp-stat">
          <span className="xp-stat-label">To Next Level</span>
          <span className="xp-stat-value">{Math.max(0, 100 - progress).toFixed(0)}%</span>
        </div>
      </div>
    </div>
  )
}

export default XPDisplay
