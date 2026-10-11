import 'dotenv/config';
import express from 'express';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'node:crypto';
import { publicRoutes } from './scripts/public-routes.js';
import { fetchPosts, renderSitemap } from './scripts/generate-sitemap.js';
import { GoogleGenAI } from '@google/genai';
import { ASSISTANT_SYSTEM_PROMPT } from './server/prompts/assistant';
import { testConnection, isDbConfigured, closeDbPool } from './server/db';
import { handleTrackEvent } from './server/analytics/events';
import { aiCrawlerMiddleware } from './server/analytics/crawlerMiddleware';
import { logEvent, serializeError } from './server/logger';
import { beginTrackedTask, startObservabilityTicker, stopObservabilityTicker } from './server/observability/index.js';
import { attachInboundHttpSocketTracking, destroyAllInboundHttpSockets } from './server/observability/runtime.js';
import { getSafeUrlMeta } from './server/observability/redaction.js';
import { withRequestContext } from './server/observability/context.js';

import {wordpressCache} from './server/wordpress/cache';
import {resourceCards} from './server/wordpress/resources';
import {canonicalPath} from './src/seo/buildMetaTags';
import {legacyRouteMiddleware, sendGone} from './server/seo/legacyRoutes';
import {createIndexNow, authorized, sitemapSnapshot, validateUrl} from './server/indexnow/service.js';

async function startServer() {
  const app = express();

  // Observe the final HTTP status naturally; no extra crawler event or table.
  app.use(aiCrawlerMiddleware);
  app.use(legacyRouteMiddleware);

  // === REDIRECCIONES SEO 301 PERMANENTES ===
  app.use((req, res, next) => {
    // Limpieza de trailing slash para normalizar la comparación de rutas
    const normalizedPath = req.path.endsWith('/') && req.path.length > 1 
      ? req.path.slice(0, -1) 
      : req.path;

    // Redirección de subdominio (Si el DNS/Hostinger enruta 'shop' hacia esta instancia Node)
    if (req.hostname === 'shop.rauvia.com.mx') {
      return res.redirect(301, 'https://rauvia.com.mx/');
    }
    
    // Rutas antiguas hacia nuevas ubicaciones (conservando Link Equity)
    if (normalizedPath === '/blog') {
      return res.redirect(301, '/recursos/');
    }
    
    if (normalizedPath === '/servicios') {
      return res.redirect(301, '/soluciones/');
    }


    // Redirecciones de artículos antiguos hacia /recursos/
    const oldArticles = [
      '/delegacion-hueca-caos-a-sistema-90-dias',
      '/analisis-estrategico-mensual-startup'
    ];
    
    if (oldArticles.includes(normalizedPath)) {
      return res.redirect(301, '/recursos/');
    }
    
    next();
  });
  // =========================================

  // Serve public machine-readable references before the SPA fallback, in both modes.
  const isProd = process.env.NODE_ENV === 'production';
  const discoveryRoot = path.join(process.cwd(), isProd ? 'dist' : 'public');
  app.get('/llmo', (_req, res) => res.redirect(302, '/llmo/index.json'));
  app.use('/llmo', express.static(path.join(discoveryRoot, 'llmo'), {
    index: false,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.md')) res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('X-Content-Type-Options', 'nosniff');
    },
  }), (_req, res) => { res.status(404).type('text/plain').send('Not found'); });
  const PORT = Number(process.env.PORT) || 3000;

  // Inyectar Request ID y contexto de observabilidad
  app.use((req, res, next) => {
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    res.setHeader('x-request-id', requestId);
    withRequestContext({ requestId, startedAtMs: Date.now() }, next);
  });

  // Limitar el tamaño del body a 1MB para prevenir ataques DoS por payloads gigantes
  app.use(express.json({ limit: '1mb' }));
  startObservabilityTicker();

  const createHttpTask = (req: express.Request, res: express.Response, taskName: string) => {
    let aborted = false;
    res.once('close', () => { if (!res.writableEnded) aborted = true; });
    const task = beginTrackedTask(taskName, 'incoming_http_request', { method: req.method, path: req.path, resource: 'incoming_http_request' });
    return { finish(error: unknown = null, meta: Record<string, unknown> = {}) {
      if (aborted) task.abort({ statusCode: res.statusCode, ...meta });
      else if (error) task.fail({ statusCode: res.statusCode, error: serializeError(error), ...meta });
      else task.complete({ statusCode: res.statusCode, ...meta });
    }};
  };

  // ==========================================
  // DOMAIN CANONICALIZATION & REDIRECTS
  // ==========================================
  const canonicalPagePaths = new Set(publicRoutes);
  app.use((req, res, next) => {
    const host = req.hostname || '';
    
    // Check if the request is coming from a non-canonical domain
    const isNonCanonical = 
      host === 'www.rauvia.com.mx' ||
      host === 'rauvia.consulting' ||
      host === 'www.rauvia.consulting';

    if (isNonCanonical) {
      // Reconstruct the URL with the canonical domain, preserving path and query string (UTMs)
      const canonicalUrl = `https://rauvia.com.mx${req.originalUrl}`;
      return res.redirect(301, canonicalUrl);
    }

    // Normalize public page URLs only. Vite endpoints such as /@react-refresh
    // and /@vite/client are extensionless modules, not pages.
    const isPublicPage = canonicalPagePaths.has(req.path) ||
      /^\/(recursos|casos)\/[^/]+$/.test(req.path);
    if ((req.method === 'GET' || req.method === 'HEAD') &&
        isPublicPage && !req.path.endsWith('/') && !path.extname(req.path)) {
      const query = req.url.slice(req.path.length);
      return res.redirect(301, `${req.path}/${query}`);
    }
    
    next();
  });

  // After crawler observation, before legacy Gone/static/fallback. Both forms
  // redirect directly to the canonical destination in one server response.
  app.use((req, res, next) => {
    if (['/componentes-ruta-90-dias-pymes','/componentes-ruta-90-dias-pymes/'].includes(req.path)) {
      return res.redirect(301, 'https://rauvia.com.mx/ruta-90/#componentes');
    }
    next();
  });

  // Legacy URLs that should return 410 Gone (no equivalent content yet)
  const LEGACY_GONE_PATHS = new Set([
    '/analisis-estrategico-mensual-startup',
    '/metricas-de-rentabilidad-para-agencias-en-cdmx',
    '/test-madurez-sistemica',
    '/wp-content/uploads/2025/11/RAUVIA_PRESENTACION_GUIA_2025.pdf',
    // Otras URLs que no tienen reemplazo
    '/sobre-rauvia',
    '/servicios',
    '/contacto',
    '/nuestro-metodo',
    '/consultoria_gratis',
    '/test-madurez-sistemica',
    '/blog',
    '/blindaje-operativo-2026',
    '/delegacion-hueca-caos-a-sistema-90-dias',
    '/metricas-de-rentabilidad-para-agencias-en-cdmx',
    '/guia-gobernanza-rauvia',
    '/claridad-operativa-el-regalo-que-si-negocio-necesita',
    '/ruta-90-dias-agencias',
    '/diagnostico-de-fuga-de-capital-mejora-la-eficiencia-en-tu-agencia',
    '/ejecucion-ruta-90-solo-vs-acompanamiento',
    '/que-hace-rauvia-ruta-90-dias',
    '/ia-estrategia-contenido-agencias',
    '/wp-content/uploads/2025/11/RAUVIA_PRESENTACION_GUIA_2025.pdf',
    '/contacto-anterior',
    '/servicios-antiguos',
    '/acerca-de',
  ]);

  // Historical legacy 301 redirects to valid equivalents
  const LEGACY_REDIRECT_PATHS = new Map([
    ['/blog', '/recursos']
  ]);

  app.use((req, res, next) => {
    let pathName = req.path;
    if (pathName.length > 1 && pathName.endsWith('/')) {
      pathName = pathName.slice(0, -1);
    }

    // 1. Only known retired URLs may return Gone.
    if (LEGACY_GONE_PATHS.has(pathName)) {
      return sendGone(res);
    }

    // 2. Redirect 301 for known equivalents
    if (LEGACY_REDIRECT_PATHS.has(pathName)) {
      return res.redirect(301, LEGACY_REDIRECT_PATHS.get(pathName)!);
    }

    next();
  });

  // WP Posts Proxy Route
  app.get('/api/wp/posts', async (req, res) => {
    res.set('Cache-Control','no-store');
    const request = createHttpTask(req, res, 'api_wp_posts_request'); let error: unknown = null;
    try {
      const slug = typeof req.query.slug === 'string' ? req.query.slug : undefined;
      if (slug) {
        const result = await wordpressCache.getPost(slug);
        if (result.status === 503) res.status(503).set('Retry-After', '60');
        if(result.stale)res.set('Warning','110 - "Stale WordPress content"');
        res.json(result.post ? [result.post] : []);
      } else {
        const summaries=req.query.view==='resources';
        const {posts,stale}=await (summaries ? wordpressCache.getResourcesSnapshot() : wordpressCache.getPostsSnapshot());
        if(stale)res.set('Warning','110 - "Stale WordPress content"');
        res.json(summaries ? resourceCards(posts) : posts);
      }
    }
    catch (err) { error = err; throw err; }
    finally { request.finish(error); }
  });

  // Analytics Tracking Endpoint
  app.post('/api/events', async (req, res) => {
    const request = createHttpTask(req, res, 'api_events_request'); let error: unknown = null;
    try { await handleTrackEvent(req, res); }
    catch (err) { error = err; throw err; }
    finally { request.finish(error); }
  });

  // LLM / LLMO API Endpoint
  // Prepared for Gemini API integration with RAUVIA context
  app.post('/api/llm', async (req, res) => {
    const request = createHttpTask(req, res, 'api_llm_request'); let error: unknown = null;
    try {
      const { messages } = req.body;
      
      if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'La carga útil debe incluir un array de messages.' });
      }

      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: 'GEMINI_API_KEY no está configurada en el servidor.' });
      }

      const ai = new GoogleGenAI({ 
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          }
        }
      });

      // Map format from { role: 'user'|'assistant', content: string } to Gemini format
      const formattedMessages = messages.map(msg => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.content }]
      }));

      // Wrap the Gemini API call in a Promise.race to enforce a 30-second timeout
      const geminiTask = beginTrackedTask('gemini_generate_content', 'external_http_request', {
        externalService: 'gemini', resource: 'external_http_request', model: 'gemini-3.8-flash'
      });
      let geminiError: unknown = null; let response: any;
      try {
        const generatePromise = ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: formattedMessages,
          config: {
            systemInstruction: ASSISTANT_SYSTEM_PROMPT,
          }
        });

        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Gemini API Timeout exceeded 30000ms')), 30000)
        );

        response = await Promise.race([generatePromise, timeoutPromise]) as any;
      } catch (err) { geminiError = err; throw err; }
      finally { if (geminiError) geminiTask.fail({ error: serializeError(geminiError) }); else geminiTask.complete({ statusCode: 200 }); }

      res.json({
        status: "success",
        response: response.text
      });
    } catch (err: any) {
      error = err;
      console.error('LLM API Error:', err);
      if (err.message && err.message.includes('Timeout')) {
        return res.status(504).json({ error: 'Timeout al conectar con Gemini API' });
      }
      res.status(500).json({ error: 'Internal Server Error al conectar con Gemini API' });
    } finally {
      request.finish(error);
    }
  });

  // MySQL Database Health Check Endpoint (never exposes password/secrets)
  app.get('/api/db/health', async (req, res) => {
    try {
      const status = await testConnection();
      if (!status.connected) {
        return res.status(503).json(status);
      }
      return res.json(status);
    } catch (error: any) {
      return res.status(500).json({
        connected: false,
        message: 'Unexpected error testing database connection',
        error: error.message || 'Unknown error',
      });
    }
  });

  // ==========================================
  // DYNAMIC SITEMAP (BACKGROUND REFRESH)
  // ==========================================
  const indexNow = createIndexNow({log:logEvent});
  // Canonical redirects and request observation above remain in their original order.
  app.get(`/${indexNow.key}.txt`, (_req, res) => {
    res.type('text/plain').set('X-Content-Type-Options', 'nosniff').send(indexNow.key);
  });
  const observeIndexNow = (xml: string) => {
    if (!indexNow.enabled) return;
    try {indexNow.observe(sitemapSnapshot(xml, discoveryRoot));}
    catch (error) {logEvent('error', 'indexnow_snapshot_failed', {error:serializeError(error)});}
  };
  const flushIndexNow = () => indexNow.flush().catch(error => {
    logEvent('error', 'indexnow_flush_failed', {error:serializeError(error)});
  });
  let cachedSitemapXml: string | null = null;
  let sitemapRevision = -1;
  let refreshInProgress: Promise<string> | null = null;
  let sitemapIntervalId: NodeJS.Timeout | null = null;
  
  const SITEMAP_CACHE_PATH = process.env.SITEMAP_CACHE_PATH || path.join(process.cwd(), 'data', 'sitemap-cache.xml');

  // Attempt to load from disk cache on startup
  try {
    if (fs.existsSync(SITEMAP_CACHE_PATH)) {
      cachedSitemapXml = fs.readFileSync(SITEMAP_CACHE_PATH, 'utf-8');
      console.log('[Sitemap] Loaded from disk cache.');
      observeIndexNow(cachedSitemapXml);
    }
  } catch (err) {
    console.warn('[Sitemap] Failed to load disk cache:', err);
  }

  async function refreshSitemap() {
    if (refreshInProgress) return refreshInProgress.then(xml=>sitemapRevision===wordpressCache.revision()?xml:refreshSitemap());

    refreshInProgress = (async () => {
      const refreshTask = beginTrackedTask('refresh_sitemap', 'internal_task', { resource: 'background_job' });
      const startTime = Date.now();
      logEvent('info', 'sitemap_background_refresh_started');
      try {
        let posts, revision;
        do {revision=wordpressCache.revision();posts=await fetchPosts();}
        while(revision!==wordpressCache.revision());
        const xml = renderSitemap(posts);
        
        cachedSitemapXml = xml; sitemapRevision=revision;
        // Only a complete successful WP fetch can update the snapshot. Reuse this
        // existing job; failures in IndexNow never fail sitemap generation.
        observeIndexNow(xml);
        void flushIndexNow();
        
        // Complete the atomic write within this single-flight refresh.
        try {
          await fs.promises.mkdir(path.dirname(SITEMAP_CACHE_PATH),{recursive:true});
          const tmpPath=`${SITEMAP_CACHE_PATH}.tmp`;
          await fs.promises.writeFile(tmpPath,xml,'utf-8');
          await fs.promises.rename(tmpPath,SITEMAP_CACHE_PATH);
        } catch(err){console.warn('[Sitemap] Failed to write disk cache:',err);}

        const institutionalCount = publicRoutes.length;
        const wpCount = posts.length;
        const durationMs = Date.now() - startTime;
        logEvent('info', 'sitemap_background_refresh_succeeded', { institutionalCount, wpCount, totalUrls: institutionalCount + wpCount, durationMs });
        refreshTask.complete({ institutionalCount, wpCount, totalUrls: institutionalCount + wpCount, durationMs });
        return xml;
      } catch (err) {
        const durationMs = Date.now() - startTime;
        logEvent('error', 'sitemap_background_refresh_failed', { error: serializeError(err), durationMs });
        refreshTask.fail({ error: serializeError(err), durationMs });
        throw err;
      } finally {
        refreshInProgress = null;
      }
    })();

    return refreshInProgress;
  }

  const sitemapRefreshOnStart = process.env.SITEMAP_REFRESH_ON_START === 'true';
  if (sitemapRefreshOnStart || !cachedSitemapXml) {
    refreshSitemap().catch(() => {});
  }
  
  const sitemapRefreshIntervalMs = Number(process.env.SITEMAP_REFRESH_INTERVAL_MS) || 21600000;
  sitemapIntervalId = setInterval(() => {
    refreshSitemap().catch(() => {}).finally(() => flushIndexNow());
  }, sitemapRefreshIntervalMs);
  
  if (sitemapIntervalId && typeof sitemapIntervalId.unref === 'function') {
    sitemapIntervalId.unref();
  }

  // No new ticker or worker. Pending retries also resume after a process restart.
  void flushIndexNow();
  let indexNowWindow = {startedAt:0, count:0};
  app.post('/internal/indexnow', async (req, res) => {
    const request = createHttpTask(req, res, 'indexnow_content_event');
    try {
      if (!authorized(req.headers.authorization, process.env.INDEXNOW_WEBHOOK_TOKEN)) {
        return res.status(401).json({error:'Unauthorized'});
      }
      const now = Date.now();
      if (now-indexNowWindow.startedAt >= 60000) indexNowWindow = {startedAt:now,count:0};
      if (++indexNowWindow.count > 60) return res.status(429).set('Retry-After','60').json({error:'Too many requests'});
      const {event, urlList} = req.body || {};
      if (!['published','updated','deleted','submit'].includes(event) || !Array.isArray(urlList) || !urlList.length || urlList.length > 1000) {
        return res.status(400).json({error:'Expected event and 1–1000 canonical URLs'});
      }
      let urls: string[];
      try {urls = [...new Set(urlList.map(validateUrl))] as string[];}
      catch {return res.status(400).json({error:'Invalid canonical RAUVIA URL'});}
      // Refresh and verify content before persisting its IndexNow notification.
      // On failure WP-Cron receives 503 and retries; old slugs may resolve 404.
      wordpressCache.invalidate();
      const snapshot=await wordpressCache.getPostsSnapshot();
      if(snapshot.stale) return res.status(503).set('Retry-After','60').json({error:'WordPress unavailable; cache invalidated, retry content event'});
      // Resolve changed articles before notifying. A confirmed missing slug is
      // valid for deletions and slug changes; an upstream failure requires retry.
      let changedArticles=0, publishedArticles=0;
      for(const url of urls) {
        const match=new URL(url).pathname.match(/^\/recursos\/([^/]+)\/$/);
        if(match) {
          changedArticles++;
          const verified=await wordpressCache.getPost(decodeURIComponent(match[1]));
          if(verified.status===200)publishedArticles++;
          if(verified.status===503 || verified.stale || (event==='published' && verified.status!==200) || (event==='deleted' && verified.status!==404))
            return res.status(503).set('Retry-After','60').json({error:'Unable to verify changed article'});
        }
      }
      if(event==='updated' && changedArticles && !publishedArticles) return res.status(503).set('Retry-After','60').json({error:'Updated article not yet visible'});
      const result = indexNow.enqueue(urls);
      logEvent('info','indexnow_content_event',{event,count:urls.length});
      res.status(202).json({...result, message:'Stored for submission; indexing is not guaranteed'});
      void refreshSitemap().catch(error => logEvent('warn','indexnow_event_sitemap_failed',{error:serializeError(error)}))
        .finally(() => flushIndexNow());
    } catch (error) {
      logEvent('error','indexnow_event_failed',{error:serializeError(error)});
      if (!res.headersSent) res.status(503).json({error:'Unable to persist notification'});
    } finally {request.finish();}
  });

  const webhookRateLimit = new Map<string, number>();
  
  app.post('/internal/revalidate-sitemap', (req, res) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    const validToken = process.env.SITEMAP_REVALIDATE_TOKEN;
    
    if (!validToken || token !== validToken) {
      logEvent('warn', 'revalidate_sitemap_unauthorized', { ip: req.ip });
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const now = Date.now();
    const lastCall = webhookRateLimit.get('revalidate') || 0;
    if (now - lastCall < 10000) { // 10 seconds rate limit
      return res.status(429).json({ error: 'Too many requests. Wait before trying again.' });
    }
    webhookRateLimit.set('revalidate', now);

    if (refreshInProgress) {
      return res.json({ success: true, message: 'Sitemap refresh already in progress' });
    }

    refreshSitemap()
      .then(() => res.json({ success: true, message: 'Sitemap revalidated' }))
      .catch((err) => {
        logEvent('error', 'revalidate_sitemap_failed', { error: serializeError(err) });
        res.status(500).json({ error: 'Failed to revalidate sitemap' });
      });
  });

  app.get('/healthz', (req, res) => {
    res.json({
      status: 'ok',
      uptime: process.uptime(),
      pid: process.pid,
      environment: process.env.NODE_ENV || 'development',
      sitemapCache: cachedSitemapXml ? 'available' : 'missing'
    });
  });

  app.get('/internal/runtime-status', (req, res) => {
    const token = req.headers['authorization']?.replace('Bearer ', '');
    const validToken = process.env.INTERNAL_STATUS_TOKEN || process.env.SITEMAP_REVALIDATE_TOKEN;
    
    if (!validToken || token !== validToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const memoryUsage = process.memoryUsage();
    res.json({
      status: 'ok',
      pid: process.pid,
      isShuttingDown: (global as any).__isShuttingDown || false,
      sitemapRefreshInProgress: !!refreshInProgress,
      indexNow: indexNow.status(),
      crawlerLoggingEnabled: process.env.CRAWLER_LOGGING_ENABLED === 'true',
      observabilityEnabled: process.env.OBSERVABILITY_ENABLED === 'true',
      uptime: process.uptime(),
      memory: {
        rssMb: Math.round(memoryUsage.rss / 1024 / 1024),
        heapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024)
      }
    });
  });

  app.get('/sitemap.xml', (req, res) => {
    const request = createHttpTask(req, res, 'get_sitemap_xml'); const startTime = Date.now(); let error: unknown = null;
    try {
      if (!cachedSitemapXml) {
        const durationMs = Date.now() - startTime;
        logEvent('warn', 'sitemap_served_empty', { durationMs });
        res.header('Content-Type', 'application/xml; charset=utf-8');
        res.header('Retry-After', '60');
        return res.status(503).send('<?xml version="1.0" encoding="UTF-8"?><urlset></urlset>');
      }

      res.header('Content-Type', 'application/xml; charset=utf-8');
      res.header('Cache-Control', 'no-store');
      res.send(cachedSitemapXml);
      logEvent('info', 'sitemap_served_from_memory', { durationMs: Date.now() - startTime, userAgent: req.headers['user-agent'] || 'unknown' });
    } catch (err) { error = err; throw err; }
    finally { request.finish(error, { durationMs: Date.now() - startTime }); }
  });

  // Vite middleware for development
  if (!isProd) {
    // Only import Vite in development dynamically to prevent bundling in production
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // The production-only renderer imports CSS; Vite owns styles in development.
    const {renderArticleHtml} = await import('./server/seo/articleHtml');
    const {renderResourcesHtml} = await import('./server/seo/resourcesHtml');
    const distPath = path.join(process.cwd(), 'dist');
    const shell = await fs.promises.readFile(path.join(distPath,'shell.html'),'utf8');
    // One startup refresh, shared with incoming readers; no extra interval.
    const warmup=beginTrackedTask('wordpress_resources_warmup','internal_task');
    void wordpressCache.getPostsSnapshot().then(({posts,stale})=>warmup.complete({posts:posts.length,stale}))
      .catch(error=>warmup.fail({error:serializeError(error)}));
    let resourceHtml: {posts:unknown;stale:boolean;html:Promise<string>} | undefined;
    app.get('/recursos/',async (_req,res,next)=>{
      const request=beginTrackedTask('wordpress_resources_html','internal_task');
      try {
        const started=Date.now();
        const {posts,stale}=await wordpressCache.getResourcesSnapshot();
        const wordpressMs=Date.now()-started;
        res.set('Cache-Control','no-store');
        if(stale)res.set('Warning','110 - "Stale WordPress content"');
        if(!resourceHtml || resourceHtml.posts!==posts || resourceHtml.stale!==stale) {
          const html=renderResourcesHtml(shell,resourceCards(posts),stale);
          resourceHtml={posts,stale,html};
          void html.catch(()=>{if(resourceHtml?.html===html)resourceHtml=undefined;});
        }
        const html=await resourceHtml.html;
        res.set('Server-Timing',`wordpress;dur=${wordpressMs}, resources;dur=${Date.now()-started}`);
        res.type('html').send(html);request.complete({posts:posts.length,stale,durationMs:Date.now()-started});
      } catch(error){request.fail({error:serializeError(error)});next(error);}
    });
    // Resolve published articles before static files, so old snapshots cannot
    // override fresh WordPress metadata, content or a confirmed missing slug.
    app.get(/^\/recursos\/([^/]+)\/$/, async (req,res,next) => {
      try {
        const slug=req.params[0];
        const result=await wordpressCache.getPost(slug);
        const html=renderArticleHtml(shell,canonicalPath(`/recursos/${encodeURIComponent(slug)}`),result);
        res.status(result.status).type('html');
        res.set('Cache-Control','no-store');
        if (result.status===503) res.set('Retry-After','60');
        if (result.stale) res.set('Warning','110 - "Stale WordPress content"');
        return res.send(html);
      } catch (error) { return next(error); }
    });
    // The clean shell is an implementation template, never a public URL.
    app.get('/shell.html', (_req,res) => {res.status(404).type('text').send('Not found');});
    app.use(express.static(distPath, {extensions:['html'],index:false}));
    const knownRoutes = new Set(publicRoutes);
    app.use(async (req,res,next) => {
      if (!['GET','HEAD'].includes(req.method)) return next();
      const normalizedPath=req.path.replace(/\/$/,'') || '/';
      if (knownRoutes.has(normalizedPath)) {
        const file=path.join(distPath,normalizedPath==='/' ? '' : normalizedPath,'index.html');
        try { await fs.promises.access(file); return res.sendFile(file); }
        catch { return res.status(503).type('html').send('<!doctype html><html lang="es"><head><title>Página temporalmente no disponible | RAUVIA</title><meta name="robots" content="noindex, nofollow"></head><body><main><h1>Página temporalmente no disponible</h1></main></body></html>'); }
      }
      // Unknown content never receives 200 + Home.
      return res.status(404).sendFile(path.join(distPath,'404.html'));
    });
  }

  const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`RAUVIA Server running on http://localhost:${PORT}`);
  });
  attachInboundHttpSocketTracking(server);

  const handleShutdown = async (signal: string) => {
    if ((global as any).__isShuttingDown) {
      console.log(`[Server] Already shutting down. Ignoring ${signal}.`);
      return;
    }
    (global as any).__isShuttingDown = true;
    console.log(`[Server] Received ${signal}. Shutting down gracefully...`);
    
    const forceExitTimer = setTimeout(() => {
      console.error('[Server] Graceful shutdown timed out after 10s. Forcing exit.');
      process.exit(1);
    }, 10000);
    forceExitTimer.unref();

    if (sitemapIntervalId) {
      clearInterval(sitemapIntervalId);
    }
    stopObservabilityTicker();
    indexNow.stop();
    
    // Aggressive socket cleanup for keep-alive issues
    if (server.closeIdleConnections) server.closeIdleConnections();
    setTimeout(() => {
      if (server.closeAllConnections) server.closeAllConnections();
    }, 2000).unref();
    destroyAllInboundHttpSockets();

    try {
      await closeDbPool();
      console.log('[Server] DB pool closed.');
    } catch (err) {
      console.error('[Server] Error closing DB pool:', err);
    }

    server.close(() => {
      console.log('[Server] HTTP server closed.');
      clearTimeout(forceExitTimer);
      process.exit(signal === 'FATAL_ERROR' ? 1 : 0);
    });
  };

  // Register shutdown handlers
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('uncaughtException', (err) => {
    console.error('[Server] Uncaught Exception:', err);
    handleShutdown('FATAL_ERROR');
  });
  process.on('unhandledRejection', (reason) => {
    console.error('[Server] Unhandled Rejection:', reason);
    handleShutdown('FATAL_ERROR');
  });
}

console.log(`[Server] Starting process. PID: ${process.pid}, ENV: ${process.env.NODE_ENV || 'development'}`);
startServer();
