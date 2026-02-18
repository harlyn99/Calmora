// Browser Notifications Utility

export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return false
  }

  if (Notification.permission === 'granted') {
    return true
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission()
    return permission === 'granted'
  }

  return false
}

export const sendNotification = (title, options = {}) => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return null
  }

  if (Notification.permission !== 'granted') {
    console.warn('Notification permission not granted')
    return null
  }

  const defaultOptions = {
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    requireInteraction: false,
    ...options
  }

  const notification = new Notification(title, defaultOptions)

  // Auto close after 5 seconds
  setTimeout(() => notification.close(), 5000)

  return notification
}

export const sendTaskReminder = (taskName) => {
  return sendNotification('Task Reminder', {
    body: `Don't forget: ${taskName}`,
    tag: 'task-reminder'
  })
}

export const sendHabitReminder = (habitName) => {
  return sendNotification('Habit Reminder', {
    body: `Time to complete your habit: ${habitName}`,
    tag: 'habit-reminder'
  })
}

export const sendFocusSessionComplete = (duration) => {
  return sendNotification('Focus Session Complete! 🎉', {
    body: `Great job! You focused for ${duration} minutes.`,
    tag: 'focus-complete'
  })
}

export const sendDailyMotivation = () => {
  const motivations = [
    'You\'re doing great! Keep going! 💪',
    'Small progress is still progress! 🌱',
    'Believe in yourself! ✨',
    'Every step counts! 👣',
    'You\'ve got this! 🎯'
  ]
  const randomMotivation = motivations[Math.floor(Math.random() * motivations.length)]

  return sendNotification('Daily Motivation', {
    body: randomMotivation,
    tag: 'daily-motivation'
  })
}

// Schedule daily notification
export const scheduleDailyNotification = (time, callback) => {
  const now = new Date()
  const [hours, minutes] = time.split(':')
  const scheduledTime = new Date()
  scheduledTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)

  // If the time has already passed today, schedule for tomorrow
  if (scheduledTime <= now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1)
  }

  const timeout = scheduledTime.getTime() - now.getTime()

  const timerId = setTimeout(() => {
    callback()
    // Reschedule for the next day
    scheduleDailyNotification(time, callback)
  }, timeout)

  return timerId
}

export const checkAndRequestPermission = async () => {
  const granted = await requestNotificationPermission()
  
  if (granted) {
    // Send a test notification
    sendNotification('Notifications Enabled! ✅', {
      body: 'You\'ll now receive reminders and motivation from Calmora'
    })
  }

  return granted
}

export default {
  requestNotificationPermission,
  sendNotification,
  sendTaskReminder,
  sendHabitReminder,
  sendFocusSessionComplete,
  sendDailyMotivation,
  scheduleDailyNotification,
  checkAndRequestPermission
}
