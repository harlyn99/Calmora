import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { EnergyModeProvider } from './contexts/EnergyModeContext'
import { TimeThemeProvider } from './contexts/TimeThemeContext'
import { XPProvider } from './contexts/XPContext'
import { SoundProvider } from './contexts/SoundContext'
import { useEffect, useState } from 'react'
import { initDB } from './services/dbService'
import OnboardingModal from './components/OnboardingModal'
import AnimatedBackground from './components/Background'
import { ParticleSystem } from './components/ParticleSystem'
import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import { TasksPage } from './pages/TasksPage'
import { JournalPage } from './pages/JournalPage'
import { TimerPage } from './pages/TimerPage'
import { MeditationPage } from './pages/MeditationPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { AboutPage } from './pages/AboutPage'
import HabitTrackerPage from './pages/HabitTrackerPage'
import MoodTrackerPage from './pages/MoodTrackerPage'
import GoalsPage from './pages/GoalsPage'
import ReviewPage from './pages/ReviewPage'
import PomodoroStatsPage from './pages/PomodoroStatsPage'
import WellnessPage from './pages/WellnessPage'
import useKeyboardShortcuts from './utils/useKeyboardShortcuts'
import './styles/global.css'

// Add keyboard shortcuts hook to the app
function AppKeyboardShortcuts() {
  useKeyboardShortcuts()
  return null
}

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
      <Route path="/tasks" element={<ProtectedRoute><TasksPage /></ProtectedRoute>} />
      <Route path="/journal" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
      <Route path="/timer" element={<ProtectedRoute><TimerPage /></ProtectedRoute>} />
      <Route path="/meditation" element={<ProtectedRoute><MeditationPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
      <Route path="/habits" element={<ProtectedRoute><HabitTrackerPage /></ProtectedRoute>} />
      <Route path="/mood" element={<ProtectedRoute><MoodTrackerPage /></ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute><GoalsPage /></ProtectedRoute>} />
      <Route path="/review" element={<ProtectedRoute><ReviewPage /></ProtectedRoute>} />
      <Route path="/stats" element={<ProtectedRoute><PomodoroStatsPage /></ProtectedRoute>} />
      <Route path="/wellness" element={<ProtectedRoute><WellnessPage /></ProtectedRoute>} />

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
          <TimeThemeProvider>
            <XPProvider>
              <SoundProvider>
                <BrowserRouter>
                  <AnimatedBackground />
                  <ParticleSystem particleCount={50} cursorInteraction={true} constellation={true} />
                  
                  <AppKeyboardShortcuts />
                  <AppRoutes />
                  {showOnboarding && (
                    <OnboardingModal onClose={() => { localStorage.setItem('seenOnboarding', '1'); setShowOnboarding(false) }} />
                  )}
                </BrowserRouter>
              </SoundProvider>
            </XPProvider>
          </TimeThemeProvider>
        </EnergyModeProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
