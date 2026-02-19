import React, { useState, useEffect } from 'react'
import { useXP } from '../contexts/XPContext'
import { useSound } from '../contexts/SoundContext'
import { Target, Check, Clock } from 'lucide-react'
import './DailyChallenges.css'

const DAILY_CHALLENGES = [
  { id: 'tasks_5', title: 'Complete 5 Tasks', xp: 50, type: 'tasks', target: 5 },
  { id: 'focus_60', title: 'Focus for 60 min', xp: 75, type: 'focus', target: 60 },
  { id: 'meditate_1', title: 'Meditate once', xp: 40, type: 'meditation', target: 1 },
  { id: 'journal_1', title: 'Write journal', xp: 35, type: 'journal', target: 1 },
  { id: 'habits_3', title: 'Complete 3 habits', xp: 45, type: 'habits', target: 3 },
  { id: 'water_8', title: 'Drink 8 glasses water', xp: 30, type: 'water', target: 8 }
]

export const DailyChallenges = () => {
  const [challenges, setChallenges] = useState([])
  const [progress, setProgress] = useState({})
  const { addXP, unlockAchievement } = useXP()
  const { playSuccess } = useSound()

  useEffect(() => {
    // Load daily challenges
    const saved = localStorage.getItem('dailyChallenges')
    const savedDate = localStorage.getItem('dailyChallengesDate')
    const today = new Date().toDateString()

    if (saved && savedDate === today) {
      setChallenges(JSON.parse(saved))
      setProgress(JSON.parse(localStorage.getItem('dailyChallengesProgress') || '{}'))
    } else {
      // Generate new daily challenges
      const shuffled = [...DAILY_CHALLENGES].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 3)
      setChallenges(selected)
      localStorage.setItem('dailyChallenges', JSON.stringify(selected))
      localStorage.setItem('dailyChallengesDate', today)
    }
  }, [])

  const updateProgress = (type, value) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      challenges.forEach(challenge => {
        if (challenge.type === type) {
          const current = newProgress[challenge.id] || 0
          if (value > current && value <= challenge.target) {
            newProgress[challenge.id] = value
            // Check if completed
            if (value >= challenge.target && current < challenge.target) {
              completeChallenge(challenge)
            }
          }
        }
      })
      localStorage.setItem('dailyChallengesProgress', JSON.stringify(newProgress))
      return newProgress
    })
  }

  const completeChallenge = (challenge) => {
    playSuccess()
    addXP(challenge.xp, `Challenge: ${challenge.title}`)
  }

  // Expose updateProgress globally for other components
  useEffect(() => {
    window.updateDailyChallenge = updateProgress
    return () => { delete window.updateDailyChallenge }
  }, [challenges, progress])

  return (
    <div className="daily-challenges">
      <h3 className="challenges-title">
        <Target size={20} />
        Daily Challenges
      </h3>
      <div className="challenges-list">
        {challenges.map(challenge => {
          const current = progress[challenge.id] || 0
          const percent = (current / challenge.target) * 100
          const completed = current >= challenge.target

          return (
            <div key={challenge.id} className={`challenge-card ${completed ? 'completed' : ''}`}>
              <div className="challenge-header">
                <span className="challenge-title">{challenge.title}</span>
                <span className="challenge-xp">+{challenge.xp} XP</span>
              </div>
              <div className="challenge-progress">
                <div 
                  className="challenge-progress-bar"
                  style={{ width: `${percent}%` }}
                />
              </div>
              <div className="challenge-stats">
                <span>{current} / {challenge.target}</span>
                {completed && <Check size={16} className="check-icon" />}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default DailyChallenges
