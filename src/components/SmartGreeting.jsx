import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getGreeting } from '../utils/helpers'
import { useTheme } from '../contexts/ThemeContext'

export const SmartGreeting = ({ stats = {} }) => {
  const { user } = useAuth()
  const { activeTheme } = useTheme()
  const [greeting, setGreeting] = useState(() => getGreeting(stats, activeTheme))

  useEffect(() => {
    const update = () => setGreeting(getGreeting(stats, activeTheme))
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [stats, activeTheme])

  return (
    <div className="greeting-card">
      <div className="greeting-content">
        <span className="greeting-emoji">{greeting.emoji}</span>
        <div>
          <h1 className="greeting-text" style={{ 
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            margin: 0
          }}>
            {greeting.text}{user?.username ? `, ${user.username}!` : '!'}
          </h1>
          <p className="greeting-sub">{greeting.sub || ''}</p>
        </div>
      </div>
    </div>
  )
}

export default SmartGreeting
