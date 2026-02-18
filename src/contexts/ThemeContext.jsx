import React, { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

// Theme configurations with soft color palettes
export const themes = {
  lavender: {
    name: 'Lavender',
    accent1: '#9b8fbf',
    accent2: '#b8a9c9',
    accent3: '#d4c4e8',
    accentWarm: '#e8d5f0',
    accentCool: '#c9d6ef',
    accentSoft: '#f0e6ef',
    accentEnergy: '#ddbdf5',
    accentPeace: '#c9b8e8',
    bgPrimary: '#f8f6fa',
    bgSecondary: '#ede9f5'
  },
  sage: {
    name: 'Sage Green',
    accent1: '#9caf88',
    accent2: '#b5c4a8',
    accent3: '#c9d4bf',
    accentWarm: '#e8f0d8',
    accentCool: '#d4e8c9',
    accentSoft: '#f0f5eb',
    accentEnergy: '#c9d9b8',
    accentPeace: '#b8c9a8',
    bgPrimary: '#f6faf5',
    bgSecondary: '#e8f0e4'
  },
  rose: {
    name: 'Rose Quartz',
    accent1: '#e8b4b8',
    accent2: '#f0c4c9',
    accent3: '#f5d4d9',
    accentWarm: '#f9e4e8',
    accentCool: '#f5d4e0',
    accentSoft: '#fef0f3',
    accentEnergy: '#f9c9d4',
    accentPeace: '#f0b8c4',
    bgPrimary: '#fdf8f9',
    bgSecondary: '#f5e8ea'
  },
  sky: {
    name: 'Sky Blue',
    accent1: '#a8c4d9',
    accent2: '#b8d4e8',
    accent3: '#c9e0f0',
    accentWarm: '#e0f0f9',
    accentCool: '#d4e8f5',
    accentSoft: '#f0f8fc',
    accentEnergy: '#b8d9f0',
    accentPeace: '#a8cce0',
    bgPrimary: '#f8fafc',
    bgSecondary: '#e8f0f5'
  },
  peach: {
    name: 'Peach',
    accent1: '#f5c4a8',
    accent2: '#f9d4b8',
    accent3: '#fce0c9',
    accentWarm: '#fef0e0',
    accentCool: '#f9e4d4',
    accentSoft: '#fff5f0',
    accentEnergy: '#f9ccb8',
    accentPeace: '#f5b8a8',
    bgPrimary: '#fcf9f6',
    bgSecondary: '#f5ebe4'
  },
  mint: {
    name: 'Mint',
    accent1: '#88d4b8',
    accent2: '#a8e0c9',
    accent3: '#b8e8d4',
    accentWarm: '#d4f5e8',
    accentCool: '#c9f0e0',
    accentSoft: '#e8fcf5',
    accentEnergy: '#a8e8c9',
    accentPeace: '#88d9b8',
    bgPrimary: '#f6fcf9',
    bgSecondary: '#e4f5ec'
  },
  coral: {
    name: 'Coral',
    accent1: '#f5a89b',
    accent2: '#f9b8a8',
    accent3: '#f9c4b8',
    accentWarm: '#fcd4c9',
    accentCool: '#f9b8b8',
    accentSoft: '#fef0ee',
    accentEnergy: '#f59b88',
    accentPeace: '#e88875',
    bgPrimary: '#fdf8f7',
    bgSecondary: '#f5e8e6'
  },
  butter: {
    name: 'Buttercream',
    accent1: '#f5e0a8',
    accent2: '#f9e8b8',
    accent3: '#fcecc9',
    accentWarm: '#fef5d4',
    accentCool: '#f9f0c9',
    accentSoft: '#fefbf0',
    accentEnergy: '#f5d99b',
    accentPeace: '#e8c988',
    bgPrimary: '#fdfcf6',
    bgSecondary: '#f9f5e4'
  }
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme')
    return saved ? saved === 'dark' : false
  })

  const [activeTheme, setActiveTheme] = useState(() => {
    const saved = localStorage.getItem('colorTheme')
    return saved || 'lavender'
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('colorTheme', activeTheme)
    const theme = themes[activeTheme]
    const root = document.documentElement

    // Set CSS variables for theme colors
    root.style.setProperty('--accent-1', theme.accent1)
    root.style.setProperty('--accent-2', theme.accent2)
    root.style.setProperty('--accent-3', theme.accent3)
    root.style.setProperty('--accent-warm', theme.accentWarm)
    root.style.setProperty('--accent-cool', theme.accentCool)
    root.style.setProperty('--accent-soft', theme.accentSoft)
    root.style.setProperty('--accent-energy', theme.accentEnergy)
    root.style.setProperty('--accent-peace', theme.accentPeace)
    
    // Only override background if in light mode
    if (!isDark) {
      root.style.setProperty('--bg-primary', theme.bgPrimary)
      root.style.setProperty('--bg-secondary', theme.bgSecondary)
    }
  }, [activeTheme, isDark])

  const toggleTheme = () => setIsDark(!isDark)

  const setTheme = (themeName) => {
    if (themes[themeName]) {
      setActiveTheme(themeName)
    }
  }

  return (
    <ThemeContext.Provider value={{ 
      isDark, 
      toggleTheme, 
      activeTheme, 
      setTheme,
      themes,
      themeList: Object.keys(themes)
    }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
