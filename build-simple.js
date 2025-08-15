const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting simple build process...');

try {
  // Set environment variables to avoid problematic dependencies
  process.env.SKIP_PREFLIGHT_CHECK = 'true';
  process.env.GENERATE_SOURCEMAP = 'false';
  process.env.INLINE_RUNTIME_CHUNK = 'false';
  
  // Run the build command
  console.log('📦 Running build...');
  execSync('npx react-scripts build', { 
    stdio: 'inherit',
    env: { ...process.env }
  });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
