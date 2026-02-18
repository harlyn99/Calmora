import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Settings, Moon, Sun, LogOut, User, Info } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useAuth } from '../contexts/AuthContext'
import './TopNavigation.css'

export const TopNavigation = () => {
  const navigate = useNavigate()
  const { isDark, toggleTheme } = useTheme()
  const { user, logout } = useAuth()
  const [showMenu, setShowMenu] = React.useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setShowMenu(false)
  }

  return (
    <nav className="top-nav">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => navigate('/dashboard')}>
          <h1>✨ Calmora</h1>
        </div>

        {/* Center Navigation */}
        <ul className="nav-menu">
          <li><a href="#" onClick={() => navigate('/dashboard')}>Home</a></li>
          <li><a href="#" onClick={() => navigate('/planner')}>Planner</a></li>
          <li><a href="#" onClick={() => navigate('/todo')}>To-Do</a></li>
          <li><a href="#" onClick={() => navigate('/journal')}>Journal</a></li>
          <li><a href="#" onClick={() => navigate('/timer')}>Timer</a></li>
          <li><a href="#" onClick={() => navigate('/meditation')}>Meditation</a></li>
        </ul>

        {/* Right Side - Menu Button */}
        <div className="nav-right">
          <button
            className="menu-toggle"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
          >
            <Menu size={24} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="dropdown-menu fade-in">
              <div className="menu-header">
                <span>{user?.username}</span>
              </div>
              <hr className="menu-divider" />
              
              <button className="menu-item" onClick={() => {
                navigate('/profile')
                setShowMenu(false)
              }}>
                <User size={18} /> Profile
              </button>
              
              <button className="menu-item" onClick={() => {
                navigate('/settings')
                setShowMenu(false)
              }}>
                <Settings size={18} /> Settings
              </button>

              <button className="menu-item" onClick={toggleTheme}>
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>

              <button className="menu-item" disabled>
                <span>📡</span> Sync (Coming Soon)
              </button>

              <button className="menu-item" onClick={() => {
                navigate('/about')
                setShowMenu(false)
              }}>
                <Info size={18} /> About
              </button>

              <hr className="menu-divider" />
              <button className="menu-item logout" onClick={handleLogout}>
                <LogOut size={18} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
