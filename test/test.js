#!/usr/bin/env node

/**
 * Simple test suite for Atlas
 */

const { generateDesignSystem } = require('../lib/generator');
const { listThemes } = require('../lib/themes');
const fs = require('fs');
const path = require('path');

// Setup temp directory for tests
const tmpBase = path.join(require('os').tmpdir(), `atlas-test-${Date.now()}`);
console.log(`Using temp dir: ${tmpBase}`);

console.log('🧪 Testing MindCore · Atlas\n');

let testsPassed = 0;
let testsFailed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    testsPassed++;
  } catch (error) {
    console.log(`✗ ${name}`);
    console.log(`  Error: ${error.message}`);
    testsFailed++;
  }
}

// Test 1: Theme listing
test('List themes', () => {
  const themes = listThemes();
  if (themes.length === 0) throw new Error('No themes found');
  if (!themes[0].name) throw new Error('Theme missing name');
});

// Test 2: Basic generation
test('Generate design system', () => {
  const result = generateDesignSystem({
    theme: 'cyberpunk',
    seed: 'test',
    output: path.join(tmpBase, 'atlas-test'),
    format: ['css', 'json'],
  });
  
  if (!result.designSystem) throw new Error('No design system generated');
  if (!result.designSystem.colors) throw new Error('No colors generated');
  if (!result.designSystem.typography) throw new Error('No typography generated');
  if (!result.designSystem.spacing) throw new Error('No spacing generated');
});

// Test 3: Deterministic output
test('Deterministic generation', () => {
  const result1 = generateDesignSystem({
    theme: 'minimal',
    seed: 'deterministic-test',
    output: path.join(tmpBase, 'atlas-test-1'),
    format: ['json'],
  });
  
  const result2 = generateDesignSystem({
    theme: 'minimal',
    seed: 'deterministic-test',
    output: path.join(tmpBase, 'atlas-test-2'),
    format: ['json'],
  });
  
  // Remove timestamp for comparison
  const ds1 = { ...result1.designSystem };
  const ds2 = { ...result2.designSystem };
  delete ds1.meta.generated;
  delete ds2.meta.generated;
  
  const json1 = JSON.stringify(ds1);
  const json2 = JSON.stringify(ds2);
  
  if (json1 !== json2) {
    throw new Error('Generation is not deterministic');
  }
});

// Test 4: File generation
test('Generate output files', () => {
  const testDir = path.join(tmpBase, 'atlas-test-output');
  const result = generateDesignSystem({
    theme: 'nature',
    seed: 'file-test',
    output: testDir,
    format: ['css', 'json', 'js'],
  });
  
  if (!fs.existsSync(testDir)) throw new Error('Output directory not created');
  if (!fs.existsSync(path.join(testDir, 'tokens.css'))) throw new Error('CSS file not created');
  if (!fs.existsSync(path.join(testDir, 'tokens.json'))) throw new Error('JSON file not created');
  if (!fs.existsSync(path.join(testDir, 'tokens.js'))) throw new Error('JS file not created');
  if (!fs.existsSync(path.join(testDir, 'README.md'))) throw new Error('README not created');
});

// Test 5: Component tokens
test('Generate component tokens', () => {
  const result = generateDesignSystem({
    theme: 'darkmode',
    seed: 'component-test',
    output: path.join(tmpBase, 'atlas-test-components'),
    format: ['css'],
    components: true,
  });
  
  if (!result.designSystem.components) throw new Error('No components generated');
  if (!result.designSystem.components.button) throw new Error('No button tokens');
  if (!result.designSystem.components.input) throw new Error('No input tokens');
});

// Test 6: All themes work
test('All themes generate successfully', () => {
  const themes = ['cyberpunk', 'minimal', 'nature', 'darkmode', 'sunset', 'arctic', 'retrowave', 'forest'];
  themes.forEach(themeName => {
    const result = generateDesignSystem({
      theme: themeName,
      seed: 'theme-test',
      output: path.join(tmpBase, `atlas-test-${themeName}`),
      format: ['json'],
    });
    if (!result.designSystem) throw new Error(`Theme ${themeName} failed`);
  });
});

// Summary
console.log(`\n📊 Test Results: ${testsPassed} passed, ${testsFailed} failed\n`);

if (testsFailed > 0) {
  process.exit(1);
}
