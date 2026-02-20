import React, { useState, useEffect, useRef } from 'react'
import { Heart, Utensils, Moon, Sparkles, Home, ShoppingBag, X } from 'lucide-react'
import './CuteVirtualPet.css'

const PET_TYPES = [
  { id: 'bunny', name: 'Bunny', color: '#FFE4E1', earColor: '#FFB6C1', blushColor: '#FFB6C1' },
  { id: 'cat', name: 'Cat', color: '#E8D5C4', earColor: '#D4A574', blushColor: '#FFB6C1' },
  { id: 'bear', name: 'Bear', color: '#D4C4B0', earColor: '#A08060', blushColor: '#FFB6C1' },
  { id: 'elephant', name: 'Elephant', color: '#E8E8E8', earColor: '#C0C0C0', blushColor: '#FFB6C1' },
  { id: 'dog', name: 'Dog', color: '#F5DEB3', earColor: '#DEB887', blushColor: '#FFB6C1' }
]

const FOODS = [
  { id: 'apple', name: 'Apple', cost: 10, icon: '🍎', happiness: 15, fill: 20 },
  { id: 'carrot', name: 'Carrot', cost: 12, icon: '🥕', happiness: 12, fill: 18 },
  { id: 'cookie', name: 'Cookie', cost: 15, icon: '🍪', happiness: 20, fill: 15 },
  { id: 'fish', name: 'Fish', cost: 20, icon: '🐟', happiness: 25, fill: 25 },
  { id: 'milk', name: 'Milk', cost: 18, icon: '🥛', happiness: 18, fill: 20 }
]

const ROOM_THEMES = [
  { id: 'pastel', name: 'Pastel', bg: 'linear-gradient(180deg, #FFE5E5 0%, #FFE5F0 50%, #E5F0FF 100%)', cost: 0 },
  { id: 'sunset', name: 'Sunset', bg: 'linear-gradient(180deg, #FFE4CC 0%, #FFD4E5 50%, #F0E5FF 100%)', cost: 100 },
  { id: 'ocean', name: 'Ocean', bg: 'linear-gradient(180deg, #E5F5FF 0%, #E5FFF5 50%, #FFF5E5 100%)', cost: 100 },
  { id: 'forest', name: 'Forest', bg: 'linear-gradient(180deg, #E5FFE5 0%, #F0FFE5 50%, #FFF5E5 100%)', cost: 100 },
  { id: 'lavender', name: 'Lavender', bg: 'linear-gradient(180deg, #F0E5FF 0%, #FFE5F5 50%, #E5F0FF 100%)', cost: 100 }
]

const FURNITURE = [
  { id: 'bed', name: 'Cozy Bed', icon: '🛏️', cost: 50, type: 'bed' },
  { id: 'plant', name: 'Plant', icon: '🪴', cost: 30, type: 'decoration' },
  { id: 'lamp', name: 'Lamp', icon: '💡', cost: 25, type: 'decoration' },
  { id: 'rug', name: 'Rug', icon: '🧶', cost: 35, type: 'decoration' },
  { id: 'bookshelf', name: 'Books', icon: '📚', cost: 40, type: 'decoration' },
  { id: 'toy', name: 'Toy', icon: '🧸', cost: 20, type: 'decoration' }
]

export default function CuteVirtualPet() {
  const [pet, setPet] = useState({
    type: 'bunny',
    name: 'Mochi',
    level: 1,
    coins: 100,
    happiness: 80,
    hunger: 30,
    energy: 80,
    isSleeping: false,
    roomTheme: 'pastel',
    furniture: [],
    foods: []
  })

  const [showShop, setShowShop] = useState(false)
  const [shopTab, setShopTab] = useState('food')
  const [showRoomEdit, setShowRoomEdit] = useState(false)
  const [showPetSelect, setShowPetSelect] = useState(false)
  const [animation, setAnimation] = useState(null)
  const [message, setMessage] = useState('')
  const [eatingApple, setEatingApple] = useState(false)
  const [appleSize, setAppleSize] = useState(1)

  // Load/Save
  useEffect(() => {
    const saved = localStorage.getItem('cutePet')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setPet({ ...pet, ...parsed })
      } catch (e) { console.error(e) }
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cutePet', JSON.stringify(pet))
  }, [pet])

  // Decay
  useEffect(() => {
    const timer = setInterval(() => {
      setPet(p => ({
        ...p,
        hunger: Math.min(100, p.hunger + 0.5),
        energy: p.isSleeping ? Math.min(100, p.energy + 1) : Math.max(0, p.energy - 0.3),
        happiness: Math.max(0, p.happiness - 0.2)
      }))
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  // Auto wake
  useEffect(() => {
    if (pet.isSleeping && pet.energy >= 100) {
      setPet(p => ({ ...p, isSleeping: false }))
      showMessage('☀️ Good morning!')
    }
  }, [pet.energy, pet.isSleeping])

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2000)
  }

  const createParticles = (type) => {
    const container = document.querySelector('.particles-container')
    if (!container) return
    for (let i = 0; i < 8; i++) {
      const particle = document.createElement('div')
      particle.className = 'particle'
      particle.textContent = type === 'heart' ? '❤️' : type === 'sparkle' ? '✨' : '💖'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.top = Math.random() * 100 + '%'
      container.appendChild(particle)
      setTimeout(() => particle.remove(), 1500)
    }
  }

  const feedPet = () => {
    if (pet.isSleeping) {
      showMessage('💤 Sleeping...')
      return
    }
    if (pet.hunger <= 10) {
      showMessage('😋 Not hungry!')
      return
    }

    setAnimation('eating')
    
    // Show apple animation
    setEatingApple(true)
    setAppleSize(1)
    
    // Animate apple decreasing
    let size = 1
    const eatInterval = setInterval(() => {
      size -= 0.1
      setAppleSize(size)
      if (size <= 0.2) {
        clearInterval(eatInterval)
        setTimeout(() => {
          setEatingApple(false)
          setPet(p => ({
            ...p,
            hunger: Math.max(0, p.hunger - 25),
            happiness: Math.min(100, p.happiness + 15),
            coins: p.coins + 5
          }))
          setAnimation('happy')
          createParticles('heart')
          showMessage('😋 Yummy! +5 coins')
          setTimeout(() => setAnimation(null), 1500)
        }, 500)
      }
    }, 200)
  }

  const toggleSleep = () => {
    setPet(p => ({ ...p, isSleeping: !p.isSleeping }))
    showMessage(pet.isSleeping ? '☀️ Wake up!' : '🌙 Good night!')
    setAnimation(pet.isSleeping ? 'wake' : 'sleep')
    setTimeout(() => setAnimation(null), 1000)
  }

  const playWithPet = () => {
    if (pet.isSleeping) {
      showMessage('💤 Too sleepy!')
      return
    }
    if (pet.energy < 20) {
      showMessage('😴 Too tired!')
      return
    }

    setAnimation('playing')
    setPet(p => ({
      ...p,
      happiness: Math.min(100, p.happiness + 20),
      energy: Math.max(0, p.energy - 15),
      hunger: Math.min(100, p.hunger + 10),
      coins: p.coins + 8
    }))
    createParticles('sparkle')
    showMessage('🎉 Fun! +8 coins')
    setTimeout(() => setAnimation(null), 1500)
  }

  const buyFood = (food) => {
    if (pet.coins >= food.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - food.cost,
        foods: [...p.foods, food]
      }))
      showMessage(`🛒 Bought ${food.name}!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const buyRoomTheme = (theme) => {
    if (pet.coins >= theme.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - theme.cost,
        roomTheme: theme.id
      }))
      showMessage(`🏠 Room: ${theme.name}!`)
      createParticles('sparkle')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const buyFurniture = (item) => {
    if (!pet.furniture.find(f => f.id === item.id) && pet.coins >= item.cost) {
      setPet(p => ({
        ...p,
        coins: p.coins - item.cost,
        furniture: [...p.furniture, item]
      }))
      showMessage(`🛒 Bought ${item.name}!`)
      createParticles('sparkle')
    } else if (pet.furniture.find(f => f.id === item.id)) {
      showMessage('✅ Already owned!')
    } else {
      showMessage('❌ Not enough coins!')
    }
  }

  const changePet = (type) => {
    setPet(p => ({ ...p, type: type.id, name: type.name }))
    setShowPetSelect(false)
    showMessage(`✨ Meet ${type.name}!`)
    createParticles('sparkle')
  }

  const currentPet = PET_TYPES.find(p => p.id === pet.type)
  const currentRoom = ROOM_THEMES.find(r => r.id === pet.roomTheme)

  return (
    <div className="cute-virtual-pet-page">
      {/* Header Stats */}
      <div className="cute-pet-header">
        <div className="cute-pet-name-row">
          <button className="cute-pet-name-btn" onClick={() => setShowPetSelect(true)}>
            <span className="cute-pet-type-icon">{currentPet?.name}</span>
            <span className="cute-pet-display-name">{pet.name}</span>
          </button>
          <div className="cute-level-badge">Lv.{pet.level}</div>
        </div>
        <div className="cute-stats-row">
          <div className="cute-stat">
            <Heart size={14} fill="#FF6B8A" color="#FF6B8A" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill happiness" style={{ width: `${pet.happiness}%` }} />
            </div>
          </div>
          <div className="cute-stat">
            <Utensils size={14} fill="#FFB347" color="#FFB347" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill hunger" style={{ width: `${100 - pet.hunger}%` }} />
            </div>
          </div>
          <div className="cute-stat">
            <Moon size={14} fill="#B39DDB" color="#B39DDB" />
            <div className="cute-stat-bar">
              <div className="cute-stat-fill energy" style={{ width: `${pet.energy}%` }} />
            </div>
          </div>
          <div className="cute-coins">🪙 {pet.coins}</div>
        </div>
      </div>

      {/* Pet Room */}
      <div className="cute-pet-room" style={{ background: currentRoom?.bg }}>
        {/* Furniture */}
        <div className="cute-furniture-layer">
          {pet.furniture.map((item, idx) => (
            <div key={idx} className={`cute-furniture-item furniture-${item.type}`} style={{
              left: `${20 + (idx % 3) * 35}%`,
              top: `${60 + Math.floor(idx / 3) * 15}%`
            }}>
              {item.icon}
            </div>
          ))}
        </div>

        {/* Pet */}
        <div className={`cute-pet-container ${animation || ''} ${pet.isSleeping ? 'sleeping' : ''}`}>
          <div className="cute-pet" style={{ '--pet-color': currentPet?.color, '--pet-ear-color': currentPet?.earColor }}>
            {/* Body */}
            <div className="cute-pet-body">
              {/* Ears */}
              {pet.type === 'bunny' && (
                <>
                  <div className="cute-ear left" />
                  <div className="cute-ear right" />
                </>
              )}
              {pet.type === 'cat' && (
                <>
                  <div className="cute-ear-cat left" />
                  <div className="cute-ear-cat right" />
                </>
              )}
              {pet.type === 'bear' && (
                <>
                  <div className="cute-ear-bear left" />
                  <div className="cute-ear-bear right" />
                </>
              )}
              {pet.type === 'elephant' && (
                <>
                  <div className="cute-ear-elephant left" />
                  <div className="cute-ear-elephant right" />
                  <div className="cute-trunk" />
                </>
              )}
              {pet.type === 'dog' && (
                <>
                  <div className="cute-ear-dog left" />
                  <div className="cute-ear-dog right" />
                </>
              )}

              {/* Face */}
              <div className="cute-pet-face">
                {/* Eyes */}
                <div className="cute-eyes">
                  <div className={`cute-eye left ${pet.isSleeping ? 'closed' : ''}`} />
                  <div className={`cute-eye right ${pet.isSleeping ? 'closed' : ''}`} />
                </div>

                {/* Blush */}
                <div className="cute-blush" style={{ '--blush-color': currentPet?.blushColor }} />

                {/* Mouth */}
                <div className={`cute-mouth ${animation === 'eating' ? 'chewing' : ''}`} />
              </div>

              {/* Belly */}
              <div className="cute-belly" />

              {/* Arms */}
              <div className="cute-arm left" />
              <div className="cute-arm right" />

              {/* Feet */}
              <div className="cute-feet">
                <div className="cute-foot left" />
                <div className="cute-foot right" />
              </div>
            </div>

            {/* Apple for eating animation */}
            {eatingApple && (
              <div className="cute-eating-apple" style={{ transform: `scale(${appleSize})` }}>
                🍎
              </div>
            )}
          </div>

          {/* Sleep Zzz */}
          {pet.isSleeping && (
            <div className="cute-sleep-zzz">
              <span>💤</span>
            </div>
          )}
        </div>

        {/* Particles */}
        <div className="particles-container" />
      </div>

      {/* Action Buttons */}
      <div className="cute-action-buttons">
        <button className="cute-action-btn" onClick={feedPet} disabled={pet.isSleeping}>
          <Utensils size={20} />
          <span>Feed</span>
        </button>
        <button className="cute-action-btn" onClick={playWithPet} disabled={pet.isSleeping}>
          <Sparkles size={20} />
          <span>Play</span>
        </button>
        <button className="cute-action-btn" onClick={toggleSleep}>
          <Moon size={20} />
          <span>{pet.isSleeping ? 'Wake' : 'Sleep'}</span>
        </button>
        <button className="cute-action-btn" onClick={() => setShowRoomEdit(true)}>
          <Home size={20} />
          <span>Room</span>
        </button>
        <button className="cute-action-btn" onClick={() => setShowShop(true)}>
          <ShoppingBag size={20} />
          <span>Shop</span>
        </button>
      </div>

      {/* Message Toast */}
      {message && (
        <div className="cute-message-toast">
          {message}
        </div>
      )}

      {/* Shop Modal */}
      {showShop && (
        <div className="cute-modal-overlay" onClick={() => setShowShop(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>🛒 Shop</h3>
              <button className="cute-modal-close" onClick={() => setShowShop(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="cute-shop-tabs">
              <button className={`cute-shop-tab ${shopTab === 'food' ? 'active' : ''}`} onClick={() => setShopTab('food')}>
                🍎 Food
              </button>
              <button className={`cute-shop-tab ${shopTab === 'room' ? 'active' : ''}`} onClick={() => setShopTab('room')}>
                🏠 Room
              </button>
              <button className={`cute-shop-tab ${shopTab === 'furniture' ? 'active' : ''}`} onClick={() => setShopTab('furniture')}>
                🪑 Furniture
              </button>
            </div>

            <div className="cute-shop-content">
              {shopTab === 'food' && (
                <div className="cute-shop-grid">
                  {FOODS.map(food => (
                    <button key={food.id} className="cute-shop-item" onClick={() => buyFood(food)}>
                      <span className="cute-shop-item-icon">{food.icon}</span>
                      <span className="cute-shop-item-name">{food.name}</span>
                      <span className="cute-shop-item-cost">🪙 {food.cost}</span>
                    </button>
                  ))}
                </div>
              )}

              {shopTab === 'room' && (
                <div className="cute-shop-grid">
                  {ROOM_THEMES.map(theme => (
                    <button key={theme.id} className="cute-shop-item" onClick={() => buyRoomTheme(theme)}>
                      <div className="cute-room-preview" style={{ background: theme.bg }} />
                      <span className="cute-shop-item-name">{theme.name}</span>
                      <span className="cute-shop-item-cost">🪙 {theme.cost}</span>
                    </button>
                  ))}
                </div>
              )}

              {shopTab === 'furniture' && (
                <div className="cute-shop-grid">
                  {FURNITURE.map(item => (
                    <button key={item.id} className="cute-shop-item" onClick={() => buyFurniture(item)}>
                      <span className="cute-shop-item-icon">{item.icon}</span>
                      <span className="cute-shop-item-name">{item.name}</span>
                      <span className="cute-shop-item-cost">🪙 {item.cost}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Room Edit Modal */}
      {showRoomEdit && (
        <div className="cute-modal-overlay" onClick={() => setShowRoomEdit(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>🏠 Edit Room</h3>
              <button className="cute-modal-close" onClick={() => setShowRoomEdit(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="cute-room-themes">
              {ROOM_THEMES.map(theme => (
                <button
                  key={theme.id}
                  className={`cute-room-theme-btn ${pet.roomTheme === theme.id ? 'active' : ''}`}
                  onClick={() => {
                    buyRoomTheme(theme)
                    setShowRoomEdit(false)
                  }}
                  style={{ background: theme.bg }}
                >
                  {theme.name}
                </button>
              ))}
            </div>
            <div className="cute-furniture-list">
              <h4>Your Furniture</h4>
              <div className="cute-furniture-grid">
                {pet.furniture.length === 0 ? (
                  <p className="cute-no-furniture">No furniture yet. Visit the shop!</p>
                ) : (
                  pet.furniture.map((item, idx) => (
                    <div key={idx} className="cute-furniture-owned">
                      {item.icon} {item.name}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pet Select Modal */}
      {showPetSelect && (
        <div className="cute-modal-overlay" onClick={() => setShowPetSelect(false)}>
          <div className="cute-modal" onClick={e => e.stopPropagation()}>
            <div className="cute-modal-header">
              <h3>🐾 Choose Pet</h3>
              <button className="cute-modal-close" onClick={() => setShowPetSelect(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="cute-pet-select-grid">
              {PET_TYPES.map(type => (
                <button
                  key={type.id}
                  className={`cute-pet-select-btn ${pet.type === type.id ? 'active' : ''}`}
                  onClick={() => changePet(type)}
                  style={{ '--select-color': type.color }}
                >
                  <div className="cute-pet-select-preview" style={{ background: type.color }}>
                    <div className="cute-pet-select-face">
                      <div className="cute-select-eye left" />
                      <div className="cute-select-eye right" />
                      <div className="cute-select-mouth" />
                    </div>
                  </div>
                  <span>{type.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
