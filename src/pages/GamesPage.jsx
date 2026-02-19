import React from 'react'
import { TopNavigation } from '../components/TopNavigation'
import FocusGarden from '../components/FocusGarden'
import BreathingGame from '../components/BreathingGame'
import { useTheme } from '../contexts/ThemeContext'
import { Sun, Moon, Sparkles } from 'lucide-react'
import './GamesPage.css'

export const GamesPage = () => {
  const { isDark, toggleTheme, lightModeStyle, toggleLightModeStyle } = useTheme()
  const [activeGame, setActiveGame] = React.useState('garden') // 'garden' | 'breathing'

  return (
    <div className="games-wrapper">
      <TopNavigation />
      
      <div className="games-container fade-in">
        {/* Header */}
        <div className="games-header">
          <h1>🎮 Calmora Games</h1>
          <p>Relax, breathe, and grow your garden</p>
        </div>

        {/* Theme Toggles */}
        <div className="theme-toggles">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            title="Toggle Dark/Light Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
            <span>{isDark ? 'Light' : 'Dark'}</span>
          </button>
          
          {!isDark && (
            <button 
              className="theme-toggle"
              onClick={toggleLightModeStyle}
              title="Toggle Light Mode Style"
            >
              <Sparkles size={20} />
              <span>{lightModeStyle === 'ethereal' ? 'Daylight' : 'Space'}</span>
            </button>
          )}
        </div>

        {/* Game Selector */}
        <div className="game-selector">
          <button
            className={`game-tab ${activeGame === 'garden' ? 'active' : ''}`}
            onClick={() => setActiveGame('garden')}
          >
            🌱 Focus Garden
          </button>
          <button
            className={`game-tab ${activeGame === 'breathing' ? 'active' : ''}`}
            onClick={() => setActiveGame('breathing')}
          >
            🧘 Breathing Game
          </button>
        </div>

        {/* Active Game */}
        <div className="game-content">
          {activeGame === 'garden' && (
            <FocusGarden focusMinutes={0} />
          )}
          {activeGame === 'breathing' && (
            <BreathingGame duration={120} />
          )}
        </div>
      </div>
    </div>
  )
}

export default GamesPage
