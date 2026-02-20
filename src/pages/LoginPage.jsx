import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { LogIn, User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import './LoginPage.css'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  
  const [isRegister, setIsRegister] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      let result
      if (isRegister) {
        result = await register(formData.username, formData.email, formData.password)
      } else {
        result = await login(formData.username, formData.password)
      }

      if (result.success) {
        navigate('/dashboard')
      } else {
        setError(result.error || 'Authentication failed')
      }
    } catch (err) {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="logo-section">
              <div className="logo-icon">🧘</div>
              <h1>Calmora</h1>
            </div>
            <p className="subtitle">Your Personal Productivity Space</p>
          </div>

          <div className="auth-toggle">
            <button
              className={`toggle-btn ${!isRegister ? 'active' : ''}`}
              onClick={() => setIsRegister(false)}
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
            <button
              className={`toggle-btn ${isRegister ? 'active' : ''}`}
              onClick={() => setIsRegister(true)}
            >
              <User size={18} />
              <span>Register</span>
            </button>
          </div>

          {error && (
            <div className="error-message">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label className="form-label">
                <User size={18} />
                <span>Username</span>
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter username"
                className="form-input"
                required
                autoComplete="username"
              />
            </div>

            {isRegister && (
              <div className="form-group">
                <label className="form-label">
                  <Mail size={18} />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="form-input"
                  required
                  autoComplete="email"
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">
                <Lock size={18} />
                <span>Password</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="form-input"
                  required
                  autoComplete="current-password"
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <span className="loading-spinner">⏳</span>
              ) : (
                <>
                  {isRegister ? <User size={20} /> : <LogIn size={20} />}
                  {isRegister ? 'Create Account' : 'Sign In'}
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              {isRegister ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                className="link-btn"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? 'Login' : 'Register'}
              </button>
            </p>
          </div>
        </div>

        <div className="login-features">
          <h3>✨ Features</h3>
          <ul>
            <li>📝 Task Management & To-Do Lists</li>
            <li>🎯 Habit Tracker with Garden Growth</li>
            <li> Mood Tracking & Insights</li>
            <li>🐾 Virtual Pet Companion</li>
            <li>⏱️ Focus Timer (Pomodoro)</li>
            <li>📔 Journal & Reflection</li>
            <li>🧘 Meditation & Breathing</li>
            <li>🎵 Music Player</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
