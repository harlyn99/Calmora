import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Check, ChevronRight } from 'lucide-react'
import './PlannerPage.css'
import { formatDate } from '../utils/helpers'

export const PlannerPage = () => {
  const [plans, setPlans] = useState(() => JSON.parse(localStorage.getItem('dailyPlans') || '[]'))
  const [input, setInput] = useState('')
  const [priority, setPriority] = useState('medium')

  useEffect(() => {
    localStorage.setItem('dailyPlans', JSON.stringify(plans))
  }, [plans])

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

  const importantPlans = plans.filter(p => p.priority === 'high' && !p.completed)
  const activePlans = plans.filter(p => !p.completed && p.priority !== 'high')
  const completedPlans = plans.filter(p => p.completed)

  return (
    <div className="planner-wrapper">
      <TopNavigation />
      
      <div className="planner-container fade-in">
        <div className="planner-header">
          <h1>Today's Plan</h1>
          <p>{formatDate(new Date())}</p>
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
            <Plus size={18} /> Add Plan
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
          <p>💡 Tip: Prioritize 3 main tasks and focus on them completely.</p>
        </div>
      </div>
    </div>
  )
}
