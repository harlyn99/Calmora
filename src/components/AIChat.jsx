import React, { useState, useEffect, useRef } from 'react'
import { Send, Settings, X, Minimize2, Maximize2, Sparkles } from 'lucide-react'
import { AI_THEMES, generateSmartResponse, resetConversation } from '../utils/aiBrain'
import { useTheme } from '../contexts/ThemeContext'
import './AIChat.css'

const AIChat = ({ embedded = false, onClose }) => {
  const { activeTheme, getThemeColors } = useTheme()
  const themeColors = getThemeColors(activeTheme)
  
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('aiChatMessages')
    return saved ? JSON.parse(saved) : []
  })
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [personality, setPersonality] = useState(() => {
    return localStorage.getItem('aiPersonality') || 'calm'
  })
  const [showSettings, setShowSettings] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)

  const currentTheme = AI_THEMES[personality] || AI_THEMES.calm

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    localStorage.setItem('aiChatMessages', JSON.stringify(messages))
  }, [messages])

  useEffect(() => {
    localStorage.setItem('aiPersonality', personality)
  }, [personality])

  // Generate AI response using smart brain
  const generateResponse = (userMessage) => {
    return generateSmartResponse(userMessage, personality)
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: generateResponse(input),
        sender: 'ai',
        timestamp: new Date().toISOString(),
        personality: personality
      }
      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 1000)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    if (confirm('Clear all chat history?')) {
      setMessages([])
      localStorage.removeItem('aiChatMessages')
      resetConversation()
    }
  }

  const handlePersonalityChange = (newPersonality) => {
    setPersonality(newPersonality)
    setShowSettings(false)
    
    // Add system message about personality change
    const newTheme = AI_THEMES[newPersonality]
    const systemMessage = {
      id: Date.now(),
      text: `${newTheme.icon} Now I'm in ${newTheme.name} mode! ${newTheme.greeting || 'How can I help you?'}`,
      sender: 'system',
      timestamp: new Date().toISOString()
    }
    setMessages(prev => [...prev, systemMessage])
  }

  if (isMinimized && embedded) {
    return (
      <div className="ai-chat-minimized" onClick={() => setIsMinimized(false)} style={{ background: themeColors.bgSecondary }}>
        <span className="ai-avatar-minimized">{currentTheme.icon}</span>
        <span className="ai-dot"></span>
      </div>
    )
  }

  return (
    <div className={`ai-chat-container ${embedded ? 'embedded' : 'fullscreen'}`}>
      {/* Header */}
      <div className="ai-chat-header" style={{ 
        background: `linear-gradient(135deg, ${themeColors.bgSecondary}, ${themeColors.bgTertiary})`
      }}>
        <div className="ai-header-left">
          <div className="ai-avatar-wrapper">
            <div className="ai-avatar-monochrome">
              <span>{currentTheme.icon}</span>
            </div>
          </div>
          <div className="ai-info">
            <h3 className="ai-name" style={{ color: themeColors.textPrimary }}>{currentTheme.name}</h3>
            <p className="ai-status" style={{ color: themeColors.textSecondary }}>{currentTheme.description}</p>
          </div>
        </div>
        
        <div className="ai-header-actions">
          <button className="ai-icon-btn" onClick={() => setShowSettings(!showSettings)}>
            <Settings size={18} />
          </button>
          {embedded ? (
            <>
              <button className="ai-icon-btn" onClick={() => setIsMinimized(true)}>
                <Minimize2 size={18} />
              </button>
              {onClose && (
                <button className="ai-icon-btn" onClick={onClose}>
                  <X size={18} />
                </button>
              )}
            </>
          ) : (
            <button className="ai-icon-btn" onClick={() => window.location.href = '/dashboard'}>
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="ai-settings-panel">
          <div className="settings-header">
            <h4 style={{ color: currentTheme.textColor }}>AI Personality</h4>
            <button className="ai-icon-btn" onClick={() => setShowSettings(false)}>
              <X size={16} />
            </button>
          </div>
          <p className="settings-subtitle">Choose how AI responds to you</p>
          <div className="personality-grid">
            {Object.values(AI_THEMES).map(p => (
              <button
                key={p.id}
                className={`personality-option ${personality === p.id ? 'active' : ''}`}
                onClick={() => handlePersonalityChange(p.id)}
                style={{ 
                  borderColor: personality === p.id ? themeColors.accent1 : 'rgba(0,0,0,0.1)',
                  background: personality === p.id ? `${themeColors.accent1}15` : 'var(--bg-secondary, #f5f5f5)'
                }}
              >
                <span className="personality-avatar">{p.icon}</span>
                <span className="personality-name" style={{ color: themeColors.textPrimary }}>{p.name}</span>
              </button>
            ))}
          </div>
          <button className="clear-chat-btn" onClick={clearChat}>
            🗑️ Clear Chat History
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="ai-messages-container" style={{ 
        background: `linear-gradient(135deg, ${themeColors.bgPrimary}, ${themeColors.bgSecondary})`
      }}>
        {messages.length === 0 ? (
          <div className="ai-empty-state">
            <div className="ai-empty-avatar">{currentTheme.icon}</div>
            <h4 style={{ color: themeColors.textPrimary }}>Hi, I'm {currentTheme.name}</h4>
            <p style={{ color: themeColors.textSecondary }}>{currentTheme.description}</p>
            <div className="ai-suggestions">
              <button onClick={() => setInput('How are you today?')}>How are you today?</button>
              <button onClick={() => setInput('I need some motivation')}>I need motivation</button>
              <button onClick={() => setInput('Tell me something wise')}>Tell me something wise</button>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message ${msg.sender} ${msg.sender === 'system' ? 'system' : ''}`}>
                {msg.sender === 'ai' && (
                  <div className="ai-message-avatar">
                    <span className="avatar-monochrome">
                      {currentTheme.icon}
                    </span>
                  </div>
                )}
                <div className="ai-message-content">
                  <p>{msg.text}</p>
                  <span className="ai-message-time">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="ai-message ai typing">
                <div className="ai-message-avatar">
                  <span className="avatar-monochrome">
                    {currentTheme.icon}
                  </span>
                </div>
                <div className="ai-message-content typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <div className="ai-input-container">
        <div className="ai-input-wrapper">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            rows={1}
          />
          <button className="ai-send-btn" onClick={handleSend} disabled={!input.trim()}>
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIChat
