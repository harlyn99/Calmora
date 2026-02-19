import React, { useState, useEffect, useRef } from 'react'
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Shuffle, Repeat, Heart, Music2, Home } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './MusicPlayerPage.css'

// Lo-fi style ambient sounds (using free audio sources)
const TRACKS = [
  { id: 1, title: 'Midnight Study', artist: 'Lofi Dreams', duration: 180, color: '#667eea' },
  { id: 2, title: 'Rainy Cafe', artist: 'Chill Hop', duration: 200, color: '#764ba2' },
  { id: 3, title: 'Sunny Morning', artist: 'Peaceful Mind', duration: 165, color: '#f093fb' },
  { id: 4, title: 'Night Walk', artist: 'Urban Lofi', duration: 190, color: '#4facfe' },
  { id: 5, title: 'Coffee Shop', artist: 'Lazy Sunday', duration: 175, color: '#43e97b' },
  { id: 6, title: 'Stargazing', artist: 'Dream State', duration: 210, color: '#5ee7df' },
  { id: 7, title: 'Book Store', artist: 'Quiet Moments', duration: 185, color: '#d299c2' },
  { id: 8, title: 'Ocean Breeze', artist: 'Nature Sounds', duration: 195, color: '#89f7fe' },
]

const AMBIENT_SOUNDS = [
  { id: 'rain', name: '🌧️ Rain', url: 'https://assets.mixkit.co/sfx/preview/mixkit-light-rain-loop-1253.mp3' },
  { id: 'waves', name: '🌊 Waves', url: 'https://assets.mixkit.co/sfx/preview/mixkit-sea-waves-loop-1195.mp3' },
  { id: 'birds', name: '🐦 Birds', url: 'https://assets.mixkit.co/sfx/preview/mixkit-forest-birds-ambience-loop-119.mp3' },
  { id: 'fire', name: '🔥 Fire', url: 'https://assets.mixkit.co/sfx/preview/mixkit-camp-fire-crackling-loop-118.mp3' },
]

export default function MusicPlayerPage() {
  const navigate = useNavigate()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTrack, setCurrentTrack] = useState(TRACKS[0])
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const [isMuted, setIsMuted] = useState(false)
  const [shuffle, setShuffle] = useState(false)
  const [repeat, setRepeat] = useState(false)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('musicFavorites')
    return saved ? JSON.parse(saved) : []
  })
  const [activeAmbient, setActiveAmbient] = useState([])
  const [showVisualizer, setShowVisualizer] = useState(true)
  const audioRef = useRef(null)
  const ambientRefs = useRef({})

  useEffect(() => {
    localStorage.setItem('musicFavorites', JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= currentTrack.duration) {
            if (repeat) {
              return 0
            }
            handleNext()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentTrack, repeat])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    if (shuffle) {
      const randomTrack = TRACKS[Math.floor(Math.random() * TRACKS.length)]
      setCurrentTrack(randomTrack)
    } else {
      const currentIndex = TRACKS.findIndex(t => t.id === currentTrack.id)
      const nextIndex = (currentIndex + 1) % TRACKS.length
      setCurrentTrack(TRACKS[nextIndex])
    }
    setProgress(0)
    setIsPlaying(true)
  }

  const handlePrev = () => {
    const currentIndex = TRACKS.findIndex(t => t.id === currentTrack.id)
    const prevIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length
    setCurrentTrack(TRACKS[prevIndex])
    setProgress(0)
  }

  const toggleFavorite = (trackId) => {
    setFavorites(prev =>
      prev.includes(trackId)
        ? prev.filter(id => id !== trackId)
        : [...prev, trackId]
    )
  }

  const toggleAmbient = (soundId) => {
    setActiveAmbient(prev => {
      if (prev.includes(soundId)) {
        return prev.filter(id => id !== soundId)
      }
      return [...prev, soundId]
    })
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isFavorite = favorites.includes(currentTrack.id)

  return (
    <div className="music-player-page">
      {/* Top Navigation */}
      <nav className="music-top-nav">
        <div className="music-nav-container">
          <button className="music-nav-btn" onClick={() => navigate('/dashboard')}>
            <Home size={20} />
            <span>Home</span>
          </button>
          <h1><Music2 size={24} /> Music Player</h1>
          <div className="music-nav-spacer"></div>
        </div>
      </nav>

      <div className="music-container">
        {/* Now Playing */}
        <div className="now-playing" style={{ background: `linear-gradient(135deg, ${currentTrack.color}22, ${currentTrack.color}11)` }}>
          <div className="album-art">
            <div className="album-art-inner" style={{ background: currentTrack.color }}>
              <Music2 size={60} color="white" />
            </div>
            {isPlaying && showVisualizer && (
              <div className="visualizer">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="visualizer-bar"
                    style={{
                      animationDelay: `${i * 0.1}s`,
                      background: currentTrack.color
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="track-info">
            <h2 className="track-title">{currentTrack.title}</h2>
            <p className="track-artist">{currentTrack.artist}</p>
            <button
              className={`favorite-btn ${isFavorite ? 'active' : ''}`}
              onClick={() => toggleFavorite(currentTrack.id)}
            >
              <Heart size={24} fill={isFavorite ? currentTrack.color : 'none'} />
            </button>
          </div>

          {/* Progress */}
          <div className="progress-section">
            <div className="progress-bar" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect()
              const percent = (e.clientX - rect.left) / rect.width
              setProgress(percent * currentTrack.duration)
            }}>
              <div
                className="progress-fill"
                style={{
                  width: `${(progress / currentTrack.duration) * 100}%`,
                  background: currentTrack.color
                }}
              />
            </div>
            <div className="time-display">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(currentTrack.duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="controls">
            <button
              className={`control-btn ${shuffle ? 'active' : ''}`}
              onClick={() => setShuffle(!shuffle)}
              title="Shuffle"
            >
              <Shuffle size={20} />
            </button>
            <button className="control-btn" onClick={handlePrev}>
              <SkipBack size={24} />
            </button>
            <button className="control-btn play-btn" onClick={handlePlayPause}>
              {isPlaying ? <Pause size={32} /> : <Play size={32} />}
            </button>
            <button className="control-btn" onClick={handleNext}>
              <SkipForward size={24} />
            </button>
            <button
              className={`control-btn ${repeat ? 'active' : ''}`}
              onClick={() => setRepeat(!repeat)}
              title="Repeat"
            >
              <Repeat size={20} />
            </button>
          </div>

          {/* Volume */}
          <div className="volume-section">
            <button onClick={() => setIsMuted(!isMuted)}>
              {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
          </div>
        </div>

        {/* Track List */}
        <div className="track-list-section">
          <h3>📀 Tracks</h3>
          <div className="track-list">
            {TRACKS.map(track => (
              <div
                key={track.id}
                className={`track-item ${currentTrack.id === track.id ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTrack(track)
                  setProgress(0)
                  setIsPlaying(true)
                }}
              >
                <div className="track-item-info">
                  <span className="track-item-title">{track.title}</span>
                  <span className="track-item-artist">{track.artist}</span>
                </div>
                <div className="track-item-actions">
                  <span className="track-item-duration">{formatTime(track.duration)}</span>
                  <button
                    className={`track-favorite ${favorites.includes(track.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(track.id)
                    }}
                  >
                    <Heart size={16} fill={favorites.includes(track.id) ? track.color : 'none'} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ambient Sounds */}
        <div className="ambient-section">
          <h3>🎧 Ambient Sounds</h3>
          <p className="ambient-hint">Mix with music for better focus</p>
          <div className="ambient-grid">
            {AMBIENT_SOUNDS.map(sound => (
              <button
                key={sound.id}
                className={`ambient-btn ${activeAmbient.includes(sound.id) ? 'active' : ''}`}
                onClick={() => toggleAmbient(sound.id)}
              >
                {sound.name}
                {activeAmbient.includes(sound.id) && (
                  <div className="ambient-active-indicator" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Moods */}
        <div className="mood-section">
          <h3>😊 Quick Moods</h3>
          <div className="mood-grid">
            <button
              className="mood-btn"
              onClick={() => {
                setCurrentTrack(TRACKS[0])
                setProgress(0)
                setIsPlaying(true)
              }}
            >
              🌙 Night Focus
            </button>
            <button
              className="mood-btn"
              onClick={() => {
                setCurrentTrack(TRACKS[2])
                setProgress(0)
                setIsPlaying(true)
              }}
            >
              ☀️ Morning Chill
            </button>
            <button
              className="mood-btn"
              onClick={() => {
                setCurrentTrack(TRACKS[5])
                setProgress(0)
                setIsPlaying(true)
              }}
            >
              ⭐ Deep Work
            </button>
            <button
              className="mood-btn"
              onClick={() => {
                setCurrentTrack(TRACKS[4])
                setProgress(0)
                setIsPlaying(true)
              }}
            >
              ☕ Relax
            </button>
          </div>
        </div>
      </div>

      {/* Hidden audio elements for ambient sounds */}
      {AMBIENT_SOUNDS.map(sound => (
        <audio
          key={sound.id}
          ref={el => ambientRefs.current[sound.id] = el}
          src={sound.url}
          loop
          volume={volume * 0.5}
          muted={isMuted}
        />
      ))}
    </div>
  )
}
