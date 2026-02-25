import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import PageWrapper from '../components/PageWrapper'
import { Plus, Trash2, Check, ChevronRight, Calendar, Clock, Zap, Brain, Dumbbell, BookOpen, Home, Heart, Shield, Coffee } from 'lucide-react'
import './PlannerPage.css'
import '../components/FlipPage.css'
import { formatDate } from '../utils/helpers'

// Energy-based schedule template
const dailyScheduleTemplate = [
  { id: 'morning', time: '06:00 - 07:00', title: 'Morning Routine', energy: 'HIGH', icon: '☀️', completed: false },
  { id: 'deep-learn', time: '07:00 - 09:00', title: 'Deep Learning', energy: 'HIGH', icon: '🧠', completed: false },
  { id: 'break1', time: '09:00 - 09:30', title: 'Break', energy: '-', icon: '☕', completed: false },
  { id: 'practice', time: '09:30 - 11:30', title: 'Practice Exercises', energy: 'MEDIUM', icon: '💪', completed: false },
  { id: 'chores', time: '11:30 - 12:30', title: 'Chores Block', energy: 'LOW', icon: '🧹', completed: false },
  { id: 'recovery', time: '12:30 - 13:30', title: 'Lunch + Recovery', energy: '-', icon: '🍽️', completed: false },
  { id: 'focus', time: '13:30 - 15:00', title: 'Protected Focus Time', energy: 'HIGH', icon: '🛡️', completed: false },
  { id: 'buffer1', time: '15:00 - 15:30', title: 'Buffer Time', energy: '-', icon: '🚶', completed: false },
  { id: 'review', time: '15:30 - 17:00', title: 'Review / Light Study', energy: 'LOW', icon: '📚', completed: false },
  { id: 'personal', time: '17:00 - 18:00', title: 'Personal Time', energy: '-', icon: '🏃', completed: false },
  { id: 'dinner', time: '18:00 - 19:00', title: 'Dinner', energy: '-', icon: '🍽️', completed: false },
  { id: 'goals', time: '19:00 - 20:00', title: 'Min. Daily Goals', energy: 'MEDIUM', icon: '📋', completed: false },
  { id: 'buffer2', time: '20:00 - 21:00', title: 'Flexible Buffer', energy: '-', icon: '🎒', completed: false },
  { id: 'winddown', time: '21:00 - 22:00', title: 'Wind Down', energy: 'LOW', icon: '🌙', completed: false },
]

const energyColors = {
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  '-': 'neutral'
}

const energyDescriptions = {
  HIGH: 'Deep learning, complex tasks, new concepts',
  MEDIUM: 'Practice exercises, problem-solving',
  LOW: 'Review, flashcards, light study, organizing'
}

export const PlannerPage = () => {
  const [plans, setPlans] = useState(() => JSON.parse(localStorage.getItem('dailyPlans') || '[]'))
  const [schedule, setSchedule] = useState(() => {
    const saved = localStorage.getItem('dailySchedule')
    if (saved) {
      const parsed = JSON.parse(saved)
      const today = new Date().toDateString()
      if (parsed.date !== today) {
        // Reset schedule for new day
        return { date: today, tasks: dailyScheduleTemplate.map(t => ({ ...t, completed: false })) }
      }
      return parsed
    }
    return { date: new Date().toDateString(), tasks: dailyScheduleTemplate.map(t => ({ ...t, completed: false })) }
  })
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [selectedTask, setSelectedTask] = useState(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [totalCoins, setTotalCoins] = useState(() => parseInt(localStorage.getItem('petCoins') || '150'))
  const [showCoinReward, setShowCoinReward] = useState(false)
  const [lastCoinReward, setLastCoinReward] = useState(0)

  useEffect(() => {
    localStorage.setItem('dailyPlans', JSON.stringify(plans))
  }, [plans])

  useEffect(() => {
    localStorage.setItem('dailySchedule', JSON.stringify(schedule))
  }, [schedule])

  useEffect(() => {
    // Sync coins from localStorage
    const coins = parseInt(localStorage.getItem('petCoins') || '150')
    setTotalCoins(coins)
  }, [])

  const addPlan = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const plan = {
      id: Date.now(),
      title: input,
      priority,
      completed: false,
      createdAt: new Date().toISOString()
    }
    setPlans([...plans, plan])
    setInput('')
  }

  const togglePlan = (id) => {
    setPlans(plans.map(p => p.id === id ? { ...p, completed: !p.completed } : p))
  }

  const deletePlan = (id) => {
    setPlans(plans.filter(p => p.id !== id))
  }

  const toggleScheduleTask = (id) => {
    const task = schedule.tasks.find(t => t.id === id)
    if (!task || task.completed) {
      // Toggle off - no coin change
      setSchedule({
        ...schedule,
        tasks: schedule.tasks.map(t => t.id === id ? { ...t, completed: false } : t)
      })
      return
    }
    
    // Toggle on - award coins based on task energy
    const coinRewards = {
      HIGH: 15,
      MEDIUM: 10,
      LOW: 5,
      '-': 3
    }
    const reward = coinRewards[task.energy] || 5
    
    const newCoins = totalCoins + reward
    setTotalCoins(newCoins)
    localStorage.setItem('petCoins', newCoins.toString())
    setLastCoinReward(reward)
    setShowCoinReward(true)
    setTimeout(() => setShowCoinReward(false), 2000)
    
    setSchedule({
      ...schedule,
      tasks: schedule.tasks.map(t => t.id === id ? { ...t, completed: true } : t)
    })
  }

  const openTaskCalendar = (task) => {
    setSelectedTask(task)
    setShowCalendar(true)
  }

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
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1))
  }

  const importantPlans = plans.filter(p => p.priority === 'high' && !p.completed)
  const activePlans = plans.filter(p => !p.completed && p.priority !== 'high')
  const completedPlans = plans.filter(p => p.completed)
  
  const completedScheduleTasks = schedule.tasks.filter(t => t.completed).length
  const totalScheduleTasks = schedule.tasks.length
  const progressPercent = Math.round((completedScheduleTasks / totalScheduleTasks) * 100)

  return (
    <div className="planner-wrapper">
      <TopNavigation />

      <PageWrapper sticker={'🗓️ Planner'}>
        <div className="planner-container fade-in">
        <div className="planner-header">
          <h1>Today's Plan</h1>
          <p>{formatDate(new Date())}</p>
        </div>
      </PageWrapper>

        {/* Coin Display */}
        <div className="coin-display neomorph-md">
          <div className="coin-icon">
            <span>🪙</span>
          </div>
          <div className="coin-info">
            <span className="coin-label">Pet Coins</span>
            <span className="coin-amount">{totalCoins}</span>
          </div>
          <div className="coin-tip">Complete tasks to earn coins for your pet!</div>
        </div>

        {/* Daily Progress */}
        <div className="daily-progress neomorph-md">
          <div className="progress-header">
            <span>Daily Completion</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <div className="progress-stats">
            <span>{completedScheduleTasks} of {totalScheduleTasks} blocks completed</span>
          </div>
        </div>

        {/* Energy Guide */}
        <div className="energy-guide neomorph-md">
          <h3>⚡ Energy-Based System</h3>
          <div className="energy-legend">
            <div className="energy-item high">
              <Zap size={16} className="icon icon-sm" />
              <span><strong>HIGH</strong> → Deep learning, complex tasks</span>
            </div>
            <div className="energy-item medium">
              <Dumbbell size={16} className="icon icon-sm" />
              <span><strong>MEDIUM</strong> → Practice exercises</span>
            </div>
            <div className="energy-item low">
              <BookOpen size={16} className="icon icon-sm" />
              <span><strong>LOW</strong> → Review, light study</span>
            </div>
          </div>
        </div>

        {/* Time Block Schedule */}
        <div className="schedule-section">
          <h3 className="section-header">
            <Clock size={18} className="icon icon-sm" /> Time Block Schedule
          </h3>
          <div className="schedule-grid">
            {schedule.tasks.map(task => (
              <div 
                key={task.id} 
                className={`schedule-item neomorph-sm ${energyColors[task.energy]} ${task.completed ? 'completed' : ''} flip-card`}
                onClick={() => openTaskCalendar(task)}
              >
                <div className="schedule-time">{task.time}</div>
                <div className="schedule-content">
                  <span className="schedule-icon">{task.icon}</span>
                  <div className="schedule-info">
                    <span className="schedule-title">{task.title}</span>
                    <span className={`schedule-energy ${task.energy.toLowerCase()}`}>{task.energy}</span>
                  </div>
                </div>
                <div style={{display:'flex', alignItems:'center', gap:8}}>
                  <button
                    className={`schedule-complete-btn ${task.completed ? 'done' : ''}`}
                    onClick={(e) => { e.stopPropagation(); toggleScheduleTask(task.id) }}
                    title="Toggle completion"
                  >
                    <Check size={14} className="icon icon-sm" />
                  </button>
                  <button 
                    className="schedule-calendar-btn"
                    onClick={(e) => { e.stopPropagation(); openTaskCalendar(task) }}
                    title="Open details"
                  >
                    <Calendar size={14} className="icon icon-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Plan Form */}
        <form onSubmit={addPlan} className="add-plan-form neomorph-md">
          <div className="form-content">
            <input
              type="text"
              placeholder="What's your main focus for today?"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="plan-input"
            />
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="priority-select"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button type="submit" className="neomorph-button primary">
            <Plus size={18} /> Add Task
          </button>
        </form>

        {/* Plans View */}
        <div className="plans-view">
          {/* Important Plans */}
          {importantPlans.length > 0 && (
            <div className="plan-section">
              <h3 className="section-header">
                <span className="priority-badge high">⚡</span> Important Today
              </h3>
              <div className="plans-list">
                {importantPlans.map(plan => (
                  <div key={plan.id} className="plan-item neomorph-sm high">
                    <button
                      className="plan-checkbox"
                      onClick={() => togglePlan(plan.id)}
                    >
                      <Check size={18} />
                    </button>
                    <span className="plan-title">{plan.title}</span>
                    <button
                      className="plan-delete"
                      onClick={() => deletePlan(plan.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Normal Plans */}
          {activePlans.length > 0 && (
            <div className="plan-section">
              <h3 className="section-header">
                <span className="priority-badge medium">•••</span> Other Tasks
              </h3>
              <div className="plans-list">
                {activePlans.map(plan => (
                  <div key={plan.id} className="plan-item neomorph-sm">
                    <button
                      className="plan-checkbox"
                      onClick={() => togglePlan(plan.id)}
                    >
                      <Check size={18} />
                    </button>
                    <span className="plan-title">{plan.title}</span>
                    <button
                      className="plan-delete"
                      onClick={() => deletePlan(plan.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed */}
          {completedPlans.length > 0 && (
            <div className="plan-section">
              <h3 className="section-header">
                <span className="priority-badge completed">✓</span> Completed
              </h3>
              <div className="plans-list">
                {completedPlans.map(plan => (
                  <div key={plan.id} className="plan-item neomorph-sm completed">
                    <button
                      className="plan-checkbox checked"
                      onClick={() => togglePlan(plan.id)}
                    >
                      <Check size={18} />
                    </button>
                    <span className="plan-title">{plan.title}</span>
                    <button
                      className="plan-delete"
                      onClick={() => deletePlan(plan.id)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {plans.length === 0 && (
            <div className="empty-planner neomorph-md">
              <p>📝 No plans yet. Create one to stay focused today!</p>
            </div>
          )}
        </div>

        {/* Daily Tip */}
        <div className="planner-tip neomorph-md">
          <p>💡 Tip: Match tasks to your energy level. HIGH energy = deep work, LOW energy = review.</p>
        </div>
      </div>

      {/* Task Calendar Modal */}
      {showCalendar && selectedTask && (
        <div className="modal-overlay" onClick={() => setShowCalendar(false)}>
          <div className="calendar-modal neomorph-md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <span className="modal-icon">{selectedTask.icon}</span>
                <div>
                  <h3>{selectedTask.title}</h3>
                  <span className={`energy-label ${selectedTask.energy.toLowerCase()}`}>{selectedTask.energy} Energy</span>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowCalendar(false)}>×</button>
            </div>

            <div className="modal-content">
              <p className="task-description">{energyDescriptions[selectedTask.energy] || 'Break / Recovery time'}</p>
              <p className="task-time">⏰ {selectedTask.time}</p>
              
              <div className="calendar-nav">
                <button onClick={() => navigateMonth(-1)}>◀</button>
                <span>{currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                <button onClick={() => navigateMonth(1)}>▶</button>
              </div>

              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar-day-header">{day}</div>
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth).startingDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-day empty" />
                ))}
                {Array.from({ length: getDaysInMonth(currentMonth).daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const isToday = new Date().toDateString() === new Date(getDaysInMonth(currentMonth).year, getDaysInMonth(currentMonth).month, day).toDateString()
                  return (
                    <div 
                      key={day} 
                      className={`calendar-day ${isToday ? 'today' : ''}`}
                    >
                      {day}
                      {isToday && <span className="today-dot" />}
                    </div>
                  )
                })}
              </div>

              <div className="task-completion">
                <h4>Completion History</h4>
                <div className="completion-stats">
                  <div className="stat">
                    <span className="stat-label">Streak</span>
                    <span className="stat-value">🔥 3 days</span>
                  </div>
                  <div className="stat">
                    <span className="stat-label">This Week</span>
                    <span className="stat-value">4/7 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Coin Reward Popup */}
      {showCoinReward && (
        <div className="reward-popup">
          <div className="reward-content">
            <span className="reward-emoji">🪙</span>
            <span className="reward-text">+{lastCoinReward} Coins!</span>
          </div>
        </div>
      )}
    </div>
  )
}
