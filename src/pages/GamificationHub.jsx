import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { useNavigate } from 'react-router-dom'
import { useXP } from '../contexts/XPContext'
import { Trophy, Sprout, Star, Gamepad2, Heart, Clock, Wind, Flower2, ArrowRight } from 'lucide-react'
import './GamificationHub.css'

export default function GamificationHub() {
  const navigate = useNavigate()
  const { xp, addXP, achievements } = useXP()
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('petCoins')
    return saved ? parseInt(saved) : 150
  })
  const [gameStats, setGameStats] = useState(() => {
    const saved = localStorage.getItem('gameStats')
    return saved ? JSON.parse(saved) : {
      breathingSessions: 0,
      gardenPlants: 0,
      totalPlayTime: 0
    }
  })

  useEffect(() => {
    localStorage.setItem('petCoins', coins.toString())
  }, [coins])

  useEffect(() => {
    localStorage.setItem('gameStats', JSON.stringify(gameStats))
  }, [gameStats])

  const formatPlayTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    if (mins >= 60) {
      const hours = Math.floor(mins / 60)
      const remainingMins = mins % 60
      return `${hours}h ${remainingMins}m`
    }
    return `${mins}m`
  }

  const games = [
    {
      id: 'breathing',
      name: 'Breathing Exercise',
      description: 'Find your calm with guided breathing exercises',
      icon: Wind,
      themeClass: 'game-breathing',
      emoji: '🧘',
      stats: `${gameStats.breathingSessions} sessions`,
      route: '/game/breathing'
    },
    {
      id: 'garden',
      name: 'Focus Garden',
      description: 'Grow plants while you focus and earn rewards',
      icon: Flower2,
      themeClass: 'game-garden',
      emoji: '🌱',
      stats: `${gameStats.gardenPlants} plants`,
      route: '/game/garden'
    }
  ]

  return (
    <div className="gamification-hub">
      <TopNavigation />

      <div className="hub-container fade-in">
        {/* Header */}
        <div className="hub-header">
          <div className="header-left">
            <div className="header-icon-wrapper">
              <Gamepad2 size={32} />
            </div>
            <div>
              <h1>Calmora Games</h1>
              <p>Choose your activity</p>
            </div>
          </div>

          <div className="header-stats">
            <div className="stat-badge xp-badge">
              <Star size={16} fill="#fbbf24" />
              <span>Lv.{xp.level}</span>
            </div>
            <div className="stat-badge coins-badge">
              <span>🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <div className="games-hub-grid">
          {games.map((game) => {
            const Icon = game.icon
            return (
              <div
                key={game.id}
                className={`game-hub-card ${game.themeClass}`}
                onClick={() => navigate(game.route)}
              >
                <div className="game-hub-card-content">
                  <div className="game-hub-icon">
                    <Icon size={32} />
                  </div>
                  <div className="game-hub-info">
                    <h2>{game.name}</h2>
                    <p>{game.description}</p>
                    <div className="game-hub-stats">
                      <span>{game.emoji}</span>
                      <span>{game.stats}</span>
                    </div>
                  </div>
                </div>
                <div className="game-hub-arrow">
                  <ArrowRight size={24} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Your Progress Section */}
        <div className="progress-section">
          <h2><Trophy size={20} /> Your Progress</h2>
          <div className="progress-stats">
            <div className="progress-stat-card">
              <Heart size={24} />
              <div>
                <span className="progress-stat-value">{gameStats.breathingSessions}</span>
                <span className="progress-stat-label">Breathing Sessions</span>
              </div>
            </div>
            <div className="progress-stat-card">
              <Sprout size={24} />
              <div>
                <span className="progress-stat-value">{gameStats.gardenPlants}</span>
                <span className="progress-stat-label">Plants Grown</span>
              </div>
            </div>
            <div className="progress-stat-card">
              <Clock size={24} />
              <div>
                <span className="progress-stat-value">{formatPlayTime(gameStats.totalPlayTime)}</span>
                <span className="progress-stat-label">Total Play Time</span>
              </div>
            </div>
            <div className="progress-stat-card">
              <Trophy size={24} />
              <div>
                <span className="progress-stat-value">{achievements.length}</span>
                <span className="progress-stat-label">Achievements</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
