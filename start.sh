#!/bin/bash
# Auto-start script for Calmora

echo "🚀 Starting Calmora Development Server..."

# Kill any existing processes
pkill -f vite 2>/dev/null
pkill -f "lt --port" 2>/dev/null
sleep 2

# Start Vite
echo "⚡ Starting Vite..."
npm run dev > /tmp/vite.log 2>&1 &
VITE_PID=$!
echo "Vite PID: $VITE_PID"

# Wait for Vite to start
sleep 5

# Check if Vite is running
if curl -s http://localhost:5173 > /dev/null; then
    echo "✅ Vite running on http://localhost:5173"
else
    echo "❌ Vite failed to start!"
    exit 1
fi

# Start localtunnel
echo "🌐 Starting localtunnel..."
lt --port 5173 > /tmp/lt.log 2>&1 &
LT_PID=$!
echo "Localtunnel PID: $LT_PID"

# Wait for tunnel
sleep 8

# Show tunnel URL
echo ""
echo "=========================================="
echo "🎉 SERVER READY!"
echo "=========================================="
echo ""
echo "Local: http://localhost:5173"
echo ""
echo "Public URL (from localtunnel):"
grep -o "https://[^ ]*\.loca\.lt" /tmp/lt.log | head -1
echo ""
echo "=========================================="
echo ""
echo "PIDs to stop:"
echo "  Vite: $VITE_PID"
echo "  Localtunnel: $LT_PID"
echo ""
echo "To stop: kill $VITE_PID && kill $LT_PID"
echo ""

# Keep script running
wait
