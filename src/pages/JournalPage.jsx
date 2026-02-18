import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2 } from 'lucide-react'
import './JournalPage.css'
import { formatDate } from '../utils/helpers'

export const JournalPage = () => {
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem('journalEntries') || '[]'))
  const [newEntry, setNewEntry] = useState('')
  const [selectedEntry, setSelectedEntry] = useState(null)

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries))
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
  }

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id))
    setSelectedEntry(null)
  }

  return (
    <div className="journal-wrapper">
      <TopNavigation />
      
      <div className="journal-container fade-in">
        <div className="journal-header">
          <h1>Journal</h1>
          <p>Reflect, write, and find peace</p>
        </div>

        <div className="journal-content">
          {/* Write Section */}
          <div className="write-section">
            <form onSubmit={addEntry} className="journal-form">
              <textarea
                placeholder="What's on your mind? Share your thoughts, feelings, and reflections..."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="journal-textarea"
                rows="12"
              ></textarea>
              <button type="submit" className="neomorph-button primary save-btn">
                <Plus size={18} /> Save Entry
              </button>
            </form>
          </div>

          {/* History Section */}
          <div className="history-section">
            <h2>Your Entries</h2>
            {entries.length === 0 ? (
              <div className="empty-journal neomorph-md">
                <p>📔 No entries yet. Start writing to capture your thoughts.</p>
              </div>
            ) : (
              <div className="entries-list">
                {entries.map(entry => (
                  <div
                    key={entry.id}
                    className="entry-card neomorph-sm"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <div className="entry-date">{formatDate(new Date(entry.date))}</div>
                    <p className="entry-snippet">{entry.content.substring(0, 100)}...</p>
                    <button
                      className="delete-entry-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteEntry(entry.id)
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Modal for Reading Full Entry */}
        {selectedEntry && (
          <div className="modal-overlay" onClick={() => setSelectedEntry(null)}>
            <div className="modal-content neomorph-lg" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setSelectedEntry(null)}>×</button>
              <div className="modal-date">{formatDate(new Date(selectedEntry.date))}</div>
              <p className="modal-text">{selectedEntry.content}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
