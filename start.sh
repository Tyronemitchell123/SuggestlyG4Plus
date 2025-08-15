#!/bin/sh

# Railway Start Script
echo "🚀 Starting SUGGESTLY ELITE app on port $PORT"

# Use Railway's PORT environment variable
npx serve -s build -l $PORT
