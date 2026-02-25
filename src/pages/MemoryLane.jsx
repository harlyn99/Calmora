import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { X, Trash2, MoreHorizontal, MessageCircle, Share2, Image as ImageIcon, Calendar, Clock, Heart } from 'lucide-react'
import { useIconTheme } from '../contexts/IconThemeContext'
import './MemoryLane.css'

export const MemoryLane = () => {
  const { getIconColor } = useIconTheme()
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState(null)

  useEffect(() => {
    loadEntries()
    const interval = setInterval(loadEntries, 10000)
    return () => clearInterval(interval)
  }, [])

  const loadEntries = () => {
    const saved = localStorage.getItem('journalEntries')
    if (saved) {
      const allEntries = JSON.parse(saved)
      const photoEntries = allEntries
        .filter(e => e.photo)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
      setEntries(photoEntries)
    }
  }

  const deleteEntry = (id) => {
    const saved = localStorage.getItem('journalEntries')
    if (saved) {
      const updated = JSON.parse(saved).filter(e => e.id !== id)
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
    if (diffMins < 60) return `${diffMins}m`
    if (diffHours < 24) return `${diffHours}h`
    if (diffDays < 7) return `${diffDays}d`
    if (diffWeeks < 4) return `${diffWeeks}w`
    return `${diffMonths}mo`
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="memory-lane-wrapper">
      <TopNavigation />

      <div className="memory-lane-container fade-in">
        <div className="memory-lane-header">
          <h1 style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Memory Lane</h1>
          <p className="memory-lane-subtitle">
            Your precious moments, beautifully captured
          </p>
        </div>

        {entries.length === 0 ? (
          <div className="memory-lane-empty">
            <div className="empty-illustration">
              <ImageIcon size={64} strokeWidth={1.5} />
            </div>
            <h3>No memories yet</h3>
            <p>Start journaling with photos to create your memory lane!</p>
            <div className="empty-hint">
              💡 Tip: Add a photo when writing in your Journal
            </div>
          </div>
        ) : (
          <div className="memory-feed">
            {entries.map((entry) => (
              <div
                key={entry.id}
                className="memory-post"
                onClick={() => setSelectedEntry(entry)}
              >
                {/* Post Header */}
                <div className="memory-post-header">
                  <div className="memory-avatar" style={{ background: `linear-gradient(135deg, var(--accent-1), var(--accent-2))` }}>
                    <Heart size={20} fill="white" style={{ color: 'white' }} />
                  </div>
                  <div className="memory-post-meta">
                    <span className="memory-username">Your Memory</span>
                    <span className="memory-time">{formatTimeAgo(entry.date)}</span>
                  </div>
                  <button className="memory-post-options">
                    <MoreHorizontal size={20} style={{ color: getIconColor('neutral') }} />
                  </button>
                </div>

                {/* Post Content */}
                <div className="memory-post-content">
                  <div className="memory-post-photo">
                    <img src={entry.photo} alt="Memory" loading="lazy" />
                  </div>
                  
                  {entry.content && (
                    <div className="memory-post-caption">
                      <p>{entry.content}</p>
                    </div>
                  )}
                </div>

                {/* Post Footer */}
                <div className="memory-post-footer">
                  {entry.tags && entry.tags.length > 0 && (
                    <div className="memory-post-tags">
                      {entry.tags.map((tag, idx) => (
                        <span key={idx} className="memory-tag">#{tag}</span>
                      ))}
                    </div>
                  )}
                  <div className="memory-post-date">
                    {formatDate(entry.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Memory Detail Modal */}
      {selectedEntry && (
        <div className="memory-modal-overlay" onClick={() => setSelectedEntry(null)}>
          <div className="memory-modal-modern" onClick={(e) => e.stopPropagation()}>
            <button className="memory-modal-close-modern" onClick={() => setSelectedEntry(null)}>
              <X size={24} />
            </button>

            <div className="memory-modal-content-modern">
              <div className="memory-modal-photo-modern">
                <img src={selectedEntry.photo} alt="Memory" />
              </div>

              <div className="memory-modal-info-modern">
                <div className="memory-modal-header-modern">
                  <div className="memory-modal-avatar" style={{ background: `linear-gradient(135deg, ${getIconColor('primary')}, ${getIconColor('accent')})` }}>
                    <Heart size={24} fill="white" style={{ color: 'white' }} />
                  </div>
                  <div>
                    <div className="memory-modal-username">Your Memory</div>
                    <div className="memory-modal-date">
                      {formatDate(selectedEntry.date)} · {formatTimeAgo(selectedEntry.date)} ago
                    </div>
                  </div>
                  <button className="memory-modal-options">
                    <MoreHorizontal size={24} style={{ color: getIconColor('neutral') }} />
                  </button>
                </div>

                <p className="memory-modal-text">{selectedEntry.content}</p>

                {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                  <div className="memory-modal-tags">
                    {selectedEntry.tags.map((tag, idx) => (
                      <span key={idx} className="memory-tag">#{tag}</span>
                    ))}
                  </div>
                )}

                <div className="memory-modal-actions-modern">
                  <button
                    className="memory-action-btn-modern delete"
                    onClick={() => confirmDelete(selectedEntry)}
                  >
                    <Trash2 size={18} />
                    <span>Delete Memory</span>
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
          <div className="delete-modal-modern" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Memory?</h3>
            <p>This memory will be permanently removed from your collection.</p>
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
