import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Lock } from 'lucide-react'
import './LoginPage.css'

export const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login, register } = useAuth()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!username || !password) {
      setError('Please fill in all fields')
      return
    }

    try {
      if (isLogin) {
        login(username, password)
      } else {
        register(username, password)
      }
      navigate('/dashboard')
    } catch (err) {
      setError('Authentication failed. Please try again.')
    }
  }

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="bg-gradient"></div>
      <div className="floating-element el-1"></div>
      <div className="floating-element el-2"></div>
      <div className="floating-element el-3"></div>

      {/* Main Content */}
      <div className="login-card fade-in">
        {/* Header */}
        <div className="login-header">
          <h1>✨ Calmora</h1>
          <p className="subtitle">Your personal productivity sanctuary</p>
        </div>

        {/* Greeting */}
        <div className="greeting-section">
          <p>Welcome back, friend</p>
          <p className="greeting-icon">🌙 ☀️ 🌙</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Username Input */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="neomorph-button primary login-button">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Toggle Auth Mode */}
        <div className="auth-toggle">
          <p>
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
            <button
              type="button"
              onClick={() => {
                setIsLogin(!isLogin)
                setError('')
              }}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>

        {/* Demo Note */}
        <div className="demo-note">
          <p>💡 Demo: Use any username and password</p>
        </div>
      </div>
    </div>
  )
}
