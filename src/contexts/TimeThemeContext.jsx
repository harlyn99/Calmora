import React, { createContext, useState, useContext, useEffect } from 'react'

const TimeThemeContext = createContext()

export const TIME_THEMES = {
  dawn: {
    name: 'Dawn',
    emoji: '🌅',
    hours: [5, 6, 7, 8, 9, 10, 11],
    gradient: ['#ff6b6b', '#feca57', '#ff9ff3'],
    bg: '#ffecd2'
  },
  midday: {
    name: 'Midday',
    emoji: '☀️',
    hours: [12, 13, 14, 15, 16],
    gradient: ['#4facfe', '#00f2fe', '#667eea'],
    bg: '#e0f7fa'
  },
  sunset: {
    name: 'Sunset',
    emoji: '🌆',
    hours: [17, 18, 19, 20],
    gradient: ['#fa709a', '#fee140', '#f093fb'],
    bg: '#ffeaa7'
  },
  night: {
    name: 'Night',
    emoji: '🌙',
    hours: [21, 22, 23, 0, 1, 2, 3, 4],
    gradient: ['#0f0f23', '#1a1a3e', '#2d1b4e'],
    bg: '#0f0f23'
  }
}

export const TimeThemeProvider = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [currentPhase, setCurrentPhase] = useState('dawn')

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      
      const hour = now.getHours()
      
      // Determine time phase
      if (TIME_THEMES.dawn.hours.includes(hour)) {
        setCurrentPhase('dawn')
      } else if (TIME_THEMES.midday.hours.includes(hour)) {
        setCurrentPhase('midday')
      } else if (TIME_THEMES.sunset.hours.includes(hour)) {
        setCurrentPhase('sunset')
      } else {
        setCurrentPhase('night')
      }
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  const getTimeGreeting = () => {
    const hour = currentTime.getHours()
    if (hour >= 5 && hour < 12) return 'Good Morning'
    if (hour >= 12 && hour < 17) return 'Good Afternoon'
    if (hour >= 17 && hour < 21) return 'Good Evening'
    return 'Good Night'
  }

  const getTimeGreetingEmoji = () => {
    return TIME_THEMES[currentPhase].emoji
  }

  const getBackgroundGradient = () => {
    return `linear-gradient(135deg, ${TIME_THEMES[currentPhase].gradient.join(', ')})`
  }

  return (
    <TimeThemeContext.Provider value={{
      currentTime,
      currentPhase,
      timeTheme: TIME_THEMES[currentPhase],
      getTimeGreeting,
      getTimeGreetingEmoji,
      getBackgroundGradient,
      allPhases: TIME_THEMES
    }}>
      {children}
    </TimeThemeContext.Provider>
  )
}

export const useTimeTheme = () => {
  const context = useContext(TimeThemeContext)
  if (!context) throw new Error('useTimeTheme must be used within TimeThemeProvider')
  return context
}
