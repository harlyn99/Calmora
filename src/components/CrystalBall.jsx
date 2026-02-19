import React from 'react'
import './CrystalBall.css'

export const CrystalBall = ({ loading = true, message = 'Loading...' }) => {
  if (!loading) return null

  return (
    <div className="crystal-ball-overlay">
      <div className="crystal-ball-container">
        <div className="crystal-ball">
          <div className="crystal-glow" />
          <div className="crystal-shine" />
          <div className="crystal-particles">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="crystal-particle"
                style={{
                  '--delay': `${i * 0.2}s`,
                  '--angle': `${(i / 8) * 360}deg`
                }}
              />
            ))}
          </div>
        </div>
        <p className="crystal-message">{message}</p>
      </div>
    </div>
  )
}

export default CrystalBall
