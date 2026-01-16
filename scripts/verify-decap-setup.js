#!/usr/bin/env node

/**
 * Script de verificación de configuración de Decap CMS
 * Verifica que todos los archivos necesarios estén en su lugar
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('🔍 Verificando configuración de Decap CMS...\n');

const checks = [
  {
    name: 'Admin HTML',
    path: 'public/admin/index.html',
    required: true
  },
  {
    name: 'Admin Config',
    path: 'public/admin/config.yml',
    required: true
  },
  {
    name: 'README Decap',
    path: 'README-DECAP-CMS.md',
    required: false
  }
];

let allPassed = true;

checks.forEach(check => {
  const fullPath = path.join(rootDir, check.path);
  const exists = fs.existsSync(fullPath);
  
  if (exists) {
    console.log(`✅ ${check.name}: ${check.path}`);
  } else {
    if (check.required) {
      console.log(`❌ ${check.name}: ${check.path} - FALTA`);
      allPassed = false;
    } else {
      console.log(`⚠️  ${check.name}: ${check.path} - Opcional, no encontrado`);
    }
  }
});

console.log('\n📋 Verificando config.yml...');

const configPath = path.join(rootDir, 'public/admin/config.yml');
if (fs.existsSync(configPath)) {
  const configContent = fs.readFileSync(configPath, 'utf-8');
  
  // Verificar si el repo está configurado
  if (configContent.includes('tu-usuario/tu-repositorio')) {
    console.log('⚠️  ADVERTENCIA: Necesitas actualizar el repositorio en config.yml');
    console.log('   Busca la línea: repo: tu-usuario/tu-repositorio');
    console.log('   Y reemplázala con tu repositorio real de GitHub\n');
    allPassed = false;
  } else {
    console.log('✅ Repositorio configurado en config.yml');
  }
  
  // Verificar backend
  if (configContent.includes('name: github')) {
    console.log('✅ Backend de GitHub configurado');
  } else if (configContent.includes('name: git-gateway')) {
    console.log('✅ Backend Git Gateway configurado (Netlify)');
  } else {
    console.log('❌ Backend no configurado correctamente');
    allPassed = false;
  }
}

console.log('\n' + '='.repeat(60));

if (allPassed) {
  console.log('✅ ¡Configuración de Decap CMS completa!');
  console.log('\n📖 Próximos pasos:');
  console.log('   1. Lee README-DECAP-CMS.md para instrucciones detalladas');
  console.log('   2. Configura OAuth de GitHub (ver README)');
  console.log('   3. Despliega: npm run deploy');
  console.log('   4. Accede a: https://tu-usuario.github.io/tu-repo/admin/\n');
} else {
  console.log('❌ Hay problemas con la configuración');
  console.log('   Revisa los errores arriba y corrige antes de continuar\n');
  process.exit(1);
}
