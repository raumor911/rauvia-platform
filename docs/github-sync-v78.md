# Sincronización GitHub — RAUVIA V78 con DIO

Fecha: 11 de octubre de 2026 (Ciudad de México). Repositorio: raumor911/rauvia-platform. Versión: 78.0.0; DIO 1.0.0.

## Historial y publicación

Se actualiza la rama existente fix/wordpress-resources-sync-76.0.1 y el PR #2 para incluir V78 completa y DIO. El nombre histórico de la rama se conserva. El nuevo commit tiene como padre c204f6a79df8f600627c15921b661656fa07011c, conservando la corrección WordPress anterior. Main permanece en bd9d596c01a083b80597e9601572daef78d60797 hasta que se apruebe la fusión.

La fuente se tomó de la entrega local rauvia-v78-dio ya validada. Se incorporan los cambios WordPress V77, rendimiento V78, nueve correcciones de teléfono, cuatro mejoras editoriales DIO, tres Index Map y sus evidencias. El README y este documento describen el nuevo estado de publicación.

Se conserva el ZIP V52 ya versionado y los archivos remotos existentes. No se suben ZIP nuevos, dist, node_modules, .env privados, tokens, colas IndexNow ni cachés operativas de WordPress. Los tres logs incluidos bajo docs/dio-v1-evidence son evidencias de pruebas, no logs productivos. La clave pública IndexNow no es un secreto.

MANIFIESTO-V78.json describe el ZIP validado, incluyendo dist; no es un manifiesto del árbol Git. RELEASE-V78.json y las evidencias son la instantánea anterior a sincronizar GitHub, por lo que githubVersionPublished=false registra ese momento histórico. Este documento registra la publicación posterior de la fuente.

## Validación conservada

- Build completo de frontend, prerender y servidor: PASS.
- TypeScript: PASS.
- 161 pruebas: PASS (IndexNow, WordPress/cache y sincronización, rendimiento/recuperación de Recursos, SEO HTML, landing profesional y rutas históricas).
- 20 rutas: teléfono único, H1 y canonicals; comparación de metadatos y schema con V78 anterior.
- 16 vistas responsive: cuatro páginas por cuatro anchos.
- Precios publicados sin cambios.
- Código WordPress/Recursos y dependencias coinciden con V78 antes de DIO; evidencia en docs/dio-v1-evidence/v78-preservation.json.

La verificación Git compara los blobs de los archivos publicados con la fuente local. Sin nuevo cambio de código respecto del candidato validado; no es necesaria una nueva ejecución redundante de las mismas pruebas.

## Producción

Sin despliegue, reinicios, cambios de configuración, notificaciones IndexNow ni modificaciones a WordPress. No se ha fusionado main. La fusión y el despliegue quedan pendientes de autorización. No se afirma mejora medida de indexación o captación.
