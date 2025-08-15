const fs = require('fs');
const path = require('path');

// Function to recursively find all JS/JSX/TS/TSX files
function findFiles(dir, extensions = ['.js', '.jsx', '.ts', '.tsx']) {
  let results = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (
      stat &&
      stat.isDirectory() &&
      !file.startsWith('.') &&
      file !== 'node_modules'
    ) {
      results = results.concat(findFiles(filePath, extensions));
    } else if (extensions.some(ext => file.endsWith(ext))) {
      results.push(filePath);
    }
  });

  return results;
}

// Function to remove unused imports
function cleanupUnusedImports(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove unused lucide-react imports
    const lucideImportRegex =
      /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/g;
    const matches = content.match(lucideImportRegex);

    if (matches) {
      matches.forEach(match => {
        const importMatch = match.match(
          /import\s*{\s*([^}]+)\s*}\s*from\s*['"]lucide-react['"];?/
        );
        if (importMatch) {
          const imports = importMatch[1].split(',').map(imp => imp.trim());
          const usedImports = [];

          imports.forEach(imp => {
            const cleanImp = imp.replace(/\s+as\s+\w+/, '').trim();
            if (
              content.includes(cleanImp) &&
              !content.match(new RegExp(`\\b${cleanImp}\\s*=\\s*undefined`))
            ) {
              usedImports.push(imp);
            }
          });

          if (usedImports.length !== imports.length) {
            const newImport = `import { ${usedImports.join(', ')} } from 'lucide-react';`;
            content = content.replace(match, newImport);
            modified = true;
          }
        }
      });
    }

    // Remove unused React imports
    const reactImportRegex =
      /import\s*React,\s*{\s*([^}]+)\s*}\s*from\s*['"]react['"];?/g;
    const reactMatches = content.match(reactImportRegex);

    if (reactMatches) {
      reactMatches.forEach(match => {
        const importMatch = match.match(
          /import\s*React,\s*{\s*([^}]+)\s*}\s*from\s*['"]react['"];?/
        );
        if (importMatch) {
          const imports = importMatch[1].split(',').map(imp => imp.trim());
          const usedImports = [];

          imports.forEach(imp => {
            const cleanImp = imp.replace(/\s+as\s+\w+/, '').trim();
            if (content.includes(cleanImp)) {
              usedImports.push(imp);
            }
          });

          if (usedImports.length !== imports.length) {
            const newImport = `import React, { ${usedImports.join(', ')} } from 'react';`;
            content = content.replace(match, newImport);
            modified = true;
          }
        }
      });
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned up unused imports in: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Function to remove unused variables
function cleanupUnusedVariables(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    // Remove unused useState variables
    const useStateRegex = /const\s*\[\s*(\w+),\s*set\w+\s*\]\s*=\s*useState\(/g;
    let match;

    while ((match = useStateRegex.exec(content)) !== null) {
      const varName = match[1];
      const setterName = `set${varName.charAt(0).toUpperCase() + varName.slice(1)}`;

      // Check if the variable is used
      const varUsage = content.match(new RegExp(`\\b${varName}\\b`, 'g'));
      const setterUsage = content.match(new RegExp(`\\b${setterName}\\b`, 'g'));

      if (
        varUsage &&
        varUsage.length === 1 &&
        (!setterUsage || setterUsage.length === 1)
      ) {
        // Variable is only used in the declaration, remove it
        const fullMatch = match[0];
        const replacement = `const [_, ${setterName}] = useState(`;
        content = content.replace(fullMatch, replacement);
        modified = true;
      }
    }

    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Cleaned up unused variables in: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Main execution
console.log('🧹 Starting cleanup of unused imports and variables...');

const srcDir = path.join(__dirname, 'src');
const files = findFiles(srcDir);

console.log(`📁 Found ${files.length} files to process`);

files.forEach(file => {
  cleanupUnusedImports(file);
  cleanupUnusedVariables(file);
});

console.log('✨ Cleanup completed!');
console.log('💡 Run "npm run lint:check" to verify the improvements');



