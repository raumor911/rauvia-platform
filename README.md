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
