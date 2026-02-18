import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Target, CheckCircle, Circle, TrendingUp, Calendar } from 'lucide-react'
import './GoalsPage.css'

export const GoalsPage = () => {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('goals')
    return saved ? JSON.parse(saved) : []
  })
  const [newGoal, setNewGoal] = useState({ title: '', target: 1, current: 0, unit: '', deadline: '' })
  const [isAdding, setIsAdding] = useState(false)

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals))
  }, [goals])

  const addGoal = (e) => {
    e.preventDefault()
    if (!newGoal.title.trim()) return

    const goal = {
      id: Date.now(),
      title: newGoal.title,
      target: parseFloat(newGoal.target) || 1,
      current: parseFloat(newGoal.current) || 0,
      unit: newGoal.unit,
      deadline: newGoal.deadline,
      createdAt: new Date().toISOString()
    }
    setGoals([...goals, goal])
    setNewGoal({ title: '', target: 1, current: 0, unit: '', deadline: '' })
    setIsAdding(false)
  }

  const deleteGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id))
  }

  const updateProgress = (id, delta) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const newCurrent = Math.max(0, Math.min(g.target, g.current + delta))
        return { ...g, current: newCurrent }
      }
      return g
    }))
  }

  const getProgress = (goal) => {
    return Math.round((goal.current / goal.target) * 100)
  }

  const getDaysRemaining = (deadline) => {
    if (!deadline) return null
    const days = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24))
    return days
  }

  const completedGoals = goals.filter(g => g.current >= g.target).length
  const inProgressGoals = goals.filter(g => g.current < g.target).length
  const totalProgress = goals.length > 0 
    ? Math.round(goals.reduce((sum, g) => sum + getProgress(g), 0) / goals.length)
    : 0

  return (
    <div className="goals-wrapper">
      <TopNavigation />

      <div className="goals-container fade-in">
        <div className="goals-header">
          <h1>Goals</h1>
          <p className="goals-subtitle">Set and track your long-term objectives</p>
        </div>

        {/* Stats */}
        <div className="goals-stats">
          <div className="goals-stat-card">
            <Target className="stat-icon target" size={24} />
            <div className="stat-info">
              <span className="stat-value">{goals.length}</span>
              <span className="stat-label">Total Goals</span>
            </div>
          </div>
          <div className="goals-stat-card">
            <CheckCircle className="stat-icon completed" size={24} />
            <div className="stat-info">
              <span className="stat-value">{completedGoals}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
          <div className="goals-stat-card">
            <TrendingUp className="stat-icon progress" size={24} />
            <div className="stat-info">
              <span className="stat-value">{totalProgress}%</span>
              <span className="stat-label">Avg Progress</span>
            </div>
          </div>
        </div>

        {/* Add Goal Button/Form */}
        {!isAdding ? (
          <button onClick={() => setIsAdding(true)} className="add-goal-btn">
            <Plus size={20} />
            New Goal
          </button>
        ) : (
          <form onSubmit={addGoal} className="add-goal-form">
            <div className="form-row">
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                placeholder="Goal title (e.g., Read books)"
                className="goal-input"
                required
              />
            </div>
            <div className="form-row-two">
              <input
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                placeholder="Target"
                className="goal-input small"
                min="1"
              />
              <input
                type="text"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                placeholder="Unit (e.g., books)"
                className="goal-input small"
              />
            </div>
            <div className="form-row">
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="goal-input"
              />
            </div>
            <div className="form-actions">
              <button type="button" onClick={() => setIsAdding(false)} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="save-btn">
                Create Goal
              </button>
            </div>
          </form>
        )}

        {/* Goals List */}
        <div className="goals-list">
          {goals.length === 0 ? (
            <div className="empty-state">
              <Target size={48} className="empty-icon" />
              <p>No goals yet. Set your first goal!</p>
            </div>
          ) : (
            goals.map(goal => {
              const progress = getProgress(goal)
              const daysRemaining = getDaysRemaining(goal.deadline)
              const isCompleted = goal.current >= goal.target

              return (
                <div key={goal.id} className={`goal-card ${isCompleted ? 'completed' : ''}`}>
                  <div className="goal-header">
                    <div className="goal-title-section">
                      <h3 className="goal-title">{goal.title}</h3>
                      {isCompleted && <span className="completed-badge">Completed!</span>}
                    </div>
                    <button onClick={() => deleteGoal(goal.id)} className="delete-goal-btn">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="goal-progress-section">
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar-fill" 
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="progress-stats">
                      <span className="progress-text">
                        {goal.current} / {goal.target} {goal.unit}
                      </span>
                      <span className="progress-percent">{progress}%</span>
                    </div>
                  </div>

                  <div className="goal-actions">
                    <button 
                      onClick={() => updateProgress(goal.id, -1)} 
                      className="progress-btn decrement"
                      disabled={goal.current <= 0}
                    >
                      −
                    </button>
                    <button 
                      onClick={() => updateProgress(goal.id, 1)} 
                      className="progress-btn increment"
                      disabled={goal.current >= goal.target}
                    >
                      +
                    </button>
                  </div>

                  {daysRemaining !== null && (
                    <div className={`deadline ${daysRemaining < 0 ? 'overdue' : daysRemaining <= 7 ? 'soon' : ''}`}>
                      <Calendar size={14} />
                      <span>
                        {daysRemaining < 0 
                          ? `${Math.abs(daysRemaining)} days overdue`
                          : daysRemaining === 0 
                            ? 'Due today' 
                            : `${daysRemaining} days left`
                        }
                      </span>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default GoalsPage
