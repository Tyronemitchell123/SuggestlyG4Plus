import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Settings } from 'lucide-react';

const SiteViewer = ({ site }) => {
  const { content, settings, theme } = site;

  // Apply theme-specific styles
  const getThemeStyles = () => {
    const baseStyles = {
      fontFamily: settings.fontFamily,
      '--primary-color': settings.primaryColor,
      '--secondary-color': settings.secondaryColor,
    };

    switch (theme) {
      case 'modern':
        return {
          ...baseStyles,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#ffffff'
        };
      case 'minimal':
        return {
          ...baseStyles,
          background: '#ffffff',
          color: '#1a1a1a'
        };
      case 'classic':
        return {
          ...baseStyles,
          background: '#f8f9fa',
          color: '#2c3e50'
        };
      case 'dark':
        return {
          ...baseStyles,
          background: '#1a1a1a',
          color: '#ffffff'
        };
      default:
        return baseStyles;
    }
  };

  const renderSection = (section, index) => {
    const sectionStyles = {
      padding: '4rem 0',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    };

    switch (section.type) {
      case 'hero':
        return (
          <section key={index} style={sectionStyles} className="text-center">
            <div className="max-w-4xl mx-auto px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6" style={{ color: settings.primaryColor }}>
                {section.title}
              </h1>
              {section.subtitle && (
                <h2 className="text-2xl md:text-3xl font-light mb-8 opacity-90">
                  {section.subtitle}
                </h2>
              )}
              <p className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
                {section.content}
              </p>
            </div>
          </section>
        );

      case 'about':
        return (
          <section key={index} style={sectionStyles} className="bg-white bg-opacity-10">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-8 text-center" style={{ color: settings.primaryColor }}>
                {section.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="text-lg leading-relaxed">
                    {section.content}
                  </p>
                </div>
                <div className="text-center">
                  <div 
                    className="w-64 h-64 mx-auto rounded-full opacity-20"
                    style={{ backgroundColor: settings.primaryColor }}
                  ></div>
                </div>
              </div>
            </div>
          </section>
        );

      case 'projects':
        return (
          <section key={index} style={sectionStyles}>
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: settings.primaryColor }}>
                {section.title}
              </h2>
              <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
                {section.content}
              </p>
              <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((project) => (
                  <div 
                    key={project}
                    className="bg-white bg-opacity-10 rounded-lg p-6 hover:bg-opacity-20 transition-all"
                  >
                    <div 
                      className="w-full h-48 rounded-lg mb-4 opacity-30"
                      style={{ backgroundColor: settings.secondaryColor }}
                    ></div>
                    <h3 className="text-xl font-semibold mb-2">Project {project}</h3>
                    <p className="opacity-80">Amazing project description goes here.</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'posts':
        return (
          <section key={index} style={sectionStyles}>
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: settings.primaryColor }}>
                {section.title}
              </h2>
              <p className="text-xl text-center mb-12 max-w-3xl mx-auto">
                {section.content}
              </p>
              <div className="space-y-8">
                {[1, 2, 3].map((post) => (
                  <article 
                    key={post}
                    className="bg-white bg-opacity-10 rounded-lg p-8 hover:bg-opacity-20 transition-all"
                  >
                    <h3 className="text-2xl font-semibold mb-4">Blog Post {post}</h3>
                    <p className="text-lg leading-relaxed mb-4">
                      This is a sample blog post content. In a real application, this would contain actual blog content with rich formatting and images.
                    </p>
                    <div className="flex items-center text-sm opacity-70">
                      <span>Published on {new Date().toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <span>5 min read</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section key={index} style={sectionStyles}>
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-4xl font-bold mb-12 text-center" style={{ color: settings.primaryColor }}>
                {section.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Get in Touch</h3>
                  <p className="text-lg leading-relaxed mb-8">
                    {section.content}
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: settings.primaryColor }}
                      ></div>
                      <span>contact@example.com</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: settings.primaryColor }}
                      ></div>
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: settings.primaryColor }}
                      ></div>
                      <span>123 Main St, City, State 12345</span>
                    </div>
                  </div>
                </div>
                <div>
                  <form className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    />
                    <textarea
                      placeholder="Your Message"
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-10 border border-white border-opacity-20 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                    ></textarea>
                    <button
                      type="submit"
                      className="w-full px-6 py-3 rounded-lg font-semibold transition-all"
                      style={{ 
                        backgroundColor: settings.primaryColor,
                        color: '#ffffff'
                      }}
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section key={index} style={sectionStyles}>
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-6" style={{ color: settings.primaryColor }}>
                {section.title}
              </h2>
              <p className="text-lg leading-relaxed">
                {section.content}
              </p>
            </div>
          </section>
        );
    }
  };

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <meta name="theme-color" content={settings.primaryColor} />
        <link href={`https://fonts.googleapis.com/css2?family=${settings.fontFamily.replace(' ', '+')}:wght@300;400;500;600;700&display=swap`} rel="stylesheet" />
      </Helmet>

      <div style={getThemeStyles()} className="min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <a 
                  href="/admin"
                  className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
                >
                  <ArrowLeft size={20} />
                  <span>Back to Admin</span>
                </a>
              </div>
              <div className="flex items-center space-x-4">
                <h1 className="text-xl font-semibold">{content.title}</h1>
                <button className="p-2 text-white hover:text-gray-300 transition-colors">
                  <Settings size={20} />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="pt-20">
          {content.sections.map((section, index) => renderSection(section, index))}
        </main>

        {/* Footer */}
        <footer className="bg-black bg-opacity-20 py-8 mt-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="opacity-70">
              © {new Date().getFullYear()} {content.title}. Powered by SuggestlyG4Plus.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default SiteViewer;
