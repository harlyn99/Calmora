import React, { useEffect, useRef } from 'react'
import './Confetti.css'

export const Confetti = ({ active = false, particleCount = 150 }) => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Create particles
    const colors = ['#6b9f7f', '#5a8a6a', '#ff9a8b', '#ff6a88', '#ffd700', '#00d4ff', '#ff69b4']
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 4 - 2,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
      shape: Math.random() > 0.5 ? 'circle' : 'rect'
    }))

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach(particle => {
        ctx.save()
        ctx.translate(particle.x, particle.y)
        ctx.rotate((particle.rotation * Math.PI) / 180)

        ctx.fillStyle = particle.color
        ctx.shadowColor = particle.color
        ctx.shadowBlur = 10

        if (particle.shape === 'circle') {
          ctx.beginPath()
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
        }

        ctx.restore()

        // Update particle
        particle.y += particle.speedY
        particle.x += particle.speedX
        particle.rotation += particle.rotationSpeed
        particle.speedY *= 0.99 // Air resistance

        // Reset particle if it falls off screen
        if (particle.y > canvas.height + 20) {
          particle.y = -20
          particle.x = Math.random() * canvas.width
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [active, particleCount])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="confetti-canvas"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  )
}

export default Confetti
