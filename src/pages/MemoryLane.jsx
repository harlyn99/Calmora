import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { X, ZoomIn, Heart, Trash2 } from 'lucide-react'
import './MemoryLane.css'

export const MemoryLane = () => {
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState(null)

  useEffect(() => {
    loadEntries()
    // Auto-refresh every 10 seconds to catch new journal entries
    const interval = setInterval(loadEntries, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadEntries = () => {
    const saved = localStorage.getItem('journalEntries')
    if (saved) {
      const allEntries = JSON.parse(saved)
      // Filter only entries with photos, newest first
      const photoEntries = allEntries
        .filter(e => e.photo)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      setEntries(photoEntries)
    }
  }

  const deleteEntry = (id) => {
    const saved = localStorage.getItem('journalEntries')
    if (saved) {
      const allEntries = JSON.parse(saved)
      const updated = allEntries.filter(e => e.id !== id)
      localStorage.setItem('journalEntries', JSON.stringify(updated))
      setEntries(entries.filter(e => e.id !== id))
      setShowDeleteConfirm(false)
      setEntryToDelete(null)
      setSelectedEntry(null)
    }
  }

  const confirmDelete = (entry) => {
    setEntryToDelete(entry)
    setShowDeleteConfirm(true)
  }

  const getAestheticFilter = (index) => {
    const filters = ['sepia', 'vintage', 'soft', 'mono', 'warm', 'cool', 'rose']
    return filters[index % filters.length]
  }

  const getDecorativeElement = (index) => {
    const decos = ['🌸', '🌿', '⭐', '✨', '🦋', '💕', '🌙', '🌟']
    return decos[index % decos.length]
  }

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)
    const diffWeeks = Math.floor(diffDays / 7)
    const diffMonths = Math.floor(diffDays / 30)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    if (diffWeeks < 4) return `${diffWeeks}w ago`
    return `${diffMonths}mo ago`
  }

  return (
    <div className="memory-lane-wrapper">
      <TopNavigation />

      <div className="memory-lane-container fade-in">
        <div className="memory-lane-header">
          <h1>📸 Memory Lane</h1>
          <p className="memory-lane-subtitle">
            Your precious moments captured in time ✨
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="memory-lane-empty">
            <div className="empty-illustration">📷</div>
            <h3>No memories yet</h3>
            <p>Start journaling with photos to create your memory lane!</p>
            <div className="empty-hint">
              💡 Tip: Add a photo when writing in your Journal
            </div>
          </div>
        ) : (
          <div className="memory-lane-grid">
            {entries.map((entry, index) => (
              <div
                key={entry.id}
                className={`memory-card ${getAestheticFilter(index)}`}
                onClick={() => setSelectedEntry(entry)}
                style={{
                  '--rotation': `${(index % 6) - 2.5}deg`,
                  '--delay': `${index * 0.05}s`
                }}
              >
                <div className="memory-card-inner">
                  <div className="memory-photo">
                    <img src={entry.photo} alt="Memory" loading="lazy" />
                    <div className="memory-overlay">
                      <ZoomIn size={24} className="zoom-icon" />
                    </div>
                  </div>
                  <div className="memory-info">
                    <span className="memory-time">{formatTimeAgo(entry.date)}</span>
                    <span className="memory-mood">{entry.mood || '💭'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quick Stats */}
        {entries.length > 0 && (
          <div className="memory-stats">
            <div className="stat-item">
              <span className="stat-icon">📸</span>
              <span className="stat-value">{entries.length}</span>
              <span className="stat-label">Memories</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">📅</span>
              <span className="stat-value">
                {entries.length > 0 ? formatTimeAgo(entries[entries.length - 1].date) : 'N/A'}
              </span>
              <span className="stat-label">First Memory</span>
            </div>
            <div className="stat-item">
              <span className="stat-icon">✨</span>
              <span className="stat-value">
                {entries.length > 0 ? formatTimeAgo(entries[0].date) : 'N/A'}
              </span>
              <span className="stat-label">Latest</span>
            </div>
          </div>
        )}
      </div>

      {/* Memory Detail Modal */}
      {selectedEntry && (
        <div className="memory-modal-overlay" onClick={() => setSelectedEntry(null)}>
          <div className="memory-modal" onClick={(e) => e.stopPropagation()}>
            <button className="memory-modal-close" onClick={() => setSelectedEntry(null)}>
              <X size={24} />
            </button>
            
            <div className="memory-modal-content">
              <div className="memory-modal-photo">
                <img src={selectedEntry.photo} alt="Memory" />
              </div>
              
              <div className="memory-modal-info">
                <div className="memory-modal-header">
                  <span className="memory-modal-mood">{selectedEntry.mood || '💭'}</span>
                  <span className="memory-modal-date">
                    {new Date(selectedEntry.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                
                <p className="memory-modal-text">{selectedEntry.content}</p>
                
                {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                  <div className="memory-modal-tags">
                    {selectedEntry.tags.map((tag, idx) => (
                      <span key={idx} className="memory-tag">#{tag}</span>
                    ))}
                  </div>
                )}
                
                <div className="memory-modal-actions">
                  <button 
                    className="memory-action-btn delete"
                    onClick={() => confirmDelete(selectedEntry)}
                  >
                    <Trash2 size={18} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="delete-modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
            <h3>🗑️ Delete Memory?</h3>
            <p>This memory will be permanently removed.</p>
            <div className="delete-modal-actions">
              <button 
                className="delete-cancel-btn"
                onClick={() => {
                  setShowDeleteConfirm(false)
                  setEntryToDelete(null)
                }}
              >
                Cancel
              </button>
              <button 
                className="delete-confirm-btn"
                onClick={() => deleteEntry(entryToDelete?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MemoryLane
