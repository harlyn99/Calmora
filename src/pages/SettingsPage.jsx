import React from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { useTheme } from '../contexts/ThemeContext'
import './SettingsPage.css'

export const SettingsPage = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <div className="settings-wrapper">
      <TopNavigation />
      
      <div className="settings-container fade-in">
        <div className="settings-header">
          <h1>Settings</h1>
          <p>Customize your Calmora experience</p>
        </div>

        {/* Theme Settings */}
        <div className="settings-section neomorph-md">
          <h3>Appearance</h3>
          <div className="setting-item">
            <div>
              <p className="setting-label">Dark Mode</p>
              <p className="setting-desc">Choose your preferred theme</p>
            </div>
            <button
              className={`theme-toggle ${isDark ? 'dark' : 'light'}`}
              onClick={toggleTheme}
            >
              <span className="toggle-switch"></span>
            </button>
          </div>
        </div>

        {/* Data Settings */}
        <div className="settings-section neomorph-md">
          <h3>Data & Privacy</h3>
          <div className="setting-item">
            <div>
              <p className="setting-label">Local Storage</p>
              <p className="setting-desc">All your data is stored locally in your browser</p>
            </div>
            <span className="setting-badge">✓ Secure</span>
          </div>
          <div className="setting-item">
            <div>
              <p className="setting-label">Clear All Data</p>
              <p className="setting-desc">Remove all saved plans, tasks, and journals</p>
            </div>
            <button
              className="neomorph-button danger"
              onClick={() => {
                if (confirm('Are you sure? This cannot be undone.')) {
                  localStorage.clear()
                  alert('All data cleared!')
                  window.location.reload()
                }
              }}
            >
              Clear
            </button>
          </div>
        </div>

        {/* About App */}
        <div className="settings-section neomorph-md">
          <h3>About</h3>
          <div className="about-info">
            <p><strong>App:</strong> Calmora v1.0.0</p>
            <p><strong>Purpose:</strong> Your personal productivity sanctuary</p>
            <p><strong>Last Updated:</strong> 2024</p>
          </div>
        </div>

        {/* Info */}
        <div className="settings-info">
          <p>💡 Tip: All your data is stored locally in your browser. No data is sent to external servers.</p>
        </div>
      </div>
    </div>
  )
}
