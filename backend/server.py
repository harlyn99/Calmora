#!/usr/bin/env python3
"""
Calmora Backend - Simple Flask-like server using only Python standard library
Features: User authentication, SQLite database, JWT-like tokens, Data sync
"""

import http.server
import socketserver
import json
import sqlite3
import hashlib
import secrets
import datetime
import urllib.parse
import os
from http import HTTPStatus

# Configuration
PORT = 5000
DB_PATH = 'calmora.db'
SECRET_KEY = 'calmora-secret-key-change-in-production'

# Simple token generation (not real JWT, but works for demo)
def generate_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': (datetime.datetime.utcnow() + datetime.timedelta(days=7)).timestamp()
    }
    data = json.dumps(payload)
    signature = hashlib.sha256((data + SECRET_KEY).encode()).hexdigest()
    return f"{data}.{signature}"

def verify_token(token):
    try:
        parts = token.split('.')
        if len(parts) != 2:
            return None
        data, signature = parts
        payload = json.loads(data)
        
        expected_sig = hashlib.sha256((data + SECRET_KEY).encode()).hexdigest()
        if signature != expected_sig:
            return None
        if payload.get('exp', 0) < datetime.datetime.utcnow().timestamp():
            return None
        return payload.get('user_id')
    except:
        return None

# Database setup
def init_db():
    conn = sqlite3.connect(DB_PATH)
    c = conn.cursor()
    
    # Users table
    c.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            profile_data TEXT DEFAULT '{}'
        )
    ''')
    
    # User data table
    c.execute('''
        CREATE TABLE IF NOT EXISTS user_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            data_type TEXT NOT NULL,
            data TEXT DEFAULT '{}',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users (id),
            UNIQUE (user_id, data_type)
        )
    ''')
    
    conn.commit()
    conn.close()
    print("✅ Database initialized")

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# Password hashing
def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def check_password(password, hash):
    return hash_password(password) == hash

class CalmoraHandler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        # API routes
        if path.startswith('/api/'):
            self.handle_api_get(path)
        else:
            # Serve static files
            self.serve_static(path)

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        if path.startswith('/api/'):
            self.handle_api_post(path)
        else:
            self.send_error(404)

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        if path.startswith('/api/'):
            self.handle_api_put(path)
        else:
            self.send_error(404)

    def handle_api_get(self, path):
        token = self.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = verify_token(token) if token else None
        
        try:
            conn = get_db()
            c = conn.cursor()
            
            # Public routes
            if path == '/api/health':
                self.send_json({'status': 'ok', 'message': 'Calmora API is running'})
                return
            
            # Protected routes
            if not user_id:
                self.send_error_json(401, 'Unauthorized')
                return
            
            if path == '/api/auth/me':
                c.execute('SELECT id, username, email, created_at, profile_data FROM users WHERE id = ?', (user_id,))
                user = c.fetchone()
                if user:
                    self.send_json({'user': dict(user)})
                else:
                    self.send_error_json(404, 'User not found')
            
            elif path == '/api/data/bulk':
                c.execute('SELECT data_type, data FROM user_data WHERE user_id = ?', (user_id,))
                rows = c.fetchall()
                data = {row['data_type']: json.loads(row['data']) for row in rows}
                self.send_json({'data': data})
            
            elif path == '/api/pet':
                c.execute('SELECT data FROM user_data WHERE user_id = ? AND data_type = ?', (user_id, 'pet'))
                row = c.fetchone()
                self.send_json({'pet': json.loads(row['data']) if row else {}})
            
            elif path == '/api/habits':
                c.execute('SELECT data FROM user_data WHERE user_id = ? AND data_type = ?', (user_id, 'habits'))
                row = c.fetchone()
                data = json.loads(row['data']) if row else {}
                self.send_json({'habits': data.get('habits', [])})
            
            elif path == '/api/moods':
                c.execute('SELECT data FROM user_data WHERE user_id = ? AND data_type = ?', (user_id, 'moods'))
                row = c.fetchone()
                data = json.loads(row['data']) if row else {}
                self.send_json({'moods': data.get('moods', [])})
            
            else:
                self.send_error_json(404, 'Endpoint not found')
            
            conn.close()
        except Exception as e:
            self.send_error_json(500, str(e))

    def handle_api_post(self, path):
        token = self.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = verify_token(token) if token else None
        
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode()
        try:
            data = json.loads(body) if body else {}
        except:
            self.send_error_json(400, 'Invalid JSON')
            return
        
        try:
            conn = get_db()
            c = conn.cursor()
            
            if path == '/api/auth/register':
                # Check if user exists
                c.execute('SELECT id FROM users WHERE username = ? OR email = ?', 
                         (data.get('username'), data.get('email')))
                if c.fetchone():
                    self.send_error_json(409, 'Username or email already exists')
                    conn.close()
                    return
                
                # Create user
                password_hash = hash_password(data.get('password', ''))
                c.execute('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
                         (data.get('username'), data.get('email'), password_hash))
                user_id = c.lastrowid
                
                # Create initial data entries
                for data_type in ['pet', 'habits', 'moods', 'journal', 'settings']:
                    initial_data = '{}' if data_type != 'habits' else '{"habits": []}'
                    if data_type == 'moods':
                        initial_data = '{"moods": []}'
                    if data_type == 'journal':
                        initial_data = '{"entries": []}'
                    if data_type == 'settings':
                        initial_data = '{"theme": "light", "notifications": true}'
                    c.execute('INSERT INTO user_data (user_id, data_type, data) VALUES (?, ?, ?)',
                             (user_id, data_type, initial_data))
                
                conn.commit()
                
                # Generate token
                access_token = generate_token(user_id)
                
                c.execute('SELECT id, username, email, created_at, profile_data FROM users WHERE id = ?', (user_id,))
                user = dict(c.fetchone())
                
                self.send_json({
                    'message': 'User registered successfully',
                    'user': user,
                    'access_token': access_token
                }, status=201)
            
            elif path == '/api/auth/login':
                c.execute('SELECT id, password_hash FROM users WHERE username = ?', (data.get('username'),))
                user = c.fetchone()
                
                if not user or not check_password(data.get('password', ''), user['password_hash']):
                    self.send_error_json(401, 'Invalid username or password')
                    conn.close()
                    return
                
                access_token = generate_token(user['id'])
                
                c.execute('SELECT id, username, email, created_at, profile_data FROM users WHERE id = ?', (user['id'],))
                user_data = dict(c.fetchone())
                
                self.send_json({
                    'message': 'Login successful',
                    'user': user_data,
                    'access_token': access_token
                })
            
            elif path == '/api/moods' and user_id:
                # Add new mood
                c.execute('SELECT data FROM user_data WHERE user_id = ? AND data_type = ?', (user_id, 'moods'))
                row = c.fetchone()
                
                moods_data = json.loads(row['data']) if row else {'moods': []}
                moods = moods_data.get('moods', [])
                moods.insert(0, data)
                moods_data['moods'] = moods
                
                c.execute('UPDATE user_data SET data = ? WHERE user_id = ? AND data_type = ?',
                         (json.dumps(moods_data), user_id, 'moods'))
                conn.commit()
                
                self.send_json({'mood': data, 'moods': moods}, status=201)
            
            else:
                self.send_error_json(404, 'Endpoint not found')
            
            conn.close()
        except Exception as e:
            self.send_error_json(500, str(e))

    def handle_api_put(self, path):
        token = self.headers.get('Authorization', '').replace('Bearer ', '')
        user_id = verify_token(token) if token else None
        
        if not user_id:
            self.send_error_json(401, 'Unauthorized')
            return
        
        content_length = int(self.headers.get('Content-Length', 0))
        body = self.rfile.read(content_length).decode()
        try:
            data = json.loads(body) if body else {}
        except:
            self.send_error_json(400, 'Invalid JSON')
            return
        
        try:
            conn = get_db()
            c = conn.cursor()
            
            if path == '/api/auth/update-profile':
                updates = []
                values = []
                if 'username' in data:
                    updates.append('username = ?')
                    values.append(data['username'])
                if 'email' in data:
                    updates.append('email = ?')
                    values.append(data['email'])
                if 'profile_data' in data:
                    updates.append('profile_data = ?')
                    values.append(json.dumps(data['profile_data']))
                
                if updates:
                    values.append(user_id)
                    c.execute(f"UPDATE users SET {', '.join(updates)} WHERE id = ?", values)
                    conn.commit()
                
                c.execute('SELECT id, username, email, created_at, profile_data FROM users WHERE id = ?', (user_id,))
                self.send_json({'user': dict(c.fetchone())})
            
            elif path == '/api/data/bulk':
                for data_type, type_data in data.items():
                    c.execute('SELECT id FROM user_data WHERE user_id = ? AND data_type = ?', (user_id, data_type))
                    row = c.fetchone()
                    if row:
                        c.execute('UPDATE user_data SET data = ? WHERE user_id = ? AND data_type = ?',
                                 (json.dumps(type_data), user_id, data_type))
                    else:
                        c.execute('INSERT INTO user_data (user_id, data_type, data) VALUES (?, ?, ?)',
                                 (user_id, data_type, json.dumps(type_data)))
                conn.commit()
                self.send_json({'message': 'All data updated successfully'})
            
            elif path == '/api/pet':
                c.execute('SELECT id FROM user_data WHERE user_id = ? AND data_type = ?', (user_id, 'pet'))
                row = c.fetchone()
                if row:
                    c.execute('UPDATE user_data SET data = ? WHERE user_id = ? AND data_type = ?',
                             (json.dumps(data), user_id, 'pet'))
                else:
                    c.execute('INSERT INTO user_data (user_id, data_type, data) VALUES (?, ?, ?)',
                             (user_id, 'pet', json.dumps(data)))
                conn.commit()
                self.send_json({'pet': data})
            
            elif path == '/api/habits':
                habits_data = {'habits': data}
                c.execute('SELECT id FROM user_data WHERE user_id = ? AND data_type = ?', (user_id, 'habits'))
                row = c.fetchone()
                if row:
                    c.execute('UPDATE user_data SET data = ? WHERE user_id = ? AND data_type = ?',
                             (json.dumps(habits_data), user_id, 'habits'))
                else:
                    c.execute('INSERT INTO user_data (user_id, data_type, data) VALUES (?, ?, ?)',
                             (user_id, 'habits', json.dumps(habits_data)))
                conn.commit()
                self.send_json({'habits': data})
            
            else:
                self.send_error_json(404, 'Endpoint not found')
            
            conn.close()
        except Exception as e:
            self.send_error_json(500, str(e))

    def serve_static(self, path):
        if path == '/':
            path = '/index.html'
        
        # Remove leading slash
        path = path[1:]
        
        # Check if file exists in dist
        full_path = os.path.join('dist', path)
        if os.path.exists(full_path) and os.path.isfile(full_path):
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            
            # Set content type
            if path.endswith('.html'):
                self.send_header('Content-Type', 'text/html')
            elif path.endswith('.js'):
                self.send_header('Content-Type', 'application/javascript')
            elif path.endswith('.css'):
                self.send_header('Content-Type', 'text/css')
            elif path.endswith('.json'):
                self.send_header('Content-Type', 'application/json')
            else:
                self.send_header('Content-Type', 'application/octet-stream')
            
            self.end_headers()
            with open(full_path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            # SPA fallback - serve index.html
            self.serve_index()

    def serve_index(self):
        index_path = os.path.join('dist', 'index.html')
        if os.path.exists(index_path):
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Content-Type', 'text/html')
            self.end_headers()
            with open(index_path, 'rb') as f:
                self.wfile.write(f.read())
        else:
            self.send_error_json(404, 'Frontend not found. Please build first.')

    def send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def send_error_json(self, code, message):
        self.send_response(code)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps({'error': message}).encode())

    def log_message(self, format, *args):
        print(f"[{datetime.datetime.now().strftime('%H:%M:%S')}] {args[0]}")

if __name__ == '__main__':
    init_db()
    
    with socketserver.TCPServer(("", PORT), CalmoraHandler) as httpd:
        print(f"\n🚀 Calmora Backend Server")
        print(f"📡 API: http://localhost:{PORT}/api")
        print(f"🌐 Frontend: http://localhost:{PORT}")
        print(f"💾 Database: {DB_PATH}")
        print(f"\nPress Ctrl+C to stop\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n👋 Server stopped")
