import React, { useEffect, useState } from 'react'
import './Background.css'

export const AnimatedBackground = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 20 + Math.random() * 15,
      size: 2 + Math.random() * 4
    }))
    setParticles(newParticles)
  }, [])

  return (
    <>
      <div className="animated-bg" />
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
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
