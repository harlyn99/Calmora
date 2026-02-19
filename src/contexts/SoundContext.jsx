import React, { createContext, useContext, useState, useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const SoundContext = createContext()

// Simple synth sounds using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)()

const playTone = (frequency, duration, type = 'sine', volume = 0.1) => {
  const oscillator = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  
  oscillator.connect(gainNode)
  gainNode.connect(audioContext.destination)
  
  oscillator.frequency.value = frequency
  oscillator.type = type
  
  gainNode.gain.setValueAtTime(volume, audioContext.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)
  
  oscillator.start(audioContext.currentTime)
  oscillator.stop(audioContext.currentTime + duration)
}

export const SoundProvider = ({ children }) => {
  const { isDark } = useTheme()
  const [enabled, setEnabled] = useState(() => {
    return localStorage.getItem('soundEnabled') !== 'false'
  })
  const [volume, setVolume] = useState(() => {
    return parseFloat(localStorage.getItem('soundVolume') || '0.5')
  })

  useEffect(() => {
    localStorage.setItem('soundEnabled', enabled)
  }, [enabled])

  useEffect(() => {
    localStorage.setItem('soundVolume', volume.toString())
  }, [volume])

  const playClick = () => {
    if (!enabled) return
    playTone(800, 0.05, 'sine', volume * 0.3)
  }

  const playSuccess = () => {
    if (!enabled) return
    playTone(523.25, 0.1, 'sine', volume) // C5
    setTimeout(() => playTone(659.25, 0.1, 'sine', volume), 100) // E5
    setTimeout(() => playTone(783.99, 0.2, 'sine', volume), 200) // G5
  }

  const playLevelUp = () => {
    if (!enabled) return
    const notes = [523.25, 659.25, 783.99, 1046.50] // C major arpeggio
    notes.forEach((note, i) => {
      setTimeout(() => playTone(note, 0.2, 'sine', volume), i * 150)
    })
  }

  const playAchievement = () => {
    if (!enabled) return
    playTone(1046.50, 0.15, 'triangle', volume) // C6
    setTimeout(() => playTone(1318.51, 0.15, 'triangle', volume), 150) // E6
    setTimeout(() => playTone(1567.98, 0.3, 'triangle', volume), 300) // G6
  }

  const playError = () => {
    if (!enabled) return
    playTone(150, 0.2, 'sawtooth', volume * 0.5)
    setTimeout(() => playTone(100, 0.3, 'sawtooth', volume * 0.5), 150)
  }

  const playNotification = () => {
    if (!enabled) return
    playTone(880, 0.1, 'sine', volume * 0.5)
    setTimeout(() => playTone(1174.66, 0.15, 'sine', volume * 0.5), 100)
  }

  const playAmbientSound = (type = 'space') => {
    // Placeholder for ambient soundscapes
    // Can be expanded with actual audio files
  }

  return (
    <SoundContext.Provider value={{
      enabled,
      setEnabled,
      volume,
      setVolume,
      playClick,
      playSuccess,
      playLevelUp,
      playAchievement,
      playError,
      playNotification,
      playAmbientSound
    }}>
      {children}
    </SoundContext.Provider>
  )
}

export const useSound = () => {
  const context = useContext(SoundContext)
  if (!context) throw new Error('useSound must be used within SoundProvider')
  return context
}

// Helper hook for adding sound to interactions
export const useSoundEffect = (soundType = 'click') => {
  const sound = useSound()
  
  const handlers = {
    onClick: (e) => {
      if (soundType === 'click') sound.playClick()
      if (soundType === 'success') sound.playSuccess()
      if (soundType === 'achievement') sound.playAchievement()
    }
  }
  
  return handlers
}

export default SoundProvider
