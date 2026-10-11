import { Request, Response, NextFunction } from 'express';
import { detectAICrawler } from './crawlerRegistry.js';
import { query } from '../db.js';
import { beginTrackedTask } from '../observability/index.js';

const IGNORED_EXTENSIONS = [
  '.js', '.css', '.map', '.woff', '.woff2', '.ttf', 
  '.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico'
];

const IGNORED_PATHS = [
  '/assets/',
  '/favicon'
  // '/robots.txt' eliminado para permitir el registro de visitas de crawlers a robots y sitemap
];

const crawlerCache = new Map<string, number>();
const CRAWLER_CACHE_TTL = 60 * 1000; // 1 min deduplication

function isDuplicate(crawlerName: string, requestPath: string): boolean {
  const key = `${crawlerName}:${requestPath}`;
  const now = Date.now();
  const last = crawlerCache.get(key);
  if (last && now - last < CRAWLER_CACHE_TTL) {
    return true; // Already logged recently
  }
  crawlerCache.set(key, now);
  
  // Cleanup map periodically if it gets too large to avoid memory leaks
  if (crawlerCache.size > 1000) {
    const threshold = now - CRAWLER_CACHE_TTL;
    for (const [k, v] of crawlerCache.entries()) {
      if (v < threshold) crawlerCache.delete(k);
    }
  }
  return false;
}

export function shouldTrackCrawlerRequest(req: Request): boolean {
  const path = req.path.toLowerCase();
  
  // Exclude static assets
  if (IGNORED_PATHS.some(p => path.startsWith(p) || path === p)) {
    return false;
  }
  
  if (IGNORED_EXTENSIONS.some(ext => path.endsWith(ext))) {
    return false;
  }
  
  return true;
}

export function aiCrawlerMiddleware(req: Request, res: Response, next: NextFunction) {
  if (process.env.CRAWLER_LOGGING_ENABLED === 'false') {
    return next();
  }

  const userAgent = req.get('User-Agent') || '';
  const crawler = detectAICrawler(userAgent);

  if (!crawler) {
    return next();
  }

  if (!shouldTrackCrawlerRequest(req)) {
    return next();
  }

  const startMs = Date.now();
  const requestPath = req.originalUrl || req.path;
  const requestMethod = req.method;
  const referer = req.get('Referer') || null;

  if (isDuplicate(crawler.name, requestPath)) {
    return next();
  }

  // We want to capture the status code after the response is sent
  res.on('finish', () => {
    const responseTimeMs = Date.now() - startMs;
    const statusCode = res.statusCode;
    
    // Asynchronously log to DB without blocking
    logCrawlerVisit({
      crawler_name: crawler.name,
      crawler_family: crawler.family,
      user_agent: userAgent,
      request_path: requestPath,
      request_method: requestMethod,
      status_code: statusCode,
      referer: referer,
      response_time_ms: responseTimeMs,
      properties: {
        detection_method: crawler.detectionMethod,
        verified: false
      }
    });
  });

  next();
}

async function logCrawlerVisit(data: any) {
  const task = beginTrackedTask('log_crawler_visit', 'internal_task', {
    resource: 'post_response_internal_task', crawlerName: data.crawler_name, requestPath: data.request_path, requestMethod: data.request_method, statusCode: data.status_code,
  });
  let error: unknown = null;
  try {
    await query(`
      INSERT INTO ai_crawler_visits 
      (crawler_name, crawler_family, user_agent, request_path, request_method, status_code, referer, response_time_ms, properties)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      data.crawler_name,
      data.crawler_family,
      data.user_agent,
      data.request_path,
      data.request_method,
      data.status_code,
      data.referer,
      data.response_time_ms,
      JSON.stringify(data.properties || {})
    ]);
  } catch (err) {
    error = err;
    if (process.env.NODE_ENV === 'development') {
      console.error('[AICrawler Analytics] Failed to log visit:', err);
    }
  } finally {
    if (error) task.fail({ error: error instanceof Error ? error.message : 'Unknown crawler logging error' });
    else task.complete();
  }
}
