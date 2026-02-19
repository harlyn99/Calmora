import React, { useEffect } from 'react'
import './Confetti.css'

export const Confetti = ({ active = false, colors = ['#6b9f7f', '#d4a574', '#b89968', '#ffb7b7', '#4d94ff'] }) => {
  useEffect(() => {
    if (!active) return

    const createConfetti = () => {
      const confetti = document.createElement('div')
      confetti.className = 'confetti'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.background = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.animationDuration = (2 + Math.random() * 2) + 's'
      confetti.style.width = (8 + Math.random() * 8) + 'px'
      confetti.style.height = (8 + Math.random() * 8) + 'px'
      
      document.querySelector('.confetti-container')?.appendChild(confetti)
      
      setTimeout(() => {
        confetti.remove()
      }, 4000)
    }

    const interval = setInterval(createConfetti, 50)
    
    return () => clearInterval(interval)
  }, [active, colors])

  if (!active) return null

  return <div className="confetti-container" />
}

export default Confetti
