import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Clock, TrendingUp, Award, Calendar, BarChart3 } from 'lucide-react'
import './AnalyticsPage.css'

export const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  
  // Focus sessions data
  const [sessions, setSessions] = useState(() => {
    const saved = localStorage.getItem('focusSessions')
    return saved ? JSON.parse(saved) : []
  })

  const getStats = () => {
    const now = new Date()
    const today = now.toISOString().split('T')[0]

    // Today
    const todaySessions = sessions.filter(s => s.createdAt?.startsWith(today))
    const todayMinutes = todaySessions.reduce((sum, s) => sum + (s.duration || 25), 0)

    // This week
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)
    const weekSessions = sessions.filter(s => new Date(s.createdAt) >= weekAgo)
    const weekMinutes = weekSessions.reduce((sum, s) => sum + (s.duration || 25), 0)

    // This month
    const monthAgo = new Date()
    monthAgo.setMonth(monthAgo.getMonth() - 1)
    const monthSessions = sessions.filter(s => new Date(s.createdAt) >= monthAgo)
    const monthMinutes = monthSessions.reduce((sum, s) => sum + (s.duration || 25), 0)

    // Total
    const totalMinutes = sessions.reduce((sum, s) => sum + (s.duration || 25), 0)
    const totalSessions = sessions.length
    const avgSession = totalSessions > 0 ? Math.round(totalMinutes / totalSessions) : 0

    return {
      todayMinutes,
      todaySessions: todaySessions.length,
      weekMinutes,
      weekSessions: weekSessions.length,
      monthMinutes,
      monthSessions: monthSessions.length,
      totalMinutes,
      totalSessions,
      avgSession
    }
  }

  const stats = getStats()

  const getChartData = () => {
    const data = []
    const now = new Date()
    
    if (selectedPeriod === 'week') {
      // Last 7 days
      for (let i = 6; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        const dateStr = date.toISOString().split('T')[0]
        const daySessions = sessions.filter(s => s.createdAt?.startsWith(dateStr))
        const minutes = daySessions.reduce((sum, s) => sum + (s.duration || 25), 0)
        data.push({
          date: dateStr,
          label: date.toLocaleDateString('en-US', { weekday: 'short' }),
          minutes,
          sessions: daySessions.length
        })
      }
    } else if (selectedPeriod === 'month') {
      // Last 4 weeks
      for (let i = 3; i >= 0; i--) {
        const weekStart = new Date()
        weekStart.setDate(weekStart.getDate() - (i * 7))
        const weekEnd = new Date(weekStart)
        weekEnd.setDate(weekEnd.getDate() + 7)
        
        const weekSessions = sessions.filter(s => {
          const sDate = new Date(s.createdAt)
          return sDate >= weekStart && sDate < weekEnd
        })
        const minutes = weekSessions.reduce((sum, s) => sum + (s.duration || 25), 0)
        data.push({
          label: `Week ${4 - i}`,
          minutes,
          sessions: weekSessions.length
        })
      }
    } else if (selectedPeriod === 'year') {
      // Last 12 months
      for (let i = 11; i >= 0; i--) {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        const year = date.getFullYear()
        const month = date.getMonth()
        
        const monthSessions = sessions.filter(s => {
          const sDate = new Date(s.createdAt)
          return sDate.getFullYear() === year && sDate.getMonth() === month
        })
        const minutes = monthSessions.reduce((sum, s) => sum + (s.duration || 25), 0)
        data.push({
          label: date.toLocaleDateString('en-US', { month: 'short' }),
          minutes,
          sessions: monthSessions.length
        })
      }
    }
    
    return data
  }

  const chartData = getChartData()
  const maxMinutes = Math.max(...chartData.map(d => d.minutes), 1)

  const formatHours = (minutes) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  return (
    <div className="analytics-wrapper">
      <TopNavigation />

      <div className="analytics-container fade-in">
        <div className="analytics-header">
          <h1>Analytics</h1>
          <p>Track your focus and productivity over time</p>
        </div>

        {/* Period Selector */}
        <div className="period-selector-main">
          <button
            className={`period-btn-main ${selectedPeriod === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('week')}
          >
            Weekly
          </button>
          <button
            className={`period-btn-main ${selectedPeriod === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Monthly
          </button>
          <button
            className={`period-btn-main ${selectedPeriod === 'year' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('year')}
          >
            Yearly
          </button>
        </div>

        {/* Stats Overview */}
        <div className="analytics-stats-grid">
          <div className="analytics-stat-card neomorph-md">
            <div className="analytics-stat-icon">
              <Clock size={24} />
            </div>
            <div className="analytics-stat-info">
              <span className="analytics-stat-label">
                {selectedPeriod === 'week' ? 'This Week' : selectedPeriod === 'month' ? 'This Month' : 'This Year'}
              </span>
              <span className="analytics-stat-value">
                {selectedPeriod === 'week' ? formatHours(stats.weekMinutes) : 
                 selectedPeriod === 'month' ? formatHours(stats.monthMinutes) : 
                 formatHours(stats.totalMinutes)}
              </span>
              <span className="analytics-stat-sub">
                {selectedPeriod === 'week' ? stats.weekSessions : 
                 selectedPeriod === 'month' ? stats.monthSessions : 
                 stats.totalSessions} sessions
              </span>
            </div>
          </div>

          <div className="analytics-stat-card neomorph-md">
            <div className="analytics-stat-icon">
              <TrendingUp size={24} />
            </div>
            <div className="analytics-stat-info">
              <span className="analytics-stat-label">Avg Session</span>
              <span className="analytics-stat-value">{stats.avgSession}m</span>
              <span className="analytics-stat-sub">per session</span>
            </div>
          </div>

          <div className="analytics-stat-card neomorph-md">
            <div className="analytics-stat-icon">
              <Award size={24} />
            </div>
            <div className="analytics-stat-info">
              <span className="analytics-stat-label">Total Time</span>
              <span className="analytics-stat-value">{formatHours(stats.totalMinutes)}</span>
              <span className="analytics-stat-sub">all time</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="analytics-chart-card neomorph-md">
          <div className="chart-header">
            <BarChart3 size={20} />
            <h3>Focus Tracker</h3>
          </div>
          <div className="analytics-chart-container">
            {chartData.map((item, index) => (
              <div key={index} className="analytics-chart-bar-container">
                <div
                  className="analytics-chart-bar"
                  style={{ 
                    height: `${(item.minutes / maxMinutes) * 100}%`,
                    minHeight: item.minutes > 0 ? '8px' : '0'
                  }}
                  title={`${item.minutes} minutes`}
                />
                <span className="analytics-chart-label">{item.label}</span>
                <span className="analytics-chart-value">{item.minutes}m</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsPage
