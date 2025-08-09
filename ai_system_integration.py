#!/usr/bin/env python3
"""
Aurum Private AI System Integration
Complete automation and management of AI answering service
"""

import asyncio
import json
import logging
import os
import sys
import time
from datetime import datetime
from typing import Dict, List, Optional
import subprocess
import requests
import sqlite3
from pathlib import Path

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('ai_system.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)

class AurumAISystemManager:
    """Complete AI System Manager for Aurum Private"""
    
    def __init__(self):
        self.config_file = "ai_agent_config.json"
        self.phone_config_file = "phone_system_config.json"
        self.web_handler_file = "ai_web_handler.php"
        self.chat_widget_file = "ai_chat_widget.html"
        self.system_status = {}
        self.performance_metrics = {}
        
        # Load configurations
        self.load_configurations()
        
        # Initialize system components
        self.init_system_components()
    
    def load_configurations(self):
        """Load all system configurations"""
        try:
            with open(self.config_file, 'r') as f:
                self.ai_config = json.load(f)
            logger.info("AI configuration loaded successfully")
        except FileNotFoundError:
            logger.error(f"AI configuration file {self.config_file} not found")
            self.ai_config = {}
        
        try:
            with open(self.phone_config_file, 'r') as f:
                self.phone_config = json.load(f)
            logger.info("Phone system configuration loaded successfully")
        except FileNotFoundError:
            logger.error(f"Phone configuration file {self.phone_config_file} not found")
            self.phone_config = {}
    
    def init_system_components(self):
        """Initialize all AI system components"""
        self.components = {
            'ai_agent': {
                'status': 'inactive',
                'file': 'ai_agent_system.py',
                'description': 'Advanced AI Agent System'
            },
            'phone_system': {
                'status': 'inactive',
                'file': 'phone_system.php',
                'description': 'AI Phone System Handler'
            },
            'web_handler': {
                'status': 'inactive',
                'file': 'ai_web_handler.php',
                'description': 'AI Web Interface Handler'
            },
            'chat_widget': {
                'status': 'inactive',
                'file': 'ai_chat_widget.html',
                'description': 'AI Chat Widget'
            }
        }
    
    async def deploy_complete_system(self):
        """Deploy the complete AI system"""
        logger.info("Starting complete AI system deployment...")
        
        try:
            # 1. Validate all components
            await self.validate_system_components()
            
            # 2. Initialize databases
            await self.initialize_databases()
            
            # 3. Test all components
            await self.test_system_components()
            
            # 4. Start monitoring
            await self.start_system_monitoring()
            
            # 5. Generate deployment report
            await self.generate_deployment_report()
            
            logger.info("Complete AI system deployment successful!")
            return True
            
        except Exception as e:
            logger.error(f"Deployment failed: {e}")
            return False
    
    async def validate_system_components(self):
        """Validate all system components"""
        logger.info("Validating system components...")
        
        required_files = [
            'ai_agent_system.py',
            'phone_system.php',
            'ai_web_handler.php',
            'ai_chat_widget.html',
            'ai_agent_config.json',
            'phone_system_config.json'
        ]
        
        missing_files = []
        for file in required_files:
            if not os.path.exists(file):
                missing_files.append(file)
        
        if missing_files:
            raise Exception(f"Missing required files: {missing_files}")
        
        logger.info("All system components validated successfully")
    
    async def initialize_databases(self):
        """Initialize all system databases"""
        logger.info("Initializing system databases...")
        
        # Initialize conversation database
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            
            # Create tables if they don't exist
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS system_metrics (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    component TEXT,
                    metric_name TEXT,
                    metric_value REAL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS system_events (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    event_type TEXT,
                    event_description TEXT,
                    severity TEXT,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            
            conn.commit()
            conn.close()
            logger.info("System databases initialized successfully")
            
        except Exception as e:
            logger.error(f"Database initialization failed: {e}")
            raise
    
    async def test_system_components(self):
        """Test all system components"""
        logger.info("Testing system components...")
        
        test_results = {}
        
        # Test AI Agent System
        try:
            result = await self.test_ai_agent()
            test_results['ai_agent'] = result
        except Exception as e:
            test_results['ai_agent'] = {'status': 'failed', 'error': str(e)}
        
        # Test Phone System
        try:
            result = await self.test_phone_system()
            test_results['phone_system'] = result
        except Exception as e:
            test_results['phone_system'] = {'status': 'failed', 'error': str(e)}
        
        # Test Web Handler
        try:
            result = await self.test_web_handler()
            test_results['web_handler'] = result
        except Exception as e:
            test_results['web_handler'] = {'status': 'failed', 'error': str(e)}
        
        # Log test results
        for component, result in test_results.items():
            if result.get('status') == 'passed':
                logger.info(f"{component}: Test PASSED")
                self.components[component]['status'] = 'active'
            else:
                logger.error(f"{component}: Test FAILED - {result.get('error', 'Unknown error')}")
                self.components[component]['status'] = 'error'
        
        return test_results
    
    async def test_ai_agent(self):
        """Test AI Agent System"""
        try:
            # Import and test AI agent
            from ai_agent_system import AurumAIAgent
            
            agent = AurumAIAgent()
            
            # Test basic functionality
            test_message = "Hello, I'm interested in your investment services"
            response = await agent.process_message(test_message, user_id="test_user")
            
            if response and hasattr(response, 'message'):
                return {'status': 'passed', 'response': response.message}
            else:
                return {'status': 'failed', 'error': 'Invalid response format'}
                
        except Exception as e:
            return {'status': 'failed', 'error': str(e)}
    
    async def test_phone_system(self):
        """Test Phone System Handler"""
        try:
            # Test phone system configuration
            if not self.phone_config:
                return {'status': 'failed', 'error': 'Phone configuration not loaded'}
            
            # Test forwarding number
            forwarding_number = self.phone_config.get('phone_system', {}).get('forwarding_number')
            if not forwarding_number:
                return {'status': 'failed', 'error': 'Forwarding number not configured'}
            
            return {'status': 'passed', 'forwarding_number': forwarding_number}
            
        except Exception as e:
            return {'status': 'failed', 'error': str(e)}
    
    async def test_web_handler(self):
        """Test Web Handler"""
        try:
            # Test web handler file exists
            if not os.path.exists(self.web_handler_file):
                return {'status': 'failed', 'error': 'Web handler file not found'}
            
            # Test basic PHP syntax
            result = subprocess.run(['php', '-l', self.web_handler_file], 
                                  capture_output=True, text=True)
            
            if result.returncode == 0:
                return {'status': 'passed', 'syntax': 'valid'}
            else:
                return {'status': 'failed', 'error': result.stderr}
                
        except Exception as e:
            return {'status': 'failed', 'error': str(e)}
    
    async def start_system_monitoring(self):
        """Start system monitoring"""
        logger.info("Starting system monitoring...")
        
        # Start background monitoring task
        asyncio.create_task(self.monitor_system_performance())
        asyncio.create_task(self.monitor_conversations())
        asyncio.create_task(self.monitor_system_health())
        
        logger.info("System monitoring started")
    
    async def monitor_system_performance(self):
        """Monitor system performance metrics"""
        while True:
            try:
                # Collect performance metrics
                metrics = await self.collect_performance_metrics()
                
                # Store metrics in database
                await self.store_metrics(metrics)
                
                # Check for performance issues
                await self.check_performance_alerts(metrics)
                
                await asyncio.sleep(60)  # Check every minute
                
            except Exception as e:
                logger.error(f"Performance monitoring error: {e}")
                await asyncio.sleep(60)
    
    async def collect_performance_metrics(self):
        """Collect system performance metrics"""
        metrics = {
            'timestamp': datetime.now().isoformat(),
            'cpu_usage': self.get_cpu_usage(),
            'memory_usage': self.get_memory_usage(),
            'active_conversations': await self.get_active_conversations(),
            'response_time': await self.get_average_response_time(),
            'error_rate': await self.get_error_rate()
        }
        
        return metrics
    
    def get_cpu_usage(self):
        """Get CPU usage percentage"""
        try:
            import psutil
            return psutil.cpu_percent(interval=1)
        except ImportError:
            return 0.0
    
    def get_memory_usage(self):
        """Get memory usage percentage"""
        try:
            import psutil
            return psutil.virtual_memory().percent
        except ImportError:
            return 0.0
    
    async def get_active_conversations(self):
        """Get number of active conversations"""
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            cursor.execute("""
                SELECT COUNT(*) FROM user_sessions 
                WHERE last_activity > datetime('now', '-30 minutes')
            """)
            count = cursor.fetchone()[0]
            conn.close()
            return count
        except Exception:
            return 0
    
    async def get_average_response_time(self):
        """Get average response time"""
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            cursor.execute("""
                SELECT AVG(confidence) FROM web_conversations 
                WHERE timestamp > datetime('now', '-1 hour')
            """)
            avg_time = cursor.fetchone()[0] or 0
            conn.close()
            return avg_time
        except Exception:
            return 0.0
    
    async def get_error_rate(self):
        """Get system error rate"""
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            cursor.execute("""
                SELECT COUNT(*) FROM system_events 
                WHERE event_type = 'error' AND timestamp > datetime('now', '-1 hour')
            """)
            error_count = cursor.fetchone()[0]
            conn.close()
            return error_count
        except Exception:
            return 0
    
    async def store_metrics(self, metrics):
        """Store performance metrics in database"""
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            
            for metric_name, metric_value in metrics.items():
                if metric_name != 'timestamp':
                    cursor.execute('''
                        INSERT INTO system_metrics (component, metric_name, metric_value)
                        VALUES (?, ?, ?)
                    ''', ('system', metric_name, metric_value))
            
            conn.commit()
            conn.close()
            
        except Exception as e:
            logger.error(f"Failed to store metrics: {e}")
    
    async def check_performance_alerts(self, metrics):
        """Check for performance alerts"""
        alerts = []
        
        if metrics.get('cpu_usage', 0) > 80:
            alerts.append('High CPU usage detected')
        
        if metrics.get('memory_usage', 0) > 85:
            alerts.append('High memory usage detected')
        
        if metrics.get('error_rate', 0) > 10:
            alerts.append('High error rate detected')
        
        if metrics.get('response_time', 0) < 0.5:
            alerts.append('Low response confidence detected')
        
        for alert in alerts:
            await self.log_system_event('alert', alert, 'warning')
    
    async def monitor_conversations(self):
        """Monitor conversation patterns"""
        while True:
            try:
                # Analyze conversation patterns
                patterns = await self.analyze_conversation_patterns()
                
                # Update system based on patterns
                await self.update_system_based_on_patterns(patterns)
                
                await asyncio.sleep(300)  # Check every 5 minutes
                
            except Exception as e:
                logger.error(f"Conversation monitoring error: {e}")
                await asyncio.sleep(300)
    
    async def analyze_conversation_patterns(self):
        """Analyze conversation patterns"""
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            
            # Get intent distribution
            cursor.execute("""
                SELECT intent, COUNT(*) as count 
                FROM web_conversations 
                WHERE timestamp > datetime('now', '-1 hour')
                GROUP BY intent
            """)
            intent_distribution = dict(cursor.fetchall())
            
            # Get sentiment distribution
            cursor.execute("""
                SELECT sentiment, COUNT(*) as count 
                FROM web_conversations 
                WHERE timestamp > datetime('now', '-1 hour')
                GROUP BY sentiment
            """)
            sentiment_distribution = dict(cursor.fetchall())
            
            conn.close()
            
            return {
                'intent_distribution': intent_distribution,
                'sentiment_distribution': sentiment_distribution,
                'total_conversations': sum(intent_distribution.values())
            }
            
        except Exception as e:
            logger.error(f"Failed to analyze patterns: {e}")
            return {}
    
    async def update_system_based_on_patterns(self, patterns):
        """Update system based on conversation patterns"""
        try:
            # Check for high urgency patterns
            urgent_count = patterns.get('sentiment_distribution', {}).get('urgent', 0)
            if urgent_count > 5:
                await self.log_system_event('pattern', f'High urgency detected: {urgent_count} urgent conversations', 'info')
            
            # Check for high contact requests
            contact_requests = patterns.get('intent_distribution', {}).get('contact_request', 0)
            if contact_requests > 10:
                await self.log_system_event('pattern', f'High contact requests: {contact_requests} requests', 'info')
            
        except Exception as e:
            logger.error(f"Failed to update system: {e}")
    
    async def monitor_system_health(self):
        """Monitor overall system health"""
        while True:
            try:
                # Check component status
                for component, info in self.components.items():
                    if info['status'] == 'error':
                        await self.log_system_event('health', f'Component {component} in error state', 'error')
                
                # Check database connectivity
                await self.check_database_health()
                
                # Check file system
                await self.check_file_system_health()
                
                await asyncio.sleep(600)  # Check every 10 minutes
                
            except Exception as e:
                logger.error(f"Health monitoring error: {e}")
                await asyncio.sleep(600)
    
    async def check_database_health(self):
        """Check database health"""
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            conn.close()
        except Exception as e:
            await self.log_system_event('health', f'Database health check failed: {e}', 'error')
    
    async def check_file_system_health(self):
        """Check file system health"""
        required_files = [
            'ai_agent_system.py',
            'phone_system.php',
            'ai_web_handler.php',
            'ai_chat_widget.html'
        ]
        
        for file in required_files:
            if not os.path.exists(file):
                await self.log_system_event('health', f'Required file missing: {file}', 'error')
    
    async def log_system_event(self, event_type, description, severity):
        """Log system event"""
        try:
            conn = sqlite3.connect('conversations.db')
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO system_events (event_type, event_description, severity)
                VALUES (?, ?, ?)
            ''', (event_type, description, severity))
            conn.commit()
            conn.close()
            
            logger.info(f"System event: {event_type} - {description} ({severity})")
            
        except Exception as e:
            logger.error(f"Failed to log system event: {e}")
    
    async def generate_deployment_report(self):
        """Generate deployment report"""
        logger.info("Generating deployment report...")
        
        report = {
            'timestamp': datetime.now().isoformat(),
            'system_version': '2.0',
            'components': self.components,
            'configuration': {
                'ai_system': self.ai_config.get('ai_system', {}),
                'phone_system': self.phone_config.get('phone_system', {})
            },
            'capabilities': self.ai_config.get('ai_capabilities', {}),
            'performance_metrics': await self.collect_performance_metrics()
        }
        
        # Save report to file
        with open('deployment_report.json', 'w') as f:
            json.dump(report, f, indent=2)
        
        logger.info("Deployment report generated: deployment_report.json")
        return report
    
    async def get_system_status(self):
        """Get current system status"""
        return {
            'timestamp': datetime.now().isoformat(),
            'components': self.components,
            'performance': await self.collect_performance_metrics(),
            'health': 'healthy' if all(c['status'] != 'error' for c in self.components.values()) else 'degraded'
        }
    
    async def restart_component(self, component_name):
        """Restart a specific component"""
        if component_name not in self.components:
            raise ValueError(f"Unknown component: {component_name}")
        
        logger.info(f"Restarting component: {component_name}")
        
        # Reset component status
        self.components[component_name]['status'] = 'restarting'
        
        # Test component
        if component_name == 'ai_agent':
            result = await self.test_ai_agent()
        elif component_name == 'phone_system':
            result = await self.test_phone_system()
        elif component_name == 'web_handler':
            result = await self.test_web_handler()
        else:
            result = {'status': 'passed'}
        
        # Update status
        if result.get('status') == 'passed':
            self.components[component_name]['status'] = 'active'
            logger.info(f"Component {component_name} restarted successfully")
        else:
            self.components[component_name]['status'] = 'error'
            logger.error(f"Component {component_name} restart failed")
        
        return result

# Main execution
async def main():
    """Main execution function"""
    print("🤖 Aurum Private AI System Manager")
    print("=" * 50)
    
    manager = AurumAISystemManager()
    
    if len(sys.argv) > 1:
        command = sys.argv[1]
        
        if command == 'deploy':
            success = await manager.deploy_complete_system()
            if success:
                print("✅ System deployment completed successfully!")
            else:
                print("❌ System deployment failed!")
        
        elif command == 'status':
            status = await manager.get_system_status()
            print(json.dumps(status, indent=2))
        
        elif command == 'restart':
            if len(sys.argv) > 2:
                component = sys.argv[2]
                result = await manager.restart_component(component)
                print(f"Restart result: {result}")
            else:
                print("Usage: python ai_system_integration.py restart <component_name>")
        
        else:
            print("Unknown command. Available commands: deploy, status, restart")
    else:
        # Default: deploy system
        print("Deploying complete AI system...")
        success = await manager.deploy_complete_system()
        if success:
            print("✅ System deployment completed successfully!")
        else:
            print("❌ System deployment failed!")

if __name__ == "__main__":
    asyncio.run(main())
