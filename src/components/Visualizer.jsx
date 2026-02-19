import React, { useEffect, useRef } from 'react'

export const AudioVisualizer = ({ 
  bars = 8,
  height = 60,
  animated = true,
  className = ''
}) => {
  return (
    <div className={`audio-visualizer ${className}`} style={{ height }}>
      {Array.from({ length: bars }).map((_, i) => (
        <div
          key={i}
          className="visualizer-bar"
          style={{
            height: animated ? undefined : `${30 + Math.random() * 70}%`,
            animationDelay: `${i * 0.1}s`
          }}
        />
      ))}
    </div>
  )
}

export const SoundWave = ({ animated = true, className = '' }) => {
  return (
    <div className={`sound-wave ${className}`}>
      {animated && <style>{`.sound-wave::after { animation: soundWave 2s ease-in-out infinite; }`}</style>}
    </div>
  )
}

export const CelebrationModal = ({ 
  show,
  title = '🎉 Congratulations!',
  subtitle = 'You did it!',
  onClose 
}) => {
  if (!show) return null

  return (
    <div className="celebration-modal">
      <div className="celebration-emoji">🎊</div>
      <h2 className="celebration-text">{title}</h2>
      <p className="celebration-subtext">{subtitle}</p>
      {onClose && (
        <button className="glass-button" onClick={onClose} style={{ marginTop: 24 }}>
          Continue
        </button>
      )}
    </div>
  )
}

export const ExplosionEffect = ({ x, y, onComplete }) => {
  useEffect(() => {
    const container = document.createElement('div')
    container.className = 'explosion-container'
    container.style.position = 'fixed'
    container.style.left = x + 'px'
    container.style.top = y + 'px'
    container.style.pointerEvents = 'none'
    container.style.zIndex = '9999'

    // Create particles
    const particleCount = 20
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div')
      particle.className = 'explosion-particle'
      
      const angle = (i / particleCount) * Math.PI * 2
      const velocity = 50 + Math.random() * 50
      
      particle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px)`
      particle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out'
      particle.style.opacity = '1'
      
      container.appendChild(particle)
    }

    document.body.appendChild(container)

    // Animate
    setTimeout(() => {
      container.querySelectorAll('.explosion-particle').forEach(p => {
        p.style.transform = 'translate(0, 0)'
        p.style.opacity = '0'
      })
    }, 50)

    // Cleanup
    setTimeout(() => {
      container.remove()
      if (onComplete) onComplete()
    }, 600)

    return () => {
      container.remove()
    }
  }, [x, y, onComplete])

  return null
}

export default AudioVisualizer
