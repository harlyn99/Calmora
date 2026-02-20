/**
 * Calmo AI - Advanced Reasoning Engine
 * The "brain" behind the AI companion
 */

// Knowledge base about Calmora features
const CALMORA_KNOWLEDGE = {
  features: {
    'virtual-pet': {
      name: 'Virtual Pet',
      description: 'Your digital companion that grows with you',
      commands: ['pet', 'feed pet', 'play with pet', 'pet evolution', 'check pet'],
      tips: [
        'Feed your pet when hunger > 70%',
        'Play to boost happiness',
        'Let pet rest when energy is low',
        'Pet evolves based on your mood!'
      ]
    },
    'habit-tracker': {
      name: 'Habit Tracker',
      description: 'Build consistency with visual garden growth',
      commands: ['habits', 'streak', 'build habit', 'routine'],
      tips: [
        'Start with 2-minute habits',
        'Stack habits on existing routines',
        'Don\'t break the chain!',
        'Your habits grow into plants!'
      ]
    },
    'mood-tracker': {
      name: 'Mood Tracker',
      description: 'Track and understand your emotions',
      commands: ['mood', 'feel', 'emotion', 'stressed', 'anxious'],
      tips: [
        'Log mood 2-3 times daily',
        'Notice patterns over time',
        'Bad moods are temporary',
        'Your pet reflects your mood!'
      ]
    },
    'focus-timer': {
      name: 'Focus Timer (Pomodoro)',
      description: 'Stay focused with timed sessions',
      commands: ['timer', 'focus', 'pomodoro', 'study', 'work'],
      tips: [
        '25 min work + 5 min break',
        'Enable Focus Companion mode',
        'Your pet meditates with you!',
        'Take real breaks - move around!'
      ]
    },
    'journal': {
      name: 'Journal',
      description: 'Reflect and process your thoughts',
      commands: ['journal', 'write', 'diary', 'reflect'],
      tips: [
        'Write 3 things you\'re grateful for',
        'Process difficult emotions',
        'Track your growth journey',
        'Whisper to your pet!'
      ]
    },
    'meditation': {
      name: 'Meditation & Breathing',
      description: 'Calm your mind with guided exercises',
      commands: ['meditate', 'breathe', 'relax', 'calm'],
      tips: [
        'Start with 2 minutes',
        'Focus on your breath',
        '4-7-8 breathing for anxiety',
        'Box breathing for focus'
      ]
    }
  }
}

// Emotional intelligence patterns
const EMOTIONAL_PATTERNS = {
  stress: {
    indicators: ['stress', 'overwhelmed', 'anxious', 'panic', 'too much', 'can\'t handle'],
    response_strategy: 'validate_and_simplify',
    actions: [
      'Acknowledge the feeling',
      'Suggest breathing exercise',
      'Break down tasks',
      'Offer specific help'
    ]
  },
  sadness: {
    indicators: ['sad', 'depressed', 'down', 'unhappy', 'cry', 'lonely'],
    response_strategy: 'empathize_and_encourage',
    actions: [
      'Validate emotions',
      'Remind they\'re not alone',
      'Suggest mood tracking',
      'Recommend small wins'
    ]
  },
  frustration: {
    indicators: ['frustrated', 'annoyed', 'irritated', 'angry', 'hate this'],
    response_strategy: 'redirect_and_solve',
    actions: [
      'Acknowledge frustration',
      'Identify root cause',
      'Offer practical solution',
      'Suggest break if needed'
    ]
  },
  excitement: {
    indicators: ['excited', 'happy', 'great', 'amazing', 'love', 'awesome'],
    response_strategy: 'amplify_and_reinforce',
    actions: [
      'Celebrate with them',
      'Ask what\'s going well',
      'Encourage continuation',
      'Suggest logging the mood'
    ]
  },
  tiredness: {
    indicators: ['tired', 'exhausted', 'sleepy', 'drained', 'burnt out'],
    response_strategy: 'rest_and_recovery',
    actions: [
      'Validate need for rest',
      'Suggest break or sleep',
      'Remind rest is productive',
      'Check pet\'s energy too'
    ]
  }
}

// Context-aware response generation
class AIReasoningEngine {
  constructor() {
    this.conversationHistory = []
    this.userProfile = {}
    this.sessionData = {}
  }

  // Main reasoning function
  reason(input, context = {}) {
    const analysis = {
      input,
      timestamp: new Date().toISOString(),
      intent: this.detectIntent(input),
      emotion: this.detectEmotion(input),
      context: this.analyzeContext(context),
      suggestions: []
    }

    // Generate response based on analysis
    const response = this.generateResponse(analysis, context)

    // Update history
    this.conversationHistory.push({
      role: 'user',
      content: input,
      analysis,
      timestamp: Date.now()
    })

    this.conversationHistory.push({
      role: 'assistant',
      content: response.text,
      timestamp: Date.now()
    })

    // Keep history manageable
    if (this.conversationHistory.length > 20) {
      this.conversationHistory = this.conversationHistory.slice(-20)
    }

    return {
      response: response.text,
      reasoning: analysis,
      suggestions: response.suggestions,
      confidence: response.confidence
    }
  }

  // Detect user intent
  detectIntent(input) {
    const lower = input.toLowerCase()

    const intents = {
      greeting: /^(hi|hello|hey|good morning|good evening|halo|hai)/i,
      help: /(help|how to|can you|could you|assist)/i,
      feature_question: /(what is|how does|tell me about|explain)/i,
      status_check: /(how (am|i|my)|check|status|progress)/i,
      motivation: /(motivated|inspire|encourage|push me)/i,
      complaint: /(problem|issue|bug|not working|broken)/i,
      gratitude: /(thank|thanks|appreciate|grateful)/i,
      farewell: /(bye|goodbye|see you|later|quit|exit)/i,
      casual: /(how are you|what\'s up|how\'s it going)/i
    }

    for (const [intent, pattern] of Object.entries(intents)) {
      if (pattern.test(lower)) {
        return intent
      }
    }

    return 'general'
  }

  // Detect emotional state
  detectEmotion(input) {
    const lower = input.toLowerCase()

    for (const [emotion, data] of Object.entries(EMOTIONAL_PATTERNS)) {
      if (data.indicators.some(indicator => lower.includes(indicator))) {
        return {
          type: emotion,
          confidence: 0.8,
          strategy: data.response_strategy
        }
      }
    }

    return {
      type: 'neutral',
      confidence: 0.9,
      strategy: 'informative'
    }
  }

  // Analyze user context
  analyzeContext(context) {
    const insights = []

    // Pet analysis
    if (context.pet) {
      const { pet } = context
      if (pet.hunger > 70) insights.push('Pet needs feeding')
      if (pet.happiness < 50) insights.push('Pet needs attention')
      if (pet.energy < 30) insights.push('Pet needs rest')
      if (pet.level >= 5) insights.push('Experienced pet owner')
      if (pet.isSick) insights.push('Pet is sick - needs care')
    }

    // Habit analysis
    if (context.habits && context.habits.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      const completed = context.habits.filter(h =>
        h.completedDates?.includes(today)
      ).length
      const total = context.habits.length

      if (completed === 0 && total > 0) {
        insights.push('No habits completed today')
      } else if (completed === total) {
        insights.push('All habits completed - great job!')
      } else if (completed > 0) {
        insights.push(`${completed}/${total} habits done`)
      }

      // Check streaks
      const bestStreak = Math.max(...context.habits.map(h =>
        (h.completedDates || []).length
      ), 0)
      if (bestStreak >= 30) {
        insights.push('Dedicated habit builder (30+ days)')
      }
    }

    // Mood analysis
    if (context.moods && context.moods.length > 0) {
      const recent = context.moods.slice(0, 7)
      const avgMood = recent.reduce((sum, m) => sum + m.mood, 0) / recent.length

      if (avgMood >= 4) insights.push('Positive mood trend')
      else if (avgMood <= 2) insights.push('May need emotional support')
      else insights.push('Stable mood')
    }

    // Time analysis
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 12) insights.push('Morning person')
    else if (hour >= 22 || hour < 5) insights.push('Late night - should rest')

    return insights
  }

  // Generate contextual response
  generateResponse(analysis, context) {
    const { intent, emotion, context: insights } = analysis

    let response = ''
    let suggestions = []
    let confidence = 'medium'

    // Handle by intent
    switch (intent) {
      case 'greeting':
        response = this.generateGreeting(context)
        confidence = 'high'
        break

      case 'help':
        response = this.offerHelp(analysis.input, context)
        suggestions = this.getFeatureSuggestions(context)
        confidence = 'high'
        break

      case 'status_check':
        response = this.provideStatus(context)
        suggestions = this.getStatusActions(context)
        confidence = 'high'
        break

      case 'motivation':
        response = this.provideMotivation(emotion, context)
        confidence = 'high'
        break

      case 'gratitude':
        response = "You're welcome! 💙 I'm always here to help. Keep up the great work!"
        confidence = 'high'
        break

      case 'farewell':
        response = "Take care! Remember, I'm always here when you need me. You've got this! ✨"
        break

      default:
        response = this.handleGeneralQuery(analysis.input, context)
    }

    // Add emotional layer
    if (emotion.type !== 'neutral') {
      response = this.addEmotionalLayer(response, emotion, context)
    }

    // Add contextual insights
    if (insights.length > 0 && Math.random() > 0.7) {
      const randomInsight = insights[Math.floor(Math.random() * insights.length)]
      response += ` ${randomInsight}.`
    }

    return {
      text: response,
      suggestions,
      confidence
    }
  }

  generateGreeting(context) {
    const hour = new Date().getHours()
    const timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : hour < 21 ? 'Good evening' : 'Good night'

    const petName = context.pet?.name || 'your pet'
    const petStatus = context.pet ? `${petName} is doing great! 🐾 ` : ''

    const greetings = [
      `${timeGreeting}! 👋 ${petStatus}Ready to make today amazing?`,
      `Hey there! ✨ ${petStatus}What's on your mind today?`,
      `${timeGreeting}! 🌟 ${petStatus}How can I help you today?`
    ]

    return greetings[Math.floor(Math.random() * greetings.length)]
  }

  offerHelp(input, context) {
    const features = Object.values(CALMORA_KNOWLEDGE.features)
    const relevantFeatures = features.filter(f =>
      input.toLowerCase().includes(f.name.toLowerCase().split(' ')[0].toLowerCase())
    )

    if (relevantFeatures.length > 0) {
      const feature = relevantFeatures[0]
      return `I'd love to help you with ${feature.name}! ${feature.description}. ${feature.tips[Math.floor(Math.random() * feature.tips.length)]}`
    }

    return "I'm here to help! I can assist you with:\n\n" +
      "🐾 Virtual Pet - Your digital companion\n" +
      "🌱 Habit Tracker - Build consistency\n" +
      "📊 Mood Tracker - Understand emotions\n" +
      "⏱️ Focus Timer - Stay productive\n" +
      "📔 Journal - Reflect & grow\n" +
      "🧘 Meditation - Find calm\n\n" +
      "What would you like to explore?"
  }

  provideStatus(context) {
    const status = []

    if (context.pet) {
      const { pet } = context
      status.push(`🐾 ${pet.name}: Level ${pet.level} ${pet.happiness > 80 ? '(Happy!)' : ''}`)
      status.push(`   Happiness: ${Math.round(pet.happiness)}%`)
      status.push(`   Energy: ${Math.round(pet.energy)}%`)
      status.push(`   Hunger: ${Math.round(pet.hunger)}%`)
    }

    if (context.habits && context.habits.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      const completed = context.habits.filter(h =>
        h.completedDates?.includes(today)
      ).length
      status.push(`\n📝 Habits: ${completed}/${context.habits.length} done today`)
    }

    if (context.moods && context.moods.length > 0) {
      const recent = context.moods.slice(0, 7)
      const avgMood = recent.reduce((sum, m) => sum + m.mood, 0) / recent.length
      status.push(`\n😊 Avg mood (7 days): ${avgMood.toFixed(1)}/5`)
    }

    return status.join('\n') || "I don't have enough data yet. Start using Calmora features and I'll track your progress!"
  }

  provideMotivation(emotion, context) {
    if (emotion.type === 'sadness' || emotion.type === 'stress') {
      return "I know things feel heavy right now. 💙 But remember: you've overcome 100% of your bad days so far. One small step at a time. What's one tiny thing you can do right now?"
    }

    const achievements = []
    if (context.pet?.level > 5) achievements.push(`Your pet reached level ${context.pet.level}!`)
    if (context.habits?.length > 0) achievements.push(`You're building ${context.habits.length} habit(s)!`)
    if (context.moods?.length > 5) achievements.push(`You've logged ${context.moods.length} moods - great self-awareness!`)

    if (achievements.length > 0) {
      return "Look how far you've come! 🌟\n\n" + achievements.join('\n') +
        "\n\nYou're doing better than you think. Keep going! 💪"
    }

    return "You're capable of amazing things! 🌟 Every expert was once a beginner. Every pro was once an amateur. Every icon had an origin. And every successful person started exactly where you are now. Keep going! 💪"
  }

  handleGeneralQuery(input, context) {
    // Try to find relevant information
    const lower = input.toLowerCase()

    // Check if asking about features
    for (const [key, feature] of Object.entries(CALMORA_KNOWLEDGE.features)) {
      if (lower.includes(key) || feature.commands.some(cmd => lower.includes(cmd))) {
        return `${feature.name}: ${feature.description}\n\nPro tip: ${feature.tips[Math.floor(Math.random() * feature.tips.length)]}`
      }
    }

    // Default responses
    const defaults = [
      "That's interesting! 🤔 Tell me more about that.",
      "I'm here to listen and help. 💙 What else is on your mind?",
      "Thanks for sharing! ✨ How can I support you today?",
      "I appreciate you talking with me. 🌟 Want to explore any Calmora features?"
    ]

    return defaults[Math.floor(Math.random() * defaults.length)]
  }

  addEmotionalLayer(response, emotion, context) {
    const additions = {
      stress: "\n\nRemember to breathe. You don't have to do everything at once. 🌸",
      sadness: "\n\nYour feelings are valid. I'm here for you. 💙",
      frustration: "\n\nIt's okay to feel frustrated. Let's figure this out together. 🤝",
      excitement: "\n\nI love your energy! Let's channel it! ✨",
      tiredness: "\n\nRest is productive too. Take care of yourself. 💤"
    }

    return response + (additions[emotion.type] || '')
  }

  getFeatureSuggestions(context) {
    const suggestions = []

    if (context.pet?.hunger > 70) {
      suggestions.push({ type: 'pet', text: 'Feed your pet 🍽️' })
    }
    if (context.pet?.happiness < 50) {
      suggestions.push({ type: 'pet', text: 'Play with pet 🎮' })
    }
    if (context.habits?.length > 0) {
      const today = new Date().toISOString().split('T')[0]
      const uncompleted = context.habits.filter(h =>
        !h.completedDates?.includes(today)
      )
      if (uncompleted.length > 0) {
        suggestions.push({ type: 'habit', text: `Complete ${uncompleted.length} habit(s)` })
      }
    }
    if (!context.moods || context.moods.length === 0 ||
        new Date(context.moods[0]?.timestamp).getDate() !== new Date().getDate()) {
      suggestions.push({ type: 'mood', text: 'Log your mood 📊' })
    }

    return suggestions.slice(0, 3)
  }

  getStatusActions(context) {
    const actions = []

    if (context.pet) {
      if (context.pet.hunger > 70) actions.push('Feed pet')
      if (context.pet.energy < 30) actions.push('Let pet rest')
    }

    return actions
  }
}

// Export singleton instance
export const reasoningEngine = new AIReasoningEngine()
export default reasoningEngine
