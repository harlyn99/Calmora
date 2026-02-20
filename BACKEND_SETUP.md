# 🐾 Calmora - Backend & Database Setup

## Overview
Calmora sekarang dilengkapi dengan **backend Python3 + SQLite** untuk user management dan data persistence.

---

## 🚀 Quick Start

### 1. Start Backend Server
```bash
cd /workspaces/Calmora
python3 backend/server.py
```

Server akan berjalan di: **http://localhost:5000**

### 2. Akses Aplikasi
- **Frontend**: http://localhost:5000
- **API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

---

## 📁 File Structure

```
Calmora/
├── backend/
│   ├── server.py          # Main backend server (Python stdlib only)
│   ├── app.py             # Flask version (requires pip)
│   └── requirements.txt   # Python dependencies
├── src/
│   ├── services/
│   │   └── api.js         # API client untuk frontend
│   ├── contexts/
│   │   └── AuthContext.jsx # Authentication context
│   └── pages/
│       └── LoginPage.jsx   # Login/Register page
├── dist/                   # Built frontend
└── calmora.db             # SQLite database (auto-created)
```

---

## 🔐 Authentication

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "yourname",
    "email": "you@example.com",
    "password": "yourpassword"
  }'
```

**Response:**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "username": "yourname",
    "email": "you@example.com",
    "created_at": "2026-02-20T00:00:00"
  },
  "access_token": "eyJ1c2VyX2lkIjogMSwgImV4cCI6IC4uLn0=..."
}
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "yourname",
    "password": "yourpassword"
  }'
```

### Get Current User
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📊 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |
| PUT | `/api/auth/update-profile` | Update profile |

### Data Sync
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data/bulk` | Get all user data |
| PUT | `/api/data/bulk` | Update all data |
| GET | `/api/data/<type>` | Get specific data |
| PUT | `/api/data/<type>` | Update specific data |

### Virtual Pet
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/pet` | Get pet data |
| PUT | `/api/pet` | Update pet data |

### Habits
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/habits` | Get habits |
| PUT | `/api/habits` | Update habits |

### Moods
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/moods` | Get moods |
| POST | `/api/moods` | Add new mood |

---

## 💾 Database Schema

### Users Table
```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    profile_data TEXT DEFAULT '{}'
)
```

### User Data Table
```sql
CREATE TABLE user_data (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    data_type TEXT NOT NULL,          -- 'pet', 'habits', 'moods', etc.
    data TEXT DEFAULT '{}',           -- JSON data
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    UNIQUE (user_id, data_type)
)
```

---

## 🔧 Frontend Integration

### API Client (src/services/api.js)

```javascript
import { authAPI, storage } from '../services/api'

// Register
const result = await authAPI.register('username', 'email', 'password')
if (result.access_token) {
  storage.setToken(result.access_token)
  storage.setUser(result.user)
}

// Login
const result = await authAPI.login('username', 'password')
if (result.access_token) {
  storage.setToken(result.access_token)
  storage.setUser(result.user)
}

// Get pet data with token
const petData = await petAPI.get(token)
```

### Auth Context (src/contexts/AuthContext.jsx)

```javascript
import { useAuth } from '../contexts/AuthContext'

function MyComponent() {
  const { user, token, login, register, logout, isAuthenticated } = useAuth()
  
  const handleLogin = async () => {
    const result = await login('username', 'password')
    if (result.success) {
      // Navigate to dashboard
    }
  }
  
  return <div>...</div>
}
```

---

## 🛡️ Security Features

### Password Hashing
- SHA-256 hashing (upgrade to bcrypt for production)
- Never store plain text passwords

### Token Authentication
- Custom JWT-like tokens with expiration (7 days)
- Signature verification for all protected routes
- Auto-expire tokens

### CORS
- Enabled for all origins (configure for production)
- Proper preflight handling

---

## 📝 Data Flow

### 1. User Registration
```
Frontend → POST /api/auth/register → Backend
  ↓
Create user in DB
  ↓
Create initial data entries (pet, habits, moods)
  ↓
Generate token
  ↓
Return user + token
  ↓
Frontend saves to localStorage
```

### 2. Data Sync
```
Frontend → PUT /api/data/pet → Backend
  ↓
Verify token
  ↓
Upsert user_data
  ↓
Return updated data
  ↓
Frontend updates UI
```

### 3. Auto-Save Pattern
```javascript
// In VirtualPetPage.jsx
useEffect(() => {
  if (token) {
    petAPI.update(token, pet)
  } else {
    localStorage.setItem('virtualPet', JSON.stringify(pet))
  }
}, [pet])
```

---

## 🚀 Running in Production

### 1. Build Frontend
```bash
npm run build
```

### 2. Set Environment Variables
```bash
export CALMORA_SECRET_KEY="your-secure-random-key"
export CALMORA_PORT=5000
```

### 3. Run Server
```bash
python3 backend/server.py
```

### 4. Use HTTPS (Recommended)
Setup reverse proxy with Nginx:
```nginx
server {
    listen 443 ssl;
    server_name calmora.example.com;
    
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

---

## 🧪 Testing

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"test","password":"test123"}'
```

### Test Protected Route
```bash
TOKEN="your_token_here"
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Test Pet Data Save
```bash
curl -X PUT http://localhost:5000/api/pet \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Mochi","type":"bear","level":5}'
```

---

## 📦 Dependencies

### Backend (Python Standard Library Only)
- `http.server` - HTTP server
- `sqlite3` - Database
- `hashlib` - Password hashing
- `secrets` - Token generation
- `json` - Data serialization
- `datetime` - Timestamps
- `urllib.parse` - URL parsing

### Optional (Flask Version)
```bash
pip install -r backend/requirements.txt
```

### Frontend
- React 18
- react-router-dom
- lucide-react

---

## 🐛 Troubleshooting

### Server won't start
```bash
# Check if port is in use
lsof -i :5000

# Kill process if needed
kill -9 <PID>
```

### Database errors
```bash
# Delete and recreate database
rm calmora.db
python3 backend/server.py
```

### CORS errors
- Ensure backend sends `Access-Control-Allow-Origin: *`
- Check browser console for specific error

### Token invalid
- Token expires after 7 days
- Re-login to get new token
- Check token format in request header

---

## 📖 Additional Resources

- [API Documentation](#api-endpoints)
- [Database Schema](#database-schema)
- [Frontend Integration](#frontend-integration)
- [Virtual Pet Features](VIRTUAL_PET_FEATURES.md)

---

**Happy Coding! 🐾✨**
