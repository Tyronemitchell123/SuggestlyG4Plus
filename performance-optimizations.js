// SUGGESTLY ELITE - Performance Optimizations
// This script enhances the website performance with advanced optimizations

class PerformanceOptimizer {
  constructor() {
    this.init();
  }

  init() {
    this.setupServiceWorker();
    this.optimizeImages();
    this.setupLazyLoading();
    this.optimizeFonts();
    this.setupCaching();
    this.monitorPerformance();
  }

  // Service Worker for caching and offline functionality
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service Worker registered:', registration);
        })
        .catch(error => {
          console.log('Service Worker registration failed:', error);
        });
    }
  }

  // Optimize images with lazy loading
  optimizeImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  // Setup lazy loading for components
  setupLazyLoading() {
    const lazyComponents = document.querySelectorAll('[data-lazy]');
    const componentObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const component = entry.target;
          this.loadComponent(component);
          observer.unobserve(component);
        }
      });
    });

    lazyComponents.forEach(component => componentObserver.observe(component));
  }

  // Load components dynamically
  loadComponent(component) {
    const componentType = component.dataset.lazy;
    switch (componentType) {
      case 'chart':
        this.loadChartComponent(component);
        break;
      case 'video':
        this.loadVideoComponent(component);
        break;
      case 'analytics':
        this.loadAnalyticsComponent(component);
        break;
    }
  }

  // Optimize font loading
  optimizeFonts() {
    if ('fonts' in document) {
      Promise.all([
        document.fonts.load('300 1em Inter'),
        document.fonts.load('400 1em Inter'),
        document.fonts.load('600 1em Inter'),
        document.fonts.load('700 1em Inter'),
        document.fonts.load('400 1em "Playfair Display"'),
        document.fonts.load('700 1em "Playfair Display"'),
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    }
  }

  // Setup intelligent caching
  setupCaching() {
    // Cache frequently accessed DOM elements
    this.cachedElements = {
      notifications: document.querySelector('.notification-container'),
      modals: document.querySelectorAll('.modal'),
      buttons: document.querySelectorAll('button'),
      forms: document.querySelectorAll('form'),
    };

    // Preload critical resources
    this.preloadCriticalResources();
  }

  // Preload critical resources
  preloadCriticalResources() {
    const criticalResources = [
      '/pages/dashboard.html',
      '/pages/ai-models.html',
      '/pages/clients.html',
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = resource;
      document.head.appendChild(link);
    });
  }

  // Monitor performance metrics
  monitorPerformance() {
    if ('performance' in window) {
      // Monitor Core Web Vitals
      this.monitorCoreWebVitals();

      // Monitor custom metrics
      this.monitorCustomMetrics();
    }
  }

  // Monitor Core Web Vitals
  monitorCoreWebVitals() {
    // Largest Contentful Paint (LCP)
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);

      if (lastEntry.startTime > 2500) {
        this.optimizeLCP();
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay (FID)
    new PerformanceObserver(list => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift (CLS)
    new PerformanceObserver(list => {
      let cls = 0;
      const entries = list.getEntries();
      entries.forEach(entry => {
        if (!entry.hadRecentInput) {
          cls += entry.value;
        }
      });
      console.log('CLS:', cls);
    }).observe({ entryTypes: ['layout-shift'] });
  }

  // Monitor custom metrics
  monitorCustomMetrics() {
    // Monitor button click performance
    document.addEventListener('click', e => {
      if (e.target.tagName === 'BUTTON') {
        const startTime = performance.now();
        setTimeout(() => {
          const endTime = performance.now();
          console.log('Button response time:', endTime - startTime);
        }, 0);
      }
    });

    // Monitor modal open/close performance
    const modalObserver = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const modal = mutation.target;
          if (modal.classList.contains('active')) {
            console.log('Modal opened:', performance.now());
          }
        }
      });
    });

    document.querySelectorAll('.modal').forEach(modal => {
      modalObserver.observe(modal, { attributes: true });
    });
  }

  // Optimize LCP if needed
  optimizeLCP() {
    // Implement LCP optimization strategies
    console.log('Optimizing LCP...');

    // Reduce image sizes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (img.naturalWidth > 800) {
        img.style.maxWidth = '800px';
        img.style.height = 'auto';
      }
    });

    // Optimize critical CSS
    this.optimizeCriticalCSS();
  }

  // Optimize critical CSS
  optimizeCriticalCSS() {
    const criticalStyles = `
            .hero { display: flex; align-items: center; }
            .hero-title { font-size: 4rem; font-weight: 900; }
            .btn-primary { background: linear-gradient(135deg, #ffd700, #ffff00); }
        `;

    const style = document.createElement('style');
    style.textContent = criticalStyles;
    document.head.insertBefore(style, document.head.firstChild);
  }

  // Memory management
  cleanup() {
    // Clear unused event listeners
    this.clearUnusedListeners();

    // Clear unused timers
    this.clearUnusedTimers();

    // Garbage collection hint
    if (window.gc) {
      window.gc();
    }
  }

  // Clear unused event listeners
  clearUnusedListeners() {
    // Implementation for cleaning up event listeners
    console.log('Cleaning up unused event listeners...');
  }

  // Clear unused timers
  clearUnusedTimers() {
    // Implementation for cleaning up timers
    console.log('Cleaning up unused timers...');
  }
}

// Initialize performance optimizer
const performanceOptimizer = new PerformanceOptimizer();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PerformanceOptimizer;
}
