import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { X, ZoomIn } from 'lucide-react'
import './PolaroidWall.css'

export const PolaroidWall = ({ entries = [] }) => {
  const [selectedPolaroid, setSelectedPolaroid] = useState(null)
  const [displayEntries, setDisplayEntries] = useState([])

  const loadEntries = () => {
    const saved = localStorage.getItem('journalEntries')
    if (saved) {
      const allEntries = JSON.parse(saved)
      // Filter only entries with photos, newest first
      const photoEntries = allEntries
        .filter(e => e.photo)
        .slice(-12)
        .reverse()
      setDisplayEntries(photoEntries)
    }
  }

  useEffect(() => {
    loadEntries()
    // Auto-refresh every 5 seconds to catch new journal entries with photos
    const interval = setInterval(loadEntries, 5000)
    return () => clearInterval(interval)
  }, [entries])

  const getAestheticFilter = (index) => {
    const filters = ['sepia', 'vintage', 'soft', 'mono', 'warm']
    return filters[index % filters.length]
  }

  const getDecorativeElement = (index) => {
    const decos = ['✦', '◇', '○', '△', '⋆', '⟡', '✧', '🌸', '🌿', '⭐']
    return decos[index % decos.length]
  }

  if (displayEntries.length === 0) {
    return (
      <div className="polaroid-wall-empty">
        <p>📸 No memories with photos yet. Add a photo when journaling!</p>
      </div>
    )
  }

  return (
    <div className="polaroid-wall">
      <h3 className="polaroid-wall-title">
        <span className="title-deco">{getDecorativeElement(0)}</span>
        Memory Lane
        <span className="title-deco">{getDecorativeElement(1)}</span>
      </h3>
      
      <div className="polaroid-grid">
        {displayEntries.map((entry, index) => (
          <div
            key={entry.id || index}
            className={`polaroid-card ${getAestheticFilter(index)}`}
            onClick={() => setSelectedPolaroid(entry)}
            style={{
              '--rotation': `${(index % 5) - 2}deg`,
              '--delay': `${index * 0.1}s`
            }}
          >
            <div className="polaroid-image">
              <div className="polaroid-emoji">
                {entry.mood || '💭'}
              </div>
              <div className="polaroid-overlay">
                <ZoomIn size={20} />
              </div>
            </div>
            <div className="polaroid-caption">
              <p className="caption-text">
                {entry.content.substring(0, 60)}...
              </p>
              <p className="caption-date">
                {new Date(entry.date).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedPolaroid && (
        <div className="polaroid-modal" onClick={() => setSelectedPolaroid(null)}>
          <div className="polaroid-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPolaroid(null)}>
              <X size={24} />
            </button>
            <div className="modal-polaroid">
              <div className="modal-emoji">
                {selectedPolaroid.mood || '💭'}
              </div>
              <div className="modal-content">
                <p className="modal-date">
                  {new Date(selectedPolaroid.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="modal-text">{selectedPolaroid.content}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PolaroidWall
