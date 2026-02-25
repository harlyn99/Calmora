import React, { useState } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { useNavigate } from 'react-router-dom'
import { useXP } from '../contexts/XPContext'
import { ArrowLeft, Flower2 } from 'lucide-react'
import FocusGarden from '../components/FocusGarden'
import './GamePage.css'

const GARDEN_MODES = [
  { value: 'quick', label: 'Quick Grow', time: '5-10 min', icon: '🌱', description: 'Fast growing plants', plants: ['Cactus', 'Mushroom'] },
  { value: 'focus', label: 'Focus Session', time: '25 min', icon: '🌻', description: 'Standard focus time', plants: ['Sunflower', 'Lavender', 'Tulip'] },
  { value: 'deep', label: 'Deep Focus', time: '40-50 min', icon: '🌳', description: 'Long growing plants', plants: ['Cherry Blossom', 'Oak Tree', 'Rose'] }
]

export default function FocusGardenPage() {
  const navigate = useNavigate()
  const { addXP } = useXP()
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('petCoins')
    return saved ? parseInt(saved) : 150
  })
  const [selectedMode, setSelectedMode] = useState('focus')
  const [isPlaying, setIsPlaying] = useState(false)

  const handleAddCoins = (amount) => {
    const newCoins = coins + amount
    setCoins(newCoins)
    localStorage.setItem('petCoins', newCoins.toString())
  }

  const handleAddXP = (amount, source) => {
    addXP(amount, source)
  }

  const handleComplete = (plant) => {
    console.log('Plant grown:', plant.name)
  }

  return (
    <div className="game-page garden-page">
      <TopNavigation />

      <div className="game-page-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/gamification')}>
          <ArrowLeft size={20} />
          <span>Back to Games</span>
        </button>

        {/* Header */}
        <div className="game-page-header">
          <div className="game-page-icon" style={{ background: 'linear-gradient(135deg, #22c55e 0%, #4ade80 100%)' }}>
            <Flower2 size={36} />
          </div>
          <div>
            <h1>Focus Garden</h1>
            <p>Grow plants while you focus</p>
          </div>
        </div>

        {!isPlaying ? (
          <div className="game-setup-section">
            <div className="setup-card">
              <h2>Choose Focus Mode</h2>
              <div className="mode-grid">
                {GARDEN_MODES.map((mode) => (
                  <button
                    key={mode.value}
                    className={`mode-card ${selectedMode === mode.value ? 'active' : ''}`}
                    onClick={() => setSelectedMode(mode.value)}
                  >
                    <span className="mode-emoji">{mode.icon}</span>
                    <div className="mode-info">
                      <span className="mode-name">{mode.label}</span>
                      <span className="mode-time">{mode.time}</span>
                      <span className="mode-desc">{mode.description}</span>
                      <div className="mode-plants">
                        {mode.plants.map((plant, i) => (
                          <span key={i} className="plant-tag">{plant}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="start-game-button green"
              onClick={() => setIsPlaying(true)}
            >
              <span className="button-emoji">🌱</span>
              Plant a Seed
            </button>
          </div>
        ) : (
          <div className="game-playing-section">
            <FocusGarden
              onComplete={handleComplete}
              onAddXP={handleAddXP}
              onAddCoins={handleAddCoins}
              coins={coins}
            />
          </div>
        )}
      </div>
    </div>
  )
}
