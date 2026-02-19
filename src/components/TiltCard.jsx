import React, { useEffect, useRef } from 'react'

export const TiltCard = ({ children, className = '', intensity = 15 }) => {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const centerX = rect.width / 2
      const centerY = rect.height / 2
      
      const rotateX = ((y - centerY) / centerY) * -intensity
      const rotateY = ((x - centerX) / centerX) * intensity
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
      card.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`)
      card.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`)
    }

    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
    }

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [intensity])

  return (
    <div 
      ref={cardRef}
      className={`tilt-card ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="tilt-card__glow" />
      <div className="tilt-card__content">
        {children}
      </div>
    </div>
  )
}

export default TiltCard
