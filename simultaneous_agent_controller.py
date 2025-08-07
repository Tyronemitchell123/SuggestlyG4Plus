#!/usr/bin/env python3
"""
🤖 SIMULTANEOUS MULTI-AGENT CONTROLLER v2.0
Work with multiple AI agents at the same time with enhanced performance
Updated: 2025-01-27
"""

import asyncio
import time
from concurrent.futures import ThreadPoolExecutor
from src.real_agents import RealAgent
import json

class SimultaneousAgentController:
    def __init__(self):
        """Initialize all agents for simultaneous operation"""
        self.agents = {
            "ANALYST": RealAgent("ANALYST", "Financial Data Analysis & Stock Research"),
            "INTEL": RealAgent("INTEL", "Market Intelligence & News Analysis"),
            "RESEARCH": RealAgent("RESEARCH", "Text Analysis & Research Processing"),
            "RISK": RealAgent("RISK", "Risk Assessment & Portfolio Analysis"),
            "DATA": RealAgent("DATA", "Statistical Analysis & Data Processing"),
            "MONITOR": RealAgent("MONITOR", "System Monitoring & Performance Analysis"),
            "STRATEGY": RealAgent("STRATEGY", "Strategic Planning & Business Analysis")
        }
        
        self.conversation_log = []
        
    async def simultaneous_query(self, task: str, selected_agents: list = None):
        """Send the same task to multiple agents simultaneously"""
        
        if selected_agents is None:
            selected_agents = list(self.agents.keys())
        
        print(f"\n🚀 SIMULTANEOUS QUERY TO {len(selected_agents)} AGENTS:")
        print(f"📝 Task: {task}")
        print("=" * 70)
        
        # Create tasks for all agents
        tasks = []
        for agent_name in selected_agents:
            if agent_name in self.agents:
                tasks.append(self._agent_task(agent_name, task))
        
        # Execute all tasks simultaneously
        start_time = time.time()
        results = await asyncio.gather(*tasks, return_exceptions=True)
        end_time = time.time()
        
        # Process results
        response_summary = {
            "task": task,
            "agents_queried": selected_agents,
            "execution_time": round(end_time - start_time, 2),
            "responses": {},
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        for i, agent_name in enumerate(selected_agents):
            if i < len(results):
                response_summary["responses"][agent_name] = results[i]
        
        # Log the conversation
        self.conversation_log.append(response_summary)
        
        # Display results
        self._display_simultaneous_results(response_summary)
        
        return response_summary
    
    async def _agent_task(self, agent_name: str, task: str):
        """Execute task for a specific agent"""
        agent = self.agents[agent_name]
        loop = asyncio.get_event_loop()
        
        # Run in thread pool to avoid blocking
        with ThreadPoolExecutor() as executor:
            try:
                result = await loop.run_in_executor(executor, agent.process_task, task)
                return {
                    "status": "success",
                    "data": result,
                    "agent": agent_name,
                    "specialty": agent.specialty
                }
            except Exception as e:
                return {
                    "status": "error",
                    "error": str(e),
                    "agent": agent_name,
                    "specialty": agent.specialty
                }
    
    def _display_simultaneous_results(self, response_summary):
        """Display results from all agents"""
        print(f"\n📊 SIMULTANEOUS AGENT RESPONSES ({response_summary['execution_time']}s):")
        print("=" * 70)
        
        for agent_name, response in response_summary["responses"].items():
            print(f"\n🤖 {agent_name} ({response.get('specialty', 'Unknown')}):")
            
            if response.get("status") == "success":
                data = response.get("data", {})
                if isinstance(data, dict):
                    for key, value in data.items():
                        if key != "raw_data":  # Skip large raw data
                            print(f"   {key}: {value}")
                else:
                    print(f"   Result: {data}")
            else:
                print(f"   ❌ Error: {response.get('error', 'Unknown error')}")
        
        print("\n" + "=" * 70)
    
    async def collaborative_analysis(self, topic: str):
        """Have agents collaborate on a complex analysis"""
        
        print(f"\n🤝 COLLABORATIVE ANALYSIS: {topic}")
        print("=" * 70)
        
        # Phase 1: Initial data gathering
        print("📊 Phase 1: Data Gathering...")
        phase1_agents = ["ANALYST", "INTEL", "DATA"]
        phase1_task = f"Gather and analyze initial data for: {topic}"
        phase1_results = await self.simultaneous_query(phase1_task, phase1_agents)
        
        await asyncio.sleep(1)  # Brief pause between phases
        
        # Phase 2: Risk and strategic analysis
        print("\n🎯 Phase 2: Risk & Strategy Analysis...")
        phase2_agents = ["RISK", "STRATEGY"]
        
        # Create enhanced task with Phase 1 context
        context = json.dumps(phase1_results["responses"], indent=2)
        phase2_task = f"Analyze risks and create strategy for: {topic}. Context from data gathering: {context[:500]}..."
        phase2_results = await self.simultaneous_query(phase2_task, phase2_agents)
        
        await asyncio.sleep(1)
        
        # Phase 3: Final research and monitoring setup
        print("\n🔍 Phase 3: Research & Monitoring...")
        phase3_agents = ["RESEARCH", "MONITOR"]
        phase3_task = f"Provide final research insights and monitoring recommendations for: {topic}"
        phase3_results = await self.simultaneous_query(phase3_task, phase3_agents)
        
        # Compile collaborative report
        collaborative_report = {
            "topic": topic,
            "phase1_data_gathering": phase1_results,
            "phase2_risk_strategy": phase2_results,
            "phase3_research_monitoring": phase3_results,
            "total_agents": 7,
            "collaboration_complete": True,
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        print(f"\n✅ COLLABORATIVE ANALYSIS COMPLETE!")
        print(f"📝 {len(self.conversation_log)} total agent interactions logged")
        
        return collaborative_report
    
    def get_agent_performance(self):
        """Get performance metrics for all agents"""
        performance = {}
        
        for agent_name, agent in self.agents.items():
            performance[agent_name] = {
                "specialty": agent.specialty,
                "metrics": agent.performance_metrics,
                "status": "active"
            }
        
        return performance
    
    def agent_conversation(self, agent1: str, agent2: str, topic: str):
        """Simulate conversation between two specific agents"""
        
        print(f"\n💬 AGENT CONVERSATION: {agent1} ↔ {agent2}")
        print(f"📝 Topic: {topic}")
        print("=" * 70)
        
        # Agent 1 initiates
        print(f"🤖 {agent1}: Analyzing {topic}...")
        result1 = self.agents[agent1].process_task(f"Initial analysis of: {topic}")
        
        print(f"🤖 {agent2}: Responding to {agent1}'s analysis...")
        context = json.dumps(result1, default=str)[:300]
        result2 = self.agents[agent2].process_task(f"Respond to analysis of {topic}. Context: {context}")
        
        conversation = {
            "participants": [agent1, agent2],
            "topic": topic,
            "exchange": {
                agent1: result1,
                agent2: result2
            },
            "timestamp": time.strftime("%Y-%m-%d %H:%M:%S")
        }
        
        return conversation

async def main():
    """Main function to demonstrate simultaneous agent operation"""
    
    print("""
🤖 ═══════════════════════════════════════════════════════════════════════════ 🤖
   SIMULTANEOUS MULTI-AGENT SYSTEM - REAL AI COLLABORATION
🤖 ═══════════════════════════════════════════════════════════════════════════ 🤖
    """)
    
    # Initialize controller
    controller = SimultaneousAgentController()
    
    print("\n🚀 Available Commands:")
    print("1. Simultaneous query to all agents")
    print("2. Collaborative analysis (all agents working together)")
    print("3. Agent-to-agent conversation")
    print("4. Performance metrics")
    print("5. Custom agent selection")
    
    while True:
        print("\n" + "="*50)
        choice = input("Enter command (1-5) or 'quit': ").strip()
        
        if choice == "quit":
            break
        elif choice == "1":
            task = input("Enter task for all agents: ")
            await controller.simultaneous_query(task)
            
        elif choice == "2":
            topic = input("Enter topic for collaborative analysis: ")
            await controller.collaborative_analysis(topic)
            
        elif choice == "3":
            print("Available agents:", list(controller.agents.keys()))
            agent1 = input("Enter first agent: ").upper()
            agent2 = input("Enter second agent: ").upper()
            topic = input("Enter conversation topic: ")
            
            if agent1 in controller.agents and agent2 in controller.agents:
                controller.agent_conversation(agent1, agent2, topic)
            else:
                print("❌ Invalid agent names")
                
        elif choice == "4":
            performance = controller.get_agent_performance()
            print("\n📊 AGENT PERFORMANCE:")
            for agent, data in performance.items():
                print(f"🤖 {agent}: {data['metrics']['tasks_completed']} tasks completed")
                
        elif choice == "5":
            print("Available agents:", list(controller.agents.keys()))
            selected = input("Enter agent names (comma-separated): ").upper().split(",")
            selected = [agent.strip() for agent in selected if agent.strip() in controller.agents]
            
            if selected:
                task = input("Enter task for selected agents: ")
                await controller.simultaneous_query(task, selected)
            else:
                print("❌ No valid agents selected")

if __name__ == "__main__":
    asyncio.run(main())