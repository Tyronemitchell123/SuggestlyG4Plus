#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SuggestlyG4Plus Performance Optimizer');
console.log('=====================================\n');

// Check system resources
function checkSystemResources() {
  console.log('📊 Checking System Resources...');
  
  try {
    // Check Node.js version
    const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
    console.log(`✅ Node.js Version: ${nodeVersion}`);
    
    // Check npm version
    const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
    console.log(`✅ npm Version: ${npmVersion}`);
    
    // Check available memory (Windows)
    try {
      const memoryInfo = execSync('wmic computersystem get TotalPhysicalMemory', { encoding: 'utf8' });
      const totalMemory = parseInt(memoryInfo.split('\n')[1]) / (1024 * 1024 * 1024);
      console.log(`✅ Total RAM: ${totalMemory.toFixed(1)} GB`);
      
      if (totalMemory < 16) {
        console.log('⚠️  Warning: Consider upgrading to 32GB+ RAM for optimal performance');
      }
    } catch (e) {
      console.log('ℹ️  Memory check skipped (not Windows)');
    }
    
  } catch (error) {
    console.log('❌ Error checking system resources:', error.message);
  }
}

// Optimize npm configuration
function optimizeNpmConfig() {
  console.log('\n🔧 Optimizing npm Configuration...');
  
  try {
    // Set npm cache location to SSD if possible
    execSync('npm config set cache ~/.npm-cache', { stdio: 'inherit' });
    
    // Enable parallel downloads
    execSync('npm config set maxsockets 50', { stdio: 'inherit' });
    
    // Set registry to official npm
    execSync('npm config set registry https://registry.npmjs.org/', { stdio: 'inherit' });
    
    console.log('✅ npm configuration optimized');
  } catch (error) {
    console.log('❌ Error optimizing npm config:', error.message);
  }
}

// Clean and optimize project
function optimizeProject() {
  console.log('\n🧹 Cleaning and Optimizing Project...');
  
  try {
    // Clean npm cache
    execSync('npm cache clean --force', { stdio: 'inherit' });
    console.log('✅ npm cache cleaned');
    
    // Remove node_modules and package-lock.json
    if (fs.existsSync('node_modules')) {
      execSync('rm -rf node_modules', { stdio: 'inherit' });
      console.log('✅ node_modules removed');
    }
    
    if (fs.existsSync('package-lock.json')) {
      fs.unlinkSync('package-lock.json');
      console.log('✅ package-lock.json removed');
    }
    
    // Fresh install with optimized settings
    console.log('📦 Installing dependencies with optimizations...');
    execSync('npm install --prefer-offline --no-audit', { stdio: 'inherit' });
    console.log('✅ Dependencies installed');
    
  } catch (error) {
    console.log('❌ Error optimizing project:', error.message);
  }
}

// Check for performance issues
function checkPerformanceIssues() {
  console.log('\n🔍 Checking for Performance Issues...');
  
  try {
    // Check for large files
    const largeFiles = [];
    function findLargeFiles(dir, maxSize = 10 * 1024 * 1024) { // 10MB
      const files = fs.readdirSync(dir);
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
          findLargeFiles(filePath, maxSize);
        } else if (stat.isFile() && stat.size > maxSize) {
          largeFiles.push({ path: filePath, size: stat.size });
        }
      });
    }
    
    findLargeFiles('.');
    
    if (largeFiles.length > 0) {
      console.log('⚠️  Large files detected:');
      largeFiles.forEach(file => {
        console.log(`   ${file.path} (${(file.size / 1024 / 1024).toFixed(1)} MB)`);
      });
    } else {
      console.log('✅ No large files detected');
    }
    
    // Check for unused dependencies
    console.log('\n📦 Checking for unused dependencies...');
    try {
      execSync('npx depcheck', { stdio: 'inherit' });
    } catch (e) {
      console.log('ℹ️  Install depcheck with: npm install -g depcheck');
    }
    
  } catch (error) {
    console.log('❌ Error checking performance issues:', error.message);
  }
}

// Generate optimization recommendations
function generateRecommendations() {
  console.log('\n💡 Performance Recommendations:');
  console.log('==============================');
  
  const recommendations = [
    '🖥️  Hardware:',
    '   • Upgrade to 32GB+ RAM for better development experience',
    '   • Use NVMe SSD for faster file operations',
    '   • Consider dedicated GPU for Three.js development',
    '',
    '🛠️  Development:',
    '   • Use WSL2 for better performance on Windows',
    '   • Enable Developer Mode in Windows',
    '   • Install VS Code extensions for React/TypeScript',
    '',
    '⚡ Build Optimization:',
    '   • Use --max-old-space-size=8192 for large builds',
    '   • Implement code splitting and lazy loading',
    '   • Use production builds for testing',
    '',
    '🔒 Security:',
    '   • Run npm audit regularly',
    '   • Keep dependencies updated',
    '   • Use environment variables for secrets',
    '',
    '📊 Monitoring:',
    '   • Use React Profiler for performance monitoring',
    '   • Implement error tracking (Sentry)',
    '   • Monitor bundle size with webpack-bundle-analyzer'
  ];
  
  recommendations.forEach(rec => console.log(rec));
}

// Main execution
async function main() {
  checkSystemResources();
  optimizeNpmConfig();
  optimizeProject();
  checkPerformanceIssues();
  generateRecommendations();
  
  console.log('\n🎉 Optimization complete!');
  console.log('\nNext steps:');
  console.log('1. Start development server: npm start');
  console.log('2. Monitor performance with React DevTools');
  console.log('3. Run tests: npm test');
  console.log('4. Build for production: npm run build');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}

module.exports = {
  checkSystemResources,
  optimizeNpmConfig,
  optimizeProject,
  checkPerformanceIssues,
  generateRecommendations
};



