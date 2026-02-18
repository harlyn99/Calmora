import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { BarChart3, Clock, TrendingUp, Award, Calendar } from 'lucide-react'
import './PomodoroStatsPage.css'

export const PomodoroStatsPage = () => {
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('focusSessions')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('focusSessions', JSON.stringify(sessions))
  }, [sessions])

  const getStats = () => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]
    
    // Today's sessions
    const todaySessions = sessions.filter(s => s.createdAt?.startsWith(today))
    const todayMinutes = todaySessions.reduce((sum, s) => sum + (s.duration || 25), 0)

    // This week
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekSessions = sessions.filter(s => new Date(s.createdAt) >= weekAgo)
    const weekMinutes = weekSessions.reduce((sum, s) => sum + (s.duration || 25), 0)

    // Total
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 25), 0)
    const totalSessions = sessions.length

    // Average session length
    const avgSession = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0

    // Best day (most sessions)
    const dayCounts = {}
    sessions.forEach(s => {
      const day = s.createdAt?.split('T')[0] || new Date().toISOString().split('T')[0]
      dayCounts[day] = (dayCounts[day] || 0) + 1
    })
    const bestDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0]

    return {
      todayMinutes,
      todaySessions: todaySessions.length,
      weekMinutes,
      weekSessions: weekSessions.length,
      totalMinutes,
      totalSessions,
      avgSession,
      bestDay: bestDay ? { date: bestDay[0], count: bestDay[1] } : null
    }
  }

  const stats = getStats()

  const getWeekData = () => {
    const data = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const daySessions = sessions.filter(s => s.createdAt?.startsWith(dateStr))
      const minutes = daySessions.reduce((sum, s) => sum + (s.duration || 25), 0)
      data.push({
        date: dateStr,
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        minutes,
        sessions: daySessions.length
      })
    }
    return data
  }

  const weekData = getWeekData()
  const maxMinutes = Math.max(...weekData.map(d => d.minutes), 1)

  const formatHours = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="pomodoro-wrapper">
      <TopNavigation />

      <div className="pomodoro-container fade-in">
        <div className="pomodoro-header">
          <h1>Focus Statistics</h1>
          <p className="pomodoro-subtitle">Track your productivity over time</p>
        </div>

        {/* Stats Grid */}
        <div className="pomodoro-stats">
          <div className="pomodoro-stat-card">
            <div className="stat-icon-wrapper today">
              <Clock size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{formatHours(stats.todayMinutes)}</span>
              <span className="stat-label">Today's Focus</span>
              <span className="stat-detail">{stats.todaySessions} sessions</span>
            </div>
          </div>

          <div className="pomodoro-stat-card">
            <div className="stat-icon-wrapper week">
              <BarChart3 size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{formatHours(stats.weekMinutes)}</span>
              <span className="stat-label">This Week</span>
              <span className="stat-detail">{stats.weekSessions} sessions</span>
            </div>
          </div>

          <div className="pomodoro-stat-card">
            <div className="stat-icon-wrapper total">
              <Award size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{formatHours(stats.totalMinutes)}</span>
              <span className="stat-label">Total Focus</span>
              <span className="stat-detail">{stats.totalSessions} sessions</span>
            </div>
          </div>

          <div className="pomodoro-stat-card">
            <div className="stat-icon-wrapper avg">
              <TrendingUp size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-value">{stats.avgSession}m</span>
              <span className="stat-label">Avg Session</span>
              <span className="stat-detail">Average length</span>
            </div>
          </div>
        </div>

        {/* Weekly Chart */}
        <div className="weekly-section">
          <div className="section-header">
            <Calendar size={20} />
            <h2>This Week</h2>
          </div>
          <div className="weekly-chart">
            {weekData.map((day, index) => (
              <div key={index} className="chart-column">
                <div className="column-bar-container">
                  {day.minutes > 0 ? (
                    <div 
                      className="column-bar-fill"
                      style={{ height: `${(day.minutes / maxMinutes) * 100}%` }}
                    />
                  ) : (
                    <div className="column-bar-empty" />
                  )}
                </div>
                <span className="column-day">{day.day}</span>
                <span className="column-value">{day.minutes > 0 ? `${day.minutes}m` : ''}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Best Day */}
        {stats.bestDay && (
          <div className="best-day-section">
            <div className="best-day-card">
              <Award size={32} className="best-day-icon" />
              <div className="best-day-content">
                <span className="best-day-label">Most Productive Day</span>
                <span className="best-day-value">
                  {new Date(stats.bestDay.date).toLocaleDateString('en-US', { 
                    weekday: 'long',
                    month: 'long', 
                    day: 'numeric'
                  })}
                </span>
                <span className="best-day-detail">{stats.bestDay.count} sessions completed</span>
              </div>
            </div>
          </div>
        )}

        {/* Recent Sessions */}
        <div className="recent-section">
          <div className="section-header">
            <Clock size={20} />
            <h2>Recent Sessions</h2>
          </div>
          {sessions.length === 0 ? (
            <p className="empty-text">No focus sessions yet. Start your first Pomodoro!</p>
          ) : (
            <div className="sessions-list">
              {sessions.slice(0, 10).map((session, index) => (
                <div key={index} className="session-item">
                  <div className="session-icon">
                    <Clock size={20} />
                  </div>
                  <div className="session-info">
                    <span className="session-duration">{session.duration || 25} minutes</span>
                    <span className="session-date">
                      {new Date(session.createdAt).toLocaleDateString('en-US', { 
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PomodoroStatsPage
