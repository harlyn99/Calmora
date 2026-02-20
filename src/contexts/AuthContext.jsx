import React, { createContext, useContext, useState, useEffect } from 'react'
import { authAPI, storage } from '../services/api'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(storage.getToken())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = storage.getToken()
      const storedUser = storage.getUser()

      if (storedToken && storedUser) {
        try {
          const res = await authAPI.getCurrentUser(storedToken)
          if (res.user) {
            setUser(res.user)
            setToken(storedToken)
          } else {
            // Token invalid, clear
            storage.removeToken()
            storage.removeUser()
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          storage.removeToken()
          storage.removeUser()
        }
      }
      setLoading(false)
    }

    initAuth()
  }, [])

  const login = async (username, password) => {
    const res = await authAPI.login(username, password)
    
    if (res.access_token) {
      setToken(res.access_token)
      setUser(res.user)
      storage.setToken(res.access_token)
      storage.setUser(res.user)
      return { success: true }
    }
    
    return { success: false, error: res.error }
  }

  const register = async (username, email, password) => {
    const res = await authAPI.register(username, email, password)
    
    if (res.access_token) {
      setToken(res.access_token)
      setUser(res.user)
      storage.setToken(res.access_token)
      storage.setUser(res.user)
      return { success: true }
    }
    
    return { success: false, error: res.error }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    storage.removeToken()
    storage.removeUser()
  }

  const updateUser = async (data) => {
    if (!token) return { success: false, error: 'Not authenticated' }
    
    const res = await authAPI.updateProfile(token, data)
    
    if (res.user) {
      setUser(res.user)
      storage.setUser(res.user)
      return { success: true }
    }
    
    return { success: false, error: res.error }
  }

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!token
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
