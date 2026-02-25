import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, Settings, LogOut, User, Info, Palette, Gamepad2, Music, Heart, Home, BookOpen, Book, Flower, BarChart3, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useEnergyMode } from '../contexts/EnergyModeContext'
import { mockSyncNow } from '../services/sync'
import './TopNavigation.css'

export const TopNavigation = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [showMenu, setShowMenu] = React.useState(false)
  const location = useLocation()
  const { mode, setMode } = useEnergyMode()
  const [lastSync, setLastSync] = React.useState(() => localStorage.getItem('lastSync') || null)

  const handleLogout = () => {
    logout()
    navigate('/login')
    setShowMenu(false)
  }

  // Main navigation - all features visible
  const navLinks = [
    { path: '/dashboard', label: 'Home', icon: Home },
    { path: '/schedule', label: 'Schedule', icon: BookOpen },
    { path: '/journal', label: 'Journal', icon: Book },
    { path: '/memory-lane', label: 'Memories', icon: Flower },
    { path: '/analytics', label: 'Analytics', icon: BarChart3 },
    { path: '/gacha-pet', label: 'Gacha', icon: Sparkles },
    { path: '/gamification', label: 'Games', icon: Gamepad2 },
    { path: '/music', label: 'Music', icon: Music },
    { path: '/cute-pet', label: 'Pet', icon: Heart },
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
            {navLinks.map((link) => {
              const Icon = link.icon
              const active = location.pathname === link.path
              return (
                <li key={link.path}>
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate(link.path) }}>
                    {Icon && <Icon size={16} className={`icon icon-sm ${active ? 'icon-active' : ''}`} />}
                    <span>{link.label}</span>
                  </a>
                </li>
              )
            })}
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
                  <User size={18} className="icon icon-md" /> Profile
                </button>

                <button className="menu-item" onClick={() => {
                  navigate('/settings')
                  setShowMenu(false)
                }}>
                  <Palette size={18} className="icon icon-md" /> Themes
                </button>

                <button className="menu-item" onClick={() => {
                  navigate('/settings')
                  setShowMenu(false)
                }}>
                  <Settings size={18} className="icon icon-md" /> Settings
                </button>

                <div className="menu-item" style={{display:'flex', flexDirection:'column', gap:8}}>
                  <div style={{display:'flex', alignItems:'center', gap:8}}>
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
                  <Info size={18} className="icon icon-md" /> About
                </button>

                <hr className="menu-divider" />
                <button className="menu-item logout" onClick={handleLogout}>
                  <LogOut size={18} className="icon icon-md" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  )
}
