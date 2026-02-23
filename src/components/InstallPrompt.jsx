import React, { useState, useEffect } from 'react'
import { X, Download, Smartphone } from 'lucide-react'
import './InstallPrompt.css'

const InstallPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return
    }

    // Check if user dismissed before
    const dismissed = localStorage.getItem('install-prompt-dismissed')
    if (dismissed) {
      const dismissedDate = new Date(dismissed)
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24)
      if (daysSinceDismissed < 7) {
        return // Don't show again for 7 days
      }
    }

    // Check if iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream
    setIsIOS(iOS)

    // Listen for install prompt (Android/Chrome)
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
      
      // Show prompt after 30 seconds or on second visit
      const visitCount = parseInt(localStorage.getItem('visit-count') || '0', 10)
      localStorage.setItem('visit-count', (visitCount + 1).toString())
      
      if (visitCount >= 1) {
        setTimeout(() => {
          setShowPrompt(true)
        }, 30000)
      }
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    
    if (outcome === 'accepted') {
      setShowPrompt(false)
      setDeferredPrompt(null)
    }
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    localStorage.setItem('install-prompt-dismissed', new Date().toISOString())
  }

  // Don't show if already installed
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return null
  }

  return (
    <>
      {/* Android/Chrome Install Prompt */}
      {showPrompt && deferredPrompt && !isIOS && (
        <div className="install-prompt">
          <div className="install-prompt-content">
            <div className="install-prompt-icon">
              <Download size={40} />
            </div>
            <div className="install-prompt-text">
              <h3>Install Calmora</h3>
              <p>Get the app experience on your phone!</p>
            </div>
            <button className="install-prompt-install" onClick={handleInstall}>
              Install
            </button>
            <button className="install-prompt-dismiss" onClick={handleDismiss}>
              <X size={20} />
            </button>
          </div>
        </div>
      )}

      {/* iOS Install Instructions */}
      {showPrompt && isIOS && (
        <div className="install-prompt">
          <div className="install-prompt-content">
            <div className="install-prompt-icon">
              <Smartphone size={40} />
            </div>
            <div className="install-prompt-text">
              <h3>Install on iPhone</h3>
              <p>Tap <strong>Share</strong> → <strong>Add to Home Screen</strong></p>
            </div>
            <button className="install-prompt-dismiss" onClick={handleDismiss}>
              <X size={20} />
            </button>
          </div>
          <div className="ios-instructions">
            <div className="ios-step">
              <span className="ios-icon">📤</span>
              <span>Tap the Share button</span>
            </div>
            <div className="ios-step">
              <span className="ios-icon">➕</span>
              <span>Choose "Add to Home Screen"</span>
            </div>
            <div className="ios-step">
              <span className="ios-icon">✅</span>
              <span>Tap "Add" in the top right</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default InstallPrompt
