import React, { useState, useEffect } from 'react'
import { Heart, Plus, Trash2, Sparkles } from 'lucide-react'
import './GratitudeJournal.css'

const gratitudePrompts = [
  "I'm grateful for...",
  "Today made me happy because...",
  "I appreciate...",
  "The best part of today was...",
  "I'm thankful for the people in my life like...",
  "Something small that brought me joy...",
  "I'm proud of myself for...",
  "A challenge I'm grateful for...",
  "Something in my home I'm grateful for...",
  "A skill or ability I'm grateful for..."
]

export const GratitudeJournal = () => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('gratitudeEntries')
    return saved ? JSON.parse(saved) : []
  })
  const [newEntry, setNewEntry] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const [currentPrompt, setCurrentPrompt] = useState('')

  useEffect(() => {
    localStorage.setItem('gratitudeEntries', JSON.stringify(entries))
  }, [entries])

  const addEntry = (e) => {
    e.preventDefault()
    if (!newEntry.trim()) return

    const entry = {
      id: Date.now(),
      content: newEntry,
      date: new Date().toISOString()
    }
    setEntries([entry, ...entries])
    setNewEntry('')
    setShowPrompt(false)
    setCurrentPrompt('')
  }

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  const getRandomPrompt = () => {
    const prompt = gratitudePrompts[Math.floor(Math.random() * gratitudePrompts.length)]
    setCurrentPrompt(prompt)
    setShowPrompt(true)
  }

  const streak = calculateStreak()

  function calculateStreak() {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      const dateStr = date.toISOString().split('T')[0]
      const dayEntries = entries.filter(e => e.date.startsWith(dateStr))
      if (dayEntries.length > 0) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  }

  return (
    <div className="gratitude-card">
      <div className="gratitude-header">
        <div className="gratitude-title">
          <Heart size={20} className="gratitude-icon" />
          <h3>Gratitude Journal</h3>
        </div>
        {streak > 0 && (
          <div className="gratitude-streak">
            <Sparkles size={14} />
            <span>{streak} day streak</span>
          </div>
        )}
      </div>

      <form onSubmit={addEntry} className="gratitude-form">
        <div className="gratitude-input-wrapper">
          {showPrompt && currentPrompt && (
            <div className="gratitude-prompt">
              <Sparkles size={14} />
              <span>{currentPrompt}</span>
            </div>
          )}
          <textarea
            placeholder={showPrompt ? currentPrompt : "What are you grateful for today?..."}
            value={newEntry}
            onChange={(e) => setNewEntry(e.target.value)}
            className="gratitude-textarea"
            rows={showPrompt ? 3 : 2}
          />
        </div>
        <div className="gratitude-actions">
          <button 
            type="button" 
            className="gratitude-prompt-btn"
            onClick={getRandomPrompt}
            title="Get a prompt"
          >
            <Sparkles size={16} />
          </button>
          <button type="submit" className="gratitude-add-btn" disabled={!newEntry.trim()}>
            <Plus size={18} /> Add
          </button>
        </div>
      </form>

      {entries.length > 0 && (
        <div className="gratitude-entries">
          <h4>Recent Entries</h4>
          <div className="gratitude-list">
            {entries.slice(0, 5).map(entry => (
              <div key={entry.id} className="gratitude-entry">
                <p className="gratitude-text">{entry.content}</p>
                <div className="gratitude-footer">
                  <span className="gratitude-date">
                    {new Date(entry.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                  <button 
                    className="gratitude-delete"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default GratitudeJournal
