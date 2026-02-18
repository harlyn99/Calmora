import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const useKeyboardShortcuts = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't trigger shortcuts when typing in inputs/textareas
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return
      }

      // Navigation shortcuts
      switch (e.key.toLowerCase()) {
        case 'g':
          // Go to dashboard (like Gmail's g then d)
          if (e.key === 'g') {
            // Wait for next key
            const handleNextKey = (nextE) => {
              if (nextE.key.toLowerCase() === 'd') {
                navigate('/dashboard')
              } else if (nextE.key.toLowerCase() === 't') {
                navigate('/todo')
              } else if (nextE.key.toLowerCase() === 'j') {
                navigate('/journal')
              } else if (nextE.key.toLowerCase() === 'p') {
                navigate('/planner')
              } else if (nextE.key.toLowerCase() === 'h') {
                navigate('/habits')
              } else if (nextE.key.toLowerCase() === 'm') {
                navigate('/mood')
              } else if (nextE.key.toLowerCase() === 'g') {
                navigate('/goals')
              } else if (nextE.key.toLowerCase() === 's') {
                navigate('/stats')
              }
              window.removeEventListener('keydown', handleNextKey)
            }
            window.addEventListener('keydown', handleNextKey, { once: true })
          }
          break

        case 'n':
          // New task/note - navigate to appropriate page based on current location
          e.preventDefault()
          if (window.location.pathname === '/todo') {
            const input = document.querySelector('.todo-input')
            if (input) input.focus()
          } else if (window.location.pathname === '/journal') {
            const textarea = document.querySelector('.journal-textarea')
            if (textarea) textarea.focus()
          } else if (window.location.pathname === '/notes') {
            const btn = document.querySelector('.add-note-btn')
            if (btn) btn.click()
          } else {
            navigate('/todo')
          }
          break

        case 'h':
          // Go to habits
          if (!e.ctrlKey && !e.metaKey) {
            navigate('/habits')
          }
          break

        case 't':
          // Go to timer
          if (!e.ctrlKey && !e.metaKey) {
            navigate('/timer')
          }
          break

        case '?':
          // Show shortcuts help (could open a modal)
          e.preventDefault()
          console.log('Keyboard shortcuts: g+d=Dashboard, g+t=Todo, g+j=Journal, n=New item')
          break

        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [navigate])
}

export default useKeyboardShortcuts
