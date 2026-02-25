import React, { useState } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Wind } from 'lucide-react'
import BreathingGame from '../components/BreathingGame'
import './GamePage.css'

const BREATHING_DURATIONS = [
  { value: 60, label: '1 min', icon: '⚡', description: 'Quick relaxation' },
  { value: 120, label: '2 min', icon: '🌿', description: 'Short session' },
  { value: 300, label: '5 min', icon: '🧘', description: 'Standard session' },
  { value: 600, label: '10 min', icon: '🧘‍♂️', description: 'Deep relaxation' }
]

export default function BreathingGamePage() {
  const navigate = useNavigate()
  const [selectedDuration, setSelectedDuration] = useState(120)
  const [isPlaying, setIsPlaying] = useState(false)

  const handleComplete = (data) => {
    setIsPlaying(false)
  }

  return (
    <div className="game-page breathing-page">
      <TopNavigation />

      <div className="game-page-container">
        {/* Back Button */}
        <button className="back-button" onClick={() => navigate('/gamification')}>
          <ArrowLeft size={20} />
          <span>Back to Games</span>
        </button>

        {/* Header */}
        <div className="game-page-header">
          <div className="game-page-icon" style={{ background: 'linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 100%)' }}>
            <Wind size={36} />
          </div>
          <div>
            <h1>Breathing Exercise</h1>
            <p>Find your calm with guided breathing</p>
          </div>
        </div>

        {!isPlaying ? (
          <div className="game-setup-section">
            <div className="setup-card">
              <h2>Choose Duration</h2>
              <div className="duration-grid">
                {BREATHING_DURATIONS.map((opt) => (
                  <button
                    key={opt.value}
                    className={`duration-card ${selectedDuration === opt.value ? 'active' : ''}`}
                    onClick={() => setSelectedDuration(opt.value)}
                  >
                    <span className="duration-emoji">{opt.icon}</span>
                    <span className="duration-name">{opt.label}</span>
                    <span className="duration-desc">{opt.description}</span>
                  </button>
                ))}
              </div>
            </div>

            <button 
              className="start-game-button"
              onClick={() => setIsPlaying(true)}
            >
              <span className="button-emoji">🧘</span>
              Start Breathing Exercise
            </button>
          </div>
        ) : (
          <div className="game-playing-section">
            <BreathingGame 
              duration={selectedDuration} 
              onComplete={handleComplete} 
            />
          </div>
        )}
      </div>
    </div>
  )
}
