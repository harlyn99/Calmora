import db from '../utils/db'

// Keys we migrate from localStorage if present
const MIGRATE_KEYS = ['energyMode', 'lastSync', 'totalFocusMinutes', 'timerSessions', 'focusTime']

export const initDB = async () => {
  try {
    // Ensure DB is open
    await db.openDB()

    // Migrate arrays
    try {
      const todos = JSON.parse(localStorage.getItem('todos') || '[]')
      if (Array.isArray(todos) && todos.length) {
        const existing = await db.dbGetAll('todos')
        if (!existing || existing.length === 0) {
          for (const t of todos) await db.dbAdd('todos', t)
        }
      }
    } catch (e) {}

    try {
      const journals = JSON.parse(localStorage.getItem('journalEntries') || '[]')
      if (Array.isArray(journals) && journals.length) {
        const existing = await db.dbGetAll('journalEntries')
        if (!existing || existing.length === 0) {
          for (const j of journals) await db.dbAdd('journalEntries', j)
        }
      }
    } catch (e) {}

    try {
      const sessions = JSON.parse(localStorage.getItem('focusSessions') || '[]')
      if (Array.isArray(sessions) && sessions.length) {
        const existing = await db.dbGetAll('focusSessions')
        if (!existing || existing.length === 0) {
          for (const s of sessions) await db.dbAdd('focusSessions', s)
        }
      }
    } catch (e) {}

    // Migrate scalar keys into keyval store
    for (const k of MIGRATE_KEYS) {
      const v = localStorage.getItem(k)
      if (v !== null) {
        try {
          await db.dbSetKey(k, JSON.parse(v))
        } catch (e) {
          await db.dbSetKey(k, v)
        }
      }
    }

    return { ok: true }
  } catch (e) {
    return { ok: false, error: e }
  }
}

export default { initDB }
