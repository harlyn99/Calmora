import React, { useState, useEffect } from 'react'
import { X, ShoppingBag, Coins, Zap, Gift, Sparkles, Check, AlertCircle } from 'lucide-react'
import { useIconTheme } from '../contexts/IconThemeContext'
import { 
  SHOP_ITEMS, 
  SHOP_CATEGORIES, 
  getAllItems, 
  getItemsByCategory, 
  getItemById,
  pullGacha 
} from '../data/shopConfig'
import './Shop.css'

export const Shop = ({ onClose }) => {
  const { getIconColor } = useIconTheme()
  const [selectedCategory, setSelectedCategory] = useState(SHOP_CATEGORIES.ALL)
  const [coins, setCoins] = useState(() => parseInt(localStorage.getItem('petCoins') || '150'))
  const [inventory, setInventory] = useState(() => JSON.parse(localStorage.getItem('shopInventory') || '[]'))
  const [activeEffects, setActiveEffects] = useState(() => JSON.parse(localStorage.getItem('activeEffects') || '{}'))
  const [showConfirm, setShowConfirm] = useState(null)
  const [showGachaResult, setShowGachaResult] = useState(null)
  const [purchaseSuccess, setPurchaseSuccess] = useState(null)

  // Sync coins from localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setCoins(parseInt(localStorage.getItem('petCoins') || '150'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  const categories = [
    { id: SHOP_CATEGORIES.ALL, name: 'All', icon: '🏪' },
    { id: SHOP_CATEGORIES.PET_FOOD, name: 'Pet Food', icon: '🍖' },
    { id: SHOP_CATEGORIES.PET_ACCESSORIES, name: 'Accessories', icon: '🎀' },
    { id: SHOP_CATEGORIES.POWERUPS, name: 'Power-ups', icon: '⚡' },
    { id: SHOP_CATEGORIES.GACHA, name: 'Gacha', icon: '🎰' },
    { id: SHOP_CATEGORIES.THEMES, name: 'Themes', icon: '🎨' }
  ]

  const filteredItems = selectedCategory === SHOP_CATEGORIES.ALL
    ? getAllItems()
    : getItemsByCategory(selectedCategory)

  const handlePurchase = (item) => {
    if (coins >= item.price) {
      setShowConfirm(item)
    }
  }

  const confirmPurchase = () => {
    if (!showConfirm) return

    const item = showConfirm
    const newCoins = coins - item.price

    // Update coins
    setCoins(newCoins)
    localStorage.setItem('petCoins', newCoins.toString())

    // Add to inventory or activate effect
    if (item.type === 'consumable' && item.effect) {
      // Activate effect immediately
      activateEffect(item)
    } else if (item.type === 'gacha') {
      // Do gacha pull
      const results = pullGacha(item.gachaType)
      addItemsToInventory(results)
      setShowGachaResult(results)
    } else {
      // Add permanent item to inventory
      addItemToInventory(item)
    }

    // Show success message
    setPurchaseSuccess(item)
    setTimeout(() => setPurchaseSuccess(null), 2000)

    setShowConfirm(null)
  }

  const activateEffect = (item) => {
    const effect = {
      ...item.effect,
      itemId: item.id,
      expiresAt: Date.now() + (item.duration || 0)
    }

    const newEffects = { ...activeEffects, [item.id]: effect }
    setActiveEffects(newEffects)
    localStorage.setItem('activeEffects', JSON.stringify(newEffects))

    // Also apply to pet stats if applicable
    if (item.effect.hunger || item.effect.happiness || item.effect.energy) {
      const pet = JSON.parse(localStorage.getItem('virtualPet') || '{}')
      const updatedPet = {
        ...pet,
        hunger: Math.min(100, (pet.hunger || 100) + (item.effect.hunger || 0)),
        happiness: Math.min(100, (pet.happiness || 100) + (item.effect.happiness || 0)),
        energy: Math.min(100, (pet.energy || 100) + (item.effect.energy || 0))
      }
      localStorage.setItem('virtualPet', JSON.stringify(updatedPet))
    }
  }

  const addItemToInventory = (item) => {
    const newItem = {
      ...item,
      instanceId: `${item.id}-${Date.now()}`
    }
    const newInventory = [...inventory, newItem]
    setInventory(newInventory)
    localStorage.setItem('shopInventory', JSON.stringify(newInventory))
  }

  const addItemsToInventory = (items) => {
    const newInventory = [...inventory, ...items]
    setInventory(newInventory)
    localStorage.setItem('shopInventory', JSON.stringify(newInventory))

    // Apply coin rewards immediately
    items.forEach(item => {
      if (item.effect?.coins) {
        const newCoins = coins + item.effect.coins
        setCoins(newCoins)
        localStorage.setItem('petCoins', newCoins.toString())
      }
    })
  }

  const canAfford = (price) => coins >= price

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'legendary': return '#FFD700'
      case 'rare': return '#BA55D3'
      default: return '#9CA3AF'
    }
  }

  return (
    <div className="shop-overlay" onClick={onClose}>
      <div className="shop-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="shop-header">
          <div className="shop-title-section">
            <ShoppingBag size={28} style={{ color: getIconColor('primary') }} />
            <h2>Shop</h2>
          </div>
          
          <div className="shop-header-right">
            <div className="coin-display-shop">
              <Coins size={20} style={{ color: '#FFD700' }} />
              <span>{coins}</span>
            </div>
            <button className="shop-close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="shop-categories">
          {categories.map(cat => (
            <button
              key={cat.id}
              className={`shop-category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <span className="category-icon">{cat.icon}</span>
              <span className="category-name">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Items Grid */}
        <div className="shop-items-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="shop-item-card">
              <div 
                className="shop-item-icon"
                style={{ background: `linear-gradient(135deg, ${item.color}, ${item.color}99)` }}
              >
                <span className="item-icon-emoji">{item.icon}</span>
              </div>
              
              <div className="shop-item-info">
                <h3 className="shop-item-name">{item.name}</h3>
                <p className="shop-item-description">{item.description}</p>
                
                {item.type === 'consumable' && item.duration && (
                  <div className="item-duration">
                    <Zap size={12} />
                    <span>{item.duration / 60000} min</span>
                  </div>
                )}
              </div>

              <div className="shop-item-footer">
                <div className="item-price">
                  <Coins size={16} style={{ color: '#FFD700' }} />
                  <span>{item.price}</span>
                </div>
                
                <button
                  className={`shop-buy-btn ${canAfford(item.price) ? '' : 'disabled'}`}
                  onClick={() => handlePurchase(item)}
                  disabled={!canAfford(item.price)}
                >
                  Buy
                </button>
              </div>

              {inventory.some(i => i.id === item.id && item.type === 'permanent') && (
                <div className="owned-badge">
                  <Check size={14} />
                  <span>Owned</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Purchase Confirmation Modal */}
        {showConfirm && (
          <div className="confirm-modal-overlay" onClick={() => setShowConfirm(null)}>
            <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
              <div className="confirm-icon">
                <ShoppingBag size={48} style={{ color: getIconColor('primary') }} />
              </div>
              
              <h3>Confirm Purchase</h3>
              <p>Buy <strong>{showConfirm.name}</strong>?</p>
              
              <div className="confirm-price">
                <Coins size={20} style={{ color: '#FFD700' }} />
                <span>{showConfirm.price} coins</span>
              </div>

              <div className="confirm-balance">
                Your balance: <strong>{coins}</strong> coins
              </div>

              <div className="confirm-actions">
                <button 
                  className="confirm-cancel"
                  onClick={() => setShowConfirm(null)}
                >
                  Cancel
                </button>
                <button 
                  className="confirm-confirm"
                  onClick={confirmPurchase}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Gacha Results Modal */}
        {showGachaResult && (
          <div className="gacha-modal-overlay" onClick={() => setShowGachaResult(null)}>
            <div className="gacha-modal" onClick={(e) => e.stopPropagation()}>
              <div className="gacha-header">
                <Gift size={32} style={{ color: getIconColor('accent') }} />
                <h2>Gacha Results!</h2>
                <Sparkles size={24} className="gacha-sparkle" />
              </div>

              <div className="gacha-results">
                {showGachaResult.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="gacha-item"
                    style={{ borderColor: getRarityColor(item.rarity) }}
                  >
                    <span className="gacha-item-icon">{item.icon}</span>
                    <span className="gacha-item-name">{item.name}</span>
                    <span 
                      className="gacha-rarity"
                      style={{ color: getRarityColor(item.rarity) }}
                    >
                      {item.rarity}
                    </span>
                  </div>
                ))}
              </div>

              <button 
                className="gacha-close-btn"
                onClick={() => setShowGachaResult(null)}
              >
                Awesome!
              </button>
            </div>
          </div>
        )}

        {/* Purchase Success Toast */}
        {purchaseSuccess && (
          <div className="purchase-success-toast">
            <Check size={24} style={{ color: '#4CAF50' }} />
            <span>Purchased {purchaseSuccess.name}!</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default Shop
