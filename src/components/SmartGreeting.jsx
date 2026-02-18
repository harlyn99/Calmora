import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { getGreeting } from '../utils/helpers'

export const SmartGreeting = ({ stats = {} }) => {
  const { user } = useAuth()
  const [greeting, setGreeting] = useState(() => getGreeting(stats))

  useEffect(() => {
    const update = () => setGreeting(getGreeting(stats))
    update()
    const id = setInterval(update, 60000)
    return () => clearInterval(id)
  }, [stats])

  return (
    <div className="greeting-card neomorph-lg">
      <div className="greeting-content">
        <span className="greeting-emoji">{greeting.emoji}</span>
        <div>
          <h1 className="greeting-text">{greeting.text}{user?.username ? `, ${user.username}!` : '!'}</h1>
          <p className="greeting-sub">{greeting.sub || ''}</p>
        </div>
      </div>
    </div>
  )
}

export default SmartGreeting
