export const getGreeting = (stats = {}, activeTheme = 'lightCream') => {
  // stats: { todos = [], focusSessions = 0, journalEntries = [] }
  const hour = new Date().getHours()
  const todos = stats.todos || []
  const focusSessions = stats.focusSessions || 0
  const journalEntries = stats.journalEntries || []

  // Theme-based emojis
  const themeEmojis = {
    lightCream: { calm: '🍃', fire: '✨', empty: '🕊️', morning: '🌤️', afternoon: '☀️', evening: '🌅', night: '🌙' },
    lightSpace: { calm: '⭐', fire: '🌟', empty: '💫', morning: '🌌', afternoon: '☀️', evening: '🌆', night: '🌙' },
    darkSpace: { calm: '🌌', fire: '⚡', empty: '✨', morning: '🌑', afternoon: '🌞', evening: '🌆', night: '🌙' },
    sakura: { calm: '🌸', fire: '✨', empty: '🎋', morning: '🌅', afternoon: '🌺', evening: '🌆', night: '🌙' },
    ocean: { calm: '🌊', fire: '⚡', empty: '🐚', morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' },
    aurora: { calm: '🌿', fire: '✨', empty: '🦋', morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' },
    sunset: { calm: '🍂', fire: '🔥', empty: '🕊️', morning: '🌅', afternoon: '☀️', evening: '🌇', night: '🌙' },
    forest: { calm: '🌲', fire: '✨', empty: '🦌', morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' },
    lavender: { calm: '💜', fire: '✨', empty: '🦋', morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' },
    strawberry: { calm: '🍓', fire: '✨', empty: '🎀', morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' },
    moonlight: { calm: '🌙', fire: '⭐', empty: '✨', morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌑' },
    citrus: { calm: '🍋', fire: '⚡', empty: '🌼', morning: '🌅', afternoon: '☀️', evening: '🌆', night: '🌙' },
    cosmic: { calm: '🌌', fire: '⚡', empty: '✨', morning: '🌑', afternoon: '🌞', evening: '🌆', night: '🌙' }
  }

  const emojis = themeEmojis[activeTheme] || themeEmojis.lightCream

  // Priority greetings based on activity
  if (focusSessions >= 3) return { text: "You're on fire", emoji: emojis.fire, sub: 'Keep the momentum going.' }

  if (todos.length === 0 && journalEntries.length === 0 && focusSessions === 0) {
    return { text: 'Embrace the calm', emoji: emojis.calm, sub: 'Peaceful moments matter.' }
  }

  if (todos.length === 0) {
    return { text: 'Start small today', emoji: emojis.empty, sub: 'Every journey begins with one step.' }
  }

  if (hour < 12) return { text: 'Good Morning', emoji: emojis.morning, sub: 'Make today count.' }
  if (hour < 18) return { text: 'Good Afternoon', emoji: emojis.afternoon, sub: 'Keep shining bright.' }
  return { text: 'Good Evening', emoji: emojis.evening, sub: 'Rest and reflect.' }
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
