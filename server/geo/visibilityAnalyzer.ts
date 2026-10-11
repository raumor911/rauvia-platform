import { NormalizedGenerativeResponse, GeoVisibilityAnalysis } from './types';

export function analyzeGeoVisibility(response: NormalizedGenerativeResponse): GeoVisibilityAnalysis {
  const text = response.responseText.toLowerCase();
  
  // A. Mention
  const mentionKeywords = ['rauvia', 'rauvia consulting', 'rauvia.com.mx'];
  const mentioned = mentionKeywords.some(kw => text.includes(kw));

  // B. Citation
  const rauviaUrls: string[] = [];
  let citationUrl: string | null = null;
  
  response.citations.forEach(c => {
    if (c.url.toLowerCase().includes('rauvia.com.mx')) {
      if (!rauviaUrls.includes(c.url)) {
        rauviaUrls.push(c.url);
      }
      if (!citationUrl) citationUrl = c.url; // Save first one
    }
  });

  // Also extract text URLs that might not be in citations array explicitly
  const urlRegex = /https?:\/\/(www\.)?rauvia\.com\.mx[^\s)"]*/gi;
  const matches = response.responseText.match(urlRegex) || [];
  matches.forEach(m => {
    if (!rauviaUrls.includes(m)) {
      rauviaUrls.push(m);
      if (!citationUrl) citationUrl = m;
    }
  });

  const cited = rauviaUrls.length > 0;

  // C. Recommendation (Conservative)
  // For V1, we only flag recommendation if it's explicitly stated as a solution or provider.
  // We use simple keyword matching near the mention for now.
  const recommendationKeywords = ['especialista en', 'recomienda', 'solución ideal', 'opción destacada', 'proveedor'];
  const recommended = mentioned && recommendationKeywords.some(kw => text.includes(kw));

  return {
    mentioned,
    cited,
    recommended,
    citationUrl,
    rauviaUrls,
    competitorsMentioned: [], // Placeholder for future extraction
    entityAlignment: 'unknown' // V1 default
  };
}
