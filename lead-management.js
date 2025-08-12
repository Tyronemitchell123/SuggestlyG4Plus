// Enhanced Lead Management System for SUGGESTLY ELITE
// Advanced lead tracking, qualification, and follow-up automation

class EliteLeadManagement {
    constructor() {
        this.leads = [];
        this.leadQualification = {
            hot: [],
            warm: [],
            cold: []
        };
        this.followUpSchedule = [];
        this.isInitialized = false;
    }

    // Initialize lead management
    async initialize() {
        try {
            this.loadStoredLeads();
            this.setupLeadTracking();
            this.createLeadDashboard();
            this.startFollowUpAutomation();
            this.isInitialized = true;
            console.log('Lead Management System initialized');
        } catch (error) {
            console.error('Failed to initialize lead management:', error);
        }
    }

    // Load stored leads from localStorage
    loadStoredLeads() {
        const storedLeads = localStorage.getItem('elite_leads');
        if (storedLeads) {
            this.leads = JSON.parse(storedLeads);
            this.categorizeLeads();
        }
    }

    // Setup lead tracking
    setupLeadTracking() {
        // Listen for subscription requests
        document.addEventListener('subscription_request', (event) => {
            const leadData = event.detail;
            this.addLead(leadData);
        });

        // Track form interactions
        document.addEventListener('form_interaction', (event) => {
            const formData = event.detail;
            this.trackFormEngagement(formData);
        });
    }

    // Add new lead
    addLead(leadData) {
        const lead = {
            id: this.generateLeadId(),
            ...leadData,
            status: 'new',
            quality: this.calculateLeadQuality(leadData),
            category: this.categorizeLead(leadData),
            timestamp: new Date().toISOString(),
            followUpDate: this.calculateFollowUpDate(leadData),
            interactions: [],
            notes: []
        };

        this.leads.push(lead);
        this.categorizeLeads();
        this.saveLeads();
        this.updateLeadDashboard();
        this.scheduleFollowUp(lead);

        // Send lead notification
        this.sendLeadNotification(lead);

        console.log('New lead added:', lead);
    }

    // Calculate lead quality score
    calculateLeadQuality(leadData) {
        let score = 0;
        
        // Revenue scoring (0-50 points)
        const revenueScores = {
            'Over $1B': 50,
            '$500M - $1B': 40,
            '$100M - $500M': 30,
            '$50M - $100M': 20,
            '$10M - $50M': 10,
            '$1M - $10M': 5
        };
        score += revenueScores[leadData.revenue] || 0;
        
        // Position scoring (0-30 points)
        const position = leadData.position?.toLowerCase() || '';
        if (position.includes('ceo') || position.includes('president')) score += 30;
        else if (position.includes('executive') || position.includes('vp')) score += 20;
        else if (position.includes('director') || position.includes('manager')) score += 15;
        else if (position.includes('head') || position.includes('lead')) score += 10;
        
        // Company size scoring (0-20 points)
        if (leadData.company && leadData.company.length > 0) {
            if (leadData.company.length > 20) score += 20;
            else if (leadData.company.length > 10) score += 15;
            else score += 10;
        }
        
        return Math.min(score, 100);
    }

    // Categorize lead
    categorizeLead(leadData) {
        const quality = this.calculateLeadQuality(leadData);
        
        if (quality >= 80) return 'hot';
        else if (quality >= 50) return 'warm';
        else return 'cold';
    }

    // Categorize all leads
    categorizeLeads() {
        this.leadQualification = {
            hot: this.leads.filter(lead => lead.category === 'hot'),
            warm: this.leads.filter(lead => lead.category === 'warm'),
            cold: this.leads.filter(lead => lead.category === 'cold')
        };
    }

    // Calculate follow-up date
    calculateFollowUpDate(leadData) {
        const quality = this.calculateLeadQuality(leadData);
        const now = new Date();
        
        if (quality >= 80) {
            // Hot leads: follow up within 1 hour
            return new Date(now.getTime() + 60 * 60 * 1000);
        } else if (quality >= 50) {
            // Warm leads: follow up within 24 hours
            return new Date(now.getTime() + 24 * 60 * 60 * 1000);
        } else {
            // Cold leads: follow up within 3 days
            return new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
        }
    }

    // Schedule follow-up
    scheduleFollowUp(lead) {
        const followUp = {
            leadId: lead.id,
            leadName: `${lead.firstName} ${lead.lastName}`,
            leadEmail: lead.email,
            leadCompany: lead.company,
            followUpDate: lead.followUpDate,
            status: 'scheduled',
            type: lead.category === 'hot' ? 'immediate' : 'scheduled'
        };

        this.followUpSchedule.push(followUp);
        this.saveFollowUpSchedule();
    }

    // Create lead dashboard
    createLeadDashboard() {
        const dashboard = document.createElement('div');
        dashboard.id = 'elite-lead-dashboard';
        dashboard.innerHTML = `
            <div class="lead-dashboard-header">
                <h3>🎯 Lead Management</h3>
                <button onclick="toggleLeadDashboard()" class="lead-dashboard-toggle">📊</button>
            </div>
            <div class="lead-dashboard-content">
                <div class="lead-metric-card hot">
                    <h4>🔥 Hot Leads</h4>
                    <div class="lead-metric-value" id="hot-leads">0</div>
                </div>
                <div class="lead-metric-card warm">
                    <h4>🌡️ Warm Leads</h4>
                    <div class="lead-metric-value" id="warm-leads">0</div>
                </div>
                <div class="lead-metric-card cold">
                    <h4>❄️ Cold Leads</h4>
                    <div class="lead-metric-value" id="cold-leads">0</div>
                </div>
                <div class="lead-metric-card total">
                    <h4>📈 Total Leads</h4>
                    <div class="lead-metric-value" id="total-leads">0</div>
                </div>
                <div class="lead-metric-card followup">
                    <h4>⏰ Follow-ups</h4>
                    <div class="lead-metric-value" id="followups">0</div>
                </div>
                <div class="lead-metric-card quality">
                    <h4>⭐ Avg Quality</h4>
                    <div class="lead-metric-value" id="avg-quality">0%</div>
                </div>
            </div>
            <div class="lead-list" id="lead-list">
                <h4>Recent Leads</h4>
                <div class="leads-container"></div>
            </div>
        `;
        
        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            #elite-lead-dashboard {
                position: fixed;
                top: 20px;
                left: 20px;
                background: rgba(10, 10, 10, 0.95);
                border: 2px solid var(--luxury-gold);
                border-radius: 12px;
                padding: 1rem;
                z-index: 10000;
                backdrop-filter: blur(10px);
                min-width: 350px;
                max-height: 80vh;
                overflow-y: auto;
                display: none;
            }
            
            .lead-dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                color: var(--luxury-gold);
            }
            
            .lead-dashboard-toggle {
                background: var(--luxury-gold);
                color: #000;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                font-size: 1.2rem;
            }
            
            .lead-dashboard-content {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 0.8rem;
                margin-bottom: 1rem;
            }
            
            .lead-metric-card {
                background: rgba(255, 215, 0, 0.1);
                border: 1px solid rgba(255, 215, 0, 0.3);
                border-radius: 8px;
                padding: 0.8rem;
                text-align: center;
            }
            
            .lead-metric-card.hot {
                border-color: #ff4444;
                background: rgba(255, 68, 68, 0.1);
            }
            
            .lead-metric-card.warm {
                border-color: #ff8800;
                background: rgba(255, 136, 0, 0.1);
            }
            
            .lead-metric-card.cold {
                border-color: #0088ff;
                background: rgba(0, 136, 255, 0.1);
            }
            
            .lead-metric-card h4 {
                color: var(--luxury-gold);
                margin: 0 0 0.5rem 0;
                font-size: 0.8rem;
            }
            
            .lead-metric-value {
                color: #fff;
                font-size: 1.3rem;
                font-weight: bold;
            }
            
            .lead-list {
                border-top: 1px solid rgba(255, 215, 0, 0.3);
                padding-top: 1rem;
            }
            
            .lead-list h4 {
                color: var(--luxury-gold);
                margin: 0 0 0.8rem 0;
            }
            
            .leads-container {
                max-height: 200px;
                overflow-y: auto;
            }
            
            .lead-item {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 215, 0, 0.2);
                border-radius: 6px;
                padding: 0.6rem;
                margin-bottom: 0.5rem;
                font-size: 0.8rem;
            }
            
            .lead-item .lead-name {
                color: var(--luxury-gold);
                font-weight: bold;
            }
            
            .lead-item .lead-company {
                color: #ccc;
            }
            
            .lead-item .lead-quality {
                color: #00ff00;
                font-size: 0.7rem;
            }
            
            @media (max-width: 768px) {
                #elite-lead-dashboard {
                    top: 10px;
                    left: 10px;
                    right: 10px;
                    min-width: auto;
                }
                
                .lead-dashboard-content {
                    grid-template-columns: 1fr;
                }
            }
        `;
        
        document.head.appendChild(styles);
        document.body.appendChild(dashboard);
    }

    // Update lead dashboard
    updateLeadDashboard() {
        const dashboard = document.getElementById('elite-lead-dashboard');
        if (!dashboard) return;
        
        // Update metrics
        document.getElementById('hot-leads').textContent = this.leadQualification.hot.length;
        document.getElementById('warm-leads').textContent = this.leadQualification.warm.length;
        document.getElementById('cold-leads').textContent = this.leadQualification.cold.length;
        document.getElementById('total-leads').textContent = this.leads.length;
        document.getElementById('followups').textContent = this.followUpSchedule.length;
        
        // Calculate average quality
        const avgQuality = this.leads.length > 0 
            ? (this.leads.reduce((sum, lead) => sum + lead.quality, 0) / this.leads.length).toFixed(0)
            : 0;
        document.getElementById('avg-quality').textContent = avgQuality + '%';
        
        // Update recent leads list
        this.updateRecentLeads();
    }

    // Update recent leads list
    updateRecentLeads() {
        const container = document.querySelector('.leads-container');
        if (!container) return;
        
        const recentLeads = this.leads.slice(-5).reverse(); // Last 5 leads
        container.innerHTML = '';
        
        recentLeads.forEach(lead => {
            const leadItem = document.createElement('div');
            leadItem.className = 'lead-item';
            leadItem.innerHTML = `
                <div class="lead-name">${lead.firstName} ${lead.lastName}</div>
                <div class="lead-company">${lead.company}</div>
                <div class="lead-quality">Quality: ${lead.quality}%</div>
            `;
            container.appendChild(leadItem);
        });
    }

    // Start follow-up automation
    startFollowUpAutomation() {
        setInterval(() => {
            this.checkFollowUps();
        }, 60000); // Check every minute
    }

    // Check follow-ups
    checkFollowUps() {
        const now = new Date();
        const dueFollowUps = this.followUpSchedule.filter(followUp => 
            new Date(followUp.followUpDate) <= now && followUp.status === 'scheduled'
        );
        
        dueFollowUps.forEach(followUp => {
            this.sendFollowUpNotification(followUp);
            followUp.status = 'sent';
        });
        
        this.saveFollowUpSchedule();
    }

    // Send lead notification
    sendLeadNotification(lead) {
        const subject = `🔥 New ${lead.category.toUpperCase()} Lead - ${lead.firstName} ${lead.lastName}`;
        const body = `
New Lead Details:
- Name: ${lead.firstName} ${lead.lastName}
- Email: ${lead.email}
- Company: ${lead.company}
- Position: ${lead.position}
- Revenue: ${lead.revenue}
- Quality Score: ${lead.quality}%
- Category: ${lead.category}
- Service: ${lead.planName}
- Follow-up Date: ${new Date(lead.followUpDate).toLocaleString()}

Requirements:
${lead.requirements}

---
Generated by SUGGESTLY ELITE Lead Management System
        `;
        
        const mailtoLink = `mailto:tyrone.mitchell76@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink);
    }

    // Send follow-up notification
    sendFollowUpNotification(followUp) {
        const subject = `⏰ Follow-up Due - ${followUp.leadName}`;
        const body = `
Follow-up Required:
- Lead: ${followUp.leadName}
- Company: ${followUp.leadCompany}
- Email: ${followUp.leadEmail}
- Due Date: ${new Date(followUp.followUpDate).toLocaleString()}

Action Required: Contact this lead to discuss their AI transformation needs.

---
SUGGESTLY ELITE Lead Management System
        `;
        
        const mailtoLink = `mailto:tyrone.mitchell76@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.open(mailtoLink);
    }

    // Generate lead ID
    generateLeadId() {
        return 'lead_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Save leads to localStorage
    saveLeads() {
        localStorage.setItem('elite_leads', JSON.stringify(this.leads));
    }

    // Save follow-up schedule
    saveFollowUpSchedule() {
        localStorage.setItem('elite_followup_schedule', JSON.stringify(this.followUpSchedule));
    }

    // Export lead data
    exportLeadData() {
        return {
            leads: this.leads,
            qualification: this.leadQualification,
            followUpSchedule: this.followUpSchedule,
            timestamp: new Date().toISOString()
        };
    }
}

// Initialize lead management when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.eliteLeadManagement = new EliteLeadManagement();
    window.eliteLeadManagement.initialize();
});

// Toggle lead dashboard visibility
function toggleLeadDashboard() {
    const dashboard = document.getElementById('elite-lead-dashboard');
    if (dashboard) {
        dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
    }
}

// Export for use in main application
window.EliteLeadManagement = EliteLeadManagement;
