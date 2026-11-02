#!/usr/bin/env node
/**
 * install.mjs - Nexus Console 145 Skill Installer
 *
 * Validates and copies the skill structure to the target directory.
 * Usage: node scripts/install.mjs [target-dir]
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync, cpSync, statSync } from 'fs';
import { join, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');

function main() {
  const args = process.argv.slice(2);
  const targetDir = args[0] || join(process.cwd(), '.nexus-console-145');

  console.log(`Installing Nexus Console 145 skill to: ${targetDir}`);

  // Validate source structure
  const requiredFiles = [
    'package.json',
    'README.md',
    'CHANGELOG.md',
    'VERSION',
    'backend/main.py',
    'frontend/package.json',
    'frontend/src/main.tsx',
    'frontend/src/App.tsx',
    'frontend/index.html',
    'frontend/vite.config.ts',
  ];

  const missingFiles = requiredFiles.filter(f => !existsSync(join(ROOT, f)));

  if (missingFiles.length > 0) {
    console.error('❌ Missing required files in source:');
    missingFiles.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  }

  console.log('✅ Source structure validated');

  // Create target directory
  try {
    mkdirSync(targetDir, { recursive: true });
    console.log(`✅ Created target directory: ${targetDir}`);
  } catch (e) {
    console.error(`❌ Failed to create target directory: ${e.message}`);
    process.exit(1);
  }

  // Copy files
  const filesToCopy = [
    ...requiredFiles,
    'feature-plan.json',
    'PLAN.md',
    'STATUS.md',
    'frontend/src/index.css',
    'frontend/src/App.css',
    'frontend/tsconfig.json',
    'frontend/tsconfig.node.json',
  ];

  let copied = 0;
  for (const file of filesToCopy) {
    const src = join(ROOT, file);
    const dest = join(targetDir, file);

    if (!existsSync(src)) {
      console.warn(`⚠️  Skipping missing file: ${file}`);
      continue;
    }

    try {
      mkdirSync(dirname(dest), { recursive: true });
      cpSync(src, dest);
      copied++;
    } catch (e) {
      console.error(`❌ Failed to copy ${file}: ${e.message}`);
      process.exit(1);
    }
  }

  console.log(`✅ Copied ${copied} files`);

  // Write installation manifest
  const manifest = {
    name: 'nexus-console-145',
    version: readFileSync(join(ROOT, 'VERSION'), 'utf-8').trim(),
    installedAt: new Date().toISOString(),
    targetDir,
    files: copied,
  };

  writeFileSync(join(targetDir, '.install-manifest.json'), JSON.stringify(manifest, null, 2));
  console.log('✅ Installation manifest written');

  console.log('\n🎉 Installation complete!');
  console.log(`   Target: ${targetDir}`);
  console.log(`   Run 'npm install' in the target directory to install dependencies.`);
}

main();