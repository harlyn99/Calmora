import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import PageWrapper from '../components/PageWrapper'
import { 
  Plus, Trash2, Check, Calendar, ChevronRight, ChevronLeft, 
  Clock, Zap, Edit2, X, Save, RotateCcw, Trophy, Flame, Star,
  Dumbbell, Brain, BookOpen, Target, Users, Laptop, GraduationCap,
  Briefcase, Palette, Gamepad2, UserCheck, Heart, Coffee,
  Sun, Moon, Calendar as CalendarIcon, List, BarChart3, Coins
} from 'lucide-react'
import { useIconTheme } from '../contexts/IconThemeContext'
import './SchedulePage.css'
import { formatDate } from '../utils/helpers'

const DAYS_OF_WEEK = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' }
]

// Icon mapping based on task theme/category - ALL using consistent colors
const ICON_MAP = {
  exercise: { icon: Dumbbell, theme: 'success' },
  fitness: { icon: Dumbbell, theme: 'success' },
  run: { icon: Dumbbell, theme: 'success' },
  work: { icon: Briefcase, theme: 'primary' },
  deep: { icon: Brain, theme: 'primary' },
  focus: { icon: Brain, theme: 'primary' },
  learn: { icon: GraduationCap, theme: 'info' },
  study: { icon: BookOpen, theme: 'info' },
  review: { icon: BarChart3, theme: 'accent' },
  meeting: { icon: Users, theme: 'info' },
  team: { icon: Users, theme: 'info' },
  coding: { icon: Laptop, theme: 'success' },
  project: { icon: Laptop, theme: 'success' },
  freelance: { icon: Briefcase, theme: 'primary' },
  language: { icon: BookOpen, theme: 'info' },
  personal: { icon: Palette, theme: 'warning' },
  relax: { icon: Gamepad2, theme: 'warning' },
  recharge: { icon: Coffee, theme: 'warning' },
  plan: { icon: CalendarIcon, theme: 'info' },
  selfcare: { icon: Heart, theme: 'danger' },
  family: { icon: Users, theme: 'info' },
  morning: { icon: Sun, theme: 'warning' },
  routine: { icon: List, theme: 'info' },
  skills: { icon: Target, theme: 'accent' },
  practice: { icon: Target, theme: 'accent' },
  default: { icon: Target, theme: 'primary' }
}

const getIconForTask = (title) => {
  const lowerTitle = title.toLowerCase()
  for (const [key, value] of Object.entries(ICON_MAP)) {
    if (lowerTitle.includes(key)) {
      return value
    }
  }
  return ICON_MAP.default
}

const DEFAULT_TASKS = {
  monday: [
    { id: 'm1', title: 'Morning Exercise', iconTheme: 'exercise', coinReward: 10, completed: false },
    { id: 'm2', title: 'Deep Work Session', iconTheme: 'deep', coinReward: 15, completed: false }
  ],
  tuesday: [
    { id: 't1', title: 'Study Session', iconTheme: 'study', coinReward: 10, completed: false },
    { id: 't2', title: 'Team Meeting', iconTheme: 'meeting', coinReward: 10, completed: false }
  ],
  wednesday: [
    { id: 'w1', title: 'Coding Project', iconTheme: 'coding', coinReward: 15, completed: false },
    { id: 'w2', title: 'Review Tasks', iconTheme: 'review', coinReward: 10, completed: false },
    { id: 'w3', title: 'Exercise', iconTheme: 'exercise', coinReward: 10, completed: false }
  ],
  thursday: [
    { id: 'th1', title: 'Learning Day', iconTheme: 'learn', coinReward: 10, completed: false },
    { id: 'th2', title: 'Practice Skills', iconTheme: 'skills', coinReward: 10, completed: false }
  ],
  friday: [
    { id: 'f1', title: 'Freelance Work', iconTheme: 'freelance', coinReward: 15, completed: false },
    { id: 'f2', title: 'Language Learning', iconTheme: 'language', coinReward: 10, completed: false },
    { id: 'f3', title: 'Weekly Review', iconTheme: 'review', coinReward: 10, completed: false }
  ],
  saturday: [
    { id: 's1', title: 'Personal Projects', iconTheme: 'personal', coinReward: 10, completed: false },
    { id: 's2', title: 'Relax & Recharge', iconTheme: 'relax', coinReward: 5, completed: false }
  ],
  sunday: [
    { id: 'su1', title: 'Plan Next Week', iconTheme: 'plan', coinReward: 10, completed: false },
    { id: 'su2', title: 'Self Care', iconTheme: 'selfcare', coinReward: 10, completed: false },
    { id: 'su3', title: 'Family Time', iconTheme: 'family', coinReward: 10, completed: false }
  ]
}

export const SchedulePage = () => {
  const { getIconColor } = useIconTheme()
  // Weekly schedule state
  const [weeklySchedule, setWeeklySchedule] = useState(() => {
    const saved = localStorage.getItem('weeklySchedule')
    if (saved) {
      return JSON.parse(saved)
    }
    return JSON.parse(JSON.stringify(DEFAULT_TASKS))
  })

  // Completion history: { 'YYYY-MM-DD': { taskId: true, ... } }
  const [completionHistory, setCompletionHistory] = useState(() => {
    const saved = localStorage.getItem('scheduleCompletionHistory')
    return saved ? JSON.parse(saved) : {}
  })

  // UI states
  const [selectedDay, setSelectedDay] = useState(() => {
    const dayIndex = new Date().getDay()
    return DAYS_OF_WEEK[dayIndex === 0 ? 6 : dayIndex - 1].key
  })
  const [editingTask, setEditingTask] = useState(null)
  const [newTaskTitle, setNewTaskTitle] = useState('')
  const [newTaskIconTheme, setNewTaskIconTheme] = useState('default')
  const [newTaskCoinReward, setNewTaskCoinReward] = useState(10)
  const [showThemePicker, setShowThemePicker] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [totalCoins, setTotalCoins] = useState(() => parseInt(localStorage.getItem('petCoins') || '150'))
  const [showCoinReward, setShowCoinReward] = useState(false)
  const [lastCoinReward, setLastCoinReward] = useState(0)
  const [streak, setStreak] = useState(0)

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('weeklySchedule', JSON.stringify(weeklySchedule))
  }, [weeklySchedule])

  useEffect(() => {
    localStorage.setItem('scheduleCompletionHistory', JSON.stringify(completionHistory))
  }, [completionHistory])

  useEffect(() => {
    const coins = parseInt(localStorage.getItem('petCoins') || '150')
    setTotalCoins(coins)
  }, [])

  // Calculate streak
  useEffect(() => {
    const today = new Date()
    let currentStreak = 0
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayKey = DAYS_OF_WEEK[date.getDay() === 0 ? 6 : date.getDay() - 1].key
      const dayTasks = weeklySchedule[dayKey] || []
      const completedOnDate = completionHistory[dateStr] || {}
      
      // Check if at least one task was completed on this day
      const hasCompletedTask = dayTasks.some(task => completedOnDate[task.id])
      
      if (hasCompletedTask || i === 0) {
        if (i === 0) currentStreak = 1
        else if (hasCompletedTask) currentStreak++
        else break
      } else if (i > 0) {
        break
      }
    }
    setStreak(currentStreak)
  }, [completionHistory, weeklySchedule])

  // Get today's tasks
  const getTodayKey = () => {
    const dayIndex = new Date().getDay()
    return DAYS_OF_WEEK[dayIndex === 0 ? 6 : dayIndex - 1].key
  }

  const todayKey = getTodayKey()
  const todayTasks = weeklySchedule[todayKey] || []
  const selectedDayTasks = weeklySchedule[selectedDay] || []

  // Calculate completion for selected day
  const getCompletionForDay = (dayKey) => {
    const today = new Date()
    const todayStr = today.toISOString().split('T')[0]
    const completedToday = completionHistory[todayStr] || {}
    const tasks = weeklySchedule[dayKey] || []
    const completed = tasks.filter(t => completedToday[t.id]).length
    return { completed, total: tasks.length, percent: tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0 }
  }

  const todayCompletion = getCompletionForDay(todayKey)

  const addTask = (e) => {
    e.preventDefault()
    if (!newTaskTitle.trim()) return

    const newTask = {
      id: Date.now().toString(),
      title: newTaskTitle,
      iconTheme: newTaskIconTheme,
      coinReward: newTaskCoinReward,
      completed: false
    }

    setWeeklySchedule({
      ...weeklySchedule,
      [selectedDay]: [...(weeklySchedule[selectedDay] || []), newTask]
    })
    setNewTaskTitle('')
    setNewTaskIconTheme('default')
    setNewTaskCoinReward(10)
    setShowThemePicker(false)
  }

  const deleteTask = (taskId) => {
    setWeeklySchedule({
      ...weeklySchedule,
      [selectedDay]: weeklySchedule[selectedDay].filter(t => t.id !== taskId)
    })
  }

  const toggleTaskCompletion = (taskId) => {
    const todayStr = new Date().toISOString().split('T')[0]
    const task = weeklySchedule[selectedDay].find(t => t.id === taskId)
    
    const currentHistory = completionHistory[todayStr] || {}
    const isCompleting = !currentHistory[taskId]

    // If completing, award coins
    if (isCompleting) {
      const reward = task.coinReward || 10
      const newCoins = totalCoins + reward
      setTotalCoins(newCoins)
      localStorage.setItem('petCoins', newCoins.toString())
      setLastCoinReward(reward)
      setShowCoinReward(true)
      setTimeout(() => setShowCoinReward(false), 2500)
    }

    setCompletionHistory({
      ...completionHistory,
      [todayStr]: {
        ...currentHistory,
        [taskId]: isCompleting
      }
    })
  }

  const startEditingTask = (task) => {
    setEditingTask(task)
    setNewTaskTitle(task.title)
    setNewTaskIconTheme(task.iconTheme || 'default')
    setNewTaskCoinReward(task.coinReward || 10)
  }

  const saveEditedTask = () => {
    if (!newTaskTitle.trim() || !editingTask) return

    setWeeklySchedule({
      ...weeklySchedule,
      [selectedDay]: weeklySchedule[selectedDay].map(t => 
        t.id === editingTask.id 
          ? { ...t, title: newTaskTitle, iconTheme: newTaskIconTheme, coinReward: newTaskCoinReward }
          : t
      )
    })
    setEditingTask(null)
    setNewTaskTitle('')
    setNewTaskIconTheme('default')
    setNewTaskCoinReward(10)
  }

  const cancelEditing = () => {
    setEditingTask(null)
    setNewTaskTitle('')
    setNewTaskIconTheme('default')
    setNewTaskCoinReward(10)
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
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1))
  }

  const getCompletionRateForDay = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    const dayIndex = date.getDay()
    const dayKey = DAYS_OF_WEEK[dayIndex === 0 ? 6 : dayIndex - 1].key
    const tasks = weeklySchedule[dayKey] || []
    const completed = completionHistory[dateStr] || {}
    
    if (tasks.length === 0) return 0
    const completedCount = tasks.filter(t => completed[t.id]).length
    return Math.round((completedCount / tasks.length) * 100)
  }

  const getCompletionColor = (rate) => {
    if (rate === 100) return '#4CAF50'
    if (rate >= 70) return '#8BC34A'
    if (rate >= 40) return '#FFC107'
    if (rate > 0) return '#FF9800'
    return '#e0e0e0'
  }

  return (
    <div className="schedule-wrapper">
      <TopNavigation />

      <PageWrapper sticker={'📅 Schedule'}>
        <div className="schedule-container fade-in">
          {/* Header Stats */}
          <div className="schedule-stats">
            <div className="stat-card neomorph-md">
              <div className="stat-icon">
                <Coins size={28} style={{ color: getIconColor('warning') }} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Pet Coins</span>
                <span className="stat-value">{totalCoins}</span>
              </div>
            </div>
            <div className="stat-card neomorph-md">
              <div className="stat-icon">
                <Flame size={28} style={{ color: getIconColor('danger') }} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Streak</span>
                <span className="stat-value">{streak} days</span>
              </div>
            </div>
            <div className="stat-card neomorph-md">
              <div className="stat-icon">
                <Check size={28} style={{ color: getIconColor('success') }} />
              </div>
              <div className="stat-info">
                <span className="stat-label">Today</span>
                <span className="stat-value">{todayCompletion.completed}/{todayCompletion.total}</span>
              </div>
            </div>
          </div>

          {/* Day Selector */}
          <div className="day-selector neomorph-md">
            {DAYS_OF_WEEK.map(day => {
              const completion = getCompletionForDay(day.key)
              const isToday = day.key === todayKey
              return (
                <button
                  key={day.key}
                  className={`day-btn ${selectedDay === day.key ? 'active' : ''} ${isToday ? 'today' : ''}`}
                  onClick={() => setSelectedDay(day.key)}
                >
                  <span className="day-short">{day.short}</span>
                  {isToday && <span className="today-indicator">•</span>}
                  <div 
                    className="completion-ring" 
                    style={{ 
                      background: `conic-gradient(${getCompletionColor(completion.percent)} ${completion.percent}%, #e0e0e0 ${completion.percent}%)`
                    }}
                  >
                    <div className="ring-inner" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Today's Tasks (if viewing today) */}
          {selectedDay === todayKey && (
            <div className="today-section">
              <div className="section-header">
                <h2>Today's Schedule</h2>
                <p>{formatDate(new Date())}</p>
              </div>

              <div className="progress-card neomorph-md">
                <div className="progress-header">
                  <span>Daily Progress</span>
                  <span>{todayCompletion.percent}%</span>
                </div>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${todayCompletion.percent}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Tasks List */}
          <div className="tasks-section">
            <div className="section-header">
              <h3>
                {DAYS_OF_WEEK.find(d => d.key === selectedDay)?.label} Tasks
              </h3>
            </div>

            {selectedDayTasks.length === 0 ? (
              <div className="empty-state neomorph-md">
                <p className="empty-emoji">✨</p>
                <p>No tasks scheduled for {DAYS_OF_WEEK.find(d => d.key === selectedDay)?.label}</p>
                <p className="empty-hint">Add tasks to create your weekly routine!</p>
              </div>
            ) : (
              <div className="tasks-list">
                {selectedDayTasks.map((task, index) => {
                  const todayStr = new Date().toISOString().split('T')[0]
                  const isCompleted = (completionHistory[todayStr] || {})[task.id]
                  const isEditing = editingTask?.id === task.id

                  return (
                    <div 
                      key={task.id} 
                      className={`task-card neomorph-sm ${isCompleted ? 'completed' : ''} ${isEditing ? 'editing' : ''}`}
                    >
                      {isEditing ? (
                        <div className="task-edit-form">
                          <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            className="task-edit-input"
                            placeholder="Task title"
                            autoFocus
                          />
                          <div className="task-edit-actions">
                            <button
                              type="button"
                              className="edit-btn-save"
                              onClick={saveEditedTask}
                            >
                              <Save size={16} />
                            </button>
                            <button
                              type="button"
                              className="edit-btn-cancel"
                              onClick={cancelEditing}
                            >
                              <X size={16} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="task-left">
                            <button
                              className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
                              onClick={() => toggleTaskCompletion(task.id)}
                            >
                              {isCompleted && <Check size={18} />}
                            </button>
                            <div className="task-icon-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              {(() => {
                                const iconData = getIconForTask(task.title)
                                const IconComponent = iconData.icon
                                const iconColor = getIconColor(iconData.theme)
                                return (
                                  <>
                                    <IconComponent 
                                      size={24} 
                                      style={{ color: iconColor, minWidth: '24px' }} 
                                      className={`task-icon-${iconData.theme}`}
                                    />
                                    <span className={`task-title ${isCompleted ? 'completed' : ''}`}>{task.title}</span>
                                  </>
                                )
                              })()}
                            </div>
                            <span className="task-coin-reward">+{task.coinReward || 10}</span>
                          </div>
                          <div className="task-actions">
                            <button
                              className="task-action-btn edit"
                              onClick={() => startEditingTask(task)}
                              title="Edit task"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              className="task-action-btn delete"
                              onClick={() => deleteTask(task.id)}
                              title="Delete task"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Add Task Form */}
          <form onSubmit={addTask} className="add-task-form neomorph-md">
            <div className="form-content">
              <button
                type="button"
                className="theme-picker-btn"
                onClick={() => setShowThemePicker(!showThemePicker)}
                title="Select icon theme"
              >
                {(() => {
                  const iconData = getIconForTask(
                    newTaskTitle || 'default'
                  )
                  const IconComponent = iconData.icon
                  const iconColor = getIconColor(iconData.theme)
                  return (
                    <IconComponent 
                      size={20} 
                      style={{ color: iconColor }} 
                      className={`task-icon-${iconData.theme}`}
                    />
                  )
                })()}
              </button>
              <input
                type="text"
                placeholder={`Add task for ${DAYS_OF_WEEK.find(d => d.key === selectedDay)?.label}...`}
                value={newTaskTitle}
                onChange={(e) => {
                  setNewTaskTitle(e.target.value)
                  // Auto-detect theme from title
                  const detected = getIconForTask(e.target.value)
                  setNewTaskIconTheme(Object.keys(ICON_MAP).find(key => ICON_MAP[key] === detected) || 'default')
                }}
                className="task-input"
              />
              <select
                value={newTaskCoinReward}
                onChange={(e) => setNewTaskCoinReward(parseInt(e.target.value))}
                className="coin-reward-select"
                title="Coin reward"
              >
                <option value="5">+5</option>
                <option value="10">+10</option>
                <option value="15">+15</option>
                <option value="20">+20</option>
              </select>
              <button type="submit" className="add-btn-aesthetic">
                <Plus size={20} />
                <span>Add Task</span>
              </button>
            </div>

            {showThemePicker && (
              <div className="theme-picker neomorph-md">
                <div className="theme-grid">
                  {Object.entries(ICON_MAP).map(([key, { icon: IconComponent, theme }]) => {
                    const iconColor = getIconColor(theme)
                    return (
                      <button
                        key={key}
                        type="button"
                        className={`theme-btn ${newTaskIconTheme === key ? 'selected' : ''}`}
                        onClick={() => {
                          setNewTaskIconTheme(key)
                          setShowThemePicker(false)
                        }}
                        title={key}
                      >
                        <IconComponent 
                          size={20} 
                          style={{ color: iconColor }} 
                          className={`task-icon-${theme}`}
                        />
                        <span className="theme-label">{key}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </form>

          {/* Calendar View Button */}
          <button 
            className="calendar-toggle-btn neomorph-md"
            onClick={() => setShowCalendar(true)}
          >
            <Calendar size={20} />
            <span>View History</span>
          </button>

          {/* Quick Tips */}
          <div className="tip-card neomorph-md">
            <p>💡 Tip: Build consistent habits by completing your schedule every day!</p>
          </div>
        </div>
      </PageWrapper>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="modal-overlay" onClick={() => setShowCalendar(false)}>
          <div className="schedule-calendar-modal neomorph-md" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>📅 Completion History</h3>
              <button className="modal-close" onClick={() => setShowCalendar(false)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-content">
              <div className="calendar-nav">
                <button onClick={() => navigateMonth(-1)}>
                  <ChevronLeft size={20} />
                </button>
                <span className="calendar-title">
                  {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </span>
                <button onClick={() => navigateMonth(1)}>
                  <ChevronRight size={20} />
                </button>
              </div>

              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="calendar-day-header">{day}</div>
                ))}

                {Array.from({ length: getDaysInMonth(currentMonth).startingDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="calendar-cell empty" />
                ))}

                {Array.from({ length: getDaysInMonth(currentMonth).daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const date = new Date(getDaysInMonth(currentMonth).year, getDaysInMonth(currentMonth).month, day)
                  const dateStr = date.toISOString().split('T')[0]
                  const isToday = dateStr === new Date().toISOString().split('T')[0]
                  const completionRate = getCompletionRateForDay(date)

                  return (
                    <div
                      key={day}
                      className={`calendar-cell ${isToday ? 'today' : ''}`}
                      style={{
                        background: isToday 
                          ? `linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(139, 195, 74, 0.2))`
                          : 'transparent'
                      }}
                    >
                      <span className="day-number">{day}</span>
                      {completionRate > 0 && (
                        <div 
                          className="completion-dot"
                          style={{ 
                            backgroundColor: getCompletionColor(completionRate),
                            boxShadow: `0 0 8px ${getCompletionColor(completionRate)}`
                          }}
                          title={`${completionRate}% completed`}
                        />
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="calendar-legend">
                <div className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: '#4CAF50' }} />
                  <span>100%</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: '#8BC34A' }} />
                  <span>70%+</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: '#FFC107' }} />
                  <span>40%+</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: '#FF9800' }} />
                  <span>1%+</span>
                </div>
                <div className="legend-item">
                  <div className="legend-dot" style={{ backgroundColor: '#e0e0e0' }} />
                  <span>0%</span>
                </div>
              </div>

              <div className="calendar-stats">
                <div className="stat-item">
                  <Trophy size={24} className="stat-icon-gold" />
                  <div className="stat-text">
                    <span className="stat-text-label">Best Streak</span>
                    <span className="stat-text-value">{streak} days</span>
                  </div>
                </div>
                <div className="stat-item">
                  <Star size={24} className="stat-icon-blue" />
                  <div className="stat-text">
                    <span className="stat-text-label">This Month</span>
                    <span className="stat-text-value">
                      {Object.keys(completionHistory).filter(date => {
                        const d = new Date(date)
                        return d.getMonth() === currentMonth.getMonth() && d.getFullYear() === currentMonth.getFullYear()
                      }).length} days
                    </span>
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
            <Coins size={48} className="reward-coins-icon" />
            <span className="reward-text">+{lastCoinReward} Coins!</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default SchedulePage
