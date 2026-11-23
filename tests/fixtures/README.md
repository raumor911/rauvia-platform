# Líneas base congeladas

Estas pruebas comparan `dist/` contra instantáneas guardadas aquí. Un fallo significa que el HTML cambió; hay dos casos:

| Cambio | Qué hacer |
|---|---|
| **No lo esperabas** | Es una regresión. Corrige el código. |
| **Es intencional** (copy, H1, enlaces, rutas nuevas, política de URLs) | Actualiza la línea base y deja constancia. |

```bash
npm run build
npm run baselines:refresh                                   # simulacro: lista cambios semánticos y de contenido
npm run baselines:refresh -- --write --reason "motivo"      # aplica y registra en BASELINE_LOG.md
```

- **Semánticos** (title, meta, canonical, JSON-LD, H1): revísalos uno por uno antes de aprobar.
- **Contenido** (hashes): esperables tras ediciones editoriales.
- El número de WhatsApp se normaliza en las comparaciones; cambiarlo no rompe la línea base.
- `tests/canonical-slash-policy.test.mjs` protege que toda URL canónica termine en `/`.

## Evidencia de navegador del Hero

`npm run evidence:hero` recaptura con Chrome las CTA del Hero a 390/850/1440 px, la navegación por clic y teclado y la
matriz de 8 rutas × 7 anchos en `docs/v77-evidencias/` (con capturas en `screens/`).
La aprobación visual es humana: `npm run evidence:hero -- --approve "Nombre"`. Mientras esté pendiente, la prueba
«Hero: aprobación visual registrada» aparece como TODO.
