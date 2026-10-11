import { query as dbQuery } from '../db';
import crypto from 'crypto';
import { GenerativeQuery, NormalizedGenerativeResponse, GeoVisibilityAnalysis } from './types';

export async function saveVisibilityCheck(
  q: GenerativeQuery,
  response: NormalizedGenerativeResponse,
  analysis: GeoVisibilityAnalysis
) {
  // Hash
  const hash = crypto.createHash('sha256').update(response.responseText).digest('hex');

  // Excerpt (around RAUVIA if present, else first 300 chars)
  let excerpt = response.responseText;
  const rauviaIndex = excerpt.toLowerCase().indexOf('rauvia');
  
  if (rauviaIndex !== -1) {
    const start = Math.max(0, rauviaIndex - 100);
    const end = Math.min(excerpt.length, rauviaIndex + 200);
    excerpt = excerpt.substring(start, end);
    if (start > 0) excerpt = '...' + excerpt;
    if (end < response.responseText.length) excerpt = excerpt + '...';
  } else {
    excerpt = excerpt.substring(0, 300) + (excerpt.length > 300 ? '...' : '');
  }

  const properties = {
    rauvia_urls: analysis.rauviaUrls,
    competitors_mentioned: analysis.competitorsMentioned,
    entity_alignment: analysis.entityAlignment,
    analysis_version: "geo_v1",
    provider_metadata: response.metadata
  };

  await dbQuery(`
    INSERT INTO geo_visibility_checks 
    (query_id, provider, model, surface, checked_at, mentioned, cited, recommended, citation_url, response_excerpt, response_hash, properties)
    VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)
  `, [
    q.id,
    response.provider,
    response.model,
    response.surface,
    analysis.mentioned ? 1 : 0,
    analysis.cited ? 1 : 0,
    analysis.recommended ? 1 : 0,
    analysis.citationUrl,
    excerpt,
    hash,
    JSON.stringify(properties)
  ]);
}
