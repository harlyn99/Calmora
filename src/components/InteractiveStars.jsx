import React, { useState, useEffect } from 'react'
import { useSound } from '../contexts/SoundContext'
import { X } from 'lucide-react'
import './InteractiveStars.css'

const WISH_QUOTES = [
  "You're doing amazing! ✨",
  "Believe in yourself! 💫",
  "Every star has a story 🌟",
  "Your potential is infinite! 🌌",
  "Shine bright today! ⭐",
  "Dreams do come true! 💭",
  "You're a star! 🌠",
  "Keep reaching higher! 🚀",
  "Magic is within you! ✨",
  "Today is your day! 🌅"
]

export const InteractiveStars = () => {
  const [stars, setStars] = useState([])
  const [clickedStar, setClickedStar] = useState(null)
  const [wish, setWish] = useState('')
  const { playClick, playSuccess } = useSound()

  useEffect(() => {
    // Generate 50 interactive stars
    const newStars = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 8 + Math.random() * 12,
      delay: Math.random() * 3,
      clicked: false
    }))
    setStars(newStars)
  }, [])

  const handleStarClick = (star) => {
    playClick()
    setClickedStar(star)
    const randomQuote = WISH_QUOTES[Math.floor(Math.random() * WISH_QUOTES.length)]
    setWish(randomQuote)
    
    setTimeout(() => {
      setClickedStar(null)
      setWish('')
    }, 3000)
  }

  return (
    <>
      <div className="interactive-stars">
        {stars.map(star => (
          <button
            key={star.id}
            className={`star ${star.clicked ? 'clicked' : ''}`}
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: `${star.delay}s`
            }}
            onClick={() => handleStarClick(star)}
          >
            <span>⭐</span>
          </button>
        ))}
      </div>

      {clickedStar && wish && (
        <div className="wish-popup">
          <button className="close-wish" onClick={() => { setClickedStar(null); setWish('') }}>
            <X size={16} />
          </button>
          <p className="wish-text">{wish}</p>
          <div className="wish-confetti" />
        </div>
      )}
    </>
  )
}

export default InteractiveStars
