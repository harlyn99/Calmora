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

  return (
    <nav className="top-nav">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => navigate('/dashboard')}>
          <h1>✨ Calmora</h1>
        </div>

        {/* Center Navigation */}
        <ul className="nav-menu">
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/dashboard') }}>Home</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/tasks') }}>Tasks</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/journal') }}>Journal</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/timer') }}>Timer</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/meditation') }}>Meditation</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/habits') }}>Habits</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/mood') }}>Mood</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/goals') }}>Goals</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/wellness') }}>Wellness</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/review') }}>Review</a></li>
          <li><a href="#" onClick={(e) => { e.preventDefault(); navigate('/stats') }}>Stats</a></li>
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
                    style={{padding:'6px 10px', fontSize:'12px'}}
                  >Sync</button>

                  <button
                    className="neomorph-button"
                    style={{padding:'6px 10px', fontSize:'12px'}}
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
                <p style={{fontSize:12, color:'var(--text-muted)', marginBottom:8}}>Energy Mode</p>
                <div style={{display:'flex', gap:8}}>
                  <button
                    className={`neomorph-button ${mode === 'focus' ? 'primary' : ''}`}
                    onClick={() => setMode('focus')}
                    style={{padding:'6px 10px', fontSize:'12px'}}
                  >Focus</button>
                  <button
                    className={`neomorph-button ${mode === 'calm' ? 'primary' : ''}`}
                    onClick={() => setMode('calm')}
                    style={{padding:'6px 10px', fontSize:'12px'}}
                  >Calm</button>
                  <button
                    className={`neomorph-button ${mode === 'balance' ? 'primary' : ''}`}
                    onClick={() => setMode('balance')}
                    style={{padding:'6px 10px', fontSize:'12px'}}
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
  )
}
