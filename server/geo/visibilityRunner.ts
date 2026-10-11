import { GenerativeQuery } from './types';
import { getActiveQueries, getQueryByCode } from './queryRepository';
import { analyzeGeoVisibility } from './visibilityAnalyzer';
import { saveVisibilityCheck } from './visibilityRepository';
import { GenerativeProviderAdapter } from './providers/providerAdapter';

export class VisibilityRunner {
  private provider: GenerativeProviderAdapter;
  private maxConcurrency: number;

  constructor(provider: GenerativeProviderAdapter, maxConcurrency = 2) {
    this.provider = provider;
    this.maxConcurrency = maxConcurrency;
  }

  async runAll() {
    const queries = await getActiveQueries();
    return this.executeQueries(queries);
  }

  async runByCode(queryCode: string) {
    const q = await getQueryByCode(queryCode);
    if (!q) {
      throw new Error(`Query ${queryCode} not found or inactive`);
    }
    return this.executeQueries([q]);
  }

  private async executeQueries(queries: GenerativeQuery[]) {
    const results = [];
    
    // Simple concurrency limiting
    for (let i = 0; i < queries.length; i += this.maxConcurrency) {
      const batch = queries.slice(i, i + this.maxConcurrency);
      const batchPromises = batch.map(q => this.processQuery(q));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }
    
    return results;
  }

  private async processQuery(q: GenerativeQuery) {
    try {
      // 1. Execute
      const response = await this.provider.execute(q.query_text);
      
      // 2. Analyze
      const analysis = analyzeGeoVisibility(response);
      
      // 3. Persist
      await saveVisibilityCheck(q, response, analysis);
      
      return { query_code: q.query_code, status: 'success', analysis };
    } catch (error: any) {
      // Log error but don't fail the entire batch. Don't write false negatives to DB.
      if (process.env.NODE_ENV === 'development') {
        console.error(`[GEO] Error processing query ${q.query_code}:`, error.message);
      }
      return { query_code: q.query_code, status: 'error', error: error.message };
    }
  }
}
