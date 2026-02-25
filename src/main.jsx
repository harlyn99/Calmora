import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { migrateOldData } from './utils/migration.js'

// Run data migration before app starts
try {
  migrateOldData()
} catch (e) {
  console.error('Migration error:', e)
}

// Add error boundary for better error reporting
window.addEventListener('error', (e) => {
  console.error('Global error:', e.error)
})

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason)
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
