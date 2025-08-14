#!/usr/bin/env python3
"""
🧪 SuggestlyG4Plus v2.0 - Deployment Progress Tests
Test suite for the enhanced deployment progress monitoring system
"""

import unittest
import time
from deployment_progress_tracker import (
    DeploymentProgressTracker, 
    ProgressVisualizer, 
    DeploymentStage, 
    DeploymentStatus,
    ProgressStep
)
from MULTI_AGENT_DEPLOYMENT_EXECUTOR import MultiAgentDeploymentExecutor

class TestDeploymentProgressTracker(unittest.TestCase):
    """Test cases for the deployment progress tracking system"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.tracker = DeploymentProgressTracker("test_deployment")
    
    def test_tracker_initialization(self):
        """Test that tracker initializes correctly"""
        self.assertEqual(self.tracker.deployment_name, "test_deployment")
        self.assertEqual(self.tracker.overall_progress, 0.0)
        self.assertIsInstance(self.tracker.steps, list)
        self.assertGreater(len(self.tracker.steps), 0)  # Should have default steps
    
    def test_add_custom_step(self):
        """Test adding custom deployment steps"""
        initial_count = len(self.tracker.steps)
        step = self.tracker.add_step(
            "test_step", 
            "Test Step", 
            "Testing step addition", 
            DeploymentStage.DEPLOYMENT
        )
        
        self.assertIsInstance(step, ProgressStep)
        self.assertEqual(len(self.tracker.steps), initial_count + 1)
        self.assertEqual(step.id, "test_step")
        self.assertEqual(step.stage, DeploymentStage.DEPLOYMENT)
    
    def test_step_lifecycle(self):
        """Test complete step lifecycle: start -> update -> complete"""
        # Add test step
        self.tracker.add_step("lifecycle_test", "Lifecycle Test", "Testing lifecycle", DeploymentStage.DEPLOYMENT)
        
        # Start step
        self.assertTrue(self.tracker.start_step("lifecycle_test"))
        step = self.tracker.get_step("lifecycle_test")
        self.assertEqual(step.status, DeploymentStatus.IN_PROGRESS)
        self.assertIsNotNone(step.start_time)
        
        # Update step progress
        self.tracker.update_step_progress("lifecycle_test", 50.0, {"test": "data"})
        self.assertEqual(step.progress_percent, 50.0)
        self.assertIn("test", step.details)
        
        # Complete step
        self.assertTrue(self.tracker.complete_step("lifecycle_test", {"completion": "success"}))
        self.assertEqual(step.status, DeploymentStatus.COMPLETED)
        self.assertEqual(step.progress_percent, 100.0)
        self.assertIsNotNone(step.end_time)
    
    def test_step_failure(self):
        """Test step failure handling"""
        self.tracker.add_step("failure_test", "Failure Test", "Testing failure", DeploymentStage.VALIDATION)
        
        # Fail step
        self.assertTrue(self.tracker.fail_step("failure_test", "Test error", {"error_code": 500}))
        step = self.tracker.get_step("failure_test")
        self.assertEqual(step.status, DeploymentStatus.FAILED)
        self.assertEqual(step.error_message, "Test error")
        self.assertIn("error_code", step.details)
    
    def test_progress_calculation(self):
        """Test overall progress calculation"""
        # Complete some default steps
        steps_to_complete = self.tracker.steps[:3]
        for step in steps_to_complete:
            self.tracker.start_step(step.id)
            self.tracker.complete_step(step.id)
        
        expected_progress = (len(steps_to_complete) / len(self.tracker.steps)) * 100
        self.assertAlmostEqual(self.tracker.overall_progress, expected_progress, places=1)
    
    def test_stage_progress(self):
        """Test stage-specific progress calculation"""
        # Get steps for initialization stage
        init_steps = self.tracker.get_steps_by_stage(DeploymentStage.INITIALIZATION)
        self.assertGreater(len(init_steps), 0)
        
        # Complete all initialization steps
        for step in init_steps:
            self.tracker.start_step(step.id)
            self.tracker.complete_step(step.id)
        
        # Check that initialization stage shows 100% progress
        self.assertEqual(self.tracker.stage_progress[DeploymentStage.INITIALIZATION], 100.0)
    
    def test_progress_summary(self):
        """Test progress summary generation"""
        summary = self.tracker.get_progress_summary()
        
        required_keys = ["deployment_name", "overall_progress", "current_stage", 
                        "stage_progress", "status_counts", "total_steps"]
        for key in required_keys:
            self.assertIn(key, summary)
        
        self.assertEqual(summary["deployment_name"], "test_deployment")
        self.assertIsInstance(summary["overall_progress"], (int, float))
        self.assertIsInstance(summary["total_steps"], int)

class TestMultiAgentDeploymentExecutor(unittest.TestCase):
    """Test cases for the enhanced multi-agent deployment executor"""
    
    def setUp(self):
        """Set up test fixtures"""
        self.executor = MultiAgentDeploymentExecutor()
    
    def test_executor_initialization(self):
        """Test that executor initializes with progress tracking"""
        self.assertIsNotNone(self.executor.progress_tracker)
        self.assertIsInstance(self.executor.progress_tracker, DeploymentProgressTracker)
        self.assertEqual(self.executor.progress_tracker.deployment_name, "multi_agent_deployment")
    
    def test_agent_activation_with_progress(self):
        """Test agent activation with progress tracking"""
        initial_progress = self.executor.progress_tracker.overall_progress
        
        # Activate agents (this should update progress)
        self.executor.activate_all_agents()
        
        # Check that progress was updated
        final_progress = self.executor.progress_tracker.overall_progress
        self.assertGreater(final_progress, initial_progress)
        
        # Check that init_agents step was completed
        init_step = self.executor.progress_tracker.get_step("init_agents")
        self.assertIsNotNone(init_step)
        self.assertEqual(init_step.status, DeploymentStatus.COMPLETED)
    
    def test_enhanced_monitor_progress(self):
        """Test enhanced progress monitoring"""
        result = self.executor.monitor_progress()
        
        # Check result structure
        self.assertIsInstance(result, dict)
        required_keys = ["overall_deployment", "platform_deployments", "agent_coordination"]
        for key in required_keys:
            self.assertIn(key, result)
        
        # Check overall deployment info
        overall = result["overall_deployment"]
        self.assertIn("progress_percentage", overall)
        self.assertIn("current_stage", overall)
        self.assertIn("status", overall)
        
        # Check platform deployments
        platforms = result["platform_deployments"]
        expected_platforms = ["render_deployment", "railway_deployment", "heroku_deployment", 
                            "pythonanywhere_deployment", "netlify_deployment"]
        for platform in expected_platforms:
            self.assertIn(platform, platforms)
    
    def test_platform_tracker_creation(self):
        """Test platform-specific tracker creation"""
        tracker = self.executor.create_platform_tracker("test_platform")
        
        self.assertIsInstance(tracker, DeploymentProgressTracker)
        self.assertEqual(tracker.deployment_name, "test_platform_deployment")
        self.assertIn("test_platform", self.executor.platform_trackers)
        
        # Check that platform-specific steps were added
        platform_step_ids = [step.id for step in tracker.steps]
        expected_steps = ["prep_platform_env", "validate_platform_config", 
                         "deploy_to_platform", "verify_platform_deployment"]
        for expected_step in expected_steps:
            self.assertIn(expected_step, platform_step_ids)

class TestProgressVisualizer(unittest.TestCase):
    """Test cases for progress visualization utilities"""
    
    def test_progress_bar_creation(self):
        """Test progress bar visualization"""
        # Test different progress values
        test_cases = [
            (0, "[░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░] 0.0%"),
            (50, "[████████████████████░░░░░░░░░░░░░░░░░░░░] 50.0%"),
            (100, "[████████████████████████████████████████] 100.0%"),
        ]
        
        for progress, expected in test_cases:
            result = ProgressVisualizer.create_progress_bar(progress)
            self.assertEqual(result, expected)
    
    def test_duration_formatting(self):
        """Test duration formatting"""
        from datetime import timedelta
        
        test_cases = [
            (timedelta(seconds=30), "30s"),
            (timedelta(minutes=5, seconds=30), "5m 30s"),
            (timedelta(hours=2, minutes=30, seconds=45), "2h 30m 45s"),
        ]
        
        for duration, expected in test_cases:
            result = ProgressVisualizer.format_duration(duration)
            self.assertEqual(result, expected)

def run_integration_test():
    """Run a simple integration test of the complete system"""
    print("\n🧪 Running Integration Test...")
    print("=" * 50)
    
    # Create executor and test basic functionality
    executor = MultiAgentDeploymentExecutor()
    
    # Test agent activation
    print("1. Testing agent activation...")
    executor.activate_all_agents()
    
    # Test progress monitoring
    print("2. Testing progress monitoring...")
    result = executor.monitor_progress()
    
    # Test platform tracker creation
    print("3. Testing platform tracker creation...")
    render_tracker = executor.create_platform_tracker("render")
    
    # Test a complete step lifecycle on platform tracker
    print("4. Testing platform deployment simulation...")
    render_tracker.start_step("prep_platform_env")
    render_tracker.update_step_progress("prep_platform_env", 50, {"test": "data"})
    render_tracker.complete_step("prep_platform_env", {"success": True})
    
    ProgressVisualizer.display_progress_summary(render_tracker)
    
    print("\n✅ Integration test completed successfully!")
    return True

if __name__ == "__main__":
    # Run unit tests
    print("🧪 SuggestlyG4Plus v2.0 - Deployment Progress Tests")
    print("=" * 60)
    
    # Run integration test first
    run_integration_test()
    
    # Run unit tests
    print("\n🔬 Running Unit Tests...")
    unittest.main(verbosity=2, exit=False)
    
    print("\n🎉 All tests completed!")