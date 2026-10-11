import { NormalizedGenerativeResponse } from '../types';

export interface GenerativeProviderAdapter {
  execute(query: string): Promise<NormalizedGenerativeResponse>;
}
