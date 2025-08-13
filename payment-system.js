// SUGGESTLY ELITE - Advanced Payment Processing System
// Integrated with Stripe for secure payment processing

class SUGGESTLYPaymentSystem {
    constructor() {
        this.stripe = Stripe('pk_test_your_stripe_publishable_key'); // Replace with your actual key
        this.elements = null;
        this.paymentElement = null;
        this.currentPlan = null;
        this.clientSecret = null;
        
        this.plans = {
            'premium-ai': {
                id: 'premium-ai',
                name: 'Premium AI Services',
                price: 1800,
                currency: 'usd',
                interval: 'month',
                features: [
                    'Advanced AI Agents',
                    'Neural Network Optimization',
                    'Predictive Analytics',
                    '24/7 Support'
                ]
            },
            'elite-platform': {
                id: 'elite-platform',
                name: 'Elite AI Platform',
                price: 5000,
                currency: 'usd',
                interval: 'month',
                features: [
                    'Quantum AI Development',
                    'Custom Neural Networks',
                    'Enterprise Integration',
                    'Dedicated AI Strategist'
                ]
            },
            'quantum-ai': {
                id: 'quantum-ai',
                name: 'Quantum AI Development',
                price: 15000,
                currency: 'usd',
                interval: 'month',
                features: [
                    'Quantum Computing Integration',
                    'Advanced ML Models',
                    'Custom AI Solutions',
                    'Executive Consultation'
                ]
            },
            'ultimate-elite': {
                id: 'ultimate-elite',
                name: 'Ultimate Elite Package',
                price: 50000,
                currency: 'usd',
                interval: 'month',
                features: [
                    'Full AI Transformation',
                    'Custom Development',
                    'Priority Support',
                    'Executive Team Access'
                ]
            }
        };
        
        this.initializePaymentSystem();
    }

    async initializePaymentSystem() {
        try {
            // Initialize Stripe Elements
            this.elements = this.stripe.elements({
                clientSecret: await this.createPaymentIntent(),
                appearance: {
                    theme: 'night',
                    variables: {
                        colorPrimary: '#ffd700',
                        colorBackground: '#1a1a1a',
                        colorText: '#ffffff',
                        colorDanger: '#ef4444',
                        fontFamily: 'Inter, sans-serif',
                        spacingUnit: '4px',
                        borderRadius: '8px'
                    }
                }
            });

            // Create payment element
            this.paymentElement = this.elements.create('payment');
            
            // Mount payment element
            const paymentContainer = document.getElementById('payment-element');
            if (paymentContainer) {
                this.paymentElement.mount(paymentContainer);
            }

            console.log('✅ SUGGESTLY Payment System Initialized');
        } catch (error) {
            console.error('❌ Payment System Initialization Failed:', error);
            this.handlePaymentError(error);
        }
    }

    async createPaymentIntent(planId = null) {
        try {
            const plan = planId ? this.plans[planId] : this.plans['premium-ai'];
            
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: plan.id,
                    amount: plan.price * 100, // Convert to cents
                    currency: plan.currency,
                    metadata: {
                        plan_name: plan.name,
                        customer_email: this.getCustomerEmail(),
                        subscription_type: 'elite_ai_services'
                    }
                })
            });

            const data = await response.json();
            this.clientSecret = data.clientSecret;
            return data.clientSecret;
        } catch (error) {
            console.error('❌ Payment Intent Creation Failed:', error);
            throw error;
        }
    }

    async processPayment(formData) {
        try {
            this.showPaymentProcessing();

            const { error } = await this.stripe.confirmPayment({
                elements: this.elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment-success`,
                    payment_method_data: {
                        billing_details: {
                            name: formData.get('firstName') + ' ' + formData.get('lastName'),
                            email: formData.get('email'),
                            phone: formData.get('phone')
                        }
                    },
                    receipt_email: formData.get('email')
                }
            });

            if (error) {
                this.handlePaymentError(error);
            } else {
                this.handlePaymentSuccess();
            }
        } catch (error) {
            console.error('❌ Payment Processing Failed:', error);
            this.handlePaymentError(error);
        }
    }

    async createSubscription(planId, customerData) {
        try {
            const plan = this.plans[planId];
            
            const response = await fetch('/api/create-subscription', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    planId: plan.id,
                    customerData: customerData,
                    metadata: {
                        company: customerData.company,
                        position: customerData.position,
                        revenue: customerData.revenue,
                        requirements: customerData.requirements
                    }
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('❌ Subscription Creation Failed:', error);
            throw error;
        }
    }

    showPaymentProcessing() {
        const submitButton = document.getElementById('payment-submit');
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.innerHTML = `
                <i class="fas fa-spinner fa-spin"></i>
                Processing Payment...
            `;
        }

        // Show processing overlay
        this.showProcessingOverlay();
    }

    showProcessingOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'payment-processing-overlay';
        overlay.innerHTML = `
            <div class="processing-content">
                <div class="processing-spinner">
                    <i class="fas fa-cog fa-spin"></i>
                </div>
                <h3>Processing Your Elite Subscription</h3>
                <p>Please wait while we secure your payment...</p>
                <div class="processing-steps">
                    <div class="step active">
                        <i class="fas fa-check-circle"></i>
                        <span>Validating Payment</span>
                    </div>
                    <div class="step">
                        <i class="fas fa-circle"></i>
                        <span>Creating Subscription</span>
                    </div>
                    <div class="step">
                        <i class="fas fa-circle"></i>
                        <span>Activating Services</span>
                    </div>
                </div>
            </div>
        `;
        
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            backdrop-filter: blur(10px);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
        `;

        document.body.appendChild(overlay);
    }

    hideProcessingOverlay() {
        const overlay = document.getElementById('payment-processing-overlay');
        if (overlay) {
            overlay.remove();
        }
    }

    handlePaymentSuccess() {
        this.hideProcessingOverlay();
        
        // Show success modal
        this.showSuccessModal();
        
        // Track conversion
        this.trackConversion('payment_success');
        
        // Send confirmation email
        this.sendConfirmationEmail();
    }

    handlePaymentError(error) {
        this.hideProcessingOverlay();
        
        const errorMessage = this.getErrorMessage(error);
        
        // Show error modal
        this.showErrorModal(errorMessage);
        
        // Track error
        this.trackConversion('payment_error', { error: error.type });
        
        // Reset payment form
        this.resetPaymentForm();
    }

    getErrorMessage(error) {
        const errorMessages = {
            'card_error': 'Your card was declined. Please try a different payment method.',
            'validation_error': 'Please check your payment information and try again.',
            'rate_limit_error': 'Too many payment attempts. Please try again later.',
            'invalid_request_error': 'Invalid payment request. Please contact support.',
            'authentication_error': 'Payment authentication failed. Please try again.',
            'api_error': 'Payment service temporarily unavailable. Please try again.',
            'card_declined': 'Your card was declined. Please try a different payment method.',
            'expired_card': 'Your card has expired. Please update your payment method.',
            'incorrect_cvc': 'Incorrect security code. Please check and try again.',
            'processing_error': 'Payment processing failed. Please try again.',
            'insufficient_funds': 'Insufficient funds. Please try a different payment method.'
        };

        return errorMessages[error.type] || errorMessages[error.code] || 'Payment failed. Please try again.';
    }

    showSuccessModal() {
        const modal = document.createElement('div');
        modal.className = 'payment-success-modal';
        modal.innerHTML = `
            <div class="success-content">
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h2>🎉 Elite Subscription Activated!</h2>
                <p>Welcome to SUGGESTLY ELITE. Your advanced AI transformation begins now.</p>
                
                <div class="success-details">
                    <div class="detail-item">
                        <i class="fas fa-rocket"></i>
                        <span>Your AI services are being activated</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-envelope"></i>
                        <span>Confirmation email sent</span>
                    </div>
                    <div class="detail-item">
                        <i class="fas fa-user-tie"></i>
                        <span>AI strategist will contact you within 2 hours</span>
                    </div>
                </div>
                
                <div class="success-actions">
                    <button onclick="window.location.href='/dashboard'" class="dashboard-btn">
                        <i class="fas fa-chart-line"></i>
                        Access Dashboard
                    </button>
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="close-btn">
                        Continue
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    showErrorModal(message) {
        const modal = document.createElement('div');
        modal.className = 'payment-error-modal';
        modal.innerHTML = `
            <div class="error-content">
                <div class="error-icon">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h2>Payment Failed</h2>
                <p>${message}</p>
                
                <div class="error-actions">
                    <button onclick="this.parentElement.parentElement.parentElement.remove()" class="retry-btn">
                        Try Again
                    </button>
                    <button onclick="window.location.href='/contact'" class="support-btn">
                        Contact Support
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    resetPaymentForm() {
        const submitButton = document.getElementById('payment-submit');
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = 'START FREE TRIAL';
        }
    }

    getCustomerEmail() {
        const emailInput = document.getElementById('email');
        return emailInput ? emailInput.value : '';
    }

    trackConversion(event, data = {}) {
        // Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', event, {
                'plan_name': this.currentPlan?.name,
                'plan_price': this.currentPlan?.price,
                ...data
            });
        }

        // Custom analytics
        this.sendAnalyticsData(event, data);
    }

    async sendAnalyticsData(event, data) {
        try {
            await fetch('/api/analytics', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    event: event,
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    referrer: document.referrer,
                    ...data
                })
            });
        } catch (error) {
            console.error('Analytics tracking failed:', error);
        }
    }

    async sendConfirmationEmail() {
        try {
            await fetch('/api/send-confirmation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.getCustomerEmail(),
                    planName: this.currentPlan?.name,
                    planPrice: this.currentPlan?.price
                })
            });
        } catch (error) {
            console.error('Confirmation email failed:', error);
        }
    }

    // Utility methods
    formatCurrency(amount, currency = 'USD') {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    validatePaymentForm(formData) {
        const required = ['firstName', 'lastName', 'email', 'phone', 'company'];
        const errors = [];

        required.forEach(field => {
            if (!formData.get(field)) {
                errors.push(`${field} is required`);
            }
        });

        const email = formData.get('email');
        if (email && !this.isValidEmail(email)) {
            errors.push('Invalid email address');
        }

        return errors;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}

// Initialize payment system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.suggestlyPayment = new SUGGESTLYPaymentSystem();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SUGGESTLYPaymentSystem;
}
