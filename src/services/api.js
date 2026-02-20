# API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Auth API
export const authAPI = {
  register: async (username, email, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    })
    return res.json()
  },

  login: async (username, password) => {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
    return res.json()
  },

  getCurrentUser: async (token) => {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  updateProfile: async (token, data) => {
    const res = await fetch(`${API_BASE_URL}/auth/update-profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  }
}

// Data Sync API
export const dataAPI = {
  getAll: async (token) => {
    const res = await fetch(`${API_BASE_URL}/data/bulk`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  updateAll: async (token, data) => {
    const res = await fetch(`${API_BASE_URL}/data/bulk`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  get: async (token, dataType) => {
    const res = await fetch(`${API_BASE_URL}/data/${dataType}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  update: async (token, dataType, data) => {
    const res = await fetch(`${API_BASE_URL}/data/${dataType}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  },

  merge: async (token, dataType, data) => {
    const res = await fetch(`${API_BASE_URL}/data/${dataType}/merge`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return res.json()
  }
}

// Pet API
export const petAPI = {
  get: async (token) => {
    const res = await fetch(`${API_BASE_URL}/pet`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  update: async (token, petData) => {
    const res = await fetch(`${API_BASE_URL}/pet`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(petData)
    })
    return res.json()
  }
}

// Habits API
export const habitsAPI = {
  get: async (token) => {
    const res = await fetch(`${API_BASE_URL}/habits`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  update: async (token, habits) => {
    const res = await fetch(`${API_BASE_URL}/habits`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(habits)
    })
    return res.json()
  }
}

// Moods API
export const moodsAPI = {
  get: async (token) => {
    const res = await fetch(`${API_BASE_URL}/moods`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    return res.json()
  },

  add: async (token, mood) => {
    const res = await fetch(`${API_BASE_URL}/moods`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(mood)
    })
    return res.json()
  }
}

// Storage helper for token
export const storage = {
  getToken: () => localStorage.getItem('auth_token'),
  setToken: (token) => localStorage.setItem('auth_token', token),
  removeToken: () => localStorage.removeItem('auth_token'),
  getUser: () => JSON.parse(localStorage.getItem('user') || 'null'),
  setUser: (user) => localStorage.setItem('user', JSON.stringify(user)),
  removeUser: () => localStorage.removeItem('user')
}
