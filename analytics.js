// Analytics and Tracking System for SUGGESTLY ELITE
// Comprehensive tracking for conversions, user behavior, and business intelligence

class EliteAnalytics {
    constructor() {
        this.events = [];
        this.userSession = this.generateSessionId();
        this.startTime = Date.now();
        this.pageViews = 0;
        this.conversions = 0;
        this.isInitialized = false;
    }

    // Initialize analytics
    async initialize() {
        try {
            // Initialize Google Analytics if available
            if (typeof gtag !== 'undefined') {
                this.trackPageView();
                this.setupEventListeners();
                this.isInitialized = true;
                console.log('Analytics initialized successfully');
            } else {
                console.warn('Google Analytics not available, using local tracking');
                this.setupLocalTracking();
            }
        } catch (error) {
            console.error('Failed to initialize analytics:', error);
        }
    }

    // Generate unique session ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Track page view
    trackPageView(page = window.location.pathname) {
        this.pageViews++;
        
        const pageViewData = {
            event: 'page_view',
            page: page,
            timestamp: new Date().toISOString(),
            sessionId: this.userSession,
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };

        this.events.push(pageViewData);

        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
                page_path: page
            });
        }

        // Send to local analytics endpoint
        this.sendToAnalyticsEndpoint(pageViewData);
    }

    // Track subscription request
    trackSubscriptionRequest(subscriptionData) {
        this.conversions++;
        
        const conversionData = {
            event: 'subscription_request',
            timestamp: new Date().toISOString(),
            sessionId: this.userSession,
            planName: subscriptionData.planName,
            planPrice: subscriptionData.price,
            trialPeriod: subscriptionData.trialPeriod,
            userEmail: subscriptionData.email,
            companyRevenue: subscriptionData.revenue,
            pageViews: this.pageViews,
            timeOnSite: Date.now() - this.startTime
        };

        this.events.push(conversionData);

        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'subscription_request', {
                plan_name: subscriptionData.planName,
                plan_price: subscriptionData.price,
                trial_period: subscriptionData.trialPeriod,
                currency: 'USD',
                value: subscriptionData.price
            });
        }

        // Send to local analytics endpoint
        this.sendToAnalyticsEndpoint(conversionData);
    }

    // Track button clicks
    trackButtonClick(buttonId, buttonText, section) {
        const clickData = {
            event: 'button_click',
            timestamp: new Date().toISOString(),
            sessionId: this.userSession,
            buttonId: buttonId,
            buttonText: buttonText,
            section: section,
            page: window.location.pathname
        };

        this.events.push(clickData);

        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                button_id: buttonId,
                button_text: buttonText,
                section: section
            });
        }
    }

    // Track form interactions
    trackFormInteraction(formId, action, fieldName = null) {
        const formData = {
            event: 'form_interaction',
            timestamp: new Date().toISOString(),
            sessionId: this.userSession,
            formId: formId,
            action: action,
            fieldName: fieldName,
            page: window.location.pathname
        };

        this.events.push(formData);

        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'form_interaction', {
                form_id: formId,
                action: action,
                field_name: fieldName
            });
        }
    }

    // Track scroll depth
    trackScrollDepth() {
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            
            if (scrollPercent > maxScroll) {
                maxScroll = scrollPercent;
                
                // Track at 25%, 50%, 75%, 100%
                if (maxScroll >= 25 && maxScroll < 50) {
                    this.trackScrollEvent(25);
                } else if (maxScroll >= 50 && maxScroll < 75) {
                    this.trackScrollEvent(50);
                } else if (maxScroll >= 75 && maxScroll < 100) {
                    this.trackScrollEvent(75);
                } else if (maxScroll >= 100) {
                    this.trackScrollEvent(100);
                }
            }
        });
    }

    // Track scroll event
    trackScrollEvent(depth) {
        const scrollData = {
            event: 'scroll_depth',
            timestamp: new Date().toISOString(),
            sessionId: this.userSession,
            depth: depth,
            page: window.location.pathname
        };

        this.events.push(scrollData);

        // Send to Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll_depth', {
                depth: depth
            });
        }
    }

    // Track time on page
    trackTimeOnPage() {
        setInterval(() => {
            const timeOnPage = Math.round((Date.now() - this.startTime) / 1000);
            
            // Track every 30 seconds
            if (timeOnPage % 30 === 0) {
                const timeData = {
                    event: 'time_on_page',
                    timestamp: new Date().toISOString(),
                    sessionId: this.userSession,
                    timeOnPage: timeOnPage,
                    page: window.location.pathname
                };

                this.events.push(timeData);
            }
        }, 1000);
    }

    // Setup event listeners
    setupEventListeners() {
        // Track all button clicks
        document.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const button = event.target;
                const buttonId = button.id || button.className;
                const buttonText = button.textContent.trim();
                const section = this.getSectionFromElement(button);
                
                this.trackButtonClick(buttonId, buttonText, section);
            }
        });

        // Track form interactions
        document.addEventListener('input', (event) => {
            if (event.target.tagName === 'INPUT' || event.target.tagName === 'TEXTAREA' || event.target.tagName === 'SELECT') {
                const form = event.target.closest('form');
                if (form) {
                    this.trackFormInteraction(form.id || 'unknown_form', 'input', event.target.name);
                }
            }
        });

        // Track form submissions
        document.addEventListener('submit', (event) => {
            const form = event.target;
            this.trackFormInteraction(form.id || 'unknown_form', 'submit');
        });

        // Track scroll depth
        this.trackScrollDepth();

        // Track time on page
        this.trackTimeOnPage();
    }

    // Setup local tracking (fallback)
    setupLocalTracking() {
        this.setupEventListeners();
        this.trackScrollDepth();
        this.trackTimeOnPage();
    }

    // Get section from element
    getSectionFromElement(element) {
        const section = element.closest('section');
        if (section) {
            return section.id || section.className;
        }
        return 'unknown';
    }

    // Send data to analytics endpoint
    async sendToAnalyticsEndpoint(data) {
        try {
            // In a real implementation, you would send this to your analytics server
            // For now, we'll store it locally and log it
            console.log('Analytics Event:', data);
            
            // Store in localStorage for persistence
            const storedEvents = JSON.parse(localStorage.getItem('elite_analytics_events') || '[]');
            storedEvents.push(data);
            localStorage.setItem('elite_analytics_events', JSON.stringify(storedEvents));
            
            // Limit stored events to prevent localStorage overflow
            if (storedEvents.length > 1000) {
                storedEvents.splice(0, 500);
                localStorage.setItem('elite_analytics_events', JSON.stringify(storedEvents));
            }
        } catch (error) {
            console.error('Failed to send analytics data:', error);
        }
    }

    // Get analytics summary
    getAnalyticsSummary() {
        return {
            sessionId: this.userSession,
            pageViews: this.pageViews,
            conversions: this.conversions,
            timeOnSite: Date.now() - this.startTime,
            conversionRate: this.pageViews > 0 ? (this.conversions / this.pageViews * 100).toFixed(2) : 0,
            events: this.events.length
        };
    }

    // Export analytics data
    exportAnalyticsData() {
        return {
            summary: this.getAnalyticsSummary(),
            events: this.events,
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize analytics when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.eliteAnalytics = new EliteAnalytics();
    window.eliteAnalytics.initialize();
});

// Export for use in main application
window.EliteAnalytics = EliteAnalytics;
