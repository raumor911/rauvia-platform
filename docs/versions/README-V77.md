# V77 — paquete para instalación en Hostinger

Este paquete contiene el código fuente completo y dist/server.cjs compilado. Durante npm install, el script postinstall ejecuta npm run build para generar el frontend, prerenderizar las rutas y volver a compilar el servidor. No requiere un campo de comando de compilación en la pantalla Express de Hostinger.

IMPORTANTE: los archivos del frontend compilado NO están incluidos; se generan en Hostinger. El build completo no pudo verificarse localmente por falta de dependencias nativas de Vite/Rolldown y acceso al registro npm. El despliegue todavía no está verificado. No publicar si la instalación/build falla.

Configuración: Express, Node 24.x, npm, raíz rauvia-platform-v77 y entrada dist/server.cjs. Conservar las variables de producción existentes. npm install debe permitir el postinstall del proyecto e instalar las devDependencies necesarias para compilar. No se usa ningún servidor de desarrollo.

Consulta DESPLIEGUE-HOSTINGER-V77.md.

---

# RAUVIA V77 — 77.0.0

Código fuente completo con IndexNow y la corrección de sincronización WordPress. Versión solicitada por el usuario, basada en la revisión 76.0.1 del PR #2 (commit c204f6a79df8f600627c15921b661656fa07011c). El cambio a V77 actualiza los metadatos de versión; esta numeración todavía no se ha publicado en GitHub.

Este ZIP requiere instalar dependencias y ejecutar el build completo antes de desplegar. Incluye dist/server.cjs y su mapa de código; no incluye el frontend compilado ni node_modules. El frontend no pudo compilarse en este Mac por faltar el componente nativo de Rolldown. No se ha desplegado esta corrección en producción.

Validación previa del mismo código: 219 pruebas aprobadas, comprobación TypeScript y compilación del backend correctas. El puente PHP no pudo ejecutarse localmente. Consulta docs/wordpress-sync/README.md y docs/wordpress-sync/validation.json para el alcance y las limitaciones.

Preparación: `npm ci`, `npm run lint`, `npm run build`, `npm run test:indexnow`, `npm run test:wordpress-sync`. Configurar secretos fuera del ZIP según .env.example. Después de un build satisfactorio, `npm start` ejecuta el servidor compilado.

## Historial de la base V76

> Corrección en revisión **76.0.1**: sincronización de WordPress y listado dinámico de recursos. Véase [diagnóstico y validación](docs/wordpress-sync/README.md). No desplegada; el build completo de frontend sigue pendiente en un entorno compatible.

# RAUVIA — desarrollo V76 (76.0.0)

Este repositorio contiene el código completo de RAUVIA recuperado del paquete fuente original de Hostinger V75.1 y actualizado a V76 con IndexNow. Frontend React + Vite, backend Express y WordPress headless en blog.rauvia.com.mx. No se reconstruyó código a partir del sitio público.

La sincronización con GitHub conserva la versión 76.0.0 ya entregada. No despliega en Hostinger, modifica variables productivas, reinicia servicios ni configura despliegues automáticos. El ZIP V52 existente permanece como archivo histórico.

- [Sincronización, pruebas y limitaciones de esta revisión](docs/github-sync-v76.md)
- [Implementación V76](README-V76.md)
- [Operación de IndexNow y puente WordPress](docs/indexnow-operacion.md)
- [Verificación posterior de activación](docs/activacion-v76.md)

Para una instalación nueva: `npm ci`, `npm run lint`, `npm run build`, `npm run test:indexnow`. El build genera `dist/`; `npm start` ejecuta exclusivamente el servidor productivo compilado. Nunca usar `npm run dev` como proceso de producción. Las variables se documentan en `.env.example`; los valores secretos deben permanecer fuera de Git.

Los manifiestos MANIFIESTO-V75.1.json y MANIFIESTO-V76.json describen sus ZIP originales, que incluyen dist y evidencias históricas. No describen el árbol de Git: dist, node_modules, logs y ZIP nuevos se excluyen del código versionado. Los informes originales conservan su fecha y alcance; para el estado posterior de activación ver docs/activacion-v76.md.

---

# RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO
**Dominio Oficial:** [https://rauvia.com.mx](https://rauvia.com.mx)

## Acerca de RAUVIA
RAUVIA es una firma mexicana de consultoría estratégica y desarrollo tecnológico que diseña sistemas comerciales, estructuras operativas y activos digitales para empresas que necesitan crecer con mayor claridad, control y capacidad de ejecución.

- **Organización:** RAUVIA
- **Razón Social:** RAUVIA CONSULTORIA Y DESARROLLO TECNOLOGICO
- **Fundador:** Raúl Morales

## Recursos Públicos (Activos Citables)
Este repositorio centraliza algunos de nuestros recursos de código abierto y documentación para desarrollo corporativo y SEO semántico:
- `public/llms.txt`: Archivo estructurado para lectura por modelos de lenguaje grande.
- `public/llms-full.txt`: Documentación semántica extendida para LLMs.

Para citar cualquier recurso técnico proveniente de RAUVIA, por favor referirse a nuestro `CITATION.cff`.

*Nota: La plataforma de AETHRYON es un sistema propietario interno y sus reglas/algoritmos no se publican en repositorios abiertos.*

## V74 — Knowledge & Intent Graph

La capa tipada se genera offline durante build; no añade imports ni JavaScript al cliente. Fuente de identidad: src/config/entity.ts. Documentación y matrices: [informe V74](docs/v74-knowledge-report.md), [mantenimiento](docs/knowledge-maintenance.md).

Comandos: npm run build:knowledge, npm run audit:knowledge, npm run test:knowledge. Para comprobar HTTP del servidor local: TEST_BASE_URL=http://127.0.0.1:3740 npm run test:knowledge-http.

Sólo knowledge-graph.json e intent-coverage.json se publican en /llmo/. El maestro, el snapshot editorial de metadata y los gaps permanecen en data/knowledge fuera de HTTP. La cobertura no mide demanda ni garantiza resultados.
