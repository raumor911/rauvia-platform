# RAUVIA V77 — instalación con build automático

El error original era Entry file not found: el panel ejecutaba npm install, pero no npm run build.

## Configuración

- Archivo: rauvia-platform-v77-hostinger.zip.
- Directorio raíz: rauvia-platform-v77.
- Framework: Express.
- Node: 24.x.
- Gestor: npm.
- Archivo de entrada: dist/server.cjs.
- Mantener las variables productivas actuales fuera del ZIP.

## Preparación automática

El postinstall del proyecto ejecuta el build completo durante npm install: generación de conocimiento y recuperación, Vite, prerender de las rutas originales y compilación del servidor. Comprueba dist/server.cjs, dist/shell.html, dist/index.html y dist/.vite/manifest.json. Propaga errores y rechaza una salida incompleta. Deben estar habilitados los scripts propios del proyecto y disponibles las devDependencies de compilación.

El frontend compilado no se incluye en este archivo: se genera en Hostinger. No se mezclaron archivos compilados de V76 con fuentes V77.

## Validaciones de esta preparación

- TypeScript: correcto.
- Sintaxis del servidor compilado y del instalador: correcta.
- Instalador: comprobados éxito, rechazo de archivos faltantes y propagación de error de compilación mediante un entorno simulado.
- Build completo local: bloqueado por dependencia nativa de Rolldown ausente y registro npm inaccesible.
- Despliegue remoto: pendiente; no ejecutado en esta entrega.

Después del despliegue, comprobar que el registro incluye producción completa preparada durante npm install y que el build termina correctamente. Verificar inicio, /recursos/, un artículo, canonicals, sitemap, redirecciones e IndexNow. La instalación del puente PHP WordPress es independiente del ZIP Node; no se da por actualizada automáticamente.
