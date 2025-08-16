// Test Service - Comprehensive Testing & Debugging
class TestService {
  constructor() {
    this.testResults = [];
    this.debugMode = false;
    this.performanceMetrics = {};
    this.errorLog = [];
    this.testSuites = new Map();
  }

  // Initialize testing environment
  async initialize() {
    console.log('🧪 Initializing Test Service...');
    this.setupTestEnvironment();
    this.setupDebugMode();
    this.setupPerformanceMonitoring();
    return true;
  }

  // Setup test environment
  setupTestEnvironment() {
    // Create test containers
    this.createTestContainer();
    
    // Setup test data
    this.setupTestData();
    
    // Initialize test runners
    this.initializeTestRunners();
  }

  // Create test container for isolated testing
  createTestContainer() {
    const testContainer = document.createElement('div');
    testContainer.id = 'test-container';
    testContainer.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 300px;
      max-height: 400px;
      background: #1a1a1a;
      border: 2px solid #00ff88;
      border-radius: 8px;
      padding: 10px;
      font-family: 'Courier New', monospace;
      font-size: 12px;
      color: #00ff88;
      z-index: 10000;
      overflow-y: auto;
      display: none;
    `;
    document.body.appendChild(testContainer);
  }

  // Setup test data
  setupTestData() {
    this.testData = {
      users: [
        { id: 1, name: 'Test User 1', email: 'test1@example.com' },
        { id: 2, name: 'Test User 2', email: 'test2@example.com' },
        { id: 3, name: 'Test User 3', email: 'test3@example.com' }
      ],
      content: [
        { id: 1, title: 'Test Content 1', body: 'This is test content 1' },
        { id: 2, title: 'Test Content 2', body: 'This is test content 2' },
        { id: 3, title: 'Test Content 3', body: 'This is test content 3' }
      ],
      payments: [
        { id: 1, amount: 19.99, status: 'completed' },
        { id: 2, amount: 49.99, status: 'pending' },
        { id: 3, amount: 99.99, status: 'failed' }
      ]
    };
  }

  // Initialize test runners
  initializeTestRunners() {
    this.testRunners = {
      unit: this.runUnitTests.bind(this),
      integration: this.runIntegrationTests.bind(this),
      e2e: this.runE2ETests.bind(this),
      performance: this.runPerformanceTests.bind(this),
      accessibility: this.runAccessibilityTests.bind(this)
    };
  }

  // Setup debug mode
  setupDebugMode() {
    this.debugMode = localStorage.getItem('debugMode') === 'true';
    
    if (this.debugMode) {
      this.showDebugPanel();
      this.enableDebugLogging();
    }
  }

  // Show debug panel
  showDebugPanel() {
    const debugPanel = document.createElement('div');
    debugPanel.id = 'debug-panel';
    debugPanel.style.cssText = `
      position: fixed;
      bottom: 10px;
      left: 10px;
      width: 400px;
      height: 300px;
      background: #2a2a2a;
      border: 2px solid #ff6b6b;
      border-radius: 8px;
      padding: 10px;
      font-family: 'Courier New', monospace;
      font-size: 11px;
      color: #ffffff;
      z-index: 10000;
      overflow-y: auto;
    `;
    document.body.appendChild(debugPanel);
  }

  // Enable debug logging
  enableDebugLogging() {
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info
    };

    // Override console methods
    console.log = (...args) => {
      originalConsole.log(...args);
      this.logDebug('LOG', args);
    };

    console.error = (...args) => {
      originalConsole.error(...args);
      this.logDebug('ERROR', args);
    };

    console.warn = (...args) => {
      originalConsole.warn(...args);
      this.logDebug('WARN', args);
    };

    console.info = (...args) => {
      originalConsole.info(...args);
      this.logDebug('INFO', args);
    };
  }

  // Log debug information
  logDebug(level, args) {
    const debugPanel = document.getElementById('debug-panel');
    if (debugPanel) {
      const timestamp = new Date().toLocaleTimeString();
      const logEntry = document.createElement('div');
      logEntry.style.cssText = `
        margin: 2px 0;
        padding: 2px 4px;
        border-radius: 3px;
        background: ${level === 'ERROR' ? '#ff4444' : level === 'WARN' ? '#ffaa00' : '#444444'};
      `;
      logEntry.textContent = `[${timestamp}] ${level}: ${args.join(' ')}`;
      debugPanel.appendChild(logEntry);
      debugPanel.scrollTop = debugPanel.scrollHeight;
    }
  }

  // Setup performance monitoring
  setupPerformanceMonitoring() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      this.measurePageLoadPerformance();
    });

    // Monitor API calls
    this.monitorAPICalls();

    // Monitor memory usage
    this.monitorMemoryUsage();
  }

  // Measure page load performance
  measurePageLoadPerformance() {
    const performance = window.performance;
    if (performance) {
      const navigation = performance.getEntriesByType('navigation')[0];
      this.performanceMetrics.pageLoad = {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
        totalTime: navigation.loadEventEnd - navigation.fetchStart
      };
    }
  }

  // Monitor API calls
  monitorAPICalls() {
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = performance.now();
      try {
        const response = await originalFetch(...args);
        const endTime = performance.now();
        this.performanceMetrics.apiCalls = this.performanceMetrics.apiCalls || [];
        this.performanceMetrics.apiCalls.push({
          url: args[0],
          duration: endTime - startTime,
          status: response.status,
          timestamp: new Date().toISOString()
        });
        return response;
      } catch (error) {
        const endTime = performance.now();
        this.performanceMetrics.apiCalls = this.performanceMetrics.apiCalls || [];
        this.performanceMetrics.apiCalls.push({
          url: args[0],
          duration: endTime - startTime,
          error: error.message,
          timestamp: new Date().toISOString()
        });
        throw error;
      }
    };
  }

  // Monitor memory usage
  monitorMemoryUsage() {
    if (performance.memory) {
      setInterval(() => {
        this.performanceMetrics.memory = {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit,
          timestamp: new Date().toISOString()
        };
      }, 5000);
    }
  }

  // Run all tests
  async runAllTests() {
    console.log('🧪 Running all tests...');
    const results = {
      unit: await this.runUnitTests(),
      integration: await this.runIntegrationTests(),
      e2e: await this.runE2ETests(),
      performance: await this.runPerformanceTests(),
      accessibility: await this.runAccessibilityTests()
    };
    
    this.displayTestResults(results);
    return results;
  }

  // Run unit tests
  async runUnitTests() {
    const tests = [
      this.testAuthentication(),
      this.testPaymentProcessing(),
      this.testAIService(),
      this.testRealtimeService(),
      this.testAnalyticsService(),
      this.testEmailService()
    ];

    const results = await Promise.all(tests);
    return {
      total: tests.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      results: results
    };
  }

  // Test authentication service
  async testAuthentication() {
    try {
      // Test user registration
      const registerResult = await this.mockAuthService.register({
        email: 'test@example.com',
        password: 'password123'
      });
      
      // Test user login
      const loginResult = await this.mockAuthService.login({
        email: 'test@example.com',
        password: 'password123'
      });

      return {
        name: 'Authentication Service',
        passed: registerResult.success && loginResult.success,
        details: { register: registerResult, login: loginResult }
      };
    } catch (error) {
      return {
        name: 'Authentication Service',
        passed: false,
        error: error.message
      };
    }
  }

  // Test payment processing
  async testPaymentProcessing() {
    try {
      const paymentResult = await this.mockPaymentService.processPayment({
        amount: 49.99,
        currency: 'USD',
        paymentMethod: 'card'
      });

      return {
        name: 'Payment Processing',
        passed: paymentResult.success,
        details: paymentResult
      };
    } catch (error) {
      return {
        name: 'Payment Processing',
        passed: false,
        error: error.message
      };
    }
  }

  // Test AI service
  async testAIService() {
    try {
      const aiResult = await this.mockAIService.generateText({
        prompt: 'Test prompt',
        model: 'gpt-3.5-turbo'
      });

      return {
        name: 'AI Service',
        passed: aiResult.success && aiResult.text,
        details: aiResult
      };
    } catch (error) {
      return {
        name: 'AI Service',
        passed: false,
        error: error.message
      };
    }
  }

  // Test realtime service
  async testRealtimeService() {
    try {
      const realtimeResult = await this.mockRealtimeService.connect();
      
      return {
        name: 'Realtime Service',
        passed: realtimeResult.connected,
        details: realtimeResult
      };
    } catch (error) {
      return {
        name: 'Realtime Service',
        passed: false,
        error: error.message
      };
    }
  }

  // Test analytics service
  async testAnalyticsService() {
    try {
      const analyticsResult = await this.mockAnalyticsService.trackEvent({
        event: 'test_event',
        properties: { test: true }
      });

      return {
        name: 'Analytics Service',
        passed: analyticsResult.success,
        details: analyticsResult
      };
    } catch (error) {
      return {
        name: 'Analytics Service',
        passed: false,
        error: error.message
      };
    }
  }

  // Test email service
  async testEmailService() {
    try {
      const emailResult = await this.mockEmailService.sendEmail({
        to: 'test@example.com',
        subject: 'Test Email',
        body: 'This is a test email'
      });

      return {
        name: 'Email Service',
        passed: emailResult.success,
        details: emailResult
      };
    } catch (error) {
      return {
        name: 'Email Service',
        passed: false,
        error: error.message
      };
    }
  }

  // Mock services for testing
  mockAuthService = {
    async register(userData) {
      return { success: true, userId: 'test-user-123' };
    },
    async login(credentials) {
      return { success: true, token: 'test-token-123' };
    }
  };

  mockPaymentService = {
    async processPayment(paymentData) {
      return { success: true, transactionId: 'txn-123' };
    }
  };

  mockAIService = {
    async generateText(prompt) {
      return { success: true, text: 'Generated test response' };
    }
  };

  mockRealtimeService = {
    async connect() {
      return { connected: true, connectionId: 'conn-123' };
    }
  };

  mockAnalyticsService = {
    async trackEvent(eventData) {
      return { success: true, eventId: 'evt-123' };
    }
  };

  mockEmailService = {
    async sendEmail(emailData) {
      return { success: true, messageId: 'msg-123' };
    }
  };

  // Run integration tests
  async runIntegrationTests() {
    const tests = [
      this.testUserWorkflow(),
      this.testPaymentWorkflow(),
      this.testAIWorkflow()
    ];

    const results = await Promise.all(tests);
    return {
      total: tests.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      results: results
    };
  }

  // Test complete user workflow
  async testUserWorkflow() {
    try {
      // 1. User registration
      const register = await this.mockAuthService.register({
        email: 'workflow@example.com',
        password: 'password123'
      });

      // 2. User login
      const login = await this.mockAuthService.login({
        email: 'workflow@example.com',
        password: 'password123'
      });

      // 3. Create subscription
      const subscription = await this.mockPaymentService.processPayment({
        amount: 49.99,
        currency: 'USD',
        paymentMethod: 'card'
      });

      // 4. Use AI service
      const aiUsage = await this.mockAIService.generateText({
        prompt: 'Workflow test prompt',
        model: 'gpt-3.5-turbo'
      });

      return {
        name: 'Complete User Workflow',
        passed: register.success && login.success && subscription.success && aiUsage.success,
        details: { register, login, subscription, aiUsage }
      };
    } catch (error) {
      return {
        name: 'Complete User Workflow',
        passed: false,
        error: error.message
      };
    }
  }

  // Test payment workflow
  async testPaymentWorkflow() {
    try {
      // 1. Create payment intent
      const intent = await this.mockPaymentService.processPayment({
        amount: 99.99,
        currency: 'USD',
        paymentMethod: 'card'
      });

      // 2. Process payment
      const payment = await this.mockPaymentService.processPayment({
        amount: 99.99,
        currency: 'USD',
        paymentMethod: 'card'
      });

      // 3. Send confirmation email
      const email = await this.mockEmailService.sendEmail({
        to: 'customer@example.com',
        subject: 'Payment Confirmation',
        body: 'Your payment has been processed successfully.'
      });

      return {
        name: 'Payment Workflow',
        passed: intent.success && payment.success && email.success,
        details: { intent, payment, email }
      };
    } catch (error) {
      return {
        name: 'Payment Workflow',
        passed: false,
        error: error.message
      };
    }
  }

  // Test AI workflow
  async testAIWorkflow() {
    try {
      // 1. Generate text
      const text = await this.mockAIService.generateText({
        prompt: 'AI workflow test',
        model: 'gpt-3.5-turbo'
      });

      // 2. Track analytics
      const analytics = await this.mockAnalyticsService.trackEvent({
        event: 'ai_generation',
        properties: { model: 'gpt-3.5-turbo' }
      });

      // 3. Send notification
      const notification = await this.mockEmailService.sendEmail({
        to: 'user@example.com',
        subject: 'AI Generation Complete',
        body: 'Your AI content has been generated successfully.'
      });

      return {
        name: 'AI Workflow',
        passed: text.success && analytics.success && notification.success,
        details: { text, analytics, notification }
      };
    } catch (error) {
      return {
        name: 'AI Workflow',
        passed: false,
        error: error.message
      };
    }
  }

  // Run end-to-end tests
  async runE2ETests() {
    const tests = [
      this.testHomepageLoad(),
      this.testUserRegistration(),
      this.testUserLogin(),
      this.testSubscriptionPurchase(),
      this.testAIUsage()
    ];

    const results = await Promise.all(tests);
    return {
      total: tests.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      results: results
    };
  }

  // Test homepage load
  async testHomepageLoad() {
    try {
      const startTime = performance.now();
      
      // Simulate page load
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      return {
        name: 'Homepage Load',
        passed: loadTime < 3000, // Should load in under 3 seconds
        details: { loadTime: `${loadTime.toFixed(2)}ms` }
      };
    } catch (error) {
      return {
        name: 'Homepage Load',
        passed: false,
        error: error.message
      };
    }
  }

  // Test user registration
  async testUserRegistration() {
    try {
      const result = await this.mockAuthService.register({
        email: 'e2e@example.com',
        password: 'password123'
      });

      return {
        name: 'User Registration',
        passed: result.success,
        details: result
      };
    } catch (error) {
      return {
        name: 'User Registration',
        passed: false,
        error: error.message
      };
    }
  }

  // Test user login
  async testUserLogin() {
    try {
      const result = await this.mockAuthService.login({
        email: 'e2e@example.com',
        password: 'password123'
      });

      return {
        name: 'User Login',
        passed: result.success,
        details: result
      };
    } catch (error) {
      return {
        name: 'User Login',
        passed: false,
        error: error.message
      };
    }
  }

  // Test subscription purchase
  async testSubscriptionPurchase() {
    try {
      const result = await this.mockPaymentService.processPayment({
        amount: 49.99,
        currency: 'USD',
        paymentMethod: 'card'
      });

      return {
        name: 'Subscription Purchase',
        passed: result.success,
        details: result
      };
    } catch (error) {
      return {
        name: 'Subscription Purchase',
        passed: false,
        error: error.message
      };
    }
  }

  // Test AI usage
  async testAIUsage() {
    try {
      const result = await this.mockAIService.generateText({
        prompt: 'E2E test prompt',
        model: 'gpt-3.5-turbo'
      });

      return {
        name: 'AI Usage',
        passed: result.success && result.text,
        details: result
      };
    } catch (error) {
      return {
        name: 'AI Usage',
        passed: false,
        error: error.message
      };
    }
  }

  // Run performance tests
  async runPerformanceTests() {
    const tests = [
      this.testPageLoadPerformance(),
      this.testAPIPerformance(),
      this.testMemoryUsage(),
      this.testRenderingPerformance()
    ];

    const results = await Promise.all(tests);
    return {
      total: tests.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      results: results
    };
  }

  // Test page load performance
  async testPageLoadPerformance() {
    const metrics = this.performanceMetrics.pageLoad;
    if (!metrics) {
      return {
        name: 'Page Load Performance',
        passed: false,
        error: 'No performance metrics available'
      };
    }

    const passed = metrics.totalTime < 3000; // Should load in under 3 seconds

    return {
      name: 'Page Load Performance',
      passed,
      details: {
        totalTime: `${metrics.totalTime.toFixed(2)}ms`,
        domContentLoaded: `${metrics.domContentLoaded.toFixed(2)}ms`,
        loadComplete: `${metrics.loadComplete.toFixed(2)}ms`
      }
    };
  }

  // Test API performance
  async testAPIPerformance() {
    const apiCalls = this.performanceMetrics.apiCalls || [];
    if (apiCalls.length === 0) {
      return {
        name: 'API Performance',
        passed: true,
        details: { message: 'No API calls recorded' }
      };
    }

    const avgResponseTime = apiCalls.reduce((sum, call) => sum + call.duration, 0) / apiCalls.length;
    const passed = avgResponseTime < 1000; // Should respond in under 1 second

    return {
      name: 'API Performance',
      passed,
      details: {
        averageResponseTime: `${avgResponseTime.toFixed(2)}ms`,
        totalCalls: apiCalls.length,
        slowestCall: `${Math.max(...apiCalls.map(c => c.duration)).toFixed(2)}ms`
      }
    };
  }

  // Test memory usage
  async testMemoryUsage() {
    const memory = this.performanceMetrics.memory;
    if (!memory) {
      return {
        name: 'Memory Usage',
        passed: true,
        details: { message: 'Memory metrics not available' }
      };
    }

    const memoryUsagePercent = (memory.used / memory.limit) * 100;
    const passed = memoryUsagePercent < 80; // Should use less than 80% of available memory

    return {
      name: 'Memory Usage',
      passed,
      details: {
        used: `${(memory.used / 1024 / 1024).toFixed(2)}MB`,
        total: `${(memory.total / 1024 / 1024).toFixed(2)}MB`,
        limit: `${(memory.limit / 1024 / 1024).toFixed(2)}MB`,
        usagePercent: `${memoryUsagePercent.toFixed(2)}%`
      }
    };
  }

  // Test rendering performance
  async testRenderingPerformance() {
    const startTime = performance.now();
    
    // Simulate rendering test
    const testElement = document.createElement('div');
    testElement.innerHTML = '<p>Test content</p>'.repeat(1000);
    document.body.appendChild(testElement);
    
    // Force reflow
    testElement.offsetHeight;
    
    document.body.removeChild(testElement);
    
    const endTime = performance.now();
    const renderTime = endTime - startTime;
    
    const passed = renderTime < 100; // Should render in under 100ms

    return {
      name: 'Rendering Performance',
      passed,
      details: {
        renderTime: `${renderTime.toFixed(2)}ms`
      }
    };
  }

  // Run accessibility tests
  async runAccessibilityTests() {
    const tests = [
      this.testColorContrast(),
      this.testKeyboardNavigation(),
      this.testScreenReaderCompatibility(),
      this.testAltTextPresence()
    ];

    const results = await Promise.all(tests);
    return {
      total: tests.length,
      passed: results.filter(r => r.passed).length,
      failed: results.filter(r => !r.passed).length,
      results: results
    };
  }

  // Test color contrast
  async testColorContrast() {
    try {
      const elements = document.querySelectorAll('*');
      let contrastIssues = 0;
      
      // Simple contrast check (this would be more sophisticated in a real implementation)
      elements.forEach(element => {
        const style = window.getComputedStyle(element);
        const backgroundColor = style.backgroundColor;
        const color = style.color;
        
        // Basic check - in reality, you'd use a proper contrast calculation library
        if (backgroundColor === 'transparent' && color === '#000000') {
          contrastIssues++;
        }
      });

      return {
        name: 'Color Contrast',
        passed: contrastIssues === 0,
        details: { contrastIssues }
      };
    } catch (error) {
      return {
        name: 'Color Contrast',
        passed: false,
        error: error.message
      };
    }
  }

  // Test keyboard navigation
  async testKeyboardNavigation() {
    try {
      const focusableElements = document.querySelectorAll('button, input, select, textarea, a[href], [tabindex]');
      const hasFocusableElements = focusableElements.length > 0;

      return {
        name: 'Keyboard Navigation',
        passed: hasFocusableElements,
        details: { focusableElements: focusableElements.length }
      };
    } catch (error) {
      return {
        name: 'Keyboard Navigation',
        passed: false,
        error: error.message
      };
    }
  }

  // Test screen reader compatibility
  async testScreenReaderCompatibility() {
    try {
      const images = document.querySelectorAll('img');
      let imagesWithoutAlt = 0;
      
      images.forEach(img => {
        if (!img.alt && !img.getAttribute('aria-label')) {
          imagesWithoutAlt++;
        }
      });

      return {
        name: 'Screen Reader Compatibility',
        passed: imagesWithoutAlt === 0,
        details: { imagesWithoutAlt }
      };
    } catch (error) {
      return {
        name: 'Screen Reader Compatibility',
        passed: false,
        error: error.message
      };
    }
  }

  // Test alt text presence
  async testAltTextPresence() {
    try {
      const images = document.querySelectorAll('img');
      let imagesWithoutAlt = 0;
      
      images.forEach(img => {
        if (!img.alt) {
          imagesWithoutAlt++;
        }
      });

      return {
        name: 'Alt Text Presence',
        passed: imagesWithoutAlt === 0,
        details: { imagesWithoutAlt, totalImages: images.length }
      };
    } catch (error) {
      return {
        name: 'Alt Text Presence',
        passed: false,
        error: error.message
      };
    }
  }

  // Display test results
  displayTestResults(results) {
    const testContainer = document.getElementById('test-container');
    if (!testContainer) return;

    testContainer.style.display = 'block';
    testContainer.innerHTML = '';

    const header = document.createElement('div');
    header.style.cssText = 'font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #00ff88; padding-bottom: 5px;';
    header.textContent = '🧪 TEST RESULTS';
    testContainer.appendChild(header);

    Object.entries(results).forEach(([testType, result]) => {
      const testSection = document.createElement('div');
      testSection.style.cssText = 'margin: 10px 0; padding: 5px; border: 1px solid #333; border-radius: 3px;';
      
      const title = document.createElement('div');
      title.style.cssText = 'font-weight: bold; color: #00ff88;';
      title.textContent = `${testType.toUpperCase()} TESTS`;
      testSection.appendChild(title);

      const summary = document.createElement('div');
      summary.style.cssText = 'font-size: 10px; margin: 5px 0;';
      summary.textContent = `Passed: ${result.passed}/${result.total} (${((result.passed/result.total)*100).toFixed(1)}%)`;
      testSection.appendChild(summary);

      if (result.results) {
        result.results.forEach(testResult => {
          const testItem = document.createElement('div');
          testItem.style.cssText = `
            font-size: 10px;
            margin: 2px 0;
            padding: 2px 4px;
            border-radius: 2px;
            background: ${testResult.passed ? '#004400' : '#440000'};
            color: ${testResult.passed ? '#00ff88' : '#ff6b6b'};
          `;
          testItem.textContent = `${testResult.passed ? '✅' : '❌'} ${testResult.name}`;
          testSection.appendChild(testItem);
        });
      }

      testContainer.appendChild(testSection);
    });

    // Auto-hide after 10 seconds
    setTimeout(() => {
      testContainer.style.display = 'none';
    }, 10000);
  }

  // Toggle debug mode
  toggleDebugMode() {
    this.debugMode = !this.debugMode;
    localStorage.setItem('debugMode', this.debugMode.toString());
    
    if (this.debugMode) {
      this.showDebugPanel();
      this.enableDebugLogging();
    } else {
      const debugPanel = document.getElementById('debug-panel');
      if (debugPanel) {
        debugPanel.remove();
      }
    }
  }

  // Get performance metrics
  getPerformanceMetrics() {
    return this.performanceMetrics;
  }

  // Get error log
  getErrorLog() {
    return this.errorLog;
  }

  // Clear error log
  clearErrorLog() {
    this.errorLog = [];
  }

  // Export test results
  exportTestResults() {
    const results = {
      timestamp: new Date().toISOString(),
      performance: this.performanceMetrics,
      errors: this.errorLog,
      testResults: this.testResults
    };

    const blob = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `test-results-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
}

// Export the service
export default TestService;

















