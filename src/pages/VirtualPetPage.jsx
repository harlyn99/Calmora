import React, { useState, useEffect } from 'react'
import { Heart, Utensils, Gamepad2, Moon, Sparkles, Award, Gift, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './VirtualPetPage.css'

const PET_TYPES = [
  { id: 'bear', name: 'Beruang', emoji: '🐻' },
  { id: 'dog', name: 'Guguk', emoji: '🐶' },
  { id: 'elephant', name: 'Gajah', emoji: '🐘' }
]

const REWARDS = [
  { id: 1, name: 'Apel', cost: 50, icon: '🍎', happy: 10 },
  { id: 2, name: 'Cookie', cost: 75, icon: '🍪', happy: 20 },
  { id: 3, name: 'Balloon', cost: 100, icon: '🎈', happy: 25 },
  { id: 4, name: 'Crown', cost: 200, icon: '👑', happy: 50 }
]

export default function VirtualPetPage() {
  const navigate = useNavigate()
  
  const [pet, setPet] = useState({
    type: 'bear',
    name: 'Mochi',
    level: 1,
    xp: 0,
    xpToNext: 100,
    happiness: 80,
    hunger: 50,
    energy: 80,
    fun: 70,
    coins: 100,
    items: []
  })
  
  const [animation, setAnimation] = useState(null)
  const [message, setMessage] = useState('')
  const [showRewards, setShowRewards] = useState(false)
  const [showPetSelect, setShowPetSelect] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('virtualPet')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPet({ ...pet, ...parsed })
      } catch (e) {
        console.error('Failed to load pet:', e)
      }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('virtualPet', JSON.stringify(pet))
  }, [pet])

  useEffect(() => {
    const timer = setInterval(() => {
      setPet(p => ({
        ...p,
        hunger: Math.min(100, p.hunger + 1),
        energy: Math.max(0, p.energy - 0.5),
        fun: Math.max(0, p.fun - 2),
        happiness: Math.max(0, Math.min(100, p.happiness - 0.5))
      }))
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (pet.xp >= pet.xpToNext) {
      setPet(p => ({
        ...p,
        level: p.level + 1,
        xp: p.xp - p.xpToNext,
        xpToNext: Math.floor(p.xpToNext * 1.5),
        coins: p.coins + 50
      }))
      showMessage('🎉 Level Up! +50 coins!')
    }
  }, [pet.xp, pet.xpToNext])

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleAction = (action) => {
    const effects = {
      feed: { hunger: -30, happiness: 10, energy: -5, fun: 5, xp: 10, coins: 5 },
      play: { hunger: 10, happiness: 20, energy: -15, fun: 25, xp: 15, coins: 8 },
      rest: { hunger: 5, happiness: 5, energy: 30, fun: -10, xp: 5, coins: 2 },
      train: { hunger: 15, happiness: -5, energy: -20, fun: 10, xp: 25, coins: 10 }
    }

    const e = effects[action]
    
    if (pet.energy < 10 && action !== 'rest') {
      showMessage('Too tired! Rest first.')
      setAnimation('tired')
      setTimeout(() => setAnimation(null), 1000)
      return
    }

    setPet(p => ({
      ...p,
      hunger: Math.max(0, Math.min(100, p.hunger + e.hunger)),
      energy: Math.max(0, Math.min(100, p.energy + e.energy)),
      fun: Math.max(0, Math.min(100, p.fun + e.fun)),
      happiness: Math.max(0, Math.min(100, p.happiness + e.happiness)),
      xp: p.xp + e.xp,
      coins: p.coins + e.coins
    }))

    const anims = { feed: 'eat', play: 'happy', rest: 'sleep', train: 'train' }
    setAnimation(anims[action])
    setTimeout(() => setAnimation(null), 1500)

    const msgs = {
      feed: 'Yum! +5 coins 🍽️',
      play: 'Fun! +8 coins 🎾',
      rest: 'Rest! +2 coins 💤',
      train: 'Train! +10 coins 📚'
    }
    showMessage(msgs[action])
  }

  const buyReward = (reward) => {
    if (pet.coins >= reward.cost && !pet.items.includes(reward.id)) {
      setPet(p => ({
        ...p,
        coins: p.coins - reward.cost,
        items: [...p.items, reward.id],
        happiness: Math.min(100, p.happiness + reward.happy)
      }))
      showMessage(`🎁 Bought ${reward.name}!`)
    } else if (pet.coins < reward.cost) {
      showMessage('❌ Not enough coins!')
    } else {
      showMessage('❌ Already owned!')
    }
  }

  const changePet = (type) => {
    setPet(p => ({ ...p, type: type.id, name: type.name }))
    setShowPetSelect(false)
    showMessage(`Pet changed to ${type.name}!`)
  }

  const getMood = () => {
    if (pet.happiness >= 80) return { emoji: '😄', text: 'Happy', color: '#4ade80' }
    if (pet.happiness >= 60) return { emoji: '😊', text: 'Content', color: '#86efac' }
    if (pet.happiness >= 40) return { emoji: '😐', text: 'Okay', color: '#fbbf24' }
    if (pet.happiness >= 20) return { emoji: '😢', text: 'Sad', color: '#fb923c' }
    return { emoji: '😭', text: 'Depressed', color: '#f87171' }
  }

  const mood = getMood()

  const StatBar = ({ icon: Icon, value, color, label }) => (
    <div className="stat-bar">
      <div className="stat-header">
        <Icon size={16} />
        <span>{label}</span>
        <span>{Math.round(value)}%</span>
      </div>
      <div className="stat-track">
        <div className="stat-fill" style={{ width: `${value}%`, backgroundColor: color }} />
      </div>
    </div>
  )

  return (
    <div className="virtual-pet-page">
      <nav className="pet-top-nav">
        <div className="pet-nav-container">
          <button className="pet-nav-btn" onClick={() => navigate('/dashboard')}>
            <Home size={20} />
            <span>Home</span>
          </button>
          <h1>🐾 Virtual Pet</h1>
          <div className="pet-coins">
            <span>💰</span>
            <span>{pet.coins}</span>
          </div>
        </div>
      </nav>

      {message && <div className="message-toast">{message}</div>}

      <div className="pet-container">
        <div className={`pet-display ${animation || ''}`}>
          <div className="pet-avatar-3d">
            <div className={`pet-body pet-${pet.type}`}>
              {/* Ears */}
              <div className="pet-ears">
                <div className={`pet-ear left pet-ear-${pet.type}`}></div>
                <div className={`pet-ear right pet-ear-${pet.type}`}></div>
              </div>
              
              {/* Head */}
              <div className="pet-head">
                <div className="pet-face">
                  {/* Eyes - cute dot eyes */}
                  <div className="pet-eyes">
                    <div className={`pet-eye left ${animation === 'sleep' ? 'closed' : ''}`}></div>
                    <div className={`pet-eye right ${animation === 'sleep' ? 'closed' : ''}`}></div>
                  </div>
                  {/* Cheeks */}
                  <div className="pet-cheeks">
                    <div className="pet-cheek left"></div>
                    <div className="pet-cheek right"></div>
                  </div>
                  {/* Nose */}
                  <div className={`pet-nose pet-nose-${pet.type}`}></div>
                  {/* Mouth */}
                  <div className={`pet-mouth ${animation === 'eat' ? 'eating' : ''}`}></div>
                </div>
              </div>
              
              {/* Body */}
              <div className="pet-torso"></div>
              
              {/* Arms */}
              <div className="pet-arms">
                <div className="pet-arm left"></div>
                <div className={`pet-arm right ${animation === 'train' ? 'flexing' : ''}`}></div>
              </div>
              
              {/* Legs */}
              <div className="pet-legs">
                <div className={`pet-leg left ${animation === 'happy' ? 'waving' : ''}`}></div>
                <div className="pet-leg right"></div>
              </div>
              
              {/* Tail */}
              <div className={`pet-tail pet-tail-${pet.type} ${animation === 'happy' ? 'wagging' : ''}`}></div>
              
              {/* Trunk for elephant */}
              {pet.type === 'elephant' && (
                <div className="pet-trunk"></div>
              )}
            </div>
            
            {/* Sleep ZZZ */}
            {animation === 'sleep' && (
              <div className="sleep-zzz">
                <span className="zzz-1">Z</span>
                <span className="zzz-2">z</span>
                <span className="zzz-3">z</span>
              </div>
            )}
            {/* Food */}
            {animation === 'eat' && (
              <div className="eating-food"><span>🍖</span></div>
            )}
            {/* Hearts when happy */}
            {animation === 'happy' && (
              <div className="floating-hearts">
                <span>❤️</span>
                <span>💕</span>
              </div>
            )}
          </div>

          <div className="pet-info">
            <h2 className="pet-name">
              {pet.name}
              <button className="edit-name-btn" onClick={() => setShowPetSelect(true)}>🔄</button>
            </h2>
            <p className="pet-mood" style={{ color: mood.color }}>
              {mood.emoji} {mood.text}
            </p>
            <div className="pet-level">
              <Sparkles size={16} /> Level {pet.level}
              <div className="xp-bar">
                <div className="xp-fill" style={{ width: `${(pet.xp / pet.xpToNext) * 100}%` }} />
              </div>
              <small>{pet.xp}/{pet.xpToNext} XP</small>
            </div>
          </div>
        </div>

        <div className="quick-actions-row">
          <button className="quick-action-btn" onClick={() => setShowRewards(true)}>
            <Gift size={20} /><span>Rewards</span><small>{pet.items.length} items</small>
          </button>
          <button className="quick-action-btn" onClick={() => showMessage(`Level ${pet.level}, ${pet.items.length} items`)}>
            <Award size={20} /><span>Stats</span><small>View info</small>
          </button>
        </div>

        <div className="stats-grid">
          <StatBar icon={Heart} value={pet.happiness} color="#ff6b9d" label="Happiness" />
          <StatBar icon={Utensils} value={pet.hunger} color="#ffa726" label="Hunger" />
          <StatBar icon={Moon} value={pet.energy} color="#7e57c2" label="Energy" />
          <StatBar icon={Gamepad2} value={pet.fun} color="#26c6da" label="Fun" />
        </div>

        <div className="actions-grid">
          <button className="action-btn feed" onClick={() => handleAction('feed')} disabled={pet.hunger <= 10}>
            <Utensils size={24} /><span>Feed</span><small>+5 💰</small>
          </button>
          <button className="action-btn play" onClick={() => handleAction('play')} disabled={pet.energy < 10}>
            <Gamepad2 size={24} /><span>Play</span><small>+8 💰</small>
          </button>
          <button className="action-btn rest" onClick={() => handleAction('rest')} disabled={pet.energy >= 90}>
            <Moon size={24} /><span>Rest</span><small>+2 💰</small>
          </button>
          <button className="action-btn train" onClick={() => handleAction('train')} disabled={pet.energy < 20}>
            <Sparkles size={24} /><span>Train</span><small>+10 💰</small>
          </button>
        </div>

        <div className="stats-summary">
          <div className="stat-card"><h4>Level</h4><p>{pet.level}</p></div>
          <div className="stat-card"><h4>Coins</h4><p>{pet.coins}</p></div>
          <div className="stat-card"><h4>Items</h4><p>{pet.items.length}</p></div>
          <div className="stat-card"><h4>Mood</h4><p>{mood.emoji}</p></div>
        </div>
      </div>

      {showPetSelect && (
        <div className="modal-overlay" onClick={() => setShowPetSelect(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>Choose Your Pet</h3>
            <div className="pet-type-grid">
              {PET_TYPES.map(type => (
                <button key={type.id} className={`pet-type-card ${pet.type === type.id ? 'selected' : ''}`} onClick={() => changePet(type)}>
                  <div className="pet-type-preview">{type.emoji}</div>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowPetSelect(false)}>Close</button>
          </div>
        </div>
      )}

      {showRewards && (
        <div className="modal-overlay" onClick={() => setShowRewards(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>🎁 Reward Shop</h3>
            <p className="modal-subtitle">Your Coins: 💰 {pet.coins}</p>
            <div className="rewards-grid">
              {REWARDS.map(r => (
                <button key={r.id} className={`reward-card ${pet.items.includes(r.id) ? 'owned' : ''}`} onClick={() => buyReward(r)}>
                  <div className="reward-icon">{r.icon}</div>
                  <span className="reward-name">{r.name}</span>
                  <span className="reward-cost">💰 {r.cost}</span>
                  {pet.items.includes(r.id) && <span className="owned-badge">✓</span>}
                </button>
              ))}
            </div>
            <button className="close-btn" onClick={() => setShowRewards(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  )
}
