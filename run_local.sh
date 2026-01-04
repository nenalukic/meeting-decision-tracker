#!/bin/bash

# Function to kill processes on exit
cleanup() {
    echo ""
    echo "Stopping services..."
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID
    fi
    exit
}

trap cleanup SIGINT SIGTERM

echo "--- Meeting Decision Tracker: Local Dev Mode ---"
echo "(!) Docker not found. Falling back to local execution with SQLite."

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "Error: python3 could not be found."
    exit 1
fi

# Check for Node
if ! command -v npm &> /dev/null; then
    echo "Error: npm could not be found."
    exit 1
fi

# 1. Start Backend
echo ""
echo "[1/2] Starting Backend..."
if [ ! -d "backend/venv" ]; then
    echo "Creating Python venv..."
    python3 -m venv backend/venv
fi

source backend/venv/bin/activate

# Ensure dependencies are installed (fast check)
# We trust they are mostly there, or we can just pip install again to be sure
# pip install -r backend/requirements.txt > /dev/null 2>&1

# DATABASE_URL is not set, so it defaults to sqlite:///./app.db as per backend/database.py
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload > backend.log 2>&1 &
BACKEND_PID=$!
echo "Backend started (PID: $BACKEND_PID). Logs: backend.log"

# 2. Start Frontend
echo ""
echo "[2/2] Starting Frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install > /dev/null 2>&1
fi

# Start Vite
npm run dev -- --open > /dev/null 2>&1 &
FRONTEND_PID=$!
echo "Frontend started (PID: $FRONTEND_PID)."

echo ""
echo "----------------------------------------------"
echo "Application is running!"
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000/docs"
echo "----------------------------------------------"
echo "Press Ctrl+C to stop."

wait
