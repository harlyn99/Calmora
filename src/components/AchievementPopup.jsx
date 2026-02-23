import React from 'react'
import { useGamification } from '../contexts/GamificationContext'
import { X, Trophy, Star, Lock } from 'lucide-react'
import './AchievementPopup.css'

export const AchievementPopup = () => {
  const { showAchievementPopup, setShowAchievementPopup } = useGamification()

  if (!showAchievementPopup) return null

  return (
    <div className="achievement-overlay" onClick={() => setShowAchievementPopup(null)}>
      <div className="achievement-popup" onClick={(e) => e.stopPropagation()}>
        <button className="achievement-close" onClick={() => setShowAchievementPopup(null)}>
          <X size={20} />
        </button>
        
        <div className="achievement-content">
          <div className="achievement-icon">
            {showAchievementPopup.icon}
          </div>
          
          <h2>Achievement Unlocked!</h2>
          
          <div className="achievement-details">
            <h3>{showAchievementPopup.name}</h3>
            <p>{showAchievementPopup.description}</p>
          </div>
          
          <div className="achievement-rewards">
            <div className="reward-item">
              <span className="reward-icon">🪙</span>
              <span className="reward-text">+25 Coins</span>
            </div>
            <div className="reward-item">
              <span className="reward-icon">⭐</span>
              <span className="reward-text">+50 XP</span>
            </div>
          </div>
          
          <button 
            className="achievement-claim-btn"
            onClick={() => setShowAchievementPopup(null)}
          >
            Awesome! 🎉
          </button>
        </div>
      </div>
    </div>
  )
}

export default AchievementPopup
