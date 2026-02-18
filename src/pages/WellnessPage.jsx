import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Copy, Edit2, CheckCircle, Clock } from 'lucide-react'
import './WellnessPage.css'

export const WellnessPage = () => {
  const [activeTab, setActiveTab] = useState('gratitude')
  
  return (
    <div className="wellness-wrapper">
      <TopNavigation />
      
      <div className="wellness-container fade-in">
        <div className="wellness-header">
          <h1>Wellness Center</h1>
          <p>Your holistic wellness companion</p>
        </div>

        <div className="wellness-tabs">
          <button 
            className={`wellness-tab ${activeTab === 'gratitude' ? 'active' : ''}`}
            onClick={() => setActiveTab('gratitude')}
          >
            <Heart size={18} /> Gratitude
          </button>
          <button 
            className={`wellness-tab ${activeTab === 'water' ? 'active' : ''}`}
            onClick={() => setActiveTab('water')}
          >
            <Droplets size={18} /> Water
          </button>
          <button 
            className={`wellness-tab ${activeTab === 'breathe' ? 'active' : ''}`}
            onClick={() => setActiveTab('breathe')}
          >
            <Wind size={18} /> Breathe
          </button>
        </div>

        <div className="wellness-content">
          {activeTab === 'gratitude' && <GratitudeSection />}
          {activeTab === 'water' && <WaterSection />}
          {activeTab === 'breathe' && <BreatheSection />}
        </div>
      </div>
    </div>
  )
}

// Gratitude Section Component
const GratitudeSection = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('gratitudeEntries')
    return saved ? JSON.parse(saved) : []
  })
  const [newEntry, setNewEntry] = useState('')

  useEffect(() => {
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries))
  }, [entries])

  const addEntry = (e) => {
    e.preventDefault()
    if (!newEntry.trim()) return
    const entry = { id: Date.now(), content: newEntry, date: new Date().toISOString() }
    setEntries([entry, ...entries])
    setNewEntry('')
  }

  return (
    <div className="wellness-section-card">
      <h2>Gratitude Journal</h2>
      <form onSubmit={addEntry} className="wellness-form">
        <textarea
          placeholder="What are you grateful for today?"
          value={newEntry}
          onChange={(e) => setNewEntry(e.target.value)}
          className="wellness-textarea"
          rows={4}
        />
        <button type="submit" className="wellness-btn primary">
          <Plus size={18} /> Add Entry
        </button>
      </form>
      <div className="wellness-entries-list">
        {entries.slice(0, 10).map(entry => (
          <div key={entry.id} className="wellness-entry-item">
            <p>{entry.content}</p>
            <span className="entry-date">
              {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Water Section Component
const WaterSection = () => {
  const [waterIntake, setWaterIntake] = useState(() => {
    const saved = localStorage.getItem('waterIntake')
    if (saved) {
      const data = JSON.parse(saved)
      const today = new Date().toDateString()
      if (data.date === today) return data
    }
    return { date: new Date().toDateString(), glasses: 0, goal: 8 }
  })

  useEffect(() => {
    localStorage.setItem('waterIntake', JSON.stringify(waterIntake))
  }, [waterIntake])

  const percentage = Math.min((waterIntake.glasses / waterIntake.goal) * 100, 100)

  return (
    <div className="wellness-section-card">
      <h2>Water Tracker</h2>
      <div className="water-tracker-wellness">
        <div className="water-progress-circle">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--border-color)" strokeWidth="8" />
            <circle 
              cx="60" cy="60" r="52" 
              fill="none" 
              stroke="url(#waterGradient)" 
              strokeWidth="8"
              strokeDasharray={326}
              strokeDashoffset={326 - (326 * percentage) / 100}
              strokeLinecap="round"
              transform="rotate(-90 60 60)"
            />
            <defs>
              <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4a90e2" />
                <stop offset="100%" stopColor="#4fc3f7" />
              </linearGradient>
            </defs>
          </svg>
          <div className="water-circle-text">
            <span className="water-count">{waterIntake.glasses}</span>
            <span className="water-goal">/ {waterIntake.goal}</span>
          </div>
        </div>
        <div className="water-controls-wellness">
          <button className="water-btn" onClick={() => setWaterIntake(p => ({ ...p, glasses: Math.max(0, p.glasses - 1) }))}>
            <Minus size={20} />
          </button>
          <button className="water-btn add" onClick={() => setWaterIntake(p => ({ ...p, glasses: p.glasses + 1 }))}>
            <Plus size={20} /> Add Glass
          </button>
        </div>
      </div>
    </div>
  )
}

// Breathe Section Component
const BreatheSection = () => {
  const [isBreathing, setIsBreathing] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    let interval
    if (isBreathing) {
      interval = setInterval(() => {
        setCounter(prev => {
          if (prev >= 4) {
            setPhase(p => {
              if (p === 'inhale') return 'hold'
              if (p === 'hold') return 'exhale'
              if (p === 'exhale') return 'inhale'
              return 'inhale'
            })
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isBreathing])

  useEffect(() => {
    if (isBreathing && phase === 'idle') {
      setPhase('inhale')
    }
  }, [isBreathing])

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale': return 'Breathe In'
      case 'hold': return 'Hold'
      case 'exhale': return 'Breathe Out'
      default: return 'Ready'
    }
  }

  const getCircleScale = () => {
    if (phase === 'inhale') return 1.5
    if (phase === 'exhale') return 0.8
    return 1
  }

  return (
    <div className="wellness-section-card">
      <h2>Breathing Exercise</h2>
      <div className="breathing-wellness">
        <div 
          className="breathing-circle-wellness"
          style={{ transform: `scale(${getCircleScale()})` }}
        />
        <h3 className="breathing-phase">{getPhaseText()}</h3>
        <button 
          className="wellness-btn"
          onClick={() => {
            setIsBreathing(!isBreathing)
            if (!isBreathing) {
              setPhase('inhale')
              setCounter(0)
            }
          }}
        >
          {isBreathing ? 'Stop' : 'Start Box Breathing'}
        </button>
        <p className="breathing-info">4-4-4-4 technique for stress relief</p>
      </div>
    </div>
  )
}

import { Heart, Droplets, Wind, Minus } from 'lucide-react'
export default WellnessPage
