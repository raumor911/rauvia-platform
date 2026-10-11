# RAUVIA V75.1

Paquete completo basado en rauvia-platform-v75.zip, con la ampliación Person Knowledge aprobada.

Incluye fuentes backend, datos JSON públicos/internos, ocho áreas de práctica, tres grados concluidos, aliases, proyecciones contextuales y reporte/evidencia de 137 pruebas backend aprobadas.

Los archivos compilados del sitio se conservan de V75. Sólo se actualizan los cinco JSON generados de dist/llmo/. No se ejecutó reconstrucción del Front End, prerender, pruebas UI ni despliegue. Las nuevas definiciones del generador JSON-LD están en fuentes y data/knowledge/person-schema.json; el HTML prerenderizado conserva el de V75.

El ZIP contiene dist/server.cjs y la aplicación base completa. No contiene node_modules ni secretos de entorno. Los informes/evidencias anteriores incluidos son históricos; el reporte vigente es docs/v75-person-practice-report.md.

Integridad: MANIFIESTO-V75.1.json enumera SHA-256 de todos los archivos excepto el propio manifiesto. RELEASE-V75.1.json distingue esta validación backend de la compilación heredada. El checksum exterior acompaña al ZIP.
