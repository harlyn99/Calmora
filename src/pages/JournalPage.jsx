import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Tag, Smile, Image, X } from 'lucide-react'
import './JournalPage.css'
import { formatDate } from '../utils/helpers'

const aestheticStickers = [
  '🌸', '🌺', '🌻', '🌷', '🌹', '🌼', '🌿', '🍀', '🌱', '🍃',
  '✨', '⭐', '🌟', '💫', '🌙', '☀️', '🌈', '☁️', '❄️', '🔥',
  '🦋', '🐝', '🐞', '🌸', '🍄', '🌵', '🌴', '🎀', '💕', '💖',
  '🎵', '🎶', '📚', '✏️', '📝', '🎨', '🧸', '🎁', '🍓', '🍑',
  '🥐', '☕', '🧋', '🍪', '🍰', '🍩', '🍫', '🍬', '🍭', '🎂',
  '🏰', '🏡', '🌍', '🚀', '💎', '👑', '🎭', '🎪', '🎠', '🎡'
]

export const JournalPage = () => {
  const [entries, setEntries] = useState(() => JSON.parse(localStorage.getItem('journalEntries') || '[]'))
  const [newEntry, setNewEntry] = useState('')
  const [selectedEntry, setSelectedEntry] = useState(null)
  const [newTag, setNewTag] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showStickers, setShowStickers] = useState(false)
  const [selectedSticker, setSelectedSticker] = useState('')
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  useEffect(() => {
    localStorage.setItem('journalEntries', JSON.stringify(entries))
  }, [entries])

  const addEntry = (e) => {
    e.preventDefault()
    if (!newEntry.trim()) return

    const entry = {
      id: Date.now(),
      content: newEntry,
      date: new Date().toISOString(),
      tags: newTag.split(',').map(t => t.trim()).filter(t => t),
      sticker: selectedSticker,
      photo: selectedPhoto
    }
    setEntries([entry, ...entries])
    setNewEntry('')
    setNewTag('')
    setSelectedSticker('')
    setSelectedPhoto(null)
    setShowStickers(false)
  }

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedPhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removePhoto = () => {
    setSelectedPhoto(null)
  }

  const deleteEntry = (id) => {
    setEntries(entries.filter(e => e.id !== id))
    setSelectedEntry(null)
  }

  const addTagToEntry = (entryId, tag) => {
    if (!tag.trim()) return
    setEntries(entries.map(e => 
      e.id === entryId ? { ...e, tags: [...(e.tags || []), tag.trim()] } : e
    ))
  }

  const removeTagFromEntry = (entryId, tagToRemove) => {
    setEntries(entries.map(e => 
      e.id === entryId ? { ...e, tags: (e.tags || []).filter(t => t !== tagToRemove) } : e
    ))
  }

  const getAllTags = () => {
    const tags = new Set()
    entries.forEach(e => (e.tags || []).forEach(t => tags.add(t)))
    return Array.from(tags)
  }

  const allTags = getAllTags()
  const filteredEntries = selectedFilter === 'all' 
    ? entries 
    : entries.filter(e => (e.tags || []).includes(selectedFilter))

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
              <div className="journal-form-header">
                <button
                  type="button"
                  className={`sticker-toggle-btn ${showStickers ? 'active' : ''}`}
                  onClick={() => setShowStickers(!showStickers)}
                >
                  <Smile size={18} /> Stickers
                </button>
                <label className="photo-upload-btn">
                  <Image size={18} /> Photo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                <div className="form-header-right">
                  {selectedSticker && (
                    <span className="selected-sticker-preview">{selectedSticker}</span>
                  )}
                  {selectedPhoto && (
                    <span className="selected-photo-preview">
                      <Image size={14} /> Photo added
                    </span>
                  )}
                </div>
              </div>

              {showStickers && (
                <div className="stickers-grid">
                  {aestheticStickers.map((sticker, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`sticker-btn ${selectedSticker === sticker ? 'selected' : ''}`}
                      onClick={() => setSelectedSticker(sticker)}
                    >
                      {sticker}
                    </button>
                  ))}
                </div>
              )}

              {selectedPhoto && (
                <div className="photo-preview-container">
                  <img src={selectedPhoto} alt="Preview" className="photo-preview" />
                  <button type="button" className="remove-photo-btn" onClick={removePhoto}>
                    <X size={16} />
                  </button>
                </div>
              )}

              <textarea
                placeholder="What's on your mind? Share your thoughts, feelings, and reflections..."
                value={newEntry}
                onChange={(e) => setNewEntry(e.target.value)}
                className="journal-textarea"
                rows="6"
              ></textarea>
              <input
                type="text"
                placeholder="Tags (comma-separated, e.g., gratitude, reflection, goals)"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="tag-input"
              />
              <button type="submit" className="neomorph-button primary save-btn">
                <Plus size={18} /> Save Entry
              </button>
            </form>
          </div>

          {/* Tags Filter */}
          {allTags.length > 0 && (
            <div className="tags-filter-section">
              <div className="tags-filter-header">
                <Tag size={16} />
                <span>Filter by Tags:</span>
              </div>
              <div className="tags-filter-list">
                <button
                  className={`tag-filter-btn ${selectedFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedFilter('all')}
                >
                  All
                </button>
                {allTags.map(tag => (
                  <button
                    key={tag}
                    className={`tag-filter-btn ${selectedFilter === tag ? 'active' : ''}`}
                    onClick={() => setSelectedFilter(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* History Section */}
          <div className="history-section">
            <h2>Your Entries {selectedFilter !== 'all' && `(${selectedFilter})`}</h2>
            {filteredEntries.length === 0 ? (
              <div className="empty-journal neomorph-md">
                <p>📔 No entries yet. Start writing to capture your thoughts.</p>
              </div>
            ) : (
              <div className="entries-list">
                {filteredEntries.map(entry => (
                  <div
                    key={entry.id}
                    className="entry-card neomorph-sm"
                    onClick={() => setSelectedEntry(entry)}
                  >
                    <div className="entry-header">
                      <div className="entry-date-with-sticker">
                        {entry.sticker && <span className="entry-sticker">{entry.sticker}</span>}
                        <span className="entry-date">{formatDate(new Date(entry.date))}</span>
                      </div>
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="entry-tags">
                          {entry.tags.map((tag, i) => (
                            <span key={i} className="entry-tag">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    {entry.photo && (
                      <div className="entry-photo-thumbnail">
                        <img src={entry.photo} alt="Entry memory" />
                      </div>
                    )}
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
              <div className="modal-header-with-sticker">
                {selectedEntry.sticker && <span className="modal-sticker-large">{selectedEntry.sticker}</span>}
                <div className="modal-date">{formatDate(new Date(selectedEntry.date))}</div>
              </div>
              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="modal-tags">
                  {selectedEntry.tags.map((tag, i) => (
                    <span key={i} className="modal-tag">{tag}</span>
                  ))}
                </div>
              )}
              {selectedEntry.photo && (
                <div className="modal-photo">
                  <img src={selectedEntry.photo} alt="Memory" />
                </div>
              )}
              <p className="modal-text">{selectedEntry.content}</p>
              <div className="modal-add-tag">
                <input
                  type="text"
                  placeholder="Add a tag..."
                  className="modal-tag-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      addTagToEntry(selectedEntry.id, e.target.value)
                      e.target.value = ''
                      setSelectedEntry({ ...selectedEntry, tags: [...(selectedEntry.tags || []), e.target.value] })
                    }
                  }}
                />
              </div>
              {selectedEntry.tags && selectedEntry.tags.length > 0 && (
                <div className="modal-tags-edit">
                  {selectedEntry.tags.map((tag, i) => (
                    <span key={i} className="modal-tag-edit">
                      {tag}
                      <button onClick={() => {
                        removeTagFromEntry(selectedEntry.id, tag)
                        setSelectedEntry({ ...selectedEntry, tags: selectedEntry.tags.filter((_, idx) => idx !== i) })
                      }}>×</button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
