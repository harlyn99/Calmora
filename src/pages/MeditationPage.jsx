import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Play, Pause, RotateCcw, Music } from 'lucide-react'
import './MeditationPage.css'

export const MeditationPage = () => {
  const [duration, setDuration] = useState(5)
  const [timeLeft, setTimeLeft] = useState(duration * 60)
  const [isActive, setIsActive] = useState(false)
  const [breathingPhase, setBreathingPhase] = useState('inhale')

  useEffect(() => {
    let interval = null

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false)
      setTimeLeft(duration * 60)
    }

    return () => clearInterval(interval)
  }, [isActive, timeLeft, duration])

  useEffect(() => {
    if (isActive) {
      const breathingInterval = setInterval(() => {
        setBreathingPhase(prev => {
          if (prev === 'inhale') return 'hold'
          if (prev === 'hold') return 'exhale'
          return 'inhale'
        })
      }, 4000)

      return () => clearInterval(breathingInterval)
    }
  }, [isActive])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const selectDuration = (min) => {
    setDuration(min)
    setTimeLeft(min * 60)
    setIsActive(false)
  }

  const reset = () => {
    setIsActive(false)
    setTimeLeft(duration * 60)
  }

  const getBreathingText = () => {
    if (breathingPhase === 'inhale') return 'Breathe in slowly...'
    if (breathingPhase === 'hold') return 'Hold your breath...'
    return 'Breathe out slowly...'
  }

  return (
    <div className="meditation-wrapper">
      <TopNavigation />
      
      <div className="meditation-container fade-in">
        <div className="meditation-header">
          <h1>Meditation</h1>
          <p>Find your inner peace and calm</p>
        </div>

        {/* Main Meditation Space */}
        <div className="meditation-space neomorph-lg">
          {/* Breathing Circle */}
          <div className={`breathing-circle ${isActive ? 'active' : ''} breathing-${breathingPhase}`}></div>

          {/* Time Display */}
          <div className="meditation-time">{formatTime(timeLeft)}</div>

          {/* Breathing Instruction */}
          {isActive && (
            <div className="breathing-text fade-in">
              {getBreathingText()}
            </div>
          )}
        </div>

        {/* Duration Selection */}
        <div className="duration-selection">
          <h3>Select Duration</h3>
          <div className="duration-buttons">
            {[5, 10, 15].map(min => (
              <button
                key={min}
                className={`duration-btn neomorph-sm ${duration === min ? 'active' : ''}`}
                onClick={() => selectDuration(min)}
              >
                {min} min
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="meditation-controls">
          <button
            className="neomorph-button primary"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? (
              <><Pause size={20} /> Pause</>
            ) : (
              <><Play size={20} /> Start</>
            )}
          </button>
          <button
            className="neomorph-button"
            onClick={reset}
          >
            <RotateCcw size={20} /> Reset
          </button>
        </div>

        {/* Meditation Tips */}
        <div className="meditation-tips neomorph-md">
          <h4>💡 Meditation Tips</h4>
          <ul>
            <li>Find a quiet, comfortable place to sit</li>
            <li>Keep your back straight but relaxed</li>
            <li>Focus on your natural breathing</li>
            <li>If your mind wanders, gently bring it back</li>
            <li>Practice consistently for better results</li>
          </ul>
        </div>

        {/* Quote */}
        <div className="meditation-quote neomorph-md">
          <p>"In the middle of difficulty lies opportunity. The calm you seek is already within you." 🧘</p>
        </div>
      </div>
    </div>
  )
}
