import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (username, password) => {
    // Simple mock auth - in production, verify with backend
    const userData = { username, id: Date.now() }
    setUser(userData)
    return userData
  }

  const register = (username, password) => {
    // Simple mock registration
    const userData = { username, id: Date.now() }
    setUser(userData)
    return userData
  }

  const logout = () => setUser(null)
  const isAuthenticated = !!user

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
