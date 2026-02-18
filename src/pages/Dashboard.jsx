import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNavigation } from '../components/TopNavigation'
import { useAuth } from '../contexts/AuthContext'
import { getGreeting, formatDate } from '../utils/helpers'
import { useEnergyMode } from '../contexts/EnergyModeContext'
import MiniInsight from '../components/MiniInsight'
import SmartGreeting from '../components/SmartGreeting'
import JournalComposer from '../components/JournalComposer'
import adapter from '../utils/dataAdapter'
import React, { useEffect, useState } from 'react'
import { Calendar, CheckCircle, BookOpen, Clock, Zap, Moon } from 'lucide-react'
import './Dashboard.css'

export const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos') || '[]'))
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
    { title: 'Planner', icon: '📅', path: '/planner', color: 'accent-warm' },
    { title: 'To-Do', icon: '✓', path: '/todo', color: 'accent-cool' },
    { title: 'Journal', icon: '📝', path: '/journal', color: 'accent-soft' },
    { title: 'Focus Timer', icon: '⏱️', path: '/timer', color: 'accent-energy' },
    { title: 'Meditation', icon: '🧘', path: '/meditation', color: 'accent-peace' },
  ]

  // adjust visible shortcuts based on mode
  let shortcuts = allShortcuts
  if (mode === 'focus') {
    shortcuts = allShortcuts.filter(s => s.path === '/todo' || s.path === '/timer')
  } else if (mode === 'calm') {
    shortcuts = allShortcuts.filter(s => s.path === '/journal' || s.path === '/meditation')
  }

  return (
    <div className="dashboard-wrapper">
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
