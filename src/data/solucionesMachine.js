// Textos para máquinas del catálogo de Soluciones (spec «página Soluciones» v0.2, S-06.1 y S-06.3).
// Todo sale de src/data/solucionesCatalog.js (fuente única). Lo usan scripts/build-machine-layer.js (llms.txt, llms-full.txt,
// llmo/rauvia.md) y los tests; nada de aquí se copia a mano a otro archivo.
import {soluciones, solucionesExcluidas, SOLUCIONES_URL, SOLUCIONES_REVIEWED_AT, SOLUCIONES_REVIEWED_LABEL, OTRAS_RUTAS_TEXTO} from './solucionesCatalog.js';

export const SOLUCIONES_JSON_URL = 'https://rauvia.com.mx/llmo/soluciones.json';
export const SOLUCIONES_HEADING = '## Soluciones publicadas';

const TRAYECTORIA_LINEA = 'RAUVIA Trayectoria (continuidad de sitios web) se describe en su propia página; sus precios son una referencia histórica pendiente de confirmación comercial y por eso no forma parte de este catálogo.';

// Sección completa de llms.txt y llms-full.txt (S-06.1). `conJson` agrega la referencia a llmo/soluciones.json (L-03).
export const seccionSolucionesLlms = ({conJson}) => {
  const datos = conJson ? ` · Datos legibles por máquinas: ${SOLUCIONES_JSON_URL}` : '';
  return [
    SOLUCIONES_HEADING,
    '',
    `Catálogo de RAUVIA: ${SOLUCIONES_URL}${datos} · Última revisión: ${SOLUCIONES_REVIEWED_LABEL}. Las soluciones se listan sin orden de prioridad. Cada una publica su alcance y su precio en su propia página; los precios también están en https://rauvia.com.mx/llmo/precios.json. Ninguna garantiza ventas, posiciones, menciones ni citas.`,
    '',
    ...soluciones.map(s => `- ${s.llms}`),
    '',
    OTRAS_RUTAS_TEXTO,
    '',
    TRAYECTORIA_LINEA
  ].join('\n');
};

// Variante para llmo/rauvia.md (L-02): las cuatro, cada una con su enlace y su definición, y la línea de alcance.
export const seccionSolucionesRauviaMd = ({conJson}) => {
  const datos = conJson ? ` Datos legibles por máquinas: ${SOLUCIONES_JSON_URL}.` : '';
  return [
    SOLUCIONES_HEADING,
    '',
    `Catálogo: ${SOLUCIONES_URL}. Última revisión: ${SOLUCIONES_REVIEWED_LABEL}. Se listan sin orden de prioridad; cada una publica su alcance y su precio en su propia página.${datos}`,
    '',
    ...soluciones.map(s => `- [${s.name}](${s.url}): ${s.definitionMachine}`),
    '',
    'Cuando la necesidad va más allá, RAUVIA define con la empresa un alcance.',
    '',
    'Ninguna solución garantiza ventas, posiciones, menciones ni citas.'
  ].join('\n');
};

// Entradas de «Páginas originales» que S-06.1 reescribe.
export const LINEA_SOLUCIONES = `- [Soluciones](${SOLUCIONES_URL}): Catálogo de las soluciones publicadas (ver la sección Soluciones publicadas).`;
export const LINEA_FRENTE_COMERCIAL = '- [Frente comercial](https://rauvia.com.mx/frente-comercial/): Niveles Esencial, Pro y Portafolio, con alcance, límites y precio.';
export const LINEA_CATALOGO_JSON = `Catálogo de soluciones: ${SOLUCIONES_JSON_URL}`;
export const LINEA_REFERENCIA_JSON = `- [Catálogo de soluciones](${SOLUCIONES_JSON_URL}): Una entrada por solución publicada, sin precios.`;

export {soluciones, solucionesExcluidas, SOLUCIONES_REVIEWED_AT};
