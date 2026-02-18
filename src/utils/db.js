// Minimal IndexedDB promise wrapper for client-side storage
const DB_NAME = 'calmora-db'
const DB_VERSION = 1
const STORES = ['keyval', 'todos', 'journalEntries', 'focusSessions']

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = (e) => {
      const db = e.target.result
      STORES.forEach((s) => {
        if (!db.objectStoreNames.contains(s)) {
          if (s === 'keyval') db.createObjectStore(s, { keyPath: 'key' })
          else db.createObjectStore(s, { keyPath: 'id', autoIncrement: true })
        }
      })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror = () => reject(req.error)
  })
}

async function withStore(storeName, mode, cb) {
  const db = await openDB()
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, mode)
    const store = tx.objectStore(storeName)
    const req = cb(store)
    tx.oncomplete = () => resolve(req && req.result)
    tx.onerror = () => reject(tx.error)
  })
}

export const dbSetKey = async (key, value) => {
  return withStore('keyval', 'readwrite', (store) => store.put({ key, value }))
}

export const dbGetKey = async (key) => {
  return withStore('keyval', 'readonly', (store) => store.get(key))
    .then(r => r && r.value)
}

export const dbAdd = async (storeName, item) => {
  return withStore(storeName, 'readwrite', (store) => store.add(item))
}

export const dbGetAll = async (storeName) => {
  return withStore(storeName, 'readonly', (store) => store.getAll())
}

export const dbClear = async (storeName) => {
  return withStore(storeName, 'readwrite', (store) => store.clear())
}

export default {
  openDB,
  dbSetKey,
  dbGetKey,
  dbAdd,
  dbGetAll,
  dbClear
}
