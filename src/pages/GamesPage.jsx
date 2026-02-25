import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import FocusGarden from '../components/FocusGarden'
import BreathingGame from '../components/BreathingGame'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon, Sparkles, Gamepad2, Sprout, Heart } from 'lucide-react'
import './GamesPage.css'

export const GamesPage = () => {
  const { isDark, toggleTheme, lightModeStyle, toggleLightModeStyle } = useTheme()
  const [selectedGame, setSelectedGame] = useState(null)
  const [gameStats, setGameStats] = useState(() => {
    const saved = localStorage.getItem('gameStats')
    return saved ? JSON.parse(saved) : {
      breathingSessions: 0,
      gardenPlants: 0,
      totalPlayTime: 0
    }
  })

  useEffect(() => {
    localStorage.setItem('gameStats', JSON.stringify(gameStats))
  }, [gameStats])

  const handleBreathingComplete = (data) => {
    setGameStats(prev => ({
      ...prev,
      breathingSessions: prev.breathingSessions + 1,
      totalPlayTime: prev.totalPlayTime + (data.duration || 120)
    }))
  }

  const handleGardenComplete = (plant) => {
    setGameStats(prev => ({
      ...prev,
      gardenPlants: prev.gardenPlants + 1
    }))
  }

  const handleAddXP = (xp) => {
    // Handle XP addition if needed
  }

  const handleAddCoins = (coins) => {
    // Handle coins addition if needed
  }

  const formatPlayTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    return `${mins} min`
  }

  const games = [
    {
      id: 'breathing',
      name: 'Breathing Game',
      icon: '🧘',
      description: 'Follow the breathing pattern to relax and reduce stress',
      themeClass: 'game-breathing',
      stats: `${gameStats.breathingSessions} sessions`,
      component: <BreathingGame duration={120} onComplete={handleBreathingComplete} />
    },
    {
      id: 'garden',
      name: 'Focus Garden',
      icon: '🌱',
      description: 'Plant seeds and grow your garden while staying focused',
      themeClass: 'game-garden',
      stats: `${gameStats.gardenPlants} plants`,
      component: (
        <FocusGarden
          focusMinutes={0}
          onComplete={handleGardenComplete}
          onAddXP={handleAddXP}
          onAddCoins={handleAddCoins}
        />
      )
    }
  ]

  return (
    <div className="games-wrapper">
      <TopNavigation />

      <div className="games-container fade-in">
        {/* Header */}
        <div className="games-header">
          <h1>Calmora Games</h1>
          <p>Relax, breathe, and grow your garden</p>
        </div>

        {/* Theme Toggles */}
        <div className="theme-toggles">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>

          {!isDark && (
            <button
              className="theme-toggle"
              onClick={toggleLightModeStyle}
              title="Toggle Light Mode Style"
            >
              <Sparkles size={18} />
              <span>{lightModeStyle === 'ethereal' ? 'Daylight' : 'Space'}</span>
            </button>
          )}
        </div>

        <div className="games-content">
          {/* Game Selection Section */}
          <div className="games-list-section">
            <h2>Choose Your Game</h2>
            <div className="games-grid">
              {games.map(game => (
                <div
                  key={game.id}
                  className={`game-card neomorph-sm ${selectedGame === game.id ? 'selected' : ''} ${game.themeClass}`}
                  onClick={() => setSelectedGame(game.id)}
                >
                  <div className="game-card-header">
                    <span className="game-card-icon">{game.icon}</span>
                    <div className="game-card-info">
                      <h3>{game.name}</h3>
                      <span className="game-stats">{game.stats}</span>
                    </div>
                  </div>
                  <p className="game-card-description">{game.description}</p>
                  {selectedGame === game.id && (
                    <div className="game-card-indicator" />
                  )}
                </div>
              ))}
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
              <div className="stat-item">
                <Heart size={20} />
                <div>
                  <span className="stat-value">{gameStats.breathingSessions}</span>
                  <span className="stat-label">Breathing Sessions</span>
                </div>
              </div>
              <div className="stat-item">
                <Sprout size={20} />
                <div>
                  <span className="stat-value">{gameStats.gardenPlants}</span>
                  <span className="stat-label">Plants Grown</span>
                </div>
              </div>
              <div className="stat-item">
                <Gamepad2 size={20} />
                <div>
                  <span className="stat-value">{formatPlayTime(gameStats.totalPlayTime)}</span>
                  <span className="stat-label">Total Play Time</span>
                </div>
              </div>
            </div>
          </div>

          {/* Active Game Section */}
          <div className="active-game-section">
            {selectedGame ? (
              <div className="active-game-wrapper">
                <div className="active-game-header">
                  <h2>{games.find(g => g.id === selectedGame)?.name}</h2>
                  <button
                    className="close-game-btn"
                    onClick={() => setSelectedGame(null)}
                  >
                    ×
                  </button>
                </div>
                <div className="active-game-content">
                  {games.find(g => g.id === selectedGame)?.component}
                </div>
              </div>
            ) : (
              <div className="no-game-selected neomorph-md">
                <Gamepad2 size={48} />
                <p>Select a game to start playing</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GamesPage
