// Advanced Analytics Dashboard for SUGGESTLY ELITE
// Real-time business intelligence and conversion tracking

class EliteAnalyticsDashboard {
    constructor() {
        this.metrics = {
            pageViews: 0,
            uniqueVisitors: 0,
            conversions: 0,
            conversionRate: 0,
            averageTimeOnSite: 0,
            mobileUsage: 0,
            desktopUsage: 0,
            topServices: [],
            leadQuality: []
        };
        this.isInitialized = false;
    }

    // Initialize dashboard
    async initialize() {
        try {
            this.setupRealTimeTracking();
            this.createDashboardUI();
            this.startMetricsCollection();
            this.isInitialized = true;
            console.log('Analytics Dashboard initialized');
        } catch (error) {
            console.error('Failed to initialize analytics dashboard:', error);
        }
    }

    // Setup real-time tracking
    setupRealTimeTracking() {
        // Track page views
        this.trackPageView();
        
        // Track unique visitors
        this.trackUniqueVisitors();
        
        // Track conversions
        this.trackConversions();
        
        // Track device usage
        this.trackDeviceUsage();
        
        // Track service popularity
        this.trackServicePopularity();
    }

    // Track page views
    trackPageView() {
        this.metrics.pageViews++;
        this.updateDashboard();
        
        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href
            });
        }
    }

    // Track unique visitors
    trackUniqueVisitors() {
        const visitorId = this.getVisitorId();
        const storedVisitors = JSON.parse(localStorage.getItem('elite_unique_visitors') || '[]');
        
        if (!storedVisitors.includes(visitorId)) {
            storedVisitors.push(visitorId);
            localStorage.setItem('elite_unique_visitors', JSON.stringify(storedVisitors));
            this.metrics.uniqueVisitors = storedVisitors.length;
        }
    }

    // Track conversions
    trackConversions() {
        document.addEventListener('subscription_request', (event) => {
            this.metrics.conversions++;
            this.metrics.conversionRate = (this.metrics.conversions / this.metrics.pageViews * 100).toFixed(2);
            
            // Track lead quality
            const leadData = event.detail;
            this.trackLeadQuality(leadData);
            
            this.updateDashboard();
        });
    }

    // Track device usage
    trackDeviceUsage() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            this.metrics.mobileUsage++;
        } else {
            this.metrics.desktopUsage++;
        }
    }

    // Track service popularity
    trackServicePopularity() {
        document.addEventListener('service_button_click', (event) => {
            const serviceName = event.detail.serviceName;
            const existingService = this.metrics.topServices.find(s => s.name === serviceName);
            
            if (existingService) {
                existingService.clicks++;
            } else {
                this.metrics.topServices.push({
                    name: serviceName,
                    clicks: 1
                });
            }
            
            // Sort by popularity
            this.metrics.topServices.sort((a, b) => b.clicks - a.clicks);
            this.updateDashboard();
        });
    }

    // Track lead quality
    trackLeadQuality(leadData) {
        const quality = this.calculateLeadQuality(leadData);
        this.metrics.leadQuality.push({
            email: leadData.email,
            company: leadData.company,
            revenue: leadData.revenue,
            quality: quality,
            timestamp: new Date().toISOString()
        });
    }

    // Calculate lead quality score
    calculateLeadQuality(leadData) {
        let score = 0;
        
        // Revenue-based scoring
        if (leadData.revenue === 'Over $1B') score += 100;
        else if (leadData.revenue === '$500M - $1B') score += 80;
        else if (leadData.revenue === '$100M - $500M') score += 60;
        else if (leadData.revenue === '$50M - $100M') score += 40;
        else if (leadData.revenue === '$10M - $50M') score += 20;
        
        // Company size scoring
        if (leadData.company && leadData.company.length > 0) score += 10;
        
        // Position scoring
        if (leadData.position && leadData.position.toLowerCase().includes('ceo')) score += 20;
        else if (leadData.position && leadData.position.toLowerCase().includes('executive')) score += 15;
        else if (leadData.position && leadData.position.toLowerCase().includes('director')) score += 10;
        
        return Math.min(score, 100);
    }

    // Create dashboard UI
    createDashboardUI() {
        const dashboard = document.createElement('div');
        dashboard.id = 'elite-analytics-dashboard';
        dashboard.innerHTML = `
            <div class="dashboard-header">
                <h3>📊 SUGGESTLY ELITE Analytics</h3>
                <button onclick="toggleDashboard()" class="dashboard-toggle">📈</button>
            </div>
            <div class="dashboard-content">
                <div class="metric-card">
                    <h4>Page Views</h4>
                    <div class="metric-value" id="page-views">0</div>
                </div>
                <div class="metric-card">
                    <h4>Unique Visitors</h4>
                    <div class="metric-value" id="unique-visitors">0</div>
                </div>
                <div class="metric-card">
                    <h4>Conversions</h4>
                    <div class="metric-value" id="conversions">0</div>
                </div>
                <div class="metric-card">
                    <h4>Conversion Rate</h4>
                    <div class="metric-value" id="conversion-rate">0%</div>
                </div>
                <div class="metric-card">
                    <h4>Top Service</h4>
                    <div class="metric-value" id="top-service">-</div>
                </div>
                <div class="metric-card">
                    <h4>Lead Quality</h4>
                    <div class="metric-value" id="lead-quality">-</div>
                </div>
            </div>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            #elite-analytics-dashboard {
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(10, 10, 10, 0.95);
                border: 2px solid var(--luxury-gold);
                border-radius: 12px;
                padding: 1rem;
                z-index: 10000;
                backdrop-filter: blur(10px);
                min-width: 300px;
                display: none;
            }
            
            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                color: var(--luxury-gold);
            }
            
            .dashboard-toggle {
                background: var(--luxury-gold);
                color: #000;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                font-size: 1.2rem;
            }
            
            .dashboard-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1rem;
            }
            
            .metric-card {
                background: rgba(255, 215, 0, 0.1);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 8px;
                padding: 0.8rem;
                text-align: center;
            }
            
            .metric-card h4 {
                color: var(--luxury-gold);
                margin: 0 0 0.5rem 0;
                font-size: 0.9rem;
            }
            
            .metric-value {
                color: #fff;
                font-size: 1.5rem;
                font-weight: bold;
            }
            
            @media (max-width: 768px) {
                #elite-analytics-dashboard {
                    top: 10px;
                    right: 10px;
                    left: 10px;
                    min-width: auto;
                }
                
                .dashboard-content {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(dashboard);
    }

    // Update dashboard display
    updateDashboard() {
        const dashboard = document.getElementById('elite-analytics-dashboard');
        if (!dashboard) return;
        
        // Update metrics
        document.getElementById('page-views').textContent = this.metrics.pageViews;
        document.getElementById('unique-visitors').textContent = this.metrics.uniqueVisitors;
        document.getElementById('conversions').textContent = this.metrics.conversions;
        document.getElementById('conversion-rate').textContent = this.metrics.conversionRate + '%';
        
        // Update top service
        const topService = this.metrics.topServices[0];
        document.getElementById('top-service').textContent = topService ? topService.name : '-';
        
        // Update lead quality
        const avgQuality = this.metrics.leadQuality.length > 0 
            ? (this.metrics.leadQuality.reduce((sum, lead) => sum + lead.quality, 0) / this.metrics.leadQuality.length).toFixed(0)
            : '-';
        document.getElementById('lead-quality').textContent = avgQuality + (avgQuality !== '-' ? '%' : '');
    }

    // Start metrics collection
    startMetricsCollection() {
        // Track time on site
        setInterval(() => {
            this.metrics.averageTimeOnSite++;
            this.updateDashboard();
        }, 1000);
        
        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                if (maxScroll >= 100) {
                    this.trackFullScroll();
                }
            }
        });
    }

    // Track full scroll
    trackFullScroll() {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_complete', {
                page: window.location.pathname
            });
        }
    }

    // Get visitor ID
    getVisitorId() {
        let visitorId = localStorage.getItem('elite_visitor_id');
        if (!visitorId) {
            visitorId = 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('elite_visitor_id', visitorId);
        }
        return visitorId;
    }

    // Export analytics data
    exportData() {
        return {
            metrics: this.metrics,
            timestamp: new Date().toISOString(),
            sessionId: this.getVisitorId()
        };
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.eliteDashboard = new EliteAnalyticsDashboard();
    window.eliteDashboard.initialize();
});

// Toggle dashboard visibility
function toggleDashboard() {
    const dashboard = document.getElementById('elite-analytics-dashboard');
    if (dashboard) {
        dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
    }
}

// Export for use in main application
window.EliteAnalyticsDashboard = EliteAnalyticsDashboard;
