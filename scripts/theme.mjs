#!/usr/bin/env node
/**
 * theme.mjs - Nexus Console 145 Theme CLI
 *
 * Commands:
 *   theme deal [genre]           - Deal 3 themes, optionally filtered by genre
 *   theme draw <job>             - Deal page anatomy from job description
 *   theme scaffold <theme-id>    - Emit tokens.css and base.css for a theme
 *   theme validate <theme-file>  - Validate theme file contract
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const THEMES_DIR = join(ROOT, 'references', 'themes');
const INDEX_FILE = join(THEMES_DIR, 'index.json');

function loadIndex() {
  if (!existsSync(INDEX_FILE)) {
    throw new Error(`Theme index not found at ${INDEX_FILE}`);
  }
  return JSON.parse(readFileSync(INDEX_FILE, 'utf-8'));
}

function loadTheme(themeFile) {
  const themePath = join(THEMES_DIR, themeFile);
  if (!existsSync(themePath)) {
    throw new Error(`Theme file not found: ${themePath}`);
  }
  return readFileSync(themePath, 'utf-8');
}

function parseThemeMarkdown(content) {
  const tokens = {
    colors: {},
    typography: {},
    spacing: {},
    radii: {},
    shadows: {},
    transitions: {},
    components: {}
  };

  let currentCategory = null;
  let currentSubsection = null;

  // Map markdown section names to token categories
  const categoryMap = {
    'colors': 'colors',
    'typography': 'typography',
    'spacing': 'spacing',
    'radii': 'radii',
    'shadows': 'shadows',
    'transitions': 'transitions',
    'component-tokens': 'components',
    'components': 'components',
    'button': 'button',
    'input': 'input',
    'card': 'card',
    'heading': 'heading',
    'code-block': 'code-block',
    'table': 'table',
    'accent-line': 'accent-line',
    'divider': 'divider'
  };

  for (const line of content.split('\n')) {
    const sectionMatch = line.match(/^##\s+(.+)$/);
    if (sectionMatch) {
      const sectionName = sectionMatch[1].toLowerCase().replace(/\s+/g, '-');
      // Check if this is a Design Tokens or Component Tokens parent section
      if (sectionName === 'design-tokens' || sectionName === 'component-tokens') {
        currentCategory = sectionName;
        currentSubsection = null;
      } else if (categoryMap[sectionName]) {
        currentCategory = categoryMap[sectionName];
        currentSubsection = null;
      } else {
        currentCategory = null;
        currentSubsection = null;
      }
      continue;
    }

    const subsectionMatch = line.match(/^###\s+(.+)$/);
    if (subsectionMatch) {
      const subName = subsectionMatch[1].toLowerCase().replace(/\s+/g, '-');
      if (categoryMap[subName]) {
        currentSubsection = categoryMap[subName];
        // Also set currentCategory to the parent category if it's a design token
        if (['colors', 'typography', 'spacing', 'radii', 'shadows', 'transitions'].includes(currentSubsection)) {
          currentCategory = 'design-tokens';
        } else {
          currentCategory = 'component-tokens';
        }
      } else {
        currentSubsection = null;
      }
      continue;
    }

    const tokenMatch = line.match(/^-\s+`--([^:]+)`:\s*(.+)$/);
    if (tokenMatch && (currentCategory || currentSubsection)) {
      const [, name, value] = tokenMatch;
      const cleanValue = value.trim().replace(/^`|`$/g, '');

      // Determine target object
      let target = null;
      if (currentSubsection && tokens[currentSubsection] !== undefined) {
        target = tokens[currentSubsection];
      } else if (currentCategory === 'design-tokens' && currentSubsection && tokens[currentSubsection] !== undefined) {
        target = tokens[currentSubsection];
      } else if (currentCategory === 'component-tokens' && currentSubsection && tokens.components !== undefined) {
        if (!tokens.components[currentSubsection]) {
          tokens.components[currentSubsection] = {};
        }
        target = tokens.components[currentSubsection];
      } else if (currentCategory && tokens[currentCategory] !== undefined) {
        target = tokens[currentCategory];
      }

      if (target !== null) {
        target[name] = cleanValue;
      }
    }
  }

  return tokens;
}

function dealThemes(genre = null) {
  const index = loadIndex();
  let themes = index.themes;

  if (genre) {
    themes = themes.filter(t => t.genre === genre);
    if (themes.length === 0) {
      console.log(`No themes found for genre: ${genre}`);
      console.log(`Available genres: clean, expressive, technical`);
      return;
    }
  }

  // Shuffle and take 3
  const shuffled = [...themes].sort(() => Math.random() - 0.5);
  const dealt = shuffled.slice(0, Math.min(3, shuffled.length));

  console.log(`🎴 Dealt ${dealt.length} theme${dealt.length !== 1 ? 's' : ''}${genre ? ` (genre: ${genre})` : ''}:\n`);

  for (const theme of dealt) {
    console.log(`  ${theme.name} (${theme.id})`);
    console.log(`  Genre: ${theme.genre}`);
    console.log(`  ${theme.description}\n`);
  }

  return dealt;
}

function drawAnatomy(jobDescription) {
  console.log(`🎨 Drawing page anatomy for: ${jobDescription}\n`);

  // Simple keyword-based anatomy detection
  const anatomy = {
    sections: [],
    components: [],
    patterns: []
  };

  const lowerJob = jobDescription.toLowerCase();

  // Detect sections
  if (lowerJob.includes('hero') || lowerJob.includes('landing') || lowerJob.includes('homepage')) {
    anatomy.sections.push('Hero');
  }
  if (lowerJob.includes('feature') || lowerJob.includes('benefit') || lowerJob.includes('capability')) {
    anatomy.sections.push('Features');
  }
  if (lowerJob.includes('testimonial') || lowerJob.includes('review') || lowerJob.includes('social proof')) {
    anatomy.sections.push('Testimonials');
  }
  if (lowerJob.includes('pricing') || lowerJob.includes('plan') || lowerJob.includes('tier')) {
    anatomy.sections.push('Pricing');
  }
  if (lowerJob.includes('footer') || lowerJob.includes('contact') || lowerJob.includes('cta')) {
    anatomy.sections.push('Footer/CTA');
  }
  if (lowerJob.includes('blog') || lowerJob.includes('article') || lowerJob.includes('post')) {
    anatomy.sections.push('Blog/Articles');
  }
  if (lowerJob.includes('dashboard') || lowerJob.includes('admin') || lowerJob.includes('panel')) {
    anatomy.sections.push('Dashboard');
    anatomy.components.push('Sidebar', 'Data Table', 'Metric Cards');
  }
  if (lowerJob.includes('form') || lowerJob.includes('signup') || lowerJob.includes('register') || lowerJob.includes('login')) {
    anatomy.components.push('Form', 'Input Fields', 'Validation');
  }
  if (lowerJob.includes('navigation') || lowerJob.includes('menu') || lowerJob.includes('nav')) {
    anatomy.components.push('Navigation', 'Breadcrumb');
  }
  if (lowerJob.includes('card') || lowerJob.includes('grid') || lowerJob.includes('gallery')) {
    anatomy.components.push('Card Grid');
  }
  if (lowerJob.includes('modal') || lowerJob.includes('dialog') || lowerJob.includes('popup')) {
    anatomy.components.push('Modal/Dialog');
  }

  // Default sections if none detected
  if (anatomy.sections.length === 0) {
    anatomy.sections = ['Hero', 'Features', 'Footer/CTA'];
  }

  // Detect patterns
  if (lowerJob.includes('responsive') || lowerJob.includes('mobile')) {
    anatomy.patterns.push('Responsive Breakpoints');
  }
  if (lowerJob.includes('dark') || lowerJob.includes('theme')) {
    anatomy.patterns.push('Theme Switching');
  }
  if (lowerJob.includes('accessib') || lowerJob.includes('a11y')) {
    anatomy.patterns.push('Accessibility First');
  }
  if (lowerJob.includes('animation') || lowerJob.includes('motion') || lowerJob.includes('transition')) {
    anatomy.patterns.push('Motion/Animation');
  }

  console.log('📐 Page Sections:');
  for (const section of anatomy.sections) {
    console.log(`  • ${section}`);
  }

  console.log('\n🧩 Components:');
  for (const component of anatomy.components) {
    console.log(`  • ${component}`);
  }

  console.log('\n🎯 Patterns:');
  for (const pattern of anatomy.patterns) {
    console.log(`  • ${pattern}`);
  }

  return anatomy;
}

function scaffoldTheme(themeId) {
  const index = loadIndex();
  const themeMeta = index.themes.find(t => t.id === themeId);

  if (!themeMeta) {
    console.error(`Theme not found: ${themeId}`);
    console.log('Available themes:');
    for (const t of index.themes) {
      console.log(`  ${t.id} - ${t.name} (${t.genre})`);
    }
    process.exit(1);
  }

  const themeContent = loadTheme(themeMeta.file);
  const tokens = parseThemeMarkdown(themeContent);

  const outputDir = join(process.cwd(), 'theme-output', themeId);
  mkdirSync(outputDir, { recursive: true });

  // Generate tokens.css
  let tokensCss = `:root {\n`;
  for (const [category, values] of Object.entries(tokens)) {
    if (typeof values === 'object' && values !== null) {
      for (const [name, value] of Object.entries(values)) {
        if (typeof value === 'object' && value !== null) {
          for (const [subName, subValue] of Object.entries(value)) {
            tokensCss += `  --${category}-${name}-${subName}: ${subValue};\n`;
          }
        } else {
          tokensCss += `  --${category}-${name}: ${value};\n`;
        }
      }
    }
  }
  tokensCss += `}\n`;

  writeFileSync(join(outputDir, 'tokens.css'), tokensCss);
  console.log(`✅ Generated tokens.css`);

  // Generate base.css
  const baseCss = generateBaseCss(tokens);
  writeFileSync(join(outputDir, 'base.css'), baseCss);
  console.log(`✅ Generated base.css`);

  console.log(`\n📁 Output: ${outputDir}`);
  console.log(`   Theme: ${themeMeta.name} (${themeMeta.genre})`);
}

function generateBaseCss(tokens) {
  let css = `/* Base styles for theme */\n\n`;

  // Reset
  css += `*, *::before, *::after { box-sizing: border-box; }\n\n`;

  // Root typography
  css += `html { font-size: 16px; -webkit-font-smoothing: antialiased; }\n`;
  css += `body { margin: 0; font-family: ${tokens.typography?.['font-sans'] || 'system-ui, sans-serif'}; color: ${tokens.colors?.['color-fg'] || '#1a1a2e'}; background-color: ${tokens.colors?.['color-bg'] || '#ffffff'}; line-height: ${tokens.typography?.['leading-normal'] || '1.5'}; }\n\n`;

  // Headings
  css += `h1, h2, h3, h4, h5, h6 { margin: 0 0 var(--spacing-4); font-weight: 600; line-height: ${tokens.typography?.['leading-tight'] || '1.1'}; color: ${tokens.colors?.['color-fg'] || '#1a1a2e'}; }\n`;
  css += `h1 { font-size: var(--typography-text-4xl); }\n`;
  css += `h2 { font-size: var(--typography-text-3xl); }\n`;
  css += `h3 { font-size: var(--typography-text-2xl); }\n`;
  css += `h4 { font-size: var(--typography-text-xl); }\n`;
  css += `h5 { font-size: var(--typography-text-lg); }\n`;
  css += `h6 { font-size: var(--typography-text-base); }\n\n`;

  // Links
  css += `a { color: ${tokens.colors?.['color-primary'] || '#2563eb'}; text-decoration: none; }\n`;
  css += `a:hover { text-decoration: underline; }\n\n`;

  // Buttons
  css += `.btn { display: inline-flex; align-items: center; justify-content: center; gap: var(--components-button-gap); padding: var(--components-button-padding-y) var(--components-button-padding-x); font-family: ${tokens.typography?.['font-sans'] || 'inherit'}; font-size: var(--typography-text-sm); font-weight: var(--components-button-font-weight); border-radius: var(--components-button-radius); border: none; cursor: pointer; transition: background-color var(--transitions-transition-fast), color var(--transitions-transition-fast); }\n`;
  css += `.btn-primary { background-color: ${tokens.colors?.['color-primary'] || '#2563eb'}; color: white; }\n`;
  css += `.btn-primary:hover { background-color: ${tokens.colors?.['color-primary-hover'] || '#1d4ed8'}; text-decoration: none; }\n`;
  css += `.btn-secondary { background-color: ${tokens.colors?.['color-bg-alt'] || '#f8f9fa'}; color: ${tokens.colors?.['color-fg'] || '#1a1a2e'}; border: 1px solid ${tokens.colors?.['color-border'] || '#e5e7eb'}; }\n`;
  css += `.btn-secondary:hover { background-color: ${tokens.colors?.['color-border'] || '#e5e7eb'}; text-decoration: none; }\n\n`;

  // Inputs
  css += `.input { width: 100%; padding: var(--components-input-padding-y) var(--components-input-padding-x); font-family: ${tokens.typography?.['font-mono'] || 'inherit'}; font-size: var(--typography-text-sm); border: 1px solid ${tokens.colors?.['color-border'] || '#e5e7eb'}; border-radius: var(--components-input-radius); background-color: ${tokens.colors?.['color-bg'] || '#ffffff'}; color: ${tokens.colors?.['color-fg'] || '#1a1a2e'}; transition: border-color var(--transitions-transition-fast), box-shadow var(--transitions-transition-fast); }\n`;
  css += `.input:focus { outline: none; border-color: ${tokens.colors?.['color-focus'] || '#2563eb'}; box-shadow: 0 0 0 3px ${tokens.colors?.['color-focus'] || '#2563eb'}40; }\n\n`;

  // Cards
  css += `.card { padding: var(--components-card-padding); border-radius: var(--components-card-radius); border: ${tokens.components?.card?.['card-border'] || '1px solid var(--colors-color-border)'}; background-color: ${tokens.colors?.['color-bg'] || '#ffffff'}; }\n\n`;

  // Focus visible
  css += `:focus-visible { outline: 2px solid ${tokens.colors?.['color-focus'] || '#2563eb'}; outline-offset: 2px; }\n\n`;

  // Reduced motion
  css += `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; scroll-behavior: auto !important; } }\n\n`;

  // Dark mode support (if theme has dark colors)
  if (tokens.colors?.['color-bg']?.startsWith('#0') || tokens.colors?.['color-bg']?.startsWith('#1')) {
    css += `@media (prefers-color-scheme: light) { :root { --color-bg: #ffffff; --color-fg: #1a1a2e; } body { background-color: var(--color-bg); color: var(--color-fg); } }\n`;
  }

  return css;
}

function validateTheme(themeFile) {
  const themePath = join(THEMES_DIR, themeFile);
  if (!existsSync(themePath)) {
    console.error(`Theme file not found: ${themePath}`);
    process.exit(1);
  }

  const content = readFileSync(themePath, 'utf-8');
  const tokens = parseThemeMarkdown(content);

  const requiredSections = ['colors', 'typography', 'spacing', 'radii', 'shadows', 'transitions'];
  const requiredTokens = {
    colors: ['color-bg', 'color-fg', 'color-primary', 'color-border', 'color-focus', 'color-error', 'color-success'],
    typography: ['font-sans', 'font-mono', 'text-base', 'leading-normal'],
    spacing: ['space-4', 'space-6', 'space-8'],
    radii: ['radius-md', 'radius-lg'],
    shadows: ['shadow-md'],
    transitions: ['transition-normal']
  };

  let errors = [];
  let warnings = [];

  for (const section of requiredSections) {
    if (!tokens[section] || Object.keys(tokens[section]).length === 0) {
      errors.push(`Missing required section: ${section}`);
      continue;
    }

    if (requiredTokens[section]) {
      for (const token of requiredTokens[section]) {
        if (!tokens[section][token]) {
          warnings.push(`Missing recommended token: ${section}.${token}`);
        }
      }
    }
  }

  // Check for dark mode support
  const hasDarkColors = tokens.colors?.['color-bg']?.startsWith('#0') || tokens.colors?.['color-bg']?.startsWith('#1');
  const hasLightColors = tokens.colors?.['color-bg']?.startsWith('#f') || tokens.colors?.['color-bg']?.startsWith('#e');
  if (!hasDarkColors && !hasLightColors) {
    warnings.push('Theme background color should be clearly light or dark');
  }

  // Check reduced motion
  const hasReducedMotion = content.includes('prefers-reduced-motion');
  if (!hasReducedMotion) {
    warnings.push('Theme should document reduced motion handling in Usage Notes');
  }

  console.log(`🔍 Validating ${themeFile}...\n`);

  if (errors.length > 0) {
    console.log('❌ Errors:');
    for (const error of errors) {
      console.log(`  • ${error}`);
    }
  }

  if (warnings.length > 0) {
    console.log('⚠️  Warnings:');
    for (const warning of warnings) {
      console.log(`  • ${warning}`);
    }
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ Theme validation passed - all required tokens present');
  } else if (errors.length === 0) {
    console.log('\n✅ Theme validation passed (with warnings)');
  } else {
    console.log('\n❌ Theme validation failed');
    process.exit(1);
  }

  return { errors, warnings };
}

function listThemes() {
  const index = loadIndex();
  console.log('📚 Available Themes:\n');

  const byGenre = {};
  for (const theme of index.themes) {
    if (!byGenre[theme.genre]) byGenre[theme.genre] = [];
    byGenre[theme.genre].push(theme);
  }

  for (const [genre, themes] of Object.entries(byGenre)) {
    console.log(`${genre.charAt(0).toUpperCase() + genre.slice(1)}:`);
    for (const theme of themes) {
      console.log(`  ${theme.id} - ${theme.name}`);
      console.log(`    ${theme.description}`);
    }
    console.log();
  }
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case 'deal':
      dealThemes(args[1] || null);
      break;
    case 'draw':
      if (!args[1]) {
        console.error('Usage: theme draw "<job description>"');
        process.exit(1);
      }
      drawAnatomy(args.slice(1).join(' '));
      break;
    case 'scaffold':
      if (!args[1]) {
        console.error('Usage: theme scaffold <theme-id>');
        process.exit(1);
      }
      scaffoldTheme(args[1]);
      break;
    case 'validate':
      if (!args[1]) {
        console.error('Usage: theme validate <theme-file>');
        process.exit(1);
      }
      validateTheme(args[1]);
      break;
    case 'list':
      listThemes();
      break;
    default:
      console.log(`Nexus Console 145 Theme CLI\n`);
      console.log(`Usage: theme <command> [args]\n`);
      console.log(`Commands:`);
      console.log(`  deal [genre]          Deal 3 themes, optionally filtered by genre (clean, expressive, technical)`);
      console.log(`  draw "<job>"          Draw page anatomy from job description`);
      console.log(`  scaffold <theme-id>   Emit tokens.css and base.css for theme`);
      console.log(`  validate <theme-file> Validate theme file contract`);
      console.log(`  list                  List all available themes`);
      process.exit(1);
  }
}

main();
