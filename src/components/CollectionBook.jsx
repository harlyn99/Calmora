import React, { useState } from 'react'
import { useGacha } from '../contexts/GachaContext'
import { Book, Star, Filter } from 'lucide-react'
import './CollectionBook.css'

export const CollectionBook = () => {
  const { inventory, GACHA_ITEMS, RARITY_CONFIG } = useGacha()
  const [filterRarity, setFilterRarity] = useState('all')
  const [filterType, setFilterType] = useState('all')

  // Get unique items owned
  const ownedItems = inventory.reduce((acc, item) => {
    if (!acc[item.id]) {
      acc[item.id] = { ...item, count: 0 }
    }
    acc[item.id].count++
    return acc
  }, {})

  // Get all items grouped by rarity
  const allItems = Object.entries(GACHA_ITEMS).flatMap(([rarity, items]) =>
    items.map(item => ({
      ...item,
      owned: ownedItems[item.id] ? ownedItems[item.id].count : 0
    }))
  )

  // Filter items
  const filteredItems = allItems.filter(item => {
    if (filterRarity !== 'all' && item.rarity !== filterRarity) return false
    if (filterType !== 'all' && item.type !== filterType) return false
    return true
  })

  // Collection stats
  const totalOwned = Object.keys(ownedItems).length
  const totalItems = allItems.length
  const completionRate = ((totalOwned / totalItems) * 100).toFixed(1)

  return (
    <div className="collection-container">
      {/* Header */}
      <div className="collection-header">
        <div className="collection-title">
          <Book size={28} color="#6b9f7f" />
          <h2>Collection Book</h2>
        </div>
        <div className="collection-stats">
          <div className="stat">
            <span className="stat-value">{totalOwned}/{totalItems}</span>
            <span className="stat-label">Items</span>
          </div>
          <div className="stat">
            <span className="stat-value">{completionRate}%</span>
            <span className="stat-label">Complete</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="collection-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="collection-filters">
        <div className="filter-group">
          <Filter size={16} />
          <span>Rarity:</span>
          <select value={filterRarity} onChange={e => setFilterRarity(e.target.value)}>
            <option value="all">All</option>
            <option value="legendary">Legendary</option>
            <option value="epic">Epic</option>
            <option value="rare">Rare</option>
            <option value="common">Common</option>
          </select>
        </div>

        <div className="filter-group">
          <Filter size={16} />
          <span>Type:</span>
          <select value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="weapon">Weapon</option>
            <option value="armor">Armor</option>
            <option value="accessory">Accessory</option>
            <option value="consumable">Consumable</option>
          </select>
        </div>
      </div>

      {/* Items Grid */}
      <div className="collection-grid">
        {filteredItems.map(item => (
          <div 
            key={item.id}
            className={`collection-card rarity-${item.rarity} ${item.owned > 0 ? 'owned' : ''}`}
          >
            <div className="card-header">
              <div className="card-rarity">
                {[...Array(RARITY_CONFIG[item.rarity].stars)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={12} 
                    fill={item.owned > 0 ? '#ffd700' : '#444'} 
                    color={item.owned > 0 ? '#ffd700' : '#666'} 
                  />
                ))}
              </div>
              {item.owned > 0 && (
                <span className="card-count">x{item.owned}</span>
              )}
            </div>

            <div className="card-icon">{item.icon}</div>
            
            <div className="card-info">
              <div className="card-name">{item.name}</div>
              <div className="card-type">{item.type}</div>
            </div>

            {item.owned === 0 && (
              <div className="card-locked">
                <span>🔒 Not Owned</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="collection-empty">
          <p>No items found with current filters</p>
        </div>
      )}
    </div>
  )
}

export default CollectionBook
