import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Sparkles,
  Mic,
  MicOff,
  Send,
  Bot,
  User,
  Zap,
  Settings,
  Cpu,
  Heart,
  BarChart3,
} from 'lucide-react';
import toast from 'react-hot-toast';

const QuantumAIAssistant = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [assistantMode, setAssistantMode] = useState('general');
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [selectedPersonality, setSelectedPersonality] =
    useState('professional');
  const messagesEndRef = useRef(null);

  const personalities = [
    {
      id: 'professional',
      name: 'Professional',
      description: 'Business-focused and formal',
    },
    { id: 'friendly', name: 'Friendly', description: 'Warm and approachable' },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Imaginative and artistic',
    },
    { id: 'technical', name: 'Technical', description: 'Detailed and precise' },
    { id: 'humorous', name: 'Humorous', description: 'Witty and entertaining' },
  ];

  const assistantModes = [
    {
      id: 'general',
      name: 'General Assistant',
      icon: Bot,
      description: 'General help and conversation',
    },
    {
      id: 'coding',
      name: 'Code Assistant',
      icon: Code,
      description: 'Programming and development help',
    },
    {
      id: 'writing',
      name: 'Writing Assistant',
      icon: FileText,
      description: 'Content creation and editing',
    },
    {
      id: 'analysis',
      name: 'Data Analysis',
      icon: BarChart3,
      description: 'Data analysis and insights',
    },
    {
      id: 'creative',
      name: 'Creative Assistant',
      icon: Sparkles,
      description: 'Creative projects and ideas',
    },
  ];

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage = {
      id: Date.now(),
      type: 'assistant',
      content: `Hello! I'm your Quantum AI Assistant. I'm here to help you with anything you need. I can assist with coding, writing, analysis, creative projects, and general conversation. How can I help you today?`,
      timestamp: new Date(),
      personality: selectedPersonality,
    };
    setMessages([welcomeMessage]);
  }, [selectedPersonality]);

  const sendMessage = useCallback(
    async content => {
      if (!content.trim()) return;

      const userMessage = {
        id: Date.now(),
        type: 'user',
        content: content,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, userMessage]);
      setInputMessage('');
      setIsTyping(true);

      // Simulate AI response
      setTimeout(() => {
        const responses = [
          `I understand you're asking about "${content}". Let me help you with that. Based on my analysis, here's what I can tell you...`,
          `Great question! "${content}" is an interesting topic. Here's my perspective on this...`,
          `Regarding "${content}", I can provide you with comprehensive information. Let me break this down for you...`,
          `I've processed your request about "${content}". Here are the key insights and recommendations...`,
          `Excellent inquiry! "${content}" is something I'm well-versed in. Here's my detailed response...`,
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];

        const assistantMessage = {
          id: Date.now() + 1,
          type: 'assistant',
          content: randomResponse,
          timestamp: new Date(),
          personality: selectedPersonality,
        };

        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
      }, 2000);
    },
    [selectedPersonality]
  );

  const handleSendMessage = useCallback(() => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
    }
  }, [inputMessage, sendMessage]);

  const handleVoiceInput = useCallback(() => {
    if (!isListening) {
      setIsListening(true);
      toast.loading('Listening... Speak now!');

      // Simulate voice recognition
      setTimeout(() => {
        const voiceInput = 'Hello, can you help me with a coding problem?';
        setInputMessage(voiceInput);
        setIsListening(false);
        toast.success('Voice input captured!');
      }, 3000);
    } else {
      setIsListening(false);
      toast.dismiss();
    }
  }, [isListening]);

  const handleKeyPress = useCallback(
    e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage]
  );

  const MessageBubble = ({ message }) => {
    const isUser = message.type === 'user';

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div
          className={`flex items-start space-x-3 max-w-xs lg:max-w-md ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}
        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              isUser ? 'bg-blue-500' : 'bg-purple-500'
            }`}
          >
            {isUser ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>

          <div className={`flex-1 ${isUser ? 'text-right' : 'text-left'}`}>
            <div
              className={`inline-block px-4 py-2 rounded-lg ${
                isUser ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.content}</p>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3">
                <Brain className="w-8 h-8 text-indigo-600" />
                <span>Quantum AI Assistant</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">
                    Online
                  </span>
                </div>
              </h1>
              <p className="text-gray-600 mt-1">
                Advanced AI assistant with quantum computing capabilities
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setVoiceEnabled(!voiceEnabled)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 ${
                  voiceEnabled
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                {voiceEnabled ? (
                  <Mic className="w-4 h-4" />
                ) : (
                  <MicOff className="w-4 h-4" />
                )}
                <span>Voice {voiceEnabled ? 'On' : 'Off'}</span>
              </button>

              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center space-x-2">
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            {/* Assistant Mode */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Assistant Mode
              </h3>
              <div className="space-y-3">
                {assistantModes.map(mode => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setAssistantMode(mode.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                        assistantMode === mode.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon
                          className={`w-5 h-5 ${
                            assistantMode === mode.id
                              ? 'text-indigo-600'
                              : 'text-gray-600'
                          }`}
                        />
                        <div>
                          <h4
                            className={`font-medium ${
                              assistantMode === mode.id
                                ? 'text-indigo-900'
                                : 'text-gray-900'
                            }`}
                          >
                            {mode.name}
                          </h4>
                          <p
                            className={`text-xs ${
                              assistantMode === mode.id
                                ? 'text-indigo-700'
                                : 'text-gray-600'
                            }`}
                          >
                            {mode.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Personality */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Personality
              </h3>
              <select
                value={selectedPersonality}
                onChange={e => setSelectedPersonality(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                {personalities.map(personality => (
                  <option key={personality.id} value={personality.id}>
                    {personality.name}
                  </option>
                ))}
              </select>
            </div>

            {/* AI Capabilities */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                AI Capabilities
              </h3>
              <div className="space-y-3">
                {[
                  {
                    name: 'Natural Language Processing',
                    status: 'active',
                    icon: Brain,
                  },
                  { name: 'Voice Recognition', status: 'active', icon: Mic },
                  { name: 'Quantum Computing', status: 'active', icon: Zap },
                  { name: 'Machine Learning', status: 'active', icon: Cpu },
                  { name: 'Computer Vision', status: 'active', icon: Eye },
                  { name: 'Emotion Detection', status: 'active', icon: Heart },
                ].map(capability => {
                  const Icon = capability.icon;
                  return (
                    <div
                      key={capability.name}
                      className="bg-white rounded-lg p-4 border border-gray-200"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${
                            capability.status === 'active'
                              ? 'bg-green-100'
                              : 'bg-gray-100'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              capability.status === 'active'
                                ? 'text-green-600'
                                : 'text-gray-600'
                            }`}
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">
                            {capability.name}
                          </h4>
                          <p
                            className={`text-sm ${
                              capability.status === 'active'
                                ? 'text-green-600'
                                : 'text-gray-600'
                            }`}
                          >
                            {capability.status === 'active'
                              ? 'Active'
                              : 'Inactive'}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {assistantModes.find(m => m.id === assistantMode)?.name}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">
                      {messages.length} messages
                    </span>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {messages.map(message => (
                    <MessageBubble key={message.id} message={message} />
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start mb-4"
                    >
                      <div className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="inline-block px-4 py-2 rounded-lg bg-gray-100">
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: '0.1s' }}
                              ></div>
                              <div
                                className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: '0.2s' }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-end space-x-4">
                  <div className="flex-1">
                    <textarea
                      value={inputMessage}
                      onChange={e => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message here..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                      rows="2"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    {voiceEnabled && (
                      <button
                        onClick={handleVoiceInput}
                        disabled={isListening}
                        className={`p-3 rounded-lg transition-colors ${
                          isListening
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {isListening ? (
                          <MicOff className="w-5 h-5" />
                        ) : (
                          <Mic className="w-5 h-5" />
                        )}
                      </button>
                    )}

                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="p-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Code icon component
const Code = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
    />
  </svg>
);

// FileText icon component
const FileText = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

// Eye icon component
const Eye = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

export default QuantumAIAssistant;
