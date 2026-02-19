import React, { useState, useEffect } from 'react'
import './FocusGarden.css'

const PLANTS = {
  sprout: { name: 'Sprout', emoji: '🌱', unlockAt: 0, color: '#7bed9f' },
  seedling: { name: 'Seedling', emoji: '🌿', unlockAt: 60, color: '#2ed573' },
  flower: { name: 'Flower', emoji: '🌸', unlockAt: 120, color: '#ff6a88' },
  tree: { name: 'Tree', emoji: '🌳', unlockAt: 300, color: '#26de81' },
  cherry: { name: 'Cherry Blossom', emoji: '🌺', unlockAt: 600, color: '#ff9a8b' },
  crystal: { name: 'Crystal Plant', emoji: '💎', unlockAt: 1200, color: '#a55eea' },
  rainbow: { name: 'Rainbow Plant', emoji: '🌈', unlockAt: 2400, color: '#ff6b81' }
}

export const FocusGarden = ({ focusMinutes = 0 }) => {
  const [garden, setGarden] = useState(() => {
    const saved = localStorage.getItem('focusGarden')
    return saved ? JSON.parse(saved) : { plants: [], level: 1, xp: 0 }
  })

  const [showNewPlant, setShowNewPlant] = useState(false)
  const [newPlantAnimation, setNewPlantAnimation] = useState(null)

  useEffect(() => {
    localStorage.setItem('focusGarden', JSON.stringify(garden))
  }, [garden])

  const addPlant = () => {
    const unlockedPlants = Object.entries(PLANTS)
      .filter(([_, plant]) => focusMinutes >= plant.unlockAt)
      .map(([key, plant]) => ({ key, ...plant }))

    if (unlockedPlants.length === 0) return

    const randomPlant = unlockedPlants[Math.floor(Math.random() * unlockedPlants.length)]
    
    const newPlant = {
      id: Date.now(),
      ...randomPlant,
      x: Math.random() * 80 + 10, // 10-90%
      y: Math.random() * 60 + 20, // 20-80%
      plantedAt: new Date().toISOString()
    }

    setGarden(prev => ({
      ...prev,
      plants: [...prev.plants, newPlant],
      xp: prev.xp + 10,
      level: Math.floor((prev.xp + 10) / 100) + 1
    }))

    setNewPlantAnimation(newPlant)
    setShowNewPlant(true)

    setTimeout(() => {
      setShowNewPlant(false)
      setNewPlantAnimation(null)
    }, 3000)
  }

  const removePlant = (id) => {
    setGarden(prev => ({
      ...prev,
      plants: prev.plants.filter(p => p.id !== id)
    }))
  }

  const clearGarden = () => {
    if (confirm('Clear all plants?')) {
      setGarden({ plants: [], level: 1, xp: 0 })
    }
  }

  const totalPlants = garden.plants.length
  const uniquePlants = new Set(garden.plants.map(p => p.key)).size

  return (
    <div className="focus-garden-container">
      <div className="garden-header">
        <div className="garden-stats">
          <span className="garden-stat">
            <span className="stat-emoji">🌱</span>
            <span className="stat-value">{totalPlants}</span>
            <span className="stat-label">Plants</span>
          </span>
          <span className="garden-stat">
            <span className="stat-emoji">🏆</span>
            <span className="stat-value">{uniquePlants}/{Object.keys(PLANTS).length}</span>
            <span className="stat-label">Collected</span>
          </span>
          <span className="garden-stat">
            <span className="stat-emoji">⭐</span>
            <span className="stat-value">Lv.{garden.level}</span>
            <span className="stat-label">Garden Level</span>
          </span>
        </div>
        
        <div className="garden-actions">
          <button 
            className="glass-button plant-button"
            onClick={addPlant}
            disabled={totalPlants >= 20}
          >
            🌱 Plant Seed
          </button>
          {totalPlants > 0 && (
            <button 
              className="glass-button clear-button"
              onClick={clearGarden}
            >
              🧹 Clear
            </button>
          )}
        </div>
      </div>

      {/* Garden Visualization */}
      <div className="garden-visualization">
        {/* Sky gradient background */}
        <div className="garden-sky" />
        
        {/* Ground */}
        <div className="garden-ground" />

        {/* Plants */}
        {garden.plants.map((plant, index) => (
          <div
            key={plant.id}
            className="garden-plant"
            style={{
              left: `${plant.x}%`,
              bottom: `${20 + (index % 5) * 5}%`,
              animationDelay: `${index * 0.2}s`
            }}
            onClick={() => removePlant(plant.id)}
            title={`${plant.name} - Click to remove`}
          >
            <span className="plant-emoji" style={{ color: plant.color }}>
              {plant.emoji}
            </span>
            <span className="plant-name">{plant.name}</span>
          </div>
        ))}

        {/* Floating particles */}
        <div className="garden-particles">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="garden-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 5}s`
              }}
            />
          ))}
        </div>

        {/* New plant animation */}
        {showNewPlant && newPlantAnimation && (
          <div 
            className="new-plant-popup"
            style={{
              left: `${newPlantAnimation.x}%`,
              bottom: `${20 + (garden.plants.length % 5) * 5}%`
            }}
          >
            <span className="popup-emoji">{newPlantAnimation.emoji}</span>
            <span className="popup-text">New Plant!</span>
          </div>
        )}
      </div>

      {/* Plant Collection */}
      <div className="plant-collection">
        <h3 className="collection-title">Plant Collection</h3>
        <div className="collection-grid">
          {Object.entries(PLANTS).map(([key, plant]) => {
            const owned = garden.plants.filter(p => p.key === key).length
            const isUnlocked = focusMinutes >= plant.unlockAt
            return (
              <div 
                key={key} 
                className={`collection-item ${owned > 0 ? 'owned' : ''} ${!isUnlocked ? 'locked' : ''}`}
              >
                <span className={`collection-emoji ${!isUnlocked ? 'locked' : ''}`} style={{ color: isUnlocked ? plant.color : undefined }}>
                  {isUnlocked ? plant.emoji : '🔒'}
                </span>
                <span className="collection-name">{plant.name}</span>
                {owned > 0 && (
                  <span className="collection-count">x{owned}</span>
                )}
                {!isUnlocked && (
                  <span className="unlock-requirement">{plant.unlockAt} min</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default FocusGarden
