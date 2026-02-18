# Calmora - Feature Summary

## 🎉 New Features Added

### 1. **Habit Tracker** (`/habits`)
- Track daily habits with a weekly view
- Streak counter to measure consistency
- Visual flame icon for streaks
- Statistics: Best streak, active habits, total completions
- Click on days to mark habits complete

### 2. **Mood Tracker** (`/mood`)
- Log your mood with 5 levels (Great, Good, Okay, Bad, Terrible)
- Weekly mood chart visualization
- Mood distribution statistics
- Average mood and weekly trend calculation
- Add optional notes to mood entries
- Recent entries history

### 3. **Quick Notes** (`/notes`)
- Sticky notes with 6 color options
- Create, edit, and delete notes
- Color-coded organization
- Grid layout for visual appeal
- Local storage persistence

### 4. **Goals** (`/goals`)
- Set long-term goals with targets
- Track progress with visual progress bars
- Increment/decrement progress counters
- Deadline tracking with days remaining
- Statistics: Total goals, completed, average progress
- Mark goals as complete

### 5. **Review Page** (`/review`)
- Weekly/Monthly/Yearly review periods
- Comprehensive stats dashboard
- Tasks completed summary
- Journal entries recap
- Focus time statistics
- Goals progress overview
- Habits summary
- Recent journal entries preview

### 6. **Focus Statistics** (`/stats`)
- Pomodoro session analytics
- Today's focus time
- Weekly focus chart
- Total focus sessions
- Average session length
- Most productive day badge
- Recent sessions history

### 7. **Inspirational Quotes** (Dashboard)
- Random motivational quotes on dashboard
- 30+ curated quotes
- Copy to clipboard functionality
- Refresh for new quote
- Beautiful gradient card design

### 8. **Journal Tags** (`/journal`)
- Add tags/categories to journal entries
- Filter entries by tags
- Visual tag badges
- Add tags when creating entries
- Add/remove tags from existing entries
- Tag cloud filter

### 9. **Keyboard Shortcuts**
- `G + D` - Go to Dashboard
- `G + T` - Go to To-Do
- `G + J` - Go to Journal
- `G + P` - Go to Planner
- `G + H` - Go to Habits
- `G + M` - Go to Mood
- `G + G` - Go to Goals
- `G + S` - Go to Stats
- `N` - New task/note (context-aware)
- `H` - Go to Habits
- `T` - Go to Timer
- View all shortcuts in Settings

### 10. **Browser Notifications**
- Request notification permission
- Task reminders
- Habit completion reminders
- Focus session complete notifications
- Daily motivation messages
- Enable/disable in Settings

### 11. **Data Export/Import** (Existing - Enhanced)
- Export all data to JSON
- Import backup files
- Accessible from navigation menu
- Includes: todos, journals, sessions, energy mode, sync data

### 12. **Enhanced Navigation**
- Updated top navigation with all new pages
- Quick access to: Habits, Mood, Goals, Notes, Review, Stats
- Dropdown menu with all features
- Energy mode selector
- Sync status and controls

## 📁 New Files Created

### Pages
- `/src/pages/HabitTrackerPage.jsx` + `.css`
- `/src/pages/MoodTrackerPage.jsx` + `.css`
- `/src/pages/QuickNotesPage.jsx` + `.css`
- `/src/pages/GoalsPage.jsx` + `.css`
- `/src/pages/ReviewPage.jsx` + `.css`
- `/src/pages/PomodoroStatsPage.jsx` + `.css`

### Components
- `/src/components/InspirationalQuotes.jsx` + `.css`
- `/src/components/KeyboardShortcutsModal.jsx` + `.css`

### Utilities
- `/src/utils/useKeyboardShortcuts.js`
- `/src/utils/notifications.js`

### Updated Files
- `/src/App.jsx` - Added new routes
- `/src/pages/Dashboard.jsx` - Added quotes component
- `/src/pages/JournalPage.jsx` + `.css` - Added tags feature
- `/src/pages/SettingsPage.jsx` + `.css` - Added notifications & shortcuts
- `/src/components/TopNavigation.jsx` - Updated navigation links

## 🎨 Design Features

- Consistent neomorphic design language
- Responsive layouts for mobile
- Dark/Light theme support
- Smooth animations and transitions
- Color-coded elements for visual organization
- Icon-rich interface with Lucide React

## 💾 Data Storage

All data is stored locally in browser localStorage:
- `habits` - Habit tracker data
- `moods` - Mood entries
- `quickNotes` - Sticky notes
- `goals` - Goal tracking
- `focusSessions` - Pomodoro sessions (existing)
- `journalEntries` - Journal with tags (enhanced)
- `todos` - Tasks (existing)

## 🚀 How to Use

1. **Start the app**: `npm run dev`
2. **Access new features** from the navigation bar or keyboard shortcuts
3. **Enable notifications** in Settings for reminders
4. **View keyboard shortcuts** in Settings or press `?`
5. **Export your data** regularly from the menu

## 🎯 Quick Access URLs

- Dashboard: `/dashboard`
- Habits: `/habits`
- Mood: `/mood`
- Goals: `/goals`
- Notes: `/notes`
- Review: `/review`
- Stats: `/stats`

---

**Calmora** - Your complete productivity and wellness companion! ✨
