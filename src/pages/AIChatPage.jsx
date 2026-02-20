import React from 'react'
import AIChat from '../components/AIChat'
import './AIChatPage.css'

export default function AIChatPage() {
  return (
    <div className="ai-chat-page">
      <AIChat embedded={false} />
    </div>
  )
}
