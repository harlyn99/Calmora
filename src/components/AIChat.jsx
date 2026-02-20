import React, { useState, useEffect, useRef } from 'react'
import { Send, Sparkles, Mic, MicOff, Volume2, VolumeX, Copy, ThumbsUp, ThumbsDown, RefreshCw, Lightbulb, MessageCircle } from 'lucide-react'
import reasoningEngine from '../utils/AIReasoningEngine'
import './AIChat.css'

const AI_PERSONALITY = {
  name: 'Calmo',
  personality: 'friendly, supportive, wise, encouraging'
}

export default function AIChat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [context, setContext] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Load context from localStorage
  useEffect(() => {
    const loadContext = () => {
      const pet = JSON.parse(localStorage.getItem('virtualPet') || '{}')
      const habits = JSON.parse(localStorage.getItem('habits') || '[]')
      const moods = JSON.parse(localStorage.getItem('moods') || '[]')
      
      setContext({ pet, habits, moods })
      
      // Generate suggestions
      const newSuggestions = generateSuggestions({ pet, habits, moods })
      setSuggestions(newSuggestions)
    }
    
    loadContext()
    const interval = setInterval(loadContext, 30000)
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Load conversation history
  useEffect(() => {
    const saved = localStorage.getItem('calmo_conversation')
    if (saved) {
      try {
        setMessages(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load conversation')
      }
    } else {
      setMessages([{
        id: Date.now(),
        type: 'ai',
        text: `Hi! I'm ${AI_PERSONALITY.name} ✨ Your personal AI companion for productivity and wellness. How can I help you today?`,
        timestamp: new Date().toISOString()
      }])
    }
  }, [])

  // Save conversation
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('calmo_conversation', JSON.stringify(messages))
    }
  }, [messages])

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isExpanded])

  // Generate suggestions based on context
  const generateSuggestions = (ctx) => {
    const suggestions = []
    
    if (ctx.pet) {
      if (ctx.pet.hunger > 70) {
        suggestions.push({ type: 'pet', text: 'Feed your pet - they\'re hungry! 🍽️', priority: 'high' })
      }
      if (ctx.pet.happiness < 50) {
        suggestions.push({ type: 'pet', text: 'Play with your pet to boost their mood! 🎮', priority: 'medium' })
      }
      if (ctx.pet.energy < 30) {
        suggestions.push({ type: 'pet', text: 'Let your pet rest! 💤', priority: 'high' })
      }
    }
    
    if (ctx.habits && ctx.habits.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      const uncompletedToday = ctx.habits.filter(h => 
        !h.completedDates?.includes(today)
      )
      
      if (uncompletedToday.length > 0) {
        suggestions.push({ 
          type: 'habit', 
          text: `Complete ${uncompletedToday.length} habit(s) today! 💪`, 
          priority: 'medium' 
        })
      }
      
      const streaks = ctx.habits.map(h => h.completedDates?.length || 0)
      const maxStreak = Math.max(...streaks, 0)
      if (maxStreak >= 7) {
        suggestions.push({ 
          type: 'achievement', 
          text: `You're on fire! 🔥 Keep that ${maxStreak}-day streak going!`, 
          priority: 'high' 
        })
      }
    }
    
    if (ctx.moods && ctx.moods.length > 0) {
      const recentMood = ctx.moods[0]?.mood
      if (recentMood && recentMood <= 2) {
        suggestions.push({ 
          type: 'wellness', 
          text: 'Having a tough time? Try a breathing exercise 🧘', 
          priority: 'high' 
        })
      }
    }
    
    return suggestions.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 }
      return priorityOrder[b.priority] - priorityOrder[a.priority]
    }).slice(0, 3)
  }

  // Process AI response
  const processAIResponse = async (userInput) => {
    setIsTyping(true)
    
    const thinkingTime = Math.min(2000, 800 + userInput.length * 10)
    await new Promise(resolve => setTimeout(resolve, thinkingTime))
    
    const result = reasoningEngine.reason(userInput, context)
    
    const aiMessage = {
      id: Date.now(),
      type: 'ai',
      text: result.response,
      reasoning: result.reasoning,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, aiMessage])
    setIsTyping(false)
    
    if (result.suggestions && result.suggestions.length > 0) {
      setSuggestions(result.suggestions)
    }
    
    if (voiceEnabled) {
      speakResponse(result.response)
    }
  }

  // Handle send
  const handleSend = () => {
    if (!input.trim()) return
    
    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date().toISOString()
    }
    
    setMessages(prev => [...prev, userMessage])
    const userInput = input
    setInput('')
    
    processAIResponse(userInput)
  }

  // Handle key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Clear conversation
  const clearConversation = () => {
    setMessages([{
      id: Date.now(),
      type: 'ai',
      text: `Conversation reset! ${AI_PERSONALITY.name} here, ready to help! ✨`,
      timestamp: new Date().toISOString()
    }])
    localStorage.removeItem('calmo_conversation')
  }

  // Text-to-speech
  const speakResponse = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Copy message
  const copyMessage = (text) => {
    navigator.clipboard.writeText(text)
  }

  // Handle suggestion click
  const handleSuggestion = (suggestion) => {
    setInput(suggestion.text)
    setTimeout(() => {
      handleSend()
    }, 100)
  }

  return (
    <div className={`ai-chat-section ${isExpanded ? 'expanded' : ''}`}>
      {/* Header */}
      <div className="ai-chat-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="ai-header-left">
          <div className="ai-avatar-large">
            <Sparkles size={28} />
          </div>
          <div className="ai-info">
            <h3>{AI_PERSONALITY.name}</h3>
            <span className="ai-status">
              {isTyping ? 'Thinking...' : 'Online'} • {context.pet?.name ? `${context.pet.name} is here! 🐾` : 'Ready to help'}
            </span>
          </div>
        </div>
        <div className="ai-header-actions">
          <button className="ai-icon-btn" onClick={(e) => { e.stopPropagation(); setVoiceEnabled(!voiceEnabled); }} title="Voice">
            {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
          </button>
          <button className="ai-icon-btn" onClick={(e) => { e.stopPropagation(); clearConversation(); }} title="Clear">
            <RefreshCw size={18} />
          </button>
          <button className="ai-expand-btn" onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}>
            <MessageCircle size={20} />
          </button>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="ai-suggestions">
          <div className="suggestions-header">
            <Lightbulb size={16} />
            <span>Suggestions for you</span>
          </div>
          <div className="suggestions-list">
            {suggestions.map((suggestion, idx) => (
              <button
                key={idx}
                className="suggestion-chip"
                onClick={() => handleSuggestion(suggestion)}
              >
                {suggestion.text}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="ai-messages-container">
        {messages.map(message => (
          <div
            key={message.id}
            className={`message ${message.type}`}
          >
            <div className="message-avatar">
              {message.type === 'ai' ? (
                <Sparkles size={20} />
              ) : (
                <span>👤</span>
              )}
            </div>
            <div className="message-content">
              <div className="message-text">{message.text}</div>
              <div className="message-meta">
                <span className="message-time">
                  {new Date(message.timestamp).toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
                {message.type === 'ai' && (
                  <div className="message-actions">
                    <button className="message-action" onClick={() => copyMessage(message.text)} title="Copy">
                      <Copy size={12} />
                    </button>
                    <button className="message-action" title="Helpful">
                      <ThumbsUp size={12} />
                    </button>
                    <button className="message-action" title="Not helpful">
                      <ThumbsDown size={12} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="message ai typing">
            <div className="message-avatar">
              <Sparkles size={20} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="ai-input-area">
        <div className="input-wrapper">
          <button 
            className={`voice-btn ${isSpeaking ? 'speaking' : ''}`}
            onClick={() => {
              if (isSpeaking) {
                window.speechSynthesis.cancel()
                setIsSpeaking(false)
              }
            }}
          >
            {isSpeaking ? <MicOff size={20} /> : <Mic size={20} />}
          </button>
          
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask Calmo anything..."
            rows={1}
          />
          
          <button className="send-btn" onClick={handleSend}>
            <Send size={20} />
          </button>
        </div>
        <div className="input-hints">
          <span>Try: "I'm feeling stressed"</span>
          <span>•</span>
          <span>"Help me build a habit"</span>
          <span>•</span>
          <span>"How's my pet doing?"</span>
        </div>
      </div>
    </div>
  )
}
