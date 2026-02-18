import React, { useState, useEffect } from 'react'
import { Droplets, Plus, Minus, Trophy, TrendingUp } from 'lucide-react'
import './WaterTracker.css'

export const WaterTracker = () => {
  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('waterIntake')
    if (saved) {
      const data = JSON.parse(saved)
      const today = new Date().toDateString()
      if (data.date === today) {
        return data
      }
    }
    return { date: new Date().toDateString(), glasses: 0, goal: 8 }
  })

  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake))
  }, [waterIntake])

  const addGlass = () => {
    setWaterIntake(prev => ({
      ...prev,
      glasses: Math.min(prev.glasses + 1, 20)
    }))
  }

  const removeGlass = () => {
    setWaterIntake(prev => ({
      ...prev,
      glasses: Math.max(prev.glasses - 1, 0)
    }))
  }

  const setGoal = (goal) => {
    setWaterIntake(prev => ({ ...prev, goal }))
  }

  const percentage = Math.min((waterIntake.glasses / waterIntake.goal) * 100, 100)
  const streak = calculateStreak()

  function calculateStreak() {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toDateString()
      const saved = localStorage.getItem('waterIntake_' + dateStr)
      if (saved) {
        const data = JSON.parse(saved)
        if (data.glasses >= data.goal) {
          streak++
        } else if (i === 0) {
          // Today doesn't break streak
          continue
        } else {
          break
        }
      } else if (i > 0) {
        break
      }
    }
    return streak
  }

  // Save historical data
  useEffect(() => {
    const key = 'waterIntake_' + waterIntake.date
    const prevData = localStorage.getItem(key)
    if (!prevData) {
      localStorage.setItem(key, JSON.stringify(waterIntake))
    }
  }, [waterIntake])

  return (
    <div className="water-tracker-card">
      <div className="water-header">
        <div className="water-title">
          <Droplets size={20} className="water-icon" />
          <h3>Water Intake</h3>
        </div>
        {streak > 0 && (
          <div className="water-streak">
            <Trophy size={14} />
            <span>{streak} day streak</span>
          </div>
        )}
      </div>

      <div className="water-progress-section">
        <div className="water-bottle">
          <div 
            className="water-level" 
            style={{ 
              height: `${percentage}%`,
              background: percentage >= 100 
                ? 'linear-gradient(180deg, #4caf50 0%, #8bc34a 100%)'
                : 'linear-gradient(180deg, #4a90e2 0%, #4fc3f7 100%)'
            }}
          >
            {percentage >= 100 && (
              <div className="water-complete-badge">🎉</div>
            )}
          </div>
          <div className="water-measurements">
            {[0, 25, 50, 75, 100].map(mark => (
              <div key={mark} className="water-mark" style={{ bottom: `${mark}%` }}>
                <span>{mark}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="water-stats">
          <div className="water-current">
            <span className="water-number">{waterIntake.glasses}</span>
            <span className="water-label">of {waterIntake.goal} glasses</span>
          </div>
          <div className="water-remaining">
            <TrendingUp size={14} />
            <span>{waterIntake.goal - waterIntake.glasses} glasses remaining</span>
          </div>
        </div>
      </div>

      <div className="water-controls">
        <button 
          className="water-btn remove" 
          onClick={removeGlass}
          disabled={waterIntake.glasses <= 0}
        >
          <Minus size={18} />
        </button>
        
        <button className="water-btn add" onClick={addGlass}>
          <Plus size={18} /> Add Glass
        </button>
      </div>

      <div className="water-goal-setting">
        <span>Daily Goal:</span>
        <div className="water-goal-options">
          {[6, 8, 10, 12].map(goal => (
            <button
              key={goal}
              className={`water-goal-btn ${waterIntake.goal === goal ? 'active' : ''}`}
              onClick={() => setGoal(goal)}
            >
              {goal}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WaterTracker
