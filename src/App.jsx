import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { EnergyModeProvider } from './contexts/EnergyModeContext'
import { TimeThemeProvider } from './contexts/TimeThemeContext'
import { XPProvider } from './contexts/XPContext'
import { SoundProvider } from './contexts/SoundContext'
import { IconThemeProvider } from './contexts/IconThemeContext'
import { useEffect, useState } from 'react'
import { initDB } from './services/dbService'
import OnboardingModal from './components/OnboardingModal'
import AnimatedBackground from './components/Background'
import { ParticleSystem } from './components/ParticleSystem'
import { LoginPage } from './pages/LoginPage'
import { Dashboard } from './pages/Dashboard'
import SchedulePage from './pages/SchedulePage'
import { JournalPage } from './pages/JournalPage'
import AnalyticsPage from './pages/AnalyticsPage'
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
import CuteVirtualPet from './pages/CuteVirtualPet'
import MusicPlayerPage from './pages/MusicPlayerPage'
import GamificationHub from './pages/GamificationHub'
import MemoryLane from './pages/MemoryLane'
import BreathingGamePage from './pages/BreathingGamePage'
import FocusGardenPage from './pages/FocusGardenPage'
import useKeyboardShortcuts from './utils/useKeyboardShortcuts'
import './styles/global.css'
import './styles/icons.css'

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
      <Route path="/schedule" element={<ProtectedRoute><SchedulePage /></ProtectedRoute>} />
      <Route path="/journal" element={<ProtectedRoute><JournalPage /></ProtectedRoute>} />
      <Route path="/analytics" element={<ProtectedRoute><AnalyticsPage /></ProtectedRoute>} />
      <Route path="/timer" element={<ProtectedRoute><TimerPage /></ProtectedRoute>} />
      <Route path="/meditation" element={<ProtectedRoute><Navigate to="/dashboard" replace /></ProtectedRoute>} />
      <Route path="/habits" element={<ProtectedRoute><Navigate to="/schedule" replace /></ProtectedRoute>} />
      <Route path="/goals" element={<ProtectedRoute><Navigate to="/schedule" replace /></ProtectedRoute>} />
      <Route path="/review" element={<ProtectedRoute><Navigate to="/analytics" replace /></ProtectedRoute>} />
      <Route path="/stats" element={<ProtectedRoute><Navigate to="/analytics" replace /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
      <Route path="/mood" element={<ProtectedRoute><MoodTrackerPage /></ProtectedRoute>} />
      <Route path="/wellness" element={<ProtectedRoute><WellnessPage /></ProtectedRoute>} />
      <Route path="/cute-pet" element={<ProtectedRoute><CuteVirtualPet /></ProtectedRoute>} />
      <Route path="/pet" element={<ProtectedRoute><Navigate to="/cute-pet" replace /></ProtectedRoute>} />
      <Route path="/music" element={<ProtectedRoute><MusicPlayerPage /></ProtectedRoute>} />
      <Route path="/gamification" element={<ProtectedRoute><GamificationHub /></ProtectedRoute>} />
      <Route path="/game" element={<ProtectedRoute><Navigate to="/gamification" replace /></ProtectedRoute>} />
      <Route path="/game/breathing" element={<ProtectedRoute><BreathingGamePage /></ProtectedRoute>} />
      <Route path="/game/garden" element={<ProtectedRoute><FocusGardenPage /></ProtectedRoute>} />
      <Route path="/memory-lane" element={<ProtectedRoute><MemoryLane /></ProtectedRoute>} />

      {/* Default Redirect */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
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
    <IconThemeProvider>
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
    </IconThemeProvider>
  )
}

export default App
