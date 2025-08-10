import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExamplesPage() {
  const examples = [
    {
      category: "AI Agents",
      title: "Data Analysis Pipeline",
      description: "Build an automated data analysis pipeline using multiple AI agents",
      difficulty: "Intermediate",
      code: `// Initialize agents
const analyst = suggestly.analyst;
const intel = suggestly.intel;
const strategist = suggestly.strategist;

// Analyze market data
const analysis = await analyst.analyze(marketData);
const intelligence = await intel.gather('market trends');
const strategy = await strategist.plan({
  objective: 'optimize portfolio',
  data: { analysis, intelligence }
});

console.log('Strategy:', strategy);`,
      features: ["Multi-agent coordination", "Data processing", "Strategic planning"]
    },
    {
      category: "IoT Integration",
      title: "Smart Home Automation",
      description: "Create a smart home system with IoT device integration",
      difficulty: "Beginner",
      code: `// Connect IoT devices
const devices = await suggestly.iot.scan();
const thermostat = await suggestly.iot.connect('thermostat-001');
const lights = await suggestly.iot.connect('lights-001');

// Set up automation rules
suggestly.iot.on('temperature_change', async (data) => {
  if (data.temperature > 25) {
    await lights.setBrightness(0.3);
    await thermostat.setTemperature(22);
  }
});`,
      features: ["Device management", "Event handling", "Automation rules"]
    },
    {
      category: "Voice AI",
      title: "Voice-Controlled Assistant",
      description: "Build a voice-controlled AI assistant with speech recognition",
      difficulty: "Intermediate",
      code: `// Voice recognition setup
const voice = suggestly.voice;

voice.on('speech', async (audio) => {
  const text = await voice.recognize(audio);
  const response = await suggestly.analyst.analyze(text);
  
  // Generate speech response
  const speech = await voice.synthesize(response.summary);
  voice.play(speech);
});

// Start listening
voice.startListening();`,
      features: ["Speech recognition", "Text-to-speech", "Real-time processing"]
    },
    {
      category: "Computer Vision",
      title: "Security Monitoring System",
      description: "Create a security system with facial recognition and object detection",
      difficulty: "Advanced",
      code: `// Vision system setup
const vision = suggestly.vision;
const security = suggestly.security;

// Set up camera feed
vision.on('frame', async (image) => {
  const objects = await vision.detect(image);
  const faces = await vision.recognizeFaces(image);
  
  // Security analysis
  const threats = await security.analyzeThreats({
    objects,
    faces,
    location: 'entrance'
  });
  
  if (threats.length > 0) {
    await security.alert(threats);
  }
});`,
      features: ["Object detection", "Facial recognition", "Threat analysis"]
    },
    {
      category: "Multi-Modal",
      title: "Intelligent Customer Service",
      description: "Build a customer service system using multiple AI capabilities",
      difficulty: "Advanced",
      code: `// Customer service bot
class CustomerServiceBot {
  async handleInquiry(input) {
    // Voice or text input
    const text = input.type === 'voice' 
      ? await suggestly.voice.recognize(input.audio)
      : input.text;
    
    // Analyze customer intent
    const intent = await suggestly.analyst.analyze(text);
    
    // Generate response
    const response = await suggestly.creator.generateResponse(intent);
    
    // Return appropriate format
    return input.type === 'voice'
      ? await suggestly.voice.synthesize(response)
      : response;
  }
}`,
      features: ["Multi-modal processing", "Intent recognition", "Response generation"]
    },
    {
      category: "Enterprise",
      title: "Business Intelligence Dashboard",
      description: "Create a comprehensive BI dashboard with real-time analytics",
      difficulty: "Advanced",
      code: `// BI Dashboard
class BIDashboard {
  async updateDashboard() {
    // Gather data from multiple sources
    const marketData = await suggestly.intel.gather('market_data');
    const salesData = await suggestly.analyst.analyze('sales_metrics');
    const predictions = await suggestly.strategist.predict('revenue_forecast');
    
    // Generate insights
    const insights = await suggestly.analyst.generateInsights({
      market: marketData,
      sales: salesData,
      predictions: predictions
    });
    
    // Update dashboard
    this.updateCharts(insights);
    this.updateAlerts(insights.alerts);
  }
}`,
      features: ["Real-time analytics", "Predictive modeling", "Data visualization"]
    }
  ];

  const useCases = [
    {
      industry: "Healthcare",
      title: "Medical Diagnosis Assistant",
      description: "AI-powered medical image analysis and patient data processing",
      icon: "🏥"
    },
    {
      industry: "Finance",
      title: "Trading Algorithm",
      description: "Real-time market analysis and automated trading decisions",
      icon: "📈"
    },
    {
      industry: "Manufacturing",
      title: "Quality Control System",
      description: "Computer vision-based product quality inspection",
      icon: "🏭"
    },
    {
      industry: "Retail",
      title: "Smart Inventory Management",
      description: "IoT sensors and AI for inventory optimization",
      icon: "🛍️"
    },
    {
      industry: "Education",
      title: "Personalized Learning",
      description: "AI tutors with voice interaction and adaptive content",
      icon: "🎓"
    },
    {
      industry: "Transportation",
      title: "Autonomous Vehicle System",
      description: "Multi-sensor fusion for autonomous navigation",
      icon: "🚗"
    }
  ];

  return (
    <>
      <Head>
        <title>Examples - SuggestlyG4Plus</title>
        <meta name="description" content="Practical examples and use cases for SuggestlyG4Plus AI platform with code samples and tutorials." />
        <meta property="og:title" content="Examples - SuggestlyG4Plus" />
        <meta property="og:description" content="Practical examples and use cases for SuggestlyG4Plus AI platform." />
        <meta property="og:type" content="website" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white font-sans min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/suggestly-ai" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                SuggestlyG4Plus
              </Link>
              <div className="hidden md:flex space-x-8">
                <Link href="/suggestly-ai" className="text-gray-300 hover:text-purple-400 transition-colors">Home</Link>
                <Link href="/suggestly-ai/docs" className="text-gray-300 hover:text-purple-400 transition-colors">Docs</Link>
                <Link href="/suggestly-ai/api" className="text-gray-300 hover:text-purple-400 transition-colors">API</Link>
                <Link href="/suggestly-ai/examples" className="text-purple-400">Examples</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Examples & Use Cases
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Explore practical examples and real-world applications of SuggestlyG4Plus
            </motion.p>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Code Examples
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {examples.map((example, index) => (
                <motion.div
                  key={example.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-semibold">
                      {example.category}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      example.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                      example.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {example.difficulty}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-3">{example.title}</h3>
                  <p className="text-gray-300 mb-6">{example.description}</p>
                  
                  <div className="bg-slate-900 rounded-lg p-4 mb-6">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {example.features.map((feature) => (
                      <span key={feature} className="px-2 py-1 bg-slate-700 text-gray-300 rounded text-xs">
                        {feature}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Use Cases */}
        <section className="py-16 px-4 bg-slate-800/30">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Industry Use Cases
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {useCases.map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 hover:border-purple-400/40 transition-all duration-300"
                >
                  <div className="text-4xl mb-4">{useCase.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{useCase.title}</h3>
                  <p className="text-gray-400 mb-4">{useCase.industry}</p>
                  <p className="text-gray-300 text-sm">{useCase.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Try It Live
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Interactive Demo</h3>
              <p className="text-gray-300 mb-6">
                Experience SuggestlyG4Plus capabilities with our interactive demo
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button className="py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  Voice Recognition
                </button>
                <button className="py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  Image Analysis
                </button>
                <button className="py-3 px-6 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  Data Analysis
                </button>
              </div>
              
              <div className="bg-slate-900 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
                <p className="text-gray-400">Demo interface will appear here</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Get Started CTA */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Ready to Build?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Start building your own AI applications with SuggestlyG4Plus
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/suggestly-ai/docs">
                  <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
                    Get Started
                  </button>
                </Link>
                <Link href="/suggestly-ai/api">
                  <button className="px-8 py-4 border-2 border-purple-400 text-purple-400 font-semibold rounded-full hover:bg-purple-400 hover:text-white transition-all duration-200">
                    View API Docs
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-purple-500/20">
          <div className="max-w-7xl mx-auto text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">
              SuggestlyG4Plus
            </div>
            <p className="text-gray-400 mb-6">
              © 2024 SuggestlyG4Plus. All rights reserved.
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/suggestly-ai" className="text-gray-400 hover:text-purple-400 transition-colors">Home</Link>
              <Link href="/suggestly-ai/docs" className="text-gray-400 hover:text-purple-400 transition-colors">Documentation</Link>
              <Link href="/suggestly-ai/api" className="text-gray-400 hover:text-purple-400 transition-colors">API</Link>
              <Link href="/suggestly-ai/examples" className="text-purple-400">Examples</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
