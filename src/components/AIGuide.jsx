import React, { useState, useEffect, useRef } from 'react'
import { Send, X, Minimize2, Maximize2, Sparkles, Mic, MicOff, Volume2, VolumeX, Copy, ThumbsUp, ThumbsDown, RefreshCw, Zap, Heart, Lightbulb } from 'lucide-react'
import reasoningEngine from '../utils/AIReasoningEngine'
import './AIGuide.css'

// AI Personality & System Prompt
const AI_PERSONALITY = {
  name: 'Calmo',
  version: '1.0',
  personality: 'friendly, supportive, wise, encouraging',
  tone: 'warm, empathetic, motivating',
  expertise: ['productivity', 'wellness', 'habit-building', 'emotional-support', 'time-management'],
  values: [
    'Always be kind and supportive',
    'Encourage small steps and celebrate progress',
    'Respect user feelings and mental health',
    'Provide actionable advice, not just theory',
    'Use emojis to express warmth',
    'Remember context from previous conversations'
  ]
}

// Reasoning patterns - AI "thinking" logic
const REASONING_PATTERNS = {
  greeting: {
    keywords: ['hi', 'hello', 'hey', 'good morning', 'good evening', 'halo'],
    responses: [
      "Hey! 👋 Great to see you! How's your day going?",
      "Hello! ✨ I'm Calmo, your Calmora companion. What's on your mind?",
      "Hi there! 🌟 Ready to make today amazing together?"
    ]
  },
  motivation: {
    keywords: ['tired', 'motivated', 'lazy', 'can\'t', 'hard', 'difficult', 'stuck'],
    responses: [
      "I hear you. Sometimes things feel overwhelming. Remember, even small steps count! 🌱 What's one tiny thing you could do right now?",
      "It's okay to feel this way. 💙 Let's break it down together. What's the smallest step you can take?",
      "You're doing better than you think! 🌟 Every journey starts with a single step. Want to talk about what's blocking you?"
    ]
  },
  achievement: {
    keywords: ['done', 'finished', 'completed', 'achieved', 'accomplished', 'streak'],
    responses: [
      "That's AMAZING! 🎉 I'm so proud of you! Celebrate this win!",
      "YES! 🌟 You're crushing it! This is what progress looks like!",
      "Wow! 🏆 That's a real achievement! Your future self will thank you!"
    ]
  },
  stress: {
    keywords: ['stress', 'anxious', 'worried', 'overwhelmed', 'panic', 'nervous'],
    responses: [
      "Take a deep breath with me. 🧘‍♀️ In... and out... You're not alone in this. Want to talk about what's stressing you?",
      "I'm here for you. 💙 Stress is temporary, even when it doesn't feel that way. What's one thing we can tackle together?",
      "Your feelings are valid. 🌸 Sometimes just naming the stress helps. What's the main thing on your mind?"
    ]
  },
  habit_help: {
    keywords: ['habit', 'routine', 'consistency', 'streak', 'build'],
    responses: [
      "Building habits is a journey! 🌱 The key is consistency over perfection. What habit are you working on?",
      "Great question! 💡 Start small - even 2 minutes counts. Want me to help you create a plan?",
      "Habits stick when they're enjoyable! ✨ What makes this habit meaningful for you?"
    ]
  },
  pet_talk: {
    keywords: ['pet', 'virtual pet', 'mochi', 'evolution', 'level'],
    responses: [
      "Your pet is doing great! 🐾 They reflect your journey - keep nurturing both of you!",
      "I love how you care for your pet! 💕 It's like taking care of your future self!",
      "Your pet's evolution shows your progress! 🌟 Want to check how they're doing?"
    ]
  },
  mood_check: {
    keywords: ['feel', 'mood', 'emotion', 'sad', 'happy', 'angry', 'frustrated'],
    responses: [
      "Thanks for sharing how you feel. 💭 Your emotions matter. Want to log this in your mood tracker?",
      "I'm listening. 🌸 Understanding your mood is the first step to managing it well.",
      "Feelings are like weather - they change. ⛅ Want to track this and see patterns over time?"
    ]
  },
  productivity: {
    keywords: ['focus', 'productive', 'work', 'study', 'pomodoro', 'timer'],
    responses: [
      "Focus mode activated! 🎯 Want to start a Pomodoro session? I can keep you company!",
      "Productivity is about progress, not perfection. 💪 What's your next priority?",
      "You've got this! ⏱️ Remember to take breaks too. Your brain needs rest to perform!"
    ]
  },
  default: {
    responses: [
      "That's interesting! 🤔 Tell me more about that.",
      "I'm here to listen and help. 💙 What else is on your mind?",
      "Thanks for sharing! ✨ How can I support you today?",
      "I appreciate you talking with me. 🌟 What would you like to explore?"
    ]
  }
}

// Advanced reasoning - AI "thinking" process
const advancedReasoning = (input, context) => {
  const lowerInput = input.toLowerCase()
  let detectedPatterns = []
  let reasoning = []
  
  // Pattern matching
  Object.entries(REASONING_PATTERNS).forEach(([category, data]) => {
    if (category === 'default') return
    
    if (data.keywords.some(keyword => lowerInput.includes(keyword))) {
      detectedPatterns.push(category)
      reasoning.push(`Detected: ${category}`)
    }
  })
  
  // Context awareness
  if (context.pet && context.pet.level > 5) {
    reasoning.push(`User has experienced pet (level ${context.pet.level})`)
  }
  
  if (context.habits && context.habits.length > 0) {
    const activeHabits = context.habits.filter(h => h.completedDates?.length > 0)
    if (activeHabits.length > 0) {
      reasoning.push(`User has ${activeHabits.length} active habits`)
    }
  }
  
  if (context.moods && context.moods.length > 0) {
    const recentMoods = context.moods.slice(0, 7)
    const avgMood = recentMoods.reduce((sum, m) => sum + m.mood, 0) / recentMoods.length
    reasoning.push(`Recent mood average: ${avgMood.toFixed(1)}/5`)
  }
  
  // Time awareness
  const hour = new Date().getHours()
  const timeOfDay = hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : hour < 21 ? 'evening' : 'night'
  reasoning.push(`Current time: ${timeOfDay}`)
  
  // Generate response
  let selectedCategory = detectedPatterns[0] || 'default'
  const responses = REASONING_PATTERNS[selectedCategory]?.responses || REASONING_PATTERNS.default.responses
  let response = responses[Math.floor(Math.random() * responses.length)]
  
  // Add contextual enhancement
  if (context.pet?.name && Math.random() > 0.7) {
    response += ` ${context.pet.name} is cheering for you! 🐾`
  }
  
  if (timeOfDay === 'night' && !lowerInput.includes('night')) {
    response += " Don't forget to rest well tonight! 🌙"
  }
  
  return {
    response,
    reasoning,
    detectedPatterns: detectedPatterns,
    confidence: detectedPatterns.length > 0 ? 'high' : 'medium'
  }
}

// Smart suggestions based on context
const generateSuggestions = (context) => {
  const suggestions = []
  
  // Pet-based suggestions
  if (context.pet) {
    if (context.pet.hunger > 70) {
      suggestions.push({ type: 'pet', text: 'Feed your pet - they\'re hungry! 🍽️', priority: 'high' })
    }
    if (context.pet.happiness < 50) {
      suggestions.push({ type: 'pet', text: 'Play with your pet to boost their mood! 🎮', priority: 'medium' })
    }
    if (context.pet.energy < 30) {
      suggestions.push({ type: 'pet', text: 'Let your pet rest! 💤', priority: 'high' })
    }
  }
  
  // Habit-based suggestions
  if (context.habits && context.habits.length > 0) {
    const today = new Date().toISOString().split('T')[0]
    const uncompletedToday = context.habits.filter(h => 
      !h.completedDates?.includes(today)
    )
    
    if (uncompletedToday.length > 0) {
      suggestions.push({ 
        type: 'habit', 
        text: `Complete ${uncompletedToday.length} habit(s) today! 💪`, 
        priority: 'medium' 
      })
    }
    
    const streaks = context.habits.map(h => {
      const dates = h.completedDates || []
      return dates.length
    })
    const maxStreak = Math.max(...streaks, 0)
    if (maxStreak >= 7) {
      suggestions.push({ 
        type: 'achievement', 
        text: `You're on fire! 🔥 Keep that ${maxStreak}-day streak going!`, 
        priority: 'high' 
      })
    }
  }
  
  // Mood-based suggestions
  if (context.moods && context.moods.length > 0) {
    const recentMood = context.moods[0]?.mood
    if (recentMood && recentMood <= 2) {
      suggestions.push({ 
        type: 'wellness', 
        text: 'Having a tough time? Try a breathing exercise 🧘', 
        priority: 'high' 
      })
      suggestions.push({ 
        type: 'wellness', 
        text: 'Want to write in your journal? It helps process emotions 📝', 
        priority: 'medium' 
      })
    }
  }
  
  // Time-based suggestions
  const hour = new Date().getHours()
  if (hour >= 9 && hour <= 11) {
    suggestions.push({ 
      type: 'productivity', 
      text: 'Morning focus time! Perfect for deep work 🎯', 
      priority: 'low' 
    })
  }
  if (hour >= 14 && hour <= 15) {
    suggestions.push({ 
      type: 'wellness', 
      text: 'Afternoon break time! Stretch or take a short walk 🚶', 
      priority: 'medium' 
    })
  }
  
  return suggestions.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 }
    return priorityOrder[b.priority] - priorityOrder[a.priority]
  }).slice(0, 3)
}

export default function AIGuide() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [context, setContext] = useState({})
  const [suggestions, setSuggestions] = useState([])
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(false)
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
    const interval = setInterval(loadContext, 30000) // Refresh every 30s
    return () => clearInterval(interval)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen, isMinimized])

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
      // Welcome message
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

  // Process AI response with advanced reasoning
  const processAIResponse = async (userInput) => {
    setIsTyping(true)
    
    // Simulate "thinking" time based on input complexity
    const thinkingTime = Math.min(2000, 800 + userInput.length * 10)
    await new Promise(resolve => setTimeout(resolve, thinkingTime))
    
    // Use advanced reasoning engine
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
    
    // Update suggestions based on AI response
    if (result.suggestions && result.suggestions.length > 0) {
      setSuggestions(result.suggestions)
    }
    
    // Speak response if voice enabled
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
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button className="ai-float-btn" onClick={() => setIsOpen(true)}>
          <Sparkles size={28} />
          <span className="ai-btn-pulse"></span>
        </button>
      )}

      {/* AI Chat Window */}
      {isOpen && (
        <div className={`ai-chat-container ${isMinimized ? 'minimized' : ''}`}>
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-left">
              <div className="ai-avatar">
                <Sparkles size={24} />
              </div>
              <div className="ai-info">
                <h3>{AI_PERSONALITY.name}</h3>
                <span className="ai-status">
                  {isTyping ? 'Thinking...' : 'Online'} • {context.pet?.name ? `${context.pet.name} is here! 🐾` : 'Ready to help'}
                </span>
              </div>
            </div>
            <div className="ai-header-actions">
              <button className="ai-icon-btn" onClick={() => setVoiceEnabled(!voiceEnabled)} title="Voice">
                {voiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <button className="ai-icon-btn" onClick={clearConversation} title="Clear">
                <RefreshCw size={18} />
              </button>
              <button className="ai-icon-btn" onClick={() => setIsMinimized(!isMinimized)} title="Minimize">
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button className="ai-icon-btn" onClick={() => setIsOpen(false)} title="Close">
                <X size={18} />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
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
              <div className="ai-messages">
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
                            <button className="message-action" onClick={() => copyMessage(message.text)}>
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
                    placeholder="Ask me anything..."
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
            </>
          )}
        </div>
      )}
    </>
  )
}
