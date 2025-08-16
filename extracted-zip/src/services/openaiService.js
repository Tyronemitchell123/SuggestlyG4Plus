import OpenAI from 'openai';
import advancedAIService from './advancedAIService';

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, use a backend proxy
});

export const openaiService = {
  // Generate AI response for chat
  async generateChatResponse(messages, model = 'gpt-3.5-turbo') {
    try {
      const completion = await openai.chat.completions.create({
        model: model,
        messages: messages,
        max_tokens: 1000,
        temperature: 0.7,
      });

      return {
        success: true,
        response: completion.choices[0].message.content,
        usage: completion.usage
      };
    } catch (error) {
      console.error('OpenAI API Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Generate content for different sections
  async generateContent(prompt, type = 'general', model = 'gpt-3.5-turbo') {
    const systemPrompts = {
      'hero': 'You are an expert copywriter for luxury AI platforms. Create compelling, sophisticated content that appeals to high-net-worth individuals and enterprise clients.',
      'features': 'You are a technical writer specializing in AI and enterprise solutions. Create clear, professional descriptions of advanced features.',
      'pricing': 'You are a sales copywriter for premium services. Create persuasive, value-focused content for high-end pricing tiers.',
      'general': 'You are an AI assistant for a luxury AI platform. Provide helpful, professional responses.'
    };

    const messages = [
      { role: 'system', content: systemPrompts[type] || systemPrompts.general },
      { role: 'user', content: prompt }
    ];

    return await this.generateChatResponse(messages, model);
  },

  // Analyze business requirements and provide AI insights
  async analyzeBusinessRequirements(requirements) {
    const prompt = `Analyze the following business requirements and provide strategic AI recommendations:

Requirements: ${requirements}

Please provide:
1. Key AI opportunities
2. Implementation strategy
3. Expected ROI
4. Risk assessment
5. Timeline recommendations

Format as a professional business analysis.`;

    return await this.generateContent(prompt, 'general', 'gpt-4');
  },

  // Generate personalized consultation responses
  async generateConsultationResponse(clientData, inquiryType) {
    const prompt = `Generate a personalized consultation response for a potential client:

Client Information:
- Name: ${clientData.firstName} ${clientData.lastName}
- Company: ${clientData.company}
- Position: ${clientData.position}
- Annual Revenue: ${clientData.revenue}
- Inquiry Type: ${inquiryType}
- Requirements: ${clientData.requirements}

Create a professional, personalized response that:
1. Acknowledges their specific needs
2. Demonstrates understanding of their business
3. Outlines relevant AI solutions
4. Includes next steps
5. Maintains luxury brand voice`;

    return await this.generateContent(prompt, 'general', 'gpt-4');
  },

  // Advanced AI Analysis with Quantum and Predictive Features
  async performAdvancedAnalysis(prompt, options = {}) {
    try {
      return await advancedAIService.performAdvancedAnalysis(prompt, {
        includeQuantum: true,
        includePredictive: true,
        ...options
      });
    } catch (error) {
      console.error('Advanced AI Analysis Error:', error);
      return this.generateContent(prompt, 'general', 'gpt-4');
    }
  },

  // Quantum-Inspired Analysis
  async performQuantumAnalysis(data) {
    try {
      return await advancedAIService.performQuantumAnalysis(data);
    } catch (error) {
      console.error('Quantum Analysis Error:', error);
      return {
        success: false,
        error: 'Quantum analysis unavailable',
        fallback: await this.generateContent('Analyze this data: ' + JSON.stringify(data), 'general', 'gpt-4')
      };
    }
  },

  // Predictive Modeling
  async performPredictiveModeling(historicalData, timeframe = '1y') {
    try {
      return await advancedAIService.performPredictiveModeling(historicalData, timeframe);
    } catch (error) {
      console.error('Predictive Modeling Error:', error);
      return {
        success: false,
        error: 'Predictive modeling unavailable',
        fallback: await this.generateContent('Analyze historical trends: ' + JSON.stringify(historicalData), 'general', 'gpt-4')
      };
    }
  },

  // AI Health Check
  async healthCheck() {
    try {
      return await advancedAIService.healthCheck();
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  },

  // Enhanced Content Generation with Advanced Features
  async generateAdvancedContent(prompt, type = 'general', options = {}) {
    try {
      const enhancedPrompt = `Generate advanced ${type} content with quantum-inspired insights and predictive analysis:

${prompt}

Apply:
- Multi-dimensional analysis
- Future scenario modeling
- Risk assessment
- Confidence metrics
- Actionable recommendations`;

      return await this.performAdvancedAnalysis(enhancedPrompt, options);
    } catch (error) {
      console.error('Advanced Content Generation Error:', error);
      return this.generateContent(prompt, type, 'gpt-4');
    }
  }
};
