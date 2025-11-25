# 🚀 Guía de Deploy a GitHub Pages

## Pasos para subir tu catálogo a GitHub Pages

### 1️⃣ Inicializar Git (si no lo has hecho)
```bash
cd OrderApp
git init
git add .
git commit -m "Initial commit - Shock-Store Catalogo"
```

### 2️⃣ Conectar con tu repositorio de GitHub
```bash
git remote add origin https://github.com/electroshockstore/catalogo.git
git branch -M main
```

### 3️⃣ Instalar gh-pages (si no está instalado)
```bash
npm install --save-dev gh-pages
```

### 4️⃣ Hacer el build y deploy
```bash
npm run build
npm run deploy
```

### 5️⃣ Configurar GitHub Pages
1. Ve a tu repositorio: https://github.com/electroshockstore/catalogo
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Pages**
4. En **Source**, selecciona la rama **gh-pages**
5. Click en **Save**

### 6️⃣ Acceder a tu sitio
Tu catálogo estará disponible en:
**https://electroshockstore.github.io/catalogo/**

---

## 📝 Comandos útiles

### Desarrollo local
```bash
npm run dev
```
Abre: http://localhost:5173

### Build de producción
```bash
npm run build
```

### Preview del build
```bash
npm run preview
```

### Deploy a GitHub Pages
```bash
npm run deploy
```

---

## 🔄 Actualizar el catálogo

Cada vez que hagas cambios:

```bash
git add .
git commit -m "Descripción de los cambios"
git push origin main
npm run deploy
```

---

## ⚠️ Solución de problemas

### Si el deploy falla:
1. Verifica que gh-pages esté instalado:
   ```bash
   npm install --save-dev gh-pages
   ```

2. Verifica que el build funcione:
   ```bash
   npm run build
   ```

3. Si hay errores de permisos en GitHub:
   - Ve a Settings > Actions > General
   - En "Workflow permissions", selecciona "Read and write permissions"

### Si las rutas no funcionan:
- Verifica que `vite.config.js` tenga `base: '/catalogo/'`
- Verifica que en GitHub Pages esté seleccionada la rama `gh-pages`

---

## 📦 Estructura del proyecto

```
OrderApp/
├── dist/              # Build de producción (generado)
├── public/            # Archivos estáticos
│   └── assets/        # Imágenes
├── src/
│   ├── components/    # Componentes React
│   ├── context/       # Context API
│   ├── data/          # Datos de productos (modular)
│   │   └── categories/
│   ├── modules/       # Páginas principales
│   └── Styles/        # Estilos CSS
├── package.json
└── vite.config.js     # Configuración de Vite
```

---

## 🎯 Próximos pasos

1. ✅ Subir el código a GitHub
2. ✅ Hacer el deploy
3. 📸 Agregar imágenes reales de productos en `public/assets/products/`
4. 🔄 Actualizar productos según inventario
5. 📱 Compartir el link del catálogo

---

**¡Tu catálogo estará online en minutos!** 🎉
