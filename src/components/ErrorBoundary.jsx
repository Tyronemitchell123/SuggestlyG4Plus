import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }

    // In production, you would send this to your error reporting service
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleRetry = () => {
    this.setState(prevState => ({
      hasError: false,
      error: null,
      errorInfo: null,
      retryCount: prevState.retryCount + 1
    }));
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  handleGoBack = () => {
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-luxury-darker via-luxury-dark to-luxury-darker flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-glass backdrop-blur-md border border-luxury-gold/20 rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 bg-red-500/20 border border-red-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </div>
            
            <h1 className="text-2xl font-display font-bold text-luxury-light mb-4">
              Something went wrong
            </h1>
            
            <p className="text-luxury-gray mb-6">
              We encountered an unexpected error. Our team has been notified and is working to resolve this issue.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="text-sm text-luxury-gold cursor-pointer mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-luxury-dark/50 rounded-lg p-4 text-xs font-mono text-red-400 overflow-auto max-h-32">
                  <div className="mb-2">
                    <strong>Error:</strong> {this.state.error.toString()}
                  </div>
                  {this.state.errorInfo && (
                    <div>
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            <div className="space-y-3">
              <button
                onClick={this.handleRetry}
                className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-luxury-gold to-yellow-500 text-black font-medium py-3 px-4 rounded-xl hover:scale-105 transition-transform duration-300"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Try Again</span>
              </button>
              
              <div className="flex space-x-3">
                <button
                  onClick={this.handleGoBack}
                  className="flex-1 flex items-center justify-center space-x-2 bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-gold font-medium py-3 px-4 rounded-xl hover:bg-luxury-gold/30 transition-colors duration-300"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Go Back</span>
                </button>
                
                <button
                  onClick={this.handleGoHome}
                  className="flex-1 flex items-center justify-center space-x-2 bg-luxury-gold/20 border border-luxury-gold/30 text-luxury-gold font-medium py-3 px-4 rounded-xl hover:bg-luxury-gold/30 transition-colors duration-300"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </button>
              </div>
            </div>

            {this.state.retryCount > 0 && (
              <p className="text-xs text-luxury-gray mt-4">
                Retry attempt: {this.state.retryCount}
              </p>
            )}
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
