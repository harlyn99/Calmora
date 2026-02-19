import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNavigation } from '../components/TopNavigation'
import { useAuth } from '../contexts/AuthContext'
import { getGreeting, formatDate } from '../utils/helpers'
import { useEnergyMode } from '../contexts/EnergyModeContext'
import MiniInsight from '../components/MiniInsight'
import SmartGreeting from '../components/SmartGreeting'
import JournalComposer from '../components/JournalComposer'
import InspirationalQuotes from '../components/InspirationalQuotes'
import QuickActions from '../components/QuickActions'
import AnimatedBackground from '../components/Background'
import CircularProgress from '../components/CircularProgress'
import adapter from '../utils/dataAdapter'
import { Calendar, CheckCircle, BookOpen, Clock, Zap, Moon, Target, Flame, Award } from 'lucide-react'
import './Dashboard.css'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { mode } = useEnergyMode()
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos') || '[]'))
  const [journalEntries, setJournalEntries] = useState(() => JSON.parse(localStorage.getItem('journalEntries') || '[]'))
  const [focusSessions, setFocusSessions] = useState(() => JSON.parse(localStorage.getItem('focusSessions') || '[]'))

  useEffect(() => {
    let mounted = true
    const load = async () => {
      const t = await adapter.getTodos()
      const j = await adapter.getJournalEntries()
      const s = await adapter.getFocusSessions()
      if (!mounted) return
      setTodos(t || [])
      setJournalEntries(j || [])
      setFocusSessions(s || [])
    }
    load()
    return () => { mounted = false }
  }, [])
  const completedTodos = todos.filter(t => t.completed).length
  const focusTime = localStorage.getItem('focusTime') || '0'

  const allShortcuts = [
    { title: 'Tasks', icon: '📋', path: '/tasks', color: 'accent-warm' },
    { title: 'Journal', icon: '📝', path: '/journal', color: 'accent-soft' },
    { title: 'Focus Timer', icon: '⏱️', path: '/timer', color: 'accent-energy' },
    { title: 'Meditation', icon: '🧘', path: '/meditation', color: 'accent-peace' },
    { title: 'Habits', icon: '🎯', path: '/habits', color: 'accent-cool' },
  ]

  // adjust visible shortcuts based on mode
  let shortcuts = allShortcuts
  if (mode === 'focus') {
    shortcuts = allShortcuts.filter(s => s.path === '/tasks' || s.path === '/timer')
  } else if (mode === 'calm') {
    shortcuts = allShortcuts.filter(s => s.path === '/journal' || s.path === '/meditation')
  }

  return (
    <div className="dashboard-wrapper">
      <AnimatedBackground />
      <TopNavigation />

      <div className="dashboard-container fade-in">
        {/* Smart Greeting */}
        <SmartGreeting stats={{ todos, focusSessions: focusSessions.length || 0, journalEntries }} />

        {/* Mini Insight - hide on focus mode to reduce distractions */}
        {mode !== 'focus' && (
          <div style={{ marginTop: 12 }}>
            <MiniInsight />
          </div>
        )}

        {/* New Stats Widgets with Circular Progress */}
        <div className="dashboard-stats-grid">
          <div className="stats-card-gradient glass-md">
            <div className="stats-card-header">
              <Target className="stats-icon" size={24} />
              <span>Tasks</span>
            </div>
            <CircularProgress 
              progress={todos.length > 0 ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100) : 0}
              size={100}
              strokeWidth={8}
              label={`${todos.filter(t => t.completed).length}/${todos.length}`}
            />
          </div>
          
          <div className="stats-card-gradient glass-md">
            <div className="stats-card-header">
              <Flame className="stats-icon" size={24} />
              <span>Focus Time</span>
            </div>
            <CircularProgress 
              progress={Math.min((parseInt(focusTime) / 120) * 100, 100)}
              size={100}
              strokeWidth={8}
              label={`${focusTime} min`}
            />
          </div>
          
          <div className="stats-card-gradient glass-md">
            <div className="stats-card-header">
              <Award className="stats-icon" size={24} />
              <span>Journal</span>
            </div>
            <CircularProgress 
              progress={Math.min((journalEntries.length / 30) * 100, 100)}
              size={100}
              strokeWidth={8}
              label={`${journalEntries.length} entries`}
            />
          </div>
        </div>

        {/* Calm mode - show journal write area and mood tracker */}
        {mode === 'calm' && (
          <div className="calm-area neomorph-md" style={{ padding: 16, marginTop: 12 }}>
            <h2 className="section-title">Journal & Mood</h2>
            <JournalComposer />
          </div>
        )}

        {/* Shortcuts Grid */}
        <div className="shortcuts-section">
          <h2 className="section-title">Quick Access</h2>
          <div className="shortcuts-grid">
            {shortcuts.map((shortcut, index) => (
              <button
                key={shortcut.path}
                className={`shortcut-card glass-card card-hover-lift stagger-${(index % 8) + 1}`}
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
        <div className="quote-section">
          <InspirationalQuotes />
        </div>

        {/* Quick Actions FAB */}
        <QuickActions />
      </div>
    </div>
  )
}
