import React, { useEffect, useRef } from 'react'

export const ParticleSystem = ({ 
  particleCount = 50,
  cursorInteraction = true,
  constellation = true,
  className = ''
}) => {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: null, y: null })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Initialize particles
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: `hsla(${Math.random() * 60 + 140}, 50%, 60%, ${Math.random() * 0.5 + 0.3})`
    }))

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Update and draw particles
      particles.forEach((particle, i) => {
        // Cursor interaction
        if (cursorInteraction && mouse.x !== null) {
          const dx = mouse.x - particle.x
          const dy = mouse.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 150) {
            const force = (150 - distance) / 150
            particle.x -= (dx / distance) * force * 2
            particle.y -= (dy / distance) * force * 2
          }
        }

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Draw constellation lines
        if (constellation) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particle.x - particles[j].x
            const dy = particle.y - particles[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 120) {
              ctx.beginPath()
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(107, 159, 127, ${0.2 * (1 - distance / 120)})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [particleCount, cursorInteraction, constellation])

  return <canvas ref={canvasRef} className={`particle-canvas ${className}`} />
}

export const CursorFollower = () => {
  const followerRef = useRef(null)

  useEffect(() => {
    const follower = followerRef.current
    if (!follower) return

    const handleMouseMove = (e) => {
      follower.style.left = e.clientX + 'px'
      follower.style.top = e.clientY + 'px'
    }

    const handleClick = (e) => {
      follower.style.transform = 'scale(2)'
      setTimeout(() => {
        follower.style.transform = 'scale(1)'
      }, 200)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return <div ref={followerRef} className="cursor-follower" />
}

export default ParticleSystem
