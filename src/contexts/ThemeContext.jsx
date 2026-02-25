import React, { createContext, useState, useContext, useEffect } from 'react'

const ThemeContext = createContext()

// Special Themes
export const specialThemes = {
  sakura: {
    name: 'Sakura',
    bgPrimary: '#fff5f8',
    bgSecondary: '#ffe5ee',
    bgTertiary: '#ffd5e5',
    accent1: '#ff8fa3',
    accent2: '#ff6b85',
    gradient: ['#ff8fa3', '#ff6b85', '#ffb3c6'],
    textPrimary: '#4a4a5a',
    textSecondary: '#6a6a7a',
    textMuted: '#9a9aa8',
    success: '#7b9a74',
    warning: '#d4a574',
    error: '#c97474',
    iconColor: '#9a7a8a',
    iconActive: '#d6335c'
  },
  ocean: {
    name: 'Ocean',
    bgPrimary: '#e0f7fa',
    bgSecondary: '#b2ebf2',
    bgTertiary: '#80deea',
    accent1: '#4dd0e1',
    accent2: '#26c6da',
    gradient: ['#4dd0e1', '#26c6da', '#00bcd4'],
    textPrimary: '#2d3e50',
    textSecondary: '#4a5d6e',
    textMuted: '#8a9daf',
    success: '#5a9a7a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#4a5d6e',
    iconActive: '#4dd0e1'
  },
  aurora: {
    name: 'Aurora',
    bgPrimary: '#e8f5e9',
    bgSecondary: '#c8e6c9',
    bgTertiary: '#a5d6a7',
    accent1: '#81c784',
    accent2: '#4caf50',
    gradient: ['#81c784', '#4db6ac', '#7986cb'],
    textPrimary: '#2d4a2e',
    textSecondary: '#4a5d4a',
    textMuted: '#8a9f8a',
    success: '#5a9a5a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#4a5d4a',
    iconActive: '#81c784'
  },
  sunset: {
    name: 'Sunset',
    bgPrimary: '#fff3e0',
    bgSecondary: '#ffe0b2',
    bgTertiary: '#ffcc80',
    accent1: '#ffb74d',
    accent2: '#ff9800',
    gradient: ['#ff9800', '#ffb74d', '#ffcc80'],
    textPrimary: '#4a3a2a',
    textSecondary: '#6b5a4a',
    textMuted: '#9a8a7a',
    success: '#7b9a5a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#6b5a4a',
    iconActive: '#ffb74d'
  },
  forest: {
    name: 'Forest',
    bgPrimary: '#f1f8e9',
    bgSecondary: '#dcedc8',
    bgTertiary: '#c5e1a5',
    accent1: '#aed581',
    accent2: '#9ccc65',
    gradient: ['#9ccc65', '#aed581', '#c5e1a5'],
    textPrimary: '#2d3a2a',
    textSecondary: '#4a5a4a',
    textMuted: '#8a9f8a',
    success: '#5a9a5a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#4a5a4a',
    iconActive: '#aed581'
  },
  lavender: {
    name: 'Lavender',
    bgPrimary: '#f3e5f5',
    bgSecondary: '#e1bee7',
    bgTertiary: '#ce93d8',
    accent1: '#ba68c8',
    accent2: '#ab47bc',
    gradient: ['#ab47bc', '#ba68c8', '#ce93d8'],
    textPrimary: '#3a2a4a',
    textSecondary: '#5a4a6b',
    textMuted: '#9a8a9f',
    success: '#7b9a5a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#5a4a6b',
    iconActive: '#ba68c8'
  },
  strawberry: {
    name: 'Strawberry',
    bgPrimary: '#fce4ec',
    bgSecondary: '#f8bbd9',
    bgTertiary: '#f48fb1',
    accent1: '#f06292',
    accent2: '#ec407a',
    gradient: ['#ec407a', '#f06292', '#f48fb1'],
    textPrimary: '#4a2a3a',
    textSecondary: '#6b4a5a',
    textMuted: '#9a8a8f',
    success: '#7b9a5a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#6b4a5a',
    iconActive: '#f06292'
  },
  moonlight: {
    name: 'Moonlight',
    bgPrimary: '#e8eaf6',
    bgSecondary: '#c5cae9',
    bgTertiary: '#9fa8da',
    accent1: '#7986cb',
    accent2: '#5c6bc0',
    gradient: ['#5c6bc0', '#7986cb', '#9fa8da'],
    textPrimary: '#2a2a4a',
    textSecondary: '#4a4a6b',
    textMuted: '#8a8a9f',
    success: '#5a9a7a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#4a4a6b',
    iconActive: '#7986cb'
  },
  citrus: {
    name: 'Citrus',
    bgPrimary: '#fff8e1',
    bgSecondary: '#ffecb3',
    bgTertiary: '#ffe082',
    accent1: '#ffd54f',
    accent2: '#ffca28',
    gradient: ['#ffca28', '#ffd54f', '#ffe082'],
    textPrimary: '#4a3a2a',
    textSecondary: '#6b5a4a',
    textMuted: '#9a8a7a',
    success: '#7b9a5a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#6b5a4a',
    iconActive: '#ffd54f'
  },
  cosmic: {
    name: 'Cosmic',
    bgPrimary: '#1a0a2e',
    bgSecondary: '#2d1b4e',
    bgTertiary: '#432c7a',
    accent1: '#6b4c9a',
    accent2: '#8b6fb8',
    gradient: ['#6b4c9a', '#8b6fb8', '#a685e0'],
    textPrimary: '#e0d0f0',
    textSecondary: '#c0b0d0',
    textMuted: '#9a8aa0',
    success: '#7b9a7a',
    warning: '#d4a55a',
    error: '#c95a5a',
    iconColor: '#a090b0',
    iconActive: '#6b4c9a'
  }
}

// Soft Light Cream Theme
export const lightCreamTheme = {
  name: 'Light Cream',
  bgPrimary: '#faf8f5',
  bgSecondary: '#f5f0eb',
  bgTertiary: '#f0e8e0',
  textPrimary: '#3d3d3d',
  textSecondary: '#6b6b6b',
  textMuted: '#9a9a9a',
  accent1: '#d4a574',
  accent2: '#b89968',
  accent3: '#9a7b5a',
  gradient: ['#d4a574', '#b89968', '#9a7b5a'],
  success: '#7b9a74',
  warning: '#d4a574',
  error: '#c97474',
  iconColor: '#6b6b6b',
  iconActive: '#d4a574'
}

// Light Space Theme
export const lightSpaceTheme = {
  name: 'Light Space',
  bgPrimary: '#0f0f23',
  bgSecondary: '#1a1a3e',
  bgTertiary: '#252550',
  textPrimary: '#e8e8ff',
  textSecondary: '#c0c0ff',
  textMuted: '#8080a0',
  accent1: '#6496ff',
  accent2: '#88aaff',
  accent3: '#4466cc',
  gradient: ['#6496ff', '#88aaff', '#4466cc'],
  success: '#55cc88',
  warning: '#ffaa44',
  error: '#ff6688',
  iconColor: '#a0a0c0',
  iconActive: '#6496ff'
}

// Dark Space Theme
export const darkSpaceTheme = {
  name: 'Dark Space',
  bgPrimary: '#0a0a0a',
  bgSecondary: '#121212',
  bgTertiary: '#1a1a1a',
  textPrimary: '#e0e0e0',
  textSecondary: '#a0a0a0',
  textMuted: '#6a6a6a',
  accent1: '#6b9f7f',
  accent2: '#5a8a6a',
  accent3: '#4a755a',
  gradient: ['#6b9f7f', '#5a8a6a', '#4a755a'],
  success: '#5a9a7a',
  warning: '#c9a55a',
  error: '#d96a7a',
  iconColor: '#8a8a8a',
  iconActive: '#6b9f7f'
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    try {
      if (typeof localStorage === 'undefined') return false
      const saved = localStorage.getItem('theme')
      return saved ? saved === 'dark' : false
    } catch (e) {
      console.error('Theme localStorage error:', e)
      return false
    }
  })

  const [activeTheme, setActiveTheme] = useState(() => {
    try {
      if (typeof localStorage === 'undefined') return 'sakura'
      const saved = localStorage.getItem('colorTheme')
      return saved || 'sakura' // Default to Sakura
    } catch (e) {
      console.error('Theme color localStorage error:', e)
      return 'sakura'
    }
  })

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  useEffect(() => {
    localStorage.setItem('colorTheme', activeTheme)
    const root = document.documentElement

    if (activeTheme === 'lightCream') {
      // Light Cream Theme
      root.style.setProperty('--bg-primary', lightCreamTheme.bgPrimary)
      root.style.setProperty('--bg-secondary', lightCreamTheme.bgSecondary)
      root.style.setProperty('--bg-tertiary', lightCreamTheme.bgTertiary)
      root.style.setProperty('--text-primary', lightCreamTheme.textPrimary)
      root.style.setProperty('--text-secondary', lightCreamTheme.textSecondary)
      root.style.setProperty('--text-muted', lightCreamTheme.textMuted)
      root.style.setProperty('--accent-1', lightCreamTheme.accent1)
      root.style.setProperty('--accent-2', lightCreamTheme.accent2)
      root.style.setProperty('--accent-3', lightCreamTheme.accent3)
      root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${lightCreamTheme.gradient.join(', ')})`)
      root.style.setProperty('--success', lightCreamTheme.success)
      root.style.setProperty('--warning', lightCreamTheme.warning)
      root.style.setProperty('--error', lightCreamTheme.error)
      root.style.setProperty('--icon-color', lightCreamTheme.iconColor)
      root.style.setProperty('--icon-active', lightCreamTheme.iconActive)
      root.style.setProperty('--gradient-1', lightCreamTheme.gradient[0])
      root.style.setProperty('--gradient-2', lightCreamTheme.gradient[1])
      root.style.setProperty('--gradient-3', lightCreamTheme.gradient[2])
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.65)')
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.6)')
      root.style.setProperty('--glass-shadow', '0 8px 32px rgba(212, 165, 116, 0.15)')
    } else if (activeTheme === 'lightSpace') {
      // Light Space Theme
      root.style.setProperty('--bg-primary', lightSpaceTheme.bgPrimary)
      root.style.setProperty('--bg-secondary', lightSpaceTheme.bgSecondary)
      root.style.setProperty('--bg-tertiary', lightSpaceTheme.bgTertiary)
      root.style.setProperty('--text-primary', lightSpaceTheme.textPrimary)
      root.style.setProperty('--text-secondary', lightSpaceTheme.textSecondary)
      root.style.setProperty('--text-muted', lightSpaceTheme.textMuted)
      root.style.setProperty('--accent-1', lightSpaceTheme.accent1)
      root.style.setProperty('--accent-2', lightSpaceTheme.accent2)
      root.style.setProperty('--accent-3', lightSpaceTheme.accent3)
      root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${lightSpaceTheme.gradient.join(', ')})`)
      root.style.setProperty('--success', lightSpaceTheme.success)
      root.style.setProperty('--warning', lightSpaceTheme.warning)
      root.style.setProperty('--error', lightSpaceTheme.error)
      root.style.setProperty('--icon-color', lightSpaceTheme.iconColor)
      root.style.setProperty('--icon-active', lightSpaceTheme.iconActive)
      root.style.setProperty('--gradient-1', lightSpaceTheme.gradient[0])
      root.style.setProperty('--gradient-2', lightSpaceTheme.gradient[1])
      root.style.setProperty('--gradient-3', lightSpaceTheme.gradient[2])
      root.style.setProperty('--glass-bg', 'rgba(30, 30, 60, 0.7)')
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)')
      root.style.setProperty('--glass-shadow', '0 8px 32px rgba(0, 0, 0, 0.5)')
    } else if (activeTheme === 'darkSpace' || isDark) {
      // Dark Space Theme
      root.style.setProperty('--bg-primary', darkSpaceTheme.bgPrimary)
      root.style.setProperty('--bg-secondary', darkSpaceTheme.bgSecondary)
      root.style.setProperty('--bg-tertiary', darkSpaceTheme.bgTertiary)
      root.style.setProperty('--text-primary', darkSpaceTheme.textPrimary)
      root.style.setProperty('--text-secondary', darkSpaceTheme.textSecondary)
      root.style.setProperty('--text-muted', darkSpaceTheme.textMuted)
      root.style.setProperty('--accent-1', darkSpaceTheme.accent1)
      root.style.setProperty('--accent-2', darkSpaceTheme.accent2)
      root.style.setProperty('--accent-3', darkSpaceTheme.accent3)
      root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${darkSpaceTheme.gradient.join(', ')})`)
      root.style.setProperty('--success', darkSpaceTheme.success)
      root.style.setProperty('--warning', darkSpaceTheme.warning)
      root.style.setProperty('--error', darkSpaceTheme.error)
      root.style.setProperty('--icon-color', darkSpaceTheme.iconColor)
      root.style.setProperty('--icon-active', darkSpaceTheme.iconActive)
      root.style.setProperty('--gradient-1', darkSpaceTheme.gradient[0])
      root.style.setProperty('--gradient-2', darkSpaceTheme.gradient[1])
      root.style.setProperty('--gradient-3', darkSpaceTheme.gradient[2])
      root.style.setProperty('--glass-bg', 'rgba(30, 30, 30, 0.7)')
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.1)')
      root.style.setProperty('--glass-shadow', '0 8px 32px rgba(0, 0, 0, 0.5)')
    } else if (specialThemes[activeTheme]) {
      // Special Theme
      const theme = specialThemes[activeTheme]
      root.style.setProperty('--bg-primary', theme.bgPrimary)
      root.style.setProperty('--bg-secondary', theme.bgSecondary)
      root.style.setProperty('--bg-tertiary', theme.bgTertiary)
      root.style.setProperty('--accent-1', theme.accent1)
      root.style.setProperty('--accent-2', theme.accent2)
      root.style.setProperty('--accent-gradient', `linear-gradient(135deg, ${theme.gradient.join(', ')})`)
      root.style.setProperty('--gradient-1', theme.gradient[0])
      root.style.setProperty('--gradient-2', theme.gradient[1])
      root.style.setProperty('--gradient-3', theme.gradient[2])
      root.style.setProperty('--text-primary', theme.textPrimary || '#4a4a4a')
      root.style.setProperty('--text-secondary', theme.textSecondary || '#6b6b6b')
      root.style.setProperty('--text-muted', theme.textMuted || '#9a9a9a')
      root.style.setProperty('--success', theme.success || '#7b9a74')
      root.style.setProperty('--warning', theme.warning || '#d4a574')
      root.style.setProperty('--error', theme.error || '#c97474')
      root.style.setProperty('--icon-color', theme.iconColor || '#6b6b6b')
      root.style.setProperty('--icon-active', theme.iconActive || theme.accent1)
      root.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.65)')
      root.style.setProperty('--glass-border', 'rgba(255, 255, 255, 0.6)')
      root.style.setProperty('--glass-shadow', '0 8px 32px rgba(255, 154, 139, 0.15)')
    }
  }, [activeTheme, isDark])

  const toggleTheme = () => {
    if (isDark) {
      // From Dark Space → Light Cream
      setIsDark(false)
      setActiveTheme('lightCream')
    } else {
      if (activeTheme === 'lightCream') {
        // Light Cream → Light Space
        setActiveTheme('lightSpace')
      } else {
        // Light Space → Dark Space
        setIsDark(true)
        setActiveTheme('darkSpace')
      }
    }
  }

  const setTheme = (themeName) => {
    if (themeName === 'lightCream' || themeName === 'lightSpace' || themeName === 'darkSpace') {
      setIsDark(themeName === 'darkSpace')
      setActiveTheme(themeName)
    } else if (specialThemes[themeName]) {
      setActiveTheme(themeName)
      setIsDark(false)
    }
  }

  const getThemeColors = (themeName) => {
    const theme = specialThemes[themeName] || lightCreamTheme
    return {
      bgPrimary: theme.bgPrimary,
      bgSecondary: theme.bgSecondary,
      bgTertiary: theme.bgTertiary,
      textPrimary: theme.textPrimary || '#1a1a2e',
      textSecondary: theme.textSecondary || '#4a5568',
      accent1: theme.accent1 || theme.gradient?.[0] || '#667eea',
      accent2: theme.accent2 || theme.gradient?.[1] || '#764ba2',
      gradient: theme.gradient
    }
  }

  return (
    <ThemeContext.Provider value={{
      isDark,
      toggleTheme,
      activeTheme,
      setTheme,
      getThemeColors,
      specialThemes,
      lightSpaceTheme,
      darkSpaceTheme,
      themeList: ['lightSpace', 'darkSpace', ...Object.keys(specialThemes)]
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
