import React, { useState, useEffect } from 'react'
import { TopNavigation } from '../components/TopNavigation'
import { Plus, Trash2, Edit2, X } from 'lucide-react'
import './QuickNotesPage.css'

const colors = [
  { name: 'yellow', bg: '#fff9c4', border: '#fbc02d' },
  { name: 'green', bg: '#c8e6c9', border: '#81c784' },
  { name: 'blue', bg: '#bbdefb', border: '#64b5f6' },
  { name: 'pink', bg: '#f8bbd9', border: '#f06292' },
  { name: 'purple', bg: '#e1bee7', border: '#ba68c8' },
  { name: 'orange', bg: '#ffe0b2', border: '#ffb74d' }
]

export const QuickNotesPage = () => {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('quickNotes')
    return saved ? JSON.parse(saved) : []
  })
  const [isAdding, setIsAdding] = useState(false)
  const [newNote, setNewNote] = useState({ text: '', color: 'yellow' })
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  useEffect(() => {
    localStorage.setItem('quickNotes', JSON.stringify(notes))
  }, [notes])

  const addNote = () => {
    if (!newNote.text.trim()) return

    const note = {
      id: Date.now(),
      text: newNote.text,
      color: newNote.color,
      createdAt: new Date().toISOString()
    }
    setNotes([note, ...notes])
    setNewNote({ text: '', color: 'yellow' })
    setIsAdding(false)
  }

  const deleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id))
  }

  const startEditing = (note) => {
    setEditingId(note.id)
    setEditText(note.text)
  }

  const saveEdit = () => {
    if (!editText.trim()) return

    setNotes(notes.map(n => 
      n.id === editingId ? { ...n, text: editText } : n
    ))
    setEditingId(null)
    setEditText('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  const getColorData = (colorName) => {
    return colors.find(c => c.name === colorName) || colors[0]
  }

  return (
    <div className="notes-wrapper">
      <TopNavigation />

      <div className="notes-container fade-in">
        <div className="notes-header">
          <h1>Quick Notes</h1>
          <p className="notes-subtitle">Capture your thoughts instantly</p>
        </div>

        {/* Add Button or Form */}
        {!isAdding ? (
          <button onClick={() => setIsAdding(true)} className="add-note-btn">
            <Plus size={20} />
            New Note
          </button>
        ) : (
          <div className="add-note-form">
            <textarea
              value={newNote.text}
              onChange={(e) => setNewNote({ ...newNote, text: e.target.value })}
              placeholder="Write your note..."
              className="note-textarea"
              rows={4}
              autoFocus
            />
            
            <div className="color-picker">
              {colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setNewNote({ ...newNote, color: color.name })}
                  className={`color-option ${newNote.color === color.name ? 'selected' : ''}`}
                  style={{ backgroundColor: color.bg, borderColor: color.border }}
                />
              ))}
            </div>

            <div className="form-actions">
              <button onClick={() => setIsAdding(false)} className="cancel-btn">
                <X size={18} />
                Cancel
              </button>
              <button onClick={addNote} className="save-btn">
                <Plus size={18} />
                Add Note
              </button>
            </div>
          </div>
        )}

        {/* Notes Grid */}
        <div className="notes-grid">
          {notes.length === 0 ? (
            <div className="empty-state">
              <p>No notes yet. Create your first quick note!</p>
            </div>
          ) : (
            notes.map(note => {
              const color = getColorData(note.color)
              const isEditing = editingId === note.id

              return (
                <div 
                  key={note.id} 
                  className="note-card"
                  style={{ backgroundColor: color.bg, borderColor: color.border }}
                >
                  {isEditing ? (
                    <>
                      <textarea
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="edit-textarea"
                        rows={4}
                        autoFocus
                      />
                      <div className="note-actions">
                        <button onClick={saveEdit} className="action-btn save">
                          Save
                        </button>
                        <button onClick={cancelEdit} className="action-btn cancel">
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="note-text">{note.text}</p>
                      <div className="note-footer">
                        <span className="note-date">
                          {new Date(note.createdAt).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric'
                          })}
                        </span>
                        <div className="note-buttons">
                          <button onClick={() => startEditing(note)} className="note-btn">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => deleteNote(note.id)} className="note-btn delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default QuickNotesPage
