import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { migrateOldData } from './utils/migration.js'

// Run data migration before app starts
migrateOldData()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
