import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { X, Heart, Trash2, MoreHorizontal, MessageCircle, Share2, Image as ImageIcon } from 'lucide-react'
import './MemoryLane.css'

export const MemoryLane = () => {
  const [entries, setEntries] = useState([])
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [entryToDelete, setEntryToDelete] = useState(null)
  const [likedEntries, setLikedEntries] = useState(() => {
    const saved = localStorage.getItem('likedMemories')
    return saved ? JSON.parse(saved) : {}
  })

  useEffect(() => {
    loadEntries()
    const interval = setInterval(loadEntries, 10000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    localStorage.setItem('likedMemories', JSON.stringify(likedEntries))
  }, [likedEntries])

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

  const toggleLike = (id, e) => {
    e.stopPropagation()
    setLikedEntries(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const deleteEntry = (id) => {
    const saved = localStorage.getItem('journalEntries')
    if (saved) {
      const updated = JSON.parse(saved).filter(e => e.id !== id)
      localStorage.setItem('journalEntries', JSON.stringify(updated))
      setEntries(entries.filter(e => e.id !== id))
      const newLiked = { ...likedEntries }
      delete newLiked[id]
      localStorage.setItem('likedMemories', JSON.stringify(newLiked))
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
          <h1>Memory Lane</h1>
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
                  <div className="memory-avatar">
                    <span>{entry.mood || '💭'}</span>
                  </div>
                  <div className="memory-post-meta">
                    <span className="memory-username">Your Memory</span>
                    <span className="memory-time">{formatTimeAgo(entry.date)}</span>
                  </div>
                  <button className="memory-post-options">
                    <MoreHorizontal size={20} />
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

                {/* Post Actions */}
                <div className="memory-post-actions">
                  <div className="memory-action-left">
                    <button 
                      className={`memory-action-btn like ${likedEntries[entry.id] ? 'liked' : ''}`}
                      onClick={(e) => toggleLike(entry.id, e)}
                    >
                      <Heart size={24} className={likedEntries[entry.id] ? 'filled' : ''} />
                    </button>
                    <button className="memory-action-btn comment">
                      <MessageCircle size={24} />
                    </button>
                    <button className="memory-action-btn share">
                      <Share2 size={24} />
                    </button>
                  </div>
                  <div className="memory-action-right">
                    <button 
                      className="memory-action-btn delete"
                      onClick={(e) => {
                        e.stopPropagation()
                        confirmDelete(entry)
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
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

        {/* Quick Stats */}
        {entries.length > 0 && (
          <div className="memory-stats-bar">
            <div className="stat-pill">
              <span className="stat-pill-value">{entries.length}</span>
              <span className="stat-pill-label">memories</span>
            </div>
            <div className="stat-pill">
              <span className="stat-pill-value">
                {Object.values(likedEntries).filter(Boolean).length}
              </span>
              <span className="stat-pill-label">liked</span>
            </div>
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
                  <div className="memory-modal-avatar">
                    <span>{selectedEntry.mood || '💭'}</span>
                  </div>
                  <div>
                    <div className="memory-modal-username">Your Memory</div>
                    <div className="memory-modal-date">
                      {formatDate(selectedEntry.date)} · {formatTimeAgo(selectedEntry.date)} ago
                    </div>
                  </div>
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
