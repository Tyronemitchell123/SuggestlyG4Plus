#!/bin/bash

echo "🚀 DEPLOYING SUGGESTLY G4 PLUS WITH DOCKER"
echo "=========================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create SSL directory
mkdir -p ssl

# Build and start services
echo "🔧 Building and starting services..."
docker-compose up --build -d

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Check service status
echo "🔍 Checking service status..."
docker-compose ps

# Test the application
echo "🧪 Testing the application..."
curl -I http://localhost:80

echo "✅ DEPLOYMENT COMPLETE!"
echo "🌐 Your application is running at:"
echo "   • Frontend: http://localhost:3000"
echo "   • Backend API: http://localhost:8080"
echo "   • Nginx Proxy: http://localhost:80"
echo "   • Custom Domain: https://suggestlyg4plus.io"
