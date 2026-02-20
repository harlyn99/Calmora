// Advanced AI Brain with Context Awareness
// Smart response system with memory and personality

// System prompt for advanced reasoning
const SYSTEM_PROMPT = `You are an advanced reasoning AI system.
Your task is to behave like a logical thinking engine.

When responding:
1. Understand the user's request deeply.
2. Break complex problems into smaller logical parts.
3. Analyze each part step by step.
4. State assumptions if needed.
5. Provide a structured, clear, and well-reasoned final answer.

Do not jump to conclusions.
Prioritize logic, clarity, and structured thinking.
Always provide the reasoning before the final conclusion.`

export const AI_KNOWLEDGE = {
  // Greeting responses based on time
  greetings: {
    morning: [
      "Good morning! ☀️ Ready to start a productive day?",
      "Morning! I hope you slept well. What's your plan today?",
      "Rise and shine! Let's make today amazing together!",
      "Good morning! How did you sleep? Ready to tackle your goals?"
    ],
    afternoon: [
      "Good afternoon! How's your day going so far?",
      "Hey! Hope you're having a productive day. Need any help?",
      "Afternoon! Take a break if you need to. How are you?",
      "Good afternoon! You're doing great. What's on your mind?"
    ],
    evening: [
      "Good evening! Time to wind down. How was your day?",
      "Evening! You did great today. Want to talk about it?",
      "Hey there! Ready to relax? How did today go?",
      "Good evening! Proud of you for today. What happened?"
    ],
    night: [
      "Good night! 🌙 It's late, but I'm here if you need me.",
      "Still up? Make sure to rest soon. What's on your mind?",
      "Night owl, huh? I'm here for you. What's wrong?",
      "Hey! Can't sleep? Want to talk about it?"
    ]
  },

  // Follow-up questions to keep conversation going
  followUps: {
    howAreYou: [
      "What made you feel that way?",
      "Tell me more about that.",
      "How long have you been feeling like this?",
      "Is there anything specific that triggered this?"
    ],
    work: [
      "What specifically are you working on?",
      "What's the biggest challenge you're facing?",
      "How can I help you with that?",
      "What's your next step?"
    ],
    feelings: [
      "What do you think would help right now?",
      "Have you felt this way before?",
      "What would you tell a friend who felt this way?",
      "What do you need most right now?"
    ]
  },

  // Motivational responses
  motivation: [
    "You're stronger than you think! Every small step counts. 💪",
    "Remember: progress, not perfection. You're doing great!",
    "I believe in you! What's one small thing you can do right now?",
    "You've overcome challenges before. You can do it again!",
    "Don't give up! Your future self will thank you for not quitting.",
    "Every expert was once a beginner. Keep going!",
    "You're capable of amazing things. Trust the process!",
    "Challenges are opportunities in disguise. You got this!",
    "One day at a time. One step at a time. You're doing great!"
  ],

  // Empathetic responses for sadness/stress
  empathy: [
    "I'm here for you. It's okay to feel this way. 🤗",
    "Your feelings are valid. Want to talk about what's bothering you?",
    "I understand this is hard. You're not alone in this.",
    "Take a deep breath. I'm listening, and I care.",
    "It's okay to not be okay. I'm here whenever you need.",
    "You don't have to face this alone. I'm always here.",
    "Sometimes just acknowledging the pain helps. I'm proud of you for reaching out.",
    "I hear you. Your feelings matter. Tell me more."
  ],

  // Productivity tips
  productivity: [
    "Try breaking your task into smaller, manageable steps. 📝",
    "The Pomodoro Technique works great: 25 min work, 5 min break!",
    "Start with the easiest task first to build momentum.",
    "Remove distractions: put your phone away and focus on one thing.",
    "Remember why you started. Your goals are worth it!",
    "Progress over perfection. Just start, even if it's small.",
    "You don't have to be perfect. Done is better than perfect!",
    "What's the ONE thing you can do right now? Start there."
  ],

  // Study/work advice
  studyWork: [
    "Focus on understanding, not memorizing. 📚",
    "Take regular breaks! Your brain needs rest to absorb information.",
    "Try the Feynman Technique: teach it to understand it.",
    "Make a to-do list and prioritize by importance and deadline.",
    "Celebrate small wins! They add up to big progress.",
    "Work with your energy, not against it. Take breaks when needed."
  ],

  // Relationship advice
  relationships: [
    "Communication is key. Be honest about how you feel. 💕",
    "It's okay to set boundaries. Healthy relationships need them.",
    "Listen to understand, not to respond.",
    "Quality time matters more than quantity.",
    "Be kind to yourself and others. Everyone's fighting battles."
  ],

  // Self-care reminders
  selfCare: [
    "Remember to drink water! 💧 Your body needs it.",
    "Have you eaten today? Take care of your physical needs.",
    "A 10-minute walk can do wonders for your mood. 🚶",
    "It's okay to say no. Protect your energy.",
    "Rest is productive too. Don't feel guilty about taking breaks.",
    "You deserve love and care, especially from yourself. 💖",
    "Take a deep breath. In for 4, hold for 4, out for 4."
  ],

  // Fun/Playful responses
  playful: [
    "You're awesome! Did you know that? ✨",
    "High five! 🙌 You're crushing it!",
    "If you were a vegetable, you'd be a cute-cumber! 🥒",
    "I'm proud of you! *confetti noises* 🎉",
    "You're like a human, but with more levels! 🎮",
    "You're doing amazing! *virtual high five*"
  ],

  // Philosophical wisdom
  wisdom: [
    "The journey of a thousand miles begins with a single step. - Lao Tzu",
    "What we think, we become. - Buddha",
    "The only way out is through. - Robert Frost",
    "This too shall pass. Everything is temporary.",
    "Happiness is not a destination, it's a way of life.",
    "Be the change you wish to see in the world. - Gandhi",
    "The present moment is all we truly have. - Thich Nhat Hanh",
    "Understanding comes from questioning. Keep asking why."
  ],

  // Handling negative thoughts
  negativeThoughts: [
    "That's a tough thought. Let's challenge it together. Is it really true?",
    "Your thoughts aren't always facts. Let's look at evidence.",
    "I hear you. But remember: you're not your thoughts.",
    "What would you tell a friend who thought this way?",
    "This feeling is temporary. It will pass, even if it doesn't seem like it."
  ],

  // Encouragement for specific situations
  encouragement: {
    tired: "Rest if you must, but don't quit. You're closer than you think! 💪",
    anxious: "Breathe with me: in for 4, hold for 4, out for 4. You're safe. 🧘",
    overwhelmed: "One thing at a time. What's the ONE thing you can do right now?",
    lonely: "I'm here with you. And this feeling will pass. You matter. 💕",
    failed: "Failure is feedback. What did you learn? Try again, smarter.",
    scared: "Courage isn't absence of fear, it's action despite fear. You're brave!",
    confused: "It's okay to be confused. Let's break it down together.",
    excited: "That's amazing! 🎉 I'm so happy for you! Tell me more!",
    proud: "You should be proud! I definitely am! Celebrate this win! 🏆"
  },

  // Conversation starters
  starters: [
    "How are you feeling right now?",
    "What's been the best part of your day?",
    "Anything on your mind you'd like to share?",
    "How can I support you today?",
    "What's something you're looking forward to?"
  ]
}

// Theme configurations
export const AI_THEMES = {
  calm: {
    id: 'calm',
    name: 'Calm',
    description: 'Peaceful and soothing companion',
    icon: '🌊',
    responseStyle: 'gentle'
  },
  motivator: {
    id: 'motivator',
    name: 'Motivator',
    description: 'Energetic and inspiring coach',
    icon: '⚡',
    responseStyle: 'energetic'
  },
  wise: {
    id: 'wise',
    name: 'Wise',
    description: 'Thoughtful and philosophical guide',
    icon: '🦉',
    responseStyle: 'philosophical'
  },
  playful: {
    id: 'playful',
    name: 'Playful',
    description: 'Fun and cheerful friend',
    icon: '🎈',
    responseStyle: 'playful'
  },
  supportive: {
    id: 'supportive',
    name: 'Supportive',
    description: 'Caring and empathetic listener',
    icon: '🤗',
    responseStyle: 'empathetic'
  }
}

// Conversation context tracking
let conversationHistory = []
let userMoodHistory = []

// Detect emotion/intent from message
const detectEmotion = (message) => {
  const lower = message.toLowerCase()
  
  const emotions = {
    sad: lower.match(/\b(sad|depressed|unhappy|down|cry|crying|hurt|pain|heartbreak|lonely|alone|miss)\b/),
    anxious: lower.match(/\b(anxious|worried|scared|afraid|nervous|panic|stress|overwhelmed|panic)\b/),
    tired: lower.match(/\b(tired|exhausted|drained|burnout|sleepy|fatigue|weary)\b/),
    motivated: lower.match(/\b(motivate|inspire|goal|achieve|success|win|accomplish|determined)\b/),
    productive: lower.match(/\b(work|study|task|todo|productivity|focus|concentrate|deadline)\b/),
    happy: lower.match(/\b(happy|excited|great|awesome|amazing|wonderful|fantastic|joy|glad)\b/),
    confused: lower.match(/\b(confused|unclear|don't understand|dont understand|lost|puzzled)\b/),
    failed: lower.match(/\b(fail|failed|failure|mistake|wrong|screwed|ruined)\b/),
    proud: lower.match(/\b(proud|accomplished|did it|success|achieved|won)\b/),
    angry: lower.match(/\b(angry|mad|furious|annoyed|frustrated|irate)\b/),
    grateful: lower.match(/\b(thank|thanks|appreciate|grateful|thankful)\b/)
  }

  // Find dominant emotion
  let dominantEmotion = 'neutral'
  let maxScore = 0
  
  Object.entries(emotions).forEach(([emotion, match]) => {
    if (match && match.length > maxScore) {
      maxScore = match.length
      dominantEmotion = emotion
    }
  })

  return dominantEmotion
}

// Get time-based greeting
const getTimeGreeting = () => {
  const hour = new Date().getHours()
  if (hour >= 5 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 18) return 'afternoon'
  if (hour >= 18 && hour < 22) return 'evening'
  return 'night'
}

// Generate contextual response
export const generateSmartResponse = (message, personality = 'calm', conversationContext = []) => {
  const emotion = detectEmotion(message)
  const theme = AI_THEMES[personality] || AI_THEMES.calm
  
  // Store in history
  conversationHistory.push({ message, emotion, timestamp: Date.now() })
  if (conversationHistory.length > 20) conversationHistory.shift()
  
  // Track mood
  if (emotion !== 'neutral' && emotion !== 'grateful') {
    userMoodHistory.push({ emotion, timestamp: Date.now() })
    if (userMoodHistory.length > 50) userMoodHistory.shift()
  }

  // 1. Handle greetings
  if (emotion === 'grateful') {
    const responses = [
      "Always here for you! 💕",
      "That's what I'm here for! Anytime!",
      "You're welcome! Don't hesitate to reach out.",
      "Happy to help! That's my purpose! ✨",
      "Anytime! That's what friends are for!"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // 2. Handle specific emotions with priority
  if (emotion === 'sad' || emotion === 'lonely') {
    const responses = AI_KNOWLEDGE.empathy
    const followUp = AI_KNOWLEDGE.followUps.feelings[Math.floor(Math.random() * AI_KNOWLEDGE.followUps.feelings.length)]
    return `${responses[Math.floor(Math.random() * responses.length)]} ${followUp}`
  }
  
  if (emotion === 'anxious' || emotion === 'overwhelmed') {
    return AI_KNOWLEDGE.encouragement[emotion] || AI_KNOWLEDGE.encouragement.anxious
  }
  
  if (emotion === 'tired') {
    return AI_KNOWLEDGE.encouragement.tired + " Remember to take care of yourself!"
  }
  
  if (emotion === 'happy' || emotion === 'excited') {
    return AI_KNOWLEDGE.encouragement.excited + " What happened? Tell me more!"
  }
  
  if (emotion === 'failed') {
    return AI_KNOWLEDGE.encouragement.failed + " What did you learn from this?"
  }
  
  if (emotion === 'proud') {
    return AI_KNOWLEDGE.encouragement.proud
  }
  
  if (emotion === 'confused') {
    return AI_KNOWLEDGE.encouragement.confused + " What's confusing you? Let's figure it out together."
  }

  if (emotion === 'motivated') {
    const responses = AI_KNOWLEDGE.motivation
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  if (emotion === 'productive') {
    const responses = AI_KNOWLEDGE.productivity
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // 3. Check for questions
  if (message.includes('?')) {
    if (message.toLowerCase().includes('how are you')) {
      const timeOfDay = getTimeGreeting()
      const greetings = AI_KNOWLEDGE.greetings[timeOfDay]
      return greetings[Math.floor(Math.random() * greetings.length)] + " How about you?"
    }
    
    if (message.toLowerCase().includes('what should') || message.toLowerCase().includes('advice')) {
      return "That's a great question! Let me think... " + 
        AI_KNOWLEDGE.productivity[Math.floor(Math.random() * AI_KNOWLEDGE.productivity.length)] + 
        " What specifically are you wondering about?"
    }
  }

  // 4. Default: personality-based response with context
  const styleResponses = {
    gentle: AI_KNOWLEDGE.empathy,
    energetic: AI_KNOWLEDGE.motivation,
    philosophical: AI_KNOWLEDGE.wisdom,
    playful: AI_KNOWLEDGE.playful,
    empathetic: AI_KNOWLEDGE.selfCare
  }
  
  const responses = styleResponses[theme.responseStyle] || AI_KNOWLEDGE.empathy
  const baseResponse = responses[Math.floor(Math.random() * responses.length)]
  
  // Add follow-up question to keep conversation going
  const followUps = AI_KNOWLEDGE.followUps.howAreYou
  const followUp = followUps[Math.floor(Math.random() * followUps.length)]
  
  return `${baseResponse} ${followUp}`
}

// Get conversation summary
export const getConversationSummary = () => {
  if (conversationHistory.length === 0) return "No conversation yet."
  
  const recentEmotions = conversationHistory.slice(-10).map(c => c.emotion)
  const emotionCounts = {}
  recentEmotions.forEach(e => { emotionCounts[e] = (emotionCounts[e] || 0) + 1 })
  
  const dominantEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'neutral'
  
  return {
    totalMessages: conversationHistory.length,
    dominantEmotion,
    recentEmotions: emotionCounts
  }
}

// Reset conversation
export const resetConversation = () => {
  conversationHistory = []
  userMoodHistory = []
}

// Get mood trend
export const getMoodTrend = () => {
  if (userMoodHistory.length < 3) return 'insufficient data'
  
  const recentMoods = userMoodHistory.slice(-10)
  const positiveEmotions = ['happy', 'motivated', 'proud', 'grateful']
  const negativeEmotions = ['sad', 'anxious', 'tired', 'failed', 'angry']
  
  const positiveCount = recentMoods.filter(m => positiveEmotions.includes(m.emotion)).length
  const negativeCount = recentMoods.filter(m => negativeEmotions.includes(m.emotion)).length
  
  if (positiveCount > negativeCount) return 'improving'
  if (negativeCount > positiveCount) return 'declining'
  return 'stable'
}

export default {
  AI_KNOWLEDGE,
  AI_THEMES,
  generateSmartResponse,
  detectEmotion,
  getConversationSummary,
  resetConversation,
  getMoodTrend
}
