import React, { useState, useEffect } from 'react'

export const Typewriter = ({ text, speed = 100, delay = 0, className = '' }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true)
    }, delay)

    return () => clearTimeout(startTimeout)
  }, [delay])

  useEffect(() => {
    if (!started || currentIndex >= text.length) return

    const timeout = setTimeout(() => {
      setDisplayText(prev => prev + text[currentIndex])
      setCurrentIndex(prev => prev + 1)
    }, speed)

    return () => clearTimeout(timeout)
  }, [text, currentIndex, speed, started])

  return (
    <span className={`typewriter ${className}`}>
      {displayText}
    </span>
  )
}

export const TextReveal = ({ text, className = '' }) => {
  const [revealed, setRevealed] = useState(false)
  const ref = React.useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <span 
      ref={ref}
      className={`text-reveal ${revealed ? 'revealed' : ''} ${className}`}
    >
      {text}
    </span>
  )
}

export const TextScramble = ({ text, speed = 50, className = '' }) => {
  const [displayText, setDisplayText] = useState('')
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'

  useEffect(() => {
    let iteration = 0
    let interval = null

    interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iteration) {
              return text[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      if (iteration >= text.length) {
        clearInterval(interval)
      }

      iteration += 1 / 3
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  return (
    <span className={`text-scramble ${className}`}>
      {displayText}
    </span>
  )
}

export default Typewriter
