// Live Data Service for SUGGESTLY ELITE Platform
class LiveDataService {
  constructor() {
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectDelay = 1000;
    this.subscribers = new Map();
    this.dataCache = new Map();
    this.isConnected = false;
    this.heartbeatInterval = null;
    
    // Real-time data streams
    this.streams = {
      portfolio: [],
      market: [],
      analytics: [],
      notifications: [],
      aiInsights: [],
      performance: []
    };
  }

  // Initialize WebSocket connection
  async connect(url = 'wss://api.suggestlyg4plus.io/ws') {
    try {
      this.ws = new WebSocket(url);
      
      this.ws.onopen = () => {
        console.log('🟢 WebSocket connected');
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.startHeartbeat();
        this.authenticate();
      };

      this.ws.onmessage = (event) => {
        this.handleMessage(event.data);
      };

      this.ws.onclose = () => {
        console.log('🔴 WebSocket disconnected');
        this.isConnected = false;
        this.stopHeartbeat();
        this.handleReconnect();
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        this.isConnected = false;
      };

    } catch (error) {
      console.error('Failed to connect:', error);
      this.fallbackToSimulation();
    }
  }

  // Handle incoming messages
  handleMessage(data) {
    try {
      const message = JSON.parse(data);
      
      switch (message.type) {
        case 'portfolio_update':
          this.updatePortfolioData(message.data);
          break;
        case 'market_data':
          this.updateMarketData(message.data);
          break;
        case 'analytics':
          this.updateAnalyticsData(message.data);
          break;
        case 'notification':
          this.handleNotification(message.data);
          break;
        case 'ai_insight':
          this.handleAIInsight(message.data);
          break;
        case 'performance_metrics':
          this.updatePerformanceMetrics(message.data);
          break;
        case 'heartbeat':
          this.handleHeartbeat();
          break;
        default:
          console.log('Unknown message type:', message.type);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  }

  // Update portfolio data
  updatePortfolioData(data) {
    this.streams.portfolio = [...this.streams.portfolio, data].slice(-100);
    this.notifySubscribers('portfolio', data);
    this.cacheData('portfolio', data);
  }

  // Update market data
  updateMarketData(data) {
    this.streams.market = [...this.streams.market, data].slice(-100);
    this.notifySubscribers('market', data);
    this.cacheData('market', data);
  }

  // Update analytics data
  updateAnalyticsData(data) {
    this.streams.analytics = [...this.streams.analytics, data].slice(-100);
    this.notifySubscribers('analytics', data);
    this.cacheData('analytics', data);
  }

  // Handle notifications
  handleNotification(data) {
    this.streams.notifications = [...this.streams.notifications, data].slice(-50);
    this.notifySubscribers('notifications', data);
    
    // Show browser notification if enabled
    if (Notification.permission === 'granted') {
      new Notification(data.title, {
        body: data.message,
        icon: '/favicon.ico'
      });
    }
  }

  // Handle AI insights
  handleAIInsight(data) {
    this.streams.aiInsights = [...this.streams.aiInsights, data].slice(-20);
    this.notifySubscribers('aiInsights', data);
  }

  // Update performance metrics
  updatePerformanceMetrics(data) {
    this.streams.performance = [...this.streams.performance, data].slice(-100);
    this.notifySubscribers('performance', data);
    this.cacheData('performance', data);
  }

  // Subscribe to data streams
  subscribe(streamType, callback) {
    if (!this.subscribers.has(streamType)) {
      this.subscribers.set(streamType, []);
    }
    this.subscribers.get(streamType).push(callback);
    
    // Send cached data immediately
    const cachedData = this.dataCache.get(streamType);
    if (cachedData) {
      callback(cachedData);
    }
  }

  // Unsubscribe from data streams
  unsubscribe(streamType, callback) {
    if (this.subscribers.has(streamType)) {
      const callbacks = this.subscribers.get(streamType);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  // Notify subscribers
  notifySubscribers(streamType, data) {
    if (this.subscribers.has(streamType)) {
      this.subscribers.get(streamType).forEach(callback => {
        try {
          callback(data);
        } catch (error) {
          console.error('Subscriber callback error:', error);
        }
      });
    }
  }

  // Cache data
  cacheData(key, data) {
    this.dataCache.set(key, data);
  }

  // Get cached data
  getCachedData(key) {
    return this.dataCache.get(key);
  }

  // Send message to server
  sendMessage(type, data) {
    if (this.isConnected && this.ws) {
      this.ws.send(JSON.stringify({ type, data }));
    }
  }

  // Authenticate connection
  authenticate() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.sendMessage('authenticate', { token });
    }
  }

  // Start heartbeat
  startHeartbeat() {
    this.heartbeatInterval = setInterval(() => {
      this.sendMessage('heartbeat', { timestamp: Date.now() });
    }, 30000);
  }

  // Stop heartbeat
  stopHeartbeat() {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  // Handle heartbeat response
  handleHeartbeat() {
    // Reset connection health
    this.reconnectAttempts = 0;
  }

  // Handle reconnection
  handleReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Reconnecting... Attempt ${this.reconnectAttempts}`);
      
      setTimeout(() => {
        this.connect();
      }, this.reconnectDelay * this.reconnectAttempts);
    } else {
      console.log('Max reconnection attempts reached, falling back to simulation');
      this.fallbackToSimulation();
    }
  }

  // Fallback to simulation mode
  fallbackToSimulation() {
    console.log('🔄 Using simulation mode');
    this.startSimulation();
  }

  // Start simulation mode
  startSimulation() {
    // Simulate portfolio data
    setInterval(() => {
      const portfolioData = {
        value: 12500000 + Math.random() * 1000000,
        change: (Math.random() - 0.5) * 10,
        assets: [
          { symbol: 'AAPL', value: 150 + Math.random() * 10, change: (Math.random() - 0.5) * 5 },
          { symbol: 'TSLA', value: 200 + Math.random() * 20, change: (Math.random() - 0.5) * 8 },
          { symbol: 'GOOGL', value: 2800 + Math.random() * 100, change: (Math.random() - 0.5) * 3 }
        ],
        timestamp: Date.now()
      };
      this.updatePortfolioData(portfolioData);
    }, 5000);

    // Simulate market data
    setInterval(() => {
      const marketData = {
        indices: {
          'S&P 500': 4500 + Math.random() * 100,
          'NASDAQ': 14000 + Math.random() * 200,
          'DOW': 35000 + Math.random() * 300
        },
        volatility: Math.random() * 2,
        timestamp: Date.now()
      };
      this.updateMarketData(marketData);
    }, 3000);

    // Simulate analytics
    setInterval(() => {
      const analyticsData = {
        users: 1000 + Math.random() * 100,
        transactions: 50 + Math.random() * 20,
        revenue: 100000 + Math.random() * 50000,
        timestamp: Date.now()
      };
      this.updateAnalyticsData(analyticsData);
    }, 2000);

    // Simulate AI insights
    setInterval(() => {
      const insights = [
        'Portfolio rebalancing recommended based on market trends',
        'New investment opportunity detected in emerging markets',
        'Risk assessment update available for your holdings',
        'Market volatility suggests defensive positioning',
        'AI model predicts 15% upside for tech sector'
      ];
      
      const aiInsight = {
        id: Date.now(),
        type: ['optimization', 'insight', 'alert', 'prediction'][Math.floor(Math.random() * 4)],
        message: insights[Math.floor(Math.random() * insights.length)],
        priority: ['high', 'medium', 'low'][Math.floor(Math.random() * 3)],
        confidence: 0.7 + Math.random() * 0.3,
        timestamp: Date.now()
      };
      this.handleAIInsight(aiInsight);
    }, 30000);

    // Simulate performance metrics
    setInterval(() => {
      const performanceData = {
        latency: 20 + Math.random() * 40,
        throughput: 500 + Math.random() * 500,
        uptime: 99.9 + Math.random() * 0.1,
        errors: Math.random() * 5,
        timestamp: Date.now()
      };
      this.updatePerformanceMetrics(performanceData);
    }, 1000);
  }

  // Disconnect
  disconnect() {
    if (this.ws) {
      this.ws.close();
    }
    this.stopHeartbeat();
    this.isConnected = false;
  }

  // Get connection status
  getConnectionStatus() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      streams: Object.keys(this.streams).map(key => ({
        name: key,
        count: this.streams[key].length
      }))
    };
  }

  // Get stream data
  getStreamData(streamType) {
    return this.streams[streamType] || [];
  }

  // Clear stream data
  clearStreamData(streamType) {
    if (this.streams[streamType]) {
      this.streams[streamType] = [];
    }
  }
}

// Create singleton instance
const liveDataService = new LiveDataService();

export default liveDataService;
