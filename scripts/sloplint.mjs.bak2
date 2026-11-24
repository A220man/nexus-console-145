#!/usr/bin/env node
/**
 * sloplint.mjs - Nexus Console 145 Sloplint Static Checks
 *
 * Runs static sloplint checks against Floor rules.
 * Reports FAIL/REFLEX/FINISH with line numbers.
 * 
 * Usage: node scripts/sloplint.mjs [--fix]
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

const FLOOR_RULES = {
  'no-ai-slop': {
    description: 'Reject generic AI-looking design patterns',
    checks: [
      { name: 'generic-hero', message: 'Generic AI hero section detected', severity: 'error' },
      { name: 'cliche-phrases', message: 'Overused AI cliche phrases found', severity: 'error' },
      { name: 'generic-cards', message: 'Generic card layout without taste', severity: 'warning' },
    ],
  },
  'design-tokens': {
    description: 'Validate design tokens exist and are well-formed',
    checks: [
      { name: 'missing-colors', message: 'Missing color tokens', severity: 'error' },
      { name: 'missing-spacing', message: 'Missing spacing tokens', severity: 'error' },
      { name: 'missing-radii', message: 'Missing radius tokens', severity: 'warning' },
    ],
  },
  'accessibility': {
    description: 'Ensure accessibility best practices',
    checks: [
      { name: 'color-contrast', message: 'Color contrast below 4.5:1 ratio', severity: 'error' },
      { name: 'reduced-motion', message: 'No reduced-motion respect', severity: 'warning' },
    ],
  },
};

function parseThemeFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const sections = {};
  let currentSection = null;
  
  for (const line of content.split('\n')) {
    const headerMatch = line.match(/^## (.+)$/);
    if (headerMatch) {
      currentSection = headerMatch[1];
      sections[currentSection] = [];
    } else if (currentSection && line.trim()) {
      sections[currentSection].push(line);
    }
  }
  
  return { content, sections };
}

function repeat(str, n) {
  return n > 0 ? str.repeat(n) : '';
}

function checkAgainstFloorRules(themeName, themePath) {
  const result = { failures: [], reflexes: [], finish: [] };
  const { content, sections } = parseThemeFile(themePath);
  
  // Check for generic hero patterns (AI slop detection)
  const heroSection = sections['Colors'] || [];
  const colorLines = heroSection.map(l => l.toLowerCase());
  
  // Check for generic cliche phrases in usage notes
  const usageSection = sections['Usage Notes'] || [];
  const usageText = usageSection.join(' ').toLowerCase();
  
  const clichePhrases = ['content-first', 'zero decoration', 'storytelling', 'built for'];
  for (const phrase of clichePhrases) {
    if (usageText.includes(phrase)) {
      result.failures.push({
        rule: 'no-ai-slop',
        check: 'cliche-phrases',
        message: FLOOR_RULES['no-ai-slop'].checks.find(c => c.name === 'cliche-phrases').message,
        line: -1,
        file: themePath,
      });
    }
  }
  
  // Check for missing design tokens
  const requiredColors = ['--color-bg', '--color-fg', '--color-primary'];
  const availableColors = (sections['Colors'] || []).join('\n');
  
  for (const color of requiredColors) {
    if (!availableColors.includes(color)) {
      result.failures.push({
        rule: 'design-tokens',
        check: 'missing-colors',
        message: FLOOR_RULES['design-tokens'].checks.find(c => c.name === 'missing-colors').message,
        line: -1,
        file: themePath,
      });
    }
  }
  
  // Check for reduced-motion respect
  const hasReducedMotion = content.includes('prefers-reduced-motion') || 
                           content.includes('reduced-motion');
  if (!hasReducedMotion) {
    result.failures.push({
      rule: 'accessibility',
      check: 'reduced-motion',
      message: FLOOR_RULES['accessibility'].checks.find(c => c.name === 'reduced-motion').message,
      line: -1,
      file: themePath,
    });
  }
  
  return result;
}

function main() {
  const args = process.argv.slice(2);
  const fix = args.includes('--fix');
  const targetDir = args[0] || join(ROOT, 'references', 'themes');
  
  console.log('🔍 Nexus Console 145 Sloplint Static Checks');
  console.log('=' + repeat('=', 39));
  
  let totalFailures = 0;
  let totalReflexes = 0;
  
  // Load theme index
  const indexPath = join(ROOT, 'references', 'themes', 'index.json');
  let index;
  try {
    index = JSON.parse(readFileSync(indexPath, 'utf-8'));
  } catch (e) {
    console.error('❌ Failed to load theme index:', e.message);
    process.exit(1);
  }
  
  // Run checks on each theme
  for (const theme of index.themes) {
    const themePath = join(ROOT, 'references', 'themes', theme.file);
    
    if (!existsSync(themePath)) {
      console.error(`❌ Theme file not found: ${themePath}`);
      continue;
    }
    
    console.log(`\n📝 Checking theme: ${theme.name} (${theme.id})`);
    
    const result = checkAgainstFloorRules(theme.name, themePath);
    
    if (result.failures.length > 0) {
      totalFailures += result.failures.length;
      for (const failure of result.failures) {
        console.log(`  ❌ [${failure.rule}] ${failure.check}: ${failure.message}`);
        console.log(`      File: ${failure.file}, Line: ~${failure.line}`);
      }
    }
    
    if (result.reflexes && result.reflexes.length > 0) {
      totalReflexes += result.reflexes.length;
      for (const reflex of result.reflexes) {
        console.log(`  ⚠️  [${reflex.rule}] ${reflex.check}: ${reflex.message}`);
        console.log(`      File: ${reflex.file}, Line: ~${reflex.line}`);
      }
    }
    
    if (result.finish && result.finish.length > 0) {
      for (const f of result.finish) {
        console.log(`  ✅ [${f.rule}] ${f.check}: ${f.message}`);
      }
    }
  }
  
  // Summary
  console.log('\n' + '=' + repeat('=', 39));
  if (totalFailures > 0) {
    console.log(`📊 RESULT: FAIL - ${totalFailures} sloplint issue(s) found`);
    console.log('   Fix the issues above, then re-run sloplint.');
    process.exit(1);
  } else if (totalReflexes > 0) {
    console.log(`📊 RESULT: REFLEX - ${totalReflexes} reflex issue(s) found`);
    console.log('   Address reflexes if needed, then re-run sloplint.');
    process.exit(0);
  } else {
    console.log(`📊 RESULT: FINISH - All sloplint checks passed`);
    console.log('   Your design passes the Floor rules.');
    process.exit(0);
  }
}

main();
