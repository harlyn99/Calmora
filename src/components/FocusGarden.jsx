import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, RotateCcw, Volume2, VolumeX, Sprout, Flower, Trees, Sparkles } from 'lucide-react'
import './FocusGarden.css'

// ============================================
// PLANTS DATA - Growth stages
// ============================================
const PLANTS = [
  {
    id: 'sunflower',
    name: 'Sunflower',
    icon: '🌻',
    growthTime: 25 * 60 * 1000, // 25 minutes in ms
    stages: ['🌱', '🌿', '🌻'],
    color: '#fbbf24',
    xpReward: 50
  },
  {
    id: 'lavender',
    name: 'Lavender',
    icon: '🪻',
    growthTime: 25 * 60 * 1000, // 25 minutes in ms
    stages: ['🌱', '🌿', '🪻'],
    color: 'var(--accent-1)',
    xpReward: 55
  },
  {
    id: 'rose',
    name: 'Rose',
    icon: '🌹',
    growthTime: 30 * 60 * 1000, // 30 minutes in ms
    stages: ['🌱', '🌿', '🌹'],
    color: '#ec4899',
    xpReward: 65
  },
  {
    id: 'tulip',
    name: 'Tulip',
    icon: '🌷',
    growthTime: 25 * 60 * 1000, // 25 minutes in ms
    stages: ['🌱', '🌿', '🌷'],
    color: '#f472b6',
    xpReward: 50
  },
  {
    id: 'cherry_blossom',
    name: 'Cherry Blossom',
    icon: '🌸',
    growthTime: 40 * 60 * 1000, // 40 minutes in ms
    stages: ['🌱', '🌳', '🌸'],
    color: '#f9a8d4',
    xpReward: 80
  },
  {
    id: 'tree',
    name: 'Oak Tree',
    icon: '🌳',
    growthTime: 50 * 60 * 1000, // 50 minutes in ms
    stages: ['🌱', '🌿', '🌳'],
    color: '#22c55e',
    xpReward: 100
  },
  {
    id: 'cactus',
    name: 'Cactus',
    icon: '🌵',
    growthTime: 20 * 60 * 1000, // 20 minutes
    stages: ['🌱', '🌵', '🌵'],
    color: '#10b981',
    xpReward: 45
  },
  {
    id: 'mushroom',
    name: 'Mushroom',
    icon: '🍄',
    growthTime: 20 * 60 * 1000, // 20 minutes
    stages: ['🌱', '🍄', '🍄'],
    color: '#ef4444',
    xpReward: 45
  }
]

// ============================================
// AMBIENT SOUNDS
// ============================================
const AMBIENT_SOUNDS = [
  { id: 'rain', name: 'Rain', icon: '🌧️' },
  { id: 'forest', name: 'Forest', icon: '🌲' },
  { id: 'ocean', name: 'Ocean', icon: '🌊' },
  { id: 'cafe', name: 'Café', icon: '☕' },
  { id: 'night', name: 'Night', icon: '🌙' },
  { id: 'birds', name: 'Birds', icon: '🐦' }
]

export const FocusGarden = ({ onComplete, onAddXP, coins, onAddCoins }) => {
  const [isGrowing, setIsGrowing] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [garden, setGarden] = useState([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [showPlantSelect, setShowPlantSelect] = useState(false)
  const [activeSound, setActiveSound] = useState(null)
  const [soundVolume, setSoundVolume] = useState(0.5)
  const [showSoundMuted, setShowSoundMuted] = useState(false)
  const timerRef = useRef(null)

  // Load garden from localStorage
  useEffect(() => {
    const savedGarden = localStorage.getItem('focusGarden')
    if (savedGarden) {
      setGarden(JSON.parse(savedGarden))
    }
  }, [])

  // Save garden
  useEffect(() => {
    localStorage.setItem('focusGarden', JSON.stringify(garden))
  }, [garden])

  // Timer logic
  useEffect(() => {
    if (isGrowing && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1000) {
            completeGrowth()
            return 0
          }
          return prev - 1000
        })
      }, 1000)
    }
    
    return () => clearInterval(timerRef.current)
  }, [isGrowing])

  const startGrowing = (plant) => {
    setSelectedPlant(plant)
    setIsGrowing(true)
    setTimeLeft(plant.growthTime)
    setTotalTime(plant.growthTime)
    setShowPlantSelect(false)
  }

  const completeGrowth = () => {
    setIsGrowing(false)
    
    // Add grown plant to garden
    const grownPlant = {
      ...selectedPlant,
      grownAt: Date.now(),
      id: Date.now().toString()
    }
    
    setGarden(prev => [...prev, grownPlant])
    
    // Reward
    onAddXP?.(selectedPlant.xpReward)
    onAddCoins?.(Math.floor(selectedPlant.xpReward / 2))
    onComplete?.(selectedPlant)
    
    setSelectedPlant(null)
  }

  const pauseGrowing = () => {
    setIsGrowing(false)
    clearInterval(timerRef.current)
  }

  const resumeGrowing = () => {
    setIsGrowing(true)
  }

  const cancelGrowing = () => {
    setIsGrowing(false)
    clearInterval(timerRef.current)
    setTimeLeft(0)
    setSelectedPlant(null)
  }

  const harvestPlant = (plantId) => {
    setGarden(prev => prev.filter(p => p.id !== plantId))
    onAddCoins?.(25)
  }

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const getGrowthProgress = () => {
    if (!totalTime) return 0
    return ((totalTime - timeLeft) / totalTime) * 100
  }

  const getCurrentStage = () => {
    if (!selectedPlant) return 0
    const progress = getGrowthProgress()
    if (progress < 33) return 0
    if (progress < 66) return 1
    return 2
  }

  const toggleSound = (sound) => {
    if (activeSound === sound) {
      setActiveSound(null)
    } else {
      setActiveSound(sound)
    }
  }

  return (
    <div className="focus-garden">
      {/* Header */}
      <div className="garden-header">
        <div className="header-title">
          <Trees size={28} />
          <h2>Focus Garden</h2>
        </div>
        <p>Plant seeds, focus, and watch your garden grow</p>
      </div>

      {/* Active Growth */}
      {isGrowing && selectedPlant && (
        <div className="active-growth">
          <div className="growing-plant">
            <div className="plant-stage">
              {selectedPlant.stages[getCurrentStage()]}
            </div>
            <div className="plant-info">
              <h3>{selectedPlant.name}</h3>
              <div className="growth-timer">
                <div className="timer-display">{formatTime(timeLeft)}</div>
                <div className="timer-controls">
                  <button onClick={pauseGrowing} disabled={!isGrowing}>
                    <Pause size={18} />
                  </button>
                  <button onClick={resumeGrowing} disabled={isGrowing}>
                    <Play size={18} />
                  </button>
                  <button onClick={cancelGrowing} className="cancel">
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>
              <div className="growth-bar">
                <div 
                  className="growth-fill"
                  style={{ width: `${getGrowthProgress()}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plant Button */}
      {!isGrowing && (
        <button 
          className="plant-seed-btn"
          onClick={() => setShowPlantSelect(true)}
        >
          <Sprout size={24} />
          <span>Plant a Seed</span>
        </button>
      )}

      {/* Garden Display */}
      <div className="garden-display">
        <h3>Your Garden ({garden.length} plants)</h3>
        {garden.length === 0 ? (
          <div className="empty-garden">
            <Sprout size={48} />
            <p>No plants yet. Start focusing to grow your garden!</p>
          </div>
        ) : (
          <div className="garden-grid">
            {garden.map((plant) => (
              <div 
                key={plant.id}
                className="garden-plant"
                onClick={() => harvestPlant(plant.id)}
              >
                <div className="plant-icon">{plant.stages[2]}</div>
                <div className="plant-name">{plant.name}</div>
                <button className="harvest-btn">
                  <Sparkles size={14} />
                  <span>Harvest (+25🪙)</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Ambient Sounds */}
      <div className="ambient-sounds">
        <h3>
          {showSoundMuted ? (
            <VolumeX size={20} />
          ) : (
            <Volume2 size={20} />
          )}
          Ambient Sounds
          <button 
            className="mute-toggle"
            onClick={() => setShowSoundMuted(!showSoundMuted)}
          >
            {showSoundMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </h3>
        {!showSoundMuted && (
          <div className="sounds-grid">
            {AMBIENT_SOUNDS.map((sound) => (
              <button
                key={sound.id}
                className={`sound-btn ${activeSound === sound.id ? 'active' : ''}`}
                onClick={() => toggleSound(sound.id)}
              >
                <span className="sound-icon">{sound.icon}</span>
                <span className="sound-name">{sound.name}</span>
                {activeSound === sound.id && (
                  <div className="sound-wave">
                    <div className="wave-bar" style={{ '--delay': '0s' }} />
                    <div className="wave-bar" style={{ '--delay': '0.2s' }} />
                    <div className="wave-bar" style={{ '--delay': '0.4s' }} />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Plant Selection Modal */}
      {showPlantSelect && (
        <div 
          className="plant-select-overlay"
          onClick={() => setShowPlantSelect(false)}
        >
          <div 
            className="plant-select-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Choose a Plant</h3>
            <p>Each plant requires different focus time</p>
            
            <div className="plant-options">
              {PLANTS.map((plant) => (
                <button
                  key={plant.id}
                  className="plant-option"
                  onClick={() => startGrowing(plant)}
                  style={{
                    borderColor: plant.color
                  }}
                >
                  <div className="option-icon">{plant.stages[2]}</div>
                  <div className="option-info">
                    <h4>{plant.name}</h4>
                    <div className="option-stats">
                      <span>⏱️ {Math.floor(plant.growthTime / 60)}min</span>
                      <span>⭐ +{plant.xpReward} XP</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            
            <button 
              className="close-modal"
              onClick={() => setShowPlantSelect(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FocusGarden
