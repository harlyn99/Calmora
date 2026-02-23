import React, { useEffect, useState } from 'react'
import { useXP } from '../contexts/XPContext'
import { Star, Sparkles, Trophy } from 'lucide-react'
import Confetti from './Confetti'
import './LevelUpPopup.css'

const LEVEL_TITLES = {
  1: 'Beginner',
  2: 'Novice', 
  3: 'Apprentice',
  4: 'Intermediate',
  5: 'Advanced',
  6: 'Expert',
  7: 'Master',
  8: 'Grand Master',
  9: 'Legend',
  10: 'Mythic'
}

export const LevelUpPopup = () => {
  const { xp, getLevelTitle } = useXP()
  const [isVisible, setIsVisible] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [displayLevel, setDisplayLevel] = useState(xp.level)

  useEffect(() => {
    setIsVisible(true)
    setDisplayLevel(xp.level)
    
    // Trigger confetti
    setShowConfetti(true)
    const confettiTimer = setTimeout(() => setShowConfetti(false), 4000)

    // Auto hide
    const hideTimer = setTimeout(() => setIsVisible(false), 5000)

    return () => {
      clearTimeout(confettiTimer)
      clearTimeout(hideTimer)
    }
  }, [xp.level])

  if (!isVisible) return null

  const title = LEVEL_TITLES[displayLevel] || 'Mythic'

  return (
    <>
      <Confetti active={showConfetti} particleCount={200} />
      
      <div className="levelup-overlay">
        <div className="levelup-container">
          {/* Background Glow */}
          <div className="levelup-glow"></div>
          
          {/* Animated Rings */}
          <div className="levelup-ring ring-1"></div>
          <div className="levelup-ring ring-2"></div>
          <div className="levelup-ring ring-3"></div>

          {/* Main Content */}
          <div className="levelup-content fade-in-up">
            {/* Stars */}
            <div className="levelup-stars">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`star star-${i}`}
                  size={24}
                  fill="#ffd700"
                  color="#ffd700"
                />
              ))}
            </div>

            {/* Sparkles */}
            <Sparkles className="sparkle sparkle-1" size={32} />
            <Sparkles className="sparkle sparkle-2" size={24} />
            <Sparkles className="sparkle sparkle-3" size={28} />

            {/* Level Up Text */}
            <div className="levelup-text">
              <span className="levelup-label">🎉 Level Up!</span>
              <div className="levelup-number">{displayLevel}</div>
              <span className="levelup-title">{title}</span>
            </div>

            {/* Trophy Icon */}
            <div className="levelup-trophy">
              <Trophy size={64} fill="#ffd700" color="#ffd700" />
            </div>

            {/* Progress Bar */}
            <div className="levelup-progress">
              <div className="levelup-progress-bar">
                <div className="levelup-progress-fill"></div>
              </div>
            </div>

            {/* XP Info */}
            <div className="levelup-xp-info">
              <span>Keep going to unlock more rewards!</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LevelUpPopup
