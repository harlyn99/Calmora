import React, { useState } from 'react'
import { useGacha } from '../contexts/GachaContext'
import { Sparkles, Zap, Star, X } from 'lucide-react'
import Confetti from './Confetti'
import './GachaPull.css'

export const GachaPull = () => {
  const { 
    coins, 
    pull, 
    isPulling, 
    showResult, 
    lastPull, 
    setShowResult,
    GACHA_COST,
    RARITY_CONFIG
  } = useGacha()

  const [pullCount, setPullCount] = useState(1)
  const [showConfetti, setShowConfetti] = useState(false)

  const handlePull = () => {
    const result = pull(pullCount)
    if (result.success && !result.pending) {
      // Show confetti for rare+ items
      const hasRarePlus = result.results.some(r => ['rare', 'epic', 'legendary'].includes(r.rarity))
      if (hasRarePlus) {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 4000)
      }
    }
  }

  const handleClose = () => {
    setShowResult(false)
  }

  return (
    <>
      <Confetti active={showConfetti} />
      
      <div className="gacha-container">
        {/* Header */}
        <div className="gacha-header">
          <h2 className="gacha-title">
            <Sparkles size={24} color="#ffd700" />
            Mystery Gacha
            <Sparkles size={24} color="#ffd700" />
          </h2>
          <div className="gacha-coins">
            <Zap size={18} fill="#ffd700" color="#ffd700" />
            <span>{coins.toLocaleString()}</span>
          </div>
        </div>

        {/* Gacha Display */}
        <div className="gacha-display">
          <div className={`gacha-orb ${isPulling ? 'pulling' : ''}`}>
            <div className="orb-glow"></div>
            <div className="orb-core"></div>
            <div className="orb-ring ring-1"></div>
            <div className="orb-ring ring-2"></div>
            <div className="orb-ring ring-3"></div>
          </div>

          {isPulling && (
            <div className="pull-text">
              <span>Summoning...</span>
            </div>
          )}
        </div>

        {/* Pull Controls */}
        <div className="gacha-controls">
          <div className="pull-selector">
            <button 
              className={pullCount === 1 ? 'active' : ''}
              onClick={() => setPullCount(1)}
            >
              1x
            </button>
            <button 
              className={pullCount === 10 ? 'active' : ''}
              onClick={() => setPullCount(10)}
            >
              10x
            </button>
          </div>

          <button 
            className="pull-button"
            onClick={handlePull}
            disabled={isPulling || coins < GACHA_COST * pullCount}
          >
            <Sparkles size={20} />
            <span>
              Pull {pullCount}x ({GACHA_COST * pullCount} Coins)
            </span>
          </button>
        </div>

        {/* Pull Cost Info */}
        <div className="gacha-info">
          <div className="rarity-legend">
            <span className="legend-item legendary">★ Legendary 2%</span>
            <span className="legend-item epic">★ Epic 8%</span>
            <span className="legend-item rare">★ Rare 30%</span>
            <span className="legend-item common">★ Common 60%</span>
          </div>
        </div>

        {/* Result Modal */}
        {showResult && lastPull && (
          <div className="result-overlay" onClick={handleClose}>
            <div className="result-modal" onClick={e => e.stopPropagation()}>
              <button className="result-close" onClick={handleClose}>
                <X size={24} />
              </button>

              <h3 className="result-title">
                <Star size={24} fill="#ffd700" color="#ffd700" />
                Pull Results!
                <Star size={24} fill="#ffd700" color="#ffd700" />
              </h3>

              <div className="results-grid">
                {lastPull.map((item, index) => (
                  <div 
                    key={item.pullId} 
                    className={`result-card rarity-${item.rarity}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="card-rarity">
                      {[...Array(RARITY_CONFIG[item.rarity].stars)].map((_, i) => (
                        <Star key={i} size={12} fill="#ffd700" color="#ffd700" />
                      ))}
                    </div>
                    <div className="card-icon">{item.icon}</div>
                    <div className="card-name">{item.name}</div>
                    <div className="card-type">{item.type}</div>
                  </div>
                ))}
              </div>

              <button className="collect-button" onClick={handleClose}>
                Collect All
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default GachaPull
