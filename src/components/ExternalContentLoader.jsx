import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  ExternalLink,
  RefreshCw,
  Loader2,
  AlertTriangle,
  Maximize2,
  Minimize2,
  X,
  Download,
  Share2,
  Eye,
  EyeOff,
} from 'lucide-react';

const ExternalContentLoader = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [content, setContent] = useState('');
  const [contentType, setContentType] = useState('html');
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const iframeRef = useRef(null);

  // Predefined external sites
  const predefinedSites = [
    { name: 'Homepage Preview', url: '/homepage-preview.html', icon: Globe },
    { name: 'Homepage View', url: '/homepage-view.html', icon: Eye },
    { name: 'Google', url: 'https://www.google.com', icon: ExternalLink },
    { name: 'GitHub', url: 'https://github.com', icon: ExternalLink },
    {
      name: 'Stack Overflow',
      url: 'https://stackoverflow.com',
      icon: ExternalLink,
    },
    {
      name: 'MDN Web Docs',
      url: 'https://developer.mozilla.org',
      icon: ExternalLink,
    },
  ];

  const loadContent = async targetUrl => {
    if (!targetUrl) return;

    setIsLoading(true);
    setError('');

    try {
      // Add to history
      const newHistory = [...history, targetUrl];
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);

      // Check if it's a local file
      if (targetUrl.startsWith('/')) {
        const response = await fetch(targetUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        setContent(text);
        setContentType('html');
        setUrl(targetUrl);
      } else {
        // For external URLs, we'll use an iframe
        setUrl(targetUrl);
        setContent('');
        setContentType('iframe');
      }
    } catch (err) {
      setError(`Failed to load content: ${err.message}`);
      console.error('Error loading content:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    loadContent(url);
  };

  const goBack = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      loadContent(history[newIndex]);
    }
  };

  const goForward = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      loadContent(history[newIndex]);
    }
  };

  const refresh = () => {
    if (url) {
      loadContent(url);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const toggleControls = () => {
    setShowControls(!showControls);
  };

  const downloadContent = () => {
    if (content) {
      const blob = new Blob([content], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'downloaded-content.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const shareContent = () => {
    if (navigator.share) {
      navigator.share({
        title: 'External Content',
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      // You could add a toast notification here
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${
        isFullscreen
          ? 'fixed inset-0 z-50 bg-white'
          : 'w-full max-w-7xl mx-auto p-6'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              External Content Loader
            </h1>
            <p className="text-sm text-gray-500">
              Load and view external websites and local content
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={toggleControls}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Toggle Controls"
          >
            {showControls ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
          {isFullscreen && (
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              title="Close Fullscreen"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            {/* URL Input */}
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="url"
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                  placeholder="Enter URL to load (e.g., https://example.com or /local-file.html)"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    'Load'
                  )}
                </button>
              </div>
            </form>

            {/* Navigation Controls */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={goBack}
                  disabled={currentIndex <= 0}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={goForward}
                  disabled={currentIndex >= history.length - 1}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Forward →
                </button>
                <button
                  onClick={refresh}
                  disabled={!url}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={downloadContent}
                  disabled={!content}
                  className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Download Content"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={shareContent}
                  disabled={!url}
                  className="px-3 py-1 text-sm bg-purple-100 text-purple-700 rounded hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  title="Share URL"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Predefined Sites */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Quick Load:
              </h3>
              <div className="flex flex-wrap gap-2">
                {predefinedSites.map((site, index) => {
                  const Icon = site.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => loadContent(site.url)}
                      className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{site.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Display */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg"
          >
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span className="text-red-700">{error}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Display */}
      <div className="relative">
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-2" />
              <p className="text-gray-600">Loading content...</p>
            </div>
          </div>
        )}

        {contentType === 'iframe' && url && (
          <iframe
            ref={iframeRef}
            src={url}
            className="w-full border border-gray-200 rounded-lg"
            style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '600px' }}
            title="External Content"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          />
        )}

        {contentType === 'html' && content && (
          <div
            className="w-full border border-gray-200 rounded-lg bg-white p-4 overflow-auto"
            style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '600px' }}
          >
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}

        {!url && !isLoading && (
          <div className="w-full h-96 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Enter a URL above to load content</p>
              <p className="text-sm text-gray-400 mt-2">
                Try one of the quick load options or enter a custom URL
              </p>
            </div>
          </div>
        )}
      </div>

      {/* History */}
      {history.length > 0 && showControls && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">History:</h3>
          <div className="flex flex-wrap gap-2">
            {history.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  loadContent(item);
                }}
                className={`px-3 py-1 text-xs rounded ${
                  index === currentIndex
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                } transition-colors`}
              >
                {new URL(item, window.location.origin).hostname || item}
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ExternalContentLoader;
