import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNavigation } from '../components/TopNavigation'
import { useAuth } from '../contexts/AuthContext'
import { getGreeting, formatDate } from '../utils/helpers'
import { Calendar, CheckCircle, BookOpen, Clock, Zap, Moon } from 'lucide-react'
import './Dashboard.css'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos') || '[]'))
  const [greeting, setGreeting] = useState(getGreeting())

  useEffect(() => {
    const interval = setInterval(() => setGreeting(getGreeting()), 60000)
    return () => clearInterval(interval)
  }, [])

  const completedTodos = todos.filter(t => t.completed).length
  const focusTime = localStorage.getItem('focusTime') || '0'
  const journalEntries = JSON.parse(localStorage.getItem('journalEntries') || '[]')

  const shortcuts = [
    { title: 'Planner', icon: '📅', path: '/planner', color: 'accent-warm' },
    { title: 'To-Do', icon: '✓', path: '/todo', color: 'accent-cool' },
    { title: 'Journal', icon: '📝', path: '/journal', color: 'accent-soft' },
    { title: 'Focus Timer', icon: '⏱️', path: '/timer', color: 'accent-energy' },
    { title: 'Meditation', icon: '🧘', path: '/meditation', color: 'accent-peace' },
  ]

  return (
    <div className="dashboard-wrapper">
      <TopNavigation />
      
      <div className="dashboard-container fade-in">
        {/* Greeting Section */}
        <div className="greeting-card neomorph-lg">
          <div className="greeting-content">
            <span className="greeting-emoji">{greeting.emoji}</span>
            <div>
              <h1 className="greeting-text">{greeting.text}, {user?.username}!</h1>
              <p className="greeting-date">{formatDate(new Date())}</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-section">
          <div className="stat-card neomorph-md">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <p className="stat-label">Tasks Today</p>
              <p className="stat-value">{todos.length}</p>
            </div>
          </div>

          <div className="stat-card neomorph-md">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <p className="stat-label">Completed</p>
              <p className="stat-value">{completedTodos}</p>
            </div>
          </div>

          <div className="stat-card neomorph-md">
            <div className="stat-icon">⏱️</div>
            <div className="stat-content">
              <p className="stat-label">Focus Time</p>
              <p className="stat-value">{focusTime} min</p>
            </div>
          </div>

          <div className="stat-card neomorph-md">
            <div className="stat-icon">📝</div>
            <div className="stat-content">
              <p className="stat-label">Journal</p>
              <p className="stat-value">{journalEntries.length}</p>
            </div>
          </div>
        </div>

        {/* Shortcuts Grid */}
        <div className="shortcuts-section">
          <h2 className="section-title">Quick Access</h2>
          <div className="shortcuts-grid">
            {shortcuts.map((shortcut) => (
              <button
                key={shortcut.path}
                className={`shortcut-card neomorph-md ${shortcut.color}`}
                onClick={() => navigate(shortcut.path)}
              >
                <span className="shortcut-emoji">{shortcut.icon}</span>
                <span className="shortcut-title">{shortcut.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        {journalEntries.length > 0 && (
          <div className="recent-section">
            <h2 className="section-title">Last Journal Entry</h2>
            <div className="neomorph-md recent-entry">
              <p className="entry-date">{formatDate(new Date(journalEntries[journalEntries.length - 1].date))}</p>
              <p className="entry-preview">{journalEntries[journalEntries.length - 1].content.substring(0, 150)}...</p>
              <button className="read-more-btn" onClick={() => navigate('/journal')}>
                Read More →
              </button>
            </div>
          </div>
        )}

        {/* Motivational Quote */}
        <div className="quote-section neomorph-md">
          <p className="quote-text">
            "Progress, not perfection. Celebrate small wins every day." ✨
          </p>
        </div>
      </div>
    </div>
  )
}
