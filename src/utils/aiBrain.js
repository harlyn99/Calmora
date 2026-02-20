// AI Brain - Smart Response System
// This contains the AI's knowledge base and response logic

export const AI_KNOWLEDGE = {
  // Greeting responses based on time
  greetings: {
    morning: [
      "Good morning! ☀️ Ready to start a productive day?",
      "Morning! I hope you slept well. What's your plan today?",
      "Rise and shine! Let's make today amazing together!"
    ],
    afternoon: [
      "Good afternoon! How's your day going so far?",
      "Hey! Hope you're having a productive day. Need any help?",
      "Afternoon! Take a break if you need to. How are you?"
    ],
    evening: [
      "Good evening! Time to wind down. How was your day?",
      "Evening! You did great today. Want to talk about it?",
      "Hey there! Ready to relax? How did today go?"
    ],
    night: [
      "Good night! 🌙 It's late, but I'm here if you need me.",
      "Still up? Make sure to rest soon. What's on your mind?",
      "Night owl, huh? I'm here for you. What's wrong?"
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
    "Challenges are opportunities in disguise. You got this!"
  ],

  // Empathetic responses for sadness/stress
  empathy: [
    "I'm here for you. It's okay to feel this way. 🤗",
    "Your feelings are valid. Want to talk about what's bothering you?",
    "I understand this is hard. You're not alone in this.",
    "Take a deep breath. I'm listening, and I care.",
    "It's okay to not be okay. I'm here whenever you need.",
    "You don't have to face this alone. I'm always here.",
    "Sometimes just acknowledging the pain helps. I'm proud of you for reaching out."
  ],

  // Productivity tips
  productivity: [
    "Try breaking your task into smaller, manageable steps. 📝",
    "The Pomodoro Technique works great: 25 min work, 5 min break!",
    "Start with the easiest task first to build momentum.",
    "Remove distractions: put your phone away and focus on one thing.",
    "Remember why you started. Your goals are worth it!",
    "Progress over perfection. Just start, even if it's small.",
    "You don't have to be perfect. Done is better than perfect!"
  ],

  // Study/work advice
  studyWork: [
    "Focus on understanding, not memorizing. 📚",
    "Take regular breaks! Your brain needs rest to absorb information.",
    "Try the Feynman Technique: teach it to understand it.",
    "Make a to-do list and prioritize by importance and deadline.",
    "Celebrate small wins! They add up to big progress."
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
    "You deserve love and care, especially from yourself. 💖"
  ],

  // Fun/Playful responses
  playful: [
    "You're awesome! Did you know that? ✨",
    "High five! 🙌 You're crushing it!",
    "If you were a vegetable, you'd be a cute-cumber! 🥒",
    "I'm proud of you! *confetti noises* 🎉",
    "You're like a human, but with more levels! 🎮"
  ],

  // Philosophical wisdom
  wisdom: [
    "The journey of a thousand miles begins with a single step. - Lao Tzu",
    "What we think, we become. - Buddha",
    "The only way out is through. - Robert Frost",
    "This too shall pass. Everything is temporary.",
    "Happiness is not a destination, it's a way of life.",
    "Be the change you wish to see in the world. - Gandhi",
    "The present moment is all we truly have. - Thich Nhat Hanh"
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
  }
}

// Theme configurations with proper contrast
export const AI_THEMES = {
  calm: {
    id: 'calm',
    name: 'Calm',
    description: 'Peaceful and soothing companion',
    avatar: '✨',
    icon: '🌊',
    primaryColor: '#4a90a4',
    secondaryColor: '#2d4a5c',
    accentColor: '#6b9ac4',
    background: 'linear-gradient(135deg, #e8f4f8 0%, #f0f7ff 100%)',
    headerBackground: 'linear-gradient(135deg, rgba(74, 144, 164, 0.1), rgba(107, 154, 196, 0.1))',
    textColor: '#1a3a4a',
    textMuted: '#5a7a8a',
    bubbleColor: '#ffffff',
    bubbleShadow: 'rgba(74, 144, 164, 0.15)',
    responseStyle: 'gentle',
    keywords: ['relax', 'breathe', 'calm', 'peace', 'quiet', 'stress', 'anxious']
  },
  motivator: {
    id: 'motivator',
    name: 'Motivator',
    description: 'Energetic and inspiring coach',
    avatar: '✨',
    icon: '⚡',
    primaryColor: '#e67e50',
    secondaryColor: '#c95a30',
    accentColor: '#f39c70',
    background: 'linear-gradient(135deg, #fff5e6 0%, #ffe8f0 100%)',
    headerBackground: 'linear-gradient(135deg, rgba(230, 126, 80, 0.1), rgba(243, 156, 112, 0.1))',
    textColor: '#3a2a20',
    textMuted: '#7a5a4a',
    bubbleColor: '#ffffff',
    bubbleShadow: 'rgba(230, 126, 80, 0.15)',
    responseStyle: 'energetic',
    keywords: ['goal', 'achieve', 'motivate', 'success', 'win', 'tired', 'give up']
  },
  wise: {
    id: 'wise',
    name: 'Wise',
    description: 'Thoughtful and philosophical guide',
    avatar: '✨',
    icon: '🦉',
    primaryColor: '#8b7355',
    secondaryColor: '#5a4a3a',
    accentColor: '#a99375',
    background: 'linear-gradient(135deg, #f5f0e8 0%, #e8e4dc 100%)',
    headerBackground: 'linear-gradient(135deg, rgba(139, 115, 85, 0.1), rgba(169, 147, 117, 0.1))',
    textColor: '#2a2018',
    textMuted: '#6a5a4a',
    bubbleColor: '#ffffff',
    bubbleShadow: 'rgba(139, 115, 85, 0.15)',
    responseStyle: 'philosophical',
    keywords: ['why', 'meaning', 'purpose', 'learn', 'understand', 'confused', 'wisdom']
  },
  playful: {
    id: 'playful',
    name: 'Playful',
    description: 'Fun and cheerful friend',
    avatar: '✨',
    icon: '🎈',
    primaryColor: '#c47eb5',
    secondaryColor: '#9a4a8a',
    accentColor: '#d49ec5',
    background: 'linear-gradient(135deg, #fef5f9 0%, #f5f0ff 100%)',
    headerBackground: 'linear-gradient(135deg, rgba(196, 126, 181, 0.1), rgba(212, 158, 197, 0.1))',
    textColor: '#3a1a3a',
    textMuted: '#7a4a7a',
    bubbleColor: '#ffffff',
    bubbleShadow: 'rgba(196, 126, 181, 0.15)',
    responseStyle: 'playful',
    keywords: ['fun', 'joke', 'play', 'happy', 'laugh', 'bored', 'excited']
  },
  supportive: {
    id: 'supportive',
    name: 'Supportive',
    description: 'Caring and empathetic listener',
    avatar: '✨',
    icon: '🤗',
    primaryColor: '#7eb57e',
    secondaryColor: '#4a8a4a',
    accentColor: '#9ec59e',
    background: 'linear-gradient(135deg, #f0f7f0 0%, #e8f0e8 100%)',
    headerBackground: 'linear-gradient(135deg, rgba(126, 181, 126, 0.1), rgba(158, 197, 158, 0.1))',
    textColor: '#1a3a1a',
    textMuted: '#4a7a4a',
    bubbleColor: '#ffffff',
    bubbleShadow: 'rgba(126, 181, 126, 0.15)',
    responseStyle: 'empathetic',
    keywords: ['sad', 'worried', 'stress', 'help', 'support', 'lonely', 'hurt']
  }
}

// Smart response generator
export const generateSmartResponse = (message, personality = 'calm') => {
  const lowerMessage = message.toLowerCase()
  const theme = AI_THEMES[personality] || AI_THEMES.calm
  
  // Detect emotion/intent
  const detections = {
    isSad: lowerMessage.match(/(sad|depressed|unhappy|down|cry|crying|hurt|pain|heartbreak)/),
    isAnxious: lowerMessage.match(/(anxious|worried|scared|afraid|nervous|panic|stress)/),
    isTired: lowerMessage.match(/(tired|exhausted|drained|burnout|sleepy|fatigue)/),
    isMotivated: lowerMessage.match(/(motivate|inspire|goal|achieve|success|win|accomplish)/),
    isProductive: lowerMessage.match(/(work|study|task|todo|productivity|focus|concentrate)/),
    isLonely: lowerMessage.match(/(lonely|alone|isolated|nobody|no one|friendless)/),
    isExcited: lowerMessage.match(/(excited|happy|great|awesome|amazing|wonderful|fantastic)/),
    isConfused: lowerMessage.match(/(confused|unclear|don't understand|dont understand|lost)/),
    isFailed: lowerMessage.match(/(fail|failed|failure|mistake|wrong|screwed up)/),
    isProud: lowerMessage.match(/(proud|accomplished|did it|success|achieved)/),
    isOverwhelmed: lowerMessage.match(/(overwhelmed|too much|can't handle|cant handle|stressed)/),
    needsAdvice: lowerMessage.match(/(should i|what should|how do|advice|help me|what do you think)/),
    isGreeting: lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening|sup|yo)/),
    isThankful: lowerMessage.match(/(thank|thanks|appreciate|grateful)/)
  }

  // Get time-based greeting if it's a greeting
  if (detections.isGreeting) {
    const hour = new Date().getHours()
    let timeOfDay = 'afternoon'
    if (hour >= 5 && hour < 12) timeOfDay = 'morning'
    else if (hour >= 12 && hour < 18) timeOfDay = 'afternoon'
    else if (hour >= 18 && hour < 22) timeOfDay = 'evening'
    else timeOfDay = 'night'
    
    const greetings = AI_KNOWLEDGE.greetings[timeOfDay]
    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  // Thankful response
  if (detections.isThankful) {
    const responses = [
      "Always here for you! 💕",
      "That's what I'm here for! Anytime!",
      "You're welcome! Don't hesitate to reach out.",
      "Happy to help! That's my purpose! ✨"
    ]
    return responses[Math.floor(Math.random() * responses.length)]
  }

  // Priority-based response selection
  if (detections.isSad || detections.isLonely) {
    const responses = AI_KNOWLEDGE.empathy
    return responses[Math.floor(Math.random() * responses.length)] + " Want to talk more about it?"
  }
  
  if (detections.isAnxious || detections.isOverwhelmed) {
    const key = detections.isAnxious ? 'anxious' : 'overwhelmed'
    return AI_KNOWLEDGE.encouragement[key]
  }
  
  if (detections.isTired) {
    return AI_KNOWLEDGE.encouragement.tired + " Remember to take care of yourself!"
  }
  
  if (detections.isMotivated) {
    const responses = AI_KNOWLEDGE.motivation
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  if (detections.isProductive) {
    const responses = AI_KNOWLEDGE.productivity
    return responses[Math.floor(Math.random() * responses.length)]
  }
  
  if (detections.isFailed) {
    return AI_KNOWLEDGE.encouragement.failed
  }
  
  if (detections.isProud) {
    return AI_KNOWLEDGE.encouragement.proud
  }
  
  if (detections.isExcited) {
    return AI_KNOWLEDGE.encouragement.excited
  }
  
  if (detections.isConfused) {
    return AI_KNOWLEDGE.encouragement.confused + " What's confusing you?"
  }
  
  if (detections.needsAdvice) {
    return "That's a great question! Let me think... " + AI_KNOWLEDGE.productivity[Math.floor(Math.random() * AI_KNOWLEDGE.productivity.length)] + " What specifically are you wondering about?"
  }

  // Default: use personality-based response
  const styleResponses = {
    gentle: AI_KNOWLEDGE.empathy,
    energetic: AI_KNOWLEDGE.motivation,
    philosophical: AI_KNOWLEDGE.wisdom,
    playful: AI_KNOWLEDGE.playful,
    empathetic: AI_KNOWLEDGE.selfCare
  }
  
  const responses = styleResponses[theme.responseStyle] || AI_KNOWLEDGE.empathy
  return responses[Math.floor(Math.random() * responses.length)]
}

// Get personality based on detected emotion
export const detectBestPersonality = (message) => {
  const lower = message.toLowerCase()
  
  if (lower.match(/(sad|depressed|lonely|hurt|cry)/)) return 'supportive'
  if (lower.match(/(anxious|scared|worried|panic)/)) return 'calm'
  if (lower.match(/(motivate|goal|success|achieve|work)/)) return 'motivator'
  if (lower.match(/(why|meaning|purpose|philosophy|wisdom)/)) return 'wise'
  if (lower.match(/(fun|joke|happy|excited|play)/)) return 'playful'
  
  return 'calm' // default
}

export default {
  AI_KNOWLEDGE,
  AI_THEMES,
  generateSmartResponse,
  detectBestPersonality
}
