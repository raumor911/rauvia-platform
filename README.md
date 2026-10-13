# RAUVIA V78 — 78.0.0

Optimización del listado /recursos/: respuesta sin esperar consultas lentas de WordPress cuando existe una copia válida, espera inicial limitada, recuperación desde disco y datos más ligeros. Mantiene IndexNow y la sincronización automática de publicaciones.

[Diagnóstico, cambios, pruebas y despliegue](docs/v78/README.md) · [Resultados medidos](docs/v78/validation.json)

Este paquete incluye el servidor compilado y el código fuente completo. El frontend se genera durante npm install mediante el postinstall del proyecto, como en V77. No incluye frontend precompilado; no se han mezclado archivos de versiones anteriores. En pruebas locales, el servidor respondió en aproximadamente 1,05 s con WordPress pendiente; falta medir la carga completa en producción.

Hostinger: Express, Node 24.x, npm, raíz rauvia-platform-v78, entrada dist/server.cjs. Mantener las variables existentes. No se ha ejecutado un despliegue de V78 ni cambiado variables productivas.

Comprobaciones: npm run lint, npm run build, npm run test:resources-performance, npm run test:indexnow y npm run test:wordpress-sync. npm start ejecuta únicamente el servidor compilado. No usar npm run dev en producción.

Los informes de V76/V77 y sus manifiestos se conservan como historia; MANIFIESTO-V78.json describe este ZIP. Los secretos deben quedar fuera del paquete y del repositorio. La clave IndexNow de verificación es pública.

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
