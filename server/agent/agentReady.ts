import fs from 'fs';
import path from 'path';
import type {Request, Response, NextFunction} from 'express';
import {ENTITIES} from '../../src/config/entity';
import {routeSeo} from '../../src/seo/routeSeo.js';

// Superficie "agent-ready": Markdown por negociación de contenido, cabecera Link,
// servidor MCP de solo lectura (datos ya públicos) y su Server Card.
const ORIGIN = 'https://rauvia.com.mx';
const SERVER_VERSION = '1.0.0';
const PROTOCOL_VERSION = '2025-06-18';

// Rutas con representación Markdown pública (archivos en /llmo).
const MARKDOWN_BY_PATH: Record<string, string> = {
  '/': 'rauvia.md',
  '/aethryon/': 'aethryon.md',
};
const MARKDOWN_TOPICS: Record<string, string> = {rauvia: 'rauvia.md', aethryon: 'aethryon.md', evidencia: 'evidencia.md'};

const HOME_LINKS = [
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</llmo/rauvia.md>; rel="alternate"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
  '</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"',
].join(', ');

function llmoDir(isProd: boolean) {
  return path.join(process.cwd(), isProd ? 'dist' : 'public', 'llmo');
}
function readMarkdown(isProd: boolean, file: string) {
  try { return fs.readFileSync(path.join(llmoDir(isProd), file), 'utf8'); } catch { return null; }
}
function prefersMarkdown(accept: string | undefined) {
  if (!accept) return false;
  const parts = accept.split(',').map(p => p.trim().toLowerCase());
  const q = (type: string) => {
    const hit = parts.find(p => p.split(';')[0].trim() === type);
    if (!hit) return -1;
    const m = /;\s*q=([0-9.]+)/.exec(hit);
    return m ? Number(m[1]) : 1;
  };
  const md = q('text/markdown');
  return md > 0 && md >= Math.max(q('text/html'), 0);
}

export function agentDiscoveryMiddleware(isProd: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    const p = req.path;
    if (p === '/') res.setHeader('Link', HOME_LINKS);
    if (p in MARKDOWN_BY_PATH || p === '/') {
      res.append('Vary', 'Accept');
      if (prefersMarkdown(req.headers.accept)) {
        const body = readMarkdown(isProd, MARKDOWN_BY_PATH[p]);
        if (body) {
          res.status(200).type('text/markdown; charset=utf-8');
          res.setHeader('X-Content-Type-Options', 'nosniff');
          res.setHeader('X-Markdown-Tokens', String(Math.ceil(body.length / 4)));
          return res.send(req.method === 'HEAD' ? undefined : body);
        }
      }
    }
    next();
  };
}

const TOOLS = [
  {name: 'get_organization', title: 'Datos públicos de RAUVIA', description: 'Devuelve nombre, razón social, descripción, teléfono, redes y datos de contacto públicos de RAUVIA.', inputSchema: {type: 'object', properties: {}, additionalProperties: false}},
  {name: 'list_public_pages', title: 'Páginas públicas', description: 'Lista las páginas públicas de rauvia.com.mx con título, descripción y URL canónica.', inputSchema: {type: 'object', properties: {}, additionalProperties: false}},
  {name: 'get_markdown', title: 'Resumen en Markdown', description: 'Devuelve el resumen público en Markdown de un tema: rauvia, aethryon o evidencia.', inputSchema: {type: 'object', properties: {topic: {type: 'string', enum: Object.keys(MARKDOWN_TOPICS), description: 'Tema a consultar.'}}, required: ['topic'], additionalProperties: false}},
  {name: 'get_contact', title: 'Cómo contactar a RAUVIA', description: 'Devuelve los canales públicos de contacto (WhatsApp y teléfono). No envía mensajes ni registra datos.', inputSchema: {type: 'object', properties: {}, additionalProperties: false}},
].map(t => ({...t, annotations: {readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false}}));

function organization() {
  const o: any = ENTITIES.organization;
  return {name: o.name, legalName: o.legalName, url: o.url, description: o.description, telephone: o.telephone, country: 'MX', contactPoint: o.contactPoint, sameAs: o.sameAs, founder: ENTITIES.founder.name};
}
function pages() {
  return Object.entries(routeSeo as Record<string, any>).filter(([k]) => k !== '/404').map(([k, v]) => ({path: k === '/' ? '/' : k.replace(/\/+$/, '') + '/', title: v.title, description: v.description, url: v.canonical || undefined}));
}
const text = (value: unknown) => ({content: [{type: 'text', text: typeof value === 'string' ? value : JSON.stringify(value, null, 2)}]});

function callTool(isProd: boolean, name: string, args: any) {
  switch (name) {
    case 'get_organization': return text(organization());
    case 'list_public_pages': return text(pages());
    case 'get_contact': return text({whatsapp: 'https://wa.me/525586494076', telephone: '+52 55 8649 4076', privacyEmail: 'privacidad@rauvia.com.mx', note: 'Canales públicos; esta herramienta no envía mensajes.'});
    case 'get_markdown': {
      const file = typeof args?.topic === 'string' && Object.hasOwn(MARKDOWN_TOPICS, args.topic) ? MARKDOWN_TOPICS[args.topic] : null;
      const body = file && readMarkdown(isProd, file);
      return body ? text(body) : {isError: true, content: [{type: 'text', text: 'Tema no disponible. Usa: ' + Object.keys(MARKDOWN_TOPICS).join(', ')}]};
    }
    default: return null;
  }
}

// MCP Streamable HTTP sin estado: solo respuestas JSON a POST, sin sesiones ni SSE.
export function mcpHandler(isProd: boolean) {
  return (req: Request, res: Response) => {
    res.setHeader('Cache-Control', 'no-store');
    const rpc = (id: unknown, result: unknown) => res.json({jsonrpc: '2.0', id, result});
    const fail = (id: unknown, code: number, message: string, status = 200) => res.status(status).json({jsonrpc: '2.0', id: id ?? null, error: {code, message}});
    const msg = req.body;
    if (!msg || Array.isArray(msg) || typeof msg !== 'object' || msg.jsonrpc !== '2.0' || typeof msg.method !== 'string') return fail(msg?.id, -32600, 'Invalid Request', 400);
    if (msg.id === undefined) return res.status(202).end(); // notificaciones
    switch (msg.method) {
      case 'initialize': return rpc(msg.id, {protocolVersion: PROTOCOL_VERSION, capabilities: {tools: {listChanged: false}}, serverInfo: {name: 'rauvia-public', title: 'RAUVIA — información pública', version: SERVER_VERSION}, instructions: 'Herramientas de solo lectura con información pública de RAUVIA (rauvia.com.mx). No ejecutan acciones ni envían datos.'});
      case 'ping': return rpc(msg.id, {});
      case 'tools/list': return rpc(msg.id, {tools: TOOLS});
      case 'tools/call': {
        const out = callTool(isProd, msg.params?.name, msg.params?.arguments);
        return out ? rpc(msg.id, out) : fail(msg.id, -32602, 'Unknown tool');
      }
      default: return fail(msg.id, -32601, 'Method not found');
    }
  };
}
export function mcpNotAllowed(_req: Request, res: Response) {
  res.setHeader('Allow', 'POST');
  res.status(405).json({jsonrpc: '2.0', id: null, error: {code: -32000, message: 'Use POST with JSON-RPC.'}});
}

export function serverCard() {
  return {
    version: '1.0',
    protocolVersion: PROTOCOL_VERSION,
    name: 'rauvia-public',
    title: 'RAUVIA — información pública',
    description: 'Servidor MCP de solo lectura con la información pública de RAUVIA: organización, páginas, resúmenes en Markdown y canales de contacto.',
    serverInfo: {name: 'rauvia-public', title: 'RAUVIA — información pública', version: SERVER_VERSION},
    websiteUrl: ORIGIN + '/',
    documentationUrl: ORIGIN + '/llms.txt',
    endpoint: ORIGIN + '/mcp',
    transport: {type: 'streamable-http', endpoint: ORIGIN + '/mcp'},
    capabilities: {tools: {listChanged: false}},
    authentication: {required: false},
    tools: TOOLS.map(t => ({name: t.name, description: t.description})),
  };
}
export function serverCardHandler(_req: Request, res: Response) {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.type('application/json').send(JSON.stringify(serverCard(), null, 2));
}
