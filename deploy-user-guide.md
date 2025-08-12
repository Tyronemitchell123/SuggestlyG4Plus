# Deploy User Setup Guide

## Overview
This guide explains how to set up and use the `deploy` user for running SuggestlyG4Plus with Docker.

## Prerequisites
- Ubuntu/Debian Linux system
- Docker and Docker Compose installed
- Root access (sudo)

## Setup Instructions

### 1. Run the Setup Script
```bash
sudo chmod +x setup-deploy-user.sh
sudo ./setup-deploy-user.sh
```

### 2. What the Script Does
- Creates a `deploy` user with no password
- Adds the user to the `docker` group
- Creates `/home/deploy/suggestlyg4plus` directory
- Copies all project files to the deploy directory
- Sets up SSH access (if needed)
- Creates a deployment script
- Creates a systemd service for auto-start

### 3. Using the Deploy User

#### Option A: Switch to Deploy User
```bash
sudo su - deploy
cd /home/deploy/suggestlyg4plus
./deploy.sh
```

#### Option B: Run as Deploy User from Current Session
```bash
sudo -u deploy /home/deploy/deploy.sh
```

#### Option C: Use Systemd Service
```bash
sudo systemctl start suggestlyg4plus
sudo systemctl status suggestlyg4plus
```

### 4. Verification
After deployment, verify the services are running:

```bash
# Check Docker containers
docker ps

# Test endpoints
curl http://localhost:80
curl http://localhost:3000
curl http://localhost:8080/api/health
```

### 5. Service Management

#### Start the service:
```bash
sudo systemctl start suggestlyg4plus
```

#### Stop the service:
```bash
sudo systemctl stop suggestlyg4plus
```

#### Check status:
```bash
sudo systemctl status suggestlyg4plus
```

#### View logs:
```bash
sudo journalctl -u suggestlyg4plus -f
```

### 6. Security Considerations

#### SSH Access (Optional)
If you need SSH access for the deploy user:

1. Generate SSH key:
```bash
ssh-keygen -t rsa -b 4096 -C "deploy@suggestlyg4plus"
```

2. Add public key to authorized_keys:
```bash
sudo -u deploy mkdir -p /home/deploy/.ssh
sudo -u deploy touch /home/deploy/.ssh/authorized_keys
# Copy your public key to /home/deploy/.ssh/authorized_keys
```

#### File Permissions
The setup script automatically sets correct permissions:
- `/home/deploy/suggestlyg4plus`: Owned by deploy user
- `/home/deploy/.ssh`: 700 permissions
- `/home/deploy/.ssh/authorized_keys`: 600 permissions

### 7. Troubleshooting

#### Docker Permission Issues
If the deploy user can't run Docker commands:
```bash
sudo usermod -aG docker deploy
# Log out and back in, or restart the system
```

#### Service Won't Start
Check the service logs:
```bash
sudo journalctl -u suggestlyg4plus -n 50
```

#### Port Conflicts
If ports 80, 3000, or 8080 are already in use:
```bash
# Find what's using the ports
sudo netstat -tlnp | grep :80
sudo netstat -tlnp | grep :3000
sudo netstat -tlnp | grep :8080

# Stop conflicting services
sudo systemctl stop apache2  # if using port 80
sudo systemctl stop nginx    # if using port 80
```

### 8. Production Deployment

For production deployment, consider:

1. **SSL Certificates**: Set up Let's Encrypt certificates
2. **Firewall**: Configure UFW or iptables
3. **Monitoring**: Set up log rotation and monitoring
4. **Backups**: Implement database and file backups
5. **Updates**: Set up automatic security updates

### 9. Environment Variables

The deployment uses these environment variables:
- `FLASK_ENV=production`
- `SECRET_KEY=suggestlyg4plus_quantum_ultra_premium_secret_2025`
- `NODE_ENV=production`
- `REACT_APP_API_URL=http://localhost:8080`

### 10. Architecture

The deployment consists of:
- **Frontend**: Node.js React app (port 3000)
- **Backend**: Python Flask API (port 8080)
- **Proxy**: Nginx reverse proxy (port 80)
- **Database**: SQLite with search functionality

## Support

If you encounter issues:
1. Check the service logs: `sudo journalctl -u suggestlyg4plus -f`
2. Verify Docker is running: `sudo systemctl status docker`
3. Check container status: `docker ps -a`
4. Review the deployment script: `/home/deploy/deploy.sh`


