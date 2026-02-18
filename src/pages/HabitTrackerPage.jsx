import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Check, Flame, Trophy, Calendar } from 'lucide-react'
import './HabitTrackerPage.css'

export const HabitTrackerPage = () => {
  const [habits, setHabits] = useState(() => {
    const saved = localStorage.getItem('habits')
    return saved ? JSON.parse(saved) : []
  })
  const [newHabit, setNewHabit] = useState('')
  const [selectedDay, setSelectedDay] = useState(new Date().toISOString().split('T')[0])

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

  const getWeekDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const weekDates = getWeekDates()
  const totalCompletions = habits.reduce((sum, h) => sum + h.completedDates.length, 0)
  const bestStreak = habits.length > 0 ? Math.max(...habits.map(h => calculateStreak(h.completedDates))) : 0

  return (
    <div className="habit-wrapper">
      <TopNavigation />

      <div className="habit-container fade-in">
        <div className="habit-header">
          <h1>Habit Tracker</h1>
          <p className="habit-subtitle">Build consistency, one day at a time</p>
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
            <Trophy className="stat-icon trophy" size={24} />
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
        <form onSubmit={addHabit} className="add-habit-form">
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            placeholder="Enter a new habit..."
            className="habit-input"
          />
          <button type="submit" className="add-habit-btn">
            <Plus size={20} />
          </button>
        </form>

        {/* Habits List */}
        <div className="habits-list">
          {habits.length === 0 ? (
            <div className="empty-state">
              <Calendar size={48} className="empty-icon" />
              <p>No habits yet. Start building your first habit!</p>
            </div>
          ) : (
            habits.map(habit => {
              const streak = calculateStreak(habit.completedDates)
              return (
                <div key={habit.id} className="habit-item">
                  <div className="habit-info">
                    <h3 className="habit-name">{habit.name}</h3>
                    <div className="habit-streak">
                      <Flame size={14} className="flame-icon" />
                      <span>{streak} day streak</span>
                    </div>
                  </div>
                  
                  <div className="habit-week">
                    {weekDates.map(date => {
                      const isCompleted = habit.completedDates.includes(date)
                      const isToday = date === new Date().toISOString().split('T')[0]
                      const dayName = new Date(date).toLocaleDateString('en-US', { weekday: 'short' })
                      
                      return (
                        <div key={date} className="habit-day">
                          <span className={`day-name ${isToday ? 'today' : ''}`}>{dayName}</span>
                          <button
                            onClick={() => toggleHabit(habit.id, date)}
                            className={`habit-check ${isCompleted ? 'completed' : ''} ${isToday ? 'today' : ''}`}
                          >
                            {isCompleted && <Check size={16} />}
                          </button>
                        </div>
                      )
                    })}
                  </div>

                  <button onClick={() => deleteHabit(habit.id)} className="delete-habit-btn">
                    <Trash2 size={18} />
                  </button>
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default HabitTrackerPage
