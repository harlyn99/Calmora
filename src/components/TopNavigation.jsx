import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Settings, LogOut, User, Info, Palette } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useEnergyMode } from '../contexts/EnergyModeContext'
import { mockSyncNow } from '../services/sync'
import './TopNavigation.css'

export const TopNavigation = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [showMenu, setShowMenu] = React.useState(false)
  const { mode, setMode } = useEnergyMode()
  const [lastSync, setLastSync] = React.useState(() => localStorage.getItem('lastSync') || null)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setShowMenu(false)
  }

  const navLinks = [
    { path: '/dashboard', label: 'Home' },
    { path: '/tasks', label: 'Tasks' },
    { path: '/journal', label: 'Journal' },
    { path: '/timer', label: 'Timer' },
    { path: '/meditation', label: 'Meditation' },
    { path: '/habits', label: 'Habits' },
    { path: '/mood', label: 'Mood' },
    { path: '/goals', label: 'Goals' },
    { path: '/wellness', label: 'Wellness' },
    { path: '/ai', label: 'AI' },
    { path: '/pet', label: 'Pet' },
    { path: '/music', label: 'Music' },
    { path: '/review', label: 'Review' },
    { path: '/stats', label: 'Stats' },
  ]

  return (
    <>
      <nav className="top-nav">
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo" onClick={() => navigate('/dashboard')}>
            <h1>✨ Calmora</h1>
          </div>

          {/* Center Navigation - Desktop */}
          <ul className="nav-menu">
            {navLinks.map((link) => (
              <li key={link.path}>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate(link.path) }}>{link.label}</a>
              </li>
            ))}
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

            {/* Desktop Dropdown Menu */}
            {showMenu && (
              <div className="dropdown-menu fade-in">
                <div className="menu-header">
                  <span>{user?.username || 'User'}</span>
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
                  <Palette size={18} /> Themes
                </button>

                <button className="menu-item" onClick={() => {
                  navigate('/settings')
                  setShowMenu(false)
                }}>
                  <Settings size={18} /> Settings
                </button>

                <div className="menu-item" style={{display:'flex', flexDirection:'column', gap:8}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
                    <span>📡</span>
                    <small style={{color: 'var(--text-muted)'}}>{lastSync ? `Last synced: ${lastSync}` : 'Last synced: never'}</small>
                  </div>
                  <div style={{display:'flex', gap:8}}>
                    <button
                      onClick={async () => {
                        const res = await mockSyncNow()
                        if (res && res.date) setLastSync(res.date)
                      }}
                      className="neomorph-button"
                      style={{padding:'6px 10px', fontSize:'12px', fontWeight:'600', color:'var(--text-primary)'}}
                    >Sync</button>

                    <button
                      className="neomorph-button"
                      style={{padding:'6px 10px', fontSize:'12px', fontWeight:'600', color:'var(--text-primary)'}}
                      onClick={async () => {
                        const mod = await import('../utils/dataAdapter')
                        const data = await mod.default.exportAll()
                        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                        const url = URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = 'calmora-backup.json'
                        a.click()
                        URL.revokeObjectURL(url)
                      }}
                    >Export</button>
                  </div>
                </div>

                <div className="menu-divider" />
                <div style={{padding: '8px 12px'}}>
                  <p style={{fontSize:12, color:'var(--text-muted)', marginBottom:8, fontWeight:'600'}}>Energy Mode</p>
                  <div style={{display:'flex', gap:8}}>
                    <button
                      className={`neomorph-button ${mode === 'focus' ? 'primary' : ''}`}
                      onClick={() => setMode('focus')}
                      style={{padding:'6px 10px', fontSize:'12px', fontWeight:'600', color:'var(--text-primary)'}}
                    >Focus</button>
                    <button
                      className={`neomorph-button ${mode === 'calm' ? 'primary' : ''}`}
                      onClick={() => setMode('calm')}
                      style={{padding:'6px 10px', fontSize:'12px', fontWeight:'600', color:'var(--text-primary)'}}
                    >Calm</button>
                    <button
                      className={`neomorph-button ${mode === 'balance' ? 'primary' : ''}`}
                      onClick={() => setMode('balance')}
                      style={{padding:'6px 10px', fontSize:'12px', fontWeight:'600', color:'var(--text-primary)'}}
                    >Balance</button>
                  </div>
                </div>

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
    </>
  )
}
