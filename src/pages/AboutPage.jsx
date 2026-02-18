import React from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Heart, Zap } from 'lucide-react'
import './AboutPage.css'

export const AboutPage = () => {
  return (
    <div className="about-wrapper">
      <TopNavigation />
      
      <div className="about-container fade-in">
        <div className="about-hero">
          <h1>✨ Calmora</h1>
          <p className="tagline">Your Personal Productivity Sanctuary</p>
        </div>

        {/* Mission */}
        <div className="about-section neomorph-md">
          <h3>🎯 Our Mission</h3>
          <p>
            Calmora is designed to be a calm, peaceful space for students and young professionals 
            who want to focus, stay organized, and practice mindfulness—without feeling overwhelmed.
          </p>
          <p>
            We believe productivity doesn't have to be stressful. Sometimes, the best work happens 
            when you're in a state of calm focus.
          </p>
        </div>

        {/* Features */}
        <div className="about-section neomorph-md">
          <h3>✨ Key Features</h3>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-emoji">📅</span>
              <h4>Daily Planner</h4>
              <p>Simple, focused planning without overwhelm</p>
            </div>
            <div className="feature-card">
              <span className="feature-emoji">✓</span>
              <h4>To-Do Lists</h4>
              <p>Track tasks with a clean, minimal interface</p>
            </div>
            <div className="feature-card">
              <span className="feature-emoji">📝</span>
              <h4>Journal</h4>
              <p>Reflect and process your thoughts daily</p>
            </div>
            <div className="feature-card">
              <span className="feature-emoji">⏱️</span>
              <h4>Focus Timer</h4>
              <p>Pomodoro-based timer for deep work</p>
            </div>
            <div className="feature-card">
              <span className="feature-emoji">🧘</span>
              <h4>Meditation</h4>
              <p>Guided breathing exercises for calm</p>
            </div>
            <div className="feature-card">
              <span className="feature-emoji">🌙</span>
              <h4>Dark Mode</h4>
              <p>Comfortable for eyes at any time of day</p>
            </div>
          </div>
        </div>

        {/* Design Philosophy */}
        <div className="about-section neomorph-md">
          <h3>🎨 Design Philosophy</h3>
          <p>
            Calmora uses modern neumorphism design with soft shadows and gentle colors. 
            The interface is intentionally minimal—lots of whitespace, no clutter, just what you need.
          </p>
          <ul className="philosophy-list">
            <li>Soft and warm aesthetic</li>
            <li>Mobile-first responsive design</li>
            <li>Smooth animations and transitions</li>
            <li>Premium, polished feel</li>
            <li>Accessibility-focused</li>
          </ul>
        </div>

        {/* Values */}
        <div className="about-section neomorph-md">
          <h3>💫 Our Values</h3>
          <div className="values-grid">
            <div className="value-item">
              <h4>Calm</h4>
              <p>We create a peaceful digital space</p>
            </div>
            <div className="value-item">
              <h4>Focus</h4>
              <p>Helping you achieve deep work</p>
            </div>
            <div className="value-item">
              <h4>Mindfulness</h4>
              <p>Practicing presence and awareness</p>
            </div>
            <div className="value-item">
              <h4>Simplicity</h4>
              <p>Beautiful through its simplicity</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="about-section neomorph-md">
          <h3>🛠️ Built With</h3>
          <p>Calmora is built with modern web technologies:</p>
          <ul className="tech-list">
            <li>React 18 - UI library</li>
            <li>Vite - Build tool</li>
            <li>CSS3 - Styling with neumorphism</li>
            <li>Local Storage - Data persistence</li>
          </ul>
        </div>

        {/* Contact & Support */}
        <div className="about-section neomorph-md">
          <h3>💬 Support</h3>
          <p>
            Calmora is a passion project created to help students and young professionals 
            maintain focus and peace while being productive.
          </p>
          <p>
            Your data is stored locally in your browser. We believe in privacy-first design.
          </p>
        </div>

        {/* Footer */}
        <div className="about-footer">
          <p>Made with <Heart size={16} className="heart-icon" /> and <Zap size={16} className="zap-icon" /> for a calmer world</p>
          <p className="version">Calmora v1.0.0</p>
        </div>
      </div>
    </div>
  )
}
