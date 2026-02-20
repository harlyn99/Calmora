import React, { useState, useEffect } from 'react'
import { Heart, Utensils, Zap } from 'lucide-react'
import './MiniPetWidget.css'

const PET_TYPES = {
  bear: { emoji: '🐻', name: 'Beruang' },
  dog: { emoji: '🐶', name: 'Guguk' },
  cat: { emoji: '🐱', name: 'Kucing' },
  bunny: { emoji: '🐰', name: 'Kelinci' },
  elephant: { emoji: '🐘', name: 'Gajah' }
}

const PET_STATES = {
  hungry: { text: 'Lapar nih...', icon: '🍎' },
  tired: { text: 'Ngantuk...', icon: '💤' },
  bored: { text: 'Bosen...', icon: '🎾' },
  happy: { text: 'Seneng!', icon: '✨' },
  sad: { text: 'Sedih...', icon: '💔' }
}

export default function MiniPetWidget() {
  const [petType, setPetType] = useState('bear')
  const [petState, setPetState] = useState('happy')
  const [stats, setStats] = useState({
    happiness: 80,
    hunger: 60,
    energy: 70
  })

  useEffect(() => {
    // Load pet data from localStorage
    const updatePetStats = () => {
      const savedPet = localStorage.getItem('virtualPet')
      if (savedPet) {
        const pet = JSON.parse(savedPet)
        setPetType(pet.type || 'bear')
        const newStats = {
          happiness: Math.round(pet.happiness || 80),
          hunger: Math.round(pet.hunger || 50),
          energy: Math.round(pet.energy || 80)
        }
        setStats(newStats)
        
        // Determine state based on stats
        if (newStats.hunger < 30) setPetState('hungry')
        else if (newStats.energy < 30) setPetState('tired')
        else if (newStats.happiness < 40) setPetState('sad')
        else if (newStats.happiness < 60) setPetState('bored')
        else setPetState('happy')
      }
    }
    
    updatePetStats()
    
    // Update every 2 seconds to sync with virtual pet
    const interval = setInterval(updatePetStats, 2000)
    return () => clearInterval(interval)
  }, [])

  const pet = PET_TYPES[petType]
  const state = PET_STATES[petState]

  return (
    <div className="mini-pet-widget">
      <div className="pet-header">
        <span>Virtual Pet</span>
      </div>
      
      <div className="pet-content">
        <div className="pet-avatar-section">
          <div className="pet-face-half">
            {pet.emoji}
          </div>
          <div className="pet-info">
            <div className="pet-name">{pet.name}</div>
            <div className="pet-speech-bubble">
              {state.text} {state.icon}
            </div>
          </div>
        </div>
        
        <div className="pet-stats">
          <div className="pet-stat">
            <Heart size={22} fill="#ff6b9d" color="#ff6b9d" />
            <div className="stat-bar">
              <div 
                className="stat-fill happiness" 
                style={{ width: `${stats.happiness}%` }}
              ></div>
            </div>
            <span className="stat-value">{stats.happiness}%</span>
          </div>
          
          <div className="pet-stat">
            <Utensils size={22} fill="#ffb347" color="#ffb347" />
            <div className="stat-bar">
              <div 
                className="stat-fill hunger" 
                style={{ width: `${stats.hunger}%` }}
              ></div>
            </div>
            <span className="stat-value">{stats.hunger}%</span>
          </div>
          
          <div className="pet-stat">
            <Zap size={22} fill="#74b9ff" color="#74b9ff" />
            <div className="stat-bar">
              <div 
                className="stat-fill energy" 
                style={{ width: `${stats.energy}%` }}
              ></div>
            </div>
            <span className="stat-value">{stats.energy}%</span>
          </div>
        </div>
        
        <div className="pet-interact-buttons">
          <button className="pet-interact-btn" onClick={() => window.location.href = '/pet'}>
            Classic →
          </button>
          <button className="pet-interact-btn cute" onClick={() => window.location.href = '/cute-pet'}>
            Cute ver. →
          </button>
        </div>
      </div>
    </div>
  )
}
