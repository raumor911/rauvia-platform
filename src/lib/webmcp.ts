import {ENTITIES} from '../config/entity';

// WebMCP: herramientas de solo lectura para agentes dentro del navegador.
// No navegan, no envían mensajes ni guardan datos; devuelven información ya pública.
const PAGES = [
  ['/', 'Inicio'], ['/soluciones/', 'Soluciones'], ['/aethryon/', 'AETHRYON'], ['/casos/', 'Casos'],
  ['/nosotros/', 'Nosotros'], ['/trayectoria/', 'Trayectoria'], ['/recursos/', 'Recursos'],
  ['/aviso-de-privacidad/', 'Aviso de privacidad'], ['/terminos/', 'Términos'],
];
const asText = (value: unknown) => ({content: [{type: 'text', text: JSON.stringify(value, null, 2)}]});
const noInput = {type: 'object', properties: {}, additionalProperties: false};
const readOnly = {readOnlyHint: true};

export function registerWebMcpTools() {
  const mc = (navigator as any).modelContext;
  if (!mc || typeof mc.registerTool !== 'function') return;
  const o: any = ENTITIES.organization;
  const tools = [
    {name: 'get_organization', description: 'Datos públicos de RAUVIA: nombre, descripción, teléfono, redes y fundador.', inputSchema: noInput, annotations: readOnly,
      execute: async () => asText({name: o.name, legalName: o.legalName, url: o.url, description: o.description, telephone: o.telephone, sameAs: o.sameAs, founder: ENTITIES.founder.name})},
    {name: 'get_contact', description: 'Canales públicos de contacto de RAUVIA (WhatsApp y teléfono). No envía mensajes.', inputSchema: noInput, annotations: readOnly,
      execute: async () => asText({whatsapp: 'https://wa.me/525586494076', telephone: o.telephone, privacyEmail: 'privacidad@rauvia.com.mx'})},
    {name: 'list_pages', description: 'Páginas principales de rauvia.com.mx con su URL.', inputSchema: noInput, annotations: readOnly,
      execute: async () => asText(PAGES.map(([path, title]) => ({title, url: new URL(path, window.location.origin).href})))},
  ];
  for (const tool of tools) {
    try { mc.registerTool(tool); } catch { /* ya registrada o API incompleta */ }
  }
}
