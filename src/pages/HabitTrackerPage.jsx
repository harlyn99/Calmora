import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Check, Flame, Trophy, Calendar, ChevronLeft, ChevronRight, Target } from 'lucide-react'
import './HabitTrackerPage.css'

export const HabitTrackerPage = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })
  const [newHabit, setNewHabit] = useState('')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('week')

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits))
  }, [habits])

  const addHabit = (e) => {
    e.preventDefault()
    if (!newHabit.trim()) return

    const habit = {
      id: Date.now(),
      name: newHabit,
      completedDates: [],
      createdAt: new Date().toISOString()
    }
    setHabits([...habits, habit])
    setNewHabit('')
  }

  const toggleHabit = (habitId, date) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        const dates = habit.completedDates.includes(date)
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date]
        return { ...habit, completedDates: dates }
      }
      return habit
    }))
  }

  const deleteHabit = (habitId) => {
    setHabits(habits.filter(h => h.id !== habitId))
  }

  const calculateStreak = (completedDates) => {
    if (!completedDates.length) return 0

    const sorted = [...completedDates].sort((a, b) => new Date(b) - new Date(a))
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

    let streak = 0
    let currentDate = sorted.includes(today) ? today : sorted.includes(yesterday) ? yesterday : null

    if (!currentDate) return 0

    for (let i = 0; i < 365; i++) {
      if (sorted.includes(currentDate)) {
        streak++
        currentDate = new Date(new Date(currentDate).getTime() - 86400000).toISOString().split('T')[0]
      } else {
        break
      }
    }
    return streak
  }

  // Calendar helpers
  const getDaysInMonth = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()
    return { daysInMonth, startingDay, year, month }
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setSelectedDate(newDate)
  }

  const getWeekDates = () => {
    const dates = []
    const today = new Date(selectedDate)
    const dayOfWeek = today.getDay()
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - dayOfWeek)
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek)
      date.setDate(startOfWeek.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(selectedDate)
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]
  const weekDates = getWeekDates()
  
  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0)
  const bestStreak = habits.length > 0 ? Math.max(...habits.map(h => calculateStreak(h.completedDates))) : 0

  const getCompletionRate = (habit) => {
    if (!habit.completedDates.length) return 0
    const thisMonth = habit.completedDates.filter(d => d.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`)).length
    return Math.round((thisMonth / daysInMonth) * 100)
  }

  return (
    <div className="habit-wrapper">
      <TopNavigation />

      <div className="habit-container fade-in">
        <div className="habit-header">
          <div className="header-left">
            <h1>Habit Tracker</h1>
            <p className="habit-subtitle">Build consistency, one day at a time</p>
          </div>
          
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'week' ? 'active' : ''}`}
              onClick={() => setViewMode('week')}
            >
              <Calendar size={18} />
              <span>Week</span>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'month' ? 'active' : ''}`}
              onClick={() => setViewMode('month')}
            >
              <Calendar size={18} />
              <span>Month</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="habit-stats">
          <div className="habit-stat-card">
            <Flame className="stat-icon flame" size={24} />
            <div className="stat-info">
              <span className="stat-value">{bestStreak}</span>
              <span className="stat-label">Best Streak</span>
            </div>
          </div>
          <div className="habit-stat-card">
            <Target className="stat-icon target" size={24} />
            <div className="stat-info">
              <span className="stat-value">{habits.length}</span>
              <span className="stat-label">Active Habits</span>
            </div>
          </div>
          <div className="habit-stat-card">
            <Check className="stat-icon check" size={24} />
            <div className="stat-info">
              <span className="stat-value">{totalCompletions}</span>
              <span className="stat-label">Total Completions</span>
            </div>
          </div>
        </div>

        {/* Add Habit Form */}
        <form onSubmit={addHabit} className="add-habit-form neomorph-md">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Enter a new habit..."
            className="habit-input"
          />
          <button type="submit" className="add-habit-btn neomorph-button primary">
            <Plus size={20} />
            <span>Add Habit</span>
          </button>
        </form>

        {/* Week View */}
        {viewMode === 'week' && (
          <div className="week-view">
            <div className="week-header">
              <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                <ChevronLeft size={20} />
              </button>
              <h2 className="week-title">
                {new Date(weekDates[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - 
                {' '}
                {new Date(weekDates[6]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </h2>
              <button className="nav-btn" onClick={() => navigateMonth(1)}>
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="habits-week-list">
              {habits.length === 0 ? (
                <div className="empty-state neomorph-md">
                  <Calendar size={48} className="empty-icon" />
                  <p>No habits yet. Start building your first habit!</p>
                </div>
              ) : (
                habits.map(habit => {
                  const streak = calculateStreak(habit.completedDates)
                  const completionRate = getCompletionRate(habit)
                  
                  return (
                    <div key={habit.id} className="habit-week-item neomorph-md">
                      <div className="habit-week-header">
                        <div className="habit-week-info">
                          <h3 className="habit-week-name">{habit.name}</h3>
                          <div className="habit-week-stats">
                            <span className="streak-badge">
                              <Flame size={14} />
                              {streak} day streak
                            </span>
                            <span className="rate-badge">
                              <Target size={14} />
                              {completionRate}% this month
                            </span>
                          </div>
                        </div>
                        <button onClick={() => deleteHabit(habit.id)} className="delete-habit-btn">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="habit-week-days">
                        {weekDates.map(date => {
                          const isCompleted = habit.completedDates.includes(date)
                          const isToday = date === todayStr
                          const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
                          const dayNum = new Date(date).getDate()

                          return (
                            <div key={date} className="habit-week-day">
                              <span className={`day-label ${isToday ? 'today' : ''}`}>
                                {dayName}
                              </span>
                              <span className={`day-number ${isToday ? 'today' : ''}`}>
                                {dayNum}
                              </span>
                              <button
                                onClick={() => toggleHabit(habit.id, date)}
                                className={`habit-check-btn ${isCompleted ? 'completed' : ''} ${isToday ? 'today-highlight' : ''}`}
                              >
                                {isCompleted ? <Check size={20} /> : null}
                              </button>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}

        {/* Month View */}
        {viewMode === 'month' && (
          <div className="month-view neomorph-md">
            <div className="calendar-header">
              <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                <ChevronLeft size={20} />
              </button>
              <h2 className="calendar-title">
                {new Date(year, month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button className="nav-btn" onClick={() => navigateMonth(1)}>
                <ChevronRight size={20} />
              </button>
              <button 
                className="today-btn"
                onClick={() => setSelectedDate(today)}
              >
                Today
              </button>
            </div>

            <div className="habits-month-list">
              {habits.length === 0 ? (
                <div className="empty-state">
                  <Calendar size={48} className="empty-icon" />
                  <p>No habits yet. Start building your first habit!</p>
                </div>
              ) : (
                habits.map(habit => {
                  const streak = calculateStreak(habit.completedDates)
                  const completionRate = getCompletionRate(habit)
                  
                  return (
                    <div key={habit.id} className="habit-month-item">
                      <div className="habit-month-header">
                        <div className="habit-month-info">
                          <h3 className="habit-month-name">{habit.name}</h3>
                          <div className="habit-month-stats">
                            <span className="streak-badge">
                              <Flame size={14} />
                              {streak} days
                            </span>
                            <span className="rate-badge">
                              <Target size={14} />
                              {completionRate}% completion
                            </span>
                          </div>
                        </div>
                        <button onClick={() => deleteHabit(habit.id)} className="delete-habit-btn">
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="habit-calendar-grid">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                          <div key={`header-${i}`} className="calendar-day-header">{day}</div>
                        ))}
                        
                        {Array.from({ length: startingDay }).map((_, i) => (
                          <div key={`empty-${i}`} className="calendar-cell empty"></div>
                        ))}
                        
                        {Array.from({ length: daysInMonth }).map((_, i) => {
                          const day = i + 1
                          const currentDate = new Date(year, month, day)
                          const dateStr = currentDate.toISOString().split('T')[0]
                          const isCompleted = habit.completedDates.includes(dateStr)
                          const isToday = dateStr === todayStr
                          
                          return (
                            <button
                              key={day}
                              onClick={() => toggleHabit(habit.id, dateStr)}
                              className={`habit-calendar-cell ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}`}
                            >
                              <span className="cell-day">{day}</span>
                              {isCompleted && <Check size={12} className="cell-check" />}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HabitTrackerPage
