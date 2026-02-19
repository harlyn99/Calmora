import React, { useState, useEffect, useRef } from 'react'
import './BreathingGame.css'

export const BreathingGame = ({ duration = 120, onComplete }) => {
  const [isActive, setIsActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(duration)
  const [phase, setPhase] = useState('idle') // idle, inhale, hold, exhale
  const [score, setScore] = useState(0)
  const [sessions, setSessions] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  
  const timerRef = useRef(null)
  const phaseRef = useRef(null)

  const breathingPattern = {
    inhale: 4000,
    hold: 4000,
    exhale: 4000,
    holdEmpty: 2000
  }

  useEffect(() => {
    const savedSessions = localStorage.getItem('breathingSessions')
    if (savedSessions) {
      setSessions(JSON.parse(savedSessions))
    }
  }, [])

  useEffect(() => {
    if (!isActive) {
      if (timerRef.current) clearInterval(timerRef.current)
      if (phaseRef.current) clearTimeout(phaseRef.current)
      setPhase('idle')
      return
    }

    // Timer countdown
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          completeSession()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Breathing cycle
    const runCycle = async () => {
      while (isActive && timeLeft > 0) {
        // Inhale
        setPhase('inhale')
        await sleep(breathingPattern.inhale)
        
        // Hold
        setPhase('hold')
        await sleep(breathingPattern.hold)
        
        // Exhale
        setPhase('exhale')
        await sleep(breathingPattern.exhale)
        
        // Hold empty
        setPhase('holdEmpty')
        await sleep(breathingPattern.holdEmpty)
        
        // Add score for completing cycle
        setScore(prev => prev + 1)
      }
    }

    runCycle()

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (phaseRef.current) clearTimeout(phaseRef.current)
    }
  }, [isActive, timeLeft])

  const sleep = (ms) => new Promise(resolve => {
    phaseRef.current = setTimeout(resolve, ms)
  })

  const completeSession = () => {
    setIsActive(false)
    setPhase('idle')
    const newSessions = sessions + 1
    setSessions(newSessions)
    localStorage.setItem('breathingSessions', JSON.stringify(newSessions))
    setShowConfetti(true)
    
    if (onComplete) {
      onComplete({ score, duration })
    }

    setTimeout(() => setShowConfetti(false), 3000)
  }

  const startSession = () => {
    setIsActive(true)
    setTimeLeft(duration)
    setScore(0)
  }

  const stopSession = () => {
    setIsActive(false)
    setPhase('idle')
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In...'
      case 'hold': return 'Hold...'
      case 'exhale': return 'Breathe Out...'
      case 'holdEmpty': return 'Hold...'
      default: return 'Ready?'
    }
  }

  const getPhaseProgress = () => {
    const phases = {
      idle: 0,
      inhale: 25,
      hold: 50,
      exhale: 75,
      holdEmpty: 100
    }
    return phases[phase] || 0
  }

  return (
    <div className="breathing-game-container">
      {/* Confetti */}
      {showConfetti && (
        <div className="confetti-overlay">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                background: `hsl(${Math.random() * 360}, 70%, 60%)`
              }}
            />
          ))}
        </div>
      )}

      {/* Header Stats */}
      <div className="breathing-stats">
        <div className="breathing-stat">
          <span className="stat-icon">🧘</span>
          <span className="stat-value">{sessions}</span>
          <span className="stat-label">Sessions</span>
        </div>
        <div className="breathing-stat">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{score}</span>
          <span className="stat-label">Cycles</span>
        </div>
        <div className="breathing-stat">
          <span className="stat-icon">⏱️</span>
          <span className="stat-value">{formatTime(timeLeft)}</span>
          <span className="stat-label">Remaining</span>
        </div>
      </div>

      {/* Breathing Circle */}
      <div className="breathing-circle-container">
        <div 
          className={`breathing-circle ${phase}`}
          style={{
            '--progress': `${getPhaseProgress()}%`
          }}
        >
          <div className="circle-inner">
            <span className="phase-text">{getPhaseText()}</span>
            {isActive && (
              <div className="progress-ring">
                <svg viewBox="0 0 100 100">
                  <circle
                    className="progress-track"
                    cx="50"
                    cy="50"
                    r="45"
                  />
                  <circle
                    className="progress-bar"
                    cx="50"
                    cy="50"
                    r="45"
                    style={{
                      strokeDashoffset: 283 - (283 * getPhaseProgress()) / 100
                    }}
                  />
                </svg>
              </div>
            )}
          </div>
          
          {/* Orbiting particles */}
          {isActive && (
            <div className="orbiting-particles">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="orbit-particle"
                  style={{
                    animationDelay: `${i * 0.5}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="breathing-controls">
        {!isActive ? (
          <button className="control-button start" onClick={startSession}>
            {sessions > 0 ? 'Start New Session' : 'Start Breathing'}
          </button>
        ) : (
          <button className="control-button stop" onClick={stopSession}>
            Stop
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="breathing-instructions">
        <h3>How to Play</h3>
        <div className="instruction-steps">
          <div className="step">
            <span className="step-emoji">🌬️</span>
            <span>Follow the circle: Expand = Breathe In</span>
          </div>
          <div className="step">
            <span className="step-emoji">⏸️</span>
            <span>Hold when circle is full</span>
          </div>
          <div className="step">
            <span className="step-emoji">💨</span>
            <span>Contract = Breathe Out</span>
          </div>
          <div className="step">
            <span className="step-emoji">✨</span>
            <span>Complete cycles to score points</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BreathingGame
