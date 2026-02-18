import React from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { useAuth } from '../contexts/AuthContext'
import { Mail, Calendar } from 'lucide-react'
import './ProfilePage.css'

export const ProfilePage = () => {
  const { user } = useAuth()

  return (
    <div className="profile-wrapper">
      <TopNavigation />
      
      <div className="profile-container fade-in">
        <div className="profile-header neomorph-md">
          <div className="profile-avatar">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h1>{user?.username}</h1>
            <p>Calmora Member</p>
          </div>
        </div>

        {/* Stats */}
        <div className="profile-stats">
          <div className="stat-card neomorph-md">
            <p className="stat-title">Tasks Completed</p>
            <p className="stat-value">
              {JSON.parse(localStorage.getItem('todos') || '[]').filter(t => t.completed).length}
            </p>
          </div>
          <div className="stat-card neomorph-md">
            <p className="stat-title">Focus Sessions</p>
            <p className="stat-value">
              {localStorage.getItem('timerSessions') || '0'}
            </p>
          </div>
          <div className="stat-card neomorph-md">
            <p className="stat-title">Journal Entries</p>
            <p className="stat-value">
              {JSON.parse(localStorage.getItem('journalEntries') || '[]').length}
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="account-section neomorph-md">
          <h3>Account Information</h3>
          <div className="info-item">
            <Mail size={18} />
            <div>
              <p className="label">Username</p>
              <p className="value">{user?.username}</p>
            </div>
          </div>
          <div className="info-item">
            <Calendar size={18} />
            <div>
              <p className="label">Member Since</p>
              <p className="value">2024</p>
            </div>
          </div>
        </div>

        {/* Goals */}
        <div className="profile-section neomorph-md">
          <h3>Your Goals</h3>
          <ul className="goals-list">
            <li>🎯 Stay focused and calm every day</li>
            <li>📝 Reflect through journaling</li>
            <li>⏱️ Build a consistent focus practice</li>
            <li>🧘 Practice mindfulness and meditation</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
