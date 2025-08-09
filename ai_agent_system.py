#!/usr/bin/env python3
"""
Aurum Private Advanced AI Agent System
Cutting-edge AI answering service with learning and automation
"""

import json
import asyncio
import logging
import sqlite3
from datetime import datetime, timedelta
from typing import Dict, List, Optional, Any
import re
import hashlib
import random
from dataclasses import dataclass, asdict
import openai
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@dataclass
class ConversationContext:
    """Context for ongoing conversations"""
    user_id: str
    session_id: str
    conversation_history: List[Dict]
    user_profile: Dict
    intent: str
    confidence: float
    timestamp: datetime
    sentiment: str
    priority: str

@dataclass
class AIResponse:
    """Structured AI response"""
    message: str
    confidence: float
    intent: str
    suggested_actions: List[str]
    follow_up_questions: List[str]
    emotional_tone: str
    response_type: str

class AurumAIAgent:
    """Advanced AI Agent for Aurum Private"""
    
    def __init__(self, config_file: str = "ai_agent_config.json"):
        self.config = self.load_config(config_file)
        self.conversation_db = "conversations.db"
        self.knowledge_base = "knowledge_base.json"
        self.learning_model = "learning_model.pkl"
        self.vectorizer = TfidfVectorizer(max_features=1000, stop_words='english')
        self.conversation_vectors = None
        self.response_templates = self.load_response_templates()
        self.user_profiles = {}
        self.active_conversations = {}
        
        # Initialize database
        self.init_database()
        
        # Load existing knowledge
        self.load_knowledge_base()
        
        # Initialize OpenAI (if configured)
        if self.config.get('openai_api_key'):
            openai.api_key = self.config['openai_api_key']
    
    def load_config(self, config_file: str) -> Dict:
        """Load AI agent configuration"""
        default_config = {
            "ai_name": "Aurum AI Assistant",
            "company_name": "Aurum Private",
            "forwarding_number": "+447832682418",
            "email": "info@aurumprivate.com",
            "business_hours": {
                "monday": {"start": "09:00", "end": "18:00"},
                "tuesday": {"start": "09:00", "end": "18:00"},
                "wednesday": {"start": "09:00", "end": "18:00"},
                "thursday": {"start": "09:00", "end": "18:00"},
                "friday": {"start": "09:00", "end": "18:00"},
                "saturday": {"start": "10:00", "end": "16:00"},
                "sunday": {"start": "closed", "end": "closed"}
            },
            "ai_capabilities": {
                "natural_language_processing": True,
                "sentiment_analysis": True,
                "intent_recognition": True,
                "learning_system": True,
                "automated_responses": True,
                "escalation_logic": True,
                "multilingual_support": True
            },
            "response_templates": {
                "greeting": "Welcome to Aurum Private. I'm your AI assistant, ready to help with elite investment opportunities.",
                "membership_inquiry": "Our elite membership requires a minimum annual commitment of £50,000. Would you like to discuss your investment objectives?",
                "investment_opportunity": "I can help you explore our exclusive investment opportunities. What type of investments interest you most?",
                "contact_human": "I'll connect you with our team immediately. Please hold while I transfer you to +447832682418.",
                "after_hours": "Our offices are currently closed. I'll ensure our team contacts you within 24 hours at your preferred time."
            }
        }
        
        try:
            with open(config_file, 'r') as f:
                config = json.load(f)
                return {**default_config, **config}
        except FileNotFoundError:
            return default_config
    
    def load_response_templates(self) -> Dict:
        """Load advanced response templates"""
        return {
            "greeting": [
                "Welcome to Aurum Private. I'm your AI assistant, ready to help with elite investment opportunities.",
                "Greetings from Aurum Private. I'm here to assist with your investment inquiries and membership questions.",
                "Welcome to the elite investment platform. How may I assist you today?"
            ],
            "membership": [
                "Our elite membership requires a minimum annual commitment of £50,000. This provides access to exclusive opportunities.",
                "Membership at Aurum Private starts at £50,000 annually, offering personalized investment services.",
                "For elite membership consideration, we require a minimum £50,000 annual commitment."
            ],
            "investment": [
                "We offer access to private equity, venture capital, real estate, and alternative investments.",
                "Our portfolio includes exclusive deals in technology, healthcare, and emerging markets.",
                "We provide access to high-value investment opportunities across multiple asset classes."
            ],
            "contact": [
                "I'll connect you with our team immediately. Please hold while I transfer you.",
                "Let me connect you with our investment specialists right away.",
                "I'm transferring you to our team for personalized assistance."
            ],
            "escalation": [
                "This requires immediate attention. I'm escalating to our senior team.",
                "For this level of inquiry, I'll connect you with our executive team.",
                "This is a priority matter. Let me transfer you to our leadership team."
            ]
        }
    
    def init_database(self):
        """Initialize conversation database"""
        conn = sqlite3.connect(self.conversation_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id TEXT,
                session_id TEXT,
                message TEXT,
                response TEXT,
                intent TEXT,
                confidence REAL,
                sentiment TEXT,
                timestamp DATETIME,
                user_profile TEXT
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS learning_data (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                input_text TEXT,
                intent TEXT,
                response TEXT,
                success_score REAL,
                timestamp DATETIME
            )
        ''')
        
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS user_profiles (
                user_id TEXT PRIMARY KEY,
                profile_data TEXT,
                last_interaction DATETIME,
                interaction_count INTEGER
            )
        ''')
        
        conn.commit()
        conn.close()
    
    def load_knowledge_base(self):
        """Load knowledge base for responses"""
        try:
            with open(self.knowledge_base, 'r') as f:
                self.knowledge = json.load(f)
        except FileNotFoundError:
            self.knowledge = {
                "investment_types": [
                    "Private Equity", "Venture Capital", "Real Estate", 
                    "Alternative Investments", "Technology", "Healthcare"
                ],
                "membership_tiers": [
                    "Elite (£50,000+)", "Premium (£100,000+)", "Ultra-Premium (£250,000+)"
                ],
                "services": [
                    "Portfolio Management", "Investment Advisory", "Deal Flow Access",
                    "Due Diligence", "Strategic Planning", "Risk Management"
                ],
                "faq": {
                    "minimum_investment": "£50,000 annually",
                    "application_time": "2-4 weeks",
                    "confidentiality": "Bank-level encryption and strict privacy protocols",
                    "geographic_focus": "Global opportunities with focus on UK, US, and emerging markets"
                }
            }
    
    async def process_message(self, message: str, user_id: str = None, session_id: str = None) -> AIResponse:
        """Process incoming message and generate AI response"""
        
        # Generate session ID if not provided
        if not session_id:
            session_id = hashlib.md5(f"{user_id}_{datetime.now()}".encode()).hexdigest()
        
        # Analyze message
        intent = await self.analyze_intent(message)
        sentiment = self.analyze_sentiment(message)
        confidence = self.calculate_confidence(message, intent)
        priority = self.determine_priority(message, intent, sentiment)
        
        # Get or create user profile
        user_profile = await self.get_user_profile(user_id)
        
        # Create conversation context
        context = ConversationContext(
            user_id=user_id,
            session_id=session_id,
            conversation_history=[],
            user_profile=user_profile,
            intent=intent,
            confidence=confidence,
            timestamp=datetime.now(),
            sentiment=sentiment,
            priority=priority
        )
        
        # Generate response
        response = await self.generate_response(context, message)
        
        # Learn from interaction
        await self.learn_from_interaction(message, intent, response, confidence)
        
        # Store conversation
        self.store_conversation(user_id, session_id, message, response.message, intent, confidence, sentiment)
        
        return response
    
    async def analyze_intent(self, message: str) -> str:
        """Advanced intent recognition using AI"""
        message_lower = message.lower()
        
        # Intent patterns
        intents = {
            "greeting": ["hello", "hi", "good morning", "good afternoon", "welcome"],
            "membership_inquiry": ["membership", "join", "apply", "requirements", "cost", "fee"],
            "investment_opportunity": ["investment", "opportunity", "portfolio", "returns", "risk"],
            "contact_request": ["speak", "talk", "call", "contact", "human", "representative"],
            "pricing": ["price", "cost", "fee", "minimum", "annual", "commitment"],
            "services": ["services", "offer", "provide", "help", "assist"],
            "urgency": ["urgent", "immediate", "asap", "emergency", "critical"],
            "complaint": ["problem", "issue", "complaint", "unhappy", "dissatisfied"]
        }
        
        # Calculate intent scores
        intent_scores = {}
        for intent, keywords in intents.items():
            score = sum(1 for keyword in keywords if keyword in message_lower)
            intent_scores[intent] = score
        
        # Return highest scoring intent
        if intent_scores:
            return max(intent_scores, key=intent_scores.get)
        
        return "general_inquiry"
    
    def analyze_sentiment(self, message: str) -> str:
        """Sentiment analysis"""
        positive_words = ["interested", "excellent", "great", "good", "amazing", "wonderful", "perfect"]
        negative_words = ["bad", "terrible", "awful", "horrible", "disappointed", "angry", "frustrated"]
        urgent_words = ["urgent", "immediate", "asap", "emergency", "critical", "important"]
        
        message_lower = message.lower()
        
        positive_count = sum(1 for word in positive_words if word in message_lower)
        negative_count = sum(1 for word in negative_words if word in message_lower)
        urgent_count = sum(1 for word in urgent_words if word in message_lower)
        
        if urgent_count > 0:
            return "urgent"
        elif positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"
    
    def calculate_confidence(self, message: str, intent: str) -> float:
        """Calculate confidence score for intent recognition"""
        # Simple confidence calculation based on message length and keyword matches
        base_confidence = min(len(message) / 100, 1.0)
        
        # Boost confidence for clear intent indicators
        intent_keywords = {
            "membership_inquiry": ["membership", "join", "apply"],
            "investment_opportunity": ["investment", "opportunity", "portfolio"],
            "contact_request": ["speak", "talk", "call", "human"],
            "pricing": ["price", "cost", "fee", "minimum"]
        }
        
        if intent in intent_keywords:
            keyword_matches = sum(1 for keyword in intent_keywords[intent] if keyword in message.lower())
            confidence_boost = keyword_matches * 0.2
            return min(base_confidence + confidence_boost, 1.0)
        
        return base_confidence
    
    def determine_priority(self, message: str, intent: str, sentiment: str) -> str:
        """Determine message priority"""
        if sentiment == "urgent" or intent == "urgency":
            return "high"
        elif intent in ["contact_request", "complaint"]:
            return "medium"
        else:
            return "normal"
    
    async def get_user_profile(self, user_id: str) -> Dict:
        """Get or create user profile"""
        if user_id in self.user_profiles:
            return self.user_profiles[user_id]
        
        # Load from database
        conn = sqlite3.connect(self.conversation_db)
        cursor = conn.cursor()
        cursor.execute("SELECT profile_data FROM user_profiles WHERE user_id = ?", (user_id,))
        result = cursor.fetchone()
        conn.close()
        
        if result:
            profile = json.loads(result[0])
        else:
            profile = {
                "interaction_count": 0,
                "preferred_topics": [],
                "investment_interests": [],
                "communication_style": "professional",
                "last_interaction": None
            }
        
        self.user_profiles[user_id] = profile
        return profile
    
    async def generate_response(self, context: ConversationContext, message: str) -> AIResponse:
        """Generate intelligent response based on context"""
        
        # Check if escalation is needed
        if context.priority == "high" or context.sentiment == "urgent":
            return self.generate_escalation_response(context)
        
        # Generate appropriate response based on intent
        if context.intent == "greeting":
            response_text = random.choice(self.response_templates["greeting"])
            response_type = "greeting"
        elif context.intent == "membership_inquiry":
            response_text = random.choice(self.response_templates["membership"])
            response_type = "information"
        elif context.intent == "investment_opportunity":
            response_text = random.choice(self.response_templates["investment"])
            response_type = "information"
        elif context.intent == "contact_request":
            response_text = random.choice(self.response_templates["contact"])
            response_type = "escalation"
        else:
            response_text = "I understand your inquiry. Let me provide you with relevant information about Aurum Private's elite investment services."
            response_type = "general"
        
        # Add personalization
        response_text = self.personalize_response(response_text, context.user_profile)
        
        # Generate follow-up questions
        follow_up_questions = self.generate_follow_up_questions(context.intent)
        
        # Determine emotional tone
        emotional_tone = self.determine_emotional_tone(context.sentiment, context.intent)
        
        return AIResponse(
            message=response_text,
            confidence=context.confidence,
            intent=context.intent,
            suggested_actions=self.generate_suggested_actions(context),
            follow_up_questions=follow_up_questions,
            emotional_tone=emotional_tone,
            response_type=response_type
        )
    
    def generate_escalation_response(self, context: ConversationContext) -> AIResponse:
        """Generate escalation response for urgent matters"""
        escalation_message = random.choice(self.response_templates["escalation"])
        escalation_message += f" I'm connecting you to our team at {self.config['forwarding_number']} immediately."
        
        return AIResponse(
            message=escalation_message,
            confidence=1.0,
            intent="escalation",
            suggested_actions=["transfer_call", "send_priority_email", "create_urgent_ticket"],
            follow_up_questions=[],
            emotional_tone="urgent",
            response_type="escalation"
        )
    
    def personalize_response(self, response: str, user_profile: Dict) -> str:
        """Personalize response based on user profile"""
        if user_profile.get("interaction_count", 0) > 5:
            response += " As a returning visitor, I can provide you with more detailed information."
        
        if user_profile.get("investment_interests"):
            interests = ", ".join(user_profile["investment_interests"][:2])
            response += f" I notice you're interested in {interests} investments."
        
        return response
    
    def generate_follow_up_questions(self, intent: str) -> List[str]:
        """Generate relevant follow-up questions"""
        questions = {
            "membership_inquiry": [
                "What is your typical investment size?",
                "Which investment sectors interest you most?",
                "Do you have a preferred investment timeline?"
            ],
            "investment_opportunity": [
                "Are you looking for short-term or long-term investments?",
                "What is your risk tolerance level?",
                "Do you have experience with private equity investments?"
            ],
            "general_inquiry": [
                "Would you like to learn more about our membership process?",
                "Are you interested in specific investment opportunities?",
                "Would you prefer to speak with our investment team?"
            ]
        }
        
        return questions.get(intent, ["How can I assist you further?"])
    
    def determine_emotional_tone(self, sentiment: str, intent: str) -> str:
        """Determine appropriate emotional tone"""
        if sentiment == "urgent":
            return "urgent"
        elif intent == "complaint":
            return "empathetic"
        elif intent == "greeting":
            return "friendly"
        else:
            return "professional"
    
    def generate_suggested_actions(self, context: ConversationContext) -> List[str]:
        """Generate suggested actions based on context"""
        actions = []
        
        if context.intent == "membership_inquiry":
            actions.extend(["send_membership_brochure", "schedule_consultation"])
        elif context.intent == "investment_opportunity":
            actions.extend(["send_investment_overview", "connect_with_advisor"])
        elif context.priority == "high":
            actions.extend(["escalate_to_team", "send_priority_notification"])
        
        return actions
    
    async def learn_from_interaction(self, message: str, intent: str, response: AIResponse, confidence: float):
        """Learn from interaction to improve future responses"""
        # Store learning data
        conn = sqlite3.connect(self.conversation_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO learning_data (input_text, intent, response, success_score, timestamp)
            VALUES (?, ?, ?, ?, ?)
        ''', (message, intent, response.message, confidence, datetime.now()))
        
        conn.commit()
        conn.close()
        
        # Update learning model periodically
        if random.random() < 0.1:  # 10% chance to update model
            await self.update_learning_model()
    
    async def update_learning_model(self):
        """Update the learning model with new data"""
        try:
            conn = sqlite3.connect(self.conversation_db)
            cursor = conn.cursor()
            cursor.execute("SELECT input_text, intent FROM learning_data ORDER BY timestamp DESC LIMIT 1000")
            data = cursor.fetchall()
            conn.close()
            
            if data:
                texts, intents = zip(*data)
                # Update vectorizer and vectors
                self.conversation_vectors = self.vectorizer.fit_transform(texts)
                
                # Save updated model
                with open(self.learning_model, 'wb') as f:
                    pickle.dump({
                        'vectorizer': self.vectorizer,
                        'vectors': self.conversation_vectors,
                        'intents': intents
                    }, f)
                
                logger.info("Learning model updated successfully")
        except Exception as e:
            logger.error(f"Error updating learning model: {e}")
    
    def store_conversation(self, user_id: str, session_id: str, message: str, response: str, 
                          intent: str, confidence: float, sentiment: str):
        """Store conversation in database"""
        conn = sqlite3.connect(self.conversation_db)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO conversations (user_id, session_id, message, response, intent, confidence, sentiment, timestamp)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ''', (user_id, session_id, message, response, intent, confidence, sentiment, datetime.now()))
        
        # Update user profile
        if user_id:
            cursor.execute('''
                INSERT OR REPLACE INTO user_profiles (user_id, profile_data, last_interaction, interaction_count)
                VALUES (?, ?, ?, COALESCE((SELECT interaction_count FROM user_profiles WHERE user_id = ?), 0) + 1)
            ''', (user_id, json.dumps(self.user_profiles.get(user_id, {})), datetime.now(), user_id))
        
        conn.commit()
        conn.close()
    
    def get_conversation_analytics(self) -> Dict:
        """Get conversation analytics"""
        conn = sqlite3.connect(self.conversation_db)
        cursor = conn.cursor()
        
        # Total conversations
        cursor.execute("SELECT COUNT(*) FROM conversations")
        total_conversations = cursor.fetchone()[0]
        
        # Intent distribution
        cursor.execute("SELECT intent, COUNT(*) FROM conversations GROUP BY intent")
        intent_distribution = dict(cursor.fetchall())
        
        # Average confidence
        cursor.execute("SELECT AVG(confidence) FROM conversations")
        avg_confidence = cursor.fetchone()[0] or 0
        
        # Recent activity
        cursor.execute("SELECT COUNT(*) FROM conversations WHERE timestamp > datetime('now', '-1 hour')")
        recent_activity = cursor.fetchone()[0]
        
        conn.close()
        
        return {
            "total_conversations": total_conversations,
            "intent_distribution": intent_distribution,
            "average_confidence": avg_confidence,
            "recent_activity": recent_activity,
            "active_users": len(self.user_profiles)
        }

# Example usage
async def main():
    """Example usage of the AI agent system"""
    agent = AurumAIAgent()
    
    # Test conversation
    messages = [
        "Hello, I'm interested in your investment services",
        "What are the membership requirements?",
        "I need to speak with someone immediately about a large investment opportunity"
    ]
    
    for message in messages:
        response = await agent.process_message(message, user_id="test_user_123")
        print(f"User: {message}")
        print(f"AI: {response.message}")
        print(f"Intent: {response.intent}, Confidence: {response.confidence:.2f}")
        print(f"Priority: {response.priority}, Tone: {response.emotional_tone}")
        print("---")
    
    # Get analytics
    analytics = agent.get_conversation_analytics()
    print("Analytics:", json.dumps(analytics, indent=2))

if __name__ == "__main__":
    asyncio.run(main())
