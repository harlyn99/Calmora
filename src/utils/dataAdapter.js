import db from './db'
import storage from './storage'

const safeArray = (v) => Array.isArray(v) ? v : []

export const getTodos = async () => {
  try {
    const dbTodos = await db.dbGetAll('todos')
    if (dbTodos && dbTodos.length) return dbTodos
  } catch (e) {}
  return safeArray(storage.get('todos', []))
}

export const getJournalEntries = async () => {
  try {
    const dbJ = await db.dbGetAll('journalEntries')
    if (dbJ && dbJ.length) return dbJ
  } catch (e) {}
  return safeArray(storage.get('journalEntries', []))
}

export const getFocusSessions = async () => {
  try {
    const dbS = await db.dbGetAll('focusSessions')
    if (dbS && dbS.length) return dbS
  } catch (e) {}
  return safeArray(storage.get('focusSessions', []))
}

export const exportAll = async () => {
  const todos = await getTodos()
  const journals = await getJournalEntries()
  const sessions = await getFocusSessions()
  const lastSync = storage.get('lastSync', null)
  const energyMode = storage.get('energyMode', 'balance')
  return { todos, journals, sessions, lastSync, energyMode }
}

export default { getTodos, getJournalEntries, getFocusSessions, exportAll }
