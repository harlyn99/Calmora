import React, { useState } from 'react'
import { X, Lightbulb, Zap, BookOpen, Smile, Target, Clock, Heart } from 'lucide-react'
import './QuickActions.css'

const quickActions = [
  {
    id: 'breathe',
    title: 'Quick Breathe',
    icon: Heart,
    description: 'Take 3 deep breaths',
    duration: '1 min',
    color: '#e87575'
  },
  {
    id: 'stretch',
    title: 'Quick Stretch',
    icon: Zap,
    description: 'Stand up and stretch',
    duration: '2 min',
    color: '#f5a623'
  },
  {
    id: 'gratitude',
    title: 'Gratitude',
    icon: Smile,
    description: 'Write 3 things you\'re grateful for',
    duration: '3 min',
    color: '#7ed321'
  },
  {
    id: 'water',
    title: 'Drink Water',
    icon: Lightbulb,
    description: 'Stay hydrated!',
    duration: '1 min',
    color: '#4a90e2'
  },
  {
    id: 'focus',
    title: 'Mini Focus',
    icon: Target,
    description: '25 min pomodoro session',
    duration: '25 min',
    color: '#9013fe'
  },
  {
    id: 'review',
    title: 'Daily Review',
    icon: BookOpen,
    description: 'Reflect on your day',
    duration: '5 min',
    color: '#bd10e0'
  },
  {
    id: 'walk',
    title: 'Quick Walk',
    icon: Clock,
    description: 'Take a short walk',
    duration: '10 min',
    color: '#50e3c2'
  },
  {
    id: 'meditate',
    title: 'Mini Meditation',
    icon: Heart,
    description: 'Clear your mind',
    duration: '5 min',
    color: '#f8e71c'
  }
]

export const QuickActions = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeAction, setActiveAction] = useState(null)

  const handleAction = (action) => {
    setActiveAction(action)
    // Here you can navigate to the appropriate page or show a modal
    console.log('Starting action:', action.title)
    
    // Example: navigate based on action
    if (action.id === 'focus') {
      window.location.href = '/timer'
    } else if (action.id === 'gratitude' || action.id === 'review') {
      window.location.href = '/journal'
    } else if (action.id === 'meditate') {
      window.location.href = '/meditation'
    }
    
    setTimeout(() => setActiveAction(null), 2000)
  }

  return (
    <>
      <button className="quick-actions-fab" onClick={() => setIsOpen(!isOpen)}>
        <Lightbulb size={24} />
      </button>

      {isOpen && (
        <div className="quick-actions-overlay" onClick={() => setIsOpen(false)}>
          <div className="quick-actions-panel" onClick={(e) => e.stopPropagation()}>
            <div className="quick-actions-header">
              <h3>Quick Actions</h3>
              <button className="quick-actions-close" onClick={() => setIsOpen(false)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="quick-actions-grid">
              {quickActions.map((action) => {
                const Icon = action.icon
                return (
                  <button
                    key={action.id}
                    className={`quick-action-card ${activeAction === action ? 'active' : ''}`}
                    onClick={() => handleAction(action)}
                    style={{ '--action-color': action.color }}
                  >
                    <div className="action-icon" style={{ background: `${action.color}20`, color: action.color }}>
                      <Icon size={24} />
                    </div>
                    <div className="action-info">
                      <span className="action-title">{action.title}</span>
                      <span className="action-desc">{action.description}</span>
                      <span className="action-duration">{action.duration}</span>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default QuickActions
