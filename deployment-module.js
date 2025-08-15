#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 SUGGESTLY ELITE - Comprehensive Deployment Module');
console.log('==================================================');

class DeploymentModule {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.success = [];
  }

  // Fix Node.js version issue
  fixNodeVersion() {
    try {
      console.log('🔧 Fixing Node.js version...');
      
      // Update package.json engines
      const packagePath = path.join(__dirname, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      packageJson.engines = {
        "node": "22.x",
        "npm": ">=8.0.0"
      };
      
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      this.success.push('✅ Node.js version updated to 22.x');
      
    } catch (error) {
      this.errors.push(`❌ Node.js version fix failed: ${error.message}`);
    }
  }

  // Fix TypeScript module issue
  fixTypeScriptModule() {
    try {
      console.log('🔧 Fixing TypeScript module...');
      
      // Ensure TypeScript is in dependencies, not just devDependencies
      const packagePath = path.join(__dirname, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      if (!packageJson.dependencies.typescript) {
        packageJson.dependencies.typescript = "^4.9.5";
      }
      
      // Move TypeScript from devDependencies to dependencies for Vercel
      if (packageJson.devDependencies.typescript) {
        delete packageJson.devDependencies.typescript;
      }
      
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      this.success.push('✅ TypeScript moved to dependencies');
      
    } catch (error) {
      this.errors.push(`❌ TypeScript fix failed: ${error.message}`);
    }
  }

  // Fix build configuration
  fixBuildConfig() {
    try {
      console.log('🔧 Fixing build configuration...');
      
      const packagePath = path.join(__dirname, 'package.json');
      const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Update vercel-build script
      packageJson.scripts['vercel-build'] = 'npm install --legacy-peer-deps && CI=false npm run build';
      
      // Add build environment variables
      packageJson.scripts.build = 'GENERATE_SOURCEMAP=false react-scripts build';
      
      fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
      this.success.push('✅ Build configuration updated');
      
    } catch (error) {
      this.errors.push(`❌ Build config fix failed: ${error.message}`);
    }
  }

  // Create reliable Vercel configuration
  createVercelConfig() {
    try {
      console.log('🔧 Creating reliable Vercel configuration...');
      
      const vercelConfig = {
        "version": 2,
        "builds": [
          {
            "src": "package.json",
            "use": "@vercel/static-build",
            "config": {
              "distDir": "build",
              "installCommand": "npm install --legacy-peer-deps",
              "buildCommand": "CI=false npm run build"
            }
          }
        ],
        "routes": [
          {
            "src": "/(.*)",
            "dest": "/index.html"
          }
        ],
        "env": {
          "CI": "false",
          "NODE_ENV": "production",
          "GENERATE_SOURCEMAP": "false"
        }
      };
      
      fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
      this.success.push('✅ Vercel configuration created');
      
    } catch (error) {
      this.errors.push(`❌ Vercel config creation failed: ${error.message}`);
    }
  }

  // Install dependencies with proper flags
  installDependencies() {
    try {
      console.log('📦 Installing dependencies...');
      
      // Clear npm cache
      execSync('npm cache clean --force', { stdio: 'inherit' });
      
      // Remove existing node_modules and package-lock
      if (fs.existsSync('node_modules')) {
        fs.rmSync('node_modules', { recursive: true, force: true });
      }
      if (fs.existsSync('package-lock.json')) {
        fs.unlinkSync('package-lock.json');
      }
      
      // Install with legacy peer deps
      execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
      
      this.success.push('✅ Dependencies installed successfully');
      
    } catch (error) {
      this.errors.push(`❌ Dependency installation failed: ${error.message}`);
    }
  }

  // Test build process
  testBuild() {
    try {
      console.log('🧪 Testing build process...');
      
      // Set environment variables
      process.env.CI = 'false';
      process.env.NODE_ENV = 'production';
      process.env.GENERATE_SOURCEMAP = 'false';
      
      // Run build
      execSync('npm run build', { stdio: 'inherit' });
      
      // Verify build output
      if (fs.existsSync(path.join(__dirname, 'build'))) {
        this.success.push('✅ Build test successful');
      } else {
        this.errors.push('❌ Build output not found');
      }
      
    } catch (error) {
      this.errors.push(`❌ Build test failed: ${error.message}`);
    }
  }

  // Create deployment verification script
  createVerificationScript() {
    try {
      console.log('🔧 Creating deployment verification script...');
      
      const verificationScript = `#!/usr/bin/env node

console.log('🔍 SUGGESTLY ELITE - Deployment Verification');
console.log('===========================================');

const fs = require('fs');
const path = require('path');

// Check required files
const requiredFiles = [
  'package.json',
  'vercel.json',
  'src/index.js',
  'src/App.js'
];

console.log('📋 Checking required files...');
requiredFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log('✅', file);
  } else {
    console.log('❌', file, '- MISSING');
  }
});

// Check package.json configuration
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  console.log('\\n📦 Package.json verification:');
  console.log('✅ Node version:', packageJson.engines?.node || 'NOT SET');
  console.log('✅ Vercel build script:', packageJson.scripts['vercel-build'] ? 'SET' : 'MISSING');
  console.log('✅ TypeScript dependency:', packageJson.dependencies?.typescript ? 'PRESENT' : 'MISSING');
  
} catch (error) {
  console.log('❌ Package.json verification failed:', error.message);
}

// Check build directory
if (fs.existsSync('build')) {
  console.log('\\n📁 Build directory: PRESENT');
  const buildFiles = fs.readdirSync('build');
  console.log('   Files:', buildFiles.length);
} else {
  console.log('\\n📁 Build directory: MISSING');
}

console.log('\\n🎉 Verification complete!');
`;

      fs.writeFileSync('verify-deployment.js', verificationScript);
      this.success.push('✅ Verification script created');
      
    } catch (error) {
      this.errors.push(`❌ Verification script creation failed: ${error.message}`);
    }
  }

  // Run all fixes
  async runAllFixes() {
    console.log('🚀 Starting comprehensive deployment fixes...\n');
    
    this.fixNodeVersion();
    this.fixTypeScriptModule();
    this.fixBuildConfig();
    this.createVercelConfig();
    this.installDependencies();
    this.testBuild();
    this.createVerificationScript();
    
    // Summary
    console.log('\n📊 Deployment Fix Summary:');
    console.log('==========================');
    
    this.success.forEach(msg => console.log(msg));
    this.warnings.forEach(msg => console.log('⚠️', msg));
    this.errors.forEach(msg => console.log(msg));
    
    if (this.errors.length === 0) {
      console.log('\n🎉 All fixes applied successfully!');
      console.log('🚀 Your deployment should now work smoothly.');
    } else {
      console.log('\n❌ Some fixes failed. Please check the errors above.');
    }
  }
}

// Run the deployment module
const deploymentModule = new DeploymentModule();
deploymentModule.runAllFixes();
