export interface GenerativeQuery {
  id: number;
  query_code: string;
  query_text: string;
  icp: string | null;
  intent: string | null;
  topic: string | null;
  country: string;
  language: string;
}

export interface Citation {
  url: string;
  title?: string;
}

export interface NormalizedGenerativeResponse {
  provider: string;
  model: string | null;
  surface: string | null;
  responseText: string;
  citations: Citation[];
  metadata: any;
}

export interface GeoVisibilityAnalysis {
  mentioned: boolean;
  cited: boolean;
  recommended: boolean;
  citationUrl: string | null;
  rauviaUrls: string[];
  competitorsMentioned: string[];
  entityAlignment: 'aligned' | 'partially_aligned' | 'misaligned' | 'insufficient_context' | 'unknown';
}
