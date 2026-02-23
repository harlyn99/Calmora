import React, { useState, useEffect } from 'react'
import { Sparkles, Star, Gift, Coins, X, Zap } from 'lucide-react'
import './DailyLuckyDraw.css'

// ============================================
// REWARDS CONFIGURATION
// ============================================
const REWARDS = [
  // Common (60% chance)
  { id: 'coins_10', name: '10 Coins', type: 'coins', value: 10, rarity: 'common', icon: '🪙', weight: 30 },
  { id: 'coins_20', name: '20 Coins', type: 'coins', value: 20, rarity: 'common', icon: '🪙', weight: 25 },
  { id: 'xp_25', name: '25 XP', type: 'xp', value: 25, rarity: 'common', icon: '⭐', weight: 20 },
  { id: 'xp_50', name: '50 XP', type: 'xp', value: 50, rarity: 'common', icon: '⭐', weight: 15 },
  
  // Uncommon (25% chance)
  { id: 'coins_50', name: '50 Coins', type: 'coins', value: 50, rarity: 'uncommon', icon: '🪙', weight: 12 },
  { id: 'xp_100', name: '100 XP', type: 'xp', value: 100, rarity: 'uncommon', icon: '⭐', weight: 10 },
  { id: 'streak_1', name: 'Streak Freeze', type: 'item', value: 'streak_freeze', rarity: 'uncommon', icon: '🧊', weight: 8 },
  
  // Rare (10% chance)
  { id: 'coins_100', name: '100 Coins', type: 'coins', value: 100, rarity: 'rare', icon: '💰', weight: 6 },
  { id: 'xp_200', name: '200 XP', type: 'xp', value: 200, rarity: 'rare', icon: '💫', weight: 5 },
  { id: 'powerup_xp', name: '2x XP Boost', type: 'item', value: 'xp_boost_2x', rarity: 'rare', icon: '⚡', weight: 4 },
  
  // Epic (4% chance)
  { id: 'coins_250', name: '250 Coins', type: 'coins', value: 250, rarity: 'epic', icon: '💎', weight: 2.5 },
  { id: 'xp_500', name: '500 XP', type: 'xp', value: 500, rarity: 'epic', icon: '🌟', weight: 2 },
  { id: 'powerup_3x', name: '3x XP Boost', type: 'item', value: 'xp_boost_3x', rarity: 'epic', icon: '🔥', weight: 1.5 },
  
  // Legendary (1% chance)
  { id: 'coins_500', name: '500 Coins', type: 'coins', value: 500, rarity: 'legendary', icon: '👑', weight: 0.7 },
  { id: 'xp_1000', name: '1000 XP', type: 'xp', value: 1000, rarity: 'legendary', icon: '✨', weight: 0.5 },
  { id: 'mystery', name: 'Mystery Box', type: 'mystery', value: 'mystery', rarity: 'legendary', icon: '🎁', weight: 0.3 }
]

// ============================================
// RARITY CONFIG
// ============================================
const RARITY_CONFIG = {
  common: { 
    color: '#94a3b8',
    bg: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    border: '#cbd5e1',
    glow: 'rgba(203, 213, 225, 0.4)'
  },
  uncommon: { 
    color: '#22c55e',
    bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    border: '#86efac',
    glow: 'rgba(134, 239, 172, 0.5)'
  },
  rare: { 
    color: '#3b82f6',
    bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    border: '#93c5fd',
    glow: 'rgba(147, 197, 253, 0.5)'
  },
  epic: { 
    color: '#a855f7',
    bg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
    border: '#d8b4fe',
    glow: 'rgba(216, 180, 254, 0.6)'
  },
  legendary: { 
    color: '#f59e0b',
    bg: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
    border: '#fbbf24',
    glow: 'rgba(251, 191, 36, 0.7)'
  }
}

export const DailyLuckyDraw = ({ onReward, coins, onAddCoins, onAddXP, onAddItem }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedReward, setSelectedReward] = useState(null)
  const [showResult, setShowResult] = useState(false)
  const [canDraw, setCanDraw] = useState(true)
  const [spinPosition, setSpinPosition] = useState(0)

  // Check daily draw status
  useEffect(() => {
    const lastDraw = localStorage.getItem('lastLuckyDraw')
    if (lastDraw) {
      const lastDrawTime = parseInt(lastDraw)
      const now = Date.now()
      const nextDraw = lastDrawTime + (24 * 60 * 60 * 1000) // 24 hours

      if (now < nextDraw) {
        setCanDraw(false)
      }
    }
  }, [])

  const getWeightedReward = () => {
    const totalWeight = REWARDS.reduce((sum, r) => sum + r.weight, 0)
    let random = Math.random() * totalWeight
    
    for (const reward of REWARDS) {
      random -= reward.weight
      if (random <= 0) {
        return reward
      }
    }
    
    return REWARDS[0]
  }

  const spin = () => {
    if (!canDraw || isSpinning) return
    
    setIsSpinning(true)
    setSelectedReward(null)
    
    // Determine reward before spinning
    const reward = getWeightedReward()
    
    // Spin animation
    let position = 0
    const spinInterval = setInterval(() => {
      position += 1
      setSpinPosition(position)
      
      if (position >= 3) { // After 3 full rotations
        clearInterval(spinInterval)
        setSelectedReward(reward)
        setIsSpinning(false)
        setShowResult(true)
        
        // Save last draw time
        localStorage.setItem('lastLuckyDraw', Date.now().toString())
        setCanDraw(false)
      }
    }, 500) // Each "slot" takes 500ms
  }

  const claimReward = () => {
    if (!selectedReward) return
    
    // Apply reward
    switch (selectedReward.type) {
      case 'coins':
        onAddCoins?.(selectedReward.value)
        break
      case 'xp':
        onAddXP?.(selectedReward.value)
        break
      case 'item':
        onAddItem?.(selectedReward.value)
        break
      case 'mystery':
        // Mystery box gives random rare+ reward
        const mysteryRewards = REWARDS.filter(r => ['rare', 'epic', 'legendary'].includes(r.rarity))
        const mysteryReward = mysteryRewards[Math.floor(Math.random() * mysteryRewards.length)]
        onReward?.(mysteryReward)
        break
      default:
        onReward?.(selectedReward)
    }
    
    setShowResult(false)
    setIsOpen(false)
  }

  const getRarityStyle = (rarity) => RARITY_CONFIG[rarity] || RARITY_CONFIG.common

  // Get visible rewards for spinning animation
  const visibleRewards = []
  for (let i = 0; i < 15; i++) {
    visibleRewards.push(REWARDS[i % REWARDS.length])
  }

  return (
    <>
      {/* Lucky Draw Button */}
      <button
        className="lucky-draw-trigger"
        onClick={() => setIsOpen(true)}
      >
        <Gift size={24} />
        <span>Daily Lucky Draw</span>
      </button>

      {/* Lucky Draw Modal */}
      {isOpen && (
        <div 
          className="lucky-draw-overlay"
          onClick={() => !isSpinning && setIsOpen(false)}
        >
          <div 
            className="lucky-draw-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="lucky-draw-close"
              onClick={() => setIsOpen(false)}
              disabled={isSpinning}
            >
              <X size={20} />
            </button>

            <div className="lucky-draw-header">
              <Sparkles size={32} className="header-icon" />
              <h2>Daily Lucky Draw</h2>
              <p>Try your luck! Free draw every 24 hours</p>
            </div>

            {/* Gacha Machine */}
            <div className="gacha-machine">
              <div className="gacha-window">
                <div 
                  className="gacha-slots"
                  style={{ 
                    transform: isSpinning 
                      ? `translateY(-${(spinPosition % 10) * 100}px)`
                      : selectedReward 
                        ? `translateY(-${REWARDS.indexOf(selectedReward) * 100}px)`
                        : 'translateY(0)'
                  }}
                >
                  {visibleRewards.map((reward, index) => {
                    const style = getRarityStyle(reward.rarity)
                    return (
                      <div 
                        key={index}
                        className="gacha-slot"
                        style={{ 
                          background: style.bg,
                          borderColor: style.border
                        }}
                      >
                        <span className="slot-icon">{reward.icon}</span>
                        <span className="slot-name">{reward.name}</span>
                      </div>
                    )
                  })}
                </div>
                
                {/* Selection Line */}
                <div className="selection-line" />
              </div>

              {/* Decorative Lights */}
              <div className="gacha-lights">
                {[...Array(8)].map((_, i) => (
                  <div 
                    key={i}
                    className={`light ${isSpinning ? 'active' : ''}`}
                    style={{ 
                      '--delay': `${i * 0.1}s`,
                      background: isSpinning ? `hsl(${i * 45}, 100%, 60%)` : '#cbd5e1'
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Spin Button */}
            <button
              className="spin-button"
              onClick={spin}
              disabled={!canDraw || isSpinning}
            >
              {isSpinning ? (
                <>
                  <Sparkles size={20} className="spinning" />
                  <span>Spinning...</span>
                </>
              ) : canDraw ? (
                <>
                  <Gift size={20} />
                  <span>Spin Now!</span>
                </>
              ) : (
                <>
                  <Zap size={20} />
                  <span>Come Back Tomorrow</span>
                </>
              )}
            </button>

            {/* Rewards Preview */}
            <div className="rewards-preview">
              <h4>Possible Rewards</h4>
              <div className="rarity-showcase">
                {Object.entries(RARITY_CONFIG).map(([rarity, style]) => (
                  <div 
                    key={rarity}
                    className="rarity-item"
                    style={{ background: style.bg, borderColor: style.border }}
                  >
                    <Star size={14} style={{ color: style.color }} />
                    <span style={{ color: style.color }}>{rarity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResult && selectedReward && (
        <div className="result-overlay">
          <div className="result-modal">
            <div className="result-confetti" />
            
            <div 
              className="result-card"
              style={{ 
                background: getRarityStyle(selectedReward.rarity).bg,
                borderColor: getRarityStyle(selectedReward.rarity).border
              }}
            >
              <div className="result-icon">
                {selectedReward.icon}
              </div>
              
              <div className="result-rarity">
                {selectedReward.rarity.toUpperCase()}
              </div>
              
              <h3 className="result-name">{selectedReward.name}</h3>
              
              <button 
                className="claim-button"
                onClick={claimReward}
              >
                <Sparkles size={18} />
                <span>Claim Reward!</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DailyLuckyDraw
