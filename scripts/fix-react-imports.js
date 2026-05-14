#!/usr/bin/env node

/**
 * Script to automatically add missing React imports to client components
 * This prevents "React is not defined" errors in Next.js app directory
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function findTsxFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
        traverse(fullPath);
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

function hasReactImport(content) {
  return /import\s+React\s*[,;]/.test(content);
}

function hasUseClientDirective(content) {
  return /"use client";/.test(content);
}

function hasJSX(content) {
  // Check if file contains JSX syntax
  return /<\/[A-Z][a-zA-Z]*>/.test(content) || 
         /<[A-Z][a-zA-Z]*[^>]*\/>/.test(content) ||
         /return\s*\(/.test(content);
}

function addReactImport(content) {
  const lines = content.split('\n');
  const useClientIndex = lines.findIndex(line => line.trim() === '"use client";');
  
  if (useClientIndex !== -1) {
    // Find the next non-empty line after "use client"
    let nextLineIndex = useClientIndex + 1;
    while (nextLineIndex < lines.length && lines[nextLineIndex].trim() === '') {
      nextLineIndex++;
    }
    
    // Check if there's already an import at this position
    if (nextLineIndex < lines.length && lines[nextLineIndex].trim().startsWith('import')) {
      // Insert React import before the first import
      lines.splice(nextLineIndex, 0, 'import React from "react";');
    } else {
      // Insert React import after "use client"
      lines.splice(useClientIndex + 1, 0, '');
      lines.splice(useClientIndex + 2, 0, 'import React from "react";');
    }
  } else {
    // No "use client" directive, add React import at the beginning
    lines.unshift('import React from "react";');
  }
  
  return lines.join('\n');
}

function fixFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Skip if already has React import
    if (hasReactImport(content)) {
      return { fixed: false, reason: 'Already has React import' };
    }
    
    // Skip if not a client component
    if (!hasUseClientDirective(content)) {
      return { fixed: false, reason: 'Not a client component' };
    }
    
    // Skip if doesn't contain JSX
    if (!hasJSX(content)) {
      return { fixed: false, reason: 'No JSX found' };
    }
    
    // Add React import
    const fixedContent = addReactImport(content);
    fs.writeFileSync(filePath, fixedContent, 'utf8');
    
    return { fixed: true, reason: 'Added missing React import' };
    
  } catch (error) {
    return { fixed: false, reason: `Error: ${error.message}` };
  }
}

function main() {
  log('🔧 React Import Fixer', colors.cyan);
  log('========================', colors.cyan);
  
  const projectRoot = process.cwd();
  const componentsDir = path.join(projectRoot, 'components');
  const appDir = path.join(projectRoot, 'app');
  
  if (!fs.existsSync(componentsDir) && !fs.existsSync(appDir)) {
    log('❌ No components or app directory found', colors.red);
    process.exit(1);
  }
  
  const searchDirs = [];
  if (fs.existsSync(componentsDir)) searchDirs.push(componentsDir);
  if (fs.existsSync(appDir)) searchDirs.push(appDir);
  
  let totalFiles = 0;
  let fixedFiles = 0;
  let skippedFiles = 0;
  
  for (const dir of searchDirs) {
    log(`\n📁 Scanning ${path.relative(projectRoot, dir)}...`, colors.blue);
    
    const tsxFiles = findTsxFiles(dir);
    totalFiles += tsxFiles.length;
    
    for (const file of tsxFiles) {
      const relativePath = path.relative(projectRoot, file);
      const result = fixFile(file);
      
      if (result.fixed) {
        log(`  ✅ Fixed: ${relativePath}`, colors.green);
        fixedFiles++;
      } else {
        log(`  ⏭️  Skipped: ${relativePath} (${result.reason})`, colors.yellow);
        skippedFiles++;
      }
    }
  }
  
  log('\n📊 Summary:', colors.cyan);
  log(`  Total files scanned: ${totalFiles}`, colors.reset);
  log(`  Files fixed: ${fixedFiles}`, colors.green);
  log(`  Files skipped: ${skippedFiles}`, colors.yellow);
  
  if (fixedFiles > 0) {
    log(`\n✅ Successfully fixed ${fixedFiles} file(s)!`, colors.green);
    log('   Try running your development server again.', colors.green);
  } else {
    log('\n✨ No files needed fixing!', colors.green);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { fixFile, findTsxFiles, hasReactImport, hasUseClientDirective, hasJSX };
