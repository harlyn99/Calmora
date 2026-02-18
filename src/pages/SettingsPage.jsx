import React, { useState } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { useTheme } from '../contexts/ThemeContext'
import KeyboardShortcutsModal from '../components/KeyboardShortcutsModal'
import { checkAndRequestPermission } from '../utils/notifications'
import { Bell, Keyboard, Palette } from 'lucide-react'
import './SettingsPage.css'

export const SettingsPage = () => {
  const { isDark, toggleTheme, activeTheme, setTheme, themes } = useTheme()
  const [showShortcutsModal, setShowShortcutsModal] = useState(false)
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)

  const handleEnableNotifications = async () => {
    const granted = await checkAndRequestPermission()
    setNotificationsEnabled(granted)
  }

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

          {/* Color Themes */}
          <div className="color-themes-section">
            <div className="setting-label-row">
              <Palette size={18} className="setting-icon" />
              <p className="setting-label">Color Theme</p>
            </div>
            <p className="setting-desc">Choose your favorite soft color palette</p>
            <div className="color-themes-grid">
              {Object.entries(themes).map(([key, theme]) => (
                <button
                  key={key}
                  className={`color-theme-btn ${activeTheme === key ? 'active' : ''}`}
                  onClick={() => setTheme(key)}
                  style={{ '--theme-color': theme.accent1 }}
                >
                  <div className="color-preview" style={{ background: `linear-gradient(135deg, ${theme.accent1}, ${theme.accent2})` }} />
                  <span className="color-name">{theme.name}</span>
                  {activeTheme === key && <span className="color-check">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="settings-section neomorph-md">
          <h3>Notifications</h3>
          <div className="setting-item">
            <div>
              <div className="setting-label-row">
                <Bell size={18} className="setting-icon" />
                <p className="setting-label">Enable Notifications</p>
              </div>
              <p className="setting-desc">Get reminders for tasks, habits, and daily motivation</p>
            </div>
            <button
              className={`neomorph-button ${notificationsEnabled ? 'success' : ''}`}
              onClick={handleEnableNotifications}
            >
              {notificationsEnabled ? '✓ Enabled' : 'Enable'}
            </button>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="settings-section neomorph-md">
          <h3>Keyboard Shortcuts</h3>
          <div className="setting-item">
            <div>
              <div className="setting-label-row">
                <Keyboard size={18} className="setting-icon" />
                <p className="setting-label">View Shortcuts</p>
              </div>
              <p className="setting-desc">Quick keyboard shortcuts to navigate the app</p>
            </div>
            <button
              className="neomorph-button"
              onClick={() => setShowShortcutsModal(true)}
            >
              View Shortcuts
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

      {showShortcutsModal && (
        <KeyboardShortcutsModal onClose={() => setShowShortcutsModal(false)} />
      )}
    </div>
  )
}
