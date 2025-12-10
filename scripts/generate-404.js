import fs from 'fs';
import path from 'path';

// Leer el index.html generado por Vite
const distIndexPath = path.join(process.cwd(), 'dist', 'index.html');
const dist404Path = path.join(process.cwd(), 'dist', '404.html');

try {
  // Leer el contenido del index.html compilado
  let indexContent = fs.readFileSync(distIndexPath, 'utf8');
  
  // Agregar el script de redirección de GitHub Pages antes del script de SPA
  const redirectScript = `
    <!-- GitHub Pages SPA redirect script -->
    <script type="text/javascript">
      // GitHub Pages SPA redirect hack
      // This script takes the current url and converts the path and query
      // string into just a query string, and then redirects the browser
      // to the new url with only a query string and hash fragment
      var pathSegmentsToKeep = 0;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>`;

  // Insertar el script antes del cierre de </head>
  const content404 = indexContent.replace('</head>', `${redirectScript}\n  </head>`);
  
  // Escribir el archivo 404.html
  fs.writeFileSync(dist404Path, content404);
  
  console.log('✅ 404.html generado correctamente con assets compilados');
} catch (error) {
  console.error('❌ Error generando 404.html:', error);
  process.exit(1);
}