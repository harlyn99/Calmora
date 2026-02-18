import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Play, Pause, RotateCcw } from 'lucide-react'
import './TimerPage.css'

export const TimerPage = () => {
  const [time, setTime] = useState(25 * 60) // 25 minutes default
  const [isActive, setIsActive] = useState(false)
  const [sessions, setSessions] = useState(() => parseInt(localStorage.getItem('timerSessions') || '0'))
  const [totalMinutes, setTotalMinutes] = useState(() => parseInt(localStorage.getItem('totalFocusMinutes') || '0'))

  useEffect(() => {
    let interval = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else if (time === 0 && isActive) {
      // Timer finished
      setIsActive(false)
      setSessions(s => {
        const newSessions = s + 1
        localStorage.setItem('timerSessions', newSessions)
        return newSessions
      })
      setTotalMinutes(t => {
        const newTotal = t + 25
        localStorage.setItem('totalFocusMinutes', newTotal)
        localStorage.setItem('focusTime', newTotal)
        return newTotal
      })
      playSound()
    }

    return () => clearInterval(interval)
  }, [isActive, time])

  const playSound = () => {
    // Simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gain = audioContext.createGain()
    
    oscillator.connect(gain)
    gain.connect(audioContext.destination)
    
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    gain.gain.setValueAtTime(0.3, audioContext.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
    
    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const resetTimer = () => {
    setIsActive(false)
    setTime(25 * 60)
  }

  const setCustomTime = (minutes) => {
    setTime(minutes * 60)
    setIsActive(false)
  }

  const percentage = ((25 * 60 - time) / (25 * 60)) * 100

  return (
    <div className="timer-wrapper">
      <TopNavigation />
      
      <div className="timer-container fade-in">
        <div className="timer-header">
          <h1>Focus Timer</h1>
          <p>Stay focused with the Pomodoro technique</p>
        </div>

        {/* Main Timer Display */}
        <div className="timer-display neomorph-lg">
          <div className="timer-circle">
            <svg className="timer-svg" viewBox="0 0 200 200">
              <circle
                className="timer-circle-bg"
                cx="100"
                cy="100"
                r="95"
              />
              <circle
                className="timer-circle-progress"
                cx="100"
                cy="100"
                r="95"
                style={{
                  strokeDashoffset: 597 - (597 * percentage) / 100
                }}
              />
            </svg>
            <div className="timer-time">{formatTime(time)}</div>
          </div>

          {/* Controls */}
          <div className="timer-controls">
            <button
              className="neomorph-button"
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
              onClick={resetTimer}
            >
              <RotateCcw size={20} /> Reset
            </button>
          </div>
        </div>

        {/* Preset Times */}
        <div className="preset-times">
          <h3>Quick Select</h3>
          <div className="preset-buttons">
            <button
              className="preset-btn neomorph-sm"
              onClick={() => setCustomTime(5)}
            >
              5 min
            </button>
            <button
              className="preset-btn neomorph-sm"
              onClick={() => setCustomTime(15)}
            >
              15 min
            </button>
            <button
              className="preset-btn neomorph-sm active"
              onClick={() => setCustomTime(25)}
            >
              25 min
            </button>
            <button
              className="preset-btn neomorph-sm"
              onClick={() => setCustomTime(45)}
            >
              45 min
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="timer-stats">
          <div className="stat-item neomorph-md">
            <div className="stat-label">Sessions Completed</div>
            <div className="stat-number">{sessions}</div>
          </div>
          <div className="stat-item neomorph-md">
            <div className="stat-label">Total Focus Time</div>
            <div className="stat-number">{totalMinutes} min</div>
          </div>
        </div>

        {/* Motivational Note */}
        <div className="timer-note neomorph-md">
          <p>🎯 Pro tip: Take a 5-minute break after each session for maximum focus!</p>
        </div>
      </div>
    </div>
  )
}
