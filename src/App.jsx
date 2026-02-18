import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { EnergyModeProvider } from './contexts/EnergyModeContext'
import { useEffect, useState } from 'react'
import { initDB } from './services/dbService'
import OnboardingModal from './components/OnboardingModal'
import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { TodoPage } from './pages/TodoPage'
import { PlannerPage } from './pages/PlannerPage'
import { JournalPage } from './pages/JournalPage'
import { TimerPage } from './pages/TimerPage'
import { MeditationPage } from './pages/MeditationPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { AboutPage } from './pages/AboutPage'
import './styles/global.css'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

function AppRoutes() {
  const { isAuthenticated } = useAuth()

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />

      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/todo" element={<ProtectedRoute><TodoPage /></ProtectedRoute>} />
      <Route path="/planner" element={<ProtectedRoute><PlannerPage /></ProtectedRoute>} />
      <Route path="/journal" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
      <Route path="/timer" element={<ProtectedRoute><TimerPage /></ProtectedRoute>} />
      <Route path="/meditation" element={<ProtectedRoute><MeditationPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}

export function App() {
  const [showOnboarding, setShowOnboarding] = useState(false)

  useEffect(() => {
    // initialize local IndexedDB and migrate existing localStorage data
    if (typeof window !== 'undefined') initDB()
    try {
      const seen = localStorage.getItem('seenOnboarding')
      if (!seen) setShowOnboarding(true)
    } catch (e) {}
  }, [])
  return (
    <ThemeProvider>
      <AuthProvider>
        <EnergyModeProvider>
          <BrowserRouter>
            <AppRoutes />
            {showOnboarding && (
              <OnboardingModal onClose={() => { localStorage.setItem('seenOnboarding', '1'); setShowOnboarding(false) }} />
            )}
          </BrowserRouter>
        </EnergyModeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
