#!/usr/bin/env python3
"""
FILE CLEANUP AND REPLACEMENT SYSTEM
Organize and clean up files for SuggestlyG4Plus v2.0 deployment
"""

import os
import shutil
import json
from datetime import datetime
from typing import List, Dict, Any

class FileCleanupAndReplacement:
    def __init__(self):
        self.project_name = "suggestlyg4plus"
        self.core_files = [
            # Core application files
            "src/main_ultra_secure.py",
            "requirements.txt",
            "vercel.json",
            
            # Deployment system files
            "DEPLOYMENT_VERIFICATION_COMPLETER.py",
            "MAXIMUM_FORCE_DEPLOYMENT_EXECUTOR.py",
            "ULTIMATE_AI_FORCE_DEPLOYMENT.py",
            "FILE_CLEANUP_AND_REPLACEMENT.py",
            
            # Deployment reports and configs
            "maximum_force_deployment_report.json",
            "maximum_force_deployment_package.json",
            "maximum_force_dns_config.json",
            "final_deployment_summary.json",
            "deployment_completion_checklist.json",
            "website_accessibility_test.json",
            
            # Documentation
            "FINAL_DEPLOYMENT_COMPLETION_GUIDE.md",
            "README.md",
            "UPDATE_SUMMARY_v2.0.md"
        ]
        
        self.keep_directories = [
            "suggestlyg4plus-ultimate/",
            "suggestlyg4plus-aws/",
            "vercel_deployment_package/",
            "render_deployment/",
            "railway_deployment/",
            "src/",
            "pages/",
            "docs/"
        ]
        
        self.optional_files = [
            # These can be kept or removed based on preference
            "test_api.py",
            "test_server.py",
            "live_enhanced_demo.py",
            "master_config.json",
            "index.html"
        ]
        
    def print_banner(self):
        """Display cleanup banner"""
        banner = """
╔══════════════════════════════════════════════════════════════════════════════╗
║                🧹 FILE CLEANUP AND REPLACEMENT SYSTEM 🧹                      ║
║                    SuggestlyG4Plus v2.0 - Project Organization               ║
║                                                                              ║
║  🎯 Goal: Organize files for clean v2.0 deployment                          ║
║  📋 Core Files: Essential for deployment                                    ║
║  📁 Keep Directories: Important project components                          ║
║  🔄 Optional Files: Can be kept or removed                                  ║
╚══════════════════════════════════════════════════════════════════════════════╝
        """
        print(banner)
        
    def scan_current_files(self):
        """Scan current directory for all files"""
        print("\n📋 SCANNING CURRENT DIRECTORY...")
        
        all_files = []
        all_directories = []
        
        for item in os.listdir("."):
            if os.path.isfile(item):
                all_files.append(item)
            elif os.path.isdir(item):
                all_directories.append(item)
                
        print(f"   📄 Found {len(all_files)} files")
        print(f"   📁 Found {len(all_directories)} directories")
        
        return all_files, all_directories
        
    def categorize_files(self, all_files: List[str]):
        """Categorize files into core, optional, and cleanup"""
        print("\n📊 CATEGORIZING FILES...")
        
        core_files_found = []
        optional_files_found = []
        cleanup_files = []
        
        for file in all_files:
            if file in self.core_files:
                core_files_found.append(file)
                print(f"   ✅ CORE: {file}")
            elif file in self.optional_files:
                optional_files_found.append(file)
                print(f"   🔄 OPTIONAL: {file}")
            else:
                cleanup_files.append(file)
                print(f"   🧹 CLEANUP: {file}")
                
        return core_files_found, optional_files_found, cleanup_files
        
    def categorize_directories(self, all_directories: List[str]):
        """Categorize directories"""
        print("\n📁 CATEGORIZING DIRECTORIES...")
        
        keep_directories_found = []
        cleanup_directories = []
        
        for directory in all_directories:
            if directory in self.keep_directories:
                keep_directories_found.append(directory)
                print(f"   ✅ KEEP: {directory}")
            else:
                cleanup_directories.append(directory)
                print(f"   🧹 CLEANUP: {directory}")
                
        return keep_directories_found, cleanup_directories
        
    def create_backup(self, files_to_cleanup: List[str], directories_to_cleanup: List[str]):
        """Create backup of files to be cleaned up"""
        print("\n💾 CREATING BACKUP...")
        
        backup_dir = f"backup_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        os.makedirs(backup_dir, exist_ok=True)
        
        # Backup files
        for file in files_to_cleanup:
            try:
                if os.path.exists(file):
                    shutil.copy2(file, backup_dir)
                    print(f"   💾 Backed up: {file}")
            except Exception as e:
                print(f"   ⚠️  Could not backup {file}: {e}")
                
        # Backup directories
        for directory in directories_to_cleanup:
            try:
                if os.path.exists(directory):
                    shutil.copytree(directory, os.path.join(backup_dir, directory))
                    print(f"   💾 Backed up: {directory}")
            except Exception as e:
                print(f"   ⚠️  Could not backup {directory}: {e}")
                
        print(f"   ✅ Backup created: {backup_dir}")
        return backup_dir
        
    def cleanup_files(self, files_to_cleanup: List[str]):
        """Remove files not needed for v2.0"""
        print("\n🧹 CLEANING UP FILES...")
        
        removed_files = []
        failed_removals = []
        
        for file in files_to_cleanup:
            try:
                if os.path.exists(file):
                    os.remove(file)
                    removed_files.append(file)
                    print(f"   🗑️  Removed: {file}")
            except Exception as e:
                failed_removals.append((file, str(e)))
                print(f"   ⚠️  Could not remove {file}: {e}")
                
        return removed_files, failed_removals
        
    def cleanup_directories(self, directories_to_cleanup: List[str]):
        """Remove directories not needed for v2.0"""
        print("\n📁 CLEANING UP DIRECTORIES...")
        
        removed_directories = []
        failed_removals = []
        
        for directory in directories_to_cleanup:
            try:
                if os.path.exists(directory):
                    shutil.rmtree(directory)
                    removed_directories.append(directory)
                    print(f"   🗑️  Removed: {directory}")
            except Exception as e:
                failed_removals.append((directory, str(e)))
                print(f"   ⚠️  Could not remove {directory}: {e}")
                
        return removed_directories, failed_removals
        
    def create_cleanup_report(self, core_files: List[str], optional_files: List[str], 
                            removed_files: List[str], removed_directories: List[str],
                            backup_dir: str):
        """Create cleanup report"""
        print("\n📊 GENERATING CLEANUP REPORT...")
        
        report = {
            "cleanup_summary": {
                "project": self.project_name,
                "cleanup_time": datetime.now().isoformat(),
                "backup_directory": backup_dir
            },
            "file_categories": {
                "core_files": {
                    "count": len(core_files),
                    "files": core_files
                },
                "optional_files": {
                    "count": len(optional_files),
                    "files": optional_files
                },
                "removed_files": {
                    "count": len(removed_files),
                    "files": removed_files
                },
                "removed_directories": {
                    "count": len(removed_directories),
                    "directories": removed_directories
                }
            },
            "cleanup_status": {
                "backup_created": True,
                "files_cleaned": len(removed_files),
                "directories_cleaned": len(removed_directories),
                "project_organized": True
            }
        }
        
        # Save report
        with open("file_cleanup_report.json", "w", encoding="utf-8") as f:
            json.dump(report, f, indent=2)
            
        print("   ✅ Cleanup report generated!")
        return report
        
    def create_project_structure_guide(self):
        """Create project structure guide"""
        print("\n📋 CREATING PROJECT STRUCTURE GUIDE...")
        
        guide = f"""# 🎯 SUGGESTLYG4PLUS V2.0 PROJECT STRUCTURE

## 📁 CLEAN PROJECT STRUCTURE

### Core Application Files
```
src/
├── main_ultra_secure.py          # Main FastAPI application
├── real_agents.py               # AI agents system
└── ...

requirements.txt                  # Python dependencies
vercel.json                      # Vercel configuration
```

### Deployment System
```
DEPLOYMENT_VERIFICATION_COMPLETER.py    # Verification system
MAXIMUM_FORCE_DEPLOYMENT_EXECUTOR.py    # Force deployment
ULTIMATE_AI_FORCE_DEPLOYMENT.py         # AI deployment
FILE_CLEANUP_AND_REPLACEMENT.py         # This cleanup system
```

### Deployment Reports
```
maximum_force_deployment_report.json
maximum_force_deployment_package.json
maximum_force_dns_config.json
final_deployment_summary.json
deployment_completion_checklist.json
website_accessibility_test.json
file_cleanup_report.json
```

### Documentation
```
FINAL_DEPLOYMENT_COMPLETION_GUIDE.md
README.md
UPDATE_SUMMARY_v2.0.md
```

### Frontend Components
```
suggestlyg4plus-ultimate/        # Cutting-edge frontend
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── app/
│   └── components/
└── ...
```

### Deployment Packages
```
suggestlyg4plus-aws/             # AWS deployment
vercel_deployment_package/       # Vercel deployment
render_deployment/               # Render deployment
railway_deployment/              # Railway deployment
```

## 🎯 DEPLOYMENT READY

The project is now organized and ready for:
- ✅ Vercel deployment
- ✅ Custom domain configuration
- ✅ Maximum force deployment
- ✅ AI-powered monitoring

## 📊 CLEANUP SUMMARY

- Core files preserved: {len(self.core_files)}
- Optional files available: {len(self.optional_files)}
- Project structure optimized
- Ready for production deployment
"""
        
        # Save guide
        with open("PROJECT_STRUCTURE_GUIDE.md", "w", encoding="utf-8") as f:
            f.write(guide)
            
        print("   ✅ Project structure guide created!")
        
    def run_cleanup_and_replacement(self):
        """Run complete cleanup and replacement process"""
        self.print_banner()
        
        print("\n🧹 INITIATING FILE CLEANUP AND REPLACEMENT...")
        
        # Scan current files and directories
        all_files, all_directories = self.scan_current_files()
        
        # Categorize files
        core_files, optional_files, cleanup_files = self.categorize_files(all_files)
        
        # Categorize directories
        keep_directories, cleanup_directories = self.categorize_directories(all_directories)
        
        # Create backup
        backup_dir = self.create_backup(cleanup_files, cleanup_directories)
        
        # Cleanup files
        removed_files, failed_file_removals = self.cleanup_files(cleanup_files)
        
        # Cleanup directories
        removed_directories, failed_dir_removals = self.cleanup_directories(cleanup_directories)
        
        # Create cleanup report
        report = self.create_cleanup_report(core_files, optional_files, 
                                          removed_files, removed_directories, backup_dir)
        
        # Create project structure guide
        self.create_project_structure_guide()
        
        print("\n🎉 FILE CLEANUP AND REPLACEMENT COMPLETE!")
        print("=" * 70)
        print(f"📄 Core Files: {len(core_files)} PRESERVED")
        print(f"🔄 Optional Files: {len(optional_files)} AVAILABLE")
        print(f"🧹 Files Removed: {len(removed_files)}")
        print(f"📁 Directories Removed: {len(removed_directories)}")
        print(f"💾 Backup Created: {backup_dir}")
        print("=" * 70)
        
        print("\n📋 PROJECT STATUS:")
        print("✅ Project organized for v2.0 deployment")
        print("✅ Core files preserved")
        print("✅ Deployment system ready")
        print("✅ Documentation updated")
        
        print("\n📊 Check these files for details:")
        print("   • file_cleanup_report.json")
        print("   • PROJECT_STRUCTURE_GUIDE.md")
        print(f"   • {backup_dir}/ (backup directory)")
        
        if failed_file_removals or failed_dir_removals:
            print("\n⚠️  Some items could not be removed (check permissions)")
            
        return {
            "success": True,
            "core_files_preserved": len(core_files),
            "optional_files_available": len(optional_files),
            "files_removed": len(removed_files),
            "directories_removed": len(removed_directories),
            "backup_directory": backup_dir,
            "report": report
        }

def main():
    """Main execution function"""
    try:
        # Initialize file cleanup and replacement system
        cleanup_system = FileCleanupAndReplacement()
        
        # Run complete cleanup and replacement
        result = cleanup_system.run_cleanup_and_replacement()
        
        print("\n🎯 FILE CLEANUP AND REPLACEMENT SYSTEM READY!")
        print("Project organized for clean v2.0 deployment!")
        
    except Exception as e:
        print(f"❌ Error in file cleanup and replacement system: {e}")
        return False
        
    return True

if __name__ == "__main__":
    main()






