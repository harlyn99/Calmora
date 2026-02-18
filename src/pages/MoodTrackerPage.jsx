import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Smile, Frown, Meh, TrendingUp, Calendar, Heart, ThumbsUp, ThumbsDown } from 'lucide-react'
import './MoodTrackerPage.css'

const moodOptions = [
  { value: 5, label: 'Great', icon: Heart, color: '#4caf50' },
  { value: 4, label: 'Good', icon: Smile, color: '#8bc34a' },
  { value: 3, label: 'Okay', icon: Meh, color: '#ffeb3b' },
  { value: 2, label: 'Bad', icon: Frown, color: '#ff9800' },
  { value: 1, label: 'Terrible', icon: ThumbsDown, color: '#f44336' }
]

export const MoodTrackerPage = () => {
  const [moods, setMoods] = useState(() => {
    const saved = localStorage.getItem('moods')
    return saved ? JSON.parse(saved) : []
  })
  const [selectedMood, setSelectedMood] = useState(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    localStorage.setItem('moods', JSON.stringify(moods))
  }, [moods])

  const addMood = (e) => {
    e.preventDefault()
    if (!selectedMood) return

    const moodEntry = {
      id: Date.now(),
      mood: selectedMood,
      note,
      timestamp: new Date().toISOString()
    }
    setMoods([moodEntry, ...moods])
    setSelectedMood(null)
    setNote('')
  }

  const deleteMood = (id) => {
    setMoods(moods.filter(m => m.id !== id))
  }

  const getAverageMood = () => {
    if (moods.length === 0) return 0
    const sum = moods.reduce((acc, m) => acc + m.mood, 0)
    return (sum / moods.length).toFixed(1)
  }

  const getMoodTrend = () => {
    if (moods.length < 2) return 0
    const recent = moods.slice(0, 7)
    const older = moods.slice(7, 14)
    if (older.length === 0) return 0
    const recentAvg = recent.reduce((acc, m) => acc + m.mood, 0) / recent.length
    const olderAvg = older.reduce((acc, m) => acc + m.mood, 0) / older.length
    return ((recentAvg - olderAvg) / olderAvg * 100).toFixed(1)
  }

  const getMoodDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    moods.forEach(m => {
      distribution[m.mood]++
    })
    return distribution
  }

  const distribution = getMoodDistribution()
  const totalMoods = moods.length
  const avgMood = getAverageMood()
  const trend = getMoodTrend()

  const getWeekData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayMoods = moods.filter(m => m.timestamp.startsWith(dateStr))
      const avg = dayMoods.length > 0 
        ? dayMoods.reduce((acc, m) => acc + m.mood, 0) / dayMoods.length 
        : null
      data.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        avg,
        count: dayMoods.length
      })
    }
    return data
  }

  const weekData = getWeekData()
  const maxMoodCount = Math.max(...weekData.map(d => d.count), 1)

  return (
    <div className="mood-wrapper">
      <TopNavigation />

      <div className="mood-container fade-in">
        <div className="mood-header">
          <h1>Mood Tracker</h1>
          <p className="mood-subtitle">Track your emotional wellbeing</p>
        </div>

        {/* Stats */}
        <div className="mood-stats">
          <div className="mood-stat-card">
            <div className="stat-content">
              <span className="stat-value">{avgMood}</span>
              <span className="stat-label">Average Mood</span>
            </div>
            <TrendingUp className={`trend-icon ${trend >= 0 ? 'positive' : 'negative'}`} size={24} />
          </div>
          <div className="mood-stat-card">
            <div className="stat-content">
              <span className="stat-value">{totalMoods}</span>
              <span className="stat-label">Total Entries</span>
            </div>
            <Calendar className="stat-icon-calendar" size={24} />
          </div>
          <div className="mood-stat-card">
            <div className="stat-content">
              <span className={`stat-value ${trend >= 0 ? 'positive' : 'negative'}`}>
                {trend >= 0 ? '+' : ''}{trend}%
              </span>
              <span className="stat-label">Weekly Trend</span>
            </div>
          </div>
        </div>

        {/* Add Mood Form */}
        <div className="add-mood-section">
          <h2>How are you feeling?</h2>
          <form onSubmit={addMood} className="add-mood-form">
            <div className="mood-selector">
              {moodOptions.map((option) => {
                const Icon = option.icon
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setSelectedMood(option.value)}
                    className={`mood-option ${selectedMood === option.value ? 'selected' : ''}`}
                    style={{ 
                      '--mood-color': option.color,
                      '--selected-opacity': selectedMood === option.value ? 1 : 0.3
                    }}
                  >
                    <Icon size={32} />
                    <span className="mood-label">{option.label}</span>
                  </button>
                )
              })}
            </div>
            
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note (optional)..."
              className="mood-note"
              rows={3}
            />
            
            <button type="submit" className="add-mood-btn" disabled={!selectedMood}>
              <Plus size={20} />
              Log Mood
            </button>
          </form>
        </div>

        {/* Weekly Chart */}
        <div className="weekly-chart-section">
          <h2>This Week</h2>
          <div className="weekly-chart">
            {weekData.map((day, index) => (
              <div key={index} className="chart-bar">
                <div className="bar-container">
                  {day.avg !== null ? (
                    <div 
                      className="bar-fill"
                      style={{ 
                        height: `${(day.count / maxMoodCount) * 100}%`,
                        backgroundColor: moodOptions.find(m => m.value === Math.round(day.avg))?.color || '#888'
                      }}
                    />
                  ) : (
                    <div className="bar-empty" />
                  )}
                </div>
                <span className="bar-day">{day.day}</span>
                {day.avg !== null && (
                  <span className="bar-value" style={{ color: moodOptions.find(m => m.value === Math.round(day.avg))?.color }}>
                    {day.avg.toFixed(1)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="distribution-section">
          <h2>Mood Distribution</h2>
          <div className="distribution-bars">
            {moodOptions.reverse().map((option) => {
              const count = distribution[option.value]
              const percentage = totalMoods > 0 ? (count / totalMoods) * 100 : 0
              const Icon = option.icon
              return (
                <div key={option.value} className="distribution-row">
                  <Icon size={20} style={{ color: option.color }} />
                  <div className="distribution-bar-container">
                    <div 
                      className="distribution-bar-fill"
                      style={{ width: `${percentage}%`, backgroundColor: option.color }}
                    />
                  </div>
                  <span className="distribution-count">{count}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Recent Entries */}
        <div className="recent-entries-section">
          <h2>Recent Entries</h2>
          <div className="mood-entries">
            {moods.length === 0 ? (
              <div className="empty-state">
                <Calendar size={48} className="empty-icon" />
                <p>No mood entries yet. Log your first mood!</p>
              </div>
            ) : (
              moods.slice(0, 10).map(entry => {
                const moodOption = moodOptions.find(m => m.value === entry.mood)
                const Icon = moodOption?.icon
                return (
                  <div key={entry.id} className="mood-entry">
                    <div className="entry-mood" style={{ color: moodOption?.color }}>
                      <Icon size={28} />
                    </div>
                    <div className="entry-content">
                      <div className="entry-header">
                        <span className="entry-mood-label">{moodOption?.label}</span>
                        <span className="entry-date">
                          {new Date(entry.timestamp).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                      {entry.note && <p className="entry-note">{entry.note}</p>}
                    </div>
                    <button onClick={() => deleteMood(entry.id)} className="delete-entry-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MoodTrackerPage
