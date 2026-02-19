import React, { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import './Background.css'

export const AnimatedBackground = () => {
  const { lightModeStyle } = useTheme()
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles/stars
    const count = lightModeStyle === 'space' ? 100 : 15
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 15,
      size: lightModeStyle === 'space' ? 1 + Math.random() * 2 : 2 + Math.random() * 4
    }))
    setParticles(newParticles)
  }, [lightModeStyle])

  return (
    <>
      <div className="animated-bg" />
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className={`particle ${lightModeStyle === 'space' ? 'star' : ''}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          />
        ))}
      </div>
    </>
  )
}

export default AnimatedBackground
