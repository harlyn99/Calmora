import os
import sys
from datetime import datetime, timedelta
from flask import Flask, request, jsonify, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__, static_folder='../dist', static_url_path='')

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///calmora.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY', 'calmora-secret-key-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)

# Initialize
db = SQLAlchemy(app)
CORS(app)
jwt = JWTManager(app)

# ============== MODELS ==============

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # User data (stored as JSON for flexibility)
    profile_data = db.Column(db.JSON, default=dict)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)
    
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'created_at': self.created_at.isoformat(),
            'profile_data': self.profile_data
        }

class UserData(db.Model):
    __tablename__ = 'user_data'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    data_type = db.Column(db.String(50), nullable=False)  # pet, habits, moods, journal, etc.
    data = db.Column(db.JSON, default=dict)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    user = db.relationship('User', backref=db.backref('data', lazy=True))
    
    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'data_type': self.data_type,
            'data': self.data,
            'updated_at': self.updated_at.isoformat()
        }

# ============== AUTH ROUTES ==============

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    
    username = data.get('username', '').strip()
    email = data.get('email', '').strip()
    password = data.get('password', '')
    
    # Validation
    if not username or not email or not password:
        return jsonify({'error': 'Username, email, and password are required'}), 400
    
    if len(password) < 6:
        return jsonify({'error': 'Password must be at least 6 characters'}), 400
    
    # Check if user exists
    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already exists'}), 409
    
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already exists'}), 409
    
    # Create user
    user = User(username=username, email=email)
    user.set_password(password)
    
    db.session.add(user)
    db.session.commit()
    
    # Create initial data entries
    initial_data = [
        UserData(user_id=user.id, data_type='pet', data={}),
        UserData(user_id=user.id, data_type='habits', data={'habits': []}),
        UserData(user_id=user.id, data_type='moods', data={'moods': []}),
        UserData(user_id=user.id, data_type='journal', data={'entries': []}),
        UserData(user_id=user.id, data_type='settings', data={'theme': 'light', 'notifications': True})
    ]
    db.session.add_all(initial_data)
    db.session.commit()
    
    # Generate token
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'User registered successfully',
        'user': user.to_dict(),
        'access_token': access_token
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    
    username = data.get('username', '').strip()
    password = data.get('password', '')
    
    if not username or not password:
        return jsonify({'error': 'Username and password are required'}), 400
    
    user = User.query.filter_by(username=username).first()
    
    if not user or not user.check_password(password):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    access_token = create_access_token(identity=user.id)
    
    return jsonify({
        'message': 'Login successful',
        'user': user.to_dict(),
        'access_token': access_token
    }), 200

@app.route('/api/auth/me', methods=['GET'])
@jwt_required()
def get_current_user():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    return jsonify({'user': user.to_dict()}), 200

@app.route('/api/auth/update-profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    
    if not user:
        return jsonify({'error': 'User not found'}), 404
    
    data = request.get_json()
    
    if 'username' in data:
        user.username = data['username'].strip()
    if 'email' in data:
        user.email = data['email'].strip()
    if 'profile_data' in data:
        user.profile_data = data['profile_data']
    
    db.session.commit()
    
    return jsonify({'user': user.to_dict()}), 200

# ============== DATA SYNC ROUTES ==============

@app.route('/api/data/<data_type>', methods=['GET'])
@jwt_required()
def get_data(data_type):
    user_id = get_jwt_identity()
    
    data = UserData.query.filter_by(user_id=user_id, data_type=data_type).first()
    
    if not data:
        return jsonify({'error': 'Data type not found'}), 404
    
    return jsonify({'data': data.data}), 200

@app.route('/api/data/<data_type>', methods=['PUT'])
@jwt_required()
def update_data(data_type):
    user_id = get_jwt_identity()
    incoming_data = request.get_json()
    
    data = UserData.query.filter_by(user_id=user_id, data_type=data_type).first()
    
    if not data:
        # Create new data entry
        data = UserData(user_id=user_id, data_type=data_type, data=incoming_data)
        db.session.add(data)
    else:
        # Update existing data
        data.data = incoming_data
    
    db.session.commit()
    
    return jsonify({'data': data.data, 'updated_at': data.updated_at.isoformat()}), 200

@app.route('/api/data/<data_type>/merge', methods=['POST'])
@jwt_required()
def merge_data(data_type):
    """Merge client data with server data (for sync conflicts)"""
    user_id = get_jwt_identity()
    incoming_data = request.get_json()
    
    data = UserData.query.filter_by(user_id=user_id, data_type=data_type).first()
    
    if not data:
        data = UserData(user_id=user_id, data_type=data_type, data=incoming_data)
        db.session.add(data)
    else:
        # Simple merge: incoming data takes precedence
        # Can be customized per data type
        existing = data.data
        merged = {**existing, **incoming_data}
        data.data = merged
    
    db.session.commit()
    
    return jsonify({'data': data.data}), 200

@app.route('/api/data/bulk', methods=['GET'])
@jwt_required()
def get_all_data():
    user_id = get_jwt_identity()
    
    all_data = UserData.query.filter_by(user_id=user_id).all()
    
    result = {}
    for item in all_data:
        result[item.data_type] = item.data
    
    return jsonify({'data': result}), 200

@app.route('/api/data/bulk', methods=['PUT'])
@jwt_required()
def update_all_data():
    user_id = get_jwt_identity()
    incoming_data = request.get_json()
    
    for data_type, data in incoming_data.items():
        existing = UserData.query.filter_by(user_id=user_id, data_type=data_type).first()
        
        if existing:
            existing.data = data
        else:
            new_data = UserData(user_id=user_id, data_type=data_type, data=data)
            db.session.add(new_data)
    
    db.session.commit()
    
    return jsonify({'message': 'All data updated successfully'}), 200

# ============== SPECIFIC DATA ROUTES ==============

# Virtual Pet
@app.route('/api/pet', methods=['GET'])
@jwt_required()
def get_pet():
    user_id = get_jwt_identity()
    data = UserData.query.filter_by(user_id=user_id, data_type='pet').first()
    return jsonify({'pet': data.data if data else {}}), 200

@app.route('/api/pet', methods=['PUT'])
@jwt_required()
def update_pet():
    user_id = get_jwt_identity()
    pet_data = request.get_json()
    
    data = UserData.query.filter_by(user_id=user_id, data_type='pet').first()
    
    if data:
        data.data = pet_data
    else:
        data = UserData(user_id=user_id, data_type='pet', data=pet_data)
        db.session.add(data)
    
    db.session.commit()
    
    return jsonify({'pet': data.data}), 200

# Habits
@app.route('/api/habits', methods=['GET'])
@jwt_required()
def get_habits():
    user_id = get_jwt_identity()
    data = UserData.query.filter_by(user_id=user_id, data_type='habits').first()
    return jsonify({'habits': data.data.get('habits', []) if data else []}), 200

@app.route('/api/habits', methods=['PUT'])
@jwt_required()
def update_habits():
    user_id = get_jwt_identity()
    habits_data = request.get_json()
    
    data = UserData.query.filter_by(user_id=user_id, data_type='habits').first()
    
    if data:
        data.data = {'habits': habits_data}
    else:
        data = UserData(user_id=user_id, data_type='habits', data={'habits': habits_data})
        db.session.add(data)
    
    db.session.commit()
    
    return jsonify({'habits': data.data['habits']}), 200

# Moods
@app.route('/api/moods', methods=['GET'])
@jwt_required()
def get_moods():
    user_id = get_jwt_identity()
    data = UserData.query.filter_by(user_id=user_id, data_type='moods').first()
    return jsonify({'moods': data.data.get('moods', []) if data else []}), 200

@app.route('/api/moods', methods=['POST'])
@jwt_required()
def add_mood():
    user_id = get_jwt_identity()
    new_mood = request.get_json()
    
    data = UserData.query.filter_by(user_id=user_id, data_type='moods').first()
    
    if data:
        moods = data.data.get('moods', [])
        moods.insert(0, new_mood)
        data.data['moods'] = moods
    else:
        data = UserData(user_id=user_id, data_type='moods', data={'moods': [new_mood]})
        db.session.add(data)
    
    db.session.commit()
    
    return jsonify({'mood': new_mood, 'moods': data.data['moods']}), 201

# ============== STATIC FILES ==============

@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    if os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    return send_from_directory(app.static_folder, 'index.html')

# ============== ERROR HANDLERS ==============

@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

# ============== DATABASE INIT ==============

def init_db():
    with app.app_context():
        db.create_all()
        print("Database initialized successfully!")

if __name__ == '__main__':
    init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
