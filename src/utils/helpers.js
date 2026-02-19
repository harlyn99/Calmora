export const getGreeting = (stats = {}) => {
  // stats: { todos = [], focusSessions = 0, journalEntries = [] }
  const hour = new Date().getHours()
  const todos = stats.todos || []
  const focusSessions = stats.focusSessions || 0
  const journalEntries = stats.journalEntries || []

  // Priority greetings based on activity
  if (focusSessions >= 3) return { text: "You're doing great", emoji: '🔥', sub: 'Keep the momentum.' }

  if (todos.length === 0 && journalEntries.length === 0 && focusSessions === 0) {
    return { text: 'A calm day is also productive', emoji: '🌊', sub: 'Take it slow and steady.' }
  }

  if (todos.length === 0) {
    return { text: "Let's start small today", emoji: '🌱', sub: 'Small steps lead to progress.' }
  }

  if (hour < 12) return { text: 'Good Morning', emoji: '🌅' }
  if (hour < 18) return { text: 'Good Afternoon', emoji: '☀️' }
  return { text: 'Good Evening', emoji: '🌙' }
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatMonthYear = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  })
}
