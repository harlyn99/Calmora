import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNavigation } from '../components/TopNavigation'
import { useAuth } from '../contexts/AuthContext'
import { getGreeting, formatDate } from '../utils/helpers'
import { useEnergyMode } from '../contexts/EnergyModeContext'
import SmartGreeting from '../components/SmartGreeting'
import InspirationalQuotes from '../components/InspirationalQuotes'
import QuickActions from '../components/QuickActions'
import PolaroidWall from '../components/PolaroidWall'
import adapter from '../utils/dataAdapter'
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

  return (
    <div className="dashboard-wrapper">
      <TopNavigation />

      <div className="dashboard-container fade-in">
        {/* Smart Greeting */}
        <SmartGreeting stats={{ todos, focusSessions: focusSessions.length || 0, journalEntries }} />

        {/* Motivational Quote */}
        <div className="quote-section">
          <InspirationalQuotes />
        </div>

        {/* Polaroid Memory Wall */}
        {journalEntries.length > 0 && (
          <div className="memory-wall-section">
            <PolaroidWall entries={journalEntries} />
          </div>
        )}

        {/* Quick Actions FAB */}
        <QuickActions />
      </div>
    </div>
  )
}
