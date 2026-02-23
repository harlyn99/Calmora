import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useXP } from '../contexts/XPContext'
import { Trophy, Sparkles, Gift, Gamepad2, Sprout, Star, Home } from 'lucide-react'
import AchievementGallery from '../components/AchievementGallery'
import PowerUps from '../components/PowerUps'
import DailyLuckyDraw from '../components/DailyLuckyDraw'
import FocusGarden from '../components/FocusGarden'
import './GamificationHub.css'

export default function GamificationHub() {
  const navigate = useNavigate()
  const { xp, addXP, achievements } = useXP()
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem('petCoins')
    return saved ? parseInt(saved) : 150
  })
  const [activeTab, setActiveTab] = useState('achievements')

  const handleAddCoins = (amount) => {
    const newCoins = coins + amount
    setCoins(newCoins)
    localStorage.setItem('petCoins', newCoins.toString())
  }

  const handleAddXP = (amount) => {
    addXP(amount, 'Lucky Draw Reward')
  }

  const handleAddItem = (itemId) => {
    console.log('Received item:', itemId)
    // Handle item reward (power-up, etc.)
  }

  const handleGardenComplete = (plant) => {
    console.log('Plant grown:', plant.name)
  }

  const tabs = [
    { id: 'achievements', name: 'Achievements', icon: Trophy, color: '#f59e0b' },
    { id: 'powerups', name: 'Power-Ups', icon: Sparkles, color: '#a855f7' },
    { id: 'lucky', name: 'Lucky Draw', icon: Gift, color: '#ec4899' },
    { id: 'garden', name: 'Focus Garden', icon: Sprout, color: '#22c55e' }
  ]

  return (
    <div className="gamification-hub">
      {/* Header */}
      <div className="hub-header">
        <div className="header-left">
          <button className="back-home-btn" onClick={() => navigate('/dashboard')} title="Back to Home">
            <Home size={24} />
          </button>
          <Gamepad2 size={36} className="header-icon" />
          <div>
            <h1>Gamification Hub</h1>
            <p>Level up your productivity with fun rewards!</p>
          </div>
        </div>
        
        <div className="header-stats">
          <div className="stat-badge xp-badge">
            <Star size={18} fill="#fbbf24" />
            <span>Level {xp.level}</span>
          </div>
          <div className="stat-badge coins-badge">
            <span>🪙</span>
            <span>{coins}</span>
          </div>
          <div className="stat-badge achievements-badge">
            <Trophy size={18} />
            <span>{achievements.length} Unlocked</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="hub-tabs">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
              style={{
                '--tab-color': tab.color
              }}
            >
              <Icon size={20} />
              <span>{tab.name}</span>
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div className="hub-content">
        {activeTab === 'achievements' && (
          <div className="tab-panel active">
            <AchievementGallery />
          </div>
        )}
        
        {activeTab === 'powerups' && (
          <div className="tab-panel active">
            <PowerUps 
              coins={coins}
              onPurchase={(cost) => handleAddCoins(-cost)}
              onActivate={(effects) => console.log('Power-ups activated:', effects)}
            />
          </div>
        )}
        
        {activeTab === 'lucky' && (
          <div className="tab-panel active">
            <div className="lucky-draw-wrapper">
              <DailyLuckyDraw 
                coins={coins}
                onAddCoins={handleAddCoins}
                onAddXP={handleAddXP}
                onAddItem={handleAddItem}
                onReward={(reward) => console.log('Reward:', reward)}
              />
              
              <div className="lucky-info">
                <h3>How it Works</h3>
                <ul>
                  <li>🎁 Free draw every 24 hours</li>
                  <li>🪙 Win coins, XP, or special items</li>
                  <li>⭐ Higher rarity = better rewards</li>
                  <li>🎯 Legendary rewards include mystery boxes!</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'garden' && (
          <div className="tab-panel active">
            <FocusGarden 
              onComplete={handleGardenComplete}
              onAddXP={handleAddXP}
              onAddCoins={handleAddCoins}
              coins={coins}
            />
            
            <div className="garden-info">
              <h3>🌱 Focus Garden Tips</h3>
              <ul>
                <li>🌻 Plant seeds when you start focusing</li>
                <li>⏱️ Different plants need different focus times</li>
                <li>🎵 Ambient sounds help you concentrate</li>
                <li>💰 Harvest plants to earn coins</li>
                <li>🏆 Watch your garden grow as you progress!</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
