import React from "react";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

export default function APIPage() {
  const apiEndpoints = [
    {
      method: "POST",
      path: "/api/v1/agents/analyst/analyze",
      description: "Analyze data using the ANALYST agent",
      parameters: [
        { name: "data", type: "string", required: true, description: "Data to analyze" },
        { name: "options", type: "object", required: false, description: "Analysis options" }
      ],
      response: {
        success: true,
        analysis: "Detailed analysis results",
        insights: ["insight1", "insight2"],
        confidence: 0.95
      }
    },
    {
      method: "POST",
      path: "/api/v1/agents/intel/gather",
      description: "Gather intelligence using the INTEL agent",
      parameters: [
        { name: "query", type: "string", required: true, description: "Intelligence query" },
        { name: "sources", type: "array", required: false, description: "Data sources to use" }
      ],
      response: {
        success: true,
        intelligence: "Gathered intelligence data",
        sources: ["source1", "source2"],
        timestamp: "2024-01-27T10:00:00Z"
      }
    },
    {
      method: "POST",
      path: "/api/v1/agents/strategist/plan",
      description: "Create strategic plans using the STRATEGIST agent",
      parameters: [
        { name: "objective", type: "string", required: true, description: "Strategic objective" },
        { name: "constraints", type: "object", required: false, description: "Planning constraints" }
      ],
      response: {
        success: true,
        strategy: "Strategic plan",
        milestones: ["milestone1", "milestone2"],
        timeline: "2024-01-27 to 2024-12-31"
      }
    },
    {
      method: "POST",
      path: "/api/v1/iot/connect",
      description: "Connect to IoT devices",
      parameters: [
        { name: "device_id", type: "string", required: true, description: "Device identifier" },
        { name: "protocol", type: "string", required: false, description: "Connection protocol" }
      ],
      response: {
        success: true,
        connection_id: "conn_12345",
        status: "connected",
        device_info: { name: "Smart Sensor", type: "temperature" }
      }
    },
    {
      method: "POST",
      path: "/api/v1/voice/recognize",
      description: "Speech recognition using Voice AI",
      parameters: [
        { name: "audio", type: "file", required: true, description: "Audio file to process" },
        { name: "language", type: "string", required: false, description: "Language code" }
      ],
      response: {
        success: true,
        text: "Recognized speech text",
        confidence: 0.92,
        language: "en-US"
      }
    },
    {
      method: "POST",
      path: "/api/v1/vision/detect",
      description: "Object detection using Computer Vision",
      parameters: [
        { name: "image", type: "file", required: true, description: "Image to analyze" },
        { name: "model", type: "string", required: false, description: "Detection model" }
      ],
      response: {
        success: true,
        objects: [
          { label: "person", confidence: 0.95, bbox: [100, 200, 300, 400] },
          { label: "car", confidence: 0.87, bbox: [500, 300, 600, 450] }
        ],
        processing_time: "0.15s"
      }
    }
  ];

  const codeExamples = [
    {
      language: "JavaScript",
      title: "Basic API Usage",
      code: `import { SuggestlyG4Plus } from 'suggestlyg4plus-sdk';

const suggestly = new SuggestlyG4Plus('your-api-key');

// Analyze data
const analysis = await suggestly.analyst.analyze('Your data here');
console.log(analysis);

// Connect IoT device
const connection = await suggestly.iot.connect('device-123');
console.log(connection);`
    },
    {
      language: "Python",
      title: "Python SDK Example",
      code: `from suggestlyg4plus import SuggestlyG4Plus

suggestly = SuggestlyG4Plus('your-api-key')

# Gather intelligence
intel = suggestly.intel.gather('market analysis')
print(intel)

# Voice recognition
result = suggestly.voice.recognize('audio_file.wav')
print(result.text)`
    },
    {
      language: "cURL",
      title: "Direct API Calls",
      code: `# Analyze data
curl -X POST https://api.suggestlyg4plus.io/v1/agents/analyst/analyze \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{"data": "Your data here"}'`
    }
  ];

  return (
    <>
      <Head>
        <title>API Reference - SuggestlyG4Plus</title>
        <meta name="description" content="Complete API reference for SuggestlyG4Plus AI platform with endpoints, examples, and SDK documentation." />
        <meta property="og:title" content="API Reference - SuggestlyG4Plus" />
        <meta property="og:description" content="Complete API reference for SuggestlyG4Plus AI platform." />
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
                <Link href="/suggestly-ai/api" className="text-purple-400">API</Link>
                <Link href="/suggestly-ai/examples" className="text-gray-300 hover:text-purple-400 transition-colors">Examples</Link>
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
              API Reference
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
            >
              Complete API documentation for integrating SuggestlyG4Plus into your applications
            </motion.p>
            
            {/* API Key Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-lg p-6 max-w-2xl mx-auto"
            >
              <h3 className="text-lg font-semibold text-white mb-2">Authentication</h3>
              <p className="text-gray-300 mb-4">All API requests require an API key in the Authorization header:</p>
              <div className="bg-slate-900 rounded p-3 font-mono text-sm">
                Authorization: Bearer your-api-key
              </div>
            </motion.div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              API Endpoints
            </motion.h2>
            
            <div className="space-y-8">
              {apiEndpoints.map((endpoint, index) => (
                <motion.div
                  key={endpoint.path}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8"
                >
                  <div className="flex items-center mb-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold mr-4 ${
                      endpoint.method === 'GET' ? 'bg-green-500/20 text-green-400' :
                      endpoint.method === 'POST' ? 'bg-blue-500/20 text-blue-400' :
                      endpoint.method === 'PUT' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-purple-400 font-mono text-lg">{endpoint.path}</code>
                  </div>
                  
                  <p className="text-gray-300 mb-6">{endpoint.description}</p>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Parameters */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Parameters</h4>
                      <div className="space-y-3">
                        {endpoint.parameters.map((param) => (
                          <div key={param.name} className="flex items-start space-x-3">
                            <div className="flex items-center space-x-2">
                              <span className="text-purple-400 font-mono text-sm">{param.name}</span>
                              <span className="text-gray-500 text-sm">({param.type})</span>
                              {param.required && <span className="text-red-400 text-xs">required</span>}
                            </div>
                            <span className="text-gray-400 text-sm">{param.description}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Response */}
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Response</h4>
                      <div className="bg-slate-900 rounded-lg p-4">
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          {JSON.stringify(endpoint.response, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Examples */}
        <section className="py-16 px-4 bg-slate-800/30">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {codeExamples.map((example, index) => (
                <motion.div
                  key={example.language}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{example.title}</h3>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-sm font-mono">
                      {example.language}
                    </span>
                  </div>
                  
                  <div className="bg-slate-900 rounded-lg p-4">
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{example.code}</code>
                    </pre>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* SDK Downloads */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              SDK Downloads
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">JavaScript/Node.js</h3>
                <div className="bg-slate-900 rounded p-3 font-mono text-sm mb-4">
                  npm install suggestlyg4plus-sdk
                </div>
                <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  Download SDK
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">Python</h3>
                <div className="bg-slate-900 rounded p-3 font-mono text-sm mb-4">
                  pip install suggestlyg4plus
                </div>
                <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  Download SDK
                </button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-4">REST API</h3>
                <div className="bg-slate-900 rounded p-3 font-mono text-sm mb-4">
                  curl -X POST /api/v1/...
                </div>
                <button className="w-full py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                  View Documentation
                </button>
              </motion.div>
            </div>
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
              <Link href="/suggestly-ai/api" className="text-purple-400">API</Link>
              <Link href="/suggestly-ai/examples" className="text-gray-400 hover:text-purple-400 transition-colors">Examples</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
