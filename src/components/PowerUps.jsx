import React, { useState, useEffect } from 'react'
import { useXP } from '../contexts/XPContext'
import { Zap, Clock, Shield, Star, Sparkles, Lock, Coins, Hourglass } from 'lucide-react'
import './PowerUps.css'

// ============================================
// POWER-UPS CONFIGURATION
// ============================================
const POWERUPS = [
  {
    id: 'xp_boost_2x',
    name: '2x XP Boost',
    description: 'Double XP for all activities',
    duration: 3600, // 1 hour in seconds
    cost: 100,
    icon: '⚡',
    color: '#f59e0b',
    effect: 'xp_multiplier',
    value: 2,
    rarity: 'rare'
  },
  {
    id: 'xp_boost_3x',
    name: '3x XP Boost',
    description: 'Triple XP for all activities',
    duration: 1800, // 30 minutes
    cost: 200,
    icon: '🔥',
    color: '#ef4444',
    effect: 'xp_multiplier',
    value: 3,
    rarity: 'epic'
  },
  {
    id: 'streak_freeze',
    name: 'Streak Freeze',
    description: 'Protect your streak for 1 day',
    duration: 86400, // 24 hours
    cost: 50,
    icon: '🧊',
    color: '#3b82f6',
    effect: 'streak_protection',
    value: 1,
    rarity: 'common'
  },
  {
    id: 'coin_boost',
    name: 'Coin Booster',
    description: 'Earn 50% more coins',
    duration: 3600,
    cost: 80,
    icon: '🪙',
    color: '#22c55e',
    effect: 'coin_multiplier',
    value: 1.5,
    rarity: 'uncommon'
  },
  {
    id: 'focus_time',
    name: 'Focus Time',
    description: 'Extra 5 minutes to focus timer',
    duration: 0, // Instant effect
    cost: 30,
    icon: '⏰',
    color: 'var(--accent-1)',
    effect: 'focus_extension',
    value: 300, // 5 minutes in seconds
    rarity: 'common'
  },
  {
    id: 'energy_restore',
    name: 'Energy Restore',
    description: 'Instant energy boost',
    duration: 0,
    cost: 40,
    icon: '💪',
    color: '#ec4899',
    effect: 'energy_restore',
    value: 50,
    rarity: 'common'
  },
  {
    id: 'lucky_charm',
    name: 'Lucky Charm',
    description: 'Increase lucky draw rewards',
    duration: 7200,
    cost: 60,
    icon: '🍀',
    color: '#10b981',
    effect: 'luck_boost',
    value: 1.5,
    rarity: 'uncommon'
  },
  {
    id: 'instant_complete',
    name: 'Instant Complete',
    description: 'Auto-complete one task',
    duration: 0,
    cost: 75,
    icon: '✨',
    color: '#f43f5e',
    effect: 'instant_task',
    value: 1,
    rarity: 'rare'
  }
]

// ============================================
// RARITY CONFIG
// ============================================
const RARITY_CONFIG = {
  common: { 
    bg: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
    border: '#cbd5e1',
    glow: 'rgba(203, 213, 225, 0.3)'
  },
  uncommon: { 
    bg: 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)',
    border: '#86efac',
    glow: 'rgba(134, 239, 172, 0.3)'
  },
  rare: { 
    bg: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)',
    border: '#93c5fd',
    glow: 'rgba(147, 197, 253, 0.3)'
  },
  epic: { 
    bg: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
    border: '#d8b4fe',
    glow: 'rgba(216, 180, 254, 0.3)'
  }
}

export const PowerUps = ({ coins, onPurchase, onActivate }) => {
  const { addXP } = useXP()
  const [activePowerUps, setActivePowerUps] = useState([])
  const [inventory, setInventory] = useState([])
  const [showConfirm, setShowConfirm] = useState(null)

  // Load active power-ups and inventory
  useEffect(() => {
    const savedActive = localStorage.getItem('activePowerUps')
    const savedInventory = localStorage.getItem('powerUpInventory')
    
    if (savedActive) {
      const parsed = JSON.parse(savedActive)
      // Filter out expired power-ups
      const now = Date.now()
      const valid = parsed.filter(p => p.endTime > now)
      setActivePowerUps(valid)
      localStorage.setItem('activePowerUps', JSON.stringify(valid))
    }
    
    if (savedInventory) {
      setInventory(JSON.parse(savedInventory))
    }
  }, [])

  // Save inventory
  useEffect(() => {
    localStorage.setItem('powerUpInventory', JSON.stringify(inventory))
  }, [inventory])

  // Save active power-ups
  useEffect(() => {
    localStorage.setItem('activePowerUps', JSON.stringify(activePowerUps))
    
    // Notify parent of active power-ups
    if (onActivate) {
      const effects = {}
      activePowerUps.forEach(p => {
        const powerUp = POWERUPS.find(pu => pu.id === p.id)
        if (powerUp) {
          effects[powerUp.effect] = { value: powerUp.value, endTime: p.endTime }
        }
      })
      onActivate(effects)
    }
  }, [activePowerUps])

  const purchasePowerUp = (powerUp) => {
    if (coins >= powerUp.cost) {
      setShowConfirm(powerUp)
    }
  }

  const confirmPurchase = () => {
    if (!showConfirm) return
    
    const powerUp = showConfirm
    if (coins >= powerUp.cost) {
      // Deduct coins
      onPurchase(powerUp.cost)
      
      // Add to inventory or activate immediately
      if (powerUp.duration > 0) {
        // Timed power-up - activate immediately
        const endTime = Date.now() + (powerUp.duration * 1000)
        setActivePowerUps(prev => [...prev, { id: powerUp.id, endTime }])
        addXP(10, `Activated ${powerUp.name}`)
      } else {
        // One-time use - add to inventory
        setInventory(prev => [...prev, powerUp.id])
      }
      
      setShowConfirm(null)
    }
  }

  const activateFromInventory = (powerUpId, index) => {
    const powerUp = POWERUPS.find(p => p.id === powerUpId)
    if (!powerUp) return
    
    if (powerUp.duration > 0) {
      const endTime = Date.now() + (powerUp.duration * 1000)
      setActivePowerUps(prev => [...prev, { id: powerUpId, endTime }])
      addXP(10, `Activated ${powerUp.name}`)
    }
    
    // Remove from inventory
    setInventory(prev => prev.filter((_, i) => i !== index))
  }

  const getTimeRemaining = (endTime) => {
    const now = Date.now()
    const diff = Math.max(0, endTime - now)
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    return { hours, minutes, seconds, total: diff }
  }

  const [timeRemaining, setTimeRemaining] = useState({})

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = {}
      activePowerUps.forEach(p => {
        remaining[p.id] = getTimeRemaining(p.endTime)
      })
      setTimeRemaining(remaining)
    }, 1000)
    
    return () => clearInterval(timer)
  }, [activePowerUps])

  const getRarityStyle = (rarity) => RARITY_CONFIG[rarity] || RARITY_CONFIG.common

  return (
    <div className="power-ups-container">
      {/* Active Power-Ups */}
      {activePowerUps.length > 0 && (
        <div className="active-powerups">
          <h3>
            <Sparkles size={20} />
            Active Power-Ups
          </h3>
          <div className="active-grid">
            {activePowerUps.map((powerUp) => {
              const config = POWERUPS.find(p => p.id === powerUp.id)
              const remaining = timeRemaining[powerUp.id]
              const style = getRarityStyle(config?.rarity)
              
              return (
                <div 
                  key={powerUp.id} 
                  className="active-powerup"
                  style={{ background: style.bg, borderColor: style.border }}
                >
                  <span className="active-icon">{config?.icon}</span>
                  <div className="active-info">
                    <span className="active-name">{config?.name}</span>
                    {remaining && (
                      <span className="active-timer">
                        <Clock size={12} />
                        {remaining.hours > 0 && `${remaining.hours}h `}
                        {remaining.minutes}m {remaining.seconds}s
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Inventory */}
      {inventory.length > 0 && (
        <div className="powerups-inventory">
          <h3>
            <Lock size={20} />
            Inventory
          </h3>
          <div className="inventory-grid">
            {inventory.map((powerUpId, index) => {
              const powerUp = POWERUPS.find(p => p.id === powerUpId)
              const style = getRarityStyle(powerUp?.rarity)
              
              return (
                <div 
                  key={`${powerUpId}-${index}`}
                  className="inventory-item"
                  style={{ background: style.bg, borderColor: style.border }}
                  onClick={() => activateFromInventory(powerUpId, index)}
                >
                  <span className="inventory-icon">{powerUp?.icon}</span>
                  <span className="inventory-name">{powerUp?.name}</span>
                  <span className="activate-hint">Click to activate</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Shop */}
      <div className="powerups-shop">
        <h3>
          <Coins size={20} />
          Power-Up Shop
          <span className="coins-display">{coins} 🪙</span>
        </h3>
        <div className="shop-grid">
          {POWERUPS.map((powerUp) => {
            const style = getRarityStyle(powerUp.rarity)
            const canAfford = coins >= powerUp.cost
            const inInventory = inventory.filter(id => id === powerUp.id).length
            
            return (
              <div 
                key={powerUp.id}
                className="shop-item"
                style={{ 
                  background: style.bg, 
                  borderColor: style.border,
                  opacity: canAfford ? 1 : 0.6
                }}
                onClick={() => canAfford && purchasePowerUp(powerUp)}
              >
                <div className="shop-item-header">
                  <span className="shop-icon">{powerUp.icon}</span>
                  <span 
                    className="shop-rarity"
                    style={{ color: powerUp.color }}
                  >
                    {powerUp.rarity}
                  </span>
                </div>
                
                <h4 className="shop-name">{powerUp.name}</h4>
                <p className="shop-description">{powerUp.description}</p>
                
                {powerUp.duration > 0 && (
                  <div className="shop-duration">
                    <Hourglass size={12} />
                    {powerUp.duration >= 3600 ? `${powerUp.duration / 3600}h` : `${powerUp.duration / 60}m`}
                  </div>
                )}
                
                <div className="shop-footer">
                  <button 
                    className={`purchase-btn ${!canAfford ? 'disabled' : ''}`}
                    disabled={!canAfford}
                  >
                    <Coins size={14} />
                    {powerUp.cost}
                  </button>
                  {inInventory > 0 && (
                    <span className="in-inventory">x{inInventory}</span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Purchase Confirmation Modal */}
      {showConfirm && (
        <div 
          className="purchase-modal-overlay"
          onClick={() => setShowConfirm(null)}
        >
          <div 
            className="purchase-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: showConfirm.color }}
          >
            <div className="purchase-icon">{showConfirm.icon}</div>
            <h3>Purchase {showConfirm.name}?</h3>
            <p>{showConfirm.description}</p>
            
            <div className="purchase-details">
              <div className="detail-row">
                <span>Cost:</span>
                <span className="cost"><Coins size={14} /> {showConfirm.cost}</span>
              </div>
              {showConfirm.duration > 0 && (
                <div className="detail-row">
                  <span>Duration:</span>
                  <span><Hourglass size={14} /> {showConfirm.duration >= 3600 ? `${showConfirm.duration / 3600}h` : `${showConfirm.duration / 60}m`}</span>
                </div>
              )}
              <div className="detail-row">
                <span>Effect:</span>
                <span style={{ color: showConfirm.color }}>
                  {showConfirm.effect.replace('_', ' ').toUpperCase()} +{showConfirm.value}
                </span>
              </div>
            </div>
            
            <div className="purchase-actions">
              <button 
                className="cancel-btn"
                onClick={() => setShowConfirm(null)}
              >
                Cancel
              </button>
              <button 
                className="confirm-btn"
                onClick={confirmPurchase}
                style={{ background: showConfirm.color }}
              >
                <Zap size={16} />
                Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PowerUps
