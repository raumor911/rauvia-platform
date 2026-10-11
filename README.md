# RAUVIA V78 — 78.0.0 con DIO v1.0

Incluye las correcciones de sincronización WordPress V77, rendimiento de Recursos V78 y Demand Interception Optimization sobre cuatro páginas comerciales existentes. WhatsApp comercial único: **+52 55 8649 4076**.

[Informe DIO y validación V78](docs/dio-v1-report.md) · [Index Map 1](docs/index-map-1-profesionistas.md) · [Index Map 2](docs/index-map-2-medicos-consultorios.md) · [Index Map 3](docs/index-map-3-empresas-servicios.md) · [Sincronización GitHub](docs/github-sync-v78.md)

Build completo de frontend y servidor, TypeScript y 161 pruebas aprobados. Se comprobaron 20 rutas HTML y 16 vistas responsive. Las mediciones de Recursos son locales con WordPress controlado; no acreditan carga total en producción ni aumento de contactos.

El repositorio versiona fuentes; dist y node_modules se generan localmente. El postinstall existente ejecuta el build durante npm install. Hostinger: Express, Node 24.x, entrada dist/server.cjs. Conservar las variables, secretos y almacenamiento privado persistente existentes.

Esta sincronización publica la fuente en la rama del PR #2. No fusiona main, no despliega y no modifica WordPress. Los manifiestos y RELEASE-V78.json conservan el estado de la entrega ZIP anterior a esta publicación; docs/github-sync-v78.md registra el estado de sincronización.

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
