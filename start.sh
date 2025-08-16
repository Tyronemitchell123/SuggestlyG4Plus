#!/bin/sh

# Railway Start Script
echo "🚀 Starting SUGGESTLY ELITE app on port $PORT"

# Use Railway's PORT environment variable or default to 3000
PORT=${PORT:-3000}

# Serve the current directory (where index.html is located)
npx http-server . -p $PORT -a 0.0.0.0
