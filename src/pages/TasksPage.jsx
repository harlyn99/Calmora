import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { 
  Plus, Trash2, Check, Calendar, List, ChevronLeft, ChevronRight,
  Flag, Clock, Tag, Filter
} from 'lucide-react'
import './TasksPage.css'
import { formatDate, formatMonthYear } from '../utils/helpers'

export const TasksPage = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')
  const [category, setCategory] = useState('todo')
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [viewMode, setViewMode] = useState('calendar')
  const [filterPriority, setFilterPriority] = useState('all')

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const newTask = {
      id: Date.now(),
      title: input,
      priority,
      category,
      completed: false,
      dueDate: selectedDate.toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    }
    setTasks([...tasks, newTask])
    setInput('')
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  const updateTaskDate = (id, date) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, dueDate: date } : t))
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

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split('T')[0]
    return tasks.filter(t => t.dueDate === dateStr)
  }

  const navigateMonth = (direction) => {
    const newDate = new Date(selectedDate)
    newDate.setMonth(newDate.getMonth() + direction)
    setSelectedDate(newDate)
  }

  const { daysInMonth, startingDay, year, month } = getDaysInMonth(selectedDate)
  const today = new Date()
  const todayStr = today.toISOString().split('T')[0]

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false
    if (viewMode === 'calendar') {
      const taskDate = task.dueDate
      const selectedDateStr = selectedDate.toISOString().split('T')[0]
      return taskDate.startsWith(selectedDateStr.substring(0, 7))
    }
    return true
  })

  const activeTasks = filteredTasks.filter(t => !t.completed)
  const completedTasks = filteredTasks.filter(t => t.completed)

  const priorityColors = {
    high: 'high',
    medium: 'medium',
    low: 'low'
  }

  const categoryLabels = {
    todo: '📝 To-Do',
    planner: '📅 Plan',
    habit: '🎯 Habit'
  }

  return (
    <div className="tasks-wrapper">
      <TopNavigation />

      <div className="tasks-container fade-in">
        {/* Header */}
        <div className="tasks-header">
          <div className="header-left">
            <h1>Tasks & Planner</h1>
            <p className="tasks-subtitle">Organize your day, achieve your goals</p>
          </div>
          
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'calendar' ? 'active' : ''}`}
              onClick={() => setViewMode('calendar')}
            >
              <Calendar size={18} />
              <span>Calendar</span>
            </button>
            <button
              className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <List size={18} />
              <span>List</span>
            </button>
          </div>
        </div>

        {/* Add Task Form */}
        <form onSubmit={addTask} className="add-task-form neomorph-md">
          <div className="form-row">
            <input
              type="text"
              placeholder="Add a new task..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="task-input"
            />
            <div className="form-actions">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="task-select category-select"
              >
                <option value="todo">To-Do</option>
                <option value="planner">Plan</option>
                <option value="habit">Habit</option>
              </select>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="task-select priority-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <button type="submit" className="add-task-btn neomorph-button primary">
                <Plus size={20} />
                <span>Add</span>
              </button>
            </div>
          </div>
        </form>

        {/* Calendar View */}
        {viewMode === 'calendar' && (
          <div className="calendar-view neomorph-md">
            <div className="calendar-header">
              <button className="nav-btn" onClick={() => navigateMonth(-1)}>
                <ChevronLeft size={20} />
              </button>
              <h2 className="calendar-title">
                {formatMonthYear(selectedDate)}
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

            <div className="calendar-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="calendar-day-header">{day}</div>
              ))}
              
              {Array.from({ length: startingDay }).map((_, i) => (
                <div key={`empty-${i}`} className="calendar-cell empty"></div>
              ))}
              
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1
                const currentDate = new Date(year, month, day)
                const dateStr = currentDate.toISOString().split('T')[0]
                const dayTasks = tasks.filter(t => t.dueDate === dateStr)
                const isToday = dateStr === todayStr
                const isSelected = dateStr === selectedDate.toISOString().split('T')[0]
                
                const highPriorityCount = dayTasks.filter(t => t.priority === 'high' && !t.completed).length
                const completedCount = dayTasks.filter(t => t.completed).length
                const totalCount = dayTasks.length

                return (
                  <div
                    key={day}
                    className={`calendar-cell ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(currentDate)}
                  >
                    <span className="day-number">{day}</span>
                    {totalCount > 0 && (
                      <div className="task-dots">
                        {highPriorityCount > 0 && (
                          <span className="task-dot high" title={`${highPriorityCount} high priority`}></span>
                        )}
                        {completedCount > 0 && (
                          <span className="task-dot completed" title={`${completedCount} completed`}></span>
                        )}
                        {totalCount - highPriorityCount - completedCount > 0 && (
                          <span className="task-dot" title={`${totalCount - highPriorityCount - completedCount} tasks`}></span>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Selected Day Tasks */}
            <div className="selected-day-tasks">
              <h3 className="selected-day-title">
                {formatDate(selectedDate)}
              </h3>
              <div className="day-tasks-list">
                {getTasksForDate(selectedDate).length === 0 ? (
                  <p className="no-tasks-day">No tasks for this day</p>
                ) : (
                  getTasksForDate(selectedDate).map(task => (
                    <div key={task.id} className={`day-task-item ${task.completed ? 'completed' : ''}`}>
                      <button
                        className="task-checkbox"
                        onClick={() => toggleTask(task.id)}
                      >
                        {task.completed ? <Check size={16} /> : null}
                      </button>
                      <span className={`task-title ${task.priority}`}>{task.title}</span>
                      <span className={`category-badge ${task.category}`}>
                        {categoryLabels[task.category]}
                      </span>
                      <button
                        className="task-delete-small"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <div className="list-view">
            {/* Filter Bar */}
            <div className="filter-bar neomorph-sm">
              <div className="filter-group">
                <Filter size={16} />
                <span>Filter:</span>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High Priority</option>
                  <option value="medium">Medium Priority</option>
                  <option value="low">Low Priority</option>
                </select>
              </div>
              <div className="stats-group">
                <span className="stat-badge">
                  <Flag size={14} />
                  {activeTasks.length} Active
                </span>
                <span className="stat-badge completed">
                  <Check size={14} />
                  {completedTasks.length} Done
                </span>
              </div>
            </div>

            {/* Active Tasks */}
            {activeTasks.length > 0 && (
              <div className="tasks-section">
                <h3 className="section-label">
                  <Clock size={16} /> Active Tasks
                </h3>
                <div className="tasks-list">
                  {activeTasks.map(task => (
                    <div key={task.id} className={`task-item neomorph-sm ${task.priority}`}>
                      <button
                        className="task-checkbox"
                        onClick={() => toggleTask(task.id)}
                      >
                        <Check size={18} />
                      </button>
                      <div className="task-content">
                        <span className="task-text">{task.title}</span>
                        <div className="task-meta">
                          <span className={`priority-badge ${task.priority}`}>
                            <Flag size={12} />
                            {task.priority}
                          </span>
                          <span className={`category-badge ${task.category}`}>
                            {categoryLabels[task.category]}
                          </span>
                          <span className="due-date">
                            <Calendar size={12} />
                            {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                      </div>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Completed Tasks */}
            {completedTasks.length > 0 && (
              <div className="tasks-section">
                <h3 className="section-label completed">
                  <Check size={16} /> Completed
                </h3>
                <div className="tasks-list">
                  {completedTasks.map(task => (
                    <div key={task.id} className="task-item neomorph-sm completed">
                      <button
                        className="task-checkbox checked"
                        onClick={() => toggleTask(task.id)}
                      >
                        <Check size={18} />
                      </button>
                      <div className="task-content">
                        <span className="task-text completed">{task.title}</span>
                        <div className="task-meta">
                          <span className={`priority-badge ${task.priority}`}>
                            <Flag size={12} />
                            {task.priority}
                          </span>
                          <span className={`category-badge ${task.category}`}>
                            {categoryLabels[task.category]}
                          </span>
                        </div>
                      </div>
                      <button
                        className="task-delete"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Empty State */}
            {tasks.length === 0 && (
              <div className="empty-state neomorph-md">
                <p className="empty-emoji">✨</p>
                <p>No tasks yet. Add your first task to stay organized!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TasksPage
