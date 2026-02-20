#!/bin/bash

# Calmora - Start Backend and Frontend

echo "🚀 Starting Calmora..."

# Check if Python 3 is available
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip3 install -r backend/requirements.txt

# Start backend server
echo "🔧 Starting backend server on port 5000..."
python3 backend/app.py &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Check if backend is running
if ! ps -p $BACKEND_PID > /dev/null; then
    echo "❌ Backend failed to start"
    exit 1
fi

echo "✅ Backend started (PID: $BACKEND_PID)"
echo ""
echo "🌐 Backend API: http://localhost:5000"
echo "📱 Frontend: Run 'npm run dev' in another terminal"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for interrupt
trap "kill $BACKEND_PID 2>/dev/null; exit" INT TERM EXIT

# Keep script running
wait
