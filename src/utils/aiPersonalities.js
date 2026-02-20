// AI Personalities Configuration
// Each personality affects chat background theme and avatar

export const AI_PERSONALITIES = {
  calm: {
    id: 'calm',
    name: 'Calm',
    description: 'Peaceful and soothing companion',
    avatar: '✨',
    greeting: 'Take a deep breath... I\'m here to listen.',
    background: 'var(--bg-gradient, linear-gradient(135deg, #e8f4f8 0%, #f0f7ff 100%))',
    accentColor: '#6b9ac4',
    textColor: '#2d4a5c',
    responseStyle: 'gentle',
    keywords: ['relax', 'breathe', 'calm', 'peace', 'quiet']
  },
  motivator: {
    id: 'motivator',
    name: 'Motivator',
    description: 'Energetic and inspiring coach',
    avatar: '✨',
    greeting: 'Ready to crush your goals today? Let\'s go!',
    background: 'var(--bg-gradient, linear-gradient(135deg, #fff5e6 0%, #ffe8f0 100%))',
    accentColor: '#e67e50',
    textColor: '#5c3a2a',
    responseStyle: 'energetic',
    keywords: ['goal', 'achieve', 'motivate', 'success', 'win']
  },
  wise: {
    id: 'wise',
    name: 'Wise',
    description: 'Thoughtful and philosophical guide',
    avatar: '✨',
    greeting: 'Wisdom comes from within. Let\'s explore together.',
    background: 'var(--bg-gradient, linear-gradient(135deg, #f5f0e8 0%, #e8e4dc 100%))',
    accentColor: '#8b7355',
    textColor: '#3d342b',
    responseStyle: 'philosophical',
    keywords: ['why', 'meaning', 'purpose', 'learn', 'understand']
  },
  playful: {
    id: 'playful',
    name: 'Playful',
    description: 'Fun and cheerful friend',
    avatar: '✨',
    greeting: 'Hey hey! What\'s up? Ready for some fun?',
    background: 'var(--bg-gradient, linear-gradient(135deg, #fef5f9 0%, #f5f0ff 100%))',
    accentColor: '#c47eb5',
    textColor: '#4a2d4a',
    responseStyle: 'playful',
    keywords: ['fun', 'joke', 'play', 'happy', 'laugh']
  },
  supportive: {
    id: 'supportive',
    name: 'Supportive',
    description: 'Caring and empathetic listener',
    avatar: '✨',
    greeting: 'I\'m here for you. How are you feeling today?',
    background: 'var(--bg-gradient, linear-gradient(135deg, #f0f7f0 0%, #e8f0e8 100%))',
    accentColor: '#7eb57e',
    textColor: '#2d4a2d',
    responseStyle: 'empathetic',
    keywords: ['sad', 'worried', 'stress', 'help', 'support']
  }
}

// Response templates based on personality
export const RESPONSE_TEMPLATES = {
  gentle: [
    "I understand. Take your time...",
    "That sounds challenging. How can I help?",
    "Let's breathe through this together.",
    "You're doing great. Keep going."
  ],
  energetic: [
    "You got this! Let's make it happen!",
    "That's awesome! What's next?",
    "I believe in you! Go for it!",
    "Let's turn this into a win!"
  ],
  philosophical: [
    "Interesting perspective. Tell me more.",
    "What do you think this means for you?",
    "Sometimes the journey is the destination.",
    "Let's explore this deeper together."
  ],
  playful: [
    "Ooh, that sounds exciting!",
    "Hehe, I love that!",
    "You're the best! You know that?",
    "Let's make this fun!"
  ],
  empathetic: [
    "I'm here for you, always.",
    "Your feelings are valid.",
    "It's okay to feel this way.",
    "You're not alone in this."
  ]
}

// Default personality
export const DEFAULT_PERSONALITY = 'calm'
