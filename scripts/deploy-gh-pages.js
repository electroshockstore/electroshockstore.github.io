#!/usr/bin/env node
/**
 * deploy-gh-pages.js
 * Deploy manual a la rama gh-pages evitando el error ENAMETOOLONG de Windows.
 * Usa git worktree para trabajar con la rama gh-pages en un directorio temporal,
 * copia los archivos del build en lotes y hace el commit/push.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const WORKTREE = path.join(ROOT, '.gh-pages-deploy');

function exec(cmd, opts = {}) {
  console.log(`  > ${cmd}`);
  return execSync(cmd, { cwd: ROOT, stdio: 'pipe', ...opts }).toString().trim();
}

function execInWorktree(cmd) {
  console.log(`  > ${cmd}`);
  return execSync(cmd, { cwd: WORKTREE, stdio: 'pipe' }).toString().trim();
}

function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function getAllFiles(dir, base = dir) {
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      result.push(...getAllFiles(full, base));
    } else {
      result.push(path.relative(base, full).replace(/\\/g, '/'));
    }
  }
  return result;
}

// Añadir archivos a git en lotes para evitar ENAMETOOLONG
function gitAddInBatches(files, batchSize = 50) {
  for (let i = 0; i < files.length; i += batchSize) {
    const batch = files.slice(i, i + batchSize);
    const quoted = batch.map(f => `"${f}"`).join(' ');
    execSync(`git add ${quoted}`, { cwd: WORKTREE, stdio: 'pipe' });
  }
}

async function main() {
  console.log('\n🚀 Deploy a gh-pages\n');

  // Verificar que dist existe
  if (!fs.existsSync(DIST)) {
    console.error('❌ El directorio dist/ no existe. Corre npm run build primero.');
    process.exit(1);
  }

  // Limpiar worktree anterior si quedó colgado
  if (fs.existsSync(WORKTREE)) {
    console.log('🧹 Limpiando worktree anterior...');
    try {
      exec(`git worktree remove "${WORKTREE}" --force`);
    } catch {
      fs.rmSync(WORKTREE, { recursive: true, force: true });
      try { exec('git worktree prune'); } catch {}
    }
  }

  // Verificar si existe la rama gh-pages remota
  let branchExists = false;
  try {
    exec('git fetch origin gh-pages --quiet');
    branchExists = true;
  } catch {
    branchExists = false;
  }

  // Crear worktree apuntando a gh-pages
  console.log('📁 Preparando worktree de gh-pages...');
  if (branchExists) {
    exec(`git worktree add "${WORKTREE}" gh-pages`);
    // Actualizar con origin
    execInWorktree('git pull origin gh-pages --rebase --quiet');
  } else {
    // Crear rama huérfana
    exec(`git worktree add --orphan -b gh-pages "${WORKTREE}"`);
  }

  // Borrar contenido viejo del worktree (excepto .git)
  console.log('🗑️  Limpiando contenido anterior...');
  for (const entry of fs.readdirSync(WORKTREE)) {
    if (entry === '.git' || entry === '.nojekyll') continue;
    const full = path.join(WORKTREE, entry);
    fs.rmSync(full, { recursive: true, force: true });
  }

  // Copiar dist/ al worktree
  console.log('📋 Copiando archivos del build...');
  copyDirRecursive(DIST, WORKTREE);

  // Asegurar .nojekyll
  fs.writeFileSync(path.join(WORKTREE, '.nojekyll'), '');

  // Copiar CNAME si existe en public
  const cnameSrc = path.join(ROOT, 'public', 'CNAME');
  if (fs.existsSync(cnameSrc)) {
    fs.copyFileSync(cnameSrc, path.join(WORKTREE, 'CNAME'));
  }

  // Añadir archivos en lotes
  console.log('📦 Staging archivos (en lotes)...');
  const files = getAllFiles(WORKTREE).filter(f => f !== '.git');
  gitAddInBatches(files);
  
  // También hacer git add -A para capturar deletions (en caso de archivos removidos)
  try {
    execSync('git add -A', { cwd: WORKTREE, stdio: 'pipe' });
  } catch {
    // Si falla por ENAMETOOLONG, los lotes anteriores son suficientes
  }

  // Verificar si hay cambios
  let hasChanges = false;
  try {
    const status = execSync('git status --porcelain', { cwd: WORKTREE }).toString().trim();
    hasChanges = status.length > 0;
  } catch {
    hasChanges = true;
  }

  if (!hasChanges) {
    console.log('\n✅ No hay cambios para deployar. gh-pages ya está actualizado.\n');
  } else {
    // Commit
    const date = new Date().toISOString().slice(0, 10);
    execSync(`git commit -m "deploy: ${date}"`, { cwd: WORKTREE, stdio: 'pipe' });
    console.log('✅ Commit creado');

    // Push
    console.log('📤 Haciendo push a origin/gh-pages...');
    execSync('git push origin gh-pages', { cwd: WORKTREE, stdio: 'inherit' });
    console.log('\n✅ Deploy completado exitosamente!\n');
  }

  // Limpiar worktree
  exec(`git worktree remove "${WORKTREE}" --force`);
}

main().catch(err => {
  console.error('\n❌ Error durante el deploy:', err.message);
  // Intentar limpiar worktree
  try {
    execSync(`git worktree remove "${WORKTREE}" --force`, { cwd: ROOT, stdio: 'pipe' });
  } catch {}
  process.exit(1);
});
