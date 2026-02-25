import React, { createContext, useContext } from 'react'

const IconThemeContext = createContext()

// Consistent color palette for all icons across the app
// Using CSS variables to respect active theme
const ICON_COLORS = {
  primary: 'var(--accent-1, #667eea)',    // Theme-based - main actions
  success: 'var(--success-color, #4CAF50)',    // Green - positive actions
  warning: 'var(--warning-color, #FFC107)',    // Amber - cautions
  danger: 'var(--error, #ef4444)',     // Red - delete/danger
  info: 'var(--info-color, #2196F3)',       // Blue - information
  neutral: '#9CA3AF',    // Gray - neutral items
  accent: 'var(--accent-2, #764ba2)',     // Theme-based - accents
}

// Icon size standards
const ICON_SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
}

export function IconThemeProvider({ children }) {
  const getIconColor = (type) => {
    return ICON_COLORS[type] || ICON_COLORS.neutral
  }

  const getIconSize = (size) => {
    return ICON_SIZES[size] || ICON_SIZES.md
  }

  return (
    <IconThemeContext.Provider value={{ 
      getIconColor, 
      getIconSize,
      colors: ICON_COLORS,
      sizes: ICON_SIZES
    }}>
      {children}
    </IconThemeContext.Provider>
  )
}

export const useIconTheme = () => {
  const context = useContext(IconThemeContext)
  if (!context) {
    throw new Error('useIconTheme must be used within IconThemeProvider')
  }
  return context
}
