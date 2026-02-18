const safeParse = (v, fallback) => {
  try {
    return JSON.parse(v)
  } catch (e) {
    return fallback
  }
}

export const storageGet = (key, fallback = null) => {
  try {
    const v = localStorage.getItem(key)
    if (v === null) return fallback
    return safeParse(v, fallback)
  } catch (e) {
    return fallback
  }
}

export const storageSet = (key, value) => {
  try {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value))
    return true
  } catch (e) {
    return false
  }
}

export const storagePush = (key, item) => {
  try {
    const arr = safeParse(localStorage.getItem(key), []) || []
    arr.push(item)
    localStorage.setItem(key, JSON.stringify(arr))
    return arr
  } catch (e) {
    return null
  }
}

export default {
  get: storageGet,
  set: storageSet,
  push: storagePush
}
