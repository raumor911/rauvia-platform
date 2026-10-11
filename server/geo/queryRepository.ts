import { query as dbQuery } from '../db';
import { GenerativeQuery } from './types';

export async function getActiveQueries(): Promise<GenerativeQuery[]> {
  const rows = await dbQuery(`
    SELECT id, query_code, query_text, icp, intent, topic, country, language
    FROM geo_generative_queries
    WHERE is_active = 1
  `);
  return rows as GenerativeQuery[];
}

export async function getQueryByCode(queryCode: string): Promise<GenerativeQuery | null> {
  const rows = await dbQuery(`
    SELECT id, query_code, query_text, icp, intent, topic, country, language
    FROM geo_generative_queries
    WHERE query_code = ? AND is_active = 1
  `, [queryCode]);
  
  const results = rows as GenerativeQuery[];
  return results.length > 0 ? results[0] : null;
}
