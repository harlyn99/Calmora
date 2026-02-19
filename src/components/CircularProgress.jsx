import React from 'react'
import './CircularProgress.css'

export const CircularProgress = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8,
  color = 'var(--accent-1)',
  showLabel = true,
  label,
  animated = true
}) => {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div 
      className="circular-progress-wrapper"
      style={{ width: size, height: size }}
    >
      <svg
        className="circular-progress"
        width={size}
        height={size}
      >
        {/* Background circle */}
        <circle
          className="progress-ring-bg"
          strokeWidth={strokeWidth}
          stroke="var(--bg-secondary)"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        
        {/* Progress circle */}
        <circle
          className={`progress-ring-circle ${animated ? 'animated' : ''}`}
          strokeWidth={strokeWidth}
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: animated ? offset : 0
          }}
          strokeLinecap="round"
        />
      </svg>
      
      {showLabel && (
        <div className="progress-label">
          <span className="progress-value">{progress}%</span>
          {label && <span className="progress-text">{label}</span>}
        </div>
      )}
    </div>
  )
}

// Mini progress ring for stats
export const MiniProgressRing = ({ progress, size = 40, color = 'var(--accent-1)' }) => {
  const radius = (size - 4) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <div className="mini-progress-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          strokeWidth="3"
          stroke="var(--bg-secondary)"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="mini-progress-ring-circle"
          strokeWidth="3"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          style={{
            strokeDasharray: `${circumference} ${circumference}`,
            strokeDashoffset: offset
          }}
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

export default CircularProgress
