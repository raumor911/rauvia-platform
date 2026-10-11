# Sincronización de RAUVIA V76 con GitHub

Fecha: 2026-10-10 (México). Repositorio: raumor911/rauvia-platform. Rama principal: main. Base remota: 84b8ac5d63088e30c234b3039eff987b0e014708 (único archivo: rauvia-platform-v52.zip). No hay workflows de despliegue en ese árbol. Se conserva el archivo histórico y su historial, sin force push.

## Versión y procedencia

GitHub contenía V52; la fuente productiva recuperada y verificada fue V75.1. La implementación entregada es V76, package.json 76.0.0, sin incremento adicional ni creación de tags. El manifiesto original verificó 1090 archivos sin discrepancias. No se reconstruyeron componentes. Las dependencias y el lockfile de V76 se mantienen; no se añaden dependencias para IndexNow.

## Cambios

Se incorporan el servicio Express IndexNow, su clave pública exacta, endpoint autenticado, validación estricta de URL/host, lotes, deduplicación y cola persistente. Se incorpora el puente MU-plugin WordPress para publicación, actualización, cambio de slug y eliminación; el sitemap conserva el intervalo existente de producción (6 horas). Se preservan rutas, landings, redirecciones 301/410, canonicals, SEO, caché WordPress, analítica y observabilidad. Los 265 archivos frontend del ZIP V76 fueron conservados respecto de V75.1. Git excluye dist por ser un artefacto generado.

La documentación de activación corresponde a la operación anterior en Hostinger. Esta sincronización no realiza un despliegue, no toca configuración productiva y no reinicia servicios.

## Validaciones locales repetidas para esta sincronización

- 54 pruebas IndexNow: pasan, incluyendo la aplicación Express compilada en memoria.
- 155 pruebas backend (WordPress, analítica, knowledge y retrieval): pasan.
- 19 pruebas estáticas de AETHRYON, favicon, landing, experiencia móvil y Ruta 90: pasan; 2 comprobaciones HTTP opcionales omitidas sin TEST_BASE_URL.
- 4 pruebas de dependencias y seguridad seleccionadas: pasan.
- Total: 232 pruebas aprobadas; 2 opcionales omitidas.
- TypeScript: npm run lint pasa.
- Backend: npm run build:server pasa con esbuild 0.25.12 recuperado localmente; declaración original ^0.28.1 conservada. TypeScript local 5.8.3 dentro de ~5.8.2.
- Build completo: ejecutado, no concluido. Los generadores knowledge y retrieval pasan y no cambian sus archivos; Vite se detiene por ausencia del componente nativo Rolldown para darwin-arm64 en las dependencias Linux recuperadas de Hostinger. La red local no permite instalarlo. No se cambia el lockfile para evadir este bloqueo.
- Se intentaron además url-normalization y v73-stabilization: no pueden ejecutarse correctamente en este entorno porque requieren sockets/servidor local (EPERM) y conectividad HTTP. No se presentan como aprobadas.

## Seguridad y archivos

Se excluyen .env (salvo .env.example sin valores secretos), node_modules, dist, logs, ZIP nuevos, temporales, claves privadas y estado privado de IndexNow. Revisión de patrones de claves privadas, tokens comunes y asignaciones literales de credenciales: sin coincidencias de credenciales en los archivos seleccionados. La clave IndexNow es pública y permanece versionada. No se publican el token del webhook ni credenciales de WordPress/MySQL.

## Pendiente

Completar npm ci y npm run build en un entorno con las dependencias nativas correctas; ejecutar las pruebas que necesitan HTTP en un entorno con sockets disponibles. Esta limitación se documenta en el PR; el usuario autorizó expresamente publicar y fusionar la versión ya entregada en main, sin un nuevo despliegue. Ningún resultado afirma indexación efectiva en buscadores. Los informes y manifiestos de la entrega previa son evidencia histórica, no una certificación de un nuevo build frontend.
