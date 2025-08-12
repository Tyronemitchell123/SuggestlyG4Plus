#!/bin/bash

echo "🔧 SETTING UP DEPLOYMENT USER AND DOCKER CONFIGURATION"
echo "======================================================"

# Check if running as root
if [ "$EUID" -ne 0 ]; then
    echo "❌ This script must be run as root (use sudo)"
    exit 1
fi

# Create deploy user
echo "👤 Creating deploy user..."
adduser --disabled-password --gecos "" deploy

# Add deploy user to docker group
echo "🐳 Adding deploy user to docker group..."
usermod -aG docker deploy

# Create deployment directory
echo "📁 Creating deployment directory..."
mkdir -p /home/deploy/suggestlyg4plus
chown -R deploy:deploy /home/deploy/suggestlyg4plus

# Copy project files to deploy directory
echo "📋 Copying project files..."
cp -r . /home/deploy/suggestlyg4plus/
chown -R deploy:deploy /home/deploy/suggestlyg4plus

# Set up SSH key for deploy user (if needed)
echo "🔑 Setting up SSH access..."
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
touch /home/deploy/.ssh/authorized_keys
chmod 600 /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh

# Create deployment script for deploy user
echo "📝 Creating deployment script..."
cat > /home/deploy/deploy.sh << 'EOF'
#!/bin/bash
cd /home/deploy/suggestlyg4plus

echo "🚀 DEPLOYING SUGGESTLY G4 PLUS AS DEPLOY USER"
echo "============================================="

# Check Docker status
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running or user doesn't have permissions"
    exit 1
fi

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

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
EOF

chmod +x /home/deploy/deploy.sh
chown deploy:deploy /home/deploy/deploy.sh

# Create systemd service for auto-start
echo "⚙️ Creating systemd service..."
cat > /etc/systemd/system/suggestlyg4plus.service << 'EOF'
[Unit]
Description=SuggestlyG4Plus Application
After=docker.service
Requires=docker.service

[Service]
Type=oneshot
User=deploy
Group=deploy
WorkingDirectory=/home/deploy/suggestlyg4plus
ExecStart=/home/deploy/deploy.sh
RemainAfterExit=yes

[Install]
WantedBy=multi-user.target
EOF

# Enable and start the service
systemctl daemon-reload
systemctl enable suggestlyg4plus.service

echo "✅ DEPLOYMENT USER SETUP COMPLETE!"
echo "👤 Deploy user: deploy"
echo "📁 Project location: /home/deploy/suggestlyg4plus"
echo "🚀 Deployment script: /home/deploy/deploy.sh"
echo "⚙️ Systemd service: suggestlyg4plus.service"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Switch to deploy user: sudo su - deploy"
echo "2. Navigate to project: cd /home/deploy/suggestlyg4plus"
echo "3. Run deployment: ./deploy.sh"
echo "4. Or start service: sudo systemctl start suggestlyg4plus"


