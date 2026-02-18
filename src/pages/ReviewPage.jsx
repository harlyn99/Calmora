import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Calendar, TrendingUp, CheckCircle, BookOpen, Target, Flame, BarChart3 } from 'lucide-react'
import './ReviewPage.css'

export const ReviewPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [data, setData] = useState({
    todos: [],
    journalEntries: [],
    habits: [],
    moods: [],
    goals: [],
    focusSessions: []
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    setData({
      todos: JSON.parse(localStorage.getItem('todos') || '[]'),
      journalEntries: JSON.parse(localStorage.getItem('journalEntries') || '[]'),
      habits: JSON.parse(localStorage.getItem('habits') || '[]'),
      moods: JSON.parse(localStorage.getItem('moods') || '[]'),
      goals: JSON.parse(localStorage.getItem('goals') || '[]'),
      focusSessions: JSON.parse(localStorage.getItem('focusSessions') || '[]')
    })
  }

  const getDateRange = () => {
    const now = new Date()
    let startDate = new Date()

    switch (selectedPeriod) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      default:
        startDate.setDate(now.getDate() - 7)
    }

    return { startDate, endDate: now }
  }

  const filterByDate = (items, dateField = 'createdAt') => {
    const { startDate, endDate } = getDateRange()
    return items.filter(item => {
      const itemDate = new Date(item[dateField] || item.timestamp)
      return itemDate >= startDate && itemDate <= endDate
    })
  }

  const getFilteredData = () => {
    return {
      todos: filterByDate(data.todos),
      journalEntries: filterByDate(data.journalEntries),
      habits: data.habits,
      moods: filterByDate(data.moods, 'timestamp'),
      goals: data.goals,
      focusSessions: filterByDate(data.focusSessions)
    }
  }

  const filtered = getFilteredData()

  const completedTodos = filtered.todos.filter(t => t.completed).length
  const todoCompletionRate = filtered.todos.length > 0 
    ? Math.round((completedTodos / filtered.todos.length) * 100) 
    : 0

  const avgMood = filtered.moods.length > 0
    ? (filtered.moods.reduce((sum, m) => sum + m.mood, 0) / filtered.moods.length).toFixed(1)
    : 0

  const totalFocusMinutes = filtered.focusSessions.reduce((sum, s) => sum + (s.duration || 25), 0)
  const completedGoals = data.goals.filter(g => g.current >= g.target).length

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'week': return 'This Week'
      case 'month': return 'This Month'
      case 'year': return 'This Year'
      default: return 'This Week'
    }
  }

  return (
    <div className="review-wrapper">
      <TopNavigation />

      <div className="review-container fade-in">
        <div className="review-header">
          <h1>Review</h1>
          <p className="review-subtitle">Reflect on your progress and achievements</p>
        </div>

        {/* Period Selector */}
        <div className="period-selector">
          {['week', 'month', 'year'].map(period => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`period-btn ${selectedPeriod === period ? 'active' : ''}`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>

        <h2 className="section-label">{getPeriodLabel()}</h2>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="review-stat-card">
            <div className="stat-icon-wrapper">
              <CheckCircle size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{completedTodos}</span>
              <span className="stat-label">Tasks Completed</span>
              <span className="stat-detail">{todoCompletionRate}% completion rate</span>
            </div>
          </div>

          <div className="review-stat-card">
            <div className="stat-icon-wrapper mood">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{avgMood}</span>
              <span className="stat-label">Average Mood</span>
              <span className="stat-detail">{filtered.moods.length} mood entries</span>
            </div>
          </div>

          <div className="review-stat-card">
            <div className="stat-icon-wrapper journal">
              <BookOpen size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{filtered.journalEntries.length}</span>
              <span className="stat-label">Journal Entries</span>
              <span className="stat-detail">Reflections written</span>
            </div>
          </div>

          <div className="review-stat-card">
            <div className="stat-icon-wrapper focus">
              <Calendar size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{Math.round(totalFocusMinutes / 60)}</span>
              <span className="stat-label">Focus Hours</span>
              <span className="stat-detail">{totalFocusMinutes} minutes total</span>
            </div>
          </div>
        </div>

        {/* Goals Progress */}
        <div className="review-section">
          <div className="section-header">
            <Target size={20} />
            <h2>Goals Progress</h2>
          </div>
          {data.goals.length === 0 ? (
            <p className="empty-text">No goals set yet</p>
          ) : (
            <div className="goals-summary">
              {data.goals.map(goal => {
                const progress = Math.round((goal.current / goal.target) * 100)
                return (
                  <div key={goal.id} className="goal-summary-item">
                    <div className="goal-summary-info">
                      <span className="goal-summary-title">{goal.title}</span>
                      <span className="goal-summary-progress">{goal.current}/{goal.target} {goal.unit}</span>
                    </div>
                    <div className="goal-summary-bar">
                      <div className="goal-summary-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Habits Summary */}
        <div className="review-section">
          <div className="section-header">
            <Flame size={20} />
            <h2>Habits</h2>
          </div>
          {data.habits.length === 0 ? (
            <p className="empty-text">No habits tracked yet</p>
          ) : (
            <div className="habits-summary">
              {data.habits.map(habit => {
                const weekCompletions = habit.completedDates.filter(d => {
                  const date = new Date(d)
                  const weekAgo = new Date()
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return date >= weekAgo
                }).length
                return (
                  <div key={habit.id} className="habit-summary-item">
                    <span className="habit-summary-name">{habit.name}</span>
                    <div className="habit-summary-stats">
                      <span className="habit-completions">{weekCompletions} times this week</span>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Recent Journal Entries */}
        <div className="review-section">
          <div className="section-header">
            <BookOpen size={20} />
            <h2>Recent Journal Entries</h2>
          </div>
          {filtered.journalEntries.length === 0 ? (
            <p className="empty-text">No journal entries in this period</p>
          ) : (
            <div className="journal-summary">
              {filtered.journalEntries.slice(0, 5).map((entry, index) => (
                <div key={index} className="journal-summary-item">
                  <span className="journal-date">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <p className="journal-preview">{entry.content?.substring(0, 100) || 'No content'}...</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ReviewPage
