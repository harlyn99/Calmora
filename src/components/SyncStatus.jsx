import React, { useState, useEffect } from 'react'
import { Wifi, WifiOff, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react'
import { getSyncStatus, manualSync, setSyncCallbacks } from '../services/sync'
import './SyncStatus.css'

const SyncStatus = () => {
  const [status, setStatus] = useState(getSyncStatus())
  const [syncing, setSyncing] = useState(false)
  const [lastMessage, setLastMessage] = useState('')

  useEffect(() => {
    // Set up sync callbacks
    setSyncCallbacks({
      onStart: () => {
        setSyncing(true)
        setLastMessage('Syncing...')
      },
      onComplete: (data) => {
        setSyncing(false)
        setLastMessage(`Synced: ${new Date(data.timestamp).toLocaleTimeString()}`)
        setStatus(getSyncStatus())
      },
      onError: (error) => {
        setSyncing(false)
        setLastMessage(`Error: ${error.message}`)
      }
    })

    // Update status periodically
    const interval = setInterval(() => {
      setStatus(getSyncStatus())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSync = async () => {
    setSyncing(true)
    const result = await manualSync()
    setSyncing(false)
    setLastMessage(result.message)
    setStatus(getSyncStatus())
  }

  const getStatusIcon = () => {
    if (syncing) {
      return <RefreshCw className="sync-icon spinning" size={20} />
    }
    
    if (!status.isOnline) {
      return <WifiOff className="sync-icon offline" size={20} />
    }
    
    if (status.hasPending) {
      return <AlertCircle className="sync-icon pending" size={20} />
    }
    
    return <CheckCircle className="sync-icon synced" size={20} />
  }

  const getStatusText = () => {
    if (syncing) return 'Syncing...'
    if (!status.isOnline) return 'Offline'
    if (status.hasPending) return `${status.pendingCount} pending`
    if (status.lastSync) {
      const last = new Date(status.lastSync)
      const mins = Math.floor((Date.now() - last.getTime()) / 60000)
      
      if (mins < 1) return 'Just now'
      if (mins < 60) return `${mins}m ago`
      
      const hours = Math.floor(mins / 60)
      return `${hours}h ago`
    }
    return 'Never'
  }

  return (
    <div className="sync-status" onClick={handleSync}>
      <div className="sync-status-content">
        {getStatusIcon()}
        <span className="sync-status-text">{getStatusText()}</span>
        {lastMessage && !syncing && (
          <span className="sync-status-message">{lastMessage}</span>
        )}
      </div>
    </div>
  )
}

export default SyncStatus
