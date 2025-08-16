# Use Node.js 18 Alpine for smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Make start script executable
RUN chmod +x start.sh

# Expose port (Railway will override this)
EXPOSE 3000

# Start the app using the start script
CMD ["./start.sh"]
