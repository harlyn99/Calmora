import React, { useState, useEffect } from 'react'
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from 'lucide-react'
import './MiniMusicPlayer.css'

const songs = [
  { title: 'Lo-Fi Beats', artist: 'Chill Vibes', duration: '2:30' },
  { title: 'Rain Sounds', artist: 'Nature', duration: '3:00' },
  { title: 'Piano Calm', artist: 'Relaxing', duration: '2:45' },
  { title: 'Ocean Waves', artist: 'Nature', duration: '3:15' },
  { title: 'Forest Birds', artist: 'Nature', duration: '2:50' }
]

export default function MiniMusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(0)
  const [volume, setVolume] = useState(50)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            handleSkipForward()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleSkipForward = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length)
    setProgress(0)
  }

  const handleSkipBack = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length)
    setProgress(0)
  }

  const song = songs[currentSong]

  return (
    <div className="mini-music-player">
      <div className="music-header">
        <Music size={16} />
        <span>Music Player</span>
      </div>
      
      <div className="music-content">
        <div className="song-info">
          <div className="song-title">{song.title}</div>
          <div className="song-artist">{song.artist}</div>
        </div>
        
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
        
        <div className="music-controls">
          <button className="control-btn" onClick={handleSkipBack}>
            <SkipBack size={16} />
          </button>
          <button className="control-btn play-btn" onClick={handlePlayPause}>
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button className="control-btn" onClick={handleSkipForward}>
            <SkipForward size={16} />
          </button>
        </div>
        
        <div className="volume-control">
          <Volume2 size={14} />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="volume-slider"
          />
        </div>
      </div>
    </div>
  )
}
