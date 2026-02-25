import React, { useState, useEffect } from 'react'
import { Backpack, Filter, X, Check, Sparkles } from 'lucide-react'
import { RarityColors, RarityLabels } from '../data/gachaItems'
import './Inventory.css'

const Inventory = ({ equippedItems, onEquip, onUnequip }) => {
  const [inventory, setInventory] = useState([])
  const [filterType, setFilterType] = useState('all')
  const [filterRarity, setFilterRarity] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const [showItemDetail, setShowItemDetail] = useState(false)

  // Load inventory
  useEffect(() => {
    const saved = localStorage.getItem('gachaInventory')
    if (saved) {
      const items = JSON.parse(saved)
      // Remove duplicates based on item id (keep latest)
      const uniqueItems = items.reduce((acc, item) => {
        const existingIndex = acc.findIndex(i => i.id === item.id)
        if (existingIndex >= 0) {
          acc[existingIndex] = item
        } else {
          acc.push(item)
        }
        return acc
      }, [])
      setInventory(uniqueItems)
    }
  }, [])

  // Get unique items
  const getUniqueItems = () => {
    const grouped = inventory.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = item
      }
      return acc
    }, {})
    return Object.values(grouped)
  }

  // Filter items
  const filteredItems = getUniqueItems().filter(item => {
    if (filterType !== 'all' && item.type !== filterType) return false
    if (filterRarity !== 'all' && item.rarity !== filterRarity) return false
    return true
  })

  // Check if item is equipped
  const isEquipped = (item) => {
    return equippedItems?.[item.type]?.id === item.id
  }

  // Handle item click
  const handleItemClick = (item) => {
    setSelectedItem(item)
    setShowItemDetail(true)
  }

  // Handle equip/unequip
  const handleEquipToggle = () => {
    if (!selectedItem) return

    if (isEquipped(selectedItem)) {
      onUnequip(selectedItem.type)
    } else {
      onEquip(selectedItem)
    }
  }

  // Item types
  const itemTypes = [
    { value: 'all', label: 'Semua', icon: '📦' },
    { value: 'pet', label: 'Pets', icon: '🐾' },
    { value: 'theme', label: 'Themes', icon: '🎨' }
  ]

  const rarities = [
    { value: 'all', label: 'Semua' },
    { value: 'common', label: 'Common' },
    { value: 'rare', label: 'Rare' },
    { value: 'sr', label: 'SR' },
    { value: 'ssr', label: 'SSR' }
  ]

  return (
    <div className="inventory">
      <div className="inventory-header">
        <div className="inventory-title">
          <Backpack size={24} />
          <h3>Inventory</h3>
          <span className="item-count">{filteredItems.length} items</span>
        </div>
      </div>

      {/* Filters */}
      <div className="inventory-filters">
        <div className="filter-section">
          <Filter size={16} />
          <span>Type:</span>
          <div className="filter-buttons">
            {itemTypes.map(type => (
              <button
                key={type.value}
                className={`filter-btn ${filterType === type.value ? 'active' : ''}`}
                onClick={() => setFilterType(type.value)}
              >
                {type.icon} {type.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section">
          <span>Rarity:</span>
          <div className="filter-buttons">
            {rarities.map(rarity => (
              <button
                key={rarity.value}
                className={`filter-btn rarity-${rarity.value} ${filterRarity === rarity.value ? 'active' : ''}`}
                onClick={() => setFilterRarity(rarity.value)}
              >
                {rarity.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="inventory-grid">
        {filteredItems.length === 0 ? (
          <div className="inventory-empty">
            <Sparkles size={48} />
            <p>Belum ada item</p>
            <span>Lakukan gacha untuk mendapatkan item!</span>
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.pullId || item.id}
              className={`inventory-item ${item.rarity} ${isEquipped(item) ? 'equipped' : ''}`}
              onClick={() => handleItemClick(item)}
            >
              <div className="item-emoji">{item.emoji}</div>
              <div className="item-name">{item.name}</div>
              {isEquipped(item) && (
                <div className="equipped-badge">
                  <Check size={12} /> Equipped
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Item Detail Modal */}
      {showItemDetail && selectedItem && (
        <div className="item-detail-modal">
          <div className="modal-overlay" onClick={() => setShowItemDetail(false)}></div>
          <div className="modal-content">
            <button className="modal-close" onClick={() => setShowItemDetail(false)}>
              <X size={24} />
            </button>

            <div className={`detail-card ${selectedItem.rarity}`}>
              <div className="detail-emoji">{selectedItem.emoji}</div>
              <div className="detail-rarity">
                {RarityLabels[selectedItem.rarity]}
              </div>
              <h3 className="detail-name">{selectedItem.name}</h3>
              <div className="detail-type">{selectedItem.type}</div>
              
              <div className="detail-info">
                <div className="info-row">
                  <span>Color:</span>
                  <div 
                    className="color-preview"
                    style={{ backgroundColor: selectedItem.color }}
                  />
                </div>
                <div className="info-row">
                  <span>Obtained:</span>
                  <span>{new Date(selectedItem.obtainedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {selectedItem.type === 'pet' && (
              <button 
                className={`equip-btn ${isEquipped(selectedItem) ? 'unequip' : ''}`}
                onClick={handleEquipToggle}
              >
                {isEquipped(selectedItem) ? 'Unequip' : 'Select Pet'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Inventory
