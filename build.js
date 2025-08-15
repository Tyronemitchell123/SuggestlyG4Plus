const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SUGGESTLY ELITE - Building for Production');
console.log('============================================');

try {
  // Set environment variables
  process.env.CI = 'false';
  process.env.NODE_ENV = 'production';
  
  console.log('📦 Installing dependencies...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  console.log('🔨 Building React application...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
  console.log('📁 Build output: ./build/');
  
  // Check if build directory exists
  if (fs.existsSync(path.join(__dirname, 'build'))) {
    console.log('🎉 Build verification: SUCCESS');
  } else {
    console.error('❌ Build verification: FAILED - build directory not found');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
