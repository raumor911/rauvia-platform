import { Request, Response } from 'express';
import { query } from '../db';
import { validateEventPayload } from './validation';
import crypto from 'crypto';

function parseUtmParams(pagePath: string): { source: string | null; medium: string | null; campaign: string | null } {
  try {
    // A dummy base URL to parse the search string
    const url = new URL(pagePath, 'http://localhost');
    return {
      source: url.searchParams.get('utm_source') || null,
      medium: url.searchParams.get('utm_medium') || null,
      campaign: url.searchParams.get('utm_campaign') || null,
    };
  } catch (e) {
    return { source: null, medium: null, campaign: null };
  }
}

// Simple rate limiter implementation using memory map
const rateLimiter = new Map<string, { count: number; windowStart: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_EVENTS_PER_WINDOW = 60; // 60 events per minute per IP

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimiter.get(ip);
  if (!record) {
    rateLimiter.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (now - record.windowStart > RATE_LIMIT_WINDOW) {
    rateLimiter.set(ip, { count: 1, windowStart: now });
    return false;
  }
  if (record.count >= MAX_EVENTS_PER_WINDOW) {
    return true;
  }
  record.count += 1;
  return false;
}

export async function handleTrackEvent(req: Request, res: Response) {
  try {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    if (isRateLimited(ip)) {
      return res.status(429).json({ status: 'rate_limited' });
    }

    const payload = req.body;
    const validationError = validateEventPayload(payload);
    
    if (validationError) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Analytics] Invalid payload:', validationError, payload);
      }
      return res.status(400).json({ status: 'invalid_event' });
    }

    const {
      visitor_id,
      session_id,
      event_name,
      page_path,
      referrer,
      device_type,
      properties
    } = payload;

    const utms = parseUtmParams(page_path);

    // 1. Process Visitor
    await query(`
      INSERT INTO visitors (visitor_id, first_seen_at, last_seen_at, first_landing_page, first_source, first_medium, first_campaign)
      VALUES (?, NOW(), NOW(), ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE last_seen_at = NOW()
    `, [visitor_id, page_path, utms.source, utms.medium, utms.campaign]);

    // 2. Process Session
    // Insert if not exists, otherwise update last_activity_at and exit_page
    await query(`
      INSERT INTO sessions (session_id, visitor_id, started_at, last_activity_at, landing_page, referrer, utm_source, utm_medium, utm_campaign, device_type, exit_page)
      VALUES (?, ?, NOW(), NOW(), ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE last_activity_at = NOW(), exit_page = ?
    `, [
      session_id, visitor_id, page_path, referrer, utms.source, utms.medium, utms.campaign, device_type || 'desktop', page_path,
      page_path
    ]);

    // 3. Process Event
    // Make sure we generate an event_timestamp that matches DB logic if we don't pass it from FE
    await query(`
      INSERT INTO web_events (visitor_id, session_id, event_name, page_path, referrer, properties, event_timestamp)
      VALUES (?, ?, ?, ?, ?, ?, NOW())
    `, [visitor_id, session_id, event_name, page_path, referrer, JSON.stringify(properties || {})]);

    if (process.env.NODE_ENV === 'development') {
      console.log(`[Analytics] Tracked ${event_name} on ${page_path} for ${visitor_id.substring(0, 8)}...`);
    }

    res.status(201).json({ status: 'ok' });
  } catch (error: any) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[Analytics Error]', error);
    } else if (error.message && error.message.includes('Timeout')) {
      console.warn('[Analytics Warning] DB query timeout for event tracking. Dropping event to preserve performance.');
    }
    // Fail silently for the client to avoid blocking UI
    res.status(500).json({ status: 'error' });
  }
}
