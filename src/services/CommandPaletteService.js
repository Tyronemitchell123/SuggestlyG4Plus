// Command Palette Service for SUGGESTLY ELITE Platform
import aiService from './AIService.js';
import liveDataService from './LiveDataService.js';

class CommandPaletteService {
  constructor() {
    this.commands = new Map();
    this.shortcuts = new Map();
    this.history = [];
    this.favorites = new Set();
    
    this.initializeCommands();
    this.initializeShortcuts();
  }

  // Initialize all available commands
  initializeCommands() {
    // Navigation commands
    this.registerCommand('dashboard', {
      title: 'Go to Dashboard',
      description: 'Navigate to main dashboard',
      category: 'navigation',
      action: () => this.navigateTo('/dashboard'),
      shortcut: 'Ctrl+1'
    });

    this.registerCommand('portfolio', {
      title: 'View Portfolio',
      description: 'Open portfolio management',
      category: 'navigation',
      action: () => this.navigateTo('/portfolio'),
      shortcut: 'Ctrl+2'
    });

    this.registerCommand('analytics', {
      title: 'Analytics Center',
      description: 'Access advanced analytics',
      category: 'navigation',
      action: () => this.navigateTo('/analytics'),
      shortcut: 'Ctrl+3'
    });

    this.registerCommand('settings', {
      title: 'Settings',
      description: 'Open application settings',
      category: 'navigation',
      action: () => this.navigateTo('/settings'),
      shortcut: 'Ctrl+,'
    });

    // AI and Analysis commands
    this.registerCommand('ai_analysis', {
      title: 'AI Analysis',
      description: 'Run comprehensive AI analysis',
      category: 'ai',
      action: async () => await this.runAIAnalysis(),
      shortcut: 'Ctrl+Shift+A'
    });

    this.registerCommand('generate_report', {
      title: 'Generate Report',
      description: 'Create detailed portfolio report',
      category: 'ai',
      action: async () => await this.generateReport(),
      shortcut: 'Ctrl+Shift+R'
    });

    this.registerCommand('optimize_portfolio', {
      title: 'Optimize Portfolio',
      description: 'AI-powered portfolio optimization',
      category: 'ai',
      action: async () => await this.optimizePortfolio(),
      shortcut: 'Ctrl+Shift+O'
    });

    this.registerCommand('risk_assessment', {
      title: 'Risk Assessment',
      description: 'Comprehensive risk analysis',
      category: 'ai',
      action: async () => await this.assessRisk(),
      shortcut: 'Ctrl+Shift+R'
    });

    // Trading and Portfolio commands
    this.registerCommand('rebalance_portfolio', {
      title: 'Rebalance Portfolio',
      description: 'Automated portfolio rebalancing',
      category: 'trading',
      action: async () => await this.rebalancePortfolio(),
      shortcut: 'Ctrl+Shift+B'
    });

    this.registerCommand('place_trade', {
      title: 'Place Trade',
      description: 'Execute a new trade',
      category: 'trading',
      action: () => this.openTradeDialog(),
      shortcut: 'Ctrl+T'
    });

    this.registerCommand('view_orders', {
      title: 'View Orders',
      description: 'Check order status',
      category: 'trading',
      action: () => this.navigateTo('/orders'),
      shortcut: 'Ctrl+Shift+O'
    });

    // Data and Monitoring commands
    this.registerCommand('live_data', {
      title: 'Live Data Feed',
      description: 'View real-time data streams',
      category: 'data',
      action: () => this.openLiveDataPanel(),
      shortcut: 'Ctrl+Shift+L'
    });

    this.registerCommand('market_data', {
      title: 'Market Data',
      description: 'Access market information',
      category: 'data',
      action: () => this.navigateTo('/market'),
      shortcut: 'Ctrl+Shift+M'
    });

    this.registerCommand('performance_metrics', {
      title: 'Performance Metrics',
      description: 'View detailed performance data',
      category: 'data',
      action: () => this.openPerformancePanel(),
      shortcut: 'Ctrl+Shift+P'
    });

    // System and Utility commands
    this.registerCommand('toggle_theme', {
      title: 'Toggle Theme',
      description: 'Switch between light and dark themes',
      category: 'system',
      action: () => this.toggleTheme(),
      shortcut: 'Ctrl+Shift+T'
    });

    this.registerCommand('voice_commands', {
      title: 'Voice Commands',
      description: 'Enable voice navigation',
      category: 'system',
      action: () => this.toggleVoiceCommands(),
      shortcut: 'Ctrl+Shift+V'
    });

    this.registerCommand('accessibility_mode', {
      title: 'Accessibility Mode',
      description: 'Toggle accessibility features',
      category: 'system',
      action: () => this.toggleAccessibilityMode(),
      shortcut: 'Ctrl+Shift+A'
    });

    this.registerCommand('export_data', {
      title: 'Export Data',
      description: 'Export portfolio data',
      category: 'system',
      action: () => this.exportData(),
      shortcut: 'Ctrl+Shift+E'
    });

    // Help and Support commands
    this.registerCommand('help', {
      title: 'Help & Support',
      description: 'Access help documentation',
      category: 'help',
      action: () => this.openHelp(),
      shortcut: 'F1'
    });

    this.registerCommand('contact_support', {
      title: 'Contact Support',
      description: 'Get in touch with support team',
      category: 'help',
      action: () => this.contactSupport(),
      shortcut: 'Ctrl+Shift+H'
    });

    this.registerCommand('feedback', {
      title: 'Send Feedback',
      description: 'Submit feedback or suggestions',
      category: 'help',
      action: () => this.openFeedback(),
      shortcut: 'Ctrl+Shift+F'
    });
  }

  // Initialize keyboard shortcuts
  initializeShortcuts() {
    // Global shortcuts
    this.registerShortcut('Ctrl+K', () => this.openCommandPalette());
    this.registerShortcut('Escape', () => this.closeCommandPalette());
    this.registerShortcut('F1', () => this.openHelp());
    
    // Navigation shortcuts
    this.registerShortcut('Ctrl+1', () => this.navigateTo('/dashboard'));
    this.registerShortcut('Ctrl+2', () => this.navigateTo('/portfolio'));
    this.registerShortcut('Ctrl+3', () => this.navigateTo('/analytics'));
    this.registerShortcut('Ctrl+,', () => this.navigateTo('/settings'));
    
    // Quick actions
    this.registerShortcut('Ctrl+T', () => this.openTradeDialog());
    this.registerShortcut('Ctrl+Shift+T', () => this.toggleTheme());
    this.registerShortcut('Ctrl+Shift+A', () => this.runAIAnalysis());
  }

  // Register a new command
  registerCommand(id, command) {
    this.commands.set(id, {
      id,
      ...command,
      usage: 0,
      lastUsed: null
    });
  }

  // Register a keyboard shortcut
  registerShortcut(key, action) {
    this.shortcuts.set(key, action);
  }

  // Search commands
  searchCommands(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const [id, command] of this.commands) {
      const score = this.calculateSearchScore(command, lowerQuery);
      if (score > 0) {
        results.push({ ...command, score });
      }
    }

    return results
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }

  // Calculate search relevance score
  calculateSearchScore(command, query) {
    let score = 0;
    
    // Title match (highest weight)
    if (command.title.toLowerCase().includes(query)) {
      score += 10;
    }
    
    // Description match
    if (command.description.toLowerCase().includes(query)) {
      score += 5;
    }
    
    // Category match
    if (command.category.toLowerCase().includes(query)) {
      score += 3;
    }
    
    // Usage bonus (frequently used commands get higher scores)
    score += Math.min(command.usage / 10, 2);
    
    // Favorite bonus
    if (this.favorites.has(command.id)) {
      score += 1;
    }

    return score;
  }

  // Execute a command
  async executeCommand(commandId, params = {}) {
    const command = this.commands.get(commandId);
    if (!command) {
      throw new Error(`Command not found: ${commandId}`);
    }

    try {
      // Update usage statistics
      command.usage++;
      command.lastUsed = Date.now();
      
      // Add to history
      this.addToHistory(command);
      
      // Execute the command
      const result = await command.action(params);
      
      // Log successful execution
      console.log(`✅ Command executed: ${command.title}`, result);
      
      return { success: true, result, command };
    } catch (error) {
      console.error(`❌ Command failed: ${command.title}`, error);
      return { success: false, error: error.message, command };
    }
  }

  // Add command to history
  addToHistory(command) {
    this.history.unshift({
      ...command,
      executedAt: Date.now()
    });
    
    // Keep only last 50 commands
    this.history = this.history.slice(0, 50);
  }

  // Get command history
  getHistory() {
    return this.history;
  }

  // Toggle favorite status
  toggleFavorite(commandId) {
    if (this.favorites.has(commandId)) {
      this.favorites.delete(commandId);
    } else {
      this.favorites.add(commandId);
    }
  }

  // Get favorite commands
  getFavorites() {
    return Array.from(this.favorites).map(id => this.commands.get(id));
  }

  // Get commands by category
  getCommandsByCategory(category) {
    return Array.from(this.commands.values())
      .filter(command => command.category === category);
  }

  // Get all categories
  getCategories() {
    const categories = new Set();
    for (const command of this.commands.values()) {
      categories.add(command.category);
    }
    return Array.from(categories);
  }

  // Handle keyboard shortcuts
  handleKeyPress(event) {
    const key = this.getKeyFromEvent(event);
    const action = this.shortcuts.get(key);
    
    if (action) {
      event.preventDefault();
      action();
    }
  }

  // Convert keyboard event to key string
  getKeyFromEvent(event) {
    const keys = [];
    
    if (event.ctrlKey) keys.push('Ctrl');
    if (event.shiftKey) keys.push('Shift');
    if (event.altKey) keys.push('Alt');
    if (event.metaKey) keys.push('Meta');
    
    if (event.key !== 'Control' && event.key !== 'Shift' && event.key !== 'Alt' && event.key !== 'Meta') {
      keys.push(event.key.toUpperCase());
    }
    
    return keys.join('+');
  }

  // Navigation methods
  navigateTo(path) {
    // In a real app, this would use React Router or similar
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }

  // AI Analysis methods
  async runAIAnalysis() {
    const data = {
      portfolio: liveDataService.getCachedData('portfolio'),
      market: liveDataService.getCachedData('market'),
      performance: liveDataService.getCachedData('performance')
    };
    
    return await aiService.generateInsights(data);
  }

  async generateReport() {
    const data = {
      portfolio: liveDataService.getCachedData('portfolio'),
      market: liveDataService.getCachedData('market'),
      performance: liveDataService.getCachedData('performance')
    };
    
    return await aiService.executeAction('generate_report', data);
  }

  async optimizePortfolio() {
    const portfolioData = liveDataService.getCachedData('portfolio');
    return await aiService.executeAction('optimize_allocation', {
      constraints: { maxRisk: 0.3 },
      objectives: { targetReturn: 0.1 }
    });
  }

  async assessRisk() {
    const data = {
      portfolio: liveDataService.getCachedData('portfolio'),
      market: liveDataService.getCachedData('market')
    };
    
    return await aiService.assessRisk(data);
  }

  async rebalancePortfolio() {
    const currentAllocation = { stocks: 0.6, bonds: 0.3, cash: 0.1 };
    const targetAllocation = { stocks: 0.65, bonds: 0.25, cash: 0.1 };
    
    return await aiService.executeAction('rebalance_portfolio', {
      currentAllocation,
      targetAllocation
    });
  }

  // UI methods
  openCommandPalette() {
    // This would trigger the command palette UI
    window.dispatchEvent(new CustomEvent('openCommandPalette'));
  }

  closeCommandPalette() {
    window.dispatchEvent(new CustomEvent('closeCommandPalette'));
  }

  openTradeDialog() {
    window.dispatchEvent(new CustomEvent('openTradeDialog'));
  }

  openLiveDataPanel() {
    window.dispatchEvent(new CustomEvent('openLiveDataPanel'));
  }

  openPerformancePanel() {
    window.dispatchEvent(new CustomEvent('openPerformancePanel'));
  }

  openHelp() {
    window.open('/help', '_blank');
  }

  contactSupport() {
    window.open('mailto:support@suggestlyg4plus.io', '_blank');
  }

  openFeedback() {
    window.dispatchEvent(new CustomEvent('openFeedback'));
  }

  // System methods
  toggleTheme() {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', newTheme);
    
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: { theme: newTheme } }));
  }

  toggleVoiceCommands() {
    window.dispatchEvent(new CustomEvent('toggleVoiceCommands'));
  }

  toggleAccessibilityMode() {
    window.dispatchEvent(new CustomEvent('toggleAccessibilityMode'));
  }

  exportData() {
    const data = {
      portfolio: liveDataService.getCachedData('portfolio'),
      market: liveDataService.getCachedData('market'),
      performance: liveDataService.getCachedData('performance'),
      timestamp: Date.now()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `suggestly-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // Get command suggestions based on context
  getContextualSuggestions(context) {
    const suggestions = [];
    
    switch (context) {
      case 'portfolio':
        suggestions.push(
          this.commands.get('optimize_portfolio'),
          this.commands.get('rebalance_portfolio'),
          this.commands.get('risk_assessment')
        );
        break;
      case 'trading':
        suggestions.push(
          this.commands.get('place_trade'),
          this.commands.get('view_orders'),
          this.commands.get('market_data')
        );
        break;
      case 'analytics':
        suggestions.push(
          this.commands.get('ai_analysis'),
          this.commands.get('generate_report'),
          this.commands.get('performance_metrics')
        );
        break;
      default:
        suggestions.push(
          this.commands.get('dashboard'),
          this.commands.get('ai_analysis'),
          this.commands.get('help')
        );
    }
    
    return suggestions.filter(Boolean);
  }

  // Get command statistics
  getCommandStats() {
    const stats = {
      totalCommands: this.commands.size,
      totalExecutions: 0,
      mostUsed: [],
      recentlyUsed: [],
      categories: {}
    };
    
    for (const command of this.commands.values()) {
      stats.totalExecutions += command.usage;
      
      if (!stats.categories[command.category]) {
        stats.categories[command.category] = 0;
      }
      stats.categories[command.category]++;
    }
    
    // Get most used commands
    stats.mostUsed = Array.from(this.commands.values())
      .sort((a, b) => b.usage - a.usage)
      .slice(0, 5);
    
    // Get recently used commands
    stats.recentlyUsed = this.history.slice(0, 5);
    
    return stats;
  }
}

// Create singleton instance
const commandPaletteService = new CommandPaletteService();

export default commandPaletteService;
